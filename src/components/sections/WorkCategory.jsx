import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { getCategory, getProjectsByCategory } from "../../data/Projects";
import ProjectCard from "../../components/layout/ProjectCard";

/* ─── Per-category themes ─── */
const THEMES = {
  montages: {
    accent: "text-[#ff007f]",
    bg: "bg-[#ff007f]",
    shadow: "shadow-[8px_8px_0px_0px_#ff007f]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#ff007f]",
    glow: "bg-[#ff007f]/10",
    label: "Premium Montages",
    kicker: "// Cinematic Cuts",
  },
  "short-form": {
    accent: "text-[#facc15]",
    bg: "bg-[#facc15]",
    shadow: "shadow-[8px_8px_0px_0px_#facc15]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#facc15]",
    glow: "bg-[#facc15]/10",
    label: "Short Form",
    kicker: "// Reels · Shorts · TikTok",
  },
  "long-form": {
    accent: "text-[#ccff00]",
    bg: "bg-[#ccff00]",
    shadow: "shadow-[8px_8px_0px_0px_#ccff00]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#ccff00]",
    glow: "bg-[#ccff00]/10",
    label: "Long Form",
    kicker: "// Docs · Vlogs · Narrative",
  },
};

/* ─── Card widths per category ─── */
const CARD_WIDTHS = {
  montages:     "w-[88vw] sm:w-[75vw] md:w-[640px]",
  "short-form": "w-[65vw] sm:w-[45vw] md:w-[320px]",
  "long-form":  "w-[88vw] sm:w-[75vw] md:w-[580px]",
};

const PREVIEW_LIMIT = {
  montages: 3,
  "short-form": 4,
  "long-form": 3,
};

const WorkCategorySection = ({ slug, onSelectProject }) => {
  const category = getCategory(slug);
  const allProjects = getProjectsByCategory(slug);
  const limit = PREVIEW_LIMIT[slug] ?? allProjects.length;
  const projects = allProjects.slice(0, limit);
  const hasMore = allProjects.length > limit;

  const scrollRef = useRef(null);

  /* ─── Mouse wheel → horizontal scroll ─── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const canScrollLeft = el.scrollLeft > 0;
      const canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // At the edges → let the page scroll normally
      if ((scrollingDown && !canScrollRight) || (scrollingUp && !canScrollLeft)) {
        return;
      }

      // Trackpad horizontal swipe → let browser handle it
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      e.preventDefault();
      el.scrollLeft += e.deltaY * 3;
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
      className="relative scroll-mt-24 bg-[#05070d] px-6 py-24 md:py-32"
    >
      {/* ─── Subtle background glow ─── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full ${theme.glow} blur-[150px]`}
        />
      </div>

      <div className="w-full">
        {/* ─── SECTION HEADER ─── */}
        <div className="mb-14 text-center max-w-6xl mx-auto">
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

          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">
            ← Scroll to explore →
          </p>
        </div>

        {/* ─── PROJECTS ─── */}
        {projects.length === 0 ? (
          <p className="text-center font-mono text-sm uppercase tracking-widest text-slate-500">
            // Projects coming soon
          </p>
        ) : (
          <div className="relative">
            {/* Edge fades */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#05070d] to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#05070d] to-transparent z-20" />

            {/* ─── OUTER: the scroll container ─── */}
            <div
              ref={scrollRef}
              className="overflow-x-auto overflow-y-hidden pb-8
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {/* ─── INNER: the flex track (min-w-max forces overflow) ─── */}
              <div className="flex flex-nowrap gap-6 md:gap-8 px-6 md:px-16 min-w-max">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`shrink-0 ${CARD_WIDTHS[slug]}`}
                  >
                    <ProjectCard
                      project={project}
                      variant={variant}
                      feature={slug === "montages"}
                      theme={theme}
                      onClick={onSelectProject}
                    />
                  </div>
                ))}

                {/* End spacer */}
                <div className="shrink-0 w-6 md:w-12" aria-hidden="true" />
              </div>
            </div>
          </div>
        )}

        {/* ─── VIEW MORE ─── */}
        {hasMore && category.playlistUrl && (
          <div className="mt-14 flex justify-center max-w-6xl mx-auto">
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