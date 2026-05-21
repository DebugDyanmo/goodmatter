import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Zap, ExternalLink } from "lucide-react";
import { FeedComposerAndPosts } from "@/components/feed/FeedCore";

export default function FeedPage() {
  const [tab, setTab] = useState<"forYou" | "following" | "trending">("forYou");

  return (
    <Layout>
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/8">
        <div className="px-5 pt-4 pb-0">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-display font-bold text-xl text-white">Deal Feed</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[11px] gap-1 text-amber-400 border-amber-400/20 bg-amber-400/8">
                <Zap className="w-3 h-3" />
                Live
              </Badge>
              <button className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-all">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex gap-1 -mx-1">
            {(["forYou", "following", "trending"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all relative ${
                  tab === t ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                {t === "forYou" ? "For You" : t === "following" ? "Following" : "Trending"}
                {tab === t && <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />}
              </button>
            ))}
          </div>
        </div>
      </div>
      <FeedComposerAndPosts />
    </Layout>
  );
}
