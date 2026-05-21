import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { RightPanel } from "./RightPanel";
import { TopBar } from "./TopBar";
import { MobileNav } from "./MobileNav";
import { ChatBox } from "@/components/chat/ChatBox";

interface LayoutProps {
  children: ReactNode;
  showRightPanel?: boolean;
}

export function Layout({ children, showRightPanel = true }: LayoutProps) {
  return (
    <div className="h-screen bg-background text-foreground flex overflow-hidden relative">
      {/* Ambient depth layers */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(21,169,255,0.06),transparent)]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[radial-gradient(circle,rgba(0,71,179,0.08),transparent_70%)]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(21,169,255,0.05),transparent_70%)]" />
      </div>

      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden relative z-10 scroll-smooth pb-20 md:pb-0 scrollbar-thin">
        <TopBar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </main>

      {showRightPanel && <RightPanel />}

      <MobileNav />
      <ChatBox />
    </div>
  );
}
