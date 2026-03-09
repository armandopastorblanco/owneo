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
import { useEffect, useState } from "react";
import owneoLogo from "@/assets/owneo-logo.jpg";

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

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { path: "/portfolio", label: "PORTFOLIO" },
    {
      path: "/nuestro-modelo",
      label: language === "es" ? "NUESTRO CONCEPTO" : "OUR CONCEPT",
    },
    {
      path: "/cities",
      label: language === "es" ? "UBICACIONES" : "LOCATIONS",
    },
    {
      path: "/quienes-somos",
      label: language === "es" ? "QUIÉNES SOMOS" : "ABOUT US",
    },
    { path: "/noticias", label: language === "es" ? "NOTICIAS" : "NEWS" },
  ];

  // On home page, navbar is transparent until scrolled (or menu open)
  const navBgClass = isHomePage
    ? scrolled || mobileMenuOpen
      ? "bg-background/95 backdrop-blur-md border-b border-border/40"
      : "bg-transparent border-b border-transparent"
    : "bg-background/95 backdrop-blur-md border-b border-border/40";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}
    >
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={owneoLogo}
              alt="OWNEO"
              className="h-12 sm:h-14 md:h-16 lg:h-[72px] w-auto mix-blend-screen filter brightness-110"
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
                    ? "text-foreground"
                    : "text-foreground/50 hover:text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border/40">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[80px] border-border/40 bg-transparent text-foreground/60 hover:text-foreground text-xs">
                  <Globe className="w-3 h-3 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="es" className="text-foreground/80">
                    ES
                  </SelectItem>
                  <SelectItem value="en" className="text-foreground/80">
                    EN
                  </SelectItem>
                </SelectContent>
              </Select>

              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-foreground/50 hover:text-foreground hover:bg-foreground/5 text-xs font-light tracking-wider"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{language === "es" ? "MI CUENTA" : "MY ACCOUNT"}</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 -mr-2 text-foreground/80"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-4 border-t border-border/40 max-h-[calc(100vh-88px)] overflow-y-auto">
            <div className="space-y-2 pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-md px-2 py-3 text-sm font-light tracking-[0.15em] transition-colors ${
                    isActive(link.path)
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/40">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[88px] border-border/40 bg-transparent text-foreground/70 text-xs">
                    <Globe className="w-3 h-3 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="es" className="text-foreground/80">
                      ES
                    </SelectItem>
                    <SelectItem value="en" className="text-foreground/80">
                      EN
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-foreground/60 hover:text-foreground text-xs"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{language === "es" ? "MI CUENTA" : "MY ACCOUNT"}</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
