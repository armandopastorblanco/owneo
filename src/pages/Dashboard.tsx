import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Car, FileText, MapPin, Phone, Calendar as CalendarIcon, CreditCard, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format, addDays, differenceInDays, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ferrariPortofino from "@/assets/cars/ferrari-portofino.jpg";

// Double credit periods (July, August, Christmas)
const isDoubleCredit = (date: Date) => {
  const month = date.getMonth();
  const day = date.getDate();
  
  // July (6) and August (7)
  if (month === 6 || month === 7) return true;
  
  // Christmas holidays (Dec 20 - Jan 6)
  if (month === 11 && day >= 20) return true;
  if (month === 0 && day <= 6) return true;
  
  return false;
};

const MIN_DAYS = 7;
const MAX_DAYS = 14;

interface UserVehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  image: string;
  location: { address: string };
  numParticipations: number;
}

interface UserData {
  name: string;
  email: string;
  credits: number;
  vehicle: UserVehicle | null;
}

const Dashboard = () => {
  const [range, setRange] = useState<DateRange | undefined>();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("name, surname, email")
        .eq("id", user.id)
        .maybeSingle();

      const { data: validated } = await supabase
        .from("validated_participations")
        .select("car_id, credits_remaining, credits_per_year, credits_used_this_year, cars:car_id(id, name, brand, model, year, image_url, location_id, locations:location_id(name))")
        .eq("user_id", user.id);

      let vehicle: UserVehicle | null = null;
      let credits = 0;
      if (validated && validated.length > 0) {
        const numParticipations = validated.length;
        const car: any = validated[0].cars;
        const totalPerYear = Number(validated[0].credits_per_year ?? 28);
        const used = Number(validated[0].credits_used_this_year ?? 0);
        credits = Math.max(0, Math.round((totalPerYear - used) * numParticipations));
        if (car) {
          vehicle = {
            id: car.id,
            name: car.name,
            brand: car.brand,
            model: car.model,
            year: car.year,
            image: car.image_url || ferrariPortofino,
            location: { address: car.locations?.name ?? "" },
            numParticipations,
          };
        }
      }

      const fullName = [profile?.name, profile?.surname].filter(Boolean).join(" ") || profile?.email || user.email || "Usuario";
      setUserData({
        name: fullName,
        email: profile?.email ?? user.email ?? "",
        credits,
        vehicle,
      });
      setLoading(false);
    };
    loadData();
  }, []);
  
  const handleSelect = (newRange: DateRange | undefined) => {
    if (!newRange?.from) {
      setRange(undefined);
      return;
    }
    
    if (newRange.from && newRange.to) {
      const days = differenceInDays(newRange.to, newRange.from) + 1;
      if (days < MIN_DAYS || days > MAX_DAYS) {
        if (days < MIN_DAYS) toast.error(`Mínimo ${MIN_DAYS} días`);
        if (days > MAX_DAYS) toast.error(`Máximo ${MAX_DAYS} días`);
        return;
      }
    }
    setRange(newRange);
  };

  const calculateCredits = () => {
    if (!range?.from || !range?.to) return { normal: 0, double: 0, total: 0 };
    let normal = 0, double = 0;
    let current = range.from;
    while (current <= range.to) {
      if (isDoubleCredit(current)) double++;
      else normal++;
      current = addDays(current, 1);
    }
    return { normal, double, total: normal + double * 2 };
  };

  const credits = calculateCredits();
  const totalDays = range?.from && range?.to ? differenceInDays(range.to, range.from) + 1 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-foreground" />
      </div>
    );
  }

  const displayName = userData?.name ?? "Usuario";
  const vehicle = userData?.vehicle;
  const userCredits = userData?.credits ?? 0;
  const maxCredits = Math.max(userCredits, 28);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al Inicio</span>
            </Link>
            <Link to="/dashboard/documentos" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <FileText className="w-4 h-4" />
              <span>Mis documentos</span>
            </Link>
          </div>
          <div className="flex flex-col items-start sm:items-end sm:text-right">
            <span className="text-sm text-muted-foreground">Bienvenido,</span>
            <span className="font-semibold text-foreground">{displayName}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-foreground">Mi Panel</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Vehicle Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Card */}
            <Card className="overflow-hidden border-border bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Car className="w-5 h-5 text-foreground" />
                  Mi Vehículo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={vehicle?.image}
                      alt={vehicle?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Vehículo</p>
                      <p className="text-2xl font-bold text-foreground">{vehicle?.name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Año</p>
                        <p className="font-semibold text-foreground">{vehicle?.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Color</p>
                        <p className="font-semibold text-foreground">{""}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Matrícula</p>
                        <p className="font-semibold text-foreground">{"—"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Marca</p>
                        <p className="font-semibold text-foreground">{vehicle?.brand}</p>
                      </div>
                    </div>
                    <Link to={`/car/${vehicle?.id}`}>
                      <Button variant="outline" className="w-full mt-2">
                        Ver Detalles Completos
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Calendar */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <CalendarIcon className="w-5 h-5 text-foreground" />
                  Reservar Días de Uso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-wrap gap-2 w-full justify-center">
                    <Badge variant="outline" className="text-xs">
                      <Info className="w-3 h-3 mr-1" />
                      Mín. 7 días
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Info className="w-3 h-3 mr-1" />
                      Máx. 14 días
                    </Badge>
                    <Badge className="bg-foreground/20 text-foreground text-xs">
                      Jul-Ago & Navidad = 2x
                    </Badge>
                  </div>
                  <Calendar
                    mode="range"
                    selected={range}
                    onSelect={handleSelect}
                    locale={es}
                    disabled={(date) => date < startOfDay(new Date())}
                    modifiers={{
                      doubleCredit: (date) => isDoubleCredit(date)
                    }}
                    modifiersStyles={{
                      doubleCredit: { 
                        border: "2px solid hsl(var(--foreground))",
                        borderRadius: "4px"
                      }
                    }}
                    className="rounded-md border border-border pointer-events-auto"
                  />
                  {range?.from && range?.to && (
                    <div className="w-full grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded bg-muted/50">
                        <p className="text-xs text-muted-foreground">Normal</p>
                        <p className="font-bold text-foreground">{credits.normal}</p>
                      </div>
                      <div className="p-2 rounded bg-foreground/10">
                        <p className="text-xs text-muted-foreground">Alta (x2)</p>
                        <p className="font-bold text-foreground">{credits.double}</p>
                      </div>
                      <div className="p-2 rounded bg-foreground/20">
                        <p className="text-xs text-muted-foreground">Total</p>
                        <p className="font-bold text-foreground text-lg">{credits.total}</p>
                      </div>
                    </div>
                  )}
                  <Button className="w-full bg-foreground hover:bg-foreground/90 text-background">
                    Confirmar Reserva
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Location */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <MapPin className="w-5 h-5 text-foreground" />
                  Ubicación del Vehículo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden relative">
                  {/* Mock map placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-muted to-background flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-foreground mx-auto mb-3" />
                        <p className="text-lg font-semibold text-foreground">{vehicle?.location.address}</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-foreground hover:bg-foreground/90 text-background">
                  Cómo Llegar
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Credits */}
          <div className="space-y-6">
            {/* Credits Card */}
            <Card className="border-border bg-gradient-to-br from-foreground/20 to-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <CreditCard className="w-5 h-5 text-foreground" />
                  Mis Créditos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="text-6xl font-bold text-foreground mb-2">{userCredits}</div>
                  <p className="text-muted-foreground">créditos disponibles</p>
                  <div className="mt-4 w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-foreground h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(userCredits / 30) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">1 crédito = 1 día de uso</p>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Documents CTA */}
            <Card className="border-border bg-card hover:border-foreground/50 transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-foreground/20 flex items-center justify-center group-hover:bg-foreground/30 transition-colors">
                    <FileText className="w-7 h-7 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Documentos del Vehículo</h3>
                    <p className="text-sm text-muted-foreground">Seguro, registro, historial de servicio</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Acceder a Documentos
                </Button>
              </CardContent>
            </Card>

            {/* Concierge CTA */}
            <Card className="border-border bg-card hover:border-foreground/50 transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-foreground/20 flex items-center justify-center group-hover:bg-foreground/30 transition-colors">
                    <Phone className="w-7 h-7 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Servicio de Conserjería</h3>
                    <p className="text-sm text-muted-foreground">Asistencia premium 24/7</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-foreground hover:bg-foreground/90 text-background">
                  Contactar Conserjería
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Este Mes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Días Reservados</span>
                  <span className="font-semibold text-foreground">{totalDays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Créditos a Usar</span>
                  <span className="font-semibold text-foreground">{credits.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Próxima Reserva</span>
                  <span className="font-semibold text-foreground">
                    {range?.from 
                      ? format(range.from, "d MMM", { locale: es })
                      : "Ninguna"
                    }
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Tips Module */}
            <Card className="border-border bg-gradient-to-br from-card to-muted/30">
              <CardHeader>
                <CardTitle className="text-foreground text-lg flex items-center gap-2">
                  <span className="text-foreground">✨</span>
                  Consejos VIP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-background/50 border border-border/50 hover:border-foreground/30 transition-colors">
                    <p className="text-sm font-medium text-foreground">🛣️ Rutas Escénicas</p>
                    <p className="text-xs text-muted-foreground mt-1">Descubre las carreteras más espectaculares de la costa mediterránea para disfrutar al máximo tu supercar.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50 border border-border/50 hover:border-foreground/30 transition-colors">
                    <p className="text-sm font-medium text-foreground">🔧 Cuidado Premium</p>
                    <p className="text-xs text-muted-foreground mt-1">Mantén el modo Sport para una experiencia óptima. Evita baches y revisa los neumáticos antes de cada viaje.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50 border border-border/50 hover:border-foreground/30 transition-colors">
                    <p className="text-sm font-medium text-foreground">📸 Momentos Únicos</p>
                    <p className="text-xs text-muted-foreground mt-1">Reserva al atardecer para las mejores fotos. Nuestro equipo puede organizar sesiones fotográficas exclusivas.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50 border border-border/50 hover:border-foreground/30 transition-colors">
                    <p className="text-sm font-medium text-foreground">🍽️ Experiencias Gastro</p>
                    <p className="text-xs text-muted-foreground mt-1">Combina tu reserva con restaurantes de alta cocina. Solicita recomendaciones a tu conserjería personal.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;