import { Link } from "react-router-dom";
import { ArrowLeft, Car, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface ArticleCTAsProps {
  vehicleName?: string;
}

const ArticleCTAs = ({ vehicleName = "este vehículo" }: ArticleCTAsProps) => {
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (!voted) {
      setVoted(true);
      toast.success(`¡Has votado por ${vehicleName}!`, {
        description: "Gracias por tu opinión. Tu voto nos ayuda a seleccionar los mejores vehículos.",
      });
    }
  };

  return (
    <div className="pt-10 border-t border-border/30">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/noticias" className="group">
          <Button
            variant="outline"
            className="w-full border-border/40 hover:border-champagne/50 hover:bg-champagne/5 text-sm font-medium tracking-wide transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Todas las noticias
          </Button>
        </Link>

        <Link to="/portfolio" className="group">
          <Button
            variant="outline"
            className="w-full border-border/40 hover:border-champagne/50 hover:bg-champagne/5 text-sm font-medium tracking-wide transition-all duration-300"
          >
            <Car className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Ver la gama OWNEO
          </Button>
        </Link>

        <Button
          variant={voted ? "default" : "outline"}
          onClick={handleVote}
          disabled={voted}
          className={
            voted
              ? "w-full bg-champagne/20 text-champagne border-champagne/30 cursor-default text-sm font-medium tracking-wide"
              : "w-full border-border/40 hover:border-champagne/50 hover:bg-champagne/5 text-sm font-medium tracking-wide transition-all duration-300"
          }
        >
          <ThumbsUp className={`w-4 h-4 mr-2 ${voted ? "fill-champagne" : ""} transition-all`} />
          {voted ? "¡Voto registrado!" : "Votar por este vehículo"}
        </Button>
      </div>
    </div>
  );
};

export default ArticleCTAs;
