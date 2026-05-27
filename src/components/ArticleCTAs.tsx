import { Link } from "react-router-dom";
import { ArrowLeft, ThumbsUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";

interface ArticleCTAsProps {
  vehicleName?: string;
  carId?: string;
}

const ArticleCTAs = ({ vehicleName = "este vehículo", carId }: ArticleCTAsProps) => {
  const [voted, setVoted] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleVote = () => {
    if (!voted) {
      setVoted(true);
      trackEvent("vote_vehicle", {
        car_id: carId,
        car_name: vehicleName,
        page_source: "news_article",
      });
      toast.success(`¡Has votado por ${vehicleName}!`, {
        description: "Gracias por tu opinión. Tu voto nos ayuda a seleccionar los mejores vehículos.",
      });
    }
  };

  return (
    <div className="pt-10 border-t border-border/30">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="text-lg px-8 bg-champagne text-champagne-foreground hover:bg-champagne/90">
          <Link
            to="/coches"
            onClick={() =>
              trackEvent("click_view_gama", {
                car_id: carId,
                car_name: vehicleName,
                page_source: "news_article",
              })
            }
          >
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
          <Link
            to="/noticias"
            onClick={() =>
              trackEvent("click_back_to_news", {
                car_id: carId,
                car_name: vehicleName,
                page_source: "news_article",
              })
            }
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Todas las Noticias
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ArticleCTAs;
