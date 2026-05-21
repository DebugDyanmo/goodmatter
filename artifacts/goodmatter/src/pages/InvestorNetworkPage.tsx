import { Layout } from "@/components/layout/Layout";
import { InvestorNetworkSection } from "@/components/sections/InvestorNetworkSection";

export default function InvestorNetworkPage() {
  return (
    <Layout>
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4">
        <h1 className="font-display font-bold text-xl text-white">Investor Network</h1>
      </div>
      <InvestorNetworkSection />
    </Layout>
  );
}
