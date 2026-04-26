import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { resolveCarImage } from "@/lib/resolveCarImage";
import {
  ArrowLeft, ExternalLink, MapPin, Users, CalendarDays, Wrench,
  Gauge, FileText, ClipboardCheck, Settings,
} from "lucide-react";
import { format, startOfMonth, endOfMonth, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";

const initials = (n?: string, s?: string) =>
  `${(n?.[0] || "").toUpperCase()}${(s?.[0] || "").toUpperCase()}` || "?";

const useCarDetail = (carId: string) => useQuery({
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

const useCarParticipants = (carId: string) => useQuery({
  queryKey: ["fleet-car-participants", carId],
  enabled: !!carId,
  queryFn: async () => {
    const { data: vps, error } = await supabase
      .from("validated_participations")
      .select("*")
      .eq("car_id", carId)
      .order("participation_number");
    if (error) throw error;
    if (!vps?.length) return [];

    const userIds = [...new Set(vps.map((v: any) => v.user_id))];
    const [{ data: profiles }, { data: docs }, { data: lastRes }] = await Promise.all([
      supabase.from("profiles").select("id,name,surname,email,phone").in("id", userIds),
      supabase.from("participant_documents").select("user_id,status").in("user_id", userIds),
      supabase.from("reservations").select("user_id,start_date").eq("car_id", carId).in("user_id", userIds).order("start_date", { ascending: false }),
    ]);

    const pMap = new Map((profiles || []).map((p: any) => [p.id, p]));
    const docByUser: Record<string, { ok: number; pending: number; bad: number }> = {};
    (docs || []).forEach((d: any) => {
      docByUser[d.user_id] = docByUser[d.user_id] || { ok: 0, pending: 0, bad: 0 };
      if (d.status === "validated") docByUser[d.user_id].ok++;
      else if (d.status === "rejected") docByUser[d.user_id].bad++;
      else docByUser[d.user_id].pending++;
    });
    const lastByUser: Record<string, string> = {};
    (lastRes || []).forEach((r: any) => {
      if (!lastByUser[r.user_id]) lastByUser[r.user_id] = r.start_date;
    });

    return vps.map((v: any) => ({
      ...v,
      profile: pMap.get(v.user_id) as any,
      docs: docByUser[v.user_id] || { ok: 0, pending: 0, bad: 0 },
      lastReservation: lastByUser[v.user_id],
    }));
  },
});

const useCarReservations = (carId: string) => useQuery({
  queryKey: ["fleet-car-reservations", carId],
  enabled: !!carId,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("car_id", carId);
    if (error) throw error;
    return data || [];
  },
});

const useCarBlocks = (carId: string) => useQuery({
  queryKey: ["fleet-car-blocks", carId],
  enabled: !!carId,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("calendar_blocks")
      .select("*")
      .eq("car_id", carId);
    if (error) throw error;
    return data || [];
  },
});

const useCarMaintenance = (carId: string) => useQuery({
  queryKey: ["fleet-car-maintenance", carId],
  enabled: !!carId,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("vehicle_maintenance")
      .select("*")
      .eq("car_id", carId)
      .order("service_date", { ascending: false });
    if (error) throw error;
    return data || [];
  },
});

const useCarDocuments = (carId: string) => useQuery({
  queryKey: ["fleet-car-documents", carId],
  enabled: !!carId,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("vehicle_documents")
      .select("*, vehicle_document_types(name)")
      .eq("car_id", carId);
    if (error) throw error;
    return data || [];
  },
});

const useCarInspections = (carId: string) => useQuery({
  queryKey: ["fleet-car-inspections", carId],
  enabled: !!carId,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("vehicle_inspections")
      .select("*")
      .eq("car_id", carId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },
});

const docStatus = (d: { ok: number; pending: number; bad: number }) => {
  if (d.bad > 0) return { label: "Incompleto", cls: "bg-destructive/20 text-destructive" };
  if (d.pending > 0) return { label: "Pendiente", cls: "bg-amber-500/20 text-amber-300" };
  if (d.ok > 0) return { label: "Completo", cls: "bg-emerald-500/20 text-emerald-300" };
  return { label: "Sin docs", cls: "bg-muted text-muted-foreground" };
};

const AdminFlotaDetalle = () => {
  const { carId = "" } = useParams();
  const nav = useNavigate();
  const { data: car, isLoading } = useCarDetail(carId);
  const { data: participants = [] } = useCarParticipants(carId);
  const { data: reservations = [] } = useCarReservations(carId);
  const { data: blocks = [] } = useCarBlocks(carId);
  const { data: maintenance = [] } = useCarMaintenance(carId);
  const { data: documents = [] } = useCarDocuments(carId);
  const { data: inspections = [] } = useCarInspections(carId);

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

  const nextMaintenance = maintenance.find((m: any) => new Date(m.service_date) >= new Date());

  // Calendar day modifiers
  const reservationDays = useMemo(() => {
    const confirmed: Date[] = [], pending: Date[] = [];
    reservations.forEach((r: any) => {
      const s = new Date(r.start_date), e = new Date(r.end_date);
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        (r.status === "pending" ? pending : confirmed).push(new Date(d));
      }
    });
    return { confirmed, pending };
  }, [reservations]);

  const blockDays = useMemo(() => {
    const arr: Date[] = [];
    blocks.forEach((b: any) => {
      const s = new Date(b.start_date), e = new Date(b.end_date);
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) arr.push(new Date(d));
    });
    return arr;
  }, [blocks]);

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
              <span><Users className="inline h-3 w-3 mr-1" />{participants.length}/{car.max_participations ?? 10} participantes</span>
              <span><CalendarDays className="inline h-3 w-3 mr-1" />Ocupación mes: {monthMetrics.occupancy}%</span>
              <span><Wrench className="inline h-3 w-3 mr-1" />Próx. mant.: {nextMaintenance ? format(new Date(nextMaintenance.service_date), "dd MMM yyyy", { locale: es }) : "Sin programar"}</span>
            </div>
          </div>
          <Button variant="outline" onClick={() => window.open(`/car/${car.id}`, "_blank")}>
            Ver en vitrina <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="participantes" className="space-y-4">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="participantes"><Users className="h-4 w-4 mr-1" />Participantes</TabsTrigger>
          <TabsTrigger value="calendario"><CalendarDays className="h-4 w-4 mr-1" />Calendario</TabsTrigger>
          <TabsTrigger value="mantenimiento"><Wrench className="h-4 w-4 mr-1" />Mantenimiento</TabsTrigger>
          <TabsTrigger value="documentos"><FileText className="h-4 w-4 mr-1" />Documentos</TabsTrigger>
          <TabsTrigger value="inspecciones"><ClipboardCheck className="h-4 w-4 mr-1" />Inspecciones</TabsTrigger>
          <TabsTrigger value="config"><Settings className="h-4 w-4 mr-1" />Configuración</TabsTrigger>
        </TabsList>

        {/* PARTICIPANTES */}
        <TabsContent value="participantes">
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
                  <TableHead>Documentación</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Sin participantes validados.</TableCell></TableRow>
                ) : participants.map((p: any) => {
                  const used = Number(p.credits_used_this_year ?? 0);
                  const total = Number(p.credits_per_year ?? 28);
                  const pct = total > 0 ? Math.round((used / total) * 100) : 0;
                  const ds = docStatus(p.docs);
                  return (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8"><AvatarFallback>{initials(p.profile?.name, p.profile?.surname)}</AvatarFallback></Avatar>
                          <div className="text-sm">
                            <div className="font-medium">{p.profile?.name || "—"} {p.profile?.surname || ""}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">
                        <div>{p.profile?.email || "—"}</div>
                        <div className="text-muted-foreground">{p.profile?.phone || "—"}</div>
                      </TableCell>
                      <TableCell><Badge variant="outline">#{p.participation_number}</Badge></TableCell>
                      <TableCell className="min-w-[140px]">
                        <div className="text-xs mb-1">{used} / {total} ({p.credits_remaining ?? 0} rest.)</div>
                        <Progress value={pct} className="h-1.5" />
                      </TableCell>
                      <TableCell className="text-xs">
                        {p.credits_reset_date ? format(new Date(p.credits_reset_date), "dd MMM yyyy", { locale: es }) : "—"}
                      </TableCell>
                      <TableCell className="text-xs">
                        {p.lastReservation ? format(new Date(p.lastReservation), "dd MMM yyyy", { locale: es }) : "—"}
                      </TableCell>
                      <TableCell><Badge className={ds.cls}>{ds.label}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => nav(`/admin/participantes?user=${p.user_id}`)}>
                          Ver perfil
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>

        {/* CALENDARIO */}
        <TabsContent value="calendario">
          <Card><CardContent className="p-6">
            <div className="flex flex-wrap gap-3 mb-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500" /> Confirmadas</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500" /> Pendientes</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-destructive" /> Bloqueos admin</span>
            </div>
            <Calendar
              mode="single"
              numberOfMonths={2}
              modifiers={{
                confirmed: reservationDays.confirmed,
                pending: reservationDays.pending,
                blocked: blockDays,
              }}
              modifiersClassNames={{
                confirmed: "bg-emerald-500/30 text-emerald-100 rounded-md",
                pending: "bg-amber-500/30 text-amber-100 rounded-md",
                blocked: "bg-destructive/30 text-destructive-foreground rounded-md",
              }}
              className="mx-auto"
            />
          </CardContent></Card>
        </TabsContent>

        {/* MANTENIMIENTO */}
        <TabsContent value="mantenimiento">
          <Card><CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead><TableHead>Tipo</TableHead>
                  <TableHead>Proveedor</TableHead><TableHead>Km</TableHead>
                  <TableHead>Coste</TableHead><TableHead>Notas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenance.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Sin mantenimientos registrados.</TableCell></TableRow>
                ) : maintenance.map((m: any) => (
                  <TableRow key={m.id}>
                    <TableCell>{format(new Date(m.service_date), "dd MMM yyyy", { locale: es })}</TableCell>
                    <TableCell>{m.maintenance_type}</TableCell>
                    <TableCell>{m.provider || "—"}</TableCell>
                    <TableCell>{m.mileage_at_service?.toLocaleString() || "—"}</TableCell>
                    <TableCell>{m.cost ? `${Number(m.cost).toLocaleString()} €` : "—"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-xs truncate">{m.notes || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>

        {/* DOCUMENTOS */}
        <TabsContent value="documentos">
          <Card><CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead><TableHead>Archivo</TableHead>
                  <TableHead>Caducidad</TableHead><TableHead>Notas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Sin documentos del vehículo.</TableCell></TableRow>
                ) : documents.map((d: any) => (
                  <TableRow key={d.id}>
                    <TableCell>{d.vehicle_document_types?.name || "—"}</TableCell>
                    <TableCell>
                      {d.file_url ? (
                        <a href={d.file_url} target="_blank" rel="noreferrer" className="text-primary underline">
                          {d.file_name || "Ver"}
                        </a>
                      ) : "—"}
                    </TableCell>
                    <TableCell>{d.expiry_date ? format(new Date(d.expiry_date), "dd MMM yyyy", { locale: es }) : "—"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-xs truncate">{d.notes || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>

        {/* INSPECCIONES */}
        <TabsContent value="inspecciones">
          <Card><CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead><TableHead>Km antes</TableHead>
                  <TableHead>Km después</TableHead><TableHead>Estado antes</TableHead>
                  <TableHead>Estado después</TableHead><TableHead>Notas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inspections.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Sin inspecciones registradas.</TableCell></TableRow>
                ) : inspections.map((i: any) => (
                  <TableRow key={i.id}>
                    <TableCell>{format(new Date(i.created_at), "dd MMM yyyy", { locale: es })}</TableCell>
                    <TableCell>{i.km_before?.toLocaleString() || "—"}</TableCell>
                    <TableCell>{i.km_after?.toLocaleString() || "—"}</TableCell>
                    <TableCell className="text-xs">{i.condition_before || "—"}</TableCell>
                    <TableCell className="text-xs">{i.condition_after || "—"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-xs truncate">{i.notes || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>

        {/* CONFIG */}
        <TabsContent value="config">
          <Card><CardContent className="p-6 space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-muted-foreground text-xs">Max participaciones</p><p className="font-medium">{car.max_participations ?? "—"}</p></div>
              <div><p className="text-muted-foreground text-xs">Restantes</p><p className="font-medium">{car.remaining_participations ?? "—"}</p></div>
              <div><p className="text-muted-foreground text-xs">Reserva mínima</p><p className="font-medium">{car.min_reservation_days ?? "—"} días</p></div>
              <div><p className="text-muted-foreground text-xs">Reserva máxima</p><p className="font-medium">{car.max_reservation_days ?? "—"} días</p></div>
              <div><p className="text-muted-foreground text-xs">Antelación</p><p className="font-medium">{car.reservation_advance_days ?? "—"} días</p></div>
              <div><p className="text-muted-foreground text-xs">Precio participación</p><p className="font-medium">{car.participation_price ? `${Number(car.participation_price).toLocaleString()} €` : "—"}</p></div>
            </div>
            <Button variant="outline" onClick={() => nav(`/admin/vehiculos`)}>
              Editar en Vitrina
            </Button>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminFlotaDetalle;
