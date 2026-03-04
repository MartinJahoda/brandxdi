export default function Skeleton({ width, height, borderRadius }) {
  return (
    <div
      className="shimmer"
      style={{
        width: width || "100%",
        height: height || 20,
        borderRadius: borderRadius || 8,
        background: "linear-gradient(90deg, #f0ece7 25%, #e5e2dd 50%, #f0ece7 75%)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}
