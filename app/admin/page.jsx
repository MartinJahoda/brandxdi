"use client";
import { useState, useEffect } from "react";
import { serif, sans } from "@/lib/data";
import { getConfig, saveConfig, resetConfig, DEFAULT_CONFIG } from "@/lib/config";

const CREDS = { user: "admin", pass: "admin123" };

/* ─── File upload helper ─── */
async function uploadFile(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url;
}

function UploadBtn({ accept, onUploaded, label }) {
  const [uploading, setUploading] = useState(false);
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onUploaded(url);
    } catch { alert("Upload failed. Please try again."); }
    setUploading(false);
    e.target.value = "";
  };
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: "#e8f4e8", border: "1px solid #b5d8b5", cursor: uploading ? "wait" : "pointer", fontSize: 11, fontWeight: 500, color: "#2d6a2d", fontFamily: "var(--font-sans)", whiteSpace: "nowrap", opacity: uploading ? .6 : 1 }}>
      {uploading ? "Uploading..." : (label || "Upload File")}
      <input type="file" accept={accept || "*"} onChange={handleFile} style={{ display: "none" }} />
    </label>
  );
}

/* ─── Shared styles ─── */
const S = {
  inp: { width: "100%", padding: "9px 12px", border: "1px solid #e5e2dd", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: 13, background: "white", color: "#1a1a1a", outline: "none" },
  ta:  { width: "100%", padding: "9px 12px", border: "1px solid #e5e2dd", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: 13, background: "white", color: "#1a1a1a", outline: "none", resize: "vertical", minHeight: 80 },
  label: { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#888", marginBottom: 5, fontFamily: "var(--font-sans)" },
  card: { background: "white", border: "1px solid #e9e5e0", borderRadius: 16, padding: 20, marginBottom: 14 },
  row:  { display: "flex", gap: 12, marginBottom: 12 },
  col:  { flex: 1 },
  h2:   { fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 300, color: "#1a1a1a", marginBottom: 20 },
  rmBtn: { background: "#fff0f0", border: "1px solid #fcc", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 11, color: "#c0392b", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" },
  addBtn: { background: "#f5f3f0", border: "1px solid #e5e2dd", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, color: "#3a3a3a", fontFamily: "var(--font-sans)", fontWeight: 500 },
};

/* ─── Login ─── */
function Login({ onLogin }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState("");
  const go = () => { if (u === CREDS.user && p === CREDS.pass) onLogin(); else setErr("Invalid credentials."); };
  return (
    <div style={{ minHeight: "100vh", background: "#f0ece7", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "white", border: "1px solid #e5e2dd", borderRadius: 24, padding: 40, width: "100%", maxWidth: 380, textAlign: "center" }}>
        <h1 style={{ fontFamily: serif, fontSize: "1.8rem", fontWeight: 300, marginBottom: 4 }}>Admin Login</h1>
        <p style={{ fontSize: 12, color: "#999", marginBottom: 24, fontFamily: sans }}>Default: admin / admin123</p>
        {err && <div style={{ background: "#fdecea", color: "#c0392b", padding: "8px 12px", borderRadius: 8, fontSize: 13, marginBottom: 12, fontFamily: sans }}>{err}</div>}
        <input style={{ ...S.inp, marginBottom: 10 }} placeholder="Username" value={u} onChange={e => setU(e.target.value)} />
        <input style={{ ...S.inp, marginBottom: 10 }} type="password" placeholder="Password" value={p} onChange={e => setP(e.target.value)} onKeyDown={e => e.key === "Enter" && go()} />
        <button onClick={go} style={{ width: "100%", padding: 12, background: "#1a1a1a", color: "white", border: "none", borderRadius: 10, fontSize: 13, cursor: "pointer", fontFamily: sans, letterSpacing: ".08em" }}>Sign In</button>
      </div>
    </div>
  );
}

/* ─── General Tab ─── */
function GeneralTab({ cfg, setCfg }) {
  const upG = (k, v) => setCfg(c => ({ ...c, general: { ...c.general, [k]: v } }));
  const g = cfg.general;
  return (
    <div>
      <h2 style={S.h2}>General Settings</h2>

      {/* Coming Soon Toggle */}
      <div style={{ ...S.card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", fontFamily: "var(--font-sans)" }}>Coming Soon Mode</p>
          <p style={{ fontSize: 12, color: "#999", marginTop: 2, fontFamily: "var(--font-sans)" }}>
            {cfg.comingSoon ? "Site is hidden behind a coming soon page" : "Site is live and visible to visitors"}
          </p>
        </div>
        <button
          onClick={() => setCfg(c => ({ ...c, comingSoon: !c.comingSoon }))}
          style={{
            position: "relative", width: 52, height: 28, borderRadius: 14, border: "none", cursor: "pointer",
            background: cfg.comingSoon ? "#1a1a1a" : "#ccc",
            transition: "background .2s",
            flexShrink: 0,
          }}
        >
          <span style={{
            position: "absolute", top: 3, left: cfg.comingSoon ? 27 : 3,
            width: 22, height: 22, borderRadius: "50%", background: "white",
            transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,.2)",
          }} />
        </button>
      </div>

      {cfg.comingSoon && (
        <div style={S.card}>
          <p style={{ ...S.label, marginBottom: 10 }}>Coming Soon Page Text</p>
          <div style={{ marginBottom: 12 }}><label style={S.label}>Message</label><input style={S.inp} value={g.comingSoonMessage} onChange={e => upG("comingSoonMessage", e.target.value)} /></div>
          <div><label style={S.label}>Label</label><input style={S.inp} value={g.comingSoonLabel} onChange={e => upG("comingSoonLabel", e.target.value)} /></div>
        </div>
      )}

      <div style={S.card}>
        <div style={S.row}>
          <div style={S.col}><label style={S.label}>Creator Name</label><input style={S.inp} value={g.name} onChange={e => upG("name", e.target.value)} /></div>
          <div style={S.col}><label style={S.label}>Job Title</label><input style={S.inp} value={g.title} onChange={e => upG("title", e.target.value)} /></div>
        </div>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Hero Subtitle (after name)</label><input style={S.inp} value={g.studioSuffix} onChange={e => upG("studioSuffix", e.target.value)} placeholder="e.g. STUDIO" /></div>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Bio</label><textarea style={S.ta} value={g.bio} onChange={e => upG("bio", e.target.value)} /></div>
        <div style={S.row}>
          <div style={S.col}><label style={S.label}>Email</label><input style={S.inp} value={g.email} onChange={e => upG("email", e.target.value)} /></div>
          <div style={S.col}><label style={S.label}>Calendly URL</label><input style={S.inp} value={g.calendlyUrl} onChange={e => upG("calendlyUrl", e.target.value)} /></div>
        </div>
        <div style={S.row}>
          <div style={S.col}><label style={S.label}>Instagram URL</label><input style={S.inp} value={g.instagramUrl} onChange={e => upG("instagramUrl", e.target.value)} /></div>
          <div style={S.col}><label style={S.label}>TikTok URL</label><input style={S.inp} value={g.tiktokUrl} onChange={e => upG("tiktokUrl", e.target.value)} /></div>
        </div>
      </div>
      <div style={S.card}>
        <label style={S.label}>Profile Image</label>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <input style={{ ...S.inp, flex: 1 }} value={g.profileImg} onChange={e => upG("profileImg", e.target.value)} placeholder="Paste URL or upload..." />
          <UploadBtn accept="image/*" label="Upload Image" onUploaded={url => upG("profileImg", url)} />
        </div>
        {g.profileImg && <img src={g.profileImg} alt="Preview" style={{ width: 100, height: 130, objectFit: "cover", borderRadius: 12, border: "1px solid #e5e2dd" }} />}
      </div>
      <div style={S.card}>
        <label style={S.label}>Testimonials Quote</label>
        <textarea style={S.ta} value={g.testimonialQuote} onChange={e => upG("testimonialQuote", e.target.value)} />
      </div>
    </div>
  );
}

/* ─── Carousel Tab ─── */
function CarouselTab({ cfg, setCfg }) {
  const [newUrl, setNewUrl] = useState("");
  const imgs = cfg.heroImages;
  const upImgs = imgs => setCfg(c => ({ ...c, heroImages: imgs }));
  return (
    <div>
      <h2 style={S.h2}>Hero Carousel Images</h2>
      <p style={{ fontSize: 12, color: "#999", marginBottom: 16, fontFamily: sans }}>Paste image URLs or upload from your device. Recommended size: 800×1000px.</p>
      {imgs.map((url, i) => (
        <div key={i} style={{ ...S.card, display: "flex", gap: 14, alignItems: "center" }}>
          {url && <img src={url} alt="" style={{ width: 56, height: 72, objectFit: "cover", borderRadius: 8, flexShrink: 0, border: "1px solid #e5e2dd" }} />}
          <input style={{ ...S.inp, flex: 1 }} value={url} onChange={e => { const a = [...imgs]; a[i] = e.target.value; upImgs(a); }} placeholder="https://..." />
          <UploadBtn accept="image/*" label="Replace" onUploaded={u => { const a = [...imgs]; a[i] = u; upImgs(a); }} />
          <button style={S.rmBtn} onClick={() => upImgs(imgs.filter((_, j) => j !== i))}>Remove</button>
        </div>
      ))}
      <div style={{ display: "flex", gap: 10, marginTop: 4, alignItems: "center" }}>
        <input style={{ ...S.inp, flex: 1 }} value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="Paste new image URL..." />
        <UploadBtn accept="image/*" label="Upload Image" onUploaded={u => { upImgs([...imgs, u]); }} />
        <button style={S.addBtn} onClick={() => { if (newUrl.trim()) { upImgs([...imgs, newUrl.trim()]); setNewUrl(""); } }}>+ Add URL</button>
      </div>
    </div>
  );
}

/* ─── Sections Tab ─── */
function SectionsTab({ cfg, setCfg }) {
  const [expanded, setExpanded] = useState(null);
  const [newSec, setNewSec] = useState({ title: "", sub: "" });
  const [newCard, setNewCard] = useState({});
  const secs = cfg.sections;
  const upSecs = s => setCfg(c => ({ ...c, sections: s }));

  const upSec = (si, k, v) => { const a = [...secs]; a[si] = { ...a[si], [k]: v }; upSecs(a); };
  const rmSec = si => upSecs(secs.filter((_, j) => j !== si));
  const addSec = () => {
    if (!newSec.title.trim()) return;
    upSecs([...secs, { id: "sec_" + Date.now(), title: newSec.title, sub: newSec.sub, items: [] }]);
    setNewSec({ title: "", sub: "" });
  };

  const upCard = (si, ci, k, v) => { const a = [...secs]; a[si].items[ci] = { ...a[si].items[ci], [k]: v }; upSecs(a); };
  const rmCard = (si, ci) => { const a = [...secs]; a[si] = { ...a[si], items: a[si].items.filter((_, j) => j !== ci) }; upSecs(a); };
  const addCard = si => {
    const n = newCard[si] || {};
    if (!n.brand || !n.cat) return;
    const a = [...secs];
    a[si].items.push({ id: "c_" + Date.now(), brand: n.brand, cat: n.cat.toUpperCase(), video: n.video || "", thumb: n.thumb || "" });
    upSecs(a);
    setNewCard(p => ({ ...p, [si]: {} }));
  };
  const upNC = (si, k, v) => setNewCard(p => ({ ...p, [si]: { ...(p[si] || {}), [k]: v } }));

  return (
    <div>
      <h2 style={S.h2}>Work Sections</h2>
      <p style={{ fontSize: 12, color: "#999", marginBottom: 16, fontFamily: sans }}>Each section contains a horizontal row of video cards. Add, edit, or remove sections and cards freely.</p>

      {secs.map((sec, si) => (
        <div key={sec.id} style={S.card}>
          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: expanded === si ? 16 : 0 }}>
            <div style={{ flex: 1 }}>
              <input style={{ ...S.inp, fontWeight: 600, fontSize: 14, marginBottom: 4 }} value={sec.title} onChange={e => upSec(si, "title", e.target.value)} />
              <input style={{ ...S.inp, fontSize: 12, color: "#777" }} value={sec.sub} placeholder="Section subtitle (optional)" onChange={e => upSec(si, "sub", e.target.value)} />
            </div>
            <span style={{ fontSize: 12, color: "#999", fontFamily: sans, whiteSpace: "nowrap" }}>{sec.items.length} cards</span>
            <button style={{ ...S.addBtn, padding: "6px 12px", fontSize: 11 }} onClick={() => setExpanded(expanded === si ? null : si)}>
              {expanded === si ? "Collapse ▲" : "Edit Cards ▼"}
            </button>
            <button style={S.rmBtn} onClick={() => rmSec(si)}>Delete</button>
          </div>

          {expanded === si && (
            <div style={{ borderTop: "1px solid #f0ece7", paddingTop: 16 }}>
              {/* Existing cards */}
              {sec.items.map((item, ci) => (
                <div key={item.id} style={{ background: "#faf9f7", borderRadius: 10, padding: 12, marginBottom: 10 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                    {item.thumb && <img src={item.thumb} alt="" style={{ width: 36, height: 52, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />}
                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      <input style={S.inp} value={item.brand} placeholder="Brand" onChange={e => upCard(si, ci, "brand", e.target.value)} />
                      <input style={S.inp} value={item.cat} placeholder="Category" onChange={e => upCard(si, ci, "cat", e.target.value)} />
                    </div>
                    <button style={S.rmBtn} onClick={() => rmCard(si, ci)}>✕</button>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                    <input style={{ ...S.inp, flex: 1 }} value={item.video} placeholder="Video URL" onChange={e => upCard(si, ci, "video", e.target.value)} />
                    <UploadBtn accept="video/*" label="Upload Video" onUploaded={u => upCard(si, ci, "video", u)} />
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <input style={{ ...S.inp, flex: 1 }} value={item.thumb} placeholder="Thumbnail URL" onChange={e => upCard(si, ci, "thumb", e.target.value)} />
                    <UploadBtn accept="image/*" label="Upload Thumb" onUploaded={u => upCard(si, ci, "thumb", u)} />
                  </div>
                </div>
              ))}

              {/* Add new card row */}
              <div style={{ background: "#f0ece7", borderRadius: 10, padding: 12, marginTop: 8 }}>
                <p style={{ ...S.label, marginBottom: 8, color: "#aaa" }}>Add New Card</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                  <div><label style={S.label}>Brand *</label><input style={S.inp} value={newCard[si]?.brand || ""} onChange={e => upNC(si, "brand", e.target.value)} placeholder="e.g. Glossier" /></div>
                  <div><label style={S.label}>Category *</label><input style={S.inp} value={newCard[si]?.cat || ""} onChange={e => upNC(si, "cat", e.target.value)} placeholder="e.g. SKINCARE" /></div>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                  <div style={{ flex: 1 }}><label style={S.label}>Video</label><input style={S.inp} value={newCard[si]?.video || ""} onChange={e => upNC(si, "video", e.target.value)} placeholder="Paste URL or upload..." /></div>
                  <div style={{ alignSelf: "flex-end", marginBottom: 1 }}><UploadBtn accept="video/*" label="Upload" onUploaded={u => upNC(si, "video", u)} /></div>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8 }}>
                  <div style={{ flex: 1 }}><label style={S.label}>Thumbnail</label><input style={S.inp} value={newCard[si]?.thumb || ""} onChange={e => upNC(si, "thumb", e.target.value)} placeholder="Paste URL or upload..." /></div>
                  <div style={{ alignSelf: "flex-end", marginBottom: 1 }}><UploadBtn accept="image/*" label="Upload" onUploaded={u => upNC(si, "thumb", u)} /></div>
                </div>
                <button style={{ ...S.addBtn, padding: "9px 20px" }} onClick={() => addCard(si)}>+ Add Card</button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add new section */}
      <div style={{ ...S.card, background: "#faf9f7", border: "1px dashed #d5cfc9" }}>
        <p style={{ ...S.label, marginBottom: 10 }}>Add New Section</p>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}><label style={S.label}>Title *</label><input style={S.inp} value={newSec.title} onChange={e => setNewSec(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Lifestyle" /></div>
          <div style={{ flex: 1 }}><label style={S.label}>Subtitle</label><input style={S.inp} value={newSec.sub} onChange={e => setNewSec(p => ({ ...p, sub: e.target.value }))} placeholder="Optional tagline" /></div>
          <div style={{ display: "flex", alignItems: "flex-end" }}><button style={{ ...S.addBtn, padding: "9px 20px" }} onClick={addSec}>+ Add Section</button></div>
        </div>
      </div>
    </div>
  );
}

/* ─── Brands Tab ─── */
function BrandsTab({ cfg, setCfg }) {
  const [newB, setNewB] = useState("");
  const brands = cfg.brands;
  const upBrands = b => setCfg(c => ({ ...c, brands: b }));
  return (
    <div>
      <h2 style={S.h2}>Trusted Brands</h2>
      <div style={S.card}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {brands.map((b, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 100, background: "#f5f3f0", border: "1px solid #e5e2dd", fontSize: 12, fontFamily: sans, color: "#3a3a3a" }}>
              {b}
              <button onClick={() => upBrands(brands.filter((_, j) => j !== i))} style={{ background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input style={{ ...S.inp, flex: 1 }} value={newB} onChange={e => setNewB(e.target.value)} onKeyDown={e => e.key === "Enter" && newB.trim() && (upBrands([...brands, newB.trim()]), setNewB(""))} placeholder="Type brand name and press Enter or click Add..." />
          <button style={S.addBtn} onClick={() => { if (newB.trim()) { upBrands([...brands, newB.trim()]); setNewB(""); } }}>+ Add</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Stats & Analytics Tab ─── */
function StatsTab({ cfg, setCfg }) {
  const upStat = (i, k, v) => { const a = [...cfg.stats]; a[i] = { ...a[i], [k]: v }; setCfg(c => ({ ...c, stats: a })); };
  const upAna = (i, k, v) => { const a = [...cfg.analytics]; a[i] = { ...a[i], [k]: v }; setCfg(c => ({ ...c, analytics: a })); };
  return (
    <div>
      <h2 style={S.h2}>Stats & Analytics</h2>
      <div style={S.card}>
        <p style={{ ...S.label, marginBottom: 14 }}>Hero Stats (shown in Trusted By section)</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
          {cfg.stats.map((s, i) => (
            <div key={i} style={{ background: "#f5f3f0", borderRadius: 10, padding: 14 }}>
              <div style={{ marginBottom: 8 }}><label style={S.label}>Value</label><input style={S.inp} value={s.v} onChange={e => upStat(i, "v", e.target.value)} placeholder="e.g. 50M+" /></div>
              <div><label style={S.label}>Label</label><input style={S.inp} value={s.l} onChange={e => upStat(i, "l", e.target.value)} placeholder="e.g. organic views" /></div>
            </div>
          ))}
        </div>
      </div>
      <div style={S.card}>
        <p style={{ ...S.label, marginBottom: 14 }}>Analytics Cards</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
          {cfg.analytics.map((a, i) => (
            <div key={i} style={{ background: "#f5f3f0", borderRadius: 10, padding: 14 }}>
              <div style={{ ...S.row, marginBottom: 8 }}>
                <div style={S.col}><label style={S.label}>Value</label><input style={S.inp} value={a.v} onChange={e => upAna(i, "v", e.target.value)} /></div>
                <div style={S.col}><label style={S.label}>Label</label><input style={S.inp} value={a.l} onChange={e => upAna(i, "l", e.target.value)} /></div>
              </div>
              <div><label style={S.label}>Description</label><input style={S.inp} value={a.d} onChange={e => upAna(i, "d", e.target.value)} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Contact Tab ─── */
function ContactTab({ cfg, setCfg }) {
  const upG = (k, v) => setCfg(c => ({ ...c, general: { ...c.general, [k]: v } }));
  const g = cfg.general;
  return (
    <div>
      <h2 style={S.h2}>Contact & Booking</h2>
      <div style={S.card}>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Contact Email</label><input style={S.inp} value={g.email} onChange={e => upG("email", e.target.value)} placeholder="hello@example.com" /></div>
        <div><label style={S.label}>Calendly Booking URL</label><input style={S.inp} value={g.calendlyUrl} onChange={e => upG("calendlyUrl", e.target.value)} placeholder="https://calendly.com/..." /></div>
      </div>
      <div style={S.card}>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Instagram URL</label><input style={S.inp} value={g.instagramUrl} onChange={e => upG("instagramUrl", e.target.value)} placeholder="https://instagram.com/..." /></div>
        <div><label style={S.label}>TikTok URL</label><input style={S.inp} value={g.tiktokUrl} onChange={e => upG("tiktokUrl", e.target.value)} placeholder="https://tiktok.com/..." /></div>
      </div>
      <div style={S.card}>
        <label style={S.label}>Copyright Name (footer)</label>
        <input style={S.inp} value={g.copyrightName} onChange={e => upG("copyrightName", e.target.value)} />
      </div>
    </div>
  );
}

/* ─── Site Sections Tab ─── */
function SiteSectionsTab({ cfg, setCfg }) {
  const upToggle = (k, v) => setCfg(c => ({ ...c, sectionToggles: { ...c.sectionToggles, [k]: v } }));
  const upText = (k, v) => setCfg(c => ({ ...c, sectionText: { ...c.sectionText, [k]: v } }));
  const t = cfg.sectionToggles;
  const tx = cfg.sectionText;

  const toggles = [
    { key: "brands", label: "Trusted By / Brands", desc: "Brand tags and stats section" },
    { key: "analytics", label: "Analytics", desc: "Results and analytics cards section" },
    { key: "testimonials", label: "Testimonials", desc: "Dark testimonial quote section" },
    { key: "bookMe", label: "Book Me", desc: "Booking / discovery call section" },
  ];

  const texts = [
    { key: "brandsTitle", label: "Brands Section Title", placeholder: "Brands that trust our content." },
    { key: "analyticsTitle", label: "Analytics Section Title", placeholder: "Results that speak." },
    { key: "bookMeTitle", label: "Book Me Title", placeholder: "Let\u2019s create together." },
    { key: "bookMeDescription", label: "Book Me Description", placeholder: "Book a discovery call to discuss your brand\u2019s content needs." },
  ];

  return (
    <div>
      <h2 style={S.h2}>Site Sections</h2>

      <div style={S.card}>
        <p style={{ ...S.label, marginBottom: 14 }}>Section Visibility</p>
        <p style={{ fontSize: 12, color: "#999", marginBottom: 16, fontFamily: "var(--font-sans)" }}>
          Toggle sections on or off. Hidden sections won&apos;t appear on the public site.
        </p>
        {toggles.map((item, i) => (
          <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < toggles.length - 1 ? "1px solid #f0ece7" : "none" }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", fontFamily: "var(--font-sans)" }}>{item.label}</p>
              <p style={{ fontSize: 12, color: "#999", marginTop: 2, fontFamily: "var(--font-sans)" }}>
                {t[item.key] ? "Visible on site" : "Hidden from site"}
              </p>
            </div>
            <button
              onClick={() => upToggle(item.key, !t[item.key])}
              style={{
                position: "relative", width: 52, height: 28, borderRadius: 14, border: "none", cursor: "pointer",
                background: t[item.key] ? "#1a1a1a" : "#ccc",
                transition: "background .2s", flexShrink: 0,
              }}
            >
              <span style={{
                position: "absolute", top: 3, left: t[item.key] ? 27 : 3,
                width: 22, height: 22, borderRadius: "50%", background: "white",
                transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,.2)",
              }} />
            </button>
          </div>
        ))}
      </div>

      <div style={S.card}>
        <p style={{ ...S.label, marginBottom: 14 }}>Section Titles & Text</p>
        <p style={{ fontSize: 12, color: "#999", marginBottom: 16, fontFamily: "var(--font-sans)" }}>
          Customize the heading text for each section.
        </p>
        {texts.map(item => (
          <div key={item.key} style={{ marginBottom: 14 }}>
            <label style={S.label}>{item.label}</label>
            <input style={S.inp} value={tx[item.key]} onChange={e => upText(item.key, e.target.value)} placeholder={item.placeholder} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Admin Shell ─── */
const TABS = [
  { id: "general",      label: "⚙ General" },
  { id: "siteSections", label: "◑ Site Sections" },
  { id: "carousel",     label: "🖼 Hero Carousel" },
  { id: "sections",     label: "▶ Video Sections" },
  { id: "brands",       label: "✦ Brands" },
  { id: "stats",        label: "📊 Stats & Analytics" },
  { id: "contact",      label: "✉ Contact & Booking" },
];

function AdminShell({ onLogout }) {
  const [tab, setTab] = useState("general");
  const [cfg, setCfg] = useState(null);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => { setCfg(getConfig()); }, []);

  const save = () => { saveConfig(cfg); setSavedMsg("Saved!"); setTimeout(() => setSavedMsg(""), 2500); };
  const reset = () => { if (confirm("Reset all settings to defaults? This cannot be undone.")) { resetConfig(); setCfg(getConfig()); setSavedMsg("Reset to defaults"); setTimeout(() => setSavedMsg(""), 2500); } };

  if (!cfg) return <div style={{ minHeight: "100vh", background: "#f0ece7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sans }}>Loading...</div>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f3f0", fontFamily: sans }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: "#1a1a1a", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "24px 20px 16px" }}>
          <h1 style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 300, color: "white", letterSpacing: ".05em" }}>Portfolio Admin</h1>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginTop: 2, letterSpacing: ".1em" }}>CONTENT MANAGER</p>
        </div>
        <nav style={{ flex: 1, padding: "8px 12px" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: sans, fontSize: 12, fontWeight: tab === t.id ? 600 : 400, background: tab === t.id ? "rgba(255,255,255,.12)" : "transparent", color: tab === t.id ? "white" : "rgba(255,255,255,.5)", marginBottom: 2, transition: "all .15s" }}>{t.label}</button>
          ))}
        </nav>
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <button onClick={save} style={{ display: "block", width: "100%", padding: "10px 0", background: "white", color: "#1a1a1a", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: sans, marginBottom: 8 }}>
            {savedMsg || "Save Changes"}
          </button>
          <a href="/" style={{ display: "block", textAlign: "center", padding: "8px 0", fontSize: 11, color: "rgba(255,255,255,.5)", fontFamily: sans, marginBottom: 4 }}>← View Site</a>
          <button onClick={() => { reset(); }} style={{ display: "block", width: "100%", padding: "6px 0", background: "transparent", border: "none", cursor: "pointer", fontSize: 11, color: "rgba(255,255,255,.3)", fontFamily: sans }}>Reset to Defaults</button>
          <button onClick={onLogout} style={{ display: "block", width: "100%", padding: "6px 0", background: "transparent", border: "none", cursor: "pointer", fontSize: 11, color: "rgba(255,255,255,.3)", fontFamily: sans }}>Logout</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: 40, maxWidth: 900 }}>
        {tab === "general"      && <GeneralTab      cfg={cfg} setCfg={setCfg} />}
        {tab === "siteSections" && <SiteSectionsTab cfg={cfg} setCfg={setCfg} />}
        {tab === "carousel"     && <CarouselTab     cfg={cfg} setCfg={setCfg} />}
        {tab === "sections" && <SectionsTab  cfg={cfg} setCfg={setCfg} />}
        {tab === "brands"   && <BrandsTab    cfg={cfg} setCfg={setCfg} />}
        {tab === "stats"    && <StatsTab     cfg={cfg} setCfg={setCfg} />}
        {tab === "contact"  && <ContactTab   cfg={cfg} setCfg={setCfg} />}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  return auth ? <AdminShell onLogout={() => setAuth(false)} /> : <Login onLogin={() => setAuth(true)} />;
}
