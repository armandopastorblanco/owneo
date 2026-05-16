import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { resolveAssetPath } from "@/lib/assetMap";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Car, Eye, Pencil, Copy, Plus, Search, Filter,
  X, Trash2, AlertTriangle, Archive, Save, ImagePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Tables } from "@/integrations/supabase/types";

type DbCar = Tables<"cars"> & { promotion?: Record<string, unknown> | null; admin_notes?: string | null };

/* ═══════ DATA HOOKS ═══════ */

function useAdminCars() {
  return useQuery({
    queryKey: ["admin-cars"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as DbCar[];
    },
  });
}

function useAdminLocations() {
  return useQuery({
    queryKey: ["admin-locations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("locations").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });
}

function useValidatedParticipationsCounts() {
  return useQuery({
    queryKey: ["admin-vp-counts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("validated_participations")
        .select("car_id");
      if (error) throw error;
      const counts: Record<string, number> = {};
      data.forEach((vp) => {
        counts[vp.car_id] = (counts[vp.car_id] || 0) + 1;
      });
      return counts;
    },
  });
}

/* ═══════ STATUS HELPERS ═══════ */

function getCarStatus(car: DbCar): { label: string; color: string } {
  if (!car.is_active) return { label: "Borrador", color: "bg-muted text-muted-foreground" };
  if (car.status === "archived") return { label: "Archivado", color: "bg-destructive/20 text-destructive" };
  if (car.status === "complete") return { label: "Completo", color: "bg-blue-500/20 text-blue-400" };
  return { label: "Activo", color: "bg-emerald-500/20 text-emerald-400" };
}

function participationProgress(car: DbCar) {
  const max = car.max_participations || 10;
  const remaining = car.remaining_participations ?? max;
  const sold = max - remaining;
  const pct = (sold / max) * 100;
  return { sold, max, remaining, pct };
}

function progressColor(pct: number) {
  if (pct >= 50) return "bg-emerald-500";
  if (pct >= 20) return "bg-orange-500";
  return "bg-red-500";
}

/* ═══════ MAIN COMPONENT ═══════ */

const AdminVehiculos = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: cars, isLoading } = useAdminCars();
  const { data: locations } = useAdminLocations();
  const { data: vpCounts } = useValidatedParticipationsCounts();

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [cityFilter, setCityFilter] = useState("todas");
  const [brandFilter, setBrandFilter] = useState("todas");

  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<DbCar | null>(null);
  const [activeTab, setActiveTab] = useState("general");

  // Form state
  const [form, setForm] = useState<Record<string, unknown>>({});

  const brands = useMemo(() => {
    if (!cars) return [];
    return [...new Set(cars.map((c) => c.brand))].sort();
  }, [cars]);

  const filtered = useMemo(() => {
    if (!cars) return [];
    return cars.filter((c) => {
      if (search) {
        const q = search.toLowerCase();
        if (!c.name.toLowerCase().includes(q) && !c.brand.toLowerCase().includes(q) && !c.model.toLowerCase().includes(q)) return false;
      }
      if (statusFilter !== "todos") {
        const s = getCarStatus(c).label.toLowerCase();
        if (s !== statusFilter) return false;
      }
      if (cityFilter !== "todas" && !(c.available_in || []).includes(cityFilter)) return false;
      if (brandFilter !== "todas" && c.brand !== brandFilter) return false;
      return true;
    });
  }, [cars, search, statusFilter, cityFilter, brandFilter]);

  /* ── open drawer ── */
  const openDrawer = async (car?: DbCar) => {
    if (car) {
      setEditingCar(car);
      let adminNotes = "";
      const { data: noteRow } = await supabase
        .from("car_admin_notes" as never)
        .select("notes")
        .eq("car_id", car.id)
        .maybeSingle();
      adminNotes = ((noteRow as { notes?: string } | null)?.notes) || "";
      setForm({
        name: car.name,
        brand: car.brand,
        model: car.model,
        year: car.year,
        category: car.category || "",
        description: car.description || "",
        luxury_description: car.luxury_description || "",
        luxury_description_override: (car as DbCar & { luxury_description_override?: string }).luxury_description_override || "",
        annual_fee_percent: (car as DbCar & { annual_fee_percent?: number }).annual_fee_percent ?? 10,
        annual_fee_override: (car as DbCar & { annual_fee_override?: number | null }).annual_fee_override ?? null,
        participation_duration_years: (car as DbCar & { participation_duration_years?: number }).participation_duration_years ?? 5,
        weeks_per_participation: (car as DbCar & { weeks_per_participation?: number }).weeks_per_participation ?? 4,
        km_per_participation: (car as DbCar & { km_per_participation?: number }).km_per_participation ?? 2000,
        location_id: (car as DbCar).location_id || "",
        available_in: car.available_in || [],
        is_active: car.is_active ?? false,
        price: car.price,
        max_participations: car.max_participations || 10,
        participation_price: car.participation_price || 0,
        remaining_participations: car.remaining_participations ?? 10,
        specifications: car.specifications || {},
        features: car.features || [],
        image_url: car.image_url || "",
        gallery: car.gallery || [],
        status: car.status || "active",
        deadline: car.deadline || "",
        admin_notes: adminNotes,
        promotion: (car as DbCar).promotion || null,
        promotion_active: !!((car as DbCar).promotion as Record<string, unknown>)?.is_active,
        promotion_type: ((car as DbCar).promotion as Record<string, unknown>)?.type || "direct",
        promotion_discount: ((car as DbCar).promotion as Record<string, unknown>)?.discount_percent || 10,
        promotion_min_parts: ((car as DbCar).promotion as Record<string, unknown>)?.min_participations || 2,
        promotion_start: ((car as DbCar).promotion as Record<string, unknown>)?.start_date || "",
        promotion_end: ((car as DbCar).promotion as Record<string, unknown>)?.end_date || "",
        promotion_badge: ((car as DbCar).promotion as Record<string, unknown>)?.badge_text || "",
      });
    } else {
      setEditingCar(null);
      setForm({
        name: "", brand: "", model: "", year: new Date().getFullYear(),
        category: "", description: "", luxury_description: "",
        luxury_description_override: "",
        annual_fee_percent: 10, annual_fee_override: null,
        participation_duration_years: 5, weeks_per_participation: 4, km_per_participation: 2000,
        location_id: "",
        available_in: [], is_active: false, price: 0,
        max_participations: 10, participation_price: 0,
        remaining_participations: 10, specifications: {},
        features: [], image_url: "", gallery: [], status: "active",
        deadline: "", admin_notes: "", promotion: null,
        promotion_active: false, promotion_type: "direct",
        promotion_discount: 10, promotion_min_parts: 2,
        promotion_start: "", promotion_end: "", promotion_badge: "",
      });
    }
    setActiveTab("general");
    setDrawerOpen(true);
  };

  /* ── specs management ── */
  const specs = (form.specifications || {}) as Record<string, string>;
  const specEntries = Object.entries(specs);
  const addSpec = () => {
    setForm({ ...form, specifications: { ...specs, "": "" } });
  };
  const updateSpecKey = (oldKey: string, newKey: string, idx: number) => {
    const entries = Object.entries(specs);
    entries[idx] = [newKey, entries[idx][1]];
    setForm({ ...form, specifications: Object.fromEntries(entries) });
  };
  const updateSpecValue = (key: string, value: string, idx: number) => {
    const entries = Object.entries(specs);
    entries[idx] = [entries[idx][0], value];
    setForm({ ...form, specifications: Object.fromEntries(entries) });
  };
  const removeSpec = (idx: number) => {
    const entries = Object.entries(specs);
    entries.splice(idx, 1);
    setForm({ ...form, specifications: Object.fromEntries(entries) });
  };

  /* ── save mutation ── */
  const saveMutation = useMutation({
    mutationFn: async () => {
      const promo = (form.promotion_active as boolean)
        ? {
            type: form.promotion_type,
            discount_percent: Number(form.promotion_discount),
            min_participations: form.promotion_type === "volume" ? Number(form.promotion_min_parts) : undefined,
            start_date: form.promotion_start,
            end_date: form.promotion_end,
            badge_text: form.promotion_badge,
            is_active: true,
          }
        : null;

      const payload = {
        name: form.name as string,
        brand: form.brand as string,
        model: form.model as string,
        year: Number(form.year),
        category: (form.category as string) || null,
        description: (form.description as string) || null,
        luxury_description: (form.luxury_description as string) || null,
        luxury_description_override: (form.luxury_description_override as string) || null,
        annual_fee_percent: Number(form.annual_fee_percent ?? 10),
        annual_fee_override: form.annual_fee_override == null ? null : Number(form.annual_fee_override),
        participation_duration_years: Number(form.participation_duration_years ?? 5),
        weeks_per_participation: Number(form.weeks_per_participation ?? 4),
        km_per_participation: Number(form.km_per_participation ?? 2000),
        location_id: form.location_id as string,
        available_in: form.available_in as string[],
        is_active: form.is_active as boolean,
        price: Number(form.price),
        max_participations: Number(form.max_participations),
        participation_price: Number(form.participation_price),
        remaining_participations: Number(form.remaining_participations),
        specifications: form.specifications as Record<string, string>,
        features: form.features as string[],
        image_url: (form.image_url as string) || null,
        gallery: form.gallery as string[],
        status: form.status as string,
        deadline: (form.deadline as string) || null,
      };

      // Add promotion and admin_notes as raw fields since they may not be in generated types yet
      const fullPayload = {
        ...payload,
        promotion: promo,
        admin_notes: (form.admin_notes as string) || null,
      } as Record<string, unknown>;

      if (editingCar) {
        const { error } = await supabase
          .from("cars")
          .update(fullPayload as never)
          .eq("id", editingCar.id);
        if (error) throw error;
        // Audit log
        await supabase.rpc("insert_audit_log", {
          _action: "car_updated",
          _target_table: "cars",
          _target_id: editingCar.id,
          _details: { changes: Object.keys(payload) } as never,
        });
      } else {
        const { data, error } = await supabase
          .from("cars")
          .insert(fullPayload as never)
          .select("id")
          .single();
        if (error) throw error;
        await supabase.rpc("insert_audit_log", {
          _action: "car_created",
          _target_table: "cars",
          _target_id: data.id,
          _details: { name: payload.name } as never,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cars"] });
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      setDrawerOpen(false);
      toast.success(editingCar ? "Vehículo actualizado correctamente" : "Vehículo creado correctamente");
    },
    onError: (err: Error) => toast.error(`Error: ${err.message}`),
  });

  /* ── duplicate mutation ── */
  const duplicateMutation = useMutation({
    mutationFn: async (car: DbCar) => {
      const { id, created_at, updated_at, ...rest } = car;
      const payload = {
        ...rest,
        name: `${car.name} (Copia)`,
        is_active: false,
        remaining_participations: car.max_participations || 10,
        status: "active",
      };
      const { data, error } = await supabase.from("cars").insert(payload as never).select("id").single();
      if (error) throw error;
      await supabase.rpc("insert_audit_log", {
        _action: "car_duplicated",
        _target_table: "cars",
        _target_id: data.id,
        _details: { source_id: car.id } as never,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cars"] });
      toast.success("Vehículo duplicado correctamente");
    },
    onError: (err: Error) => toast.error(`Error: ${err.message}`),
  });

  /* ── archive mutation ── */
  const archiveMutation = useMutation({
    mutationFn: async (carId: string) => {
      const { error } = await supabase.from("cars").update({ status: "archived" } as never).eq("id", carId);
      if (error) throw error;
      await supabase.rpc("insert_audit_log", {
        _action: "car_archived",
        _target_table: "cars",
        _target_id: carId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cars"] });
      setDrawerOpen(false);
      toast.success("Vehículo archivado");
    },
    onError: (err: Error) => toast.error(`Error: ${err.message}`),
  });

  /* ── delete mutation ── */
  const deleteMutation = useMutation({
    mutationFn: async (carId: string) => {
      const { error } = await supabase.from("cars").delete().eq("id", carId);
      if (error) throw error;
      await supabase.rpc("insert_audit_log", {
        _action: "car_deleted",
        _target_table: "cars",
        _target_id: carId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cars"] });
      setDrawerOpen(false);
      toast.success("Vehículo eliminado");
    },
    onError: (err: Error) => toast.error(`Error: ${err.message}`),
  });

  const suggestedPrice = Number(form.price) && Number(form.max_participations)
    ? Math.round(Number(form.price) / Number(form.max_participations))
    : 0;

  const vpCount = editingCar ? (vpCounts?.[editingCar.id] || 0) : 0;

  /* ═══════ RENDER ═══════ */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vehículos</h1>
          <p className="text-muted-foreground">
            Gestión de la flota de vehículos · {cars?.length || 0} vehículos
          </p>
        </div>
        <Button onClick={() => openDrawer()} className="gap-2">
          <Plus className="w-4 h-4" /> Añadir vehículo
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o marca..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="borrador">Borrador</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="completo">Completo</SelectItem>
                <SelectItem value="archivado">Archivado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las ciudades</SelectItem>
                {locations?.map((loc) => (
                  <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las marcas</SelectItem>
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Cargando vehículos...</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16"></TableHead>
                    <TableHead>Vehículo</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Ciudad(es)</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead className="text-right">Participación</TableHead>
                    <TableHead>Participaciones</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((car) => {
                    const status = getCarStatus(car);
                    const prog = participationProgress(car);
                    return (
                      <TableRow key={car.id}>
                        <TableCell>
                          <div className="w-[60px] h-[40px] rounded overflow-hidden bg-muted">
                            {car.image_url && (
                              <img
                                src={resolveAssetPath(car.image_url)}
                                alt={car.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{car.name}</TableCell>
                        <TableCell className="text-muted-foreground">{car.brand}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {(car.available_in || []).map((city) => (
                              <Badge key={city} variant="outline" className="text-xs">
                                {city}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-foreground">
                          €{Number(car.price).toLocaleString("es-ES")}
                        </TableCell>
                        <TableCell className="text-right text-foreground">
                          {car.participation_price
                            ? `€${Number(car.participation_price).toLocaleString("es-ES")}`
                            : "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <div className="flex-1">
                              <div className={`h-2 rounded-full overflow-hidden bg-muted`}>
                                <div
                                  className={`h-full rounded-full transition-all ${progressColor(prog.pct)}`}
                                  style={{ width: `${prog.pct}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {prog.sold}/{prog.max}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${status.color} border-0`}>{status.label}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost" size="icon"
                              title="Ver preview"
                              onClick={() => window.open(`/car/${car.id}`, "_blank")}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost" size="icon"
                              title="Editar"
                              onClick={() => openDrawer(car)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost" size="icon"
                              title="Duplicar"
                              onClick={() => duplicateMutation.mutate(car)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No se encontraron vehículos
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ═══════ DRAWER ═══════ */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="right" className="w-full max-w-3xl overflow-y-auto bg-card border-border p-0">
          <SheetHeader className="p-6 pb-0">
            <SheetTitle className="text-foreground">
              {editingCar ? `Editar: ${editingCar.name}` : "Nuevo Vehículo"}
            </SheetTitle>
          </SheetHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6 pt-4">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="pricing">Precios</TabsTrigger>
              <TabsTrigger value="specs">Specs</TabsTrigger>
              <TabsTrigger value="photos">Fotos</TabsTrigger>
              <TabsTrigger value="config">Config</TabsTrigger>
            </TabsList>

            {/* ─── TAB 1: General ─── */}
            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nombre del vehículo *</Label>
                  <Input value={(form.name as string) || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <Label>Marca *</Label>
                  <Input value={(form.brand as string) || ""} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
                </div>
                <div>
                  <Label>Modelo *</Label>
                  <Input value={(form.model as string) || ""} onChange={(e) => setForm({ ...form, model: e.target.value })} />
                </div>
                <div>
                  <Label>Año *</Label>
                  <Input type="number" value={form.year as number} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
                </div>
              </div>
              <div>
                <Label>Categoría</Label>
                <Input value={(form.category as string) || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </div>
              <div>
                <Label>Descripción corta</Label>
                <Textarea value={(form.description as string) || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div>
                <Label>Descripción de lujo</Label>
                <Textarea value={(form.luxury_description as string) || ""} onChange={(e) => setForm({ ...form, luxury_description: e.target.value })} rows={4} />
              </div>
              <div>
                <Label>Descripción de lujo (override manual)</Label>
                <Textarea
                  value={(form.luxury_description_override as string) || ""}
                  onChange={(e) => setForm({ ...form, luxury_description_override: e.target.value })}
                  rows={5}
                  placeholder="Dejar vacío para usar la descripción autogenerada"
                />
              </div>
              <div>
                <Label>Ciudad principal <span className="text-destructive">*</span></Label>
                <Select
                  value={(form.location_id as string) || ""}
                  onValueChange={(v) => {
                    const loc = locations?.find((l) => l.id === v);
                    const current = (form.available_in as string[]) || [];
                    const available_in = loc && !current.includes(loc.name) ? [...current, loc.name] : current;
                    setForm({ ...form, location_id: v, available_in });
                  }}
                >
                  <SelectTrigger><SelectValue placeholder="Selecciona una ciudad" /></SelectTrigger>
                  <SelectContent>
                    {locations?.map((loc) => (
                      <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Obligatoria. Cada vehículo debe estar asignado a una ciudad.</p>
              </div>
              <div>
                <Label className="mb-2 block">Ciudades disponibles (adicionales)</Label>
                <div className="grid grid-cols-3 gap-2">
                  {locations?.map((loc) => (
                    <label key={loc.id} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                      <Checkbox
                        checked={(form.available_in as string[])?.includes(loc.name)}
                        onCheckedChange={(checked) => {
                          const current = (form.available_in as string[]) || [];
                          setForm({
                            ...form,
                            available_in: checked
                              ? [...current, loc.name]
                              : current.filter((c) => c !== loc.name),
                          });
                        }}
                      />
                      {loc.name}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Switch
                  checked={form.is_active as boolean}
                  onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                />
                <Label>Publicado (visible en el sitio)</Label>
              </div>
            </TabsContent>

            {/* ─── TAB 2: Precios ─── */}
            <TabsContent value="pricing" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Precio total del vehículo (€)</Label>
                  <Input
                    type="number"
                    value={form.price as number}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Máx. participaciones</Label>
                  <Input
                    type="number" min={1} max={10}
                    value={form.max_participations as number}
                    onChange={(e) => setForm({ ...form, max_participations: Math.min(10, Math.max(1, Number(e.target.value))) })}
                  />
                </div>
              </div>
              <div>
                <Label>Precio por participación (€)</Label>
                <Input
                  type="number"
                  value={form.participation_price as number}
                  onChange={(e) => setForm({ ...form, participation_price: Number(e.target.value) })}
                />
                {suggestedPrice > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Precio sugerido: {suggestedPrice.toLocaleString("es-ES")}€ (precio_total / max_participations)
                  </p>
                )}
              </div>
              <div>
                <Label>Participaciones restantes</Label>
                <Input
                  type="number"
                  min={0}
                  max={form.max_participations as number}
                  value={form.remaining_participations as number}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    const max = form.max_participations as number;
                    setForm({ ...form, remaining_participations: Math.min(max, Math.max(vpCount > 0 ? 0 : 0, v)) });
                  }}
                />
                {vpCount > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {vpCount} participaciones vendidas (validadas)
                  </p>
                )}
              </div>
              <div>
                <Label>Créditos por año</Label>
                <Input type="number" defaultValue={28} disabled />
                <p className="text-xs text-muted-foreground mt-1">
                  Equivale a {Math.round(28 / 7)} semanas de uso al año
                </p>
              </div>

              {/* ── Cuota anual de gestión ── */}
              <div className="border-t border-border pt-4 space-y-4">
                <h4 className="font-semibold text-foreground">Cuota anual de gestión</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cuota anual de gestión (%)</Label>
                    <Input
                      type="number" min={0} max={100} step="0.1"
                      value={(form.annual_fee_percent as number) ?? 10}
                      onChange={(e) => setForm({ ...form, annual_fee_percent: Number(e.target.value) })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Porcentaje del precio de participación cobrado anualmente por la gestión integral del vehículo.
                    </p>
                  </div>
                  <div>
                    <Label>Cuota anual fija (€) — opcional</Label>
                    <Input
                      type="number" min={0}
                      value={(form.annual_fee_override as number | null) ?? ""}
                      onChange={(e) => setForm({ ...form, annual_fee_override: e.target.value === "" ? null : Number(e.target.value) })}
                      placeholder="—"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Si se rellena, sobreescribe el cálculo porcentual.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Duración de la participación</Label>
                    <Select
                      value={String((form.participation_duration_years as number) ?? 5)}
                      onValueChange={(v) => setForm({ ...form, participation_duration_years: Number(v) })}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 años</SelectItem>
                        <SelectItem value="5">5 años</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Semanas por participación / año</Label>
                    <Input
                      type="number" min={1}
                      value={(form.weeks_per_participation as number) ?? 4}
                      onChange={(e) => setForm({ ...form, weeks_per_participation: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Km por participación / año</Label>
                    <Input
                      type="number" min={0}
                      value={(form.km_per_participation as number) ?? 2000}
                      onChange={(e) => setForm({ ...form, km_per_participation: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              {/* Promotions */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <Switch
                    checked={form.promotion_active as boolean}
                    onCheckedChange={(v) => setForm({ ...form, promotion_active: v })}
                  />
                  <Label className="font-semibold">Activar promoción</Label>
                </div>
                {form.promotion_active && (
                  <div className="space-y-4 pl-4 border-l-2 border-border">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio" name="promo_type"
                          checked={form.promotion_type === "direct"}
                          onChange={() => setForm({ ...form, promotion_type: "direct" })}
                          className="accent-primary"
                        />
                        <span className="text-sm text-foreground">Descuento directo</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio" name="promo_type"
                          checked={form.promotion_type === "volume"}
                          onChange={() => setForm({ ...form, promotion_type: "volume" })}
                          className="accent-primary"
                        />
                        <span className="text-sm text-foreground">Descuento por volumen</span>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>% de descuento</Label>
                        <Input
                          type="number" min={1} max={99}
                          value={form.promotion_discount as number}
                          onChange={(e) => setForm({ ...form, promotion_discount: Number(e.target.value) })}
                        />
                      </div>
                      {form.promotion_type === "volume" && (
                        <div>
                          <Label>Mín. participaciones</Label>
                          <Input
                            type="number" min={2} max={10}
                            value={form.promotion_min_parts as number}
                            onChange={(e) => setForm({ ...form, promotion_min_parts: Number(e.target.value) })}
                          />
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Fecha inicio</Label>
                        <Input
                          type="date"
                          value={form.promotion_start as string}
                          onChange={(e) => setForm({ ...form, promotion_start: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Fecha fin</Label>
                        <Input
                          type="date"
                          value={form.promotion_end as string}
                          onChange={(e) => setForm({ ...form, promotion_end: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Texto del badge</Label>
                      <Input
                        value={(form.promotion_badge as string) || ""}
                        onChange={(e) => setForm({ ...form, promotion_badge: e.target.value })}
                        placeholder="Ej: Oferta especial"
                      />
                    </div>
                    {/* Preview */}
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Vista previa:</p>
                      {form.promotion_type === "direct" ? (
                        <p className="text-sm text-foreground">
                          <span className="line-through text-muted-foreground mr-2">
                            {Number(form.participation_price).toLocaleString("es-ES")}€
                          </span>
                          <span className="font-bold text-emerald-400">
                            {Math.round(Number(form.participation_price) * (1 - Number(form.promotion_discount) / 100)).toLocaleString("es-ES")}€
                          </span>
                          <span className="ml-2 text-xs text-emerald-400">-{form.promotion_discount as number}%</span>
                        </p>
                      ) : (
                        <p className="text-sm text-foreground">
                          Si solicitas {form.promotion_min_parts as number} o más participaciones:
                          {" "}{Number(form.participation_price).toLocaleString("es-ES")}€ - {form.promotion_discount as number}% ={" "}
                          <span className="font-bold text-emerald-400">
                            {Math.round(Number(form.participation_price) * (1 - Number(form.promotion_discount) / 100)).toLocaleString("es-ES")}€/participación
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* ─── TAB 3: Specs ─── */}
            <TabsContent value="specs" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Especificaciones técnicas</Label>
                <Button variant="outline" size="sm" onClick={addSpec} className="gap-1">
                  <Plus className="w-3 h-3" /> Añadir
                </Button>
              </div>
              <div className="space-y-2">
                {specEntries.map(([key, value], idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      className="flex-1"
                      placeholder="Clave (ej: engine)"
                      value={key}
                      onChange={(e) => updateSpecKey(key, e.target.value, idx)}
                    />
                    <Input
                      className="flex-1"
                      placeholder="Valor"
                      value={value}
                      onChange={(e) => updateSpecValue(key, e.target.value, idx)}
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeSpec(idx)}>
                      <X className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                {specEntries.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No hay especificaciones. Haz clic en "Añadir" para comenzar.
                  </p>
                )}
              </div>

              <div className="border-t border-border pt-4">
                <Label className="text-base font-semibold mb-2 block">Características premium</Label>
                <div className="space-y-2">
                  {((form.features as string[]) || []).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={feat}
                        onChange={(e) => {
                          const feats = [...(form.features as string[])];
                          feats[idx] = e.target.value;
                          setForm({ ...form, features: feats });
                        }}
                      />
                      <Button variant="ghost" size="icon" onClick={() => {
                        const feats = [...(form.features as string[])];
                        feats.splice(idx, 1);
                        setForm({ ...form, features: feats });
                      }}>
                        <X className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => setForm({ ...form, features: [...(form.features as string[]), ""] })}>
                    <Plus className="w-3 h-3 mr-1" /> Añadir característica
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* ─── TAB 4: Photos ─── */}
            <TabsContent value="photos" className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-2 block">Foto principal</Label>
                {(form.image_url as string) && (
                  <div className="mb-3">
                    <img
                      src={resolveAssetPath(form.image_url as string)}
                      alt="Principal"
                      className="w-full max-w-md rounded-lg aspect-video object-cover"
                    />
                    {(form.image_url as string).startsWith("/") && (
                      <p className="text-xs text-orange-400 mt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Imagen local — sube una nueva para reemplazarla
                      </p>
                    )}
                  </div>
                )}
                <div>
                  <Label>URL de imagen</Label>
                  <Input
                    value={(form.image_url as string) || ""}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    placeholder="URL de la imagen principal"
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-2 block">
                  Galería ({((form.gallery as string[]) || []).length} fotos)
                </Label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {((form.gallery as string[]) || []).map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={resolveAssetPath(url)}
                        alt={`Galería ${idx + 1}`}
                        className="w-full aspect-square object-cover rounded"
                      />
                      <button
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          const g = [...(form.gallery as string[])];
                          g.splice(idx, 1);
                          setForm({ ...form, gallery: g });
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="URL de nueva imagen"
                    id="new-gallery-url"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const input = document.getElementById("new-gallery-url") as HTMLInputElement;
                      if (input?.value) {
                        setForm({ ...form, gallery: [...(form.gallery as string[]), input.value] });
                        input.value = "";
                      }
                    }}
                  >
                    <ImagePlus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* ─── TAB 5: Config ─── */}
            <TabsContent value="config" className="space-y-6">
              <div>
                <Label className="text-base font-semibold">Estado del vehículo</Label>
                <Select
                  value={form.status as string}
                  onValueChange={(v) => setForm({ ...form, status: v, is_active: v === "active" ? (form.is_active as boolean) : v !== "archived" && (form.is_active as boolean) })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="complete">Completo</SelectItem>
                    <SelectItem value="archived">Archivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Fecha límite de venta</Label>
                <Input
                  type="datetime-local"
                  value={(form.deadline as string)?.slice(0, 16) || ""}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value ? new Date(e.target.value).toISOString() : "" })}
                  className="mt-1"
                />
                {form.deadline && new Date(form.deadline as string) > new Date() && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Quedan {Math.ceil((new Date(form.deadline as string).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} días
                  </p>
                )}
              </div>

              <div>
                <Label>Notas internas (no visible en el sitio)</Label>
                <Textarea
                  value={(form.admin_notes as string) || ""}
                  onChange={(e) => setForm({ ...form, admin_notes: e.target.value })}
                  rows={4}
                  className="mt-1"
                />
              </div>

              {/* Danger zone */}
              {editingCar && (
                <div className="border-t border-destructive/30 pt-4 space-y-3">
                  <Label className="text-destructive font-semibold">Zona de peligro</Label>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full border-destructive/50 text-destructive hover:bg-destructive/10 gap-2">
                        <Archive className="w-4 h-4" /> Archivar vehículo
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Archivar {editingCar.name}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Los participantes existentes conservarán su acceso al calendario.
                          El vehículo dejará de aparecer en el sitio público.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => archiveMutation.mutate(editingCar.id)}>
                          Confirmar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="w-full gap-2"
                        disabled={vpCount > 0}
                      >
                        <Trash2 className="w-4 h-4" /> Eliminar vehículo
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar {editingCar.name}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción es irreversible. Se eliminarán todos los datos del vehículo.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteMutation.mutate(editingCar.id)}>
                          Eliminar definitivamente
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {vpCount > 0 && (
                    <p className="text-xs text-muted-foreground">
                      No se puede eliminar: existen {vpCount} participaciones validadas.
                    </p>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Save button */}
          <div className="sticky bottom-0 p-6 pt-4 bg-card border-t border-border flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancelar</Button>
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !(form.name && form.brand && form.model && form.year && form.location_id)}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {saveMutation.isPending ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminVehiculos;
