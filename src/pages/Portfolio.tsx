import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              Our <span className="text-foreground">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our exclusive collection of the world's most prestigious supercars
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
