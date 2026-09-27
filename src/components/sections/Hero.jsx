import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  const heroRef = useRef(null);

  // Timecode ticker (100ms = smooth without killing CPU)
  const [time, setTime] = useState("00:00:00:00");
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const h = String(Math.floor(elapsed / 3600000)).padStart(2, "0");
      const m = String(Math.floor((elapsed % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, "0");
      const f = String(Math.floor((elapsed % 1000) / 100)).padStart(2, "0");
      setTime(`${h}:${m}:${s}:${f}0`);
    };
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, []);

  // ─── LIGHTWEIGHT MOUSE TRACKING ───
  // Updates CSS custom properties directly on the DOM node.
  // No React re-renders, no WebGL, no canvas. Browser handles it on the compositor.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    let rafId = null;
    const onMove = (e) => {
      if (rafId) return; // throttle to one update per frame
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
        rafId = null;
      });
    };

    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      id="home"
      style={{
        width: "100%",
        height: 800,
        position: "relative",
        // ─── THE REACTIVE BACKGROUND (all CSS, zero JS) ───
        background: `
          radial-gradient(700px circle at var(--mx, 30%) var(--my, 40%), rgba(255, 0, 127, 0.35), transparent 55%),
          radial-gradient(900px circle at calc(100% - var(--mx, 70%)) calc(100% - var(--my, 60%)), rgba(250, 204, 21, 0.18), transparent 55%),
          radial-gradient(500px circle at 50% 50%, rgba(15, 12, 41, 0.9), #0f0c29 80%)
        `,
        transition: "background 0.15s ease-out",
      }}
      className="overflow-hidden"
    >
      {/* ─── FILM GRAIN OVERLAY (cheap, adds texture) ─── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ─── TOP MARQUEE ─── */}
      <div className="absolute top-[72px] left-0 right-0 z-20 border-y-2 border-[#facc15]/60 bg-black/60 backdrop-blur-sm py-1.5 overflow-hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0">
              {["RAW CUTS", "NO FLUFF", "VELOCITY EDITS", "4K 60FPS", "COLOR GRADED", "SOUND DESIGNED"].map((word, j) => (
                <span key={j} className="mx-6 font-mono text-[10px] font-black text-[#facc15] uppercase tracking-widest">
                  {word} <span className="text-[#ff007f] mx-3">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── CORNER BRACKETS ─── */}
      <div className="absolute top-[110px] left-4 md:left-6 w-6 h-6 border-l-2 border-t-2 border-[#facc15] z-20 pointer-events-none" />
      <div className="absolute top-[110px] right-4 md:right-6 w-6 h-6 border-r-2 border-t-2 border-[#facc15] z-20 pointer-events-none" />
      <div className="absolute bottom-4 left-4 md:left-6 w-6 h-6 border-l-2 border-b-2 border-[#facc15] z-20 pointer-events-none" />
      <div className="absolute bottom-4 right-4 md:right-6 w-6 h-6 border-r-2 border-b-2 border-[#facc15] z-20 pointer-events-none" />

      {/* ─── TIMECODE + REC ─── */}
      <div className="absolute top-[125px] left-6 md:left-16 z-20 font-mono text-[10px] md:text-xs text-[#facc15] tracking-widest bg-black/70 border-2 border-[#facc15]/40 px-3 py-1.5">
        TC {time}
      </div>
      <div className="absolute top-[125px] right-6 md:right-16 z-20 flex items-center gap-2 border-2 border-[#ff007f] bg-black/70 px-3 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff007f] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff007f]"></span>
        </span>
        <span className="font-mono text-[10px] font-black text-[#ff007f] tracking-widest">REC</span>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="absolute inset-0 flex flex-col items-start justify-center z-10 pointer-events-none px-6 md:px-16 pt-24">
        <div className="pointer-events-auto w-full max-w-6xl">
          {/* Eyebrow pill */}
          <div className="mb-6 inline-flex items-center border-2 border-[#facc15] bg-black/60 backdrop-blur-sm px-5 py-2 rotate-[-1.5deg] hover:rotate-0 transition-all duration-100">
            <span className="text-[#facc15] font-mono text-xs md:text-sm font-bold uppercase tracking-widest">
              🎬 Raw Cuts. No Fluff.
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter">
            <span className="text-white [text-shadow:6px_6px_0px_#ff007f]">SOUL</span>
            <br />
            <span className="text-[#facc15] [text-shadow:6px_6px_0px_#000000] ml-0 md:ml-12 inline-block">
              EDITS
            </span>
          </h1>

          {/* Tagline */}
          <div className="mt-6 max-w-2xl border-l-4 border-[#ff007f] pl-6 md:pl-8">
            <p className="text-base md:text-xl text-white/90 font-light leading-relaxed">
              We rescue your footage from the cutting room floor.
              <br className="hidden md:block" />
              <span className="text-[#facc15] font-medium">Raw in. Story out.</span> No corporate fluff.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            <button
              onClick={() =>
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-3 bg-[#facc15] text-black border-2 border-black shadow-[8px_8px_0px_0px_#ff007f] hover:shadow-[2px_2px_0px_0px_#ff007f] hover:translate-x-1 hover:translate-y-1 transition-all duration-75 rounded-none px-10 py-5 text-xl font-black"
            >
              View Work
              <ArrowRight size={20} className="transition-all duration-75 group-hover:translate-x-1" />
            </button>
            
            {/* <button className="group inline-flex items-center gap-3 px-8 py-5 border-2 border-[#ff007f] bg-black/50 text-[#ff007f] font-bold hover:bg-[#ff007f] hover:text-black transition-colors duration-100 rounded-none">
              <Play size={16} className="fill-current" />
              <span className="text-sm uppercase tracking-widest">Watch Reel</span>
            </button> */}
          </div>
        </div>
      </div>

      {/* ─── STATS STICKER ─── */}
      <div className="absolute bottom-8 right-6 md:right-12 z-20 pointer-events-auto">
        <div className="border-2 border-[#facc15] bg-black/80 backdrop-blur-md p-4 rotate-[2deg] hover:rotate-0 transition-all duration-100">
          <div className="flex gap-1 mb-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`h-3 w-4 ${i % 2 === 0 ? "bg-[#facc15]" : "bg-[#ff007f]"} -skew-x-12`}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-black text-[#facc15]">50+</span>
            <span className="text-xs text-white/50 font-mono leading-tight">
              projects<br />delivered
            </span>
          </div>
          <div className="flex gap-3 text-[10px] font-mono uppercase tracking-widest text-white/40 border-t border-[#ff007f]/30 pt-3 mt-3 w-full justify-end">
            <span>Premiere</span>
            <span className="text-[#ff007f]">·</span>
            <span>After Effects</span>
            <span className="text-[#ff007f]">·</span>
            <span>Capcut</span>
          </div>
        </div>
      </div>

      {/* ─── SCROLL RAIL ─── */}
      <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3 pointer-events-none">
        <div className="w-0.5 h-24 bg-white/20 relative">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-[#facc15]" />
        </div>
        <span className="font-mono text-[9px] text-white/40 [writing-mode:vertical-lr] tracking-widest">
          SCROLL
        </span>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Hero;