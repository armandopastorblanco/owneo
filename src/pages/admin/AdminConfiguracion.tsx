import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { useDocumentTypes } from "@/hooks/useDocuments";
import ExtraCostTypesManager from "@/components/admin/ExtraCostTypesManager";

const AdminConfiguracion = () => {
  const qc = useQueryClient();
  const { data: types = [], refetch } = useDocumentTypes(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({ name: "", description: "", is_required: false, is_active: true });

  const open = (t: any = null) => {
    setEditing(t);
    setForm(t ? { name: t.name, description: t.description || "", is_required: t.is_required, is_active: t.is_active } : { name: "", description: "", is_required: false, is_active: true });
    setDialogOpen(true);
  };

  const save = async () => {
    if (!form.name.trim()) return toast.error("Nombre obligatorio");
    if (editing) {
      const { error } = await supabase.from("document_types" as any).update(form).eq("id", editing.id);
      if (error) return toast.error(error.message);
      await supabase.rpc("insert_audit_log", { _action: "update_document_type", _target_table: "document_types", _target_id: editing.id, _details: { after: form } });
      toast.success("Tipo actualizado");
    } else {
      const { data, error } = await supabase.from("document_types" as any).insert({ ...form, sort_order: types.length }).select().single();
      if (error) return toast.error(error.message);
      await supabase.rpc("insert_audit_log", { _action: "create_document_type", _target_table: "document_types", _target_id: (data as any).id, _details: { after: form } });
      toast.success("Tipo creado");
    }
    setDialogOpen(false);
    refetch();
  };

  const del = async () => {
    if (!deletingId) return;
    const { count } = await supabase.from("participant_documents" as any).select("*", { count: "exact", head: true }).eq("document_type_id", deletingId);
    if ((count || 0) > 0) {
      toast.error("No se puede eliminar: hay documentos subidos de este tipo");
      setDeletingId(null);
      return;
    }
    const { error } = await supabase.from("document_types" as any).delete().eq("id", deletingId);
    if (error) return toast.error(error.message);
    await supabase.rpc("insert_audit_log", { _action: "delete_document_type", _target_table: "document_types", _target_id: deletingId });
    toast.success("Eliminado");
    setDeletingId(null);
    refetch();
  };

  const toggle = async (t: any, field: "is_required" | "is_active") => {
    const v = !t[field];
    const { error } = await supabase.from("document_types" as any).update({ [field]: v }).eq("id", t.id);
    if (error) return toast.error(error.message);
    await supabase.rpc("insert_audit_log", { _action: `toggle_${field}`, _target_table: "document_types", _target_id: t.id, _details: { [field]: v } });
    refetch();
  };

  const move = async (t: any, dir: -1 | 1) => {
    const idx = types.findIndex((x) => x.id === t.id);
    const target = types[idx + dir];
    if (!target) return;
    await supabase.from("document_types" as any).update({ sort_order: target.sort_order }).eq("id", t.id);
    await supabase.from("document_types" as any).update({ sort_order: t.sort_order }).eq("id", target.id);
    refetch();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground text-sm mt-1">Ajustes generales del sistema.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tipos de documentos</CardTitle>
          <Button size="sm" onClick={() => open()}><Plus className="h-4 w-4 mr-1" />Añadir tipo</Button>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase border-b border-border/40">
              <tr>
                <th className="text-left py-2 font-normal">Orden</th>
                <th className="text-left py-2 font-normal">Nombre</th>
                <th className="text-left py-2 font-normal">Descripción</th>
                <th className="text-left py-2 font-normal">Obligatorio</th>
                <th className="text-left py-2 font-normal">Activo</th>
                <th className="text-right py-2 font-normal">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {types.map((t, i) => (
                <tr key={t.id} className="border-b border-border/20">
                  <td className="py-2">
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-6 w-6" disabled={i === 0} onClick={() => move(t, -1)}><ArrowUp className="h-3 w-3" /></Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6" disabled={i === types.length - 1} onClick={() => move(t, 1)}><ArrowDown className="h-3 w-3" /></Button>
                    </div>
                  </td>
                  <td className="py-2 font-medium">{t.name}</td>
                  <td className="py-2 text-muted-foreground text-xs max-w-xs truncate">{t.description}</td>
                  <td className="py-2"><Switch checked={t.is_required} onCheckedChange={() => toggle(t, "is_required")} /></td>
                  <td className="py-2"><Switch checked={t.is_active} onCheckedChange={() => toggle(t, "is_active")} /></td>
                  <td className="py-2 text-right">
                    <Button size="icon" variant="ghost" onClick={() => open(t)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => setDeletingId(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Editar tipo" : "Nuevo tipo de documento"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nombre *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Descripción</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="flex items-center gap-2"><Switch checked={form.is_required} onCheckedChange={(v) => setForm({ ...form, is_required: v })} /><Label>Obligatorio</Label></div>
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
            <AlertDialogTitle>¿Eliminar tipo de documento?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={del}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminConfiguracion;
