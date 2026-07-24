import React, { useRef } from "react";
import { ArrowUpRight, Film, Zap, FileText } from "lucide-react";
import { CATEGORIES } from "../../data/Projects";

const THEMES = {
  montages: {
    icon: Film,
    gradient: "from-cyan-500 to-teal-400",
    accent: "text-cyan-400",
    glow: "from-cyan-500/20 to-teal-400/10",
    spotlight: "rgba(45,212,191,0.18)", // teal
    format: "16:9",
  },
  "short-form": {
    icon: Zap,
    gradient: "from-amber-500 to-orange-400",
    accent: "text-amber-400",
    glow: "from-amber-500/20 to-orange-400/10",
    spotlight: "rgba(251,191,36,0.18)", // amber
    format: "9:16",
  },
  "long-form": {
    icon: FileText,
    gradient: "from-violet-500 to-purple-400",
    accent: "text-violet-400",
    glow: "from-violet-500/20 to-purple-400/10",
    spotlight: "rgba(167,139,250,0.18)", // violet
    format: "16:9",
  },
};

const WorkCard = ({ cat, index, onSelect }) => {
  const theme = THEMES[cat.slug] || THEMES.montages;
  const Icon = theme.icon;
  const cardRef = useRef(null);

  // Mouse-tracking spotlight — updates CSS vars read by the glare layer below
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
      className="group relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left transition-all duration-400 hover:scale-[1.02] hover:border-white/30 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50"
    >
      {/* Background preview image — dim + slight grayscale until hover, so the
          card reads as "real footage" but doesn't fight the text on top */}
      {cat.previewImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 grayscale transition-all duration-500 group-hover:opacity-45 group-hover:grayscale-0"
          style={{ backgroundImage: `url(${cat.previewImage})` }}
        />
      )}

      {/* Gradient scrim so text stays readable regardless of the image underneath */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/70 to-[#05070d]/20" />

      {/* Mouse-tracking spotlight/glare — follows the cursor, only visible on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), ${theme.spotlight}, transparent 70%)`,
        }}
      />

      {/* Corner glow (kept from your version) */}
      <div
        className={`absolute -right-24 -top-24 h-64 w-64 rounded-full bg-linear-to-br ${theme.glow} blur-3xl opacity-60 transition-opacity duration-700 group-hover:opacity-100`}
      />

      <div className="relative z-10 flex flex-col justify-between h-full p-7 md:p-8">
        {/* Top row: icon, format badge, index */}
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
            <Icon size={20} className={theme.accent} />
          </div>
          <div className="flex items-center gap-3">
            {/* Format chip — reinforces that each card is a distinct video shape */}
            <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 font-mono text-[11px] text-white/60 backdrop-blur-sm">
              {theme.format}
            </span>
            <span className="font-mono text-sm text-white/30 transition-colors group-hover:text-white/50">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Bottom: text + CTA */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">{cat.label}</h3>
          <p className="text-sm text-slate-300 group-hover:text-slate-200">
            {cat.tagline}
          </p>
          <div
            className={`inline-flex items-center gap-1.5 text-sm font-semibold ${theme.accent} transition-all duration-300 group-hover:gap-3`}
          >
            <span>Explore</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 bg-linear-to-r ${theme.gradient} transition-transform duration-500 group-hover:scale-x-100`}
      />
    </button>
  );
};

const Work = () => {
  const scrollTo = (slug) => {
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="work" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#05070d]">
        <div className="absolute left-1/2 top-0 h-125 w-225 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Video <span className="text-blue-500">Portfolio</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-slate-400">
            Explore my work across different formats — each crafted with
            intention and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CATEGORIES.map((cat, index) => (
            <WorkCard key={cat.slug} cat={cat} index={index} onSelect={scrollTo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;