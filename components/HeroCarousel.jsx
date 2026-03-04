"use client";
import { useState, useEffect } from "react";
import { HERO_IMGS } from "@/lib/data";
import { ChevL, ChevR, ArrowUR } from "./icons";

export default function HeroCarousel({ images }) {
  const imgs = (images && images.length > 0) ? images : HERO_IMGS;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % imgs.length), 5000);
    return () => clearInterval(t);
  }, [imgs.length]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 24, overflow: "hidden", background: "#e8e4df" }}>
      {imgs.map((src, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, opacity: i === idx ? 1 : 0, transition: "opacity .6s ease" }}>
          <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ))}
      <button onClick={() => setIdx(i => (i - 1 + imgs.length) % imgs.length)} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 38, height: 38, borderRadius: 12, border: "none", cursor: "pointer", background: "rgba(23,23,23,.7)", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ChevL />
      </button>
      <button onClick={() => setIdx(i => (i + 1) % imgs.length)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 38, height: 38, borderRadius: 12, border: "none", cursor: "pointer", background: "rgba(23,23,23,.7)", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ChevR />
      </button>
      <div style={{ position: "absolute", left: 14, bottom: 14 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 12, background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)", fontSize: 13, fontWeight: 500, color: "#1a1a1a" }}>
          View Project <ArrowUR />
        </span>
      </div>
      <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 7 }}>
        {imgs.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{ width: 9, height: 9, borderRadius: "50%", border: "none", cursor: "pointer", background: i === idx ? "white" : "rgba(255,255,255,.45)", transition: "background .3s" }} />
        ))}
      </div>
      <span style={{ position: "absolute", right: 12, bottom: 12, padding: "4px 12px", borderRadius: 14, background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)", fontSize: 11, fontWeight: 500, color: "#666" }}>Selected Work</span>
    </div>
  );
}
