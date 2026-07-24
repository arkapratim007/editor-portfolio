import React, { useState } from "react";
import { Play } from "lucide-react";
import { useOEmbed } from "../../hooks/Embedded";
import { getEmbedUrl } from "../../Lib/Video";

/**
 * variant: "portrait" (9:16, short form) | "landscape" (16:9, montages/long form)
 * feature: true renders a larger title treatment — use for montages
 *
 * Plays INLINE within the card's own thumbnail frame on click —
 * no modal, no lightbox. Each card owns its own play state, so clicking
 * one card doesn't affect any other card on the page.
 */
const ProjectCard = ({ project, variant = "landscape", feature = false }) => {
  const aspectClass = variant === "portrait" ? "aspect-[9/16]" : "aspect-video";
  const { title, thumbnail } = useOEmbed(project);
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = getEmbedUrl(project);

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e1320] transition-all duration-300 hover:border-white/20">
      {/* Thumbnail / player block */}
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
            className="group absolute inset-0 h-full w-full text-left"
          >
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-violet-900/40 via-slate-900 to-teal-900/30" />
            )}

            {/* Play affordance */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-300 group-hover:bg-black/25">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 transition-transform duration-300 group-hover:scale-110">
                <Play size={20} className="text-white fill-white ml-0.5" />
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Info bar — separate solid surface below the thumbnail/player */}
      <div className="px-4 py-3.5">
        <h3 className={`font-bold text-white ${feature ? "text-2xl" : "text-sm"} line-clamp-1`}>
          {title}
        </h3>
        {project.client && (
          <p className="text-xs text-slate-500 mt-0.5">
            {project.client}
            {project.duration ? ` · ${project.duration}` : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;