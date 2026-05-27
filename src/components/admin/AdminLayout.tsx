import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard, Car, FileText, Users, CalendarDays,
  CreditCard, ClipboardCheck, MapPin, Settings,
  LogOut, Menu, X, Gauge, MessageCircle, Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Consultas", path: "/admin/consultas", icon: MessageCircle, badgeKey: "unread_consultas" as const },
  { label: "Vitrina", path: "/admin/vehiculos", icon: Car },
  { label: "Solicitudes", path: "/admin/solicitudes", icon: FileText },
  { label: "Participantes", path: "/admin/participantes", icon: Users },
  { label: "Flota", path: "/admin/flota", icon: Gauge },
  { label: "Reservas", path: "/admin/reservas", icon: CalendarDays, badgeKey: "pending_reservations" as const },
  { label: "Pagos", path: "/admin/pagos", icon: CreditCard },
  { label: "Inspecciones", path: "/admin/inspecciones", icon: ClipboardCheck },
  { label: "Ubicaciones", path: "/admin/ubicaciones", icon: MapPin },
  { label: "Recordatorios créditos", path: "/admin/settings/credit-reminders", icon: Bell },
  { label: "Configuración", path: "/admin/configuracion", icon: Settings },
];

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: pendingReservations = 0 } = useQuery({
    queryKey: ["admin-pending-reservations-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("reservations")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending");
      return count ?? 0;
    },
    refetchInterval: 60000,
  });

  const { data: unreadConsultas = 0 } = useQuery({
    queryKey: ["admin-consultas-unread"],
    queryFn: async () => {
      const { count } = await supabase
        .from("consultation_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");
      return count ?? 0;
    },
    refetchInterval: 30000,
  });

  const badgeMap: Record<string, number> = {
    pending_reservations: pendingReservations,
    unread_consultas: unreadConsultas,
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const isActive = (path: string) =>
    path === "/admin" ? pathname === "/admin" : pathname.startsWith(path);

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <button
        onClick={() => { navigate("/"); setSidebarOpen(false); }}
        className="p-5 border-b border-border/40 text-left w-full hover:bg-muted/40 transition-colors"
      >
        <span className="text-xl font-bold tracking-wider text-foreground">OWNEO</span>
        <span className="ml-2 text-xs text-muted-foreground uppercase tracking-widest">Admin</span>
      </button>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const { label, path, icon: Icon } = item;
          const badgeCount = item.badgeKey ? badgeMap[item.badgeKey] : 0;
          return (
            <button
              key={path}
              onClick={() => { navigate(path); setSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-3 rounded-lg transition-colors",
                mobile ? "py-3 min-h-[48px] text-base" : "py-2.5 text-sm",
                isActive(path)
                  ? "bg-primary/20 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("shrink-0", mobile ? "h-5 w-5" : "h-4 w-4")} />
              <span className="flex-1 text-left">{label}</span>
              {badgeCount > 0 && (
                <span className="ml-auto inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-champagne text-champagne-foreground text-[10px] font-semibold">
                  {badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border/40">
        <button
          onClick={handleSignOut}
          className={cn(
            "w-full flex items-center gap-3 px-3 rounded-lg text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors",
            mobile ? "py-3 min-h-[48px] text-base" : "py-2.5 text-sm"
          )}
        >
          <LogOut className={cn(mobile ? "h-5 w-5" : "h-4 w-4")} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r border-border/40 bg-card fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile fullscreen overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <aside className="absolute inset-0 bg-card flex flex-col animate-in slide-in-from-left">
            <div className="absolute right-3 top-3 z-10">
              <Button variant="ghost" size="icon" className="h-11 w-11" onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <SidebarContent mobile />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen min-w-0">
        <header className="fixed md:sticky top-0 left-0 right-0 md:left-auto md:right-auto z-40 md:z-20 flex items-center justify-between h-14 px-3 md:px-4 border-b border-border/40 bg-card/95 md:bg-card/80 backdrop-blur-sm gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Button variant="ghost" size="icon" className="md:hidden h-11 w-11 shrink-0" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú">
              <Menu className="h-6 w-6" />
            </Button>
            <span className="md:hidden text-sm font-bold tracking-wider text-foreground">
              OWNEO <span className="text-muted-foreground text-[10px] uppercase tracking-widest ml-1">Admin</span>
            </span>
          </div>
          <span className="hidden md:block text-sm text-muted-foreground truncate">
            {user?.email}
          </span>
          <span className="md:hidden text-muted-foreground" title={user?.email}>
            <Users className="h-5 w-5" />
          </span>
        </header>

        <main className="admin-shell flex-1 p-4 md:p-6 pt-[72px] md:pt-6 min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

