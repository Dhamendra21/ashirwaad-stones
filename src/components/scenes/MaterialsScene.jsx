"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const materials = [
  {
    id: "statuario",
    name: "Italian Statuario Marble",
    image: "/assets/materials/italian-marble.jpg",
    dimensions: "1200 × 2400 mm",
    finish: "Bookmatched",
    code: "IT-STA-240",
    category: "MARBLE",
    finishOptions: ["Polished", "Honed", "Satin"],
    thicknesses: ["18mm", "9mm"],
    description: "Iconic Carrara quarry extraction with pristine white background and bold, dramatic grey-gold veining calibrated for grand architectural bookmatching.",
  },
  {
    id: "granite",
    name: "Architectural Black Granite",
    image: "/assets/materials/exotic-granite.jpg",
    dimensions: "1200 × 3000 mm",
    finish: "Flamed & Leathered",
    code: "GR-BLK-300",
    category: "GRANITE",
    finishOptions: ["Polished", "Honed", "Leathered"],
    thicknesses: ["18mm", "9mm"],
    description: "Deep, absorbing basalt matrix treated with thermal flame and diamond-brush leathering for an ultra-tactile architectural surface.",
  },
  {
    id: "porcelain",
    name: "Large-Format Porcelain Slabs",
    image: "/assets/materials/porcelain-slabs.jpg",
    dimensions: "1600 × 3200 mm",
    finish: "Full-Body Vitrified",
    code: "PO-LFP-320",
    category: "PORCELAIN",
    finishOptions: ["Polished", "Satin", "Matte"],
    thicknesses: ["18mm", "9mm"],
    description: "Sintered under 15,000 tonnes of hydraulic pressure. Impervious to heat, acid, and staining with seamless full-body continuity.",
  },
  {
    id: "cladding",
    name: "Artisanal Wall Cladding",
    image: "/assets/materials/wall-cladding.png",
    dimensions: "600 × 1200 mm",
    finish: "Tactile Relief",
    code: "WC-ART-120",
    category: "CLADDING",
    finishOptions: ["Natural", "Treated", "Honed"],
    thicknesses: ["18mm", "9mm"],
    description: "Sculpted stone surfaces with rhythmic linear grooving that creates dynamic shadows and architectural depth under ambient lighting.",
  },
];

/* ─── Responsive Slab Spec Drawer & Mobile Bottom Sheet ──────────────────── */
function SlabDrawer({ material, onClose }) {
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [selectedThickness, setSelectedThickness] = useState(0);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const totalSqFt = parseFloat(length) * parseFloat(width) || 0;
  const boxSqFt = 10;
  const boxesBase = Math.ceil(totalSqFt / boxSqFt);
  const boxesWaste = Math.ceil((totalSqFt * 1.1) / boxSqFt);

  const waMsg = encodeURIComponent(
    `Hi, I'm inquiring about ${material.name} (${material.code}) at Ashirwaad Stone. Finish: ${material.finishOptions[selectedFinish]}, Thickness: ${material.thicknesses[selectedThickness]}. Please send specifications and pricing.`
  );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(20,20,19,0.72)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 500,
        }}
      />

      {/* Drawer Container with generous, comfortable padding */}
      <div
        style={{
          position: "fixed",
          ...(isDesktop
            ? {
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(580px, 100vw)",
              borderRadius: 0,
              animation: "slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
            }
            : {
              left: 0,
              right: 0,
              bottom: 0,
              maxHeight: "88svh",
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              animation: "slideInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
            }),
          backgroundColor: "#F6F5F2",
          zIndex: 501,
          overflowY: "auto",
          boxShadow: "-16px 0 50px rgba(0,0,0,0.4)",
        }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes slideInUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>

        {/* Generous Header with Subtle Luxury Brand Watermark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "2rem 2.5rem 1.75rem",
            borderBottom: "1px solid rgba(28,28,26,0.12)",
            position: "sticky",
            top: 0,
            backgroundColor: "rgba(246,245,242,0.98)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
            {/* Subtle Luxury Watermark */}
            <div
              className="w-6 h-6 opacity-40 mix-blend-multiply"
              style={{
                position: "relative",
                width: 24,
                height: 24,
                opacity: 0.4,
                mixBlendMode: "multiply",
                flexShrink: 0,
              }}
            >
              <Image
                src="/assets/brand/logo-icon.png"
                alt="Ashirwaad Stone Icon"
                fill
                sizes="24px"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#6E6A63",
                  fontWeight: 600,
                  marginBottom: "0.25rem",
                }}
              >
                {material.category} · {material.code}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.85rem",
                  fontWeight: 500,
                  color: "#1C1C1A",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                {material.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close specification"
            style={{
              background: "none",
              border: "1px solid rgba(28,28,26,0.18)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "border-color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#B89758";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(28,28,26,0.18)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <X size={18} color="#1C1C1A" />
          </button>
        </div>

        {/* Generous Content Body */}
        <div
          style={{
            padding: "2.25rem 2.5rem 3.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "2.25rem",
          }}
        >
          {/* Slab Image Container */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 10",
              overflow: "hidden",
              borderRadius: "3px",
              border: "1px solid rgba(28,28,26,0.12)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
            }}
          >
            <Image
              src={material.image}
              alt={material.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="580px"
              priority
            />
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                backgroundColor: "rgba(20,20,19,0.85)",
                backdropFilter: "blur(6px)",
                padding: "0.4rem 0.85rem",
                borderLeft: "2px solid #B89758",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#F6F5F2",
                  fontWeight: 600,
                }}
              >
                {material.code} · {material.dimensions}
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "0.95rem",
              lineHeight: 1.75,
              color: "#6E6A63",
            }}
          >
            {material.description}
          </p>

          {/* Dimensions & Default Finish Spec Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              paddingBottom: "1.75rem",
              borderBottom: "1px solid rgba(28,28,26,0.1)",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#6E6A63",
                  fontWeight: 600,
                  marginBottom: "0.4rem",
                }}
              >
                DIMENSIONS
              </p>
              <p
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#1C1C1A",
                }}
              >
                {material.dimensions}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#6E6A63",
                  fontWeight: 600,
                  marginBottom: "0.4rem",
                }}
              >
                DEFAULT FINISH
              </p>
              <p
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#1C1C1A",
                }}
              >
                {material.finish}
              </p>
            </div>
          </div>

          {/* Finish Options Selector */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6E6A63",
                fontWeight: 600,
                marginBottom: "0.75rem",
              }}
            >
              SELECT SURFACE FINISH
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {material.finishOptions.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setSelectedFinish(i)}
                  style={{
                    padding: "0.65rem 1.25rem",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-plus-jakarta)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    border: selectedFinish === i ? "1px solid #B89758" : "1px solid rgba(28,28,26,0.18)",
                    backgroundColor: selectedFinish === i ? "rgba(184,151,88,0.12)" : "transparent",
                    color: selectedFinish === i ? "#B89758" : "#6E6A63",
                    fontWeight: selectedFinish === i ? 600 : 500,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Calibrated Thickness Selector */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6E6A63",
                fontWeight: 600,
                marginBottom: "0.75rem",
              }}
            >
              CALIBRATED THICKNESS
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {material.thicknesses.map((t, i) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedThickness(i)}
                  style={{
                    padding: "0.65rem 1.25rem",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-plus-jakarta)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    border: selectedThickness === i ? "1px solid #B89758" : "1px solid rgba(28,28,26,0.18)",
                    backgroundColor: selectedThickness === i ? "rgba(184,151,88,0.12)" : "transparent",
                    color: selectedThickness === i ? "#B89758" : "#6E6A63",
                    fontWeight: selectedThickness === i ? 600 : 500,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Room Area & Wastage Calculator */}
          <div
            style={{
              backgroundColor: "#EDEAE4",
              padding: "1.75rem 2rem",
              borderLeft: "3px solid #B89758",
              borderRadius: "3px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.03)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#1C1C1A",
                fontWeight: 600,
                marginBottom: "1.25rem",
              }}
            >
              ROOM AREA & WASTAGE CALCULATOR
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#6E6A63",
                    marginBottom: "0.45rem",
                    fontWeight: 500,
                  }}
                >
                  LENGTH (FT)
                </label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="e.g. 20"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    backgroundColor: "#F6F5F2",
                    border: "1px solid rgba(28,28,26,0.2)",
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.9rem",
                    color: "#1C1C1A",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#6E6A63",
                    marginBottom: "0.45rem",
                    fontWeight: 500,
                  }}
                >
                  WIDTH (FT)
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="e.g. 15"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    backgroundColor: "#F6F5F2",
                    border: "1px solid rgba(28,28,26,0.2)",
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.9rem",
                    color: "#1C1C1A",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {totalSqFt > 0 ? (
              <div
                style={{
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(28,28,26,0.12)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.55rem",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-plus-jakarta)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", color: "#6E6A63" }}>
                  <span>Total Floor Area:</span>
                  <span style={{ fontWeight: 600, color: "#1C1C1A" }}>{totalSqFt.toFixed(1)} sq.ft</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#6E6A63" }}>
                  <span>Base Slabs Needed:</span>
                  <span style={{ fontWeight: 600, color: "#1C1C1A" }}>{boxesBase} boxes</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#B89758" }}>
                  <span style={{ fontWeight: 500 }}>+10% Precision Cut Allowance:</span>
                  <span style={{ fontWeight: 700 }}>{boxesWaste} boxes</span>
                </div>
              </div>
            ) : (
              <p
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.75rem",
                  color: "#6E6A63",
                  marginTop: "0.25rem",
                }}
              >
                Enter room dimensions in feet to estimate full slab boxes required.
              </p>
            )}
          </div>

          {/* WhatsApp Action Button */}
          <a
            href={`https://wa.me/919479272520?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              width: "100%",
              padding: "1.1rem 1.5rem",
              textAlign: "center",
              backgroundColor: "#141413",
              color: "#F6F5F2",
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid #141413",
              transition: "all 0.3s ease",
              marginTop: "0.5rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#B89758";
              e.currentTarget.style.borderColor = "#B89758";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#141413";
              e.currentTarget.style.borderColor = "#141413";
            }}
          >
            INQUIRE VIA WHATSAPP →
          </a>
        </div>
      </div>
    </>
  );
}

/* ─── Individual Slab Card with Generous Padding & Parallax Inner ───────── */
function MaterialCard({ material, onClick, innerRef }) {
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    if (window.innerWidth < 768) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 5}deg) translateY(-6px)`;
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)";
    }
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: "#EDEAE4",
        border: "1px solid rgba(28,28,26,0.12)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease",
        boxShadow: "0 14px 35px rgba(28,28,26,0.06)",
        borderRadius: "3px",
        height: "100%",
      }}
    >
      {/* 3:4 Image Container with Parallax Drift Target */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4", overflow: "hidden" }}>
        <div
          ref={innerRef}
          style={{
            position: "absolute",
            inset: "-8% 0",
            width: "100%",
            height: "116%",
            willChange: "transform",
          }}
        >
          <Image
            src={material.image}
            alt={material.name}
            fill
            sizes="(max-width: 768px) 82vw, 360px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(28,28,26,0.4) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Floating Category Tag */}
        <div
          style={{
            position: "absolute",
            top: "1.1rem",
            left: "1.1rem",
            backgroundColor: "rgba(20,20,19,0.85)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            padding: "0.35rem 0.75rem",
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#F6F5F2",
              fontWeight: 600,
            }}
          >
            {material.category}
          </span>
        </div>
      </div>

      {/* Info Area with Generous Padding */}
      <div
        style={{
          padding: "1.75rem 1.6rem 1.85rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1.25rem",
          backgroundColor: "#EDEAE4",
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.45rem",
              fontWeight: 500,
              color: "#1C1C1A",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              marginBottom: "0.45rem",
            }}
          >
            {material.name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "0.8rem",
              color: "#6E6A63",
              letterSpacing: "0.04em",
            }}
          >
            {material.dimensions}
          </p>
        </div>

        {/* Permanently Visible Finish Pills with Generous Spacing */}
        <div
          style={{
            paddingTop: "1.1rem",
            borderTop: "1px solid rgba(28,28,26,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.6rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
            {material.finishOptions.map((f) => (
              <span
                key={f}
                style={{
                  fontSize: "0.6rem",
                  fontFamily: "var(--font-plus-jakarta)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  padding: "0.25rem 0.55rem",
                  border: "1px solid rgba(28,28,26,0.18)",
                  color: "#6E6A63",
                  backgroundColor: "rgba(246,245,242,0.6)",
                  fontWeight: 500,
                }}
              >
                {f}
              </span>
            ))}
          </div>
          <span
            style={{
              fontSize: "0.68rem",
              fontFamily: "var(--font-plus-jakarta)",
              letterSpacing: "0.15em",
              color: "#B89758",
              fontWeight: 600,
            }}
          >
            INSPECT →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Scene Component ────────────────────────────────────────────── */
export default function MaterialsScene() {
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const kickerRef = useRef(null);
  const titleRef = useRef(null);
  const desktopCardsRef = useRef([]);
  const innerImgsRef = useRef([]);
  const mobileCardsRef = useRef([]);

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

        // ── Desktop (min-width: 768px): Continuous Tactile Scrub & Parallax ──
        mm.add("(min-width: 768px)", () => {
          // 1. Masked Line-by-Line Upward Reveal
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

          // 2. Staircase Card Entrance
          const offsets = [50, 85, 120, 155];
          desktopCardsRef.current.forEach((card, i) => {
            if (!card) return;
            const startY = offsets[i % offsets.length];
            gsap.fromTo(
              card,
              {
                y: startY,
                clipPath: "inset(25% 0% 0% 0%)",
              },
              {
                y: 0,
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 82%",
                  end: "top 30%",
                  scrub: 0.8,
                },
              }
            );
          });

          // 3. Inner Stone Texture Drift Parallax
          innerImgsRef.current.forEach((img) => {
            if (!img) return;
            gsap.fromTo(
              img,
              { yPercent: -6, scale: 1.12 },
              {
                yPercent: 6,
                scale: 1.12,
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });
        });

        // ── Mobile (max-width: 767px): Lightweight 60fps Scroll Reveal ──
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

          if (mobileCardsRef.current.length > 0) {
            gsap.fromTo(
              mobileCardsRef.current,
              { y: 35, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.65,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 80%",
                  once: true,
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

  function handleMobileScroll(e) {
    const el = e.currentTarget;
    const cardWidth = el.offsetWidth * 0.82;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveCardIndex(Math.min(materials.length - 1, Math.max(0, index)));
  }

  const activeMaterial = materials.find((m) => m.id === activeDrawer);

  return (
    <>
      <section
        ref={sectionRef}
        id="collections"
        style={{
          backgroundColor: "#F6F5F2",
          width: "100%",
          padding: "6.5rem 0 7rem",
          overflowX: "hidden",
        }}
      >
        {/* Section Header with Masked Line-by-Line Reveal */}
        <div
          ref={headerRef}
          style={{
            width: "100%",
            maxWidth: "min(1440px, 94vw)",
            margin: "0 auto",
            padding: "0 clamp(1rem, 3.5vw, 3rem) 3.5rem",
          }}
        >
          <div style={{ overflow: "hidden", paddingBottom: "0.2rem" }}>
            <p
              ref={kickerRef}
              style={{
                fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
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
              02 / THE COLLECTION
            </p>
          </div>
          <div style={{ overflow: "hidden" }}>
            <h2
              ref={titleRef}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
                fontWeight: 400,
                color: "#1C1C1A",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                transform: "translateY(100%)",
                willChange: "transform",
              }}
            >
              Curated for Exceptional Spaces.
            </h2>
          </div>
        </div>

        {/* ── Desktop Grid Showcase (≥768px) with Staircase Scroll Wave ── */}
        {isDesktop ? (
          <div
            style={{
              width: "100%",
              maxWidth: "min(1440px, 94vw)",
              margin: "0 auto",
              padding: "0 clamp(1rem, 3.5vw, 3rem)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: "2.5rem",
            }}
          >
            {materials.map((m, i) => (
              <div
                key={m.id}
                ref={(el) => (desktopCardsRef.current[i] = el)}
                style={{ willChange: "transform, clip-path" }}
              >
                <MaterialCard
                  material={m}
                  onClick={() => setActiveDrawer(m.id)}
                  innerRef={(el) => (innerImgsRef.current[i] = el)}
                />
              </div>
            ))}
          </div>
        ) : (
          /* ── Mobile Touch Lookbook (<768px) ── */
          <div>
            <div
              onScroll={handleMobileScroll}
              style={{
                display: "flex",
                gap: "1.25rem",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                padding: "0 1.5rem 1.5rem",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {materials.map((m, i) => (
                <div
                  key={m.id}
                  ref={(el) => (mobileCardsRef.current[i] = el)}
                  style={{
                    width: "82vw",
                    maxWidth: 340,
                    flexShrink: 0,
                    scrollSnapAlign: "center",
                    willChange: "transform, opacity",
                  }}
                >
                  <MaterialCard
                    material={m}
                    onClick={() => setActiveDrawer(m.id)}
                  />
                </div>
              ))}
            </div>

            {/* Minimalist Brass Progress Counter */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem 1.75rem 1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    color: "#B89758",
                  }}
                >
                  {String(activeCardIndex + 1).padStart(2, "0")}
                </span>
                <span style={{ color: "#6E6A63", fontSize: "0.75rem" }}>/</span>
                <span
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    color: "#6E6A63",
                  }}
                >
                  {String(materials.length).padStart(2, "0")}
                </span>
              </div>

              {/* Indicator Dots */}
              <div style={{ display: "flex", gap: "0.4rem" }}>
                {materials.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: 4,
                      width: activeCardIndex === i ? 24 : 6,
                      backgroundColor: activeCardIndex === i ? "#B89758" : "rgba(28,28,26,0.15)",
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Slide-over / Bottom Sheet Spec Drawer */}
      {activeMaterial && (
        <SlabDrawer
          material={activeMaterial}
          onClose={() => setActiveDrawer(null)}
        />
      )}
    </>
  );
}
