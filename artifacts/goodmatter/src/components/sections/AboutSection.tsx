import { CheckCircle, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const MISSION_POINTS = [
  "Good Matter connects exceptional founders with thoughtful investors through direct, private communications.",
  "Fundraising is complex for founders to navigate. Investors miss the right founders in the noise of private markets.",
  "We want to make the discovery and communication seamless for both.",
  "Operators and investors building the network we wanted to see.",
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-10 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0047B3]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-3">
          <span className="text-xs font-semibold tracking-widest text-[#15A9FF] uppercase">About</span>
        </div>
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Curated Community For{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#15A9FF] to-[#00C853]">
            Private Market Players
          </span>
        </h2>
        <p className="text-lg text-white/50 mb-16 max-w-xl">
          We believe the highest alpha emerges from direct communications.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            {MISSION_POINTS.map((point, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1 w-5 h-5 rounded-full bg-[#15A9FF]/10 border border-[#15A9FF]/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#15A9FF]" />
                </div>
                <p className="text-white/70 leading-relaxed text-[15px]">{point}</p>
              </div>
            ))}

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#15A9FF]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>₹47Cr+</div>
                <div className="text-xs text-white/40 mt-1">Capital Connected</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#00C853]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>200+</div>
                <div className="text-xs text-white/40 mt-1">Verified Founders</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#FFC107]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>85+</div>
                <div className="text-xs text-white/40 mt-1">Active Investors</div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#15A9FF]/10 blur-3xl rounded-full -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00C853]/10 blur-2xl rounded-full -ml-6 -mb-6" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-16 h-16 border-2 border-[#15A9FF]/30">
                  <AvatarFallback className="bg-gradient-to-br from-[#0047B3] to-[#15A9FF] text-white text-xl font-bold">SD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Saswata Dey</span>
                    <CheckCircle className="w-4 h-4 text-[#15A9FF]" />
                  </div>
                  <span className="text-white/50 text-sm">Founder, GoodMatter</span>
                  <div className="flex gap-2 mt-1.5">
                    <Badge variant="outline" className="text-[10px] bg-[#15A9FF]/10 border-[#15A9FF]/20 text-[#15A9FF] rounded-full">Verified</Badge>
                    <Badge variant="outline" className="text-[10px] bg-[#00C853]/10 border-[#00C853]/20 text-[#00C853] rounded-full">Builder</Badge>
                  </div>
                </div>
              </div>

              <blockquote className="text-white/80 leading-relaxed text-[15px] mb-6 italic border-l-2 border-[#15A9FF]/40 pl-4">
                "Dedicated to building high-signal infrastructure for the next generation of private market opportunities."
              </blockquote>

              <Button
                data-testid="button-founder-linkedin"
                variant="outline"
                className="gap-2 bg-[#0A66C2]/10 border-[#0A66C2]/30 text-[#0A66C2] hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50 rounded-xl"
                onClick={() => window.open("https://linkedin.com", "_blank")}
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
