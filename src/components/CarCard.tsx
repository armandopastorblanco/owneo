import { Link } from "react-router-dom";
import { Car } from "@/data/cars";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <Link to={`/car/${car.id}`} className="h-full">
      <Card className="overflow-hidden hover-lift group cursor-pointer bg-card border-border h-full flex flex-col">
        <div className="aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {car.category}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {car.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {car.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-primary">{car.price}</span>
            <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CarCard;
