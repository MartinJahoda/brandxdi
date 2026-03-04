import { V } from "./utils";

export const display = "var(--font-display), 'Playfair Display SC', Georgia, serif";
export const sans = "var(--font-sans), system-ui, sans-serif";

// Placeholder images - using picsum seed-based URLs (always work)
const P = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const LOGO = (id) => `https://ui-avatars.com/api/?name=${encodeURIComponent(id)}&background=random&color=fff&rounded=true&size=128&bold=true&format=svg`;

export const IMG = {
  hero: P("hero1", 1000, 1400),
  profile: P("profile1", 600, 800),
  // Thumbnails for phone cards
  t1: P("thumb1", 400, 710),
  t2: P("thumb2", 400, 710),
  t3: P("thumb3", 400, 710),
  t4: P("thumb4", 400, 710),
  t5: P("thumb5", 400, 710),
  t6: P("thumb6", 400, 710),
  t7: P("thumb7", 400, 710),
  t8: P("thumb8", 400, 710),
  t9: P("thumb9", 400, 710),
  t10: P("thumb10", 400, 710),
  t11: P("thumb11", 400, 710),
  t12: P("thumb12", 400, 710),
  t13: P("thumb13", 400, 710),
  t14: P("thumb14", 400, 710),
  t15: P("thumb15", 400, 710),
  t16: P("thumb16", 400, 710),
  t17: P("thumb17", 400, 710),
  t18: P("thumb18", 400, 710),
  // Analytics screenshots
  a1: P("analytics1", 400, 300),
  a2: P("analytics2", 400, 300),
  a3: P("analytics3", 400, 300),
  a4: P("analytics4", 400, 300),
  a5: P("analytics5", 400, 300),
  a6: P("analytics6", 400, 300),
  a7: P("analytics7", 400, 300),
  a8: P("analytics8", 400, 300),
  // Travel images
  tr1: P("travel1", 400, 500),
  tr2: P("travel2", 400, 500),
  tr3: P("travel3", 400, 500),
  // UGC lifestyle images
  u1: P("ugc1", 300, 300),
  u2: P("ugc2", 300, 300),
  u3: P("ugc3", 300, 300),
  u4: P("ugc4", 300, 300),
  u5: P("ugc5", 300, 300),
  u6: P("ugc6", 300, 300),
  u7: P("ugc7", 300, 300),
  u8: P("ugc8", 300, 300),
  u9: P("ugc9", 300, 300),
  u10: P("ugc10", 300, 300),
  u11: P("ugc11", 300, 300),
  u12: P("ugc12", 300, 300),
  u13: P("ugc13", 300, 300),
  u14: P("ugc14", 300, 300),
  u15: P("ugc15", 300, 300),
  u16: P("ugc16", 300, 300),
  u17: P("ugc17", 300, 300),
  u18: P("ugc18", 300, 300),
  // Testimonial brand logos
  tb1: P("brand1", 200, 100),
  tb2: P("brand2", 200, 100),
  tb3: P("brand3", 200, 100),
};

export const BRANDS = [
  { name: "American Express", logo: LOGO("American Express") },
  { name: "Oh Polly", logo: LOGO("Oh Polly") },
  { name: "Reformed", logo: LOGO("Reformed") },
  { name: "Third Space", logo: LOGO("Third Space") },
  { name: "Calypso", logo: LOGO("Calypso") },
  { name: "John Lewis", logo: LOGO("John Lewis") },
  { name: "Remington", logo: LOGO("Remington") },
  { name: "Shark Beauty", logo: LOGO("Shark Beauty") },
  { name: "TIRTIR", logo: LOGO("TIRTIR") },
  { name: "Zooki", logo: LOGO("Zooki") },
  { name: "Wisdom", logo: LOGO("Wisdom") },
  { name: "Glow For It", logo: LOGO("Glow For It") },
  { name: "Press", logo: LOGO("Press") },
  { name: "Headmasters", logo: LOGO("Headmasters") },
  { name: "Blakely", logo: LOGO("Blakely") },
  { name: "Yepoda", logo: LOGO("Yepoda") },
  { name: "Revlon", logo: LOGO("Revlon") },
  { name: "Wonderskin", logo: LOGO("Wonderskin") },
  { name: "Simple", logo: LOGO("Simple") },
  { name: "Hello Klean", logo: LOGO("Hello Klean") },
];

export const STATS = [
  { v: "29K", l: "instagram" },
  { v: "30M+", l: "organic views" },
  { v: "2+", l: "years of\nexperience" },
  { v: "300+", l: "trusted by\nbrands" },
];

export const ANALYTICS = [
  { img: IMG.a1, caption: "organic results" },
  { img: IMG.a2, caption: "organic results" },
  { img: IMG.a3, caption: "$0.02 CPC" },
  { img: IMG.a4, caption: "1.8M" },
  { img: IMG.a5, caption: "7X ROAS" },
  { img: IMG.a6, caption: "organic results" },
  { img: IMG.a7, caption: "$1.15 CPM" },
  { img: IMG.a8, caption: "organic results" },
];

export const SECTIONS = [
  {
    id: "recent", title: "Recent Work Showcase", sub: "highlight of this month's work", layout: "scroll",
    items: [
      { id: "r1", brand: "Batiste", brandLogo: LOGO("Batiste"), cat: "HAIR", video: V(50426), thumb: IMG.t1 },
      { id: "r2", brand: "Candy Kittens", brandLogo: LOGO("Candy Kittens"), cat: "CANDY", video: V(52039), thumb: IMG.t2 },
      { id: "r3", brand: "Simple", brandLogo: LOGO("Simple"), cat: "SKINCARE", video: V(33099, "720"), thumb: IMG.t3 },
      { id: "r4", brand: "Wonderskin", brandLogo: LOGO("Wonderskin"), cat: "FRAGRANCE", video: V(52030), thumb: IMG.t4 },
      { id: "r5", brand: "Shark Beauty", brandLogo: LOGO("Shark Beauty"), cat: "HAIR", video: V(52152), thumb: IMG.t5 },
      { id: "r6", brand: "OPI", brandLogo: LOGO("OPI"), cat: "NAILS", video: V(51177), thumb: IMG.t6 },
      { id: "r7", brand: "Batiste", brandLogo: LOGO("Batiste"), cat: "HAIR", video: V(50426), thumb: IMG.t7 },
    ],
  },
  {
    id: "recent2", title: "", sub: "", layout: "scroll",
    items: [
      { id: "r2a", brand: "Charlotte Star", brandLogo: LOGO("Charlotte Star"), cat: "JEWELLERY", video: V(52033), thumb: IMG.t8 },
      { id: "r2b", brand: "Wella", brandLogo: LOGO("Wella"), cat: "HAIR", video: V(52055), thumb: IMG.t9 },
      { id: "r2c", brand: "Snuggledown", brandLogo: LOGO("Snuggledown"), cat: "BEDDING", video: V(52041), thumb: IMG.t10 },
      { id: "r2d", brand: "Wella", brandLogo: LOGO("Wella"), cat: "HAIR", video: V(52057), thumb: IMG.t11 },
      { id: "r2e", brand: "Mumantra", brandLogo: LOGO("Mumantra"), cat: "WELLNESS", video: V(50417), thumb: IMG.t12 },
      { id: "r2f", brand: "Salon Science", brandLogo: LOGO("Salon Science"), cat: "HAIRCARE", video: V(33462, "720"), thumb: IMG.t13 },
    ],
  },
  {
    id: "fun", title: "Fun Edits", sub: "", layout: "grid",
    items: [
      { id: "f1", brand: "Wella", brandLogo: LOGO("Wella"), cat: "HAIR TRANSFORMATION", video: V(33269, "720"), thumb: IMG.t14 },
      { id: "f2", brand: "OPI", brandLogo: LOGO("OPI"), cat: "PINK DAY", video: V(809), thumb: IMG.t15 },
      { id: "f3", brand: "OPI", brandLogo: LOGO("OPI"), cat: "GREEN SCREEN", video: V(50641), thumb: IMG.t16 },
      { id: "f4", brand: "OPI", brandLogo: LOGO("OPI"), cat: "SPLIT SCREEN", video: V(33599, "720"), thumb: IMG.t17 },
    ],
  },
  {
    id: "beauty", title: "Beauty", sub: "", layout: "grid",
    items: [
      { id: "b1", brand: "RB", brandLogo: LOGO("RB"), cat: "DEMO", video: V(52033), thumb: IMG.t7 },
      { id: "b2", brand: "Wonderskin", brandLogo: LOGO("Wonderskin"), cat: "BEFORE / AFTER", video: V(52055), thumb: IMG.t8 },
      { id: "b3", brand: "Revlon", brandLogo: LOGO("Revlon"), cat: "TESTIMONIAL", video: V(52041), thumb: IMG.t9 },
      { id: "b4", brand: "Wonderskin", brandLogo: LOGO("Wonderskin"), cat: "SEASONAL", video: V(52057), thumb: IMG.t10 },
    ],
  },
  {
    id: "skin", title: "Skin", sub: "", layout: "grid",
    items: [
      { id: "s1", brand: "Simple", brandLogo: LOGO("Simple"), cat: "TREND", video: V(50417), thumb: IMG.t11 },
      { id: "s2", brand: "Clarins", brandLogo: LOGO("Clarins"), cat: "TESTIMONIAL", video: V(33462, "720"), thumb: IMG.t12 },
      { id: "s3", brand: "Yepoda", brandLogo: LOGO("Yepoda"), cat: "K BEAUTY", video: V(26532, "720"), thumb: IMG.t13 },
      { id: "s4", brand: "Dr. Organic", brandLogo: LOGO("Dr Organic"), cat: "TREND", video: V(33257, "720"), thumb: IMG.t14 },
    ],
  },
  {
    id: "hair", title: "Hair", sub: "", layout: "grid",
    items: [
      { id: "h1", brand: "Xmondo", brandLogo: LOGO("Xmondo"), cat: "HAIR GLOSS", video: V(50426), thumb: IMG.t15 },
      { id: "h2", brand: "Remington", brandLogo: LOGO("Remington"), cat: "HAIRSTYLES", video: V(52039), thumb: IMG.t16 },
      { id: "h3", brand: "Shark Beauty", brandLogo: LOGO("Shark Beauty"), cat: "BEFORE AND AFTER", video: V(33099, "720"), thumb: IMG.t17 },
      { id: "h4", brand: "Regrowz", brandLogo: LOGO("Regrowz"), cat: "PROBLEM > SOLUTION", video: V(52030), thumb: IMG.t18 },
    ],
  },
  {
    id: "home", title: "Home", sub: "", layout: "grid-half",
    items: [
      { id: "ho1", brand: "P&R", brandLogo: LOGO("P&R"), cat: "SCENT BOOSTERS", video: V(52152), thumb: IMG.t1 },
      { id: "ho2", brand: "John Lewis", brandLogo: LOGO("John Lewis"), cat: "GIFT GUIDE", video: V(51177), thumb: IMG.t2 },
    ],
  },
  {
    id: "jewellery", title: "Jewellery", sub: "", layout: "grid-half",
    items: [
      { id: "j1", brand: "NJ", brandLogo: LOGO("NJ"), cat: "STYLING", video: V(50426), thumb: IMG.t3 },
      { id: "j2", brand: "Maison Dorée", brandLogo: LOGO("Maison Doree"), cat: "BLACK FRIDAY", video: V(52039), thumb: IMG.t4 },
    ],
  },
  {
    id: "gym", title: "Gym Tours", sub: "", layout: "grid",
    items: [
      { id: "g1", brand: "Nirvana Life", brandLogo: LOGO("Nirvana Life"), cat: "BALI", video: V(33099, "720"), thumb: IMG.t5 },
      { id: "g2", brand: "Third Space", brandLogo: LOGO("Third Space"), cat: "RICHMOND", video: V(52030), thumb: IMG.t6 },
      { id: "g3", brand: "Third Space", brandLogo: LOGO("Third Space"), cat: "WEMBLEY", video: V(52152), thumb: IMG.t7 },
      { id: "g4", brand: "Third Space", brandLogo: LOGO("Third Space"), cat: "CANARY WHARF", video: V(51177), thumb: IMG.t8 },
    ],
  },
  {
    id: "wellness", title: "Wellness", sub: "", layout: "grid",
    items: [
      { id: "w1", brand: "Forest & Shore", brandLogo: LOGO("Forest Shore"), cat: "TREND", video: V(50417), thumb: IMG.t9 },
      { id: "w2", brand: "Zooki", brandLogo: LOGO("Zooki"), cat: "TESTIMONIAL", video: V(33462, "720"), thumb: IMG.t10 },
      { id: "w3", brand: "Reformed", brandLogo: LOGO("Reformed"), cat: "PROBLEM SOLUTION", video: V(26532, "720"), thumb: IMG.t11 },
      { id: "w4", brand: "Celsius", brandLogo: LOGO("Celsius"), cat: "ROUTINE", video: V(33257, "720"), thumb: IMG.t12 },
    ],
  },
  {
    id: "athleisure", title: "Athleisure", sub: "", layout: "grid",
    items: [
      { id: "at1", brand: "V/A", brandLogo: LOGO("VA"), cat: "ATHLEISURE", video: V(33269, "720"), thumb: IMG.t13 },
      { id: "at2", brand: "MLP", brandLogo: LOGO("MLP"), cat: "ATHLEISURE", video: V(809), thumb: IMG.t14 },
      { id: "at3", brand: "V/A", brandLogo: LOGO("VA"), cat: "ATHLEISURE", video: V(50641), thumb: IMG.t15 },
      { id: "at4", brand: "Vladore", brandLogo: LOGO("Vladore"), cat: "ATHLEISURE", video: V(33599, "720"), thumb: IMG.t16 },
    ],
  },
  {
    id: "trends", title: "Trends", sub: "", layout: "grid",
    items: [
      { id: "tr1", brand: "Wisdom", brandLogo: LOGO("Wisdom"), cat: "TREND", video: V(50426), thumb: IMG.t17 },
      { id: "tr2", brand: "Celsius", brandLogo: LOGO("Celsius"), cat: "TREND", video: V(52039), thumb: IMG.t18 },
      { id: "tr3", brand: "ML", brandLogo: LOGO("ML"), cat: "TREND", video: V(33099, "720"), thumb: IMG.t1 },
      { id: "tr4", brand: "Celsius", brandLogo: LOGO("Celsius"), cat: "TREND", video: V(52030), thumb: IMG.t2 },
    ],
  },
];

export const TESTIMONIALS = [
  {
    brandLogo: IMG.tb1,
    brandName: "Third Space",
    quote: "I've worked with Klaudia on four new club launch projects for Third Space in 2024. She consistently delivers beautiful visuals and engaging videos that showcase the best of our spaces. She's been a pleasure to work with.",
    author: "Jonathan Weston-Stanely",
  },
  {
    brandLogo: IMG.tb2,
    brandName: "Spectrum Brands",
    quote: "It has been a pleasure working with you. Communication has been quick and efficient, you understood our products, the brief and produced some really high-quality content. We will definitely keep you in mind for future collaborations.",
    author: "Harriet Eyre - Remington Campaign",
  },
  {
    brandLogo: IMG.tb3,
    brandName: "Kite Site",
    quote: "Klaudia's such a talented creator. She totally understood our brief and executed on it perfectly. The content did so well organically, that we whitelisted the content and that's where we became even more blown away. On Meta, we received a CPC of $0.02 and a CTR of 0.52%. On Tik Tok we received a crazy CPM of $1.15. I absolutely recommend Klaudia to any brand that needs quick results.",
    author: "Dave, Kite Site",
  },
];

export const UGC_IMAGES = [
  "/uploads/diana.png", IMG.u1, IMG.u2, IMG.u3, IMG.u4, IMG.u5, IMG.u6,
  IMG.u7, IMG.u8, IMG.u9, IMG.u10, IMG.u11, IMG.u12,
  IMG.u13, IMG.u14, IMG.u15, IMG.u16, IMG.u17, IMG.u18,
];

export const SERVICES = [
  "A/B TESTING",
  "PROMOTIONAL POSTS",
  "IN-PERSON UGC",
  "CONTENT FOR PAID ADS",
  "ORGANIC CONTENT",
  "DISCOUNTED BUNDLES",
];

export const WEB_CONTENT = [
  { title: "Web Content", img: IMG.a1 },
  { title: "YouTube Ads", img: IMG.a2 },
];

export const TRAVEL_BANNER = {
  text: "CLICK HERE",
  subtext: "FOR MY TRAVEL PORTFOLIO",
  detail: "HOTELS, AIR BNB'S & EXPERIENCE'S",
  link: "#",
  images: [IMG.tr1, IMG.tr2, IMG.tr3],
};
