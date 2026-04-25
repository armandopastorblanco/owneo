import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Linkedin, Users, CheckCircle2 } from "lucide-react";
import EvaluationQuestionnaire from "@/components/EvaluationQuestionnaire";
import { useAuth } from "@/contexts/AuthContext";

const participationSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(50),
  surname: z.string().trim().min(2, "El apellido debe tener al menos 2 caracteres").max(50),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(9, "Teléfono inválido").max(20),
  address: z.string().trim().min(5, "Dirección inválida").max(200),
  linkedin: z.string().trim().url("URL de LinkedIn inválida").max(255).refine(
    (url) => url.includes("linkedin.com"),
    "Debe ser una URL de LinkedIn válida"
  ),
  participations: z.string().min(1, "Selecciona el número de participaciones"),
});

type ParticipationFormData = z.infer<typeof participationSchema>;

interface ParticipationFormProps {
  carId: string;
  carName: string;
  availableParticipations: number;
  sharePrice: number;
}

const LEAD_KEY = (carId: string) => `owneo:participation-lead:${carId}`;

const ParticipationForm = ({ carId, carName, availableParticipations, sharePrice }: ParticipationFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadData, setLeadData] = useState<ParticipationFormData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ParticipationFormData>({
    resolver: zodResolver(participationSchema),
    defaultValues: (() => {
      try {
        const raw = sessionStorage.getItem(LEAD_KEY(carId));
        return raw ? JSON.parse(raw) : { participations: "1" };
      } catch {
        return { participations: "1" };
      }
    })(),
  });

  // Persist form values to sessionStorage as user types
  const watched = watch();
  useEffect(() => {
    try {
      sessionStorage.setItem(LEAD_KEY(carId), JSON.stringify(watched));
    } catch {
      // ignore
    }
  }, [watched, carId]);

  const selectedParticipations = watch("participations");
  const numParticipations = parseInt(selectedParticipations || "1", 10) || 1;
  const totalCost = numParticipations * sharePrice;

  const onSubmit = async (data: ParticipationFormData) => {
    setIsSubmitting(true);
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para solicitar una participación",
        variant: "destructive",
      });
      setIsSubmitting(false);
      setOpen(false);
      navigate(`/login?redirect=/car/${carId}`);
      return;
    }
    setLeadData(data);
    setIsSubmitting(false);
    setShowQuestionnaire(true);
  };

  const handleQuestionnaireComplete = () => {
    setShowQuestionnaire(false);
    setSubmitted(true);
    sessionStorage.removeItem(LEAD_KEY(carId));
    reset();
    // Auto-close after a few seconds
    setTimeout(() => setOpen(false), 4000);
  };

  const participationOptions = Array.from(
    { length: Math.min(availableParticipations, 10) },
    (_, i) => i + 1
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setShowQuestionnaire(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-foreground text-background hover:bg-foreground/90"
          disabled={availableParticipations === 0 || submitted}
          onClick={(e) => {
            if (!user) {
              e.preventDefault();
              toast({
                title: "Inicia sesión",
                description: "Debes iniciar sesión para solicitar una participación",
                variant: "destructive",
              });
              navigate(`/login?redirect=/car/${carId}`);
            }
          }}
        >
          {submitted
            ? "SOLICITUD ENVIADA"
            : availableParticipations === 0
            ? "SIN DISPONIBILIDAD"
            : "SOLICITAR PARTICIPACIÓN"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] bg-card border-border max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground text-center">
                Solicitud en proceso
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-center">
                Te contactaremos pronto para finalizar tu participación en {carName}.
              </DialogDescription>
            </DialogHeader>
          </div>
        ) : showQuestionnaire ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-foreground">
                Cuestionario de Evaluación
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Completa este cuestionario obligatorio para finalizar tu solicitud de {carName}
              </DialogDescription>
            </DialogHeader>
            <EvaluationQuestionnaire
              carId={carId}
              carName={carName}
              numParticipations={numParticipations}
              participationPrice={sharePrice}
              leadInfo={leadData ?? undefined}
              onComplete={handleQuestionnaireComplete}
            />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                Solicitar Participación
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Completa el formulario para solicitar una participación en {carName}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                    <User className="w-4 h-4" /> Nombre *
                  </Label>
                  <Input id="name" {...register("name")} placeholder="Tu nombre" className="bg-background border-border text-foreground" />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname" className="text-foreground flex items-center gap-2">
                    <User className="w-4 h-4" /> Apellido *
                  </Label>
                  <Input id="surname" {...register("surname")} placeholder="Tu apellido" className="bg-background border-border text-foreground" />
                  {errors.surname && <p className="text-sm text-destructive">{errors.surname.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email *
                </Label>
                <Input id="email" type="email" {...register("email")} placeholder="tu@email.com" className="bg-background border-border text-foreground" />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Teléfono *
                </Label>
                <Input id="phone" type="tel" {...register("phone")} placeholder="+34 600 000 000" className="bg-background border-border text-foreground" />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Dirección *
                </Label>
                <Input id="address" {...register("address")} placeholder="Tu dirección completa" className="bg-background border-border text-foreground" />
                {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-foreground flex items-center gap-2">
                  <Linkedin className="w-4 h-4" /> Perfil de LinkedIn *
                </Label>
                <Input id="linkedin" {...register("linkedin")} placeholder="https://linkedin.com/in/tu-perfil" className="bg-background border-border text-foreground" />
                {errors.linkedin && <p className="text-sm text-destructive">{errors.linkedin.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="participations" className="text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" /> Participaciones deseadas *
                </Label>
                <Select value={selectedParticipations} onValueChange={(value) => setValue("participations", value)}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Selecciona las participaciones" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {participationOptions.map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} participación{num > 1 ? "es" : ""} - {(num * sharePrice).toLocaleString("es-ES")}€
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.participations && <p className="text-sm text-destructive">{errors.participations.message}</p>}
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Vehículo:</span>
                  <span className="font-semibold text-foreground">{carName}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Participaciones:</span>
                  <span className="font-semibold text-foreground">{numParticipations}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-muted-foreground">Total estimado:</span>
                  <span className="text-xl font-bold text-foreground">{totalCost.toLocaleString("es-ES")}€</span>
                </div>
              </div>

              <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Continuar al cuestionario"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Al enviar este formulario, aceptas nuestra política de privacidad y términos de servicio.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ParticipationForm;
