import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import BottomNav from "@/components/BottomNav";
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
import Participar from "./pages/Participar";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import AdminGuard from "./components/admin/AdminGuard";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVehiculos from "./pages/admin/AdminVehiculos";
import AdminSolicitudes from "./pages/admin/AdminSolicitudes";
import AdminParticipantes from "./pages/admin/AdminParticipantes";
import AdminReservas from "./pages/admin/AdminReservas";
import AdminKYC from "./pages/admin/AdminKYC";
import AdminContratos from "./pages/admin/AdminContratos";
import AdminPagos from "./pages/admin/AdminPagos";
import AdminInspecciones from "./pages/admin/AdminInspecciones";
import AdminUbicaciones from "./pages/admin/AdminUbicaciones";
import AdminConfiguracion from "./pages/admin/AdminConfiguracion";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, search, hash, key } = useLocation();
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    requestAnimationFrame(() => {
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.body.scrollTo({ top: 0, left: 0, behavior: "auto" });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [pathname, search, hash, key]);
  return null;
};

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
        <ScrollToTop />
        <PostHogPageTracker />
        <AuthProvider>
          <div className="pb-bottom-nav md:pb-0">
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
              <Route path="/participar" element={<Participar />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              {/* Admin routes */}
              <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
                <Route index element={<AdminDashboard />} />
                <Route path="vehiculos" element={<AdminVehiculos />} />
                <Route path="solicitudes" element={<AdminSolicitudes />} />
                <Route path="participantes" element={<AdminParticipantes />} />
                <Route path="reservas" element={<AdminReservas />} />
                <Route path="kyc" element={<AdminKYC />} />
                <Route path="contratos" element={<AdminContratos />} />
                <Route path="pagos" element={<AdminPagos />} />
                <Route path="inspecciones" element={<AdminInspecciones />} />
                <Route path="ubicaciones" element={<AdminUbicaciones />} />
                <Route path="configuracion" element={<AdminConfiguracion />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <BottomNav />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
