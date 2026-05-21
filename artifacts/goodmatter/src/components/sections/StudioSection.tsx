import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, ArrowRight } from "lucide-react";

const SERVICES = [
  { title: "Pitch Deck Orchestration", price: "₹30,000", features: ["VC narrative structure", "Professional investor-ready design"], featured: false, color: "#15A9FF" },
  { title: "Financial Modeling",        price: "₹55,000", features: ["3–5 year projections", "Unit economics", "Cash flow analysis"], featured: false, color: "#00C853" },
  { title: "Growth Stage Advisory",     price: "₹65,000", features: ["Valuation analysis", "Fundraising strategy", "Growth readiness"], featured: false, color: "#FFC107" },
  { title: "Investor-Ready Bundle",     price: "₹80,000", features: ["Financial model", "Valuation", "Professional deck"], featured: true, color: "#15A9FF" },
];

const CFO_TIERS = [
  { title: "Starter",    price: "₹10,000/mo", features: ["Bookkeeping setup", "Compliance framework", "Cash flow tracking", "Founder advisory"], recommended: false, color: "#15A9FF" },
  { title: "Growth",     price: "₹25,000/mo", features: ["Monthly MIS", "Burn analysis", "Unit economics", "Investor updates"], recommended: true, color: "#15A9FF" },
  { title: "CFO Partner",price: "₹50,000/mo", features: ["Strategic oversight", "Board reporting", "Due diligence support", "Fundraising readiness"], recommended: false, color: "#00C853" },
];

const ADD_ONS = [
  { title: "Company Registration",    price: "₹15,000" },
  { title: "LLP Registration",        price: "₹8,000"  },
  { title: "GST Registration",        price: "₹5,000"  },
  { title: "Fundraising Legal Docs",  price: "₹45,000" },
  { title: "ESOP Setup",              price: "₹22,000" },
  { title: "Revenue Leakage Audit",   price: "₹15,000" },
  { title: "Accounting Software Setup",price: "₹12,000"},
];

export function StudioSection() {
  const [, navigate] = useLocation();

  return (
    <section id="studio" className="py-24 px-6 md:px-10 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00C853]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-3">
          <span className="text-xs font-semibold tracking-widest text-[#00C853] uppercase">Impact Studio</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 font-display">The Founder Edge</h2>
        <p className="text-lg text-white/50 mb-16 max-w-xl">Bespoke services to ensure your startup is institutional-grade.</p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {SERVICES.map((svc, i) => (
            <div
              key={i}
              className={`glass-card rounded-2xl p-6 relative overflow-hidden flex flex-col ${svc.featured ? "border-[#15A9FF]/40 shadow-[0_0_30px_rgba(21,169,255,0.15)]" : ""}`}
            >
              {svc.featured && (
                <Badge className="absolute top-4 right-4 bg-[#15A9FF] text-white text-[10px] rounded-full px-2.5">Best Value</Badge>
              )}
              <div className="absolute top-0 right-0 w-20 h-20 blur-2xl rounded-full opacity-20" style={{ background: svc.color }} />
              <div>
                <div className="text-2xl font-bold mb-1 font-display" style={{ color: svc.color }}>{svc.price}</div>
                <h3 className="text-white font-semibold text-sm mb-4">{svc.title}</h3>
                <ul className="space-y-2 mb-6 flex-1">
                  {svc.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-xs text-white/60">
                      <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: svc.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                onClick={() => navigate("/subscription")}
                className="w-full mt-auto gap-2 rounded-xl text-sm"
                style={{ background: `${svc.color}20`, border: `1px solid ${svc.color}40`, color: svc.color }}
              >
                <CreditCard className="w-3.5 h-3.5" />
                Get Started
              </Button>
            </div>
          ))}
        </div>

        {/* Fractional CFO */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-2 font-display">Fractional CFO Intelligence</h3>
          <p className="text-white/50 text-sm mb-8">Strategic financial leadership without the full-time cost.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CFO_TIERS.map((tier, i) => (
              <div
                key={i}
                className={`glass-card rounded-2xl p-7 relative overflow-hidden flex flex-col ${tier.recommended ? "border-[#15A9FF]/50 shadow-[0_0_40px_rgba(21,169,255,0.2)]" : ""}`}
              >
                {tier.recommended && <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#15A9FF] to-[#00C853] rounded-t-2xl" />}
                <div className="absolute top-0 right-0 w-24 h-24 blur-3xl rounded-full opacity-10" style={{ background: tier.color }} />
                {tier.recommended && (
                  <Badge className="absolute top-4 right-4 bg-[#15A9FF]/10 text-[#15A9FF] border border-[#15A9FF]/30 text-[10px] rounded-full">Recommended</Badge>
                )}
                <h4 className="font-bold text-white text-lg mb-1 font-display">{tier.title}</h4>
                <div className="text-xl font-bold mb-5" style={{ color: tier.color }}>From {tier.price}</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-white/60">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => navigate("/contact")}
                  className="w-full gap-2 rounded-xl"
                  style={{
                    background: tier.recommended ? tier.color : `${tier.color}15`,
                    color: tier.recommended ? "white" : tier.color,
                    border: tier.recommended ? "none" : `1px solid ${tier.color}30`,
                    boxShadow: tier.recommended ? `0 0 20px ${tier.color}40` : "none",
                  }}
                >
                  Enquire Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Add-Ons */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 font-display">Strategic Add-Ons</h3>
          <p className="text-white/50 text-sm mb-8">Essential compliance and legal foundations for serious builders.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {ADD_ONS.map((addon, i) => (
              <button
                key={i}
                onClick={() => navigate("/contact")}
                className="glass-card rounded-xl p-4 flex items-center justify-between cursor-pointer group hover:border-[#15A9FF]/20 transition-all text-left"
              >
                <span className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">{addon.title}</span>
                <span className="text-sm font-bold text-[#15A9FF] group-hover:text-[#00C853] transition-colors">{addon.price}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
