import React from "react";
import { ArrowRight } from "lucide-react";
import { getCategory, getProjectsByCategory } from "../../data/Projects";
import ProjectCard from "../../components/layout/ProjectCard";

const GRID_CLASSES = {
  montages: "grid grid-cols-1 md:grid-cols-2 gap-8",
  "short-form": "grid grid-cols-2 md:grid-cols-4 gap-5",
  "long-form": "grid grid-cols-1 md:grid-cols-3 gap-6",
};

const PREVIEW_LIMIT = {
  montages: 2,
  "short-form": 4,
  "long-form": 3,
};

/**
 * Renders one category's project grid as a full-page scroll section.
 * slug: "montages" | "short-form" | "long-form"
 */
const WorkCategorySection = ({ slug, onSelectProject }) => {
  const category = getCategory(slug);
  const allProjects = getProjectsByCategory(slug);
  const limit = PREVIEW_LIMIT[slug] ?? allProjects.length;
  const projects = allProjects.slice(0, limit);
  const hasMore = allProjects.length > limit;

  if (!category) return null;

  const variant = category.aspect === "portrait" ? "portrait" : "landscape";

  return (
    <section
      id={slug}
      className="relative px-6 py-24 md:py-32 scroll-mt-24 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#05070d]">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{category.label}</h2>
          <p className="mt-3 text-slate-400">{category.tagline}</p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-slate-500">Projects coming soon.</p>
        ) : (
          <div className={GRID_CLASSES[slug]}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant={variant}
                feature={slug === "montages"}
                onClick={onSelectProject}
              />
            ))}
          </div>
        )}

        {/* View More — plain external link to a YouTube playlist for this category */}
        {hasMore && category.playlistUrl && (
          <div className="mt-12 flex justify-center">
            <a
              href={category.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              View More {category.label}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkCategorySection;