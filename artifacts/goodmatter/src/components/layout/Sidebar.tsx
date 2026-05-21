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
  LogOut 
} from "lucide-react";
import logoPath from "@assets/Screenshot_2026-05-21_133045_1779364430897.png";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "About", icon: Info, href: "/#about" },
  { label: "Studio", icon: Briefcase, href: "/#studio" },
  { label: "Investor Network", icon: Users, href: "/#investors" },
  { label: "Founder Network", icon: Rocket, href: "/#founders" },
  { label: "Subscription", icon: Crown, href: "/#subscription" },
  { label: "My Submissions", icon: FileText, href: "/founder-dashboard" },
  { label: "My Services", icon: Settings, href: "/#services" },
  { label: "Service Marketplace", icon: Store, href: "/#marketplace" },
  { label: "Contact", icon: MessageSquare, href: "/#contact" },
];

export function Sidebar() {
  const [location] = useLocation();

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
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link key={item.label} href={item.href}>
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                isActive 
                  ? "bg-primary/20 text-primary border-l-2 border-primary shadow-[inset_4px_0_0_0_hsl(var(--primary))] glow-cyan" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white hover:glow-cyan-hover"
              }`}>
                <item.icon className="w-5 h-5" />
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
