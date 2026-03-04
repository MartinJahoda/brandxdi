import { display, sans } from "@/lib/data";

const Star = () => (
  <svg width="13" height="13" viewBox="0 0 20 20" fill="#c4a843">
    <path d="M10 1l2.4 7.4H20l-6.2 4.5 2.4 7.4L10 15.9l-6.2 4.4 2.4-7.4L0 8.4h7.6z" />
  </svg>
);

export default function TestimonialCard({ item }) {
  return (
    <div
      className="testimonial-card"
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        borderLeft: "3px solid #3d4a2f",
        boxShadow: "0 4px 20px rgba(0,0,0,.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {item.brandLogo && (
          <div style={{ width: 52, height: 52, borderRadius: 10, background: "#f5f3f0", border: "1px solid #eee", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 6 }}>
            <img src={item.brandLogo} alt={item.brandName} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        )}
        <div>
          <p style={{ fontFamily: display, fontSize: 13, letterSpacing: ".05em", color: "#1a1a1a", marginBottom: 4 }}>
            {item.brandName}
          </p>
          <div style={{ display: "flex", gap: 2 }}>
            {[...Array(5)].map((_, i) => <Star key={i} />)}
          </div>
        </div>
      </div>

      <p style={{ fontSize: 12.5, color: "#444", lineHeight: 1.85, fontFamily: sans, fontStyle: "italic", flex: 1 }}>
        &ldquo;{item.quote}&rdquo;
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12, borderTop: "1px solid #f0ece7" }}>
        <div style={{ width: 20, height: 2, background: "#c4d4a0", borderRadius: 1, flexShrink: 0 }} />
        <p style={{ fontSize: 10, color: "#888", letterSpacing: ".1em", textTransform: "uppercase", fontFamily: sans, fontWeight: 600 }}>
          {item.author}
        </p>
      </div>
    </div>
  );
}
