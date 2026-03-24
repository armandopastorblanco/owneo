import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { usePostHogPageView } from "@/hooks/usePostHogPageView";
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
import NoticiaDetalle from "./pages/NoticiaDetalle";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PostHogPageTracker = () => {
  usePostHogPageView();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PostHogPageTracker />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/calendar-showcase" element={<CalendarShowcase />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/nuestro-modelo" element={<NuestroModelo />} />
            <Route path="/tiktok" element={<TikTokLanding />} />
            <Route path="/twitter" element={<TwitterLanding />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/noticias/ferrari-luce-ev" element={<NoticiaFerrariLuce />} />
            <Route path="/noticias/lamborghini-huracan-hibrido" element={<NoticiaLamborghiniHuracan />} />
            <Route path="/noticias/porsche-911-gt3-rs-2026" element={<NoticiaPorscheGT3RS />} />
            <Route path="/noticias/mclaren-w1" element={<NoticiaMcLarenW1 />} />
            <Route path="/noticias/bugatti-tourbillon" element={<NoticiaBugattiTourbillon />} />
            <Route path="/noticias/mercedes-amg-one-actualizacion" element={<NoticiaMercedesAMGOne />} />
            <Route path="/noticias/:slug" element={<NoticiaDetalle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
