import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCars } from "@/hooks/useCars";
import { resolveCarImage } from "@/lib/resolveCarImage";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ChevronDown, ChevronUp, MapPin, Car, AlertCircle } from "lucide-react";

type Location = {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
};

const AdminUbicaciones = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);

  const {
    data: locations = [],
    isLoading: locationsLoading,
    error: locationsError,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("id, name, slug, is_active")
        .order("name");
      if (error) throw error;
      return data as Location[];
    },
  });

  const { data: allCars = [], isLoading: carsLoading } = useCars();

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
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Ubicaciones</h1>
        <p className="text-muted-foreground">
          Gestiona las ciudades activas y los vehículos disponibles por sede.
        </p>
      </div>

      {locationsLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : locations.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            No hay ubicaciones configuradas.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {locations.map((loc) => {
            const carsForCity = allCars.filter((c) => c.locationId === loc.id);
            const isOpen = selectedCityId === loc.id;

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
                        /{loc.slug}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant={loc.is_active ? "default" : "secondary"}>
                        {loc.is_active ? "Activa" : "Inactiva"}
                      </Badge>
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
                      <Car className="h-4 w-4" />
                      <span>
                        {carsForCity.length} vehículo(s) asignado(s)
                      </span>
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
                              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
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
                                  {car.remainingParticipations} / {car.maxParticipations} places
                                </p>
                              </div>
                              <Badge
                                variant={car.status === "active" ? "default" : "secondary"}
                              >
                                {car.status === "active" ? "Activo" : car.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminUbicaciones;
