import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cars } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, CheckCircle2, Users, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ParticipationForm from "@/components/ParticipationForm";
import Car360Viewer from "@/components/Car360Viewer";

const specLabels: Record<string, string> = {
  engine: "Motor",
  power: "Potencia",
  torque: "Par Motor",
  acceleration: "Aceleración",
  topSpeed: "Velocidad Máxima",
  transmission: "Transmisión",
  drivetrain: "Tracción",
  weight: "Peso en Vacío",
  fuelType: "Combustible",
  displacement: "Cilindrada",
  cylinders: "Cilindros",
  valves: "Válvulas",
  compression: "Relación de Compresión",
  fuelSystem: "Sistema de Alimentación",
  emissionClass: "Normativa de Emisiones",
  co2Emissions: "Emisiones de CO₂",
  fuelConsumption: "Consumo Combinado",
  tankCapacity: "Capacidad del Depósito",
  brakes: "Frenos",
  tiresFront: "Neumáticos Delanteros",
  tiresRear: "Neumáticos Traseros",
  suspension: "Suspensión",
  length: "Longitud",
  width: "Anchura",
  height: "Altura",
  wheelbase: "Distancia entre Ejes",
  trunkCapacity: "Capacidad del Maletero",
  doors: "Puertas",
  seats: "Plazas",
  batteryCapacity: "Capacidad de Batería",
  range: "Autonomía",
  chargingTime: "Tiempo de Carga Rápida",
};

const CarDetail = () => {
  const { id } = useParams();
  const car = cars.find(c => c.id === id);

  // Generate a stable random number of available participations based on car id
  const availableParticipations = useMemo(() => {
    if (!id) return 5;
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 11; // 0 to 10
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Vehículo no encontrado</h1>
          <Link to="/portfolio">
            <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Volver al Portfolio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const numericPrice = parseInt(car.price.replace(/[^0-9]/g, ''));
  const sharePrice = Math.round(numericPrice * 0.1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <Link to="/portfolio" className="inline-flex items-center text-foreground hover:text-foreground/80 mb-8 transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Volver al Portfolio
          </Link>

          {/* Hero Image with Animation */}
          <div className="relative aspect-[21/9] overflow-hidden rounded-lg mb-8 bg-gradient-to-b from-muted to-background">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover animate-[subtle-zoom_20s_ease-in-out_infinite]"
            />
            {/* Available participations badge */}
            <div className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 bg-[hsl(var(--participation-available))] text-background">
              <Users className="w-4 h-4" />
              {availableParticipations}/10 participaciones disponibles
            </div>
          </div>

          {/* Car Info Header */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-4">
              <div>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {car.category}
                </span>
                <h1 className="text-5xl font-bold mt-2 mb-4 text-foreground">{car.name}</h1>
              </div>
              
              {/* Pricing Card with Tooltip */}
              <Card className="bg-card/50 border-border/50 md:min-w-[280px]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Cuota de participación</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs p-4">
                          <p className="font-semibold mb-2">¿Cómo funciona el co-sharing?</p>
                          <p className="text-sm text-muted-foreground">
                            La cuota de participación representa el 10% del valor total del vehículo. 
                            Como co-propietario, disfrutas de acceso exclusivo al vehículo según tu participación, 
                            compartiendo los costes de mantenimiento, seguro y almacenamiento con otros miembros.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-2">
                    {sharePrice.toLocaleString('es-ES')}€
                  </p>
                  <p className="text-lg text-muted-foreground line-through">
                    {car.price}
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    Valor total del vehículo
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Luxury Description */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">La Experiencia</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {car.luxuryDescription}
            </p>
          </section>

          {/* 360° Viewer - only for cars with gallery */}
          {car.gallery && car.gallery.length >= 6 && (
            <Car360Viewer carName={car.name} gallery={car.gallery} />
          )}

          {/* Image Gallery */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Galería</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {car.gallery ? (
                car.gallery.map((image, index) => (
                  <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-b from-muted to-background">
                    <img
                      src={image}
                      alt={`${car.name} vista ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))
              ) : (
                [1, 2, 3].map((i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-b from-muted to-background">
                    <img
                      src={car.image}
                      alt={`${car.name} vista ${i}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Specifications */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Especificaciones Técnicas</h2>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(car.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center border-b border-border pb-3">
                      <span className="text-muted-foreground">{specLabels[key] || key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-semibold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Características Premium</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-foreground flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison Section: Compra Individual VS OWNEO Co-Sharing */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Compra Individual VS OWNEO Co-Sharing</h2>
            <p className="text-muted-foreground mb-8">
              Descubre cómo el modelo de copropiedad OWNEO te permite disfrutar de este {car.name} con una inversión significativamente menor.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Concepto</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Compra Individual</th>
                    <th className="text-center py-4 px-4 font-medium text-champagne">OWNEO Co-Sharing</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Inversión Inicial</td>
                    <td className="py-4 px-4 text-center text-foreground">{car.price}</td>
                    <td className="py-4 px-4 text-center text-primary font-semibold">{sharePrice.toLocaleString('es-ES')}€</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Seguro Anual</td>
                    <td className="py-4 px-4 text-center text-foreground">~{Math.round(numericPrice * 0.03).toLocaleString('es-ES')}€</td>
                    <td className="py-4 px-4 text-center text-primary font-semibold">~{Math.round(numericPrice * 0.003).toLocaleString('es-ES')}€</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Mantenimiento Anual</td>
                    <td className="py-4 px-4 text-center text-foreground">~{Math.round(numericPrice * 0.02).toLocaleString('es-ES')}€</td>
                    <td className="py-4 px-4 text-center text-primary font-semibold">~{Math.round(numericPrice * 0.002).toLocaleString('es-ES')}€</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Almacenamiento Anual</td>
                    <td className="py-4 px-4 text-center text-foreground">~3.000€</td>
                    <td className="py-4 px-4 text-center text-primary font-semibold">~300€</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Depreciación (5 años)</td>
                    <td className="py-4 px-4 text-center text-foreground">~30-40%</td>
                    <td className="py-4 px-4 text-center text-primary font-semibold">Compartida entre copropietarios</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Días de Uso Estimados/Año</td>
                    <td className="py-4 px-4 text-center text-foreground">~50 días</td>
                    <td className="py-4 px-4 text-center text-primary font-semibold">~30 días</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Reventa a 5 Años</td>
                    <td className="py-4 px-4 text-center text-foreground">~{Math.round(numericPrice * 0.65).toLocaleString('es-ES')}€</td>
                    <td className="py-4 px-4 text-center text-primary font-semibold">Hasta 70% de tu inversión</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-foreground font-bold">Coste Real por Día de Uso</td>
                    <td className="py-4 px-4 text-center text-foreground font-bold">~{Math.round((numericPrice * 0.35 + numericPrice * 0.05 * 5) / (50 * 5)).toLocaleString('es-ES')}€/día</td>
                    <td className="py-4 px-4 text-center text-primary font-bold">~{Math.round((sharePrice * 0.3 + sharePrice * 0.005 * 5) / (30 * 5)).toLocaleString('es-ES')}€/día</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-center text-foreground">
                <span className="font-bold text-primary">Ahorra hasta un 80%</span> en costes anuales con OWNEO Co-Sharing, 
                disfrutando del {car.name} sin las cargas financieras de la propiedad exclusiva.
              </p>
            </div>
          </section>

          {/* Available Locations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Disponible En</h2>
            <div className="flex flex-wrap gap-3">
              {car.availableIn.map((city) => (
                <div key={city} className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full">
                  <MapPin className="w-4 h-4 text-foreground" />
                  <span className="text-foreground">{city}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-foreground/10 to-muted/10 border-foreground/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">¿Listo para ser copropietario de esta obra maestra?</h3>
              <p className="text-muted-foreground mb-6">Completa el formulario para solicitar tu participación</p>
              <ParticipationForm 
                carName={car.name} 
                availableParticipations={availableParticipations}
                sharePrice={sharePrice}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetail;
