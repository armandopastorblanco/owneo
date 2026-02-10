import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { FileText, Shield, Brain, MessageSquare, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

interface EvaluationQuestionnaireProps {
  carName: string;
  onComplete: () => void;
}

const EvaluationQuestionnaire = ({ carName, onComplete }: EvaluationQuestionnaireProps) => {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const setAnswer = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const sectionIcons = [
    <FileText className="w-5 h-5" />,
    <Shield className="w-5 h-5" />,
    <Brain className="w-5 h-5" />,
    <MessageSquare className="w-5 h-5" />,
  ];

  const sectionTitles = [
    "Historial como conductor y ciudadano",
    "Aptitudes y experiencia como conductor",
    "Evaluación psicológica básica",
    "Preguntas adicionales de control",
  ];

  const sectionEmojis = ["📄", "🛞", "🧠", "📌"];

  const canAdvance = () => {
    if (step === 0) {
      return answers.q1 && answers.q2 && answers.q3 && answers.q4 && answers.q5;
    }
    if (step === 1) {
      return answers.q6 && answers.q7 && answers.q8 && answers.q9 && answers.q10;
    }
    if (step === 2) {
      return answers.q11 && answers.q12 && answers.q13 && answers.q14 && answers.q15;
    }
    if (step === 3) {
      return answers.q16?.trim() && answers.q17?.trim() && answers.q18?.trim();
    }
    return false;
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "✅ Cuestionario completado",
      description: `Tu evaluación para ${carName} ha sido enviada correctamente. Nos pondremos en contacto contigo pronto.`,
    });
    setIsSubmitting(false);
    onComplete();
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
      <Label className="text-foreground text-sm font-semibold leading-snug block">
        {question}
      </Label>
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
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold text-foreground">
          {sectionEmojis[step]} Sección {step + 1}: {sectionTitles[step]}
        </h3>
        <p className="text-xs text-muted-foreground">
          Cuestionario de Evaluación para Vehículos Deportivos de Alta Cilindrada
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Paso {step + 1} de {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <div className="space-y-5 max-h-[50vh] overflow-y-auto pr-1">
        {step === 0 && (
          <>
            <RadioQuestion
              id="q1"
              question="1. ¿Posee licencia de conducir válida y en vigor?"
              options={[
                { value: "si", label: "Sí" },
                { value: "no", label: "No", note: "EXCLUYENTE" },
              ]}
            />
            <RadioQuestion
              id="q2"
              question="2. ¿Cuál es la antigüedad de su licencia de conducir?"
              options={[
                { value: "menos2", label: "Menos de 2 años", note: "EXCLUYENTE" },
                { value: "2a5", label: "Entre 2 y 5 años" },
                { value: "mas5", label: "Más de 5 años" },
              ]}
            />
            <RadioQuestion
              id="q3"
              question="3. ¿Ha tenido sanciones graves de tráfico en los últimos 5 años?"
              note="p. ej.: conducción temeraria, exceso de velocidad grave, conducir bajo efectos del alcohol/drogas, accidentes con fuga"
              options={[
                { value: "si", label: "Sí", note: "EXCLUYENTE si hay más de una o si incluye alcohol/drogas" },
                { value: "no", label: "No" },
              ]}
            />
            <RadioQuestion
              id="q4"
              question="4. ¿Ha estado involucrado en más de un accidente con culpa en los últimos 3 años?"
              options={[
                { value: "si", label: "Sí" },
                { value: "no", label: "No" },
              ]}
            />
            <RadioQuestion
              id="q5"
              question="5. ¿Ha sido condenado por algún delito en los últimos 5 años?"
              options={[
                { value: "si", label: "Sí", note: "dependiendo del delito, puede ser excluyente" },
                { value: "no", label: "No" },
              ]}
            />
          </>
        )}

        {step === 1 && (
          <>
            <RadioQuestion
              id="q6"
              question="6. ¿Ha conducido previamente vehículos de más de 300 caballos de potencia?"
              options={[
                { value: "si", label: "Sí" },
                { value: "no", label: "No" },
              ]}
            />
            <RadioQuestion
              id="q7"
              question="7. ¿Ha realizado cursos de conducción avanzada o deportiva?"
              note="Conducción segura, control de derrapes, etc."
              options={[
                { value: "si", label: "Sí" },
                { value: "no", label: "No" },
              ]}
            />
            <RadioQuestion
              id="q8"
              question="8. ¿Con qué frecuencia conduce vehículos manuales de alto rendimiento?"
              options={[
                { value: "frecuentemente", label: "Frecuentemente" },
                { value: "ocasionalmente", label: "Ocasionalmente" },
                { value: "nunca", label: "Nunca" },
              ]}
            />
            <RadioQuestion
              id="q9"
              question="9. ¿Tiene experiencia en circuitos cerrados o conducción deportiva?"
              options={[
                { value: "si", label: "Sí" },
                { value: "no", label: "No" },
              ]}
            />
            <RadioQuestion
              id="q10"
              question="10. ¿Tiene actualmente algún punto menos en su carnet por sanciones?"
              note="España: puntos del carnet de conducir"
              options={[
                { value: "si", label: "Sí", note: "más de 3 puntos perdidos puede ser excluyente" },
                { value: "no", label: "No" },
              ]}
            />
          </>
        )}

        {step === 2 && (
          <>
            <RadioQuestion
              id="q11"
              question="11. ¿Cómo se considera al volante?"
              options={[
                { value: "tranquilo", label: "Tranquilo/a y prudente" },
                { value: "competitivo", label: "Competitivo/a" },
                { value: "impulsivo", label: "Impulsivo/a", note: "riesgo moderado-alto" },
              ]}
            />
            <RadioQuestion
              id="q12"
              question="12. ¿Cómo reaccionaría si otro conductor le adelanta de forma agresiva?"
              options={[
                { value: "calma", label: "Mantengo la calma y no respondo" },
                { value: "confrontar", label: "Le sigo para confrontarlo", note: "EXCLUYENTE" },
                { value: "molesta", label: "Me molesta pero sigo mi camino" },
              ]}
            />
            <RadioQuestion
              id="q13"
              question="13. ¿Le atrae la idea de «probar los límites» de un coche como un Ferrari en la vía pública?"
              options={[
                { value: "no", label: "No, soy consciente del riesgo" },
                { value: "depende", label: "Depende de la situación", note: "riesgo medio" },
                { value: "si", label: "Sí", note: "EXCLUYENTE" },
              ]}
            />
            <RadioQuestion
              id="q14"
              question="14. ¿Ha consumido alcohol o drogas antes de conducir alguna vez?"
              options={[
                { value: "no", label: "No" },
                { value: "hace5", label: "Sí, hace más de 5 años" },
                { value: "reciente", label: "Sí, en los últimos 5 años", note: "EXCLUYENTE" },
              ]}
            />
            <RadioQuestion
              id="q15"
              question="15. ¿Es usted capaz de reconocer cuándo no se encuentra en condiciones para conducir y actuar en consecuencia?"
              options={[
                { value: "si", label: "Sí" },
                { value: "no", label: "No", note: "EXCLUYENTE" },
              ]}
            />
          </>
        )}

        {step === 3 && (
          <>
            <div className="space-y-3">
              <Label className="text-foreground text-sm font-semibold leading-snug block">
                16. Describa brevemente su motivación para alquilar este tipo de vehículo.
              </Label>
              <Textarea
                value={answers.q16 || ""}
                onChange={(e) => setAnswer("q16", e.target.value)}
                placeholder="Escriba su respuesta aquí..."
                className="bg-background border-border text-foreground min-h-[80px]"
                maxLength={500}
              />
            </div>
            <div className="space-y-3">
              <Label className="text-foreground text-sm font-semibold leading-snug block">
                17. ¿Cómo planea utilizar el vehículo durante el periodo de alquiler?
              </Label>
              <p className="text-xs text-muted-foreground italic">
                Ej. desplazamientos urbanos, turismo, eventos especiales, etc.
              </p>
              <Textarea
                value={answers.q17 || ""}
                onChange={(e) => setAnswer("q17", e.target.value)}
                placeholder="Escriba su respuesta aquí..."
                className="bg-background border-border text-foreground min-h-[80px]"
                maxLength={500}
              />
            </div>
            <div className="space-y-3">
              <Label className="text-foreground text-sm font-semibold leading-snug block">
                18. ¿Tiene previsto transportar pasajeros? En caso afirmativo, ¿qué medidas de seguridad tomaría?
              </Label>
              <Textarea
                value={answers.q18 || ""}
                onChange={(e) => setAnswer("q18", e.target.value)}
                placeholder="Escriba su respuesta aquí..."
                className="bg-background border-border text-foreground min-h-[80px]"
                maxLength={500}
              />
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-2 border-t border-border">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="text-muted-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </Button>

        {step < totalSteps - 1 ? (
          <Button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance()}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            Siguiente
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={handleFinish}
            disabled={!canAdvance() || isSubmitting}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
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
