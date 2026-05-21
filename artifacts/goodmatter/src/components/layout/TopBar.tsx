import { Search, Menu, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthModals } from "@/components/modals/AuthModals";
import { useState } from "react";
import logoPath from "@assets/Screenshot_2026-05-21_133045_1779364430897.png";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth-context";

export function TopBar() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<"login-founder" | "login-investor" | "signup">("login-founder");
  const { isLoggedIn, role, login, logout } = useAuth();

  const openAuth = (tab: "login-founder" | "login-investor" | "signup") => {
    setAuthDefaultTab(tab);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (r: "founder" | "investor") => {
    login(r);
    setAuthModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full topbar-3d border-b border-white/[0.06]">
        <div className="flex h-16 items-center px-4 md:px-6 gap-4">
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="w-5 h-5" />
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <img src={logoPath} alt="GoodMatter" className="w-6 h-6 rounded object-cover" />
            </Link>
          </div>

          <div className="flex-1 flex items-center max-w-md hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search startups, investors, or insights..."
                className="w-full bg-white/5 border-white/10 text-white pl-9 rounded-full focus-visible:ring-primary focus-visible:border-primary placeholder:text-white/30"
              />
            </div>
          </div>

          <div className="flex-1 md:flex-none flex items-center justify-end gap-2 md:gap-4 ml-auto">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
            </Button>
            
            <div className="hidden lg:flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <span className="text-sm text-white/60 capitalize">{role} account</span>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white gap-1.5" onClick={logout}>
                    <LogOut className="w-4 h-4" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="text-sm font-medium text-white/70 hover:text-white" onClick={() => openAuth("login-founder")}>
                    Founder Login
                  </Button>
                  <Button variant="ghost" className="text-sm font-medium text-white/70 hover:text-white" onClick={() => openAuth("login-investor")}>
                    Investor Login
                  </Button>
                </>
              )}
            </div>

            {!isLoggedIn && (
              <Button
                className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(21,169,255,0.4)] hidden sm:flex rounded-full px-6"
                onClick={() => openAuth("signup")}
              >
                Sign Up
              </Button>
            )}
          </div>
        </div>
      </header>

      <AuthModals
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab={authDefaultTab}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
