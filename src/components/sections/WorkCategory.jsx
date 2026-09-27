import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { getCategory, getProjectsByCategory } from "../../data/Projects";
import ProjectCard from "../../components/layout/ProjectCard";

/* ─── Per-category themes ─── */
const THEMES = {
  montages: {
    accent: "text-[#ff007f]",
    border: "border-[#ff007f]",
    bg: "bg-[#ff007f]",
    shadow: "shadow-[8px_8px_0px_0px_#ff007f]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#ff007f]",
    glow: "bg-[#ff007f]/10",
    label: "Premium Montages",
    kicker: "// Cinematic Cuts",
  },
  "short-form": {
    accent: "text-[#facc15]",
    border: "border-[#facc15]",
    bg: "bg-[#facc15]",
    shadow: "shadow-[8px_8px_0px_0px_#facc15]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#facc15]",
    glow: "bg-[#facc15]/10",
    label: "Short Form",
    kicker: "// Reels · Shorts · TikTok",
  },
  "long-form": {
    accent: "text-[#ccff00]",
    border: "border-[#ccff00]",
    bg: "bg-[#ccff00]",
    shadow: "shadow-[8px_8px_0px_0px_#ccff00]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#ccff00]",
    glow: "bg-[#ccff00]/10",
    label: "Long Form",
    kicker: "// Docs · Vlogs · Narrative",
  },
};

/* ─── Grid layouts for grid-based categories (long-form handled separately) ─── */
const GRID_CLASSES = {
  montages: "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10",
  "short-form": "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8",
};

const PREVIEW_LIMIT = {
  montages: 2,
  "short-form": 3,
  "long-form": 3,
};

const WorkCategorySection = ({ slug, onSelectProject }) => {
  const category = getCategory(slug);
  const allProjects = getProjectsByCategory(slug);
  const limit = PREVIEW_LIMIT[slug] ?? allProjects.length;
  const projects = allProjects.slice(0, limit);
  const hasMore = allProjects.length > limit;

  const scrollRef = useRef(null);

  /* ─── Mouse wheel → horizontal scroll (long-form only) ─── */
  useEffect(() => {
    if (slug !== "long-form") return;
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [slug]);

  if (!category) return null;

  const theme = THEMES[slug] || THEMES.montages;
  const variant = category.aspect === "portrait" ? "portrait" : "landscape";

  return (
    <section
      id={slug}
      className="relative scroll-mt-24 overflow-hidden bg-[#05070d] px-6 py-24 md:py-32"
    >
      {/* ─── Subtle background glow ─── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={`absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full ${theme.glow} blur-[150px]`}
        />
      </div>

      {/* ─── Wrapper: full-width for long-form, constrained for others ─── */}
      <div className={slug === "long-form" ? "w-full" : "max-w-6xl mx-auto"}>
        {/* ─── SECTION HEADER ─── */}
        <div className={`mb-14 text-center ${slug === "long-form" ? "max-w-6xl mx-auto px-0" : ""}`}>
          {/* Kicker badge */}
          <div className="mb-4 inline-flex items-center border-2 border-black bg-black/60 px-4 py-1.5">
            <span
              className={`font-mono text-[10px] md:text-xs font-black uppercase tracking-widest ${theme.accent}`}
            >
              {theme.kicker}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[0.9]">
            {category.label.split(" ")[0]}{" "}
            <span className={theme.accent}>
              {category.label.split(" ").slice(1).join(" ")}
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-md font-mono text-xs md:text-sm text-slate-400 uppercase tracking-wider">
            {category.tagline}
          </p>

          {slug === "long-form" && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">
              ← Scroll to explore →
            </p>
          )}
        </div>

        {/* ─── PROJECTS ─── */}
        {projects.length === 0 ? (
          <p className="text-center font-mono text-sm uppercase tracking-widest text-slate-500">
            // Projects coming soon
          </p>
        ) : slug === "long-form" ? (
          /* ─── LONG-FORM: horizontal reel, hidden scrollbar ─── */
          <div
            ref={scrollRef}
            className="flex flex-nowrap gap-6 overflow-x-auto snap-x snap-mandatory pb-8
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="snap-center shrink-0 w-[85vw] md:w-[560px]"
              >
                <ProjectCard
                  project={project}
                  variant={variant}
                  feature={false}
                  theme={theme}
                  onClick={onSelectProject}
                />
              </div>
            ))}
          </div>
        ) : (
          /* ─── OTHER CATEGORIES: standard grid ─── */
          <div className={GRID_CLASSES[slug]}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant={variant}
                feature={slug === "montages"}
                theme={theme}
                onClick={onSelectProject}
              />
            ))}
          </div>
        )}

        {/* ─── VIEW MORE ─── */}
        {hasMore && category.playlistUrl && (
          <div className="mt-14 flex justify-center">
            <a
              href={category.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-3 px-8 py-4 font-black text-sm uppercase tracking-widest
                border-2 border-black ${theme.bg} text-black
                ${theme.shadow} ${theme.hoverShadow}
                hover:translate-x-1 hover:translate-y-1
                transition-all duration-75 rounded-none`}
            >
              View More {category.label}
              <ArrowRight
                size={16}
                className="transition-transform duration-75 group-hover:translate-x-1"
              />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkCategorySection;