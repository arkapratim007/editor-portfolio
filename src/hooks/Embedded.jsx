import { useEffect, useState } from "react";

/**
 * Fetches the real title + thumbnail for a project directly from
 * YouTube/Vimeo's oEmbed endpoints — no API key needed for either.
 *
 * Falls back to project.title / the gradient placeholder while loading,
 * or permanently if the fetch fails (e.g. offline, video deleted/private).
 *
 * Usage in ProjectCard:
 *   const { title, thumbnail, loading } = useOEmbed(project);
 */
export function useOEmbed(project) {
  const [data, setData] = useState({
    title: project.title, // manual title used until/unless the fetch succeeds
    thumbnail: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchOEmbed() {
      const oembedUrl =
        project.platform === "youtube"
          ? `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${project.videoId}&format=json`
          : project.platform === "vimeo"
          ? `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${project.videoId}`
          : null;

      if (!oembedUrl) {
        setData((prev) => ({ ...prev, loading: false }));
        return;
      }

      try {
        const res = await fetch(oembedUrl);
        if (!res.ok) throw new Error("oEmbed request failed");
        const json = await res.json();

        if (!cancelled) {
          setData({
            title: json.title || project.title, // keep manual title if API gives nothing
            thumbnail: json.thumbnail_url || null,
            loading: false,
          });
        }
      } catch {
        if (!cancelled) {
          setData((prev) => ({ ...prev, loading: false }));
        }
      }
    }

    fetchOEmbed();
    return () => {
      cancelled = true;
    };
  }, [project.platform, project.videoId, project.title]);

  return data;
}