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
      title: "Conviértete en Co-sharer",
      description: "Únete a nuestro exclusivo club de miembros. Buscamos grupos de 3 a 10 co-sharers para cada supercar. Explora nuestra flota y envía tu solicitud de co-sharing para el vehículo deseado."
    },
    {
      number: "02",
      icon: PiggyBank,
      title: "Financia el Vehículo",
      description: "Una vez alcanzado el número de co-sharers, adquirimos el vehículo de concesionarios oficiales certificados. Cada co-sharer invierte según su participación deseada."
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
      title: "Venta a 5 Años",
      description: "Recupera hasta el 70% de tu inversión inicial. Al cabo de 5 años, vendemos el vehículo y distribuimos el valor entre los co-sharers según sus participaciones."
    }
  ];

  const securityFeatures = [
    { icon: Car, title: "Vehículos Verificados", description: "Inspección técnica completa" },
    { icon: BadgeCheck, title: "Miembros Verificados", description: "Proceso de verificación riguroso" },
    { icon: Lock, title: "Datos Encriptados", description: "Máxima seguridad digital" },
    { icon: Wrench, title: "Garantía del Vehículo", description: "Cobertura completa incluida" },
    { icon: FileCheck, title: "Costes Transparentes", description: "Sin sorpresas ni costes ocultos" },
    { icon: Repeat, title: "Venta a 5 Años", description: "Recupera hasta el 70% de tu inversión" }
  ];

  const comparisonData = {
    vehiclePrice: 250000,
    shares: 10,
    sharePrice: 25000,
    resaleValue: {
      individual: 175000, // 70% del valor original
      cosharing: 17500 // 70% de la participación
    },
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
        insurance: 500,
        maintenance: 800,
        storage: 360,
        depreciation: 2500,
        registration: 120,
        cleaning: 120,
        total: 4400
      }
    },
    usage: {
      daysPerShare: 36,
      kmPerShare: 2500
    }
  };

  const practicalExample = {
    vehicle: "Porsche 911 Turbo S",
    totalShares: 10,
    yourShares: 1,
    daysPerYear: 36,
    kmPerYear: 2500,
    pricePerShare: 25000,
    yourInvestment: 25000,
    resaleValue: 17500
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-champagne/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-champagne/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-champagne/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-champagne/10 text-champagne rounded-full text-xs sm:text-sm font-medium mb-6">
              Co-sharing con Respaldo de Activos
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Nuestro <span className="text-champagne">Modelo</span>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              "La co-sharing con respaldo de activos es <strong className="text-foreground">la forma más eficiente de poseer un supercar</strong> hoy en día."
            </p>
          </div>
        </div>
      </section>

      {/* Video/Intro Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Cómo Funciona la <span className="text-champagne">Co-sharing</span>: Explicado en 3 Minutos
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              En esta página encontrarás todo sobre el proceso de co-sharing, desde la solicitud de visualización hasta tu primera conducción como co-sharer.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {processSteps.map((step, index) => (
                <a 
                  key={index}
                  href={`#step-${index + 1}`}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-muted-foreground hover:text-champagne hover:border-champagne transition-all"
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
                className="scroll-mt-24 bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8 md:p-12 hover:border-champagne/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-champagne/10 rounded-2xl flex items-center justify-center relative">
                      <step.icon className="w-10 h-10 text-champagne" />
                      <span className="absolute -top-3 -left-3 w-8 h-8 bg-champagne text-champagne-foreground rounded-full flex items-center justify-center font-bold text-sm">
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
            <span className="inline-block px-4 py-2 bg-champagne/10 text-champagne rounded-full text-sm font-medium mb-4">
              Protección del Comprador
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nuestros Servicios de <span className="text-champagne">Seguridad</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-4 text-center hover:border-champagne/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-champagne/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-6 h-6 text-champagne" />
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
              <span className="inline-block px-4 py-2 bg-champagne/10 text-champagne rounded-full text-sm font-medium mb-4">
                <Calculator className="w-4 h-4 inline-block mr-2" />
                Comparativa de Costes
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Compra Individual <span className="text-champagne">VS</span> OWNEO Co-Sharing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Análisis transparente de los ahorros al utilizar nuestro sistema de co-sharing comparado con la compra convencional
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
                <div className="p-6 bg-champagne/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-5 h-5 text-champagne" />
                    <h4 className="text-lg font-bold text-champagne">OWNEO Co-Sharing</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">10 co-sharers (1 participación)</p>
                </div>
              </div>

              {/* Cost Rows */}
              <div className="divide-y divide-border">
                {/* Initial Cost Row */}
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border bg-champagne/5">
                  <div className="p-4 flex items-center">
                    <span className="text-sm font-bold text-foreground">💰 Coste inicial de compra</span>
                  </div>
                  <div className="p-4 bg-muted/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-foreground">€{comparisonData.vehiclePrice.toLocaleString()}</span>
                  </div>
                  <div className="p-4 bg-champagne/5 flex items-center justify-center">
                    <span className="text-lg font-bold text-champagne">€{comparisonData.sharePrice.toLocaleString()}</span>
                  </div>
                </div>

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
                    <div className="p-4 bg-champagne/5 flex items-center justify-center">
                      <span className="text-lg font-semibold text-champagne">€{row.cosharing.toLocaleString()}</span>
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
                  <div className="p-6 bg-champagne/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-champagne">€{comparisonData.annualCosts.cosharing.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Resale Value Row */}
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border bg-green-500/5">
                  <div className="p-4 flex items-center">
                    <span className="text-sm font-bold text-foreground">🔄 Precio de reventa (5 años)</span>
                  </div>
                  <div className="p-4 bg-muted/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-green-600">+€{comparisonData.resaleValue.individual.toLocaleString()}</span>
                  </div>
                  <div className="p-4 bg-champagne/5 flex items-center justify-center">
                    <span className="text-lg font-bold text-green-600">+€{comparisonData.resaleValue.cosharing.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Highlight */}
            <div className="bg-gradient-to-r from-champagne/10 via-champagne/5 to-champagne/10 rounded-3xl border border-champagne/20 p-8 text-center">
              <Percent className="w-12 h-12 text-champagne mx-auto mb-4" />
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Ahorro del <span className="text-champagne">80%</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                En costes anuales con OWNEO Co-Sharing
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-champagne" />
                  <span className="text-foreground">€{(comparisonData.annualCosts.individual.total - comparisonData.annualCosts.cosharing.total).toLocaleString()} de ahorro anual</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-champagne" />
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
              <span className="inline-block px-4 py-2 bg-champagne/10 text-champagne rounded-full text-sm font-medium mb-4">
                Caso Práctico
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ejemplo de <span className="text-champagne">Uso Real</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Así funcionaría tu experiencia como co-sharer
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vehicle Card */}
              <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-champagne/10 rounded-2xl flex items-center justify-center">
                    <Car className="w-8 h-8 text-champagne" />
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
                    <span className="text-lg font-semibold text-champagne">€{practicalExample.pricePerShare.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Your Ownership */}
              <div className="bg-gradient-to-br from-champagne/10 via-card to-champagne/10 rounded-3xl border border-champagne/20 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-champagne rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-champagne-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Tu Co-sharing</h3>
                    <p className="text-champagne font-medium">1 participación adquirida</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <div className="flex items-center gap-2">
                      <PiggyBank className="w-4 h-4 text-champagne" />
                      <span className="text-foreground">Tu inversión</span>
                    </div>
                    <span className="text-xl font-bold text-champagne">€{practicalExample.yourInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-champagne" />
                      <span className="text-foreground">Días de uso al año</span>
                    </div>
                    <span className="text-xl font-bold text-foreground">{practicalExample.daysPerYear} días</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-champagne" />
                      <span className="text-foreground">Kilómetros al año</span>
                    </div>
                    <span className="text-xl font-bold text-foreground">{practicalExample.kmPerYear.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-champagne" />
                      <span className="text-foreground">Reserva flexible</span>
                    </div>
                    <span className="text-sm font-medium text-champagne">Calendario digital 24/7</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-foreground">Recuperas al vender</span>
                    </div>
                    <span className="text-xl font-bold text-green-600">€{practicalExample.resaleValue.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-background/50 rounded-xl">
                  <p className="text-sm text-muted-foreground text-center">
                    Con 1 participación, disfrutas <strong className="text-foreground">{practicalExample.daysPerYear} días al año</strong> de un {practicalExample.vehicle} por solo <strong className="text-champagne">€{practicalExample.yourInvestment.toLocaleString()}</strong> y <strong className="text-green-600">recuperas hasta €{practicalExample.resaleValue.toLocaleString()}</strong> al cabo de 5 años.
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
                Resumen de <span className="text-champagne">Ventajas</span>
              </h2>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  En resumen: el <strong className="text-foreground">servicio, vacante, la a veces enorme pérdida de valor, cuidado, mantenimiento, almacenamiento, seguro y conservación</strong> se comparten con los demás co-sharers del supercar.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="text-center p-6 bg-champagne/5 rounded-2xl border border-champagne/20">
                    <div className="text-4xl font-bold text-champagne mb-2">5-10x</div>
                    <p className="text-sm text-muted-foreground">Menos costes anuales</p>
                  </div>
                  <div className="text-center p-6 bg-champagne/5 rounded-2xl border border-champagne/20">
                    <div className="text-4xl font-bold text-champagne mb-2">100%</div>
                    <p className="text-sm text-muted-foreground">Recuperación de inversión al vender</p>
                  </div>
                  <div className="text-center p-6 bg-champagne/5 rounded-2xl border border-champagne/20">
                    <div className="text-4xl font-bold text-champagne mb-2">0</div>
                    <p className="text-sm text-muted-foreground">Riesgos de depreciación total</p>
                  </div>
                </div>

                <p className="text-lg text-foreground leading-relaxed font-medium text-center">
                  Con nuestra solución garantizamos lo óptimo: <span className="text-champagne">solo puedes ganar con nosotros.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-champagne/10 via-card to-champagne/10 rounded-3xl border border-border/50 p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Listo para <span className="text-champagne">Unirte</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explora nuestra flota exclusiva y elige el supercar de tus sueños. 
              Tu aventura en la co-sharing de lujo comienza aquí.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 bg-champagne text-champagne-foreground hover:bg-champagne/90">
                <Link to="/portfolio">
                  Ver Ofertas
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 border-champagne/30 hover:bg-champagne/10">
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