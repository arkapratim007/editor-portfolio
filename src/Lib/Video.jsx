/**
 * Turns a project's { platform, videoId } into a real embed URL and thumbnail.
 * Keeping this logic in one file means ProjectCard/VideoModal never need to
 * know the difference between YouTube and Vimeo — they just call these two functions.
 */

export function getEmbedUrl(project) {
  const { platform, videoId } = project;

  if (platform === "youtube") {
    // autoplay=1 + rel=0 (no related-video suggestions) + privacy-enhanced domain
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  }

  if (platform === "vimeo") {
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  }

  return null;
}

export function getThumbnail(project) {
  const { platform, videoId } = project;

  if (platform === "youtube") {
    // Free, predictable — no API call needed
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  // Vimeo has no predictable thumbnail URL — it requires an oEmbed fetch.
  // Returning null here means ProjectCard falls back to its gradient
  // placeholder for Vimeo projects until you wire up getVimeoThumbnail below.
  return null;
}

/**
 * Optional — call this once per Vimeo project (e.g. on mount, or as a build
 * step) if you want real Vimeo thumbnails instead of the gradient fallback.
 * Not called automatically since it's a network request, not a pure function.
 */
export async function fetchVimeoThumbnail(videoId) {
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`
    );
    const data = await res.json();
    return data.thumbnail_url ?? null;
  } catch {
    return null;
  }
}