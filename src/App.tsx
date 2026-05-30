import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import BottomNav from "@/components/BottomNav";
import CookieBanner from "@/components/CookieBanner";
import BetaGate from "@/components/BetaGate";
import { usePostHogPageView } from "@/hooks/usePostHogPageView";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Cities from "./pages/Cities";
import CityDetail from "./pages/CityDetail";
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
import NoticiaLamborghiniTemerarioSpyder from "./pages/noticias/NoticiaLamborghiniTemerarioSpyder";

import NoticiaMcLarenW1 from "./pages/NoticiaMcLarenW1";

import NoticiaMercedesAMGOne from "./pages/NoticiaMercedesAMGOne";
import NoticiaDetalle from "./pages/NoticiaDetalle";
import Login from "./pages/Login";
import Participar from "./pages/Participar";
import Contacto from "./pages/Contacto";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import PoliticaCookies from "./pages/PoliticaCookies";
import Unauthorized from "./pages/Unauthorized";
import AdminGuard from "./components/admin/AdminGuard";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVehiculos from "./pages/admin/AdminVehiculos";
import AdminSolicitudes from "./pages/admin/AdminSolicitudes";
import AdminParticipantes from "./pages/admin/AdminParticipantes";
import AdminReservas from "./pages/admin/AdminReservas";
import AdminPagos from "./pages/admin/AdminPagos";
import MisDocumentos from "./pages/dashboard/MisDocumentos";
import AdminInspecciones from "./pages/admin/AdminInspecciones";
import AdminUbicaciones from "./pages/admin/AdminUbicaciones";
import AdminConfiguracion from "./pages/admin/AdminConfiguracion";
import AdminFlota from "./pages/admin/AdminFlota";
import AdminFlotaDetalle from "./pages/admin/AdminFlotaDetalle";
import AdminConsultas from "./pages/admin/AdminConsultas";
import AdminCreditReminders from "./pages/admin/AdminCreditReminders";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const PostHogPageTracker = () => {
  usePostHogPageView();
  return null;
};

const GaPageTracker = () => {
  const location = useLocation();
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BetaGate>
      <BrowserRouter>
        <ScrollToTop />
        <PostHogPageTracker />
        <GaPageTracker />
        <AuthProvider>
          <div className="pb-bottom-nav md:pb-0">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/coches" element={<Portfolio />} />
              <Route path="/ubicaciones" element={<Cities />} />
              <Route path="/cities/:cityId" element={<CityDetail />} />
              <Route path="/ubicaciones/:slug" element={<CityDetail />} />
              <Route path="/car/:id" element={<CarDetail />} />
              <Route path="/coches/:slug" element={<CarDetail />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/documentos" element={<ProtectedRoute><MisDocumentos /></ProtectedRoute>} />
              <Route path="/calendar-showcase" element={<CalendarShowcase />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/nuestro-modelo" element={<NuestroModelo />} />
              <Route path="/tiktok" element={<TikTokLanding />} />
              <Route path="/twitter" element={<TwitterLanding />} />
              <Route path="/noticias" element={<Noticias />} />
              <Route path="/noticias/ferrari-luce-ev" element={<NoticiaFerrariLuce />} />
              <Route path="/noticias/lamborghini-huracan-hibrido" element={<NoticiaLamborghiniHuracan />} />
              
              <Route path="/noticias/mclaren-w1" element={<NoticiaMcLarenW1 />} />
              
              <Route path="/noticias/mercedes-amg-one-actualizacion" element={<NoticiaMercedesAMGOne />} />
              <Route path="/noticias/:slug" element={<NoticiaDetalle />} />
              <Route path="/login" element={<Login />} />
              <Route path="/participar" element={<Participar />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/aviso-legal" element={<AvisoLegal />} />
              <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
              <Route path="/politica-de-cookies" element={<PoliticaCookies />} />
              {/* Admin routes */}
              <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
                <Route index element={<AdminDashboard />} />
                <Route path="vehiculos" element={<AdminVehiculos />} />
                <Route path="solicitudes" element={<AdminSolicitudes />} />
                <Route path="participantes" element={<AdminParticipantes />} />
                <Route path="flota" element={<AdminFlota />} />
                <Route path="flota/:carId" element={<AdminFlotaDetalle />} />
                <Route path="reservas" element={<AdminReservas />} />
                <Route path="pagos" element={<AdminPagos />} />
                <Route path="inspecciones" element={<AdminInspecciones />} />
                <Route path="ubicaciones" element={<AdminUbicaciones />} />
                <Route path="consultas" element={<AdminConsultas />} />
                <Route path="configuracion" element={<AdminConfiguracion />} />
                <Route path="settings/credit-reminders" element={<AdminCreditReminders />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <BottomNav />
          <CookieBanner />
        </AuthProvider>
      </BrowserRouter>
      </BetaGate>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
