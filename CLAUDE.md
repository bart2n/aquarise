# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page marketing/landing site for the **Binghatti Skyflame** real estate
development (DP Real Estate). Vite + React 19 frontend with a small Express
backend whose only job is capturing inquiry-form leads (save to MySQL + email the
sales manager).

## Commands

- `npm run dev` — Vite dev server (frontend only). Proxies `/api` → `http://localhost:5000`, so run the backend too if testing the form.
- `npm run server` (alias `npm start`) — Express backend on `PORT` (default 5000); serves the built `dist/` and the `/api` routes.
- `npm run build` — production build to `dist/`.
- `npm run preview` — preview the production build.
- `npm run lint` — ESLint (flat config, `eslint.config.js`). There is no test suite.

## Architecture

**Frontend is essentially one file: `src/App.jsx` (~1700 lines).** It holds every
section (nav, hero, towers, units, amenities, location, inquiry form, footer),
all modals (`CollectionModal`, `CategoryPlansModal`, `PhoneModal`, `LegalModal`),
and the page data. There is no router and no component directory — sections are
plain `<section id="...">` blocks navigated via `scrollToSection` (smooth scroll
to anchors). `main.jsx` just mounts `<App>`.

**Content is hardcoded as in-file constants**, not fetched: `collections` (the two
towers), `unitTypes` (studio / 1BR / 2BR floor plans), `amenities`, and
`contactInfo`. To change tower stats, unit plans, phone/email, or legal copy, edit
these literals in `App.jsx` — do not look for a CMS or API.

**Assets** live in `public/` and are referenced with `` `${import.meta.env.BASE_URL}<file>` ``
(e.g. `bg1.jpg`…`bg10.jpg` for the hero slideshow, `studioN.png` / `NbedroomN.png`
for floor plans). `vite.config.js` sets `base: './'` so the build uses relative
paths and can be hosted from a subdirectory.

**Backend (`server.js`)** exposes two routes under `/api`:
- `GET /api/features` — returns a hardcoded array (legacy/compat; the frontend does not use it).
- `POST /api/lead` — dedupes by email/phone against the `leads` table, inserts the lead, then fires a notification email via nodemailer (email send is not awaited). Schema is in `db.sql` (database `skyflame`, table `leads`).

### Important mismatch to be aware of

The inquiry form in `App.jsx` POSTs to **`` `${import.meta.env.BASE_URL}api/lead.php` ``**
(a PHP endpoint), but `server.js` implements the lead route at **`/api/lead`** (Node).
The two do not line up. This implies a separate PHP deployment target for the form,
or the form/backend has drifted. If you touch lead submission, reconcile these
two endpoints rather than assuming the Express route is what production hits.

## Stack notes

- **Tailwind v4** via the `@tailwindcss/vite` plugin (no `tailwind.config.js`; configured in `vite.config.js`). Heavy use of arbitrary values and the orange accent (`orange-500`) on a black theme.
- **framer-motion** drives the animations (`FadeIn` on-scroll wrapper, `AnimatePresence` modals, hero parallax via `useScroll`/`useTransform`).
- **lucide-react** for icons.
- `deno.lock` + Netlify edge entries indicate Netlify-based hosting.

## Backend environment variables

`server.js` reads from `.env` (gitignored): `PORT`, `DB_HOST`, `DB_USER`,
`DB_PASSWORD`, `DB_NAME`, `DB_PORT`, `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_SECURE`,
`EMAIL_USER`, `EMAIL_PASS`, `MANAGER_EMAIL`.
