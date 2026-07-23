import React from "react";
import { ArrowUpRight, Film, Zap, FileText } from "lucide-react";
import { CATEGORIES } from "../../data/Projects";

const THEMES = {
  montages: {
    icon: Film,
    gradient: "from-cyan-500 to-teal-400",
    accent: "text-cyan-400",
    glow: "from-cyan-500/20 to-teal-400/10",
  },
  "short-form": {
    icon: Zap,
    gradient: "from-amber-500 to-orange-400",
    accent: "text-amber-400",
    glow: "from-amber-500/20 to-orange-400/10",
  },
  "long-form": {
    icon: FileText,
    gradient: "from-violet-500 to-purple-400",
    accent: "text-violet-400",
    glow: "from-violet-500/20 to-purple-400/10",
  },
};

const Work = () => {
  const scrollTo = (slug) => {
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="work"
      className="relative scroll-mt-24 py-28 md:py-36"  
    >
      {/* ===== BACKGROUND (SAME AS OTHER PAGES) ===== */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#05070d]">
        <div className="absolute left-1/2 top-0 h-125 w-225 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.14em] text-teal-400">
            ● Selected Work
          </span>
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Video Portfolio
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-slate-400">
            Explore my work across different formats — each crafted with
            intention and attention to detail.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CATEGORIES.map((cat, index) => {
            const theme = THEMES[cat.slug] || THEMES.montages;
            const Icon = theme.icon;

            return (
              <button
                key={cat.slug}
                onClick={() => scrollTo(cat.slug)}
                className={`
                  group relative flex flex-col justify-between 
                  overflow-hidden rounded-2xl border border-white/10 
                  bg-white/5 backdrop-blur-sm p-7 md:p-8
                  min-h-70 md:min-h-80
                  text-left transition-all duration-400 
                  hover:scale-[1.02] hover:border-white/30 hover:shadow-2xl 
                  focus:outline-none focus:ring-2 focus:ring-teal-400/50
                `}
              >
                {/* Glow background */}
                <div
                  className={`
                    absolute -right-24 -top-24 h-64 w-64 
                    rounded-full bg-linear-to-br ${theme.glow} 
                    blur-3xl opacity-60 transition-opacity duration-700 
                    group-hover:opacity-100
                  `}
                />

                {/* Hover gradient overlay */}
                <div
                  className={`
                    absolute inset-0 bg-linear-to-br ${theme.gradient} 
                    opacity-0 transition-opacity duration-500 
                    group-hover:opacity-20
                  `}
                />

                {/* Top: icon + number */}
                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className={`
                      flex h-11 w-11 items-center justify-center 
                      rounded-xl bg-white/10 text-white 
                      transition-all duration-300 group-hover:bg-white/20
                    `}
                  >
                    <Icon size={20} className={theme.accent} />
                  </div>
                  <span
                    className={`
                      font-mono text-sm text-white/30 transition-colors 
                      group-hover:text-white/50
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Bottom: text + CTA */}
                <div className="relative z-10 space-y-2">
                  <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-white">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-slate-300 transition-colors group-hover:text-slate-200">
                    {cat.tagline}
                  </p>
                  <div
                    className={`
                      inline-flex items-center gap-1.5 
                      text-sm font-semibold ${theme.accent} 
                      transition-all duration-300 group-hover:gap-3
                    `}
                  >
                    <span>Explore</span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className={`
                    absolute bottom-0 left-0 right-0 h-0.5 
                    scale-x-0 bg-linear-to-r ${theme.gradient} 
                    transition-transform duration-500 group-hover:scale-x-100
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Work;