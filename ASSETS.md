# Original visual assets

Generated using the built-in imagegen tool specifically for this portfolio. No stock photos, external fonts, or third-party CDN dependencies.

## Hero

Destination: `public/images/glass-hero.webp` (web optimized). Original generation: 1536×1024 PNG.

Prompt:
> Use case: stylized-concept. Premium personal technology website hero artwork for Mr Han, landscape 1536x1024. Seamless pure near-black #050608 background. One large sculptural liquid-glass folded torus/ribbon, thick transparent optical glass with polished silver rims and faint ice-blue refraction. Exceptionally refined photorealistic studio product rendering. Sparse landscape composition; sculpture center-right; generous negative space left for copy. Dramatic controlled studio lighting, crisp silver highlights, subtle cool refractive edges, deep blacks. No text, UI, logos, watermark, or extra objects.

## Social preview

Destination: `public/og.png` (1200×630). Original generation: 1730×909 PNG.

Prompt:
> Use case: ads-marketing. Landscape social sharing card, approximately 1200x630, for Mr Han personal technology website. Seamless pure near-black #050608. One sculptural folded optical-glass torus/ribbon on right, polished silver rims, faint ice-blue refraction. Premium minimalist studio product photography and refined editorial typography. Generous margins, huge white sans-serif title left, smaller tagline underneath, small name bottom left. Exact text: "Mr Han", "Think. Build. Explore.", "Dongzhen Han". Only these three strings. No logos, UI or watermark.

## Code-native assets

- `public/favicon.svg`: original typographic H monogram, editable vector.
- Project previews: DOM/SVG dashboard/interface studies, not screenshots of released apps.
- `src/LightField.tsx`: procedural fragment shader for a slow, pointer-reactive optical light overlay.
- Lucide icons: ISC license, dependency included in package lock.

Hero has a fixed aspect-free background area, so image loading cannot shift layout. Social artwork is separate from page imagery and is not downloaded on the page itself.
