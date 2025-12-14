import { Link } from "react-router-dom";
import { ArrowRight, Star, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { cars, cities } from "@/data/cars";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-showroom.jpg";
const Index = () => {
  const featuredCars = cars.slice(0, 4);
  return <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center animate-[subtle-zoom_20s_ease-in-out_infinite]" style={{
        backgroundImage: `url(${heroImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
            <Star className="text-foreground fill-foreground w-0 h-0" />
            <Star className="fill-foreground bg-primary text-primary-foreground w-0 h-0" />
            <Star className="text-foreground fill-foreground h-0 w-0" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            <span className="text-foreground">OWNEO</span>
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
              <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-6 text-lg font-semibold">
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
            {featuredCars.map(car => <CarCard key={car.id} car={car} />)}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
                VER TODOS LOS VEHÍCULOS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Locations Showcase */}
      <section className="py-20 px-6 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Nuestras Ubicaciones
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestra flota en las ciudades más exclusivas de España
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.slice(0, 4).map(city => <Link key={city.id} to="/cities" className="group relative overflow-hidden rounded-lg aspect-[4/3] hover-lift">
                <img src={city.image} alt={city.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-foreground" />
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">España</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{city.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{city.description}</p>
                </div>
              </Link>)}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/cities">
              <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
                VER TODAS LAS UBICACIONES
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

      {/* SEO Storytelling Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              El Lujo de los Supercoches, Ahora Accesible
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              En OWNEO revolucionamos el concepto de <strong className="text-foreground">alquiler de supercoches de lujo</strong> en España, 
              haciendo realidad el sueño de conducir los vehículos más exclusivos del mundo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <article className="group bg-card/30 rounded-2xl p-8 border border-border/50 hover:border-foreground/20 transition-all duration-300 hover:bg-card/50">
              <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Las Marcas Más Prestigiosas del Mundo
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nuestra flota exclusiva incluye los <strong className="text-foreground">superdeportivos Ferrari</strong> más codiciados, 
                desde el icónico Ferrari Portofino hasta el impresionante F8 Tributo. Experimenta la potencia de un 
                <strong className="text-foreground"> Lamborghini Huracán</strong> o el rugido del legendario Aventador. 
                Para los amantes de la ingeniería alemana, ofrecemos la gama completa de <strong className="text-foreground">Porsche</strong>: 
                el 911 Turbo S, el Taycan eléctrico y los SUV deportivos Cayenne y Macan.
              </p>
              <Link to="/portfolio" className="inline-flex items-center text-foreground font-medium hover:gap-3 gap-2 transition-all duration-300 group-hover:underline">
                Ver más <ArrowRight className="w-4 h-4" />
              </Link>
            </article>

            <article className="group bg-card/30 rounded-2xl p-8 border border-border/50 hover:border-foreground/20 transition-all duration-300 hover:bg-card/50">
              <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Elegancia Británica y Exclusividad
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Descubre el refinamiento del <strong className="text-foreground">Aston Martin DB11</strong>, 
                la innovación aerodinámica del <strong className="text-foreground">McLaren 720S</strong>, 
                o el lujo supremo del <strong className="text-foreground">Rolls-Royce Wraith</strong>. 
                Completa tu experiencia con la artesanía del <strong className="text-foreground">Bentley Continental GT</strong> 
                o la potencia del <strong className="text-foreground">Mercedes-AMG GT R</strong>, conocido como "La Bestia del Infierno Verde".
              </p>
              <Link to="/portfolio" className="inline-flex items-center text-foreground font-medium hover:gap-3 gap-2 transition-all duration-300 group-hover:underline">
                Ver más <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          </div>

          <div className="bg-gradient-to-br from-card/80 to-card/40 rounded-3xl p-8 md:p-12 border border-border/50 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-foreground/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                Supercar Sharing: La Nueva Era del Lujo Compartido
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                El <strong className="text-foreground">supercar sharing</strong> representa la evolución del acceso al lujo automovilístico. 
                Ya no es necesario invertir cientos de miles de euros para disfrutar de un <strong className="text-foreground">coche de alta gama</strong>. 
                Con OWNEO, accede a una <strong className="text-foreground">flota de supercoches premium</strong> en las mejores ubicaciones de España: 
                Barcelona, Madrid, Marbella, Valencia, Ibiza y Alicante.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-background/50 rounded-xl p-6 text-center border border-border/30">
                  <h4 className="font-bold text-foreground mb-2">Experiencia VIP</h4>
                  <p className="text-sm text-muted-foreground">
                    Servicio de concierge personalizado y entrega a domicilio en toda España
                  </p>
                </div>
                <div className="bg-background/50 rounded-xl p-6 text-center border border-border/30">
                  <h4 className="font-bold text-foreground mb-2">Flexibilidad Total</h4>
                  <p className="text-sm text-muted-foreground">
                    Alquiler por días o semanas, adaptado a tus necesidades de lujo
                  </p>
                </div>
                <div className="bg-background/50 rounded-xl p-6 text-center border border-border/30">
                  <h4 className="font-bold text-foreground mb-2">Calidad Garantizada</h4>
                  <p className="text-sm text-muted-foreground">
                    Vehículos impecables con mantenimiento premium y seguro completo
                  </p>
                </div>
              </div>
              <div className="text-center">
                <Link to="/cities" className="inline-flex items-center text-foreground font-medium hover:gap-3 gap-2 transition-all duration-300 hover:underline">
                  Ver ubicaciones <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-card/30 rounded-2xl p-8 border border-border/50 text-center">
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6">
              Desde el <strong className="text-foreground">alquiler de Ferrari en Barcelona</strong> hasta un 
              <strong className="text-foreground"> Lamborghini en Marbella</strong>, OWNEO te ofrece la oportunidad de vivir 
              experiencias únicas al volante de los <strong className="text-foreground">mejores supercoches del mundo</strong>. 
              Descubre por qué somos líderes en <strong className="text-foreground">luxury car rental</strong> y 
              <strong className="text-foreground"> supercar experiences</strong> en España.
            </p>
            <Link to="/portfolio" className="inline-flex items-center text-foreground font-medium hover:gap-3 gap-2 transition-all duration-300 hover:underline">
              Explorar colección completa <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;