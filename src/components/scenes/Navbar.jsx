"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isDark, setIsDark] = useState(true); // Hero starts dark
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTinyMobile, setIsTinyMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    function handleResize() {
      setIsTinyMobile(window.innerWidth < 380);
      setIsDesktop(window.innerWidth >= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 20);

      // Section theme detection:
      // Hero (dark), Philosophy (light), Collections (light), Visualizer (dark), Compare (light), Showroom (dark)
      const probeY = 45; // probe near top bar center
      const sections = [
        { id: "hero", dark: true },
        { id: "philosophy", dark: false },
        { id: "collections", dark: false },
        { id: "visualizer", dark: true },
        { id: "compare", dark: false },
        { id: "showroom", dark: true },
      ];

      let currentDark = true;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= probeY && rect.bottom > probeY) {
            currentDark = s.dark;
            break;
          }
        }
      }
      setIsDark(currentDark);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  function handleNav(e, href) {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }

  const bg = isDark
    ? scrolled ? "rgba(20,20,19,0.92)" : "rgba(20,20,19,0.4)"
    : scrolled ? "rgba(246,245,242,0.92)" : "rgba(246,245,242,0.6)";

  const borderColor = isDark
    ? "rgba(246,245,242,0.08)"
    : "rgba(28,28,26,0.08)";

  const linkColor = isDark ? "rgba(246,245,242,0.7)" : "#6E6A63";
  const linkHoverColor = isDark ? "#F6F5F2" : "#1C1C1A";

  const navItems = [
    { label: "Philosophy", href: "#philosophy", num: "01" },
    { label: "Collections", href: "#collections", num: "02" },
    { label: "Visualizer", href: "#visualizer", num: "03" },
    { label: "Showroom", href: "#showroom", num: "04" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: bg,
          borderBottom: `1px solid ${borderColor}`,
          transition: "background-color 0.4s ease, border-color 0.4s ease",
          width: "100%",
          paddingY:"2px"
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "min(1440px, 94vw)",
            margin: "0 auto",
            padding: "0 clamp(1rem, 3.5vw, 2.5rem)",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand Logo with Smooth Adaptive Light/Dark Crossfade */}
          <Link
            href="/"
            aria-label="Ashirwaad Stone Home"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              position: "relative",
              zIndex: 110,
              height: 48,
            }}
          >
            {/* Standard View (≥380px): Crossfading Responsive Nav Logos */}
            <div
              style={{
                position: "relative",
                display: isTinyMobile ? "none" : "flex",
                alignItems: "center",
                height: 44,
                width: "clamp(160px, 20vw, 210px)",
              }}
            >
              {/* Dark Logo (Rendered over dark #141413 sections) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  opacity: isDark || mobileMenuOpen ? 1 : 0,
                  transition: "opacity 0.4s ease",
                  pointerEvents: isDark || mobileMenuOpen ? "auto" : "none",
                }}
              >
                <img
                  src="/assets/brand/logo-nav-dark.png"
                  alt="Ashirwaad Stone"
                  sizes="140px"
                  style={{ objectFit: "contain", objectPosition: "left center", height:"160px" }}
                  priority
                />
              </div>

              {/* Light Logo (Rendered over light #F6F5F2 sections) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  opacity: isDark || mobileMenuOpen ? 0 : 1,
                  transition: "opacity 0.4s ease",
                  pointerEvents: !(isDark || mobileMenuOpen) ? "auto" : "none",
                }}
              >
                <img
                  src="/assets/brand/logo-nav-light.png"
                  alt="Ashirwaad Stone"
                  fill
                  sizes="240px"
                  style={{ objectFit: "contain", objectPosition: "left center" }}
                  priority
                />
              </div>
            </div>

            {/* Tiny Mobile Screen (<380px): Compact Icon + Wordmark */}
            <div
              style={{
                display: isTinyMobile ? "flex" : "none",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 34,
                  height: 34,
                }}
              >
                <img
                  src="/assets/brand/logo-icon.png"
                  alt="Ashirwaad Stone Icon"
                  sizes="34px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: isDark || mobileMenuOpen ? "#F6F5F2" : "#1C1C1A",
                  whiteSpace: "nowrap",
                }}
              >
                ASHIRWAAD STONE
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          {isDesktop ? (
            <div
              style={{
                display: "flex",
                gap: "2.75rem",
                alignItems: "center",
              }}
            >
              {navItems.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNav(e, href)}
                  style={{
                    fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: linkColor,
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
                >
                  {label}
                </a>
              ))}
            </div>
          ) : null}

          {/* Desktop CTA Button */}
          {isDesktop ? (
            <a
              href="#showroom"
              onClick={(e) => handleNav(e, "#showroom")}
              style={{
                fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#B89758",
                border: "1px solid #B89758",
                padding: "0.6rem 1.4rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                backgroundColor: "transparent",
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
              Book Viewing
            </a>
          ) : null}

          {/* Mobile 2-line architectural menu trigger */}
          {!isDesktop ? (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "6px",
                width: "44px",
                height: "44px",
                zIndex: 110,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: mobileMenuOpen ? "24px" : "22px",
                  height: "1.5px",
                  backgroundColor: mobileMenuOpen ? "#B89758" : (isDark ? "#F6F5F2" : "#1C1C1A"),
                  transition: "transform 0.3s ease, background-color 0.3s ease",
                  transform: mobileMenuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: mobileMenuOpen ? "24px" : "16px",
                  height: "1.5px",
                  backgroundColor: mobileMenuOpen ? "#B89758" : (isDark ? "#F6F5F2" : "#1C1C1A"),
                  alignSelf: "flex-end",
                  transition: "transform 0.3s ease, width 0.3s ease, background-color 0.3s ease",
                  transform: mobileMenuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
                }}
              />
            </button>
          ) : null}
        </div>
      </nav>

      {/* Full-screen Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 105,
            backgroundColor: "#141413",
            backgroundImage: "linear-gradient(rgba(20, 20, 19, 0.92), rgba(20, 20, 19, 0.96)), url('/black-marquina-marble-2k.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "6rem 2rem 2.5rem",
            animation: "fadeInMenu 0.3s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          <style>{`
            @keyframes fadeInMenu {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          {/* Staggered Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", marginTop: "1rem" }}>
            <span
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#B89758",
                fontWeight: 600,
              }}
            >
              NAVIGATION ARCHITECTURE
            </span>
            {navItems.map(({ label, href, num }, index) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNav(e, href)}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1.25rem",
                  borderBottom: "1px solid rgba(246,245,242,0.08)",
                  paddingBottom: "0.75rem",
                  animation: `fadeInMenu 0.35s cubic-bezier(0.16,1,0.3,1) ${0.08 + index * 0.05}s both`,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    color: "#B89758",
                    fontWeight: 600,
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "2.4rem",
                    fontWeight: 400,
                    color: "#F6F5F2",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {label}
                </span>
              </a>
            ))}
          </div>

          {/* Showroom Details + Mobile CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div
              style={{
                borderTop: "1px solid rgba(246,245,242,0.12)",
                paddingTop: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#B89758",
                  fontWeight: 600,
                }}
              >
                Ashirwad Stone Showroom & Yards
              </p>
              <p
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.8rem",
                  color: "rgba(246,245,242,0.6)",
                }}
              >
                Supela, Kripal Nagar, Bhilai, Chhattisgarh 490023
              </p>
              <p
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "0.8rem",
                  color: "rgba(246,245,242,0.8)",
                  display: "flex",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                <a href="tel:+919479272520" style={{ color: "#B89758", textDecoration: "none" }}>
                  +91 94792 72520
                </a>
                <span>·</span>
                <a href="tel:+919893839456" style={{ color: "rgba(246,245,242,0.8)", textDecoration: "none" }}>
                  +91 98938 39456
                </a>
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "0.25rem",
                }}
              >
                <a
                  href="https://www.instagram.com/ashirwad_stone/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "0.75rem",
                    color: "#B89758",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <span>Instagram: @ashirwad_stone</span>
                </a>
              </div>
            </div>

            <a
              href="#showroom"
              onClick={(e) => handleNav(e, "#showroom")}
              style={{
                display: "block",
                width: "100%",
                padding: "1rem",
                textAlign: "center",
                backgroundColor: "#B89758",
                color: "#141413",
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "2px",
              }}
            >
              Book Private Viewing
            </a>
          </div>
        </div>
      )}
    </>
  );
}
