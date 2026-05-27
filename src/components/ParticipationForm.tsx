import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";

interface ParticipationFormProps {
  carId: string;
  carName: string;
  availableParticipations: number;
  sharePrice: number;
  pageSource?: string;
}

/**
 * Trigger button for the unified participation flow.
 * Redirects to /participar?carId=... — the page handles auth (guest signup or
 * existing user) and the full multi-step flow.
 */
const ParticipationForm = ({ carId, carName, availableParticipations, sharePrice, pageSource = "car_detail" }: ParticipationFormProps) => {
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();
  const disabled = availableParticipations === 0;

  const handleClick = () => {
    trackEvent("click_participate_cta", {
      car_id: carId,
      car_name: carName,
      page_source: pageSource,
      participation_price: sharePrice,
      remaining_participations: availableParticipations,
    });
    navigate(`/participar?carId=${carId}`);
  };

  return (
    <Button
      size="lg"
      className="bg-foreground text-background hover:bg-foreground/90"
      disabled={disabled}
      onClick={handleClick}
    >
      {disabled ? "SIN DISPONIBILIDAD" : "SOLICITAR PARTICIPACIÓN"}
    </Button>
  );
};

export default ParticipationForm;
