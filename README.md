# Ride

Private chauffeur service site for the UAE. React 19, Vite, Tailwind CSS v4.

## Development

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: local dev server with HMR
- `npm run build`: production build to `dist`
- `npm run preview`: preview the production build
- `npm run lint`: run Oxlint

## Images

Real photography is not bundled in this repo. Drop files into `public/images/` with these exact names and the site will pick them up automatically, no code changes needed:

- `public/images/hero.jpg`: full-bleed hero background, landscape, roughly 2400x1600
- `public/images/fleet.jpg`: vehicle or interior detail shot for the fleet section, roughly 1600x1200
- `public/images/og.jpg`: social share preview image, roughly 1200x630

If a file is missing, its section falls back to the dark token-based background rather than showing a broken image.

## Deploying to Cloudflare Pages

This is a static Vite build, so it deploys to Cloudflare Pages' free tier as-is, no extra config needed.

**Option A: Dashboard (connect Git)**

1. Push this repo to GitHub.
2. Cloudflare dashboard: Workers & Pages, Create, Pages, Connect to Git, select the repo.
3. Set build command to `npm run build` and output directory to `dist`.
4. Deploy: you'll get a `*.pages.dev` URL.

**Option B: CLI (no Git connection needed)**

```bash
npm run build
npx wrangler pages deploy dist
```
