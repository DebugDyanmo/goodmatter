import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Crown, Zap } from "lucide-react";

const FEATURES = [
  "Basic deal placement",
  "Standard AI scoring",
  "Investor interest alerts",
  "Strategic market feedback",
  "Unlimited intro credits",
];

const PLANS = {
  monthly: { price: "₹3,499", period: "per month", badge: null },
  quarterly: { price: "₹6,999", period: "per quarter", badge: "Save 33%" },
  yearly: { price: "₹31,499", period: "per year", badge: "Save 25%" },
};

export function SubscriptionSection() {
  const [period, setPeriod] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  const plan = PLANS[period];

  return (
    <section id="subscription" className="py-24 px-6 md:px-10 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#15A9FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <div className="mb-3">
          <span className="text-xs font-semibold tracking-widest text-[#15A9FF] uppercase">Subscription</span>
        </div>
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Join the Intelligence Network
        </h2>
        <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
          Private market access, AI-powered matching, and direct investor communication.
        </p>

        <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)} className="mb-8">
          <TabsList className="bg-white/5 border border-white/10 rounded-full p-1 h-auto inline-flex">
            <TabsTrigger
              value="monthly"
              className="rounded-full px-6 py-2 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50 transition-all"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="quarterly"
              className="rounded-full px-6 py-2 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50 transition-all gap-2"
            >
              Quarterly
              {period === "quarterly" && <Badge className="bg-[#00C853] text-white text-[10px] rounded-full ml-1">Save 33%</Badge>}
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="rounded-full px-6 py-2 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50 transition-all gap-2"
            >
              Yearly
              {period === "yearly" && <Badge className="bg-[#FFC107] text-[#071427] text-[10px] rounded-full ml-1">Save 25%</Badge>}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="glass-card rounded-3xl p-10 border-[#15A9FF]/30 shadow-[0_0_60px_rgba(21,169,255,0.15)] relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0047B3] via-[#15A9FF] to-[#00C853] rounded-t-3xl" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#15A9FF]/10 blur-3xl rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0047B3]/10 blur-2xl rounded-full -ml-10 -mb-10" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Crown className="w-5 h-5 text-[#FFC107]" />
              <span className="font-semibold text-white/70 text-sm tracking-wider uppercase">Subscription Plan</span>
            </div>

            <div className="mb-2">
              <span className="text-6xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{plan.price}</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-white/40">{plan.period}</span>
              {plan.badge && (
                <Badge className="bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20 rounded-full">{plan.badge}</Badge>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10 mb-10 text-left max-w-md mx-auto">
              {FEATURES.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#00C853] flex-shrink-0" />
                  <span className="text-sm text-white/70">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                data-testid="button-subscribe-pay-once"
                variant="outline"
                className="flex-1 sm:max-w-[180px] border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full h-12 gap-2"
              >
                Pay Once
              </Button>
              <Button
                data-testid="button-subscribe"
                className="flex-1 sm:max-w-[180px] bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-full h-12 shadow-[0_0_20px_rgba(21,169,255,0.4)] gap-2"
              >
                <Zap className="w-4 h-4" />
                Subscribe Now
              </Button>
            </div>

            <p className="text-xs text-white/30 mt-6">Cancel anytime. Secure payment via Razorpay.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
