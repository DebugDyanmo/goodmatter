import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Store, Search, Star, ArrowRight, Zap } from "lucide-react";

const SERVICES = [
  { name: "Pitch Deck Review", provider: "GoodMatter Studio", rating: 4.9, reviews: 134, price: "₹4,999", tag: "Popular", tagClass: "text-amber-400 bg-amber-400/10 border-amber-400/20", desc: "Expert review of your investor pitch deck with AI-enhanced feedback." },
  { name: "Investor Intro Credits", provider: "Network Access", rating: 5.0, reviews: 89, price: "₹2,499", tag: "Pro", tagClass: "text-primary bg-primary/10 border-primary/20", desc: "Direct warm introductions to 3 pre-matched investors from our network." },
  { name: "Valuation Report", provider: "Analytics Team", rating: 4.7, reviews: 56, price: "₹7,999", tag: "New", tagClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", desc: "Comprehensive startup valuation using market comps and DCF analysis." },
  { name: "Legal SAFE Template", provider: "Legal Suite", rating: 4.8, reviews: 201, price: "₹1,499", tag: "Fast", tagClass: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20", desc: "Vetted SAFE agreement template with founder-friendly terms." },
  { name: "Cap Table Modelling", provider: "Finance Tools", rating: 4.6, reviews: 43, price: "₹5,999", tag: null, tagClass: "", desc: "Full cap table model with waterfall, option pool, and dilution scenarios." },
  { name: "Go-to-Market Strategy", provider: "Growth Studio", rating: 4.9, reviews: 77, price: "₹9,999", tag: "Popular", tagClass: "text-amber-400 bg-amber-400/10 border-amber-400/20", desc: "Custom GTM playbook for B2B and B2C startups at Seed/Series A stage." },
];

export default function MarketplacePage() {
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
            placeholder="Search services, providers…"
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-primary/40 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((s, i) => (
            <div key={i} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-200">
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
                <Button size="sm" variant="outline" className="h-7 px-3 rounded-xl border-white/10 text-white/60 hover:text-white hover:border-primary/30 hover:bg-primary/5 text-xs gap-1 group-hover:text-primary group-hover:border-primary/30 transition-all">
                  Get Started
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 to-transparent p-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-white mb-1">List Your Service</p>
            <p className="text-sm text-white/40">Offer your expertise to 6,000+ founders and investors on GoodMatter.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl px-5 h-10 shadow-[0_0_15px_rgba(21,169,255,0.3)] flex-shrink-0 gap-1.5">
            <Zap className="w-4 h-4" />
            Apply Now
          </Button>
        </div>
      </div>
    </Layout>
  );
}
