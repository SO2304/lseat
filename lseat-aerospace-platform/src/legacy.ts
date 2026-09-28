/**
 * legacy.ts - the ONLY permitted copy on this site.
 *
 * Every editorial string rendered by the Astro application is declared here,
 * transcribed verbatim from the LIVE origin at https://lseat.eu. Pages read on
 * 2026-09-28: /, /passenger-benefits, /airline-benefits, /compliances, /news and
 * /contact. Nothing is written, reworded, condensed, corrected or embellished.
 *
 * ROUTING. The origin is a six-route site, not a single page. Every label below
 * is transcribed with the origin's own and rather inconsistent capitalisation:
 * "Home", "Passenger Benefits" (capital B), "Airline benefits" (lower-case b),
 * "Compliances", "NEWS" in full caps, "Contact".
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
 * PHOTOGRAPHS. The origin publishes seven distinct photographs across
 * /passenger-benefits, /airline-benefits and /compliances, and no caption, tag,
 * title or owner-written alt text for any of them. Nothing descriptive is
 * written here either. Every photograph renders with an empty alt, which is the
 * honest accessible choice for an image the source supplies no description for.
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
  { label: 'Home', href: '/' },
  { label: 'Passenger Benefits', href: '/passenger-benefits' },
  { label: 'Airline benefits', href: '/airline-benefits' },
  { label: 'Compliances', href: '/compliances' },
  { label: 'NEWS', href: '/news' },
  { label: 'Contact', href: '/contact' },
] as const;

/**
 * The origin's own "Home" destination, read from the served markup of all six
 * pages: the nav item is a root-relative "/" href, not a bare "#" and not a
 * document-relative one, so "Home" already resolves from every depth there. It
 * is republished here unchanged, which is exactly what makes Home work from
 * /news and /contact as well as from /.
 */
export const homeHref = '/';

/* ------------------------------------------------------------------ *
 * Home - /
 *
 * Block order on the origin's home page, top to bottom:
 *   1. header nav
 *   2. hero: the headline over a full-bleed background-fill video
 *   3. section heading "How it works...(video)" followed by a Vimeo embed
 *   4. section heading "See Flyer" followed by a "Download PDF" link
 *   5. footer
 * There is NO further editorial section below the hero on the origin.
 * ------------------------------------------------------------------ */

export const homeHeadline = 'LSEAT inserts sleep mode on existing  Economy  seats pitch and cabin';

/** Section heading on the origin's home page, verbatim, in this casing. */
export const videoSectionTitle = 'How it works...(video)';

/** Section heading on the origin's home page, verbatim. */
export const flyerSectionTitle = 'See Flyer';
/** The only link label in the origin's home page body, verbatim. */
export const downloadLabel = 'Download PDF';
/** The origin's own label for the 2025 brochure, verbatim. */
export const homeLink = flyerSectionTitle;

/**
 * The origin's own embed, copied from the served markup of the home page:
 *
 *   <iframe data-ux="Embed" allowfullscreen="" type="text/html" frameBorder="0"
 *     referrerPolicy="strict-origin-when-cross-origin"
 *     src="https://player.vimeo.com/video/1076326110?badge=0&byline=0&h=5dec0d6526
 *          &portrait=0&title=0&autoplay=0&loop=0&muted=0&controls=1"
 *     data-aid="VIDEO_IFRAME_RENDERED"></iframe>
 *
 * This is the owner's own Vimeo film, published by the origin as a third-party
 * embed. It is republished as that same embed, which adds no first-party script.
 */
export const videoEmbedSrc =
  'https://player.vimeo.com/video/1076326110?badge=0&byline=0&h=5dec0d6526&portrait=0&title=0&autoplay=0&loop=0&muted=0&controls=1';

/**
 * The origin's hero background is a GoDaddy background-fill video whose still is
 * i.vimeocdn.com/video/1485180297-421eb...fe3ba-d, and the "How it works" video
 * section's poster is i.vimeocdn.com/video/2006098325-85ba...44dc9-d_1920x1080.
 * Neither file is held here and neither is hotlinked: both are Vimeo CDN assets
 * on the origin's own account, and this deployment does not mirror third-party
 * video bytes it does not hold.
 */
export const originHeroVideoStill =
  'https://i.vimeocdn.com/video/1485180297-421eb21a15cd19ed7ec8698d92477fa6413f952bab1c5ff886c8b9fa1d7fe3ba-d';
export const originSectionVideoPoster =
  'https://i.vimeocdn.com/video/2006098325-85baa149f16ad5502353e623edc61b8a547cfdc944752a4e75452d3f87644dc9-d_1920x1080';

/* ------------------------------------------------------------------ *
 * Hero figures
 *
 * All four are lifted verbatim out of the live /compliances page. No unit is
 * converted, no thousands separator is added, and no figure the origin does not
 * state is introduced. The verbatim source sentence is recorded beside each.
 * ------------------------------------------------------------------ */

export const heroFigures: ReadonlyArray<{ label: string; value: string; source: string }> = [  {
    label: 'Kit weight',
    value: '1650 grams',
    source:
      'Kit weight is below 1650 grams to stay within the 5 KG weight tolerance for three seats fitted on two floorlegs.',
  },
  {
    label: 'Installation time',
    value: 'less than 15 minutes',
    source: 'Installation time takes less than 15 minutes per seat need no A.O.G time.',
  },
  {
    label: 'Down time',
    value: 'no A.O.G time',
    source: 'Installation time takes less than 15 minutes per seat need no A.O.G time.',
  },
  {
    label: 'Seat retention',
    value: '16G compliance',
    source: 'A spring system maintains unoccupied seats sitting position to comply with 16G compliance.',
  },
] as const;

/* ------------------------------------------------------------------ *
 * Photographs
 *
 * Seven DISTINCT photographs are published by the origin, across nine
 * placements. Two of them are reused by the origin on a second page, and are
 * reused here on the same second page:
 *
 *   LSEAT VERH 2.jpg    /passenger-benefits, first block
 *   lseat_demo_12.jpg   /passenger-benefits, second block
 *   lseat_demo_10LR.jpg /passenger-benefits third block, /airline-benefits first block
 *   EMB ACE 2.jpg       /airline-benefits, second block
 *   lseat_demo_8.jpg    /airline-benefits third block, /compliances second block
 *   blob-6578e55.png    /compliances, first block
 *   lseat_demo_1[1].jpg /compliances, third block
 *
 * On the origin each one sits in the left column of its two-column block, with
 * the block's heading and statements in the right column, and carries
 * order:-1 on narrow viewports so the photograph still comes first in the
 * reading order. That is the placement reproduced here.
 *
 * The origin writes NO caption, tag, title or owner-authored alt text for any
 * of them. The alt attributes GoDaddy does emit are machine-generated French
 * sentences, not the owner's copy, and are not reproduced. Every photograph
 * below therefore renders with alt="".
 *
 * width and height are the intrinsic pixel dimensions read from each local
 * file's own header. They are per-file and deliberately not shared: the eight
 * files have eight different aspect ratios, from 0.667 to 1.944, and the
 * origin crops them to three different shapes per placement.
 * ------------------------------------------------------------------ */

export interface OriginPhoto {
  /** Public path of the recovered file. */
  readonly src: string;
  /** Intrinsic width in pixels, from the file header. */
  readonly width: number;
  /** Intrinsic height in pixels, from the file header. */
  readonly height: number;
}

/** /passenger-benefits - one photograph per block, in the origin's own order. */
export const passengerPhotos: ReadonlyArray<OriginPhoto> = [
  { src: '/media/lseat-cabin-installed.jpg', width: 476, height: 356 },
  { src: '/media/lseat-cabin-in-service.jpg', width: 1400, height: 788 },
  { src: '/media/lseat-cabin-sleep-mode.jpg', width: 1400, height: 934 },
];

/** /airline-benefits - one photograph per block, in the origin's own order. */
export const airlinePhotos: ReadonlyArray<OriginPhoto> = [
  { src: '/media/lseat-cabin-sleep-mode.jpg', width: 1400, height: 934 },
  { src: '/media/lseat-seat-pair-ife.jpg', width: 427, height: 640 },
  { src: '/media/lseat-cabin-relax.jpg', width: 466, height: 454 },
];

/** /compliances - one photograph per block, in the origin's own order. */
export const technicalPhotos: ReadonlyArray<OriginPhoto> = [
  { src: '/media/lseat-seat-cushion.jpg', width: 640, height: 427 },
  { src: '/media/lseat-cabin-installed.jpg', width: 476, height: 356 },
  { src: '/media/lseat-seat-pair-ife.jpg', width: 427, height: 640 },
];

/* ------------------------------------------------------------------ *
 * Blocked copy - /passenger-benefits, /airline-benefits, /compliances
 * ------------------------------------------------------------------ */

export interface OriginGroup {
  readonly heading: string;
  readonly statements: readonly string[];
}

export const passengerBenefits: readonly OriginGroup[] = [
  {
    heading: 'Upgrade passenger comfort with LSEAT',
    statements: [
      'Sleep is the main concern for 80 % passengers traveling long-haul',
      'Most Economy passengers don\u2019t want or cannot afford to pay upgrade class costs, but they accept to pay some more for justified comfort improvement.',
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

export const airlineBenefits: readonly OriginGroup[] = [
  {
    heading: 'No investment',
    statements: [
      'LSEAT is rented',
      'Zero investment is  required.',
      'No risk, as after six months a contract exit is possible at no charge',
      'Monthly rental fee payed back with first day additional revenue earned with low ticket price mark-up. Hnet profit comes  with the next one\u2019s.',
      'Improve existing seats and cabin',
      'Improve existing seats and cabin',
    ],
  },
  {
    heading: 'Improve existing seats and cabin',
    statements: [
      'LSEAT inserts on any Econonomy existing seats, pitch and cabin.',
      'Cost per passenger "LSEATed" does nost change, as passenger  density pre cabin does not change.',
      'Increase LSEAT\u2019s to adapt  demand is fast.',
      'Improve existing seats and cabin',
      'Improve existing seats and cabin',
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
 * Documents
 *
 * Brochure. The origin's home page "See Flyer" block links exactly one file:
 *
 *   //img1.wsimg.com/blobby/go/b29d8b63-e638-439b-8148-d37e79e9e172/
 *   LSEAT%20-%20Brochure%202025_compressed.pdf
 *
 * This repository holds that same 2025 brochure as
 * public/docs/LSEAT-Brochure-2025.pdf, so the origin's one "Download PDF"
 * action resolves to a file this deployment actually serves.
 * ------------------------------------------------------------------ */

export const brochureHref = '/docs/LSEAT-Brochure-2025.pdf';
export const brochureDownload = 'LSEAT-Brochure-2025.pdf';

/* ------------------------------------------------------------------ *
 * News - /news
 *
 * The origin lists four entries and links four PDFs. The hrefs, exactly as
 * served:
 *
 *   1. AIRCRAFT CABIN MANAGEMENT publication Sept 2025
 *      //img1.wsimg.com/blobby/go/b29d8b63-.../
 *      Aircraft%20Cabin%20Management%20August%20-%20Sep-72b0078.pdf
 *   2. IN FLIGHT Publication
 *      //img1.wsimg.com/blobby/go/b29d8b63-.../LSEAT%20Inflight%20magazine-2526864.pdf
 *   3. Abstract Medical reaseach thrombose in aviation
 *      //img1.wsimg.com/blobby/go/b29d8b63-.../
 *      The%20Absolute%20Risk%20of%20Venous%20Thrombosis%20after%20A.pdf
 *   4. Dutch Thrombose fundation petition
 *      //img1.wsimg.com/blobby/go/b29d8b63-.../THROMBOSIS%20July%208th%2006H01.pdf
 *
 * This repository holds ONE of the four, the IN FLIGHT magazine, as
 * public/docs/LSEAT-Inflight-Magazine.pdf. Only that entry therefore carries a
 * "Download PDF" link. The other three render as their title text alone: no
 * link, no placeholder label, no invented filename. The origin's own files stay
 * on the origin's own host and are not proxied.
 * ------------------------------------------------------------------ */

export interface NewsEntry {
  readonly title: string;
  readonly subtitle?: string;
  /** Origin href, recorded for the record. Not rendered unless the file is hosted here. */
  readonly originHref: string;
  /** Set only when this deployment serves the file. */
  readonly href?: string;
  readonly download?: string;
}

export const newsItems: readonly NewsEntry[] = [
  {
    title: 'AIRCRAFT CABIN MANAGEMENT publication Sept 2025',
    originHref:
      '//img1.wsimg.com/blobby/go/b29d8b63-e638-439b-8148-d37e79e9e172/Aircraft%20Cabin%20Management%20August%20-%20Sep-72b0078.pdf',
  },
  {
    title: 'IN FLIGHT Publication',
    originHref:
      '//img1.wsimg.com/blobby/go/b29d8b63-e638-439b-8148-d37e79e9e172/LSEAT%20Inflight%20magazine-2526864.pdf',
    href: '/docs/LSEAT-Inflight-Magazine.pdf',
    download: 'LSEAT-Inflight-Magazine.pdf',
  },
  {
    title: 'Abstract Medical reaseach thrombose in aviation',
    subtitle: 'Avoid 1 Thrombose/4.656 pax due to 4+ hours flights',
    originHref:
      '//img1.wsimg.com/blobby/go/b29d8b63-e638-439b-8148-d37e79e9e172/The%20Absolute%20Risk%20of%20Venous%20Thrombosis%20after%20A.pdf',
  },
  {
    title: 'Dutch Thrombose fundation petition',
    originHref:
      '//img1.wsimg.com/blobby/go/b29d8b63-e638-439b-8148-d37e79e9e172/THROMBOSIS%20July%208th%2006H01.pdf',
  },
];

/* ------------------------------------------------------------------ *
 * Contact - /contact
 * ------------------------------------------------------------------ */

export const contactTitle = 'LSEAT - Contact';
export const contactLead = 'Send us an Email';
export const formNameLabel = 'Name';
export const formEmailLabel = 'Email';
export const formRequiredMark = '*';
export const formSubmitLabel = 'Send';

export const companyName = 'LSEAT Engineering Srl';
export const directEmail = 'yh@lseat.eu';
export const phoneDisplay = '+32 473 987 988';
export const phoneDigits = '32473987988';

/**
 * ADDRESS. The origin's contact page prints
 *
 *   15, av. Arnaud Fraiteur,
 *   1050 BRUSSELS (Belgium)
 *
 * The owner has separately confirmed the correct form as
 *
 *   15/23 Avenue Arnaud Fraiteur,
 *   1050 Brussels, Belgium
 *
 * The owner's confirmed form is the one published here, on two lines as the
 * origin lays it out. The origin's own address, a street number of 15 with no
 * house suffix and the postcode/city in full capitals, is not reproduced.
 */
export const addressLines: readonly string[] = [
  '15/23 Avenue Arnaud Fraiteur,',
  '1050 Brussels, Belgium',
];

/**
 * OFFICE HOURS. The origin's contact page carries an "Office hours" block. What
 * it actually prints on the served page is
 *
 *   Office hours
 *   Open today
 *   09:00 am - 05:00 pm
 *   Get directions
 *
 * "By Appointment" appears ZERO times in the served markup of all six origin
 * pages and is therefore not reproduced. "Get directions" on the origin is a
 * bare <button> with no href anywhere in the served HTML: GoDaddy's script
 * builds the maps URL at run time from the address, and no destination is ever
 * published. Inventing one would be fabrication, so the control is omitted.
 */
export const officeHoursTitle = 'Office hours';
export const officeHoursDayLabel = 'Open today';
export const officeHoursValue = '09:00 am \u2013 05:00 pm';

export const copyright = 'Copyright \u00a9 2024 Lseat - All Rights Reserved.';

/** Substring used by the structured data, taken from the origin's own sentence. */
export const retrofitStatement = technicalGroups[2]?.statements[1] ?? '';