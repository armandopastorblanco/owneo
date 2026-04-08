import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ShieldCheck, CheckCircle, XCircle, Clock, FileText, ExternalLink } from "lucide-react";

const DOC_TYPES = [
  { key: "id_card", label: "DNI/Pasaporte" },
  { key: "driving_license", label: "Permiso de Conducir" },
  { key: "proof_address", label: "Justificante Domicilio" },
  { key: "selfie", label: "Selfie" },
];

const statusIcon = (status: string | null) => {
  if (status === "validated") return <CheckCircle className="h-4 w-4 text-primary" />;
  if (status === "rejected") return <XCircle className="h-4 w-4 text-destructive" />;
  return <Clock className="h-4 w-4 text-muted-foreground" />;
};

const AdminKYC = () => {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("all");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [rejectNotes, setRejectNotes] = useState<Record<string, string>>({});

  const { data: allDocs = [], isLoading } = useQuery({
    queryKey: ["admin-kyc"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("kyc_documents")
        .select("*, profiles:user_id(id,name,surname,email,kyc_status)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });

  const userGroups = (() => {
    const map = new Map<string, { profile: any; docs: any[]; globalStatus: string }>();
    allDocs.forEach((doc: any) => {
      const uid = doc.user_id;
      if (!map.has(uid)) {
        map.set(uid, { profile: doc.profiles, docs: [], globalStatus: (doc.profiles as any)?.kyc_status || "pending" });
      }
      map.get(uid)!.docs.push(doc);
    });
    return Array.from(map.entries()).map(([uid, data]) => ({ userId: uid, ...data }));
  })();

  const filteredGroups = userGroups.filter((g) => tab === "all" || g.globalStatus === tab);
  const selectedGroup = userGroups.find((g) => g.userId === selectedUserId);

  const docMutation = useMutation({
    mutationFn: async ({ docId, status, notes }: { docId: string; status: string; notes?: string }) => {
      const { error } = await supabase.from("kyc_documents").update({
        status, notes: notes || null, reviewed_at: new Date().toISOString(),
      }).eq("id", docId);
      if (error) throw error;
      if (selectedUserId) {
        const { data: userDocs } = await supabase.from("kyc_documents").select("id,status").eq("user_id", selectedUserId);
        const updatedDocs = (userDocs || []).map((d: any) => d.id === docId ? { ...d, status } : d);
        const allValidated = updatedDocs.every((d: any) => d.status === "validated");
        const anyRejected = updatedDocs.some((d: any) => d.status === "rejected");
        const newKycStatus = anyRejected ? "rejected" : allValidated ? "validated" : "in_review";
        await supabase.from("profiles").update({ kyc_status: newKycStatus }).eq("id", selectedUserId);
      }
      await supabase.rpc("insert_audit_log", {
        _action: status === "validated" ? "kyc_doc_validado" : "kyc_doc_rechazado",
        _target_table: "kyc_documents", _target_id: docId, _details: { status, notes },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-kyc"] });
      toast.success("Documento actualizado");
    },
    onError: () => toast.error("Error al actualizar"),
  });

  const getDocStatus = (docs: any[], type: string) => {
    const doc = docs.find((d: any) => d.type === type);
    return doc ? (doc.status || "pending") : "missing";
  };

  const kycBadge = (status: string) => {
    if (status === "validated") return <Badge variant="default">Validado</Badge>;
    if (status === "rejected") return <Badge variant="destructive">Rechazado</Badge>;
    if (status === "in_review") return <Badge variant="outline">En revisión</Badge>;
    return <Badge variant="secondary">Pendiente</Badge>;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <ShieldCheck className="h-6 w-6" /> Verificación KYC
      </h1>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">Todos ({userGroups.length})</TabsTrigger>
          <TabsTrigger value="pending">Pendientes ({userGroups.filter((g) => g.globalStatus === "pending").length})</TabsTrigger>
          <TabsTrigger value="in_review">En revisión ({userGroups.filter((g) => g.globalStatus === "in_review").length})</TabsTrigger>
          <TabsTrigger value="validated">Validados ({userGroups.filter((g) => g.globalStatus === "validated").length})</TabsTrigger>
          <TabsTrigger value="rejected">Rechazados ({userGroups.filter((g) => g.globalStatus === "rejected").length})</TabsTrigger>
        </TabsList>
        <TabsContent value={tab} className="mt-4">
          {isLoading ? (
            <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}</div>
          ) : filteredGroups.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-muted-foreground">No hay dossiers KYC en esta categoría</CardContent></Card>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Participante</TableHead>
                    {DOC_TYPES.map((dt) => <TableHead key={dt.key} className="text-center hidden sm:table-cell">{dt.label}</TableHead>)}
                    <TableHead>Estado KYC</TableHead>
                    <TableHead className="hidden md:table-cell">Fecha</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGroups.map((g) => (
                    <TableRow key={g.userId}>
                      <TableCell>
                        <div className="font-medium text-foreground">{g.profile?.name} {g.profile?.surname}</div>
                        <div className="text-xs text-muted-foreground">{g.profile?.email}</div>
                      </TableCell>
                      {DOC_TYPES.map((dt) => {
                        const st = getDocStatus(g.docs, dt.key);
                        return (
                          <TableCell key={dt.key} className="text-center hidden sm:table-cell">
                            {st === "missing" ? <span className="text-xs text-muted-foreground">—</span> : statusIcon(st)}
                          </TableCell>
                        );
                      })}
                      <TableCell>{kycBadge(g.globalStatus)}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                        {g.docs[0] ? format(new Date(g.docs[0].created_at), "dd MMM yy", { locale: es }) : "—"}
                      </TableCell>
                      <TableCell><Button variant="ghost" size="sm" onClick={() => setSelectedUserId(g.userId)}>Verificar</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Sheet open={!!selectedUserId} onOpenChange={(open) => !open && setSelectedUserId(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-foreground">Verificación KYC — {selectedGroup?.profile?.name} {selectedGroup?.profile?.surname}</SheetTitle>
          </SheetHeader>
          {selectedGroup && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border/40">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
                  {(selectedGroup.profile?.name?.[0] || "?").toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{selectedGroup.profile?.email}</p>
                  <div className="mt-1">{kycBadge(selectedGroup.globalStatus)}</div>
                </div>
              </div>

              {selectedGroup.globalStatus !== "validated" && (
                <div className="p-3 rounded-lg bg-accent/50 border border-accent flex items-start gap-2">
                  <Clock className="h-5 w-5 text-accent-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-accent-foreground">Este usuario necesita KYC validado antes de poder solicitar una participación.</p>
                </div>
              )}

              {DOC_TYPES.map((dt) => {
                const doc = selectedGroup.docs.find((d: any) => d.type === dt.key);
                return (
                  <Card key={dt.key}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span className="flex items-center gap-2 text-foreground"><FileText className="h-4 w-4" /> {dt.label}</span>
                        {doc && statusIcon(doc.status)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {!doc ? (
                        <p className="text-sm text-muted-foreground">Documento no subido</p>
                      ) : (
                        <div className="space-y-3">
                          {doc.file_url ? (
                            <div className="border border-border rounded-lg overflow-hidden">
                              {doc.file_url.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                                <img src={doc.file_url} alt={dt.label} className="w-full max-h-96 object-contain bg-muted" />
                              ) : (
                                <div className="p-6 flex flex-col items-center gap-2 bg-muted">
                                  <FileText className="h-10 w-10 text-muted-foreground" />
                                  <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-primary flex items-center gap-1 text-sm hover:underline">
                                    Ver documento <ExternalLink className="h-3 w-3" />
                                  </a>
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">Sin archivo</p>
                          )}
                          <div className="text-xs text-muted-foreground">
                            Subido: {format(new Date(doc.created_at), "dd/MM/yyyy HH:mm", { locale: es })}
                            {doc.reviewed_at && ` · Revisado: ${format(new Date(doc.reviewed_at), "dd/MM/yyyy HH:mm", { locale: es })}`}
                          </div>
                          {doc.notes && <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">Notas: {doc.notes}</p>}
                          {doc.status !== "validated" && (
                            <div className="space-y-2">
                              <Textarea placeholder="Notas (obligatorio en caso de rechazo)..." value={rejectNotes[doc.id] || ""} onChange={(e) => setRejectNotes((prev) => ({ ...prev, [doc.id]: e.target.value }))} rows={2} />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => docMutation.mutate({ docId: doc.id, status: "validated" })} disabled={docMutation.isPending}>
                                  <CheckCircle className="h-4 w-4 mr-1" /> Validar
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => { if (!rejectNotes[doc.id]?.trim()) return toast.error("Notas obligatorias para rechazar"); docMutation.mutate({ docId: doc.id, status: "rejected", notes: rejectNotes[doc.id] }); }} disabled={docMutation.isPending}>
                                  <XCircle className="h-4 w-4 mr-1" /> Rechazar
                                </Button>
                              </div>
                            </div>
                          )}
                          {doc.status === "validated" && <Badge variant="default" className="mt-1">✓ Documento validado</Badge>}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminKYC;
