import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const CATS = [
  { v: "multa", label: "Multa" },
  { v: "servicio", label: "Servicio" },
  { v: "extra", label: "Extra" },
];

const catColor = (c: string) =>
  c === "multa" ? "bg-red-500/15 text-red-400 border-red-500/30"
  : c === "servicio" ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
  : "bg-amber-500/15 text-amber-400 border-amber-500/30";

const ExtraCostTypesManager = () => {
  const qc = useQueryClient();
  const { data: items = [] } = useQuery({
    queryKey: ["extra-cost-types"],
    queryFn: async () => {
      const { data, error } = await supabase.from("extra_cost_types" as any).select("*").order("sort_order");
      if (error) throw error;
      return (data as any[]) || [];
    },
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [delId, setDelId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({ name: "", category: "multa", description: "", default_amount: "", is_active: true });

  const openDlg = (t: any = null) => {
    setEditing(t);
    setForm(t ? { name: t.name, category: t.category, description: t.description || "", default_amount: t.default_amount ?? "", is_active: t.is_active }
              : { name: "", category: "multa", description: "", default_amount: "", is_active: true });
    setOpen(true);
  };

  const save = async () => {
    if (!form.name.trim()) return toast.error("Nombre obligatorio");
    const payload = {
      name: form.name,
      category: form.category,
      description: form.description || null,
      default_amount: form.default_amount === "" ? null : Number(form.default_amount),
      is_active: form.is_active,
    };
    if (editing) {
      const { error } = await supabase.from("extra_cost_types" as any).update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Actualizado");
    } else {
      const { error } = await supabase.from("extra_cost_types" as any).insert({ ...payload, sort_order: items.length });
      if (error) return toast.error(error.message);
      toast.success("Creado");
    }
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["extra-cost-types"] });
  };

  const del = async () => {
    if (!delId) return;
    const { error } = await supabase.from("extra_cost_types" as any).delete().eq("id", delId);
    if (error) return toast.error(error.message);
    toast.success("Eliminado");
    setDelId(null);
    qc.invalidateQueries({ queryKey: ["extra-cost-types"] });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Costes extra</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">Multas, servicios y cargos adicionales aplicables a participantes.</p>
        </div>
        <Button size="sm" onClick={() => openDlg()}><Plus className="h-4 w-4 mr-1" />Añadir</Button>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground uppercase border-b border-border/40">
            <tr>
              <th className="text-left py-2 font-normal">Nombre</th>
              <th className="text-left py-2 font-normal">Categoría</th>
              <th className="text-left py-2 font-normal">Descripción</th>
              <th className="text-right py-2 font-normal">Importe sugerido</th>
              <th className="text-center py-2 font-normal">Activo</th>
              <th className="text-right py-2 font-normal">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id} className="border-b border-border/20">
                <td className="py-2 font-medium">{t.name}</td>
                <td className="py-2"><Badge variant="outline" className={catColor(t.category)}>{t.category}</Badge></td>
                <td className="py-2 text-muted-foreground text-xs max-w-xs truncate">{t.description}</td>
                <td className="py-2 text-right">{t.default_amount != null ? `€${Number(t.default_amount).toLocaleString()}` : "—"}</td>
                <td className="py-2 text-center">{t.is_active ? <Badge variant="default">Sí</Badge> : <Badge variant="secondary">No</Badge>}</td>
                <td className="py-2 text-right">
                  <Button size="icon" variant="ghost" onClick={() => openDlg(t)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => setDelId(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={6} className="py-6 text-center text-muted-foreground text-sm">Sin tipos de costes extra.</td></tr>
            )}
          </tbody>
        </table>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Editar coste extra" : "Nuevo coste extra"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nombre *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div>
              <Label>Categoría *</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CATS.map(c => <SelectItem key={c.v} value={c.v}>{c.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Importe sugerido (€)</Label><Input type="number" step="0.01" value={form.default_amount} onChange={(e) => setForm({ ...form, default_amount: e.target.value })} /></div>
            <div><Label>Descripción</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /><Label>Activo</Label></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!delId} onOpenChange={(o) => !o && setDelId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este tipo?</AlertDialogTitle>
            <AlertDialogDescription>Los pagos existentes que lo referencian conservarán el importe pero perderán el vínculo.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={del}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default ExtraCostTypesManager;
