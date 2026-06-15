import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCars } from "@/hooks/useCars";
import { useLocations } from "@/hooks/useLocations";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Cities = () => {
  const { data: cities = [], isLoading: citiesLoading } = useLocations();
  const { data: cars = [] } = useCars();

  // Compte basé sur la ville réelle du véhicule (location_id -> cityName),
  // plus sur available_in qui n'est plus alimenté.
  const getCarsCountForCity = (cityName: string) => {
    return cars.filter((car) => car.cityName === cityName).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Ubicaciones — Tu Supercoche cerca de ti | Owneo</title>
        <meta name="description" content="Owneo opera en las principales ciudades de España. Encuentra tu Ferrari, Lamborghini o Porsche compartido cerca de ti." />
        <link rel="canonical" href="https://www.owneo.es/ubicaciones" />
        <meta property="og:title" content="Ubicaciones | Owneo" />
        <meta property="og:description" content="Owneo opera en las principales ciudades de España. Encuentra tu Ferrari, Lamborghini o Porsche compartido cerca de ti." />
        <meta property="og:url" content="https://www.owneo.es/ubicaciones" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Owneo" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@owneo" />
      </Helmet>
      <Navbar />

      <main className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
            <h1 className="ds-h1 mb-6">
              Ubicaciones <span className="text-champagne">Premium</span>
            </h1>
            <p className="ds-lead">
              Descubre nuestros showrooms exclusivos en las ciudades más prestigiosas de España
            </p>
          </div>

          {citiesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[450px] rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => {
                const carsCount = getCarsCountForCity(city.name);

                return (
                  <div
                    key={city.id}
                    className="group relative h-[360px] sm:h-[450px] rounded-xl overflow-hidden border border-border transition-all duration-500 hover:border-champagne/60 hover:shadow-[0_20px_60px_-15px_hsl(var(--champagne)/0.4)]"
                  >
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src={city.image}
                        alt={`Luxury car in ${city.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-champagne" />
                        <h2 className="ds-card-title text-foreground">{city.name}</h2>
                      </div>
                      <p className="ds-body mb-4 line-clamp-2">
                        {city.description}
                      </p>
                      <Link to={city.slug ? `/ubicaciones/${city.slug}` : `/cities/${city.id}`}>
                        <Button className="w-full group/btn bg-champagne text-champagne-foreground hover:bg-champagne/90">
                          <span>Explorar {carsCount} {carsCount === 1 ? "vehículo" : "vehículos"}</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cities;
