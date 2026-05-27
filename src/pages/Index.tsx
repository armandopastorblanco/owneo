import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Star, MapPin, Percent, CalendarDays, Users, TrendingUp, Clock, Check, X, TrendingDown, Calculator } from "lucide-react";
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
  const featuredCars = cars
    .filter((c) => c.status !== "complete" && (c.remainingParticipations ?? 0) > 0)
    .slice(0, 4);

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
              <div className="text-5xl font-bold text-foreground mb-2 leading-none">4<div className="text-base font-semibold mt-1">Semanas</div></div>
              <div className="font-semibold text-foreground mb-2">Garantizadas al a&ntilde;o</div>
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
          <section className="py-24 px-4 sm:px-6 bg-background">
            <div className="max-w-5xl mx-auto">

              {/* Header émotionnel */}
              <div className="text-center mb-20">
                <span className="inline-block text-[10px] uppercase tracking-[0.35em] mb-6"
                  style={{color:"rgba(189,160,149,0.7)"}}>
                  Ejemplo real · Ferrari Roma
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
                  Llevas años mirando<br />ese Ferrari.
                  <span className="block mt-2" style={{color:"#bda095"}}>Ya es hora.</span>
                </h2>
                <div className="w-12 h-px mx-auto mb-8" style={{backgroundColor:"#bda095"}} />
                <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  No se trata de gastar menos. Se trata de tomar
                  la decisión más inteligente.
                </p>
              </div>

              {/* Choc financier — deux chiffres */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 items-stretch">

                {/* Compra tradicional */}
                <div className="bg-[#0d0d0d] border border-white/8 rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-muted-foreground border border-white/10 rounded-full px-4 py-1.5 mb-10">
                      Comprándolo
                    </span>
                    <div className="mb-8">
                      <p className="sm:text-6xl font-black text-foreground/40 leading-none mb-3 text-4xl">
                        ~240.500€
                      </p>
                      <p className="text-sm text-muted-foreground">
                        coste real en 5 años
                      </p>
                    </div>
                    <div className="space-y-3 border-t border-white/6 pt-6">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground/70">Precio de compra</span>
                        <span className="text-xs text-muted-foreground">330.000€</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground/70">Gastos 5 años</span>
                        <span className="text-xs text-muted-foreground">+ 125.000€</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground/70">Reventa estimada (65%)</span>
                        <span className="text-xs text-muted-foreground">− 214.500€</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/6 space-y-2.5">
                    {[
                      "Seguro y mantenimiento a tu cargo",
                      "Depreciación inmediata",
                      "Inmovilización de capital"
                    ].map(item => (
                      <div key={item} className="flex items-center gap-2.5">
                        <X className="w-3 h-3 flex-shrink-0" style={{color:"rgba(239,68,68,0.5)"}} />
                        <span className="text-xs text-muted-foreground/60">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* OWNEO */}
                <div
                  className="rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden"
                  style={{
                    backgroundColor:"#0d0d0d",
                    border:"1px solid rgba(189,160,149,0.4)",
                    boxShadow:"0 0 60px rgba(189,160,149,0.07), 0 0 120px rgba(189,160,149,0.03)"
                  }}>

                  {/* Badge */}
                  <div className="absolute top-0 right-0">
                    <div
                      className="text-[9px] font-black uppercase tracking-[0.25em] px-5 py-2 rounded-bl-2xl rounded-tr-2xl"
                      style={{backgroundColor:"#bda095", color:"#000000"}}>
                      La decisión inteligente
                    </div>
                  </div>

                  <div>
                    <span
                      className="inline-block text-[10px] uppercase tracking-[0.3em] border rounded-full px-4 py-1.5 mb-10"
                      style={{color:"#bda095", borderColor:"rgba(189,160,149,0.3)"}}>
                      Con OWNEO
                    </span>
                    <div className="mb-8">
                      <p className="sm:text-6xl font-black leading-none mb-3 text-4xl"
                        style={{color:"#bda095"}}>
                        ~26.400€
                      </p>
                      <p className="text-sm text-muted-foreground">
                        coste real en 5 años · todo gestionado
                      </p>
                    </div>
                    <div className="space-y-3 border-t pt-6"
                      style={{borderColor:"rgba(189,160,149,0.12)"}}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground/70">Participación única</span>
                        <span className="text-xs text-muted-foreground">33.000€</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground/70">Gestión 5 años</span>
                        <span className="text-xs text-muted-foreground">+ 16.500€</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground/70">Recuperas (reventa 70%)</span>
                        <span className="text-xs" style={{color:"rgba(134,239,172,0.8)"}}>− 23.100€</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t space-y-2.5"
                    style={{borderColor:"rgba(189,160,149,0.12)"}}>
                    {[
                      "Seguro, garaje y mantenimiento ×10",
                      "28 días garantizados al año",
                      "Hasta un 70% de tu inversión recuperada"
                    ].map(item => (
                      <div key={item} className="flex items-center gap-2.5">
                        <Check className="w-3 h-3 flex-shrink-0" style={{color:"#bda095"}} />
                        <span className="text-xs text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Révélation finale */}
              <div
                className="rounded-2xl px-8 py-10 text-center"
                style={{
                  backgroundColor:"rgba(189,160,149,0.04)",
                  border:"1px solid rgba(189,160,149,0.15)"
                }}>
                <p className="text-[10px] uppercase tracking-[0.35em] mb-4"
                  style={{color:"rgba(189,160,149,0.5)"}}>
                  La diferencia
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-3">
                  El mismo Ferrari Roma.
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6"
                  style={{color:"#bda095"}}>
                  214.100€ de diferencia.
                </p>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                  No es magia. Es una estructura de propiedad compartida
                  diseñada para los que entienden que el lujo inteligente
                  no tiene nada que envidiarle al lujo tradicional.
                </p>
                <Link to="/nuestro-modelo">
                  <button
                    className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] px-8 py-4 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor:"#bda095",
                      color:"#000000"
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(189,160,149,0.85)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#bda095";
                    }}>
                    Quiero conducirlo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <p className="text-xs mt-5" style={{color:"rgba(255,255,255,0.2)"}}>
                  Cálculo estimado · Ferrari Roma · 28 días al año · 5 años
                </p>
              </div>

            </div>
          </section>


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
                <CarCard key={car.id} car={car} pageSource="home" />
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
