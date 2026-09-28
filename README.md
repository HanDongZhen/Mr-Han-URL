# Mr Han

A bilingual personal portfolio for **Dongzhen Han / 韩东朕**. Dark graphite, optical glass, generous typography, and quiet motion. All six showcased projects are explicitly **concepts, prototypes, or experiments**, not claims of released commercial work.

## Run

Node.js 22+ (24 also supported).

```sh
npm ci
npm run dev
npm run build
npm run preview
npm test
```

The website is independent of the HarmonyOS application in the parent folder. Its repository starts here; no parent files are published.

## Structure

- `src/App.tsx` — narrative sections, accessible navigation, native dialog, interactive studies
- `src/content.ts` — English and Simplified Chinese copy and six project records
- `src/LightField.tsx` — lazy WebGL optical light overlay, capped resolution and frame rate
- `src/styles.css` — design system, device studies, responsive rules and motion fallbacks
- `public/images/` — original generated glass hero, optimized WebP
- `public/og.png` — original social preview
- `scripts/metadata.mjs` — production canonical, OG URLs, sitemap, robots
- `tests/site.spec.ts` — desktop/tablet/mobile, language persistence, navigation, dialogs, sliders, reduced motion and axe checks
- `.github/workflows/ci.yml` — build and browser validation on main and PRs

## Configuration

Copy `.env.example` to `.env.local` for local Vite configuration. For production, set variables in Cloudflare Pages:

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Final HTTPS origin, e.g. your assigned Pages domain; needed for absolute OG metadata and sitemap |
| `VITE_GITHUB_URL` | Public profile, currently the authenticated user's `https://github.com/HanDongZhen` |
| `VITE_CONTACT_EMAIL` | Optional public email; omitted by default |

The public site never contains a private email, location, phone number, or credentials. Language preference is stored only in the visitor's browser. No analytics or tracking services are included.

## Deployment — Cloudflare Pages

Preferred: create a Pages project with **Git integration** in the Cloudflare dashboard, connect this repository, production branch `main`, build command `npm run build`, output directory `dist`, Node version `22`. Set `VITE_SITE_URL` to the assigned HTTPS production origin and rebuild. Branches/PRs receive preview builds. No server, paid service, database, or API key is needed by the site.

Alternatively, an already authenticated Wrangler CLI can run:

```sh
npx wrangler pages project create mr-han --production-branch main
npm run deploy
```

Direct Upload and native Git integration are distinct project setup routes. A Direct Upload project cannot be converted to Git integration later. Prefer the dashboard Git route for automatic builds. A Direct Upload project can instead use GitHub Actions plus a narrowly scoped Cloudflare Pages API token stored as a repository secret.

Official docs: https://developers.cloudflare.com/pages/get-started/git-integration/ and https://developers.cloudflare.com/pages/get-started/direct-upload/.

Never commit Cloudflare tokens, GitHub tokens, or `.env.local`. See `DEPLOYMENT.md` for current handoff status.

## Testing

Local Playwright uses installed Microsoft Edge on Windows. Elsewhere set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to a Chromium executable after `npx playwright install chromium`. CI resolves the installed Chromium path automatically.

Run `npm test` against the production preview. Screenshots and detailed results go to ignored `qa/` and `test-results/`. See `QA.md` for measured results and limitations.

## Design and content

See `design.md` and `ASSETS.md`. Project visuals are functioning DOM/SVG interface studies. Speed and motion controls use simulated data; the site does not claim working GPS, QR scanning, conversion, or remote AI functionality. Add real product links only when those products exist.
