import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const VALID_RATINGS = ["positive", "neutral", "negative"] as const;

const Opinion = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const recorded = useRef(false);

  useEffect(() => {
    // Evita registrar dos veces por el doble montaje de React en desarrollo.
    if (recorded.current) return;
    recorded.current = true;

    const rating = searchParams.get("valor");
    const email = searchParams.get("e");

    // Un valor fuera del dominio se ignora: se muestra el agradecimiento igual,
    // pero no se registra basura.
    if (!rating || !VALID_RATINGS.includes(rating as (typeof VALID_RATINGS)[number])) {
      return;
    }

    supabase
      .from("delivery_feedback")
      .insert({ rating, contact_email: email || null, source: "crm_o4" })
      .then(({ error }) => {
        if (error) console.error("delivery_feedback insert error", error);
      });
  }, [searchParams]);

  const homePath = i18n.language === "en" ? "/en" : "/";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="text-center max-w-md space-y-6">
        <h1 className="text-3xl font-light tracking-wide text-foreground uppercase">
          {t("feedback.title")}
        </h1>
        <div className="mx-auto h-px w-16 bg-primary" />
        <p className="text-muted-foreground">{t("feedback.body")}</p>
        <p className="text-sm text-muted-foreground">{t("feedback.signoff")}</p>
        <Button onClick={() => navigate(homePath)} variant="outline">
          {t("feedback.cta")}
        </Button>
      </div>
    </div>
  );
};

export default Opinion;
