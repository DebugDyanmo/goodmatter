import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const RECOMMENDED_FOUNDERS = [
  { name: "Aria Sharma", company: "EcoGrid AI", match: 94, initials: "AS" },
  { name: "Dev Patel", company: "FinFlow", match: 88, initials: "DP" },
  { name: "Sarah Chen", company: "MediSync", match: 82, initials: "SC" },
];

const RECOMMENDED_INVESTORS = [
  { name: "Marcus Lindholm", fund: "Linea Capital", match: 96, initials: "ML" },
  { name: "Priya Venkatesh", fund: "Aurora Early", match: 91, initials: "PV" },
  { name: "David Kim", fund: "Nexus Ventures", match: 85, initials: "DK" },
];

export function RightPanel() {
  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 border-l border-white/10 glass-card bg-background/50 overflow-y-auto z-40 p-5 space-y-8">
      <div>
        <h3 className="font-display font-semibold text-lg text-white mb-4">Intelligence Panel</h3>
        
        <div className="glass-card p-4 rounded-xl space-y-3 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 blur-2xl rounded-full -mr-8 -mt-8" />
          <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">AI Match Score</h4>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-display font-bold text-primary text-glow">92%</span>
            <span className="text-xs text-emerald-400 font-medium mb-1">Highly Compatible</span>
          </div>
          <Progress value={92} className="h-1.5 bg-background/50 [&>div]:bg-primary" />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase flex items-center justify-between">
          Recommended Investors
          <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">PRO</Badge>
        </h4>
        <div className="space-y-3">
          {RECOMMENDED_INVESTORS.map((inv, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
              <Avatar className="h-10 w-10 border border-white/10 group-hover:border-primary/50 transition-colors">
                <AvatarFallback className="bg-background text-xs">{inv.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{inv.name}</p>
                <p className="text-xs text-muted-foreground truncate">{inv.fund}</p>
              </div>
              <div className="text-xs font-bold text-primary">{inv.match}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Trending Startups</h4>
        <div className="space-y-3">
          {RECOMMENDED_FOUNDERS.map((founder, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
              <Avatar className="h-10 w-10 border border-white/10 group-hover:border-primary/50 transition-colors">
                <AvatarFallback className="bg-background text-xs">{founder.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{founder.company}</p>
                <p className="text-xs text-muted-foreground truncate">{founder.name}</p>
              </div>
              <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">{founder.match}%</Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="glass-card p-4 rounded-xl text-center space-y-3 border-primary/30 glow-cyan">
          <h4 className="text-sm font-bold text-white">Unlock All Profiles</h4>
          <p className="text-xs text-muted-foreground">Get full access to investor contact info and AI scoring.</p>
          <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-[0_0_15px_rgba(21,169,255,0.4)]">
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </aside>
  );
}
