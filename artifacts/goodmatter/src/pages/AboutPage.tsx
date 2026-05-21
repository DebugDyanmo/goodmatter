import { Layout } from "@/components/layout/Layout";
import { AboutSection } from "@/components/sections/AboutSection";

export default function AboutPage() {
  return (
    <Layout>
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4">
        <h1 className="font-display font-bold text-xl text-white">About GoodMatter</h1>
      </div>
      <AboutSection />
    </Layout>
  );
}
