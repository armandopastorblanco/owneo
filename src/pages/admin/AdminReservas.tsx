import { useState } from "react";
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
import { toast } from "sonner";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay, isWithinInterval, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus, Settings, CalendarDays, Users, AlertTriangle, Edit, Trash2, ArrowUpDown } from "lucide-react";

const MONTHS_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const WEEKDAYS = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

const AdminReservas = () => {
  const queryClient = useQueryClient();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [carFilter, setCarFilter] = useState("all");
  const [showRuleForm, setShowRuleForm] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [deletingRuleId, setDeletingRuleId] = useState<string | null>(null);
  const [adjustModal, setAdjustModal] = useState<any>(null);
  const [adjustCredits, setAdjustCredits] = useState("");
  const [adjustReason, setAdjustReason] = useState("");

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
      const { data } = await supabase.from("cars").select("id,name,brand,location_id");
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

  // Conflicts: overlapping reservations for same car
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

  // Calendar rendering
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = (getDay(monthStart) + 6) % 7; // Monday = 0

  const filteredReservations = reservations.filter((r: any) =>
    carFilter === "all" || r.car_id === carFilter
  );

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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Reservas y Créditos</h1>

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

      {/* SECTION 2: Calendar */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
          <CardTitle className="flex items-center gap-2 text-foreground"><CalendarDays className="h-5 w-5" /> Calendario de Reservas</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={carFilter} onValueChange={setCarFilter}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Todos los vehículos" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los vehículos</SelectItem>
                {cars.map((c: any) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
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
              return (
                <div key={day.toISOString()} className={`bg-card p-1.5 min-h-[80px] ${peak ? "bg-orange-500/5" : ""}`}>
                  <span className={`text-xs font-medium ${peak ? "text-orange-400" : "text-muted-foreground"}`}>{day.getDate()}</span>
                  <div className="space-y-0.5 mt-1">
                    {dayReservations.slice(0, 3).map((r: any) => (
                      <Popover key={r.id}>
                        <PopoverTrigger asChild>
                          <button className="w-full text-left text-[10px] px-1 py-0.5 rounded bg-primary/20 text-primary truncate hover:bg-primary/30 transition-colors">
                            {(r.profiles as any)?.name?.[0]}{(r.profiles as any)?.surname?.[0]} · {(r.cars as any)?.name?.split(" ").pop()}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 text-sm space-y-1">
                          <p className="font-semibold text-foreground">{(r.profiles as any)?.name} {(r.profiles as any)?.surname}</p>
                          <p className="text-muted-foreground">{(r.cars as any)?.name}</p>
                          <p className="text-muted-foreground">{r.start_date} → {r.end_date}</p>
                          <div className="flex gap-2">
                            <Badge variant="secondary">{r.credits_used} créditos</Badge>
                            <Badge variant={r.status === "confirmed" ? "default" : "secondary"}>{r.status}</Badge>
                          </div>
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
