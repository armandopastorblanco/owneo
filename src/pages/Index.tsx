import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-showroom.jpg";

const Index = () => {
  const featuredCars = cars.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-[subtle-zoom_20s_ease-in-out_infinite]"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
            <Star className="w-5 h-5 text-foreground fill-foreground" />
            <Star className="w-5 h-5 text-foreground fill-foreground" />
            <Star className="w-5 h-5 text-foreground fill-foreground" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            <span className="text-foreground">
              PRESTIGE
            </span>
            <br />
            <span className="text-foreground">MOTORS</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
            Vive lo extraordinario. Descubre la colección más exclusiva de supercoches de lujo en España.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link to="/portfolio">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-lg font-semibold">
                VER COLECCIÓN
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/cities">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-6 text-lg font-semibold"
              >
                EXPLORAR UBICACIONES
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Colección Destacada
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Obras maestras seleccionadas de los fabricantes más prestigiosos del mundo
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/portfolio">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-foreground text-foreground hover:bg-foreground hover:text-background"
              >
                VER TODOS LOS VEHÍCULOS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-card border-y border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-foreground mb-2">15+</div>
              <div className="text-muted-foreground">Supercoches de Lujo</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-foreground mb-2">5</div>
              <div className="text-muted-foreground">Ubicaciones Premium</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-foreground mb-2">100%</div>
              <div className="text-muted-foreground">Excelencia Garantizada</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
