import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Zap, Filter, Bookmark, MessageSquare, TrendingUp,
  CheckCircle, ArrowRight, Search, Bell, BarChart2
} from "lucide-react";

const CURATED_DEALS = [
  {
    company: "EcoGrid AI",
    tagline: "AI-powered energy optimization for commercial buildings",
    sector: "CleanTech",
    stage: "Seed",
    ask: "₹2.4Cr",
    score: 94,
    revenue: "₹12L ARR",
    growth: "+34% MoM",
    initials: "EG",
    color: "#00C853",
    saved: false,
  },
  {
    company: "FinFlow",
    tagline: "Embedded lending infrastructure for Bharat's SMEs",
    sector: "Fintech",
    stage: "Pre-Seed",
    ask: "₹80L",
    score: 88,
    revenue: "₹4L ARR",
    growth: "+28% MoM",
    initials: "FF",
    color: "#15A9FF",
    saved: true,
  },
  {
    company: "MediSync",
    tagline: "AI-first electronic health records for tier-2 hospitals",
    sector: "HealthTech",
    stage: "Seed",
    ask: "₹3.5Cr",
    score: 91,
    revenue: "₹22L ARR",
    growth: "+51% MoM",
    initials: "MS",
    color: "#FFC107",
    saved: false,
  },
];

const MARKET_SIGNALS = [
  { label: "Fintech deals this week", value: "14", up: true },
  { label: "Avg AI score", value: "88.4", up: true },
  { label: "New founders", value: "32", up: true },
  { label: "Active investors", value: "67", up: false },
];

const MESSAGES = [
  { name: "Aria Sharma", company: "EcoGrid AI", msg: "Thank you for your interest. When can we schedule a call?", time: "2h", unread: true, initials: "AS", color: "#00C853" },
  { name: "Dev Patel", company: "FinFlow", msg: "I've shared the updated financial model in the data room.", time: "1d", unread: false, initials: "DP", color: "#15A9FF" },
];

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState<"deals" | "messages" | "signals">("deals");
  const [savedDeals, setSavedDeals] = useState<Set<number>>(new Set([1]));

  const toggleSave = (i: number) => {
    setSavedDeals((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <Layout showRightPanel={false}>
      <div className="max-w-5xl mx-auto w-full px-6 py-10">
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold tracking-widest text-[#15A9FF] uppercase">Investor Dashboard</span>
              <Badge className="bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/20 rounded-full text-[10px]">
                <CheckCircle className="w-3 h-3 mr-1" />
                Accredited
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Curated Deal Intelligence
            </h1>
            <p className="text-white/50 text-sm mt-1">AI-matched startup opportunities aligned to your thesis.</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="outline" className="border-white/10 text-white/60 bg-white/5 hover:bg-white/10 rounded-full gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button className="bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-full px-5 shadow-[0_0_20px_rgba(21,169,255,0.3)] gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Alerts</span>
            </Button>
          </div>
        </div>

        {/* Tab Nav */}
        <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-xl mb-8 w-fit">
          {(["deals", "messages", "signals"] as const).map((tab) => (
            <button
              key={tab}
              data-testid={`tab-investor-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {tab}
              {tab === "messages" && (
                <span className="ml-1.5 w-4 h-4 rounded-full bg-[#15A9FF] text-white text-[10px] inline-flex items-center justify-center">1</span>
              )}
            </button>
          ))}
        </div>

        {activeTab === "deals" && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="glass-card rounded-2xl p-5 flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/30" />
                <Input
                  data-testid="input-deal-search"
                  placeholder="Search deals, sectors..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl pl-9 focus-visible:ring-[#15A9FF]"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {["Fintech", "SaaS", "CleanTech", "HealthTech", "Seed", "Series A"].map((tag) => (
                  <button
                    key={tag}
                    data-testid={`filter-${tag.toLowerCase()}`}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-[#15A9FF]/10 hover:border-[#15A9FF]/30 hover:text-[#15A9FF] transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Deal Cards */}
            <div className="space-y-4">
              {CURATED_DEALS.map((deal, i) => (
                <div
                  key={i}
                  data-testid={`card-deal-${i}`}
                  className="glass-card rounded-2xl p-7 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-10" style={{ background: deal.color }} />
                  <div className="flex items-start gap-5">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                      style={{ background: `${deal.color}20`, border: `1px solid ${deal.color}40`, color: deal.color }}
                    >
                      {deal.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1.5">
                        <div>
                          <h3 className="font-bold text-white text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{deal.company}</h3>
                          <p className="text-sm text-white/50 mt-0.5">{deal.tagline}</p>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 flex-shrink-0">
                          <Zap className="w-3.5 h-3.5 text-[#15A9FF]" />
                          <span className="text-sm font-bold text-[#15A9FF]">{deal.score}%</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4 mt-3">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">{deal.sector}</span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">{deal.stage}</span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">Ask: {deal.ask}</span>
                        <Badge className="text-[10px] rounded-full px-2.5" style={{ background: `${deal.color}15`, color: deal.color, border: `1px solid ${deal.color}30` }}>
                          <TrendingUp className="w-3 h-3 mr-1" />{deal.growth}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          data-testid={`button-view-deal-${i}`}
                          className="rounded-xl gap-2 text-sm h-9"
                          style={{ background: `${deal.color}15`, color: deal.color, border: `1px solid ${deal.color}30` }}
                        >
                          View Deal Room
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          data-testid={`button-message-founder-${i}`}
                          variant="ghost"
                          className="text-white/50 hover:text-white gap-2 text-sm h-9 rounded-xl"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          Message Founder
                        </Button>
                        <button
                          data-testid={`button-save-deal-${i}`}
                          onClick={() => toggleSave(i)}
                          className={`ml-auto p-2 rounded-xl transition-all ${savedDeals.has(i) ? "text-[#FFC107]" : "text-white/20 hover:text-white/60"}`}
                        >
                          <Bookmark className="w-4 h-4" fill={savedDeals.has(i) ? "#FFC107" : "none"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h3 className="font-semibold text-white">Direct Messages</h3>
            </div>
            <div className="divide-y divide-white/5">
              {MESSAGES.map((msg, i) => (
                <div
                  key={i}
                  data-testid={`message-${i}`}
                  className="flex items-start gap-4 p-5 hover:bg-white/3 transition-colors cursor-pointer"
                >
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="text-xs font-bold" style={{ background: `${msg.color}20`, color: msg.color }}>{msg.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white text-sm">{msg.name}</span>
                        <span className="text-xs text-white/30">{msg.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/30">{msg.time}</span>
                        {msg.unread && <div className="w-2 h-2 rounded-full bg-[#15A9FF]" />}
                      </div>
                    </div>
                    <p className="text-sm text-white/50 truncate">{msg.msg}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-white/10">
              <div className="flex gap-3">
                <Input
                  data-testid="input-message"
                  placeholder="Send a message..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF]"
                />
                <Button className="bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-xl px-5">Send</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "signals" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {MARKET_SIGNALS.map((sig, i) => (
                <div key={i} data-testid={`signal-${i}`} className="glass-card rounded-2xl p-5">
                  <div className="text-xs text-white/40 mb-2">{sig.label}</div>
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{sig.value}</div>
                  <div className={`text-xs mt-1 flex items-center gap-1 ${sig.up ? "text-[#00C853]" : "text-[#FF3D3D]"}`}>
                    <TrendingUp className="w-3 h-3" />
                    {sig.up ? "Trending up" : "Trending down"}
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-6">
                <BarChart2 className="w-4 h-4 text-[#15A9FF]" />
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Deal Flow by Sector</h3>
              </div>
              <div className="space-y-4">
                {[
                  { sector: "Fintech", count: 34, color: "#15A9FF" },
                  { sector: "SaaS", count: 28, color: "#00C853" },
                  { sector: "CleanTech", count: 21, color: "#FFC107" },
                  { sector: "HealthTech", count: 17, color: "#FF3D3D" },
                  { sector: "EdTech", count: 12, color: "#0047B3" },
                ].map((row, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-white/70">{row.sector}</span>
                      <span className="font-semibold" style={{ color: row.color }}>{row.count} deals</span>
                    </div>
                    <Progress value={row.count * 2.5} className="h-2 bg-white/5" style={{ ["--tw-ring-color" as string]: row.color }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
