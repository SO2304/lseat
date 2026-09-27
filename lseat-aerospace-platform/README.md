# LSEAT Aerospace - B2B Platform

Aerospace-grade B2B website for LSEAT Aerospace (lseat.eu): a 3-seat ergonomic sleep-mode
conversion kit for economy cabins, offered to airlines, MROs, OEMs and certification
authorities through a rental model with no upfront investment.

## Company

| | |
| --- | --- |
| Legal entity | **LSEAT ENGINEERING SRL** (Belgium) |
| Brand | **LSEAT Aerospace** |
| B2B engineering | contact@lseat.eu |
| Direct | yh@lseat.eu |
| Phone | +32 473 98 79 88 |
| Address | 15/23 Avenue Arnaud Fraiteur, 1050 Brussels, Belgium |
| Web | https://lseat.eu |

## Commercial model - rental, not sale

LSEAT is not sold. It is offered through a flexible rental model that requires no upfront
investment. There is no financial risk, because the contract can be terminated free of
charge after six months. The monthly rental fee is lower than the revenue generated from
the very first day of operation. No maintenance is required, and no additional training is
needed for cabin crew.

## Tech stack

- **Astro 4** - static-first framework, zero client framework runtime
- **Tailwind CSS 3.4** - design tokens (deep-navy, aero-blue, electric-cyan, titanium-gray) and
  component classes (`.glassmorphism`, `.btn-primary`, `.input-field`, `.toast`, ...)
- **TypeScript 5.9** - strict typing, validated with `astro check`
- **Web3Forms** - serverless B2B contact pipeline (honeypot + optional reCAPTCHA v3)
- **No React, no CDN** - everything ships in the Astro bundle

## Engineering values

These figures are the commercial and technical contract of the kit. They are displayed
verbatim across the site.

| Parameter | Value |
| --- | --- |
| Integrated kit mass | **< 1,650 g** for a 3-seat block |
| Mass on 2 seat-track legs | **< 5 kg** |
| Electrical draw | **0 W** - fully mechanical |
| Retrofit time | **< 15 min** per seat, MRO line |
| Aircraft-on-ground impact | **0 h** - no aircraft on ground |
| Dynamic certification | **16G**, CS-25 / FAR-25 |
| Cabin sleep recline | **40°** |
| Direct maintenance cost | **-75 %** |
| Conformity release | **EASA Form 1**, on request |
| Production basis | **EASA Part 21J** design organisation |

## Sources and data provenance

Two sources are used, and they are kept deliberately distinct.

**1. LSEAT published technical data** - `lseat.eu/compliances`, captured 20 July 2025,
archived at <https://web.archive.org/web/20250720023516/>. The live page is no longer
available on the current platform, so the archive permalink is part of the citation: a reviewer
must be able to open the capture and read the wording. This is the stronger of the two sources,
because it is LSEAT's own published technical page rather than released-on-request engineering
data. It supports the kit mass `< 1,650 g` for a 3-seat block, the `< 5 kg` load on 2
seat-track legs, the `< 15 min` per-seat installation time with no A.O.G. time, the sub-half-inch
kit profile, the spring return of an unoccupied seat to its sitting position, the STC /
Part 21J engineering work / FORM 1 supply, and Part 21G subcontracted production.

The capture does **not** contain the `40°` recline, the zero rear-pitch intrusion figure, the
`0 W` or no-actuator statement, any moving sub-part count, the `-75 %` direct maintenance cost
reduction, or a specific `CS-25.562` / `FAR-25.562` paragraph reference. It says only that the
kit complies with FAA and EASA regulations, and with 16G, generically. Those figures keep the
manufacturer provenance below and must not be attributed to the archived page.

**2. LSEAT manufacturer engineering data, released on request.** The remaining figures - the
`40°` recline, `0 h` AOG, `0 W`, the 3 moving sub-parts and the `-75 %` direct maintenance cost
reduction - are **LSEAT manufacturer engineering data, released with the EASA Form 1
documentation on request**. They are not published in any open dataset, and they are derived
neither from a public standard nor from the marketing material described below.

The **LSEAT 2025 brochure is a marketing publication, not a technical datasheet.** It
contains no masses, no G-loadings, no TSO numbers, no CS-25/FAR-25 references and no
recline angles. **No specification figure on this site may be attributed to the brochure.**
The brochure supports only the commercial statements quoted above: the rental model, the
absence of upfront investment, the six-month free termination, the absence of maintenance
and the absence of additional cabin-crew training.

The EASA Form 1 certificate of conformity is released on request to qualified operators,
MROs and certification authorities; it is not published as a static file on this website.
Nothing on this site constitutes an airworthiness approval, a maintenance release or a
certified modification instruction. Approved data is always issued through the applicable
Airworthiness Directive / certification process for the target aircraft type.

## Project structure

```
lseat-aerospace-platform/
|-- public/                     # favicon.svg, logo-lseat.png, og-image.{svg,png}, 2 PDFs, media/
|-- src/
|   |-- components/             # Astro UI sections (Hero, SpecsTable, ContactForm, ...)
|   |-- layouts/                # page shells (BaseLayout, Section wrappers)
|   |-- pages/                  # routes (index.astro, contact.astro)
|   |-- styles/global.css       # Tailwind layers: base / components / utilities
|   `-- env.d.ts                # Astro ambient types
|-- scripts/                    # one-off maintenance scripts (generate-og.mjs)
|-- astro.config.mjs            # Astro + Tailwind integration, site = https://lseat.eu
|-- tailwind.config.mjs         # design tokens and component classes
|-- postcss.config.cjs          # CommonJS: package.json has no "type": "module"
|-- tsconfig.json
|-- .env.example                # documented environment variables
`-- package.json
```

There is no `src/content/` directory and no `src/scripts/` directory.

`public/` holds: `favicon.svg`, `logo-lseat.png` (the owner-supplied brand artwork, 81x56),
`og-image.svg` / `og-image.png`, two PDFs (`LSEAT-Brochure-2025.pdf`,
`LSEAT-Inflight-Magazine.pdf`) and `public/media/`, which carries the 1920x1080 MVI_9553
hero loop (`.webm` + `.mp4` + poster), the 1280x720 Dubai Airshow interview (`.webm` +
poster) and eight delivery-optimised archival photographs and the mechanism drawing.
The old `logo.svg` was removed in v2.1: the PNG is the authentic brand asset and the SVG
was a lossy trace of it.

The legacy CDN harvest at `../lseat-legacy/cdn-harvest` holds 101 files. Of those, only 11
were copied in: 1 video, 1 poster, 1 PDF and 8 images. Rejected on purpose: the 33 Lato /
Montserrat / Playfair / Source-Sans webfonts (the site self-hosts a single variable
Plus Jakarta Sans woff2 and is verified against a font budget; shipping 33 more would
undo that work), the 34 GoDaddy builder scripts, the EASA/FAA "Compliant" logo graphic
(regulator marks presented as a product claim), two third-party medical papers on venous
thrombosis, a trade-magazine issue that is not an LSEAT document, an Unsplash stock cabin
photograph, a generic Boeing 787 press photo, an Embraer cabin photo, the LSEAT revenue
table, a placeholder PNG, and the duplicated `lseat_demo_10LR` / `lseat_demo_12` /
`blob-b6ecf59` variants of images already carried. `LSEAT - Brochure 2025_compressed.pdf`
is byte-identical (sha256 `23e89665f9608112...`) to the copy already in `public/`, so it
was not duplicated.

`vimeo-poster-1800172145.jpg` was also rejected: it is a still from the Dubai Airshow TV
interview and still carries the broadcaster's on-screen lower third.

## Setup

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:4321
npm run build      # static build to ./dist
npm run preview    # preview the production build
npm run check      # astro check (TypeScript + Astro diagnostics)
```

Node.js 18.17+ or 20+ is required (Astro 4 baseline).

## Build tooling notes

### `overrides` in package.json are load-bearing - do not delete them

| Override | Why it exists |
| --- | --- |
| `"sitemap": "7.1.2"` | `@astrojs/sitemap@2.x` floats `sitemap` to `7.1.3`, which rejects the absolute `destinationDir` that Astro 4 passes at build time. Removing this override breaks the build. |
| `"esbuild": "0.25.10"` | Security fix for the bundler. Build-time only, never shipped. |
| `"sharp": "$sharp"` | Pins `sharp` to the single version already declared in `devDependencies`. Build-time only, never shipped. |

`@astrojs/sitemap` is deliberately held at `2.x`. Version `3.x` registers a listener for the
`astro:routes:resolved` hook, which only exists in Astro 5 - on Astro 4 it crashes the build.

### `npm run og`

Regenerates `public/og-image.png` (1200x630) from `public/og-image.svg` via `sharp`
(`scripts/generate-og.mjs`). Run it only after editing the SVG. `npm run build` deliberately
does **not** depend on it: the PNG is committed, so the build stays free of image
processing and of the `sharp` native dependency.

## Environment variables

Copy the template and add the Web3Forms access key:

```bash
cp .env.example .env
```

```ini
PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key_here
```

- `PUBLIC_WEB3FORMS_KEY` is a **public client-side key** obtained from
  <https://web3forms.com>. The `PUBLIC_` prefix is what makes Astro expose it to the browser;
  the contact form posts directly to `https://api.web3forms.com/submit`.
- All submissions are routed to **contact@lseat.eu**.
- Anti-spam: the form includes a hidden `botcheck` honeypot. Google reCAPTCHA v3 can be enabled
  from the Web3Forms dashboard using the same access key.
- If the key is missing, the form degrades gracefully and directs the visitor to contact@lseat.eu.

Never add secrets to a `PUBLIC_*` variable.

## Deployment

The site builds to a fully static bundle in `dist/`. `npm run build` is the only required command.

**Cloudflare Pages**

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18 or 20 (set in the Pages project settings)
- Environment variables: add `PUBLIC_WEB3FORMS_KEY` under *Settings > Environment variables*
- Optional: redirect `lseat.eu` and `www.lseat.eu` to HTTPS, enable Always Use HTTPS and
  Auto Minify. No server-side adapter is required.

**Vercel**

- Framework preset: Astro (detected automatically)
- Build command: `npm run build`, output directory: `dist`
- Environment variables: add `PUBLIC_WEB3FORMS_KEY` for Production, Preview and Development
- Deploy previews are fully functional; the contact form posts to the same Web3Forms endpoint.

If the form is ever proxied through a serverless function instead, move the submission off the
client and keep the access key server-side. The current architecture is deliberately static.

## Known limitation and upgrade path

`astro@4.16.19` is the last 4.x release, and its dependency advisories are only resolved in
Astro 5+/7.x. `npm audit` therefore reports advisories that are **not exploitable in this
artifact**, and this is stated rather than hidden. The site is `output: 'static'`: there is
no runtime server, no middleware, no SSR and no `astro:assets` image pipeline, so the
vulnerable code paths are not present in the deployed `dist/` bundle. The residual exposure
is the local `astro dev` server only, which binds to localhost and is never deployed.

The upgrade path is a coordinated change - moving to Astro 5+ requires moving
`@astrojs/sitemap` to `3.x` in the same release, because `2.x` is pinned by the override
above. Until that is scheduled, the 4.x pin is a deliberate, documented trade-off.