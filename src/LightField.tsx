import { useEffect, useRef } from 'react';
import * as THREE from 'three';
export default function LightField({ paused }: {paused:boolean}) {
 const host = useRef<HTMLDivElement>(null);
 useEffect(() => {
  if (!host.current || paused || matchMedia('(prefers-reduced-motion: reduce)').matches || innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)) return;
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'}); } catch { return; }
  const el=host.current; el.appendChild(renderer.domElement); renderer.setPixelRatio(Math.min(devicePixelRatio,1.25));
  const scene=new THREE.Scene(), camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  const uniforms={uTime:{value:0},uPointer:{value:new THREE.Vector2(.5,.5)},uAspect:{value:1}};
  const material=new THREE.ShaderMaterial({transparent:true,uniforms,vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}',fragmentShader:`precision mediump float; varying vec2 vUv; uniform float uTime; uniform vec2 uPointer; uniform float uAspect;
   void main(){vec2 p=vUv; p.x*=uAspect; vec2 center=vec2(.68*uAspect,.48)+(uPointer-.5)*.045; float d=length(p-center); float light=pow(max(0.,1.-abs(d-.30)*3.),8.); float wave=sin(atan(p.y-center.y,p.x-center.x)*3.+uTime*.28+d*12.)*.5+.5; float glow=light*wave*.09; float ray=pow(max(0.,1.-abs(p.y-.48-sin(p.x*2.+uTime*.16)*.035)*8.),12.)*.035; gl_FragColor=vec4(.42,.65,1.,glow+ray);}`});
  const geometry=new THREE.PlaneGeometry(2,2); scene.add(new THREE.Mesh(geometry,material));
  const resize=()=>{renderer.setSize(el.clientWidth,el.clientHeight); uniforms.uAspect.value=el.clientWidth/el.clientHeight;}; resize();
  const observer=new ResizeObserver(resize);observer.observe(el);
  const pointer=(e:PointerEvent)=>uniforms.uPointer.value.set(e.clientX/innerWidth,1-e.clientY/innerHeight);
  window.addEventListener('pointermove',pointer,{passive:true});
  let visible=true,frame=0,last=0;const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});intersection.observe(el);
  const render=(time:number)=>{frame=requestAnimationFrame(render);if(!visible||document.hidden||time-last<32)return; last=time;uniforms.uTime.value=time/1000;renderer.render(scene,camera);};frame=requestAnimationFrame(render);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();window.removeEventListener('pointermove',pointer);geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove();};
 },[paused]);
 return <div ref={host} className="light-field" aria-hidden="true"/>;
}
