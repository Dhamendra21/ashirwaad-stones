"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function PhilosophyScene() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const img1Ref = useRef(null);
  const img1Inner = useRef(null);
  const img2Ref = useRef(null);
  const img2Inner = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    let ctx;
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Headline line-mask reveal
        if (headlineRef.current) {
          const lines = headlineRef.current.querySelectorAll(".line-inner");
          gsap.set(lines, { y: "105%" });
          ScrollTrigger.create({
            trigger: headlineRef.current,
            start: "top 80%",
            onEnter: () => {
              gsap.to(lines, {
                y: "0%",
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.1,
              });
            },
          });
        }

        // Copy fade in
        if (copyRef.current) {
          gsap.set(copyRef.current, { opacity: 0, y: 20 });
          ScrollTrigger.create({
            trigger: copyRef.current,
            start: "top 80%",
            onEnter: () => {
              gsap.to(copyRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
              });
            },
          });
        }

        // Image 1 clip-path reveal
        if (img1Ref.current && img1Inner.current) {
          gsap.set(img1Ref.current, { clipPath: "inset(100% 0% 0% 0%)" });
          gsap.set(img1Inner.current, { scale: 1.12 });
          ScrollTrigger.create({
            trigger: img1Ref.current,
            start: "top 85%",
            onEnter: () => {
              gsap.to(img1Ref.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.1,
                ease: "power3.out",
              });
              gsap.to(img1Inner.current, {
                scale: 1,
                duration: 1.4,
                ease: "power3.out",
              });
            },
          });
        }

        // Image 2 clip-path reveal
        if (img2Ref.current && img2Inner.current) {
          gsap.set(img2Ref.current, { clipPath: "inset(100% 0% 0% 0%)" });
          gsap.set(img2Inner.current, { scale: 1.12 });
          ScrollTrigger.create({
            trigger: img2Ref.current,
            start: "top 85%",
            onEnter: () => {
              gsap.to(img2Ref.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.1,
                ease: "power3.out",
                delay: 0.15,
              });
              gsap.to(img2Inner.current, {
                scale: 1,
                duration: 1.4,
                ease: "power3.out",
                delay: 0.15,
              });
            },
          });
        }

        ScrollTrigger.refresh();
      }, sectionRef);
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative bg-[#F6F5F2] py-16 md:py-32 min-h-screen overflow-hidden"
      style={{
        padding: "6rem 0",
        backgroundImage: "linear-gradient(rgba(246, 245, 242, 0.88), rgba(246, 245, 242, 0.88)), url('/Marble012_2K-JPG_Displacement.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Subtle organic marble veining overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-25 mix-blend-multiply"
        style={{
          backgroundImage: "url('/Marble012_2K-JPG_Displacement.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        className="relative z-10 max-w-[1300px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start"
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: "0 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "4rem",
          width: "100%",
        }}
      >
        {/* LEFT — Static on mobile, sticky on desktop */}
        <div className="static md:sticky md:top-28 md:self-start">
          {/* Number kicker */}
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "#6E6A63",
              marginBottom: "1.25rem",
            }}
          >
            01 / THE PHILOSOPHY
          </p>

          {/* Headline with line masks */}
          <h2
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
              fontWeight: 500,
              color: "#1C1C1A",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "1.75rem",
            }}
          >
            {["Born in the Earth.", "Perfected for", "Your Space."].map(
              (line, i) => (
                <span
                  key={i}
                  style={{ display: "block", overflow: "hidden" }}
                >
                  <span className="line-inner" style={{ display: "block" }}>
                    {line}
                  </span>
                </span>
              )
            )}
          </h2>

          {/* Brass decorative hairline */}
          <div
            style={{
              width: 48,
              height: 1,
              background: "#B89758",
              marginBottom: "1.75rem",
            }}
          />

          {/* Story copy */}
          <div ref={copyRef}>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.78,
                color: "#6E6A63",
                marginBottom: "1.5rem",
              }}
            >
              Every slab begins its journey deep within the earth&apos;s most
              precious geological formations — quarried with surgical precision
              from Carrara, Statuario, and remote veins of Black Marquina. We
              don&apos;t simply import stone. We curate it.
            </p>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.78,
                color: "#6E6A63",
              }}
            >
              Each piece arrives at our precision calibration facility where
              master craftsmen verify thickness tolerances to ±0.2mm, assess
              bookmatching potential, and assign individual slab codes —
              ensuring every project receives stone of unerring consistency.
            </p>
          </div>
        </div>

        {/* RIGHT — Asymmetric 2-column mobile collage (col-span-7 + col-span-5 mt-8), staggered parallax on desktop */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 md:flex md:flex-col md:gap-8 w-full mt-4 md:mt-0">
          {/* Image 1 — Quarry */}
          <div className="col-span-7 md:w-full">
            <div
              ref={img1Ref}
              className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-[4/3] overflow-hidden"
            >
              <div ref={img1Inner} className="absolute inset-0">
                <Image
                  src="/assets/story/quarry-block.jpg"
                  alt="Quarry extraction — Carrara, Italy"
                  fill
                  sizes="(max-width: 768px) 60vw, 45vw"
                  className="object-cover"
                  onLoad={() => {
                    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) =>
                      ScrollTrigger.refresh()
                    );
                  }}
                />
              </div>
            </div>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#6E6A63",
                fontWeight: 500,
                marginTop: "0.6rem",
              }}
            >
              CARRARA, ITALY — EXTRACTION
            </p>
          </div>

          {/* Image 2 — Slab cutting (col-span-5 mt-8 on mobile, offset left on desktop) */}
          <div className="col-span-5 mt-8 md:mt-0 md:ml-[-3rem] md:w-full">
            <div
              ref={img2Ref}
              className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-[4/3] overflow-hidden"
            >
              <div ref={img2Inner} className="absolute inset-0">
                <Image
                  src="/assets/story/slab-cutting.jpg"
                  alt="Precision slab calibration"
                  fill
                  sizes="(max-width: 768px) 40vw, 45vw"
                  className="object-cover"
                  onLoad={() => {
                    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) =>
                      ScrollTrigger.refresh()
                    );
                  }}
                />
              </div>
            </div>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#6E6A63",
                fontWeight: 500,
                marginTop: "0.6rem",
              }}
            >
              CALIBRATION ±0.2mm
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
