import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { useCarModels } from "@/hooks/useCars";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Skeleton } from "@/components/ui/skeleton";

const Portfolio = () => {
  const { t } = useTranslation();

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

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Nuestra Gama | OWNEO</title>
        <meta
          name="description"
          content="Explora nuestra colección exclusiva de los supercoches más prestigiosos del mundo."
        />
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedModels.map((model) => {
                const multiCity = model.cityCount > 1;
                const link = multiCity
                  ? "/ubicaciones"
                  : model.slug
                  ? `/coches/${model.slug}`
                  : `/car/${model.id}`;
                return (
                  <CarCard
                    key={`${model.brand}-${model.model}`}
                    car={model}
                    pageSource="portfolio"
                    linkOverride={link}
                    availabilityOverride={{
                      remaining: model.totalRemaining,
                      max: model.totalMax,
                    }}
                    cityCountBadge={model.cityCount}
                  />
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

export default Portfolio;
