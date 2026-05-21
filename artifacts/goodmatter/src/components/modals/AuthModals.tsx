import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SiGoogle } from "react-icons/si";
import { CheckCircle, Shield, ArrowRight, Loader2 } from "lucide-react";
import { GOOGLE_CLIENT_ID } from "@/lib/google-auth";

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

interface AuthModalsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login-founder" | "login-investor" | "signup";
  onSuccess?: (role: "founder" | "investor") => void;
}

export function AuthModals({ open, onOpenChange, defaultTab = "login-founder", onSuccess }: AuthModalsProps) {
  const [role, setRole] = useState<"founder" | "investor">("founder");
  const [otpSent, setOtpSent] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const founderGoogleRef = useRef<HTMLDivElement>(null);
  const investorGoogleRef = useRef<HTMLDivElement>(null);
  const signupGoogleRef = useRef<HTMLDivElement>(null);

  // Render Google button into the hidden div, then trigger it on click
  async function handleGoogleClick(loginRole: "founder" | "investor") {
    if (!GOOGLE_CLIENT_ID) {
      setGoogleError("Google login is not configured yet.");
      return;
    }
    if (!window.google?.accounts?.id) {
      setGoogleError("Google script not loaded. Please refresh and try again.");
      return;
    }

    setGoogleLoading(true);
    setGoogleError(null);

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response: { credential: string }) => {
        try {
          const res = await fetch(`${BASE}/api/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: response.credential, role: loginRole }),
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            setGoogleError((err as { error?: string }).error ?? "Google sign-in failed.");
            return;
          }

          const data = await res.json() as { token: string; user: { role: string } };
          localStorage.setItem("gm_token", data.token);
          onSuccess?.(data.user.role as "founder" | "investor");
        } catch {
          setGoogleError("Network error. Please try again.");
        } finally {
          setGoogleLoading(false);
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // One Tap blocked — render a button and click it programmatically
        const container = loginRole === "investor" ? investorGoogleRef.current : founderGoogleRef.current;
        if (container) {
          container.innerHTML = "";
          window.google!.accounts.id.renderButton(container, {
            type: "standard", theme: "filled_black", size: "large", width: 300,
          });
          const btn = container.querySelector("div[role=button]") as HTMLElement | null;
          btn?.click();
        }
        setGoogleLoading(false);
      }
    });
  }

    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#071427] border border-white/10 text-white max-w-md p-0 overflow-hidden rounded-2xl backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0047B3]/10 to-[#15A9FF]/5 pointer-events-none" />
        <div className="relative">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-[#15A9FF]" />
              <span className="text-xs font-medium text-[#15A9FF] tracking-wider uppercase">Secure Access</span>
            </div>
            <DialogTitle className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              GoodMatter
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue={defaultTab} className="mt-4">
            <TabsList className="w-full grid grid-cols-3 bg-white/5 rounded-none border-b border-white/10 h-auto p-0">
              <TabsTrigger value="login-founder" className="rounded-none py-3 text-sm data-[state=active]:bg-transparent data-[state=active]:text-[#15A9FF] data-[state=active]:border-b-2 data-[state=active]:border-[#15A9FF] text-white/50 transition-all">Founder</TabsTrigger>
              <TabsTrigger value="login-investor" className="rounded-none py-3 text-sm data-[state=active]:bg-transparent data-[state=active]:text-[#15A9FF] data-[state=active]:border-b-2 data-[state=active]:border-[#15A9FF] text-white/50 transition-all">Investor</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-none py-3 text-sm data-[state=active]:bg-transparent data-[state=active]:text-[#15A9FF] data-[state=active]:border-b-2 data-[state=active]:border-[#15A9FF] text-white/50 transition-all">Sign Up</TabsTrigger>
            </TabsList>

            {/* ── Founder Login ── */}
            <TabsContent value="login-founder" className="p-6 space-y-4">
              <p className="text-white/60 text-sm">Access your founder dashboard and track your deal activity.</p>
              {googleError && <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">{googleError}</p>}
              <Button
                variant="outline"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 gap-2 rounded-xl h-11"
                onClick={() => handleGoogleClick("founder")}
                disabled={googleLoading}
              >
                {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SiGoogle className="w-4 h-4" />}
                Continue with Google
              </Button>
              {/* Hidden container for Google's rendered button fallback */}
              <div ref={founderGoogleRef} className="hidden" />
              <div className="relative flex items-center">
                <div className="flex-1 border-t border-white/10" />
                <span className="px-3 text-xs text-white/40">or use OTP</span>
                <div className="flex-1 border-t border-white/10" />
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-white/70 text-xs uppercase tracking-wider">Email or Phone</Label>
                  <Input data-testid="input-founder-email" placeholder="founder@startup.com" className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF] focus-visible:border-[#15A9FF]" />
                </div>
                {otpSent && (
                  <div>
                    <Label className="text-white/70 text-xs uppercase tracking-wider">OTP Code</Label>
                    <Input data-testid="input-founder-otp" placeholder="6-digit code" className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF] focus-visible:border-[#15A9FF] tracking-widest text-center text-lg" />
                  </div>
                )}
                <Button
                  data-testid="button-founder-otp"
                  className="w-full bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-xl h-11 shadow-[0_0_20px_rgba(21,169,255,0.3)] gap-2"
                  onClick={() => { if (otpSent) onSuccess?.("founder"); else setOtpSent(true); }}
                >
                  {otpSent ? "Verify & Sign In" : "Send OTP"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40 pt-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#00C853]" />
                Verified Founder access — curated network only
              </div>
            </TabsContent>

            {/* ── Investor Login ── */}
            <TabsContent value="login-investor" className="p-6 space-y-4">
              <p className="text-white/60 text-sm">Access curated deal flow and AI-matched startup intelligence.</p>
              {googleError && <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">{googleError}</p>}
              <Button
                variant="outline"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 gap-2 rounded-xl h-11"
                onClick={() => handleGoogleClick("investor")}
                disabled={googleLoading}
              >
                {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SiGoogle className="w-4 h-4" />}
                Continue with Google
              </Button>
              <div ref={investorGoogleRef} className="hidden" />
              <div className="relative flex items-center">
                <div className="flex-1 border-t border-white/10" />
                <span className="px-3 text-xs text-white/40">or use OTP</span>
                <div className="flex-1 border-t border-white/10" />
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-white/70 text-xs uppercase tracking-wider">Email</Label>
                  <Input data-testid="input-investor-email" placeholder="partner@fund.vc" className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF] focus-visible:border-[#15A9FF]" />
                </div>
                <Button
                  data-testid="button-investor-signin"
                  className="w-full bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-xl h-11 shadow-[0_0_20px_rgba(21,169,255,0.3)] gap-2"
                  onClick={() => onSuccess?.("investor")}
                >
                  Send OTP <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-3 rounded-xl bg-[#FFC107]/10 border border-[#FFC107]/20">
                <p className="text-xs text-[#FFC107]">Investor Accreditation Required — SEBI-registered or institutional investors only.</p>
              </div>
            </TabsContent>

            {/* ── Sign Up ── */}
            <TabsContent value="signup" className="p-6 space-y-4">
              <p className="text-white/60 text-sm">Join the GoodMatter private network.</p>
              {googleError && <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">{googleError}</p>}
              <div className="space-y-3">
                <div>
                  <Label className="text-white/70 text-xs uppercase tracking-wider">Full Name</Label>
                  <Input data-testid="input-signup-name" placeholder="Your name" className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF] focus-visible:border-[#15A9FF]" />
                </div>
                <div>
                  <Label className="text-white/70 text-xs uppercase tracking-wider">Email</Label>
                  <Input data-testid="input-signup-email" placeholder="you@company.com" className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF] focus-visible:border-[#15A9FF]" />
                </div>
                <div>
                  <Label className="text-white/70 text-xs uppercase tracking-wider">Phone</Label>
                  <Input data-testid="input-signup-phone" placeholder="+91 98765 43210" className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF] focus-visible:border-[#15A9FF]" />
                </div>
                <div>
                  <Label className="text-white/70 text-xs uppercase tracking-wider mb-2 block">I am a</Label>
                  <RadioGroup value={role} onValueChange={(v) => setRole(v as "founder" | "investor")} className="flex gap-4">
                    <div className={`flex-1 flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${role === "founder" ? "border-[#15A9FF] bg-[#15A9FF]/10" : "border-white/10 bg-white/5"}`}>
                      <RadioGroupItem value="founder" id="founder" className="border-white/30 text-[#15A9FF]" />
                      <Label htmlFor="founder" className="cursor-pointer text-white text-sm">Founder</Label>
                    </div>
                    <div className={`flex-1 flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${role === "investor" ? "border-[#15A9FF] bg-[#15A9FF]/10" : "border-white/10 bg-white/5"}`}>
                      <RadioGroupItem value="investor" id="investor" className="border-white/30 text-[#15A9FF]" />
                      <Label htmlFor="investor" className="cursor-pointer text-white text-sm">Investor</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button
                  data-testid="button-create-account"
                  className="w-full bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-xl h-11 shadow-[0_0_20px_rgba(21,169,255,0.3)] gap-2 mt-2"
                  onClick={() => onSuccess?.(role)}
                >
                  Create Account <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 gap-2 rounded-xl h-11"
                  onClick={() => handleGoogleClick(role)}
                  disabled={googleLoading}
                >
                  {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SiGoogle className="w-4 h-4" />}
                  Sign up with Google
                </Button>
                <div ref={signupGoogleRef} className="hidden" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
