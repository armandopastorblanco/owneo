import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  BadgeCheck,
  Lock,
  FileCheck,
  Percent,
  Repeat,
  ArrowRight,
  X,
  Check,
  Calculator,
  PiggyBank,
  Clock,
  MapPin,
  Key,
  Wrench
} from "lucide-react";

const NuestroModelo = () => {
  const processSteps = [
    {
      number: "01",
      icon: Users,
      title: "Conviértete en Copropietario",
      description: "Únete a nuestro exclusivo club de miembros. Buscamos grupos de 3 a 10 copropietarios para cada supercar. Explora nuestra flota y envía tu solicitud de copropiedad para el vehículo deseado."
    },
    {
      number: "02",
      icon: PiggyBank,
      title: "Financia el Vehículo",
      description: "Una vez alcanzado el número de copropietarios, adquirimos el vehículo de concesionarios oficiales certificados. Cada copropietario invierte según su participación deseada."
    },
    {
      number: "03",
      icon: Shield,
      title: "Seguro y Garantía",
      description: "Proporcionamos un seguro integral que cubre completamente a cada conductor. Además, garantizamos cobertura de fábrica o garantía adicional para motor y electrónica."
    },
    {
      number: "04",
      icon: Key,
      title: "Uso y Recogida",
      description: "Los vehículos se gestionan en nuestras ubicaciones exclusivas. Reserva a través del calendario digital y recoge tu supercar impecablemente preparado."
    },
    {
      number: "05",
      icon: Repeat,
      title: "Vende tus Participaciones",
      description: "Flexibilidad total: puedes vender tus participaciones en cualquier momento o adquirir más participaciones en diferentes vehículos de nuestra flota."
    }
  ];

  const securityFeatures = [
    { icon: Car, title: "Vehículos Verificados", description: "Inspección técnica completa" },
    { icon: BadgeCheck, title: "Miembros Verificados", description: "Proceso de verificación riguroso" },
    { icon: Lock, title: "Datos Encriptados", description: "Máxima seguridad digital" },
    { icon: Wrench, title: "Garantía del Vehículo", description: "Cobertura completa incluida" },
    { icon: FileCheck, title: "Costes Transparentes", description: "Sin sorpresas ni costes ocultos" },
    { icon: Repeat, title: "Venta Flexible", description: "Liquida tu participación cuando quieras" }
  ];

  const comparisonData = {
    vehiclePrice: 250000,
    shares: 5,
    sharePrice: 50000,
    annualCosts: {
      individual: {
        insurance: 5000,
        maintenance: 8000,
        storage: 3600,
        depreciation: 25000,
        registration: 1200,
        cleaning: 1200,
        total: 44000
      },
      cosharing: {
        insurance: 1000,
        maintenance: 1600,
        storage: 720,
        depreciation: 5000,
        registration: 240,
        cleaning: 240,
        total: 8800
      }
    },
    usage: {
      daysPerShare: 30,
      kmPerShare: 3000
    }
  };

  const practicalExample = {
    vehicle: "Porsche 911 Turbo S",
    totalShares: 10,
    yourShares: 2,
    daysPerYear: 60,
    kmPerYear: 6000,
    pricePerShare: 25000,
    yourInvestment: 50000
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Copropiedad con Respaldo de Activos
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Nuestro <span className="text-primary">Modelo</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              "La copropiedad con respaldo de activos es <strong className="text-foreground">la forma más eficiente de poseer un supercar</strong> hoy en día."
            </p>
          </div>
        </div>
      </section>

      {/* Video/Intro Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Cómo Funciona la <span className="text-primary">Copropiedad</span>: Explicado en 3 Minutos
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              En esta página encontrarás todo sobre el proceso de copropiedad, desde la solicitud de visualización hasta tu primera conducción como copropietario.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {processSteps.map((step, index) => (
                <a 
                  key={index}
                  href={`#step-${index + 1}`}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary transition-all"
                >
                  {step.number}. {step.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                id={`step-${index + 1}`}
                className="scroll-mt-24 bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8 md:p-12 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center relative">
                      <step.icon className="w-10 h-10 text-primary" />
                      <span className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-muted-foreground mb-2 block">Paso {index + 1} de 5</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{step.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Protección del Comprador
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nuestros Servicios de <span className="text-primary">Seguridad</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-4 text-center hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <Calculator className="w-4 h-4 inline-block mr-2" />
                Comparativa de Costes
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Compra Individual <span className="text-primary">VS</span> OWNEO Co-Sharing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Análisis transparente de los ahorros al utilizar nuestro sistema de copropiedad comparado con la compra convencional
              </p>
            </div>

            {/* Cost Comparison Table */}
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 overflow-hidden mb-12">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                {/* Header */}
                <div className="p-6 bg-muted/30">
                  <h4 className="text-lg font-bold text-foreground mb-2">Concepto</h4>
                  <p className="text-sm text-muted-foreground">Costes anuales estimados para un vehículo de €250.000</p>
                </div>
                <div className="p-6 bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <X className="w-5 h-5 text-destructive" />
                    <h4 className="text-lg font-bold text-foreground">Compra Individual</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Propietario único del vehículo</p>
                </div>
                <div className="p-6 bg-primary/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-5 h-5 text-primary" />
                    <h4 className="text-lg font-bold text-primary">OWNEO Co-Sharing</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">5 copropietarios (1 participación)</p>
                </div>
              </div>

              {/* Cost Rows */}
              <div className="divide-y divide-border">
                {[
                  { label: "Seguro anual", individual: comparisonData.annualCosts.individual.insurance, cosharing: comparisonData.annualCosts.cosharing.insurance },
                  { label: "Mantenimiento y servicio", individual: comparisonData.annualCosts.individual.maintenance, cosharing: comparisonData.annualCosts.cosharing.maintenance },
                  { label: "Almacenamiento / Garaje", individual: comparisonData.annualCosts.individual.storage, cosharing: comparisonData.annualCosts.cosharing.storage },
                  { label: "Depreciación estimada", individual: comparisonData.annualCosts.individual.depreciation, cosharing: comparisonData.annualCosts.cosharing.depreciation },
                  { label: "Registro e impuestos", individual: comparisonData.annualCosts.individual.registration, cosharing: comparisonData.annualCosts.cosharing.registration },
                  { label: "Limpieza y cuidado", individual: comparisonData.annualCosts.individual.cleaning, cosharing: comparisonData.annualCosts.cosharing.cleaning },
                ].map((row, index) => (
                  <div key={index} className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                    <div className="p-4 flex items-center">
                      <span className="text-sm font-medium text-foreground">{row.label}</span>
                    </div>
                    <div className="p-4 bg-muted/30 flex items-center justify-center">
                      <span className="text-lg font-semibold text-foreground">€{row.individual.toLocaleString()}</span>
                    </div>
                    <div className="p-4 bg-primary/5 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">€{row.cosharing.toLocaleString()}</span>
                    </div>
                  </div>
                ))}

                {/* Total Row */}
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border bg-muted/50">
                  <div className="p-6 flex items-center">
                    <span className="text-lg font-bold text-foreground">TOTAL ANUAL</span>
                  </div>
                  <div className="p-6 bg-muted/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-foreground">€{comparisonData.annualCosts.individual.total.toLocaleString()}</span>
                  </div>
                  <div className="p-6 bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">€{comparisonData.annualCosts.cosharing.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Highlight */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-3xl border border-primary/20 p-8 text-center">
              <Percent className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Ahorro del <span className="text-primary">80%</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                En costes anuales con OWNEO Co-Sharing
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-foreground">€{(comparisonData.annualCosts.individual.total - comparisonData.annualCosts.cosharing.total).toLocaleString()} de ahorro anual</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Recupera tu inversión al vender</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Example */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Caso Práctico
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ejemplo de <span className="text-primary">Uso Real</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Así funcionaría tu experiencia como copropietario
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vehicle Card */}
              <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Car className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{practicalExample.vehicle}</h3>
                    <p className="text-muted-foreground">Vehículo de ejemplo</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Total de participaciones</span>
                    <span className="text-lg font-semibold text-foreground">{practicalExample.totalShares}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Días por participación/año</span>
                    <span className="text-lg font-semibold text-foreground">{comparisonData.usage.daysPerShare} días</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Km por participación/año</span>
                    <span className="text-lg font-semibold text-foreground">{comparisonData.usage.kmPerShare.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Precio por participación</span>
                    <span className="text-lg font-semibold text-primary">€{practicalExample.pricePerShare.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Your Ownership */}
              <div className="bg-gradient-to-br from-primary/10 via-card to-accent/10 rounded-3xl border border-primary/20 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Tu Copropiedad</h3>
                    <p className="text-primary font-medium">2 participaciones adquiridas</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <div className="flex items-center gap-2">
                      <PiggyBank className="w-4 h-4 text-primary" />
                      <span className="text-foreground">Tu inversión</span>
                    </div>
                    <span className="text-xl font-bold text-primary">€{practicalExample.yourInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-foreground">Días de uso al año</span>
                    </div>
                    <span className="text-xl font-bold text-foreground">{practicalExample.daysPerYear} días</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-foreground">Kilómetros al año</span>
                    </div>
                    <span className="text-xl font-bold text-foreground">{practicalExample.kmPerYear.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-foreground">Reserva flexible</span>
                    </div>
                    <span className="text-sm font-medium text-primary">Calendario digital 24/7</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-background/50 rounded-xl">
                  <p className="text-sm text-muted-foreground text-center">
                    Con 2 participaciones, disfrutas <strong className="text-foreground">60 días al año</strong> de un {practicalExample.vehicle} por solo <strong className="text-primary">€{practicalExample.yourInvestment.toLocaleString()}</strong> de inversión inicial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Summary */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Resumen de <span className="text-primary">Ventajas</span>
              </h2>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  En resumen: el <strong className="text-foreground">servicio, vacante, la a veces enorme pérdida de valor, cuidado, mantenimiento, almacenamiento, seguro y conservación</strong> se comparten con los demás copropietarios del supercar.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="text-center p-6 bg-primary/5 rounded-2xl border border-primary/20">
                    <div className="text-4xl font-bold text-primary mb-2">5-10x</div>
                    <p className="text-sm text-muted-foreground">Menos costes anuales</p>
                  </div>
                  <div className="text-center p-6 bg-primary/5 rounded-2xl border border-primary/20">
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <p className="text-sm text-muted-foreground">Recuperación de inversión al vender</p>
                  </div>
                  <div className="text-center p-6 bg-primary/5 rounded-2xl border border-primary/20">
                    <div className="text-4xl font-bold text-primary mb-2">0</div>
                    <p className="text-sm text-muted-foreground">Riesgos de depreciación total</p>
                  </div>
                </div>

                <p className="text-lg text-foreground leading-relaxed font-medium text-center">
                  Con nuestra solución garantizamos lo óptimo: <span className="text-primary">solo puedes ganar con nosotros.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 via-card to-accent/10 rounded-3xl border border-border/50 p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Listo para <span className="text-primary">Unirte</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explora nuestra flota exclusiva y elige el supercar de tus sueños. 
              Tu aventura en la copropiedad de lujo comienza aquí.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/portfolio">
                  Ver Ofertas
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/quienes-somos">
                  Conocer Más
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

export default NuestroModelo;
