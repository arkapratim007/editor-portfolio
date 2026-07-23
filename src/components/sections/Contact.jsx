// src/components/Contact.js
import React from "react";
import { Mail, MessageCircle, User, Sparkles } from "lucide-react";
import ContactForm from "../Forms/ContactForm";

const Contact = () => {
  const socialLinks = [
    {
      icon: Mail,
      label: "Direct Mail",
      href: "mailto:contact@souledits.gg",
      handle: "souledits.gg@gmail.com",
    },
    {
      icon: MessageCircle,
      label: "Discord",
      href: "https://discord.com/users/s0ulkillerop",
      handle: "discord.gg/s0ulkillerop",
    },
    {
      icon: User,
      label: "Instagram",
      href: "https://instagram.com/SoulEditsGG",
      handle: "@SoulEditsGG",
    },
  ];

  return (
    <div id= "contact" className="min-h-screen w-full bg-black bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px] font-sans text-white flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-6xl bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden grid grid-cols-1 lg:grid-cols-5">
        {/* Left side – Brand + Social */}
        <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-between bg-linear-to-br from-slate-900/80 to-slate-950/80 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              <span className="bg-linear-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                Let's Build
              </span>
              <br />
              <span className="text-white">Your Next</span>
              <br />
              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Viral Hit.
              </span>
            </h1>

            <p className="mt-4 text-slate-300 text-sm md:text-base max-w-sm leading-relaxed">
              Currently accepting new clients for ongoing retainers and large-scale
              documentary projects. Drop a line below or reach out directly on Discord
              for the fastest response.
            </p>

            <div className="mt-8 space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 hover:bg-slate-800/60"
                  >
                    <div className="p-2 rounded-lg bg-slate-700/30 group-hover:bg-slate-700/50 transition-colors">
                      <Icon size={18} className="text-slate-300 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                    <span className="ml-auto text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                      {link.handle}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-slate-700/30">
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              We'll get back to you within 24 hours
            </p>
          </div>
        </div>

        {/* Right side – Form */}
        <div className="lg:col-span-3 p-8 md:p-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;