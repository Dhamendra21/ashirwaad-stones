"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Check, MapPin, Phone, Mail, MessageSquare, Clock, ArrowUpRight } from "lucide-react";

function InstagramIcon({ size = 16, color = "currentColor", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* ─── Responsive Booking Drawer / Bottom Sheet ─────────────────────────── */
function BookingDrawer({ onClose }) {
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [materials, setMaterials] = useState([]);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
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

  const materialOptions = [
    "Italian Marble",
    "Black Granite",
    "Porcelain Slabs",
    "Wall Cladding",
    "Luxury Sanitaryware",
    "All Collections",
  ];

  function toggleMaterial(m) {
    setMaterials((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, date, role, materials, notes }),
      });
    } catch (err) {
      console.error("Booking submission error:", err);
    }
    setSubmitted(true);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(20,20,19,0.7)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 500,
        }}
      />

      {/* Drawer / Bottom Sheet Container */}
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

        {/* Header */}
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
            backdropFilter: "blur(10px)",
            zIndex: 10,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#6E6A63",
                fontWeight: 600,
                marginBottom: "0.4rem",
              }}
            >
              Private Experience
            </p>
            <h3
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.85rem",
                fontWeight: 500,
                color: "#1C1C1A",
                letterSpacing: "-0.01em",
              }}
            >
              Book a Private Viewing
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
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
            }}
          >
            <X size={18} color="#1C1C1A" />
          </button>
        </div>

        {submitted ? (
          <div
            style={{
              padding: "4rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                backgroundColor: "rgba(184,151,88,0.15)",
                border: "1px solid #B89758",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check size={24} color="#B89758" />
            </div>
            <h4
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "2rem",
                fontWeight: 500,
                color: "#1C1C1A",
              }}
            >
              Viewing Requested
            </h4>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.95rem",
                color: "#6E6A63",
                lineHeight: 1.65,
                maxWidth: 400,
              }}
            >
              Thank you, {name || "esteemed client"}. Our architectural concierge team will confirm your private consultation slot within 2 business hours.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: "1rem",
                padding: "0.85rem 2.25rem",
                backgroundColor: "#1C1C1A",
                color: "#F6F5F2",
                border: "none",
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "2.25rem 2.5rem 3.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.75rem",
            }}
          >
            {/* Role */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#6E6A63",
                  marginBottom: "0.6rem",
                  fontWeight: 600,
                }}
              >
                Client Profile
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {["Homeowner", "Architect / Interior Designer"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    style={{
                      padding: "0.85rem",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-plus-jakarta)",
                      border: role === r ? "1px solid #B89758" : "1px solid rgba(28,28,26,0.18)",
                      backgroundColor: role === r ? "rgba(184,151,88,0.12)" : "transparent",
                      color: role === r ? "#B89758" : "#6E6A63",
                      fontWeight: role === r ? 600 : 400,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#6E6A63",
                  marginBottom: "0.45rem",
                  fontWeight: 600,
                }}
              >
                Full Name
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ar. Rajesh Mehta"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  backgroundColor: "#EDEAE4",
                  border: "1px solid rgba(28,28,26,0.18)",
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.9rem",
                  color: "#1C1C1A",
                  outline: "none",
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#6E6A63",
                  marginBottom: "0.45rem",
                  fontWeight: 600,
                }}
              >
                Phone Number
              </label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 00000 00000"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  backgroundColor: "#EDEAE4",
                  border: "1px solid rgba(28,28,26,0.18)",
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.9rem",
                  color: "#1C1C1A",
                  outline: "none",
                }}
              />
            </div>

            {/* Date */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#6E6A63",
                  marginBottom: "0.45rem",
                  fontWeight: 600,
                }}
              >
                Preferred Viewing Date
              </label>
              <input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  backgroundColor: "#EDEAE4",
                  border: "1px solid rgba(28,28,26,0.18)",
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.9rem",
                  color: "#1C1C1A",
                  outline: "none",
                }}
              />
            </div>

            {/* Materials Checkboxes */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#6E6A63",
                  marginBottom: "0.6rem",
                  fontWeight: 600,
                }}
              >
                Collections of Interest
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                {materialOptions.map((m) => {
                  const checked = materials.includes(m);
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => toggleMaterial(m)}
                      style={{
                        padding: "0.65rem 0.85rem",
                        fontSize: "0.72rem",
                        fontFamily: "var(--font-plus-jakarta)",
                        border: checked ? "1px solid #B89758" : "1px solid rgba(28,28,26,0.18)",
                        backgroundColor: checked ? "rgba(184,151,88,0.1)" : "transparent",
                        color: checked ? "#B89758" : "#6E6A63",
                        fontWeight: checked ? 600 : 400,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          border: checked ? "1px solid #B89758" : "1px solid rgba(28,28,26,0.3)",
                          backgroundColor: checked ? "#B89758" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {checked && <Check size={10} color="#141413" />}
                      </div>
                      <span>{m}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#6E6A63",
                  marginBottom: "0.45rem",
                  fontWeight: 600,
                }}
              >
                Architectural Blueprint Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell us about your project scale, required bookmatching..."
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  backgroundColor: "#EDEAE4",
                  border: "1px solid rgba(28,28,26,0.18)",
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.85rem",
                  color: "#1C1C1A",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "1.1rem",
                backgroundColor: "#B89758",
                color: "#141413",
                border: "none",
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              Confirm Viewing Appointment
            </button>
          </form>
        )}
      </div>
    </>
  );
}

/* ─── Main Showroom Section + Architectural Location & Footer ───────────── */
export default function ShowroomScene() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const kickerRef = useRef(null);
  const titleRef = useRef(null);
  const largeImgRef = useRef(null);
  const smallInsetRef = useRef(null);
  const hairlineRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const specsRef = useRef(null);
  const footerRef = useRef(null);
  const footerBorderRef = useRef(null);
  const footerInnerRef = useRef(null);
  const footerEmblemRef = useRef(null);

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
              tl.to(kickerRef.current, { yPercent: 0, duration: 0.8, ease: "power3.out" }, 0);
            }
            if (titleRef.current) {
              tl.to(titleRef.current, { yPercent: 0, duration: 0.9, ease: "power3.out" }, 0.1);
            }
          }

          // 2. Opposing Vertical Parallax (scrub: 1)
          if (largeImgRef.current) {
            gsap.fromTo(
              largeImgRef.current,
              { y: 40 },
              {
                y: -40,
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              }
            );
          }
          if (smallInsetRef.current) {
            gsap.fromTo(
              smallInsetRef.current,
              { y: -30 },
              {
                y: 50,
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              }
            );
          }

          // 3. Scrubbed Brass Hairline Width (scaleX: 0 -> 1, transformOrigin: "left")
          if (hairlineRef.current) {
            gsap.fromTo(
              hairlineRef.current,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                transformOrigin: "left",
                scrollTrigger: {
                  trigger: hairlineRef.current,
                  start: "top 85%",
                  end: "top 55%",
                  scrub: 0.8,
                },
              }
            );
          }

          // 4. Staggered details fade-up (desc, buttons, specs row)
          const detailItems = [descRef.current, buttonsRef.current, specsRef.current].filter(Boolean);
          if (detailItems.length > 0) {
            gsap.fromTo(
              detailItems,
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: hairlineRef.current || descRef.current,
                  start: "top 78%",
                },
              }
            );
          }

          // 5. Architectural Curtain-Reveal Footer
          if (footerInnerRef.current) {
            gsap.fromTo(
              footerInnerRef.current,
              { yPercent: -25 },
              {
                yPercent: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: footerRef.current,
                  start: "top bottom",
                  end: "bottom bottom",
                  scrub: true,
                },
              }
            );
          }

          // Footer hairline border drawn outward from center
          if (footerBorderRef.current) {
            gsap.fromTo(
              footerBorderRef.current,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                transformOrigin: "center",
                scrollTrigger: {
                  trigger: footerRef.current,
                  start: "top bottom+=60",
                  end: "bottom bottom",
                  scrub: 0.8,
                },
              }
            );
          }

          // Footer emblem scale (0.88 -> 1.0)
          if (footerEmblemRef.current) {
            gsap.fromTo(
              footerEmblemRef.current,
              { scale: 0.88 },
              {
                scale: 1.0,
                ease: "none",
                scrollTrigger: {
                  trigger: footerRef.current,
                  start: "top bottom+=100",
                  end: "bottom bottom",
                  scrub: true,
                },
              }
            );
          }

          // Footer columns & copyright stagger in
          gsap.fromTo(
            ".footer-reveal-item",
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 80%",
              },
            }
          );
        });

        // ── Mobile (max-width: 767px): Lightweight 60fps Once Reveals ──
        mm.add("(max-width: 767px)", () => {
          if (kickerRef.current) {
            gsap.to(kickerRef.current, {
              yPercent: 0,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: { trigger: headerRef.current, start: "top 90%", once: true },
            });
          }
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              yPercent: 0,
              duration: 0.75,
              delay: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: headerRef.current, start: "top 90%", once: true },
            });
          }
          if (largeImgRef.current) {
            gsap.fromTo(
              largeImgRef.current,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: largeImgRef.current, start: "top 85%", once: true },
              }
            );
          }
          if (hairlineRef.current) {
            gsap.fromTo(
              hairlineRef.current,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 0.8,
                ease: "power3.out",
                transformOrigin: "left",
                scrollTrigger: { trigger: hairlineRef.current, start: "top 85%", once: true },
              }
            );
          }
          const detailItems = [descRef.current, buttonsRef.current, specsRef.current].filter(Boolean);
          if (detailItems.length > 0) {
            gsap.fromTo(
              detailItems,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: hairlineRef.current || descRef.current, start: "top 85%", once: true },
              }
            );
          }
          gsap.fromTo(
            ".footer-reveal-item",
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true },
            }
          );
        });
      }, sectionRef);
    }

    initGSAP();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="showroom"
        style={{
          width: "100%",
          backgroundColor: "#141413",
          backgroundImage: "linear-gradient(rgba(20, 20, 19, 0.88), rgba(20, 20, 19, 0.92)), url('/black-marquina-marble-2k.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#F6F5F2",
          overflowX: "hidden",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Subtle organic black marquina veining overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.16,
            mixBlendMode: "screen",
            backgroundImage: "url('/black-marquina-marble-2k.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />

        {/* ── Scene 6 Part 1: Consultation Lounge & Architectural Story ── */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "min(1440px, 94vw)",
            margin: "0 auto",
            padding: "6.5rem clamp(1rem, 3.5vw, 3rem) 5.5rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isDesktop ? "1.1fr 1fr" : "1fr",
              gap: isDesktop ? "5rem" : "3.5rem",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Left: Atmospheric Lounge Image (Opposing Parallax) */}
            <div
              ref={largeImgRef}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 10",
                overflow: "hidden",
                borderRadius: "3px",
                border: "1px solid rgba(246,245,242,0.12)",
                boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
                willChange: "transform",
              }}
            >
              <Image
                src="/assets/showroom/consultation-lounge.jpg"
                alt="Ashirwaad Stone flagship showroom consultation lounge"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 700px"
                priority
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(20,20,19,0.5) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Right: Editorial Consultation Text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1.75rem",
                width: "100%",
              }}
            >
              {/* Detail accent preview (Opposing Parallax) */}
              <div
                ref={smallInsetRef}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 240,
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                  borderRadius: "2px",
                  border: "1px solid rgba(246,245,242,0.15)",
                  willChange: "transform",
                }}
              >
                <Image
                  src="/assets/showroom/detail-accent.jpg"
                  alt="Stone detail texture"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="240px"
                />
              </div>

              {/* Masked Line-by-Line Header Reveal */}
              <div ref={headerRef}>
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
                      marginBottom: "0.5rem",
                      transform: "translateY(100%)",
                      willChange: "transform",
                    }}
                  >
                    05 / THE SHOWROOM
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
                    Experience the Slabs in Person.
                  </h2>
                </div>
              </div>

              {/* Scrubbed Brass Hairline Width */}
              <div
                ref={hairlineRef}
                style={{
                  width: 56,
                  height: 1.5,
                  backgroundColor: "#B89758",
                  willChange: "transform",
                }}
              />

              <p
                ref={descRef}
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.95rem",
                  color: "rgba(246,245,242,0.65)",
                  lineHeight: 1.8,
                  willChange: "transform, opacity",
                }}
              >
                Walk through full-size slabs under calibrated architectural lighting with your blueprints or architect. Our specialist team provides comprehensive curation, precision thickness tolerances, and bookmatching alignment.
              </p>

              {/* Action Buttons */}
              <div
                ref={buttonsRef}
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  paddingTop: "0.5rem",
                  willChange: "transform, opacity",
                }}
              >
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  style={{
                    flex: isDesktop ? "0 0 auto" : "1 1 200px",
                    padding: "0.95rem 1.9rem",
                    backgroundColor: "#B89758",
                    color: "#141413",
                    border: "1px solid #B89758",
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#B89758";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#B89758";
                    e.currentTarget.style.color = "#141413";
                  }}
                >
                  Book a Private Viewing
                </button>
                <a
                  href="https://maps.google.com/?q=Ashirwad+Stone"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: isDesktop ? "0 0 auto" : "1 1 180px",
                    padding: "0.95rem 1.9rem",
                    border: "1px solid rgba(246,245,242,0.25)",
                    color: "#F6F5F2",
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    textDecoration: "none",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#B89758";
                    e.currentTarget.style.color = "#B89758";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(246,245,242,0.25)";
                    e.currentTarget.style.color = "#F6F5F2";
                  }}
                >
                  <span>Open in Maps</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>

              {/* Showroom Specs */}
              <div
                ref={specsRef}
                style={{
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(246,245,242,0.12)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-plus-jakarta)",
                  color: "rgba(246,245,242,0.55)",
                  willChange: "transform, opacity",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <Clock size={16} color="#B89758" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ color: "#F6F5F2", fontWeight: 500, marginBottom: "0.2rem" }}>Viewing Hours</p>
                    <p>Mon – Sat: 10 AM – 8 PM</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <Phone size={16} color="#B89758" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ color: "#F6F5F2", fontWeight: 500, marginBottom: "0.2rem" }}>Direct Lines</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      <a href="tel:+919479272520" style={{ color: "rgba(246,245,242,0.85)", textDecoration: "none" }}>
                        +91 94792 72520
                      </a>
                      <a href="tel:+919893839456" style={{ color: "rgba(246,245,242,0.7)", textDecoration: "none" }}>
                        +91 98938 39456
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Scene 6 Part 2: Architectural Map Location Embed ── */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            borderTop: "1px solid rgba(246,245,242,0.1)",
            backgroundColor: "rgba(16, 16, 15, 0.95)",
            backgroundImage: "linear-gradient(rgba(16, 16, 15, 0.92), rgba(16, 16, 15, 0.96)), url('/black-marquina-marble-2k.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "5.5rem clamp(1rem, 3.5vw, 3rem)",
          }}
        >
          <div style={{ width: "100%", maxWidth: "min(1440px, 94vw)", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "2.25rem",
                gap: "1.25rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#B89758",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                  }}
                >
                  SHOWROOM GEOGRAPHY
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                    fontWeight: 400,
                    color: "#F6F5F2",
                  }}
                >
                  Ashirwad Stone Showroom & Yards
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.85rem",
                  color: "rgba(246,245,242,0.55)",
                  maxWidth: 460,
                  lineHeight: 1.6,
                }}
              >
                Convenient architectural access with dedicated vehicle parking, slab crane gantries, and private consultation lounges.
              </p>
            </div>

            {/* Embedded Google Map (Full container width) */}
            <div
              style={{
                width: "100%",
                height: 480,
                borderRadius: "3px",
                overflow: "hidden",
                border: "1px solid rgba(184,151,88,0.35)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6868.90039334794!2d81.34348038316227!3d21.21908379084505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2923cc74db5b15%3A0x37403718c974a71c!2sAshirwad%20Stone!5e1!3m2!1sen!2sin!4v1795080884845!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "contrast(1.05) saturate(0.95)",
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Ashirwad Stone Showroom Location Map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Scene 6 Part 3: Architectural Curtain-Reveal Footer ── */}
      <footer
        ref={footerRef}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          backgroundColor: "#0C0C0B",
          backgroundImage: "linear-gradient(rgba(12, 12, 11, 0.94), rgba(12, 12, 11, 0.98)), url('/black-marquina-marble-2k.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        {/* Scrubbed Outward Center-Drawn Hairline Border */}
        <div
          ref={footerBorderRef}
          style={{
            width: "100%",
            height: 1.5,
            backgroundColor: "#B89758",
            willChange: "transform",
          }}
        />

        {/* Curtain-reveal inner container */}
        <div
          ref={footerInnerRef}
          style={{
            width: "100%",
            padding: "5.5rem clamp(1rem, 3.5vw, 3rem) 4.5rem",
            willChange: "transform",
          }}
        >
          <div style={{ width: "100%", maxWidth: "min(1440px, 94vw)", margin: "0 auto" }}>
            {/* Main Columns Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isDesktop ? "1.4fr 1fr 1fr 1.2fr" : "repeat(auto-fit, minmax(220px, 1fr))",
                gap: isDesktop ? "4rem" : "2.75rem",
                paddingBottom: "3.5rem",
                borderBottom: "1px solid rgba(246,245,242,0.1)",
                width: "100%",
              }}
            >
              {/* Brand & Emblem Centerpiece Anchor */}
              <div className="footer-reveal-item" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  {/* Official Emblem Logo with gentle 0.88 -> 1.0 scroll scaling and mix-blend-lighten */}
                  <div
                    ref={footerEmblemRef}
                    className="mix-blend-lighten"
                    style={{
                      position: "relative",
                      width: "clamp(190px, 22vw, 240px)",
                      aspectRatio: "1317 / 1169",
                      marginBottom: "1.25rem",
                      mixBlendMode: "lighten",
                      willChange: "transform",
                    }}
                  >
                    <Image
                      src="/assets/brand/logo-emblem.png"
                      alt="Ashirwaad Stone"
                      fill
                      sizes="240px"
                      style={{ objectFit: "contain", objectPosition: "left center" }}
                    />
                  </div>

                  {/* Brand Tagline */}
                  <p
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontSize: "0.75rem",
                      color: "#B89758",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                      fontWeight: 700,
                    }}
                  >
                    TILES | MARBLE | GRANITE
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontSize: "0.65rem",
                      color: "#6E6A63",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    Curated Architectural Surfaces & Slabs · Est. 1998
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontSize: "0.85rem",
                      color: "rgba(246,245,242,0.55)",
                      lineHeight: 1.65,
                      maxWidth: 340,
                    }}
                  >
                    Direct quarry curation of Italian statuario, architectural exotic granite, porcelain slabs, and designer wall cladding.
                  </p>
                </div>
                <div style={{ width: 48, height: 1.5, backgroundColor: "#B89758", marginTop: "1.5rem" }} />
              </div>

              {/* Col 2: Collections */}
              <div className="footer-reveal-item">
                <p
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#B89758",
                    fontWeight: 600,
                    marginBottom: "1.25rem",
                  }}
                >
                  Collections
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", fontSize: "0.85rem", fontFamily: "var(--font-plus-jakarta)" }}>
                  {[
                    "Italian Statuario Marble",
                    "Architectural Black Granite",
                    "Large-Format Porcelain Slabs",
                    "Artisanal Wall Cladding",
                    "Luxury Sanitaryware",
                  ].map((item) => (
                    <a
                      key={item}
                      href="#collections"
                      style={{
                        color: "rgba(246,245,242,0.6)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#F6F5F2")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,245,242,0.6)")}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              {/* Col 3: Storytelling & Experience */}
              <div className="footer-reveal-item">
                <p
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#B89758",
                    fontWeight: 600,
                    marginBottom: "1.25rem",
                  }}
                >
                  Storytelling
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", fontSize: "0.85rem", fontFamily: "var(--font-plus-jakarta)" }}>
                  {[
                    { label: "01 / The Philosophy", href: "#philosophy" },
                    { label: "02 / The Collections", href: "#collections" },
                    { label: "03 / Room Visualizer", href: "#visualizer" },
                    { label: "04 / Finish Comparison", href: "#compare" },
                    { label: "05 / Flagship Showroom", href: "#showroom" },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      style={{
                        color: "rgba(246,245,242,0.6)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#F6F5F2")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,245,242,0.6)")}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Col 4: Direct Showroom Info */}
              <div className="footer-reveal-item">
                <p
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#B89758",
                    fontWeight: 600,
                    marginBottom: "1.25rem",
                  }}
                >
                  Concierge & Consultations
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.85rem", fontFamily: "var(--font-plus-jakarta)", color: "rgba(246,245,242,0.65)" }}>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                    <MapPin size={16} color="#B89758" style={{ marginTop: 2, flexShrink: 0 }} />
                    <p style={{ lineHeight: 1.5 }}>
                      Supela, Kripal Nagar, Bhilai, Chhattisgarh 490023
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                    <Phone size={16} color="#B89758" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <a href="tel:+919479272520" style={{ color: "rgba(246,245,242,0.85)", textDecoration: "none" }}>
                        +91 94792 72520
                      </a>
                      <a href="tel:+919893839456" style={{ color: "rgba(246,245,242,0.7)", textDecoration: "none" }}>
                        +91 98938 39456
                      </a>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                    <InstagramIcon size={16} color="#B89758" style={{ flexShrink: 0 }} />
                    <a
                      href="https://www.instagram.com/ashirwad_stone/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#B89758", textDecoration: "none", fontWeight: 500 }}
                    >
                      @ashirwad_stone
                    </a>
                  </div>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                    <Mail size={16} color="#B89758" style={{ flexShrink: 0 }} />
                    <a href="mailto:hello@ashirwaadstone.com" style={{ color: "rgba(246,245,242,0.75)", textDecoration: "none" }}>
                      hello@ashirwaadstone.com
                    </a>
                  </div>

                  <a
                    href="https://wa.me/919479272520?text=Hello%20Ashirwaad%20Stone%2C%20I%20would%20like%20to%20inquire%20about%20your%20marble%20and%20slab%20collections."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "0.5rem",
                      padding: "0.65rem 1.25rem",
                      border: "1px solid #B89758",
                      color: "#B89758",
                      fontFamily: "var(--font-plus-jakarta)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      textDecoration: "none",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#B89758";
                      e.currentTarget.style.color = "#141413";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#B89758";
                    }}
                  >
                    WhatsApp Inquiry →
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Sub-Footer */}
            <div
              className="footer-reveal-item"
              style={{
                paddingTop: "2.25rem",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.75rem",
                color: "rgba(246,245,242,0.4)",
              }}
            >
              <p>© {new Date().getFullYear()} Ashirwaad Stone. All Rights Reserved.</p>
              <p style={{ letterSpacing: "0.08em" }}>Crafted with precision. Built for legacy.</p>
            </div>
          </div>
        </div>
      </footer>

        {/* ── Mobile Floating Quick-Action Bar (<768px) ── */}
        {!isDesktop && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(20,20,19,0.95)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderTop: "1px solid rgba(184,151,88,0.3)",
              padding: "0.75rem 1.25rem",
              display: "flex",
              gap: "0.75rem",
              zIndex: 90,
            }}
          >
            <a
              href="tel:+919479272520"
              style={{
                flex: 1,
                padding: "0.75rem",
                backgroundColor: "transparent",
                border: "1px solid rgba(246,245,242,0.25)",
                color: "#F6F5F2",
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
              }}
            >
              <Phone size={14} color="#B89758" />
              <span>Call Showroom</span>
            </a>
            <a
              href="https://wa.me/919479272520?text=Hello%20Ashirwaad%20Stone%2C%20I%20would%20like%20to%20inquire%20about%20your%20marble%20and%20slab%20collections."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                padding: "0.75rem",
                backgroundColor: "#B89758",
                color: "#141413",
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
              }}
            >
              <MessageSquare size={14} color="#141413" />
              <span>WhatsApp</span>
            </a>
          </div>
        )}

      {/* Slide-over / Bottom-sheet Booking Drawer */}
      {drawerOpen && <BookingDrawer onClose={() => setDrawerOpen(false)} />}
    </>
  );
}
