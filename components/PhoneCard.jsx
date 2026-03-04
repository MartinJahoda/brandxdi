"use client";
import { useRef, useState, useCallback } from "react";
import { PlayIcon } from "./icons";
import { display } from "@/lib/data";

export default function PhoneCard({ item, onOpen }) {
  const vRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    const v = vRef.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }, []);

  return (
    <div className="card-lift" style={{ flex: "0 0 auto", width: 170, textAlign: "center", scrollSnapAlign: "start" }}>
      <div style={{ position: "relative" }}>
        {item.brandLogo && (
          <div style={{ position: "absolute", top: -10, right: -10, zIndex: 5, width: 40, height: 40, borderRadius: "50%", background: "#fff", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,.18)", overflow: "hidden" }}>
            <img src={item.brandLogo} alt={item.brand} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
          </div>
        )}
        {onOpen && (
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(); }}
            className="expand-btn"
            style={{ position: "absolute", top: 8, left: 8, zIndex: 6, width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.2)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Watch fullscreen"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 4.5V1h3.5M7.5 1H11v3.5M11 7.5V11H7.5M4.5 11H1V7.5" />
            </svg>
          </button>
        )}
        <div onClick={toggle} className="phone-frame" style={{ width: 155, margin: "0 auto", borderRadius: 24, overflow: "hidden", background: "#000", border: "4px solid #1a1a1a", boxShadow: "0 16px 40px rgba(0,0,0,.1)", position: "relative", cursor: "pointer", paddingTop: "177.78%" }}>
          <video ref={vRef} poster={item.thumb} muted loop playsInline preload="none" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}>
            <source src={item.video} type="video/mp4" />
          </video>
          <div className="phone-hover-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 38, height: 38, borderRadius: "50%", background: "rgba(0,0,0,.45)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", opacity: playing ? 0 : 1, transition: "opacity .3s", pointerEvents: "none" }}>
            <PlayIcon />
          </div>
        </div>
      </div>
      <p style={{ marginTop: 10, fontFamily: display, fontSize: 11, letterSpacing: ".15em", color: "#3a3a3a" }}>{item.cat}</p>
    </div>
  );
}
