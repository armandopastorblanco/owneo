import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cars } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, CheckCircle2 } from "lucide-react";

const CarDetail = () => {
  const { id } = useParams();
  const car = cars.find(c => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Car not found</h1>
          <Link to="/portfolio">
            <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <Link to="/portfolio" className="inline-flex items-center text-foreground hover:text-foreground/80 mb-8 transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Portfolio
          </Link>

          {/* Hero Image with Animation */}
          <div className="relative aspect-[21/9] overflow-hidden rounded-lg mb-8 bg-gradient-to-b from-muted to-background">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover animate-[subtle-zoom_20s_ease-in-out_infinite]"
            />
          </div>

          {/* Car Info Header */}
          <div className="mb-12">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {car.category}
                </span>
                <h1 className="text-5xl font-bold mt-2 mb-4 text-foreground">{car.name}</h1>
                <p className="text-2xl text-foreground font-bold">{car.price}</p>
              </div>
            </div>
          </div>

          {/* Luxury Description */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">The Experience</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {car.luxuryDescription}
            </p>
          </section>

          {/* Image Gallery */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Gallery</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {car.gallery ? (
                car.gallery.map((image, index) => (
                  <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-b from-muted to-background">
                    <img
                      src={image}
                      alt={`${car.name} view ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))
              ) : (
                [1, 2, 3].map((i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-b from-muted to-background">
                    <img
                      src={car.image}
                      alt={`${car.name} view ${i}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Specifications */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Technical Specifications</h2>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(car.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center border-b border-border pb-3">
                      <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-semibold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Premium Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-foreground flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Available Locations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Available At</h2>
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
              <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Experience This Masterpiece?</h3>
              <p className="text-muted-foreground mb-6">Contact us to schedule a private viewing</p>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                REQUEST CONSULTATION
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetail;
