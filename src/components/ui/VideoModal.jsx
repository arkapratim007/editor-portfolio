import React, { useEffect } from "react";
import { X } from "lucide-react";
import { getEmbedUrl } from "../../lib/video";

/**
 * project: the clicked project object, or null when closed.
 * Passing null unmounts the iframe entirely — nothing loads until a card is clicked.
 */
const VideoModal = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    if (!project) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    // Lock background scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const embedUrl = getEmbedUrl(project);
  const isPortrait = project.aspect === "portrait";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${isPortrait ? "max-w-sm" : "max-w-4xl"}`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <X size={18} />
        </button>

        {/* Video frame */}
        <div
          className={`overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${
            isPortrait ? "aspect-[9/16]" : "aspect-video"
          }`}
        >
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={project.title}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500 text-sm">
              Video unavailable
            </div>
          )}
        </div>

        {/* Title under the video */}
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          {project.client && <p className="text-sm text-slate-400">{project.client}</p>}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;