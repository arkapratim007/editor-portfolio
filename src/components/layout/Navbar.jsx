import React, { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from '../../data/navItems';
import { useScrollSpy } from "../../hooks/useScrollSpy";
import mylogo from "../../assets/soul.svg";

export default function GlassNavbar() {
  const active = useScrollSpy(NAV_ITEMS.map((item) => item.target));
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const linkRefs = useRef({});
  const navListRef = useRef(null);

  const movePill = (target) => {
    const el = linkRefs.current[target];
    const list = navListRef.current;
    if (!el || !list) return;
    const elRect = el.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    setPillStyle({
      left: elRect.left - listRect.left,
      width: elRect.width,
    });
  };

  useEffect(() => {
    movePill(active);
    const onResize = () => movePill(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (target) => {
    setMenuOpen(false);
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* MAIN NAVBAR  */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-200
          ${scrolled 
            ? "bg-[#0f0c29] border-b-2 border-[#facc15]/60 shadow-[0_8px_32px_rgba(0,0,0,0.8)]" 
            : "bg-[#0f0c29]/80 border-b border-[#facc15]/20"
          }
          flex items-center justify-between px-6 md:px-12 py-3`}
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className="flex items-center gap-2.5 font-black text-xl tracking-tight text-white whitespace-nowrap"
        >
          <img src={mylogo} alt="" className="h-10 w-auto" />
          <span className="text-[#facc15]">SOUL</span> EDITS
        </a>

        {/* Right group: links + CTA */}
        <div className="flex items-center gap-4">
          {/* Desktop links */}
          <ul
            ref={navListRef}
            className="relative hidden md:flex items-center gap-0.5 p-0.5"
          >
            {/* Sliding pill*/}
            <div
              className="absolute top-1 h-[calc(100%-8px)] rounded-none bg-[#ff007f]
                shadow-[0_0_20px_rgba(255,0,127,0.5)]
                transition-all duration-400 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ left: pillStyle.left, width: pillStyle.width }}
            />
            {NAV_ITEMS.map((item) => (
              <li key={item.target} className="relative z-10">
                <a
                  ref={(el) => (linkRefs.current[item.target] = el)}
                  href={`#${item.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.target);
                  }}
                  className={`relative inline-block px-5 py-2 text-sm font-bold uppercase tracking-wider
                    transition-all duration-150
                    ${
                      active === item.target
                        ? "text-black"
                        : "text-slate-400 hover:text-white"
                    }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA — brutalist button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
            className="hidden md:inline-flex items-center gap-2 bg-[#facc15] text-black font-black px-6 py-2.5
              border-2 border-black shadow-[4px_4px_0px_0px_#ff007f]
              hover:shadow-[2px_2px_0px_0px_#ff007f] hover:translate-x-0.5 hover:translate-y-0.5
              transition-all duration-75 rounded-none text-sm uppercase tracking-wider"
          >
            Get started
          </a>

          {/* Hamburger (mobile) */}
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative h-10 w-10 shrink-0 border-2 border-[#facc15]/40 bg-[#0f0c29] md:hidden
              hover:border-[#facc15] transition-colors duration-100"
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1.5">
              <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[90] bg-[#0f0c29]/80 backdrop-blur-sm transition-opacity duration-300 md:hidden
          ${menuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
      />

      {/*MOBILE MENU */}
      <div
        className={`fixed top-[72px] left-0 right-0 z-[99] bg-[#0f0c29] border-b-2 border-[#facc15]/30
          transition-all duration-300 ease-out md:hidden
          ${menuOpen ? "opacity-100 translate-y-0 visible pointer-events-auto" : "opacity-0 -translate-y-4 invisible pointer-events-none"}`}
      >
        <ul className="flex flex-col p-4 gap-1">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.target}>
              <a
                href={`#${item.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.target);
                }}
                style={{ transitionDelay: menuOpen ? `${80 + i * 70}ms` : "0ms" }}
                className={`flex items-center justify-between px-4 py-4 text-base font-bold uppercase tracking-wider
                  transition-all duration-200
                  ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                  ${
                    active === item.target
                      ? "text-[#facc15] bg-[#ff007f]/10 border-l-4 border-[#ff007f]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.label}
                {active === item.target && (
                  <span className="h-2 w-2 bg-[#ff007f] rotate-45" />
                )}
              </a>
            </li>
          ))}
          {/* Mobile CTA inside menu */}
          <li className="mt-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contact");
              }}
              className="block w-full text-center bg-[#facc15] text-black font-black px-4 py-4 border-2 border-black shadow-[4px_4px_0px_0px_#ff007f] hover:shadow-[2px_2px_0px_0px_#ff007f] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-75 rounded-none uppercase tracking-wider"
            >
              Get started →
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}