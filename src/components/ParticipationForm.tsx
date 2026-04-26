import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ParticipationFormProps {
  carId: string;
  carName: string;
  availableParticipations: number;
  sharePrice: number;
}

/**
 * Trigger button for the unified participation flow.
 * Redirects to /participar?carId=... — the page handles auth (guest signup or
 * existing user) and the full multi-step flow.
 */
const ParticipationForm = ({ carId, availableParticipations }: ParticipationFormProps) => {
  const navigate = useNavigate();
  const disabled = availableParticipations === 0;

  return (
    <Button
      size="lg"
      className="bg-foreground text-background hover:bg-foreground/90"
      disabled={disabled}
      onClick={() => navigate(`/participar?carId=${carId}`)}
    >
      {disabled ? "SIN DISPONIBILIDAD" : "SOLICITAR PARTICIPACIÓN"}
    </Button>
  );
};

export default ParticipationForm;
