# Nabeel & Nidha — Luxury Wedding Invitation

A refined, responsive single-page wedding invitation built with React, Vite, Tailwind CSS, and Framer Motion.

## Included

- Luxury black-and-gold visual language, glass surfaces, floating particles, loading screen, and scroll indicator
- RSVP acknowledgement flow, countdown, gallery lightbox, venue map, optional background music, and SEO metadata
- Responsive layouts for phones through large screens

## Run locally

```bashn
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Customise

Edit the wedding date at the top of `src/main.jsx`, then update couple names, venue details, timeline, and gallery URLs in the same file. The RSVP is front-end only; connect the submit handler to your preferred provider (Formspree, Supabase, or an API) before publishing.

## Deployment

The app is static and deploys directly to Vercel, Netlify, Cloudflare Pages, or GitHub Pages after `npm run build`. Upload the generated `dist` folder where required.
