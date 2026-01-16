import { Link, useLocation } from "react-router-dom";
import { Car, User, Globe, Menu, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: language === "es" ? "INICIO" : "HOME" },
    { path: "/portfolio", label: "PORTFOLIO" },
    { path: "/nuestro-modelo", label: language === "es" ? "NUESTRO CONCEPTO" : "OUR CONCEPT" },
    { path: "/cities", label: language === "es" ? "UBICACIONES" : "LOCATIONS" },
    { path: "/quienes-somos", label: language === "es" ? "QUIÉNES SOMOS" : "ABOUT US" },
  ];
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Car className="w-7 h-7 md:w-8 md:h-8 text-foreground" />
            <span className="text-xl md:text-2xl font-bold text-foreground">
              OWNEO
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${isActive(link.path) ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
            
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
                <span>{language === "es" ? "Mi Cuenta" : "My Account"}</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium transition-colors ${isActive(link.path) ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 pt-2">
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
              
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="flex items-center gap-2 border-foreground/50 hover:bg-foreground hover:text-background">
                  <User className="w-4 h-4" />
                  <span>{language === "es" ? "Mi Cuenta" : "My Account"}</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;