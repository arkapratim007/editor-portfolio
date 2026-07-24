// src/components/Contact.js
import React from "react";
import ContactForm from "../Forms/ContactForm";
import SocialButton from "../ui/SocialButton";

// Your social platforms – add/modify as needed
const socials = [
  {
    id: "mail",
    href: "mailto:souledits.gg@gmail.com",
    label: "Email",
    borderColor: "border-white/10",
    hoverBorderColor: "hover:border-white/30",
    shadowColor: "shadow-white/20",
    hoverShadowColor: "hover:shadow-white/20",
    gradientFrom: "from-black/60",
    hoverGradientFrom: "hover:from-white/10",
    //hoverRotate: "hover:rotate-3",
    viaColor: "via-white/10",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "instagram",
    href: "https://instagram.com/SoulEditsGG",
    label: "Instagram",
    borderColor: "border-red-500/20",
    hoverBorderColor: "hover:border-red-500/50",
    shadowColor: "shadow-red-500/20",
    hoverShadowColor: "hover:shadow-red-500/30",
    gradientFrom: "from-black/60",
    hoverGradientFrom: "hover:from-green-500/10",
    viaColor: "via-red-400/20",
    icon: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <circle cx="24" cy="24" r="24" fill="#E4405F" />
        <path d="M24 14.1622C27.2041 14.1622 27.5837 14.1744 28.849 14.2321C30.019 14.2855 30.6544 14.481 31.0773 14.6453C31.6374 14.863 32.0371 15.123 32.457 15.5429C32.877 15.9629 33.137 16.3626 33.3547 16.9227C33.519 17.3456 33.7145 17.981 33.7679 19.1509C33.8256 20.4163 33.8378 20.7958 33.8378 23.9999C33.8378 27.2041 33.8256 27.5836 33.7679 28.849C33.7145 30.019 33.519 30.6543 33.3547 31.0772C33.137 31.6373 32.877 32.0371 32.4571 32.457C32.0371 32.8769 31.6374 33.1369 31.0773 33.3546C30.6544 33.519 30.019 33.7144 28.849 33.7678C27.5839 33.8255 27.2044 33.8378 24 33.8378C20.7956 33.8378 20.4162 33.8255 19.151 33.7678C17.981 33.7144 17.3456 33.519 16.9227 33.3546C16.3626 33.1369 15.9629 32.8769 15.543 32.457C15.1231 32.0371 14.863 31.6373 14.6453 31.0772C14.481 30.6543 14.2855 30.019 14.2321 28.849C14.1744 27.5836 14.1622 27.2041 14.1622 23.9999C14.1622 20.7958 14.1744 20.4163 14.2321 19.1509C14.2855 17.981 14.481 17.3456 14.6453 16.9227C14.863 16.3626 15.123 15.9629 15.543 15.543C15.9629 15.123 16.3626 14.863 16.9227 14.6453C17.3456 14.481 17.981 14.2855 19.151 14.2321C20.4163 14.1744 20.7959 14.1622 24 14.1622ZM24 12C20.741 12 20.3323 12.0138 19.0524 12.0722C17.7752 12.1305 16.9028 12.3333 16.1395 12.63C15.3504 12.9366 14.6812 13.3469 14.0141 14.0141C13.3469 14.6812 12.9366 15.3504 12.63 16.1395C12.3333 16.9028 12.1305 17.7751 12.0722 19.0524C12.0138 20.3323 12 20.741 12 23.9999C12 27.259 12.0138 27.6676 12.0722 28.9475C12.1305 30.2248 12.3333 31.0971 12.63 31.8604C12.9366 32.6495 13.3469 33.3187 14.0141 33.9859C14.6812 34.653 15.3504 35.0633 16.1395 35.3699C16.9028 35.6666 17.7752 35.8694 19.0524 35.9277C20.3323 35.9861 20.741 35.9999 24 35.9999C27.259 35.9999 27.6677 35.9861 28.9476 35.9277C30.2248 35.8694 31.0972 35.6666 31.8605 35.3699C32.6496 35.0633 33.3188 34.653 33.9859 33.9859C34.653 33.3187 35.0634 32.6495 35.37 31.8604C35.6667 31.0971 35.8695 30.2248 35.9278 28.9475C35.9862 27.6676 36 27.259 36 23.9999C36 20.741 35.9862 20.3323 35.9278 19.0524C35.8695 17.7751 35.6667 16.9028 35.37 16.1395C35.0634 15.3504 34.653 14.6812 33.9859 14.0141C33.3188 13.3469 32.6496 12.9366 31.8605 12.63C31.0972 12.3333 30.2248 12.1305 28.9476 12.0722C27.6677 12.0138 27.259 12 24 12Z" fill="black" />
        <path d="M24.0059 17.8433C20.6026 17.8433 17.8438 20.6021 17.8438 24.0054C17.8438 27.4087 20.6026 30.1675 24.0059 30.1675C27.4092 30.1675 30.1681 27.4087 30.1681 24.0054C30.1681 20.6021 27.4092 17.8433 24.0059 17.8433ZM24.0059 28.0054C21.7968 28.0054 20.0059 26.2145 20.0059 24.0054C20.0059 21.7963 21.7968 20.0054 24.0059 20.0054C26.2151 20.0054 28.0059 21.7963 28.0059 24.0054C28.0059 26.2145 26.2151 28.0054 24.0059 28.0054Z" fill="black" />
        <path d="M31.8507 17.5963C31.8507 18.3915 31.206 19.0363 30.4107 19.0363C29.6154 19.0363 28.9707 18.3915 28.9707 17.5963C28.9707 16.801 29.6154 16.1562 30.4107 16.1562C31.206 16.1562 31.8507 16.801 31.8507 17.5963Z" fill="black" />
      </svg>
    ),
  },
  {
    id: "discord",
    href: "https://discord.com/users/s0ulkillerop",
    label: "Discord",
    borderColor: "border-indigo-500/20",
    hoverBorderColor: "hover:border-indigo-500/50",
    shadowColor: "shadow-indigo-500/20",
    hoverShadowColor: "hover:shadow-indigo-500/30",
    gradientFrom: "from-black/60",
    hoverGradientFrom: "hover:from-indigo-500/10",
    viaColor: "via-indigo-400/20",
    icon: (
      <svg className="w-7 h-7 fill-current text-indigo-500 group-hover:text-indigo-400 transition-colors duration-300" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M524.531 69.836a1.5 1.5 0 0 0-.764-.7A485.065 485.065 0 0 0 404.081 32.03a1.816 1.816 0 0 0-1.923.91 337.461 337.461 0 0 0-14.9 30.6 447.848 447.848 0 0 0-134.426 0 309.541 309.541 0 0 0-15.135-30.6 1.89 1.89 0 0 0-1.924-.91 483.689 483.689 0 0 0-119.688 37.107 1.712 1.712 0 0 0-.788.676C39.068 183.651 18.186 294.69 28.43 404.354a2.016 2.016 0 0 0 .765 1.375 487.666 487.666 0 0 0 146.825 74.189 1.9 1.9 0 0 0 2.063-.676A348.2 348.2 0 0 0 208.12 430.4a1.86 1.86 0 0 0-1.019-2.588 321.173 321.173 0 0 1-45.868-21.853 1.885 1.885 0 0 1-.185-3.126 251.047 251.047 0 0 0 9.109-7.137 1.819 1.819 0 0 1 1.9-.256c96.229 43.917 200.41 43.917 295.5 0a1.812 1.812 0 0 1 1.924.233 234.533 234.533 0 0 0 9.132 7.16 1.884 1.884 0 0 1-.162 3.126 301.407 301.407 0 0 1-45.89 21.83 1.875 1.875 0 0 0-1 2.611 391.055 391.055 0 0 0 30.014 48.815 1.864 1.864 0 0 0 2.063.7A486.048 486.048 0 0 0 610.7 405.729a1.882 1.882 0 0 0 .765-1.352c12.264-126.783-20.532-236.912-86.934-334.541zM222.491 337.58c-28.972 0-52.844-26.587-52.844-59.239s23.409-59.241 52.844-59.241c29.665 0 53.306 26.82 52.843 59.239 0 32.654-23.41 59.241-52.843 59.241zm195.38 0c-28.971 0-52.843-26.587-52.843-59.239s23.409-59.241 52.843-59.241c29.667 0 53.307 26.82 52.844 59.239 0 32.654-23.177 59.241-52.844 59.241z"/>
      </svg>
    ),
  },
  {
    id: "youtube",
    href: "https://www.youtube.com/@s0ulkillerop",
    label: "YouTube",
    borderColor: "border-red-500/20",
    hoverBorderColor: "hover:border-red-500/50",
    shadowColor: "shadow-red-500/20",
    hoverShadowColor: "hover:shadow-red-500/30",
    gradientFrom: "from-black/60",
    hoverGradientFrom: "hover:from-red-500/10",
    viaColor: "via-red-400/20",
    icon: (<svg
        class="w-7 h-7 fill-current text-red-500 group-hover:text-red-400 transition-colors duration-300"
        viewBox="0 0 576 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
        ></path>
      </svg> )
  }
];

const Contact = () => {
  return (
    <div id="contact" className="min-h-screen w-full bg-black bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-size-[40px_40px] font-sans text-white flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-6xl bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden grid grid-cols-1 lg:grid-cols-5">
        
        {/* LEFT SIDE – Brand + Social */}
        <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-between bg-transparent relative">
          {/* decorative blurs */}
          <div className="absolute -top-32 -right-32 w-64 h-64" />
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
              Currently accepting orders for shorts and long projects. Drop a line below or reach out directly on Discord
              for the fastest response.
            </p>

            {/* SOCIAL BUTTONS – modular grid */}
            <div className="mt-8">
              <div className="grid grid-cols-4 gap-2 max-w-sm">
                {socials.map((social) => (
                  <div key={social.id} className="flex justify-center">
                    <SocialButton {...social} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-slate-700/30">
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              We'll get back to you within 24 hours
            </p>
          </div>
        </div>

        {/* RIGHT SIDE – Form */}
        <div className="lg:col-span-3 p-8 md:p-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;