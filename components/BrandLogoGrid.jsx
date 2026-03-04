import { display } from "@/lib/data";

export default function BrandLogoGrid({ brands, moreText }) {
  const doubled = [...brands, ...brands];

  return (
    <div>
      <div style={{ overflow: "hidden", maxWidth: 800, margin: "0 auto" }}>
        <div className="marquee-track" style={{ display: "flex", gap: 24, width: "max-content" }}>
          {doubled.map((b, i) => (
            <img
              key={i}
              className="brand-logo"
              src={b.logo}
              alt={b.name}
              title={b.name}
              style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", background: "#f5f3f0", border: "1px solid #eee", flexShrink: 0 }}
            />
          ))}
        </div>
      </div>
      {moreText && (
        <p style={{ textAlign: "center", marginTop: 16, fontFamily: display, fontSize: 12, letterSpacing: ".15em", color: "#3d4a2f" }}>{moreText}</p>
      )}
    </div>
  );
}
