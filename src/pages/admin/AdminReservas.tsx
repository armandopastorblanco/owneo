import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { restoreCredits } from "@/lib/restoreCredits";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay, isWithinInterval, parseISO, differenceInCalendarDays } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus, Settings, CalendarDays, Users, AlertTriangle, Edit, Trash2, ArrowUpDown, CalendarCheck, Star, Ban, Wrench, ClipboardCheck, Hammer, AlertCircle, Eye } from "lucide-react";

const MONTHS_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const WEEKDAYS = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

const BLOCK_TYPES = [
  { value: "maintenance", label: "Mantenimiento", icon: Wrench, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { value: "itv", label: "ITV", icon: ClipboardCheck, color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  { value: "repair", label: "Reparación", icon: Hammer, color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  { value: "other", label: "Otro", icon: AlertCircle, color: "bg-muted text-muted-foreground" },
];
const blockTypeMeta = (t?: string) => BLOCK_TYPES.find((b) => b.value === t) || BLOCK_TYPES[3];
const initials = (n?: string, s?: string) => `${(n?.[0] || "").toUpperCase()}${(s?.[0] || "").toUpperCase()}` || "?";

const AdminReservas = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [carFilter, setCarFilter] = useState("all");
  const [calCityFilter, setCalCityFilter] = useState("all");
  const [showRuleForm, setShowRuleForm] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [deletingRuleId, setDeletingRuleId] = useState<string | null>(null);
  const [adjustModal, setAdjustModal] = useState<any>(null);
  const [adjustCredits, setAdjustCredits] = useState("");
  const [adjustReason, setAdjustReason] = useState("");
  const [rejectModal, setRejectModal] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState("");

  // Confirmed reservations block
  const [confirmedTab, setConfirmedTab] = useState<"current" | "future" | "past">("current");
  const [editResModal, setEditResModal] = useState<any>(null);
  const [editResStart, setEditResStart] = useState("");
  const [editResEnd, setEditResEnd] = useState("");
  const [cancelResModal, setCancelResModal] = useState<any>(null);

  // Vehicle special rule modal
  const [vehicleRuleModal, setVehicleRuleModal] = useState<{ open: boolean; editingId: string | null }>({ open: false, editingId: null });
  const [vrName, setVrName] = useState("");
  const [vrDesc, setVrDesc] = useState("");
  const [vrType, setVrType] = useState<"months" | "dates">("months");
  const [vrMonths, setVrMonths] = useState<number[]>([]);
  const [vrStart, setVrStart] = useState("");
  const [vrEnd, setVrEnd] = useState("");
  const [vrMultiplier, setVrMultiplier] = useState("1.0");
  const [vrCreditsPerDay, setVrCreditsPerDay] = useState("1.0");
  const [deletingVehicleRuleId, setDeletingVehicleRuleId] = useState<string | null>(null);

  // Calendar block modal
  const [blockModal, setBlockModal] = useState<{ open: boolean; editing: any | null }>({ open: false, editing: null });
  const [bkStart, setBkStart] = useState("");
  const [bkEnd, setBkEnd] = useState("");
  const [bkType, setBkType] = useState("maintenance");
  const [bkReason, setBkReason] = useState("");
  const [deletingBlockId, setDeletingBlockId] = useState<string | null>(null);


  // New rule form state
  const [ruleName, setRuleName] = useState("");
  const [ruleDesc, setRuleDesc] = useState("");
  const [ruleType, setRuleType] = useState<"months" | "dates">("months");
  const [ruleMonths, setRuleMonths] = useState<number[]>([]);
  const [ruleStartDate, setRuleStartDate] = useState("");
  const [ruleEndDate, setRuleEndDate] = useState("");
  const [ruleMultiplier, setRuleMultiplier] = useState("1.0");
  const [ruleCreditsPerDay, setRuleCreditsPerDay] = useState("1.0");
  const [ruleAppliesToAll, setRuleAppliesToAll] = useState(true);
  const [ruleActive, setRuleActive] = useState(true);

  const resetRuleForm = () => {
    setEditingRuleId(null);
    setRuleName(""); setRuleDesc("");
    setRuleType("months");
    setRuleMonths([]); setRuleStartDate(""); setRuleEndDate("");
    setRuleMultiplier("1.0"); setRuleCreditsPerDay("1.0");
    setRuleAppliesToAll(true); setRuleActive(true);
  };

  const openEditRule = (rule: any) => {
    setEditingRuleId(rule.id);
    setRuleName(rule.name || "");
    setRuleDesc(rule.description || "");
    setRuleType(rule.months ? "months" : "dates");
    setRuleMonths(rule.months || []);
    setRuleStartDate(rule.start_date || "");
    setRuleEndDate(rule.end_date || "");
    setRuleMultiplier(String(rule.multiplier ?? "1.0"));
    setRuleCreditsPerDay(String(rule.credits_per_day ?? "1.0"));
    setRuleAppliesToAll(!!rule.applies_to_all);
    setRuleActive(!!rule.is_active);
    setShowRuleForm(true);
  };

  // Data queries
  const { data: creditRules = [], isLoading: loadingRules } = useQuery({
    queryKey: ["credit-rules"],
    queryFn: async () => {
      const { data, error } = await supabase.from("credit_rules").select("*").order("created_at");
      if (error) throw error;
      return data || [];
    },
  });

  const { data: reservations = [] } = useQuery({
    queryKey: ["admin-reservations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reservations")
        .select("*, profiles:user_id(name,surname), cars:car_id(name,brand)")
        .order("start_date");
      if (error) throw error;
      return data || [];
    },
  });

  const { data: cars = [] } = useQuery({
    queryKey: ["admin-cars-list"],
    queryFn: async () => {
      const { data } = await supabase.from("cars").select("id,name,brand,location_id,is_active").eq("is_active", true);
      return data || [];
    },
  });

  const { data: locations = [] } = useQuery({
    queryKey: ["admin-locations-list"],
    queryFn: async () => {
      const { data } = await supabase.from("locations").select("id,name").order("name");
      return data || [];
    },
  });

  const [partsCityFilter, setPartsCityFilter] = useState("all");
  const [partsCarFilter, setPartsCarFilter] = useState("all");
  const [partsSortKey, setPartsSortKey] = useState<"participant" | "city" | "car" | "count" | "total" | "used" | "remaining" | "reset">("participant");
  const [partsSortDir, setPartsSortDir] = useState<"asc" | "desc">("asc");
  const togglePartsSort = (k: typeof partsSortKey) => {
    if (partsSortKey === k) setPartsSortDir(partsSortDir === "asc" ? "desc" : "asc");
    else { setPartsSortKey(k); setPartsSortDir("asc"); }
  };

  const { data: participations = [], isLoading: loadingParts } = useQuery({
    queryKey: ["admin-validated-parts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("validated_participations")
        .select("*, profiles:user_id(name,surname,email), cars:car_id(name,location_id)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Calendar blocks for selected vehicle
  const { data: calendarBlocks = [] } = useQuery({
    queryKey: ["calendar-blocks", carFilter],
    enabled: carFilter !== "all",
    queryFn: async () => {
      const { data, error } = await supabase
        .from("calendar_blocks")
        .select("*")
        .eq("car_id", carFilter)
        .gte("end_date", new Date().toISOString().slice(0, 10))
        .order("start_date");
      if (error) throw error;
      return data || [];
    },
  });

  // Confirmed reservations filtered by city + car (same as calendar)
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const confirmedReservations = useMemo(() => {
    return (reservations as any[]).filter((r) => {
      if (r.status !== "confirmed") return false;
      if (carFilter !== "all" && r.car_id !== carFilter) return false;
      if (calCityFilter !== "all") {
        const car = (cars as any[]).find((c) => c.id === r.car_id);
        if (!car || car.location_id !== calCityFilter) return false;
      }
      return true;
    });
  }, [reservations, cars, carFilter, calCityFilter]);

  const confirmedGroups = useMemo(() => ({
    past: confirmedReservations.filter((r: any) => r.end_date < today),
    current: confirmedReservations.filter((r: any) => r.start_date <= today && r.end_date >= today),
    future: confirmedReservations.filter((r: any) => r.start_date > today),
  }), [confirmedReservations, today]);

  // ===== Mutations: edit/cancel confirmed reservation =====
  const editReservationMutation = useMutation({
    mutationFn: async () => {
      if (!editResModal) throw new Error("Sin reserva");
      if (!editResStart || !editResEnd) throw new Error("Fechas obligatorias");
      if (editResEnd < editResStart) throw new Error("La fecha fin debe ser >= fecha inicio");
      const oldCredits = Number(editResModal.credits_used || 0);
      const days = differenceInCalendarDays(parseISO(editResEnd), parseISO(editResStart)) + 1;
      const newCredits = days; // simple recompute (1 credit per day)
      const { error } = await supabase
        .from("reservations")
        .update({ start_date: editResStart, end_date: editResEnd, credits_used: newCredits })
        .eq("id", editResModal.id);
      if (error) throw error;
      // adjust validated_participations
      const { data: vps } = await supabase
        .from("validated_participations")
        .select("id, credits_remaining, credits_used_this_year")
        .eq("user_id", editResModal.user_id)
        .eq("car_id", editResModal.car_id)
        .limit(1);
      if (vps && vps.length > 0) {
        const vp = vps[0];
        await supabase.from("validated_participations").update({
          credits_remaining: Number(vp.credits_remaining || 0) + oldCredits - newCredits,
          credits_used_this_year: Math.max(0, Number(vp.credits_used_this_year || 0) - oldCredits + newCredits),
        }).eq("id", vp.id);
      }
      await supabase.rpc("insert_audit_log", {
        _action: "edit_reservation",
        _target_table: "reservations",
        _target_id: editResModal.id,
        _details: { old_start: editResModal.start_date, old_end: editResModal.end_date, new_start: editResStart, new_end: editResEnd, old_credits: oldCredits, new_credits: newCredits },
      });
    },
    onSuccess: () => {
      toast.success("Reserva actualizada");
      setEditResModal(null);
      queryClient.invalidateQueries({ queryKey: ["admin-reservations"] });
      queryClient.invalidateQueries({ queryKey: ["admin-validated-parts"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const cancelConfirmedMutation = useMutation({
    mutationFn: async () => {
      if (!cancelResModal) throw new Error("Sin reserva");
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("reservations").update({
        status: "cancelled",
        cancelled_at: new Date().toISOString(),
        cancelled_by: user?.id,
      }).eq("id", cancelResModal.id);
      if (error) throw error;
      const credits = Number(cancelResModal.credits_used || 0);
      const { data: vps } = await supabase
        .from("validated_participations")
        .select("id, credits_remaining, credits_used_this_year")
        .eq("user_id", cancelResModal.user_id)
        .eq("car_id", cancelResModal.car_id)
        .limit(1);
      if (vps && vps.length > 0) {
        const vp = vps[0];
        await supabase.from("validated_participations").update({
          credits_remaining: Number(vp.credits_remaining || 0) + credits,
          credits_used_this_year: Math.max(0, Number(vp.credits_used_this_year || 0) - credits),
        }).eq("id", vp.id);
      }
      await supabase.rpc("insert_audit_log", {
        _action: "cancel_confirmed_reservation",
        _target_table: "reservations",
        _target_id: cancelResModal.id,
        _details: { credits_restored: credits },
      });
    },
    onSuccess: () => {
      toast.success("Reserva cancelada y créditos restituidos");
      setCancelResModal(null);
      queryClient.invalidateQueries({ queryKey: ["admin-reservations"] });
      queryClient.invalidateQueries({ queryKey: ["admin-validated-parts"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  // ===== Vehicle-specific credit_rules =====
  const vehicleRules = useMemo(() => {
    if (carFilter === "all") return [];
    return (creditRules as any[]).filter((r) => r.is_active && !r.applies_to_all && Array.isArray(r.car_ids) && r.car_ids.includes(carFilter));
  }, [creditRules, carFilter]);

  const resetVehicleRuleForm = () => {
    setVrName(""); setVrDesc(""); setVrType("months"); setVrMonths([]);
    setVrStart(""); setVrEnd(""); setVrMultiplier("1.0"); setVrCreditsPerDay("1.0");
  };

  const openEditVehicleRule = (rule: any) => {
    setVrName(rule.name || "");
    setVrDesc(rule.description || "");
    setVrType(rule.months ? "months" : "dates");
    setVrMonths(rule.months || []);
    setVrStart(rule.start_date || "");
    setVrEnd(rule.end_date || "");
    setVrMultiplier(String(rule.multiplier ?? "1.0"));
    setVrCreditsPerDay(String(rule.credits_per_day ?? "1.0"));
    setVehicleRuleModal({ open: true, editingId: rule.id });
  };

  const saveVehicleRuleMutation = useMutation({
    mutationFn: async () => {
      if (!vrName.trim()) throw new Error("Nombre obligatorio");
      const payload: any = {
        name: vrName,
        description: vrDesc || null,
        is_recurring: vrType === "months",
        months: vrType === "months" ? vrMonths : null,
        start_date: vrType === "dates" ? vrStart : null,
        end_date: vrType === "dates" ? vrEnd : null,
        multiplier: parseFloat(vrMultiplier),
        credits_per_day: parseFloat(vrCreditsPerDay),
        applies_to_all: false,
        car_ids: [carFilter],
        is_active: true,
      };
      if (vehicleRuleModal.editingId) {
        const { error } = await supabase.from("credit_rules").update(payload).eq("id", vehicleRuleModal.editingId);
        if (error) throw error;
        await supabase.rpc("insert_audit_log", { _action: "edit_vehicle_credit_rule", _target_table: "credit_rules", _target_id: vehicleRuleModal.editingId });
      } else {
        const { data, error } = await supabase.from("credit_rules").insert(payload).select().single();
        if (error) throw error;
        await supabase.rpc("insert_audit_log", { _action: "create_vehicle_credit_rule", _target_table: "credit_rules", _target_id: data?.id, _details: { car_id: carFilter } });
      }
    },
    onSuccess: () => {
      toast.success(vehicleRuleModal.editingId ? "Regla actualizada" : "Fecha especial añadida");
      queryClient.invalidateQueries({ queryKey: ["credit-rules"] });
      setVehicleRuleModal({ open: false, editingId: null });
      resetVehicleRuleForm();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteVehicleRuleMutation = useMutation({
    mutationFn: async (id: string) => {
      const rule = (creditRules as any[]).find((r) => r.id === id);
      if (!rule) throw new Error("Regla no encontrada");
      const otherCars = (rule.car_ids || []).filter((c: string) => c !== carFilter);
      if (otherCars.length === 0) {
        const { error } = await supabase.from("credit_rules").delete().eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("credit_rules").update({ car_ids: otherCars }).eq("id", id);
        if (error) throw error;
      }
      await supabase.rpc("insert_audit_log", { _action: "remove_vehicle_credit_rule", _target_table: "credit_rules", _target_id: id, _details: { car_id: carFilter } });
    },
    onSuccess: () => {
      toast.success("Regla eliminada");
      queryClient.invalidateQueries({ queryKey: ["credit-rules"] });
      setDeletingVehicleRuleId(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  // ===== Calendar block mutations =====
  const openNewBlock = () => {
    setBkStart(""); setBkEnd(""); setBkType("maintenance"); setBkReason("");
    setBlockModal({ open: true, editing: null });
  };
  const openEditBlock = (b: any) => {
    setBkStart(b.start_date); setBkEnd(b.end_date); setBkType(b.block_type || "maintenance"); setBkReason(b.reason || "");
    setBlockModal({ open: true, editing: b });
  };

  const saveBlockMutation = useMutation({
    mutationFn: async () => {
      if (!bkStart || !bkEnd) throw new Error("Fechas obligatorias");
      if (bkEnd < bkStart) throw new Error("La fecha fin debe ser >= fecha inicio");
      if (bkReason.trim().length < 5) throw new Error("El motivo debe tener al menos 5 caracteres");
      const { data: { user } } = await supabase.auth.getUser();
      if (blockModal.editing) {
        const { error } = await supabase.from("calendar_blocks").update({
          start_date: bkStart, end_date: bkEnd, block_type: bkType, reason: bkReason,
        }).eq("id", blockModal.editing.id);
        if (error) throw error;
        await supabase.rpc("insert_audit_log", { _action: "edit_calendar_block", _target_table: "calendar_blocks", _target_id: blockModal.editing.id });
      } else {
        const { data, error } = await supabase.from("calendar_blocks").insert({
          car_id: carFilter, start_date: bkStart, end_date: bkEnd, block_type: bkType, reason: bkReason, created_by: user?.id,
        }).select().single();
        if (error) throw error;
        await supabase.rpc("insert_audit_log", { _action: "create_calendar_block", _target_table: "calendar_blocks", _target_id: data?.id, _details: { car_id: carFilter } });
      }
    },
    onSuccess: () => {
      toast.success(blockModal.editing ? "Bloqueo actualizado" : "Bloqueo creado");
      queryClient.invalidateQueries({ queryKey: ["calendar-blocks", carFilter] });
      setBlockModal({ open: false, editing: null });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteBlockMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("calendar_blocks").delete().eq("id", id);
      if (error) throw error;
      await supabase.rpc("insert_audit_log", { _action: "delete_calendar_block", _target_table: "calendar_blocks", _target_id: id });
    },
    onSuccess: () => {
      toast.success("Bloqueo eliminado");
      queryClient.invalidateQueries({ queryKey: ["calendar-blocks", carFilter] });
      setDeletingBlockId(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const isBlockedDay = (day: Date) => {
    if (carFilter === "all") return false;
    return (calendarBlocks as any[]).some((b) =>
      isWithinInterval(day, { start: parseISO(b.start_date), end: parseISO(b.end_date) }) ||
      isSameDay(day, parseISO(b.start_date)) || isSameDay(day, parseISO(b.end_date))
    );
  };


  const conflicts = (() => {
    const sorted = [...reservations].filter((r: any) => r.status === "confirmed").sort((a: any, b: any) => a.start_date.localeCompare(b.start_date));
    const result: any[] = [];
    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        if ((sorted[i] as any).car_id === (sorted[j] as any).car_id) {
          if ((sorted[j] as any).start_date <= (sorted[i] as any).end_date) {
            result.push({ a: sorted[i], b: sorted[j] });
          }
        }
      }
    }
    return result;
  })();

  // Create / update rule mutation
  const createRuleMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name: ruleName,
        description: ruleDesc || null,
        is_recurring: ruleType === "months",
        months: ruleType === "months" ? ruleMonths : null,
        start_date: ruleType === "dates" ? ruleStartDate : null,
        end_date: ruleType === "dates" ? ruleEndDate : null,
        multiplier: parseFloat(ruleMultiplier),
        credits_per_day: parseFloat(ruleCreditsPerDay),
        applies_to_all: ruleAppliesToAll,
        is_active: ruleActive,
      };
      if (editingRuleId) {
        const { error } = await supabase.from("credit_rules").update(payload).eq("id", editingRuleId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("credit_rules").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credit-rules"] });
      toast.success(editingRuleId ? "Regla actualizada" : "Regla creada");
      setShowRuleForm(false);
      resetRuleForm();
    },
    onError: () => toast.error("Error al guardar la regla"),
  });

  const deleteRuleMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("credit_rules").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credit-rules"] });
      toast.success("Regla eliminada");
      setDeletingRuleId(null);
    },
    onError: () => toast.error("Error al eliminar la regla"),
  });

  // Adjust credits mutation
  const adjustMutation = useMutation({
    mutationFn: async () => {
      const newTotal = parseFloat(adjustCredits);
      const ids: string[] = adjustModal._groupIds || [adjustModal.id];
      // Distribute: full amount on first row, 0 on the rest
      for (let i = 0; i < ids.length; i++) {
        const value = i === 0 ? newTotal : 0;
        const { error } = await supabase
          .from("validated_participations")
          .update({ credits_remaining: value })
          .eq("id", ids[i]);
        if (error) throw error;
      }
      await supabase.rpc("insert_audit_log", {
        _action: "creditos_ajustados",
        _target_table: "validated_participations",
        _target_id: ids.join(","),
        _details: { new_credits: newTotal, reason: adjustReason, group_size: ids.length },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-validated-parts"] });
      toast.success("Créditos ajustados");
      setAdjustModal(null);
    },
  });

  const acceptReservation = useMutation({
    mutationFn: async (reservationId: string) => {
      const { error } = await supabase.from("reservations").update({ status: "confirmed" }).eq("id", reservationId);
      if (error) throw error;
      await supabase.rpc("insert_audit_log", { _action: "accept_reservation", _target_table: "reservations", _target_id: reservationId });
    },
    onSuccess: () => {
      toast.success("Reserva confirmada");
      queryClient.invalidateQueries({ queryKey: ["admin-reservations"] });
      queryClient.invalidateQueries({ queryKey: ["admin-pending-reservations-count"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const rejectReservation = useMutation({
    mutationFn: async () => {
      if (!rejectModal) throw new Error("Sin reserva");
      if (rejectReason.trim().length < 10) throw new Error("El motivo debe tener al menos 10 caracteres");
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("reservations").update({
        status: "cancelled",
        rejection_reason: rejectReason,
        rejected_at: new Date().toISOString(),
        rejected_by: user?.id,
      }).eq("id", rejectModal.id);
      if (error) throw error;
      // Restore credits via shared utility
      await restoreCredits(rejectModal.user_id, rejectModal.car_id, Number(rejectModal.credits_used || 0));
      await supabase.rpc("insert_audit_log", {
        _action: "reject_reservation",
        _target_table: "reservations",
        _target_id: rejectModal.id,
        _details: { reason: rejectReason },
      });
    },
    onSuccess: () => {
      toast.success("Reserva rechazada y créditos restituidos");
      setRejectModal(null);
      setRejectReason("");
      queryClient.invalidateQueries({ queryKey: ["admin-reservations"] });
      queryClient.invalidateQueries({ queryKey: ["admin-validated-parts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-pending-reservations-count"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  // Calendar rendering
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = (getDay(monthStart) + 6) % 7; // Monday = 0

  const filteredReservations = reservations.filter((r: any) => {
    if (carFilter !== "all" && r.car_id !== carFilter) return false;
    if (calCityFilter !== "all") {
      const car = cars.find((c: any) => c.id === r.car_id);
      if (!car || car.location_id !== calCityFilter) return false;
    }
    return true;
  });

  const getReservationsForDay = (day: Date) =>
    filteredReservations.filter((r: any) => {
      const start = parseISO(r.start_date);
      const end = parseISO(r.end_date);
      return isWithinInterval(day, { start, end }) || isSameDay(day, start) || isSameDay(day, end);
    });

  const isPeakDay = (day: Date) =>
    creditRules.some((rule: any) => {
      if (!rule.is_active) return false;
      if (rule.months && rule.months.includes(day.getMonth() + 1)) return true;
      if (rule.start_date && rule.end_date) {
        return isWithinInterval(day, { start: parseISO(rule.start_date), end: parseISO(rule.end_date) });
      }
      return false;
    }) && creditRules.some((r: any) => r.is_active && r.multiplier > 1);

  const multiplierBadge = (m: number) => {
    if (m >= 2) return <Badge variant="destructive">×{m}</Badge>;
    if (m > 1) return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">×{m}</Badge>;
    return <Badge variant="secondary">×{m}</Badge>;
  };

  const pendingReservations = (reservations as any[]).filter((r) => r.status === "pending");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Reservas y Créditos</h1>

      {/* PENDING RESERVATIONS */}
      {pendingReservations.length > 0 && (
        <Card className="border-amber-500/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              Solicitudes pendientes ({pendingReservations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Vehículo</TableHead>
                  <TableHead>Fechas</TableHead>
                  <TableHead>Créditos</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingReservations.map((r: any) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-foreground">{r.profiles?.name} {r.profiles?.surname}</TableCell>
                    <TableCell className="text-foreground">{r.cars?.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{r.start_date} → {r.end_date}</TableCell>
                    <TableCell><Badge variant="secondary">{r.credits_used}</Badge></TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => acceptReservation.mutate(r.id)} disabled={acceptReservation.isPending}>Aceptar</Button>
                      <Button size="sm" variant="destructive" onClick={() => { setRejectModal(r); setRejectReason(""); }}>Rechazar</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Reject Modal */}
      <Dialog open={!!rejectModal} onOpenChange={(o) => { if (!o) { setRejectModal(null); setRejectReason(""); } }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Rechazar reserva</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Indica el motivo del rechazo. Los créditos serán restituidos al usuario.</p>
            <Textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} rows={4} placeholder="Motivo del rechazo (mínimo 10 caracteres)" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setRejectModal(null); setRejectReason(""); }}>Cancelar</Button>
            <Button variant="destructive" onClick={() => rejectReservation.mutate()} disabled={rejectReservation.isPending}>Confirmar rechazo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SECTION 1: Credit Rules */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground"><Settings className="h-5 w-5" /> Configuración de Créditos</CardTitle>
          <Button size="sm" onClick={() => { resetRuleForm(); setShowRuleForm(true); }}><Plus className="h-4 w-4 mr-1" /> Nueva regla</Button>
        </CardHeader>
        <CardContent>
          {loadingRules ? <Skeleton className="h-20 w-full" /> : creditRules.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No hay reglas de créditos configuradas</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Regla</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Multiplicador</TableHead>
                  <TableHead>Créditos/día</TableHead>
                  <TableHead>Aplica a</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creditRules.map((rule: any) => (
                  <TableRow key={rule.id}>
                    <TableCell>
                      <div className="font-medium text-foreground">{rule.name}</div>
                      {rule.description && <div className="text-xs text-muted-foreground">{rule.description}</div>}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {rule.months ? rule.months.map((m: number) => MONTHS_ES[m - 1]).join(", ") : `${rule.start_date} → ${rule.end_date}`}
                    </TableCell>
                    <TableCell>{multiplierBadge(rule.multiplier)}</TableCell>
                    <TableCell className="text-foreground">{rule.credits_per_day}</TableCell>
                    <TableCell className="text-muted-foreground">{rule.applies_to_all ? "Todos" : "Específicos"}</TableCell>
                    <TableCell><Badge variant={rule.is_active ? "default" : "secondary"}>{rule.is_active ? "Activa" : "Inactiva"}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEditRule(rule)} title="Editar">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeletingRuleId(rule.id)} title="Eliminar" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* New / Edit Rule Dialog */}
      <Dialog open={showRuleForm} onOpenChange={(open) => { setShowRuleForm(open); if (!open) resetRuleForm(); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editingRuleId ? "Editar Regla de Créditos" : "Nueva Regla de Créditos"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Nombre</label>
              <Input value={ruleName} onChange={(e) => setRuleName(e.target.value)} placeholder="Temporada Alta - Julio/Agosto" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Descripción</label>
              <Textarea value={ruleDesc} onChange={(e) => setRuleDesc(e.target.value)} rows={2} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Tipo de período</label>
              <Select value={ruleType} onValueChange={(v: "months" | "dates") => setRuleType(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="months">Meses recurrentes cada año</SelectItem>
                  <SelectItem value="dates">Fechas fijas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {ruleType === "months" ? (
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Meses</label>
                <div className="grid grid-cols-4 gap-2">
                  {MONTHS_ES.map((m, i) => (
                    <label key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <Checkbox
                        checked={ruleMonths.includes(i + 1)}
                        onCheckedChange={(checked) =>
                          setRuleMonths(checked ? [...ruleMonths, i + 1] : ruleMonths.filter((x) => x !== i + 1))
                        }
                      />
                      {m.slice(0, 3)}
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Fecha inicio</label>
                  <Input type="date" value={ruleStartDate} onChange={(e) => setRuleStartDate(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Fecha fin</label>
                  <Input type="date" value={ruleEndDate} onChange={(e) => setRuleEndDate(e.target.value)} />
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Multiplicador</label>
                <Input type="number" step="0.1" value={ruleMultiplier} onChange={(e) => setRuleMultiplier(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Créditos/día</label>
                <Input type="number" step="0.1" value={ruleCreditsPerDay} onChange={(e) => setRuleCreditsPerDay(e.target.value)} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={ruleAppliesToAll} onCheckedChange={setRuleAppliesToAll} />
              <span className="text-sm text-foreground">Se aplica a todos los vehículos</span>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={ruleActive} onCheckedChange={setRuleActive} />
              <span className="text-sm text-foreground">Regla activa</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowRuleForm(false); resetRuleForm(); }}>Cancelar</Button>
            <Button onClick={() => createRuleMutation.mutate()} disabled={!ruleName || createRuleMutation.isPending}>
              {editingRuleId ? "Guardar cambios" : "Crear regla"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Rule Confirmation */}
      <AlertDialog open={!!deletingRuleId} onOpenChange={(open) => !open && setDeletingRuleId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar esta regla de créditos?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la regla y dejará de aplicarse al cálculo de créditos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingRuleId && deleteRuleMutation.mutate(deletingRuleId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* SECTION 2: Calendar (+ optional side panel for vehicle) */}
      <div className={carFilter !== "all" ? "grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-4" : ""}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
            <CardTitle className="flex items-center gap-2 text-foreground"><CalendarDays className="h-5 w-5" /> Calendario de Reservas</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Select value={calCityFilter} onValueChange={(v) => { setCalCityFilter(v); setCarFilter("all"); }}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Ciudad" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las ciudades</SelectItem>
                  {locations.map((l: any) => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={carFilter} onValueChange={setCarFilter}>
                <SelectTrigger className="w-48"><SelectValue placeholder="Todos los vehículos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los vehículos</SelectItem>
                  {cars
                    .filter((c: any) => calCityFilter === "all" || c.location_id === calCityFilter)
                    .map((c: any) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}><ChevronLeft className="h-5 w-5" /></Button>
              <h3 className="text-lg font-semibold text-foreground">{MONTHS_ES[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
              <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}><ChevronRight className="h-5 w-5" /></Button>
            </div>
            <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
              {WEEKDAYS.map((d) => (
                <div key={d} className="bg-muted p-2 text-center text-xs font-medium text-muted-foreground">{d}</div>
              ))}
              {Array.from({ length: startPadding }).map((_, i) => (
                <div key={`pad-${i}`} className="bg-card p-2 min-h-[80px]" />
              ))}
              {days.map((day) => {
                const dayReservations = getReservationsForDay(day);
                const peak = isPeakDay(day);
                const blocked = isBlockedDay(day);
                return (
                  <div key={day.toISOString()} className={`bg-card p-1.5 min-h-[80px] ${blocked ? "bg-destructive/10" : peak ? "bg-orange-500/5" : ""}`}>
                    <span className={`text-xs font-medium ${blocked ? "text-destructive" : peak ? "text-orange-400" : "text-muted-foreground"}`}>{day.getDate()}</span>
                    <div className="space-y-0.5 mt-1">
                      {blocked && <span className="block text-[9px] text-destructive font-medium">Bloqueado</span>}
                      {dayReservations.slice(0, 3).map((r: any) => (
                        <Popover key={r.id}>
                          <PopoverTrigger asChild>
                            <button className="w-full text-left text-[10px] px-1 py-0.5 rounded bg-primary/20 text-primary truncate hover:bg-primary/30 transition-colors">
                              {(r.profiles as any)?.name?.[0]}{(r.profiles as any)?.surname?.[0]} · {(r.cars as any)?.name?.split(" ").pop()}
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 text-sm space-y-2">
                            <p className="font-semibold text-foreground">{(r.profiles as any)?.name} {(r.profiles as any)?.surname}</p>
                            <p className="text-muted-foreground">{(r.cars as any)?.name}</p>
                            <p className="text-muted-foreground">{r.start_date} → {r.end_date}</p>
                            <div className="flex gap-2 flex-wrap">
                              <Badge variant="secondary">{r.credits_used} créditos</Badge>
                              <Badge variant={r.status === "confirmed" ? "default" : "secondary"}>{r.status}</Badge>
                            </div>
                            {r.status === "pending" && (
                              <div className="flex gap-2 pt-2">
                                <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => acceptReservation.mutate(r.id)}>Aceptar</Button>
                                <Button size="sm" variant="destructive" className="flex-1" onClick={() => { setRejectModal(r); setRejectReason(""); }}>Rechazar</Button>
                              </div>
                            )}
                          </PopoverContent>
                        </Popover>
                      ))}
                      {dayReservations.length > 3 && <span className="text-[10px] text-muted-foreground">+{dayReservations.length - 3}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {carFilter !== "all" && (
          <aside className="space-y-4">
            {/* Special vehicle dates */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-foreground text-base"><Star className="h-4 w-4 text-amber-400" /> Fechas especiales</CardTitle>
                <Button size="sm" variant="outline" onClick={() => { resetVehicleRuleForm(); setVehicleRuleModal({ open: true, editingId: null }); }}><Plus className="h-3 w-3 mr-1" /> Añadir</Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {vehicleRules.length === 0 ? (
                  <p className="text-xs text-muted-foreground">Sin fechas especiales para este vehículo.</p>
                ) : vehicleRules.map((rule: any) => (
                  <div key={rule.id} className="p-2 rounded border border-border space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-foreground truncate">{rule.name}</span>
                      <div className="flex gap-1 shrink-0">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditVehicleRule(rule)}><Edit className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeletingVehicleRuleId(rule.id)}><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {rule.months ? rule.months.map((m: number) => MONTHS_ES[m - 1].slice(0, 3)).join(", ") : `${rule.start_date} → ${rule.end_date}`}
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {multiplierBadge(rule.multiplier)}
                      <Badge variant="secondary" className="text-[10px]">{rule.credits_per_day} cr/día</Badge>
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-muted-foreground italic pt-2 border-t border-border">
                  Las reglas globales también se aplican a este vehículo. Gestiónelas en Configuración de Créditos.
                </p>
              </CardContent>
            </Card>

            {/* Active blocks */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-foreground text-base"><Ban className="h-4 w-4 text-destructive" /> Bloqueos activos</CardTitle>
                <Button size="sm" variant="outline" onClick={openNewBlock}><Plus className="h-3 w-3 mr-1" /> Añadir bloqueo</Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {calendarBlocks.length === 0 ? (
                  <p className="text-xs text-muted-foreground">Sin bloqueos activos</p>
                ) : (calendarBlocks as any[]).map((b) => {
                  const meta = blockTypeMeta(b.block_type);
                  const Icon = meta.icon;
                  return (
                    <div key={b.id} className="p-2 rounded border border-border space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-xs text-foreground">{b.start_date} → {b.end_date}</span>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditBlock(b)}><Edit className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeletingBlockId(b.id)}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={`text-[10px] ${meta.color}`}>{meta.label}</Badge>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-[11px] text-muted-foreground truncate max-w-[180px]">{b.reason}</span>
                            </TooltipTrigger>
                            <TooltipContent>{b.reason}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </aside>
        )}
      </div>

      {/* SECTION 2.5: Confirmed Reservations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground"><CalendarCheck className="h-5 w-5" /> Reservas Confirmadas</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={confirmedTab} onValueChange={(v) => setConfirmedTab(v as any)}>
            <TabsList>
              <TabsTrigger value="past">Pasadas ({confirmedGroups.past.length})</TabsTrigger>
              <TabsTrigger value="current">En curso ({confirmedGroups.current.length})</TabsTrigger>
              <TabsTrigger value="future">Futuras ({confirmedGroups.future.length})</TabsTrigger>
            </TabsList>
            {(["past", "current", "future"] as const).map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-4">
                {confirmedGroups[tab].length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">Sin reservas en esta categoría</p>
                ) : (
                  <div className="space-y-2">
                    {confirmedGroups[tab].map((r: any) => {
                      const partNumbers = (participations as any[])
                        .filter((p) => p.user_id === r.user_id && p.car_id === r.car_id)
                        .map((p) => p.participation_number);
                      return (
                        <div key={r.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors flex-wrap">
                          <Avatar className="h-9 w-9 shrink-0">
                            <AvatarFallback className="text-xs">{initials(r.profiles?.name, r.profiles?.surname)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-[160px]">
                            <p className="text-sm font-medium text-foreground">{r.profiles?.name} {r.profiles?.surname}</p>
                            <p className="text-xs text-muted-foreground">{r.cars?.name}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{r.start_date} → {r.end_date}</span>
                          <Badge variant="secondary">{r.credits_used} cr</Badge>
                          {partNumbers.length > 0 && <Badge variant="outline">#{partNumbers.join(", #")}</Badge>}
                          <div className="flex gap-1 ml-auto">
                            <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/participantes?userId=${r.user_id}`)}>
                              <Eye className="h-4 w-4 mr-1" /> Ver perfil
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => { setEditResModal(r); setEditResStart(r.start_date); setEditResEnd(r.end_date); }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setCancelResModal(r)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit confirmed reservation modal */}
      <Dialog open={!!editResModal} onOpenChange={(o) => !o && setEditResModal(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Editar reserva</DialogTitle></DialogHeader>
          {editResModal && (() => {
            const oldCredits = Number(editResModal.credits_used || 0);
            const valid = editResStart && editResEnd && editResEnd >= editResStart;
            const days = valid ? differenceInCalendarDays(parseISO(editResEnd), parseISO(editResStart)) + 1 : 0;
            const diff = days - oldCredits;
            return (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Fecha inicio</Label>
                    <Input type="date" value={editResStart} onChange={(e) => setEditResStart(e.target.value)} />
                  </div>
                  <div>
                    <Label>Fecha fin</Label>
                    <Input type="date" value={editResEnd} onChange={(e) => setEditResEnd(e.target.value)} />
                  </div>
                </div>
                {valid && (
                  <div className="text-sm p-3 rounded bg-muted/40 border border-border">
                    <p className="text-foreground">Nuevos créditos: <strong>{days}</strong> (antes: {oldCredits})</p>
                    {diff !== 0 && (
                      <p className={diff > 0 ? "text-amber-400 mt-1" : "text-emerald-400 mt-1"}>
                        {diff > 0 ? `Este cambio usará ${diff} crédito(s) adicional(es)` : `Este cambio liberará ${Math.abs(diff)} crédito(s)`}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditResModal(null)}>Cancelar</Button>
            <Button onClick={() => editReservationMutation.mutate()} disabled={editReservationMutation.isPending}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel confirmed reservation */}
      <AlertDialog open={!!cancelResModal} onOpenChange={(o) => !o && setCancelResModal(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar esta reserva?</AlertDialogTitle>
            <AlertDialogDescription>Los créditos serán restituidos al participante.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => cancelConfirmedMutation.mutate()}>
              Sí, cancelar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Vehicle special date modal */}
      <Dialog open={vehicleRuleModal.open} onOpenChange={(o) => { if (!o) { setVehicleRuleModal({ open: false, editingId: null }); resetVehicleRuleForm(); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{vehicleRuleModal.editingId ? "Editar fecha especial" : "Añadir fecha especial para este vehículo"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Nombre</Label>
              <Input value={vrName} onChange={(e) => setVrName(e.target.value)} placeholder="Ej: Semana Santa" />
            </div>
            <div>
              <Label>Descripción (opcional)</Label>
              <Textarea value={vrDesc} onChange={(e) => setVrDesc(e.target.value)} rows={2} />
            </div>
            <div>
              <Label>Tipo de período</Label>
              <RadioGroup value={vrType} onValueChange={(v: any) => setVrType(v)} className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 text-sm text-foreground"><RadioGroupItem value="months" /> Meses recurrentes</label>
                <label className="flex items-center gap-2 text-sm text-foreground"><RadioGroupItem value="dates" /> Fechas fijas</label>
              </RadioGroup>
            </div>
            {vrType === "months" ? (
              <div className="grid grid-cols-4 gap-2">
                {MONTHS_ES.map((m, i) => (
                  <label key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <Checkbox checked={vrMonths.includes(i + 1)} onCheckedChange={(c) => setVrMonths(c ? [...vrMonths, i + 1] : vrMonths.filter((x) => x !== i + 1))} />
                    {m.slice(0, 3)}
                  </label>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Inicio</Label><Input type="date" value={vrStart} onChange={(e) => setVrStart(e.target.value)} /></div>
                <div><Label>Fin</Label><Input type="date" value={vrEnd} onChange={(e) => setVrEnd(e.target.value)} /></div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Multiplicador</Label><Input type="number" step="0.1" min="1.0" value={vrMultiplier} onChange={(e) => setVrMultiplier(e.target.value)} /></div>
              <div><Label>Créditos/día</Label><Input type="number" step="0.1" min="0.5" value={vrCreditsPerDay} onChange={(e) => setVrCreditsPerDay(e.target.value)} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setVehicleRuleModal({ open: false, editingId: null }); resetVehicleRuleForm(); }}>Cancelar</Button>
            <Button onClick={() => saveVehicleRuleMutation.mutate()} disabled={saveVehicleRuleMutation.isPending}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingVehicleRuleId} onOpenChange={(o) => !o && setDeletingVehicleRuleId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar esta fecha especial?</AlertDialogTitle>
            <AlertDialogDescription>Si otros vehículos también la usan, se desvincula sólo este. En caso contrario, se eliminará por completo.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => deletingVehicleRuleId && deleteVehicleRuleMutation.mutate(deletingVehicleRuleId)}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Calendar block modal */}
      <Dialog open={blockModal.open} onOpenChange={(o) => !o && setBlockModal({ open: false, editing: null })}>
        <DialogContent>
          <DialogHeader><DialogTitle>{blockModal.editing ? "Editar bloqueo" : "Añadir bloqueo"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Fecha inicio</Label><Input type="date" value={bkStart} onChange={(e) => setBkStart(e.target.value)} /></div>
              <div><Label>Fecha fin</Label><Input type="date" value={bkEnd} onChange={(e) => setBkEnd(e.target.value)} /></div>
            </div>
            <div>
              <Label>Tipo</Label>
              <Select value={bkType} onValueChange={setBkType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {BLOCK_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Motivo</Label>
              <Textarea value={bkReason} onChange={(e) => setBkReason(e.target.value)} rows={3} placeholder="Mínimo 5 caracteres" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlockModal({ open: false, editing: null })}>Cancelar</Button>
            <Button onClick={() => saveBlockMutation.mutate()} disabled={saveBlockMutation.isPending}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingBlockId} onOpenChange={(o) => !o && setDeletingBlockId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este bloqueo?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => deletingBlockId && deleteBlockMutation.mutate(deletingBlockId)}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* SECTION 3: Participations & Credits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground"><Users className="h-5 w-5" /> Participaciones y Créditos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Select value={partsCityFilter} onValueChange={(v) => { setPartsCityFilter(v); setPartsCarFilter("all"); }}>
              <SelectTrigger><SelectValue placeholder="Ciudad" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las ciudades</SelectItem>
                {locations.map((l: any) => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={partsCarFilter} onValueChange={setPartsCarFilter}>
              <SelectTrigger><SelectValue placeholder="Vehículo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los vehículos</SelectItem>
                {cars
                  .filter((c: any) => partsCityFilter === "all" || c.location_id === partsCityFilter)
                  .map((c: any) => <SelectItem key={c.id} value={c.id}>{c.brand} {c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {loadingParts ? <Skeleton className="h-20 w-full" /> : (() => {
            const filtered = participations.filter((p: any) => {
              if (partsCityFilter !== "all" && (p.cars as any)?.location_id !== partsCityFilter) return false;
              if (partsCarFilter !== "all" && p.car_id !== partsCarFilter) return false;
              return true;
            });
            const grouped = Array.from(filtered.reduce((acc: Map<string, any>, p: any) => {
              const key = `${p.user_id}|${p.car_id}`;
              if (!acc.has(key)) {
                const locId = (p.cars as any)?.location_id;
                const cityName = locations.find((l: any) => l.id === locId)?.name || "—";
                acc.set(key, {
                  key, ids: [] as string[], rows: [] as any[],
                  profile: p.profiles, car: p.cars, car_id: p.car_id, user_id: p.user_id,
                  city: cityName,
                  numbers: [] as number[],
                  total: 0, used: 0, remaining: 0,
                  reset_date: p.credits_reset_date,
                });
              }
              const a = acc.get(key);
              a.ids.push(p.id);
              a.rows.push(p);
              a.numbers.push(p.participation_number);
              a.total += Number(p.credits_per_year || 28);
              a.used += Number(p.credits_used_this_year || 0);
              a.remaining += Number(p.credits_remaining ?? ((p.credits_per_year || 28) - (p.credits_used_this_year || 0)));
              return acc;
            }, new Map()).values());

            const sorted = [...grouped].sort((a: any, b: any) => {
              const dir = partsSortDir === "asc" ? 1 : -1;
              const get = (g: any) => {
                switch (partsSortKey) {
                  case "participant": return `${g.profile?.name || ""} ${g.profile?.surname || ""}`.toLowerCase();
                  case "city": return (g.city || "").toLowerCase();
                  case "car": return (g.car?.name || "").toLowerCase();
                  case "count": return g.numbers.length;
                  case "total": return g.total;
                  case "used": return g.used;
                  case "remaining": return g.remaining;
                  case "reset": return g.reset_date || "";
                }
              };
              const va = get(a), vb = get(b);
              if (va < vb) return -1 * dir;
              if (va > vb) return 1 * dir;
              return 0;
            });

            const SortBtn = ({ k, label }: { k: typeof partsSortKey; label: string }) => (
              <button onClick={() => togglePartsSort(k)} className="flex items-center gap-1 hover:text-foreground transition-colors">
                {label}
                <ArrowUpDown className={`h-3 w-3 ${partsSortKey === k ? "text-foreground" : "opacity-40"}`} />
              </button>
            );

            return sorted.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Sin participaciones validadas</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead><SortBtn k="participant" label="Participante" /></TableHead>
                    <TableHead><SortBtn k="car" label="Vehículo" /></TableHead>
                    <TableHead><SortBtn k="city" label="Ciudad" /></TableHead>
                    <TableHead className="hidden md:table-cell"><SortBtn k="count" label="Participaciones" /></TableHead>
                    <TableHead><SortBtn k="total" label="Créditos/año" /></TableHead>
                    <TableHead><SortBtn k="used" label="Usados" /></TableHead>
                    <TableHead><SortBtn k="remaining" label="Restantes" /></TableHead>
                    <TableHead className="hidden lg:table-cell"><SortBtn k="reset" label="Reset" /></TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sorted.map((g: any) => {
                    const pct = g.total > 0 ? (g.remaining / g.total) * 100 : 0;
                    return (
                      <TableRow key={g.key}>
                        <TableCell>
                          <div className="font-medium text-foreground">{g.profile?.name} {g.profile?.surname}</div>
                          <div className="text-xs text-muted-foreground">{g.profile?.email}</div>
                        </TableCell>
                        <TableCell className="text-foreground">{g.car?.name}</TableCell>
                        <TableCell className="text-foreground">{g.city}</TableCell>
                        <TableCell className="hidden md:table-cell text-foreground">
                          {g.numbers.length}× (#{g.numbers.sort((a: number, b: number) => a - b).join(", #")})
                        </TableCell>
                        <TableCell className="text-foreground">{g.total}</TableCell>
                        <TableCell className="text-foreground">{g.used}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={pct} className={`w-16 h-2 ${pct > 50 ? "[&>div]:bg-green-500" : pct > 20 ? "[&>div]:bg-orange-500" : "[&>div]:bg-red-500"}`} />
                            <span className="text-sm text-foreground">{g.remaining}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                          {g.reset_date ? format(new Date(g.reset_date), "dd/MM/yy") : "—"}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => { setAdjustModal({ ...g.rows[0], _groupIds: g.ids, _groupRemaining: g.remaining }); setAdjustCredits(String(g.remaining)); setAdjustReason(""); }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            );
          })()}
        </CardContent>
      </Card>

      {/* Adjust Credits Modal */}
      <Dialog open={!!adjustModal} onOpenChange={(open) => !open && setAdjustModal(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Ajustar Créditos</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Créditos restantes</label>
              <Input type="number" value={adjustCredits} onChange={(e) => setAdjustCredits(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Justificación (obligatoria)</label>
              <Textarea value={adjustReason} onChange={(e) => setAdjustReason(e.target.value)} placeholder="Motivo del ajuste..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjustModal(null)}>Cancelar</Button>
            <Button onClick={() => { if (!adjustReason.trim()) return toast.error("Justificación obligatoria"); adjustMutation.mutate(); }} disabled={adjustMutation.isPending}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SECTION 4: Conflicts */}
      {conflicts.length > 0 && (
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle className="h-5 w-5" /> Conflictos de Reservas ({conflicts.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {conflicts.map((c, i) => (
              <div key={i} className="p-3 rounded-lg border border-destructive/30 bg-destructive/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-sm">
                  <span className="text-foreground font-medium">{(c.a.cars as any)?.name}</span>
                  <span className="text-muted-foreground mx-2">·</span>
                  <span className="text-muted-foreground">{c.a.start_date} – {c.a.end_date}</span>
                  <span className="text-destructive mx-2">⇔</span>
                  <span className="text-muted-foreground">{c.b.start_date} – {c.b.end_date}</span>
                </div>
                <Button variant="outline" size="sm" className="border-destructive/30 text-destructive">Resolver</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminReservas;
