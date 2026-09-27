// src/components/Footer.jsx
import React from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import mylogo from "../../assets/soul.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Work", target: "work" },
    { label: "Services", target: "services" },
    { label: "About", target: "about" },
    { label: "Contact", target: "contact" },
  ];

  const services = [
    { label: "Short Form", target: "services" },
    { label: "Long Form", target: "services" },
    { label: "Premium Montages", target: "services" },
  ];

  const socials = [
    { label: "YouTube", href: "https://www.youtube.com/@s0ulkillerop" },
    { label: "Instagram", href: "https://instagram.com/SoulEditsGG" },
    { label: "Discord", href: "https://discord.com/users/s0ulkillerop" },
    { label: "Email", href: "mailto:souledits.gg@gmail.com" },
  ];

  const scrollTo = (target) => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#0f0c29] border-t-2 border-[#facc15]/40 overflow-hidden">

      {/* ─── BACKGROUND GLOW (subtle, doesn't fight content) ─── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 -top-40 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#ff007f]/10 blur-[150px]" />
      </div>

      {/* ─── TOP BORDER STRIPE (brutalist detail) ─── */}
      <div className="h-1 w-full bg-[#ff007f]" />

      {/* ─── MAIN FOOTER CONTENT ─── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14 md:py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* ─── COL 1: BRAND ─── */}
          <div className="lg:col-span-1">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("home");
              }}
              className="flex items-center gap-2.5 mb-4 group"
            >
              <img src={mylogo} alt="Soul Edits" className="h-10 w-auto" />
              <span className="font-black text-lg tracking-tight text-white group-hover:text-[#facc15] transition-colors duration-75">
                <span className="text-[#facc15]">SOUL</span> EDITS
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Professional video production services that elevate your brand. Specialized in creating stunning content that drives engagement & delivers results.
            </p>

            {/* Availability badge */}
            <div className="mt-5 inline-flex items-center gap-2 border-2 border-[#facc15]/40 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#facc15] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#facc15]" />
              </span>
              <span className="font-mono text-[10px] font-bold text-[#facc15] uppercase tracking-widest">
                Open for projects
              </span>
            </div>
          </div>

          {/* ─── COL 2: NAVIGATE ─── */}
          <div>
            <h4 className="font-mono text-xs font-black text-[#ff007f] uppercase tracking-widest mb-5">
              // Navigate
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={`#${link.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.target);
                    }}
                    className="group inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#facc15] transition-colors duration-75 uppercase tracking-wider"
                  >
                    <span className="text-[#ff007f] opacity-0 group-hover:opacity-100 transition-opacity duration-75">❯</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── COL 3: SERVICES ─── */}
          <div>
            <h4 className="font-mono text-xs font-black text-[#ff007f] uppercase tracking-widest mb-5">
              // Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={`#${service.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(service.target);
                    }}
                    className="group inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#facc15] transition-colors duration-75 uppercase tracking-wider"
                  >
                    <span className="text-[#ff007f] opacity-0 group-hover:opacity-100 transition-opacity duration-75">❯</span>
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── COL 4: CONNECT / CTA ─── */}
          <div>
            <h4 className="font-mono text-xs font-black text-[#ff007f] uppercase tracking-widest mb-5">
              // Connect
            </h4>
            <ul className="space-y-3 mb-6">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#facc15] transition-colors duration-75 uppercase tracking-wider"
                  >
                    <span className="text-[#ff007f] opacity-0 group-hover:opacity-100 transition-opacity duration-75">❯</span>
                    {social.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-75" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Brutalist mini-CTA */}
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 bg-[#facc15] text-black font-black px-5 py-3
                border-2 border-black shadow-[4px_4px_0px_0px_#ff007f]
                hover:shadow-[2px_2px_0px_0px_#ff007f] hover:translate-x-0.5 hover:translate-y-0.5
                transition-all duration-75 rounded-none text-xs uppercase tracking-widest"
            >
              <Mail size={14} />
              Start a Project
            </button>
          </div>
        </div>

        {/* ─── BIG BRAND TEXT (brutalist divider) ─── */}
        <div className="mt-16 pt-10 border-t border-[#ff007f]/20">
          <h2
            className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter text-center select-none
              text-transparent [-webkit-text-stroke:2px_#ff007f] opacity-30"
          >
            SOUL EDITS
          </h2>
        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="border-t border-[#ff007f]/20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="font-mono text-xs text-slate-500 uppercase tracking-widest text-center md:text-left">
            © {currentYear} Soul Edits · All rights reserved
          </p>

          <p className="font-mono text-xs text-slate-600 uppercase tracking-widest text-center md:text-right">
            Built with <span className="text-[#ff007f]">♥</span> By SOULKILLER
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;