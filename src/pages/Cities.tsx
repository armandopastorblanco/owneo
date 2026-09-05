import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCars } from "@/hooks/useCars";
import { useLocations } from "@/hooks/useLocations";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Cities = () => {
  const { t, i18n } = useTranslation();

  const { data: cities = [], isLoading: citiesLoading } = useLocations();
  const { data: cars = [] } = useCars();

  // Compte basé sur la ville réelle du véhicule (location_id -> cityName),
  // plus sur available_in qui n'est plus alimenté.
  const getCarsCountForCity = (cityName: string) => {
    return cars.filter((car) => car.cityName === cityName).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Ubicaciones — Tu Supercoche cerca de ti | Owneo</title>
        <meta name="description" content="Owneo opera en Barcelona, Madrid, Valencia, Marbella, Ibiza y Alicante. Encuentra tu Ferrari, Lamborghini o Porsche compartido cerca de ti." />
        <link rel="canonical" href="https://www.owneo.es/ubicaciones" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Ubicaciones — Tu Supercoche cerca de ti | Owneo" />
        <meta property="og:description" content="Owneo opera en Barcelona, Madrid, Valencia, Marbella, Ibiza y Alicante. Encuentra tu Ferrari, Lamborghini o Porsche compartido cerca de ti." />
        <meta property="og:url" content="https://www.owneo.es/ubicaciones" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Owneo" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:image" content="https://www.owneo.es/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@owneo" />
        <meta name="twitter:title" content="Ubicaciones — Tu Supercoche cerca de ti | Owneo" />
        <meta name="twitter:description" content="Owneo opera en Barcelona, Madrid, Valencia, Marbella, Ibiza y Alicante." />
        <meta name="twitter:image" content="https://www.owneo.es/og-image.png" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Ciudades donde opera Owneo",
          "url": "https://www.owneo.es/ubicaciones",
          "numberOfItems": 6,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Barcelona", "url": "https://www.owneo.es/coches?ciudad=barcelona" },
            { "@type": "ListItem", "position": 2, "name": "Madrid", "url": "https://www.owneo.es/coches?ciudad=madrid" },
            { "@type": "ListItem", "position": 3, "name": "Valencia", "url": "https://www.owneo.es/coches?ciudad=valencia" },
            { "@type": "ListItem", "position": 4, "name": "Marbella", "url": "https://www.owneo.es/coches?ciudad=marbella" },
            { "@type": "ListItem", "position": 5, "name": "Ibiza", "url": "https://www.owneo.es/coches?ciudad=ibiza" },
            { "@type": "ListItem", "position": 6, "name": "Alicante", "url": "https://www.owneo.es/coches?ciudad=alicante" }
          ]
        })}</script>
      </Helmet>
      <Navbar />

      <main className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
            <h1 className="ds-h1 mb-6">
              {t("locations.title")} <span className="text-champagne">{t("locations.title_accent")}</span>
            </h1>
            <p className="ds-lead">
              {t("locations.subtitle")}
            </p>
          </div>

          {citiesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[450px] rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => {
                const carsCount = getCarsCountForCity(city.name);

                return (
                  <div
                    id={city.slug}
                    key={city.id}
                    className="group relative h-[360px] sm:h-[450px] rounded-xl overflow-hidden border border-border transition-all duration-500 hover:border-champagne/60 hover:shadow-[0_20px_60px_-15px_hsl(var(--champagne)/0.4)]"
                  >
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src={city.image}
                        alt={`Luxury car in ${city.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-champagne" />
                        <h2 className="ds-card-title text-foreground">{city.name}</h2>
                      </div>
                      <p className="ds-body mb-4 line-clamp-2">
                        {i18n.language === "en" && city.description_en ? city.description_en : city.description}
                      </p>
                      <Link to={`/coches?ciudad=${city.slug}`}>
                        <Button className="w-full group/btn bg-champagne text-champagne-foreground hover:bg-champagne/90">
                          <span>Ver flota en {city.name}</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cities;
