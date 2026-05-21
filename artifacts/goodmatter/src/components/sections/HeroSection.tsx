import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthModals } from "@/components/modals/AuthModals";
import { ArrowRight, Sparkles, TrendingUp, CheckCircle, Zap } from "lucide-react";

const FEED_CARDS = [
  {
    type: "deal",
    company: "EcoGrid AI",
    tagline: "AI-powered energy optimization for commercial buildings",
    sector: "CleanTech",
    stage: "Seed",
    ask: "₹2.4Cr",
    score: 94,
    badges: ["Trending Deal", "Verified Founder"],
    time: "2h ago",
    initials: "EG",
    color: "#00C853",
  },
  {
    type: "investor",
    company: "Marcus Lindholm",
    tagline: "Expressed interest in 3 new startups this week",
    sector: "Linea Capital",
    stage: "Series A–C",
    ask: "₹3Cr–₹12Cr",
    score: 96,
    badges: ["High Investor Alignment", "Recently Active"],
    time: "4h ago",
    initials: "ML",
    color: "#15A9FF",
  },
  {
    type: "deal",
    company: "FinFlow",
    tagline: "Embedded lending infrastructure for Bharat's SMEs",
    sector: "Fintech",
    stage: "Pre-Seed",
    ask: "₹80L",
    score: 88,
    badges: ["AI Scored", "New"],
    time: "6h ago",
    initials: "FF",
    color: "#FFC107",
  },
];

export function HeroSection() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login-founder" | "login-investor" | "signup">("signup");

  const openAuth = (tab: "login-founder" | "login-investor" | "signup") => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-mesh">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0047B3]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0s", animationDuration: "6s" }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-[#15A9FF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s", animationDuration: "8s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-[#00C853]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s", animationDuration: "7s" }} />

        {/* Pixel particles from logo */}
        <div className="absolute top-16 left-[10%] w-4 h-4 bg-[#00C853] opacity-60 animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "3s" }} />
        <div className="absolute top-24 left-[15%] w-3 h-3 bg-[#15A9FF] opacity-50 animate-bounce" style={{ animationDelay: "1s", animationDuration: "4s" }} />
        <div className="absolute top-32 left-[8%] w-2 h-2 bg-[#FFC107] opacity-70 animate-bounce" style={{ animationDelay: "1.5s", animationDuration: "3.5s" }} />
        <div className="absolute top-20 right-[12%] w-4 h-4 bg-[#FF3D3D] opacity-50 animate-bounce" style={{ animationDelay: "0.8s", animationDuration: "5s" }} />
        <div className="absolute top-40 right-[18%] w-3 h-3 bg-[#FFC107] opacity-60 animate-bounce" style={{ animationDelay: "2s", animationDuration: "3s" }} />
        <div className="absolute bottom-32 right-[10%] w-2 h-2 bg-[#00C853] opacity-70 animate-bounce" style={{ animationDelay: "1.2s", animationDuration: "4.5s" }} />
        <div className="absolute bottom-24 left-[20%] w-3 h-3 bg-[#15A9FF] opacity-50 animate-bounce" style={{ animationDelay: "0.3s", animationDuration: "6s" }} />
      </div>

      <div className="relative z-10 px-6 md:px-10 py-20 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#15A9FF]" />
            <span className="text-xs text-white/70 font-medium">Private Market Intelligence Platform</span>
          </div>
        </div>

        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Direct Access To{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#15A9FF] to-[#00C853]">
            High-Signal
          </span>{" "}
          Capital Networks
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
          GoodMatter connects exceptional founders with thoughtful investors through curated private market intelligence and direct communication.
        </p>

        <div className="flex flex-wrap gap-4 mb-16">
          <Button
            data-testid="button-submit-startup"
            size="lg"
            className="bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-full px-8 h-12 shadow-[0_0_30px_rgba(21,169,255,0.4)] gap-2 text-base font-semibold"
            onClick={() => openAuth("signup")}
          >
            Submit Your Startup
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            data-testid="button-explore-investors"
            size="lg"
            variant="outline"
            className="border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full px-8 h-12 gap-2 text-base font-semibold backdrop-blur-sm"
            onClick={() => openAuth("login-investor")}
          >
            Explore Investor Network
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-white/40">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#00C853]" />
            <span>Verified founders only</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#00C853]" />
            <span>Accredited investors</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#00C853]" />
            <span>AI-powered matching</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-10 pb-16 space-y-4 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-[#15A9FF]" />
          <span className="text-xs font-semibold tracking-wider text-white/50 uppercase">Live Activity Feed</span>
        </div>

        {FEED_CARDS.map((card, i) => (
          <div
            key={i}
            data-testid={`card-feed-${i}`}
            className="glass-card rounded-2xl p-5 cursor-pointer group"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: `${card.color}20`, border: `1px solid ${card.color}40`, color: card.color }}
              >
                {card.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <span className="font-semibold text-white text-sm">{card.company}</span>
                    <span className="text-white/40 text-xs ml-2">{card.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 flex-shrink-0">
                    <Zap className="w-3 h-3 text-[#15A9FF]" />
                    <span className="text-xs font-bold text-[#15A9FF]">{card.score}%</span>
                  </div>
                </div>
                <p className="text-sm text-white/60 mb-3">{card.tagline}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-white/50">{card.sector}</span>
                  <span className="text-xs bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-white/50">{card.stage}</span>
                  <span className="text-xs bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-white/50">{card.ask}</span>
                  {card.badges.map((badge, bi) => (
                    <Badge
                      key={bi}
                      variant="outline"
                      className={`text-[10px] rounded-full px-2.5 py-0.5 ${
                        badge.includes("Trending") ? "bg-[#FFC107]/10 border-[#FFC107]/30 text-[#FFC107]" :
                        badge.includes("Verified") ? "bg-[#00C853]/10 border-[#00C853]/30 text-[#00C853]" :
                        badge.includes("High") ? "bg-[#15A9FF]/10 border-[#15A9FF]/30 text-[#15A9FF]" :
                        "bg-white/5 border-white/10 text-white/50"
                      }`}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AuthModals open={authOpen} onOpenChange={setAuthOpen} defaultTab={authTab} />
    </section>
  );
}
