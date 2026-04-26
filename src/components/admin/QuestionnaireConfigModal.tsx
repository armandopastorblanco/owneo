import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useQuestionnaireConfig, useScoringConfig, type ScoringRule, type QuestionConfig } from "@/hooks/useSolicitudesData";

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

type EditState = {
  id?: string;
  question_key: string;
  question_text: string;
  question_type: string;
  section: number;
  order_index: number;
  is_active: boolean;
  options: { value: string; label: string }[];
};

const emptyEdit = (order_index: number): EditState => ({
  question_key: "",
  question_text: "",
  question_type: "radio",
  section: 1,
  order_index,
  is_active: true,
  options: [{ value: "", label: "" }],
});

export const QuestionnaireConfigModal = ({ open, onOpenChange }: Props) => {
  const qc = useQueryClient();
  const { data: questions = [] } = useQuestionnaireConfig();
  const { data: rules = [] } = useScoringConfig();
  const [localRules, setLocalRules] = useState<Record<string, Partial<ScoringRule>>>({});
  const [editing, setEditing] = useState<EditState | null>(null);

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

  const reorder = useMutation({
    mutationFn: async ({ id, direction }: { id: string; direction: "up" | "down" }) => {
      const sorted = [...questions].sort((a, b) => a.order_index - b.order_index);
      const idx = sorted.findIndex((q) => q.id === id);
      const swapWith = direction === "up" ? idx - 1 : idx + 1;
      if (swapWith < 0 || swapWith >= sorted.length) return;
      const a = sorted[idx];
      const b = sorted[swapWith];
      const { error: e1 } = await supabase
        .from("questionnaire_config")
        .update({ order_index: b.order_index })
        .eq("id", a.id);
      if (e1) throw e1;
      const { error: e2 } = await supabase
        .from("questionnaire_config")
        .update({ order_index: a.order_index })
        .eq("id", b.id);
      if (e2) throw e2;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["questionnaire_config"] }),
    onError: (e: any) => toast.error(e.message || "Error"),
  });

  const removeQuestion = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("questionnaire_config").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["questionnaire_config"] });
      toast.success("Pregunta eliminada");
    },
    onError: (e: any) => toast.error(e.message || "Error"),
  });

  const upsertQuestion = useMutation({
    mutationFn: async (data: EditState) => {
      const payload = {
        question_key: data.question_key.trim(),
        question_text: data.question_text.trim(),
        question_type: data.question_type,
        section: data.section,
        order_index: data.order_index,
        is_active: data.is_active,
        options: data.question_type === "radio" ? data.options.filter((o) => o.value && o.label) : [],
      };
      if (!payload.question_key || !payload.question_text) throw new Error("Clave y texto requeridos");
      if (data.id) {
        const { error } = await supabase.from("questionnaire_config").update(payload).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("questionnaire_config").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["questionnaire_config"] });
      toast.success("Pregunta guardada");
      setEditing(null);
    },
    onError: (e: any) => toast.error(e.message || "Error"),
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

  const startEdit = (q: QuestionConfig) => {
    const opts = Array.isArray(q.options) ? (q.options as any[]) : [];
    setEditing({
      id: q.id,
      question_key: q.question_key,
      question_text: q.question_text,
      question_type: q.question_type,
      section: q.section,
      order_index: q.order_index,
      is_active: q.is_active,
      options: opts.length ? opts.map((o) => ({ value: String(o.value ?? ""), label: String(o.label ?? "") })) : [{ value: "", label: "" }],
    });
  };

  const startCreate = () => {
    const maxOrder = questions.reduce((m, q) => Math.max(m, q.order_index), 0);
    setEditing(emptyEdit(maxOrder + 1));
  };

  const sortedQuestions = [...questions].sort((a, b) => a.order_index - b.order_index);

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
            <div className="flex justify-end mb-3">
              <Button size="sm" onClick={startCreate}>
                <Plus className="w-4 h-4 mr-1" /> Añadir pregunta
              </Button>
            </div>
            <div className="space-y-2">
              {sortedQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/40"
                >
                  <div className="flex flex-col gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      disabled={idx === 0}
                      onClick={() => reorder.mutate({ id: q.id, direction: "up" })}
                    >
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      disabled={idx === sortedQuestions.length - 1}
                      onClick={() => reorder.mutate({ id: q.id, direction: "down" })}
                    >
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                  </div>
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
                  <Button size="icon" variant="ghost" onClick={() => startEdit(q)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      if (confirm(`¿Eliminar la pregunta "${q.question_key}"? Esto también borrará sus reglas de scoring.`)) {
                        removeQuestion.mutate(q.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
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

      {/* Edit / Create question dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Editar pregunta" : "Nueva pregunta"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Clave (question_key)</Label>
                  <Input
                    value={editing.question_key}
                    onChange={(e) => setEditing({ ...editing, question_key: e.target.value })}
                    placeholder="q19"
                  />
                </div>
                <div>
                  <Label>Orden</Label>
                  <Input
                    type="number"
                    value={editing.order_index}
                    onChange={(e) => setEditing({ ...editing, order_index: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <Label>Texto de la pregunta</Label>
                <Textarea
                  value={editing.question_text}
                  onChange={(e) => setEditing({ ...editing, question_text: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Sección</Label>
                  <Select
                    value={String(editing.section)}
                    onValueChange={(v) => setEditing({ ...editing, section: Number(v) })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(SECTION_LABELS).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tipo</Label>
                  <Select
                    value={editing.question_type}
                    onValueChange={(v) => setEditing({ ...editing, question_type: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="radio">Opción única</SelectItem>
                      <SelectItem value="text">Texto libre</SelectItem>
                      <SelectItem value="number">Número</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end gap-2">
                  <Switch
                    checked={editing.is_active}
                    onCheckedChange={(v) => setEditing({ ...editing, is_active: v })}
                  />
                  <Label>Activa</Label>
                </div>
              </div>

              {editing.question_type === "radio" && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Opciones de respuesta</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setEditing({
                          ...editing,
                          options: [...editing.options, { value: "", label: "" }],
                        })
                      }
                    >
                      <Plus className="w-3 h-3 mr-1" /> Añadir opción
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {editing.options.map((opt, i) => (
                      <div key={i} className="flex gap-2">
                        <Input
                          placeholder="value (ej: yes)"
                          value={opt.value}
                          onChange={(e) => {
                            const opts = [...editing.options];
                            opts[i] = { ...opts[i], value: e.target.value };
                            setEditing({ ...editing, options: opts });
                          }}
                          className="w-1/3"
                        />
                        <Input
                          placeholder="Etiqueta visible"
                          value={opt.label}
                          onChange={(e) => {
                            const opts = [...editing.options];
                            opts[i] = { ...opts[i], label: e.target.value };
                            setEditing({ ...editing, options: opts });
                          }}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            setEditing({
                              ...editing,
                              options: editing.options.filter((_, j) => j !== i),
                            })
                          }
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Recuerda añadir las reglas de scoring para cada nuevo "value" en la pestaña Scoring.
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancelar</Button>
            <Button
              onClick={() => editing && upsertQuestion.mutate(editing)}
              disabled={upsertQuestion.isPending}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};
