import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useQuestionnaireConfig, useScoringConfig, type ScoringRule } from "@/hooks/useSolicitudesData";

const SECTION_LABELS: Record<number, string> = {
  1: "Historial",
  2: "Aptitudes",
  3: "Psicología",
  4: "Adicionales",
};

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export const QuestionnaireConfigModal = ({ open, onOpenChange }: Props) => {
  const qc = useQueryClient();
  const { data: questions = [] } = useQuestionnaireConfig();
  const { data: rules = [] } = useScoringConfig();
  const [localRules, setLocalRules] = useState<Record<string, Partial<ScoringRule>>>({});

  const maxPossible = (() => {
    const byKey: Record<string, number> = {};
    rules.forEach((r) => {
      const override = localRules[r.id]?.points;
      const pts = override != null ? Number(override) : r.points;
      byKey[r.question_key] = Math.max(byKey[r.question_key] || 0, pts);
    });
    return Object.values(byKey).reduce((a, b) => a + b, 0);
  })();

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("questionnaire_config")
        .update({ is_active })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["questionnaire_config"] });
      toast.success("Pregunta actualizada");
    },
  });

  const saveRule = useMutation({
    mutationFn: async (id: string) => {
      const patch = localRules[id];
      if (!patch) return;
      const { error } = await supabase.from("scoring_config").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_d, id) => {
      qc.invalidateQueries({ queryKey: ["scoring_config"] });
      setLocalRules((p) => {
        const n = { ...p };
        delete n[id];
        return n;
      });
      toast.success("Regla guardada");
    },
    onError: () => toast.error("Error al guardar"),
  });

  const saveAll = useMutation({
    mutationFn: async () => {
      const ids = Object.keys(localRules);
      for (const id of ids) {
        const { error } = await supabase.from("scoring_config").update(localRules[id]).eq("id", id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["scoring_config"] });
      setLocalRules({});
      toast.success("Configuración guardada");
    },
  });

  const updateLocal = (id: string, patch: Partial<ScoringRule>) =>
    setLocalRules((p) => ({ ...p, [id]: { ...p[id], ...patch } }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configuración del Cuestionario</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="preguntas" className="mt-2">
          <TabsList>
            <TabsTrigger value="preguntas">Preguntas</TabsTrigger>
            <TabsTrigger value="scoring">Configuración de Scoring</TabsTrigger>
          </TabsList>

          <TabsContent value="preguntas" className="mt-4">
            <div className="space-y-2">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/40"
                >
                  <Badge variant="outline" className="shrink-0">#{q.order_index}</Badge>
                  <Badge variant="secondary" className="shrink-0">
                    {SECTION_LABELS[q.section] || q.section}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{q.question_text}</p>
                    <p className="text-xs text-muted-foreground">
                      {q.question_key} · {q.question_type}
                    </p>
                  </div>
                  <Switch
                    checked={q.is_active}
                    onCheckedChange={(v) => toggleActive.mutate({ id: q.id, is_active: v })}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scoring" className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">
                Score máximo posible: <span className="font-bold text-foreground">{maxPossible} pts</span>
              </p>
              <Button
                size="sm"
                disabled={Object.keys(localRules).length === 0 || saveAll.isPending}
                onClick={() => saveAll.mutate()}
              >
                Guardar toda la configuración
              </Button>
            </div>
            <div className="border border-border/40 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pregunta</TableHead>
                    <TableHead>Respuesta</TableHead>
                    <TableHead className="w-20">Puntos</TableHead>
                    <TableHead className="w-24">Excluyente</TableHead>
                    <TableHead className="w-32">Riesgo</TableHead>
                    <TableHead className="w-20"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((r) => {
                    const local = localRules[r.id] || {};
                    const points = local.points ?? r.points;
                    const isExcl = local.is_excludent ?? r.is_excludent;
                    const flag = local.risk_flag ?? r.risk_flag;
                    const dirty = !!localRules[r.id];
                    return (
                      <TableRow key={r.id}>
                        <TableCell className="font-mono text-xs">{r.question_key}</TableCell>
                        <TableCell className="text-xs">{r.answer_value}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={points}
                            onChange={(e) => updateLocal(r.id, { points: Number(e.target.value) })}
                            className="h-8 w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={isExcl}
                            onCheckedChange={(v) => updateLocal(r.id, { is_excludent: v })}
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={flag}
                            onValueChange={(v) => updateLocal(r.id, { risk_flag: v as any })}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Ninguno</SelectItem>
                              <SelectItem value="orange">Naranja</SelectItem>
                              <SelectItem value="red">Rojo</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {dirty && (
                            <Button size="sm" variant="outline" onClick={() => saveRule.mutate(r.id)}>
                              Guardar
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
