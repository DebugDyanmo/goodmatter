import { Link, useLocation, useRouter } from "wouter";
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
  Wrench
} from "lucide-react";
import logoPath from "@assets/Screenshot_2026-05-21_133045_1779364430897.png";

const NAV_ITEMS = [
  { label: "Home",              icon: Home,           href: "/",               hash: null },
  { label: "About",             icon: Info,           href: "/",               hash: "about" },
  { label: "Studio",            icon: Briefcase,      href: "/",               hash: "studio" },
  { label: "Investor Network",  icon: Users,          href: "/",               hash: "investors" },
  { label: "Founder Network",   icon: Rocket,         href: "/",               hash: "founders" },
  { label: "Subscription",      icon: Crown,          href: "/",               hash: "subscription" },
  { label: "My Submissions",    icon: FileText,       href: "/founder-dashboard", hash: null },
  { label: "My Services",       icon: Wrench,         href: "/",               hash: "services" },
  { label: "Service Marketplace", icon: Store,        href: "/",               hash: "marketplace" },
  { label: "Contact",           icon: MessageSquare,  href: "/",               hash: "contact" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Sidebar() {
  const [location, navigate] = useLocation();

  function handleNav(e: React.MouseEvent, href: string, hash: string | null) {
    if (!hash) return; // let Link handle normal routes
    e.preventDefault();
    if (location === href) {
      scrollToSection(hash);
    } else {
      navigate(href);
      // Give the page time to mount before scrolling
      setTimeout(() => scrollToSection(hash), 120);
    }
  }

  function isActive(href: string, hash: string | null) {
    if (hash) {
      // Active only when on the home page and hash matches
      return false; // section highlighting via scroll observer would require IntersectionObserver — skip for now
    }
    return location === href;
  }

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-white/10 glass-card bg-background/50 z-40">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <img src={logoPath} alt="GoodMatter Logo" className="w-8 h-8 rounded object-cover" />
          <span className="font-display font-bold text-xl tracking-tight text-white">GOOD MATTER</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, item.hash) || (!item.hash && location === item.href);
          return (
            <Link
              key={item.label}
              href={item.hash ? item.href : item.href}
              onClick={(e) => handleNav(e, item.href, item.hash)}
            >
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                active
                  ? "bg-primary/20 text-primary border-l-2 border-primary glow-cyan"
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              }`}>
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <Link href="/settings">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white transition-all cursor-pointer">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </div>
        </Link>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/20 hover:text-destructive w-full transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
