import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Puzzles from "@/pages/Puzzles";
import Riddles from "@/pages/Riddles";
import Jokes from "@/pages/Jokes";
import BrainTeasers from "@/pages/BrainTeasers";
import TongueTwisters from "@/pages/TongueTwisters";
import Trivia from "@/pages/Trivia";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/puzzles" component={Puzzles} />
      <Route path="/riddles" component={Riddles} />
      <Route path="/jokes" component={Jokes} />
      <Route path="/brain-teasers" component={BrainTeasers} />
      <Route path="/tongue-twisters" component={TongueTwisters} />
      <Route path="/trivia" component={Trivia} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
