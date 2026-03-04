"use client";
import { useEffect, useCallback } from "react";

export default function VideoLightbox({ videoSrc, onClose }) {
  const handleKeyDown = useCallback(
    (e) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!videoSrc) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,.9)", zIndex: 2000,
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn .25s ease",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 20, right: 20,
          background: "rgba(255,255,255,.15)", border: "none",
          borderRadius: "50%", width: 44, height: 44,
          color: "white", fontSize: 24, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(8px)",
        }}
        aria-label="Close"
      >
        &times;
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90vw", maxWidth: 400, maxHeight: "85vh",
          borderRadius: 24, overflow: "hidden", background: "#000",
        }}
      >
        <video
          autoPlay
          controls
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
