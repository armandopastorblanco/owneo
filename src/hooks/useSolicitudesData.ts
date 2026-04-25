import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ScoringRule = {
  id: string;
  question_key: string;
  answer_value: string;
  points: number;
  is_excludent: boolean;
  excludent_type: string | null;
  risk_flag: "none" | "orange" | "red";
};

export type QuestionConfig = {
  id: string;
  question_key: string;
  section: number;
  question_text: string;
  question_type: "radio" | "textarea";
  order_index: number;
  is_active: boolean;
  options: { value: string; label: string }[];
};

export type Tag = { id: string; name: string; color: string };

export function useScoringConfig() {
  return useQuery({
    queryKey: ["scoring_config"],
    queryFn: async () => {
      const { data, error } = await supabase.from("scoring_config").select("*");
      if (error) throw error;
      return (data || []) as ScoringRule[];
    },
  });
}

export function useQuestionnaireConfig() {
  return useQuery({
    queryKey: ["questionnaire_config"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("questionnaire_config")
        .select("*")
        .order("order_index");
      if (error) throw error;
      return (data || []).map((r: any) => ({
        ...r,
        options: Array.isArray(r.options) ? r.options : [],
      })) as QuestionConfig[];
    },
  });
}

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tags").select("*").order("name");
      if (error) throw error;
      return (data || []) as Tag[];
    },
  });
}

/** Compute auto score from answers JSONB and scoring rules */
export function computeAutoScore(
  answers: Record<string, string> | null | undefined,
  rules: ScoringRule[],
) {
  if (!answers) return { total: 0, max: 0, excludent: [], orange: [], red: [], breakdown: [] as any[] };
  const byKey: Record<string, ScoringRule[]> = {};
  rules.forEach((r) => {
    byKey[r.question_key] = byKey[r.question_key] || [];
    byKey[r.question_key].push(r);
  });

  let total = 0;
  let max = 0;
  const excludent: string[] = [];
  const orange: string[] = [];
  const red: string[] = [];
  const breakdown: { question_key: string; answer: string; points: number; rule?: ScoringRule }[] = [];

  Object.entries(byKey).forEach(([qk, qRules]) => {
    const maxQ = Math.max(0, ...qRules.map((r) => r.points));
    max += maxQ;
    const ans = answers[qk];
    const rule = qRules.find((r) => r.answer_value === ans);
    if (rule) {
      total += rule.points;
      if (rule.is_excludent) excludent.push(qk);
      if (rule.risk_flag === "orange") orange.push(qk);
      if (rule.risk_flag === "red") red.push(qk);
      breakdown.push({ question_key: qk, answer: ans, points: rule.points, rule });
    } else if (ans) {
      breakdown.push({ question_key: qk, answer: ans, points: 0 });
    }
  });

  // Normalize to /100
  const normalized = max > 0 ? Math.round((total / max) * 100) : 0;
  return { total, max, normalized, excludent, orange, red, breakdown };
}
