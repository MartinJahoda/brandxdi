"use client";
import { useState, useEffect } from "react";
import { display, sans } from "@/lib/data";
import { getConfig, saveConfig, resetConfig, DEFAULT_CONFIG } from "@/lib/config";

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
    try { const url = await uploadFile(file); onUploaded(url); }
    catch { alert("Upload failed."); }
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

/* ─── Toggle component ─── */
function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} style={{ position: "relative", width: 52, height: 28, borderRadius: 14, border: "none", cursor: "pointer", background: value ? "#3d4a2f" : "#ccc", transition: "background .2s", flexShrink: 0 }}>
      <span style={{ position: "absolute", top: 3, left: value ? 27 : 3, width: 22, height: 22, borderRadius: "50%", background: "white", transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,.2)" }} />
    </button>
  );
}

/* ─── Shared styles ─── */
const S = {
  inp: { width: "100%", padding: "9px 12px", border: "1px solid #e5e2dd", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: 13, background: "white", color: "#1a1a1a", outline: "none" },
  ta: { width: "100%", padding: "9px 12px", border: "1px solid #e5e2dd", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: 13, background: "white", color: "#1a1a1a", outline: "none", resize: "vertical", minHeight: 80 },
  label: { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#888", marginBottom: 5, fontFamily: "var(--font-sans)" },
  card: { background: "white", border: "1px solid #e9e5e0", borderRadius: 16, padding: 20, marginBottom: 14 },
  row: { display: "flex", gap: 12, marginBottom: 12 },
  col: { flex: 1 },
  h2: { fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 400, color: "#1a1a1a", marginBottom: 20, letterSpacing: ".04em" },
  rmBtn: { background: "#fff0f0", border: "1px solid #fcc", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 11, color: "#c0392b", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" },
  addBtn: { background: "#f5f3f0", border: "1px solid #e5e2dd", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, color: "#3a3a3a", fontFamily: "var(--font-sans)", fontWeight: 500 },
};

/* ─── Login ─── */
function Login({ onLogin }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);
  const go = async () => {
    setLoading(true); setErr("");
    try {
      const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user: u, pass: p }) });
      const data = await res.json();
      if (data.ok) onLogin(); else setErr(data.error || "Invalid credentials.");
    } catch { setErr("Login failed."); }
    setLoading(false);
  };
  return (
    <div style={{ minHeight: "100vh", background: "#3d4a2f", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "white", borderRadius: 24, padding: 40, width: "100%", maxWidth: 380, textAlign: "center" }}>
        <h1 style={{ fontFamily: display, fontSize: "1.6rem", fontWeight: 400, marginBottom: 4, letterSpacing: ".04em" }}>Admin Login</h1>
        <p style={{ fontSize: 12, color: "#999", marginBottom: 24, fontFamily: sans }}>Sign in to manage your portfolio</p>
        {err && <div style={{ background: "#fdecea", color: "#c0392b", padding: "8px 12px", borderRadius: 8, fontSize: 13, marginBottom: 12, fontFamily: sans }}>{err}</div>}
        <input style={{ ...S.inp, marginBottom: 10 }} placeholder="Username" value={u} onChange={e => setU(e.target.value)} />
        <input style={{ ...S.inp, marginBottom: 10 }} type="password" placeholder="Password" value={p} onChange={e => setP(e.target.value)} onKeyDown={e => e.key === "Enter" && go()} />
        <button onClick={go} disabled={loading} style={{ width: "100%", padding: 12, background: "#3d4a2f", color: "white", border: "none", borderRadius: 10, fontSize: 13, cursor: loading ? "wait" : "pointer", fontFamily: sans, letterSpacing: ".08em", opacity: loading ? .6 : 1 }}>{loading ? "Signing in..." : "Sign In"}</button>
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

      <div style={{ ...S.card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", fontFamily: "var(--font-sans)" }}>Coming Soon Mode</p>
          <p style={{ fontSize: 12, color: "#999", marginTop: 2, fontFamily: "var(--font-sans)" }}>
            {cfg.comingSoon ? "Site is hidden behind a coming soon page" : "Site is live and visible"}
          </p>
        </div>
        <Toggle value={cfg.comingSoon} onChange={v => setCfg(c => ({ ...c, comingSoon: v }))} />
      </div>

      {cfg.comingSoon && (
        <div style={S.card}>
          <div style={{ marginBottom: 12 }}><label style={S.label}>Message</label><input style={S.inp} value={g.comingSoonMessage} onChange={e => upG("comingSoonMessage", e.target.value)} /></div>
          <div><label style={S.label}>Label</label><input style={S.inp} value={g.comingSoonLabel} onChange={e => upG("comingSoonLabel", e.target.value)} /></div>
        </div>
      )}

      <div style={S.card}>
        <div style={S.row}>
          <div style={S.col}><label style={S.label}>Creator Name</label><input style={S.inp} value={g.name} onChange={e => upG("name", e.target.value)} /></div>
          <div style={S.col}><label style={S.label}>Job Title</label><input style={S.inp} value={g.title} onChange={e => upG("title", e.target.value)} /></div>
        </div>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Tagline</label><textarea style={{ ...S.ta, minHeight: 50 }} value={g.tagline} onChange={e => upG("tagline", e.target.value)} /></div>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Experience Text</label><input style={S.inp} value={g.experienceText} onChange={e => upG("experienceText", e.target.value)} placeholder="e.g. 2+ years experience" /></div>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Bio</label><textarea style={S.ta} value={g.bio} onChange={e => upG("bio", e.target.value)} /></div>
        <div style={S.row}>
          <div style={S.col}><label style={S.label}>Email</label><input style={S.inp} value={g.email} onChange={e => upG("email", e.target.value)} /></div>
          <div style={S.col}><label style={S.label}>Mailing Address Note</label><input style={S.inp} value={g.mailingAddress} onChange={e => upG("mailingAddress", e.target.value)} /></div>
        </div>
        <div style={S.row}>
          <div style={S.col}><label style={S.label}>Instagram URL</label><input style={S.inp} value={g.instagramUrl} onChange={e => upG("instagramUrl", e.target.value)} /></div>
          <div style={S.col}><label style={S.label}>LinkedIn URL</label><input style={S.inp} value={g.linkedinUrl} onChange={e => upG("linkedinUrl", e.target.value)} /></div>
        </div>
        <div style={S.row}>
          <div style={S.col}><label style={S.label}>YouTube URL</label><input style={S.inp} value={g.youtubeUrl} onChange={e => upG("youtubeUrl", e.target.value)} /></div>
          <div style={S.col}><label style={S.label}>TikTok URL</label><input style={S.inp} value={g.tiktokUrl} onChange={e => upG("tiktokUrl", e.target.value)} /></div>
        </div>
      </div>

      <div style={S.card}>
        <label style={S.label}>Hero Image</label>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <input style={{ ...S.inp, flex: 1 }} value={g.heroImage} onChange={e => upG("heroImage", e.target.value)} placeholder="Paste URL or upload..." />
          <UploadBtn accept="image/*" label="Upload" onUploaded={url => upG("heroImage", url)} />
        </div>
        {g.heroImage && <img src={g.heroImage} alt="Preview" style={{ width: 120, height: 160, objectFit: "cover", borderRadius: 12, border: "1px solid #e5e2dd" }} />}
      </div>

      <div style={S.card}>
        <label style={S.label}>Profile Image (footer background)</label>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <input style={{ ...S.inp, flex: 1 }} value={g.profileImg} onChange={e => upG("profileImg", e.target.value)} placeholder="Paste URL or upload..." />
          <UploadBtn accept="image/*" label="Upload" onUploaded={url => upG("profileImg", url)} />
        </div>
        {g.profileImg && <img src={g.profileImg} alt="Preview" style={{ width: 80, height: 100, objectFit: "cover", borderRadius: 12, border: "1px solid #e5e2dd" }} />}
      </div>

      <div style={S.card}>
        <label style={S.label}>Hero Background Video (optional)</label>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
          <input style={{ ...S.inp, flex: 1 }} value={g.heroVideo || ""} onChange={e => upG("heroVideo", e.target.value)} placeholder="Paste video URL or upload..." />
          <UploadBtn accept="video/*" label="Upload Video" onUploaded={url => upG("heroVideo", url)} />
        </div>
        <p style={{ fontSize: 11, color: "#aaa", fontFamily: "var(--font-sans)" }}>Leave empty to use the hero image as a static background.</p>
      </div>

      <div style={S.card}>
        <label style={S.label}>Floating CTA Button Text</label>
        <input style={S.inp} value={g.ctaButtonText || "Book Me"} onChange={e => upG("ctaButtonText", e.target.value)} placeholder="e.g. Book Me, Get in Touch" />
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
    { key: "brands", label: "Trusted By / Brands" },
    { key: "analytics", label: "Analytics" },
    { key: "testimonials", label: "Testimonials" },
    { key: "travelBanner", label: "Travel Banner" },
    { key: "ugcImages", label: "UGC Images" },
    { key: "webContent", label: "Web Content + YouTube Ads" },
    { key: "stickyCTA", label: "Sticky CTA Button" },
  ];

  const texts = [
    { key: "brandsTitle", label: "Brands Title" },
    { key: "brandsMore", label: "Brands 'More' Text" },
    { key: "analyticsTitle", label: "Analytics Title" },
    { key: "analyticsDisclaimer", label: "Analytics Disclaimer" },
    { key: "testimonialsTitle", label: "Testimonials Title" },
    { key: "testimonialsSubtitle", label: "Testimonials Subtitle" },
    { key: "ugcImagesTitle", label: "UGC Images Title" },
    { key: "portfolioTitle", label: "Portfolio Section Title" },
  ];

  return (
    <div>
      <h2 style={S.h2}>Site Sections</h2>
      <div style={S.card}>
        <p style={{ ...S.label, marginBottom: 14 }}>Section Visibility</p>
        {toggles.map((item, i) => (
          <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < toggles.length - 1 ? "1px solid #f0ece7" : "none" }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", fontFamily: "var(--font-sans)" }}>{item.label}</p>
              <p style={{ fontSize: 12, color: "#999", marginTop: 2, fontFamily: "var(--font-sans)" }}>{t[item.key] ? "Visible" : "Hidden"}</p>
            </div>
            <Toggle value={t[item.key]} onChange={v => upToggle(item.key, v)} />
          </div>
        ))}
      </div>
      <div style={S.card}>
        <p style={{ ...S.label, marginBottom: 14 }}>Section Text</p>
        {texts.map(item => (
          <div key={item.key} style={{ marginBottom: 14 }}>
            <label style={S.label}>{item.label}</label>
            <input style={S.inp} value={tx[item.key] || ""} onChange={e => upText(item.key, e.target.value)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Video Sections Tab ─── */
function SectionsTab({ cfg, setCfg }) {
  const [expanded, setExpanded] = useState(null);
  const [newSec, setNewSec] = useState({ title: "", sub: "", layout: "grid" });
  const [newCard, setNewCard] = useState({});
  const secs = cfg.sections;
  const upSecs = s => setCfg(c => ({ ...c, sections: s }));

  const upSec = (si, k, v) => { const a = [...secs]; a[si] = { ...a[si], [k]: v }; upSecs(a); };
  const rmSec = si => upSecs(secs.filter((_, j) => j !== si));
  const addSec = () => {
    if (!newSec.title.trim()) return;
    upSecs([...secs, { id: "sec_" + Date.now(), title: newSec.title, sub: newSec.sub, layout: newSec.layout, items: [] }]);
    setNewSec({ title: "", sub: "", layout: "grid" });
  };

  const upCard = (si, ci, k, v) => { const a = [...secs]; a[si] = { ...a[si], items: a[si].items.map((it, j) => j === ci ? { ...it, [k]: v } : it) }; upSecs(a); };
  const rmCard = (si, ci) => { const a = [...secs]; a[si] = { ...a[si], items: a[si].items.filter((_, j) => j !== ci) }; upSecs(a); };
  const addCard = si => {
    const n = newCard[si] || {};
    if (!n.brand || !n.cat) return;
    const a = [...secs];
    a[si] = { ...a[si], items: [...a[si].items, { id: "c_" + Date.now(), brand: n.brand, brandLogo: n.brandLogo || "", cat: n.cat.toUpperCase(), video: n.video || "", thumb: n.thumb || "" }] };
    upSecs(a);
    setNewCard(p => ({ ...p, [si]: {} }));
  };
  const upNC = (si, k, v) => setNewCard(p => ({ ...p, [si]: { ...(p[si] || {}), [k]: v } }));

  return (
    <div>
      <h2 style={S.h2}>Video Sections</h2>
      <p style={{ fontSize: 12, color: "#999", marginBottom: 16, fontFamily: sans }}>Manage video sections. Layout: scroll = horizontal scrollable, grid = centered 4-per-row, grid-half = 2 items side by side.</p>

      {secs.map((sec, si) => (
        <div key={sec.id} style={S.card}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: expanded === si ? 16 : 0 }}>
            <div style={{ flex: 1 }}>
              <input style={{ ...S.inp, fontWeight: 600, fontSize: 14, marginBottom: 4 }} value={sec.title} onChange={e => upSec(si, "title", e.target.value)} />
              <div style={{ display: "flex", gap: 8 }}>
                <input style={{ ...S.inp, fontSize: 12, flex: 1 }} value={sec.sub || ""} placeholder="Subtitle (optional)" onChange={e => upSec(si, "sub", e.target.value)} />
                <select style={{ ...S.inp, width: 120 }} value={sec.layout || "grid"} onChange={e => upSec(si, "layout", e.target.value)}>
                  <option value="scroll">Scroll</option>
                  <option value="grid">Grid (4)</option>
                  <option value="grid-half">Grid Half (2)</option>
                </select>
              </div>
            </div>
            <span style={{ fontSize: 12, color: "#999", fontFamily: sans, whiteSpace: "nowrap" }}>{sec.items.length} cards</span>
            <button style={{ ...S.addBtn, padding: "6px 12px", fontSize: 11 }} onClick={() => setExpanded(expanded === si ? null : si)}>
              {expanded === si ? "Collapse" : "Edit Cards"}
            </button>
            <button style={S.rmBtn} onClick={() => rmSec(si)}>Delete</button>
          </div>

          {expanded === si && (
            <div style={{ borderTop: "1px solid #f0ece7", paddingTop: 16 }}>
              {sec.items.map((item, ci) => (
                <div key={item.id} style={{ background: "#faf9f7", borderRadius: 10, padding: 12, marginBottom: 10 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                    {item.thumb && <img src={item.thumb} alt="" style={{ width: 36, height: 52, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />}
                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      <input style={S.inp} value={item.brand} placeholder="Brand" onChange={e => upCard(si, ci, "brand", e.target.value)} />
                      <input style={S.inp} value={item.cat} placeholder="Category" onChange={e => upCard(si, ci, "cat", e.target.value)} />
                    </div>
                    <button style={S.rmBtn} onClick={() => rmCard(si, ci)}>x</button>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                    <input style={{ ...S.inp, flex: 1 }} value={item.brandLogo || ""} placeholder="Brand Logo URL" onChange={e => upCard(si, ci, "brandLogo", e.target.value)} />
                    <UploadBtn accept="image/*" label="Logo" onUploaded={u => upCard(si, ci, "brandLogo", u)} />
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                    <input style={{ ...S.inp, flex: 1 }} value={item.video} placeholder="Video URL" onChange={e => upCard(si, ci, "video", e.target.value)} />
                    <UploadBtn accept="video/*" label="Video" onUploaded={u => upCard(si, ci, "video", u)} />
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <input style={{ ...S.inp, flex: 1 }} value={item.thumb} placeholder="Thumbnail URL" onChange={e => upCard(si, ci, "thumb", e.target.value)} />
                    <UploadBtn accept="image/*" label="Thumb" onUploaded={u => upCard(si, ci, "thumb", u)} />
                  </div>
                </div>
              ))}

              <div style={{ background: "#f0ece7", borderRadius: 10, padding: 12, marginTop: 8 }}>
                <p style={{ ...S.label, marginBottom: 8, color: "#aaa" }}>Add New Card</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                  <div><label style={S.label}>Brand *</label><input style={S.inp} value={newCard[si]?.brand || ""} onChange={e => upNC(si, "brand", e.target.value)} /></div>
                  <div><label style={S.label}>Category *</label><input style={S.inp} value={newCard[si]?.cat || ""} onChange={e => upNC(si, "cat", e.target.value)} /></div>
                </div>
                <div style={{ marginBottom: 6 }}>
                  <label style={S.label}>Brand Logo</label>
                  <div style={{ display: "flex", gap: 6 }}>
                    <input style={{ ...S.inp, flex: 1 }} value={newCard[si]?.brandLogo || ""} onChange={e => upNC(si, "brandLogo", e.target.value)} placeholder="Logo URL" />
                    <UploadBtn accept="image/*" label="Upload" onUploaded={u => upNC(si, "brandLogo", u)} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  <div style={{ flex: 1 }}><label style={S.label}>Video</label><input style={S.inp} value={newCard[si]?.video || ""} onChange={e => upNC(si, "video", e.target.value)} /></div>
                  <div style={{ alignSelf: "flex-end" }}><UploadBtn accept="video/*" label="Upload" onUploaded={u => upNC(si, "video", u)} /></div>
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <div style={{ flex: 1 }}><label style={S.label}>Thumbnail</label><input style={S.inp} value={newCard[si]?.thumb || ""} onChange={e => upNC(si, "thumb", e.target.value)} /></div>
                  <div style={{ alignSelf: "flex-end" }}><UploadBtn accept="image/*" label="Upload" onUploaded={u => upNC(si, "thumb", u)} /></div>
                </div>
                <button style={{ ...S.addBtn, padding: "9px 20px" }} onClick={() => addCard(si)}>+ Add Card</button>
              </div>
            </div>
          )}
        </div>
      ))}

      <div style={{ ...S.card, background: "#faf9f7", border: "1px dashed #d5cfc9" }}>
        <p style={{ ...S.label, marginBottom: 10 }}>Add New Section</p>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}><label style={S.label}>Title *</label><input style={S.inp} value={newSec.title} onChange={e => setNewSec(p => ({ ...p, title: e.target.value }))} /></div>
          <div style={{ flex: 1 }}><label style={S.label}>Subtitle</label><input style={S.inp} value={newSec.sub} onChange={e => setNewSec(p => ({ ...p, sub: e.target.value }))} /></div>
          <div style={{ width: 120 }}><label style={S.label}>Layout</label>
            <select style={S.inp} value={newSec.layout} onChange={e => setNewSec(p => ({ ...p, layout: e.target.value }))}>
              <option value="scroll">Scroll</option>
              <option value="grid">Grid (4)</option>
              <option value="grid-half">Grid Half (2)</option>
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}><button style={{ ...S.addBtn, padding: "9px 20px" }} onClick={addSec}>+ Add</button></div>
        </div>
      </div>
    </div>
  );
}

/* ─── Brands Tab ─── */
function BrandsTab({ cfg, setCfg }) {
  const [newB, setNewB] = useState({ name: "", logo: "" });
  const brands = cfg.brands || [];
  const upBrands = b => setCfg(c => ({ ...c, brands: b }));

  return (
    <div>
      <h2 style={S.h2}>Trusted Brands</h2>
      <p style={{ fontSize: 12, color: "#999", marginBottom: 16, fontFamily: sans }}>Each brand has a name and circular logo image.</p>
      {brands.map((b, i) => (
        <div key={i} style={{ ...S.card, display: "flex", gap: 12, alignItems: "center" }}>
          {b.logo && <img src={b.logo} alt="" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1px solid #eee" }} />}
          <div style={{ flex: 1, display: "flex", gap: 8 }}>
            <input style={{ ...S.inp, flex: 1 }} value={b.name} onChange={e => { const a = [...brands]; a[i] = { ...a[i], name: e.target.value }; upBrands(a); }} placeholder="Brand name" />
            <input style={{ ...S.inp, flex: 1 }} value={b.logo} onChange={e => { const a = [...brands]; a[i] = { ...a[i], logo: e.target.value }; upBrands(a); }} placeholder="Logo URL" />
            <UploadBtn accept="image/*" label="Upload" onUploaded={u => { const a = [...brands]; a[i] = { ...a[i], logo: u }; upBrands(a); }} />
          </div>
          <button style={S.rmBtn} onClick={() => upBrands(brands.filter((_, j) => j !== i))}>x</button>
        </div>
      ))}
      <div style={{ ...S.card, background: "#faf9f7", border: "1px dashed #d5cfc9" }}>
        <p style={{ ...S.label, marginBottom: 8 }}>Add Brand</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input style={{ ...S.inp, flex: 1 }} value={newB.name} onChange={e => setNewB(p => ({ ...p, name: e.target.value }))} placeholder="Brand name" />
          <input style={{ ...S.inp, flex: 1 }} value={newB.logo} onChange={e => setNewB(p => ({ ...p, logo: e.target.value }))} placeholder="Logo URL" />
          <UploadBtn accept="image/*" label="Upload" onUploaded={u => setNewB(p => ({ ...p, logo: u }))} />
          <button style={S.addBtn} onClick={() => { if (newB.name.trim()) { upBrands([...brands, { name: newB.name.trim(), logo: newB.logo }]); setNewB({ name: "", logo: "" }); } }}>+ Add</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Stats & Analytics Tab ─── */
function StatsTab({ cfg, setCfg }) {
  const upStat = (i, k, v) => { const a = [...cfg.stats]; a[i] = { ...a[i], [k]: v }; setCfg(c => ({ ...c, stats: a })); };
  const rmStat = i => setCfg(c => ({ ...c, stats: c.stats.filter((_, j) => j !== i) }));
  const addStat = () => setCfg(c => ({ ...c, stats: [...c.stats, { v: "", l: "" }] }));
  const upAna = (i, k, v) => { const a = [...cfg.analytics]; a[i] = { ...a[i], [k]: v }; setCfg(c => ({ ...c, analytics: a })); };
  const addAna = () => setCfg(c => ({ ...c, analytics: [...c.analytics, { img: "", caption: "" }] }));
  const rmAna = i => setCfg(c => ({ ...c, analytics: c.analytics.filter((_, j) => j !== i) }));

  return (
    <div>
      <h2 style={S.h2}>Stats & Analytics</h2>
      <div style={S.card}>
        <p style={{ ...S.label, marginBottom: 14 }}>Stats</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
          {cfg.stats.map((s, i) => (
            <div key={i} style={{ background: "#f5f3f0", borderRadius: 10, padding: 14, position: "relative" }}>
              <button style={{ ...S.rmBtn, position: "absolute", top: 8, right: 8, padding: "2px 6px" }} onClick={() => rmStat(i)}>x</button>
              <div style={{ marginBottom: 8 }}><label style={S.label}>Value</label><input style={S.inp} value={s.v} onChange={e => upStat(i, "v", e.target.value)} /></div>
              <div><label style={S.label}>Label</label><input style={S.inp} value={s.l} onChange={e => upStat(i, "l", e.target.value)} /></div>
            </div>
          ))}
        </div>
        <button style={{ ...S.addBtn, marginTop: 12 }} onClick={addStat}>+ Add Stat</button>
      </div>
      <div style={S.card}>
        <p style={{ ...S.label, marginBottom: 14 }}>Analytics (Screenshot Images)</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
          {cfg.analytics.map((a, i) => (
            <div key={i} style={{ background: "#f5f3f0", borderRadius: 10, padding: 14, position: "relative" }}>
              <button style={{ ...S.rmBtn, position: "absolute", top: 8, right: 8, padding: "2px 6px" }} onClick={() => rmAna(i)}>x</button>
              <div style={{ marginBottom: 8 }}>
                <label style={S.label}>Image</label>
                <div style={{ display: "flex", gap: 6 }}>
                  <input style={{ ...S.inp, flex: 1 }} value={a.img} onChange={e => upAna(i, "img", e.target.value)} placeholder="Image URL" />
                  <UploadBtn accept="image/*" label="Upload" onUploaded={u => upAna(i, "img", u)} />
                </div>
              </div>
              <div><label style={S.label}>Caption</label><input style={S.inp} value={a.caption} onChange={e => upAna(i, "caption", e.target.value)} /></div>
              {a.img && <img src={a.img} alt="" style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 6, marginTop: 8 }} />}
            </div>
          ))}
        </div>
        <button style={{ ...S.addBtn, marginTop: 12 }} onClick={addAna}>+ Add Analytics Image</button>
      </div>
    </div>
  );
}

/* ─── Testimonials Tab ─── */
function TestimonialsTab({ cfg, setCfg }) {
  const testimonials = cfg.testimonials || [];
  const upT = (i, k, v) => { const a = [...testimonials]; a[i] = { ...a[i], [k]: v }; setCfg(c => ({ ...c, testimonials: a })); };
  const addT = () => setCfg(c => ({ ...c, testimonials: [...(c.testimonials || []), { brandLogo: "", brandName: "", quote: "", author: "" }] }));
  const rmT = i => setCfg(c => ({ ...c, testimonials: c.testimonials.filter((_, j) => j !== i) }));

  return (
    <div>
      <h2 style={S.h2}>Testimonials</h2>
      {testimonials.map((t, i) => (
        <div key={i} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ ...S.label, margin: 0 }}>Testimonial {i + 1}</p>
            <button style={S.rmBtn} onClick={() => rmT(i)}>Remove</button>
          </div>
          <div style={S.row}>
            <div style={S.col}><label style={S.label}>Brand Name</label><input style={S.inp} value={t.brandName} onChange={e => upT(i, "brandName", e.target.value)} /></div>
            <div style={S.col}><label style={S.label}>Author</label><input style={S.inp} value={t.author} onChange={e => upT(i, "author", e.target.value)} /></div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={S.label}>Brand Logo</label>
            <div style={{ display: "flex", gap: 6 }}>
              <input style={{ ...S.inp, flex: 1 }} value={t.brandLogo} onChange={e => upT(i, "brandLogo", e.target.value)} placeholder="Logo URL" />
              <UploadBtn accept="image/*" label="Upload" onUploaded={u => upT(i, "brandLogo", u)} />
            </div>
          </div>
          <div><label style={S.label}>Quote</label><textarea style={S.ta} value={t.quote} onChange={e => upT(i, "quote", e.target.value)} /></div>
        </div>
      ))}
      <button style={S.addBtn} onClick={addT}>+ Add Testimonial</button>
    </div>
  );
}

/* ─── UGC Images Tab ─── */
function UGCImagesTab({ cfg, setCfg }) {
  const images = cfg.ugcImages || [];
  const [newUrl, setNewUrl] = useState("");
  const upImgs = imgs => setCfg(c => ({ ...c, ugcImages: imgs }));

  return (
    <div>
      <h2 style={S.h2}>UGC Images</h2>
      <p style={{ fontSize: 12, color: "#999", marginBottom: 16, fontFamily: sans }}>Lifestyle photos displayed in a grid. Recommended: 18 images (6 per row).</p>
      <div style={S.card}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 16 }}>
          {images.map((url, i) => (
            <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: 8, overflow: "hidden", border: "1px solid #eee" }}>
              <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button onClick={() => upImgs(images.filter((_, j) => j !== i))} style={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,.6)", color: "white", border: "none", borderRadius: 4, width: 18, height: 18, cursor: "pointer", fontSize: 10, lineHeight: 1 }}>x</button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input style={{ ...S.inp, flex: 1 }} value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="Paste image URL..." />
          <UploadBtn accept="image/*" label="Upload" onUploaded={u => upImgs([...images, u])} />
          <button style={S.addBtn} onClick={() => { if (newUrl.trim()) { upImgs([...images, newUrl.trim()]); setNewUrl(""); } }}>+ Add</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Web Content Tab ─── */
function WebContentTab({ cfg, setCfg }) {
  const [newItem, setNewItem] = useState({ title: "", img: "" });
  const items = cfg.webContent || [];
  const upItems = arr => setCfg(c => ({ ...c, webContent: arr }));

  return (
    <div>
      <h2 style={S.h2}>Web Content & YouTube Ads</h2>
      <p style={{ fontSize: 12, color: "#999", marginBottom: 16, fontFamily: sans }}>These appear as a 2-column grid below the portfolio sections.</p>
      {items.map((wc, i) => (
        <div key={i} style={{ ...S.card, display: "flex", gap: 12, alignItems: "flex-start" }}>
          {wc.img && <img src={wc.img} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 8, flexShrink: 0, border: "1px solid #eee" }} />}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 8 }}><label style={S.label}>Title</label><input style={S.inp} value={wc.title} onChange={e => { const a = [...items]; a[i] = { ...a[i], title: e.target.value }; upItems(a); }} /></div>
            <div style={{ display: "flex", gap: 6 }}>
              <input style={{ ...S.inp, flex: 1 }} value={wc.img} onChange={e => { const a = [...items]; a[i] = { ...a[i], img: e.target.value }; upItems(a); }} placeholder="Image URL" />
              <UploadBtn accept="image/*" label="Upload" onUploaded={u => { const a = [...items]; a[i] = { ...a[i], img: u }; upItems(a); }} />
            </div>
          </div>
          <button style={S.rmBtn} onClick={() => upItems(items.filter((_, j) => j !== i))}>Remove</button>
        </div>
      ))}
      <div style={{ ...S.card, background: "#faf9f7", border: "1px dashed #d5cfc9" }}>
        <p style={{ ...S.label, marginBottom: 8 }}>Add Item</p>
        <div style={{ marginBottom: 8 }}><label style={S.label}>Title</label><input style={S.inp} value={newItem.title} onChange={e => setNewItem(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Web Content" /></div>
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          <input style={{ ...S.inp, flex: 1 }} value={newItem.img} onChange={e => setNewItem(p => ({ ...p, img: e.target.value }))} placeholder="Image URL" />
          <UploadBtn accept="image/*" label="Upload" onUploaded={u => setNewItem(p => ({ ...p, img: u }))} />
        </div>
        <button style={S.addBtn} onClick={() => { if (newItem.title.trim()) { upItems([...items, { title: newItem.title.trim(), img: newItem.img }]); setNewItem({ title: "", img: "" }); } }}>+ Add</button>
      </div>
    </div>
  );
}

/* ─── Travel Banner Tab ─── */
function TravelBannerTab({ cfg, setCfg }) {
  const tb = cfg.travelBanner || {};
  const upTB = (k, v) => setCfg(c => ({ ...c, travelBanner: { ...c.travelBanner, [k]: v } }));

  return (
    <div>
      <h2 style={S.h2}>Travel Banner</h2>
      <div style={S.card}>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Main Text</label><input style={S.inp} value={tb.text || ""} onChange={e => upTB("text", e.target.value)} /></div>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Sub Text</label><input style={S.inp} value={tb.subtext || ""} onChange={e => upTB("subtext", e.target.value)} /></div>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Detail</label><input style={S.inp} value={tb.detail || ""} onChange={e => upTB("detail", e.target.value)} /></div>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Link URL</label><input style={S.inp} value={tb.link || ""} onChange={e => upTB("link", e.target.value)} /></div>
        <div>
          <label style={S.label}>Images (3 recommended)</label>
          {(tb.images || []).map((url, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
              <img src={url} alt="" style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
              <input style={{ ...S.inp, flex: 1 }} value={url} onChange={e => { const a = [...(tb.images || [])]; a[i] = e.target.value; upTB("images", a); }} />
              <UploadBtn accept="image/*" label="Replace" onUploaded={u => { const a = [...(tb.images || [])]; a[i] = u; upTB("images", a); }} />
              <button style={S.rmBtn} onClick={() => upTB("images", (tb.images || []).filter((_, j) => j !== i))}>x</button>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <UploadBtn accept="image/*" label="Add Image" onUploaded={u => upTB("images", [...(tb.images || []), u])} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Contact & Footer Tab ─── */
function ContactTab({ cfg, setCfg }) {
  const upG = (k, v) => setCfg(c => ({ ...c, general: { ...c.general, [k]: v } }));
  const upF = (k, v) => setCfg(c => ({ ...c, footer: { ...c.footer, [k]: v } }));
  const upSvc = svcs => setCfg(c => ({ ...c, services: svcs }));
  const [newSvc, setNewSvc] = useState("");
  const g = cfg.general;
  const f = cfg.footer;

  return (
    <div>
      <h2 style={S.h2}>Contact & Footer</h2>
      <div style={S.card}>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Contact Email</label><input style={S.inp} value={g.email} onChange={e => upG("email", e.target.value)} /></div>
        <div style={S.row}>
          <div style={S.col}><label style={S.label}>Instagram URL</label><input style={S.inp} value={g.instagramUrl} onChange={e => upG("instagramUrl", e.target.value)} /></div>
          <div style={S.col}><label style={S.label}>Copyright Name</label><input style={S.inp} value={g.copyrightName} onChange={e => upG("copyrightName", e.target.value)} /></div>
        </div>
      </div>
      <div style={S.card}>
        <p style={{ ...S.label, marginBottom: 14 }}>Footer Settings</p>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Heading</label><input style={S.inp} value={f.heading} onChange={e => upF("heading", e.target.value)} /></div>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Contact Label</label><input style={S.inp} value={f.contactLabel} onChange={e => upF("contactLabel", e.target.value)} /></div>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Contact Sub Text</label><input style={S.inp} value={f.contactSub} onChange={e => upF("contactSub", e.target.value)} /></div>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Email Label</label><input style={S.inp} value={f.emailLabel} onChange={e => upF("emailLabel", e.target.value)} /></div>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Instagram Label</label><input style={S.inp} value={f.instagramLabel} onChange={e => upF("instagramLabel", e.target.value)} /></div>
        <div style={{ marginBottom: 12 }}><label style={S.label}>Instagram Handle</label><input style={S.inp} value={f.instagramHandle} onChange={e => upF("instagramHandle", e.target.value)} /></div>
        <div>
          <label style={S.label}>Footer Background Image</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input style={{ ...S.inp, flex: 1 }} value={f.backgroundImage || ""} onChange={e => upF("backgroundImage", e.target.value)} />
            <UploadBtn accept="image/*" label="Upload" onUploaded={u => upF("backgroundImage", u)} />
          </div>
        </div>
      </div>
      <div style={S.card}>
        <p style={{ ...S.label, marginBottom: 14 }}>Services List (Footer)</p>
        {(cfg.services || []).map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
            <input style={{ ...S.inp, flex: 1 }} value={s} onChange={e => { const a = [...cfg.services]; a[i] = e.target.value; upSvc(a); }} />
            <button style={S.rmBtn} onClick={() => upSvc(cfg.services.filter((_, j) => j !== i))}>x</button>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <input style={{ ...S.inp, flex: 1 }} value={newSvc} onChange={e => setNewSvc(e.target.value)} placeholder="New service..." onKeyDown={e => e.key === "Enter" && newSvc.trim() && (upSvc([...cfg.services, newSvc.trim()]), setNewSvc(""))} />
          <button style={S.addBtn} onClick={() => { if (newSvc.trim()) { upSvc([...cfg.services, newSvc.trim()]); setNewSvc(""); } }}>+ Add</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Admin Shell ─── */
const TABS = [
  { id: "general",      label: "General" },
  { id: "siteSections", label: "Site Sections" },
  { id: "sections",     label: "Video Sections" },
  { id: "brands",       label: "Brands" },
  { id: "stats",        label: "Stats & Analytics" },
  { id: "testimonials", label: "Testimonials" },
  { id: "ugcImages",    label: "UGC Images" },
  { id: "webContent",   label: "Web Content" },
  { id: "travelBanner", label: "Travel Banner" },
  { id: "contact",      label: "Contact & Footer" },
];

function AdminShell({ onLogout }) {
  const [tab, setTab] = useState("general");
  const [cfg, setCfg] = useState(null);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => { setCfg(getConfig()); }, []);

  const save = () => { saveConfig(cfg); setSavedMsg("Saved!"); setTimeout(() => setSavedMsg(""), 2500); };
  const reset = () => { if (confirm("Reset all settings to defaults?")) { resetConfig(); setCfg(getConfig()); setSavedMsg("Reset!"); setTimeout(() => setSavedMsg(""), 2500); } };

  if (!cfg) return <div style={{ minHeight: "100vh", background: "#f5f3f0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sans }}>Loading...</div>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f3f0", fontFamily: sans }}>
      <div style={{ width: 220, background: "#3d4a2f", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "24px 20px 16px" }}>
          <h1 style={{ fontFamily: display, fontSize: "1rem", fontWeight: 400, color: "white", letterSpacing: ".05em" }}>Portfolio Admin</h1>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 2, letterSpacing: ".1em" }}>CONTENT MANAGER</p>
        </div>
        <nav style={{ flex: 1, padding: "8px 12px" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: sans, fontSize: 12, fontWeight: tab === t.id ? 600 : 400, background: tab === t.id ? "rgba(255,255,255,.15)" : "transparent", color: tab === t.id ? "white" : "rgba(255,255,255,.55)", marginBottom: 2, transition: "all .15s" }}>{t.label}</button>
          ))}
        </nav>
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,.1)" }}>
          <button onClick={save} style={{ display: "block", width: "100%", padding: "10px 0", background: "white", color: "#3d4a2f", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: sans, marginBottom: 8 }}>
            {savedMsg || "Save Changes"}
          </button>
          <a href="/" style={{ display: "block", textAlign: "center", padding: "8px 0", fontSize: 11, color: "rgba(255,255,255,.5)", fontFamily: sans, marginBottom: 4 }}>View Site</a>
          <button onClick={reset} style={{ display: "block", width: "100%", padding: "6px 0", background: "transparent", border: "none", cursor: "pointer", fontSize: 11, color: "rgba(255,255,255,.3)", fontFamily: sans }}>Reset Defaults</button>
          <button onClick={onLogout} style={{ display: "block", width: "100%", padding: "6px 0", background: "transparent", border: "none", cursor: "pointer", fontSize: 11, color: "rgba(255,255,255,.3)", fontFamily: sans }}>Logout</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: 40, maxWidth: 900 }}>
        {tab === "general"      && <GeneralTab cfg={cfg} setCfg={setCfg} />}
        {tab === "siteSections" && <SiteSectionsTab cfg={cfg} setCfg={setCfg} />}
        {tab === "sections"     && <SectionsTab cfg={cfg} setCfg={setCfg} />}
        {tab === "brands"       && <BrandsTab cfg={cfg} setCfg={setCfg} />}
        {tab === "stats"        && <StatsTab cfg={cfg} setCfg={setCfg} />}
        {tab === "testimonials" && <TestimonialsTab cfg={cfg} setCfg={setCfg} />}
        {tab === "ugcImages"    && <UGCImagesTab cfg={cfg} setCfg={setCfg} />}
        {tab === "webContent"   && <WebContentTab cfg={cfg} setCfg={setCfg} />}
        {tab === "travelBanner" && <TravelBannerTab cfg={cfg} setCfg={setCfg} />}
        {tab === "contact"      && <ContactTab cfg={cfg} setCfg={setCfg} />}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  return auth ? <AdminShell onLogout={() => setAuth(false)} /> : <Login onLogin={() => setAuth(true)} />;
}
