import { useMemo, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { resolveCarImage } from "@/lib/resolveCarImage";
import { getSignedUrl } from "@/lib/getSignedUrl";
import { parseStorageObjectRef } from "@/lib/storageObject";
import { toast as sonnerToast } from "sonner";

const viewSignedDoc = async (fileUrl: string, carId?: string | null) => {
  const url = await getSignedUrl(fileUrl, 300, { carId });
  if (url) window.open(url, "_blank");
  else sonnerToast.error("No se pudo acceder al documento. Inténtalo de nuevo.");
};
const downloadSignedDoc = async (fileUrl: string, fileName?: string, carId?: string | null) => {
  const signed = await getSignedUrl(fileUrl, 60, { carId });
  if (!signed) { sonnerToast.error("No se pudo descargar el documento."); return; }
  try {
    const res = await fetch(signed);
    if (!res.ok) throw new Error("fetch failed");
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName || "documento";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  } catch {
    sonnerToast.error("No se pudo descargar el documento.");
  }
};
import {
  ArrowLeft, ExternalLink, MapPin, Users, CalendarDays, Wrench,
  Gauge, FileText, ClipboardCheck, BarChart3, Plus, Trash2, Download,
  Eye, Upload, AlertTriangle, X,
} from "lucide-react";
import {
  format, startOfMonth, endOfMonth, differenceInDays, addDays, startOfYear,
  parse, getDay, startOfWeek, subMonths, addMonths,
} from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from "recharts";
import "react-big-calendar/lib/css/react-big-calendar.css";

const initials = (n?: string, s?: string) =>
  `${(n?.[0] || "").toUpperCase()}${(s?.[0] || "").toUpperCase()}` || "?";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (d: Date) => startOfWeek(d, { locale: es }),
  getDay,
  locales: { es },
});

const messages = {
  next: "Sig.", previous: "Ant.", today: "Hoy",
  month: "Mes", week: "Semana", day: "Día", agenda: "Agenda",
  date: "Fecha", time: "Hora", event: "Evento",
  noEventsInRange: "Sin eventos en este rango.",
  showMore: (n: number) => `+${n} más`,
};

const auditLog = (action: string, target_id: string, details?: any) =>
  supabase.rpc("insert_audit_log", { _action: action, _target_table: "fleet", _target_id: target_id, _details: details });

// ============================================================
// HEADER + DATA HOOKS
// ============================================================

const AdminFlotaDetalle = () => {
  const { carId = "" } = useParams();
  const nav = useNavigate();
  const qc = useQueryClient();

  const { data: car, isLoading } = useQuery({
    queryKey: ["fleet-car", carId],
    enabled: !!carId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*, locations(name)")
        .eq("id", carId)
        .maybeSingle();
      if (error) throw error;
      return data as any;
    },
  });

  const { data: reservations = [] } = useQuery({
    queryKey: ["fleet-reservations", carId],
    enabled: !!carId,
    queryFn: async () => {
      const { data, error } = await supabase.from("reservations").select("*").eq("car_id", carId);
      if (error) throw error;
      return data || [];
    },
  });

  const { data: blocks = [] } = useQuery({
    queryKey: ["fleet-blocks", carId],
    enabled: !!carId,
    queryFn: async () => {
      const { data, error } = await supabase.from("calendar_blocks").select("*").eq("car_id", carId);
      if (error) throw error;
      return data || [];
    },
  });

  const { data: maintenance = [] } = useQuery({
    queryKey: ["fleet-maintenance", carId],
    enabled: !!carId,
    queryFn: async () => {
      const { data, error } = await supabase.from("vehicle_maintenance").select("*").eq("car_id", carId).order("service_date", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const { data: participants = [] } = useQuery({
    queryKey: ["fleet-participants", carId],
    enabled: !!carId,
    queryFn: async () => {
      const { data: vps, error } = await supabase.from("validated_participations").select("*").eq("car_id", carId).order("participation_number");
      if (error) throw error;
      if (!vps?.length) return [];
      const ids = [...new Set(vps.map((v: any) => v.user_id))];
      const { data: profs } = await supabase.from("profiles").select("id,name,surname,email,phone").in("id", ids);
      const pm = new Map((profs || []).map((p: any) => [p.id, p]));
      // Agrupar por user_id: acumular créditos y participaciones del mismo usuario
      const grouped = new Map<string, any>();
      for (const v of vps) {
        const existing = grouped.get(v.user_id);
        if (!existing) {
          grouped.set(v.user_id, {
            ...v,
            profile: pm.get(v.user_id),
            participation_numbers: [v.participation_number],
            participation_count: 1,
            credits_per_year: Number(v.credits_per_year ?? 28),
            credits_used_this_year: Number(v.credits_used_this_year ?? 0),
            credits_remaining: Number(v.credits_remaining ?? 0),
            ids: [v.id],
          });
        } else {
          existing.participation_numbers.push(v.participation_number);
          existing.participation_count += 1;
          existing.credits_per_year += Number(v.credits_per_year ?? 28);
          existing.credits_used_this_year += Number(v.credits_used_this_year ?? 0);
          existing.credits_remaining += Number(v.credits_remaining ?? 0);
          existing.ids.push(v.id);
          // Conservar la fecha de reset más temprana
          if (v.credits_reset_date && (!existing.credits_reset_date || v.credits_reset_date < existing.credits_reset_date)) {
            existing.credits_reset_date = v.credits_reset_date;
          }
        }
      }
      return Array.from(grouped.values()).sort(
        (a, b) => Math.min(...a.participation_numbers) - Math.min(...b.participation_numbers)
      );
    },
  });

  const monthMetrics = useMemo(() => {
    const ms = startOfMonth(new Date());
    const me = endOfMonth(new Date());
    const monthDays = differenceInDays(me, ms) + 1;
    let reserved = 0;
    reservations.forEach((r: any) => {
      const s = new Date(r.start_date);
      const e = new Date(r.end_date);
      if (e < ms || s > me) return;
      const a = s < ms ? ms : s;
      const b = e > me ? me : e;
      reserved += differenceInDays(b, a) + 1;
    });
    return { occupancy: Math.min(100, Math.round((reserved / monthDays) * 100)), reservedDays: reserved };
  }, [reservations]);

  const nextMaintenance = useMemo(
    () => [...maintenance].reverse().find((m: any) => new Date(m.service_date) >= new Date()),
    [maintenance]
  );

  if (isLoading) return <Skeleton className="h-96" />;
  if (!car) return <Card><CardContent className="p-10 text-center">Vehículo no encontrado.</CardContent></Card>;

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={() => nav("/admin/flota")} className="-ml-2">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver a Flota
      </Button>

      {/* Header */}
      <Card className="border-border/40">
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-4">
          <img
            src={resolveCarImage(car.image_url || "", car.name)}
            alt={car.name}
            className="h-20 w-32 object-cover rounded-md bg-muted"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold">{car.name}</h1>
              <Badge className="bg-emerald-500/90 text-white border-0">Flota Activa</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {car.brand} {car.model} · {car.year}
              {car.locations?.name && (<> · <MapPin className="inline h-3 w-3" /> {car.locations.name}</>)}
            </p>
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
              <span><Gauge className="inline h-3 w-3 mr-1" />{(car.total_km ?? 0).toLocaleString()} km</span>
              <span><Users className="inline h-3 w-3 mr-1" />{participants.reduce((s: number, p: any) => s + (p.participation_count || 1), 0)}/{car.max_participations ?? 10} participaciones · {participants.length} {participants.length === 1 ? "copropietario" : "copropietarios"}</span>
              <span><CalendarDays className="inline h-3 w-3 mr-1" />Ocupación mes: {monthMetrics.occupancy}%</span>
              <span><Wrench className="inline h-3 w-3 mr-1" />Próx. mant.: {nextMaintenance ? format(new Date(nextMaintenance.service_date), "dd MMM yyyy", { locale: es }) : "Sin programar"}</span>
            </div>
          </div>
          <Button variant="outline" onClick={() => window.open(`/car/${car.id}`, "_blank")}>
            Ver en vitrina <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="participantes" className="space-y-4">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="participantes"><Users className="h-4 w-4 mr-1" />Participantes</TabsTrigger>
          <TabsTrigger value="calendario"><CalendarDays className="h-4 w-4 mr-1" />Calendario</TabsTrigger>
          <TabsTrigger value="documentos"><FileText className="h-4 w-4 mr-1" />Documentos</TabsTrigger>
          <TabsTrigger value="inspecciones"><ClipboardCheck className="h-4 w-4 mr-1" />Registro de entrada/salida</TabsTrigger>
          <TabsTrigger value="mantenimiento"><Wrench className="h-4 w-4 mr-1" />Mantenimiento</TabsTrigger>
          <TabsTrigger value="kpis"><BarChart3 className="h-4 w-4 mr-1" />KPIs</TabsTrigger>
        </TabsList>

        <TabsContent value="participantes"><ParticipantsTab carId={carId} participants={participants} reservations={reservations} nav={nav} /></TabsContent>
        <TabsContent value="calendario"><CalendarTab carId={carId} car={car} reservations={reservations} blocks={blocks} qc={qc} /></TabsContent>
        <TabsContent value="documentos"><DocumentsTab carId={carId} qc={qc} /></TabsContent>
        <TabsContent value="inspecciones"><InspectionsTab carId={carId} car={car} reservations={reservations} qc={qc} /></TabsContent>
        <TabsContent value="mantenimiento"><MaintenanceTab carId={carId} maintenance={maintenance} qc={qc} /></TabsContent>
        <TabsContent value="kpis"><KpisTab carId={carId} car={car} reservations={reservations} blocks={blocks} participants={participants} /></TabsContent>
      </Tabs>
    </div>
  );
};

// ============================================================
// TAB 1 — PARTICIPANTES
// ============================================================
const ParticipantsTab = ({ carId, participants, reservations, nav }: any) => {
  const lastByUser = useMemo(() => {
    const m: Record<string, string> = {};
    [...reservations].sort((a: any, b: any) => b.start_date.localeCompare(a.start_date)).forEach((r: any) => {
      if (!m[r.user_id]) m[r.user_id] = r.start_date;
    });
    return m;
  }, [reservations]);

  return (
    <Card><CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Participante</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>#</TableHead>
            <TableHead>Créditos</TableHead>
            <TableHead>Reset</TableHead>
            <TableHead>Última reserva</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.length === 0 ? (
            <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Sin participantes validados.</TableCell></TableRow>
          ) : participants.map((p: any) => {
            const used = Number(p.credits_used_this_year ?? 0);
            const total = Number(p.credits_per_year ?? 28);
            const pct = total > 0 ? Math.round((used / total) * 100) : 0;
            return (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8"><AvatarFallback>{initials(p.profile?.name, p.profile?.surname)}</AvatarFallback></Avatar>
                    <div className="text-sm font-medium">{p.profile?.name || "—"} {p.profile?.surname || ""}</div>
                  </div>
                </TableCell>
                <TableCell className="text-xs">
                  <div>{p.profile?.email || "—"}</div>
                  <div className="text-muted-foreground">{p.profile?.phone || "—"}</div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {(p.participation_numbers || [p.participation_number]).map((n: number) => (
                      <Badge key={n} variant="outline">#{n}</Badge>
                    ))}
                    {p.participation_count > 1 && (
                      <Badge className="bg-primary/15 text-primary border-0 text-[10px]">×{p.participation_count}</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="min-w-[160px]">
                  <div className="text-xs mb-1">{used} / {total} <span className="text-muted-foreground">({(p.credits_remaining ?? total - used)} restantes de {total})</span></div>
                  <Progress value={pct} className="h-1.5" />
                </TableCell>
                <TableCell className="text-xs">{p.credits_reset_date ? format(new Date(p.credits_reset_date), "dd MMM yyyy", { locale: es }) : "—"}</TableCell>
                <TableCell className="text-xs">{lastByUser[p.user_id] ? format(new Date(lastByUser[p.user_id]), "dd MMM yyyy", { locale: es }) : "—"}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" onClick={() => nav(`/admin/participantes?user=${p.user_id}`)}>Ver perfil</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </CardContent></Card>
  );
};

// ============================================================
// TAB 2 — CALENDARIO
// ============================================================
const CalendarTab = ({ carId, car, reservations, blocks, qc }: any) => {
  const [blockDialog, setBlockDialog] = useState<{ open: boolean; date?: Date }>({ open: false });
  const [blockForm, setBlockForm] = useState({ start_date: "", end_date: "", block_type: "maintenance", reason: "" });
  const [config, setConfig] = useState({
    min_reservation_days: car.min_reservation_days ?? 1,
    max_reservation_days: car.max_reservation_days ?? 7,
    reservation_advance_days: car.reservation_advance_days ?? 7,
  });

  const events = useMemo(() => {
    const evs: any[] = [];
    reservations.forEach((r: any) => {
      evs.push({
        id: `r-${r.id}`,
        title: r.status === "pending" ? "Reserva pendiente" : "Reserva confirmada",
        start: new Date(r.start_date),
        end: addDays(new Date(r.end_date), 1),
        allDay: true,
        resource: { type: r.status === "pending" ? "pending" : "confirmed", data: r },
      });
    });
    blocks.forEach((b: any) => {
      evs.push({
        id: `b-${b.id}`,
        title: `Bloqueo: ${b.reason}`,
        start: new Date(b.start_date),
        end: addDays(new Date(b.end_date), 1),
        allDay: true,
        resource: { type: "block", data: b },
      });
    });
    return evs;
  }, [reservations, blocks]);

  const eventStyleGetter = (event: any) => {
    const t = event.resource?.type;
    const bg = t === "confirmed" ? "hsl(142 71% 45%)" : t === "pending" ? "hsl(38 92% 50%)" : "hsl(0 84% 60%)";
    return { style: { backgroundColor: bg, border: "none", color: "#fff", fontSize: "11px" } };
  };

  const openNewBlock = (slot: any) => {
    const d = slot.start || slot;
    setBlockForm({ start_date: format(d, "yyyy-MM-dd"), end_date: format(d, "yyyy-MM-dd"), block_type: "maintenance", reason: "" });
    setBlockDialog({ open: true, date: d });
  };

  const saveBlock = useMutation({
    mutationFn: async () => {
      if (!blockForm.reason.trim()) throw new Error("El motivo es obligatorio");
      const { data, error } = await supabase.from("calendar_blocks").insert({
        car_id: carId,
        start_date: blockForm.start_date,
        end_date: blockForm.end_date,
        block_type: blockForm.block_type,
        reason: blockForm.reason,
      }).select().single();
      if (error) throw error;
      await auditLog("create_calendar_block", data.id, blockForm);
      return data;
    },
    onSuccess: () => {
      toast.success("Bloqueo creado");
      qc.invalidateQueries({ queryKey: ["fleet-blocks", carId] });
      setBlockDialog({ open: false });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteBlock = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("calendar_blocks").delete().eq("id", id);
      if (error) throw error;
      await auditLog("delete_calendar_block", id);
    },
    onSuccess: () => {
      toast.success("Bloqueo eliminado");
      qc.invalidateQueries({ queryKey: ["fleet-blocks", carId] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const saveConfig = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("cars").update(config).eq("id", carId);
      if (error) throw error;
      await auditLog("update_car_reservation_config", carId, config);
    },
    onSuccess: () => {
      toast.success("Configuración guardada");
      qc.invalidateQueries({ queryKey: ["fleet-car", carId] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const upcomingBlocks = useMemo(() => {
    const limit = addDays(new Date(), 30);
    return blocks
      .filter((b: any) => new Date(b.start_date) <= limit && new Date(b.end_date) >= new Date())
      .sort((a: any, b: any) => a.start_date.localeCompare(b.start_date));
  }, [blocks]);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 mb-4 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500" /> Confirmadas</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500" /> Pendientes</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-destructive" /> Bloqueos</span>
          </div>
          <div style={{ height: 600 }} className="rbc-dark">
            <BigCalendar
              localizer={localizer}
              events={events}
              messages={messages}
              culture="es"
              eventPropGetter={eventStyleGetter}
              selectable
              onSelectSlot={openNewBlock}
              onSelectEvent={(ev: any) => {
                if (ev.resource?.type === "block") {
                  if (confirm(`¿Eliminar bloqueo "${ev.resource.data.reason}"?`)) deleteBlock.mutate(ev.resource.data.id);
                }
              }}
              views={["month", "week", "agenda"]}
              defaultView="month"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="font-semibold text-sm">Configuración de reservas</h3>
          <div>
            <Label className="text-xs">Días mínimos por reserva</Label>
            <Input type="number" min={1} value={config.min_reservation_days} onChange={(e) => setConfig({ ...config, min_reservation_days: Number(e.target.value) })} />
          </div>
          <div>
            <Label className="text-xs">Días máximos por reserva</Label>
            <Input type="number" min={1} value={config.max_reservation_days} onChange={(e) => setConfig({ ...config, max_reservation_days: Number(e.target.value) })} />
          </div>
          <div>
            <Label className="text-xs">Días de antelación mínima</Label>
            <Input type="number" min={0} value={config.reservation_advance_days} onChange={(e) => setConfig({ ...config, reservation_advance_days: Number(e.target.value) })} />
          </div>
          <Button size="sm" className="w-full" onClick={() => saveConfig.mutate()} disabled={saveConfig.isPending}>Guardar</Button>

          <div className="border-t border-border/40 pt-3">
            <h4 className="font-semibold text-xs mb-2">Bloqueos activos (próximos 30 días)</h4>
            {upcomingBlocks.length === 0 ? (
              <p className="text-xs text-muted-foreground">Sin bloqueos próximos.</p>
            ) : (
              <ul className="space-y-2">
                {upcomingBlocks.map((b: any) => (
                  <li key={b.id} className="flex items-start justify-between gap-2 text-xs p-2 rounded bg-muted/30">
                    <div className="flex-1">
                      <div className="font-medium">{format(new Date(b.start_date), "dd MMM", { locale: es })} → {format(new Date(b.end_date), "dd MMM", { locale: es })}</div>
                      <div className="text-muted-foreground">{b.block_type} · {b.reason}</div>
                    </div>
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => deleteBlock.mutate(b.id)}>
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button size="sm" variant="outline" className="w-full" onClick={() => openNewBlock(new Date())}>
            <Plus className="h-3 w-3 mr-1" /> Añadir bloqueo
          </Button>
        </CardContent>
      </Card>

      <Dialog open={blockDialog.open} onOpenChange={(o) => setBlockDialog({ open: o })}>
        <DialogContent>
          <DialogHeader><DialogTitle>Añadir bloqueo</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div><Label>Inicio</Label><Input type="date" value={blockForm.start_date} onChange={(e) => setBlockForm({ ...blockForm, start_date: e.target.value })} /></div>
              <div><Label>Fin</Label><Input type="date" value={blockForm.end_date} onChange={(e) => setBlockForm({ ...blockForm, end_date: e.target.value })} /></div>
            </div>
            <div>
              <Label>Tipo</Label>
              <Select value={blockForm.block_type} onValueChange={(v) => setBlockForm({ ...blockForm, block_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintenance">Mantenimiento</SelectItem>
                  <SelectItem value="itv">ITV</SelectItem>
                  <SelectItem value="repair">Reparación</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Motivo *</Label><Textarea value={blockForm.reason} onChange={(e) => setBlockForm({ ...blockForm, reason: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlockDialog({ open: false })}>Cancelar</Button>
            <Button onClick={() => saveBlock.mutate()} disabled={saveBlock.isPending}>Guardar bloqueo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ============================================================
// TAB 3 — DOCUMENTOS
// ============================================================
const DocumentsTab = ({ carId, qc }: any) => {
  const { data: types = [] } = useQuery({
    queryKey: ["vehicle_document_types_active"],
    queryFn: async () => {
      const { data, error } = await supabase.from("vehicle_document_types" as any).select("*").eq("is_active", true).order("sort_order");
      if (error) throw error;
      return (data || []) as any[];
    },
  });

  const { data: docs = [] } = useQuery({
    queryKey: ["fleet-documents", carId],
    queryFn: async () => {
      const { data, error } = await supabase.from("vehicle_documents").select("*").eq("car_id", carId);
      if (error) throw error;
      return data || [];
    },
  });

  const docByType = useMemo(() => {
    const m: Record<string, any> = {};
    docs.forEach((d: any) => { m[d.document_type_id] = d; });
    return m;
  }, [docs]);

  const requiredTypes = types.filter((t: any) => t.is_required);
  const requiredUploaded = requiredTypes.filter((t: any) => docByType[t.id]).length;

  return (
    <div className="space-y-4">
      <Card><CardContent className="p-4">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="font-medium">Documentación obligatoria</span>
          <span className="text-muted-foreground">{requiredUploaded} / {requiredTypes.length}</span>
        </div>
        <Progress value={requiredTypes.length ? (requiredUploaded / requiredTypes.length) * 100 : 0} className="h-2" />
      </CardContent></Card>

      <div className="grid md:grid-cols-2 gap-4">
        {types.map((t: any) => (
          <DocumentCard key={t.id} carId={carId} type={t} doc={docByType[t.id]} qc={qc} />
        ))}
      </div>
    </div>
  );
};

const DocumentCard = ({ carId, type, doc, qc }: any) => {
  const [expiry, setExpiry] = useState(doc?.expiry_date || "");
  const [notes, setNotes] = useState(doc?.notes || "");
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) return toast.error("Máximo 10MB");
    setUploading(true);
    try {
      const path = `vehicles/${carId}/${Date.now()}_${file.name}`;
      const { error: upErr } = await supabase.storage.from("documents").upload(path, file);
      if (upErr) throw upErr;
      const { data: { user } } = await supabase.auth.getUser();

      if (doc) {
        const { error } = await supabase.from("vehicle_documents").update({
          file_url: path, file_name: file.name, file_size: file.size,
          uploaded_by: user?.id, expiry_date: expiry || null, notes: notes || null,
        }).eq("id", doc.id);
        if (error) throw error;
        await auditLog("replace_vehicle_document", doc.id, { file_name: file.name });
      } else {
        const { data, error } = await supabase.from("vehicle_documents").insert({
          car_id: carId, document_type_id: type.id, file_url: path,
          file_name: file.name, file_size: file.size, uploaded_by: user?.id,
          expiry_date: expiry || null, notes: notes || null,
        }).select().single();
        if (error) throw error;
        await auditLog("create_vehicle_document", data.id, { file_name: file.name });
      }
      toast.success("Documento subido");
      qc.invalidateQueries({ queryKey: ["fleet-documents", carId] });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setUploading(false);
    }
  };

  const removeDoc = async () => {
    if (!doc) return;
    if (!window.confirm(`¿Eliminar el documento "${type.name}"? Esta acción no se puede deshacer.`)) return;
    try {
      // Try to remove the file from storage (best effort)
      if (doc.file_url) {
        const ref = parseStorageObjectRef(doc.file_url);
        if (ref?.bucket === "documents") {
          await supabase.storage.from("documents").remove([ref.filePath]);
        }
      }
      const { error } = await supabase.from("vehicle_documents").delete().eq("id", doc.id);
      if (error) throw error;
      await auditLog("delete_vehicle_document", doc.id, { file_name: doc.file_name });
      toast.success("Documento eliminado");
      qc.invalidateQueries({ queryKey: ["fleet-documents", carId] });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const saveMeta = async () => {
    if (!doc) return;
    const { error } = await supabase.from("vehicle_documents").update({
      expiry_date: expiry || null, notes: notes || null,
    }).eq("id", doc.id);
    if (error) return toast.error(error.message);
    await auditLog("update_vehicle_document_meta", doc.id, { expiry_date: expiry, notes });
    toast.success("Cambios guardados");
    qc.invalidateQueries({ queryKey: ["fleet-documents", carId] });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"], "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    maxFiles: 1, maxSize: 10 * 1024 * 1024,
    onDrop: (files) => files[0] && upload(files[0]),
  });

  let expiryBadge: any = null;
  if (type.has_expiry_date && doc?.expiry_date) {
    const days = differenceInDays(new Date(doc.expiry_date), new Date());
    if (days < 0) expiryBadge = <Badge className="bg-destructive/20 text-destructive">Vencido</Badge>;
    else if (days < 30) expiryBadge = <Badge className="bg-amber-500/20 text-amber-300">Vence pronto</Badge>;
    else expiryBadge = <Badge className="bg-emerald-500/20 text-emerald-300">Vigente</Badge>;
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm">{type.name}</span>
              <Badge variant={type.is_required ? "default" : "outline"} className="text-[10px]">{type.is_required ? "Obligatorio" : "Opcional"}</Badge>
              {expiryBadge}
            </div>
            {type.description && <p className="text-xs text-muted-foreground mt-1">{type.description}</p>}
          </div>
          <Badge className={doc ? "bg-emerald-500/20 text-emerald-300" : "bg-muted text-muted-foreground"}>{doc ? "Subido" : "Sin subir"}</Badge>
        </div>

        {doc ? (
          <>
            <div className="text-xs text-muted-foreground">
              <div className="truncate">{doc.file_name}</div>
              <div>{format(new Date(doc.created_at), "dd MMM yyyy HH:mm", { locale: es })}</div>
            </div>
            <div className="flex gap-1 flex-wrap">
              <Button size="sm" variant="outline" onClick={() => viewSignedDoc(doc.file_url, carId)}><Eye className="h-3 w-3 mr-1" />Ver</Button>
              <Button size="sm" variant="outline" onClick={() => downloadSignedDoc(doc.file_url, doc.file_name, carId)}><Download className="h-3 w-3 mr-1" />Descargar</Button>
              <label className="inline-flex">
                <Button size="sm" variant="outline" asChild><span><Upload className="h-3 w-3 mr-1" />Reemplazar</span></Button>
                <input type="file" hidden accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
              </label>
              <Button size="sm" variant="outline" onClick={removeDoc}><Trash2 className="h-3 w-3 mr-1 text-destructive" />Eliminar</Button>
            </div>
            {type.has_expiry_date && (
              <div><Label className="text-xs">Vencimiento</Label><Input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} /></div>
            )}
            <div><Label className="text-xs">Notas</Label><Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
            <Button size="sm" variant="secondary" onClick={saveMeta}>Guardar cambios</Button>
          </>
        ) : (
          <div {...getRootProps()} className={`border-2 border-dashed rounded p-4 text-center text-xs cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-border/60 hover:border-border"}`}>
            <input {...getInputProps()} />
            <Upload className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            {uploading ? "Subiendo..." : "Arrastra el archivo aquí o haz clic para seleccionar"}
            <div className="text-[10px] text-muted-foreground mt-1">PDF, JPG, PNG · máx 10MB</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ============================================================
// TAB 4 — REGISTRO DE ENTRADA/SALIDA (INSPECTIONS)
// ============================================================
const condColor: Record<string, string> = {
  perfect: "bg-emerald-500/20 text-emerald-300",
  good: "bg-blue-500/20 text-blue-300",
  minor_damage: "bg-amber-500/20 text-amber-300",
  major_damage: "bg-destructive/20 text-destructive",
};
const condLabel: Record<string, string> = {
  perfect: "Perfecto", good: "Bueno", minor_damage: "Daño leve", major_damage: "Daño grave",
};

const InspectionsTab = ({ carId, car, reservations, qc }: any) => {
  const [open, setOpen] = useState(false);

  const { data: inspections = [] } = useQuery({
    queryKey: ["fleet-inspections", carId],
    queryFn: async () => {
      const { data, error } = await supabase.from("vehicle_inspections").select("*").eq("car_id", carId).order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-1" />Nuevo registro de entrada/salida</Button>
      </div>
      {inspections.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Sin estados registrados.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {inspections.map((i: any) => {
            const isCheckin = (i.km_before != null) || !i.km_after;
            return (
              <Card key={i.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Badge className={isCheckin ? "bg-emerald-500/20 text-emerald-300" : "bg-destructive/20 text-destructive"}>
                        {isCheckin ? "CHECK-IN" : "CHECK-OUT"}
                      </Badge>
                      <span className="text-sm font-medium">{format(new Date(i.created_at), "dd MMM yyyy HH:mm", { locale: es })}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{(i.km_after ?? i.km_before)?.toLocaleString()} km</span>
                  </div>
                  <div className="flex gap-2 flex-wrap text-xs">
                    {i.condition_before && <Badge className={condColor[i.condition_before] || ""}>Antes: {condLabel[i.condition_before] || i.condition_before}</Badge>}
                    {i.condition_after && <Badge className={condColor[i.condition_after] || ""}>Después: {condLabel[i.condition_after] || i.condition_after}</Badge>}
                  </div>
                  {i.notes && <p className="text-xs text-muted-foreground">{i.notes}</p>}
                  {(i.photos_before?.length || i.photos_after?.length) ? (
                    <div className="grid grid-cols-4 gap-2">
                      {[...(i.photos_before || []), ...(i.photos_after || [])].slice(0, 8).map((url: string, idx: number) => (
                        <a key={idx} href={url} target="_blank" rel="noreferrer">
                          <img src={url} alt="" className="w-full h-16 object-cover rounded" />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      <NewInspectionDialog open={open} onOpenChange={setOpen} carId={carId} car={car} reservations={reservations} qc={qc} />
    </div>
  );
};

const NewInspectionDialog = ({ open, onOpenChange, carId, car, reservations, qc }: any) => {
  const [form, setForm] = useState<any>({
    type: "checkin", reservation_id: "", mileage: car.total_km || 0, fuel: 100,
    condition_ext: "perfect", condition_int: "perfect", damage: "", notes: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    maxFiles: 10, maxSize: 5 * 1024 * 1024,
    onDrop: (acc) => setFiles((p) => [...p, ...acc].slice(0, 10)),
  });

  const eligibleRes = reservations.filter((r: any) => ["confirmed", "pending"].includes(r.status));

  const submit = async () => {
    if (!form.mileage) return toast.error("Kilometraje obligatorio");
    setBusy(true);
    try {
      const urls: string[] = [];
      for (const f of files) {
        const path = `inspections/${carId}/${format(new Date(), "yyyy-MM-dd")}/${Date.now()}_${f.name}`;
        const { error } = await supabase.storage.from("documents").upload(path, f);
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage.from("documents").getPublicUrl(path);
        urls.push(publicUrl);
      }
      const { data: { user } } = await supabase.auth.getUser();
      const isCheckin = form.type === "checkin";
      const payload: any = {
        car_id: carId,
        reservation_id: form.reservation_id || null,
        inspector_id: user?.id,
        notes: [form.notes, form.damage && `DAÑOS: ${form.damage}`].filter(Boolean).join("\n") || null,
      };
      if (isCheckin) {
        payload.km_before = Number(form.mileage);
        payload.condition_before = form.condition_ext;
        payload.photos_before = urls;
      } else {
        payload.km_after = Number(form.mileage);
        payload.condition_after = form.condition_ext;
        payload.photos_after = urls;
      }
      const { data, error } = await supabase.from("vehicle_inspections").insert(payload).select().single();
      if (error) throw error;
      if (Number(form.mileage) > (car.total_km || 0)) {
        await supabase.from("cars").update({ total_km: Number(form.mileage) }).eq("id", carId);
      }
      await auditLog("create_vehicle_inspection", data.id, { type: form.type });
      toast.success("Estado registrado");
      qc.invalidateQueries({ queryKey: ["fleet-inspections", carId] });
      qc.invalidateQueries({ queryKey: ["fleet-car", carId] });
      onOpenChange(false);
      setFiles([]);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Nuevo registro de entrada/salida</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Tipo</Label>
            <RadioGroup value={form.type} onValueChange={(v) => setForm({ ...form, type: v })} className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="checkin" />Check-in</label>
              <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="checkout" />Check-out</label>
            </RadioGroup>
          </div>
          <div>
            <Label>Reserva asociada</Label>
            <Select value={form.reservation_id} onValueChange={(v) => setForm({ ...form, reservation_id: v })}>
              <SelectTrigger><SelectValue placeholder="Seleccionar reserva..." /></SelectTrigger>
              <SelectContent>
                {eligibleRes.length === 0 && <SelectItem value="none" disabled>Sin reservas</SelectItem>}
                {eligibleRes.map((r: any) => (
                  <SelectItem key={r.id} value={r.id}>
                    {format(new Date(r.start_date), "dd MMM", { locale: es })} → {format(new Date(r.end_date), "dd MMM", { locale: es })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Kilometraje *</Label><Input type="number" value={form.mileage} onChange={(e) => setForm({ ...form, mileage: e.target.value })} /></div>
            <div>
              <Label>Combustible: {form.fuel}%</Label>
              <Slider value={[form.fuel]} min={0} max={100} step={5} onValueChange={(v) => setForm({ ...form, fuel: v[0] })} className="mt-3" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Estado exterior</Label>
              <Select value={form.condition_ext} onValueChange={(v) => setForm({ ...form, condition_ext: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(condLabel).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Estado interior</Label>
              <Select value={form.condition_int} onValueChange={(v) => setForm({ ...form, condition_int: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(condLabel).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          {(["minor_damage", "major_damage"].includes(form.condition_ext) || ["minor_damage", "major_damage"].includes(form.condition_int)) && (
            <div><Label>Descripción de daños</Label><Textarea value={form.damage} onChange={(e) => setForm({ ...form, damage: e.target.value })} /></div>
          )}
          <div><Label>Notas adicionales</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
          <div>
            <Label>Fotos ({files.length}/10)</Label>
            <div {...getRootProps()} className="border-2 border-dashed border-border/60 rounded p-4 text-center text-xs cursor-pointer mt-1">
              <input {...getInputProps()} />
              <Upload className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              Arrastra fotos o haz clic · JPG/PNG · máx 5MB
            </div>
            {files.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mt-2">
                {files.map((f, i) => (
                  <div key={i} className="relative">
                    <img src={URL.createObjectURL(f)} alt="" className="w-full h-16 object-cover rounded" />
                    <button onClick={() => setFiles(files.filter((_, x) => x !== i))} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={submit} disabled={busy}>{busy ? "Guardando..." : "Guardar estado"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ============================================================
// TAB 5 — MANTENIMIENTO
// ============================================================
const MAINT_TYPES = ["Revisión periódica", "Cambio de neumáticos", "Reparación", "Lavado y detailing", "ITV", "Otros"];

const MaintenanceTab = ({ carId, maintenance, qc }: any) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const today = new Date();
  const upcoming = maintenance.filter((m: any) => new Date(m.service_date) >= today);
  const past = maintenance.filter((m: any) => new Date(m.service_date) < today);

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar mantenimiento?")) return;
    const { error } = await supabase.from("vehicle_maintenance").delete().eq("id", id);
    if (error) return toast.error(error.message);
    await auditLog("delete_vehicle_maintenance", id);
    toast.success("Eliminado");
    qc.invalidateQueries({ queryKey: ["fleet-maintenance", carId] });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus className="h-4 w-4 mr-1" />Registrar mantenimiento</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-border/40 font-semibold text-sm">Próximos mantenimientos</div>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Tipo</TableHead><TableHead>Descripción</TableHead><TableHead>Fecha</TableHead>
              <TableHead>Proveedor</TableHead><TableHead>Restantes</TableHead><TableHead className="text-right">Acciones</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {upcoming.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">Sin próximos.</TableCell></TableRow>
              ) : upcoming.map((m: any) => {
                const days = differenceInDays(new Date(m.service_date), today);
                const cls = days < 7 ? "bg-destructive/20 text-destructive" : days < 30 ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300";
                return (
                  <TableRow key={m.id}>
                    <TableCell>{m.maintenance_type}</TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-xs truncate">{m.description || "—"}</TableCell>
                    <TableCell>{format(new Date(m.service_date), "dd MMM yyyy", { locale: es })}</TableCell>
                    <TableCell>{m.provider || "—"}</TableCell>
                    <TableCell><Badge className={cls}>{days}d</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" onClick={() => { setEditing(m); setOpen(true); }}><Eye className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => remove(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-border/40 font-semibold text-sm">Historial</div>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Tipo</TableHead><TableHead>Descripción</TableHead><TableHead>Fecha</TableHead>
              <TableHead>Proveedor</TableHead><TableHead>Km</TableHead><TableHead>Docs</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {past.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">Sin historial.</TableCell></TableRow>
              ) : past.map((m: any) => (
                <TableRow key={m.id}>
                  <TableCell>{m.maintenance_type}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-xs truncate">{m.description || "—"}</TableCell>
                  <TableCell>{format(new Date(m.service_date), "dd MMM yyyy", { locale: es })}</TableCell>
                  <TableCell>{m.provider || "—"}</TableCell>
                  <TableCell>{m.mileage_at_service?.toLocaleString() || "—"}</TableCell>
                  <TableCell>
                    {(m.documents || []).map((url: string, i: number) => (
                      <a key={i} href={url} target="_blank" rel="noreferrer" className="inline-block mr-1"><FileText className="h-4 w-4 text-primary" /></a>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MaintenanceDialog open={open} onOpenChange={setOpen} carId={carId} editing={editing} qc={qc} />
    </div>
  );
};

const MaintenanceDialog = ({ open, onOpenChange, carId, editing, qc }: any) => {
  const [form, setForm] = useState<any>(editing || {
    maintenance_type: "Revisión periódica", description: "", service_date: format(new Date(), "yyyy-MM-dd"),
    mileage_at_service: 0, provider: "", notes: "", cost: 0,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"], "image/jpeg": [".jpg"], "image/png": [".png"] },
    maxSize: 10 * 1024 * 1024,
    onDrop: (acc) => setFiles((p) => [...p, ...acc]),
  });

  const submit = async () => {
    setBusy(true);
    try {
      const urls: string[] = editing?.documents || [];
      for (const f of files) {
        const path = `maintenance/${carId}/${form.service_date}/${Date.now()}_${f.name}`;
        const { error } = await supabase.storage.from("documents").upload(path, f);
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage.from("documents").getPublicUrl(path);
        urls.push(publicUrl);
      }
      const { data: { user } } = await supabase.auth.getUser();
      const payload = {
        car_id: carId,
        maintenance_type: form.maintenance_type,
        description: form.description || null,
        service_date: form.service_date,
        mileage_at_service: form.mileage_at_service ? Number(form.mileage_at_service) : null,
        provider: form.provider || null,
        notes: form.notes || null,
        cost: form.cost ? Number(form.cost) : 0,
        documents: urls,
        created_by: user?.id,
      };
      if (editing) {
        const { error } = await supabase.from("vehicle_maintenance").update(payload).eq("id", editing.id);
        if (error) throw error;
        await auditLog("update_vehicle_maintenance", editing.id, payload);
      } else {
        const { data, error } = await supabase.from("vehicle_maintenance").insert(payload).select().single();
        if (error) throw error;
        await auditLog("create_vehicle_maintenance", data.id, payload);
      }
      toast.success("Guardado");
      qc.invalidateQueries({ queryKey: ["fleet-maintenance", carId] });
      onOpenChange(false);
      setFiles([]);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{editing ? "Editar mantenimiento" : "Registrar mantenimiento"}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Tipo</Label>
            <Select value={form.maintenance_type} onValueChange={(v) => setForm({ ...form, maintenance_type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{MAINT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label>Descripción</Label><Textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Fecha</Label><Input type="date" value={form.service_date} onChange={(e) => setForm({ ...form, service_date: e.target.value })} /></div>
            <div><Label>Kilometraje</Label><Input type="number" value={form.mileage_at_service || ""} onChange={(e) => setForm({ ...form, mileage_at_service: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Proveedor</Label><Input value={form.provider || ""} onChange={(e) => setForm({ ...form, provider: e.target.value })} /></div>
            <div><Label>Coste (€)</Label><Input type="number" value={form.cost || ""} onChange={(e) => setForm({ ...form, cost: e.target.value })} /></div>
          </div>
          <div><Label>Notas</Label><Textarea value={form.notes || ""} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
          <div>
            <Label>Documentos</Label>
            <div {...getRootProps()} className="border-2 border-dashed border-border/60 rounded p-3 text-center text-xs cursor-pointer mt-1">
              <input {...getInputProps()} />
              <Upload className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
              PDF, JPG, PNG · máx 10MB
            </div>
            {files.length > 0 && <div className="text-xs text-muted-foreground mt-1">{files.length} archivo(s) listo(s) para subir</div>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={submit} disabled={busy}>{busy ? "Guardando..." : "Guardar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ============================================================
// TAB 6 — KPIs
// ============================================================
const KpisTab = ({ carId, car, reservations, blocks, participants }: any) => {
  const today = new Date();
  const ms = startOfMonth(today);
  const me = endOfMonth(today);
  const monthDays = differenceInDays(me, ms) + 1;

  let monthReserved = 0;
  reservations.forEach((r: any) => {
    const s = new Date(r.start_date), e = new Date(r.end_date);
    if (e < ms || s > me) return;
    const a = s < ms ? ms : s, b = e > me ? me : e;
    monthReserved += differenceInDays(b, a) + 1;
  });
  const occupancy = Math.round((monthReserved / monthDays) * 100);

  const yearStart = startOfYear(today);
  const blockedDaysYear = blocks.reduce((sum: number, b: any) => {
    const s = new Date(b.start_date), e = new Date(b.end_date);
    if (e < yearStart) return sum;
    const a = s < yearStart ? yearStart : s;
    return sum + differenceInDays(e, a) + 1;
  }, 0);

  // Last 6 months chart
  const monthsData = useMemo(() => {
    const arr: any[] = [];
    for (let i = 5; i >= 0; i--) {
      const m = subMonths(today, i);
      const mStart = startOfMonth(m), mEnd = endOfMonth(m);
      const total = differenceInDays(mEnd, mStart) + 1;
      let reserved = 0;
      reservations.forEach((r: any) => {
        const s = new Date(r.start_date), e = new Date(r.end_date);
        if (e < mStart || s > mEnd) return;
        const a = s < mStart ? mStart : s, b = e > mEnd ? mEnd : e;
        reserved += differenceInDays(b, a) + 1;
      });
      arr.push({ mes: format(m, "MMM", { locale: es }), Reservados: reserved, Disponibles: Math.max(0, total - reserved) });
    }
    return arr;
  }, [reservations]);

  // Per-participant usage
  const usagePerUser = useMemo(() => {
    const map: Record<string, number> = {};
    reservations.forEach((r: any) => {
      const days = differenceInDays(new Date(r.end_date), new Date(r.start_date)) + 1;
      map[r.user_id] = (map[r.user_id] || 0) + days;
    });
    return participants.map((p: any) => {
      const used = Number(p.credits_used_this_year ?? 0);
      const total = Number(p.credits_per_year ?? 28);
      return {
        name: `${p.profile?.name || ""} ${p.profile?.surname || ""}`.trim() || "—",
        days: map[p.user_id] || 0,
        used, total,
        pct: total > 0 ? Math.round((used / total) * 100) : 0,
      };
    });
  }, [participants, reservations]);

  // Mileage evolution
  const { data: inspections = [] } = useQuery({
    queryKey: ["fleet-inspections-kpi", carId],
    queryFn: async () => {
      const { data } = await supabase.from("vehicle_inspections").select("created_at,km_after,km_before").eq("car_id", carId).order("created_at");
      return data || [];
    },
  });
  const mileageData = inspections.map((i: any) => ({
    fecha: format(new Date(i.created_at), "dd MMM", { locale: es }),
    km: i.km_after ?? i.km_before ?? 0,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Km totales" value={(car.total_km ?? 0).toLocaleString()} />
        <KpiCard label="Ocupación mes" value={`${occupancy}%`} />
        <KpiCard label="Reservas totales" value={reservations.length} />
        <KpiCard label="Días bloqueados año" value={blockedDaysYear} />
      </div>

      <Card><CardContent className="p-4">
        <h3 className="font-semibold text-sm mb-3">Días reservados vs disponibles · últimos 6 meses</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthsData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="mes" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <RTooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            <Legend />
            <Bar dataKey="Reservados" fill="hsl(142 71% 45%)" />
            <Bar dataKey="Disponibles" fill="hsl(var(--muted))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent></Card>

      <Card><CardContent className="p-0">
        <div className="p-4 border-b border-border/40 font-semibold text-sm">Uso por participante</div>
        <Table>
          <TableHeader><TableRow>
            <TableHead>Participante</TableHead><TableHead>Días</TableHead>
            <TableHead>Créditos</TableHead><TableHead>Utilización</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {usagePerUser.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-6 text-muted-foreground">Sin datos.</TableCell></TableRow>
            ) : usagePerUser.map((u, i) => (
              <TableRow key={i}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.days}</TableCell>
                <TableCell className="text-xs">{u.used} / {u.total}</TableCell>
                <TableCell className="min-w-[140px]">
                  <div className="text-xs mb-1">{u.pct}%</div>
                  <Progress value={u.pct} className="h-1.5" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>

      <Card><CardContent className="p-4">
        <h3 className="font-semibold text-sm mb-3">Evolución del kilometraje</h3>
        {mileageData.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Sin datos de inspecciones.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={mileageData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="fecha" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <RTooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Line type="monotone" dataKey="km" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent></Card>
    </div>
  );
};

const KpiCard = ({ label, value }: { label: string; value: any }) => (
  <Card><CardContent className="p-4">
    <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </CardContent></Card>
);

export default AdminFlotaDetalle;
