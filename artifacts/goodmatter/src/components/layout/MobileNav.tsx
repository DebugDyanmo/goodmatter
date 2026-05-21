import { Link, useLocation } from "wouter";
import { Home, BarChart2, Rocket, Plus, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export function MobileNav() {
  const [location] = useLocation();
  const { isLoggedIn, role } = useAuth();

  return (
    <>
      {/* FAB — only for founders */}
      {isLoggedIn && role === "founder" && (
        <div className="md:hidden fixed bottom-20 right-4 z-50">
          <Link href="/founder-dashboard">
            <Button size="icon" className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(21,169,255,0.6)]">
              <Plus className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full border-t border-white/[0.06] z-50 pb-safe"
        style={{
          background: "linear-gradient(180deg, rgba(10,22,48,0.92) 0%, rgba(7,20,39,0.98) 100%)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.5), 0 -1px 0 rgba(255,255,255,0.05) inset",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-around p-3">
          <Link href="/">
            <div className={`flex flex-col items-center gap-1 ${location === "/" ? "text-primary" : "text-muted-foreground"}`}>
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-medium">Home</span>
            </div>
          </Link>

          <Link href="/feed">
            <div className={`flex flex-col items-center gap-1 ${location.startsWith("/feed") ? "text-primary" : "text-muted-foreground"}`}>
              <Rss className="w-6 h-6" />
              <span className="text-[10px] font-medium">Feed</span>
            </div>
          </Link>

          {isLoggedIn && role === "founder" && (
            <Link href="/founder-dashboard">
              <div className={`flex flex-col items-center gap-1 ${location.startsWith("/founder-dashboard") ? "text-primary" : "text-muted-foreground"}`}>
                <Rocket className="w-6 h-6" />
                <span className="text-[10px] font-medium">Dashboard</span>
              </div>
            </Link>
          )}

          {isLoggedIn && role === "investor" && (
            <Link href="/investor-dashboard">
              <div className={`flex flex-col items-center gap-1 ${location.startsWith("/investor-dashboard") ? "text-primary" : "text-muted-foreground"}`}>
                <BarChart2 className="w-6 h-6" />
                <span className="text-[10px] font-medium">Dashboard</span>
              </div>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
