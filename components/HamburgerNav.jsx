"use client";
import { useState } from "react";
import { HamburgerIcon, CloseIcon } from "./icons";

export default function HamburgerNav() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Work", href: "#work" },
    { label: "Analytics", href: "#analytics" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ position: "absolute", top: 20, right: 20, zIndex: 50, background: "none", border: "none", cursor: "pointer", color: "#1a1a1a", padding: 8 }}
        aria-label="Open menu"
      >
        <HamburgerIcon />
      </button>

      {open && (
        <div className="menu-overlay">
          <button
            onClick={() => setOpen(false)}
            style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", color: "#1a1a1a", padding: 8 }}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}
    </>
  );
}
