import { SECTIONS, BRANDS, STATS, ANALYTICS, HERO_IMGS, IMG } from "./data";

const KEY = "ugcdi_config";

export const DEFAULT_CONFIG = {
  comingSoon: true,
  general: {
    name: "Diana Garcia",
    title: "UGC Creator",
    bio: "Authentic & premium content that converts and engages. 3+ years creating scroll-stopping UGC for beauty, skincare, and lifestyle brands.",
    email: "hello@dianagarcia.com",
    profileImg: IMG.profile,
    calendlyUrl: "https://calendly.com/dianagarcia/discovery-call",
    instagramUrl: "#",
    tiktokUrl: "#",
    testimonialQuote: "Clients say working with Diana blends authentic creativity and meticulous attention\u2014helping brands grow with confidence.",
    copyrightName: "Diana Garcia",
    studioSuffix: "STUDIO",
    comingSoonMessage: "Something beautiful is on the way.",
    comingSoonLabel: "Coming Soon",
  },
  heroImages: HERO_IMGS,
  sections: SECTIONS,
  brands: BRANDS,
  stats: STATS,
  analytics: ANALYTICS,
  sectionToggles: {
    brands: true,
    analytics: true,
    testimonials: true,
    bookMe: true,
  },
  sectionText: {
    brandsTag: "Trusted By",
    brandsTitle: "Brands that trust our content.",
    analyticsTag: "Analytics",
    analyticsTitle: "Results that speak.",
    analyticsDisclaimer: "more analytics available on request *",
    testimonialsTag: "Testimonials",
    testimonialsCount: "100+",
    testimonialsCta: "Read all reviews",
    bookMeTag: "Book Me",
    bookMeTitle: "Let\u2019s create together.",
    bookMeDescription: "Book a discovery call to discuss your brand\u2019s content needs.",
    bookMeButton: "Book a Call",
  },
  footer: {
    heading: "Stay connected",
    description: "Join the newsletter for updates on new work.",
    tagline: "Authentic content that converts.",
  },
};

export function getConfig() {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const stored = localStorage.getItem(KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...DEFAULT_CONFIG,
        ...parsed,
        general: { ...DEFAULT_CONFIG.general, ...(parsed.general || {}) },
        sectionToggles: { ...DEFAULT_CONFIG.sectionToggles, ...(parsed.sectionToggles || {}) },
        sectionText: { ...DEFAULT_CONFIG.sectionText, ...(parsed.sectionText || {}) },
        footer: { ...DEFAULT_CONFIG.footer, ...(parsed.footer || {}) },
      };
    }
  } catch {}
  return DEFAULT_CONFIG;
}

export function saveConfig(config) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(config));
}

export function resetConfig() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
