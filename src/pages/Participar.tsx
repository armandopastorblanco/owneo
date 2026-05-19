import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useCars, useCar, type Car } from "@/hooks/useCars";
import { useLocations } from "@/hooks/useLocations";
import { useAnalytics } from "@/hooks/useAnalytics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EvaluationQuestionnaire from "@/components/EvaluationQuestionnaire";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
} from "lucide-react";

const DRAFT_KEY = "owneo_participation_draft";

type Step = 0 | 1 | 2 | 3 | 4;

interface Draft {
  step: Step;
  carId?: string;
  cityId?: string;
  personal?: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    address?: string;
    linkedin?: string;
    cityId: string;
    numParticipations: number;
  };
  answers?: Record<string, string>;
}

const loadDraft = (): Draft => {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : { step: 0 };
  } catch {
    return { step: 0 };
  }
};

const saveDraft = (draft: Draft) => {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* ignore */
  }
};

const clearDraft = () => {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
};

// ============== STEP 0 — Vehicle selection ==============

const Step0VehicleSelection = ({
  initialCarId,
  onConfirm,
}: {
  initialCarId?: string;
  onConfirm: (car: Car) => void;
}) => {
  const { data: cars = [], isLoading: carsLoading } = useCars();
  const { data: locations = [], isLoading: locsLoading } = useLocations();
  const { data: initialCar } = useCar(initialCarId);

  const [selectedCityId, setSelectedCityId] = useState<string | undefined>();
  const [selectedCarId, setSelectedCarId] = useState<string | undefined>(initialCarId);

  // Map db location_id -> city name (cars use availableIn = string[] of city names)
  const cityById = useMemo(() => {
    const m = new Map<string, string>();
    locations.forEach((l) => m.set(l.id, l.name));
    return m;
  }, [locations]);

  const availableCars = useMemo(() => {
    return cars.filter(
      (c) => c.status === "active" && c.remainingParticipations > 0
    );
  }, [cars]);

  const carsInCity = useMemo(() => {
    if (!selectedCityId) return [];
    const cityName = cityById.get(selectedCityId);
    if (!cityName) return [];
    return availableCars.filter((c) => c.availableIn?.includes(cityName));
  }, [selectedCityId, cityById, availableCars]);



  // Context A: came with carId — show summary + alternative cities for same brand+model
  if (initialCarId && initialCar) {
    const sameModelCars = availableCars.filter(
      (c) => c.brand === initialCar.brand && c.model === initialCar.model
    );
    const otherCities = sameModelCars.filter((c) => c.id !== initialCar.id);
    const currentCar = cars.find((c) => c.id === selectedCarId) || initialCar;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Vehículo seleccionado</h2>

        <Card className="bg-card border-border overflow-hidden">
          <div className="aspect-video relative bg-muted">
            <img
              src={currentCar.image}
              alt={currentCar.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-5 space-y-3">
            <h3 className="text-xl font-semibold text-foreground">{currentCar.name}</h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4" />
              <span>{currentCar.availableIn?.join(", ") || "Ubicación no especificada"}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-border">
              <span className="text-muted-foreground text-sm">Precio por participación</span>
              <span className="text-lg font-bold text-foreground">
                {currentCar.participationPrice.toLocaleString("es-ES")}€
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Participaciones disponibles</span>
              <span className="text-foreground">{currentCar.remainingParticipations}</span>
            </div>
          </CardContent>
        </Card>

        {otherCities.length > 0 && (
          <div className="space-y-2">
            <Label className="text-foreground">¿Prefieres otra ciudad?</Label>
            <Select
              value={selectedCarId || initialCar.id}
              onValueChange={(v) => setSelectedCarId(v)}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value={initialCar.id}>
                  {initialCar.availableIn?.[0] || "Ciudad principal"}
                </SelectItem>
                {otherCities.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.availableIn?.[0] || c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button
          onClick={() => onConfirm(currentCar)}
          className="w-full bg-foreground text-background hover:bg-foreground/90"
          size="lg"
        >
          Continuar <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  // Context B: no preselected car


  if (carsLoading || locsLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const selectedCar = cars.find((c) => c.id === selectedCarId);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Selecciona un vehículo</h2>

      <div className="space-y-2">
        <Label className="text-foreground">Ciudad</Label>
        <Select
          value={selectedCityId}
          onValueChange={(v) => {
            setSelectedCityId(v);
            setSelectedCarId(undefined);
          }}
        >
          <SelectTrigger className="bg-background border-border">
            <SelectValue placeholder="Selecciona una ciudad" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {locations.map((l) => (
              <SelectItem key={l.id} value={l.id}>
                {l.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCityId && (
        <div className="space-y-3">
          <Label className="text-foreground">Vehículos disponibles</Label>
          {carsInCity.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No hay vehículos disponibles en esta ciudad.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {carsInCity.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCarId(c.id)}
                  className={`text-left rounded-lg border-2 transition-all overflow-hidden ${
                    selectedCarId === c.id
                      ? "border-foreground"
                      : "border-border hover:border-foreground/40"
                  }`}
                >
                  <div className="aspect-video bg-muted">
                    <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 space-y-1 bg-card">
                    <h4 className="font-semibold text-foreground text-sm">{c.name}</h4>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        {c.remainingParticipations} disp.
                      </span>
                      <span className="text-foreground font-semibold">
                        {c.participationPrice.toLocaleString("es-ES")}€
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <Button
        onClick={() => selectedCar && onConfirm(selectedCar)}
        disabled={!selectedCar}
        className="w-full bg-foreground text-background hover:bg-foreground/90"
        size="lg"
      >
        Confirmar selección <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

// ============== STEP 1 — Personal info ==============

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const personalSchemaGuest = z
  .object({
    name: z.string().trim().min(2),
    surname: z.string().trim().min(2),
    email: z.string().trim().email(),
    password: z.string().regex(passwordRegex),
    confirmPassword: z.string(),
    phone: z.string().trim().min(6),
    address: z.string().trim().optional().or(z.literal("")),
    linkedin: z.string().trim().optional().or(z.literal("")),
    cityId: z.string().min(1),
    numParticipations: z.number().int().min(1),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

const Step1PersonalInfo = ({
  car,
  onBack,
  onComplete,
}: {
  car: Car;
  onBack: () => void;
  onComplete: (data: Draft["personal"]) => void;
}) => {
  const { user } = useAuth();
  const { data: locations = [] } = useLocations();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profileLoaded, setProfileLoaded] = useState(false);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    linkedin: "",
    cityId: "",
    numParticipations: 1,
  });

  // Pre-select city based on car.availableIn[0] matching a location name
  useEffect(() => {
    if (!form.cityId && locations.length && car.availableIn?.[0]) {
      const match = locations.find((l) => l.name === car.availableIn[0]);
      if (match) setForm((f) => ({ ...f, cityId: match.id }));
    }
  }, [locations, car, form.cityId]);

  // Pre-fill from profile if logged in
  useEffect(() => {
    if (!user || profileLoaded) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("name, surname, email, phone, address, linkedin, city_id")
        .eq("id", user.id)
        .maybeSingle();
      if (data) {
        setForm((f) => ({
          ...f,
          name: data.name || "",
          surname: data.surname || "",
          email: data.email || user.email || "",
          phone: data.phone || "",
          address: data.address || "",
          linkedin: data.linkedin || "",
          cityId: data.city_id || f.cityId,
        }));
      } else if (user.email) {
        setForm((f) => ({ ...f, email: user.email || "" }));
      }
      setProfileLoaded(true);
    })();
  }, [user, profileLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate
      if (!form.name.trim() || !form.surname.trim() || !form.phone.trim()) {
        toast({ title: "Faltan campos obligatorios", variant: "destructive" });
        setLoading(false);
        return;
      }
      if (!form.cityId) {
        toast({ title: "Selecciona una ciudad", variant: "destructive" });
        setLoading(false);
        return;
      }
      if (form.numParticipations < 1 || form.numParticipations > car.remainingParticipations) {
        toast({
          title: "Número de participaciones inválido",
          description: `Entre 1 y ${car.remainingParticipations}`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (!user) {
        // Guest flow — sign up
        const parsed = personalSchemaGuest.safeParse(form);
        if (!parsed.success) {
          const first = parsed.error.errors[0];
          toast({
            title: "Datos inválidos",
            description: first.message || "Revisa el formulario",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: form.email.trim(),
          password: form.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { name: form.name.trim(), surname: form.surname.trim() },
          },
        });
        if (signUpError) {
          toast({
            title: "Error al crear la cuenta",
            description: signUpError.message,
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        // Try to ensure session: signIn if not auto-confirmed session
        if (!signUpData.session) {
          await supabase.auth.signInWithPassword({
            email: form.email.trim(),
            password: form.password,
          });
        }

        const { data: { user: newUser } } = await supabase.auth.getUser();
        if (newUser) {
          await supabase.from("profiles").upsert(
            {
              id: newUser.id,
              name: form.name.trim(),
              surname: form.surname.trim(),
              email: form.email.trim(),
              phone: form.phone.trim(),
              address: form.address?.trim() || null,
              linkedin: form.linkedin?.trim() || null,
              city_id: form.cityId,
              kyc_status: "pending",
              role: "user",
            },
            { onConflict: "id" }
          );
        }
      } else {
        // Logged-in: just update profile
        await supabase
          .from("profiles")
          .upsert(
            {
              id: user.id,
              name: form.name.trim(),
              surname: form.surname.trim(),
              email: form.email.trim() || user.email || "",
              phone: form.phone.trim(),
              address: form.address?.trim() || null,
              linkedin: form.linkedin?.trim() || null,
              city_id: form.cityId,
            },
            { onConflict: "id" }
          );
      }

      onComplete({
        name: form.name.trim(),
        surname: form.surname.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address?.trim() || undefined,
        linkedin: form.linkedin?.trim() || undefined,
        cityId: form.cityId,
        numParticipations: form.numParticipations,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Inténtalo de nuevo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const maxParts = car.remainingParticipations;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-foreground">Información personal</h2>

      {!user && (
        <p className="text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link to={`/login?redirect=/participar?carId=${car.id}`} className="text-champagne hover:underline">
            Inicia sesión
          </Link>
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">Nombre *</Label>
          <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="surname" className="text-foreground">Apellidos *</Label>
          <Input id="surname" value={form.surname} onChange={(e) => update("surname", e.target.value)} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">Email *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            readOnly={!!user}
            className="pl-10"
          />
        </div>
      </div>

      {!user && (
        <>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Contraseña *</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPwd ? "text" : "password"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required
                minLength={8}
                placeholder="Min 8, 1 mayúscula, 1 número"
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground">Confirmar contraseña *</Label>
            <Input
              id="confirmPassword"
              type={showPwd ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              required
              minLength={8}
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-foreground">Teléfono *</Label>
        <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-foreground">Dirección</Label>
        <Input id="address" value={form.address} onChange={(e) => update("address", e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin" className="text-foreground">LinkedIn</Label>
        <Input
          id="linkedin"
          value={form.linkedin}
          onChange={(e) => update("linkedin", e.target.value)}
          placeholder="https://linkedin.com/in/tu-perfil"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Ciudad de preferencia *</Label>
        <Select value={form.cityId} onValueChange={(v) => update("cityId", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una ciudad" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            {locations.map((l) => (
              <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="numParticipations" className="text-foreground">
          Número de participaciones * (máx. {maxParts})
        </Label>
        <Input
          id="numParticipations"
          type="number"
          min={1}
          max={maxParts}
          value={form.numParticipations}
          onChange={(e) =>
            update(
              "numParticipations",
              Math.min(maxParts, Math.max(1, parseInt(e.target.value, 10) || 1))
            )
          }
          required
        />
        <p className="text-xs text-muted-foreground">
          Total: {(form.numParticipations * car.participationPrice).toLocaleString("es-ES")}€
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-foreground text-background hover:bg-foreground/90"
        >
          {loading ? "Procesando..." : (
            <>Continuar <ArrowRight className="w-4 h-4 ml-2" /></>
          )}
        </Button>
      </div>
    </form>
  );
};

// ============== STEP 3 — Summary ==============

const Step3Summary = ({
  car,
  personal,
  answers,
  onBack,
  onConfirm,
  loading,
}: {
  car: Car;
  personal: NonNullable<Draft["personal"]>;
  answers: Record<string, string>;
  onBack: () => void;
  onConfirm: () => void;
  loading: boolean;
}) => {
  const total = car.participationPrice * personal.numParticipations;
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Resumen y confirmación</h2>

      <Card className="bg-card border-border overflow-hidden">
        <div className="aspect-video bg-muted">
          <img src={car.image} alt={car.name} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <CardContent className="p-5 space-y-2">
          <h3 className="font-semibold text-foreground">{car.name}</h3>
          <p className="text-sm text-muted-foreground">{car.availableIn?.join(", ")}</p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5 space-y-2 text-sm">
          <h3 className="font-semibold text-foreground mb-2">Información personal</h3>
          <div className="flex justify-between"><span className="text-muted-foreground">Nombre</span><span className="text-foreground">{personal.name} {personal.surname}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="text-foreground">{personal.email}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Teléfono</span><span className="text-foreground">{personal.phone}</span></div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5 space-y-2 text-sm">
          <h3 className="font-semibold text-foreground mb-2">Participación</h3>
          <div className="flex justify-between"><span className="text-muted-foreground">Participaciones</span><span className="text-foreground">{personal.numParticipations}</span></div>
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="text-muted-foreground">Total</span>
            <span className="text-xl font-bold text-foreground">{total.toLocaleString("es-ES")}€</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5 space-y-2 text-sm">
          <h3 className="font-semibold text-foreground mb-2">Cuestionario</h3>
          <p className="text-muted-foreground">{Object.keys(answers).length} respuestas registradas</p>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 bg-foreground text-background hover:bg-foreground/90"
        >
          {loading ? "Enviando..." : "Confirmar solicitud"}
        </Button>
      </div>
    </div>
  );
};

// ============== Main page ==============

const Participar = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const carIdFromUrl = params.get("carId") || undefined;
  const { user, loading: authLoading } = useAuth();
  const { trackEvent } = useAnalytics();

  const [draft, setDraftState] = useState<Draft>(() => {
    const d = loadDraft();
    if (carIdFromUrl && d.carId !== carIdFromUrl) {
      return { step: 0, carId: carIdFromUrl };
    }
    return d.carId || carIdFromUrl ? { ...d, carId: d.carId || carIdFromUrl } : d;
  });

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    trackEvent("begin_checkout", {
      car_id: carIdFromUrl,
      source: carIdFromUrl ? "from_car_detail" : "direct",
    });
  }, []);

  useEffect(() => {
    saveDraft(draft);
  }, [draft]);

  // Restore selected car if draft has carId
  const { data: draftCar } = useCar(draft.carId);
  useEffect(() => {
    if (draftCar && !selectedCar) setSelectedCar(draftCar);
  }, [draftCar, selectedCar]);

  const setStep = (s: Step) => setDraftState((d) => ({ ...d, step: s }));

  const handleStep0 = (car: Car) => {
    setSelectedCar(car);
    setDraftState((d) => ({ ...d, carId: car.id, step: 1 }));
    trackEvent("select_vehicle", {
      car_name: car.name,
      car_brand: car.brand,
      car_id: car.id,
      city_name: car.availableIn?.[0],
      participation_price: car.participationPrice,
    });
  };

  const handleStep1 = (personal: Draft["personal"]) => {
    setDraftState((d) => ({ ...d, personal, step: 2 }));
    trackEvent("checkout_progress_step3", {
      car_name: selectedCar?.name,
      car_id: selectedCar?.id,
      num_participations: personal?.numParticipations,
      total_amount:
        (selectedCar?.participationPrice ?? 0) *
        (personal?.numParticipations ?? 1),
    });
  };

  const handleQuestionnaireComplete = () => {
    // Read latest answers from sessionStorage saved by EvaluationQuestionnaire
    if (!selectedCar) return;
    try {
      const raw = sessionStorage.getItem(`owneo:questionnaire:${selectedCar.id}`);
      const answers = raw ? JSON.parse(raw) : {};
      setDraftState((d) => ({ ...d, answers, step: 3 }));
      trackEvent("checkout_progress_step4", {
        car_name: selectedCar?.name,
        car_id: selectedCar?.id,
      });
    } catch {
      setDraftState((d) => ({ ...d, answers: {}, step: 3 }));
    }
  };

  const handleFinalSubmit = async () => {
    if (!selectedCar || !draft.personal) return;
    setSubmitting(true);
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        toast({ title: "Sesión expirada", description: "Inicia sesión de nuevo", variant: "destructive" });
        setSubmitting(false);
        return;
      }
      const { error } = await supabase.from("participation_requests").insert({
        user_id: authUser.id,
        car_id: selectedCar.id,
        num_participations: draft.personal.numParticipations,
        status: "pending",
        questionnaire_answers: draft.answers || {},
        payment_amount: selectedCar.participationPrice * draft.personal.numParticipations,
        payment_status: "pending",
      });
      if (error) {
        toast({
          title: "Error al enviar la solicitud",
          description: error.message,
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }
      toast({ title: "¡Solicitud enviada correctamente!" });
      trackEvent("purchase", {
        transaction_id: `owneo_${Date.now()}`,
        car_name: selectedCar.name,
        car_id: selectedCar.id,
        num_participations: draft.personal.numParticipations,
        value:
          selectedCar.participationPrice * draft.personal.numParticipations,
        currency: "EUR",
      });
      clearDraft();
      sessionStorage.removeItem(`owneo:questionnaire:${selectedCar.id}`);
      setSubmitted(true);
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Inténtalo de nuevo",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-24 pb-16 max-w-2xl">
        {submitted ? (
          <div className="text-center space-y-6 py-12">
            <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">¡Solicitud enviada!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Tu solicitud está siendo procesada. Nos pondremos en contacto contigo en breve.
            </p>
            <div className="flex gap-3 justify-center pt-4">
              <Button onClick={() => navigate("/dashboard")} className="bg-foreground text-background hover:bg-foreground/90">
                Ir al dashboard
              </Button>
              <Button variant="outline" onClick={() => navigate("/coches")}>
                Volver al portfolio
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Step indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                {["Vehículo", "Datos", "Cuestionario", "Confirmar"].map((label, i) => (
                  <div key={label} className="flex-1 flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      draft.step >= i ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                    }`}>
                      {i + 1}
                    </div>
                    <span className={draft.step >= i ? "text-foreground" : ""}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {draft.step === 0 && (
              <Step0VehicleSelection
                initialCarId={draft.carId}
                onConfirm={handleStep0}
              />
            )}

            {draft.step === 1 && selectedCar && (
              <Step1PersonalInfo
                car={selectedCar}
                onBack={() => setStep(0)}
                onComplete={handleStep1}
              />
            )}

            {draft.step === 2 && selectedCar && draft.personal && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Cuestionario</h2>
                <EvaluationQuestionnaire
                  carId={selectedCar.id}
                  carName={selectedCar.name}
                  numParticipations={draft.personal.numParticipations}
                  participationPrice={selectedCar.participationPrice}
                  leadInfo={{
                    name: draft.personal.name,
                    surname: draft.personal.surname,
                    email: draft.personal.email,
                    phone: draft.personal.phone,
                    address: draft.personal.address || "",
                    linkedin: draft.personal.linkedin || "",
                  }}
                  onComplete={handleQuestionnaireComplete}
                  submitMode="next"
                />
                <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
                </Button>
              </div>
            )}

            {draft.step === 3 && selectedCar && draft.personal && (
              <Step3Summary
                car={selectedCar}
                personal={draft.personal}
                answers={draft.answers || {}}
                onBack={() => setStep(2)}
                onConfirm={handleFinalSubmit}
                loading={submitting}
              />
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Participar;
