import { useEffect, useState } from "react";

/**
 
 @param {string[]} sectionIds
 @param {object} options
 @param {number} options.offset
 @returns {string} 
 */
export function useScrollSpy(sectionIds, { offset = 120 } = {}) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const updateActive = () => {
      const scrollLine = window.scrollY + offset;

      let current = elements[0].id;
      for (const el of elements) {
        if (el.offsetTop <= scrollLine) {
          current = el.id;
        } else {
          break;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        current = elements[elements.length - 1].id;
      }

      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [sectionIds, offset]);

  return activeId;
}