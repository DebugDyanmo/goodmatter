import { Router, type IRouter } from "express";

const router: IRouter = Router();

const POSTS = [
  {
    id: 1,
    author: "Aria Sharma",
    initials: "AS",
    role: "Founder @ EcoGrid AI",
    badge: "Raising",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    time: "4m",
    content: "We just closed our first $500K in pre-seed commitments — 6 investors, 3 continents, 0 cold emails. All through GoodMatter. The platform's AI match score was 94% for our lead; he led our round within 8 days of first contact.\n\nIf you're a Seed-stage climate-tech founder still grinding AngelList, there's a better way.",
    tag: "Climate Tech · Seed",
    tagColor: "text-cyan-400 bg-cyan-400/8 border-cyan-400/20",
    likes: 142, comments: 18, reposts: 34,
    liked: false, verified: true,
  },
  {
    id: 2,
    author: "Marcus Lindholm",
    initials: "ML",
    role: "GP @ Linea Capital",
    badge: "Investor",
    badgeColor: "text-[#15A9FF] bg-[#15A9FF]/10 border-[#15A9FF]/20",
    time: "9m",
    content: "Deal memo I never expected to write: a 22-year-old founder from Lagos pitching carbon-credit infrastructure for emerging markets. TAM is real, team is sharp, unit economics actually hold.\n\nWe're leading the round. $2M Seed. Close in 30 days.\n\nGoodMatter surfaced this to us last Tuesday. The future of deal flow isn't a warm intro — it's signal.",
    tag: "Deep Tech · Series A Interest",
    tagColor: "text-violet-400 bg-violet-400/8 border-violet-400/20",
    likes: 287, comments: 41, reposts: 76,
    liked: true, verified: true,
  },
  {
    id: 3,
    author: "Priya Venkatesh",
    initials: "PV",
    role: "Partner @ Aurora Early",
    badge: "Investor",
    badgeColor: "text-[#15A9FF] bg-[#15A9FF]/10 border-[#15A9FF]/20",
    time: "22m",
    content: "Hot take: The best founders I've backed in the last 3 years were NOT in my network when I found them. They were found through platform intelligence.\n\nStop gatekeeping access. Open the network.",
    tag: "Venture · Opinion",
    tagColor: "text-amber-400 bg-amber-400/8 border-amber-400/20",
    likes: 503, comments: 67, reposts: 128,
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
    content: "FinFlow just hit $180K MRR — up from $42K six months ago. We're opening a $4M Series A round this quarter.\n\nLooking for: B2B fintech–focused investors who understand enterprise sales cycles. We close in 90 days, not 9 months.\n\nDM me or apply through our profile. Deck available on request.",
    tag: "FinTech · Series A",
    tagColor: "text-emerald-400 bg-emerald-400/8 border-emerald-400/20",
    image: "chart",
    likes: 94, comments: 23, reposts: 15,
    liked: false, verified: true,
  },
  {
    id: 5,
    author: "Sarah Chen",
    initials: "SC",
    role: "CEO @ MediSync",
    badge: "Portfolio",
    badgeColor: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    time: "2h",
    content: "We just received FDA 510(k) clearance for our remote patient monitoring device. 18 months of work. 3 failed audits. 1 complete pivot on the hardware stack.\n\nThis is what resilience looks like. Thank you to our investors who didn't flinch.",
    tag: "HealthTech · Milestone",
    tagColor: "text-rose-400 bg-rose-400/8 border-rose-400/20",
    likes: 612, comments: 88, reposts: 201,
    liked: false, verified: true,
  },
];

const STATS = {
  totalRaised: "$2.4B",
  totalRaisedChange: "+18%",
  activeInvestors: 3840,
  activeInvestorsChange: "+241",
  dealsClosed: 1290,
  dealsClosedChange: "+34 this week",
  avgMatchScore: 91,
  avgMatchScoreChange: "+3pts",
  chartPoints: [28, 35, 31, 52, 48, 67, 61, 80, 75, 96, 89, 118, 110, 140],
};

router.get("/posts", (_req, res) => {
  res.json({ posts: POSTS });
});

router.get("/stats", (_req, res) => {
  res.json(STATS);
});

export default router;
