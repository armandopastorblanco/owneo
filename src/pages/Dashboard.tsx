import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Car, FileText, MapPin, Phone, Calendar as CalendarIcon,
  CreditCard, Info, Loader2, Clock, CheckCircle2, XCircle, Ban, Gauge,
  User as UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, addDays, differenceInDays, startOfDay, subYears } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { resolveCarImage } from "@/lib/resolveCarImage";
import DocumentsBlock, { type DocItem } from "@/components/dashboard/DocumentsBlock";
import owneoLogo from "@/assets/owneo-logo.png";

// ============ Schemas ============
const conciergeSchema = z.object({
  name: z.string().trim().min(1, "Nombre requerido").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});
type ConciergeForm = z.infer<typeof conciergeSchema>;

const profileSchema = z
  .object({
    email: z.string().trim().email("Email inválido").max(255),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    address: z.string().trim().max(255).optional().or(z.literal("")),
    linkedin: z.string().trim().max(255).optional().or(z.literal("")),
    password: z.string().min(8, "Mínimo 8 caracteres").max(72).optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine((d) => !d.password || d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
type ProfileForm = z.infer<typeof profileSchema>;

const Dashboard = () => {
  const qc = useQueryClient();
  const [range, setRange] = useState<DateRange | undefined>();
  const [userId, setUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
        .select("name, surname, email, phone, address, linkedin")
        .eq("id", userId!)
        .maybeSingle();

      const { data: validated } = await supabase
        .from("validated_participations")
        .select("id, car_id, credits_remaining, credits_per_year, credits_used_this_year, credits_reset_date, cars:car_id(id, name, brand, model, year, image_url, min_reservation_days, max_reservation_days, reservation_advance_days, km_per_participation, location_id, locations:location_id(name))")
        .eq("user_id", userId!);

      const grouped = new Map<string, any>();
      for (const v of validated || []) {
        const cId = v.car_id;
        const ex = grouped.get(cId);
        if (!ex) {
          grouped.set(cId, {
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
      const firstName = profile?.name || (profile?.email ? profile.email.split("@")[0] : "Usuario");
      return { profile, fullName, firstName, participations };
    },
  });

  const primary = dashboard?.participations?.[selectedIdx] ?? dashboard?.participations?.[0];
  const carId = primary?.car?.id;

  // Reservations (depends on selected car)
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

  // User documents
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

  const creditsForDay = (date: Date): { credits: number; multiplier: number; isPeak: boolean } => {
    const d = startOfDay(date);
    const month = d.getMonth() + 1;
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
      if (m * cpd > multiplier * perDay) {
        multiplier = m;
        perDay = cpd;
        matched = true;
      }
    }
    return { credits: perDay * multiplier, multiplier, isPeak: matched && multiplier > 1 };
  };

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
    for (const r of reservations as any[]) {
      if (r.status === "cancelled") continue;
      const s = startOfDay(new Date(r.start_date));
      const e = startOfDay(new Date(r.end_date));
      if (t >= s && t <= e) return true;
    }
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

      let cur = range.from;
      while (cur <= range.to) {
        if (isDateUnavailable(cur)) throw new Error("Hay fechas no disponibles en el rango seleccionado");
        cur = addDays(cur, 1);
      }

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
      qc.invalidateQueries({ queryKey: ["user-reservations"] });
      qc.invalidateQueries({ queryKey: ["user-participations"] });
      qc.invalidateQueries({ queryKey: ["validated-participations"] });
      qc.invalidateQueries({ queryKey: ["fleet-participants"] });
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
      qc.invalidateQueries({ queryKey: ["user-reservations"] });
      qc.invalidateQueries({ queryKey: ["user-participations"] });
      qc.invalidateQueries({ queryKey: ["validated-participations"] });
      qc.invalidateQueries({ queryKey: ["fleet-participants"] });
      qc.invalidateQueries({ queryKey: ["admin-reservations"] });
    },
    onError: (e: any) => { toast.error(e.message); setCancellingId(null); },
  });

  // ================== METRICS ==================
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

  const kmUsedThisYear = useMemo(() => {
    return (reservations as any[])
      .filter((r) => r.status === "confirmed" || r.status === "pending")
      .reduce((acc, r) => acc + (Number(r.km_used) || 0), 0);
  }, [reservations]);
  const kmPerYear = primary?.car?.km_per_participation ?? 2000;
  const kmRemaining = Math.max(0, kmPerYear - kmUsedThisYear);

  const usedPct = yearMetrics.perYear > 0 ? Math.min(100, (yearMetrics.used / yearMetrics.perYear) * 100) : 0;

  // ================== FORMS ==================
  const conciergeForm = useForm<ConciergeForm>({
    resolver: zodResolver(conciergeSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  useEffect(() => {
    if (conciergeOpen && dashboard?.profile) {
      conciergeForm.reset({
        name: dashboard.fullName ?? "",
        email: dashboard.profile.email ?? "",
        phone: dashboard.profile.phone ?? "",
        message: "",
      });
    }
  }, [conciergeOpen, dashboard]); // eslint-disable-line react-hooks/exhaustive-deps

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { email: "", phone: "", address: "", linkedin: "", password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (profileOpen && dashboard?.profile) {
      profileForm.reset({
        email: dashboard.profile.email ?? "",
        phone: dashboard.profile.phone ?? "",
        address: dashboard.profile.address ?? "",
        linkedin: dashboard.profile.linkedin ?? "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [profileOpen, dashboard]); // eslint-disable-line react-hooks/exhaustive-deps

  const conciergeMutation = useMutation({
    mutationFn: async (values: ConciergeForm) => {
      const { error } = await supabase.from("consultation_requests").insert({
        car_id: carId ?? null,
        car_name: primary?.car?.name ?? null,
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        message: values.message || null,
        status: "pending",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Mensaje enviado. Te contactaremos en menos de 24h.");
      setConciergeOpen(false);
      conciergeForm.reset();
    },
    onError: (e: any) => toast.error(e.message ?? "Error al enviar el mensaje"),
  });

  const updateProfile = useMutation({
    mutationFn: async (values: ProfileForm) => {
      if (!userId) throw new Error("Sin sesión");
      const { error } = await supabase
        .from("profiles")
        .update({
          email: values.email,
          phone: values.phone || null,
          address: values.address || null,
          linkedin: values.linkedin || null,
        })
        .eq("id", userId);
      if (error) throw error;
      if (values.password && values.password.length > 0) {
        const { error: pwErr } = await supabase.auth.updateUser({ password: values.password });
        if (pwErr) throw pwErr;
      }
    },
    onSuccess: () => {
      toast.success("Perfil actualizado correctamente.");
      setProfileOpen(false);
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (e: any) => toast.error(e.message ?? "Error al actualizar el perfil"),
  });

  // ================== RENDER ==================
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-champagne" />
      </div>
    );
  }

  const displayName = dashboard?.fullName ?? "Usuario";
  const firstName = dashboard?.firstName ?? "Usuario";
  const initial = (firstName || "U").charAt(0).toUpperCase();
  const car = primary?.car;
  const carImage = resolveCarImage(car?.image_url, car?.brand);
  const participations = dashboard?.participations ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between gap-3">
          <Link
            to="/"
            aria-label="Volver al inicio"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-card transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link to="/" className="flex-1 flex justify-center">
            <img src={owneoLogo} alt="OWNEO" className="h-7 object-contain" />
          </Link>
          <button
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2 group"
            aria-label="Mi perfil"
          >
            <span className="hidden sm:inline text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {firstName}
            </span>
            <span className="w-10 h-10 rounded-full bg-champagne/20 border border-champagne/30 flex items-center justify-center text-champagne font-semibold">
              {initial}
            </span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl">
        {!car ? (
          <div className="mx-4 mt-10 rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
            No tienes participaciones validadas todavía.
          </div>
        ) : (
          <>
            {/* ============ VEHICLE SELECTOR ============ */}
            {participations.length > 1 && (
              <section className="px-4 pt-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Mis vehículos</p>
                <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 -mx-4 px-4 pb-2">
                  {participations.map((p: any, i: number) => {
                    const active = i === selectedIdx;
                    const img = resolveCarImage(p.car?.image_url, p.car?.brand);
                    return (
                      <button
                        key={p.car?.id ?? i}
                        onClick={() => setSelectedIdx(i)}
                        className={`snap-start flex-shrink-0 w-40 rounded-2xl overflow-hidden border-2 transition-all text-left ${
                          active
                            ? "border-champagne shadow-lg shadow-champagne/20"
                            : "border-border/30 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <div className="aspect-[4/3] bg-muted overflow-hidden">
                          <img src={img} alt={p.car?.name} loading="lazy" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-card p-2">
                          <p className="text-xs font-semibold truncate text-foreground">{p.car?.name}</p>
                          <p className={`text-[11px] ${active ? "text-champagne" : "text-muted-foreground"}`}>
                            {p.credits_remaining} créditos
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ============ HERO ============ */}
            <section className="relative mx-4 mt-4 rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9]">
              <img src={carImage} alt={car.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-champagne/80 mb-1">{car.brand}</p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">{car.name}</h1>
                    {car.locations?.name && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        {car.locations.name}
                      </p>
                    )}
                  </div>
                  {primary.num > 1 && (
                    <span className="shrink-0 rounded-full px-3 py-1 text-xs bg-champagne/20 border border-champagne/30 text-champagne">
                      {primary.num} participaciones
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* ============ 4 METRICS ============ */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-4 mt-4">
              {[
                {
                  label: "Créditos disponibles",
                  value: yearMetrics.remaining,
                  icon: <CreditCard className="w-4 h-4 text-champagne" />,
                  cls: "bg-champagne/10 border-champagne/30",
                  valueCls: "text-champagne",
                },
                {
                  label: "Km restantes",
                  value: `${kmRemaining.toLocaleString("es-ES")} km`,
                  icon: <Gauge className="w-4 h-4 text-muted-foreground" />,
                  cls: "bg-card border-border/50",
                  valueCls: "text-foreground",
                },
                {
                  label: "Días usados este año",
                  value: yearMetrics.used,
                  icon: <CalendarIcon className="w-4 h-4 text-muted-foreground" />,
                  cls: "bg-card border-border/50",
                  valueCls: "text-foreground",
                },
                {
                  label: "Próxima reserva",
                  value: yearMetrics.nextReservation
                    ? format(new Date(yearMetrics.nextReservation), "d MMM", { locale: es })
                    : "Sin reservas",
                  icon: <Clock className="w-4 h-4 text-muted-foreground" />,
                  cls: "bg-card border-border/50",
                  valueCls: "text-foreground",
                },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border p-3 sm:p-4 ${m.cls}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{m.label}</span>
                    {m.icon}
                  </div>
                  <p className={`text-xl sm:text-2xl font-bold truncate ${m.valueCls}`}>{m.value}</p>
                </motion.div>
              ))}
            </section>

            {/* ============ CREDITS PROGRESS ============ */}
            <section className="mx-4 mt-4 p-4 bg-card rounded-2xl border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Créditos utilizados este año</span>
                <span className="text-sm font-semibold text-foreground">
                  {yearMetrics.used} / {yearMetrics.perYear}
                </span>
              </div>
              <div className="bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-2 bg-champagne rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${usedPct}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">
                  {primary.credits_reset_date
                    ? `Renovación: ${format(new Date(primary.credits_reset_date), "d MMM yyyy", { locale: es })}`
                    : "Renovación anual"}
                </span>
                <span className="text-xs text-champagne font-medium">
                  {yearMetrics.remaining} restantes
                </span>
              </div>
            </section>

            {/* ============ CALENDAR ============ */}
            <section className="mx-4 mt-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <CalendarIcon className="w-5 h-5 text-champagne" />
                Reservar días de uso
              </h2>
              <div className="bg-card rounded-2xl border border-border/50 p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs"><Info className="w-3 h-3 mr-1" />Mín. {minDays}d</Badge>
                  <Badge variant="outline" className="text-xs"><Info className="w-3 h-3 mr-1" />Máx. {maxDays}d</Badge>
                  <Badge variant="outline" className="text-xs"><Info className="w-3 h-3 mr-1" />Antelación {advanceDays}d</Badge>
                </div>
                <div className="flex justify-center">
                  <Calendar
                    mode="range"
                    selected={range}
                    onSelect={handleSelect}
                    locale={es}
                    disabled={(date) => date < addDays(startOfDay(new Date()), advanceDays) || isDateUnavailable(date)}
                    modifiers={{ peak: (date) => creditsForDay(date).isPeak }}
                    modifiersClassNames={{ peak: "ring-1 ring-champagne/60 text-champagne" }}
                    className="rounded-md border border-border pointer-events-auto"
                  />
                </div>
                {range?.from && range?.to && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="rounded-xl bg-muted/50 p-3 text-center">
                      <p className="text-xs text-muted-foreground">Días</p>
                      <p className="text-lg font-bold text-foreground">{totalDays}</p>
                    </div>
                    <div className="rounded-xl bg-champagne/10 border border-champagne/20 p-3 text-center">
                      <p className="text-xs text-muted-foreground">
                        Créditos{rangeCreditInfo.maxMult > 1 ? ` (×${rangeCreditInfo.maxMult})` : ""}
                      </p>
                      <p className="text-lg font-bold text-champagne">{totalCredits}</p>
                    </div>
                  </div>
                )}
                <Button
                  className="w-full mt-4 bg-champagne hover:bg-champagne/90 text-champagne-foreground"
                  onClick={() => createReservation.mutate()}
                  disabled={createReservation.isPending || !range?.from || !range?.to}
                >
                  {createReservation.isPending ? "Enviando..." : "Solicitar Reserva"}
                </Button>
              </div>
            </section>

            {/* ============ RESERVATIONS HISTORY ============ */}
            <section className="mx-4 mt-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <Clock className="w-5 h-5 text-champagne" />
                Mis reservas
              </h2>
              {reservations.length === 0 ? (
                <div className="rounded-2xl border border-border/50 bg-card p-8 text-center">
                  <CalendarIcon className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Aún no tienes reservas.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {(reservations as any[]).map((r, i) => {
                    const days = differenceInDays(new Date(r.end_date), new Date(r.start_date)) + 1;
                    const canCancelConfirmed = r.status === "confirmed" && new Date(r.start_date) > addDays(new Date(), 2);
                    const canCancelPending = r.status === "pending";
                    return (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-card rounded-2xl border border-border/50 p-4"
                      >
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              {r.status === "pending" && <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30"><Clock className="w-3 h-3 mr-1" />En revisión</Badge>}
                              {r.status === "confirmed" && <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30"><CheckCircle2 className="w-3 h-3 mr-1" />Confirmada</Badge>}
                              {r.status === "cancelled" && r.rejected_at && <Badge className="bg-red-500/20 text-red-300 border-red-500/30"><XCircle className="w-3 h-3 mr-1" />Rechazada</Badge>}
                              {r.status === "cancelled" && !r.rejected_at && <Badge className="bg-muted text-muted-foreground border-border"><Ban className="w-3 h-3 mr-1" />Cancelada</Badge>}
                              {r.status === "completed" && <Badge variant="outline">Completada</Badge>}
                            </div>
                            <p className="text-sm font-semibold text-foreground">
                              {format(new Date(r.start_date), "d MMM", { locale: es })} → {format(new Date(r.end_date), "d MMM yyyy", { locale: es })}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {days} día{days > 1 ? "s" : ""} · {r.credits_used ?? 0} créditos
                            </p>
                            {r.rejection_reason && (
                              <p className="text-xs italic text-muted-foreground mt-1">Motivo: {r.rejection_reason}</p>
                            )}
                          </div>
                          {(canCancelConfirmed || canCancelPending) && (
                            <Button size="sm" variant="outline" className="text-xs" onClick={() => setCancellingId(r.id)}>
                              Cancelar
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* ============ DOCUMENTS ============ */}
            <section className="mx-4 mt-6 space-y-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <FileText className="w-5 h-5 text-champagne" />
                Documentos
              </h2>
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
            </section>

            {/* ============ LOCATION ============ */}
            <section className="mx-4 mt-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <MapPin className="w-5 h-5 text-champagne" />
                Localización
              </h2>
              <div className="bg-card rounded-2xl border border-border/50 p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-champagne/10 border border-champagne/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-champagne" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">{car.locations?.name ?? "—"}</p>
                    <p className="text-xs text-muted-foreground">España</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/${encodeURIComponent((car.locations?.name ?? "") + ", España")}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  Abrir en Maps
                </Button>
              </div>
            </section>

            {/* ============ CONCIERGE ============ */}
            <section className="mx-4 mt-4">
              <button
                onClick={() => setConciergeOpen(true)}
                className="w-full bg-card border border-border/50 rounded-2xl p-5 flex items-center gap-4 hover:border-champagne/30 hover:bg-champagne/5 transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-foreground/10 group-hover:bg-champagne/20 flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="w-5 h-5 text-foreground group-hover:text-champagne transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">Servicio de Conserjería</p>
                  <p className="text-xs text-muted-foreground">Asistencia premium · Respuesta en 24h</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-champagne transition-colors" />
              </button>
            </section>

            {/* ============ MIS COORDENADAS ============ */}
            <section className="mx-4 mt-4 mb-8">
              <button
                onClick={() => setProfileOpen(true)}
                className="w-full bg-card border border-border/50 rounded-2xl p-5 flex items-center gap-4 hover:border-champagne/30 hover:bg-champagne/5 transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-foreground/10 group-hover:bg-champagne/20 flex items-center justify-center shrink-0 transition-colors">
                  <UserIcon className="w-5 h-5 text-foreground group-hover:text-champagne transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">Mis datos personales</p>
                  <p className="text-xs text-muted-foreground">Email · Teléfono · Dirección · Contraseña</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-champagne transition-colors" />
              </button>
            </section>
          </>
        )}
      </main>

      {/* ============ CANCEL DIALOG ============ */}
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

      {/* ============ CONCIERGE DIALOG ============ */}
      <Dialog open={conciergeOpen} onOpenChange={setConciergeOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contactar con el equipo OWNEO</DialogTitle>
            <DialogDescription>Te responderemos en menos de 24 horas.</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={conciergeForm.handleSubmit((v) => conciergeMutation.mutate(v))}
            className="space-y-3"
          >
            <div>
              <Label htmlFor="cc-name">Nombre</Label>
              <Input id="cc-name" {...conciergeForm.register("name")} />
              {conciergeForm.formState.errors.name && (
                <p className="text-xs text-red-400 mt-1">{conciergeForm.formState.errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="cc-email">Email</Label>
              <Input id="cc-email" type="email" {...conciergeForm.register("email")} />
              {conciergeForm.formState.errors.email && (
                <p className="text-xs text-red-400 mt-1">{conciergeForm.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="cc-phone">Teléfono</Label>
              <Input id="cc-phone" type="tel" {...conciergeForm.register("phone")} />
            </div>
            <div>
              <Label htmlFor="cc-message">Mensaje</Label>
              <Textarea id="cc-message" rows={4} {...conciergeForm.register("message")} />
            </div>
            <Button
              type="submit"
              className="w-full bg-champagne hover:bg-champagne/90 text-champagne-foreground"
              disabled={conciergeMutation.isPending}
            >
              {conciergeMutation.isPending ? "Enviando..." : "Enviar mensaje"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* ============ PROFILE DIALOG ============ */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mis coordenadas</DialogTitle>
            <DialogDescription>{displayName}</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={profileForm.handleSubmit((v) => updateProfile.mutate(v))}
            className="space-y-3"
          >
            <div>
              <Label htmlFor="p-email">Email</Label>
              <Input id="p-email" type="email" {...profileForm.register("email")} />
              {profileForm.formState.errors.email && (
                <p className="text-xs text-red-400 mt-1">{profileForm.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="p-phone">Teléfono</Label>
              <Input id="p-phone" type="tel" {...profileForm.register("phone")} />
            </div>
            <div>
              <Label htmlFor="p-address">Dirección</Label>
              <Input id="p-address" type="text" {...profileForm.register("address")} />
            </div>
            <div>
              <Label htmlFor="p-linkedin">LinkedIn</Label>
              <Input id="p-linkedin" type="text" {...profileForm.register("linkedin")} />
            </div>
            <div className="border-t border-border/50 pt-3">
              <p className="text-xs text-muted-foreground mb-2">Cambiar contraseña (opcional)</p>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="p-pw">Nueva contraseña</Label>
                  <Input id="p-pw" type="password" autoComplete="new-password" {...profileForm.register("password")} />
                  {profileForm.formState.errors.password && (
                    <p className="text-xs text-red-400 mt-1">{profileForm.formState.errors.password.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="p-pw2">Confirmar contraseña</Label>
                  <Input id="p-pw2" type="password" autoComplete="new-password" {...profileForm.register("confirmPassword")} />
                  {profileForm.formState.errors.confirmPassword && (
                    <p className="text-xs text-red-400 mt-1">{profileForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-champagne hover:bg-champagne/90 text-champagne-foreground"
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
