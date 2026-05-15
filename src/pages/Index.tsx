import { Link } from "react-router-dom";
import { ArrowRight, Star, MapPin, Percent, CalendarDays, Users, TrendingUp, Clock, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import HeroSlider from "@/components/HeroSlider";
import PressSection from "@/components/PressSection";
import { useCars } from "@/hooks/useCars";
import { useLocations } from "@/hooks/useLocations";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: cars = [], isLoading: carsLoading } = useCars();
  const { data: cities = [] } = useLocations();
  const { trackEvent } = useAnalytics();
  const featuredCars = cars.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Nuestro Modelo */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center">
            <span className="inline-block text-xs uppercase tracking-widest text-muted-foreground border border-border rounded-full px-4 py-1 mb-6">
              Nuestro modelo
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              El lujo que se comparte
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Una marca que redefine el acceso a los coches de alta gama a trav&eacute;s de la multipropiedad: un modelo eficiente, moderno y aspiracional, alineado con la nueva manera de entender la movilidad.
            </p>
          </div>

          {/* 3 M&eacute;tricas */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-background rounded-2xl p-8 border border-border/50 text-center hover:border-foreground/30 transition-all duration-300">
              <Percent className="w-8 h-8 text-foreground mb-4 mx-auto" />
              <div className="text-5xl font-bold text-foreground mb-2">10%</div>
              <div className="font-semibold text-foreground mb-2">Del valor del veh&iacute;culo</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tu participaci&oacute;n, calculada sobre el precio de mercado. Sin letra peque&ntilde;a, sin sorpresas.
              </p>
            </div>
            <div className="bg-background rounded-2xl p-8 border border-border/50 text-center hover:border-foreground/30 transition-all duration-300">
              <CalendarDays className="w-8 h-8 text-foreground mb-4 mx-auto" />
              <div className="text-5xl font-bold text-foreground mb-2">28 d&iacute;as</div>
              <div className="font-semibold text-foreground mb-2">Garantizados al a&ntilde;o</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cuatro semanas al volante del coche de tus sue&ntilde;os. Cuando quieras, donde quieras.
              </p>
            </div>
            <div className="bg-background rounded-2xl p-8 border border-border/50 text-center hover:border-foreground/30 transition-all duration-300">
              <Users className="w-8 h-8 text-foreground mb-4 mx-auto" />
              <div className="text-5xl font-bold text-foreground mb-2">&divide;10</div>
              <div className="font-semibold text-foreground mb-2">Los gastos compartidos</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Seguro, mantenimiento y garaje se dividen entre los 10 socios. El lujo real est&aacute; en compartir los costes, no en eliminarlos.
              </p>
            </div>
          </div>

          {/* Comparativa Ferrari Roma */}
          <div className="mt-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-center">
              El mismo coche. Una decisi&oacute;n diferente.
            </h3>
            <p className="text-muted-foreground text-center mb-10 text-sm uppercase tracking-widest">
              Ferrari Roma &middot; 28 d&iacute;as al a&ntilde;o
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Comprarlo */}
              <div className="rounded-2xl p-6 border border-red-500/20 bg-red-500/5 text-center">
                <span className="text-xs text-red-400 border border-red-500/30 rounded-full px-3 py-1 mb-4 inline-block">
                  Opci&oacute;n tradicional
                </span>
                <TrendingUp className="w-6 h-6 text-red-400 mb-3 mx-auto" />
                <div className="text-3xl font-bold text-foreground mb-1">~330.000&euro;</div>
                <div className="text-sm text-muted-foreground mb-4">+ ~25.000&euro;/a&ntilde;o en gastos</div>
                <ul className="space-y-2 text-left inline-block">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <X className="w-4 h-4 text-red-400 shrink-0" /> Seguro a tu cargo
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <X className="w-4 h-4 text-red-400 shrink-0" /> Mantenimiento a tu cargo
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <X className="w-4 h-4 text-red-400 shrink-0" /> Depreciaci&oacute;n inmediata
                  </li>
                </ul>
              </div>
              {/* Alquilarlo */}
              <div className="rounded-2xl p-6 border border-yellow-500/20 bg-yellow-500/5 text-center">
                <span className="text-xs text-yellow-400 border border-yellow-500/30 rounded-full px-3 py-1 mb-4 inline-block">
                  Alquiler cl&aacute;sico
                </span>
                <Clock className="w-6 h-6 text-yellow-400 mb-3 mx-auto" />
                <div className="text-3xl font-bold text-foreground mb-1">~36.000&euro;</div>
                <div className="text-sm text-muted-foreground mb-4">por 28 d&iacute;as &middot; cada a&ntilde;o</div>
                <ul className="space-y-2 text-left inline-block">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <X className="w-4 h-4 text-yellow-400 shrink-0" /> Sin propiedad ni v&iacute;nculo
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <X className="w-4 h-4 text-yellow-400 shrink-0" /> Precio variable seg&uacute;n demanda
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <X className="w-4 h-4 text-yellow-400 shrink-0" /> Sin continuidad garantizada
                  </li>
                </ul>
              </div>
              {/* OWNEO */}
              <div className="rounded-2xl p-6 border border-foreground/40 bg-foreground/5 text-center ring-1 ring-foreground/20">
                <span className="text-xs text-foreground border border-foreground/40 rounded-full px-3 py-1 mb-4 inline-block font-semibold">
                  Modelo OWNEO
                </span>
                <Star className="w-6 h-6 text-foreground mb-3 mx-auto" />
                <div className="text-3xl font-bold text-foreground mb-1">~33.000&euro;</div>
                <div className="text-sm text-muted-foreground mb-4">una sola vez &middot; todo gestionado</div>
                <ul className="space-y-2 text-left inline-block">
                  <li className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-green-400 shrink-0" /> Seguro, garaje y mantenimiento &divide;10
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-green-400 shrink-0" /> 28 d&iacute;as garantizados cada a&ntilde;o
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-green-400 shrink-0" /> Acceso a toda la flota OWNEO
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-muted-foreground text-sm italic text-center mt-8">
              Los mismos 28 d&iacute;as al volante de un Ferrari Roma. Una decisi&oacute;n diferente.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <Link to="/nuestro-modelo">
              <Button
                size="lg"
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background"
                onClick={() => trackEvent("click_cta_modele", {
                  cta_text: "DESCUBRIR EL MODELO",
                  destination: "/nuestro-modelo",
                })}
              >
                DESCUBRIR EL MODELO
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-4">
              Sin compromiso. Sin permanencia. Solo experiencia.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Colección Destacada
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Obras maestras seleccionadas de los fabricantes más prestigiosos del mundo
            </p>
          </div>

          {carsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[350px] rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/coches">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-foreground text-foreground hover:bg-foreground hover:text-background"
                onClick={() => trackEvent("click_ver_todos_vehiculos", {
                  section: "featured_collection",
                })}
              >
                VER TODOS LOS VEHÍCULOS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Locations Showcase */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Nuestras Ubicaciones
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestra flota en las ciudades más exclusivas de España
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.slice(0, 4).map((city) => (
              <Link
                key={city.id}
                to="/ubicaciones"
                className="group relative overflow-hidden rounded-lg aspect-[4/3] hover-lift"
                onClick={() => trackEvent("click_city_card", {
                  city_name: city.name,
                })}
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-foreground" />
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">
                      España
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    {city.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {city.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/ubicaciones">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-foreground text-foreground hover:bg-foreground hover:text-background"
                onClick={() => trackEvent("click_ver_ubicaciones", {})}
              >
                VER TODAS LAS UBICACIONES
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-card border-y border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-10 sm:gap-12 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                15+
              </div>
              <div className="text-muted-foreground">Supercoches de Lujo</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                5
              </div>
              <div className="text-muted-foreground">Ubicaciones Premium</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                100%
              </div>
              <div className="text-muted-foreground">Excelencia Garantizada</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Storytelling Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground">
              El Lujo de los Supercoches, Ahora Accesible
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              En OWNEO revolucionamos el concepto de{" "}
              <strong className="text-foreground">
                alquiler de supercoches de lujo
              </strong>{" "}
              en España, haciendo realidad el sueño de conducir los vehículos más exclusivos del mundo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <article className="group bg-card/30 rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-foreground/20 transition-all duration-300 hover:bg-card/50">
              <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Las Marcas Más Prestigiosas del Mundo
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nuestra flota exclusiva incluye los{" "}
                <strong className="text-foreground">superdeportivos Ferrari</strong> más codiciados, desde el icónico Ferrari Portofino hasta el impresionante F8 Tributo. Experimenta la potencia de un
                <strong className="text-foreground"> Lamborghini Huracán</strong> o el rugido del legendario Aventador. Para los amantes de la ingeniería alemana, ofrecemos la gama completa de{" "}
                <strong className="text-foreground">Porsche</strong>: el 911 Turbo S, el Taycan eléctrico y los SUV deportivos Cayenne y Macan.
              </p>
              <Link
                to="/coches"
                className="inline-flex items-center text-foreground font-medium hover:gap-3 gap-2 transition-all duration-300 group-hover:underline"
              >
                Ver más <ArrowRight className="w-4 h-4" />
              </Link>
            </article>

            <article className="group bg-card/30 rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-foreground/20 transition-all duration-300 hover:bg-card/50">
              <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Elegancia Británica y Exclusividad
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Descubre el refinamiento del{" "}
                <strong className="text-foreground">Aston Martin DB11</strong>, la innovación aerodinámica del{" "}
                <strong className="text-foreground">McLaren 720S</strong>, o el lujo supremo del{" "}
                <strong className="text-foreground">Rolls-Royce Wraith</strong>. Completa tu experiencia con la artesanía del{" "}
                <strong className="text-foreground">Bentley Continental GT</strong> o la potencia del{" "}
                <strong className="text-foreground">Mercedes-AMG GT R</strong>, conocido como "La Bestia del Infierno Verde".
              </p>
              <Link
                to="/coches"
                className="inline-flex items-center text-foreground font-medium hover:gap-3 gap-2 transition-all duration-300 group-hover:underline"
              >
                Ver más <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          </div>

          <div className="bg-gradient-to-br from-card/80 to-card/40 rounded-3xl p-6 sm:p-8 md:p-12 border border-border/50 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-foreground/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                Supercar Sharing: La Nueva Era del Lujo Compartido
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                El <strong className="text-foreground">supercar sharing</strong> representa la evolución del acceso al lujo automovilístico. Ya no es necesario invertir cientos de miles de euros para disfrutar de un{" "}
                <strong className="text-foreground">coche de alta gama</strong>. Con OWNEO, accede a una{" "}
                <strong className="text-foreground">flota de supercoches premium</strong> en las mejores ubicaciones de España: Barcelona, Madrid, Marbella, Valencia, Ibiza y Alicante.
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
                <Link
                  to="/ubicaciones"
                  className="inline-flex items-center text-foreground font-medium hover:gap-3 gap-2 transition-all duration-300 hover:underline"
                >
                  Ver ubicaciones <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Press Section */}
          <PressSection standalone={false} />

          <div className="bg-card/30 rounded-2xl p-6 sm:p-8 border border-border/50 text-center mt-12">
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6">
              Desde el{" "}
              <strong className="text-foreground">alquiler de Ferrari en Barcelona</strong> hasta un{" "}
              <strong className="text-foreground"> Lamborghini en Marbella</strong>, OWNEO te ofrece la oportunidad de vivir experiencias únicas al volante de los{" "}
              <strong className="text-foreground">mejores supercoches del mundo</strong>. Descubre por qué somos líderes en{" "}
              <strong className="text-foreground">luxury car rental</strong> y{" "}
              <strong className="text-foreground"> supercar experiences</strong> en España.
            </p>
            <Link
              to="/coches"
              className="inline-flex items-center text-foreground font-medium hover:gap-3 gap-2 transition-all duration-300 hover:underline"
            >
              Explorar colección completa <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
