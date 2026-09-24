import data from "@/content/pages.json";
import sizes from "@/content/image-sizes.json";

/*
 * All copy is taken verbatim from wrightslandscapes.com (every URL in its
 * sitemap). content/pages.json is generated from the scraped pages; the home
 * page copy below is transcribed from home.php.
 */

export const LIVE = "https://wrightslandscapes.com";

export type Img = { src: string; alt: string };

export type Block =
  | { type: "lede"; html: string }
  | { type: "p"; html: string }
  | { type: "h2"; text: string }
  | { type: "clients"; items: string[] }
  | { type: "ul"; items: ({ title: string; href: string; desc: string } | { html: string })[] }
  | { type: "spec"; items: { title: string; html: string }[] }
  | { type: "faq"; items: { q: string; a: string }[] }
  | { type: "cols"; cols: Block[][] }
  | { type: "dl"; items: { dt: string; html: string }[] }
  | { type: "cta"; text: string; href: string };

export type Page = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  image: Img;
  blocks: Block[];
  gallery?: Img[];
};

export const pages = data.pages as Page[];
export const homeGallery = data.homeGallery as Img[];

export const getPage = (slug: string) => pages.find((p) => p.slug === slug);

export function imgSize(src: string): [number, number] {
  const s = (sizes as Record<string, number[]>)[src];
  return s ? [s[0], s[1]] : [1600, 1200];
}

export const SERVICE_SLUGS = [
  "commercial-soft-landscaping",
  "housebuilder-landscaping",
  "planting-and-tree-planting",
  "turfing-seeding-and-wildflower",
  "grounds-maintenance",
];

/* Navigation labels as they appear in the live site's burger menu. */
export const nav = {
  services: [
    { label: "Soft Landscaping", href: "/commercial-soft-landscaping" },
    { label: "Housebuilders", href: "/housebuilder-landscaping" },
    { label: "Planting & Trees", href: "/planting-and-tree-planting" },
    { label: "Turfing & Seeding", href: "/turfing-seeding-and-wildflower" },
    { label: "Grounds Maintenance", href: "/grounds-maintenance" },
  ],
  company: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Areas We Cover", href: "/areas-we-cover" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    // The calculators page is not rebuilt here, so it points at the live site.
    { label: "Tools", href: `${LIVE}/commercial-landscaping-tools.php` },
  ],
};

/* Footer "Pages" list, verbatim from the live footer. */
export const footerPages = [
  { label: "Commercial soft landscaping", href: "/commercial-soft-landscaping" },
  { label: "Landscaping for housebuilders", href: "/housebuilder-landscaping" },
  { label: "Planting and tree planting", href: "/planting-and-tree-planting" },
  { label: "Turfing, seeding and wildflower", href: "/turfing-seeding-and-wildflower" },
  { label: "Grounds maintenance", href: "/grounds-maintenance" },
  { label: "Projects", href: "/projects" },
  { label: "Areas we cover", href: "/areas-we-cover" },
  { label: "About Wrights Landscapes", href: "/about" },
  { label: "Frequently asked questions", href: "/faq" },
  { label: "Landscaping tools and calculators", href: `${LIVE}/commercial-landscaping-tools.php` },
  { label: "Contact", href: "/contact" },
];

export const contact = {
  company: "Wrights Landscapes Group Ltd",
  address: ["21 Finbracks, Stevenage,", "Hertfordshire SG1 6HB"],
  person: "Ed Wright",
  email: "ed@wrightslandscapes.com",
  phone: "07887 898327",
  tel: "+447887898327",
  map: "https://www.google.com/maps/place/Finbracks,+Stevenage+SG1+6HB/@51.9341402,-0.1800655,17z/data=!3m1!4b1!4m5!3m4!1s0x48762e0889e2dec9:0x6d800a27992d37fc!8m2!3d51.9342414!4d-0.1776384",
  linkedin: "https://www.linkedin.com/company/65291361",
  facebook: "https://www.facebook.com/wrightslandscapes/",
  smallprint:
    "Wrights Landscapes Group Ltd is registered in England and Wales, company number 10492415. VAT registration GB 255 4015 25. Registered office 21 Finbracks, Stevenage, Hertfordshire SG1 6HB. Constructionline Gold and CHAS accredited. Commercial soft landscaping subcontractor to housebuilders and main contractors across London, Hertfordshire and the South East. Established 2016.",
};

/* ---------------------------------------------------------------- home.php */

export const home = {
  title:
    "Wrights Landscapes Group | Commercial Soft Landscaping Contractor — Stevenage, London & the South East",
  description:
    "Commercial soft landscaping subcontractor based in Stevenage, Hertfordshire, working for national housebuilders and main contractors across London and the South East. Constructionline Gold and CHAS accredited.",
  tag: "Specialist soft landscaping, planting and turfing for the construction industry",
  h1: "Commercial soft landscaping contractors for the construction industry",
  lede: "Wrights Landscapes Group Ltd is a commercial soft landscaping subcontractor based in Stevenage, Hertfordshire. Founded in 2016, the company installs and maintains soft landscaping on new-build and refurbishment construction projects across London, Hertfordshire and the wider South East of England.",
  body: [
    "Wrights works as a subcontractor to national housebuilders and to Tier 1 and Tier 2 main contractors, delivering plot landscaping, public open space, communal areas, podium and roof planting, and post-completion maintenance. The company is Constructionline Gold and CHAS accredited, and operates a separate Grounds Maintenance Division for aftercare and defects-period works.",
    "By developing strong relationships with our commercial client base and suppliers throughout Europe we ensure efficiency in every step of a project's timeline. We work business-to-business only and do not undertake domestic garden work.",
  ],
  talk: "If you have a scheme coming up, we are happy to look at the drawings and talk it through.",
  whatWeDo: {
    h2: "What we do",
    intro:
      "Soft landscaping is usually let as a discrete subcontract package towards the end of a construction programme. These are the elements we price, install and maintain.",
    items: [
      {
        title: "Plot and garden landscaping",
        text: "Topsoil placement and grading, turfing, seeding, shrub and hedge planting, tree planting, mulching, bed preparation and edging to individual plots, show homes and sales areas on residential developments.",
        link: { label: "Landscaping for housebuilders", href: "/housebuilder-landscaping" },
      },
      {
        title: "Large-scale planting",
        text: "Public open space, communal areas and amenity landscaping: bulk shrub planting, semi-mature and standard tree planting, tree pit construction, staking, guying and irrigation coordination.",
        link: { label: "Planting and tree planting", href: "/planting-and-tree-planting" },
      },
      {
        title: "Turfing, seeding and wildflower",
        text: "Commercial turf installation, amenity grass seeding, wildflower turf and species-rich seed mixes for biodiversity net gain, including full ground preparation and establishment.",
        link: { label: "Turfing and seeding", href: "/turfing-seeding-and-wildflower" },
      },
      {
        title: "Podium, roof and structural planting",
        text: "Planting to podium decks, roof terraces and raised structures, including specified substrates, drainage layers, filter membranes and irrigation coordination with the M&E package.",
        link: { label: "Commercial soft landscaping", href: "/commercial-soft-landscaping" },
      },
      {
        title: "Landscape reinstatement",
        text: "Making good landscaped areas damaged by construction, remediation or utility works: soil decompaction and amelioration, reinstatement turfing, replacement planting and re-establishment.",
      },
      {
        title: "Grounds maintenance and aftercare",
        text: "Twelve- and twenty-four-month maintenance periods, watering regimes, defect rectification and replacement planting, plus standalone grounds maintenance contracts through our Grounds Maintenance Division.",
        link: { label: "Grounds maintenance", href: "/grounds-maintenance" },
      },
    ],
  },
  whoFor: {
    h2: "Who we work for",
    intro: "Wrights Landscapes Group works exclusively business-to-business, as a subcontractor:",
    items: [
      "National and regional housebuilders",
      "Main contractors and principal contractors on JCT and NEC forms",
      "Groundworks contractors packaging out soft landscaping",
      "Housing associations and registered providers",
      "Facilities and estate managers requiring ongoing grounds maintenance",
    ],
  },
  whereWork: {
    h2: "Where we work",
    body: [
      "From our base in Stevenage we deliver projects across Hertfordshire, Greater London, Essex, Bedfordshire, Buckinghamshire, Cambridgeshire, Northamptonshire, Kent, Surrey, Berkshire, Oxfordshire and Sussex.",
      "We are set up to hold multiple concurrent sites and to work under principal contractors' site rules, RAMS requirements and CDM 2015 duties.",
    ],
    link: { label: "Areas we cover in detail", href: "/areas-we-cover" },
  },
  clients: {
    lead: "Trusted by leading",
    accent: "housebuilders and main contractors",
    intro: "Wrights Landscapes has delivered commercial soft landscaping works for clients including:",
    items: ["Taylor Wimpey", "The Hill Group", "Croudace Homes", "Fairview New Homes", "RED Construction", "Riney"],
    outro:
      "We also work for a number of other national and regional housebuilders and main contractors across London, Hertfordshire and the South East.",
    logosAlt: "Housebuilder and main contractor clients of Wrights Landscapes Group",
  },
  accreditations: {
    h2: "Accreditations",
    body: "Wrights Landscapes Group is Constructionline Gold and CHAS accredited. Full PQQ documentation, RAMS, insurance certificates, method statements and training records are available on request.",
    alt: "Constructionline Gold and CHAS accreditation marks",
    titleblock: [
      { dt: "Legal name", dd: "Wrights Landscapes Group Ltd" },
      { dt: "Established", dd: "2016" },
      { dt: "Head office", dd: "Stevenage, Hertfordshire SG1 6HB" },
      { dt: "Trade", dd: "Commercial soft landscaping subcontractor" },
      { dt: "Clients", dd: "Housebuilders and main contractors (B2B only)" },
      { dt: "Coverage", dd: "London, Hertfordshire and the South East" },
      { dt: "Accreditations", dd: "Constructionline Gold · CHAS" },
    ],
  },
  turfAlt: "Newly laid turf on a Wrights Landscapes soft landscaping project",
};

/*
 * Featured panels in the hero. Each is a real scope heading from the live
 * site, paired with a real photo and linking to its rebuilt service page.
 */
export const featured = [
  {
    title: "Landscaping for housebuilders",
    href: "/housebuilder-landscaping",
    img: { src: "/images/imageB.jpeg", alt: "Completed grounds and planting on a housing development" },
  },
  {
    title: "Podium, roof and structural planting",
    href: "/commercial-soft-landscaping",
    img: { src: "/images/indoor.jpg", alt: "Structural planting installed by Wrights Landscapes" },
  },
  {
    title: "Planting and tree planting",
    href: "/planting-and-tree-planting",
    img: { src: "/images/imageA.jpeg", alt: "Planting scheme installed on a commercial landscaping project" },
  },
];

/* Stacking photo cards on the home page: real site photos, captioned with real service page names. */
export const stack = [
  {
    title: "Landscaping for housebuilders",
    href: "/housebuilder-landscaping",
    img: { src: "/images/imageC.jpeg", alt: "Completed planting and turfing to a new-build plot" },
  },
  {
    title: "Commercial soft landscaping",
    href: "/commercial-soft-landscaping",
    img: { src: "/images/imageD.jpeg", alt: "Soft landscaping scheme delivered for a main contractor" },
  },
  {
    title: "Turfing, seeding and wildflower",
    href: "/turfing-seeding-and-wildflower",
    img: { src: "/images/three.jpeg", alt: "Turfed lawn and planted borders on a completed development" },
  },
  {
    title: "Grounds maintenance",
    href: "/grounds-maintenance",
    img: { src: "/images/seven.jpeg", alt: "Landscaping to communal areas on a housebuilder development" },
  },
];
