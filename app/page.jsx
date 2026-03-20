"use client";
import { useState, useEffect } from "react";
import HamburgerNav from "@/components/HamburgerNav";
import PhoneCard from "@/components/PhoneCard";
import Fade from "@/components/Fade";
import SectionHeader from "@/components/SectionHeader";
import BrandLogoGrid from "@/components/BrandLogoGrid";
import TestimonialCard from "@/components/TestimonialCard";
import ImageGrid from "@/components/ImageGrid";
import TravelBanner from "@/components/TravelBanner";
import StickyCTA from "@/components/StickyCTA";
import VideoLightbox from "@/components/VideoLightbox";
import AnimatedStat from "@/components/AnimatedStat";
import CategoryFilter from "@/components/CategoryFilter";
import ContactForm from "@/components/ContactForm";
import BackToTop from "@/components/BackToTop";
import Skeleton from "@/components/Skeleton";
import { IcoIg, IcoLinkedIn, IcoYouTube, IcoTt } from "@/components/icons";
import { display, sans } from "@/lib/data";
import { fetchConfig, DEFAULT_CONFIG } from "@/lib/config";

export default function HomePage() {
  const [cfg, setCfg] = useState(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [lightboxVideo, setLightboxVideo] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchConfig().then(c => { setCfg(c); setLoading(false); });
  }, []);

  const g = cfg.general;

  if (cfg.comingSoon) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 32 }}>
        <div style={{ maxWidth: 520 }}>
          <h1 style={{ fontFamily: display, fontSize: "clamp(2rem,6vw,3.5rem)", fontWeight: 400, letterSpacing: ".06em", color: "#1a1a1a", marginBottom: 12 }}>
            {g.name.toUpperCase()}
          </h1>
          <div style={{ width: 40, height: 1, background: "#ccc", margin: "20px auto" }} />
          <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, fontFamily: sans, marginBottom: 8 }}>
            {g.comingSoonMessage}
          </p>
          <p style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#b5b0a8", fontFamily: sans }}>
            {g.comingSoonLabel}
          </p>
        </div>
      </div>
    );
  }

  const scrollSections = cfg.sections.filter(s => s.layout === "scroll");
  const gridSections = cfg.sections.filter(s => s.layout === "grid");
  const halfSections = cfg.sections.filter(s => s.layout === "grid-half");

  const filterCategories = [
    ...gridSections.map(s => ({ id: s.id, title: s.title })),
    ...halfSections.map(s => ({ id: s.id, title: s.title })),
  ];

  if (loading) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        <Skeleton height={400} borderRadius={0} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, maxWidth: 600, margin: "32px auto" }}>
          {[...Array(4)].map((_, i) => <Skeleton key={i} height={60} />)}
        </div>
      </div>
    );
  }

  return (
    <>
      <HamburgerNav />
      {cfg.sectionToggles.stickyCTA && <StickyCTA text={g.ctaButtonText} />}
      <BackToTop />
      {lightboxVideo && <VideoLightbox videoSrc={lightboxVideo} onClose={() => setLightboxVideo(null)} />}

      {/* ── Hero ── */}
      <section id="hero" style={{ position: "relative", width: "100%", overflow: "hidden", minHeight: "85vh" }}>
        <img
          src={g.heroImage}
          alt={g.name}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        {g.heroVideo && (
          <video
            autoPlay muted loop playsInline
            poster={g.heroImage}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={g.heroVideo} type="video/mp4" />
          </video>
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.65))" }} />
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: "85vh", padding: "0 32px 48px", color: "white", textAlign: "center", alignItems: "center" }}>
          <h1 style={{ fontFamily: display, fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 400, letterSpacing: ".08em", marginBottom: 4 }}>
            {g.name.toUpperCase()}
          </h1>
          <p style={{ fontFamily: display, fontSize: "clamp(.9rem, 1.8vw, 1.1rem)", fontWeight: 400, letterSpacing: ".18em", marginBottom: 8 }}>
            {g.title.toUpperCase()}
          </p>
          <p style={{ fontFamily: sans, fontSize: 14, fontStyle: "italic", opacity: .85, marginBottom: 8 }}>
            {g.experienceText}
          </p>
          <p style={{ fontFamily: sans, fontSize: 11, letterSpacing: ".12em", opacity: .75, whiteSpace: "pre-line", lineHeight: 1.6, maxWidth: 480 }}>
            {g.tagline}
          </p>
          {g.bio && (
            <p style={{ fontFamily: sans, fontSize: 12, fontStyle: "italic", opacity: .65, marginTop: 10, maxWidth: 440, lineHeight: 1.6 }}>
              {g.bio}
            </p>
          )}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 20 }}>
            {g.linkedinUrl && g.linkedinUrl !== "#" && (
              <a href={g.linkedinUrl} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,.5)", background: "rgba(255,255,255,.1)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", transition: "background .2s" }}>
                <IcoLinkedIn />
              </a>
            )}
            {g.instagramUrl && g.instagramUrl !== "#" && (
              <a href={g.instagramUrl} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,.5)", background: "rgba(255,255,255,.1)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", transition: "background .2s" }}>
                <IcoIg />
              </a>
            )}
            {g.youtubeUrl && g.youtubeUrl !== "#" && (
              <a href={g.youtubeUrl} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,.5)", background: "rgba(255,255,255,.1)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", transition: "background .2s" }}>
                <IcoYouTube />
              </a>
            )}
            {g.tiktokUrl && g.tiktokUrl !== "#" && (
              <a href={g.tiktokUrl} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,.5)", background: "rgba(255,255,255,.1)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", transition: "background .2s" }}>
                <IcoTt />
              </a>
            )}
          </div>
        </div>
      </section>

      <main>
        {/* ── Trusted By ── */}
        {cfg.sectionToggles.brands && (
          <section style={{ padding: "48px 24px 32px", textAlign: "center" }}>
            <SectionHeader title={cfg.sectionText.brandsTitle} />
            <BrandLogoGrid brands={cfg.brands} moreText={cfg.sectionText.brandsMore} />
          </section>
        )}

        {/* ── Stats ── */}
        <section style={{ padding: "32px 24px" }}>
          <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            {cfg.stats.map((s, i) => (
              <div key={i}>
                <AnimatedStat value={s.v} />
                <p style={{ fontSize: 10, letterSpacing: ".12em", color: "#999", marginTop: 4, fontFamily: sans, whiteSpace: "pre-line", lineHeight: 1.4 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Analytics ── */}
        {cfg.sectionToggles.analytics && (
          <section id="analytics" style={{ padding: "48px 24px", background: "#fafafa" }}>
            <SectionHeader title={cfg.sectionText.analyticsTitle} sub={cfg.sectionText.analyticsDisclaimer} />
            <Fade delay={.1}>
              <div className="analytics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, maxWidth: 700, margin: "0 auto" }}>
                {cfg.analytics.map((a, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ borderRadius: 8, overflow: "hidden", background: "#eee", aspectRatio: "4/3" }}>
                      <img src={a.img} alt={a.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <p style={{ fontSize: 10, letterSpacing: ".1em", color: "#777", marginTop: 6, fontFamily: sans }}>{a.caption}</p>
                  </div>
                ))}
              </div>
            </Fade>
          </section>
        )}

        {/* ── Scroll Video Sections (Recent Work, etc.) ── */}
        {scrollSections.map((sec, si) => (
          <section key={sec.id} id={si === 0 ? "work" : undefined} style={{ padding: sec.title ? "48px 0 32px" : "0 0 32px", overflow: "hidden" }}>
            {sec.title && (
              <div style={{ padding: "0 24px" }}>
                <SectionHeader title={sec.title} sub={sec.sub} />
              </div>
            )}
            <Fade delay={.1}>
              <div className="hs" style={{ overflowX: "auto", scrollSnapType: "x mandatory" }}>
                <div style={{ display: "flex", gap: 16, padding: "16px 24px 24px", width: "max-content", margin: "0 auto" }}>
                  {sec.items.map(item => <PhoneCard key={item.id} item={item} onOpen={() => setLightboxVideo(item.video)} />)}
                </div>
              </div>
            </Fade>
          </section>
        ))}

        {/* ── Travel Banner ── */}
        {cfg.sectionToggles.travelBanner && (
          <section style={{ padding: "0" }}>
            <TravelBanner data={cfg.travelBanner} />
          </section>
        )}

        {/* ── Portfolio Filter + Grid Video Sections ── */}
        <section style={{ padding: "48px 16px 0", textAlign: "center" }}>
          <SectionHeader title={cfg.sectionText.portfolioTitle} />
          <CategoryFilter categories={filterCategories} active={activeFilter} onChange={setActiveFilter} />
        </section>

        {gridSections
          .filter(sec => activeFilter === "all" || sec.id === activeFilter)
          .map(sec => (
            <section key={sec.id} style={{ padding: "16px 16px 32px" }}>
              <SectionHeader title={sec.title} />
              <div className="phone-grid" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, padding: "16px 0" }}>
                {sec.items.map((item, idx) => (
                  <Fade key={item.id} delay={idx * 0.06}>
                    <PhoneCard item={item} onOpen={() => setLightboxVideo(item.video)} />
                  </Fade>
                ))}
              </div>
            </section>
          ))}

        {/* ── Home + Jewellery (Half Sections Side by Side) ── */}
        {halfSections.some(s => activeFilter === "all" || s.id === activeFilter) && (
          <section style={{ padding: "16px 16px 32px" }}>
            <div className="home-jewellery-row" style={{ display: "flex", gap: 24, justifyContent: "center" }}>
              {halfSections
                .filter(sec => activeFilter === "all" || sec.id === activeFilter)
                .map(sec => (
                  <div key={sec.id} style={{ flex: "1", maxWidth: 380, textAlign: "center" }}>
                    <SectionHeader title={sec.title} />
                    <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: "16px 0" }}>
                      {sec.items.map((item, idx) => (
                        <Fade key={item.id} delay={idx * 0.08}>
                          <PhoneCard item={item} onOpen={() => setLightboxVideo(item.video)} />
                        </Fade>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* ── Web Content + YouTube Ads ── */}
        {cfg.sectionToggles.webContent && cfg.webContent.length > 0 && (
          <section style={{ padding: "48px 24px 32px" }}>
            <div className="web-content-row" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 600, margin: "0 auto" }}>
              {cfg.webContent.map((wc, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <h3 style={{ fontFamily: display, fontSize: "1rem", letterSpacing: ".1em", marginBottom: 12, fontWeight: 400 }}>{wc.title}</h3>
                  <div style={{ borderRadius: 8, overflow: "hidden", background: "#eee", aspectRatio: "4/3" }}>
                    <img src={wc.img} alt={wc.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── UGC Images ── */}
        {cfg.sectionToggles.ugcImages && (
          <section style={{ padding: "48px 0 32px" }}>
            <div style={{ padding: "0 24px" }}>
              <SectionHeader title={cfg.sectionText.ugcImagesTitle} />
            </div>
            <ImageGrid images={cfg.ugcImages} />
          </section>
        )}

        {/* ── Testimonials ── */}
        {cfg.sectionToggles.testimonials && (
          <section id="testimonials" style={{ padding: "48px 24px 48px" }}>
            <SectionHeader title={cfg.sectionText.testimonialsTitle} sub={cfg.sectionText.testimonialsSubtitle} />
            <Fade delay={.1}>
              <div className="testimonials-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 700, margin: "0 auto" }}>
                {cfg.testimonials.map((t, i) => (
                  <TestimonialCard key={i} item={t} />
                ))}
              </div>
            </Fade>
          </section>
        )}

        {/* ── Footer ── */}
        <footer id="contact" style={{ position: "relative", background: "#3d4a2f", color: "white", padding: "64px 32px 48px", overflow: "hidden" }}>
          {cfg.footer.backgroundImage && (
            <img src={cfg.footer.backgroundImage} alt="" style={{ position: "absolute", right: 0, bottom: 0, height: "100%", width: "50%", objectFit: "cover", opacity: .25 }} />
          )}
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{ fontFamily: display, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, letterSpacing: ".06em", marginBottom: 32 }}>
              {cfg.footer.heading}
            </h2>
            <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", gap: 48 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, letterSpacing: ".12em", color: "#c4d4a0", fontFamily: sans, marginBottom: 4 }}>{cfg.footer.contactLabel}</p>
                <p style={{ fontSize: 13, fontFamily: sans, opacity: .8, marginBottom: 20 }}>{cfg.footer.contactSub}</p>

                <p style={{ fontSize: 11, letterSpacing: ".12em", color: "#c4d4a0", fontFamily: sans, marginBottom: 4 }}>{cfg.footer.emailLabel}</p>
                <a href={`mailto:${g.email}`} style={{ fontSize: 13, fontFamily: sans, opacity: .8, display: "block", marginBottom: 20 }}>{g.email}</a>

                <p style={{ fontSize: 11, letterSpacing: ".12em", color: "#c4d4a0", fontFamily: sans, marginBottom: 4 }}>{cfg.footer.instagramLabel}</p>
                <a href={g.instagramUrl} style={{ fontSize: 13, fontFamily: sans, opacity: .8 }}>{cfg.footer.instagramHandle}</a>

                <ContactForm email={g.email} />
              </div>
              <div style={{ flex: 1 }}>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {cfg.services.map((s, i) => (
                    <li key={i} style={{ fontSize: 12, letterSpacing: ".1em", fontFamily: sans, opacity: .9 }}>
                      <span style={{ color: "#c4d4a0", marginRight: 8 }}>&bull;</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p style={{ marginTop: 40, fontSize: 10, color: "rgba(255,255,255,.3)", fontFamily: sans, letterSpacing: ".08em" }}>
              © {new Date().getFullYear()} {g.copyrightName}
            </p>
          </div>
        </footer>
    </main>
    </>
  );
}
