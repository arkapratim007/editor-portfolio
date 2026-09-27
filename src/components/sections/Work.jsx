import React, { useRef } from "react";
import { ArrowUpRight, Film, Zap, FileText } from "lucide-react";
import { CATEGORIES } from "../../data/Projects";

const THEMES = {
  montages: {
    icon: Film,
    gradient: "from-[#ff007f] to-[#ff007f]", // Hot Pink
    accent: "text-[#ff007f]",
    border: "border-[#ff007f]",
    shadow: "shadow-[6px_6px_0px_0px_#ff007f]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#ff007f]",
    spotlight: "rgba(255, 0, 127, 0.25)",
    format: "16:9",
  },
  "short-form": {
    icon: Zap,
    gradient: "from-[#facc15] to-[#facc15]", // Acid Yellow
    accent: "text-[#facc15]",
    border: "border-[#facc15]",
    shadow: "shadow-[6px_6px_0px_0px_#facc15]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#facc15]",
    spotlight: "rgba(250, 204, 21, 0.25)",
    format: "9:16",
  },
  "long-form": {
    icon: FileText,
    gradient: "from-[#ccff00] to-[#ccff00]", // Radioactive Lime
    accent: "text-[#ccff00]",
    border: "border-[#ccff00]",
    shadow: "shadow-[6px_6px_0px_0px_#ccff00]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#ccff00]",
    spotlight: "rgba(204, 255, 0, 0.25)",
    format: "16:9",
  },
};

const WorkCard = ({ cat, index, onSelect }) => {
  const theme = THEMES[cat.slug] || THEMES.montages;
  const Icon = theme.icon;
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <button
      ref={cardRef}
      onClick={() => onSelect(cat.slug)}
      onMouseMove={handleMouseMove}
      className={`group relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-none
        border-2 ${theme.border} bg-[#05070d] text-left
        ${theme.shadow} ${theme.hoverShadow}
        hover:translate-x-1 hover:translate-y-1
        transition-all duration-75
        focus:outline-none focus:ring-2 focus:ring-[#facc15]/50`}
    >
      {/* Background preview image — dim until hover */}
      {cat.previewImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 grayscale transition-all duration-300 group-hover:opacity-40 group-hover:grayscale-0"
          style={{ backgroundImage: `url(${cat.previewImage})` }}
        />
      )}

      {/* Scrim for readability — uses new deep indigo base */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-[#0f0c29]/70 to-[#0f0c29]/20" />

      {/* Mouse-tracking spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), ${theme.spotlight}, transparent 70%)`,
        }}
      />

      {/* Corner accent block — brutalist detail instead of soft glow */}
      <div
        className={`absolute -right-16 -top-16 h-32 w-32 ${theme.accent.replace("text-", "bg-")} opacity-10 rotate-45`}
      />

      <div className="relative z-10 flex flex-col justify-between h-full p-7 md:p-8">
        {/* Top row: icon, format badge, index */}
        <div className="flex items-start justify-between">
          {/* Icon box — sharp, bordered */}
          <div className={`flex h-11 w-11 items-center justify-center rounded-none border-2 ${theme.border} bg-[#0f0c29] transition-colors duration-75 group-hover:bg-[#0f0c29]/50`}>
            <Icon size={20} className={theme.accent} />
          </div>
          <div className="flex items-center gap-3">
            {/* Format chip — sharp, mono */}
            <span className={`rounded-none border-2 ${theme.border} bg-[#0f0c29] px-2.5 py-1 font-mono text-[11px] font-bold ${theme.accent}`}>
              {theme.format}
            </span>
            <span className={`font-mono text-sm font-bold ${theme.accent} opacity-60`}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Bottom: text + CTA */}
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">{cat.label}</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {cat.tagline}
          </p>
          <div className={`inline-flex items-center gap-1.5 text-sm font-black uppercase tracking-widest ${theme.accent} transition-all duration-75 group-hover:gap-3`}>
            <span>Explore</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-75 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>
      </div>

      {/* Bottom accent line — solid, snaps in on hover */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 scale-x-0 ${theme.accent.replace("text-", "bg-")} transition-transform duration-200 group-hover:scale-x-100 origin-left`}
      />
    </button>
  );
};

const Work = () => {
  const scrollTo = (slug) => {
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="work" className="relative scroll-mt-24 py-28 md:py-36 bg-[#05070d] overflow-hidden">
      {/* Single subtle glow — pink, matching the theme */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#ff007f]/10 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <span className="inline-block font-mono text-xs font-black text-[#ff007f] uppercase tracking-widest mb-4">
            // My Work
          </span>
          <h2 className="text-4xl font-black text-white md:text-5xl lg:text-6xl uppercase tracking-tight">
            Video <span className="text-[#facc15]">Portfolio</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-slate-400 font-mono">
            Explore my work across different formats — each crafted with
            intention and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {CATEGORIES.map((cat, index) => (
            <WorkCard key={cat.slug} cat={cat} index={index} onSelect={scrollTo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;