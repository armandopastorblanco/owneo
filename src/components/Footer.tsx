import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import { openConsentManager } from "@/lib/consent";

const AndroidIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.463 11.463 0 0 0-8.94 0L5.65 5.67c-.19-.29-.54-.38-.84-.22-.29.16-.42.54-.25.85L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"/>
  </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const Footer = () => {
  const pwa = usePWAInstall();

  const handleAndroidInstall = () => {
    if (pwa.canInstallNatively) {
      pwa.install();
    } else {
      pwa.forcePrompt();
    }
  };

  const handleIOSInstall = () => {
    pwa.forcePrompt();
  };

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">OWNEO</h3>
            <p className="text-sm text-muted-foreground">
              Tu destino exclusivo para supercoches de lujo en España
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">CONTACTO</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@owneo.es</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Alicante, Spain</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">ENLACES</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div><a href="/coches" className="hover:text-foreground transition-colors">Nuestra Gama</a></div>
              <div><a href="/ubicaciones" className="hover:text-foreground transition-colors">Ubicaciones</a></div>
              <div><a href="/quienes-somos" className="hover:text-foreground transition-colors">Quiénes Somos</a></div>
              <div><a href="/contacto" className="hover:text-foreground transition-colors">Contacto</a></div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">APP</h4>
            <p className="text-xs text-muted-foreground mb-3">Instala nuestra app</p>
            <div className="flex gap-4">
              <button
                onClick={handleAndroidInstall}
                className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
                aria-label="Instalar en Android"
              >
                <div className="w-10 h-10 rounded-lg bg-background/60 border border-border/40 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <AndroidIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">Android</span>
              </button>
              <button
                onClick={handleIOSInstall}
                className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
                aria-label="Instalar en iOS"
              >
                <div className="w-10 h-10 rounded-lg bg-background/60 border border-border/40 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <AppleIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">iOS</span>
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">REDES SOCIALES</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="/twitter" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="/tiktok" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.92a8.2 8.2 0 0 0 4.78 1.53V7.01a4.85 4.85 0 0 1-1.02-.32z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border space-y-4 text-sm text-muted-foreground">
          <nav
            aria-label="Enlaces legales"
            className="flex flex-col items-center gap-3 md:flex-row md:flex-wrap md:justify-center md:gap-x-3 md:gap-y-2"
          >
            <a
              href="/aviso-legal"
              aria-label="Leer el Aviso Legal"
              className="hover:text-foreground transition-colors"
            >
              Aviso Legal
            </a>
            <span aria-hidden="true" className="hidden md:inline text-border">|</span>
            <a
              href="/politica-de-privacidad"
              aria-label="Leer la Política de Privacidad"
              className="hover:text-foreground transition-colors"
            >
              Política de Privacidad
            </a>
            <span aria-hidden="true" className="hidden md:inline text-border">|</span>
            <a
              href="/politica-de-cookies"
              aria-label="Leer la Política de Cookies"
              className="hover:text-foreground transition-colors"
            >
              Política de Cookies
            </a>
            <span aria-hidden="true" className="hidden md:inline text-border">|</span>
            <button
              type="button"
              onClick={openConsentManager}
              aria-label="Abrir gestor de preferencias de cookies"
              className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
            >
              Gestionar preferencias de cookies
            </button>
            <span aria-hidden="true" className="hidden md:inline text-border">|</span>
            <Link
              to="/creditos"
              aria-label="Créditos fotográficos"
              className="hover:text-foreground transition-colors"
            >
              Créditos fotográficos
            </Link>
          </nav>
          <p className="text-center text-xs text-muted-foreground">
            © 2026 OWNEO SL — Todos los derechos reservados
          </p>
        </div>
      </div>

      <PWAInstallPrompt
        show={pwa.showPrompt}
        isIOS={pwa.isIOS}
        canInstallNatively={pwa.canInstallNatively}
        onInstall={pwa.install}
        onDismiss={pwa.dismiss}
      />
    </footer>
  );
};

export default Footer;
