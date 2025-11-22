import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cities, cars } from "@/data/cars";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const Cities = () => {
  const getCarsForCity = (cityName: string) => {
    return cars.filter(car => car.availableIn.includes(cityName));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              Premium <span className="text-primary">Locations</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our exclusive showrooms across Spain's most prestigious cities
            </p>
          </div>

          <div className="space-y-12">
            {cities.map((city) => {
              const availableCars = getCarsForCity(city.name);
              
              return (
                <div key={city.id} className="border border-border rounded-lg p-8 bg-card">
                  <div className="flex items-start gap-4 mb-6">
                    <MapPin className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-3xl font-bold mb-2 text-foreground">{city.name}</h2>
                      <p className="text-muted-foreground">{city.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-4 text-foreground">
                      Available Vehicles ({availableCars.length})
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableCars.map((car) => (
                        <Link key={car.id} to={`/car/${car.id}`}>
                          <Card className="hover-lift cursor-pointer bg-background border-border">
                            <CardContent className="p-4">
                              <div className="aspect-[16/10] mb-3 overflow-hidden rounded-md bg-muted">
                                <img
                                  src={car.image}
                                  alt={car.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h4 className="font-semibold text-foreground mb-1">{car.name}</h4>
                              <p className="text-sm text-muted-foreground">{car.category}</p>
                              <p className="text-lg font-bold text-primary mt-2">{car.price}</p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
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
