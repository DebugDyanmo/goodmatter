import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Users, Handshake, ArrowRight } from "lucide-react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-24 px-6 md:px-10 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00C853]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-3">
          <span className="text-xs font-semibold tracking-widest text-[#00C853] uppercase">Contact</span>
        </div>
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Initiate Dialogue
        </h2>
        <p className="text-lg text-white/50 mb-16">Connect with the collective.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left info panel */}
          <div className="glass-card rounded-2xl p-8 flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#0047B3]/10 blur-3xl rounded-full -ml-10 -mt-10" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Direct Line</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#15A9FF]/10 border border-[#15A9FF]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4.5 h-4.5 text-[#15A9FF]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">Email</p>
                    <a
                      href="mailto:goodmatter05@gmail.com"
                      className="text-white hover:text-[#15A9FF] transition-colors font-medium text-sm"
                      data-testid="link-contact-email"
                    >
                      goodmatter05@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00C853]/10 border border-[#00C853]/20 flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-4.5 h-4.5 text-[#00C853]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">Partnerships</p>
                    <p className="text-sm text-white/70">Strategic collaborations, co-investment opportunities, and network partnerships.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFC107]/10 border border-[#FFC107]/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4.5 h-4.5 text-[#FFC107]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">Community</p>
                    <p className="text-sm text-white/70">Join curated events, roundtables, and private deal sessions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#15A9FF]/5 blur-3xl rounded-full -mr-8 -mt-8" />
            <div className="relative z-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00C853]/10 border border-[#00C853]/20 flex items-center justify-center mb-4">
                    <ArrowRight className="w-8 h-8 text-[#00C853]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Message Sent</h3>
                  <p className="text-white/50 text-sm">We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white/60 text-xs uppercase tracking-wider">Full Name</Label>
                      <Input
                        data-testid="input-contact-name"
                        placeholder="Your name"
                        className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF] focus-visible:border-[#15A9FF]"
                      />
                    </div>
                    <div>
                      <Label className="text-white/60 text-xs uppercase tracking-wider">Email</Label>
                      <Input
                        data-testid="input-contact-email"
                        type="email"
                        placeholder="you@company.com"
                        className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF] focus-visible:border-[#15A9FF]"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs uppercase tracking-wider">Phone</Label>
                    <Input
                      data-testid="input-contact-phone"
                      placeholder="+91 98765 43210"
                      className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF] focus-visible:border-[#15A9FF]"
                    />
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs uppercase tracking-wider">Inquiry Vector</Label>
                    <Select>
                      <SelectTrigger
                        data-testid="select-inquiry"
                        className="mt-1.5 bg-white/5 border-white/10 text-white rounded-xl focus:ring-[#15A9FF]"
                      >
                        <SelectValue placeholder="Select inquiry type" className="text-white/30" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0d1f3c] border-white/10 text-white">
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="founder">Founder</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs uppercase tracking-wider">Detailed Brief</Label>
                    <Textarea
                      data-testid="textarea-contact-brief"
                      placeholder="Describe your inquiry in detail..."
                      rows={4}
                      className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-[#15A9FF] focus-visible:border-[#15A9FF] resize-none"
                    />
                  </div>
                  <Button
                    data-testid="button-contact-send"
                    type="submit"
                    className="w-full bg-[#15A9FF] hover:bg-[#15A9FF]/90 text-white rounded-xl h-11 shadow-[0_0_20px_rgba(21,169,255,0.3)] gap-2"
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
