import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import AlarmsView from "@/src/pages/AlarmsView";
import AddAlarmView from "@/src/pages/AddAlarmView";
import EditAlarmView from "@/src/pages/EditAlarmView";
import SoundsView from "@/src/pages/SoundsView";
import RepeatOptionsView from "@/src/pages/RepeatOptionsView";
import NotFound from "@/src/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AlarmsView} />
      <Route path="/add" component={AddAlarmView} />
      <Route path="/edit/:id" component={EditAlarmView} />
      <Route path="/sounds/add" component={SoundsView} />
      <Route path="/sounds/:id" component={SoundsView} />
      <Route path="/repeat" component={RepeatOptionsView} />
      <Route path="/repeat/:id" component={RepeatOptionsView} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="max-w-md mx-auto min-h-screen bg-background text-foreground overflow-hidden">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;