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
              <div><a href="/portfolio" className="hover:text-foreground transition-colors">Our Portfolio</a></div>
              <div><a href="/cities" className="hover:text-foreground transition-colors">Locations</a></div>
              <div><a href="#" className="hover:text-foreground transition-colors">About Us</a></div>
              <div><a href="#" className="hover:text-foreground transition-colors">Contact</a></div>
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