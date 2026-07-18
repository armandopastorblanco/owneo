import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { resolveCarImage } from "@/lib/resolveCarImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { format, formatDistanceToNow, isPast } from "date-fns";
import { es } from "date-fns/locale";
import {
  Search, Settings, AlertTriangle, CheckCircle, XCircle, Clock, MoreVertical,
  Plus, MessageSquare, Phone, Mail, Users, FileText, History, ClipboardList,
  User, ExternalLink, ChevronDown, ChevronRight, Eye,
} from "lucide-react";
import {
  useQuestionnaireConfig, useScoringConfig, useTags, computeAutoScore,
} from "@/hooks/useSolicitudesData";
import { QuestionnaireConfigModal } from "@/components/admin/QuestionnaireConfigModal";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; className: string; variant: any }> = {
  pending: { label: "Pendiente", className: "bg-muted text-foreground", variant: "secondary" },
  scoring: { label: "En evaluación", className: "bg-blue-500/20 text-blue-300", variant: "outline" },
  approved: { label: "Aprobada", className: "bg-emerald-500/20 text-emerald-300", variant: "default" },
  rejected: { label: "Rechazada", className: "bg-destructive/20 text-destructive", variant: "destructive" },
  waitlist: { label: "Lista de espera", className: "bg-orange-500/20 text-orange-300", variant: "outline" },
};

const TAG_COLORS = ["#a855f7", "#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#ec4899"];

const initials = (name?: string, surname?: string) =>
  `${(name?.[0] || "").toUpperCase()}${(surname?.[0] || "").toUpperCase()}` || "?";

const AdminSolicitudes = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [carFilter, setCarFilter] = useState("all");
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100]);
  const [riskOnly, setRiskOnly] = useState(false);
  const [groupedView, setGroupedView] = useState(true);
  const [configOpen, setConfigOpen] = useState(false);

  // Drawer
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerTab, setDrawerTab] = useState("cuestionario");

  // Modals
  const [confirmAction, setConfirmAction] = useState<null | "approve" | "reject" | "waitlist" | "reopen">(null);
  const [actionReason, setActionReason] = useState("");
  const [approveChecks, setApproveChecks] = useState({ score: false, excluyentes: false, abiertas: false });

  // Forms
  const [manualScore, setManualScore] = useState(0);
  const [scoreNotes, setScoreNotes] = useState("");
  const [newNote, setNewNote] = useState("");
  const [contactType, setContactType] = useState("call");
  const [contactContent, setContactContent] = useState("");
  const [contactFollowUp, setContactFollowUp] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState(TAG_COLORS[0]);

  // Queries
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["admin-solicitudes-full"],
    queryFn: async () => {
      // 1) Fetch raw requests (no PostgREST embeds — there are no FKs declared)
      const { data: reqs, error } = await supabase
        .from("participation_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      const rows = reqs || [];
      if (rows.length === 0) return [];

      const userIds = Array.from(new Set(rows.map((r) => r.user_id).filter(Boolean)));
      const carIds = Array.from(new Set(rows.map((r) => r.car_id).filter(Boolean)));

      // 2) Fetch related profiles & cars in parallel
      const [profilesRes, carsRes] = await Promise.all([
        userIds.length
          ? supabase
              .from("profiles")
              .select("id,name,surname,email,phone,address,linkedin,kyc_status,iban,created_at")
              .in("id", userIds)
          : Promise.resolve({ data: [], error: null }),
        carIds.length
          ? supabase
              .from("cars")
              .select(
                "id,name,brand,image_url,location_id,participation_price,max_participations,remaining_participations"
              )
              .in("id", carIds)
          : Promise.resolve({ data: [], error: null }),
      ]);

      const profilesById = new Map((profilesRes.data || []).map((p) => [p.id, p]));
      const carsById = new Map((carsRes.data || []).map((c) => [c.id, c]));

      return rows.map((r) => ({
        ...r,
        profiles: profilesById.get(r.user_id) || null,
        cars: carsById.get(r.car_id) || null,
      }));
    },
    refetchInterval: 30000,
  });

  const { data: locations = [] } = useQuery({
    queryKey: ["admin-locations"],
    queryFn: async () => (await supabase.from("locations").select("id,name").order("name")).data || [],
  });

  const { data: cars = [] } = useQuery({
    queryKey: ["admin-cars-list"],
    queryFn: async () =>
      (await supabase.from("cars").select("id,name,brand,location_id,image_url,max_participations,remaining_participations").order("name")).data || [],
  });

  const { data: scoringRules = [] } = useScoringConfig();
  const { data: questions = [] } = useQuestionnaireConfig();
  const { data: tags = [] } = useTags();

  const { data: requestTags = [] } = useQuery({
    queryKey: ["request-tags"],
    queryFn: async () => (await supabase.from("request_tags").select("*")).data || [],
  });

  const selected = requests.find((r: any) => r.id === selectedId);

  const { data: notes = [] } = useQuery({
    queryKey: ["internal-notes", selectedId],
    queryFn: async () => {
      if (!selectedId) return [];
      const { data } = await supabase
        .from("internal_notes")
        .select("*, profiles:admin_id(name,surname)")
        .eq("request_id", selectedId)
        .order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!selectedId,
  });

  const { data: contactLogs = [] } = useQuery({
    queryKey: ["contact-logs", selected?.user_id],
    queryFn: async () => {
      if (!selected?.user_id) return [];
      const { data } = await supabase
        .from("contact_logs")
        .select("*, profiles:admin_id(name,surname)")
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
        .select("*, profiles:admin_id(name,surname)")
        .eq("target_table", "participation_requests")
        .eq("target_id", selectedId)
        .order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!selectedId,
  });

  const { data: userOtherRequests = [] } = useQuery({
    queryKey: ["user-other-requests", selected?.user_id],
    queryFn: async () => {
      if (!selected?.user_id) return [];
      const { data } = await supabase
        .from("participation_requests")
        .select("id, status, created_at, cars:car_id(name)")
        .eq("user_id", selected.user_id)
        .neq("id", selectedId)
        .order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!selected?.user_id,
  });

  const { data: userValidatedParts = [] } = useQuery({
    queryKey: ["user-validated", selected?.user_id],
    queryFn: async () => {
      if (!selected?.user_id) return [];
      const { data } = await supabase
        .from("validated_participations")
        .select("*, cars:car_id(name)")
        .eq("user_id", selected.user_id);
      return data || [];
    },
    enabled: !!selected?.user_id,
  });

  // Derived
  const tagsByRequest = useMemo(() => {
    const map: Record<string, string[]> = {};
    requestTags.forEach((rt: any) => {
      map[rt.request_id] = map[rt.request_id] || [];
      map[rt.request_id].push(rt.tag_id);
    });
    return map;
  }, [requestTags]);

  const selectedTagIds = selected ? tagsByRequest[selected.id] || [] : [];

  const autoScore = useMemo(
    () => computeAutoScore((selected?.questionnaire_answers as any) || {}, scoringRules),
    [selected, scoringRules]
  );

  // KPIs
  const kpis = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r: any) => r.status === "pending").length;
    const scoring = requests.filter((r: any) => r.status === "scoring").length;
    const approved = requests.filter((r: any) => r.status === "approved").length;
    const rejected = requests.filter((r: any) => r.status === "rejected").length;
    const waitlist = requests.filter((r: any) => r.status === "waitlist").length;
    const conversion = total > 0 ? Math.round((approved / total) * 100) : 0;
    return { total, pending, scoring, approved, rejected, waitlist, conversion };
  }, [requests]);

  // Filtering
  const filtered = useMemo(() => {
    return requests.filter((r: any) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (cityFilter !== "all" && r.cars?.location_id !== cityFilter) return false;
      if (carFilter !== "all" && r.car_id !== carFilter) return false;
      const sc = r.score ?? autoCompute(r);
      if (sc != null && (sc < scoreRange[0] || sc > scoreRange[1])) return false;
      if (riskOnly) {
        const a = computeAutoScore((r.questionnaire_answers as any) || {}, scoringRules);
        if (a.excludent.length === 0 && a.red.length === 0) return false;
      }
      if (search) {
        const s = search.toLowerCase();
        const p = r.profiles, c = r.cars;
        const match =
          p?.name?.toLowerCase().includes(s) ||
          p?.surname?.toLowerCase().includes(s) ||
          p?.email?.toLowerCase().includes(s) ||
          c?.name?.toLowerCase().includes(s);
        if (!match) return false;
      }
      return true;
    });
  }, [requests, statusFilter, cityFilter, carFilter, scoreRange, riskOnly, search, scoringRules]);

  function autoCompute(r: any) {
    const a = computeAutoScore((r.questionnaire_answers as any) || {}, scoringRules);
    return a.normalized;
  }

  // Group by city → car
  const grouped = useMemo(() => {
    const byCity: Record<string, { city: any; cars: Record<string, { car: any; reqs: any[] }> }> = {};
    filtered.forEach((r: any) => {
      const cityId = r.cars?.location_id || "unknown";
      const city = locations.find((l: any) => l.id === cityId) || { id: "unknown", name: "Sin ciudad" };
      byCity[cityId] = byCity[cityId] || { city, cars: {} };
      const carId = r.car_id;
      byCity[cityId].cars[carId] = byCity[cityId].cars[carId] || { car: r.cars, reqs: [] };
      byCity[cityId].cars[carId].reqs.push(r);
    });
    return byCity;
  }, [filtered, locations]);

  // ---------------- Mutations ----------------
  const audit = async (action: string, target_id: string, details: any) => {
    await supabase.rpc("insert_audit_log", {
      _action: action, _target_table: "participation_requests", _target_id: target_id, _details: details,
    });
  };

  const updateStatus = useMutation({
    mutationFn: async ({ id, status, extra, action, details }: any) => {
      const update: any = { status, ...(extra || {}) };
      if (status === "waitlist") {
        // compute list_priority
        const sameCar = requests.filter((r: any) => r.car_id === selected?.car_id && r.status === "waitlist");
        update.list_priority = sameCar.length + 1;
      }
      if (status === "pending" && extra?.reopened_at === undefined) {
        update.reopened_at = new Date().toISOString();
        update.reopened_by = (await supabase.auth.getUser()).data.user?.id;
      }
      const { error } = await supabase.from("participation_requests").update(update).eq("id", id);
      if (error) throw error;
      await audit(action, id, details);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-solicitudes-full"] });
      qc.invalidateQueries({ queryKey: ["audit-solicitud"] });
      toast.success("Solicitud actualizada");
    },
    onError: () => toast.error("Error al actualizar"),
  });

  const saveEvaluation = useMutation({
    mutationFn: async () => {
      if (!selected) return;
      const { error } = await supabase
        .from("participation_requests")
        .update({ score: manualScore, score_notes: scoreNotes, status: "scoring" })
        .eq("id", selected.id);
      if (error) throw error;
      await audit("evaluacion_guardada", selected.id, {
        score: manualScore, auto_score: autoScore.normalized, notes: scoreNotes,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-solicitudes-full"] });
      toast.success("Evaluación guardada");
    },
  });

  const addNote = useMutation({
    mutationFn: async (highlighted?: string) => {
      if (!selected || !newNote.trim()) return;
      const uid = (await supabase.auth.getUser()).data.user?.id;
      const { error } = await supabase.from("internal_notes").insert({
        request_id: selected.id, admin_id: uid!, content: newNote, highlighted_text: highlighted || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["internal-notes"] });
      setNewNote("");
      toast.success("Nota guardada");
    },
  });

  const deleteNote = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("internal_notes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["internal-notes"] }),
  });

  const addContactLog = useMutation({
    mutationFn: async () => {
      if (!selected || !contactContent.trim()) return;
      const uid = (await supabase.auth.getUser()).data.user?.id;
      const { error } = await supabase.from("contact_logs").insert({
        user_id: selected.user_id, request_id: selected.id, admin_id: uid!,
        type: contactType, content: contactContent,
        follow_up_date: contactFollowUp || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contact-logs"] });
      setContactContent(""); setContactFollowUp("");
      toast.success("Contacto registrado");
    },
  });

  const toggleTag = useMutation({
    mutationFn: async ({ tagId, has }: { tagId: string; has: boolean }) => {
      if (!selected) return;
      if (has) {
        await supabase.from("request_tags").delete().eq("request_id", selected.id).eq("tag_id", tagId);
      } else {
        const uid = (await supabase.auth.getUser()).data.user?.id;
        await supabase.from("request_tags").insert({
          request_id: selected.id, tag_id: tagId, created_by: uid,
        });
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["request-tags"] }),
  });

  const createTag = useMutation({
    mutationFn: async () => {
      if (!newTagName.trim()) return;
      const uid = (await supabase.auth.getUser()).data.user?.id;
      const { error } = await supabase.from("tags").insert({
        name: newTagName, color: newTagColor, created_by: uid,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tags"] });
      setNewTagName(""); toast.success("Tag creado");
    },
    onError: () => toast.error("Error al crear tag"),
  });

  const updateProfile = useMutation({
    mutationFn: async (patch: any) => {
      if (!selected) return;
      const { error } = await supabase.from("profiles").update(patch).eq("id", selected.user_id);
      if (error) throw error;
      await supabase.rpc("insert_audit_log", {
        _action: "perfil_actualizado", _target_table: "profiles",
        _target_id: selected.user_id, _details: patch,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-solicitudes-full"] });
      toast.success("Perfil actualizado");
    },
  });

  // Open drawer
  const openDrawer = (r: any) => {
    setSelectedId(r.id);
    setDrawerTab("cuestionario");
    setManualScore(r.score ?? 0);
    setScoreNotes(r.score_notes || "");
    setActionReason("");
    setApproveChecks({ score: false, excluyentes: false, abiertas: false });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Solicitudes de Participación</h1>
        <Button variant="outline" onClick={() => setConfigOpen(true)}>
          <Settings className="h-4 w-4 mr-2" />
          Configurar cuestionario
        </Button>
      </div>

      {/* SECTION 1 — KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Total", value: kpis.total, color: "text-foreground" },
          { label: "Pendientes", value: kpis.pending, color: "text-muted-foreground" },
          { label: "En evaluación", value: kpis.scoring, color: "text-blue-400" },
          { label: "Aprobadas", value: kpis.approved, color: "text-emerald-400" },
          { label: "Rechazadas", value: kpis.rejected, color: "text-destructive" },
          { label: "Conversión", value: `${kpis.conversion}%`, color: "text-primary" },
        ].map((k) => (
          <Card key={k.label}>
            <CardContent className="pt-5 pb-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{k.label}</p>
              <p className={cn("text-2xl font-bold mt-1", k.color)}>{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Funnel */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Funnel de conversión</p>
          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { label: "Recibidas", value: kpis.total },
              { label: "Evaluadas", value: kpis.scoring + kpis.approved + kpis.rejected },
              { label: "Aprobadas", value: kpis.approved },
              { label: "KYC", value: requests.filter((r: any) => r.profiles?.kyc_status === "validated").length },
              { label: "Pago", value: requests.filter((r: any) => r.payment_status === "validated").length },
              { label: "Activas", value: requests.filter((r: any) => r.status === "approved").length },
            ].map((s, i, arr) => (
              <div key={s.label} className="flex items-center gap-2 shrink-0">
                <div className="text-center px-3 py-2 rounded-lg bg-muted/40 min-w-[80px]">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-lg font-bold text-foreground">{s.value}</p>
                </div>
                {i < arr.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Solicitudes sin vehículo (Lista de espera) */}
      <WaitlistSection />

      {/* SECTION 2 — Filters */}
      <Card>
        <CardContent className="pt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger><SelectValue placeholder="Estado" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="scoring">En evaluación</SelectItem>
                <SelectItem value="approved">Aprobadas</SelectItem>
                <SelectItem value="rejected">Rechazadas</SelectItem>
                <SelectItem value="waitlist">Lista de espera</SelectItem>
              </SelectContent>
            </Select>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger><SelectValue placeholder="Ciudad" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las ciudades</SelectItem>
                {locations.map((l: any) => (
                  <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={carFilter} onValueChange={setCarFilter}>
              <SelectTrigger><SelectValue placeholder="Vehículo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los vehículos</SelectItem>
                {cars.map((c: any) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Score: {scoreRange[0]} - {scoreRange[1]}</p>
              <Slider
                value={scoreRange}
                onValueChange={(v) => setScoreRange(v as [number, number])}
                min={0} max={100} step={5}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={riskOnly} onCheckedChange={setRiskOnly} />
              <span className="text-sm text-foreground">Solo perfiles de riesgo</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-sm text-muted-foreground">Vista agrupada</span>
              <Switch checked={groupedView} onCheckedChange={setGroupedView} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 3 — List */}
      {isLoading ? (
        <div className="space-y-2">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
      ) : filtered.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No hay solicitudes</CardContent></Card>
      ) : groupedView ? (
        <div className="space-y-6">
          {Object.values(grouped).map((group) => (
            <div key={group.city.id} className="space-y-3">
              <div className="flex items-center gap-3 pb-2 border-b border-border/40">
                <h2 className="text-lg font-semibold text-foreground">{group.city.name}</h2>
                <Badge variant="outline">
                  {Object.values(group.cars).reduce((acc, c) => acc + c.reqs.length, 0)} solicitudes
                </Badge>
              </div>
              {Object.values(group.cars).map(({ car, reqs }) => (
                <Card key={car?.id || "unknown"}>
                  <CardHeader className="flex-row items-center gap-3 space-y-0 pb-3">
                    <img
                      src={resolveCarImage(car?.image_url, car?.brand)}
                      alt={car?.name || ""}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base text-foreground">{car?.name || "—"}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {(car?.max_participations || 10) - (car?.remaining_participations ?? 10)}/{car?.max_participations || 10}
                        </span>
                        <Progress
                          value={((car?.max_participations || 10) - (car?.remaining_participations ?? 10)) / (car?.max_participations || 10) * 100}
                          className="h-2 w-32"
                        />
                      </div>
                    </div>
                    {car?.id && (
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/car/${car.id}`)}>
                        <Eye className="h-4 w-4 mr-1" /> Ver vehículo
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="pt-0">
                    <RequestRows
                      reqs={reqs}
                      tagsByRequest={tagsByRequest}
                      tags={tags}
                      scoringRules={scoringRules}
                      onOpen={openDrawer}
                      onStatus={(r, status) => updateStatus.mutate({
                        id: r.id, status, action: `cambio_estado_${status}`,
                        details: { before: r.status, after: status },
                      })}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-4">
            <RequestRows
              reqs={filtered}
              tagsByRequest={tagsByRequest}
              tags={tags}
              scoringRules={scoringRules}
              onOpen={openDrawer}
              onStatus={(r, status) => updateStatus.mutate({
                id: r.id, status, action: `cambio_estado_${status}`,
                details: { before: r.status, after: status },
              })}
            />
          </CardContent>
        </Card>
      )}

      {/* SECTION 4 — Drawer */}
      <Sheet open={!!selectedId} onOpenChange={(o) => !o && setSelectedId(null)}>
        <SheetContent className="w-full sm:max-w-4xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-foreground">Expediente Completo</SheetTitle>
          </SheetHeader>

          {selected && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">
              {/* Left column — participant card */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardContent className="pt-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
                        {initials(selected.profiles?.name, selected.profiles?.surname)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">
                          {selected.profiles?.name} {selected.profiles?.surname}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{selected.profiles?.email}</p>
                        <p className="text-xs text-muted-foreground">{selected.profiles?.phone || "—"}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedTagIds.map((tid) => {
                          const t = tags.find((x) => x.id === tid);
                          if (!t) return null;
                          return (
                            <Badge
                              key={tid}
                              style={{ backgroundColor: t.color + "30", color: t.color, borderColor: t.color }}
                              variant="outline"
                              className="cursor-pointer"
                              onClick={() => toggleTag.mutate({ tagId: tid, has: true })}
                            >
                              {t.name} ×
                            </Badge>
                          );
                        })}
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-6 px-2">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 space-y-2">
                            <p className="text-xs font-medium text-foreground">Asignar tag</p>
                            <div className="flex flex-wrap gap-1">
                              {tags.filter((t) => !selectedTagIds.includes(t.id)).map((t) => (
                                <Badge
                                  key={t.id}
                                  style={{ backgroundColor: t.color + "30", color: t.color, borderColor: t.color }}
                                  variant="outline"
                                  className="cursor-pointer"
                                  onClick={() => toggleTag.mutate({ tagId: t.id, has: false })}
                                >
                                  {t.name}
                                </Badge>
                              ))}
                            </div>
                            <div className="border-t border-border/40 pt-2 space-y-2">
                              <p className="text-xs font-medium text-foreground">Crear nuevo tag</p>
                              <Input
                                placeholder="Nombre"
                                value={newTagName}
                                onChange={(e) => setNewTagName(e.target.value)}
                                className="h-8"
                              />
                              <div className="flex gap-1">
                                {TAG_COLORS.map((c) => (
                                  <button
                                    key={c}
                                    onClick={() => setNewTagColor(c)}
                                    className={cn(
                                      "h-6 w-6 rounded-full border-2",
                                      newTagColor === c ? "border-foreground" : "border-transparent"
                                    )}
                                    style={{ backgroundColor: c }}
                                  />
                                ))}
                              </div>
                              <Button size="sm" className="w-full" onClick={() => createTag.mutate()}>
                                Crear
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* KYC */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">KYC:</span>
                        <Badge variant={selected.profiles?.kyc_status === "validated" ? "default" : "secondary"}>
                          {selected.profiles?.kyc_status || "pending"}
                        </Badge>
                      </div>
                      <Button variant="link" size="sm" className="h-auto p-0"
                        onClick={() => navigate(`/admin/kyc?user=${selected.user_id}`)}>
                        Ver KYC <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/40">
                      <Stat label="Solicitudes" value={userOtherRequests.length + 1} />
                      <Stat label="Activas" value={userValidatedParts.length} />
                      <Stat
                        label="Créditos restantes"
                        value={userValidatedParts.reduce((a: number, p: any) => a + (p.credits_remaining || 0), 0)}
                      />
                      <Stat
                        label="Miembro desde"
                        value={selected.profiles?.created_at
                          ? format(new Date(selected.profiles.created_at), "MMM yy", { locale: es })
                          : "—"}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Solicitud actual */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Solicitud actual</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <Row label="Vehículo" value={selected.cars?.name} />
                    <Row label="Ciudad" value={locations.find((l: any) => l.id === selected.cars?.location_id)?.name || "—"} />
                    <Row label="Participaciones" value={String(selected.num_participations || 1)} />
                    <Row label="Total" value={`€${Number(selected.payment_amount || (selected.num_participations || 1) * (selected.cars?.participation_price || 0)).toLocaleString()}`} />
                    <Row label="Fecha" value={format(new Date(selected.created_at), "PPP", { locale: es })} />
                    {selected.num_participations_modified && (
                      <Badge variant="outline" className="text-xs">Modificada por admin</Badge>
                    )}
                  </CardContent>
                </Card>

                {/* Otras solicitudes */}
                {userOtherRequests.length > 0 && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Otras solicitudes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {userOtherRequests.map((o: any) => (
                        <div key={o.id} className="flex items-center justify-between text-sm">
                          <span className="text-foreground truncate">{o.cars?.name || "—"}</span>
                          <Badge variant={statusConfig[o.status]?.variant || "secondary"} className="text-xs">
                            {statusConfig[o.status]?.label || o.status}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right column — tabs */}
              <div className="lg:col-span-3">
                <Tabs value={drawerTab} onValueChange={setDrawerTab}>
                  <TabsList className="w-full grid grid-cols-5">
                    <TabsTrigger value="cuestionario" className="text-xs"><ClipboardList className="h-3 w-3" /></TabsTrigger>
                    <TabsTrigger value="perfil" className="text-xs"><User className="h-3 w-3" /></TabsTrigger>
                    <TabsTrigger value="notas" className="text-xs"><FileText className="h-3 w-3" /></TabsTrigger>
                    <TabsTrigger value="comunicaciones" className="text-xs"><MessageSquare className="h-3 w-3" /></TabsTrigger>
                    <TabsTrigger value="historial" className="text-xs"><History className="h-3 w-3" /></TabsTrigger>
                  </TabsList>

                  {/* TAB 1: Cuestionario */}
                  <TabsContent value="cuestionario" className="space-y-4 mt-4">
                    {/* Auto score */}
                    <Card>
                      <CardContent className="pt-5">
                        <div className="flex items-center gap-4">
                          <div className="relative h-20 w-20 shrink-0">
                            <svg className="w-full h-full -rotate-90">
                              <circle cx="40" cy="40" r="34" stroke="hsl(var(--muted))" strokeWidth="6" fill="none" />
                              <circle
                                cx="40" cy="40" r="34"
                                stroke={autoScore.normalized >= 70 ? "rgb(52,211,153)" : autoScore.normalized >= 40 ? "rgb(251,146,60)" : "hsl(var(--destructive))"}
                                strokeWidth="6" fill="none"
                                strokeDasharray={`${(autoScore.normalized / 100) * 213} 213`}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xl font-bold text-foreground">{autoScore.normalized}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Score automático</p>
                            <p className="text-xs text-muted-foreground">{autoScore.total} / {autoScore.max} pts</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {autoScore.excludent.length > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {autoScore.excludent.length} excluyente(s)
                                </Badge>
                              )}
                              {autoScore.red.length > 0 && (
                                <Badge variant="destructive" className="text-xs">🚨 {autoScore.red.length} rojo</Badge>
                              )}
                              {autoScore.orange.length > 0 && (
                                <Badge variant="outline" className="text-xs text-orange-300 border-orange-500/40">
                                  ⚠ {autoScore.orange.length} naranja
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Detalle por pregunta */}
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="text-sm">Respuestas</CardTitle></CardHeader>
                      <CardContent className="space-y-2">
                        {questions.filter((q) => q.question_type === "radio").map((q) => {
                          const ans = (selected.questionnaire_answers as any)?.[q.question_key];
                          const item = autoScore.breakdown.find((b) => b.question_key === q.question_key);
                          const opt = q.options.find((o) => o.value === ans);
                          return (
                            <div
                              key={q.id}
                              className={cn(
                                "p-2 rounded border text-sm",
                                item?.rule?.is_excludent ? "border-destructive/50 bg-destructive/10" :
                                  item?.rule?.risk_flag === "red" ? "border-destructive/40 bg-destructive/5" :
                                    item?.rule?.risk_flag === "orange" ? "border-orange-500/40 bg-orange-500/5" :
                                      "border-border/40"
                              )}
                            >
                              <p className="text-xs text-muted-foreground">{q.question_key}: {q.question_text}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-foreground text-sm">{opt?.label || ans || "—"}</span>
                                <div className="flex items-center gap-2">
                                  {item?.rule?.is_excludent && <Badge variant="destructive" className="text-xs">EXCLUYENTE</Badge>}
                                  {item?.rule?.risk_flag === "red" && !item.rule.is_excludent && <Badge variant="destructive" className="text-xs">🚨 Riesgo Alto</Badge>}
                                  {item?.rule?.risk_flag === "orange" && <Badge variant="outline" className="text-xs text-orange-300">⚠ Riesgo</Badge>}
                                  <Badge variant="outline" className="text-xs">{item?.points ?? 0} pts</Badge>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </CardContent>
                    </Card>

                    {/* Open answers */}
                    {questions.filter((q) => q.question_type === "textarea").map((q) => {
                      const ans = (selected.questionnaire_answers as any)?.[q.question_key];
                      if (!ans) return null;
                      return (
                        <Card key={q.id}>
                          <CardContent className="pt-4 space-y-2">
                            <p className="text-xs text-muted-foreground">{q.question_text}</p>
                            <p className="text-sm text-foreground whitespace-pre-wrap">{ans}</p>
                            <Button
                              size="sm" variant="outline"
                              onClick={() => { setNewNote(`[${q.question_key}] `); setDrawerTab("notas"); }}
                            >
                              Añadir anotación
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}

                    {/* Manual scoring */}
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="text-sm">Score manual</CardTitle></CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Slider value={[manualScore]} onValueChange={([v]) => setManualScore(v)} max={100} step={1} className="flex-1" />
                          <Input type="number" value={manualScore}
                            onChange={(e) => setManualScore(Math.min(100, Math.max(0, Number(e.target.value))))}
                            className="w-20" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Score automático: {autoScore.normalized} pts | Score manual: {manualScore} pts
                        </p>
                        <Textarea
                          placeholder="Notas de evaluación..."
                          value={scoreNotes}
                          onChange={(e) => setScoreNotes(e.target.value)}
                          rows={3}
                        />
                        <Button onClick={() => saveEvaluation.mutate()} disabled={saveEvaluation.isPending}>
                          Guardar evaluación
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Actions */}
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="text-sm">Acciones</CardTitle></CardHeader>
                      <CardContent className="grid grid-cols-2 gap-2">
                        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setConfirmAction("approve")}>
                          <CheckCircle className="h-4 w-4 mr-1" /> Aprobar perfil
                        </Button>
                        <Button variant="destructive" onClick={() => setConfirmAction("reject")}>
                          <XCircle className="h-4 w-4 mr-1" /> Rechazar
                        </Button>
                        <Button variant="outline" className="text-orange-300 border-orange-500/40" onClick={() => setConfirmAction("waitlist")}>
                          <Clock className="h-4 w-4 mr-1" /> Lista de espera
                        </Button>
                        {selected.status === "rejected" && (
                          <Button variant="secondary" onClick={() => setConfirmAction("reopen")}>
                            Reabrir solicitud
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* TAB 2: Perfil */}
                  <TabsContent value="perfil" className="space-y-4 mt-4">
                    <ProfileEditor profile={selected.profiles} onSave={(patch) => updateProfile.mutate(patch)} />
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="text-sm">Participaciones validadas</CardTitle></CardHeader>
                      <CardContent className="space-y-3">
                        {userValidatedParts.length === 0 ? (
                          <p className="text-sm text-muted-foreground">Sin participaciones validadas</p>
                        ) : userValidatedParts.map((p: any) => (
                          <div key={p.id} className="border border-border/40 rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-foreground">{p.cars?.name} #{p.participation_number}</span>
                              <Badge variant="outline">{p.credits_remaining}/{p.credits_per_year}</Badge>
                            </div>
                            <Progress value={(p.credits_used_this_year / p.credits_per_year) * 100} />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* TAB 3: Notas */}
                  <TabsContent value="notas" className="space-y-4 mt-4">
                    <Card>
                      <CardContent className="pt-4 space-y-2">
                        <Textarea
                          placeholder="Nueva nota interna..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          rows={3}
                        />
                        <Button size="sm" onClick={() => addNote.mutate(undefined)}>Guardar nota</Button>
                      </CardContent>
                    </Card>
                    {notes.length === 0 ? (
                      <p className="text-sm text-center text-muted-foreground py-4">Sin notas</p>
                    ) : notes.map((n: any) => (
                      <Card key={n.id}>
                        <CardContent className="pt-4 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {n.profiles?.name || "Admin"} · {formatDistanceToNow(new Date(n.created_at), { addSuffix: true, locale: es })}
                            </p>
                            <Button size="sm" variant="ghost" className="h-6 px-2"
                              onClick={() => deleteNote.mutate(n.id)}>×</Button>
                          </div>
                          {n.highlighted_text && (
                            <Badge variant="outline" className="text-xs">ref: {n.highlighted_text}</Badge>
                          )}
                          <p className="text-sm text-foreground whitespace-pre-wrap">{n.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  {/* TAB 4: Comunicaciones */}
                  <TabsContent value="comunicaciones" className="space-y-4 mt-4">
                    <Card>
                      <CardContent className="pt-4 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Select value={contactType} onValueChange={setContactType}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="call">📞 Llamada</SelectItem>
                              <SelectItem value="email">📧 Email</SelectItem>
                              <SelectItem value="meeting">🤝 Reunión</SelectItem>
                              <SelectItem value="note">📝 Nota</SelectItem>
                              <SelectItem value="whatsapp">💬 WhatsApp</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            type="date"
                            value={contactFollowUp}
                            onChange={(e) => setContactFollowUp(e.target.value)}
                            placeholder="Fecha de seguimiento"
                          />
                        </div>
                        <Textarea
                          placeholder="Detalles del contacto..."
                          value={contactContent}
                          onChange={(e) => setContactContent(e.target.value)}
                          rows={3}
                        />
                        <Button size="sm" onClick={() => addContactLog.mutate()}>Registrar contacto</Button>
                      </CardContent>
                    </Card>

                    {contactLogs.length === 0 ? (
                      <p className="text-sm text-center text-muted-foreground py-4">Sin comunicaciones</p>
                    ) : contactLogs.map((c: any) => {
                      const icon = c.type === "call" ? Phone : c.type === "email" ? Mail : c.type === "meeting" ? Users : c.type === "whatsapp" ? MessageSquare : FileText;
                      const Icon = icon;
                      const overdue = c.follow_up_date && isPast(new Date(c.follow_up_date));
                      return (
                        <Card key={c.id}>
                          <CardContent className="pt-4">
                            <div className="flex gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <Icon className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground">
                                  {c.profiles?.name || "Admin"} · {formatDistanceToNow(new Date(c.created_at), { addSuffix: true, locale: es })}
                                </p>
                                <p className="text-sm text-foreground mt-1 whitespace-pre-wrap">{c.content}</p>
                                {c.follow_up_date && (
                                  <Badge variant={overdue ? "destructive" : "outline"} className="mt-2 text-xs">
                                    {overdue ? "⚠ Seguimiento vencido: " : "Seguimiento: "}
                                    {format(new Date(c.follow_up_date), "PPP", { locale: es })}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </TabsContent>

                  {/* TAB 5: Historial */}
                  <TabsContent value="historial" className="space-y-3 mt-4">
                    {auditLogs.length === 0 ? (
                      <p className="text-sm text-center text-muted-foreground py-4">Sin actividad</p>
                    ) : auditLogs.map((log: any) => (
                      <div key={log.id} className="flex gap-3 p-3 rounded-lg border border-border/40">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <History className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{log.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {log.profiles?.name || "Sistema"} · {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: es })}
                          </p>
                          {log.details && typeof log.details === "object" && Object.keys(log.details).length > 0 && (
                            <pre className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          )}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Confirmation modal */}
      <Dialog open={!!confirmAction} onOpenChange={(o) => !o && setConfirmAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmAction === "approve" && "Aprobar solicitud"}
              {confirmAction === "reject" && "Rechazar solicitud"}
              {confirmAction === "waitlist" && "Mover a lista de espera"}
              {confirmAction === "reopen" && "Reabrir solicitud"}
            </DialogTitle>
          </DialogHeader>
          {confirmAction === "approve" && selected && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {selected.profiles?.name} {selected.profiles?.surname} · {selected.cars?.name}
              </p>
              <div className="space-y-2">
                {[
                  { key: "score", label: "Score satisfactorio" },
                  { key: "excluyentes", label: "Sin respuestas excluyentes graves" },
                  { key: "abiertas", label: "Respuestas abiertas revisadas" },
                ].map((c) => (
                  <label key={c.key} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={(approveChecks as any)[c.key]}
                      onChange={(e) => setApproveChecks((p) => ({ ...p, [c.key]: e.target.checked }))}
                    />
                    {c.label}
                  </label>
                ))}
              </div>
            </div>
          )}
          {(confirmAction === "reject" || confirmAction === "reopen") && (
            <Textarea
              placeholder={confirmAction === "reject" ? "Motivo del rechazo (obligatorio)..." : "Motivo de reapertura..."}
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              rows={3}
            />
          )}
          {confirmAction === "waitlist" && selected && (
            <p className="text-sm text-muted-foreground">
              Posición sugerida basada en score: #
              {requests.filter((r: any) => r.car_id === selected.car_id && r.status === "waitlist").length + 1}
            </p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmAction(null)}>Cancelar</Button>
            <Button
              onClick={() => {
                if (!selected) return;
                if (confirmAction === "approve") {
                  if (!Object.values(approveChecks).every(Boolean)) {
                    toast.error("Confirma todos los puntos del checklist");
                    return;
                  }
                  updateStatus.mutate({
                    id: selected.id, status: "approved",
                    extra: { score: manualScore || autoScore.normalized },
                    action: "solicitud_aprobada",
                    details: { score: manualScore || autoScore.normalized, before: selected.status, after: "approved" },
                  });
                } else if (confirmAction === "reject") {
                  if (!actionReason.trim()) { toast.error("Motivo de rechazo obligatorio"); return; }
                  (async () => {
                    const uid = (await supabase.auth.getUser()).data.user?.id;
                    updateStatus.mutate({
                      id: selected.id, status: "rejected",
                      extra: {
                        score_notes: `${scoreNotes}\nMotivo: ${actionReason}`,
                        rejection_reason: actionReason,
                        rejected_at: new Date().toISOString(),
                        rejected_by: uid,
                      },
                      action: "solicitud_rechazada",
                      details: { reason: actionReason, before: selected.status, after: "rejected" },
                    });
                  })();
                } else if (confirmAction === "waitlist") {
                  updateStatus.mutate({
                    id: selected.id, status: "waitlist",
                    action: "solicitud_lista_espera",
                    details: { before: selected.status, after: "waitlist" },
                  });
                } else if (confirmAction === "reopen") {
                  if (!actionReason.trim()) { toast.error("Motivo obligatorio"); return; }
                  updateStatus.mutate({
                    id: selected.id, status: "pending",
                    action: "solicitud_reabierta",
                    details: { reason: actionReason, before: selected.status, after: "pending" },
                  });
                }
                setConfirmAction(null);
                setActionReason("");
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Config modal */}
      <QuestionnaireConfigModal open={configOpen} onOpenChange={setConfigOpen} />
    </div>
  );
};

// ---------------- Sub-components ----------------

const Stat = ({ label, value }: { label: string; value: any }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-semibold text-foreground">{value}</p>
  </div>
);

const Row = ({ label, value }: { label: string; value: any }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground">{value || "—"}</span>
  </div>
);

const ProfileEditor = ({ profile, onSave }: { profile: any; onSave: (p: any) => void }) => {
  const [form, setForm] = useState({
    name: profile?.name || "",
    surname: profile?.surname || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    linkedin: profile?.linkedin || "",
  });
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-sm">Datos personales</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {(["name", "surname", "email", "phone", "address", "linkedin"] as const).map((k) => (
          <div key={k}>
            <label className="text-xs text-muted-foreground capitalize">{k}</label>
            <Input value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
          </div>
        ))}
        <Button size="sm" onClick={() => onSave(form)}>Guardar cambios</Button>
      </CardContent>
    </Card>
  );
};

const RequestRows = ({
  reqs, tagsByRequest, tags, scoringRules, onOpen, onStatus,
}: any) => {
  return (
    <div className="space-y-1">
      {reqs.map((r: any) => {
        const auto = computeAutoScore((r.questionnaire_answers as any) || {}, scoringRules);
        const score = r.score ?? auto.normalized;
        const hasRisk = auto.excludent.length > 0 || auto.red.length > 0;
        const st = statusConfig[r.status] || statusConfig.pending;
        const reqTagIds = tagsByRequest[r.id] || [];
        return (
          <div key={r.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 border border-border/20">
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
              {initials(r.profiles?.name, r.profiles?.surname)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {r.profiles?.name} {r.profiles?.surname}
              </p>
              <p className="text-xs text-muted-foreground truncate">{r.profiles?.email}</p>
              {reqTagIds.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {reqTagIds.slice(0, 3).map((tid: string) => {
                    const t = tags.find((x: any) => x.id === tid);
                    if (!t) return null;
                    return (
                      <Badge key={tid}
                        style={{ backgroundColor: t.color + "30", color: t.color, borderColor: t.color }}
                        variant="outline" className="text-[10px] px-1 py-0">
                        {t.name}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="hidden sm:block text-xs text-muted-foreground shrink-0">
              {r.num_participations || 1}p
            </div>
            <div className="shrink-0">
              {hasRisk ? (
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Riesgo
                </Badge>
              ) : r.score != null || auto.max > 0 ? (
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    score >= 70 ? "text-emerald-300 border-emerald-500/40" :
                      score >= 40 ? "text-orange-300 border-orange-500/40" :
                        "text-destructive border-destructive/40"
                  )}
                >
                  {score}
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs">Sin evaluar</Badge>
              )}
            </div>
            <Badge variant={st.variant} className={cn("text-xs shrink-0", st.className)}>{st.label}</Badge>
            {r.status === "waitlist" && r.list_priority && (
              <Badge variant="outline" className="text-xs shrink-0 text-orange-300">#{r.list_priority}</Badge>
            )}
            <span className="hidden md:inline text-xs text-muted-foreground shrink-0">
              {formatDistanceToNow(new Date(r.created_at), { addSuffix: true, locale: es })}
            </span>
            <Button size="sm" variant="ghost" onClick={() => onOpen(r)}>Ver expediente</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><MoreVertical className="h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onStatus(r, "scoring")}>En evaluación</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatus(r, "approved")}>Aprobar</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatus(r, "rejected")}>Rechazar</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatus(r, "waitlist")}>Lista de espera</DropdownMenuItem>
                {r.status === "rejected" && (
                  <DropdownMenuItem onClick={() => onStatus(r, "pending")}>Reabrir</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      })}
    </div>
  );
};

const WaitlistSection = () => {
  const qc = useQueryClient();
  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["admin-waitlist-entries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const deleteEntry = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("waitlist").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-waitlist-entries"] });
      toast.success("Entrada eliminada");
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          Solicitudes sin vehículo (Lista de espera)
          <Badge variant="outline">{entries.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-16 w-full" />
        ) : entries.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            No hay solicitudes sin vehículo.
          </p>
        ) : (
          <div className="space-y-1">
            {entries.map((e: any) => (
              <div
                key={e.id}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg border border-border/20 hover:bg-muted/30"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {e.nombre || "—"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{e.email}</p>
                </div>
                <Badge variant="outline" className="w-fit">
                  {e.ciudad || "Sin ciudad"}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(e.created_at), { locale: es, addSuffix: true })}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm("¿Eliminar esta entrada?")) deleteEntry.mutate(e.id);
                  }}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminSolicitudes;

