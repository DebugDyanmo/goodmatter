import { Link, useLocation } from "wouter";
import { Home, Briefcase, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [location] = useLocation();

  return (
    <>
      {/* FAB for Submit Deal */}
      <div className="md:hidden fixed bottom-20 right-4 z-50">
        <Button size="icon" className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(21,169,255,0.6)]">
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full glass-card border-t border-white/10 bg-background/80 backdrop-blur-xl z-50 pb-safe">
        <div className="flex items-center justify-around p-3">
          <Link href="/">
            <div className={`flex flex-col items-center gap-1 ${location === "/" ? "text-primary" : "text-muted-foreground"}`}>
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-medium">Home</span>
            </div>
          </Link>
          <Link href="/founder-dashboard">
            <div className={`flex flex-col items-center gap-1 ${location === "/founder-dashboard" ? "text-primary" : "text-muted-foreground"}`}>
              <Briefcase className="w-6 h-6" />
              <span className="text-[10px] font-medium">Founder</span>
            </div>
          </Link>
          <Link href="/investor-dashboard">
            <div className={`flex flex-col items-center gap-1 ${location === "/investor-dashboard" ? "text-primary" : "text-muted-foreground"}`}>
              <Users className="w-6 h-6" />
              <span className="text-[10px] font-medium">Investor</span>
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}
