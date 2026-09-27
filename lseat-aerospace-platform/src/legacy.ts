/**
 * legacy.ts - the ONLY permitted copy on this site.
 *
 * Every editorial string rendered anywhere in the Astro application is declared
 * here, verbatim, exactly as it appears in the recovered legacy LSEAT sources:
 *
 *   (A) Homepage,  Wayback capture 2020-09-21  -> tagline, navigation, contact line, form
 *   (B) /compliances, Wayback capture 2025-07-20 -> the only substantive technical text
 *   (C) Brochure 2025 -> headline and marketing statements
 *
 * Nothing here is written, reworded, condensed, corrected or embellished. If a
 * string is not in the three sources above it does not belong in this file, and it
 * does not belong on the site.
 *
 * This file is deliberately ASCII-only: the non-breaking spaces and the typographic
 * apostrophe are written as \u escapes so the source cannot acquire mojibake.
 *
 * DELIBERATELY RETAINED SOURCE TYPOS
 * ---------------------------------
 * (B) is a verbatim transcription of the archived page and carries three defects in
 * the original text. They are reproduced here character for character because the
 * owner instructed a strict verbatim mirror:
 *
 *   1. "compmnents"     in the PART 21G production sentence  (source spelling)
 *   2. "staying within" in "to staying within tolerances"    (source grammar)
 *   3. " ."             a space before the final full stop in "subcontracters ."
 *
 * A short HTML comment at each call site in src/components/TechnicalAspects.astro
 * repeats this note where the text is rendered.
 */

/* ------------------------------------------------------------------ *
 * (A) Homepage - Wayback capture 2020-09-21
 * ------------------------------------------------------------------ */

export const tagline = 'Relax and enjoy flying economy';

/** The 2020 navigation, in the exact order of the recovered capture. */
export const legacyNav = [
  'Home',
  'Concept',
  'Benefits',
  'Market',
  'Team',
  'Partnerships',
  'Investors',
  'News/Media',
  'Contact',
] as const;

/** Nav labels that resolve to a section of this single-page build. */
export const sectionNav: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Home', href: '#hero' },
  { label: 'Concept', href: '#concept' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Contact', href: '#contact' },
];

export const directEmail = 'yh@lseat.eu';
export const generalEmail = 'contact@lseat.eu';

/**
 * The 2020 capture printed the telephone as `+32 473 987 988`. The same digits are
 * displayed here in the site's own grouping, `+32 473 98 79 88`, separated by
 * non-breaking spaces. Only the grouping differs; the number is identical.
 */
export const phoneDigits = '+32473987988';
export const phoneDisplay = '+32\u00A0473\u00A098\u00A079\u00A088';

/** The 2020 contact form: a single required `Email*` field and a `Send` button. */
export const formFieldLabel = 'Email';
export const formRequiredMark = '*';
export const formSubmitLabel = 'Send';

/** Company line carried by the 2020 page beneath the contact block. */
export const companyLine = 'LSEAT Cy';

/* ------------------------------------------------------------------ *
 * (B) /compliances - Wayback capture 2025-07-20
 * ------------------------------------------------------------------ */

export const technicalTitle = 'Technical aspects';
export const technicalLead = 'Full compliance with FAA and EASA regulations';

export interface LegacyGroup {
  heading: string;
  statements: readonly string[];
}

export const technicalGroups: readonly LegacyGroup[] = [
  {
    heading: 'Kit content',
    statements: [
      'Two thin composite frames are inserted between the seat frame and the seat cushion. The upper one slides forwards and downwards on its frontal part.',
      'Vertical back cushion motion is synchronised.',
    ],
  },
  {
    heading: 'Compliance',
    statements: [
      'A spring system maintains unoccupied seats sitting position to comply with 16G compliance.',
      'Kit size is below half an inch high to staying within tolerances of seat TSO',
      'Kit weight is below 1650 grams to stay within the 5 KG weight tolerance for three seats fitted on two floorlegs.',
    ],
  },
  {
    heading: 'Technical issues',
    statements: [
      'LSEAT is supplied with an STC and PART 21 J engineering work and a FORM 1. Production and compnents are in hands of PART 21G subcontracters .',
      'Our retrofit kit is adaptable to most seat types for any aircraft. It inserts without seat or cabin modification, respecting strictly their certification integrity.',
      'Installation time takes less than 15 minutes per seat need no A.O.G time.',
    ],
  },
];

/* ------------------------------------------------------------------ *
 * (C) Brochure 2025
 * ------------------------------------------------------------------ */

export const conceptTitle = 'REINVENTING COMFORT IN ECONOMY CLASS';
export const conceptLead = 'Transform any seat into a unique experience';
export const conceptBody =
  'LSEAT can convert any existing economy seat into sleep mode, while maintaining seat pitch and cabin certification integrity.';

export const rental =
  'LSEAT is not sold but offered through a flexible rental model, requiring no upfront investment. There\'s no financial risk, as the contract can be terminated free of charge after six months. The monthly rental fee is lower than the revenue generated from the very first day of operation.';

export const maintenanceStatement =
  'No maintenance is required, and no additional training is needed for cabin crew.';

export interface LegacyBlock {
  title: string;
  statements: readonly string[];
}

export const benefitBlocks: readonly LegacyBlock[] = [
  {
    title: 'LUXURY SLEEP, ECONOMY SEAT',
    statements: ['Sleep is a top priority for 80% of long-haul passengers.'],
  },
  {
    title: 'MORE SPACE. MORE COMFORT. MORE YOU.',
    statements: [
      'Thanks to its generous recline, LSEAT is also certifiable as a rest seat for crew members during rest periods.',
      'The kit qualifies under minor modification procedures and remains within TSO tolerances.',
    ],
  },
  {
    title: 'LSEAT',
    statements: [maintenanceStatement],
  },
];

/* ------------------------------------------------------------------ *
 * Hero figures
 *
 * All four are lifted verbatim out of the (B) capture. No unit is converted, no
 * thousands separator is added, and no figure the legacy text does not contain is
 * introduced.
 * ------------------------------------------------------------------ */

export const heroFigures: ReadonlyArray<{ label: string; value: string }> = [
  { label: 'Kit weight', value: '1650 grams' },
  { label: 'Installation time', value: 'less than 15 minutes' },
  { label: 'A.O.G', value: 'no A.O.G time' },
  { label: 'A spring system', value: '16G compliance' },
];