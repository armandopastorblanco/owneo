import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs as T } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Users, FileCheck, Clock, FileSignature, MapPin, Car as CarIcon, Eye, Upload, Download, ExternalLink } from "lucide-react";
import { resolveCarImage } from "@/lib/resolveCarImage";
import { getSignedUrl } from "@/lib/getSignedUrl";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  useDocumentTypes, useAllParticipantDocuments, useParticipantDocuments,
  uploadParticipantDocument, useUpdateDocumentStatus, getDocStatus,
} from "@/hooks/useDocuments";

const initials = (n?: string, s?: string) =>
  `${(n?.[0] || "").toUpperCase()}${(s?.[0] || "").toUpperCase()}` || "?";

const STATUS_BADGE: Record<string, string> = {
  completo: "bg-emerald-500/20 text-emerald-300",
  pendiente: "bg-amber-500/20 text-amber-300",
  incompleto: "bg-destructive/20 text-destructive",
};

const STATUS_LABEL: Record<string, string> = {
  completo: "Completo", pendiente: "Pendiente", incompleto: "Incompleto",
};

const DOC_STATUS_BADGE: Record<string, string> = {
  validated: "bg-emerald-500/20 text-emerald-300",
  pending: "bg-amber-500/20 text-amber-300",
  rejected: "bg-destructive/20 text-destructive",
  none: "bg-muted text-muted-foreground",
};

const DOC_STATUS_LABEL: Record<string, string> = {
  validated: "Validado", pending: "Pendiente", rejected: "Rechazado", none: "Sin subir",
};

const AdminParticipantes = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [carFilter, setCarFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openUserId, setOpenUserId] = useState<string | null>(null);

  const { data: validated = [], isLoading: l1 } = useQuery({
    queryKey: ["validated_participations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("validated_participations").select("*");
      if (error) throw error;
      return data;
    },
  });

  const userIds = useMemo(() => Array.from(new Set(validated.map((v: any) => v.user_id))), [validated]);
  const carIds = useMemo(() => Array.from(new Set(validated.map((v: any) => v.car_id))), [validated]);

  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles", userIds],
    queryFn: async () => {
      if (!userIds.length) return [];
      const { data, error } = await supabase.from("profiles").select("*").in("id", userIds);
      if (error) throw error;
      return data;
    },
    enabled: userIds.length > 0,
  });

  const { data: cars = [] } = useQuery({
    queryKey: ["cars-participants", carIds],
    queryFn: async () => {
      if (!carIds.length) return [];
      const { data, error } = await supabase.from("cars").select("*").in("id", carIds);
      if (error) throw error;
      return data;
    },
    enabled: carIds.length > 0,
  });

  const { data: locations = [] } = useQuery({
    queryKey: ["locations-all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("locations").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: docTypes = [] } = useDocumentTypes();
  const { data: allDocs = [] } = useAllParticipantDocuments();

  const contractTypeId = useMemo(
    () => docTypes.find((t) => /contrato/i.test(t.name))?.id,
    [docTypes]
  );

  const metrics = useMemo(() => {
    const totalParticipants = userIds.length;
    let completo = 0, pendiente = 0, contratos = 0;
    for (const uid of userIds) {
      const st = getDocStatus(uid as string, docTypes, allDocs);
      if (st === "completo") completo++;
      if (st === "pendiente" || st === "incompleto") {
        const userDocs = allDocs.filter((d) => d.user_id === uid);
        if (userDocs.some((d) => d.status === "pending" && docTypes.find((t) => t.id === d.document_type_id)?.is_required)) {
          pendiente++;
        }
      }
      if (contractTypeId) {
        const c = allDocs.find((d) => d.user_id === uid && d.document_type_id === contractTypeId && d.status === "validated");
        if (c) contratos++;
      }
    }
    return { totalParticipants, completo, pendiente, contratos };
  }, [userIds, docTypes, allDocs, contractTypeId]);

  // Build grouped structure: city -> car -> participants
  const grouped = useMemo(() => {
    const carById = new Map(cars.map((c: any) => [c.id, c]));
    const profById = new Map(profiles.map((p: any) => [p.id, p]));
    const locById = new Map(locations.map((l: any) => [l.id, l]));

    const map = new Map<string, { location: any; cars: Map<string, { car: any; rows: any[] }> }>();

    for (const v of validated as any[]) {
      const car = carById.get(v.car_id);
      const profile = profById.get(v.user_id);
      if (!car || !profile) continue;
      const locId = car.location_id || "sin-ciudad";
      const loc = locById.get(locId) || { id: locId, name: "Sin ciudad" };

      // filters
      if (cityFilter !== "all" && locId !== cityFilter) continue;
      if (carFilter !== "all" && car.id !== carFilter) continue;
      const fullName = `${profile.name || ""} ${profile.surname || ""} ${profile.email || ""}`.toLowerCase();
      if (search && !fullName.includes(search.toLowerCase())) continue;
      const docStatus = getDocStatus(profile.id, docTypes, allDocs);
      if (statusFilter !== "all" && docStatus !== statusFilter) continue;

      if (!map.has(locId)) map.set(locId, { location: loc, cars: new Map() });
      const bucket = map.get(locId)!;
      if (!bucket.cars.has(car.id)) bucket.cars.set(car.id, { car, rows: [] });

      const contractDoc = contractTypeId
        ? allDocs.find((d) => d.user_id === profile.id && d.document_type_id === contractTypeId)
        : null;
      const contractStatus = contractDoc?.status || "none";

      bucket.cars.get(car.id)!.rows.push({
        v, profile, docStatus, contractStatus,
      });
    }
    return map;
  }, [validated, cars, profiles, locations, cityFilter, carFilter, search, statusFilter, docTypes, allDocs, contractTypeId]);

  const carsForCityFilter = useMemo(() => {
    if (cityFilter === "all") return cars;
    return cars.filter((c: any) => c.location_id === cityFilter);
  }, [cars, cityFilter]);

  const isLoading = l1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Participantes</h1>
        <p className="text-muted-foreground text-sm mt-1">Gestión de participantes validados y su documentación.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard icon={Users} label="Total participantes" value={metrics.totalParticipants} />
        <MetricCard icon={FileCheck} label="Doc. completa" value={metrics.completo} tone="emerald" />
        <MetricCard icon={Clock} label="Doc. pendiente" value={metrics.pendiente} tone="amber" />
        <MetricCard icon={FileSignature} label="Contratos firmados" value={metrics.contratos} tone="primary" />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar nombre o email…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={cityFilter} onValueChange={(v) => { setCityFilter(v); setCarFilter("all"); }}>
            <SelectTrigger><SelectValue placeholder="Ciudad" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las ciudades</SelectItem>
              {locations.map((l: any) => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={carFilter} onValueChange={setCarFilter}>
            <SelectTrigger><SelectValue placeholder="Vehículo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los vehículos</SelectItem>
              {carsForCityFilter.map((c: any) => <SelectItem key={c.id} value={c.id}>{c.brand} {c.model}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger><SelectValue placeholder="Estado documentación" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="completo">Completo</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="incompleto">Incompleto</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Grouped list */}
      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : grouped.size === 0 ? (
        <Card><CardContent className="p-12 text-center text-muted-foreground">No hay participantes que coincidan.</CardContent></Card>
      ) : (
        <div className="space-y-8">
          {Array.from(grouped.entries()).map(([locId, { location, cars: carMap }]) => (
            <div key={locId} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/40">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">{location.name}</h2>
              </div>
              {Array.from(carMap.values()).map(({ car, rows }) => (
                <Card key={car.id}>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <img src={resolveCarImage(car?.image_url, car?.brand)} alt={car?.name} loading="lazy" className="h-16 w-24 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{car.brand} {car.model}</h3>
                        <p className="text-xs text-muted-foreground">
                          {(car.max_participations || 10) - (car.remaining_participations || 0)}/{car.max_participations || 10} participaciones
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => window.open(`/car/${car.id}`, "_blank")}>
                        <CarIcon className="h-4 w-4 mr-1" /> Ver vehículo
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="text-xs text-muted-foreground uppercase border-b border-border/40">
                          <tr>
                            <th className="text-left py-2 font-normal">Participante</th>
                            <th className="text-left py-2 font-normal">Email</th>
                            <th className="text-left py-2 font-normal">Tel.</th>
                            <th className="text-left py-2 font-normal">#</th>
                            <th className="text-left py-2 font-normal">Doc.</th>
                            <th className="text-left py-2 font-normal">Créditos</th>
                            <th className="text-left py-2 font-normal">Contrato</th>
                            <th className="text-right py-2 font-normal"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from(
                            rows.reduce((acc: Map<string, any>, r: any) => {
                              const key = r.profile.id;
                              if (!acc.has(key)) {
                                acc.set(key, {
                                  profile: r.profile,
                                  docStatus: r.docStatus,
                                  contractStatus: r.contractStatus,
                                  numbers: [] as number[],
                                  credits_per_year: 0,
                                  credits_used: 0,
                                });
                              }
                              const agg = acc.get(key);
                              agg.numbers.push(r.v.participation_number);
                              agg.credits_per_year += Number(r.v.credits_per_year || 0);
                              agg.credits_used += Number(r.v.credits_used_this_year || 0);
                              return acc;
                            }, new Map()).values()
                          ).map((agg: any) => (
                            <tr key={agg.profile.id} className="border-b border-border/20 hover:bg-muted/30">
                              <td className="py-2">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-7 w-7">
                                    <AvatarFallback className="text-xs bg-primary/20 text-primary">
                                      {initials(agg.profile.name, agg.profile.surname)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{agg.profile.name || "—"} {agg.profile.surname || ""}</span>
                                </div>
                              </td>
                              <td className="py-2 text-muted-foreground">{agg.profile.email}</td>
                              <td className="py-2 text-muted-foreground">{agg.profile.phone || "—"}</td>
                              <td className="py-2">
                                {agg.numbers.length > 1 ? (
                                  <Badge variant="outline" className="text-xs">
                                    {agg.numbers.length}× (#{agg.numbers.sort((a: number, b: number) => a - b).join(", #")})
                                  </Badge>
                                ) : (
                                  <>#{agg.numbers[0]}</>
                                )}
                              </td>
                              <td className="py-2"><Badge className={STATUS_BADGE[agg.docStatus]}>{STATUS_LABEL[agg.docStatus]}</Badge></td>
                              <td className="py-2 text-muted-foreground">
                                {agg.credits_per_year - agg.credits_used} / {agg.credits_per_year}
                              </td>
                              <td className="py-2"><Badge className={DOC_STATUS_BADGE[agg.contractStatus] || DOC_STATUS_BADGE.none}>{DOC_STATUS_LABEL[agg.contractStatus] || "Sin subir"}</Badge></td>
                              <td className="py-2 text-right">
                                <Button variant="ghost" size="sm" onClick={() => setOpenUserId(agg.profile.id)}>
                                  <Eye className="h-4 w-4 mr-1" /> Ver ficha
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      )}

      <ParticipantDrawer
        userId={openUserId}
        onOpenChange={(o) => !o && setOpenUserId(null)}
        validated={validated}
        cars={cars}
        locations={locations}
      />
    </div>
  );
};

const MetricCard = ({ icon: Icon, label, value, tone = "default" }: any) => {
  const toneCls = tone === "emerald" ? "text-emerald-300" : tone === "amber" ? "text-amber-300" : tone === "primary" ? "text-primary" : "text-foreground";
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
          <Icon className={`h-4 w-4 ${toneCls}`} />
        </div>
        <p className={`text-2xl font-bold mt-2 ${toneCls}`}>{value}</p>
      </CardContent>
    </Card>
  );
};

// ============ DRAWER ============
const ParticipantDrawer = ({ userId, onOpenChange, validated, cars, locations }: any) => {
  const open = !!userId;
  const qc = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile-detail", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const userParticipations = (validated as any[]).filter((v) => v.user_id === userId);
  const userCars = userParticipations.map((v) => ({
    v, car: cars.find((c: any) => c.id === v.car_id),
  })).filter((x: any) => x.car);

  const { data: docTypes = [] } = useDocumentTypes();
  const { data: docs = [] } = useParticipantDocuments(userId || undefined);

  const requiredCount = docTypes.filter((t) => t.is_required).length;
  const validatedRequired = docTypes.filter((t) =>
    t.is_required && docs.find((d) => d.document_type_id === t.id && d.status === "validated")
  ).length;

  const [editForm, setEditForm] = useState<any>({});
  // Sync form when profile changes
  useMemo(() => {
    if (profile) setEditForm({
      name: profile.name || "", surname: profile.surname || "",
      phone: profile.phone || "", address: profile.address || "",
      linkedin: profile.linkedin || "", iban: profile.iban || "",
      city_id: profile.city_id || "",
    });
  }, [profile]);

  const saveProfile = async () => {
    const { error } = await supabase.from("profiles").update(editForm).eq("id", userId);
    if (error) return toast.error(error.message);
    await supabase.rpc("insert_audit_log", {
      _action: "update_profile", _target_table: "profiles", _target_id: userId,
      _details: { after: editForm },
    });
    toast.success("Perfil actualizado");
    qc.invalidateQueries({ queryKey: ["profile-detail"] });
  };

  const sendPasswordReset = async () => {
    if (!profile?.email) return toast.error("El usuario no tiene email");
    if (!window.confirm(`¿Enviar email de restablecimiento de contraseña a ${profile.email}?`)) return;
    const { error } = await supabase.auth.resetPasswordForEmail(profile.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) return toast.error(error.message);
    await supabase.rpc("insert_audit_log", {
      _action: "send_password_reset", _target_table: "profiles", _target_id: userId,
      _details: { email: profile.email },
    });
    toast.success("Email de restablecimiento enviado");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-4xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Ficha del participante</SheetTitle>
        </SheetHeader>

        {!profile ? <Skeleton className="h-96 mt-4" /> : (
          <Tabs defaultValue="perfil" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="perfil">Perfil</TabsTrigger>
              <TabsTrigger value="docs">Documentación</TabsTrigger>
              <TabsTrigger value="reservas">Reservas</TabsTrigger>
              <TabsTrigger value="historial">Historial</TabsTrigger>
            </TabsList>

            {/* PERFIL */}
            <TabsContent value="perfil" className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20"><AvatarFallback className="text-xl bg-primary/20 text-primary">
                    {initials(profile.name, profile.surname)}
                  </AvatarFallback></Avatar>
                  <h3 className="mt-3 font-semibold">{profile.name} {profile.surname}</h3>
                  <Badge variant="outline" className="mt-1">{profile.role}</Badge>
                  <p className="text-sm text-muted-foreground mt-1">{profile.email}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Inscrito: {format(new Date(profile.created_at), "d MMM yyyy", { locale: es })}
                  </p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={sendPasswordReset}>
                    Restablecer contraseña
                  </Button>
                </div>
                <div className="border-t border-border/40 pt-4">
                  <p className="text-xs uppercase text-muted-foreground mb-2">Vehículos ({userCars.length})</p>
                  <div className="space-y-2">
                    {userCars.map(({ v, car }: any) => {
                      const loc = locations.find((l: any) => l.id === car.location_id);
                      return (
                        <a key={v.id} href={`/car/${car.id}`} target="_blank" rel="noreferrer"
                          className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                          <div>
                            <p className="text-sm font-medium">{car.brand} {car.model}</p>
                            <p className="text-xs text-muted-foreground">{loc?.name || "—"} · #{v.participation_number}</p>
                          </div>
                          <span className="text-xs text-primary">
                            {Number(v.credits_per_year || 0) - Number(v.credits_used_this_year || 0)} cr.
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Field label="Nombre"><Input value={editForm.name || ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} /></Field>
                <Field label="Apellidos"><Input value={editForm.surname || ""} onChange={(e) => setEditForm({ ...editForm, surname: e.target.value })} /></Field>
                <Field label="Teléfono"><Input value={editForm.phone || ""} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} /></Field>
                <Field label="Dirección"><Input value={editForm.address || ""} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} /></Field>
                <Field label="LinkedIn"><Input value={editForm.linkedin || ""} onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })} /></Field>
                <Field label="IBAN"><Input value={editForm.iban || ""} onChange={(e) => setEditForm({ ...editForm, iban: e.target.value })} /></Field>
                <Field label="Ciudad de residencia">
                  <Select value={editForm.city_id || ""} onValueChange={(v) => setEditForm({ ...editForm, city_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Selecciona ciudad" /></SelectTrigger>
                    <SelectContent>
                      {locations.map((l: any) => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Button onClick={saveProfile} className="w-full">Guardar cambios</Button>
              </div>
            </TabsContent>

            {/* DOCUMENTACIÓN */}
            <TabsContent value="docs" className="mt-4 space-y-4">
              <Card><CardContent className="p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Documentos obligatorios validados</span>
                  <span className="font-semibold">{validatedRequired}/{requiredCount}</span>
                </div>
                <Progress value={requiredCount ? (validatedRequired / requiredCount) * 100 : 0} />
              </CardContent></Card>

              {docTypes.map((t) => {
                const doc = docs.find((d) => d.document_type_id === t.id);
                return <DocRow key={t.id} type={t} doc={doc} userId={userId} />;
              })}
            </TabsContent>

            {/* RESERVAS */}
            <TabsContent value="reservas" className="mt-4 space-y-4">
              {userCars.map(({ v, car }: any) => (
                <ReservasBlock key={v.id} validated={v} car={car} userId={userId} />
              ))}
              {userCars.length === 0 && <p className="text-sm text-muted-foreground">Sin participaciones validadas.</p>}
            </TabsContent>

            {/* HISTORIAL */}
            <TabsContent value="historial" className="mt-4">
              <HistorialTab userId={userId} />
            </TabsContent>
          </Tabs>
        )}
      </SheetContent>
    </Sheet>
  );
};

const Field = ({ label, children }: any) => (
  <div><Label className="text-xs uppercase text-muted-foreground">{label}</Label>{children}</div>
);

const DocRow = ({ type, doc, userId }: any) => {
  const upd = useUpdateDocumentStatus();
  const [status, setStatus] = useState(doc?.status || "pending");
  const [notes, setNotes] = useState(doc?.notes || "");
  const [uploading, setUploading] = useState(false);

  const handleViewDocument = async () => {
    const url = await getSignedUrl(doc.file_url, 300);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    else toast.error("No se pudo acceder al documento. Inténtalo de nuevo.");
  };

  const handleDownloadDocument = async () => {
    const signed = await getSignedUrl(doc.file_url, 60);
    if (!signed) {
      toast.error("No se pudo descargar el documento.");
      return;
    }

    try {
      const res = await fetch(signed);
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = doc.file_name || "documento";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      toast.error("No se pudo descargar el documento.");
    }
  };

  const onFile = async (f: File) => {
    if (f.size > 10 * 1024 * 1024) return toast.error("Máx. 10MB");
    setUploading(true);
    try {
      await uploadParticipantDocument({ userId, documentTypeId: type.id, file: f, uploadedBy: "admin" });
      toast.success("Documento subido");
      window.location.reload();
    } catch (e: any) { toast.error(e.message); }
    setUploading(false);
  };

  return (
    <Card><CardContent className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">{type.name}</h4>
          <Badge variant="outline" className="text-xs mt-1">
            {type.is_required ? "Obligatorio" : "Opcional"}
          </Badge>
        </div>
        <Badge className={DOC_STATUS_BADGE[doc?.status || "none"]}>{DOC_STATUS_LABEL[doc?.status || "none"]}</Badge>
      </div>

      {doc ? (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            {doc.file_name} · subido por {doc.uploaded_by} · {format(new Date(doc.created_at), "d MMM yyyy", { locale: es })}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleViewDocument}>
              <ExternalLink className="h-3 w-3 mr-1" /> Ver
            </Button>
            <Button size="sm" variant="outline" onClick={handleDownloadDocument}>
              <Download className="h-3 w-3 mr-1" />Descargar
            </Button>
            <label className="cursor-pointer">
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.webp"
                onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
              <Button size="sm" variant="outline" asChild disabled={uploading}><span><Upload className="h-3 w-3 mr-1" />Reemplazar</span></Button>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="validated">Validado</SelectItem>
                <SelectItem value="rejected">Rechazado</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" onClick={() => {
              if (status === "rejected" && !notes.trim()) return toast.error("Notas obligatorias para rechazo");
              upd.mutate({ id: doc.id, status, notes });
            }}>Guardar</Button>
          </div>
          <Textarea placeholder="Notas (obligatorio si rechazado)" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      ) : (
        <label className="block border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/40">
          <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.webp"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
          <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm">{uploading ? "Subiendo…" : "Arrastra o haz clic para subir (PDF, JPG, PNG · máx 10MB)"}</p>
        </label>
      )}
    </CardContent></Card>
  );
};

const ReservasBlock = ({ validated, car, userId }: any) => {
  const { data: reservas = [] } = useQuery({
    queryKey: ["reservations-user-car", userId, car.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("reservations").select("*")
        .eq("user_id", userId).eq("car_id", car.id).order("start_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const used = Number(validated.credits_used_this_year || 0);
  const total = Number(validated.credits_per_year || 0);
  const remaining = total - used;
  return (
    <Card><CardContent className="p-4 space-y-3">
      <div className="flex justify-between">
        <div>
          <h4 className="font-semibold">{car.brand} {car.model}</h4>
        </div>
        <span className="text-sm">{remaining} / {total} créditos</span>
      </div>
      <Progress value={total ? (used / total) * 100 : 0} />
      {validated.credits_reset_date && (
        <p className="text-xs text-muted-foreground">Reset: {format(new Date(validated.credits_reset_date), "d MMM yyyy", { locale: es })}</p>
      )}
      {reservas.length > 0 && (
        <table className="w-full text-xs">
          <thead><tr className="text-muted-foreground"><th className="text-left py-1">Inicio</th><th className="text-left">Fin</th><th className="text-left">Cr.</th><th className="text-left">Estado</th></tr></thead>
          <tbody>{reservas.map((r: any) => (
            <tr key={r.id} className="border-t border-border/20"><td className="py-1">{r.start_date}</td><td>{r.end_date}</td><td>{r.credits_used}</td><td>{r.status}</td></tr>
          ))}</tbody>
        </table>
      )}
    </CardContent></Card>
  );
};

const HistorialTab = ({ userId }: { userId: string }) => {
  const { data: logs = [] } = useQuery({
    queryKey: ["audit-user", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("audit_logs").select("*")
        .eq("target_id", userId).order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      return data;
    },
  });
  if (!logs.length) return <p className="text-sm text-muted-foreground">Sin acciones registradas.</p>;
  return (
    <div className="space-y-2">
      {logs.map((l: any) => (
        <Card key={l.id}><CardContent className="p-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium">{l.action}</p>
              <p className="text-xs text-muted-foreground">{l.target_table}</p>
            </div>
            <span className="text-xs text-muted-foreground">{format(new Date(l.created_at), "d MMM HH:mm", { locale: es })}</span>
          </div>
          {l.details && <pre className="text-xs mt-2 p-2 bg-muted/30 rounded overflow-x-auto">{JSON.stringify(l.details, null, 2)}</pre>}
        </CardContent></Card>
      ))}
    </div>
  );
};

export default AdminParticipantes;
