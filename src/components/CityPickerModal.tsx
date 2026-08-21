import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, X, Users, ArrowRight } from "lucide-react";
import { CarModel } from "@/hooks/useCars";

interface CityPickerModalProps {
  car: CarModel;
  onClose: () => void;
}

const CityPickerModal = ({ car, onClose }: CityPickerModalProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCitySelect = (citySlug: string | null) => {
    const dest = car.slug ? `/coches/${car.slug}` : `/car/${car.id}`;
    navigate(dest, { state: { selectedCity: citySlug } });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-md rounded-2xl border border-champagne/20 bg-background p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label={t("common.close")}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <div className="flex items-center gap-2 text-champagne text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span className="uppercase tracking-wider">
              {t("car.multiple_cities")}
            </span>
          </div>

          <h2 className="text-2xl font-extralight text-foreground mb-2">
            {car.name}
          </h2>

          <p className="text-sm text-muted-foreground">
            {t("car.city_picker_subtitle")}
          </p>
        </div>

        {/* City list */}
        <div className="space-y-3">
          {car.cityDetails.map((city) => {
            const isFull = city.status === "complete" || city.remaining === 0;
            const isLast = !isFull && city.remaining === 1;
            return (
              <button
                key={city.slug || city.name}
                disabled={isFull}
                onClick={() => handleCitySelect(city.slug)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all duration-200 text-left
                  ${isFull
                    ? "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                    : "border-border hover:border-champagne/60 hover:bg-champagne/5 cursor-pointer group"
                  }`}
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="text-foreground font-medium">
                    {city.name}
                  </span>
                  {isLast && (
                    <span className="text-xs text-champagne">
                      {t("car.city_last_spot")}
                    </span>
                  )}
                  {isFull && (
                    <span className="text-xs text-muted-foreground">
                      {t("car.sold_out_badge")}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    <span>
                      {city.remaining}/{city.max}
                    </span>
                  </div>

                  {!isFull && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-champagne transition-colors" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CityPickerModal;
