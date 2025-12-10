import { Link, useLocation } from "react-router-dom";
import { Car, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [language, setLanguage] = useState("es");
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Car className="w-8 h-8 text-foreground" />
            <span className="text-2xl font-bold text-foreground">
              OWNEO
            </span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive("/") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {language === "es" ? "INICIO" : "HOME"}
            </Link>
            <Link to="/portfolio" className={`text-sm font-medium transition-colors ${isActive("/portfolio") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              PORTFOLIO
            </Link>
            <Link to="/cities" className={`text-sm font-medium transition-colors ${isActive("/cities") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {language === "es" ? "UBICACIONES" : "LOCATIONS"}
            </Link>
            
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[100px] border-border bg-background">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="en">EN</SelectItem>
              </SelectContent>
            </Select>
            
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="flex items-center gap-2 border-foreground/50 hover:bg-foreground hover:text-background">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{language === "es" ? "Mi Cuenta" : "My Account"}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;