"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [split, setSplit] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let start = null;
    const duration = 1000;
    let animFrame;

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(Math.round(p * 100));

      if (p < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        // Complete progress -> split panels
        setTimeout(() => {
          setSplit(true);
          window.dispatchEvent(new CustomEvent("preloader-done"));
          // Unmount from DOM completely
          setTimeout(() => {
            setVisible(false);
          }, 800);
        }, 100);
      }
    }

    animFrame = requestAnimationFrame(step);

    // Hard safety timer: Guaranteed unmount after 1.8 seconds max
    const hardTimer = setTimeout(() => {
      setSplit(true);
      window.dispatchEvent(new CustomEvent("preloader-done"));
      setVisible(false);
    }, 1800);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(hardTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        overflow: "hidden",
        pointerEvents: "none",
        opacity: split ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Left panel */}
      <div
        style={{
          flex: 1,
          height: "100%",
          background: "#141413",
          position: "relative",
          transform: split ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.75s cubic-bezier(0.77, 0, 0.175, 1)",
          willChange: "transform",
        }}
      >
        {/* Emblem and progress line */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            opacity: split ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          {/* Official Emblem Logo */}
          <div
            style={{
              position: "relative",
              width: "clamp(175px, 20vw, 224px)",
              aspectRatio: "1317 / 1169",
            }}
          >
            <Image
              src="/assets/brand/logo-emblem.png"
              alt="Ashirwaad Stone Emblem"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* Thin #B89758 brass progress line */}
          <div
            style={{
              width: 180,
              height: 1.5,
              background: "rgba(246,245,242,0.15)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${progress}%`,
                background: "#B89758",
                transition: "width 0.05s linear",
              }}
            />
          </div>

          <span
            style={{
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(246,245,242,0.45)",
              fontWeight: 500,
            }}
          >
            ASHIRWAAD STONE
          </span>
        </div>
      </div>

      {/* Right panel */}
      <div
        style={{
          flex: 1,
          height: "100%",
          background: "#141413",
          transform: split ? "translateX(100%)" : "translateX(0)",
          transition: "transform 0.75s cubic-bezier(0.77, 0, 0.175, 1)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
