import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Lock, Unlock, ExternalLink, TrendingUp } from "lucide-react";

const UNLOCKED_INVESTORS = [
  {
    name: "Marcus Lindholm",
    fund: "Linea Capital",
    focus: "Fintech, payments, embedded finance",
    ticket: "₹3Cr–₹12Cr",
    stage: "Series A–C",
    initials: "ML",
    color: "#15A9FF",
    recentlyActive: true,
  },
  {
    name: "Priya Venkatesh",
    fund: "Aurora Early",
    focus: "B2B SaaS, climate infra",
    ticket: "₹1Cr–₹4Cr",
    stage: "Seed–Series A",
    initials: "PV",
    color: "#00C853",
    recentlyActive: true,
  },
];

const LOCKED_INVESTORS = [
  { initials: "RK", fund: "Blurred Capital", color: "#FFC107" },
  { initials: "AC", fund: "Alpha Ventures", color: "#15A9FF" },
  { initials: "MS", fund: "Meridian Fund", color: "#00C853" },
];

export function InvestorNetworkSection() {
  return (
    <section id="investors" className="py-24 px-6 md:px-10 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#15A9FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-3">
          <span className="text-xs font-semibold tracking-widest text-[#15A9FF] uppercase">Investor Network</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Active Capital, Direct Access
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <Unlock className="w-4 h-4 text-[#00C853]" />
              <span className="text-white/60">2 investor profiles unlocked monthly — subscribe for full access</span>
            </div>
          </div>
          <Button
            data-testid="button-unlock-all-investors"
            className="bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-full px-8 shadow-[0_0_20px_rgba(21,169,255,0.3)] gap-2 flex-shrink-0"
          >
            <Unlock className="w-4 h-4" />
            Unlock All Investors
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {UNLOCKED_INVESTORS.map((inv, i) => (
            <div
              key={i}
              data-testid={`card-investor-${i}`}
              className="glass-card rounded-2xl p-7 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-10" style={{ background: inv.color }} />

              <div className="flex items-start gap-5 mb-5">
                <Avatar className="w-14 h-14 border-2 flex-shrink-0" style={{ borderColor: `${inv.color}40` }}>
                  <AvatarFallback
                    className="text-white text-lg font-bold"
                    style={{ background: `linear-gradient(135deg, ${inv.color}40, ${inv.color}20)`, color: inv.color }}
                  >
                    {inv.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-white text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{inv.name}</h3>
                    {inv.recentlyActive && (
                      <Badge className="bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20 text-[10px] rounded-full">Recently Active</Badge>
                    )}
                  </div>
                  <p className="text-white/50 text-sm">{inv.fund}</p>
                </div>
              </div>

              <div className="space-y-2.5 mb-6">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: inv.color }} />
                  <div>
                    <span className="text-xs text-white/40 block">Focus</span>
                    <span className="text-sm text-white/80">{inv.focus}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-xl p-3">
                    <span className="text-xs text-white/40 block mb-0.5">Ticket Size</span>
                    <span className="text-sm font-semibold text-white">{inv.ticket}</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <span className="text-xs text-white/40 block mb-0.5">Stage</span>
                    <span className="text-sm font-semibold text-white">{inv.stage}</span>
                  </div>
                </div>
              </div>

              <Button
                data-testid={`button-connect-investor-${i}`}
                className="w-full rounded-xl gap-2"
                style={{ background: `${inv.color}15`, color: inv.color, border: `1px solid ${inv.color}30` }}
              >
                <ExternalLink className="w-4 h-4" />
                Connect
              </Button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LOCKED_INVESTORS.map((inv, i) => (
            <div
              key={i}
              data-testid={`card-investor-locked-${i}`}
              className="glass-card rounded-2xl p-7 relative overflow-hidden"
            >
              <div className="filter blur-sm pointer-events-none select-none">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-white font-bold" style={{ background: `${inv.color}30`, color: inv.color }}>
                      {inv.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="h-3 w-24 bg-white/20 rounded mb-2" />
                    <div className="h-2 w-16 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-white/10 rounded" />
                  <div className="h-2 w-3/4 bg-white/10 rounded" />
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#071427]/40 backdrop-blur-[2px] rounded-2xl">
                <div className="p-3 rounded-full bg-white/5 border border-white/10 mb-3">
                  <Lock className="w-5 h-5 text-white/60" />
                </div>
                <p className="text-xs text-white/60 text-center font-medium">Included with Subscription</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
