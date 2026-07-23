import React from "react";
import LiquidEther from "../ui/LiquidEther";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {

  return (
    <div
      id="home"
      style={{ width: "100%", height: 800, position: "relative", backgroundColor: "black" }}
    >
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        color0="#5227FF"
        color1="#FF9FFC"
        color2="#B497CF"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 pointer-events-none px-6">
        <div className="pointer-events-auto flex flex-col items-center text-center">

          {/* Eyebrow pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-pulse" />
            Now booking projects for 2026
          </div>

          {/* Headline — the main scale jump */}
          <h1 className="max-w-4xl bg-gradient-to-r from-white via-teal-300 to-violet-400 bg-clip-text text-transparent font-extrabold leading-[1.05] tracking-tight text-6xl md:text-8xl">
            SOUL EDITS
          </h1>

          {/* Supporting line */}
          <p className="mt-6 max-w-xl text-lg md:text-xl text-slate-400">
            Professional video editing that brings your vision to life —
            <span className="text-slate-200"> from raw footage to a story worth watching.</span>
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center gap-4">
            <button onClick={()=>
                    document.getElementById("work")?.scrollIntoView({behavior:"smooth"})}
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-300 to-violet-400 rounded-full text-[#060911] font-semibold transition-transform hover:scale-[1.04] hover:shadow-[0_8px_28px_rgba(167,139,250,0.4)]">
              View Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </button>

            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/5 text-white font-semibold backdrop-blur-sm transition-colors hover:bg-white/10">
              <Play size={16} />
              Watch Reel
            </button>
          </div>

          {/* Small trust row — remove if you don't have real numbers yet */}
          <div className="mt-12 flex items-center gap-6 text-sm text-slate-500">
            <span>50+ projects delivered</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span>Premiere · After Effects · Capcut</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;