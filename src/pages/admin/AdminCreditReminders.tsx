import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Trash2, Bell } from "lucide-react";

interface Rule {
  id: string;
  label: string;
  days_before_reset: number;
  is_active: boolean;
}

const AdminCreditReminders = () => {
  const qc = useQueryClient();
  const [label, setLabel] = useState("");
  const [days, setDays] = useState<number>(30);

  const { data: rules = [], isLoading } = useQuery({
    queryKey: ["credit-reminder-rules"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("credit_reminder_rules")
        .select("*")
        .order("days_before_reset", { ascending: false });
      if (error) throw error;
      return (data || []) as Rule[];
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      if (!label.trim() || !days || days < 1) throw new Error("Datos inválidos");
      const { error } = await (supabase as any)
        .from("credit_reminder_rules")
        .insert({ label: label.trim(), days_before_reset: days, is_active: true });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["credit-reminder-rules"] });
      setLabel(""); setDays(30);
      toast.success("Regla creada");
    },
    onError: (e: any) => toast.error(e.message || "Error"),
  });

  const toggle = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await (supabase as any)
        .from("credit_reminder_rules")
        .update({ is_active })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["credit-reminder-rules"] }),
    onError: () => toast.error("Error al actualizar"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from("credit_reminder_rules")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["credit-reminder-rules"] });
      toast.success("Regla eliminada");
    },
  });

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" /> Reglas de rappel créditos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configura cuándo enviar recordatorios automáticos a los usuarios antes del reset de sus créditos.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Nueva regla</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr,160px] gap-3">
            <div>
              <Label>Etiqueta</Label>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Ej. Recordatorio a 30 días"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Días antes del reset</Label>
              <Input
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>
          <Button onClick={() => create.mutate()} disabled={create.isPending}>
            Crear regla
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {isLoading && <p className="text-sm text-muted-foreground">Cargando…</p>}
        {!isLoading && rules.length === 0 && (
          <p className="text-sm text-muted-foreground">No hay reglas configuradas.</p>
        )}
        {rules.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{r.label}</p>
                <p className="text-xs text-muted-foreground">
                  Se envía <strong>{r.days_before_reset} días</strong> antes del reset
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={r.is_active}
                  onCheckedChange={(v) => toggle.mutate({ id: r.id, is_active: v })}
                />
                <span className="text-xs text-muted-foreground w-14">
                  {r.is_active ? "Activa" : "Inactiva"}
                </span>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar regla?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Los recordatorios ya enviados no se verán afectados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => remove.mutate(r.id)}>
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminCreditReminders;
