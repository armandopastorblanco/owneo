import { Link } from "react-router-dom";
import { Car } from "@/hooks/useCars";
import { ArrowRight, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  const numericPrice = parseInt(car.price.replace(/[^0-9]/g, ''));
  const sharePrice = car.participationPrice || Math.round(numericPrice * 0.1);
  const isComplete = car.status === "complete" || car.remainingParticipations === 0;
  const available = car.remainingParticipations ?? 0;
  const max = car.maxParticipations ?? 10;

  return (
    <Link to={`/car/${car.id}`} className="h-full">
      <Card className={`overflow-hidden hover-lift group cursor-pointer bg-card border-border h-full flex flex-col ${isComplete ? "opacity-60" : ""}`}>
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
              Participaciones agotadas
            </div>
          ) : (
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-[hsl(var(--participation-available))] text-background">
              <Users className="w-3.5 h-3.5" />
              {available}/{max} disponibles
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
