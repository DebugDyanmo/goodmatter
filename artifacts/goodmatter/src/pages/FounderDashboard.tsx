import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Upload, TrendingUp, Eye, MessageSquare, Zap, Clock, CheckCircle,
  ArrowRight, BarChart2, Users, Star, Lock, FileText
} from "lucide-react";

const PIPELINE_STAGES = [
  { label: "Submitted", active: true, done: true },
  { label: "AI Scored", active: true, done: true },
  { label: "Investor Views", active: true, done: false },
  { label: "Interest Expressed", active: false, done: false },
];

const INTERESTED_INVESTORS = [
  { name: "Marcus Lindholm", fund: "Linea Capital", match: 96, initials: "ML", color: "#15A9FF" },
  { name: "Priya Venkatesh", fund: "Aurora Early", match: 91, initials: "PV", color: "#00C853" },
  { name: "David Kim", fund: "Nexus Ventures", match: 85, initials: "DK", color: "#FFC107" },
];

const ANALYTICS = [
  { label: "Deck Views", value: "247", icon: Eye, color: "#15A9FF", change: "+12%" },
  { label: "Investor Signals", value: "18", icon: Star, color: "#FFC107", change: "+5%" },
  { label: "Messages", value: "7", icon: MessageSquare, color: "#00C853", change: "+3" },
  { label: "Profile Visits", value: "94", icon: Users, color: "#FF3D3D", change: "+22%" },
];

export default function FounderDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "submit" | "analytics">("overview");

  return (
    <Layout showRightPanel={false}>
      <div className="max-w-5xl mx-auto w-full px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold tracking-widest text-[#15A9FF] uppercase">Founder Dashboard</span>
              <Badge className="bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20 rounded-full text-[10px]">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Your Deal Command Center
            </h1>
            <p className="text-white/50 text-sm mt-1">Track your deal flow, investor interest, and AI scoring.</p>
          </div>
          <Button
            data-testid="button-submit-new-deal"
            className="bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-full px-6 shadow-[0_0_20px_rgba(21,169,255,0.3)] gap-2 flex-shrink-0"
          >
            <FileText className="w-4 h-4" />
            Submit New Deal
          </Button>
        </div>

        {/* Tab Nav */}
        <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-xl mb-8 w-fit">
          {(["overview", "submit", "analytics"] as const).map((tab) => (
            <button
              key={tab}
              data-testid={`tab-founder-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Analytics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {ANALYTICS.map((stat, i) => (
                <div key={i} data-testid={`stat-founder-${i}`} className="glass-card rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 blur-2xl rounded-full opacity-20" style={{ background: stat.color }} />
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}20`, border: `1px solid ${stat.color}30` }}>
                      <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: stat.color }}>{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AI Score */}
              <div className="glass-card rounded-2xl p-7 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#15A9FF]/10 blur-3xl rounded-full -mr-8 -mt-8" />
                <div className="flex items-center gap-2 mb-5">
                  <Zap className="w-4 h-4 text-[#15A9FF]" />
                  <span className="text-xs font-semibold tracking-wider text-white/50 uppercase">AI Deal Score</span>
                </div>
                <div className="relative flex items-center justify-center mb-5">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="#15A9FF" strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40 * 0.87} ${2 * Math.PI * 40}`}
                      style={{ filter: "drop-shadow(0 0 6px rgba(21,169,255,0.6))" }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>87</span>
                    <span className="text-xs text-white/40">/100</span>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[["Market Fit", 90], ["Team Score", 85], ["Traction", 82]].map(([label, val]) => (
                    <div key={label as string}>
                      <div className="flex justify-between text-xs text-white/50 mb-1">
                        <span>{label}</span>
                        <span>{val}%</span>
                      </div>
                      <Progress value={val as number} className="h-1 bg-white/5 [&>div]:bg-[#15A9FF]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Deal Pipeline */}
              <div className="glass-card rounded-2xl p-7">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart2 className="w-4 h-4 text-[#FFC107]" />
                  <span className="text-xs font-semibold tracking-wider text-white/50 uppercase">Deal Pipeline</span>
                </div>
                <div className="space-y-4">
                  {PIPELINE_STAGES.map((stage, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        stage.done ? "bg-[#00C853]/20 border border-[#00C853]/40" :
                        stage.active ? "bg-[#15A9FF]/20 border border-[#15A9FF]/40" :
                        "bg-white/5 border border-white/10"
                      }`}>
                        {stage.done
                          ? <CheckCircle className="w-3.5 h-3.5 text-[#00C853]" />
                          : stage.active
                          ? <Clock className="w-3.5 h-3.5 text-[#15A9FF]" />
                          : <div className="w-2 h-2 rounded-full bg-white/20" />
                        }
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm font-medium ${stage.done ? "text-white" : stage.active ? "text-[#15A9FF]" : "text-white/30"}`}>
                          {stage.label}
                        </span>
                      </div>
                      {stage.done && <Badge className="bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20 text-[10px] rounded-full">Done</Badge>}
                      {stage.active && !stage.done && <Badge className="bg-[#15A9FF]/10 text-[#15A9FF] border-[#15A9FF]/20 text-[10px] rounded-full">Active</Badge>}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="flex justify-between text-xs text-white/40 mb-2">
                    <span>Deal Visibility</span>
                    <span>62%</span>
                  </div>
                  <Progress value={62} className="h-1.5 bg-white/5 [&>div]:bg-gradient-to-r [&>div]:from-[#15A9FF] [&>div]:to-[#00C853]" />
                </div>
              </div>

              {/* Interested Investors */}
              <div className="glass-card rounded-2xl p-7">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#00C853]" />
                    <span className="text-xs font-semibold tracking-wider text-white/50 uppercase">Investor Matches</span>
                  </div>
                  <Badge className="bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20 text-[10px] rounded-full">{INTERESTED_INVESTORS.length} active</Badge>
                </div>
                <div className="space-y-3">
                  {INTERESTED_INVESTORS.map((inv, i) => (
                    <div key={i} data-testid={`investor-match-${i}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors cursor-pointer group">
                      <Avatar className="w-9 h-9 border" style={{ borderColor: `${inv.color}30` }}>
                        <AvatarFallback className="text-xs font-bold" style={{ background: `${inv.color}20`, color: inv.color }}>{inv.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{inv.name}</p>
                        <p className="text-xs text-white/40 truncate">{inv.fund}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold" style={{ color: inv.color }}>{inv.match}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  data-testid="button-view-all-investors"
                  variant="ghost"
                  className="w-full mt-4 text-white/40 hover:text-white text-xs gap-1.5"
                >
                  View All Matches
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Subscription Status */}
            <div className="glass-card rounded-2xl p-6 flex items-center justify-between gap-6 border-[#15A9FF]/20">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-[#FFC107]" />
                  <span className="text-sm font-semibold text-white">Subscription Status</span>
                </div>
                <p className="text-xs text-white/50">Upgrade to unlock full investor profiles, direct messaging, and AI insights.</p>
              </div>
              <Button className="bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-full px-6 flex-shrink-0 shadow-[0_0_15px_rgba(21,169,255,0.3)]">
                Upgrade Plan
              </Button>
            </div>
          </div>
        )}

        {activeTab === "submit" && (
          <div className="glass-card rounded-2xl p-8 max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Submit New Deal</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wider">Company Name</Label>
                  <Input data-testid="input-company-name" placeholder="Your startup" className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF]" />
                </div>
                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wider">Sector</Label>
                  <Input data-testid="input-sector" placeholder="e.g. Fintech, SaaS" className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF]" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wider">Stage</Label>
                  <Input data-testid="input-stage" placeholder="Pre-Seed / Seed / Series A" className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF]" />
                </div>
                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wider">Funding Ask</Label>
                  <Input data-testid="input-funding-ask" placeholder="₹50L / ₹2Cr" className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF]" />
                </div>
              </div>
              <div>
                <Label className="text-white/60 text-xs uppercase tracking-wider">Pitch Deck</Label>
                <div
                  data-testid="dropzone-pitch-deck"
                  className="mt-1.5 border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#15A9FF]/40 hover:bg-[#15A9FF]/5 transition-all cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-white/20 mx-auto mb-2" />
                  <p className="text-sm text-white/40">Drop your deck here or click to upload</p>
                  <p className="text-xs text-white/20 mt-1">PDF, PPTX up to 20MB</p>
                </div>
              </div>
              <Button
                data-testid="button-submit-deal-form"
                className="w-full bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-xl h-11 shadow-[0_0_20px_rgba(21,169,255,0.3)] gap-2"
              >
                Submit for AI Scoring
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {ANALYTICS.map((stat, i) => (
                <div key={i} className="glass-card rounded-2xl p-5">
                  <div className="text-xs text-white/40 mb-1">{stat.label}</div>
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
                  <div className="text-xs mt-1" style={{ color: stat.color }}>{stat.change} this week</div>
                </div>
              ))}
            </div>
            <div className="glass-card rounded-2xl p-7">
              <h3 className="text-lg font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Investor Engagement Over Time</h3>
              <div className="flex items-end gap-2 h-36">
                {[40, 65, 45, 80, 55, 90, 72, 95, 60, 88, 75, 100].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-lg transition-all hover:opacity-80" style={{ height: `${h}%`, background: `linear-gradient(to top, #0047B3, #15A9FF)`, opacity: 0.7 + i * 0.02 }} />
                ))}
              </div>
              <div className="flex justify-between text-xs text-white/30 mt-2">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
