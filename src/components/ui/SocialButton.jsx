import React from "react";

const SocialButton = ({
  href,
  icon,              
  label = "text-white text-lg font-bold",        
  borderColor = "border-white/10",
  hoverBorderColor = "hover:border-white/30",
  shadowColor = "shadow-white/20",
  hoverShadowColor = "hover:shadow-white/20",
  gradientFrom = "from-black/60",
  hoverGradientFrom = "hover:from-white/10",
  viaColor = "via-white/10",
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        p-5 rounded-full backdrop-blur-lg border ${borderColor}
        bg-linear-to-tr ${gradientFrom} to-black/40
        shadow-lg ${shadowColor}
        hover:shadow-2xl ${hoverShadowColor}
        hover:scale-110 
        active:scale-95
        transition-all duration-300 ease-out
        cursor-pointer ${hoverBorderColor}
        hover:bg-linear-to-tr ${hoverGradientFrom} hover:to-black/40
        group relative overflow-hidden
      `}
    >
      {/* Shine animation */}
      <div
        className={`
          absolute inset-0 bg-linear-to-r from-transparent ${viaColor} to-transparent
          -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out
        `}
      />
      <div className="relative z-10">{icon}</div>
      {/* {label && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {label}
        </span>
      )} */}
    </a>
  );
};

export default SocialButton;