import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Car, CarModel } from "@/hooks/useCars";
import { ArrowRight, Users, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAnalytics } from "@/hooks/useAnalytics";
import CityPickerModal from "@/components/CityPickerModal";

interface CarCardProps {
  car: Car;
  pageSource?: string;
  /** Surcharge le lien de destination (ex: Gama -> Ubicaciones du modèle) */
  linkOverride?: string;
  /** Surcharge l'affichage des places (ex: agrégat multi-villes) */
  availabilityOverride?: { remaining: number; max: number };
  /** Affiche un badge "En X ciudades" (mode Gama agrégé) */
  cityCountBadge?: number;
  /** Callback déclenché quand on clique sur une carte multi-villes */
  onCityPick?: () => void;
}

const CarCard = ({
  car,
  pageSource = "unknown",
  linkOverride,
  availabilityOverride,
  cityCountBadge,
  onCityPick,
}: CarCardProps) => {
  const { t, i18n } = useTranslation();
  const { trackEvent } = useAnalytics();
  const [showPicker, setShowPicker] = useState(false);

  const numericPrice = parseInt(car.price.replace(/[^0-9]/g, ''));
  const sharePrice = car.participationPrice || Math.round(numericPrice * 0.1);

  const available = availabilityOverride ? availabilityOverride.remaining : (car.remainingParticipations ?? 0);
  const max = availabilityOverride ? availabilityOverride.max : (car.maxParticipations ?? 10);
  const isComplete = available === 0 || (!availabilityOverride && car.status === "complete");
  const isMultiCity = !!cityCountBadge && cityCountBadge > 1;

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

  const cardContent = (
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
        {isMultiCity ? (
          <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-[hsl(var(--participation-available))] text-background">
            <MapPin className="w-3.5 h-3.5" />
            {t("car.cities_avail", { count: cityCountBadge })}
          </div>
        ) : isComplete ? (
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
      </div>
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {i18n.language === "en" && car.category_en ? car.category_en : car.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-foreground/80 transition-colors">
          {car.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {i18n.language === "en" && car.description_en ? car.description_en : car.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("car.participation_label")}</span>
            <span className="text-2xl font-bold text-foreground">
              {sharePrice.toLocaleString('es-ES')}€
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {car.price}
            </span>
          </div>
          {isComplete ? (
            <span className="text-xs font-semibold text-destructive uppercase tracking-wider">{t("car.complete_label")}</span>
          ) : (
            <ArrowRight className="w-5 h-5 text-foreground group-hover:translate-x-1 transition-transform" />
          )}
        </div>
      </CardContent>
    </Card>
  );

  const carModel = car as CarModel;
  const hasCityDetails = Array.isArray(carModel.cityDetails) && carModel.cityDetails.length > 0;

  return (
    <>
      {isMultiCity ? (
        <div
          className="h-full"
          onClick={() => {
            handleClick();
            onCityPick?.();
            setShowPicker(true);
          }}
        >
          {cardContent}
        </div>
      ) : (
        <Link to={to} className="h-full" onClick={handleClick}>
          {cardContent}
        </Link>
      )}
      {isMultiCity && showPicker && hasCityDetails && (
        <CityPickerModal car={carModel} onClose={() => setShowPicker(false)} />
      )}
    </>
  );
};

export default CarCard;
