// Central data source — the Work overview, category pages, and VideoModal
// all read from this one file. Add a new project = add one object here.

export const CATEGORIES = [
  {
    slug: "montages",
    label: "Premium Montages",
    tagline: "Cinematic edits built for impact.",
    aspect: "landscape", // 16:9 feature cards
    playlistUrl: "https://youtube.com/playlist?list=PLNM8OXtRoBsUm73wCEYN4V_Z38S4h1wG4&si=pl0OoxZOlLViZ9Hw",
  },
  {
    slug: "short-form",
    label: "Short Form",
    tagline: "Reels, TikToks, and shorts that hook fast.",
    aspect: "portrait", // 9:16 grid cards
    playlistUrl: "https://www.youtube.com/playlist?list=REPLACE_WITH_SHORTS_PLAYLIST_ID",
  },
  {
    slug: "long-form",
    label: "Long Form",
    tagline: "Full narrative edits — docs, YouTube, vlogs.",
    aspect: "landscape", // 16:9 standard grid
    playlistUrl: "https://www.youtube.com/playlist?list=REPLACE_WITH_LONGFORM_PLAYLIST_ID",
  },
];

export const PROJECTS = [
  {
    id: "montage-01",
    title: "Runway Nights",
    category: "montages",
    client: "S0ULKILLER",
    platform: "youtube",
    videoId: "V-RqrRj6nvM",
  },
  {
    id: "montage-02",
    title: "City Pulse",
    category: "montages",
    client: "S0ULKILLER",
    platform: "youtube",
    videoId: "ocK6dqEpWYk",
  },
   {
    id: "montage-03",
    title: "City Pulse",
    category: "montages",
    client: "S0ULKILLER",
    platform: "youtube",
    videoId: "XiHmyEFl8l0",
  },
  {
    id: "short-01",
    title: "Coffee Ritual",
    category: "short-form",
    client: "S0ULKILLER",
    platform: "youtube",
    videoId: "zfM0oVO8Z1Q",
  },
  {
    id: "short-02",
    title: "3AM Thoughts",
    category: "short-form",
    client: "Daylight",
    platform: "youtube",
    videoId: "Mt5DAmHTdRU",
  },
  {
    id: "short-03",
    title: "3AM Thoughts",
    category: "short-form",
    client: "CoffinDancer",
    platform: "youtube",
    videoId: "RnU5SG2j31I",
  },
  {
    id: "short-04",
    title: "3AM Thoughts",
    category: "short-form",
    client: "Personal project",
    platform: "youtube",
    videoId: "gkn-4dMDAtg",
  },
  {
    id: "short-05",
    title: "3AM Thoughts",
    category: "short-form",
    client: "Personal project",
    platform: "youtube",
    videoId: "dQw4w9WgXcQ",
  },

  {
    id: "long-01",
    title: "The Last Workshop",
    category: "long-form",
    client: "Gameplay Tips & Tricks",
    duration: "18 min",
    platform: "youtube",
    videoId: "PTpDc-8AB7I",
  },
  {
    id: "long-02",
    title: "The new Workshop",
    category: "long-form",
    client: "Guide Video",
    duration: "20 min",
    platform: "youtube",
    videoId: "SSgPS2n7hV8",
  },
  {
    id: "long-03",
    title: "Coming Soon",
    category: "long-form",
    client: "Gameplay",
    duration: "2 min",
    platform: "youtube",
    videoId: "LFz3jPItiTE",
  },
];

export function getProjectsByCategory(slug) {
  return PROJECTS.filter((p) => p.category === slug);
}

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}