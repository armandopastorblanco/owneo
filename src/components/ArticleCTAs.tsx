import { Link } from "react-router-dom";
import { ArrowLeft, ThumbsUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";

interface ArticleCTAsProps {
  vehicleName?: string;
  carId?: string;
}

const ArticleCTAs = ({ vehicleName, carId }: ArticleCTAsProps) => {
  const { t, i18n } = useTranslation();
  const [voted, setVoted] = useState(false);
  const { trackEvent } = useAnalytics();

  const vehicle = vehicleName || t("news.default_vehicle");
  const isEn = i18n.language === "en";

  const handleVote = () => {
    if (!voted) {
      setVoted(true);
      trackEvent("vote_vehicle", {
        car_id: carId,
        car_name: vehicle,
        page_source: "news_article",
      });
      toast.success(t("news.vote_toast_title", { vehicle }), {
        description: t("news.vote_toast_desc"),
      });
    }
  };

  return (
    <div className="pt-10 border-t border-border/30">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="text-lg px-8 bg-champagne text-champagne-foreground hover:bg-champagne/90">
          <Link
            to={isEn ? "/en/cars" : "/coches"}
            onClick={() =>
              trackEvent("click_view_gama", {
                car_id: carId,
                car_name: vehicle,
                page_source: "news_article",
              })
            }
          >
            {t("news.article_cta_range")}
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
          {voted ? t("news.article_cta_voted") : t("news.article_cta_vote")}
        </Button>

        <Button asChild size="lg" className="text-lg px-8 bg-champagne text-champagne-foreground hover:bg-champagne/90">
          <Link
            to={isEn ? "/en/news" : "/noticias"}
            onClick={() =>
              trackEvent("click_back_to_news", {
                car_id: carId,
                car_name: vehicle,
                page_source: "news_article",
              })
            }
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            {t("news.article_cta_back")}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ArticleCTAs;
