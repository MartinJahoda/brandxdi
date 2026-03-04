"use client";
import { sans } from "@/lib/data";

export default function CategoryFilter({ categories, active, onChange }) {
  const pill = (id, label) => ({
    padding: "8px 20px",
    borderRadius: 50,
    border: active === id ? "2px solid #3d4a2f" : "1px solid #ddd",
    background: active === id ? "#3d4a2f" : "white",
    color: active === id ? "white" : "#3a3a3a",
    fontFamily: sans,
    fontSize: 11,
    letterSpacing: ".1em",
    cursor: "pointer",
    transition: "all .2s",
    textTransform: "uppercase",
    fontWeight: 500,
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, padding: "0 24px", marginBottom: 32 }}>
      <button onClick={() => onChange("all")} style={pill("all", "All")}>ALL</button>
      {categories.map((cat) => (
        <button key={cat.id} onClick={() => onChange(cat.id)} style={pill(cat.id)}>
          {cat.title}
        </button>
      ))}
    </div>
  );
}
