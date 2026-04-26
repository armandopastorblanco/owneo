import { Link } from "react-router-dom";
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

  const getCarsCountForCity = (cityName: string) => {
    return cars.filter((car) => car.availableIn.includes(cityName)).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-foreground">
              Ubicaciones <span className="text-foreground">Premium</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
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
                    className="group relative h-[360px] sm:h-[450px] rounded-xl overflow-hidden border border-border"
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
                        <MapPin className="w-5 h-5 text-foreground" />
                        <h2 className="text-2xl font-bold text-foreground">{city.name}</h2>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {city.description}
                      </p>
                      <Link to={`/portfolio?city=${encodeURIComponent(city.name)}`}>
                        <Button className="w-full group/btn bg-champagne text-champagne-foreground hover:bg-champagne/90">
                          <span>Explore {carsCount} Vehicles</span>
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
