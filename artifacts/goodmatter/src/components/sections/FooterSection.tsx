import { Link } from "wouter";
import { SiX } from "react-icons/si";
import { Linkedin } from "lucide-react";
import logoPath from "@assets/Screenshot_2026-05-21_133045_1779364430897.png";

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Studio", href: "/#studio" },
  { label: "Investor Network", href: "/#investors" },
  { label: "Founder Network", href: "/#founders" },
  { label: "Subscription", href: "/#subscription" },
  { label: "Contact", href: "/#contact" },
];

export function FooterSection() {
  return (
    <footer className="border-t border-white/10 py-16 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12">
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="flex items-center gap-3">
              <img src={logoPath} alt="GoodMatter" className="w-8 h-8 rounded object-cover" />
              <span className="font-bold text-xl text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>GOOD MATTER</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Private market intelligence infrastructure connecting exceptional founders with thoughtful investors.
            </p>
            <div className="flex items-center gap-3">
              <button
                data-testid="link-social-linkedin"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/10 transition-all"
                onClick={() => window.open("https://linkedin.com", "_blank")}
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                data-testid="link-social-twitter"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
                onClick={() => window.open("https://x.com", "_blank")}
              >
                <SiX className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-semibold tracking-widest text-white/30 uppercase mb-4">Platform</h4>
              <ul className="space-y-2.5">
                {LINKS.slice(0, 3).map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <span className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-widest text-white/30 uppercase mb-4">Community</h4>
              <ul className="space-y-2.5">
                {LINKS.slice(3).map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <span className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-widest text-white/30 uppercase mb-4">Legal</h4>
              <ul className="space-y-2.5">
                <li><span className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
                <li><span className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
                <li><span className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">Disclaimer</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© 2026 GoodMatter. Private market intelligence.</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse" />
            <span className="text-xs text-white/30">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
