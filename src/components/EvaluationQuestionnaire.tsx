import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface EvaluationQuestionnaireProps {
  carId: string;
  carName: string;
  numParticipations: number;
  participationPrice: number;
  leadInfo?: Record<string, string>;
  onComplete: () => void;
  /** "submit" (default) inserts the participation_request; "next" only validates and forwards. */
  submitMode?: "submit" | "next";
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
  order_index: number;
  options: QuestionOption[];
}

const STORAGE_KEY = (carId: string) => `owneo:questionnaire:${carId}`;

const EvaluationQuestionnaire = ({
  carId,
  carName,
  numParticipations,
  participationPrice,
  leadInfo,
  onComplete,
  submitMode = "submit",
}: EvaluationQuestionnaireProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [questions, setQuestions] = useState<QuestionConfig[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY(carId));
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Load questions from Supabase
  useEffect(() => {
    const loadQuestions = async () => {
      setLoadingQuestions(true);
      const { data, error } = await supabase
        .from("questionnaire_config")
        .select("*")
        .eq("is_active", true)
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
        order_index: q.order_index,
        options: Array.isArray(q.options) ? (q.options as QuestionOption[]) : [],
      }));
      console.log("[questions loaded]", data?.length, data?.[0]);
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

  // Only radio questions are required; textareas are optional
  const radioQuestions = questions.filter((q) => q.question_type === "radio");
  console.log("[canSubmit] radio questions:", radioQuestions.length);
  console.log("[canSubmit] answers:", answers);
  const canSubmit = radioQuestions.every((q) => Boolean(answers[q.question_key]));
  console.log("[canSubmit] result:", canSubmit);

  const handleSubmit = async (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    console.log("SUBMIT CLICKED");
    setIsSubmitting(true);
    try {
      // "next" mode: don't insert; the parent flow handles persistence on the final step
      if (submitMode === "next") {
        onComplete();
        return;
      }
      const { data: { user } } = await supabase.auth.getUser();
      console.log("user:", user?.id, "carId:", carId);

      if (!user) {
        toast({
          title: "Inicia sesión",
          description: "Debes iniciar sesión para solicitar una participación",
          variant: "destructive",
        });
        navigate(`/login?redirect=/car/${carId}`);
        return;
      }

      // Best-effort profile upsert (non-blocking)
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

      const payload = {
        user_id: user.id,
        car_id: carId,
        num_participations: numParticipations,
        status: "pending",
        questionnaire_answers: answers,
        payment_amount: participationPrice * numParticipations,
        payment_status: "pending",
      };

      const { data, error } = await supabase
        .from("participation_requests")
        .insert(payload)
        .select()
        .single();

      console.log("[participation_requests] result:", data, error);

      if (error) {
        toast({
          title: "Error al enviar la solicitud",
          description: error.message,
          variant: "destructive",
        });
        return;
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

  if (loadingQuestions) {
    return (
      <div className="space-y-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No hay preguntas configuradas para el cuestionario.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold text-foreground">
          📋 Cuestionario de Evaluación
        </h3>
        <p className="text-xs text-muted-foreground">
          Responde a las {questions.length} preguntas para finalizar tu solicitud
        </p>
      </div>

      <div className="space-y-6 max-h-[55vh] overflow-y-auto pr-2">
        {questions.map((q, idx) => (
          <div className="space-y-3" key={q.id}>
            <Label className="text-foreground text-sm font-semibold leading-snug block">
              {idx + 1}. {q.question_text}
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

      <div className="pt-2 border-t border-border">
        <Button
          type="button"
          onClick={(event) => {
            console.log("BUTTON CLICKED - canSubmit:", canSubmit, "isSubmitting:", isSubmitting);
            void handleSubmit(event);
          }}
          disabled={!canSubmit || isSubmitting}
          className="w-full bg-foreground text-background hover:bg-foreground/90"
        >
          {isSubmitting ? "Enviando..." : (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Enviar solicitud
            </>
          )}
        </Button>
        {!canSubmit && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Responde a todas las preguntas obligatorias para continuar
          </p>
        )}
      </div>
    </div>
  );
};

export default EvaluationQuestionnaire;
