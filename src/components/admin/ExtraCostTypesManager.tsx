import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Tags } from "lucide-react";
import { toast } from "sonner";

const colorFor = (cat: string) => {
  // Hash simple para distribuir colores estables a categorías custom
  const palette = [
    "bg-red-500/15 text-red-400 border-red-500/30",
    "bg-blue-500/15 text-blue-400 border-blue-500/30",
    "bg-amber-500/15 text-amber-400 border-amber-500/30",
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    "bg-purple-500/15 text-purple-400 border-purple-500/30",
    "bg-pink-500/15 text-pink-400 border-pink-500/30",
    "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  ];
  const known: Record<string, string> = {
    multa: palette[0], servicio: palette[1], extra: palette[2],
  };
  if (known[cat]) return known[cat];
  let h = 0;
  for (let i = 0; i < cat.length; i++) h = (h * 31 + cat.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
};

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
   .replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40);

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

  const { data: categories = [] } = useQuery({
    queryKey: ["extra-cost-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("extra_cost_categories" as any).select("*").order("sort_order");
      if (error) throw error;
      return (data as any[]) || [];
    },
  });

  const activeCats = useMemo(() => categories.filter((c: any) => c.is_active), [categories]);
  const labelFor = (v: string) => categories.find((c: any) => c.value === v)?.label || v;

  // ---------- Tipo dialog ----------
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [delId, setDelId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({ name: "", category: "", description: "", default_amount: "", is_active: true });

  const openDlg = (t: any = null) => {
    setEditing(t);
    setForm(t ? { name: t.name, category: t.category, description: t.description || "", default_amount: t.default_amount ?? "", is_active: t.is_active }
              : { name: "", category: activeCats[0]?.value || "", description: "", default_amount: "", is_active: true });
    setOpen(true);
  };

  const save = async () => {
    if (!form.name.trim()) return toast.error("Nombre obligatorio");
    if (!form.category) return toast.error("Selecciona una categoría");
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

  // ---------- Category management ----------
  const [catDlgOpen, setCatDlgOpen] = useState(false);
  const [catEditing, setCatEditing] = useState<any>(null);
  const [catDelId, setCatDelId] = useState<string | null>(null);
  const [catForm, setCatForm] = useState<any>({ label: "", is_active: true });

  const openCatDlg = (c: any = null) => {
    setCatEditing(c);
    setCatForm(c ? { label: c.label, is_active: c.is_active } : { label: "", is_active: true });
    setCatDlgOpen(true);
  };

  const saveCat = async () => {
    if (!catForm.label.trim()) return toast.error("Etiqueta obligatoria");
    if (catEditing) {
      const { error } = await supabase.from("extra_cost_categories" as any).update({ label: catForm.label, is_active: catForm.is_active }).eq("id", catEditing.id);
      if (error) return toast.error(error.message);
      toast.success("Categoría actualizada");
    } else {
      let value = slugify(catForm.label);
      if (!value) return toast.error("Etiqueta inválida");
      // Asegurar unicidad
      if (categories.some((c: any) => c.value === value)) {
        let i = 2;
        while (categories.some((c: any) => c.value === `${value}_${i}`)) i++;
        value = `${value}_${i}`;
      }
      const { error } = await supabase.from("extra_cost_categories" as any).insert({
        value, label: catForm.label, is_active: catForm.is_active, sort_order: categories.length,
      });
      if (error) return toast.error(error.message);
      toast.success("Categoría creada");
    }
    setCatDlgOpen(false);
    qc.invalidateQueries({ queryKey: ["extra-cost-categories"] });
  };

  const delCat = async () => {
    if (!catDelId) return;
    const cat = categories.find((c: any) => c.id === catDelId);
    if (cat && items.some((t: any) => t.category === cat.value)) {
      toast.error("No se puede eliminar: hay costes extra usando esta categoría");
      setCatDelId(null);
      return;
    }
    const { error } = await supabase.from("extra_cost_categories" as any).delete().eq("id", catDelId);
    if (error) return toast.error(error.message);
    toast.success("Eliminada");
    setCatDelId(null);
    qc.invalidateQueries({ queryKey: ["extra-cost-categories"] });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Costes extra</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Multas, servicios y cargos adicionales aplicables a participantes.</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setCatDlgOpen(true) || openCatDlg()}><Tags className="h-4 w-4 mr-1" />Gestionar categorías</Button>
            <Button size="sm" onClick={() => openDlg()}><Plus className="h-4 w-4 mr-1" />Añadir</Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Lista de categorías existentes */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase">Categorías:</span>
            {categories.map((c: any) => (
              <div key={c.id} className="inline-flex items-center gap-1">
                <Badge variant="outline" className={colorFor(c.value)}>{c.label}{!c.is_active && " (inactiva)"}</Badge>
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => openCatDlg(c)}><Pencil className="h-3 w-3" /></Button>
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setCatDelId(c.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
              </div>
            ))}
            {categories.length === 0 && <span className="text-xs text-muted-foreground">Ninguna categoría definida.</span>}
          </div>

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
                  <td className="py-2"><Badge variant="outline" className={colorFor(t.category)}>{labelFor(t.category)}</Badge></td>
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

        {/* Tipo dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Editar coste extra" : "Nuevo coste extra"}</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Nombre *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div>
                <Label>Categoría *</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecciona categoría" /></SelectTrigger>
                  <SelectContent>{activeCats.map((c: any) => <SelectItem key={c.id} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
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

      {/* Categoría dialog */}
      <Dialog open={catDlgOpen} onOpenChange={setCatDlgOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{catEditing ? "Editar categoría" : "Nueva categoría"}</DialogTitle>
            <DialogDescription>Las categorías agrupan los tipos de costes extra (multa, servicio, extra, etc.).</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>Etiqueta *</Label><Input value={catForm.label} onChange={(e) => setCatForm({ ...catForm, label: e.target.value })} placeholder="Ej. Reparación, Mantenimiento..." /></div>
            <div className="flex items-center gap-2"><Switch checked={catForm.is_active} onCheckedChange={(v) => setCatForm({ ...catForm, is_active: v })} /><Label>Activa</Label></div>
            {!catEditing && <p className="text-xs text-muted-foreground">El identificador interno se generará automáticamente a partir de la etiqueta.</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCatDlgOpen(false)}>Cancelar</Button>
            <Button onClick={saveCat}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!catDelId} onOpenChange={(o) => !o && setCatDelId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar esta categoría?</AlertDialogTitle>
            <AlertDialogDescription>Sólo se puede eliminar si ningún coste extra la está usando.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={delCat}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExtraCostTypesManager;
