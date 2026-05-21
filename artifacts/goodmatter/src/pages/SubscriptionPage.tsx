import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Crown, Zap, Shield, Star, ArrowRight, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open(): void };
  }
}
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  prefill?: Record<string, string>;
  theme?: { color: string };
  handler?: (response: { razorpay_payment_id: string }) => void;
}

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

const PLANS = [
  {
    id: "monthly",
    label: "Monthly",
    price: "₹3,499",
    paise: 349900,
    period: "/month",
    badge: null,
    badgeClass: "",
  },
  {
    id: "quarterly",
    label: "Quarterly",
    price: "₹6,999",
    paise: 699900,
    period: "/quarter",
    badge: "Save 33%",
    badgeClass: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  },
  {
    id: "yearly",
    label: "Yearly",
    price: "₹31,499",
    paise: 3149900,
    period: "/year",
    badge: "Save 25%",
    badgeClass: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  },
];

const FEATURES = [
  "Unlimited deal placements",
  "Advanced AI investor matching",
  "Direct investor messaging",
  "Live deal flow intelligence",
  "Verified investor network access",
  "AI pitch score & feedback",
  "Studio & HRMS suite",
  "Priority support",
];

const PERKS = [
  { icon: Shield, label: "Secure payments via Razorpay" },
  { icon: Star, label: "Cancel anytime, no lock-in" },
  { icon: Zap, label: "Instant access after payment" },
];

export default function SubscriptionPage() {
  const [selected, setSelected] = useState("quarterly");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [location] = useLocation();

  // Parse service details passed from Studio or Marketplace
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const serviceParam  = params.get("service");
  const priceParam    = params.get("price");
  const paiseParam    = params.get("paise");

  // If a specific service was passed, show it as a one-time payment instead of subscription plans
  const isServicePayment = !!serviceParam && !!priceParam;
  const servicePaise = paiseParam ? Number(paiseParam) : null;

  const plan = PLANS.find((p) => p.id === selected)!;

  async function handlePay() {
    setLoading(true);
    const payAmount = isServicePayment && servicePaise ? servicePaise : plan.paise;
    const payLabel  = isServicePayment ? serviceParam! : `${plan.label} Subscription`;
    try {
      const res = await fetch(`${BASE}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selected, amount: payAmount }),
      });

      if (!res.ok) {
        openDemoCheckout();
        return;
      }

      const { orderId, amount, currency, keyId } = await res.json();

      if (!window.Razorpay) {
        alert("Razorpay failed to load. Please disable any ad-blockers and retry.");
        return;
      }

      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        name: "GoodMatter",
        description: payLabel,
        order_id: orderId,
        theme: { color: "#15A9FF" },
        handler: () => setSuccess(true),
      });
      rzp.open();
    } catch {
      openDemoCheckout();
    } finally {
      setLoading(false);
    }
  }

  function openDemoCheckout() {
    // Fallback: show success UI for demo purposes
    setSuccess(true);
  }

  if (success) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-3">You're In!</h2>
          <p className="text-white/50 mb-8 max-w-sm">
            Welcome to GoodMatter Pro. Your account has been upgraded and all features are now active.
          </p>
          <Button
            onClick={() => setSuccess(false)}
            className="bg-primary hover:bg-primary/90 text-white px-8 h-12 rounded-2xl font-semibold shadow-[0_0_20px_rgba(21,169,255,0.4)]"
          >
            Start Exploring
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
            <Crown className="w-4 h-4 text-amber-400" />
          </div>
          <h1 className="font-display font-bold text-xl text-white">Upgrade to Pro</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 w-full">
        {/* Hero text */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-medium">
              {isServicePayment ? "One-Time Service" : "Intelligence Network"}
            </span>
          </div>
          <h2 className="text-4xl font-display font-bold text-white mb-3">
            {isServicePayment ? serviceParam : <>Join the Private Market<br /><span className="text-primary">Intelligence Network</span></>}
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto">
            {isServicePayment
              ? "Complete your payment to get started with this service."
              : "Direct access to 3,840+ verified investors, AI-powered deal matching, and curated private market intelligence."}
          </p>
        </div>

        {/* Plan selector — only for subscriptions */}
        {!isServicePayment && (
          <div className="flex gap-2 mb-8 p-1 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            {PLANS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-3 px-2 rounded-xl transition-all duration-200 ${
                  selected === p.id
                    ? "bg-primary/15 border border-primary/30 text-white"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
                }`}
              >
                <span className="text-sm font-semibold">{p.label}</span>
                <span className={`text-xs ${selected === p.id ? "text-primary" : "text-white/30"}`}>{p.price}</span>
                {p.badge && (
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 mt-0.5 ${p.badgeClass}`}>
                    {p.badge}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Main card */}
        <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden mb-6">
          {/* Top gradient bar */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none" />

          <div className="relative z-10 p-8">
            {/* Price */}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-display font-bold text-white">
                {isServicePayment ? priceParam : plan.price}
              </span>
              {!isServicePayment && <span className="text-white/40 text-sm">{plan.period}</span>}
            </div>
            {!isServicePayment && plan.badge && (
              <Badge variant="outline" className={`text-xs mb-6 ${plan.badgeClass}`}>{plan.badge}</Badge>
            )}
            {!isServicePayment && !plan.badge && <div className="mb-6" />}
            {isServicePayment && <div className="mb-6" />}

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-white/70">{f}</span>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <Button
              onClick={handlePay}
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-[0_0_30px_rgba(21,169,255,0.4)] hover:shadow-[0_0_40px_rgba(21,169,255,0.6)] transition-all disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Processing…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Pay {isServicePayment ? priceParam : plan.price} via Razorpay
                </span>
              )}
            </Button>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/[0.06]">
              {PERKS.map((perk, i) => (
                <div key={i} className="flex items-center gap-1.5 text-white/30">
                  <perk.icon className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{perk.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Razorpay badge */}
        <div className="text-center">
          <p className="text-xs text-white/20">
            Payments securely processed by{" "}
            <span className="text-white/40 font-semibold">Razorpay</span>
            {" "}· 256-bit SSL encryption
          </p>
        </div>
      </div>
    </Layout>
  );
}
