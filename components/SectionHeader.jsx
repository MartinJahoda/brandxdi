import Fade from "./Fade";
import { display, sans } from "@/lib/data";

export default function SectionHeader({ title, sub }) {
  if (!title) return null;
  return (
    <Fade>
      <div style={{ textAlign: "center", marginBottom: sub ? 8 : 24 }}>
        <h2 style={{ fontFamily: display, fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 400, color: "#1a1a1a", letterSpacing: ".08em" }}>{title}</h2>
      </div>
      {sub && (
        <p style={{ textAlign: "center", fontSize: 11, color: "#999", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 24, fontFamily: sans }}>{sub}</p>
      )}
    </Fade>
  );
}
