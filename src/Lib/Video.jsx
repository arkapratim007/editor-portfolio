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
  return null;
}

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