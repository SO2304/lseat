# LSEAT

A strict verbatim mirror of the legacy LSEAT site, with a modernised technical
design. The site carries **only** text recovered from three archived sources.

## Content provenance

Every editorial string rendered by the application is declared in
`src/legacy.ts` and rendered from there. Nothing on the site is written, reworded,
condensed or embellished. If a string is not in the three sources below, it is not
on the site.

| Source | Capture | What survives |
| --- | --- | --- |
| Homepage | Wayback, 2020-09-21 | Tagline, the nine-item navigation, the contact line, `yh@lseat.eu`, `+32 473 987 988`, an `Email*` / `Send` form, the line `LSEAT Cy` |
| `/compliances` | Wayback, 2025-07-20 | The only substantive technical text: `Technical aspects`, `Kit content`, `Compliance`, `Technical issues` and their statements |
| Brochure | 2025 | The headline and marketing statements listed in `src/legacy.ts` |

### Deliberately retained source typos

The 2025-07-20 capture carries three defects. They are reproduced character for
character because the owner instructed a verbatim mirror, and a short HTML comment
at the call site in `src/components/TechnicalAspects.astro` records the fact:

- `compmnents` (source spelling)
- `staying within` in "to staying within tolerances" (source grammar)
- the space before the final full stop in `subcontracters .`

### Deliberately removed

The v5.0 site carried a large amount of copy that appears in none of the three
sources. All of it is gone, including the four-position kinematic table and every
angle and travel value, the twelve-row technical specification table, the archive
permalinks and the manufacturer-data attribution apparatus, the `-75 %` maintenance
cost claim, the standalone `0 W` / `0 motors` / `3 moving sub-parts` claims, the
converted `0.5 in (12.7 mm)` figure, both YouTube embeds and their captions, the
restored-records photo grid with its eight photographs, and the brochure and
Inflight download cards.

## Company

| | |
| --- | --- |
| Brand | LSEAT |
| Company line | LSEAT Cy |
| Direct | yh@lseat.eu |
| General | contact@lseat.eu |
| Phone | +32 473 98 79 88 |
| Address | 15/23 Avenue Arnaud Fraiteur, 1050 Brussels, Belgium |
| Web | https://lseat.eu |

## Tech stack

- **Astro 4** - static-first framework, zero client framework runtime
- **Tailwind CSS 3.4** - design tokens (deep-navy, slate-dark, aero-blue,
  electric-cyan, titanium-gray) and component classes (`.glassmorphism`,
  `.btn-primary`, `.input-field`, ...)
- **TypeScript 5.9** - strict typing, validated with `astro check`
- **Web3Forms** - serverless contact pipeline (honeypot)

## Project structure

```
lseat-aerospace-platform/
|-- public/                     # favicon.svg, logo-lseat.png, og-image.{svg,png}, media/, docs/
|-- src/
|   |-- legacy.ts               # THE ONLY PERMITTED COPY
|   |-- components/             # Hero, Concept, Benefits, TechnicalAspects, ContactForm, Header, Footer
|   |-- layouts/BaseLayout.astro
|   |-- pages/index.astro       # single page
|   `-- styles/global.css       # Tailwind layers: base / components / utilities
|-- scripts/generate-og.mjs
|-- astro.config.mjs            # Astro + Tailwind, site = https://lseat.eu
|-- tailwind.config.mjs         # design tokens
|-- postcss.config.cjs
|-- tsconfig.json
`-- package.json
```

`public/media/` still holds the eight recovered photographs and the mechanism
drawing. They are unreferenced: the legacy sources contain no caption for any of
them, and the drawing itself carries the recline-angle callouts that the purge
removes, so publishing it would reintroduce the deleted figures as pixels.

## Setup

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static build to ./dist
npm run preview
npm run check      # astro check (TypeScript + Astro diagnostics)
npm run og         # regenerate public/og-image.png from public/og-image.svg
```

Node.js >= 22 is required.

### Build tooling notes

The `overrides` block in `package.json` is load-bearing. Do not delete it.

| Override | Why it exists |
| --- | --- |
| `sitemap` | `@astrojs/sitemap@2.x` floats `sitemap` to a version that rejects the absolute `destinationDir` Astro 4 passes at build time. |
| `esbuild` | Security fix for the bundler. Build-time only. |
| `sharp` | Pins `sharp` to the single declared devDependency. Build-time only. |

`@astrojs/sitemap` is deliberately held at `2.x`: version `3.x` registers a
listener for the `astro:routes:resolved` hook, which only exists in Astro 5.

## Environment variables

Copy the template and add the Web3Forms access key:

```bash
cp .env.example .env
```

```ini
PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key_here
```

This is a **public client-side** key. The form posts directly from the browser to
`https://api.web3forms.com/submit` and carries a hidden `botcheck` honeypot.
Never add secrets to a `PUBLIC_*` variable.

## Deployment

The site builds to a fully static bundle in `dist/`. `npm run build` is the only
required command. Output directory `dist`, Node >= 22.