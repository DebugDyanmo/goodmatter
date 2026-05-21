import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { FeedComposerAndPosts } from "@/components/feed/FeedCore";

const STATS = [
  {
    label: "Total Raised",
    value: "$2.4B",
    change: "+18%",
    up: true,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    icon: DollarSign,
  },
  {
    label: "Active Investors",
    value: "3,840",
    change: "+241",
    up: true,
    color: "text-[#15A9FF]",
    bg: "bg-[#15A9FF]/10",
    icon: Users,
  },
  {
    label: "Deals Closed",
    value: "1,290",
    change: "+34 this week",
    up: true,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    icon: Activity,
  },
  {
    label: "Avg Match Score",
    value: "91%",
    change: "↑ 3pts",
    up: true,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    icon: TrendingUp,
  },
];

const PLATFORM_POINTS = [28, 35, 31, 52, 48, 67, 61, 80, 75, 96, 89, 118, 110, 140];

function PlatformChart() {
  const max = Math.max(...PLATFORM_POINTS);
  const min = Math.min(...PLATFORM_POINTS);
  const h = 72;
  const w = 500;
  const pts = PLATFORM_POINTS.map((v, i) => {
    const x = (i / (PLATFORM_POINTS.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] px-5 pt-5 pb-4 mb-0">
      {/* Glow */}
      <div className="absolute top-0 right-1/4 w-64 h-20 bg-primary/10 blur-3xl pointer-events-none" />

      <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
        <div>
          <p className="text-xs text-white/40 font-medium tracking-wide uppercase mb-1">Platform Deal Flow</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">$2.4B</span>
            <span className="text-sm text-emerald-400 font-semibold">↑ 18% this quarter</span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {STATS.map((s) => (
            <div key={s.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${s.bg} border border-white/5`}>
              <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
              <div>
                <span className={`text-sm font-bold ${s.color}`}>{s.value}</span>
                <span className="text-[11px] text-white/40 ml-1.5">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16" preserveAspectRatio="none">
        <defs>
          <linearGradient id="landingChartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#15A9FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#15A9FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0047B3" />
            <stop offset="60%" stopColor="#15A9FF" />
            <stop offset="100%" stopColor="#00C853" />
          </linearGradient>
        </defs>
        <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#landingChartGrad)" />
        <polyline
          points={pts}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Last point dot */}
        {(() => {
          const last = PLATFORM_POINTS.length - 1;
          const x = w;
          const y = h - ((PLATFORM_POINTS[last] - min) / (max - min)) * h;
          return (
            <>
              <circle cx={x} cy={y} r="5" fill="#00C853" opacity="0.3" />
              <circle cx={x} cy={y} r="3" fill="#00C853" />
            </>
          );
        })()}
      </svg>

      <div className="flex items-center justify-between mt-2">
        <span className="text-[11px] text-white/25">Jan</span>
        <span className="text-[11px] text-white/25">Today</span>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [tab, setTab] = useState<"forYou" | "following" | "trending">("forYou");

  return (
    <Layout>
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/8">
        <div className="px-5 pt-4 pb-0">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-display font-bold text-xl text-white">Home</h1>
            <Badge variant="outline" className="text-[11px] gap-1 text-amber-400 border-amber-400/20 bg-amber-400/8">
              <Zap className="w-3 h-3" />
              Live
            </Badge>
          </div>
          <div className="flex gap-1 -mx-1">
            {(["forYou", "following", "trending"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-sm font-medium transition-all relative ${
                  tab === t ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                {t === "forYou" ? "For You" : t === "following" ? "Following" : "Trending"}
                {tab === t && <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart banner */}
      <div className="px-5 pt-5 pb-0">
        <PlatformChart />
      </div>

      {/* Feed composer + posts */}
      <div className="mt-4">
        <FeedComposerAndPosts />
      </div>
    </Layout>
  );
}
