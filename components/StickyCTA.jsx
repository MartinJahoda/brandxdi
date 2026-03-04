"use client";
import { useState, useEffect } from "react";
import { sans } from "@/lib/data";

export default function StickyCTA({ text }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const ob = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { threshold: 0 }
    );
    ob.observe(hero);
    return () => ob.disconnect();
  }, []);

  return (
    <a
      href="#contact"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 900,
        background: "#3d4a2f",
        color: "white",
        padding: "14px 28px",
        borderRadius: 50,
        fontFamily: sans,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: ".08em",
        textDecoration: "none",
        boxShadow: "0 8px 24px rgba(0,0,0,.2)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity .3s ease, transform .3s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {text || "Book Me"}
    </a>
  );
}
