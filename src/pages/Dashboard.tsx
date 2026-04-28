import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Car, FileText, MapPin, Phone, Calendar as CalendarIcon,
  CreditCard, Info, Loader2, Eye, Download, FileImage, FileText as FileTextIcon,
  Clock, CheckCircle2, XCircle, Ban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, addDays, differenceInDays, startOfDay, subYears } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { resolveCarImage } from "@/lib/resolveCarImage";
import DocumentsBlock, { type DocItem } from "@/components/dashboard/DocumentsBlock";

const Dashboard = () => {
  const qc = useQueryClient();
  const [range, setRange] = useState<DateRange | undefined>();
  const [userId, setUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id ?? null);
      setAuthLoading(false);
    });
  }, []);

  // ================== DATA ==================
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ["dashboard", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("name, surname, email")
        .eq("id", userId!)
        .maybeSingle();

      const { data: validated } = await supabase
        .from("validated_participations")
        .select("id, car_id, credits_remaining, credits_per_year, credits_used_this_year, credits_reset_date, cars:car_id(id, name, brand, model, year, image_url, min_reservation_days, max_reservation_days, reservation_advance_days, location_id, locations:location_id(name))")
        .eq("user_id", userId!);

      // Group by car_id
      const grouped = new Map<string, any>();
      for (const v of validated || []) {
        const carId = v.car_id;
        const ex = grouped.get(carId);
        if (!ex) {
          grouped.set(carId, {
            car: v.cars,
            ids: [v.id],
            num: 1,
            credits_per_year: Number(v.credits_per_year ?? 28),
            credits_used_this_year: Number(v.credits_used_this_year ?? 0),
            credits_remaining: Number(v.credits_remaining ?? 0),
            credits_reset_date: v.credits_reset_date,
          });
        } else {
          ex.ids.push(v.id);
          ex.num += 1;
          ex.credits_per_year += Number(v.credits_per_year ?? 28);
          ex.credits_used_this_year += Number(v.credits_used_this_year ?? 0);
          ex.credits_remaining += Number(v.credits_remaining ?? 0);
          if (v.credits_reset_date && (!ex.credits_reset_date || v.credits_reset_date < ex.credits_reset_date)) {
            ex.credits_reset_date = v.credits_reset_date;
          }
        }
      }
      const participations = Array.from(grouped.values());
      const fullName = [profile?.name, profile?.surname].filter(Boolean).join(" ") || profile?.email || "Usuario";
      return { profile, fullName, participations };
    },
  });

  const primary = dashboard?.participations?.[0];
  const carId = primary?.car?.id;

  // Reservations
  const { data: reservations = [] } = useQuery({
    queryKey: ["dashboard-reservations", userId, carId],
    enabled: !!userId && !!carId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("user_id", userId!)
        .eq("car_id", carId!)
        .order("start_date", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Calendar blocks
  const { data: blocks = [] } = useQuery({
    queryKey: ["dashboard-blocks", carId],
    enabled: !!carId,
    queryFn: async () => {
      const { data } = await supabase
        .from("calendar_blocks")
        .select("start_date, end_date")
        .eq("car_id", carId!);
      return data || [];
    },
  });

  // Public vehicle documents
  const { data: vehicleDocs = [] } = useQuery({
    queryKey: ["dashboard-vehicle-docs", carId],
    enabled: !!carId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicle_documents")
        .select("*, vehicle_document_types:document_type_id(name, is_public)")
        .eq("car_id", carId!);
      if (error) throw error;
      return (data || []).filter((d: any) => d.vehicle_document_types?.is_public === true);
    },
  });

  // User documents (KYC / participant)
  const { data: userDocs = [] } = useQuery({
    queryKey: ["dashboard-user-docs", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data } = await supabase
        .from("participant_documents")
        .select("*, document_types:document_type_id(name)")
        .eq("user_id", userId!)
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  // Active document types (so we can list pending ones)
  const { data: docTypes = [] } = useQuery({
    queryKey: ["dashboard-doc-types"],
    queryFn: async () => {
      const { data } = await supabase
        .from("document_types")
        .select("id, name, sort_order, is_required, is_active")
        .eq("is_active", true)
        .order("sort_order");
      return data || [];
    },
  });

  // Credit rules (seasonal multipliers)
  const { data: creditRules = [] } = useQuery({
    queryKey: ["dashboard-credit-rules"],
    queryFn: async () => {
      const { data } = await supabase
        .from("credit_rules")
        .select("*")
        .eq("is_active", true);
      return data || [];
    },
    refetchOnWindowFocus: true,
  });

  // ================== RESERVATION LOGIC ==================
  const minDays = primary?.car?.min_reservation_days ?? 1;
  const maxDays = primary?.car?.max_reservation_days ?? 14;
  const advanceDays = primary?.car?.reservation_advance_days ?? 7;

  // Compute credits for a single day applying active rules (max multiplier wins)
  const creditsForDay = (date: Date): { credits: number; multiplier: number; isPeak: boolean } => {
    const d = startOfDay(date);
    const month = d.getMonth() + 1; // 1-12
    let perDay = 1;
    let multiplier = 1;
    let matched = false;
    for (const r of creditRules as any[]) {
      if (!r.is_active) continue;
      if (!r.applies_to_all && Array.isArray(r.car_ids) && carId && !r.car_ids.includes(carId)) continue;
      let inRange = false;
      if (r.months && Array.isArray(r.months) && r.months.length > 0) {
        if (r.months.includes(month)) inRange = true;
      } else if (r.start_date && r.end_date) {
        const s = startOfDay(new Date(r.start_date));
        const e = startOfDay(new Date(r.end_date));
        if (d >= s && d <= e) inRange = true;
      }
      if (!inRange) continue;
      const m = Number(r.multiplier ?? 1);
      const cpd = Number(r.credits_per_day ?? 1);
      // Apply the strongest (highest cost) rule
      if (m * cpd > multiplier * perDay) {
        multiplier = m;
        perDay = cpd;
        matched = true;
      }
    }
    return { credits: perDay * multiplier, multiplier, isPeak: matched && multiplier > 1 };
  };

  // Compute total credits + peak info for a range
  const computeRangeCredits = (from: Date, to: Date) => {
    let total = 0;
    let maxMult = 1;
    let anyPeak = false;
    let cur = startOfDay(from);
    const end = startOfDay(to);
    while (cur <= end) {
      const info = creditsForDay(cur);
      total += info.credits;
      if (info.multiplier > maxMult) maxMult = info.multiplier;
      if (info.isPeak) anyPeak = true;
      cur = addDays(cur, 1);
    }
    return { total, maxMult, anyPeak };
  };

  const isDateUnavailable = (date: Date) => {
    const t = startOfDay(date);
    // Confirmed/pending reservations
    for (const r of reservations as any[]) {
      if (r.status === "cancelled") continue;
      const s = startOfDay(new Date(r.start_date));
      const e = startOfDay(new Date(r.end_date));
      if (t >= s && t <= e) return true;
    }
    // Calendar blocks
    for (const b of blocks as any[]) {
      const s = startOfDay(new Date(b.start_date));
      const e = startOfDay(new Date(b.end_date));
      if (t >= s && t <= e) return true;
    }
    return false;
  };

  const handleSelect = (newRange: DateRange | undefined) => {
    if (!newRange?.from) { setRange(undefined); return; }
    setRange(newRange);
  };

  const totalDays = range?.from && range?.to ? differenceInDays(range.to, range.from) + 1 : 0;
  const rangeCreditInfo = useMemo(() => {
    if (!range?.from || !range?.to) return { total: 0, maxMult: 1, anyPeak: false };
    return computeRangeCredits(range.from, range.to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range?.from, range?.to, creditRules, carId]);
  const totalCredits = rangeCreditInfo.total;

  const createReservation = useMutation({
    mutationFn: async () => {
      if (!userId || !carId || !primary) throw new Error("Sin participación");
      if (!range?.from || !range?.to) throw new Error("Selecciona un rango de fechas");
      const days = differenceInDays(range.to, range.from) + 1;
      const minStart = addDays(startOfDay(new Date()), advanceDays);
      if (range.from < minStart) throw new Error(`La reserva debe ser con al menos ${advanceDays} días de antelación`);
      if (days < minDays) throw new Error(`Mínimo ${minDays} días`);
      if (days > maxDays) throw new Error(`Máximo ${maxDays} días`);

      const { total: creditsToUse, maxMult, anyPeak } = computeRangeCredits(range.from, range.to);
      if (creditsToUse > primary.credits_remaining) {
        throw new Error(`Solo te quedan ${primary.credits_remaining} créditos (esta reserva requiere ${creditsToUse})`);
      }

      // Re-check conflicts
      let cur = range.from;
      while (cur <= range.to) {
        if (isDateUnavailable(cur)) throw new Error("Hay fechas no disponibles en el rango seleccionado");
        cur = addDays(cur, 1);
      }

      // Insert reservation
      const { data: res, error } = await supabase.from("reservations").insert({
        user_id: userId,
        car_id: carId,
        participation_id: primary.ids[0],
        start_date: format(range.from, "yyyy-MM-dd"),
        end_date: format(range.to, "yyyy-MM-dd"),
        credits_used: creditsToUse,
        credit_multiplier: maxMult,
        is_peak_period: anyPeak,
        status: "pending",
      }).select().single();
      if (error) throw error;

      // Decrement credits using user_id + car_id (not id) to operate on the right row
      const { data: vpRow } = await supabase
        .from("validated_participations")
        .select("credits_remaining, credits_used_this_year")
        .eq("user_id", userId)
        .eq("car_id", carId)
        .limit(1)
        .maybeSingle();
      const curRem = Number(vpRow?.credits_remaining ?? primary.credits_remaining);
      const curUsed = Number(vpRow?.credits_used_this_year ?? primary.credits_used_this_year);
      const newRemaining = Math.max(0, curRem - creditsToUse);
      const newUsed = curUsed + creditsToUse;
      await supabase.from("validated_participations").update({
        credits_remaining: newRemaining,
        credits_used_this_year: newUsed,
      }).eq("user_id", userId).eq("car_id", carId);

      await supabase.rpc("insert_audit_log", {
        _action: "create_reservation",
        _target_table: "reservations",
        _target_id: res.id,
        _details: { days, credits: creditsToUse, multiplier: maxMult, peak: anyPeak, start: range.from.toISOString(), end: range.to.toISOString() },
      });
    },
    onSuccess: () => {
      toast.success("Solicitud de reserva enviada. El administrador la revisará en breve.");
      setRange(undefined);
      qc.invalidateQueries({ queryKey: ["dashboard-reservations"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const cancelReservation = useMutation({
    mutationFn: async (reservationId: string) => {
      const r = (reservations as any[]).find((x) => x.id === reservationId);
      if (!r) throw new Error("Reserva no encontrada");
      const { error } = await supabase.from("reservations").update({
        status: "cancelled",
        cancelled_at: new Date().toISOString(),
        cancelled_by: userId,
      }).eq("id", reservationId);
      if (error) throw error;
      // Restore credits using user_id + car_id of the cancelled reservation (not primary.ids[0])
      if (r.credits_used > 0) {
        const { data: vpRow } = await supabase
          .from("validated_participations")
          .select("credits_remaining, credits_used_this_year")
          .eq("user_id", r.user_id)
          .eq("car_id", r.car_id)
          .limit(1)
          .maybeSingle();
        if (vpRow) {
          await supabase.from("validated_participations").update({
            credits_remaining: Number(vpRow.credits_remaining || 0) + Number(r.credits_used),
            credits_used_this_year: Math.max(0, Number(vpRow.credits_used_this_year || 0) - Number(r.credits_used)),
          }).eq("user_id", r.user_id).eq("car_id", r.car_id);
        }
      }
      await supabase.rpc("insert_audit_log", {
        _action: "cancel_reservation",
        _target_table: "reservations",
        _target_id: reservationId,
        _details: { by: "user" },
      });
    },
    onSuccess: () => {
      toast.success("Reserva cancelada. Tus créditos han sido restituidos.");
      setCancellingId(null);
      qc.invalidateQueries({ queryKey: ["dashboard-reservations"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (e: any) => { toast.error(e.message); setCancellingId(null); },
  });

  // ================== "ESTE AÑO" METRICS ==================
  const yearMetrics = useMemo(() => {
    if (!primary) return { used: 0, remaining: 0, perYear: 28, daysReserved: 0, nextReservation: null as string | null };
    const resetDate = primary.credits_reset_date ? new Date(primary.credits_reset_date) : new Date();
    const yearStart = subYears(resetDate, 1);
    const today = startOfDay(new Date());
    let daysReserved = 0;
    let nextDate: string | null = null;
    for (const r of reservations as any[]) {
      if (r.status !== "confirmed" && r.status !== "pending") continue;
      const s = new Date(r.start_date);
      if (s >= yearStart && s <= resetDate) daysReserved += Number(r.credits_used || 0);
      if (s >= today && (!nextDate || s < new Date(nextDate))) nextDate = r.start_date;
    }
    return {
      used: Number(primary.credits_used_this_year),
      remaining: Number(primary.credits_remaining),
      perYear: Number(primary.credits_per_year),
      daysReserved,
      nextReservation: nextDate,
    };
  }, [primary, reservations]);

  const usedPct = yearMetrics.perYear > 0 ? (yearMetrics.used / yearMetrics.perYear) * 100 : 0;
  const barColor = "bg-foreground";

  // ================== RENDER ==================
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-foreground" />
      </div>
    );
  }

  const displayName = dashboard?.fullName ?? "Usuario";
  const car = primary?.car;
  const carImage = resolveCarImage(car?.image_url, car?.brand);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al Inicio</span>
          </Link>
          <div className="flex flex-col items-start sm:items-end sm:text-right">
            <span className="text-sm text-muted-foreground">Bienvenido,</span>
            <span className="font-semibold text-foreground">{displayName}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-foreground">Mi Panel</h1>

        {!car ? (
          <Card className="border-border bg-card">
            <CardContent className="p-10 text-center text-muted-foreground">
              No tienes participaciones validadas todavía.
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              {/* Vehicle */}
              <Card className="overflow-hidden border-border bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Car className="w-5 h-5" /> Mi Vehículo
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img src={carImage} alt={car.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 flex flex-col justify-center space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Vehículo</p>
                        <p className="text-2xl font-bold text-foreground">{car.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><p className="text-sm text-muted-foreground">Marca</p><p className="font-semibold text-foreground">{car.brand}</p></div>
                        <div><p className="text-sm text-muted-foreground">Modelo</p><p className="font-semibold text-foreground">{car.model}</p></div>
                        <div><p className="text-sm text-muted-foreground">Año</p><p className="font-semibold text-foreground">{car.year}</p></div>
                        <div><p className="text-sm text-muted-foreground">Participaciones</p><p className="font-semibold text-foreground">×{primary.num}</p></div>
                      </div>
                      <Link to={`/car/${car.id}`}>
                        <Button variant="outline" className="w-full mt-2">Ver Detalles Completos</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <CalendarIcon className="w-5 h-5" /> Reservar Días de Uso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-wrap gap-2 w-full justify-center">
                      <Badge variant="outline" className="text-xs"><Info className="w-3 h-3 mr-1" />Mín. {minDays} día(s)</Badge>
                      <Badge variant="outline" className="text-xs"><Info className="w-3 h-3 mr-1" />Máx. {maxDays} días</Badge>
                      <Badge variant="outline" className="text-xs"><Info className="w-3 h-3 mr-1" />Antelación {advanceDays}d</Badge>
                    </div>
                    <Calendar
                      mode="range"
                      selected={range}
                      onSelect={handleSelect}
                      locale={es}
                      disabled={(date) => date < addDays(startOfDay(new Date()), advanceDays) || isDateUnavailable(date)}
                      modifiers={{
                        peak: (date) => creditsForDay(date).isPeak,
                      }}
                      modifiersClassNames={{
                        peak: "ring-1 ring-champagne/60 text-champagne",
                      }}
                      className="rounded-md border border-border pointer-events-auto"
                    />
                    {range?.from && range?.to && (
                      <div className="w-full grid grid-cols-2 gap-2 text-center">
                        <div className="p-2 rounded bg-muted/50">
                          <p className="text-xs text-muted-foreground">Días</p>
                          <p className="font-bold text-foreground">{totalDays}</p>
                        </div>
                        <div className="p-2 rounded bg-foreground/10">
                          <p className="text-xs text-muted-foreground">
                            Créditos a usar{rangeCreditInfo.maxMult > 1 ? ` (×${rangeCreditInfo.maxMult} temp. alta)` : ""}
                          </p>
                          <p className="font-bold text-foreground text-lg">{totalCredits}</p>
                        </div>
                      </div>
                    )}
                    <Button
                      className="w-full bg-champagne hover:bg-champagne/90 text-champagne-foreground"
                      onClick={() => createReservation.mutate()}
                      disabled={createReservation.isPending || !range?.from || !range?.to}
                    >
                      {createReservation.isPending ? "Enviando..." : "Solicitar Reserva"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Reservations history */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Clock className="w-5 h-5" /> Mis Reservas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {reservations.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">Aún no tienes reservas.</p>
                  ) : (
                    <ul className="space-y-3">
                      {(reservations as any[]).map((r) => {
                        const days = differenceInDays(new Date(r.end_date), new Date(r.start_date)) + 1;
                        const canCancelConfirmed = r.status === "confirmed" && new Date(r.start_date) > addDays(new Date(), 2);
                        const canCancelPending = r.status === "pending";
                        return (
                          <li key={r.id} className="p-3 rounded-lg border border-border bg-background/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                {r.status === "pending" && <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30"><Clock className="w-3 h-3 mr-1" />En revisión</Badge>}
                                {r.status === "confirmed" && <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30"><CheckCircle2 className="w-3 h-3 mr-1" />Confirmada</Badge>}
                                {r.status === "cancelled" && r.rejected_at && <Badge className="bg-red-500/20 text-red-300 border-red-500/30"><XCircle className="w-3 h-3 mr-1" />Rechazada</Badge>}
                                {r.status === "cancelled" && !r.rejected_at && <Badge variant="secondary"><Ban className="w-3 h-3 mr-1" />Cancelada</Badge>}
                                {r.status === "completed" && <Badge variant="outline">Completada</Badge>}
                                <span className="text-sm text-foreground">
                                  {format(new Date(r.start_date), "d MMM", { locale: es })} → {format(new Date(r.end_date), "d MMM yyyy", { locale: es })}
                                </span>
                                <span className="text-xs text-muted-foreground">({days} día{days > 1 ? "s" : ""})</span>
                              </div>
                              {r.rejection_reason && (
                                <p className="text-xs italic text-muted-foreground mt-1">Motivo: {r.rejection_reason}</p>
                              )}
                            </div>
                            {(canCancelConfirmed || canCancelPending) && (
                              <Button size="sm" variant="outline" onClick={() => setCancellingId(r.id)}>
                                {canCancelPending ? "Cancelar solicitud" : "Cancelar reserva"}
                              </Button>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </CardContent>
              </Card>

              {/* Vehicle Public Documents */}
              <DocumentsBlock
                variant="vehicle"
                title="Documentos del vehículo"
                carId={carId}
                emptyText="No hay documentos disponibles por el momento."
                items={(vehicleDocs as any[])
                  .filter((d) => !!d.file_url)
                  .map<DocItem>((d) => ({
                    id: d.id,
                    typeName: d.vehicle_document_types?.name || d.file_name || "Documento",
                    fileUrl: d.file_url,
                    fileName: d.file_name,
                  }))}
              />

              {/* My Documents */}
              <DocumentsBlock
                variant="user"
                title="Mis documentos"
                manageHref="/dashboard/documentos"
                emptyText="Aún no hay documentos configurados."
                items={(docTypes as any[]).map<DocItem>((t) => {
                  const d = (userDocs as any[]).find((x) => x.document_type_id === t.id);
                  return {
                    id: t.id,
                    typeName: t.name,
                    fileUrl: d?.file_url ?? null,
                    fileName: d?.file_name ?? null,
                    status: d?.status ?? null,
                    notes: d?.notes ?? null,
                  };
                })}
              />

              {/* Location */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <MapPin className="w-5 h-5" /> Ubicación del Vehículo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-muted to-background flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-foreground mx-auto mb-3" />
                        <p className="text-lg font-semibold text-foreground">{car.locations?.name ?? "—"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* Credits card */}
              <Card className="border-border bg-gradient-to-br from-foreground/20 to-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <CreditCard className="w-5 h-5" /> Mis Créditos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-6xl font-bold text-foreground mb-2">{yearMetrics.remaining}</div>
                    <p className="text-muted-foreground">créditos disponibles</p>
                    <div className="mt-4 w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div className={`${barColor} h-3 transition-all duration-500`} style={{ width: `${Math.min(100, usedPct)}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">1 crédito = 1 día de uso</p>
                  </div>
                </CardContent>
              </Card>

              {/* This Year */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground text-lg">Este Año</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Créditos utilizados</span>
                    <span className="font-semibold text-foreground">{yearMetrics.used} / {yearMetrics.perYear}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Créditos restantes</span>
                    <span className="font-semibold text-foreground">{yearMetrics.remaining}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Días reservados</span>
                    <span className="font-semibold text-foreground">{yearMetrics.daysReserved}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Próxima reserva</span>
                    <span className="font-semibold text-foreground">
                      {yearMetrics.nextReservation
                        ? format(new Date(yearMetrics.nextReservation), "d MMM yyyy", { locale: es })
                        : "Sin reservas programadas"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Concierge */}
              <Card className="border-border bg-card hover:border-foreground/50 transition-colors group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-foreground/20 flex items-center justify-center group-hover:bg-foreground/30 transition-colors">
                      <Phone className="w-7 h-7 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">Servicio de Conserjería</h3>
                      <p className="text-sm text-muted-foreground">Asistencia premium 24/7</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-foreground hover:bg-foreground/90 text-background">
                    Contactar Conserjería
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <AlertDialog open={!!cancellingId} onOpenChange={(o) => !o && setCancellingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar la reserva?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Tus créditos serán restituidos automáticamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Volver</AlertDialogCancel>
            <AlertDialogAction onClick={() => cancellingId && cancelReservation.mutate(cancellingId)}>
              Confirmar cancelación
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
