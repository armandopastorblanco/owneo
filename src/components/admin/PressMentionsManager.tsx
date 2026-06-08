import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";

interface PressMention {
  id: string;
  name: string;
  quote: string;
  logo_key: string | null;
  sort_order: number;
  is_active: boolean;
}

const PressMentionsManager = () => {
  const [items, setItems] = useState<PressMention[]>([]);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<PressMention | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", quote: "", logo_key: "", is_active: true });

  const load = async () => {
    const { data } = await supabase
      .from("press_mentions" as any)
      .select("*")
      .order("sort_order", { ascending: true });
    setItems((data as any) || []);
  };

  const loadToggle = async () => {
    const { data } = await supabase
      .from("app_settings" as any)
      .select("value")
      .eq("key", "press_section_enabled")
      .maybeSingle();
    setEnabled((data as any)?.value !== "false");
  };

  useEffect(() => {
    load();
    loadToggle();
  }, []);

  const toggleSection = async (v: boolean) => {
    const prev = enabled;
    setEnabled(v);
    const { error } = await supabase
      .from("app_settings" as any)
      .upsert({ key: "press_section_enabled", value: v ? "true" : "false", updated_at: new Date().toISOString() } as any, { onConflict: "key" });
    if (error) {
      setEnabled(prev);
      return toast.error(error.message);
    }
    toast.success(v ? "Sección activada" : "Sección desactivada");
  };

  const openDialog = (m: PressMention | null = null) => {
    setEditing(m);
    setForm(
      m
        ? { name: m.name, quote: m.quote, logo_key: m.logo_key || "", is_active: m.is_active }
        : { name: "", quote: "", logo_key: "", is_active: true }
    );
    setDialogOpen(true);
  };

  const save = async () => {
    if (!form.name.trim() || !form.quote.trim()) return toast.error("Nombre y cita obligatorios");
    const payload = {
      name: form.name.trim(),
      quote: form.quote.trim(),
      logo_key: form.logo_key.trim() || null,
      is_active: form.is_active,
    };
    if (editing) {
      const { error } = await supabase.from("press_mentions" as any).update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Mención actualizada");
    } else {
      const { error } = await supabase
        .from("press_mentions" as any)
        .insert({ ...payload, sort_order: items.length });
      if (error) return toast.error(error.message);
      toast.success("Mención añadida");
    }
    setDialogOpen(false);
    load();
  };

  const del = async () => {
    if (!deletingId) return;
    const { error } = await supabase.from("press_mentions" as any).delete().eq("id", deletingId);
    if (error) return toast.error(error.message);
    toast.success("Eliminada");
    setDeletingId(null);
    load();
  };

  const toggleActive = async (m: PressMention) => {
    const { error } = await supabase.from("press_mentions" as any).update({ is_active: !m.is_active }).eq("id", m.id);
    if (error) return toast.error(error.message);
    load();
  };

  const move = async (m: PressMention, dir: -1 | 1) => {
    const idx = items.findIndex((x) => x.id === m.id);
    const target = items[idx + dir];
    if (!target) return;
    await supabase.from("press_mentions" as any).update({ sort_order: target.sort_order }).eq("id", m.id);
    await supabase.from("press_mentions" as any).update({ sort_order: m.sort_order }).eq("id", target.id);
    load();
  };

  return (
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between gap-4 p-3 rounded-md border border-border/40">
        <div>
          <Label className="text-sm">Mostrar sección "Hablan de Nosotros"</Label>
          <p className="text-xs text-muted-foreground mt-1">Visible en Home y Quienes Somos.</p>
        </div>
        <Switch checked={!!enabled} disabled={enabled === null} onCheckedChange={toggleSection} />
      </div>

      <div className="flex justify-end">
        <Button size="sm" onClick={() => openDialog()}>
          <Plus className="h-4 w-4 mr-1" />
          Añadir mención
        </Button>
      </div>

      <table className="w-full text-sm">
        <thead className="text-xs text-muted-foreground uppercase border-b border-border/40">
          <tr>
            <th className="text-left py-2 font-normal">Orden</th>
            <th className="text-left py-2 font-normal">Nombre</th>
            <th className="text-left py-2 font-normal">Cita</th>
            <th className="text-left py-2 font-normal">Logo</th>
            <th className="text-left py-2 font-normal">Activo</th>
            <th className="text-right py-2 font-normal">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((m, i) => (
            <tr key={m.id} className="border-b border-border/20">
              <td className="py-2">
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-6 w-6" disabled={i === 0} onClick={() => move(m, -1)}>
                    <ArrowUp className="h-3 w-3" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-6 w-6" disabled={i === items.length - 1} onClick={() => move(m, 1)}>
                    <ArrowDown className="h-3 w-3" />
                  </Button>
                </div>
              </td>
              <td className="py-2 font-medium">{m.name}</td>
              <td className="py-2 text-muted-foreground text-xs max-w-xs truncate italic">"{m.quote}"</td>
              <td className="py-2 text-xs text-muted-foreground">{m.logo_key || "—"}</td>
              <td className="py-2"><Switch checked={m.is_active} onCheckedChange={() => toggleActive(m)} /></td>
              <td className="py-2 text-right">
                <Button size="icon" variant="ghost" onClick={() => openDialog(m)}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => setDeletingId(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={6} className="py-6 text-center text-muted-foreground text-sm">Sin menciones.</td></tr>
          )}
        </tbody>
      </table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Editar mención" : "Nueva mención"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nombre del medio *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Forbes" /></div>
            <div><Label>Cita *</Label><Textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} /></div>
            <div>
              <Label>Logo predefinido (opcional)</Label>
              <Input value={form.logo_key} onChange={(e) => setForm({ ...form, logo_key: e.target.value })} placeholder="forbes, motorpasion, gq, vanityfair" />
              <p className="text-xs text-muted-foreground mt-1">Vacío para mostrar el nombre como texto estilizado.</p>
            </div>
            <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /><Label>Activo</Label></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={save}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={(o) => !o && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar mención?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={del}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardContent>
  );
};

export default PressMentionsManager;
