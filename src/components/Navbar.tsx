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
            <Car className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              OWNEO
            </span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive("/") ? "text-primary" : "text-foreground hover:text-primary"}`}>
              {language === "es" ? "INICIO" : "HOME"}
            </Link>
            <Link to="/portfolio" className={`text-sm font-medium transition-colors ${isActive("/portfolio") ? "text-primary" : "text-foreground hover:text-primary"}`}>
              PORTFOLIO
            </Link>
            <Link to="/cities" className={`text-sm font-medium transition-colors ${isActive("/cities") ? "text-primary" : "text-foreground hover:text-primary"}`}>
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
              <Button variant="outline" size="sm" className="flex items-center gap-2 border-primary/50 hover:bg-primary hover:text-primary-foreground">
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