import { Link, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoOwneo from "@/assets/logo-owneo.png";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logoOwneo} alt="OWNEO" className="h-8" />
          </Link>
          
          <div className="flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive("/") ? "text-primary" : "text-foreground hover:text-primary"}`}>
              HOME
            </Link>
            <Link to="/portfolio" className={`text-sm font-medium transition-colors ${isActive("/portfolio") ? "text-primary" : "text-foreground hover:text-primary"}`}>
              PORTFOLIO
            </Link>
            <Link to="/cities" className={`text-sm font-medium transition-colors ${isActive("/cities") ? "text-primary" : "text-foreground hover:text-primary"}`}>
              LOCATIONS
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="flex items-center gap-2 border-primary/50 hover:bg-primary hover:text-primary-foreground">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Mi Cuenta</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;