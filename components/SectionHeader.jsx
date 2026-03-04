import Fade from "./Fade";
import { serif, sans } from "@/lib/data";

export default function SectionHeader({ tag, count, title, sub }) {
  return (
    <Fade>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <p style={{ fontSize: 11, fontWeight: 500, color: "#999", letterSpacing: ".14em", textTransform: "uppercase", fontFamily: sans }}>/{tag}</p>
        <span style={{ fontSize: 11, fontWeight: 500, color: "#999", fontFamily: sans }}>({String(count).padStart(2, "0")})</span>
      </div>
      <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, color: "#1a1a1a", marginBottom: sub ? 8 : 16 }}>{title}</h2>
      {sub ? <p style={{ fontSize: 13, color: "#999", marginBottom: 16, fontFamily: sans }}>{sub}</p> : null}
    </Fade>
  );
}
