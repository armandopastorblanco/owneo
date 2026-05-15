import { Link } from "react-router-dom";
import { ArrowLeft, Car, ThumbsUp, ArrowRight } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="text-lg px-8 bg-champagne text-champagne-foreground hover:bg-champagne/90">
          <Link to="/coches">
            Ver la Gama OWNEO
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>

        <Button
          size="lg"
          onClick={handleVote}
          disabled={voted}
          className={
            voted
              ? "text-lg px-8 bg-champagne/20 text-champagne border border-champagne/30 cursor-default"
              : "text-lg px-8 bg-champagne text-champagne-foreground hover:bg-champagne/90"
          }
        >
          <ThumbsUp className={`mr-2 w-5 h-5 ${voted ? "fill-champagne" : ""}`} />
          {voted ? "¡Voto registrado!" : "Votar por este vehículo"}
        </Button>

        <Button asChild size="lg" className="text-lg px-8 bg-champagne text-champagne-foreground hover:bg-champagne/90">
          <Link to="/noticias">
            <ArrowLeft className="mr-2 w-5 h-5" />
            Todas las Noticias
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ArticleCTAs;
