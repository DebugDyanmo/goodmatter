import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import FounderDashboard from "@/pages/FounderDashboard";
import InvestorDashboard from "@/pages/InvestorDashboard";
import FeedPage from "@/pages/FeedPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/feed" component={FeedPage} />
      <Route path="/founder-dashboard" component={FounderDashboard} />
      <Route path="/investor-dashboard" component={InvestorDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Ensure dark mode is always on
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
