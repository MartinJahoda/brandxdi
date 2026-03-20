import { SECTIONS, BRANDS, STATS, ANALYTICS, TESTIMONIALS, UGC_IMAGES, SERVICES, WEB_CONTENT, TRAVEL_BANNER, IMG } from "./data";

const CONFIG_VERSION = 2;

export const DEFAULT_CONFIG = {
  _version: CONFIG_VERSION,
  comingSoon: false,
  general: {
    name: "Klaudia Milcz",
    title: "UGC Creator",
    tagline: "AUTHENTIC & PREMIUM CONTENT\nTHAT CONVERTS AND ENGAGES",
    experienceText: "2 + years experience",
    bio: "Authentic & premium content that converts and engages. 2+ years creating scroll-stopping UGC for beauty, skincare, and lifestyle brands.",
    email: "hello@klaudiamilcz.com",
    mailingAddress: "DM or Email for PR Requests",
    heroImage: IMG.hero,
    profileImg: IMG.profile,
    instagramUrl: "#",
    linkedinUrl: "#",
    youtubeUrl: "#",
    tiktokUrl: "#",
    heroVideo: "",
    ctaButtonText: "Book Me",
    copyrightName: "Klaudia Milcz",
    comingSoonMessage: "Something beautiful is on the way.",
    comingSoonLabel: "Coming Soon",
  },
  sections: SECTIONS,
  brands: BRANDS,
  stats: STATS,
  analytics: ANALYTICS,
  testimonials: TESTIMONIALS,
  ugcImages: UGC_IMAGES,
  webContent: WEB_CONTENT,
  travelBanner: TRAVEL_BANNER,
  services: SERVICES,
  sectionToggles: {
    brands: true,
    analytics: true,
    testimonials: true,
    travelBanner: true,
    ugcImages: true,
    webContent: true,
    stickyCTA: true,
  },
  sectionText: {
    brandsTitle: "TRUSTED BY...",
    brandsMore: "+ MANY MORE",
    analyticsTitle: "ANALYTICS",
    analyticsDisclaimer: "more analytics available on request due to client confidentiality *",
    testimonialsTitle: "WHAT MY CLIENTS SAY",
    testimonialsSubtitle: "MORE REFERENCES AVAILABLE ON REQUEST",
    ugcImagesTitle: "UGC IMAGES",
    portfolioTitle: "PORTFOLIO",
  },
  footer: {
    heading: "GET IN TOUCH",
    contactLabel: "Mailing Address",
    contactSub: "DM or Email for PR Requests",
    emailLabel: "Email Address",
    instagramLabel: "Instagram",
    instagramHandle: "@klaudia.milcz",
    backgroundImage: IMG.profile,
  },
};

function mergeWithDefaults(parsed) {
  return {
    ...DEFAULT_CONFIG,
    ...parsed,
    general: { ...DEFAULT_CONFIG.general, ...(parsed.general || {}) },
    sectionToggles: { ...DEFAULT_CONFIG.sectionToggles, ...(parsed.sectionToggles || {}) },
    sectionText: { ...DEFAULT_CONFIG.sectionText, ...(parsed.sectionText || {}) },
    footer: { ...DEFAULT_CONFIG.footer, ...(parsed.footer || {}) },
    travelBanner: { ...DEFAULT_CONFIG.travelBanner, ...(parsed.travelBanner || {}) },
  };
}

/** Fetch config from the server */
export async function fetchConfig() {
  try {
    const res = await fetch("/api/config", { cache: "no-store" });
    const data = await res.json();
    if (data && data._version === CONFIG_VERSION) {
      return mergeWithDefaults(data);
    }
  } catch {}
  return DEFAULT_CONFIG;
}

/** Save config to the server */
export async function saveConfig(config) {
  const res = await fetch("/api/config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });
  if (!res.ok) throw new Error("Failed to save config");
}

/** Reset config on the server */
export async function resetConfig() {
  await saveConfig(DEFAULT_CONFIG);
}

// Keep synchronous getConfig for backward compat during migration — reads defaults only
export function getConfig() {
  return DEFAULT_CONFIG;
}
