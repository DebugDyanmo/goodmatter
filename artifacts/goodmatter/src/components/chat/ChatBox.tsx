import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Minimize2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi! I'm your GoodMatter AI assistant. I can help you find the right investors, review your pitch, or explore opportunities on the platform. What can I help you with today?",
    time: now(),
  },
];

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const MOCK_REPLIES: Record<string, string> = {
  default:
    "Great question! GoodMatter connects you directly with curated investors matched to your stage and sector. Would you like me to run a quick AI match analysis for your startup?",
  investor:
    "We have 340+ vetted investors across Seed, Series A, and Series B. Based on your profile, Marcus Lindholm at Linea Capital is a 96% match — he focuses on climate-tech and deep-tech founders. Want me to surface his full profile?",
  pitch:
    "Your pitch looks strong! A few areas to sharpen: (1) quantify your TAM more specifically, (2) add a 12-month revenue projection, and (3) highlight your unfair advantage. Want a full AI pitch review?",
  funding:
    "Current platform median raise is $2.4M at a $12M pre-money valuation for Seed stage. Your target of $3M is competitive. I'd recommend a SAFE or convertible note to move faster. Shall I match you with investors open to that structure?",
};

function getMockReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("investor") || lower.includes("fund") || lower.includes("vc"))
    return MOCK_REPLIES.investor;
  if (lower.includes("pitch") || lower.includes("deck") || lower.includes("review"))
    return MOCK_REPLIES.pitch;
  if (lower.includes("fund") || lower.includes("raise") || lower.includes("valuation") || lower.includes("money"))
    return MOCK_REPLIES.funding;
  return MOCK_REPLIES.default;
}

export function ChatBox() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, open, minimized]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now(), role: "user", text, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: getMockReply(text),
        time: now(),
      };
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
    }, 1100);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setMinimized(false); }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_24px_rgba(21,169,255,0.55)] hover:shadow-[0_0_36px_rgba(21,169,255,0.75)] hover:scale-105 transition-all duration-200 md:bottom-6 bottom-24"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className={`fixed right-6 z-50 w-[340px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col ${
            minimized ? "bottom-6 h-14" : "bottom-6 h-[480px] md:bottom-6 bottom-24"
          }`}
          style={{ background: "hsl(var(--background))" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 shrink-0"
            style={{ background: "linear-gradient(135deg, hsl(217 91% 37% / 0.3), hsl(199 100% 54% / 0.15))" }}
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-none">GoodMatter AI</p>
              <p className="text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Online
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized((m) => !m)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                aria-label={minimized ? "Expand" : "Minimize"}
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                      </div>
                    )}
                    <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-white rounded-tr-sm"
                          : "bg-white/5 border border-white/10 text-white/90 rounded-tl-sm"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-white/30 px-1">{msg.time}</span>
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick prompts */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {["Find investors", "Review my pitch", "Check funding trends"].map((q) => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); setTimeout(send, 0); }}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-primary/30 text-primary/80 hover:bg-primary/10 hover:text-primary transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-3 pb-3 pt-2 border-t border-white/10 shrink-0 flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask GoodMatter AI…"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
                />
                <Button
                  size="icon"
                  onClick={send}
                  disabled={!input.trim() || typing}
                  className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 text-white shrink-0 disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
