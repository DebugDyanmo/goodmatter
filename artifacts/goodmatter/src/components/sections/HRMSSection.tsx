import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Package } from "lucide-react";

const SAAS_PRODUCTS = [
  {
    title: "HRMS",
    icon: Package,
    monthly: "₹1/mo",
    yearly: "₹1/year",
    color: "#15A9FF",
    features: ["Employee records", "Attendance workflows", "Payroll basics", "Role-based access"],
  },
  {
    title: "Logistics",
    icon: Package,
    monthly: "₹1/mo",
    yearly: "₹1/year",
    color: "#00C853",
    features: ["Shipment tracking", "Fleet dashboard", "Alerts", "Operational analytics"],
  },
];

export function HRMSSection() {
  return (
    <section id="services" className="py-24 px-6 md:px-10 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#0047B3]/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-3">
          <span className="text-xs font-semibold tracking-widest text-[#FFC107] uppercase">Enterprise Tools</span>
        </div>
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          HRMS & Logistics SaaS
        </h2>
        <p className="text-lg text-white/50 mb-16 max-w-xl">
          Operational infrastructure for scaling startups, priced for early-stage builders.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {SAAS_PRODUCTS.map((product, i) => (
            <div
              key={i}
              data-testid={`card-saas-${i}`}
              className="glass-card rounded-2xl p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-10" style={{ background: product.color }} />

              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${product.color}20`, border: `1px solid ${product.color}30` }}
                >
                  <product.icon className="w-6 h-6" style={{ color: product.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold" style={{ color: product.color }}>{product.monthly}</span>
                    <span className="text-white/30 text-sm">or</span>
                    <span className="text-white/60 text-sm">{product.yearly}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {product.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: product.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                data-testid={`button-saas-subscribe-${i}`}
                className="w-full rounded-xl gap-2"
                style={{ background: `${product.color}20`, color: product.color, border: `1px solid ${product.color}30` }}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#00C853]" />
            <span className="text-white/70 text-sm font-medium">Enterprise-grade security</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="bg-[#0047B3]/10 border-[#0047B3]/30 text-[#15A9FF] rounded-full text-xs px-3 py-1">
              Razorpay Secured
            </Badge>
            <Badge variant="outline" className="bg-[#00C853]/10 border-[#00C853]/30 text-[#00C853] rounded-full text-xs px-3 py-1">
              HMAC SHA-256
            </Badge>
            <Badge variant="outline" className="bg-white/5 border-white/10 text-white/60 rounded-full text-xs px-3 py-1">
              SOC 2 Compliant
            </Badge>
            <Badge variant="outline" className="bg-white/5 border-white/10 text-white/60 rounded-full text-xs px-3 py-1">
              256-bit Encryption
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
