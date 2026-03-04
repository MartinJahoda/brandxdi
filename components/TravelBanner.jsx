import Fade from "./Fade";
import { display, sans } from "@/lib/data";

export default function TravelBanner({ data }) {
  return (
    <Fade>
      <a href={data.link || "#"} className="travel-banner" style={{ display: "flex", minHeight: 200, overflow: "hidden", textDecoration: "none", color: "inherit" }}>
        <div style={{ flex: 1, background: "#3d4a2f", color: "white", padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
          <p style={{ fontFamily: display, fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 400, letterSpacing: ".06em", lineHeight: 1.4 }}>
            {data.text} <span style={{ fontSize: "1.2em" }}>&#10024;</span>
          </p>
          <p style={{ fontFamily: display, fontSize: "clamp(1rem, 2.5vw, 1.4rem)", fontWeight: 700, letterSpacing: ".06em", marginTop: 8, lineHeight: 1.3 }}>
            {data.subtext}
          </p>
          <p style={{ fontFamily: sans, fontSize: 11, letterSpacing: ".12em", marginTop: 8, opacity: .7 }}>
            {data.detail}
          </p>
          <span style={{ position: "absolute", bottom: 24, left: 32, fontSize: 20, opacity: .4 }}>&#9992;</span>
        </div>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
          {(data.images || []).slice(0, 3).map((src, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <img src={src} alt={`Travel ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </a>
    </Fade>
  );
}
