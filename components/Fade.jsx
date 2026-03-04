"use client";
import { useState, useEffect, useRef } from "react";

export default function Fade({ children, delay }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); ob.unobserve(el); }
    }, { threshold: 0.08 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `all .7s cubic-bezier(.22,1,.36,1) ${delay || 0}s` }}>
      {children}
    </div>
  );
}
