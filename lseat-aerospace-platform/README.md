# LSEAT

A strict verbatim mirror of the LIVE origin site at <https://lseat.eu>, with a
modernised technical design. The site carries **only** text read from the origin.

## Content provenance

Every editorial string is declared in `src/legacy.ts` and rendered from there.
Nothing is written, reworded, condensed or embellished. If a string is not on the
origin, it is not on this site.

| Origin page | Transcribed content |
| --- | --- |
| `/` | The headline, the `See Flyer` brochure link, and the navigation |
| `/passenger-benefits` | Head, three sub-headings and their bullets |
| `/airline-benefits` | Head, three sub-headings and their bullets |
| `/compliances` | `Technical aspects`, the lead, and `Kit content` / `Compliance` / `Technical issues` |
| `/news` | Four entries; two are hosted here, two are not |
| `/contact` | `LSEAT - Contact`, `Send us an Email`, the form fields, the company details |
| Footer | `Copyright (c) 2024 Lseat - All Rights Reserved.` |

Pages were read on 2026-09-27. Re-reading the origin is the only way to refresh
this content.

### What the origin does not state, and is therefore absent

- **No Supplemental Type Certificate.** The origin reads `LSEAT is supplied with
  a FORM 1 and PART 21 J engineering work.` No certificate of that kind is named.
- **No kit height.** The origin reads `Kit size stays within tolerances of seat
  TSO` and states no measurement of any kind.
- **No angles and no travel values.** The origin publishes neither. The four mode
  names it *does* publish on `/passenger-benefits` - sitting, `"IFE watching"`,
  `"relax reading"` and sleep mode - are kept, inside the sentence that names
  them, with no number attached.

### Retained source typos and defects

The origin text carries defects that are reproduced character for character,
including runs of consecutive spaces, because the owner instructed an exact
mirror and instructed that malformed content is not dropped: `compnents`,
`subcontracters .`, `elected.by`, `Econonomy`, `nost change`, `Hnet profit`,
`pre cabin`, `payed`, `maitenance`, `reaseach`, `4.656`, `fundation`,
`on any aircraft`, and the double spaces in several sentences. A short HTML
comment at each call site records which statements carry them.

### The address

The origin writes `15, av. Arnaud Fraiteur, 1050 BRUSSELS (Belgium)`. The owner has
confirmed the correct form and that is what is published here: **15/23 Avenue
Arnaud Fraiteur, 1050 Brussels, Belgium**. The origin's rendering is superseded.

## Company

| | |
| --- | --- |
| Brand | LSEAT |
| Legal entity | LSEAT Engineering Srl |
| Email | yh@lseat.eu |
| Phone | +32 473 98 79 88 |
| Address | 15/23 Avenue Arnaud Fraiteur, 1050 Brussels, Belgium |
| Web | https://lseat.eu |

`contact@lseat.eu` is **not** on the origin and is not published here.

## Tech stack

- **Astro 4** - static-first framework, zero client framework runtime
- **Tailwind CSS 3.4** - design tokens (deep-navy, slate-dark, aero-blue,
  electric-cyan, titanium-gray) and component classes (`.glassmorphism`,
  `.btn-primary`, `.input-field`, `.badge-tech`, `.badge-cert`, ...)
- **TypeScript 5.9** - strict typing, validated with `astro check`
- **Web3Forms** - serverless contact pipeline (honeypot)

## Project structure

```
lseat-aerospace-platform/
|-- public/                     # favicon.svg, logo-lseat.png, og-image.{svg,png}, media/, docs/
|-- src/
|   |-- legacy.ts               # THE ONLY PERMITTED COPY
|   |-- components/             # Hero, OriginGroups, TechnicalAspects, News, ContactForm, Header, Footer
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

## Unreferenced assets

`public/media/` holds eight recovered photographs and a mechanism drawing, and
`public/docs/` holds two PDFs. All eight images are unreferenced: the origin
publishes no caption for any of them, and the origin does not use the drawing, so
publishing them would require inventing alt text, and the drawing carries
recline-angle callouts the origin itself no longer states.

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

The origin also prints a Google reCAPTCHA notice on its contact page. reCAPTCHA is
**not** enabled on this deployment, so that sentence is not reproduced here; it
would be an unsourced protection claim. Web3Forms can enable reCAPTCHA v3 from its
own dashboard with the same access key.

## Deployment

The site builds to a fully static bundle in `dist/`. `npm run build` is the only
required command. Output directory `dist`, Node >= 22. `dist/` is git-ignored and
must not be committed.