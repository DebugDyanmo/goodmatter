import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Zap, Filter, Bookmark, MessageSquare, TrendingUp,
  CheckCircle, ArrowRight, Search, Bell, BarChart2, X, Send
} from "lucide-react";

const ALL_DEALS = [
  { company: "EcoGrid AI",   tagline: "AI-powered energy optimization for commercial buildings",  sector: "CleanTech", stage: "Seed",     ask: "₹2.4Cr", score: 94, revenue: "₹12L ARR",  growth: "+34% MoM", initials: "EG", color: "#00C853", saved: false },
  { company: "FinFlow",      tagline: "Embedded lending infrastructure for Bharat's SMEs",        sector: "Fintech",   stage: "Pre-Seed", ask: "₹80L",   score: 88, revenue: "₹4L ARR",   growth: "+28% MoM", initials: "FF", color: "#15A9FF", saved: true  },
  { company: "MediSync",     tagline: "AI-first electronic health records for tier-2 hospitals",  sector: "HealthTech",stage: "Seed",     ask: "₹3.5Cr", score: 91, revenue: "₹22L ARR",  growth: "+51% MoM", initials: "MS", color: "#FFC107", saved: false },
  { company: "ClimateStack", tagline: "Carbon credit infrastructure for emerging markets",        sector: "CleanTech", stage: "Series A", ask: "₹15Cr",  score: 89, revenue: "₹48L ARR",  growth: "+62% MoM", initials: "CS", color: "#00C853", saved: false },
  { company: "EduPilot",     tagline: "Adaptive learning SaaS for K-12 school networks",         sector: "SaaS",      stage: "Seed",     ask: "₹1.8Cr", score: 85, revenue: "₹8L ARR",   growth: "+41% MoM", initials: "EP", color: "#0047B3", saved: false },
];

const MARKET_SIGNALS = [
  { label: "Fintech deals this week", value: "14", up: true  },
  { label: "Avg AI score",            value: "88.4",up: true  },
  { label: "New founders",            value: "32",  up: true  },
  { label: "Active investors",        value: "67",  up: false },
];

const SECTOR_FILTERS = ["All", "Fintech", "SaaS", "CleanTech", "HealthTech", "Seed", "Series A"];

interface Message { name: string; company: string; msg: string; time: string; unread: boolean; initials: string; color: string; }

const INITIAL_MESSAGES: Message[] = [
  { name: "Aria Sharma", company: "EcoGrid AI", msg: "Thank you for your interest. When can we schedule a call?", time: "2h", unread: true,  initials: "AS", color: "#00C853" },
  { name: "Dev Patel",   company: "FinFlow",    msg: "I've shared the updated financial model in the data room.",  time: "1d", unread: false, initials: "DP", color: "#15A9FF" },
];

export default function InvestorDashboard() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab]   = useState<"deals" | "messages" | "signals">("deals");
  const [savedDeals, setSavedDeals] = useState<Set<number>>(new Set([1]));
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch]         = useState("");
  const [messages, setMessages]     = useState<Message[]>(INITIAL_MESSAGES);
  const [msgInput, setMsgInput]     = useState("");
  const [selectedConvo, setSelectedConvo] = useState<number | null>(null);
  const [dealRoom, setDealRoom]     = useState<(typeof ALL_DEALS)[0] | null>(null);
  const [alertOn, setAlertOn]       = useState(false);

  const filteredDeals = ALL_DEALS.filter((d) => {
    const matchFilter =
      activeFilter === "All" ||
      d.sector.toLowerCase().includes(activeFilter.toLowerCase()) ||
      d.stage.toLowerCase().includes(activeFilter.toLowerCase());
    const matchSearch =
      !search.trim() ||
      d.company.toLowerCase().includes(search.toLowerCase()) ||
      d.sector.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const toggleSave = (i: number) => {
    setSavedDeals((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  function sendMessage() {
    if (!msgInput.trim()) return;
    const convo = selectedConvo !== null ? messages[selectedConvo] : messages[0];
    setMessages((prev) => [
      ...prev,
      { name: "You", company: "GoodMatter", msg: msgInput.trim(), time: "now", unread: false, initials: "YO", color: "#15A9FF" },
    ]);
    setMsgInput("");
    void convo;
  }

  return (
    <Layout showRightPanel={false}>
      {/* Deal Room Modal */}
      {dealRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0a1628] shadow-2xl overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#15A9FF] to-transparent" />
            <div className="p-7">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold font-display" style={{ background: `${dealRoom.color}20`, border: `1px solid ${dealRoom.color}40`, color: dealRoom.color }}>
                    {dealRoom.initials}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">{dealRoom.company}</h2>
                    <p className="text-sm text-white/50">{dealRoom.tagline}</p>
                  </div>
                </div>
                <button onClick={() => setDealRoom(null)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[["Sector", dealRoom.sector], ["Stage", dealRoom.stage], ["Ask", dealRoom.ask], ["Revenue", dealRoom.revenue]].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-white/5 border border-white/8 p-3">
                    <p className="text-[11px] text-white/40 mb-0.5">{k}</p>
                    <p className="text-sm font-semibold text-white">{v}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-white/3 border border-white/8">
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#15A9FF]" />
                  <span className="text-sm font-bold text-[#15A9FF]">{dealRoom.score}% AI Match</span>
                </div>
                <Badge className="text-[10px] rounded-full" style={{ background: `${dealRoom.color}15`, color: dealRoom.color, border: `1px solid ${dealRoom.color}30` }}>
                  <TrendingUp className="w-3 h-3 mr-1" />{dealRoom.growth}
                </Badge>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => { setDealRoom(null); setActiveTab("messages"); }}
                  className="flex-1 gap-2 rounded-xl text-white"
                  style={{ background: `${dealRoom.color}20`, border: `1px solid ${dealRoom.color}40`, color: dealRoom.color }}
                >
                  <MessageSquare className="w-4 h-4" />
                  Message Founder
                </Button>
                <Button
                  onClick={() => navigate("/subscription")}
                  className="flex-1 bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-xl gap-2"
                >
                  Request Full Deck
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto w-full px-6 py-10">
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold tracking-widest text-[#15A9FF] uppercase">Investor Dashboard</span>
              <Badge className="bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/20 rounded-full text-[10px]">
                <CheckCircle className="w-3 h-3 mr-1" />Accredited
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-white font-display">Curated Deal Intelligence</h1>
            <p className="text-white/50 text-sm mt-1">AI-matched startup opportunities aligned to your thesis.</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              onClick={() => setActiveTab("deals")}
              variant="outline"
              className="border-white/10 text-white/60 bg-white/5 hover:bg-white/10 rounded-full gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button
              onClick={() => setAlertOn((v) => !v)}
              className={`rounded-full px-5 gap-2 transition-all ${alertOn ? "bg-[#00C853] hover:bg-[#00C853]/90 shadow-[0_0_20px_rgba(0,200,83,0.4)]" : "bg-[#15A9FF] hover:bg-[#15A9FF]/90 shadow-[0_0_20px_rgba(21,169,255,0.3)]"} text-white`}
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">{alertOn ? "Alerts On" : "Alerts"}</span>
            </Button>
          </div>
        </div>

        {/* Tab Nav */}
        <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-xl mb-8 w-fit">
          {(["deals", "messages", "signals"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/70"
              }`}
            >
              {tab}
              {tab === "messages" && (
                <span className="ml-1.5 w-4 h-4 rounded-full bg-[#15A9FF] text-white text-[10px] inline-flex items-center justify-center">1</span>
              )}
            </button>
          ))}
        </div>

        {/* DEALS */}
        {activeTab === "deals" && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-5 flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/30" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search deals, sectors..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl pl-9 focus-visible:ring-[#15A9FF]"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {SECTOR_FILTERS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      activeFilter === tag
                        ? "bg-[#15A9FF]/15 border-[#15A9FF]/40 text-[#15A9FF]"
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-[#15A9FF]/10 hover:border-[#15A9FF]/30 hover:text-[#15A9FF]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredDeals.length === 0 && (
                <div className="text-center py-12 text-white/30">
                  <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
                  <p>No deals match your filters.</p>
                </div>
              )}
              {filteredDeals.map((deal, i) => (
                <div key={i} className="glass-card rounded-2xl p-7 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-10" style={{ background: deal.color }} />
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 font-display" style={{ background: `${deal.color}20`, border: `1px solid ${deal.color}40`, color: deal.color }}>
                      {deal.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1.5">
                        <div>
                          <h3 className="font-bold text-white text-lg font-display">{deal.company}</h3>
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
                          onClick={() => setDealRoom(deal)}
                          className="rounded-xl gap-2 text-sm h-9"
                          style={{ background: `${deal.color}15`, color: deal.color, border: `1px solid ${deal.color}30` }}
                        >
                          View Deal Room
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          onClick={() => setActiveTab("messages")}
                          variant="ghost"
                          className="text-white/50 hover:text-white gap-2 text-sm h-9 rounded-xl"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          Message Founder
                        </Button>
                        <button
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

        {/* MESSAGES */}
        {activeTab === "messages" && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h3 className="font-semibold text-white">Direct Messages</h3>
            </div>
            <div className="divide-y divide-white/5">
              {messages.map((msg, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedConvo(i)}
                  className={`flex items-start gap-4 p-5 hover:bg-white/3 transition-colors w-full text-left ${selectedConvo === i ? "bg-white/5" : ""}`}
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
                </button>
              ))}
            </div>
            <div className="p-5 border-t border-white/10">
              <div className="flex gap-3">
                <Input
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Send a message..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF]"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!msgInput.trim()}
                  className="bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-xl px-5 disabled:opacity-40 gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* SIGNALS */}
        {activeTab === "signals" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {MARKET_SIGNALS.map((sig, i) => (
                <div key={i} className="glass-card rounded-2xl p-5">
                  <div className="text-xs text-white/40 mb-2">{sig.label}</div>
                  <div className="text-3xl font-bold text-white font-display">{sig.value}</div>
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
                <h3 className="text-lg font-bold text-white font-display">Deal Flow by Sector</h3>
              </div>
              <div className="space-y-4">
                {[
                  { sector: "Fintech",    count: 34, color: "#15A9FF" },
                  { sector: "SaaS",       count: 28, color: "#00C853" },
                  { sector: "CleanTech",  count: 21, color: "#FFC107" },
                  { sector: "HealthTech", count: 17, color: "#FF3D3D" },
                  { sector: "EdTech",     count: 12, color: "#0047B3" },
                ].map((row, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-white/70">{row.sector}</span>
                      <span className="font-semibold" style={{ color: row.color }}>{row.count} deals</span>
                    </div>
                    <Progress value={row.count * 2.5} className="h-2 bg-white/5" />
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
