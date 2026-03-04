"use client";
import { useRef, useState, useCallback } from "react";
import { PlayIcon } from "./icons";
import { bclr } from "@/lib/utils";
import { sans, serif } from "@/lib/data";

export default function PhoneCard({ item }) {
  const vRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    const v = vRef.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }, []);

  return (
    <div className="card-lift" style={{ flex: "0 0 auto", width: 210, textAlign: "center", scrollSnapAlign: "start" }}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: -10, right: -10, zIndex: 5, width: 44, height: 44, borderRadius: "50%", background: bclr(item.brand), border: "3px solid white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,.18)", color: "white", fontSize: 9, fontWeight: 700, letterSpacing: ".03em", textTransform: "uppercase", lineHeight: 1.1, textAlign: "center", padding: 5, fontFamily: sans }}>
          {item.brand.length > 8 ? item.brand.slice(0, 7) : item.brand}
        </div>
        <div onClick={toggle} style={{ width: 195, margin: "0 auto", borderRadius: 28, overflow: "hidden", background: "#000", border: "5px solid #1a1a1a", boxShadow: "0 20px 50px rgba(0,0,0,.13)", position: "relative", cursor: "pointer", paddingTop: "177.78%" }}>
          <video ref={vRef} poster={item.thumb} muted loop playsInline preload="none" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}>
            <source src={item.video} type="video/mp4" />
          </video>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 42, height: 42, borderRadius: "50%", background: "rgba(0,0,0,.5)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", opacity: playing ? 0 : 1, transition: "opacity .3s", pointerEvents: "none" }}>
            <PlayIcon />
          </div>
        </div>
      </div>
      <p style={{ marginTop: 12, fontFamily: serif, fontSize: 13, letterSpacing: ".2em", textTransform: "uppercase", color: "#3a3a3a" }}>{item.cat}</p>
    </div>
  );
}
