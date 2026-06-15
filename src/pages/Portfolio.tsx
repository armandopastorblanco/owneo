import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { useCarModels } from "@/hooks/useCars";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Skeleton } from "@/components/ui/skeleton";

const Portfolio = () => {
  const { data: models = [], isLoading } = useCarModels();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (!isLoading && models.length) {
      trackEvent("view_item_list", {
        item_list_name: "Portfolio",
        item_list_id: "portfolio",
        items: models.slice(0, 20).map((c, i) => ({
          item_id: c.id,
          item_name: c.name,
          item_brand: c.brand,
          index: i,
          price: c.participationPrice,
        })),
      });
    }
  }, [isLoading, models, trackEvent]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Flota de Supercoches Compartidos | Owneo</title>
        <meta name="description" content="Explora la flota Owneo: Ferrari, Lamborghini, Porsche y más superdeportivos compartidos en España. Conduce el coche de tus sueños, comparte los costes, vive la experiencia." />
        <link rel="canonical" href="https://www.owneo.es/coches" />
        <meta property="og:title" content="Flota de Supercoches Compartidos | Owneo" />
        <meta property="og:description" content="Explora la flota Owneo: Ferrari, Lamborghini, Porsche y más superdeportivos compartidos en España." />
        <meta property="og:url" content="https://www.owneo.es/coches" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Owneo" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@owneo" />
      </Helmet>
      <Navbar />

      <main className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="ds-eyebrow-pill">Nuestra flota</span>
            <h1 className="ds-h1 mt-6 mb-4 text-foreground">
              Nuestra <span className="text-champagne">Gama</span>
            </h1>
            <p className="ds-lead max-w-3xl mx-auto">
              Explora nuestra colección exclusiva de los supercoches más prestigiosos del mundo
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[400px] rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {[...models]
                .sort((a, b) => {
                  const aComplete = a.totalRemaining === 0 ? 1 : 0;
                  const bComplete = b.totalRemaining === 0 ? 1 : 0;
                  return aComplete - bComplete;
                })
                .map((model) => {
                  // Multi-villes -> on envoie vers Ubicaciones (choix de ville).
                  // Mono-ville -> lien direct vers la fiche du véhicule.
                  const multiCity = model.cityCount > 1;
                  const link = multiCity
                    ? "/ubicaciones"
                    : (model.slug ? `/coches/${model.slug}` : `/car/${model.id}`);
                  return (
                    <CarCard
                      key={`${model.brand}-${model.model}`}
                      car={model}
                      pageSource="portfolio"
                      linkOverride={link}
                      availabilityOverride={{ remaining: model.totalRemaining, max: model.totalMax }}
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
