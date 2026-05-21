import { Layout } from "@/components/layout/Layout";
import { ContactSection } from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <Layout>
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4">
        <h1 className="font-display font-bold text-xl text-white">Contact Us</h1>
      </div>
      <ContactSection />
    </Layout>
  );
}
