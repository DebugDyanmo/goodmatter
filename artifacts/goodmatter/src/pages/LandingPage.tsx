import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StudioSection } from "@/components/sections/StudioSection";
import { InvestorNetworkSection } from "@/components/sections/InvestorNetworkSection";
import { SubscriptionSection } from "@/components/sections/SubscriptionSection";
import { HRMSSection } from "@/components/sections/HRMSSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function LandingPage() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <StudioSection />
      <InvestorNetworkSection />
      <SubscriptionSection />
      <HRMSSection />
      <ContactSection />
      <FooterSection />
    </Layout>
  );
}
