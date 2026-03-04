"use client";
import { useState } from "react";
import { sans } from "@/lib/data";

export default function ContactForm({ email }) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`UGC Inquiry from ${name} — ${brand}`);
    const body = encodeURIComponent(`Name: ${name}\nBrand/Company: ${brand}\n\n${message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.2)",
    borderRadius: 8,
    color: "white",
    fontFamily: sans,
    fontSize: 13,
    outline: "none",
    transition: "border-color .2s, box-shadow .2s",
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, marginTop: 24 }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <input
          className="contact-input"
          style={inputStyle}
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="contact-input"
          style={inputStyle}
          placeholder="Brand / Email"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
      </div>
      <textarea
        className="contact-input"
        style={{ ...inputStyle, minHeight: 100, resize: "vertical", marginBottom: 12 }}
        placeholder="Tell me about your project..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button
        type="submit"
        className="btn-cta"
        style={{
          padding: "12px 32px",
          background: "#c4d4a0",
          color: "#3d4a2f",
          border: "none",
          borderRadius: 50,
          fontFamily: sans,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: ".08em",
          cursor: "pointer",
        }}
      >
        {sent ? "OPENING EMAIL..." : "SEND MESSAGE"}
      </button>
    </form>
  );
}
