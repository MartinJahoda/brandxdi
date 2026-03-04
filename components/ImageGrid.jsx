import Fade from "./Fade";

export default function ImageGrid({ images }) {
  return (
    <Fade>
      <div className="ugc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4, padding: "0 16px" }}>
        {images.map((src, i) => (
          <div key={i} style={{ aspectRatio: "1", overflow: "hidden" }}>
            <img src={src} alt={`UGC ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </Fade>
  );
}
