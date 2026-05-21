import { Link, useLocation } from "wouter";
import {
  Home,
  Info,
  Briefcase,
  Users,
  Rocket,
  Crown,
  FileText,
  Settings,
  Store,
  MessageSquare,
  LogOut,
  Rss,
  TrendingUp,
} from "lucide-react";
import logoPath from "@assets/Screenshot_2026-05-21_133045_1779364430897.png";

const NAV_ITEMS = [
  { label: "Home",                icon: Home,          href: "/" },
  { label: "Deal Feed",           icon: Rss,           href: "/feed" },
  { label: "About",               icon: Info,          href: "/about" },
  { label: "Studio",              icon: Briefcase,     href: "/studio" },
  { label: "Investor Network",    icon: Users,         href: "/investors" },
  { label: "Founder Dashboard",   icon: Rocket,        href: "/founder-dashboard" },
  { label: "Subscription",        icon: Crown,         href: "/subscription" },
  { label: "My Submissions",      icon: FileText,      href: "/founder-dashboard" },
  { label: "Deal Intelligence",   icon: TrendingUp,    href: "/feed" },
  { label: "Service Marketplace", icon: Store,         href: "/marketplace" },
  { label: "Contact",             icon: MessageSquare, href: "/contact" },
];

export function Sidebar() {
  const [location] = useLocation();

  function isActive(href: string) {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  }

  return (
    <aside className="hidden md:flex flex-col w-60 h-screen flex-shrink-0 border-r border-white/[0.06] bg-background/60 z-40">
      {/* Logo */}
      <div className="px-5 py-5 flex-shrink-0">
        <Link href="/" className="flex items-center gap-3">
          <img src={logoPath} alt="GoodMatter" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-display font-bold text-lg tracking-tight text-white">GOOD MATTER</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-none">
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.label} href={item.href}>
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer ${
                  active
                    ? "bg-primary/15 text-white border-l-2 border-primary"
                    : "text-white/45 hover:bg-white/[0.04] hover:text-white/80"
                }`}>
                  <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-primary" : ""}`} />
                  <span className="font-medium text-[13px] leading-none">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/[0.06] space-y-0.5 flex-shrink-0">
        <Link href="/settings">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/45 hover:bg-white/[0.04] hover:text-white/80 transition-all cursor-pointer">
            <Settings className="w-4 h-4" />
            <span className="font-medium text-[13px]">Settings</span>
          </div>
        </Link>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/45 hover:bg-destructive/10 hover:text-destructive w-full transition-all">
          <LogOut className="w-4 h-4" />
          <span className="font-medium text-[13px]">Logout</span>
        </button>
      </div>
    </aside>
  );
}
