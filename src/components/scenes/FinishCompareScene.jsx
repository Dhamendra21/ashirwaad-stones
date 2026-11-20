"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FinishCompareScene() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const headRef = useRef(null);

  // ScrollTrigger reveal for headline
  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (headRef.current) {
        const lines = headRef.current.querySelectorAll(".line-inner");
        gsap.set(lines, { y: "105%" });
        ScrollTrigger.create({
          trigger: headRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(lines, { y: "0%", duration: 0.9, ease: "power3.out", stagger: 0.1 });
          },
        });
      }
    }
    init();
  }, []);

  const updatePosition = useCallback((clientX) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const newPos = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setPosition(newPos);
  }, []);

  function onMouseDown(e) {
    setIsDragging(true);
    updatePosition(e.clientX);
  }
  function onTouchStart(e) {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  }

  useEffect(() => {
    function onMouseMove(e) {
      if (!isDragging) return;
      updatePosition(e.clientX);
    }
    function onTouchMove(e) {
      if (!isDragging) return;
      updatePosition(e.touches[0].clientX);
    }
    function onEnd() { setIsDragging(false); }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <section
      id="compare"
      className="bg-[#F6F5F2] py-20 md:py-32"
      style={{ padding: "6rem 0", width: "100%", overflowX: "hidden" }}
    >
      {/* Header */}
      <div
        className="max-w-[1300px] mx-auto px-5 sm:px-8 mb-8 md:mb-12"
        style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2rem 2.5rem" }}
      >
        <p className="font-sans text-[0.65rem] tracking-[0.22em] uppercase text-[#6E6A63] font-medium mb-2">
          04 / FINISH COMPARISON
        </p>
        <h2
          ref={headRef}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1C1A] tracking-[-0.02em] leading-tight"
        >
          {["One Stone.", "Two Personalities."].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span className="line-inner block">{line}</span>
            </span>
          ))}
        </h2>
        <p className="font-sans text-sm md:text-base text-[#6E6A63] leading-relaxed max-w-lg mt-4">
          Drag the slider to explore how surface treatment transforms the character, light reflection, and atmosphere of the same stone.
        </p>
      </div>

      {/* Slider */}
      <div
        className="max-w-[1300px] mx-auto px-5 sm:px-8"
        style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2rem" }}
      >
        <div
          ref={containerRef}
          className="compare-slider relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden select-none shadow-2xl"
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          style={{
            touchAction: "pan-y",
            cursor: isDragging ? "col-resize" : "grab",
          }}
        >
          {/* Left image (base) */}
          <div className="absolute inset-0">
            <Image
              src="/assets/comparison/stone-polished.jpg"
              alt="Statuario Mirror Polish — Daylight"
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 1200px) 100vw, 1300px"
              draggable={false}
              priority
            />
          </div>

          {/* Right image (clipped) */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 0 0 ${position}%)`,
            }}
          >
            <Image
              src="/assets/comparison/stone-honed.jpg"
              alt="Nero Marquina Honed — Evening Mood"
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 1200px) 100vw, 1300px"
              draggable={false}
              priority
            />
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-10"
            style={{
              left: `${position}%`,
              transform: "translateX(-50%)",
              width: 2,
              background: "#F6F5F2",
            }}
          >
            {/* Enlarged 48px × 48px #B89758 Brass Drag Handle */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#B89758] border-2 border-[#F6F5F2] shadow-[0_4px_24px_rgba(0,0,0,0.45)] flex items-center justify-center gap-0.5 pointer-events-auto cursor-col-resize active:scale-95 transition-transform"
              aria-label="Drag to compare finishes"
            >
              <ChevronLeft size={16} color="#141413" strokeWidth={2.5} />
              <ChevronRight size={16} color="#141413" strokeWidth={2.5} />
            </div>
          </div>

          {/* Left Label */}
          <div className="absolute bottom-4 left-4 z-[8] pointer-events-none">
            <div className="bg-[#141413]/75 backdrop-blur-md px-3.5 py-2 border border-white/10 rounded-sm">
              <span className="block font-sans text-[0.6rem] tracking-[0.16em] uppercase text-[#F6F5F2] font-semibold">
                Statuario Mirror Polish
              </span>
              <span className="block font-sans text-[0.6rem] text-white/60">
                Daylight Reflection
              </span>
            </div>
          </div>

          {/* Right Label */}
          <div className="absolute bottom-4 right-4 z-[8] pointer-events-none text-right">
            <div className="bg-[#141413]/75 backdrop-blur-md px-3.5 py-2 border border-white/10 rounded-sm">
              <span className="block font-sans text-[0.6rem] tracking-[0.16em] uppercase text-[#F6F5F2] font-semibold">
                Nero Marquina Honed
              </span>
              <span className="block font-sans text-[0.6rem] text-white/60">
                Evening Velvet Mood
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
