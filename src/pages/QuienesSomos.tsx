import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PressSection from "@/components/PressSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Users, 
  Share2, 
  Shield, 
  Sparkles, 
  Car, 
  Calendar, 
  CheckCircle2, 
  TrendingUp,
  Heart,
  Award,
  Gem,
  ArrowRight
} from "lucide-react";
import quienesSomosHero from "@/assets/quienes-somos-hero.png";

const QuienesSomos = () => {
  const steps = [
    {
      number: "01",
      icon: Car,
      title: "Elige tu Supercar",
      description: "Explora nuestra flota exclusiva de Ferrari, Lamborghini, Porsche y más. Selecciona el vehículo que mejor se adapte a tus sueños."
    },
    {
      number: "02",
      icon: Share2,
      title: "Únete al Co-Sharing",
      description: "Accede a nuestro modelo de copropiedad compartida. Disfruta de los beneficios de un supercar sin los costes completos de propiedad."
    },
    {
      number: "03",
      icon: Calendar,
      title: "Reserva tus Fechas",
      description: "Planifica tu experiencia con nuestro sistema de reservas flexible. Elige los días que mejor se adapten a tu agenda."
    },
    {
      number: "04",
      icon: Sparkles,
      title: "Vive la Experiencia",
      description: "Recoge tu supercar impecablemente preparado y disfruta de una experiencia de conducción inolvidable."
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Inversión Inteligente",
      description: "Accede a vehículos de lujo valorados en cientos de miles de euros por una fracción del coste."
    },
    {
      icon: Shield,
      title: "Seguro Premium",
      description: "Cobertura completa y mantenimiento incluido. Conduce con total tranquilidad."
    },
    {
      icon: Users,
      title: "Comunidad Exclusiva",
      description: "Forma parte de un selecto grupo de apasionados del motor y el lujo."
    },
    {
      icon: Award,
      title: "Servicio VIP",
      description: "Atención personalizada 24/7 y experiencias únicas para nuestros miembros."
    }
  ];

  const values = [
    {
      icon: Gem,
      title: "Exclusividad",
      description: "Solo los mejores supercoches del mundo"
    },
    {
      icon: Heart,
      title: "Pasión",
      description: "Amantes del motor al servicio del motor"
    },
    {
      icon: Shield,
      title: "Confianza",
      description: "Transparencia total en cada operación"
    },
    {
      icon: Sparkles,
      title: "Excelencia",
      description: "Estándares de calidad sin compromisos"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img src={quienesSomosHero} alt="OWNEO showroom" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-champagne/10 text-champagne rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              La Revolución del Supercar Sharing
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Quiénes <span className="text-champagne">Somos</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              En OWNEO reimaginamos el acceso al lujo automovilístico. Nuestro modelo exclusivo de 
              <strong className="text-white"> co-sharing de supercoches</strong> hace realidad 
              el sueño de conducir los vehículos más extraordinarios del mundo.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 hover:border-champagne/30 transition-all duration-300">
              <div className="w-14 h-14 bg-champagne/10 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-champagne" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Nuestra Misión</h2>
              <p className="text-muted-foreground leading-relaxed">
                Democratizar el acceso a los supercoches más exclusivos del mundo. Creemos que la 
                experiencia de conducir un Ferrari, Lamborghini o Porsche no debería estar reservada 
                solo a unos pocos. A través de nuestro innovador modelo de co-sharing, abrimos las 
                puertas a una nueva forma de vivir el lujo automovilístico.
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 hover:border-champagne/30 transition-all duration-300">
              <div className="w-14 h-14 bg-champagne/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-champagne" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Nuestra Visión</h2>
              <p className="text-muted-foreground leading-relaxed">
                Convertirnos en el referente europeo del supercar sharing. Aspiramos a crear la 
                comunidad más exclusiva de apasionados del motor, donde cada miembro pueda disfrutar 
                de experiencias únicas mientras comparte la pasión por los vehículos más extraordinarios 
                jamás creados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Co-Sharing Model */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-champagne/10 text-champagne rounded-full text-sm font-medium mb-4">
                Nuestro Modelo Exclusivo
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                ¿Qué es el <span className="text-champagne">Co-Sharing</span>?
              </h2>
              <p className="text-xl text-muted-foreground">
                Una revolución en el acceso a vehículos de lujo
              </p>
            </div>

            <div className="bg-gradient-to-br from-champagne/5 via-card/50 to-champagne/5 rounded-3xl border border-border/50 p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  El <strong className="text-foreground">co-sharing de supercoches</strong> es un modelo 
                  innovador de copropiedad compartida que permite a varios miembros acceder a un mismo 
                  vehículo de alta gama. A diferencia del alquiler tradicional, nuestros miembros forman 
                  parte de una comunidad exclusiva con acceso privilegiado a toda nuestra flota.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-background/50 rounded-xl p-6 border border-border/30">
                    <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-champagne" />
                      Alquiler Tradicional
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Precios elevados por día</li>
                      <li>• Sin sentido de pertenencia</li>
                      <li>• Disponibilidad limitada</li>
                      <li>• Experiencia impersonal</li>
                    </ul>
                  </div>
                  
                  <div className="bg-champagne/5 rounded-xl p-6 border border-champagne/20">
                    <h4 className="text-lg font-semibold text-champagne mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Co-Sharing OWNEO
                    </h4>
                    <ul className="space-y-2 text-foreground">
                      <li>• Cuota mensual accesible</li>
                      <li>• Comunidad exclusiva</li>
                      <li>• Prioridad de reserva</li>
                      <li>• Experiencia VIP personalizada</li>
                    </ul>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Con OWNEO, no solo alquilas un coche: te conviertes en parte de una familia de 
                  apasionados que comparten el amor por los supercoches. Accede a Ferrari, Lamborghini, 
                  Porsche, McLaren y más, con la flexibilidad y el servicio que mereces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-champagne/10 text-champagne rounded-full text-sm font-medium mb-4">
              Proceso Simple
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              ¿Cómo <span className="text-champagne">Funciona</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              En solo cuatro pasos, estarás al volante del supercar de tus sueños
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 hover:border-champagne/30 hover:shadow-lg hover:shadow-champagne/5 transition-all duration-300 group"
              >
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-champagne text-champagne-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>
                <div className="w-14 h-14 bg-champagne/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-champagne/20 transition-colors">
                  <step.icon className="w-7 h-7 text-champagne" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-champagne/10 text-champagne rounded-full text-sm font-medium mb-4">
              Ventajas Exclusivas
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              ¿Por qué <span className="text-champagne">OWNEO</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre las ventajas de formar parte de nuestra comunidad
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 hover:border-champagne/30 hover:shadow-lg hover:shadow-champagne/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-champagne/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-champagne/20 transition-colors">
                  <benefit.icon className="w-7 h-7 text-champagne" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-champagne/10 text-champagne rounded-full text-sm font-medium mb-4">
              Lo que nos Define
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nuestros <span className="text-champagne">Valores</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-card/30 border border-border/30 hover:border-champagne/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-champagne/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-champagne" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Section */}
      <PressSection />

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-champagne/10 via-card to-champagne/10 rounded-3xl border border-border/50 p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Listo para unirte a la <span className="text-champagne">revolución</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explora nuestra flota exclusiva y descubre el supercar que te está esperando. 
              Tu aventura comienza aquí.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 bg-champagne text-champagne-foreground hover:bg-champagne/90">
                <Link to="/portfolio">
                  Ver la Flota
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 border-champagne/30 hover:bg-champagne/10">
                <Link to="/cities">
                  Nuestras Ciudades
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QuienesSomos;