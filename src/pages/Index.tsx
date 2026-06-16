import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Star, MapPin, Percent, CalendarDays, Users, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import PressSection from "@/components/PressSection";
import { useCars, useCarModels } from "@/hooks/useCars";
import { useLocations } from "@/hooks/useLocations";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ferrariRomaSpider from "@/assets/news/ferrari-roma-spider.jpg";
import ferrariRomaCockpit from "@/assets/news/ferrari-roma-cockpit.jpg";
import featureValueBg from "@/assets/model/feature-value.jpg";
import featureWeeksBg from "@/assets/model/feature-weeks.jpg";
import featureSharedBg from "@/assets/model/feature-shared.jpg";

const Index = () => {
  const { data: models = [], isLoading: carsLoading } = useCarModels();
  const { data: cities = [] } = useLocations();
  const { trackEvent } = useAnalytics();
  // Déduplication par modèle (mêmes règles que la Gama) :
  // on ne garde que les modèles avec des places restantes cumulées.
  const featuredCars = models
    .filter((m) => m.totalRemaining > 0)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Owneo — Comparte un Supercoche de Lujo en España</title>
        <meta name="description" content="Owneo — Accede a los supercoches más exclusivos de España. Comparte tu Ferrari, Lamborghini o Porsche, comparte los costes y vive la experiencia al 100%. Plazas limitadas." />
        <link rel="canonical" href="https://www.owneo.es/" />
        <meta property="og:title" content="Owneo — Comparte un Supercoche de Lujo en España" />
        <meta property="og:description" content="Accede a los supercoches más exclusivos de España. Comparte tu Ferrari, Lamborghini o Porsche y vive la experiencia al 100%." />
        <meta property="og:url" content="https://www.owneo.es/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Owneo" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@owneo" />
      </Helmet>
      <Navbar />

      {/* HERO VIDEO */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(40%) brightness(0.70)" }}
        >
          <source src="/ferrari-f430-hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

        {/* Contenu hero */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto mt-20 sm:mt-16">
            <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-6 sm:mb-8" />
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extralight text-white/90 tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-4">
              Vive lo
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-[0.1em] sm:tracking-[0.15em] uppercase mb-6 sm:mb-8">
              Extraordinario
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/50 font-extralight tracking-[0.05em] sm:tracking-[0.1em] max-w-xs sm:max-w-xl mx-auto mb-8 sm:mb-12">
              El lujo de los supercoches, ahora accesible
            </p>
            <Link to="/nuestro-modelo">
              <Button
                variant="ghost"
                size="lg"
                className="border border-white/20 text-white/80 hover:text-white hover:bg-white/5 hover:border-white/40 text-xs md:text-sm font-light tracking-[0.2em] px-10 py-6 group transition-all duration-500"
              >
                DESCUBRIR
                <ArrowRight className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NUESTRO MODELO */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <span className="ds-eyebrow-pill mb-6">Nuestro modelo</span>
            <h2 className="ds-h2 text-foreground mt-6 mb-6">
              El lujo que se comparte
            </h2>
            <p className="ds-lead max-w-3xl mx-auto">
              Una marca que redefine el acceso a los coches de alta gama a través de la multipropiedad: un modelo eficiente, moderno y aspiracional, alineado con la nueva manera de entender la movilidad.
            </p>
          </div>

          {/* 3 Métricas — cartes immersives (gabarit DS) */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 items-stretch">
            {/* Carte 1 */}
            <div className="group ds-card-feature animate-fade-in">
              <img src={featureValueBg} alt="" aria-hidden="true" loading="lazy" width={1280} height={800} className="ds-card-feature-img" />
              <div className="ds-card-feature-overlay" />
              <div className="ds-feature-body">
                <Percent className="ds-icon w-10 h-10 mb-4 transition-transform duration-500 group-hover:scale-110" />
                <div className="ds-feature-figure">
                  <span className="text-5xl font-extralight text-white leading-none">10%</span>
                </div>
                <h3 className="ds-card-title text-white mt-2 mb-2">Del valor del vehículo</h3>
                <p className="text-sm text-white/80 leading-relaxed min-h-[6rem]">
                  Tu participación, calculada sobre el precio de mercado. Sin letra pequeña, sin sorpresas.
                </p>
                <div className="ds-feature-note text-xs text-champagne">
                  ✓&nbsp;El 90% del tiempo un superdeportivo está aparcado. Tú solo pagas lo que disfrutas.&nbsp;
                </div>
              </div>
            </div>

            {/* Carte 2 */}
            <div className="group ds-card-feature animate-fade-in" style={{ animationDelay: "100ms" }}>
              <img src={featureWeeksBg} alt="" aria-hidden="true" loading="lazy" width={1280} height={800} className="ds-card-feature-img" />
              <div className="ds-card-feature-overlay" />
              <div className="absolute inset-0 bg-black/25" />
              <div className="ds-feature-body">
                <CalendarDays className="ds-icon w-10 h-10 mb-4 transition-transform duration-500 group-hover:scale-110" />
                <div className="ds-feature-figure">
                  <span className="text-5xl font-extralight text-white leading-none">4</span>
                  <span className="text-base font-normal text-white/80 mt-1">Semanas</span>
                </div>
                <h3 className="ds-card-title text-white mt-2 mb-2">Garantizadas al año</h3>
                <p className="text-sm text-white/80 leading-relaxed min-h-[6rem]">
                  3 semanas estándar · 1 semana premium al volante del coche de tus sueños. Cuando quieras, donde quieras.
                </p>
                <div className="ds-feature-note text-xs text-champagne">
                  ✓ La semana premium está incluida en el precio de tu participación — sin coste adicional.
                </div>
              </div>
            </div>

            {/* Carte 3 */}
            <div className="group ds-card-feature animate-fade-in" style={{ animationDelay: "200ms" }}>
              <img src={featureSharedBg} alt="" aria-hidden="true" loading="lazy" width={1280} height={800} className="ds-card-feature-img" />
              <div className="ds-card-feature-overlay" />
              <div className="ds-feature-body">
                <Users className="ds-icon w-10 h-10 mb-4 transition-transform duration-500 group-hover:scale-110" />
                <div className="ds-feature-figure">
                  <span className="text-5xl font-extralight text-white leading-none">÷10</span>
                </div>
                <h3 className="ds-card-title text-white mt-2 mb-2">Los gastos compartidos</h3>
                <p className="text-sm text-white/80 leading-relaxed min-h-[6rem]">
                  Seguro, mantenimiento y garaje se dividen entre los 10 socios. El lujo real está en compartir los costes, no en eliminarlos.
                </p>
                <div className="ds-feature-note text-xs text-champagne">
                  ✓ Los costes de gestión están incluidos en tu cuota anual — sin sorpresas al final del año.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARATIVA FERRARI ROMA */}
      <section className="py-24 px-4 sm:px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          {/* Bloc hero comparaison */}
          <div className="relative rounded-3xl overflow-hidden mb-12" style={{ minHeight: "420px" }}>
            <img
              src={ferrariRomaSpider}
              alt="Ferrari Roma Spider"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/85" />
            <div className="relative z-10 text-center py-20 px-6">
              <span className="inline-block text-[10px] uppercase tracking-[0.35em] mb-6 text-champagne/70">
                Ejemplo real · Ferrari Roma
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
                Llevas años mirando<br />ese Ferrari.
                <span className="block mt-2 text-champagne">Ya es hora.</span>
              </h2>
              <div className="w-12 h-px mx-auto mb-8 bg-champagne" />
              <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
                No se trata de gastar menos. Se trata de tomar la decisión más inteligente.
              </p>
            </div>
          </div>

          {/* Les 2 cartes comparatives */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 items-stretch">
            {/* Carte gauche — Comprándolo */}
            <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 pt-12 flex flex-col justify-between">
              <div>
                <span className="ds-tag mb-10">Comprándolo</span>
                <div className="mb-8 mt-10">
                  <p className="text-4xl sm:text-6xl font-light text-muted-foreground leading-none mb-3">~240.500€</p>
                  <p className="text-sm text-muted-foreground">coste real en 5 años</p>
                </div>
                <div className="space-y-3 border-t border-border pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Precio de compra</span>
                    <span className="text-xs text-muted-foreground">330.000€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Gastos 5 años</span>
                    <span className="text-xs text-muted-foreground">+ 125.000€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Reventa estimada (65%)</span>
                    <span className="text-xs text-muted-foreground">− 214.500€</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border space-y-2.5">
                {["Seguro y mantenimiento a tu cargo", "Depreciación inmediata", "Inmovilización de capital"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <X className="w-3 h-3 flex-shrink-0 text-destructive/60" />
                    <span className="text-xs text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Carte droite — Con OWNEO */}
            <div className="rounded-2xl p-8 sm:p-10 pt-12 flex flex-col justify-between relative overflow-hidden bg-card border border-champagne/40 shadow-[0_0_60px_hsl(var(--champagne)/0.07),0_0_120px_hsl(var(--champagne)/0.03)]">
              <div className="absolute top-0 right-0">
                <div className="text-[9px] font-semibold uppercase tracking-[0.25em] px-5 py-2 rounded-bl-2xl rounded-tr-2xl bg-champagne text-champagne-foreground">
                  La decisión inteligente
                </div>
              </div>
              <div>
                <span className="ds-tag mb-10 text-champagne border-champagne/30">Con OWNEO</span>
                <div className="mb-8 mt-10">
                  <p className="text-4xl sm:text-6xl font-light leading-none mb-3 text-champagne">~26.400€</p>
                  <p className="text-sm text-muted-foreground">coste real en 5 años · todo gestionado</p>
                </div>
                <div className="space-y-3 border-t border-champagne/10 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Participación única</span>
                    <span className="text-xs text-muted-foreground">33.000€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Gestión 5 años{" "}
                      <span className="text-champagne/70">(incluida en cuota anual)</span>
                    </span>
                    <span className="text-xs text-muted-foreground">+ 16.500€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Recuperas (reventa 70%)</span>
                    <span className="text-xs text-green-400/80">− 23.100€</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-champagne/10 space-y-2.5">
                {["Seguro, garaje y mantenimiento ×10", "21 días estándar + 7 días premium al año", "Hasta un 70% de tu inversión recuperada"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <Check className="w-3 h-3 flex-shrink-0 text-champagne" />
                    <span className="text-xs text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bloc final "El mismo Ferrari Roma" */}
          <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: "380px" }}>
            <img
              src={ferrariRomaCockpit}
              alt="Ferrari Roma cockpit intérieur"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/75 to-black/90" />
            <div className="relative z-10 px-8 py-16 text-center">
              <p className="text-[10px] uppercase tracking-[0.35em] mb-4 text-champagne/50">La diferencia</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-3">El mismo Ferrari Roma.</h2>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 text-champagne">214.100€ de diferencia.</p>
              <p className="text-sm text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
                No es magia. Es una estructura de propiedad compartida diseñada para los que entienden que el lujo inteligente no tiene nada que envidiarle al lujo tradicional.
              </p>
              <Link to="/nuestro-modelo">
                <button className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] px-8 py-4 rounded-full transition-all duration-300 bg-champagne text-champagne-foreground hover:bg-champagne/85">
                  Quiero conducirlo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <p className="text-xs mt-5 text-white/20">
                Cálculo estimado · Ferrari Roma · 21 días estándar + 7 días premium al año · 5 años
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="container mx-auto max-w-6xl text-center">
          <Link to="/nuestro-modelo">
            <Button
              size="lg"
              variant="outline"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background"
              onClick={() => trackEvent("click_cta_modele", { cta_text: "DESCUBRIR EL MODELO", destination: "/nuestro-modelo" })}
            >
              DESCUBRIR EL MODELO
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground mt-4">Sin compromiso. Sin permanencia. Solo experiencia.</p>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="ds-h2 text-foreground mb-4">Colección Destacada</h2>
            <p className="ds-lead max-w-2xl mx-auto">
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
              {featuredCars.map((model) => {
                const multiCity = model.cityCount > 1;
                const link = multiCity
                  ? "/ubicaciones"
                  : (model.slug ? `/coches/${model.slug}` : `/car/${model.id}`);
                return (
                  <CarCard
                    key={`${model.brand}-${model.model}`}
                    car={model}
                    pageSource="home"
                    linkOverride={link}
                    availabilityOverride={{ remaining: model.totalRemaining, max: model.totalMax }}
                    cityCountBadge={model.cityCount}
                  />
                );
              })}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/coches">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-foreground text-foreground hover:bg-foreground hover:text-background"
                onClick={() => trackEvent("click_ver_todos_vehiculos", { section: "featured_collection" })}
              >
                VER TODOS LOS VEHÍCULOS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="ds-h2 text-foreground mb-4">Nuestras Ubicaciones</h2>
            <p className="ds-lead max-w-2xl mx-auto">
              Descubre nuestra flota en las ciudades más exclusivas de España
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.slice(0, 4).map((city) => (
              <Link
                key={city.id}
                to="/ubicaciones"
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover-lift"
                onClick={() => trackEvent("click_city_card", { city_name: city.name })}
              >
                <img src={city.image} alt={city.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-champagne" />
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">España</span>
                  </div>
                  <h3 className="ds-card-title text-foreground mb-2">{city.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{city.description}</p>
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

      {/* STATS */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-card border-y border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-10 sm:gap-12 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-light text-champagne mb-2">15+</div>
              <div className="text-muted-foreground">Supercoches de Lujo</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-light text-champagne mb-2">5</div>
              <div className="text-muted-foreground">Ubicaciones Premium</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-light text-champagne mb-2">100%</div>
              <div className="text-muted-foreground">Excelencia Garantizada</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO STORYTELLING */}
      <section className="py-20 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="ds-h2 text-foreground mb-6">
              El Lujo de los Supercoches, Ahora Accesible
            </h2>
            <p className="ds-lead leading-relaxed max-w-3xl mx-auto">
              En OWNEO revolucionamos el concepto de{" "}
              <strong className="text-foreground">alquiler de supercoches de lujo</strong>{" "}
              en España, haciendo realidad el sueño de conducir los vehículos más exclusivos del mundo.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <article className="group bg-card/30 rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-champagne/40 transition-all duration-300 hover:bg-card/50">
              <div className="w-12 h-12 rounded-xl bg-champagne/10 flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-champagne" />
              </div>
              <h3 className="ds-h3 text-foreground mb-4">Las Marcas Más Prestigiosas del Mundo</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nuestra flota exclusiva incluye los{" "}
                <strong className="text-foreground">superdeportivos Ferrari</strong> más codiciados, desde el icónico Ferrari Portofino hasta el impresionante F8 Tributo. Experimenta la potencia de un{" "}
                <strong className="text-foreground"> Lamborghini Huracán</strong> o el rugido del legendario Aventador. Para los amantes de la ingeniería alemana, ofrecemos la gama completa de{" "}
                <strong className="text-foreground">Porsche</strong>: el 911 Turbo S, el Taycan eléctrico y los SUV deportivos Cayenne y Macan.
              </p>
              <Link to="/coches" className="inline-flex items-center text-foreground font-medium hover:gap-3 gap-2 transition-all duration-300 group-hover:underline">
                Ver más <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
            <article className="group bg-card/30 rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-champagne/40 transition-all duration-300 hover:bg-card/50">
              <div className="w-12 h-12 rounded-xl bg-champagne/10 flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-champagne" />
              </div>
              <h3 className="ds-h3 text-foreground mb-4">Elegancia Británica y Exclusividad</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Descubre el refinamiento del{" "}
                <strong className="text-foreground">Aston Martin DB11</strong>, la innovación aerodinámica del{" "}
                <strong className="text-foreground">McLaren 720S</strong>, o el lujo supremo del{" "}
                <strong className="text-foreground">Rolls-Royce Wraith</strong>. Completa tu experiencia con la artesanía del{" "}
                <strong className="text-foreground">Bentley Continental GT</strong> o la potencia del{" "}
                <strong className="text-foreground">Mercedes-AMG GT R</strong>, conocido como "La Bestia del Infierno Verde".
              </p>
              <Link to="/coches" className="inline-flex items-center text-foreground font-medium hover:gap-3 gap-2 transition-all duration-300 group-hover:underline">
                Ver más <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          </div>
          <div className="bg-gradient-to-br from-card/80 to-card/40 rounded-3xl p-6 sm:p-8 md:p-12 border border-border/50 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-champagne/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h3 className="ds-h3 text-foreground mb-6 text-center">
                Supercar Sharing: La Nueva Era del Lujo Compartido
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                El <strong className="text-foreground">supercar sharing</strong> representa la evolución del acceso al lujo automovilístico. Ya no es necesario invertir cientos de miles de euros para disfrutar de un{" "}
                <strong className="text-foreground">coche de alta gama</strong>. Con OWNEO, accede a una{" "}
                <strong className="text-foreground">flota de supercoches premium</strong> en las mejores ubicaciones de España: Barcelona, Madrid, Marbella, Valencia, Ibiza y Alicante.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-background/50 rounded-xl p-6 text-center border border-border/30">
                  <h4 className="font-light text-foreground mb-2">Experiencia VIP</h4>
                  <p className="text-sm text-muted-foreground">Servicio de concierge personalizado y entrega a domicilio en toda España</p>
                </div>
                <div className="bg-background/50 rounded-xl p-6 text-center border border-border/30">
                  <h4 className="font-light text-foreground mb-2">Flexibilidad Total</h4>
                  <p className="text-sm text-muted-foreground">Alquiler por días o semanas, adaptado a tus necesidades de lujo</p>
                </div>
                <div className="bg-background/50 rounded-xl p-6 text-center border border-border/30">
                  <h4 className="font-light text-foreground mb-2">Calidad Garantizada</h4>
                  <p className="text-sm text-muted-foreground">Vehículos impecables con mantenimiento premium y seguro completo</p>
                </div>
              </div>
              <div className="text-center">
                <Link to="/ubicaciones" className="inline-flex items-center text-foreground font-medium hover:gap-3 gap-2 transition-all duration-300 hover:underline">
                  Ver ubicaciones <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-card/30 rounded-2xl p-6 sm:p-8 border border-border/50 text-center mt-12">
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6">
              Desde el{" "}
              <strong className="text-foreground">alquiler de Ferrari en Barcelona</strong> hasta un{" "}
              <strong className="text-foreground">Lamborghini en Marbella</strong>, OWNEO te ofrece la oportunidad de vivir experiencias únicas al volante de los{" "}
              <strong className="text-foreground">mejores supercoches del mundo</strong>. Descubre por qué somos líderes en{" "}
              <strong className="text-foreground">luxury car rental</strong> y{" "}
              <strong className="text-foreground">supercar experiences</strong> en España.
            </p>
            <Link to="/coches" className="inline-flex items-center text-foreground font-medium hover:gap-3 gap-2 transition-all duration-300 hover:underline">
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
