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
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto overflow-x-hidden relative scroll-smooth pb-20 md:pb-0">
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
