import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  Paperclip,
  Image,
  ChevronDown,
  TrendingUp,
  Star,
  Bookmark,
  CheckCircle,
} from "lucide-react";

export interface Post {
  id: number;
  author: string;
  initials: string;
  role: string;
  badge?: string;
  badgeColor?: string;
  time: string;
  content: string;
  tag?: string;
  tagColor?: string;
  image?: string;
  likes: number;
  comments: number;
  reposts: number;
  liked?: boolean;
  bookmarked?: boolean;
  verified?: boolean;
}

export const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    author: "Aria Sharma",
    initials: "AS",
    role: "Founder @ EcoGrid AI",
    badge: "Raising",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    time: "4m",
    content:
      "We just closed our first $500K in pre-seed commitments — 6 investors, 3 continents, 0 cold emails. All through GoodMatter. The platform's AI match score was 94% for our lead; he led our round within 8 days of first contact.\n\nIf you're a Seed-stage climate-tech founder still grinding AngelList, there's a better way.",
    tag: "Climate Tech · Seed",
    tagColor: "text-cyan-400 bg-cyan-400/8 border-cyan-400/20",
    likes: 142,
    comments: 18,
    reposts: 34,
    liked: false,
    verified: true,
  },
  {
    id: 2,
    author: "Marcus Lindholm",
    initials: "ML",
    role: "GP @ Linea Capital",
    badge: "Investor",
    badgeColor: "text-[#15A9FF] bg-[#15A9FF]/10 border-[#15A9FF]/20",
    time: "9m",
    content:
      "Deal memo I never expected to write: a 22-year-old founder from Lagos pitching carbon-credit infrastructure for emerging markets. TAM is real, team is sharp, unit economics actually hold.\n\nWe're leading the round. $2M Seed. Close in 30 days.\n\nGoodMatter surfaced this to us last Tuesday. The future of deal flow isn't a warm intro — it's signal.",
    tag: "Deep Tech · Series A Interest",
    tagColor: "text-violet-400 bg-violet-400/8 border-violet-400/20",
    likes: 287,
    comments: 41,
    reposts: 76,
    liked: true,
    verified: true,
  },
  {
    id: 3,
    author: "Priya Venkatesh",
    initials: "PV",
    role: "Partner @ Aurora Early",
    badge: "Investor",
    badgeColor: "text-[#15A9FF] bg-[#15A9FF]/10 border-[#15A9FF]/20",
    time: "22m",
    content:
      "Hot take: The best founders I've backed in the last 3 years were NOT in my network when I found them. They were found through platform intelligence.\n\nStop gatekeeping access. Open the network.",
    tag: "Venture · Opinion",
    tagColor: "text-amber-400 bg-amber-400/8 border-amber-400/20",
    likes: 503,
    comments: 67,
    reposts: 128,
    liked: false,
  },
  {
    id: 4,
    author: "Dev Patel",
    initials: "DP",
    role: "Co-founder @ FinFlow",
    badge: "Raising",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    time: "1h",
    content:
      "FinFlow just hit $180K MRR — up from $42K six months ago. We're opening a $4M Series A round this quarter.\n\nLooking for: B2B fintech–focused investors who understand enterprise sales cycles. We close in 90 days, not 9 months.\n\nDM me or apply through our profile. Deck available on request.",
    tag: "FinTech · Series A",
    tagColor: "text-emerald-400 bg-emerald-400/8 border-emerald-400/20",
    image: "chart",
    likes: 94,
    comments: 23,
    reposts: 15,
    liked: false,
    verified: true,
  },
  {
    id: 5,
    author: "Sarah Chen",
    initials: "SC",
    role: "CEO @ MediSync",
    badge: "Portfolio",
    badgeColor: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    time: "2h",
    content:
      "We just received FDA 510(k) clearance for our remote patient monitoring device. 18 months of work. 3 failed audits. 1 complete pivot on the hardware stack.\n\nThis is what resilience looks like. Thank you to our investors who didn't flinch.",
    tag: "HealthTech · Milestone",
    tagColor: "text-rose-400 bg-rose-400/8 border-rose-400/20",
    likes: 612,
    comments: 88,
    reposts: 201,
    liked: false,
    verified: true,
  },
];

const AUDIENCE_OPTIONS = ["Anyone can reply", "Verified members only", "Investors only", "Only me"];

export function MiniChart() {
  const points = [40, 55, 48, 70, 65, 82, 78, 95, 88, 110, 105, 130];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const h = 60;
  const w = 240;
  const pts = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-white/3 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-muted-foreground">Monthly Recurring Revenue</p>
          <p className="text-2xl font-display font-bold text-white">$180K</p>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
          <TrendingUp className="w-4 h-4" />
          +328%
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGradFeed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00C853" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00C853" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={pts} fill="none" stroke="#00C853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#chartGradFeed)" />
      </svg>
    </div>
  );
}

export function PostCard({ post: initPost }: { post: Post }) {
  const [post, setPost] = useState(initPost);
  const [expanded, setExpanded] = useState(false);
  const needsTruncate = post.content.length > 220;
  const displayText = needsTruncate && !expanded ? post.content.slice(0, 220) + "…" : post.content;

  return (
    <article className="border-b border-white/6 px-5 py-5 hover:bg-white/[0.02] transition-colors group">
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1 shrink-0">
          <Avatar className="h-10 w-10 border border-white/10">
            <AvatarFallback className="bg-gradient-to-br from-primary/30 to-cyan-400/20 text-white text-xs font-bold">
              {post.initials}
            </AvatarFallback>
          </Avatar>
          <div className="w-px flex-1 bg-white/8 min-h-[20px]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center flex-wrap gap-1.5 min-w-0">
              <span className="font-semibold text-sm text-white flex items-center gap-1">
                {post.author}
                {post.verified && <CheckCircle className="w-3.5 h-3.5 text-primary fill-primary/20 shrink-0" />}
              </span>
              <span className="text-xs text-muted-foreground truncate">{post.role}</span>
              {post.badge && (
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 shrink-0 ${post.badgeColor}`}>
                  {post.badge}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-white/30">{post.time}</span>
              <button className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {post.tag && (
            <div className="mb-2">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${post.tagColor}`}>
                {post.tag}
              </span>
            </div>
          )}

          <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line mb-3">
            {displayText}
            {needsTruncate && (
              <button
                onClick={() => setExpanded((e) => !e)}
                className="ml-1 text-primary hover:underline text-sm"
              >
                {expanded ? " Show less" : " Show more"}
              </button>
            )}
          </p>

          {post.image === "chart" && (
            <div className="mb-3">
              <MiniChart />
            </div>
          )}

          <div className="flex items-center gap-1 -ml-2">
            <button
              onClick={() =>
                setPost((p) => ({ ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }))
              }
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all text-xs font-medium group/btn ${
                post.liked ? "text-rose-400" : "text-white/40 hover:text-rose-400 hover:bg-rose-400/8"
              }`}
            >
              <Heart className={`w-4 h-4 transition-all ${post.liked ? "fill-rose-400 scale-110" : "group-hover/btn:scale-110"}`} />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/40 hover:text-[#15A9FF] hover:bg-[#15A9FF]/8 transition-all text-xs font-medium group/btn">
              <MessageCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/40 hover:text-emerald-400 hover:bg-emerald-400/8 transition-all text-xs font-medium group/btn">
              <Repeat2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              <span>{post.reposts}</span>
            </button>
            <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-all text-xs font-medium group/btn">
              <Share className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            </button>
            <div className="flex-1" />
            <button
              onClick={() => setPost((p) => ({ ...p, bookmarked: !p.bookmarked }))}
              className={`p-1.5 rounded-lg transition-all ${
                post.bookmarked
                  ? "text-amber-400"
                  : "text-white/30 hover:text-amber-400 hover:bg-amber-400/8 opacity-0 group-hover:opacity-100"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${post.bookmarked ? "fill-amber-400" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeedComposerAndPosts() {
  const [text, setText] = useState("");
  const [audience, setAudience] = useState("Anyone can reply");
  const [showAudience, setShowAudience] = useState(false);
  const [posts, setPosts] = useState(INITIAL_POSTS);

  function submit() {
    if (!text.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      author: "You",
      initials: "YO",
      role: "Member @ GoodMatter",
      time: "now",
      content: text.trim(),
      likes: 0,
      comments: 0,
      reposts: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
    setText("");
  }

  return (
    <>
      <div className="border-b border-white/8 px-5 py-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 border border-primary/30 shrink-0">
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">YO</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share a deal update, insight, or milestone…"
              rows={text.length > 80 ? 4 : 2}
              className="w-full bg-transparent text-sm text-white placeholder:text-white/25 resize-none focus:outline-none leading-relaxed"
            />
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/6">
              <button className="p-1.5 rounded-lg text-white/30 hover:text-primary hover:bg-primary/10 transition-all">
                <Image className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg text-white/30 hover:text-primary hover:bg-primary/10 transition-all">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg text-white/30 hover:text-amber-400 hover:bg-amber-400/10 transition-all">
                <Star className="w-4 h-4" />
              </button>
              <div className="relative ml-1">
                <button
                  onClick={() => setShowAudience((s) => !s)}
                  className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                >
                  {audience}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showAudience && (
                  <div className="absolute top-8 left-0 z-20 w-44 rounded-xl border border-white/10 bg-[#0d1f3c] shadow-xl overflow-hidden">
                    {AUDIENCE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setAudience(opt); setShowAudience(false); }}
                        className={`w-full text-left text-xs px-3 py-2.5 transition-colors ${
                          audience === opt ? "text-primary bg-primary/10" : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1" />
              <Button
                onClick={submit}
                disabled={!text.trim()}
                size="sm"
                className="h-8 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold disabled:opacity-30 shadow-[0_0_12px_rgba(21,169,255,0.35)]"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
