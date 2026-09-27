/**
 * legacy.ts - the ONLY permitted copy on this site.
 *
 * Every editorial string rendered by the Astro application is declared here,
 * transcribed verbatim from the LIVE origin at https://lseat.eu. Pages read on
 * 2026-09-27: /, /passenger-benefits, /airline-benefits, /compliances, /news and
 * /contact. Nothing is written, reworded, condensed, corrected or embellished.
 *
 * WHAT THE LIVE ORIGIN DOES NOT CONTAIN, and what is therefore absent here:
 *   - no Supplemental Type Certificate. /compliances reads "LSEAT is supplied with
 *     a FORM 1 and PART 21 J engineering work." and no certificate of that kind is
 *     named anywhere. There is no kit height either: /compliances reads "Kit size
 *     stays within tolerances of seat TSO" and states no measurement of any kind.
 *   - no angles and no travel values. No recline angle in degrees and no
 *     millimetre travel figure appears anywhere on the origin. None is reproduced
 *     here. The four MODE NAMES are sourced - /passenger-benefits names them:
 *     sitting, "IFE watching", "relax reading" and sleep mode - so the names are
 *     kept, inside the sentence that names them, and the numbers stay out.
 *
 * RETAINED SOURCE TYPOS AND DEFECTS
 * ---------------------------------
 * The origin text carries the following defects. They are reproduced character
 * for character, including the runs of consecutive spaces, because the owner
 * instructed an exact mirror and instructed that malformed content is not to be
 * dropped:
 *
 *   compnents         /compliances, PART 21G production sentence
 *   subcontracters .  /compliances, space before the final full stop
 *   elected.by        /passenger-benefits, missing space after the full stop
 *   Econonomy         /airline-benefits, in "any Econonomy existing seats"
 *   nost change       /airline-benefits, in "does nost change"
 *   Hnet profit       /airline-benefits, in "Hnet profit comes"
 *   pre cabin         /airline-benefits, in "passenger density pre cabin"
 *   payed             /airline-benefits, "Monthly rental fee payed back"
 *   maitenance        /airline-benefits, "No maitenance nor cabin crew training"
 *   reaseach          /news, "Abstract Medical reaseach thrombose in aviation"
 *   4.656             /news, "1 Thrombose/4.656 pax"
 *   fundation         /news, "Dutch Thrombose fundation petition"
 *   on any aircraft   /compliances, "adaptable to most seat types on any aircraft"
 *   double spaces     several places; see VERBATIM_SPACES below
 *
 * A short HTML comment at each call site in the components repeats this note
 * where the affected text is rendered.
 *
 * This file is deliberately ASCII-only: the copyright sign and the non-breaking
 * spaces are written as \u escapes so the source cannot acquire mojibake.
 */

/** Rendered on every verbatim text node so the origin's double spaces survive. */
export const VERBATIM_CLASS = 'verbatim';

/* ------------------------------------------------------------------ *
 * Navigation - / , as published on every origin page
 * ------------------------------------------------------------------ */

export const siteNav = [
  { label: 'Home', href: '#hero' },
  { label: 'Passenger Benefits', href: '#passenger-benefits' },
  { label: 'Airline benefits', href: '#airline-benefits' },
  { label: 'Compliances', href: '#compliances' },
  { label: 'NEWS', href: '#news' },
  { label: 'Contact', href: '#contact' },
] as const;

/* ------------------------------------------------------------------ *
 * Home - /
 * ------------------------------------------------------------------ */

export const homeHeadline = 'LSEAT inserts sleep mode on existing  Economy  seats pitch and cabin';
export const homeLink = 'See Flyer';

/* ------------------------------------------------------------------ *
 * Hero figures
 *
 * All four are lifted verbatim out of the live /compliances page. No unit is
 * converted, no thousands separator is added, and no figure the origin does not
 * state is introduced.
 * ------------------------------------------------------------------ */

export const heroFigures: ReadonlyArray<{ label: string; value: string }> = [
  { label: 'Kit weight', value: '1650 grams' },
  { label: 'Installation time', value: 'less than 15 minutes' },
  { label: 'A.O.G', value: 'no A.O.G time' },
  { label: 'A spring system', value: '16G compliance' },
];

/* ------------------------------------------------------------------ *
 * /passenger-benefits
 * ------------------------------------------------------------------ */

export interface OriginGroup {
  heading: string;
  statements: readonly string[];
}

export const passengerBenefits: readonly OriginGroup[] = [
  {
    heading: 'Upgrade passenger comfort with LSEAT',
    statements: [
      'Sleep is the main concern for 80 % passengers traveling long-haul',
      "Most Economy passengers don't want or cannot afford to pay upgrade class costs, but they accept to pay some more for justified comfort improvement.",
      'Each chosen mode is individual and does not affect mode chosen by the others',
    ],
  },
  {
    heading: 'Advantages for anyone any size',
    statements: [
      'For any passenger above average tall size, spend a flight with knees knocking on the back of the seat in front of him is a torture.',
      'Whatever tall, and 2 meters or up, passenger can extend or cross his legs below the seat in front of him.',
      'Table recline for meals is not affected.',
    ],
  },
  {
    heading: 'Intermediate positions',
    statements: [
      'Between sitting and sleep mode,  "IFE watching" and "relax reading"  dedicated positions can be elected.by body weight motion',
      'LSEAT cushions motion adds to existing recline.',
      'Not any other seat function is affected by the LSEAT modification.',
    ],
  },
];

/* ------------------------------------------------------------------ *
 * /airline-benefits
 * ------------------------------------------------------------------ */

export const airlineBenefits: readonly OriginGroup[] = [
  {
    heading: 'No investment',
    statements: [
      'LSEAT is rented',
      'Zero investment is  required.',
      'No risk, as after six months a contract exit is possible at no charge',
      "Monthly rental fee payed back with first day additional revenue earned with low ticket price mark-up. Hnet profit comes  with the next one's.",
    ],
  },
  {
    heading: 'Improve existing seats and cabin',
    statements: [
      'LSEAT inserts on any Econonomy existing seats, pitch and cabin.',
      'Cost per passenger "LSEATed" does nost change, as passenger  density pre cabin does not change.',
      "Increase LSEAT's to adapt  demand is fast.",
    ],
  },
  {
    heading: 'Operational features',
    statements: [
      'Installation or removal takes less than 15 minutes per seat and no AOG.',
      'Seat and cabin certification integrity are maintained.',
      'Minor Modification procedure as kit is within TSO tolerances.',
      'No maitenance nor cabin crew training needed.',
    ],
  },
];

/* ------------------------------------------------------------------ *
 * /compliances
 * ------------------------------------------------------------------ */

/** First statement of the /compliances "Technical issues" group, reused as the
 *  structured-data description. */
export const retrofitStatement =
  'Our retrofit kit is adaptable to most seat types on any aircraft. It inserts without  seat or cabin modification, respecting strictly cabin certification integrity.';
export const technicalTitle = 'Technical aspects';
export const technicalLead = 'Full compliance with FAA and EASA regulations';

export const technicalGroups: readonly OriginGroup[] = [
  {
    heading: 'Kit content',
    statements: [
      'Two thin composite frames are inserted between the seat frame and the seat cushion. The upper one slides forwards and downwards on its frontal part.',
      'Vertical back cushion motion is  synchronised.',
    ],
  },
  {
    heading: 'Compliance',
    statements: [
      'A spring system maintains unoccupied seats sitting position to comply with 16G compliance.',
      'Kit size stays within tolerances of seat TSO',
      'Kit weight is below 1650 grams to stay within the 5 KG weight tolerance for three seats fitted on two floorlegs.',
    ],
  },
  {
    heading: 'Technical issues',
    statements: [
      'LSEAT is supplied with a FORM 1 and PART 21 J engineering work. Production and compnents are in hands of PART 21G subcontracters .',
      'Our retrofit kit is adaptable to most seat types on any aircraft. It inserts without  seat or cabin modification, respecting strictly cabin certification integrity.',
      'Installation time takes less than 15  minutes per seat need no A.O.G time.',
    ],
  },
];

/* ------------------------------------------------------------------ *
 * /news
 *
 * The origin links four PDFs. This site hosts two of them. The two that are
 * named here but carry no href are the entries we cannot supply; they are
 * rendered as text, never as a link to a file that does not exist.
 * ------------------------------------------------------------------ */

export interface OriginItem {
  title: string;
  subtitle?: string;
  href?: string;
  download?: string;
}

export const newsItems: readonly OriginItem[] = [
  {
    title: 'AIRCRAFT CABIN MANAGEMENT publication Sept 2025',
  },
  {
    title: 'IN FLIGHT Publication',
    href: '/docs/LSEAT-Inflight-Magazine.pdf',
    download: 'LSEAT-Inflight-Magazine.pdf',
  },
  {
    title: 'Abstract Medical reaseach thrombose in aviation',
    subtitle: 'Avoid 1 Thrombose/4.656 pax due to 4+ hours flights',
  },
  {
    title: 'Dutch Thrombose fundation petition',
  },
];

/** Brochure, linked from the home page as "See Flyer" on the origin. */
export const brochureHref = '/docs/LSEAT-Brochure-2025.pdf';
export const brochureDownload = 'LSEAT-Brochure-2025.pdf';
export const downloadLabel = 'Download PDF';

/* ------------------------------------------------------------------ *
 * /contact
 * ------------------------------------------------------------------ */

export const contactTitle = 'LSEAT - Contact';
export const contactLead = 'Send us an Email';

export const formNameLabel = 'Name';
export const formEmailLabel = 'Email';
export const formRequiredMark = '*';
export const formSubmitLabel = 'Send';

export const companyName = 'LSEAT Engineering Srl';
export const directEmail = 'yh@lseat.eu';
export const phoneDigits = '+32473987988';
export const phoneDisplay = '+32\u00A0473\u00A098\u00A079\u00A088';

/**
 * Address. The origin writes "15, av. Arnaud Fraiteur, 1050 BRUSSELS (Belgium)".
 * The owner has confirmed the correct form and that form is what is published
 * here; the origin's rendering is superseded.
 */
export const addressLines: readonly string[] = [
  '15/23 Avenue Arnaud Fraiteur',
  '1050 Brussels',
  'Belgium',
];

/* ------------------------------------------------------------------ *
 * Footer
 * ------------------------------------------------------------------ */

/** Reproduced exactly as the origin prints it, sign included. */
export const copyright = 'Copyright \u00A9 2024 Lseat - All Rights Reserved.';