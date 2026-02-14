import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
const Footer = () => {
  return <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">OWNEO</h3>
            <p className="text-sm text-muted-foreground">
              Tu destino exclusivo para supercoches de lujo en España
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">CONTACTO

          </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@prestigemotors.es</span>
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
              <div><a href="/portfolio" className="hover:text-foreground transition-colors">Portfolio</a></div>
              <div><a href="/cities" className="hover:text-foreground transition-colors">Ubicaciones</a></div>
              <div><a href="/quienes-somos" className="hover:text-foreground transition-colors">Quiénes Somos</a></div>
              <div><a href="#" className="hover:text-foreground transition-colors">Contacto</a></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">REDES SOCIALES </h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.92a8.2 8.2 0 0 0 4.78 1.53V7.01a4.85 4.85 0 0 1-1.02-.32z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 OWNEO. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;