import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Car } from "@/hooks/useCars";
import { ArrowRight, Users, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAnalytics } from "@/hooks/useAnalytics";

interface CarCardProps {
  car: Car;
  pageSource?: string;
  /** Surcharge le lien de destination (ex: Gama -> Ubicaciones du modèle) */
  linkOverride?: string;
  /** Surcharge l'affichage des places (ex: agrégat multi-villes) */
  availabilityOverride?: { remaining: number; max: number };
  /** Affiche un badge "En X ciudades" (mode Gama agrégé) */
  cityCountBadge?: number;
}

const CarCard = ({
  car,
  pageSource = "unknown",
  linkOverride,
  availabilityOverride,
  cityCountBadge,
}: CarCardProps) => {
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();
  const numericPrice = parseInt(car.price.replace(/[^0-9]/g, ''));
  const sharePrice = car.participationPrice || Math.round(numericPrice * 0.1);

  const available = availabilityOverride ? availabilityOverride.remaining : (car.remainingParticipations ?? 0);
  const max = availabilityOverride ? availabilityOverride.max : (car.maxParticipations ?? 10);
  const isComplete = available === 0 || (!availabilityOverride && car.status === "complete");

  const to = linkOverride ?? (car.slug ? `/coches/${car.slug}` : `/car/${car.id}`);

  const handleClick = () => {
    trackEvent("select_item", {
      car_id: car.id,
      car_name: car.name,
      page_source: pageSource,
      item_list_name: pageSource,
      price: sharePrice,
    });
  };

  return (
    <Link to={to} className="h-full" onClick={handleClick}>
      <Card
        className={`overflow-hidden group cursor-pointer bg-card border border-border h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-champagne/60 hover:shadow-[0_20px_60px_-15px_hsl(var(--champagne)/0.4)] ${isComplete ? "opacity-60" : ""}`}
      >
        <div className="aspect-[16/10] overflow-hidden bg-muted relative">
          <img
            src={car.image}
            alt={car.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {isComplete ? (
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-destructive text-destructive-foreground">
              <Users className="w-3.5 h-3.5" />
              {t("car.sold_out_badge")}
            </div>
          ) : (
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-[hsl(var(--participation-available))] text-background">
              <Users className="w-3.5 h-3.5" />
              {t("car.available_badge", { available, max })}
            </div>
          )}
          {cityCountBadge && cityCountBadge > 1 && (
            <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-background/80 text-foreground backdrop-blur">
              <MapPin className="w-3.5 h-3.5" />
              En {cityCountBadge} ciudades
            </div>
          )}
        </div>
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {car.category}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-foreground/80 transition-colors">
            {car.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {car.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Cuota de participación</span>
              <span className="text-2xl font-bold text-foreground">
                {sharePrice.toLocaleString('es-ES')}€
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {car.price}
              </span>
            </div>
            {isComplete ? (
              <span className="text-xs font-semibold text-destructive uppercase tracking-wider">Completo</span>
            ) : (
              <ArrowRight className="w-5 h-5 text-foreground group-hover:translate-x-1 transition-transform" />
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CarCard;
