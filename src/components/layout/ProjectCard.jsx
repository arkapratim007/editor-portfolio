import React, { useState } from "react";
import { Play } from "lucide-react";
import { useOEmbed } from "../../hooks/Embedded";
import { getEmbedUrl } from "../../Lib/Video";

/**
 * variant: "portrait" (9:16) | "landscape" (16:9)
 * theme: { accent, border, shadow, hoverShadow, bg }
 * feature: larger title treatment for montages
 */

const ProjectCard = ({ project, variant = "landscape", feature = false, theme }) => {
  const aspectClass = variant === "portrait" ? "aspect-[5/9]" : "aspect-video";
  const { title, thumbnail } = useOEmbed(project);
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = getEmbedUrl(project);

  // Fallback theme if none provided
  const t = theme || {
    accent: "text-[#ff007f]",
    border: "border-[#ff007f]",
    bg: "bg-[#ff007f]",
    shadow: "shadow-[6px_6px_0px_0px_#ff007f]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#ff007f]",
  };

  return (
    <div
      className={`group relative flex w-full flex-col overflow-hidden rounded-none border-2 bg-[#1a1633] transition-all duration-75
        ${t.border} ${t.shadow} ${t.hoverShadow}
        hover:translate-x-1 hover:translate-y-1`}
    >
      {/* ─── THUMBNAIL / PLAYER ─── */}
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-black`}>
        {isPlaying && embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="group/play absolute inset-0 h-full w-full text-left"
          >
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-200 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 bg-[#0f0c29]" />
            )}

            {/* Dark scrim for contrast */}
            <div className="absolute inset-0 bg-black/30 transition-colors duration-100 group-hover/play:bg-black/50" />

            {/* ─── BRUTALIST PLAY BUTTON — sharp diamond-ish square ─── */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`flex h-16 w-16 items-center justify-center border-2 border-black ${t.bg}
                  shadow-[4px_4px_0px_0px_#000000]
                  transition-all duration-75
                  group-hover/play:shadow-[2px_2px_0px_0px_#000000]
                  group-hover/play:translate-x-0.5 group-hover/play:translate-y-0.5`}
              >
                <Play size={22} className="text-black fill-black ml-1" />
              </div>
            </div>

            {/* ─── CORNER BADGE (mono type label) ─── */}
            <div className="absolute top-3 left-3 flex items-center gap-2 border-2 border-black bg-black/80 px-2 py-1">
              <span className={`font-mono text-[10px] font-black uppercase tracking-widest ${t.accent}`}>
                ▶ Play
              </span>
            </div>

            {/* ─── GLITCH STRIPE BOTTOM (brutalist detail) ─── */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${t.bg}`} />
          </button>
        )}
      </div>

      {/* ─── INFO BAR ─── */}
      <div className="flex flex-col gap-1 px-4 py-3.5">
        <h3
          className={`font-black text-white uppercase leading-tight tracking-tight line-clamp-1 ${
            feature ? "text-xl md:text-2xl" : "text-sm"
          }`}
        >
          {title}
        </h3>
        {project.client && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
            <span className={t.accent}>// </span>
            {project.client}
            {project.duration ? ` · ${project.duration}` : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;