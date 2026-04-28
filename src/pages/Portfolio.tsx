import { useSearchParams, Link } from "react-router-dom";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { useCars } from "@/hooks/useCars";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
  const { data: cars = [], isLoading } = useCars();
  const [searchParams] = useSearchParams();
  const cityFilter = searchParams.get("city");

  const filteredCars = cityFilter
    ? cars.filter((car) =>
        car.availableIn?.some(
          (c) => c.toLowerCase() === cityFilter.toLowerCase()
        )
      )
    : cars;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-foreground">
              {cityFilter ? (
                <>
                  Supercoches en{" "}
                  <span className="text-champagne">{cityFilter}</span>
                </>
              ) : (
                <>
                  Nuestra <span className="text-foreground">Gama</span>
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {cityFilter
                ? `Descubre los supercoches disponibles para co-sharing en ${cityFilter}`
                : "Explora nuestra colección exclusiva de los supercoches más prestigiosos del mundo"}
            </p>

            {cityFilter && (
              <div className="mt-6 flex justify-center">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Link to="/portfolio">
                    <X className="h-4 w-4" />
                    Ver toda la gama
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[400px] rounded-xl" />
              ))}
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-6">
                {cityFilter
                  ? `No hay vehículos disponibles actualmente en ${cityFilter}.`
                  : "No hay vehículos disponibles."}
              </p>
              {cityFilter && (
                <Button asChild className="bg-champagne hover:bg-champagne/90 text-champagne-foreground">
                  <Link to="/portfolio">Ver toda la gama</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {filteredCars.map((car) => (
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

export default Portfolio;
