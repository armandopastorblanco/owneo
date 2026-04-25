import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { FileText, Shield, Brain, MessageSquare, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface EvaluationQuestionnaireProps {
  carId: string;
  carName: string;
  numParticipations: number;
  participationPrice: number;
  leadInfo?: Record<string, string>;
  onComplete: () => void;
}

const STORAGE_KEY = (carId: string) => `owneo:questionnaire:${carId}`;

const EvaluationQuestionnaire = ({
  carId,
  carName,
  numParticipations,
  participationPrice,
  leadInfo,
  onComplete,
}: EvaluationQuestionnaireProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY(carId));
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Persist answers to sessionStorage on every change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY(carId), JSON.stringify(answers));
    } catch {
      // ignore quota errors
    }
  }, [answers, carId]);

  const setAnswer = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const sectionTitles = [
    "Historial como conductor y ciudadano",
    "Aptitudes y experiencia como conductor",
    "Evaluación psicológica básica",
    "Preguntas adicionales de control",
  ];
  const sectionEmojis = ["📄", "🛞", "🧠", "📌"];

  const canAdvance = () => {
    if (step === 0) return answers.q1 && answers.q2 && answers.q3 && answers.q4 && answers.q5;
    if (step === 1) return answers.q6 && answers.q7 && answers.q8 && answers.q9 && answers.q10;
    if (step === 2) return answers.q11 && answers.q12 && answers.q13 && answers.q14 && answers.q15;
    if (step === 3) return answers.q16?.trim() && answers.q17?.trim() && answers.q18?.trim();
    return false;
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Inicia sesión",
          description: "Debes iniciar sesión para solicitar una participación",
          variant: "destructive",
        });
        navigate(`/login?redirect=/car/${carId}`);
        return;
      }

      // Ensure profile exists / merge lead info
      const profilePayload: Record<string, unknown> = { id: user.id, email: user.email };
      if (leadInfo) {
        if (leadInfo.name) profilePayload.name = leadInfo.name;
        if (leadInfo.surname) profilePayload.surname = leadInfo.surname;
        if (leadInfo.phone) profilePayload.phone = leadInfo.phone;
        if (leadInfo.address) profilePayload.address = leadInfo.address;
        if (leadInfo.linkedin) profilePayload.linkedin = leadInfo.linkedin;
      }
      await supabase.from("profiles").upsert(profilePayload, { onConflict: "id" });

      const paymentAmount = participationPrice * numParticipations;

      const { error: insertError } = await supabase.from("participation_requests").insert({
        user_id: user.id,
        car_id: carId,
        num_participations: numParticipations,
        status: "pending",
        questionnaire_answers: answers,
        payment_amount: paymentAmount,
        payment_status: "pending",
      });

      if (insertError) throw insertError;

      sessionStorage.removeItem(STORAGE_KEY(carId));

      toast({
        title: "¡Solicitud enviada correctamente!",
        description: `Tu solicitud para ${carName} está en revisión. Te contactaremos pronto.`,
      });
      onComplete();
    } catch (err) {
      console.error("Error submitting participation request:", err);
      toast({
        title: "Error al enviar la solicitud",
        description: err instanceof Error ? err.message : "Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const RadioQuestion = ({
    id,
    question,
    options,
    note,
  }: {
    id: string;
    question: string;
    options: { value: string; label: string; note?: string }[];
    note?: string;
  }) => (
    <div className="space-y-3">
      <Label className="text-foreground text-sm font-semibold leading-snug block">{question}</Label>
      {note && <p className="text-xs text-muted-foreground italic">{note}</p>}
      <RadioGroup value={answers[id] || ""} onValueChange={(v) => setAnswer(id, v)} className="space-y-2">
        {options.map((opt) => (
          <div key={opt.value} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/30 transition-colors">
            <RadioGroupItem value={opt.value} id={`${id}-${opt.value}`} className="mt-0.5" />
            <Label htmlFor={`${id}-${opt.value}`} className="text-sm text-foreground cursor-pointer leading-snug">
              {opt.label}
              {opt.note && <span className="text-xs text-muted-foreground italic ml-1">({opt.note})</span>}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold text-foreground">
          {sectionEmojis[step]} Sección {step + 1}: {sectionTitles[step]}
        </h3>
        <p className="text-xs text-muted-foreground">
          Cuestionario de Evaluación para Vehículos Deportivos de Alta Cilindrada
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Paso {step + 1} de {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-5 max-h-[50vh] overflow-y-auto pr-1">
        {step === 0 && (
          <>
            <RadioQuestion id="q1" question="1. ¿Posee licencia de conducir válida y en vigor?" options={[{ value: "si", label: "Sí" }, { value: "no", label: "No", note: "EXCLUYENTE" }]} />
            <RadioQuestion id="q2" question="2. ¿Cuál es la antigüedad de su licencia de conducir?" options={[{ value: "menos2", label: "Menos de 2 años", note: "EXCLUYENTE" }, { value: "2a5", label: "Entre 2 y 5 años" }, { value: "mas5", label: "Más de 5 años" }]} />
            <RadioQuestion id="q3" question="3. ¿Ha tenido sanciones graves de tráfico en los últimos 5 años?" note="p. ej.: conducción temeraria, exceso de velocidad grave, alcohol/drogas, fuga" options={[{ value: "si", label: "Sí", note: "EXCLUYENTE si > 1 o alcohol/drogas" }, { value: "no", label: "No" }]} />
            <RadioQuestion id="q4" question="4. ¿Ha estado involucrado en más de un accidente con culpa en los últimos 3 años?" options={[{ value: "si", label: "Sí" }, { value: "no", label: "No" }]} />
            <RadioQuestion id="q5" question="5. ¿Ha sido condenado por algún delito en los últimos 5 años?" options={[{ value: "si", label: "Sí", note: "puede ser excluyente" }, { value: "no", label: "No" }]} />
          </>
        )}

        {step === 1 && (
          <>
            <RadioQuestion id="q6" question="6. ¿Ha conducido vehículos de más de 300 CV?" options={[{ value: "si", label: "Sí" }, { value: "no", label: "No" }]} />
            <RadioQuestion id="q7" question="7. ¿Ha realizado cursos de conducción avanzada o deportiva?" options={[{ value: "si", label: "Sí" }, { value: "no", label: "No" }]} />
            <RadioQuestion id="q8" question="8. ¿Frecuencia conduciendo manuales de alto rendimiento?" options={[{ value: "frecuentemente", label: "Frecuentemente" }, { value: "ocasionalmente", label: "Ocasionalmente" }, { value: "nunca", label: "Nunca" }]} />
            <RadioQuestion id="q9" question="9. ¿Tiene experiencia en circuitos cerrados o conducción deportiva?" options={[{ value: "si", label: "Sí" }, { value: "no", label: "No" }]} />
            <RadioQuestion id="q10" question="10. ¿Tiene puntos perdidos en su carnet?" options={[{ value: "si", label: "Sí", note: "más de 3 puede ser excluyente" }, { value: "no", label: "No" }]} />
          </>
        )}

        {step === 2 && (
          <>
            <RadioQuestion id="q11" question="11. ¿Cómo se considera al volante?" options={[{ value: "tranquilo", label: "Tranquilo/a y prudente" }, { value: "competitivo", label: "Competitivo/a" }, { value: "impulsivo", label: "Impulsivo/a", note: "riesgo medio-alto" }]} />
            <RadioQuestion id="q12" question="12. ¿Reacción ante un adelantamiento agresivo?" options={[{ value: "calma", label: "Mantengo la calma" }, { value: "confrontar", label: "Le sigo para confrontarlo", note: "EXCLUYENTE" }, { value: "molesta", label: "Me molesta pero sigo" }]} />
            <RadioQuestion id="q13" question="13. ¿Le atrae «probar los límites» en vía pública?" options={[{ value: "no", label: "No" }, { value: "depende", label: "Depende", note: "riesgo medio" }, { value: "si", label: "Sí", note: "EXCLUYENTE" }]} />
            <RadioQuestion id="q14" question="14. ¿Ha conducido bajo alcohol/drogas alguna vez?" options={[{ value: "no", label: "No" }, { value: "hace5", label: "Sí, hace +5 años" }, { value: "reciente", label: "Sí, en los últimos 5 años", note: "EXCLUYENTE" }]} />
            <RadioQuestion id="q15" question="15. ¿Reconoce cuándo no debe conducir y actúa en consecuencia?" options={[{ value: "si", label: "Sí" }, { value: "no", label: "No", note: "EXCLUYENTE" }]} />
          </>
        )}

        {step === 3 && (
          <>
            {(["q16", "q17", "q18"] as const).map((qid, i) => (
              <div className="space-y-3" key={qid}>
                <Label className="text-foreground text-sm font-semibold leading-snug block">
                  {16 + i}. {["Describa brevemente su motivación para alquilar este tipo de vehículo.", "¿Cómo planea utilizar el vehículo durante el periodo de alquiler?", "¿Tiene previsto transportar pasajeros? ¿Qué medidas de seguridad tomaría?"][i]}
                </Label>
                <Textarea
                  value={answers[qid] || ""}
                  onChange={(e) => setAnswer(qid, e.target.value)}
                  placeholder="Escriba su respuesta aquí..."
                  className="bg-background border-border text-foreground min-h-[80px]"
                  maxLength={500}
                />
              </div>
            ))}
          </>
        )}
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-border">
        <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="text-muted-foreground">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </Button>

        {step < totalSteps - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canAdvance()} className="bg-foreground text-background hover:bg-foreground/90">
            Siguiente
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleFinish} disabled={!canAdvance() || isSubmitting} className="bg-foreground text-background hover:bg-foreground/90">
            {isSubmitting ? "Enviando..." : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Finalizar
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EvaluationQuestionnaire;
