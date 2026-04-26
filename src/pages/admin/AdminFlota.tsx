import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveCarImage } from "@/lib/resolveCarImage";
import {
  Car as CarIcon, Users, CalendarDays, Wrench, MapPin, Gauge, ArrowRight,
} from "lucide-react";
import { format, startOfMonth, endOfMonth, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";

type FleetCar = {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  image_url: string | null;
  total_km: number | null;
  max_participations: number | null;
  location: { name: string } | null;
};

const useFleet = () => {
  return useQuery({
    queryKey: ["admin-fleet"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("id,name,brand,model,year,image_url,total_km,max_participations,locations(name)")
        .eq("status", "complete")
        .order("name");
      if (error) throw error;
      return (data || []).map((c: any) => ({ ...c, location: c.locations })) as FleetCar[];
    },
  });
};

const useFleetMetrics = (carIds: string[]) => {
  return useQuery({
    queryKey: ["admin-fleet-metrics", carIds.join(",")],
    enabled: carIds.length > 0,
    queryFn: async () => {
      const monthStart = startOfMonth(new Date()).toISOString().slice(0, 10);
      const monthEnd = endOfMonth(new Date()).toISOString().slice(0, 10);
      const today = new Date().toISOString().slice(0, 10);

      const [vp, res, maint] = await Promise.all([
        supabase.from("validated_participations").select("car_id,user_id").in("car_id", carIds),
        supabase.from("reservations").select("car_id,start_date,end_date,status").in("car_id", carIds).gte("start_date", monthStart).lte("start_date", monthEnd),
        supabase.from("vehicle_maintenance").select("car_id,service_date").in("car_id", carIds).gte("service_date", today).order("service_date"),
      ]);

      const participantsByCar: Record<string, Set<string>> = {};
      const allParticipants = new Set<string>();
      (vp.data || []).forEach((r: any) => {
        if (!participantsByCar[r.car_id]) participantsByCar[r.car_id] = new Set();
        participantsByCar[r.car_id].add(r.user_id);
        allParticipants.add(r.user_id);
      });

      const reservationsByCar: Record<string, number> = {};
      let reservationsTotal = 0;
      (res.data || []).forEach((r: any) => {
        const days = Math.max(1, differenceInDays(new Date(r.end_date), new Date(r.start_date)) + 1);
        reservationsByCar[r.car_id] = (reservationsByCar[r.car_id] || 0) + days;
        reservationsTotal += days;
      });

      const nextMaintByCar: Record<string, string> = {};
      let pendingMaint = 0;
      (maint.data || []).forEach((m: any) => {
        if (!nextMaintByCar[m.car_id]) nextMaintByCar[m.car_id] = m.service_date;
        pendingMaint++;
      });

      const monthDays = differenceInDays(endOfMonth(new Date()), startOfMonth(new Date())) + 1;

      return {
        participantsByCar, reservationsByCar, nextMaintByCar,
        global: {
          totalParticipants: allParticipants.size,
          reservationsThisMonth: reservationsTotal,
          pendingMaint,
          monthDays,
        },
      };
    },
  });
};

const KpiCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
  <Card className="border-border/40 bg-card">
    <CardContent className="p-4 flex items-center gap-4">
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const AdminFlota = () => {
  const nav = useNavigate();
  const { data: cars = [], isLoading } = useFleet();
  const carIds = useMemo(() => cars.map((c) => c.id), [cars]);
  const { data: metrics } = useFleetMetrics(carIds);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Gauge className="h-6 w-6 text-primary" /> Flota
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vehículos en operación con copropietarios validados.
        </p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard icon={CarIcon} label="Vehículos en flota" value={cars.length} />
        <KpiCard icon={Users} label="Participantes activos" value={metrics?.global.totalParticipants ?? "—"} />
        <KpiCard icon={CalendarDays} label="Reservas este mes" value={metrics?.global.reservationsThisMonth ?? "—"} />
        <KpiCard icon={Wrench} label="Mantenimientos próximos" value={metrics?.global.pendingMaint ?? "—"} />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-80" />)}
        </div>
      ) : cars.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-muted-foreground">
          Aún no hay vehículos en flota. Marca un vehículo como "complete" para verlo aquí.
        </CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((c) => {
            const partCount = metrics?.participantsByCar[c.id]?.size ?? 0;
            const maxPart = c.max_participations ?? 10;
            const reservedDays = metrics?.reservationsByCar[c.id] ?? 0;
            const nextMaint = metrics?.nextMaintByCar[c.id];
            const monthDays = metrics?.global.monthDays ?? 30;
            const occupancy = Math.min(100, Math.round((reservedDays / monthDays) * 100));

            return (
              <Card key={c.id} className="overflow-hidden border-border/40 bg-card hover:border-primary/40 transition-colors">
                <div className="aspect-video bg-muted relative">
                  <img
                    src={resolveCarImage(c.image_url || "", c.name)}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-emerald-500/90 text-white border-0">
                    Flota Activa
                  </Badge>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-base">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {c.brand} {c.model} · {c.year}
                    </p>
                    {c.location?.name && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" /> {c.location.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-muted/30 rounded-md p-2">
                      <p className="text-muted-foreground">Participantes</p>
                      <p className="font-semibold text-sm">{partCount}/{maxPart}</p>
                    </div>
                    <div className="bg-muted/30 rounded-md p-2">
                      <p className="text-muted-foreground">Reservas mes</p>
                      <p className="font-semibold text-sm">{reservedDays} días</p>
                    </div>
                    <div className="bg-muted/30 rounded-md p-2">
                      <p className="text-muted-foreground">Próx. mant.</p>
                      <p className="font-semibold text-sm">
                        {nextMaint ? format(new Date(nextMaint), "dd MMM", { locale: es }) : "Sin programar"}
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-md p-2">
                      <p className="text-muted-foreground">Km totales</p>
                      <p className="font-semibold text-sm">{(c.total_km ?? 0).toLocaleString()} km</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Ocupación mes</span>
                      <span className="font-medium">{occupancy}%</span>
                    </div>
                    <Progress value={occupancy} className="h-1.5" />
                  </div>

                  <Button
                    onClick={() => nav(`/admin/flota/${c.id}`)}
                    className="w-full"
                    variant="secondary"
                  >
                    Gestionar <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminFlota;
