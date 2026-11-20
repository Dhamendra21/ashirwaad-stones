"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Plus } from "lucide-react";

const rooms = [
  {
    id: "living",
    label: "Grand Living Room",
    image: "/assets/visualizer/luxury-living-room.jpg",
    hotspots: [
      { id: "floor", label: "Flooring", x: "35%", y: "72%", code: "IT-STA-240", dimensions: "1200 × 2400 mm", finish: "Bookmatched Polish", desc: "Italian Statuario Marble" },
      { id: "wall", label: "Feature Wall", x: "65%", y: "40%", code: "WC-ART-120", dimensions: "600 × 1200 mm", finish: "Tactile Relief", desc: "Artisanal Wall Cladding" },
      { id: "counter", label: "Side Table Top", x: "20%", y: "55%", code: "GR-BLK-300", dimensions: "1200 × 3000 mm", finish: "Leathered", desc: "Black Granite" },
    ],
  },
  {
    id: "bathroom",
    label: "Spa Bathroom Suite",
    image: "/assets/visualizer/bathroom-suite.jpg",
    hotspots: [
      { id: "floor", label: "Flooring", x: "50%", y: "80%", code: "PO-LFP-320", dimensions: "1600 × 3200 mm", finish: "Satin", desc: "Large-Format Porcelain" },
      { id: "wall", label: "Feature Wall", x: "30%", y: "35%", code: "IT-STA-240", dimensions: "1200 × 2400 mm", finish: "Honed", desc: "Italian Statuario Marble" },
      { id: "counter", label: "Vanity Top", x: "70%", y: "60%", code: "GR-BLK-300", dimensions: "1200 × 3000 mm", finish: "Polished", desc: "Black Granite" },
    ],
  },
  {
    id: "kitchen",
    label: "Monolith Kitchen",
    image: "/assets/visualizer/kitchen-island.jpg",
    hotspots: [
      { id: "floor", label: "Flooring", x: "40%", y: "75%", code: "PO-LFP-320", dimensions: "1600 × 3200 mm", finish: "Matte", desc: "Large-Format Porcelain" },
      { id: "wall", label: "Backsplash", x: "55%", y: "30%", code: "WC-ART-120", dimensions: "600 × 1200 mm", finish: "Natural", desc: "Artisanal Wall Cladding" },
      { id: "counter", label: "Island Countertop", x: "50%", y: "58%", code: "IT-STA-240", dimensions: "1200 × 2400 mm", finish: "Bookmatched Polish", desc: "Italian Statuario Marble" },
    ],
  },
];

/* ─── Desktop Floating Hotspot Card ─────────────────────────────────────── */
function DesktopHotspotCard({ hotspot, onClose }) {
  const waMsg = encodeURIComponent(
    `Hi, I'd like to request a sample of ${hotspot.desc} (${hotspot.code}) shown in the Ashirwaad Stone room visualizer. Finish: ${hotspot.finish}.`
  );

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(${hotspot.x} + 20px)`,
        top: `calc(${hotspot.y} - 80px)`,
        zIndex: 30,
        backgroundColor: "rgba(20,20,19,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(184,151,88,0.4)",
        padding: "1.25rem",
        minWidth: 260,
        boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        animation: "fadeInCard 0.25s cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <div>
          <p style={{ fontFamily: "var(--font-plus-jakarta)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B89758", fontWeight: 600, marginBottom: "0.2rem" }}>
            {hotspot.label}
          </p>
          <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.25rem", fontWeight: 500, color: "#F6F5F2", lineHeight: 1.2 }}>
            {hotspot.desc}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ background: "none", border: "none", color: "rgba(246,245,242,0.6)", cursor: "pointer", padding: "4px" }}
        >
          <X size={14} />
        </button>
      </div>

      <div style={{ borderTop: "1px solid rgba(246,245,242,0.12)", paddingTop: "0.6rem", display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.75rem", fontFamily: "var(--font-plus-jakarta)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(246,245,242,0.6)" }}>
          <span>Code:</span>
          <span style={{ color: "#F6F5F2", fontWeight: 500 }}>{hotspot.code}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(246,245,242,0.6)" }}>
          <span>Dimensions:</span>
          <span style={{ color: "#F6F5F2", fontWeight: 500 }}>{hotspot.dimensions}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(246,245,242,0.6)" }}>
          <span>Finish:</span>
          <span style={{ color: "#F6F5F2", fontWeight: 500 }}>{hotspot.finish}</span>
        </div>
      </div>

      <a
        href={`https://wa.me/919479272520?text=${waMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          marginTop: "1rem",
          textAlign: "center",
          fontFamily: "var(--font-plus-jakarta)",
          fontSize: "0.65rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "#141413",
          backgroundColor: "#B89758",
          padding: "0.5rem 0.8rem",
          textDecoration: "none",
        }}
      >
        Request Sample →
      </a>
    </div>
  );
}

/* ─── Mobile Docked Bottom Drawer (Below Image) ─────────────────────────── */
function MobileDockedHotspotDrawer({ hotspot, onClose }) {
  const waMsg = encodeURIComponent(
    `Hi, I'd like to request a sample of ${hotspot.desc} (${hotspot.code}) shown in the Ashirwaad Stone room visualizer. Finish: ${hotspot.finish}.`
  );

  return (
    <div
      style={{
        marginTop: "1rem",
        backgroundColor: "#1E1E1C",
        border: "1px solid rgba(184,151,88,0.35)",
        padding: "1.25rem",
        animation: "fadeInCard 0.25s ease both",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <div>
          <p style={{ fontFamily: "var(--font-plus-jakarta)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B89758", fontWeight: 600, marginBottom: "0.2rem" }}>
            {hotspot.label}
          </p>
          <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", fontWeight: 500, color: "#F6F5F2" }}>
            {hotspot.desc}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ background: "none", border: "none", color: "rgba(246,245,242,0.6)", padding: "4px" }}
        >
          <X size={16} />
        </button>
      </div>

      <div style={{ borderTop: "1px solid rgba(246,245,242,0.1)", paddingTop: "0.6rem", display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.75rem", fontFamily: "var(--font-plus-jakarta)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(246,245,242,0.6)" }}>
          <span>Code:</span>
          <span style={{ color: "#F6F5F2" }}>{hotspot.code}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(246,245,242,0.6)" }}>
          <span>Dimensions:</span>
          <span style={{ color: "#F6F5F2" }}>{hotspot.dimensions}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(246,245,242,0.6)" }}>
          <span>Finish:</span>
          <span style={{ color: "#F6F5F2" }}>{hotspot.finish}</span>
        </div>
      </div>

      <a
        href={`https://wa.me/919479272520?text=${waMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          marginTop: "1rem",
          textAlign: "center",
          fontFamily: "var(--font-plus-jakarta)",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "#141413",
          backgroundColor: "#B89758",
          padding: "0.7rem",
          textDecoration: "none",
        }}
      >
        Request Sample →
      </a>
    </div>
  );
}

export default function VisualizerScene() {
  const [activeRoom, setActiveRoom] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [imgVisible, setImgVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  const sectionRef = useRef(null);
  const bgOverlayRef = useRef(null);
  const headerRef = useRef(null);
  const kickerRef = useRef(null);
  const titleRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    let ctx;
    async function initGSAP() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // ── Desktop (min-width: 768px): Continuous Tactile Scrub & Depth ──
        mm.add("(min-width: 768px)", () => {
          // 1. Masked Line-by-Line Header Upward Reveal
          if (headerRef.current) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
            if (kickerRef.current) {
              tl.to(kickerRef.current, {
                yPercent: 0,
                duration: 0.8,
                ease: "power3.out",
              }, 0);
            }
            if (titleRef.current) {
              tl.to(titleRef.current, {
                yPercent: 0,
                duration: 0.9,
                ease: "power3.out",
              }, 0.1);
            }
          }

          // 2. Background Marble Parallax (-8% to 8%)
          if (bgOverlayRef.current) {
            gsap.fromTo(
              bgOverlayRef.current,
              { yPercent: -8 },
              {
                yPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }

          // 3. Viewport Aperture Expansion (scale: 0.92, opacity: 0.75 -> scale: 1, opacity: 1)
          if (frameRef.current) {
            gsap.fromTo(
              frameRef.current,
              { scale: 0.92, opacity: 0.75 },
              {
                scale: 1.0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: frameRef.current,
                  start: "top 85%",
                  end: "center center",
                  scrub: 0.8,
                },
              }
            );

            // 4. Hotspot Cascade (pop in sequentially once frame enters view)
            ScrollTrigger.create({
              trigger: frameRef.current,
              start: "top 65%",
              once: true,
              onEnter: () => {
                gsap.fromTo(
                  ".visualizer-hotspot-btn",
                  { scale: 0 },
                  {
                    scale: 1,
                    duration: 0.55,
                    stagger: 0.14,
                    ease: "back.out(1.7)",
                  }
                );
              },
            });
          }
        });

        // ── Mobile (max-width: 767px): Crisp, 60fps Once Reveals ──
        mm.add("(max-width: 767px)", () => {
          if (kickerRef.current) {
            gsap.to(kickerRef.current, {
              yPercent: 0,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 90%",
                once: true,
              },
            });
          }
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              yPercent: 0,
              duration: 0.75,
              delay: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 90%",
                once: true,
              },
            });
          }

          if (frameRef.current) {
            gsap.fromTo(
              frameRef.current,
              { opacity: 0, y: 25 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: frameRef.current,
                  start: "top 85%",
                  once: true,
                  onEnter: () => {
                    gsap.fromTo(
                      ".visualizer-hotspot-btn",
                      { scale: 0 },
                      {
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.12,
                        ease: "back.out(1.7)",
                      }
                    );
                  },
                },
              }
            );
          }
        });
      }, sectionRef);
    }

    initGSAP();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (ctx) ctx.revert();
    };
  }, []);

  function switchRoom(idx) {
    if (idx === activeRoom) return;
    setImgVisible(false);
    setActiveHotspot(null);
    setTimeout(() => {
      setActiveRoom(idx);
      setImgVisible(true);
      // Ensure hotspots appear cleanly after room switch
      requestAnimationFrame(() => {
        const btns = document.querySelectorAll(".visualizer-hotspot-btn");
        btns.forEach((b) => (b.style.transform = "scale(1)"));
      });
    }, 250);
  }

  const room = rooms[activeRoom];
  const currentHotspotData = room.hotspots.find((h) => h.id === activeHotspot);

  return (
    <section
      ref={sectionRef}
      id="visualizer"
      style={{
        width: "100%",
        backgroundColor: "#141413",
        backgroundImage: "linear-gradient(rgba(20, 20, 19, 0.88), rgba(20, 20, 19, 0.92)), url('/black-marquina-marble-2k.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "6.5rem 0 7rem",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Subtle organic black marquina marble veining overlay with 3D scrub parallax */}
      <div
        ref={bgOverlayRef}
        style={{
          position: "absolute",
          inset: "-8% 0",
          height: "116%",
          width: "100%",
          pointerEvents: "none",
          opacity: 0.18,
          mixBlendMode: "screen",
          backgroundImage: "url('/black-marquina-marble-2k.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          willChange: "transform",
        }}
      />

      <style>{`
        @keyframes fadeInCard {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hotspot-pulse {
          0% { box-shadow: 0 0 0 0 rgba(184,151,88,0.7); }
          70% { box-shadow: 0 0 0 14px rgba(184,151,88,0); }
          100% { box-shadow: 0 0 0 0 rgba(184,151,88,0); }
        }
      `}</style>

      {/* Header with Masked Line-by-Line Reveal */}
      <div
        ref={headerRef}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "min(1440px, 94vw)",
          margin: "0 auto",
          padding: "0 clamp(1rem, 3.5vw, 3rem) 2.5rem",
        }}
      >
        <div style={{ overflow: "hidden", paddingBottom: "0.2rem" }}>
          <p
            ref={kickerRef}
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#B89758",
              fontWeight: 600,
              marginBottom: "0.6rem",
              transform: "translateY(100%)",
              willChange: "transform",
            }}
          >
            03 / THE VISUALIZER
          </p>
        </div>
        <div style={{ overflow: "hidden" }}>
          <h2
            ref={titleRef}
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
              fontWeight: 400,
              color: "#F6F5F2",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              transform: "translateY(100%)",
              willChange: "transform",
            }}
          >
            See Stone in Situ.
          </h2>
        </div>
      </div>

      {/* Room Switcher Tabs */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "min(1440px, 94vw)",
          margin: "0 auto",
          padding: "0 clamp(1rem, 3.5vw, 3rem) 2.25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "0.85rem",
            paddingBottom: "0.5rem",
            scrollbarWidth: "none",
          }}
        >
          {rooms.map((r, i) => (
            <button
              key={r.id}
              onClick={() => switchRoom(i)}
              type="button"
              style={{
                flexShrink: 0,
                minHeight: 44,
                padding: "0.65rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backgroundColor: activeRoom === i ? "#B89758" : "rgba(20,20,19,0.6)",
                color: activeRoom === i ? "#141413" : "rgba(246,245,242,0.7)",
                border: activeRoom === i ? "1px solid #B89758" : "1px solid rgba(246,245,242,0.18)",
                fontWeight: activeRoom === i ? 600 : 400,
                backdropFilter: "blur(6px)",
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Room Image + Hotspots */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "min(1440px, 94vw)",
          margin: "0 auto",
          padding: "0 clamp(1rem, 3.5vw, 3rem)",
        }}
      >
        <div
          ref={frameRef}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            backgroundColor: "#0C0C0B",
            borderRadius: "3px",
            border: "1px solid rgba(246,245,242,0.12)",
            boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: imgVisible ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            <Image
              src={room.image}
              alt={room.label}
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              style={{ objectFit: "cover" }}
              priority
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(20,20,19,0.35) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Hotspots */}
          {imgVisible &&
            room.hotspots.map((h) => (
              <div
                key={h.id}
                style={{
                  position: "absolute",
                  left: h.x,
                  top: h.y,
                  transform: "translate(-50%, -50%)",
                  zIndex: 20,
                }}
              >
                <button
                  type="button"
                  className="visualizer-hotspot-btn"
                  onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
                  aria-label={`Inspect ${h.label}`}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    backgroundColor: activeHotspot === h.id ? "#B89758" : "rgba(20,20,19,0.85)",
                    border: "1.5px solid #B89758",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: activeHotspot === h.id ? "#141413" : "#B89758",
                    transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                    animation: "hotspot-pulse 2s ease-out infinite",
                    willChange: "transform",
                  }}
                >
                  <Plus size={16} strokeWidth={2.5} />
                </button>

                {/* Desktop Floating Card */}
                {isDesktop && activeHotspot === h.id && (
                  <DesktopHotspotCard
                    hotspot={h}
                    onClose={() => setActiveHotspot(null)}
                  />
                )}
              </div>
            ))}
        </div>

        {/* Mobile Docked Bottom Drawer */}
        {!isDesktop && currentHotspotData && (
          <MobileDockedHotspotDrawer
            hotspot={currentHotspotData}
            onClose={() => setActiveHotspot(null)}
          />
        )}
      </div>
    </section>
  );
}
