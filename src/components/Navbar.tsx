import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Globe, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import owneoLogo from "@/assets/owneo-logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [language, setLanguage] = useState("es");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { path: "/portfolio", label: "NUESTRA GAMA" },
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

  const navBgClass = isHomePage
    ? scrolled || mobileMenuOpen
      ? "bg-background/95 backdrop-blur-md border-b border-border/40"
      : "bg-transparent border-b border-transparent"
    : "bg-background/95 backdrop-blur-md border-b border-border/40";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}
      >
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="grid grid-cols-[1fr_auto_1fr] md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10">
            <Link to="/" className="flex items-center shrink-0 justify-self-center md:justify-self-start col-start-2 md:col-start-1">
              <img
                src={owneoLogo}
                alt="OWNEO"
                width="569"
                height="100"
                className="h-8 md:h-9 lg:h-10 w-auto shrink-0 mix-blend-screen filter brightness-110"
                style={{ aspectRatio: "569 / 100" }}
              />
            </Link>

            {/* Desktop Navigation - centered */}
            <div className="hidden md:flex items-center justify-center gap-10 lg:gap-14">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-light tracking-[0.15em] whitespace-nowrap transition-colors duration-300 ${
                    isActive(link.path)
                      ? "text-foreground"
                      : "text-foreground/50 hover:text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-3 justify-end">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[80px] border-border/40 bg-transparent text-foreground/60 hover:text-foreground text-xs">
                  <Globe className="w-3 h-3 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="es" className="text-foreground/80">ES</SelectItem>
                  <SelectItem value="en" className="text-foreground/80">EN</SelectItem>
                </SelectContent>
              </Select>

              {user ? (
                <>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-foreground/50 hover:text-foreground hover:bg-foreground/5 text-xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-foreground/50 hover:text-foreground hover:bg-foreground/5 text-xs font-light tracking-wider"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{language === "es" ? "ACCEDER" : "LOGIN"}</span>
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 -mr-2 text-foreground/80 min-w-[48px] min-h-[48px] flex items-center justify-center justify-self-end col-start-3"
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
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col md:hidden animate-in fade-in duration-200">
          {/* Header with logo and close */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center shrink-0">
              <img
                src={owneoLogo}
                alt="OWNEO"
                width="569"
                height="100"
                className="h-8 w-auto shrink-0 mix-blend-screen filter brightness-110"
                style={{ aspectRatio: "569 / 100" }}
              />
            </Link>
            <button
              className="p-3 text-foreground/80 min-w-[48px] min-h-[48px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Menu links */}
          <div className="flex-1 flex flex-col justify-center px-6 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-4 py-4 min-h-[56px] flex items-center text-lg font-light tracking-[0.15em] transition-colors active:bg-foreground/5 ${
                  isActive(link.path)
                    ? "text-foreground bg-foreground/5"
                    : "text-foreground/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom actions */}
          <div className="px-6 pb-8 pt-4 border-t border-border/40 space-y-3">
            <div className="flex items-center gap-3">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[88px] border-border/40 bg-transparent text-foreground/70 text-xs min-h-[48px]">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="es" className="text-foreground/80">ES</SelectItem>
                  <SelectItem value="en" className="text-foreground/80">EN</SelectItem>
                </SelectContent>
              </Select>

              {user ? (
                <div className="flex items-center gap-2 flex-1">
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                    <Button variant="outline" className="w-full min-h-[48px] flex items-center gap-2 text-foreground/80 text-sm">
                      <User className="w-4 h-4" />
                      <span>{language === "es" ? "MI CUENTA" : "MY ACCOUNT"}</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                    className="min-h-[48px] min-w-[48px] text-foreground/60"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <Button variant="outline" className="w-full min-h-[48px] flex items-center gap-2 text-foreground/80 text-sm">
                    <User className="w-4 h-4" />
                    <span>{language === "es" ? "ACCEDER" : "LOGIN"}</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
