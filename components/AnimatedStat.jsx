"use client";
import { useState, useEffect, useRef } from "react";
import { display } from "@/lib/data";

function parseStatValue(str) {
  const match = str.match(/^([\d.]+)(.*)$/);
  if (!match) return { num: 0, suffix: str };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

export default function AnimatedStat({ value, label }) {
  const ref = useRef(null);
  const [displayNum, setDisplayNum] = useState(0);
  const [started, setStarted] = useState(false);
  const { num, suffix } = parseStatValue(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          setStarted(true);
          ob.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 40;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNum(num * eased);
      if (step >= steps) {
        setDisplayNum(num);
        clearInterval(interval);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, num]);

  const formatted = Number.isInteger(num)
    ? Math.round(displayNum).toString()
    : displayNum.toFixed(1);

  return (
    <div ref={ref}>
      <p style={{ fontFamily: display, fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 400, color: "#1a1a1a", letterSpacing: ".04em" }}>
        {started ? formatted : "0"}{suffix}
      </p>
    </div>
  );
}
