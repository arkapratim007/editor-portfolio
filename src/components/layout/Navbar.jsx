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

      <nav
  className={`fixed top-5 left-1/2 z-[100] w-[min(920px,calc(100%-32px))] -translate-x-1/2
    flex items-center gap-3 rounded-[20px] border border-white/10
    px-4 py-3 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300
    shadow-[0_8px_32px_rgba(0,0,0,0.35)]
    ${scrolled ? "bg-white/9" : "bg-white/5.5"}`}
>
  {/* Brand (left) */}
  <a
    href="#home"
    onClick={(e) => {
      e.preventDefault();
      handleNavClick("home");
    }}
    className="flex items-center gap-2.5 font-semibold text-[18px] tracking-wide text-slate-50 whitespace-nowrap"
  >
    <img src={mylogo} alt="" className="h-12 w-auto" />
    SOUL EDITS
  </a>

  {/* Right group: links + CTA */}
  <div className="ml-auto flex items-center gap-3">
    {/* Desktop links */}
    <ul
      ref={navListRef}
      className="relative hidden md:flex items-center gap-1 rounded-2xl p-1"
    >
      <div
        className="absolute top-1 h-[calc(100%-8px)] rounded-[10px] bg-linear-to-r from-teal-300 to-violet-400
          shadow-[0_4px_18px_rgba(94,234,212,0.35),0_0_22px_rgba(167,139,250,0.25)]
          transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
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
            className={`relative inline-block rounded-[10px] px-5 py-2 text-[14.5px] font-medium
              transition-all duration-300 hover:-translate-y-0.5
              ${
                active === item.target
                  ? "text-[#04140f] font-semibold"
                  : "text-slate-400 hover:text-slate-50 hover:bg-white/5"
              }`}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>

    {/* CTA – now inside the same group */}
    <a
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        handleNavClick("contact");
      }}
      className="hidden md:inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-teal-300 to-violet-400
        px-4.5 py-2.5 text-sm font-semibold text-[#060911] whitespace-nowrap
        shadow-[0_6px_20px_rgba(94,234,212,0.3)] transition-transform duration-300
        hover:-translate-y-0.5 hover:scale-[1.03]"
    >
      Get started
    </a>
  </div>

  {/* Hamburger (unchanged) */}
  <button
    aria-label="Toggle menu"
    aria-expanded={menuOpen}
    onClick={() => setMenuOpen((v) => !v)}
    className="relative h-10 w-10 shrink-0 rounded-xl border border-white/10 bg-white/5 md:hidden"
  >
    {/* ... hamburger lines ... */}
  </button>
</nav>

      {/* Scrim */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[90] bg-[#03050a]/50 backdrop-blur-[2px] transition-opacity duration-300 md:hidden
          ${menuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
      />

      {/* Mobile menu */}
      <div
        className={`fixed top-[90px] left-1/2 z-[99] w-[min(420px,calc(100%-32px))] -translate-x-1/2 rounded-[18px]
          border border-white/10 bg-white/[0.09] p-2.5 backdrop-blur-2xl backdrop-saturate-150
          shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 md:hidden
          ${menuOpen ? "opacity-100 translate-y-0 visible pointer-events-auto" : "opacity-0 -translate-y-3 invisible pointer-events-none"}`}
      >
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.target}>
              <a
                href={`#${item.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.target);
                }}
                style={{ transitionDelay: menuOpen ? `${80 + i * 70}ms` : "0ms" }}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15.5px] font-medium
                  transition-all duration-300 ease-out
                  ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                  ${
                    active === item.target
                      ? "text-slate-50 bg-white/[0.07]"
                      : "text-slate-400 hover:bg-white/5"
                  }`}
              >
                {item.label}
                <span
                  className={`h-[7px] w-[7px] rounded-full bg-linear-to-r from-teal-300 to-violet-400 transition-opacity duration-300
                    ${active === item.target ? "opacity-100" : "opacity-0"}`}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}