import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home, Car, MapPin, Newspaper, User,
  LayoutDashboard, Calendar, FileText,
  MessageSquare, CreditCard, Settings,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

type NavItem = {
  key: string;
  label: string;
  icon: typeof Home;
  path: string;
  hash?: string;
  isActive: (pathname: string, hash: string) => boolean;
  onClick?: (e: React.MouseEvent) => void;
};

const defaultItems = (user: any, t: (k: string) => string): NavItem[] => [
  { key: "home", label: t("nav.home"), icon: Home, path: "/", isActive: (p) => p === "/" },
  { key: "gama", label: t("nav.fleet"), icon: Car, path: "/coches", isActive: (p) => p === "/coches" },
  { key: "ciudades", label: t("nav.locations"), icon: MapPin, path: "/ubicaciones", isActive: (p) => p.startsWith("/ubicaciones") || p.startsWith("/cities") },
  { key: "noticias", label: t("nav.news"), icon: Newspaper, path: "/noticias", isActive: (p) => p.startsWith("/noticias") },
  {
    key: "cuenta",
    label: user ? t("nav.account") : t("nav.login"),
    icon: User,
    path: user ? "/dashboard" : "/login",
    isActive: (p) => p === (user ? "/dashboard" : "/login"),
  },
];

const adminItems = (t: (k: string) => string): NavItem[] => [
  { key: "consultas", label: t("bottomnav.enquiries"), icon: MessageSquare, path: "/admin/consultas", isActive: (p) => p.startsWith("/admin/consultas") },
  { key: "reservas", label: t("bottomnav.reservations"), icon: Calendar, path: "/admin/reservas", isActive: (p) => p.startsWith("/admin/reservas") },
  { key: "pagos", label: t("bottomnav.payments"), icon: CreditCard, path: "/admin/pagos", isActive: (p) => p.startsWith("/admin/pagos") },
  { key: "admin", label: t("bottomnav.admin"), icon: Settings, path: "/admin", isActive: (p) => p === "/admin" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const { t } = useTranslation();

  const isAdmin = role === "admin" || role === "superadmin";

  const { data: hasActiveParticipation } = useQuery({
    queryKey: ["bottom-nav-has-participation", user?.id],
    enabled: !!user && !isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("validated_participations")
        .select("id")
        .eq("user_id", user!.id)
        .limit(1);
      if (error) return false;
      return (data?.length ?? 0) > 0;
    },
  });

  const goToDashboardHash = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/dashboard") {
      if (!hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate("/dashboard", { replace: true });
      } else {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        navigate(`/dashboard#${hash}`, { replace: true });
      }
    } else {
      navigate(hash ? `/dashboard#${hash}` : "/dashboard");
    }
  };

  const participantItems: NavItem[] = [
    {
      key: "panel", label: t("bottomnav.panel"), icon: LayoutDashboard, path: "/dashboard",
      isActive: (p, h) => p === "/dashboard" && !h,
      onClick: goToDashboardHash(""),
    },
    {
      key: "reservar", label: t("bottomnav.book"), icon: Calendar, path: "/dashboard#reservar",
      isActive: (p, h) => p === "/dashboard" && h === "#reservar",
      onClick: goToDashboardHash("reservar"),
    },
    {
      key: "documentos", label: t("bottomnav.documents"), icon: FileText, path: "/dashboard#documentos",
      isActive: (p, h) => p === "/dashboard" && h === "#documentos",
      onClick: goToDashboardHash("documentos"),
    },
    {
      key: "mi-cuenta", label: t("bottomnav.my_account"), icon: User, path: "/dashboard#mi-cuenta",
      isActive: (p, h) => p === "/dashboard" && h === "#mi-cuenta",
      onClick: goToDashboardHash("mi-cuenta"),
    },
  ];

  let items: NavItem[];
  if (isAdmin) items = adminItems(t);
  else if (hasActiveParticipation) items = participantItems;
  else items = defaultItems(user, t);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border/40 safe-area-bottom">
      <div className="flex items-stretch justify-around">
        {items.map((item) => {
          const active = item.isActive(location.pathname, location.hash);
          const Icon = item.icon;
          return (
            <Link
              key={item.key}
              to={item.path}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center flex-1 min-h-[56px] py-2 gap-0.5 transition-colors active:bg-foreground/5 ${
                active ? "text-champagne" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-light tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
