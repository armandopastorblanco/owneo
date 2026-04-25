import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
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

interface QuestionOption {
  label: string;
  value: string;
}

interface QuestionConfig {
  id: string;
  question_key: string;
  question_text: string;
  question_type: "radio" | "textarea";
  section: number;
  order_index: number;
  options: QuestionOption[];
}

const STORAGE_KEY = (carId: string) => `owneo:questionnaire:${carId}`;

const SECTION_TITLES: Record<number, string> = {
  1: "Historial como conductor y ciudadano",
  2: "Aptitudes y experiencia como conductor",
  3: "Evaluación psicológica básica",
  4: "Preguntas adicionales de control",
};
const SECTION_EMOJIS: Record<number, string> = {
  1: "📄",
  2: "🛞",
  3: "🧠",
  4: "📌",
};

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
  const [questions, setQuestions] = useState<QuestionConfig[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY(carId));
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Load questions dynamically from Supabase
  useEffect(() => {
    const loadQuestions = async () => {
      setLoadingQuestions(true);
      const { data, error } = await supabase
        .from("questionnaire_config")
        .select("*")
        .eq("is_active", true)
        .order("section", { ascending: true })
        .order("order_index", { ascending: true });

      if (error) {
        console.error("[questionnaire_config] load error:", error);
        toast({
          title: "Error al cargar el cuestionario",
          description: error.message,
          variant: "destructive",
        });
        setLoadingQuestions(false);
        return;
      }

      const normalized: QuestionConfig[] = (data ?? []).map((q: any) => ({
        id: q.id,
        question_key: q.question_key,
        question_text: q.question_text,
        question_type: q.question_type === "textarea" ? "textarea" : "radio",
        section: q.section,
        order_index: q.order_index,
        options: Array.isArray(q.options) ? (q.options as QuestionOption[]) : [],
      }));
      setQuestions(normalized);
      setLoadingQuestions(false);
    };
    loadQuestions();
  }, []);

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

  // Group questions by section
  const sections = useMemo(() => {
    const grouped = new Map<number, QuestionConfig[]>();
    for (const q of questions) {
      if (!grouped.has(q.section)) grouped.set(q.section, []);
      grouped.get(q.section)!.push(q);
    }
    return Array.from(grouped.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([section, qs]) => ({ section, questions: qs }));
  }, [questions]);

  const totalSteps = Math.max(sections.length, 1);
  const progress = ((step + 1) / totalSteps) * 100;
  const currentSection = sections[step];

  // Dynamic validation: only radio questions are required, textarea are optional
  const canAdvance = () => {
    if (!currentSection) return false;
    return currentSection.questions
      .filter((q) => q.question_type === "radio")
      .every((q) => Boolean(answers[q.question_key]));
  };

  const handleFinish = async (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    console.log("SUBMIT CLICKED");
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("car_id:", carId);
      console.log("auth.uid:", user?.id);

      if (!user) {
        toast({
          title: "Inicia sesión",
          description: "Debes iniciar sesión para solicitar una participación",
          variant: "destructive",
        });
        navigate(`/login?redirect=/car/${carId}`);
        return;
      }

      const profilePayload: {
        id: string;
        email?: string;
        name?: string;
        surname?: string;
        phone?: string;
        address?: string;
        linkedin?: string;
      } = { id: user.id, email: user.email ?? undefined };
      if (leadInfo) {
        if (leadInfo.name) profilePayload.name = leadInfo.name;
        if (leadInfo.surname) profilePayload.surname = leadInfo.surname;
        if (leadInfo.phone) profilePayload.phone = leadInfo.phone;
        if (leadInfo.address) profilePayload.address = leadInfo.address;
        if (leadInfo.linkedin) profilePayload.linkedin = leadInfo.linkedin;
      }
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert(profilePayload, { onConflict: "id" });
      if (profileError) {
        console.warn("Profile upsert failed (continuing):", profileError);
      }

      const paymentAmount = participationPrice * numParticipations;

      const payload = {
        user_id: user.id,
        car_id: carId,
        num_participations: numParticipations,
        status: "pending",
        questionnaire_answers: answers,
        payment_amount: paymentAmount,
        payment_status: "pending",
      };
      console.log("[participation_requests] inserting payload:", payload);

      const { data, error } = await supabase
        .from("participation_requests")
        .insert(payload)
        .select()
        .single();

      console.log("[participation_requests] inserted:", data);
      console.log("[participation_requests] error:", error);

      if (error) {
        throw error;
      }

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

  // Loading skeleton
  if (loadingQuestions) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-3 w-1/2 mx-auto" />
        </div>
        <Skeleton className="h-2 w-full" />
        <div className="space-y-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    );
  }

  if (!currentSection) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No hay preguntas configuradas para el cuestionario.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold text-foreground">
          {SECTION_EMOJIS[currentSection.section] ?? "•"} Sección {step + 1}:{" "}
          {SECTION_TITLES[currentSection.section] ?? `Sección ${currentSection.section}`}
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
        {currentSection.questions.map((q) => (
          <div className="space-y-3" key={q.id}>
            <Label className="text-foreground text-sm font-semibold leading-snug block">
              {q.order_index}. {q.question_text}
              {q.question_type === "textarea" && (
                <span className="text-xs text-muted-foreground italic ml-1">(opcional)</span>
              )}
            </Label>

            {q.question_type === "radio" ? (
              <RadioGroup
                value={answers[q.question_key] || ""}
                onValueChange={(v) => setAnswer(q.question_key, v)}
                className="space-y-2"
              >
                {q.options.map((opt) => (
                  <div
                    key={opt.value}
                    className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/30 transition-colors"
                  >
                    <RadioGroupItem
                      value={opt.value}
                      id={`${q.question_key}-${opt.value}`}
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor={`${q.question_key}-${opt.value}`}
                      className="text-sm text-foreground cursor-pointer leading-snug"
                    >
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <Textarea
                value={answers[q.question_key] || ""}
                onChange={(e) => setAnswer(q.question_key, e.target.value)}
                placeholder="Escriba su respuesta aquí..."
                className="bg-background border-border text-foreground min-h-[80px]"
                maxLength={500}
              />
            )}
          </div>
        ))}
      </div>

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
            type="button"
            onClick={(event) => void handleFinish(event)}
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
