import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { useCarModels } from "@/hooks/useCars";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";

const Portfolio = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const ciudadFilter = searchParams.get("ciudad");

  const { data: models = [], isLoading } = useCarModels();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (models.length > 0) {
      trackEvent("view_item_list", {
        item_list_name: "portfolio",
        items_count: models.length,
      });
    }
  }, [models, trackEvent]);

  // Modèles incomplets d'abord, complets à la fin
  const sortedModels = [...models].sort((a, b) => {
    const aComplete = a.totalRemaining === 0 ? 1 : 0;
    const bComplete = b.totalRemaining === 0 ? 1 : 0;
    return aComplete - bComplete;
  });

  const filteredModels = ciudadFilter
    ? sortedModels.filter((model) =>
        model.citySlug?.toLowerCase() === ciudadFilter.toLowerCase() ||
        model.cityName?.toLowerCase().normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "-") === ciudadFilter.toLowerCase()
      )
    : sortedModels;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Nuestra Gama — Supercoches de Lujo Compartidos en España | Owneo</title>
        <meta name="description" content="Explora nuestra flota exclusiva: Ferrari, Lamborghini, Porsche, Bentley y más. Car sharing de supercoches en Barcelona, Madrid, Valencia, Marbella, Ibiza y Alicante." />
        <link rel="canonical" href="https://www.owneo.es/coches" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Nuestra Gama — Supercoches de Lujo Compartidos en España | Owneo" />
        <meta property="og:description" content="Explora nuestra flota exclusiva: Ferrari, Lamborghini, Porsche, Bentley y más. Car sharing de supercoches en Barcelona, Madrid, Valencia, Marbella, Ibiza y Alicante." />
        <meta property="og:url" content="https://www.owneo.es/coches" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Owneo" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:image" content="https://www.owneo.es/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@owneo" />
        <meta name="twitter:title" content="Nuestra Gama — Supercoches de Lujo Compartidos en España | Owneo" />
        <meta name="twitter:description" content="Ferrari, Lamborghini, Porsche, Bentley y más. Car sharing de supercoches en España." />
        <meta name="twitter:image" content="https://www.owneo.es/og-image.png" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Flota de Supercoches Owneo",
          "description": "Selección de supercoches de lujo disponibles en car sharing en España.",
          "url": "https://www.owneo.es/coches",
          "numberOfItems": 15,
          "itemListOrder": "https://schema.org/ItemListOrderAscending"
        })}</script>
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="ds-h1 mb-6">
              {t("fleet.title")} <span className="text-champagne">{t("fleet.title_accent")}</span>
            </h1>
            <p className="ds-lead">
              {t("fleet.subtitle")}
            </p>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <Skeleton className="aspect-[16/10] w-full rounded-xl" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {ciudadFilter && (
                <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-lg border border-champagne/40 bg-champagne/5">
                  <MapPin className="w-4 h-4 text-champagne" />
                  <span className="text-sm text-foreground">
                    Mostrando vehículos disponibles en <strong className="text-champagne capitalize">{ciudadFilter}</strong>
                  </span>
                  <button
                    onClick={() => setSearchParams({})}
                    className="ml-auto text-xs text-muted-foreground hover:text-foreground underline"
                  >
                    Ver toda la flota
                  </button>
                </div>
              )}
              {filteredModels.length === 0 ? (
                <p className="text-muted-foreground text-center py-12">
                  No hay vehículos disponibles en <strong className="capitalize">{ciudadFilter}</strong> por el momento.
                </p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredModels.map((model) => (
                    <CarCard
                      key={`${model.brand}-${model.model}`}
                      car={model}
                      pageSource="portfolio"
                      availabilityOverride={{
                        remaining: model.totalRemaining,
                        max: model.totalMax,
                      }}
                      cityCountBadge={model.cityCount}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
