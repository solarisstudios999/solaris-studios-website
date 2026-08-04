# Solaris Studios

Marketing site for Solaris Studios — built with Next.js 16 and React 19. Fully static,
CDN-friendly, dark-themed.

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Dev server runs at <http://127.0.0.1:3000>.

## Production build

```bash
npm run build
npm run start
```

`npm run build` produces a fully prerendered site (every route is `○ Static`). The
output in `.next/` is what gets deployed.

## Project structure

```
app/                Next.js App Router pages
  layout.jsx        Root layout, metadata, JSON-LD
  page.jsx          Home
  about/            /about
  services/         /services
  portfolio/        /portfolio  (a.k.a. "Work")
  process/          /process
  contact/          /contact
  not-found.jsx     Branded 404
  icon.jsx          Dynamic favicon (next/og)
  opengraph-image.jsx  Dynamic 1200x630 social card
  sitemap.js        Auto sitemap
  robots.js         Auto robots
  globals.css       All styles (~3700 lines, one file)
components/         Header, Footer, Reveal, MagneticButton, Marquee,
                    ProjectVisual, ContactForm, ContactLine, SeamlessHeroVideo,
                    ExperienceEffects
lib/data.js         Studio info, services, projects, process stages, team
public/assets/      fonts, logo, video, portfolio screenshots
next.config.mjs     Security headers, image optimization, caching
```

## Assets

All brand assets are local in `public/assets/`:

- `video/hero.mp4` — 824 KB compressed H.264 hero loop (1080p / 24fps / muted)
- `video/hero-poster.jpg` — 92 KB first-frame poster
- `logo/solaris-logo.svg` — brand mark (heavy — embedded JPEG)
- `fonts/Satoshi-{Regular,Medium,Bold,Black}.otf` — Satoshi typeface

Re-encode the hero video with ffmpeg if you swap in a different source:

```bash
ffmpeg -i source.mp4 \
  -vf "scale=1920:-2,fps=24" \
  -c:v libx264 -crf 24 -preset slow -tune film \
  -profile:v high -level 4.0 -pix_fmt yuv420p \
  -movflags +faststart -an \
  public/assets/video/hero.mp4

ffmpeg -i source.mp4 -vf "scale=1920:-2" -ss 00:00:02 -frames:v 1 -q:v 2 \
  public/assets/video/hero-poster.jpg
```

## Deploy

### Vercel (recommended)

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Framework will auto-detect as **Next.js** (config in `vercel.json`).
4. Build command: `next build` · Output: `.next` · Install: `npm install`.
5. No environment variables required.
6. First deploy publishes immediately. Add your custom domain in Project Settings → Domains.

### Netlify

1. Connect the repo.
2. Build command: `next build` · Publish directory: `.next`.
3. Install the `@netlify/plugin-nextjs` plugin (Netlify auto-suggests it).

### Any Node host

1. `npm install`
2. `npm run build`
3. `npm run start` (defaults to port 3000, override with `PORT=80 npm run start`).

## Configuration

`next.config.mjs` includes:

- React strict mode + production source maps off
- AVIF/WebP image formats with sensible device size set
- Long cache (`max-age=31536000, immutable`) on fonts, video, and logo
- Security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy)

`app/layout.jsx` sets the canonical site URL (`https://solarisstudios.co.in`).
Change there if you move domains, then redeploy.

## Contact

The contact form opens WhatsApp (`https://wa.me/919187416656`) with the form data
prefilled. No backend required. Update `studio.whatsappNumber` in `lib/data.js`
to change the destination.

## What this stack does NOT include

- Database
- Auth
- API routes (everything is static)
- Analytics — add Plausible, Vercel Analytics, or GA4 yourself if needed
- A CMS — copy lives in `lib/data.js` and the page JSX
