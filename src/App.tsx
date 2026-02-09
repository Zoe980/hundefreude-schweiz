import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Rassen from "./pages/Rassen";
import RasseDetail from "./pages/RasseDetail";
import Anbieter from "./pages/Anbieter";
import AnbieterDetail from "./pages/AnbieterDetail";
import Quiz from "./pages/Quiz";
import Anfrage from "./pages/Anfrage";
import Eintragen from "./pages/Eintragen";
import { Blog, Events } from "./pages/BlogAndEvents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rassen" element={<Rassen />} />
          <Route path="/rasse/:slug" element={<RasseDetail />} />
          <Route path="/anbieter" element={<Anbieter />} />
          <Route path="/anbieter/:slug" element={<AnbieterDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/anfrage" element={<Anfrage />} />
          <Route path="/eintragen" element={<Eintragen />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
