import { Link, useLocation } from "react-router-dom";
import { User, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import owneoLogo from "@/assets/owneo-logo.png";

const Navbar = () => {
  const location = useLocation();
  const [language, setLanguage] = useState("es");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/portfolio", label: "PORTFOLIO" },
    { path: "/nuestro-modelo", label: language === "es" ? "NUESTRO CONCEPTO" : "OUR CONCEPT" },
    { path: "/cities", label: language === "es" ? "UBICACIONES" : "LOCATIONS" },
    { path: "/quienes-somos", label: language === "es" ? "QUIÉNES SOMOS" : "ABOUT US" },
    { path: "/noticias", label: language === "es" ? "NOTICIAS" : "NEWS" },
  ];

  // On home page, navbar is transparent until scrolled
  const navBgClass = isHomePage 
    ? scrolled 
      ? "bg-black/95 backdrop-blur-md border-b border-white/10" 
      : "bg-transparent border-b border-transparent"
    : "bg-black/95 backdrop-blur-md border-b border-white/10";
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src={owneoLogo} 
              alt="OWNEO" 
              className="h-14 md:h-16 lg:h-18 w-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-light tracking-[0.15em] transition-colors duration-300 ${
                  isActive(link.path) 
                    ? "text-white" 
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[80px] border-white/20 bg-transparent text-white/60 hover:text-white text-xs">
                  <Globe className="w-3 h-3 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/20">
                  <SelectItem value="es" className="text-white/80">ES</SelectItem>
                  <SelectItem value="en" className="text-white/80">EN</SelectItem>
                </SelectContent>
              </Select>
              
              <Link to="/dashboard">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 text-white/50 hover:text-white hover:bg-white/5 text-xs font-light tracking-wider"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{language === "es" ? "MI CUENTA" : "MY ACCOUNT"}</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/80"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-xs font-light tracking-[0.15em] transition-colors ${
                  isActive(link.path) 
                    ? "text-white" 
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 pt-2 border-t border-white/10">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[80px] border-white/20 bg-transparent text-white/60 text-xs">
                  <Globe className="w-3 h-3 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/20">
                  <SelectItem value="es" className="text-white/80">ES</SelectItem>
                  <SelectItem value="en" className="text-white/80">EN</SelectItem>
                </SelectContent>
              </Select>
              
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 text-white/50 hover:text-white text-xs"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{language === "es" ? "MI CUENTA" : "MY ACCOUNT"}</span>
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
