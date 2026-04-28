import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

const VehicleDocumentTypesManager = () => {
  const qc = useQueryClient();
  const { data: types = [], refetch } = useQuery({
    queryKey: ["vehicle_document_types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicle_document_types" as any)
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data || []) as any[];
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({ name: "", description: "", has_expiry_date: false, is_required: true, is_active: true, is_public: false });

  const open = (t: any = null) => {
    setEditing(t);
    setForm(t ? {
      name: t.name, description: t.description || "",
      has_expiry_date: !!t.has_expiry_date, is_required: !!t.is_required, is_active: !!t.is_active, is_public: !!t.is_public,
    } : { name: "", description: "", has_expiry_date: false, is_required: true, is_active: true, is_public: false });
    setDialogOpen(true);
  };

  const save = async () => {
    if (!form.name.trim()) return toast.error("Nombre obligatorio");
    if (form.name.length > 50) return toast.error("Nombre máx 50 caracteres");
    if (form.description && form.description.length > 200) return toast.error("Descripción máx 200 caracteres");
    if (editing) {
      const { error } = await supabase.from("vehicle_document_types" as any).update(form).eq("id", editing.id);
      if (error) return toast.error(error.message);
      await supabase.rpc("insert_audit_log", { _action: "update_vehicle_document_type", _target_table: "vehicle_document_types", _target_id: editing.id, _details: { after: form } });
      toast.success("Tipo actualizado");
    } else {
      const { data, error } = await supabase.from("vehicle_document_types" as any).insert({ ...form, sort_order: types.length }).select().single();
      if (error) return toast.error(error.message);
      await supabase.rpc("insert_audit_log", { _action: "create_vehicle_document_type", _target_table: "vehicle_document_types", _target_id: (data as any).id, _details: { after: form } });
      toast.success("Tipo creado");
    }
    setDialogOpen(false);
    refetch();
  };

  const del = async () => {
    if (!deletingId) return;
    const { count } = await supabase.from("vehicle_documents" as any).select("*", { count: "exact", head: true }).eq("document_type_id", deletingId);
    if ((count || 0) > 0) {
      toast.error("No se puede eliminar: hay documentos de vehículos que usan este tipo");
      setDeletingId(null);
      return;
    }
    const { error } = await supabase.from("vehicle_document_types" as any).delete().eq("id", deletingId);
    if (error) return toast.error(error.message);
    await supabase.rpc("insert_audit_log", { _action: "delete_vehicle_document_type", _target_table: "vehicle_document_types", _target_id: deletingId });
    toast.success("Eliminado");
    setDeletingId(null);
    refetch();
  };

  const toggle = async (t: any, field: "has_expiry_date" | "is_required" | "is_active" | "is_public") => {
    const v = !t[field];
    const { error } = await supabase.from("vehicle_document_types" as any).update({ [field]: v }).eq("id", t.id);
    if (error) return toast.error(error.message);
    await supabase.rpc("insert_audit_log", { _action: `toggle_vehicle_doc_${field}`, _target_table: "vehicle_document_types", _target_id: t.id, _details: { [field]: v } });
    refetch();
  };

  const move = async (t: any, dir: -1 | 1) => {
    const idx = types.findIndex((x) => x.id === t.id);
    const target = types[idx + dir];
    if (!target) return;
    await supabase.from("vehicle_document_types" as any).update({ sort_order: target.sort_order }).eq("id", t.id);
    await supabase.from("vehicle_document_types" as any).update({ sort_order: t.sort_order }).eq("id", target.id);
    refetch();
  };

  return (
    <>
      <CardContent>
        <div className="flex justify-end mb-3">
          <Button size="sm" onClick={() => open()}><Plus className="h-4 w-4 mr-1" />Añadir tipo</Button>
        </div>
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground uppercase border-b border-border/40">
            <tr>
              <th className="text-left py-2 font-normal">Orden</th>
              <th className="text-left py-2 font-normal">Nombre</th>
              <th className="text-left py-2 font-normal">Descripción</th>
              <th className="text-left py-2 font-normal">Vencimiento</th>
              <th className="text-left py-2 font-normal">Obligatorio</th>
              <th className="text-left py-2 font-normal">Activo</th>
              <th className="text-right py-2 font-normal">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {types.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-6 text-muted-foreground">Sin tipos de documento de vehículo.</td></tr>
            ) : types.map((t, i) => (
              <tr key={t.id} className="border-b border-border/20">
                <td className="py-2">
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-6 w-6" disabled={i === 0} onClick={() => move(t, -1)}><ArrowUp className="h-3 w-3" /></Button>
                    <Button size="icon" variant="ghost" className="h-6 w-6" disabled={i === types.length - 1} onClick={() => move(t, 1)}><ArrowDown className="h-3 w-3" /></Button>
                  </div>
                </td>
                <td className="py-2 font-medium">{t.name}</td>
                <td className="py-2 text-muted-foreground text-xs max-w-xs truncate">{t.description}</td>
                <td className="py-2"><Switch checked={!!t.has_expiry_date} onCheckedChange={() => toggle(t, "has_expiry_date")} /></td>
                <td className="py-2"><Switch checked={!!t.is_required} onCheckedChange={() => toggle(t, "is_required")} /></td>
                <td className="py-2"><Switch checked={!!t.is_active} onCheckedChange={() => toggle(t, "is_active")} /></td>
                <td className="py-2 text-right">
                  <Button size="icon" variant="ghost" onClick={() => open(t)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => setDeletingId(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Editar tipo" : "Nuevo tipo de documento de vehículo"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nombre *</Label><Input maxLength={50} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Descripción</Label><Textarea maxLength={200} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="flex items-center gap-2"><Switch checked={form.has_expiry_date} onCheckedChange={(v) => setForm({ ...form, has_expiry_date: v })} /><Label>¿Tiene fecha de vencimiento?</Label></div>
            <div className="flex items-center gap-2"><Switch checked={form.is_required} onCheckedChange={(v) => setForm({ ...form, is_required: v })} /><Label>Obligatorio</Label></div>
            <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /><Label>Activo</Label></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={save}>{editing ? "Guardar" : "Crear"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={(o) => !o && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este tipo de documento?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={del}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default VehicleDocumentTypesManager;
