import { Link, useLocation } from "react-router-dom";
import { Home, Car, MapPin, Newspaper, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/coches", label: "Gama", icon: Car },
  { path: "/ubicaciones", label: "Ciudades", icon: MapPin },
  { path: "/noticias", label: "Noticias", icon: Newspaper },
];

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const accountItem = {
    path: user ? "/dashboard" : "/login",
    label: user ? "Cuenta" : "Acceder",
    icon: User,
  };

  const allItems = [...navItems, accountItem];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border/40 safe-area-bottom">
      <div className="flex items-stretch justify-around">
        {allItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 min-h-[56px] py-2 gap-0.5 transition-colors active:bg-foreground/5 ${
              isActive(item.path)
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-light tracking-wide">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
