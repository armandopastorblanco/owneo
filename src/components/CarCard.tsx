import { Link } from "react-router-dom";
import { Car } from "@/data/cars";
import { ArrowRight, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useMemo } from "react";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  // Generate a stable random number of available participations based on car id
  const availableParticipations = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < car.id.length; i++) {
      hash = ((hash << 5) - hash) + car.id.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 11; // 0 to 10
  }, [car.id]);

  const numericPrice = parseInt(car.price.replace(/[^0-9]/g, ''));
  const sharePrice = Math.round(numericPrice * 0.1);

  return (
    <Link to={`/car/${car.id}`} className="h-full">
      <Card className="overflow-hidden hover-lift group cursor-pointer bg-card border-border h-full flex flex-col">
        <div className="aspect-[16/10] overflow-hidden bg-muted relative">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Available participations badge */}
          <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
            availableParticipations === 0 
              ? 'bg-destructive/90 text-destructive-foreground' 
              : availableParticipations <= 3 
                ? 'bg-amber-500/90 text-white' 
                : 'bg-emerald-500/90 text-white'
          }`}>
            <Users className="w-3.5 h-3.5" />
            {availableParticipations}/10 disponibles
          </div>
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
            <ArrowRight className="w-5 h-5 text-foreground group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CarCard;
