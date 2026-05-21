import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Store, Search, Star, ArrowRight, Zap, CheckCircle, X } from "lucide-react";
import { useLocation } from "wouter";
import { AuthModals } from "@/components/modals/AuthModals";
import { useAuth } from "@/lib/auth-context";

const SERVICES = [
  {
    name: "Pitch Deck Review",
    provider: "GoodMatter Studio",
    rating: 4.9,
    reviews: 134,
    price: "₹4,999",
    tag: "Popular",
    tagClass: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    desc: "Expert review of your investor pitch deck with AI-enhanced feedback.",
    details: "Our team of ex-investors and startup advisors will review your pitch deck end-to-end. You'll receive a detailed written report covering narrative flow, market sizing, financials, and design — plus a 30-min call to walk through feedback.",
    includes: ["Full deck review (up to 20 slides)", "Written feedback report", "30-min video call", "1 revision round"],
    delivery: "3 business days",
  },
  {
    name: "Investor Intro Credits",
    provider: "Network Access",
    rating: 5.0,
    reviews: 89,
    price: "₹2,499",
    tag: "Pro",
    tagClass: "text-primary bg-primary/10 border-primary/20",
    desc: "Direct warm introductions to 3 pre-matched investors from our network.",
    details: "Get warm introductions to 3 investors from our curated network of 500+ VCs, angels, and family offices. Each intro is pre-matched based on your sector, stage, and geography.",
    includes: ["3 warm investor intros", "Investor profile briefs", "Intro email drafted for you", "Follow-up support"],
    delivery: "5 business days",
  },
  {
    name: "Valuation Report",
    provider: "Analytics Team",
    rating: 4.7,
    reviews: 56,
    price: "₹7,999",
    tag: "New",
    tagClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    desc: "Comprehensive startup valuation using market comps and DCF analysis.",
    details: "A full valuation report built using comparable transactions, revenue multiples, and discounted cash flow models. Ideal for fundraising, ESOPs, or secondary transactions.",
    includes: ["Comparable company analysis", "DCF model", "Valuation range summary", "PDF report"],
    delivery: "7 business days",
  },
  {
    name: "Legal SAFE Template",
    provider: "Legal Suite",
    rating: 4.8,
    reviews: 201,
    price: "₹1,499",
    tag: "Fast",
    tagClass: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    desc: "Vetted SAFE agreement template with founder-friendly terms.",
    details: "A lawyer-vetted SAFE note template tailored for Indian startups. Includes MFN clause, pro-rata rights, and a founder-friendly valuation cap structure. Delivered as an editable Word doc.",
    includes: ["SAFE agreement template", "Explanatory notes", "Editable Word format", "Email support for 7 days"],
    delivery: "Instant",
  },
  {
    name: "Cap Table Modelling",
    provider: "Finance Tools",
    rating: 4.6,
    reviews: 43,
    price: "₹5,999",
    tag: null,
    tagClass: "",
    desc: "Full cap table model with waterfall, option pool, and dilution scenarios.",
    details: "A dynamic Excel cap table model covering all funding rounds, ESOP pool, convertible notes, and exit waterfall scenarios. Built to investor-grade standards.",
    includes: ["Multi-round cap table", "ESOP pool modelling", "Exit waterfall analysis", "Dilution scenarios"],
    delivery: "4 business days",
  },
  {
    name: "Go-to-Market Strategy",
    provider: "Growth Studio",
    rating: 4.9,
    reviews: 77,
    price: "₹9,999",
    tag: "Popular",
    tagClass: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    desc: "Custom GTM playbook for B2B and B2C startups at Seed/Series A stage.",
    details: "A custom go-to-market playbook built for your specific product, market, and stage. Covers ICP definition, channel strategy, pricing, and a 90-day execution plan.",
    includes: ["ICP & segmentation", "Channel prioritisation", "Pricing strategy", "90-day GTM plan"],
    delivery: "7 business days",
  },
];

type Service = typeof SERVICES[0];

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Service | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [, navigate] = useLocation();
  const { isLoggedIn, login } = useAuth();

  const filtered = SERVICES.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4">
        <div className="flex items-center gap-3">
          <Store className="w-5 h-5 text-primary" />
          <h1 className="font-display font-bold text-xl text-white">Service Marketplace</h1>
        </div>
      </div>

      <div className="px-6 py-8 max-w-4xl mx-auto w-full">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            placeholder="Search services, providers…"
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-primary/40 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(s)}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-200 text-left w-full cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white">{s.name}</h3>
                    {s.tag && (
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 ${s.tagClass}`}>{s.tag}</Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-white/40 mt-0.5">{s.provider}</p>
                </div>
                <span className="text-sm font-bold text-white flex-shrink-0">{s.price}</span>
              </div>

              <p className="text-xs text-white/55 leading-relaxed mb-4">{s.desc}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="text-xs font-semibold text-white">{s.rating}</span>
                  <span className="text-[11px] text-white/30">({s.reviews})</span>
                </div>
                <span className="flex items-center gap-1 text-xs text-white/50 group-hover:text-primary transition-colors">
                  View Details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 to-transparent p-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-white mb-1">List Your Service</p>
            <p className="text-sm text-white/40">Offer your expertise to 6,000+ founders and investors on GoodMatter.</p>
          </div>
          <Button
            onClick={() => isLoggedIn ? navigate("/subscription") : setAuthOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl px-5 h-10 shadow-[0_0_15px_rgba(21,169,255,0.3)] flex-shrink-0 gap-1.5"
          >
            <Zap className="w-4 h-4" />
            Apply Now
          </Button>
        </div>
      </div>

      {/* Service Detail Modal */}
      <Dialog open={!!selected} onOpenChange={(o: boolean) => !o && setSelected(null)}>
        <DialogContent className="bg-[#071427] border border-white/10 text-white max-w-lg rounded-2xl p-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="relative p-6">
            <DialogHeader className="mb-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <DialogTitle className="text-lg font-bold text-white">{selected?.name}</DialogTitle>
                    {selected?.tag && (
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 ${selected.tagClass}`}>{selected.tag}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-white/40">{selected?.provider}</p>
                </div>
                <span className="text-xl font-bold text-white flex-shrink-0">{selected?.price}</span>
              </div>
            </DialogHeader>

            <div className="flex items-center gap-1 mb-4">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-white">{selected?.rating}</span>
              <span className="text-[11px] text-white/30">({selected?.reviews} reviews)</span>
              <span className="text-white/20 mx-2">·</span>
              <span className="text-xs text-white/40">Delivery: {selected?.delivery}</span>
            </div>

            <p className="text-sm text-white/60 leading-relaxed mb-5">{selected?.details}</p>

            <div className="mb-6">
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">What's included</p>
              <div className="space-y-2">
                {selected?.includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl h-11 shadow-[0_0_20px_rgba(21,169,255,0.25)] gap-2"
                onClick={() => {
                  setSelected(null);
                  navigate(`/subscription?service=${encodeURIComponent(selected?.name ?? "")}&price=${encodeURIComponent(selected?.price ?? "")}`);
                }}
              >
                <Zap className="w-4 h-4" />
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-white/10 text-white/60 hover:text-white hover:border-white/20 rounded-xl h-11"
                onClick={() => setSelected(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Auth Modal — triggered by Apply Now for logged-out users */}
      <AuthModals
        open={authOpen}
        onOpenChange={setAuthOpen}
        defaultTab="signup"
        onSuccess={(r) => { login(r); setAuthOpen(false); }}
      />
    </Layout>
  );
}
