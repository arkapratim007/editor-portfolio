import { CircleUser, Handshake, Mail,} from "lucide-react";

const links = [
  { name: "Home", target: "home" },
  { name: "About", target: "about" },
  { name: "Projects", target: "work" },
  { name: "Contact", target: "contact" },
];

const socials = [
  { icon: CircleUser, href: "https://www.instagram.com/ig_s0ulkiller/" },
  { icon: Handshake, href: "#" },
  { icon: Mail, href: "mailto:souledits.gg@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              SOUL EDITS
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-xs">
              Professional video production services that elevate your brand.
                We specialize in creating compelling visual content that drives engagement and delivers results
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={`#${link.target}`}
                className="text-sm text-zinc-400 transition duration-300 hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="rounded-full bg-zinc-900 p-3 text-zinc-400 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:scale-110"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-500">

          <p>
            © {new Date().getFullYear()} SOUL EDITS. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Made by S0ULKILLER
          </p>

        </div>

      </div>
    </footer>
  );
}