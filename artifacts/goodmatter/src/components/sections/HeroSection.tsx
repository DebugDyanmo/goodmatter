import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthModals } from "@/components/modals/AuthModals";
import { ArrowRight, Zap, TrendingUp, Bookmark } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const LIVE_DEALS = [
  {
    company: "EcoGrid AI",
    tagline: "AI-powered energy optimization for commercial buildings",
    sector: "CleanTech",
    stage: "Seed",
    ask: "₹2.4Cr",
    score: 94,
    initials: "EG",
    color: "#00C853",
    growth: "+34% MoM",
  },
  {
    company: "FinFlow",
    tagline: "Embedded lending infrastructure for Bharat's SMEs",
    sector: "Fintech",
    stage: "Pre-Seed",
    ask: "₹80L",
    score: 88,
    initials: "FF",
    color: "#15A9FF",
    growth: "+28% MoM",
  },
  {
    company: "MediSync",
    tagline: "AI-first electronic health records for tier-2 hospitals",
    sector: "HealthTech",
    stage: "Seed",
    ask: "₹3.5Cr",
    score: 91,
    initials: "MS",
    color: "#FFC107",
    growth: "+51% MoM",
  },
];

export function HeroSection() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login-founder" | "login-investor" | "signup">("signup");
  const { login } = useAuth();

  const openAuth = (tab: "login-founder" | "login-investor" | "signup") => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Subtle ambient — one gradient, no animation */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_60%_40%_at_20%_60%,rgba(0,71,179,0.12),transparent)]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(21,169,255,0.07),transparent_70%)]" />
      </div>

      <div className="relative z-10 px-6 md:px-12 py-24 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <p className="text-sm font-medium text-white/40 mb-5 tracking-wide">
              GoodMatter — Private Market Network
            </p>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Where founders<br />
              meet the right<br />
              <span className="text-[#15A9FF]">capital.</span>
            </h1>

            <p className="text-[17px] text-white/50 leading-relaxed mb-10 max-w-sm">
              A curated network connecting verified founders with accredited investors — through direct communication, not noise.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-xl px-7 h-12 shadow-[0_0_24px_rgba(21,169,255,0.35)] gap-2 font-semibold"
                onClick={() => openAuth("signup")}
              >
                Apply as Founder
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 text-white/70 hover:text-white hover:border-white/30 bg-transparent rounded-xl px-7 h-12 font-semibold"
                onClick={() => openAuth("login-investor")}
              >
                Investor Access
              </Button>
            </div>

            <div className="flex items-center gap-6 mt-10 pt-10 border-t border-white/[0.06]">
              <div>
                <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>₹47Cr+</p>
                <p className="text-xs text-white/35 mt-0.5">Capital connected</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>200+</p>
                <p className="text-xs text-white/35 mt-0.5">Verified founders</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>85+</p>
                <p className="text-xs text-white/35 mt-0.5">Active investors</p>
              </div>
            </div>
          </div>

          {/* Right — live deal cards */}
          <div className="relative">
            {/* Stacked depth shadow */}
            <div className="absolute inset-0 translate-y-3 translate-x-3 rounded-2xl bg-white/[0.02] border border-white/[0.04]" />
            <div className="absolute inset-0 translate-y-1.5 translate-x-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.05]" />

            <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.07) inset",
              }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
                  <span className="text-xs font-medium text-white/50">Live Deal Flow</span>
                </div>
                <span className="text-[11px] text-white/25">Updated just now</span>
              </div>

              {/* Deal rows */}
              <div className="divide-y divide-white/[0.05]">
                {LIVE_DEALS.map((deal, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors group cursor-pointer">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: `${deal.color}18`, border: `1px solid ${deal.color}35`, color: deal.color }}
                    >
                      {deal.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-white">{deal.company}</span>
                        <span className="text-[11px] text-white/30">{deal.stage}</span>
                      </div>
                      <p className="text-xs text-white/40 truncate">{deal.tagline}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-[#15A9FF]" />
                        <span className="text-xs font-bold text-[#15A9FF]">{deal.score}%</span>
                      </div>
                      <span className="text-[11px] font-medium" style={{ color: deal.color }}>{deal.growth}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Panel footer */}
              <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] text-white/25">Showing 3 of 47 active deals</span>
                <button
                  onClick={() => openAuth("login-investor")}
                  className="text-[11px] text-[#15A9FF] hover:text-[#15A9FF]/80 flex items-center gap-1 transition-colors"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Floating stat pill */}
            <div className="absolute -bottom-4 -left-4 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.08]"
              style={{
                background: "linear-gradient(135deg, rgba(10,22,48,0.95) 0%, rgba(7,20,39,0.98) 100%)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset",
              }}
            >
              <TrendingUp className="w-4 h-4 text-[#00C853]" />
              <div>
                <p className="text-xs font-bold text-white">₹2.4Cr avg deal size</p>
                <p className="text-[10px] text-white/35">This month</p>
              </div>
            </div>

            {/* Floating bookmark pill */}
            <div className="absolute -top-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.08]"
              style={{
                background: "linear-gradient(135deg, rgba(10,22,48,0.95) 0%, rgba(7,20,39,0.98) 100%)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset",
              }}
            >
              <Bookmark className="w-3.5 h-3.5 text-[#FFC107]" fill="#FFC107" />
              <span className="text-xs font-semibold text-white">18 saved this week</span>
            </div>
          </div>
        </div>
      </div>

      <AuthModals
        open={authOpen}
        onOpenChange={setAuthOpen}
        defaultTab={authTab}
        onSuccess={(r) => { login(r); setAuthOpen(false); }}
      />
    </section>
  );
}
