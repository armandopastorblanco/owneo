import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Cities from "./pages/Cities";
import CarDetail from "./pages/CarDetail";
import Dashboard from "./pages/Dashboard";
import CalendarShowcase from "./pages/CalendarShowcase";
import QuienesSomos from "./pages/QuienesSomos";
import NuestroModelo from "./pages/NuestroModelo";
import TikTokLanding from "./pages/TikTokLanding";
import TwitterLanding from "./pages/TwitterLanding";
import Noticias from "./pages/Noticias";
import NoticiaFerrariLuce from "./pages/NoticiaFerrariLuce";
import NoticiaLamborghiniHuracan from "./pages/NoticiaLamborghiniHuracan";
import NoticiaPorscheGT3RS from "./pages/NoticiaPorscheGT3RS";
import NoticiaMcLarenW1 from "./pages/NoticiaMcLarenW1";
import NoticiaBugattiTourbillon from "./pages/NoticiaBugattiTourbillon";
import NoticiaMercedesAMGOne from "./pages/NoticiaMercedesAMGOne";
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
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar-showcase" element={<CalendarShowcase />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/nuestro-modelo" element={<NuestroModelo />} />
          <Route path="/tiktok" element={<TikTokLanding />} />
          <Route path="/twitter" element={<TwitterLanding />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/ferrari-luce-ev" element={<NoticiaFerrariLuce />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
