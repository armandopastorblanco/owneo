import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  DollarSign, Users, Car, FileText, ShieldCheck, CalendarDays,
  TrendingUp, TrendingDown, Minus, Eye, Settings2, Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

/* ───────── helpers ───────── */

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
const now = new Date();
const thisMonthStart = startOfMonth(now);
const lastMonthStart = startOfMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1));

const fmt = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `${(n / 1_000).toFixed(0)}K`
    : n.toLocaleString("es-ES");

const fmtCurrency = (n: number) => `€${fmt(n)}`;

/* ───────── KPI hook ───────── */

function useKPIs() {
  return useQuery({
    queryKey: ["admin-kpis"],
    queryFn: async () => {
      const [
        revenueRes,
        revenuePrevRes,
        soldRes,
        soldPrevRes,
        activeCarsRes,
        pendingReqRes,
        pendingKycRes,
        reservThisRes,
        reservPrevRes,
      ] = await Promise.all([
        supabase
          .from("participation_requests")
          .select("payment_amount")
          .eq("payment_status", "validated"),
        supabase
          .from("participation_requests")
          .select("payment_amount")
          .eq("payment_status", "validated")
          .lt("created_at", thisMonthStart),
        supabase.from("validated_participations").select("id", { count: "exact", head: true }),
        supabase
          .from("validated_participations")
          .select("id", { count: "exact", head: true })
          .lt("created_at", thisMonthStart),
        supabase.from("cars").select("id", { count: "exact", head: true }).eq("status", "active"),
        supabase
          .from("participation_requests")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase
          .from("kyc_documents")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase
          .from("reservations")
          .select("id", { count: "exact", head: true })
          .gte("start_date", thisMonthStart),
        supabase
          .from("reservations")
          .select("id", { count: "exact", head: true })
          .gte("start_date", lastMonthStart)
          .lt("start_date", thisMonthStart),
      ]);

      const sumAmount = (rows: any[] | null) =>
        (rows ?? []).reduce((s, r) => s + (Number(r.payment_amount) || 0), 0);

      const revenue = sumAmount(revenueRes.data);
      const revenuePrev = sumAmount(revenuePrevRes.data);

      return {
        revenue,
        revenuePrev,
        sold: soldRes.count ?? 0,
        soldPrev: soldPrevRes.count ?? 0,
        activeCars: activeCarsRes.count ?? 0,
        pendingReq: pendingReqRes.count ?? 0,
        pendingKyc: pendingKycRes.count ?? 0,
        reservThis: reservThisRes.count ?? 0,
        reservPrev: reservPrevRes.count ?? 0,
      };
    },
    refetchInterval: 30_000,
  });
}

/* ───────── Chart hook ───────── */

function useWeeklyChart() {
  return useQuery({
    queryKey: ["admin-weekly-chart"],
    queryFn: async () => {
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1).toISOString();
      const { data } = await supabase
        .from("participation_requests")
        .select("created_at")
        .gte("created_at", threeMonthsAgo)
        .order("created_at", { ascending: true });

      const weeks: Record<string, number> = {};
      (data ?? []).forEach((r) => {
        const d = new Date(r.created_at);
        const weekStart = new Date(d);
        weekStart.setDate(d.getDate() - d.getDay());
        const key = weekStart.toISOString().slice(0, 10);
        weeks[key] = (weeks[key] || 0) + 1;
      });

      return Object.entries(weeks)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([week, count]) => ({
          week: new Date(week).toLocaleDateString("es-ES", { day: "2-digit", month: "short" }),
          solicitudes: count,
        }));
    },
  });
}

/* ───────── Latest requests hook ───────── */

function useLatestRequests() {
  return useQuery({
    queryKey: ["admin-latest-requests"],
    queryFn: async () => {
      const { data } = await supabase
        .from("participation_requests")
        .select("id, status, created_at, num_participations, user_id, car_id")
        .order("created_at", { ascending: false })
        .limit(5);

      if (!data?.length) return [];

      const userIds = [...new Set(data.map((r) => r.user_id))];
      const carIds = [...new Set(data.map((r) => r.car_id))];

      const [profilesRes, carsRes] = await Promise.all([
        supabase.from("profiles").select("id, name, surname, email").in("id", userIds),
        supabase.from("cars").select("id, name").in("id", carIds),
      ]);

      const profileMap = Object.fromEntries((profilesRes.data ?? []).map((p) => [p.id, p]));
      const carMap = Object.fromEntries((carsRes.data ?? []).map((c) => [c.id, c]));

      return data.map((r) => ({
        ...r,
        profile: profileMap[r.user_id],
        car: carMap[r.car_id],
      }));
    },
  });
}

/* ───────── Cars by status hook ───────── */

function useCarsStatus() {
  return useQuery({
    queryKey: ["admin-cars-status"],
    queryFn: async () => {
      const { data: cars } = await supabase
        .from("cars")
        .select("id, name, status, remaining_participations, max_participations, location_id")
        .order("name");

      if (!cars?.length) return [];

      const locIds = [...new Set(cars.map((c) => c.location_id).filter(Boolean))];
      const { data: locs } = locIds.length
        ? await supabase.from("locations").select("id, name").in("id", locIds)
        : { data: [] };

      const locMap = Object.fromEntries((locs ?? []).map((l) => [l.id, l.name]));

      return cars.map((c) => ({
        ...c,
        locationName: c.location_id ? locMap[c.location_id] ?? "—" : "—",
      }));
    },
  });
}

/* ───────── Audit logs hook ───────── */

function useRecentLogs() {
  return useQuery({
    queryKey: ["admin-audit-logs"],
    queryFn: async () => {
      const { data } = await supabase
        .from("audit_logs")
        .select("id, action, target_table, created_at, admin_id")
        .order("created_at", { ascending: false })
        .limit(10);

      if (!data?.length) return [];

      const adminIds = [...new Set(data.map((l) => l.admin_id).filter(Boolean))] as string[];
      const { data: profiles } = adminIds.length
        ? await supabase.from("profiles").select("id, name, email").in("id", adminIds)
        : { data: [] };

      const pMap = Object.fromEntries((profiles ?? []).map((p) => [p.id, p]));

      return data.map((l) => ({
        ...l,
        adminName: l.admin_id ? pMap[l.admin_id]?.name ?? pMap[l.admin_id]?.email ?? "Admin" : "Sistema",
      }));
    },
  });
}

/* ───────── Trend indicator ───────── */

const Trend = ({ current, previous }: { current: number; previous: number }) => {
  if (previous === 0 && current === 0) return <span className="text-xs text-muted-foreground flex items-center gap-1"><Minus className="h-3 w-3" /> Sin cambios</span>;
  if (previous === 0) return <span className="text-xs text-green-500 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Nuevo</span>;
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct > 0) return <span className="text-xs text-green-500 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +{pct}%</span>;
  if (pct < 0) return <span className="text-xs text-red-400 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> {pct}%</span>;
  return <span className="text-xs text-muted-foreground flex items-center gap-1"><Minus className="h-3 w-3" /> 0%</span>;
};

/* ───────── Status badge ───────── */

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  scoring: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  approved: "bg-green-500/20 text-green-400 border-green-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  waitlist: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  complete: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  archived: "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  scoring: "En evaluación",
  approved: "Aprobada",
  rejected: "Rechazada",
  waitlist: "Lista de espera",
  active: "Activo",
  complete: "Completo",
  archived: "Archivado",
};

const StatusBadge = ({ status }: { status: string }) => (
  <Badge variant="outline" className={`text-xs ${statusColors[status] ?? ""}`}>
    {statusLabels[status] ?? status}
  </Badge>
);

/* ═══════════ MAIN COMPONENT ═══════════ */

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: kpi, isLoading: kpiLoading } = useKPIs();
  const { data: chartData, isLoading: chartLoading } = useWeeklyChart();
  const { data: latestReqs, isLoading: reqsLoading } = useLatestRequests();
  const { data: carsStatus, isLoading: carsLoading } = useCarsStatus();
  const { data: logs, isLoading: logsLoading } = useRecentLogs();

  const kpiCards = kpi
    ? [
        { icon: DollarSign, label: "Total de ingresos", value: fmtCurrency(kpi.revenue), current: kpi.revenue, previous: kpi.revenuePrev },
        { icon: Users, label: "Participaciones vendidas", value: fmt(kpi.sold), current: kpi.sold, previous: kpi.soldPrev },
        { icon: Car, label: "Vehículos activos", value: fmt(kpi.activeCars), current: kpi.activeCars, previous: kpi.activeCars },
        { icon: FileText, label: "Solicitudes pendientes", value: fmt(kpi.pendingReq), current: kpi.pendingReq, previous: kpi.pendingReq },
        { icon: ShieldCheck, label: "KYC pendientes", value: fmt(kpi.pendingKyc), current: kpi.pendingKyc, previous: kpi.pendingKyc },
        { icon: CalendarDays, label: "Reservas este mes", value: fmt(kpi.reservThis), current: kpi.reservThis, previous: kpi.reservPrev },
      ]
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Vista general de la plataforma OWNEO</p>
      </div>

      {/* SECTION 1 - KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-card border-border/40">
                <CardContent className="p-5">
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))
          : kpiCards.map((k, i) => (
              <Card key={i} className="bg-card border-border/40 hover:border-primary/30 transition-colors">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-2.5">
                    <k.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-2xl font-bold text-foreground truncate">{k.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{k.label}</p>
                    <div className="mt-1">
                      <Trend current={k.current} previous={k.previous} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* SECTION 2 - Chart */}
      <Card className="bg-card border-border/40">
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Solicitudes por semana (últimos 3 meses)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chartLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : chartData && chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    color: "hsl(var(--foreground))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="solicitudes"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-16">No hay datos de solicitudes aún.</p>
          )}
        </CardContent>
      </Card>

      {/* SECTION 3 - Latest requests */}
      <Card className="bg-card border-border/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Últimas solicitudes</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/solicitudes")}>
            Ver todas
          </Button>
        </CardHeader>
        <CardContent>
          {reqsLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : latestReqs && latestReqs.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Participante</TableHead>
                    <TableHead>Vehículo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {latestReqs.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">
                        {r.profile
                          ? `${r.profile.name ?? ""} ${r.profile.surname ?? ""}`.trim() || r.profile.email
                          : "—"}
                      </TableCell>
                      <TableCell>{r.car?.name ?? "—"}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(r.created_at).toLocaleDateString("es-ES")}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={r.status ?? "pending"} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => navigate("/admin/solicitudes")}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-8">No hay solicitudes registradas.</p>
          )}
        </CardContent>
      </Card>

      {/* SECTION 4 - Cars by status */}
      <Card className="bg-card border-border/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Vehículos por estado</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/vehiculos")}>
            Ver todos
          </Button>
        </CardHeader>
        <CardContent>
          {carsLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : carsStatus && carsStatus.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehículo</TableHead>
                    <TableHead>Participaciones</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Ciudad</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {carsStatus.map((c) => {
                    const max = c.max_participations ?? 10;
                    const remaining = c.remaining_participations ?? max;
                    const sold = max - remaining;
                    const pct = max > 0 ? (sold / max) * 100 : 0;
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 min-w-[140px]">
                            <Progress value={pct} className="h-2 flex-1" />
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {sold}/{max}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={c.status ?? "active"} />
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{c.locationName}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/vehiculos")}>
                            <Settings2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-8">No hay vehículos registrados.</p>
          )}
        </CardContent>
      </Card>

      {/* SECTION 5 - Recent activity */}
      <Card className="bg-card border-border/40">
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Actividad reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          {logsLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : logs && logs.length > 0 ? (
            <div className="space-y-3">
              {logs.map((l) => (
                <div key={l.id} className="flex items-start gap-3 py-2 border-b border-border/20 last:border-0">
                  <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                    <Activity className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{l.adminName}</span>{" "}
                      {l.action}
                      {l.target_table && (
                        <span className="text-muted-foreground"> en {l.target_table}</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDistanceToNow(new Date(l.created_at), { addSuffix: true, locale: es })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-8">No hay actividad registrada.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
