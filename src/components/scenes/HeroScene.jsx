"use client";
import { useEffect, useRef } from "react";

export default function HeroScene() {
  const kickerRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    let animated = false;
    async function animate() {
      if (animated) return;
      animated = true;
      const { gsap } = await import("gsap");
      const tl = gsap.timeline({ delay: 0.1 });
      if (kickerRef.current) {
        tl.fromTo(kickerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
      }
      if (headlineRef.current) {
        tl.fromTo(headlineRef.current, { y: "100%" }, { y: "0%", duration: 0.9, ease: "power3.out" }, "-=0.3");
      }
      if (subRef.current) {
        tl.fromTo(subRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");
      }
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
      }
    }

    function onPreloaderDone() { animate(); }

    const timer = setTimeout(animate, 800);
    window.addEventListener("preloader-done", onPreloaderDone);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("preloader-done", onPreloaderDone);
    };
  }, []);

  // Magnetic CTA
  function handleBtnMouseMove(e) {
    if (window.innerWidth < 480) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 80) {
      e.currentTarget.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
    }
  }
  function handleBtnMouseLeave(e) {
    e.currentTarget.style.transform = "translate(0,0)";
  }

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#141413",
        backgroundImage: "linear-gradient(rgba(20, 20, 19, 0.82), rgba(20, 20, 19, 0.90)), url('/black-marquina-marble-2k.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem",
      }}
    >
      {/* Video background */}
      <video
        autoPlay muted loop playsInline
        poster="/black-marquina-marble-2k.jpg"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", zIndex: 0,
        }}
      >
        <source src="/assets/hero/hero-marble.mp4" type="video/mp4" />
      </video>

      {/* Radial Vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, rgba(20,20,19,0.25) 0%, rgba(20,20,19,0.85) 100%)",
        zIndex: 1,
      }} />

      {/* Strengthened Bottom Dark Gradient for Crisp Text Contrast */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to top, #141413 0%, rgba(20,20,19,0.85) 25%, rgba(20,20,19,0.6) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative", zIndex: 2,
          display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center",
          padding: "0 1.5rem", maxWidth: 900,
          gap: "1.5rem",
          width: "100%",
        }}
      >
        {/* Kicker */}
        <span
          ref={kickerRef}
          style={{
            fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
            fontSize: "0.65rem", letterSpacing: "0.22em",
            textTransform: "uppercase", fontWeight: 500,
            color: "rgba(184,151,88,0.95)",
          }}
        >
          CURATED ARCHITECTURAL SURFACES
        </span>

        {/* Headline with line mask */}
        <div style={{ overflow: "hidden", width: "100%" }}>
          <h1
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.75rem, 7vw, 6.5rem)",
              fontWeight: 400,
              color: "#F6F5F2",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Surfaces That Shape Architecture.
          </h1>
        </div>

        {/* Subtext */}
        <p
          ref={subRef}
          style={{
            fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)", lineHeight: 1.65,
            color: "rgba(246,245,242,0.7)",
            maxWidth: 520, margin: 0,
          }}
        >
          Directly sourced from the world&apos;s finest quarries.
          Precision-calibrated for the demands of exceptional architecture.
        </p>

        {/* CTA — Full-width on <480px */}
        <div ref={ctaRef} className="w-full sm:w-auto mt-2 flex justify-center">
          <a
            href="#collections"
            ref={btnRef}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
            }}
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={(e) => {
              handleBtnMouseLeave(e);
              e.currentTarget.style.background = "rgba(20,20,19,0.4)";
              e.currentTarget.style.color = "#B89758";
            }}
            className="w-full sm:w-auto text-center"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
              fontSize: "0.75rem", letterSpacing: "0.15em",
              textTransform: "uppercase", fontWeight: 600,
              color: "#B89758",
              border: "1px solid #B89758",
              padding: "0.9rem 2.25rem",
              textDecoration: "none",
              backgroundColor: "rgba(20,20,19,0.4)",
              backdropFilter: "blur(4px)",
              transition: "background 0.3s, color 0.3s, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#B89758";
              e.currentTarget.style.color = "#141413";
            }}
          >
            Explore the Collection →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden sm:flex"
        style={{
          position: "absolute", bottom: "2rem", left: "50%",
          transform: "translateX(-50%)", zIndex: 2,
          flexDirection: "column", alignItems: "center", gap: "0.5rem",
        }}
      >
        <span style={{
          fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
          fontSize: "0.6rem", letterSpacing: "0.2em",
          textTransform: "uppercase", color: "rgba(184,151,88,0.6)",
          fontWeight: 500,
        }}>
          SCROLL
        </span>
        <div style={{
          width: 1, height: 40,
          background: "linear-gradient(to bottom, rgba(184,151,88,0.6), transparent)",
        }} />
      </div>
    </section>
  );
}
