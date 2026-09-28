import { readFileSync, writeFileSync } from 'node:fs';
import { loadEnv } from 'vite';
import { render } from '../.prerender/entry-server.js';
const env=loadEnv('production',process.cwd(),'VITE_');
const raw=process.env.VITE_SITE_URL || env.VITE_SITE_URL;
let origin;
if(raw){origin=new URL(raw).origin; if(!origin.startsWith('https://'))throw new Error('VITE_SITE_URL must use HTTPS');}
let html=readFileSync('dist/index.html','utf8').replace('<div id="root"></div>','<div id="root">'+render()+'</div>');
if(origin){html=html.replace('</head>',`<link rel="canonical" href="${origin}/"/><meta property="og:url" content="${origin}/"/><meta property="og:image" content="${origin}/og.png"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta property="og:image:alt" content="Mr Han — Think. Build. Explore. Silver blue optical glass on black."/><meta name="twitter:image" content="${origin}/og.png"/></head>`);writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>`);}
writeFileSync('dist/index.html',html);
writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\n${origin?`Sitemap: ${origin}/sitemap.xml\n`:''}`);
if(!origin)console.log('Local build: canonical and absolute OG URLs omitted. Set VITE_SITE_URL for production.');
