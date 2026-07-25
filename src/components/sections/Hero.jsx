import React from "react";
import LiquidEther from "../ui/LiquidEther";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div
      id="home"
      style={{ width: "100%", height: 800, position: "relative", backgroundColor: "black" }}
    >
      {/* LIQUID ETHER - Tweaked colors */}
      <LiquidEther
        colors={["#0f0c29", "#ff007f", "#facc15"]} // Deep Indigo, Hot Pink, Wasabi Yellow
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
        color0="#0f0c29"
        color1="#ff007f"
        color2="#facc15"
      />

      {/* OVERLAY - LEFT-ALIGNED and UN-centered */}
      <div className="absolute inset-0 flex flex-col items-start justify-center z-10 pointer-events-none px-6 md:px-16">
        <div className="pointer-events-auto w-full max-w-6xl">
          
          {/* THE PILL */}
          <div className="mb-8 inline-flex items-center border-2 border-[#facc15] bg-black/60 backdrop-blur-sm px-5 py-2 rotate-[-1.5deg] hover:rotate-0 transition-all duration-100">
            <span className="text-[#facc15] font-mono text-xs md:text-sm font-bold uppercase tracking-widest">
              🎬 Raw Cuts. No Fluff.
            </span>
          </div>

          {/* HEADLINE: Brutal, solid colors */}
          <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter">
            <span className="text-white [text-shadow:6px_6px_0px_#ff007f]">
              SOUL
            </span>
            <br />
            
            <span className="text-[#facc15] [text-shadow:6px_6px_0px_#000000] ml-0 md:ml-12 inline-block">
              EDITS
            </span>
          </h1>

          {/*TAGLINE:left border */}
          <div className="mt-6 max-w-2xl border-l-4 border-[#ff007f] pl-6 md:pl-8">
            <p className="text-base md:text-xl text-white/90 font-light leading-relaxed">
              We rescue your footage from the cutting room floor. 
              <br className="hidden md:block" />
              <span className="text-[#facc15] font-medium">Raw in. Story out.</span> No corporate fluff.
            </p>
          </div>

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
            
            {/* Optional secondary button */}
            {/* <button className="inline-flex items-center gap-2 px-8 py-5 border-2 border-white/20 bg-transparent text-white font-bold hover:bg-white hover:text-black transition-colors duration-100 rounded-none">
              <span className="text-sm uppercase tracking-widest">Watch Reel</span>
            </button> */}
          </div>

          {/*STATS*/}
          <div className="absolute bottom-12 right-6 md:right-12 pointer-events-auto">
            <div className="flex flex-col items-end gap-4 bg-black/50 backdrop-blur-md border border-white/10 p-5 rotate-[2deg] hover:rotate-0 transition-all duration-100">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-[#facc15]">50+</span>
                <span className="text-xs text-white/50 font-mono leading-tight">
                  projects<br />delivered
                </span>
              </div>
              <div className="flex gap-3 text-[10px] font-mono uppercase tracking-widest text-white/40 border-t border-white/10 pt-3 w-full justify-end">
                <span>Premiere</span>
                <span>·</span>
                <span>After Effects</span>
                <span>·</span>
                <span>Capcut</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;