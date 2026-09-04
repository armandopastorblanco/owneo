import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCars } from "@/hooks/useCars";
import { resolveCarImage } from "@/lib/resolveCarImage";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Car,
  AlertCircle,
  ExternalLink,
  Pencil,
  Save,
  Plus,
  Trash2,
} from "lucide-react";

type Location = {
  id: string;
  name: string;
  slug: string | null;
  is_active: boolean;
  image_url: string | null;
  description: string | null;
  sort_order: number;
};

type EditingState = {
  image_url: string;
  description: string;
};

type NewCityForm = {
  name: string;
  slug: string;
  description: string;
  image_url: string;
};

const autoSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const AdminUbicaciones = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [reorderingId, setReorderingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<EditingState>({ image_url: "", description: "" });
  const [savingId, setSavingId] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCity, setNewCity] = useState<NewCityForm>({
    name: "",
    slug: "",
    description: "",
    image_url: "",
  });
  const [addingCity, setAddingCity] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<Location | null>(null);
  const [deletingCity, setDeletingCity] = useState(false);

  const {
    data: locations = [],
    isLoading: locationsLoading,
    error: locationsError,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("id, name, slug, is_active, image_url, description, sort_order")
        .order("sort_order");
      if (error) throw error;
      return data as Location[];
    },
  });

  const { data: allCars = [], isLoading: carsLoading } = useCars();

  const sortedLocations = [...locations].sort((a, b) => a.sort_order - b.sort_order);

  const handleToggle = async (loc: Location) => {
    setTogglingId(loc.id);
    const { error } = await supabase
      .from("locations")
      .update({ is_active: !loc.is_active })
      .eq("id", loc.id);
    setTogglingId(null);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast({
        title: loc.is_active ? "Ciudad desactivada" : "Ciudad activada",
        description: loc.is_active
          ? `${loc.name} ya no es visible en el sitio.`
          : `${loc.name} ahora está visible en el sitio.`,
      });
    }
  };

  const handleReorder = async (locId: string, direction: "up" | "down") => {
    const sorted = [...locations].sort((a, b) => a.sort_order - b.sort_order);
    const idx = sorted.findIndex((l) => l.id === locId);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const current = sorted[idx];
    const neighbor = sorted[swapIdx];
    setReorderingId(locId);
    await supabase.from("locations").update({ sort_order: neighbor.sort_order }).eq("id", current.id);
    await supabase.from("locations").update({ sort_order: current.sort_order }).eq("id", neighbor.id);
    setReorderingId(null);
    queryClient.invalidateQueries({ queryKey: ["locations"] });
  };

  const handleSaveEdit = async (locId: string) => {
    setSavingId(locId);
    const { error } = await supabase
      .from("locations")
      .update({
        image_url: editDraft.image_url || null,
        description: editDraft.description || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", locId);
    setSavingId(null);
    if (error) {
      toast({ title: "Error al guardar", description: error.message, variant: "destructive" });
    } else {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast({
        title: "Ciudad actualizada",
        description: "Los cambios se han guardado correctamente.",
      });
    }
  };

  const handleAddCity = async () => {
    if (!newCity.name.trim() || !newCity.slug.trim()) return;
    setAddingCity(true);
    const maxOrder =
      locations.length > 0 ? Math.max(...locations.map((l) => l.sort_order)) + 1 : 1;
    const { error } = await supabase.from("locations").insert({
      name: newCity.name.trim(),
      slug: newCity.slug.trim(),
      description: newCity.description.trim() || null,
      image_url: newCity.image_url.trim() || null,
      is_active: false,
      sort_order: maxOrder,
    });
    setAddingCity(false);
    if (error) {
      toast({ title: "Error al crear", description: error.message, variant: "destructive" });
    } else {
      setShowAddDialog(false);
      toast({
        title: "Ciudad creada",
        description: `${newCity.name} se ha creado como inactiva. Actívala cuando esté lista.`,
      });
      setNewCity({ name: "", slug: "", description: "", image_url: "" });
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    }
  };

  const handleDeleteCity = async () => {
    if (!cityToDelete) return;
    setDeletingCity(true);
    const { error } = await supabase.from("locations").delete().eq("id", cityToDelete.id);
    setDeletingCity(false);
    if (error) {
      toast({ title: "Error al eliminar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Ciudad eliminada", description: `${cityToDelete.name} ha sido eliminada.` });
      setCityToDelete(null);
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    }
  };

  if (locationsError) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {(locationsError as Error)?.message || "No se pudieron cargar las ubicaciones."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Ubicaciones</h1>
          <p className="text-muted-foreground">
            Gestiona las ciudades activas y los vehículos disponibles por sede.
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" /> Nueva ciudad
        </Button>
      </div>

      {locationsLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : sortedLocations.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            No hay ubicaciones configuradas.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sortedLocations.map((loc, index) => {
            const carsForCity = allCars.filter((c) => c.locationId === loc.id);
            const isOpen = selectedCityId === loc.id;
            const isEditing = editingId === loc.id;

            return (
              <Card key={loc.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-lg font-semibold truncate">{loc.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        /{loc.slug ?? ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={loc.is_active ? "default" : "secondary"}>
                        {loc.is_active ? "Activa" : "Inactiva"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        asChild
                        title="Ver en el sitio"
                      >
                        <a
                          href={`/ubicaciones/${loc.slug ?? ""}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver ${loc.name} en el sitio`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      {togglingId === loc.id ? (
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      ) : (
                        <Switch
                          checked={loc.is_active}
                          onCheckedChange={() => handleToggle(loc)}
                          disabled={togglingId !== null}
                          aria-label={`Alternar visibilidad de ${loc.name}`}
                        />
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleReorder(loc.id, "up")}
                        disabled={index === 0 || reorderingId !== null}
                        aria-label={`Subir ${loc.name}`}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleReorder(loc.id, "down")}
                        disabled={index === sortedLocations.length - 1 || reorderingId !== null}
                        aria-label={`Bajar ${loc.name}`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Car className="h-4 w-4" />
                      <span>{carsForCity.length} vehículo(s) asignado(s)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedCityId(isOpen ? null : loc.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Ver vehículos
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t animate-in fade-in slide-in-from-top-2 duration-200">
                      {carsLoading ? (
                        <div className="space-y-3">
                          {Array.from({ length: 2 }).map((_, i) => (
                            <Skeleton key={i} className="h-14 w-full rounded-lg" />
                          ))}
                        </div>
                      ) : carsForCity.length === 0 ? (
                        <p className="text-center text-sm text-muted-foreground py-6">
                          Sin vehículos asignados a esta ciudad.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {carsForCity.map((car) => (
                            <div
                              key={car.id}
                              onClick={() => navigate(`/admin/vehiculos/${car.id}`)}
                              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                            >
                              <img
                                src={resolveCarImage(car.image, car.brand)}
                                alt={car.name}
                                className="w-12 h-12 rounded-md object-cover shrink-0 bg-background"
                                loading="lazy"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium truncate">
                                  {car.brand} {car.model}
                                  {car.year ? ` (${car.year})` : ""}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {car.remainingParticipations} / {car.maxParticipations} plazas
                                </p>
                              </div>
                              <Badge variant={car.status === "active" ? "default" : "secondary"}>
                                {car.status === "active" ? "Activo" : car.status}
                              </Badge>
                              <ExternalLink className="w-3 h-3 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t">
                    {!isEditing ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingId(loc.id);
                          setEditDraft({
                            image_url: loc.image_url ?? "",
                            description: loc.description ?? "",
                          });
                        }}
                      >
                        <Pencil className="w-3 h-3 mr-1" /> Editar ciudad
                      </Button>
                    ) : (
                      <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        {editDraft.image_url && (
                          <div className="rounded-lg overflow-hidden bg-muted">
                            <img
                              src={editDraft.image_url}
                              alt={loc.name}
                              className="w-full h-40 object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          </div>
                        )}

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-muted-foreground">
                            URL de la imagen
                          </label>
                          <Input
                            value={editDraft.image_url}
                            onChange={(e) =>
                              setEditDraft((d) => ({ ...d, image_url: e.target.value }))
                            }
                            placeholder="https://..."
                            className="text-sm"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-muted-foreground">
                            Descripción (ES)
                          </label>
                          <Textarea
                            value={editDraft.description}
                            onChange={(e) =>
                              setEditDraft((d) => ({ ...d, description: e.target.value }))
                            }
                            placeholder="Descripción de la ciudad..."
                            rows={3}
                            className="text-sm resize-none"
                          />
                        </div>

                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive mr-auto"
                            onClick={() => setCityToDelete(loc)}
                            disabled={savingId === loc.id || carsForCity.length > 0}
                            title={
                              carsForCity.length > 0
                                ? "No se puede eliminar: hay vehículos asignados"
                                : "Eliminar ciudad"
                            }
                          >
                            <Trash2 className="w-3 h-3 mr-1" /> Eliminar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingId(null)}
                            disabled={savingId === loc.id}
                          >
                            Cancelar
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(loc.id)}
                            disabled={savingId === loc.id}
                          >
                            {savingId === loc.id ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin mr-1" /> Guardando...
                              </>
                            ) : (
                              <>
                                <Save className="w-3 h-3 mr-1" /> Guardar
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog
        open={showAddDialog}
        onOpenChange={(open) => {
          if (!open) {
            setShowAddDialog(false);
            setNewCity({ name: "", slug: "", description: "", image_url: "" });
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva ciudad</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Nombre *</label>
              <Input
                value={newCity.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setNewCity((f) => ({ ...f, name, slug: autoSlug(name) }));
                }}
                placeholder="Ej: Sevilla"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Slug *</label>
              <Input
                value={newCity.slug}
                onChange={(e) => setNewCity((f) => ({ ...f, slug: e.target.value }))}
                placeholder="ej: sevilla"
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                URL pública: /ubicaciones/{newCity.slug || "..."}
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                URL de la imagen
              </label>
              <Input
                value={newCity.image_url}
                onChange={(e) => setNewCity((f) => ({ ...f, image_url: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Descripción</label>
              <Textarea
                value={newCity.description}
                onChange={(e) => setNewCity((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                placeholder="Descripción breve de la ciudad..."
                className="resize-none text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAddDialog(false)} disabled={addingCity}>
              Cancelar
            </Button>
            <Button
              onClick={handleAddCity}
              disabled={!newCity.name.trim() || !newCity.slug.trim() || addingCity}
            >
              {addingCity ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin mr-1" /> Creando...
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3 mr-1" /> Crear ciudad
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!cityToDelete}
        onOpenChange={(open) => {
          if (!open) setCityToDelete(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar {cityToDelete?.name}?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Esta acción es irreversible. La ciudad será eliminada permanentemente del sistema.
            Asegúrate de que no haya vehículos ni usuarios asignados.
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCityToDelete(null)} disabled={deletingCity}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteCity} disabled={deletingCity}>
              {deletingCity ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin mr-1" /> Eliminando...
                </>
              ) : (
                <>
                  <Trash2 className="w-3 h-3 mr-1" /> Eliminar definitivamente
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUbicaciones;
