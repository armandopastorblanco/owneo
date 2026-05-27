import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MessageCircle, Car, Eye, EyeOff, Archive,
  Trash2, Clock, CheckCircle2, User, Phone,
  Mail, FileText, ChevronDown, ChevronUp, Inbox, Sparkles,
} from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; class: string }> = {
  pending: { label: "Pendiente", class: "bg-amber-500/15 text-amber-300 border-amber-500/20" },
  read: { label: "Leído", class: "bg-blue-500/15 text-blue-300 border-blue-500/20" },
  archived: { label: "Archivado", class: "bg-muted text-muted-foreground border-border" },
};

export default function AdminConsultas() {
  const qc = useQueryClient();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});

  const { data: consultas = [], isLoading } = useQuery({
    queryKey: ["admin-consultas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("consultation_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { error } = await supabase
        .from("consultation_requests")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-consultas"] });
      qc.invalidateQueries({ queryKey: ["admin-consultas-unread"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("consultation_requests")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Consulta eliminada.");
      setDeletingId(null);
      qc.invalidateQueries({ queryKey: ["admin-consultas"] });
      qc.invalidateQueries({ queryKey: ["admin-consultas-unread"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const saveNotes = (id: string) => {
    updateMutation.mutate({
      id,
      updates: { admin_notes: editingNotes[id] ?? "" },
    });
    toast.success("Notas guardadas.");
  };

  const landing = consultas.filter((c: any) => c.source === "beta_gate");
  const contactos = consultas.filter((c: any) => c.source === "contacto");
  const solicitudes = consultas.filter(
    (c: any) => (!c.source || c.source === "car_detail")
  );
  const preguntas = consultas.filter(
    (c: any) => c.source === "dashboard_concierge"
  );
  const unreadLanding = landing.filter((c: any) => c.status === "pending").length;
  const unreadContactos = contactos.filter((c: any) => c.status === "pending").length;
  const unreadSolicitudes = solicitudes.filter((c: any) => c.status === "pending").length;
  const unreadPreguntas = preguntas.filter((c: any) => c.status === "pending").length;

  const ConsultaCard = ({ c }: { c: any }) => {
    const isExpanded = expandedId === c.id;
    const isPending = c.status === "pending";
    const statusCfg = STATUS_CONFIG[c.status] ?? STATUS_CONFIG.pending;
    const isContacto = c.source === "contacto";
    const isLanding = c.source === "beta_gate";
    const headerLabel = (isContacto || isLanding)
      ? (c.subject && c.car_name
          ? `${c.subject} · ${c.car_name}`
          : c.subject || c.car_name)
      : c.car_name;

    return (
      <Card className="border-border/40">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className={`${statusCfg.class} text-xs flex items-center gap-1`}>
                  {isPending ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                  {statusCfg.label}
                </Badge>
                {headerLabel && (
                  <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                    {isLanding ? <Sparkles className="w-3 h-3" /> : isContacto ? <Inbox className="w-3 h-3" /> : <Car className="w-3 h-3" />}
                    {headerLabel}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {format(new Date(c.created_at), "d MMM yyyy · HH:mm", { locale: es })}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-foreground font-medium mb-1">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                {c.name}
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {c.email}
                </span>
                {c.phone && (
                  <span className="inline-flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {c.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setExpandedId(isExpanded ? null : c.id)}
                title={isExpanded ? "Colapsar" : "Expandir"}
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateMutation.mutate({
                  id: c.id,
                  updates: { status: isPending ? "read" : "pending" },
                })}
                title={isPending ? "Marcar como leído" : "Marcar como pendiente"}
              >
                {isPending ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateMutation.mutate({
                  id: c.id,
                  updates: { status: "archived" },
                })}
                title="Archivar"
              >
                <Archive className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => setDeletingId(c.id)}
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-border/30 space-y-4">
              {c.message && (
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <MessageCircle className="w-3 h-3" /> Mensaje
                  </div>
                  <div className="text-sm text-foreground whitespace-pre-wrap bg-background/50 rounded p-3 border border-border/30">
                    {c.message}
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <FileText className="w-3 h-3" /> Notas internas
                </div>
                <Textarea
                  value={editingNotes[c.id] ?? c.admin_notes ?? ""}
                  placeholder="Añadir notas internas…"
                  rows={3}
                  onChange={(e) => setEditingNotes((prev) => ({
                    ...prev,
                    [c.id]: e.target.value,
                  }))}
                  className="text-sm bg-background/50 border-border/30 resize-none"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 text-xs"
                  onClick={() => saveNotes(c.id)}
                >
                  Guardar notas
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const EmptyState = ({ label }: { label: string }) => (
    <div className="text-center py-16">
      <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">{label}</p>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Consultas</h1>
        <p className="text-muted-foreground text-sm">
          Gestión de solicitudes de información y preguntas de clientes.
        </p>
      </div>

      <Tabs defaultValue="contacto">
        <TabsList className="mb-6">
          <TabsTrigger value="contacto" className="flex items-center gap-2">
            <Inbox className="w-4 h-4" />
            Contacto
            {unreadContactos > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-champagne text-champagne-foreground text-[10px] font-bold flex items-center justify-center">
                {unreadContactos}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="solicitudes" className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            Solicitudes
            {unreadSolicitudes > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-champagne text-champagne-foreground text-[10px] font-bold flex items-center justify-center">
                {unreadSolicitudes}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="preguntas" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Preguntas clientes
            {unreadPreguntas > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-champagne text-champagne-foreground text-[10px] font-bold flex items-center justify-center">
                {unreadPreguntas}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacto">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Cargando...</p>
          ) : contactos.length === 0 ? (
            <EmptyState label="No hay mensajes de contacto todavía." />
          ) : (
            <div className="space-y-3">
              {contactos.map((c: any) => (
                <ConsultaCard key={c.id} c={c} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="solicitudes">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Cargando...</p>
          ) : solicitudes.length === 0 ? (
            <EmptyState label="No hay solicitudes de información todavía." />
          ) : (
            <div className="space-y-3">
              {solicitudes.map((c: any) => (
                <ConsultaCard key={c.id} c={c} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="preguntas">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Cargando...</p>
          ) : preguntas.length === 0 ? (
            <EmptyState label="No hay preguntas de clientes todavía." />
          ) : (
            <div className="space-y-3">
              {preguntas.map((c: any) => (
                <ConsultaCard key={c.id} c={c} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AlertDialog open={!!deletingId} onOpenChange={(o) => !o && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar esta consulta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && deleteMutation.mutate(deletingId)}
              className="bg-destructive text-destructive-foreground"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
