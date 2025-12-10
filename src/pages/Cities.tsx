import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cities, cars } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";

const Cities = () => {
  const getCarsCountForCity = (cityName: string) => {
    return cars.filter(car => car.availableIn.includes(cityName)).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              Premium <span className="text-foreground">Locations</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our exclusive showrooms across Spain's most prestigious cities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => {
              const carsCount = getCarsCountForCity(city.name);
              
              return (
                <div 
                  key={city.id} 
                  className="group relative h-[450px] rounded-xl overflow-hidden border border-border"
                >
                  {/* City + Car Background Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                      src={city.image} 
                      alt={`Luxury car in ${city.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-foreground" />
                      <h2 className="text-2xl font-bold text-foreground">{city.name}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {city.description}
                    </p>
                    <Link to={`/portfolio?city=${encodeURIComponent(city.name)}`}>
                      <Button className="w-full group/btn">
                        <span>Explore {carsCount} Vehicles</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cities;
