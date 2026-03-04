"use client";
import { useState, useEffect } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import PhoneCard from "@/components/PhoneCard";
import Fade from "@/components/Fade";
import SectionHeader from "@/components/SectionHeader";
import { ArrowUR, IcoIg, IcoTt, IcoMail } from "@/components/icons";
import { serif, sans } from "@/lib/data";
import { getConfig, DEFAULT_CONFIG } from "@/lib/config";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [showCal, setShowCal] = useState(false);
  const [cfg, setCfg] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    setCfg(getConfig());
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const g = cfg.general;

  if (cfg.comingSoon) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 32 }}>
        <div style={{ maxWidth: 520 }}>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.4rem,7vw,4.5rem)", fontWeight: 300, lineHeight: 1, color: "#1a1a1a", marginBottom: 12 }}>
            {g.name.toUpperCase()} <span style={{ color: "#b5b0a8" }}>{g.studioSuffix}</span>
          </h1>
          <div style={{ width: 40, height: 1, background: "#ccc", margin: "20px auto" }} />
          <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, fontFamily: sans, marginBottom: 8 }}>
            {g.comingSoonMessage}
          </p>
          <p style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#b5b0a8", fontFamily: sans, marginBottom: 32 }}>
            {g.comingSoonLabel}
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {g.instagramUrl && g.instagramUrl !== "#" && (
              <a href={g.instagramUrl} style={{ fontSize: 12, color: "#999", fontFamily: sans, letterSpacing: ".08em" }}>Instagram</a>
            )}
            {g.tiktokUrl && g.tiktokUrl !== "#" && (
              <a href={g.tiktokUrl} style={{ fontSize: 12, color: "#999", fontFamily: sans, letterSpacing: ".08em" }}>TikTok</a>
            )}
            {g.email && (
              <a href={`mailto:${g.email}`} style={{ fontSize: 12, color: "#999", fontFamily: sans, letterSpacing: ".08em" }}>{g.email}</a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <nav className="nav-pill" style={{ position: "fixed", top: 16, left: "50%", zIndex: 100, width: "calc(100% - 48px)", maxWidth: 920, padding: "13px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled ? "rgba(14,14,14,.96)" : "rgba(20,20,20,.84)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 100, boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,.28)" : "0 4px 20px rgba(0,0,0,.18)", transition: "background .4s ease, box-shadow .4s ease" }}>
        <a href="#" style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 400, letterSpacing: ".06em", color: "white" }}>{g.name}</a>
        <div className="nav-links-row" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Work", "About", "Contact"]
            .filter(l => !(l === "About" && !cfg.sectionToggles.analytics))
            .map(l => (
              <a key={l} className="nav-link" href={"#" + l.toLowerCase().replace(" ", "-")} style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 400, fontFamily: sans }}>{l}</a>
          ))}
          {cfg.sectionToggles.bookMe && (
            <a href="#book-me" className="btn-cta" style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: sans, background: "white", color: "#1a1a1a", padding: "8px 18px", borderRadius: 100, fontWeight: 500 }}>Book Me</a>
          )}
        </div>
      </nav>

      <main className="main-wrap" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px" }}>
        <div className="hero-title-wrap" style={{ background: "white", borderRadius: 24, marginTop: 92, padding: 24 }}>
          <h1 className="hero-title" style={{ fontFamily: serif, fontSize: "clamp(2.8rem,9vw,6.5rem)", lineHeight: .9, fontWeight: 300, letterSpacing: "-.02em", padding: "24px 0" }}>
            {g.name.toUpperCase()} <span style={{ color: "#b5b0a8" }}>{g.studioSuffix}</span>
          </h1>
        </div>

        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, padding: 16, marginTop: 16 }}>
          <div className="hero-carousel-wrap" style={{ height: 580 }}><HeroCarousel images={cfg.heroImages} /></div>
          <div className="hero-sidebar" style={{ display: "flex", flexDirection: "column", gap: 14, height: 580 }}>
            <Fade>
              <div className="hero-sidebar-card" style={{ border: "1px solid #e5e2dd", background: "white", borderRadius: 24, padding: 20 }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, fontFamily: sans }}>{g.name}</h2>
                <p style={{ fontSize: 13, color: "#777", marginTop: 2, fontFamily: sans }}>{g.title}</p>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "#555", marginTop: 12, fontFamily: sans }}>{g.bio}</p>
              </div>
            </Fade>
            <div className="hero-profile-img" style={{ flex: 1, minHeight: 0, borderRadius: 24, overflow: "hidden", border: "1px solid #e5e2dd" }}>
              <img src={g.profileImg} alt={g.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <Fade delay={.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[{ label: "Instagram", icon: <IcoIg />, href: g.instagramUrl }, { label: "TikTok", icon: <IcoTt />, href: g.tiktokUrl }, { label: "Contact Me", icon: <IcoMail />, href: "#contact", dark: true }].map(s => (
                  <a key={s.label} href={s.href} className="social-link" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", borderRadius: 16, border: s.dark ? "none" : "1px solid #e5e2dd", background: s.dark ? "#1a1a1a" : "white", color: s.dark ? "white" : "#3a3a3a", fontSize: 13, fontWeight: 500, fontFamily: sans }}>
                    <span>{s.label}</span>
                    <span style={{ opacity: s.dark ? 1 : .5 }}>{s.icon}</span>
                  </a>
                ))}
              </div>
            </Fade>
          </div>
        </div>

        {cfg.sectionToggles.brands && (
          <section className="sec-resp" style={{ background: "white", borderRadius: 24, marginTop: 32, padding: "48px 24px" }}>
            <SectionHeader tag={cfg.sectionText.brandsTag} count={cfg.brands.length} title={cfg.sectionText.brandsTitle} />
            <Fade delay={.1}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 1000, margin: "0 auto 40px" }}>
                {cfg.brands.map((b, i) => (
                  <span key={i} className="brand-tag" style={{ padding: "8px 18px", borderRadius: 100, background: "#f5f3f0", border: "1px solid #e9e5e0", fontSize: 12, letterSpacing: ".06em", color: "#5a5550", fontFamily: sans }}>{b}</span>
                ))}
              </div>
            </Fade>
            <Fade delay={.15}>
              <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
                {cfg.stats.map((s, i) => (
                  <div key={i}>
                    <p style={{ fontFamily: serif, fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 300, fontStyle: "italic", color: "#1a1a1a", lineHeight: 1 }}>{s.v}</p>
                    <p style={{ fontSize: 10, letterSpacing: ".2em", color: "#999", marginTop: 6, fontFamily: sans }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </Fade>
          </section>
        )}

        {cfg.sections.map((sec, si) => (
          <section key={sec.id} id={si === 0 ? "work" : undefined} className="sec-resp" style={{ background: si % 2 === 0 ? "white" : "#f5f3f0", borderRadius: 24, marginTop: 32, padding: "48px 24px", overflow: "hidden" }}>
            <SectionHeader tag={sec.title} count={sec.items.length} title={sec.title} sub={sec.sub} />
            <Fade delay={.1}>
              <div className="hs" style={{ display: "flex", gap: 20, overflowX: "auto", padding: "20px 0 24px", scrollSnapType: "x mandatory" }}>
                {sec.items.map(item => <PhoneCard key={item.id} item={item} />)}
              </div>
            </Fade>
          </section>
        ))}

        {cfg.sectionToggles.analytics && (
          <section id="about" className="sec-resp" style={{ background: "white", borderRadius: 24, marginTop: 32, padding: "48px 24px" }}>
            <SectionHeader tag={cfg.sectionText.analyticsTag} count={cfg.analytics.length} title={cfg.sectionText.analyticsTitle} />
            <p style={{ fontSize: 12, color: "#aaa", fontStyle: "italic", letterSpacing: ".1em", marginBottom: 36, marginTop: -8, fontFamily: sans }}>{cfg.sectionText.analyticsDisclaimer}</p>
            <Fade delay={.1}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
                {cfg.analytics.map((a, i) => (
                  <div key={i} className="analytic-card" style={{ background: "#f5f3f0", borderRadius: 20, padding: 28, border: "1px solid #e9e5e0", textAlign: "center" }}>
                    <p style={{ fontFamily: serif, fontSize: "2.5rem", fontWeight: 300, color: "#1a1a1a" }}>{a.v}</p>
                    <p style={{ fontSize: 10, letterSpacing: ".18em", color: "#999", textTransform: "uppercase", marginBottom: 4, fontFamily: sans }}>{a.l}</p>
                    <p style={{ fontSize: 13, color: "#aaa", fontStyle: "italic", fontFamily: sans }}>{a.d}</p>
                  </div>
                ))}
              </div>
            </Fade>
          </section>
        )}

        {cfg.sectionToggles.testimonials && (
          <section className="testimonial-section" style={{ position: "relative", overflow: "hidden", background: "#1a1a1a", borderRadius: 24, marginTop: 32, padding: "80px 24px", textAlign: "center" }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
              {cfg.heroImages.slice(0, 4).map((src, i) => {
                const pos = [{ top: 20, left: -24 }, { top: 28, right: -10 }, { bottom: 20, left: 16 }, { bottom: 12, right: 16 }][i] || {};
                const cls = ["dec-img-a", "dec-img-b", "dec-img-c", "dec-img-d"][i];
                return <img key={i} src={src} alt="" className={cls} style={{ position: "absolute", width: i === 2 ? 200 : 180, borderRadius: 16, objectFit: "cover", boxShadow: "0 4px 20px rgba(0,0,0,.3)", border: "1px solid rgba(255,255,255,.1)", ...pos, opacity: .45 }} />;
              })}
            </div>
            <Fade>
              <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
                  <p style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,.4)", letterSpacing: ".14em", textTransform: "uppercase", fontFamily: sans }}>/{cfg.sectionText.testimonialsTag}</p>
                  <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,.4)", fontFamily: sans }}>({cfg.sectionText.testimonialsCount})</span>
                </div>
                <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 300, color: "white", lineHeight: 1.2 }}>{g.testimonialQuote}</h2>
                <a href="#contact" className="btn-cta" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 32, padding: "12px 24px", borderRadius: 100, background: "white", color: "#1a1a1a", fontSize: 13, fontWeight: 500, fontFamily: sans }}>
                  {cfg.sectionText.testimonialsCta} <ArrowUR />
                </a>
              </div>
            </Fade>
          </section>
        )}

        {cfg.sectionToggles.bookMe && (
          <section id="book-me" className="book-me-inner" style={{ background: "#1a1a1a", borderRadius: 24, marginTop: 32, padding: "60px 24px", textAlign: "center" }}>
            <Fade>
              <div style={{ maxWidth: 700, margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,.4)", letterSpacing: ".14em", textTransform: "uppercase", fontFamily: sans }}>/{cfg.sectionText.bookMeTag}</p>
                  <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,.4)", fontFamily: sans }}>(01)</span>
                </div>
                <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, color: "white", marginBottom: 16 }}>{cfg.sectionText.bookMeTitle}</h2>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7, marginBottom: 32, fontFamily: sans }}>{cfg.sectionText.bookMeDescription}</p>
                {!showCal ? (
                  <button onClick={() => setShowCal(true)} className="btn-cta" style={{ padding: "14px 40px", background: "white", color: "#1a1a1a", border: "none", borderRadius: 12, cursor: "pointer", fontSize: 12, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", fontFamily: sans }}>{cfg.sectionText.bookMeButton}</button>
                ) : (
                  <div style={{ marginTop: 24, borderRadius: 16, overflow: "hidden", background: "white" }}>
                    <iframe src={g.calendlyUrl} title="Book" style={{ width: "100%", height: 700, border: "none" }} />
                  </div>
                )}
                <p style={{ marginTop: 20, fontSize: 11, color: "rgba(255,255,255,.3)", letterSpacing: ".1em", fontFamily: sans }}>Or email directly — {g.email}</p>
              </div>
            </Fade>
          </section>
        )}

        <footer id="contact" style={{ marginTop: 32, marginBottom: 16 }}>
          <div className="footer-inner" style={{ background: "#1a1a1a", borderRadius: 24, color: "white", padding: "48px 32px" }}>
            <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
              <div>
                <h3 style={{ fontFamily: serif, fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300 }}>{g.name.toUpperCase()}</h3>
                <p style={{ marginTop: 20, fontSize: 13, color: "rgba(255,255,255,.5)", fontFamily: sans }}>{g.email}</p>
              </div>
              <div>
                <h4 style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 300, marginBottom: 8 }}>{cfg.footer.heading}</h4>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.5)", lineHeight: 1.6, fontFamily: sans }}>{cfg.footer.description}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["About", "Projects", "Blog", "Contact"].map(l => <a key={l} href="#" className="footer-link" style={{ fontSize: 13, color: "rgba(255,255,255,.7)", fontWeight: 500, fontFamily: sans }}>{l}</a>)}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[{ l: "TikTok", h: g.tiktokUrl }, { l: "Instagram", h: g.instagramUrl }, { l: "Twitter", h: "#" }].map(s => <a key={s.l} href={s.h} className="footer-link" style={{ fontSize: 13, color: "rgba(255,255,255,.7)", fontWeight: 500, fontFamily: sans }}>{s.l}</a>)}
                </div>
              </div>
            </div>
            <div className="footer-bottom" style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontFamily: sans }}>© 2026 {g.copyrightName}. All rights reserved.</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", fontFamily: sans }}>{cfg.footer.tagline}</p>
              <div style={{ display: "flex", gap: 16 }}>
                <a href="#" style={{ fontSize: 11, color: "rgba(255,255,255,.5)", fontFamily: sans }}>Privacy</a>
                <a href="#" style={{ fontSize: 11, color: "rgba(255,255,255,.5)", fontFamily: sans }}>Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
