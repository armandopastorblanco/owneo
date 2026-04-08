import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { FileText, User, ClipboardList, History, AlertTriangle, CheckCircle, XCircle, Clock, Search } from "lucide-react";

const EXCLUSIONARY: Record<string, string> = {
  q2: "menos2", q3: "si", q12: "confrontar", q13: "si", q14: "reciente", q15: "no",
};

const QUESTION_LABELS: Record<string, string> = {
  q1: "¿Cuántos años tienes el carnet de conducir?",
  q2: "¿Has tenido el carnet menos de 2 años?",
  q3: "¿Te han retirado el carnet alguna vez?",
  q4: "¿Cuántas multas has tenido en los últimos 3 años?",
  q5: "¿Has tenido accidentes de tráfico?",
  q6: "¿Has conducido vehículos de más de 300CV?",
  q7: "¿Tienes experiencia en circuito?",
  q8: "¿Conoces la diferencia entre tracción trasera y delantera?",
  q9: "¿Sabes lo que es el sobreviraje?",
  q10: "¿Has conducido con lluvia intensa?",
  q11: "¿Cómo describirías tu estilo de conducción?",
  q12: "¿Cómo reaccionas ante una situación de estrés al volante?",
  q13: "¿Has conducido bajo los efectos del alcohol?",
  q14: "¿Cuándo fue tu última infracción grave?",
  q15: "¿Estás dispuesto a respetar las normas de uso del vehículo?",
  q16: "¿Cuál es tu motivación principal para participar?",
  q17: "¿Con qué frecuencia planeas usar el vehículo?",
  q18: "¿Tienes garaje o parking privado?",
};

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pendiente", variant: "secondary" },
  scoring: { label: "En evaluación", variant: "outline" },
  approved: { label: "Aprobada", variant: "default" },
  rejected: { label: "Rechazada", variant: "destructive" },
  waitlist: { label: "Lista de espera", variant: "outline" },
};

const AdminSolicitudes = () => {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerTab, setDrawerTab] = useState("solicitante");
  const [score, setScore] = useState(0);
  const [scoreNotes, setScoreNotes] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["admin-solicitudes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("participation_requests")
        .select("*, profiles:user_id(id,name,surname,email,phone,address,kyc_status), cars:car_id(id,name,brand,location_id)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });

  const { data: locations = [] } = useQuery({
    queryKey: ["admin-locations"],
    queryFn: async () => {
      const { data } = await supabase.from("locations").select("id,name");
      return data || [];
    },
  });

  const selected = requests.find((r: any) => r.id === selectedId);

  const { data: userHistory = [] } = useQuery({
    queryKey: ["user-history", selected?.user_id],
    queryFn: async () => {
      if (!selected?.user_id) return [];
      const { data } = await supabase
        .from("participation_requests")
        .select("id,status,created_at,cars:car_id(name)")
        .eq("user_id", selected.user_id)
        .order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!selected?.user_id,
  });

  const { data: auditLogs = [] } = useQuery({
    queryKey: ["audit-solicitud", selectedId],
    queryFn: async () => {
      if (!selectedId) return [];
      const { data } = await supabase
        .from("audit_logs")
        .select("*,profiles:admin_id(name,surname)")
        .eq("target_table", "participation_requests")
        .eq("target_id", selectedId)
        .order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!selectedId,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates, action, details }: any) => {
      const { error } = await supabase.from("participation_requests").update(updates).eq("id", id);
      if (error) throw error;
      await supabase.rpc("insert_audit_log", {
        _action: action, _target_table: "participation_requests", _target_id: id, _details: details || {},
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-solicitudes"] });
      queryClient.invalidateQueries({ queryKey: ["audit-solicitud"] });
      toast.success("Solicitud actualizada");
    },
    onError: () => toast.error("Error al actualizar"),
  });

  const approveMutation = useMutation({
    mutationFn: async (req: any) => {
      const { error: e1 } = await supabase
        .from("participation_requests")
        .update({ status: "approved", score, score_notes: scoreNotes })
        .eq("id", req.id);
      if (e1) throw e1;
      const { error: e2 } = await supabase.from("bank_reconciliation").insert({
        user_id: req.user_id, participation_request_id: req.id,
        expected_amount: req.payment_amount || (req.num_participations || 1) * ((req as any).cars?.participation_price || 0),
        iban_user: (req as any).profiles?.iban || null,
      });
      if (e2) throw e2;
      await supabase.rpc("insert_audit_log", {
        _action: "solicitud_aprobada", _target_table: "participation_requests", _target_id: req.id,
        _details: { score, notes: scoreNotes },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-solicitudes"] });
      toast.success("Solicitud aprobada — referencia de pago creada");
      setSelectedId(null);
    },
    onError: () => toast.error("Error al aprobar"),
  });

  const getLocationName = (locId: string | null) => locations.find((l: any) => l.id === locId)?.name || "—";

  const filtered = requests.filter((r: any) => {
    if (tab !== "all" && r.status !== tab) return false;
    if (search) {
      const s = search.toLowerCase();
      const profile = r.profiles as any;
      const car = r.cars as any;
      return profile?.name?.toLowerCase().includes(s) || profile?.email?.toLowerCase().includes(s) || car?.name?.toLowerCase().includes(s);
    }
    return true;
  });

  const openDrawer = (r: any) => {
    setSelectedId(r.id);
    setDrawerTab("solicitante");
    setScore(r.score || 0);
    setScoreNotes(r.score_notes || "");
    setRejectReason("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Solicitudes de Participación</h1>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar participante o vehículo..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">Todas ({requests.length})</TabsTrigger>
          <TabsTrigger value="pending">Pendientes ({requests.filter((r: any) => r.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="scoring">En evaluación ({requests.filter((r: any) => r.status === "scoring").length})</TabsTrigger>
          <TabsTrigger value="approved">Aprobadas ({requests.filter((r: any) => r.status === "approved").length})</TabsTrigger>
          <TabsTrigger value="rejected">Rechazadas ({requests.filter((r: any) => r.status === "rejected").length})</TabsTrigger>
        </TabsList>
        <TabsContent value={tab} className="mt-4">
          {isLoading ? (
            <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}</div>
          ) : filtered.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-muted-foreground">No hay solicitudes en esta categoría</CardContent></Card>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Participante</TableHead>
                    <TableHead>Vehículo</TableHead>
                    <TableHead className="hidden md:table-cell">Ciudad</TableHead>
                    <TableHead className="hidden sm:table-cell">Participaciones</TableHead>
                    <TableHead className="hidden lg:table-cell">Montante</TableHead>
                    <TableHead className="hidden md:table-cell">Fecha</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r: any) => {
                    const profile = r.profiles as any;
                    const car = r.cars as any;
                    const st = statusConfig[r.status] || statusConfig.pending;
                    return (
                      <TableRow key={r.id}>
                        <TableCell>
                          <div className="font-medium text-foreground">{profile?.name} {profile?.surname}</div>
                          <div className="text-xs text-muted-foreground">{profile?.email}</div>
                        </TableCell>
                        <TableCell className="text-foreground">{car?.name || "—"}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{getLocationName(car?.location_id)}</TableCell>
                        <TableCell className="hidden sm:table-cell text-foreground">{r.num_participations || 1}</TableCell>
                        <TableCell className="hidden lg:table-cell text-foreground">{r.payment_amount ? `€${Number(r.payment_amount).toLocaleString()}` : "—"}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{format(new Date(r.created_at), "dd MMM yy", { locale: es })}</TableCell>
                        <TableCell>
                          {r.score != null ? (
                            <Badge variant={r.score >= 70 ? "default" : r.score >= 40 ? "secondary" : "destructive"}>{r.score}</Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">Sin evaluar</span>
                          )}
                        </TableCell>
                        <TableCell><Badge variant={st.variant}>{st.label}</Badge></TableCell>
                        <TableCell><Button variant="ghost" size="sm" onClick={() => openDrawer(r)}>Ver detalle</Button></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Sheet open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader><SheetTitle className="text-foreground">Detalle de Solicitud</SheetTitle></SheetHeader>
          {selected && (
            <Tabs value={drawerTab} onValueChange={setDrawerTab} className="mt-4">
              <TabsList className="w-full">
                <TabsTrigger value="solicitante" className="flex-1 gap-1"><User className="h-3 w-3" /> Solicitante</TabsTrigger>
                <TabsTrigger value="cuestionario" className="flex-1 gap-1"><ClipboardList className="h-3 w-3" /> Cuestionario</TabsTrigger>
                <TabsTrigger value="historial" className="flex-1 gap-1"><History className="h-3 w-3" /> Historial</TabsTrigger>
              </TabsList>

              <TabsContent value="solicitante" className="space-y-4 mt-4">
                {(() => {
                  const p = selected.profiles as any;
                  return (
                    <>
                      <Card>
                        <CardContent className="pt-6 space-y-3">
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                              {(p?.name?.[0] || "?").toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground text-lg">{p?.name} {p?.surname}</p>
                              <p className="text-sm text-muted-foreground">{p?.email}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div><span className="text-muted-foreground">Teléfono:</span> <span className="text-foreground">{p?.phone || "—"}</span></div>
                            <div><span className="text-muted-foreground">Dirección:</span> <span className="text-foreground">{p?.address || "—"}</span></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">KYC:</span>
                            <Badge variant={p?.kyc_status === "validated" ? "default" : p?.kyc_status === "rejected" ? "destructive" : "secondary"}>
                              {p?.kyc_status || "pending"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader><CardTitle className="text-sm text-foreground">Historial de solicitudes</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                          {userHistory.map((h: any) => (
                            <div key={h.id} className="flex justify-between text-sm border-b border-border/40 pb-2">
                              <span className="text-foreground">{(h.cars as any)?.name || "—"}</span>
                              <div className="flex items-center gap-2">
                                <Badge variant={statusConfig[h.status]?.variant || "secondary"} className="text-xs">{statusConfig[h.status]?.label || h.status}</Badge>
                                <span className="text-xs text-muted-foreground">{format(new Date(h.created_at), "dd/MM/yy")}</span>
                              </div>
                            </div>
                          ))}
                          {userHistory.length === 0 && <p className="text-sm text-muted-foreground">Sin solicitudes previas</p>}
                        </CardContent>
                      </Card>
                    </>
                  );
                })()}
              </TabsContent>

              <TabsContent value="cuestionario" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    {Object.entries(QUESTION_LABELS).map(([key, label]) => {
                      const answers = (selected.questionnaire_answers as Record<string, string>) || {};
                      const answer = answers[key] || "—";
                      const isExcl = EXCLUSIONARY[key] && answer === EXCLUSIONARY[key];
                      return (
                        <div key={key} className={`p-3 rounded-lg border ${isExcl ? "border-destructive/50 bg-destructive/10" : "border-border/40"}`}>
                          <p className="text-xs text-muted-foreground mb-1">{key.toUpperCase()}: {label}</p>
                          <div className="flex items-center gap-2">
                            {isExcl && <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />}
                            <p className={`text-sm font-medium ${isExcl ? "text-destructive" : "text-foreground"}`}>{answer}</p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-sm text-foreground">Evaluación</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Score ({score}/100)</label>
                      <div className="flex items-center gap-4 mt-1">
                        <Slider value={[score]} onValueChange={([v]) => setScore(v)} max={100} step={1} className="flex-1" />
                        <Input type="number" value={score} onChange={(e) => setScore(Math.min(100, Math.max(0, Number(e.target.value))))} className="w-20" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Notas de evaluación</label>
                      <Textarea value={scoreNotes} onChange={(e) => setScoreNotes(e.target.value)} placeholder="Observaciones..." rows={3} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Motivo de rechazo (obligatorio si rechazas)</label>
                      <Textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Motivo..." rows={2} className="mt-1" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={() => updateMutation.mutate({ id: selected.id, updates: { score, score_notes: scoreNotes, status: "scoring" }, action: "evaluacion_guardada", details: { score, notes: scoreNotes } })}>
                        Guardar evaluación
                      </Button>
                      <Button onClick={() => approveMutation.mutate(selected)}>
                        <CheckCircle className="h-4 w-4 mr-1" /> Aprobar solicitud
                      </Button>
                      <Button variant="destructive" onClick={() => { if (!rejectReason.trim()) return toast.error("Motivo de rechazo obligatorio"); updateMutation.mutate({ id: selected.id, updates: { status: "rejected", score, score_notes: `${scoreNotes}\n\nMotivo rechazo: ${rejectReason}` }, action: "solicitud_rechazada", details: { score, reason: rejectReason } }); setSelectedId(null); }}>
                        <XCircle className="h-4 w-4 mr-1" /> Rechazar
                      </Button>
                      <Button variant="secondary" onClick={() => { updateMutation.mutate({ id: selected.id, updates: { status: "waitlist", score, score_notes: scoreNotes }, action: "solicitud_lista_espera", details: { score } }); setSelectedId(null); }}>
                        <Clock className="h-4 w-4 mr-1" /> Lista de espera
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="historial" className="space-y-3 mt-4">
                {auditLogs.length === 0 ? (
                  <Card><CardContent className="py-8 text-center text-muted-foreground">Sin actividad registrada</CardContent></Card>
                ) : auditLogs.map((log: any) => (
                  <div key={log.id} className="flex gap-3 p-3 rounded-lg border border-border/40">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{log.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {(log.profiles as any)?.name || "Sistema"} · {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: es })}
                      </p>
                      {log.details && typeof log.details === "object" && Object.keys(log.details).length > 0 && (
                        <pre className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap">{JSON.stringify(log.details, null, 2)}</pre>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminSolicitudes;
