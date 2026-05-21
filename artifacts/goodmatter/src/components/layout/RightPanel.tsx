import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles, TrendingUp } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const FOUNDERS = [
  { name: "Aria Sharma",  company: "EcoGrid AI", initials: "AS", sector: "Climate",    color: "#00C853" },
  { name: "Dev Patel",    company: "FinFlow",    initials: "DP", sector: "FinTech",    color: "#15A9FF" },
  { name: "Sarah Chen",   company: "MediSync",   initials: "SC", sector: "HealthTech", color: "#FFC107" },
];

const INVESTORS = [
  { name: "Marcus Lindholm", fund: "Linea Capital",  initials: "ML" },
  { name: "Priya Venkatesh", fund: "Aurora Early",   initials: "PV" },
  { name: "David Kim",       fund: "Nexus Ventures", initials: "DK" },
];

/** Deterministic pseudo-random score from a string seed */
function seededScore(seed: string, min = 78, max = 98): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) & 0xffffffff;
  }
  return min + (Math.abs(hash) % (max - min + 1));
}

export function RightPanel() {
  const { isLoggedIn, role } = useAuth();

  // Overall panel match score — based on role for personalisation
  const panelScore = isLoggedIn ? (role === "investor" ? 87 : 92) : 92;
  const panelLabel = isLoggedIn && role === "investor" ? "Deal Match Score" : "AI Match Score";

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen border-l border-white/[0.06] panel-3d z-40 flex-shrink-0">
      <div className="flex flex-col h-full p-5 gap-6 overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-2 pt-1">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-sm text-white tracking-wide">Intelligence Panel</h3>
        </div>

        {/* Match Score */}
        <div className="card-3d p-4 relative overflow-hidden flex-shrink-0" style={{ borderColor: "rgba(21,169,255,0.2)", boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 20px rgba(21,169,255,0.08), 0 1px 0 rgba(255,255,255,0.07) inset" }}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/15 blur-2xl rounded-full" />
          <p className="text-[11px] font-semibold tracking-widest text-white/40 uppercase mb-3">{panelLabel}</p>
          <div className="flex items-end justify-between mb-2">
            <span className="text-4xl font-display font-bold text-primary leading-none">{panelScore}%</span>
            <div className="text-right">
              <p className="text-[11px] text-emerald-400 font-semibold">Highly Compatible</p>
              <p className="text-[10px] text-white/30">Based on your profile</p>
            </div>
          </div>
          <Progress value={panelScore} className="h-1 bg-white/5 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-emerald-400" />
        </div>

        {/* Top Investors — shown to founders or logged-out */}
        {(!isLoggedIn || role === "founder") && (
          <div className="flex flex-col gap-2 flex-shrink-0">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-widest text-white/40 uppercase">Top Investors</p>
              <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20 px-1.5 py-0">PRO</Badge>
            </div>
            <div className="space-y-1">
              {INVESTORS.map((inv, i) => (
                <div key={i} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition-colors group">
                  <Avatar className="h-8 w-8 border border-white/10 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-cyan-400/10 text-[11px] font-bold text-white">{inv.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{inv.name}</p>
                    <p className="text-[11px] text-white/40 truncate">{inv.fund}</p>
                  </div>
                  <span className="text-[11px] font-bold text-primary flex-shrink-0">{seededScore(inv.name)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending Startups — each has its own unique match score */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <p className="text-[11px] font-semibold tracking-widest text-white/40 uppercase">Trending Startups</p>
          </div>
          <div className="space-y-1">
            {FOUNDERS.map((founder, i) => {
              const score = seededScore(founder.company);
              return (
                <div key={i} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group">
                  <Avatar className="h-8 w-8 border border-white/10 group-hover:border-emerald-400/40 transition-colors flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 text-[11px] font-bold text-white">{founder.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{founder.company}</p>
                    <p className="text-[11px] text-white/40 truncate">{founder.name}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-emerald-400/8 text-emerald-400 border-emerald-400/20 px-1.5 py-0 flex-shrink-0">{score}%</Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-auto flex-shrink-0">
          <div className="card-3d p-4 text-center space-y-3" style={{ borderColor: "rgba(21,169,255,0.2)", background: "linear-gradient(145deg, rgba(21,169,255,0.08) 0%, rgba(7,20,39,0.95) 100%)" }}>
            <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Unlock All Profiles</p>
              <p className="text-[11px] text-white/40 mt-0.5">Full contact info & AI scoring</p>
            </div>
            <Link href="/subscription">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-xl h-8 shadow-[0_0_15px_rgba(21,169,255,0.35)]">
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </aside>
  );
}
