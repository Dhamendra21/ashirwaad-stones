"use client";
import { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
  const cursorRef = useRef(null);
  const [label, setLabel] = useState("");
  const [isPill, setIsPill] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = cursorRef.current;
    if (!el) return;

    let xTo, yTo;

    async function init() {
      const { gsap } = await import("gsap");
      xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    }
    init();

    function onMove(e) {
      if (!hasMoved) setHasMoved(true);
      if (xTo) xTo(e.clientX);
      if (yTo) yTo(e.clientY);
    }

    function checkHover(e) {
      const target = e.target;
      if (target.closest(".material-card")) {
        setIsPill(true);
        setLabel("INSPECT");
      } else if (target.closest(".compare-slider")) {
        setIsPill(true);
        setLabel("DRAG");
      } else {
        setIsPill(false);
        setLabel("");
      }
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", checkHover);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [hasMoved]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        transform: "translate(-50%, -50%)",
        width: isPill ? 90 : 36,
        height: isPill ? 32 : 36,
        borderRadius: isPill ? 999 : "50%",
        border: "1px solid rgba(184,151,88,0.7)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        background: "rgba(184,151,88,0.1)",
        fontSize: isPill ? "0.6rem" : 0,
        fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
        fontWeight: 600,
        letterSpacing: "0.15em",
        color: "#B89758",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: hasMoved ? 1 : 0,
        transition: "width 0.25s ease, height 0.25s ease, border-radius 0.25s ease, opacity 0.3s ease",
      }}
    >
      {label}
    </div>
  );
}
