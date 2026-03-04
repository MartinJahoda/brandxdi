"use client";
import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 900,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "rgba(61,74,47,.85)",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontSize: 18,
        boxShadow: "0 4px 16px rgba(0,0,0,.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity .3s ease, transform .3s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      &#8593;
    </button>
  );
}
