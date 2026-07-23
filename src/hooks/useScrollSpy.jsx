import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view and returns its id.
 *
 * @param {string[]} sectionIds - ids of the sections to watch, in page order
 * @param {object} options
 * @param {string} options.rootMargin - shrinks/shifts the observer viewport.
 *   Default triggers a section as "active" once it crosses a line ~20% down
 *   the screen, and stops watching once it's 40% past the bottom — this
 *   keeps short sections from getting skipped and feels right for a navbar.
 * @returns {string} the id of the currently active section
 */
export function useScrollSpy(sectionIds, { rootMargin = "-20% 0px -40% 0px" } = {}) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);

        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(topMost.target.id);
        }
      },
      { rootMargin, threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeId;
}