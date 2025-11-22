import { Link, useLocation } from "react-router-dom";
import { Car } from "lucide-react";
const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Car className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              OWNEO
            </span>
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
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;