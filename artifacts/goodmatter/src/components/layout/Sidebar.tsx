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
  BarChart2,
} from "lucide-react";
import logoPath from "@assets/Screenshot_2026-05-21_133045_1779364430897.png";
import { useAuth } from "@/lib/auth-context";

const BASE_NAV_ITEMS = [
  { label: "Home",                icon: Home,          href: "/" },
  { label: "Deal Feed",           icon: Rss,           href: "/feed" },
  { label: "About",               icon: Info,          href: "/about" },
  { label: "Studio",              icon: Briefcase,     href: "/studio" },
  { label: "Subscription",        icon: Crown,         href: "/subscription" },
  { label: "Service Marketplace", icon: Store,         href: "/marketplace" },
];

const FOUNDER_NAV_ITEMS = [
  { label: "Founder Dashboard",   icon: Rocket,        href: "/founder-dashboard" },
  { label: "My Submissions",      icon: FileText,      href: "/founder-dashboard" },
  { label: "Investor Network",    icon: Users,         href: "/investors" },
  { label: "Contact",             icon: MessageSquare, href: "/contact" },
];

const INVESTOR_NAV_ITEMS = [
  { label: "Investor Dashboard",  icon: BarChart2,     href: "/investor-dashboard" },
  { label: "Contact",             icon: MessageSquare, href: "/contact" },
];

const GUEST_NAV_ITEMS = [
  { label: "Investor Network",    icon: Users,         href: "/investors" },
  { label: "Contact",             icon: MessageSquare, href: "/contact" },
];

export function Sidebar() {
  const [location, navigate] = useLocation();
  const { isLoggedIn, role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    ...BASE_NAV_ITEMS,
    ...(isLoggedIn && role === "founder"  ? FOUNDER_NAV_ITEMS  : []),
    ...(isLoggedIn && role === "investor" ? INVESTOR_NAV_ITEMS : []),
    ...(!isLoggedIn                       ? GUEST_NAV_ITEMS    : []),
  ];

  function isActive(href: string) {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  }

  return (
    <aside className="hidden md:flex flex-col w-60 h-screen flex-shrink-0 border-r border-white/[0.06] panel-3d z-40">
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
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.label} href={item.href}>
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer ${
                  active
                    ? "text-white border-l-2 border-primary"
                    : "text-white/45 hover:text-white/80"
                }`}
                style={active ? {
                  background: "linear-gradient(135deg, rgba(21,169,255,0.15) 0%, rgba(21,169,255,0.05) 100%)",
                  boxShadow: "0 2px 12px rgba(21,169,255,0.15), 0 1px 0 rgba(255,255,255,0.06) inset",
                } : undefined}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLDivElement).style.background = ""; }}
                >
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
        {isLoggedIn && (
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/45 hover:bg-destructive/10 hover:text-destructive w-full transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium text-[13px]">Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}
