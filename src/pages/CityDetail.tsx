import { useParams, Link, Navigate } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCars } from "@/hooks/useCars";
import { useLocations } from "@/hooks/useLocations";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const CityDetail = () => {
  const { slug = "" } = useParams();
  const { data: cities = [], isLoading: citiesLoading } = useLocations();
  const { data: cars = [], isLoading: carsLoading } = useCars();

  if (citiesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
          <div className="container mx-auto">
            <Skeleton className="h-[280px] sm:h-[400px] w-full rounded-xl mb-10" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[400px] rounded-xl" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const city = cities.find((c) => slugify(c.name) === slug.toLowerCase());

  if (!city) {
    return <Navigate to="/cities" replace />;
  }

  const cityCars = cars.filter((car) =>
    car.availableIn?.some((c) => c.toLowerCase() === city.name.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
        <div className="container mx-auto">
          {/* Hero de la ciudad */}
          <div className="relative h-[280px] sm:h-[400px] rounded-xl overflow-hidden mb-10 sm:mb-12">
            <img
              src={city.image}
              alt={`Supercoches en ${city.name}`}
              className="w-full h-full object-cover animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-champagne" />
                <span className="text-sm uppercase tracking-widest text-champagne">
                  Ubicación Premium
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-3">
                {city.name}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                {city.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {cityCars.length === 0
                ? "Sin vehículos disponibles"
                : `${cityCars.length} ${cityCars.length === 1 ? "vehículo disponible" : "vehículos disponibles"}`}
            </h2>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Link to="/cities">
                <ArrowLeft className="h-4 w-4" />
                Todas las ubicaciones
              </Link>
            </Button>
          </div>

          {carsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[400px] rounded-xl" />
              ))}
            </div>
          ) : cityCars.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-6">
                No hay vehículos disponibles actualmente en {city.name}.
              </p>
              <Button
                asChild
                className="bg-champagne hover:bg-champagne/90 text-champagne-foreground"
              >
                <Link to="/portfolio">Ver toda la gama</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {cityCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CityDetail;
