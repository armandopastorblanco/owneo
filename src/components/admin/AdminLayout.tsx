import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard, Car, FileText, Users, CalendarDays,
  CreditCard, ClipboardCheck, MapPin, Settings,
  LogOut, Menu, X, Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Vitrina", path: "/admin/vehiculos", icon: Car },
  { label: "Solicitudes", path: "/admin/solicitudes", icon: FileText },
  { label: "Participantes", path: "/admin/participantes", icon: Users },
  { label: "Flota", path: "/admin/flota", icon: Gauge },
  { label: "Reservas", path: "/admin/reservas", icon: CalendarDays, badgeKey: "pending_reservations" as const },
  { label: "Pagos", path: "/admin/pagos", icon: CreditCard },
  { label: "Inspecciones", path: "/admin/inspecciones", icon: ClipboardCheck },
  { label: "Ubicaciones", path: "/admin/ubicaciones", icon: MapPin },
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

  const badgeMap: Record<string, number> = { pending_reservations: pendingReservations };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const isActive = (path: string) =>
    path === "/admin" ? pathname === "/admin" : pathname.startsWith(path);

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-border/40">
        <span className="text-xl font-bold tracking-wider text-foreground">OWNEO</span>
        <span className="ml-2 text-xs text-muted-foreground uppercase tracking-widest">Admin</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const { label, path, icon: Icon } = item;
          const badgeCount = item.badgeKey ? badgeMap[item.badgeKey] : 0;
          return (
            <button
              key={path}
              onClick={() => { navigate(path); setSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive(path)
                  ? "bg-primary/20 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {badgeCount > 0 && (
                <span className="ml-auto inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-semibold">
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
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" />
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

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card flex flex-col animate-in slide-in-from-left">
            <div className="absolute right-2 top-2">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 flex items-center justify-between h-14 px-4 border-b border-border/40 bg-card/80 backdrop-blur-sm">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden md:block" />
          <span className="text-sm text-muted-foreground truncate">
            {user?.email}
          </span>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
