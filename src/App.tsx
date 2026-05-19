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
import NoticiaPorscheGT3RS from "./pages/NoticiaPorscheGT3RS";
import NoticiaMcLarenW1 from "./pages/NoticiaMcLarenW1";
import NoticiaBugattiTourbillon from "./pages/NoticiaBugattiTourbillon";
import NoticiaMercedesAMGOne from "./pages/NoticiaMercedesAMGOne";
import NoticiaLamborghiniRevueltoSpider from "./pages/NoticiaLamborghiniRevueltoSpider";
import NoticiaFerrari12CilindriSpider from "./pages/NoticiaFerrari12CilindriSpider";
import NoticiaPorscheGt3Rs2026 from "./pages/NoticiaPorscheGt3Rs2026";
import NoticiaMcLarenW1Spider from "./pages/NoticiaMcLarenW1Spider";
import NoticiaAstonMartinVantageGt3 from "./pages/NoticiaAstonMartinVantageGt3";
import NoticiaLamborghiniUrusSe from "./pages/NoticiaLamborghiniUrusSe";
import NoticiaBugattiBolide from "./pages/NoticiaBugattiBolide";
import NoticiaRollsRoyceDroptail from "./pages/NoticiaRollsRoyceDroptail";
import NoticiaPorsche718Ev from "./pages/NoticiaPorsche718Ev";
import NoticiaDetalle from "./pages/NoticiaDetalle";
import Login from "./pages/Login";
import Participar from "./pages/Participar";
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
              <Route path="/noticias/porsche-911-gt3-rs-2026" element={<NoticiaPorscheGT3RS />} />
              <Route path="/noticias/mclaren-w1" element={<NoticiaMcLarenW1 />} />
              <Route path="/noticias/bugatti-tourbillon" element={<NoticiaBugattiTourbillon />} />
              <Route path="/noticias/bugatti-tourbillon-lanzamiento" element={<NoticiaBugattiTourbillon />} />
              <Route path="/noticias/mercedes-amg-one-actualizacion" element={<NoticiaMercedesAMGOne />} />
              <Route path="/noticias/lamborghini-revuelto-spider" element={<NoticiaLamborghiniRevueltoSpider />} />
              <Route path="/noticias/ferrari-12cilindri-spider-circuito" element={<NoticiaFerrari12CilindriSpider />} />
              <Route path="/noticias/porsche-911-gt3-rs-2026-especificaciones" element={<NoticiaPorscheGt3Rs2026 />} />
              <Route path="/noticias/mclaren-w1-spider-confirmacion" element={<NoticiaMcLarenW1Spider />} />
              <Route path="/noticias/aston-martin-vantage-gt3-2026" element={<NoticiaAstonMartinVantageGt3 />} />
              <Route path="/noticias/lamborghini-urus-se-actualizado" element={<NoticiaLamborghiniUrusSe />} />
              <Route path="/noticias/bugatti-bolide-primeras-entregas" element={<NoticiaBugattiBolide />} />
              <Route path="/noticias/rolls-royce-droptail-edicion-final" element={<NoticiaRollsRoyceDroptail />} />
              <Route path="/noticias/porsche-718-cayman-gt4-rs-electrico" element={<NoticiaPorsche718Ev />} />
              <Route path="/noticias/:slug" element={<NoticiaDetalle />} />
              <Route path="/login" element={<Login />} />
              <Route path="/participar" element={<Participar />} />
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
