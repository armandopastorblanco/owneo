import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCar } from "@/hooks/useCars";
import { useAnalytics } from "@/hooks/useAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft, ArrowRight, MapPin, CheckCircle2, Users, Info, X,
  ChevronLeft, ChevronRight, Shield, Wrench, Sparkles, Zap, Gauge, Car as CarIcon,
  MessageCircle, Calendar, CalendarDays, Clock, TrendingUp, TrendingDown, RefreshCw, FileCheck, Loader2, Check,
} from "lucide-react";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import ParticipationForm from "@/components/ParticipationForm";
import Car360Viewer from "@/components/Car360Viewer";

/* ─── spec labels & categorisation ─── */
const specLabels: Record<string, string> = {
  engine: "Motor", power: "Potencia", torque: "Par Motor",
  acceleration: "Aceleración", topSpeed: "Velocidad Máxima",
  transmission: "Transmisión", drivetrain: "Tracción",
  weight: "Peso en Vacío", fuelType: "Combustible",
  displacement: "Cilindrada", cylinders: "Cilindros", valves: "Válvulas",
  compression: "Relación de Compresión", fuelSystem: "Sistema de Alimentación",
  emissionClass: "Normativa de Emisiones", co2Emissions: "Emisiones de CO₂",
  fuelConsumption: "Consumo Combinado", tankCapacity: "Capacidad del Depósito",
  brakes: "Frenos", tiresFront: "Neumáticos Delanteros", tiresRear: "Neumáticos Traseros",
  suspension: "Suspensión", length: "Longitud", width: "Anchura", height: "Altura",
  wheelbase: "Distancia entre Ejes", trunkCapacity: "Capacidad del Maletero",
  doors: "Puertas", seats: "Plazas", batteryCapacity: "Capacidad de Batería",
  range: "Autonomía", chargingTime: "Tiempo de Carga Rápida",
};

const SPEC_CATEGORIES: Record<string, string[]> = {
  motor: ["engine", "displacement", "cylinders", "valves", "compression", "fuelSystem", "fuelType", "batteryCapacity"],
  prestaciones: ["power", "torque", "acceleration", "topSpeed", "transmission", "drivetrain", "fuelConsumption", "co2Emissions", "range"],
  dimensiones: ["length", "width", "height", "wheelbase", "weight", "trunkCapacity", "doors", "seats"],
  equipamiento: ["brakes", "tiresFront", "tiresRear", "suspension", "emissionClass", "tankCapacity", "chargingTime"],
};
const HIGHLIGHTED_SPECS = new Set(["power", "acceleration", "topSpeed"]);

/* ─── animation helpers ─── */
function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const fn = () => setR(m.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);
  return r;
}

function CountUp({ end, suffix = "", prefix = "", duration = 1200 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [val, setVal] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (reduced) { setVal(end); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setVal(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration, reduced]);
  return <span ref={ref}>{prefix}{Math.round(val).toLocaleString("es-ES")}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}
      variants={fadeUp} transition={{ delay }} className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── consultation form ─── */
const consultaSchema = z.object({
  name: z.string().trim().min(2, "Nombre demasiado corto").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Debes aceptar la política de privacidad" }) }),
});
type ConsultaForm = z.infer<typeof consultaSchema>;

const CarDetail = () => {
  const { id } = useParams();
  const { data: car, isLoading } = useCar(id);
  const { trackEvent } = useAnalytics();

  /* ─── refs ─── */
  const heroRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const consultaRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* ─── sticky bar visibility ─── */
  const [stickyVisible, setStickyVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const threshold = (heroRef.current?.offsetHeight ?? 400) + 120;
      setStickyVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ─── lightbox ─── */
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const navigateLightbox = useCallback((dir: number) => {
    if (lightboxIndex === null || !car?.gallery) return;
    const total = car.gallery.length;
    setLightboxIndex((lightboxIndex + dir + total) % total);
  }, [lightboxIndex, car]);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, navigateLightbox]);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [specTab, setSpecTab] = useState("motor");

  useEffect(() => {
    if (car) {
      trackEvent("view_car_detail", {
        car_name: car.name, car_brand: car.brand, car_id: car.id,
        car_participation_price: car.participationPrice,
        remaining_participations: car.remainingParticipations,
        car_city: car.availableIn?.join(", "),
      });
    }
  }, [car?.id]);

  /* ─── consultation mutation ─── */
  const form = useForm<ConsultaForm>({
    resolver: zodResolver(consultaSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", consent: false as unknown as true },
  });
  const [submitted, setSubmitted] = useState(false);

  const consultaMutation = useMutation({
    mutationFn: async (values: ConsultaForm) => {
      const { error } = await supabase.from("consultation_requests" as never).insert({
        car_id: car?.id,
        car_name: car?.name,
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        message: values.message || null,
        status: "pending",
      } as never);
      if (error) throw error;
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      trackEvent("submit_consultation", { car_id: car?.id, car_name: car?.name });
    },
    onError: (err: Error) => toast.error(`Error: ${err.message}`),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <Skeleton className="h-8 w-40 mb-8" />
            <Skeleton className="aspect-[21/9] rounded-2xl mb-8" />
            <Skeleton className="h-12 w-96 mb-4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </main>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Vehículo no encontrado</h1>
          <Link to="/portfolio">
            <Button variant="outline">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Volver a Nuestra Gama
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  /* ─── derived values ─── */
  const availableParticipations = car.remainingParticipations ?? 0;
  const maxParticipations = car.maxParticipations ?? 10;
  const isComplete = car.status === "complete" || availableParticipations === 0;
  const promotion = car.promotion;
  const isPromoActive = promotion && new Date(promotion.start_date) <= new Date() && new Date(promotion.end_date) >= new Date();

  const sharePrice = car.participationPrice;
  const discountedPrice = isPromoActive && promotion?.type === "direct"
    ? Math.round(sharePrice * (1 - promotion.discount_percent / 100))
    : sharePrice;

  const annualFeePercent = car.annual_fee_percent ?? 10;
  const annualFee = car.annual_fee_override ?? Math.round(sharePrice * (annualFeePercent / 100));
  const weeksPerParticipation = car.weeks_per_participation ?? 4;
  const kmPerParticipation = car.km_per_participation ?? 2000;
  const durationYears = car.participation_duration_years ?? 5;
  const luxuryDesc = car.luxury_description_override || car.luxuryDescription || "";

  const totalCostOverLife = sharePrice + annualFee * durationYears;
  const estimatedResale = Math.round(sharePrice * 0.7);
  const netCost = totalCostOverLife - estimatedResale;

  // Costes anuales propietario único
  const ownerAnnualInsurance = Math.round(car.numericPrice * 0.03);
  const ownerAnnualMaintenance = Math.round(car.numericPrice * 0.02);
  const ownerAnnualParking = 3000;
  const ownerAnnualCleaning = 1200;
  const ownerAnnualTotal = ownerAnnualInsurance + ownerAnnualMaintenance + ownerAnnualParking + ownerAnnualCleaning;
  const ownerTotalCost = car.numericPrice + ownerAnnualTotal * durationYears;
  const ownerResaleValue = Math.round(car.numericPrice * 0.65);
  const ownerNetCost = ownerTotalCost - ownerResaleValue;
  const saving = ownerNetCost - netCost;

  /* ─── allocation rows ─── */
  const allocationRows = [1, 2, 3, 4, 5].map((n) => ({
    n, weeks: n * weeksPerParticipation, days: n * weeksPerParticipation * 7,
    km: n * kmPerParticipation, invest: n * sharePrice, fee: n * annualFee,
  }));

  /* ─── stat cards ─── */
  const statCards = [
    { icon: Zap, label: car.specifications?.acceleration ? "0-100 km/h" : "Potencia", value: car.specifications?.acceleration || car.specifications?.power || "—" },
    { icon: Gauge, label: "Velocidad máxima", value: car.specifications?.topSpeed || "—" },
    { icon: CarIcon, label: "Motor", value: car.specifications?.engine || "—" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* shared keyframes */}
      <style>{`
        @keyframes owneo-shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
        .shimmer-badge {
          background: linear-gradient(90deg, hsl(var(--card)) 0%, hsl(var(--champagne) / 0.15) 50%, hsl(var(--card)) 100%);
          background-size: 200% 100%;
          animation: owneo-shimmer 3s linear infinite;
        }
      `}</style>

      {/* ─── STICKY CTA BAR ─── */}
      <div
        className={`fixed left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 transition-all duration-300 hidden sm:block ${
          stickyVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ top: 64 }}
      >
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3 min-w-0">
            <span className="font-bold text-foreground text-lg truncate">{car.name}</span>
            <span className="text-muted-foreground text-sm hidden md:inline">{car.category}</span>
          </div>
          <div className="hidden lg:flex gap-6">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Participación</div>
              <div className="font-bold text-champagne">{discountedPrice.toLocaleString("es-ES")}€</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Gestión anual</div>
              <div className="font-bold text-foreground">{annualFee.toLocaleString("es-ES")}€/año</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Duración</div>
              <div className="font-bold text-foreground">{durationYears} años</div>
            </div>
          </div>
          <Button
            onClick={() => scrollTo(formRef)}
            className="bg-champagne text-champagne-foreground hover:bg-champagne/90"
          >
            Solicitar participación
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <main className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Link to="/portfolio" className="inline-flex items-center text-foreground hover:text-champagne mb-6 transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" /> Volver a Nuestra Gama
          </Link>

          {/* ─── BLOQUE A: HERO ─── */}
          <div ref={heroRef} className="relative mb-10">
            <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] overflow-hidden rounded-2xl bg-gradient-to-b from-muted to-background">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover animate-[subtle-zoom_20s_ease-in-out_infinite]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${isComplete ? "bg-blue-500/80" : "bg-[hsl(var(--participation-available))]"} text-background`}>
                <Users className="w-4 h-4" />
                {isComplete ? "Completo — Lista de espera" : `${availableParticipations}/${maxParticipations} participaciones disponibles`}
              </div>
              {isPromoActive && (
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold bg-emerald-500 text-background">
                  {promotion.badge_text}
                </div>
              )}
            </div>

            {/* Badges stats — flux normal sur mobile, absolu sur sm+ */}
            <div className="grid grid-cols-3 gap-3 px-0 py-4 sm:absolute sm:bottom-4 sm:left-4 sm:right-4 sm:px-0 sm:py-0">
              <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-3 text-center">
                <CalendarDays className="w-4 h-4 mx-auto mb-1 text-champagne" />
                <div className="text-sm font-bold text-foreground">{weeksPerParticipation} sem.</div>
                <div className="text-xs text-muted-foreground">por año</div>
              </div>
              <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-3 text-center">
                <Gauge className="w-4 h-4 mx-auto mb-1 text-champagne" />
                <div className="text-sm font-bold text-foreground">{kmPerParticipation.toLocaleString("es-ES")} km</div>
                <div className="text-xs text-muted-foreground">incluidos</div>
              </div>
              <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-3 text-center">
                <Clock className="w-4 h-4 mx-auto mb-1 text-champagne" />
                <div className="text-sm font-bold text-foreground">{durationYears} años</div>
                <div className="text-xs text-muted-foreground">duración</div>
              </div>
            </div>
          </div>

          {/* ─── BLOQUE C: HEADER + PRECIO ─── */}
          <div ref={pricingRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <Reveal className="space-y-6">
              <span className="inline-block text-xs uppercase tracking-wider text-muted-foreground border border-border rounded-full px-3 py-1">
                {car.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">{car.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4" />
                <span>{car.availableIn.join(", ")}</span>
              </div>
              <div>
                <p className={`text-muted-foreground leading-relaxed ${descExpanded ? "" : "line-clamp-2"}`}>
                  {luxuryDesc}
                </p>
                {luxuryDesc.length > 160 && (
                  <button
                    onClick={() => setDescExpanded(!descExpanded)}
                    className="text-champagne text-sm mt-2 hover:underline"
                  >
                    {descExpanded ? "Ver menos" : "Ver más"}
                  </button>
                )}
              </div>
            </Reveal>

            <div className="lg:sticky lg:top-24">
            <Reveal delay={0.1}>
              <Card className="bg-card border border-champagne/20 rounded-2xl shadow-lg shadow-champagne/5">
                <CardContent className="p-6 space-y-5">
                  {/* Sección 1 — Precio participación */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Cuota de participación</span>
                      <TooltipProvider delayDuration={150}>
                        <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
                          <TooltipTrigger
                            type="button"
                            onClick={() => setTooltipOpen((v) => !v)}
                            aria-label="Información sobre co-sharing"
                          >
                            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs p-4">
                            <p className="font-semibold mb-2">¿Cómo funciona el co-sharing?</p>
                            <p className="text-sm text-muted-foreground">
                              La cuota de participación representa el 10% del valor total del vehículo.
                              Como co-sharer, disfrutas de acceso exclusivo según tu participación.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-muted-foreground line-through text-lg">
                        {car.price}
                      </span>
                      <span className="text-xs text-muted-foreground bg-card border border-border/50 rounded-full px-2 py-0.5">
                        Valor del vehículo
                      </span>
                    </div>
                    {isPromoActive && promotion?.type === "direct" ? (
                      <p>
                        <span className="line-through text-muted-foreground text-xl mr-2">{sharePrice.toLocaleString("es-ES")}€</span>
                        <span className="text-4xl font-bold text-champagne">{discountedPrice.toLocaleString("es-ES")}€</span>
                      </p>
                    ) : (
                      <p className="text-4xl font-bold text-champagne">{sharePrice.toLocaleString("es-ES")}€</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">= 10% del valor del vehículo</p>
                  </div>

                  <div className="border-t border-border/30" />

                  {/* Sección 2 — Cuota anual */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-champagne" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Gestión anual incluida</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground mb-3">{annualFee.toLocaleString("es-ES")}€<span className="text-sm text-muted-foreground font-normal">/año</span></p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: Shield, label: "Seguro a todo riesgo" },
                        { icon: Wrench, label: "Mantenimiento y revisiones" },
                        { icon: MapPin, label: "Parking premium" },
                        { icon: Sparkles, label: "Gestión integral OWNEO" },
                      ].map((it) => (
                        <div key={it.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <it.icon className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
                          <span>{it.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border/30" />

                  {/* Sección 3 — Resumen comparativo */}
                  <div className="mt-4 rounded-xl overflow-hidden border border-border/50">
                    <div className="bg-muted/30 px-4 py-2 border-b border-border/50">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Coste neto estimado a {durationYears} años
                      </span>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-border/50">
                      {/* Colonne Compra individual */}
                      <div className="p-4 bg-muted/10">
                        <div className="flex items-center gap-1.5 mb-4 h-6">
                          <div className="w-2 h-2 rounded-full bg-red-400/70 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground font-medium leading-none">Compra individual</span>
                        </div>
                        <div className="space-y-0">
                          <div className="flex justify-between items-center h-9 border-b border-border/20">
                            <span className="text-xs text-muted-foreground">Precio compra</span>
                            <span className="text-xs text-foreground font-medium">{car.numericPrice.toLocaleString('es-ES')}€</span>
                          </div>
                          <div className="flex justify-between items-center h-9 border-b border-border/20">
                            <span className="text-xs text-muted-foreground">Gastos {durationYears} años</span>
                            <span className="text-xs text-foreground font-medium">+{(ownerAnnualTotal * durationYears).toLocaleString('es-ES')}€</span>
                          </div>
                          <div className="flex justify-between items-center h-9">
                            <span className="text-xs text-muted-foreground">Reventa estimada</span>
                            <span className="text-xs text-green-500/70 font-medium">-{ownerResaleValue.toLocaleString('es-ES')}€</span>
                          </div>
                        </div>
                        <div className="pt-3 mt-3 border-t border-border/40">
                          <div className="text-xs text-muted-foreground mb-1">Coste neto</div>
                          <div className="text-xl font-bold text-foreground">{ownerNetCost.toLocaleString('es-ES')}€</div>
                        </div>
                      </div>
                      {/* Colonne OWNEO */}
                      <div className="p-4 bg-champagne/5">
                        <div className="flex items-center gap-1.5 mb-4 h-6">
                          <div className="w-2 h-2 rounded-full bg-champagne flex-shrink-0" />
                          <span className="text-xs text-champagne font-medium leading-none">OWNEO</span>
                        </div>
                        <div className="space-y-0">
                          <div className="flex justify-between items-center h-9 border-b border-border/20">
                            <span className="text-xs text-muted-foreground">Participación</span>
                            <span className="text-xs text-foreground font-medium">{sharePrice.toLocaleString('es-ES')}€</span>
                          </div>
                          <div className="flex justify-between items-center h-9 border-b border-border/20">
                            <span className="text-xs text-muted-foreground">Gestión {durationYears} años</span>
                            <span className="text-xs text-foreground font-medium">+{(annualFee * durationYears).toLocaleString('es-ES')}€</span>
                          </div>
                          <div className="flex justify-between items-center h-9">
                            <span className="text-xs text-muted-foreground">Reventa estimada</span>
                            <span className="text-xs text-green-500 font-medium">-{estimatedResale.toLocaleString('es-ES')}€</span>
                          </div>
                        </div>
                        <div className="pt-3 mt-3 border-t border-champagne/20">
                          <div className="text-xs text-muted-foreground mb-1">Coste neto</div>
                          <div className="text-xl font-bold text-champagne">{netCost.toLocaleString('es-ES')}€</div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-champagne/10 border-t border-champagne/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-champagne flex-shrink-0" />
                        <span className="text-xs text-foreground font-medium">Ahorras con OWNEO</span>
                      </div>
                      <span className="text-base font-bold text-champagne">
                        ~{saving.toLocaleString('es-ES')}€
                      </span>
                    </div>
                    <div className="px-4 py-2 bg-muted/10 border-t border-border/30">
                      <p className="text-xs text-muted-foreground italic">
                        Estimación orientativa basada en costes medios de mercado. Sujeta a condiciones reales del vehículo.
                      </p>
                    </div>
                  </div>

                  {/* CTA principal */}
                  <Button
                    onClick={() => scrollTo(formRef)}
                    size="lg"
                    className="w-full bg-champagne text-champagne-foreground hover:bg-champagne/90"
                  >
                    Solicitar participación
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Sin compromiso · Proceso 100% digital · Respuesta en 24h
                  </p>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollTo(consultaRef)}
                    className="w-full text-muted-foreground hover:text-champagne"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Reservar consulta privada
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
            </div>
            </div>
          </div>

          {/* ─── BLOQUE D: ALLOCATION ─── */}
          <Reveal className="mb-16">
            <span className="inline-block text-xs uppercase tracking-wider text-muted-foreground border border-border rounded-full px-3 py-1 mb-3">
              Tus derechos de uso
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Cuanto más participas, más disfrutas.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Cada participación te garantiza acceso exclusivo al vehículo. Acumula participaciones para ampliar tu tiempo al volante.
            </p>

            <div className="overflow-x-auto">
              <div className="min-w-[720px]">
                <div className="grid grid-cols-6 gap-2 px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground border-b border-border/50">
                  <div>N° Parts</div>
                  <div>Semanas/año</div>
                  <div>Días/año</div>
                  <div>Km incluidos</div>
                  <div>Inversión</div>
                  <div>Gestión anual</div>
                </div>
                {allocationRows.map((r) => {
                  const highlighted = r.n === 1;
                  return (
                    <div
                      key={r.n}
                      className={`grid grid-cols-6 gap-2 px-4 py-4 items-center border border-transparent rounded-xl my-1 transition-all ${
                        highlighted ? "border-champagne/50 bg-champagne/5" : "hover:bg-card/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users className={`w-4 h-4 ${highlighted ? "text-champagne" : "text-muted-foreground"}`} />
                        <span className={`font-bold ${highlighted ? "text-champagne" : "text-foreground"}`}>{r.n}</span>
                      </div>
                      <div className="text-champagne font-bold">{r.weeks} sem.</div>
                      <div className="text-foreground">{r.days} días</div>
                      <div className="text-foreground">{r.km.toLocaleString("es-ES")} km</div>
                      <div className="text-foreground font-semibold">{r.invest.toLocaleString("es-ES")}€</div>
                      <div className="text-muted-foreground text-sm">{r.fee.toLocaleString("es-ES")}€</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              ¿Interesado en más de 5 participaciones?{" "}
              <button onClick={() => scrollTo(consultaRef)} className="text-champagne hover:underline">
                Contáctanos para una propuesta personalizada.
              </button>
            </p>
          </Reveal>

          {/* ─── BLOQUE E: LA EXPERIENCIA ─── */}
          <section className="bg-card/20 border-y border-border/30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-16 mb-16">
            <div className="container mx-auto max-w-6xl grid lg:grid-cols-5 gap-10">
              <Reveal className="lg:col-span-3">
                <span className="inline-block text-xs uppercase tracking-wider text-muted-foreground border border-border rounded-full px-3 py-1 mb-3">
                  La Experiencia
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Una obra maestra sobre ruedas.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{luxuryDesc}</p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => scrollTo(specsRef)}
                >
                  Ver especificaciones técnicas
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Reveal>

              <div className="lg:col-span-2 space-y-4">
                {statCards.map((s, i) => (
                  <Reveal key={s.label} delay={0.1 * i}>
                    <div className="bg-background rounded-xl border border-border/50 p-5 flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-champagne/10 border border-champagne/20">
                        <s.icon className="w-6 h-6 text-champagne" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">{s.value}</div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ─── BLOQUE F: 360 + GALERÍA ─── */}
          <Reveal className="mb-16">
            <span className="inline-block text-xs uppercase tracking-wider text-champagne shimmer-badge border border-champagne/20 rounded-full px-3 py-1 mb-4">
              Galería exclusiva
            </span>

            {car.gallery && car.gallery.length >= 6 && (
              <div className="mb-6">
                <Car360Viewer carName={car.name} gallery={car.gallery} />
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-4">
              {(car.gallery || [car.image, car.image, car.image]).map((image, index) => (
                <div
                  key={index}
                  className={`overflow-hidden rounded-2xl bg-gradient-to-b from-muted to-background cursor-pointer ${
                    index === 0 ? "md:col-span-2 md:row-span-2 aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                  onClick={() => {
                    setLightboxIndex(index);
                    trackEvent("view_car_gallery", { car_name: car.name, image_index: index });
                  }}
                >
                  <img
                    src={image}
                    alt={`${car.name} vista ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          {/* lightbox */}
          {lightboxIndex !== null && car.gallery && (
            <div
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
              onClick={() => setLightboxIndex(null)}
            >
              <button className="absolute top-6 right-6 text-foreground/70 hover:text-foreground transition-colors" onClick={() => setLightboxIndex(null)}>
                <X className="w-8 h-8" />
              </button>
              <button className="absolute left-4 md:left-8 text-foreground/70 hover:text-foreground transition-colors p-2" onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}>
                <ChevronLeft className="w-10 h-10" />
              </button>
              <div className="max-w-5xl max-h-[85vh] px-16" onClick={(e) => e.stopPropagation()}>
                <img src={car.gallery[lightboxIndex]} alt={`${car.name} vista ${lightboxIndex + 1}`} className="max-w-full max-h-[85vh] object-contain rounded-lg" />
                <p className="text-center text-muted-foreground mt-4 text-sm">{lightboxIndex + 1} / {car.gallery.length}</p>
              </div>
              <button className="absolute right-4 md:right-8 text-foreground/70 hover:text-foreground transition-colors p-2" onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}>
                <ChevronRight className="w-10 h-10" />
              </button>
            </div>
          )}

          {/* ─── BLOQUE G: SPECS ─── */}
          <Reveal className="mb-16" >
            <div ref={specsRef}>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Especificaciones técnicas</h2>
              <Tabs value={specTab} onValueChange={setSpecTab}>
                <TabsList className="overflow-x-auto flex w-full sm:w-auto justify-start">
                  <TabsTrigger value="motor">Motor</TabsTrigger>
                  <TabsTrigger value="prestaciones">Prestaciones</TabsTrigger>
                  <TabsTrigger value="dimensiones">Dimensiones</TabsTrigger>
                  <TabsTrigger value="equipamiento">Equipamiento</TabsTrigger>
                </TabsList>
                {Object.entries(SPEC_CATEGORIES).map(([cat, keys]) => {
                  const items = keys.filter((k) => car.specifications?.[k]);
                  return (
                    <TabsContent key={cat} value={cat}>
                      <Card className="bg-card border-border rounded-2xl">
                        <CardContent className="p-6">
                          {items.length === 0 ? (
                            <p className="text-muted-foreground text-sm text-center py-6">Sin datos disponibles para esta categoría.</p>
                          ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                              {items.map((k) => (
                                <div key={k} className="flex justify-between items-center border-b border-border/40 pb-3">
                                  <span className="text-muted-foreground text-sm">{specLabels[k] || k}</span>
                                  <span className={`font-semibold ${HIGHLIGHTED_SPECS.has(k) ? "text-champagne" : "text-foreground"}`}>
                                    {car.specifications[k]}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          </Reveal>

          {/* ─── BLOQUE H: FEATURES ─── */}
          {car.features?.length > 0 && (
            <Reveal className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Características Premium</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {car.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-card/50 border border-border/30 rounded-xl hover:border-champagne/30 transition-all"
                  >
                    <CheckCircle2 className="w-5 h-5 text-champagne flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* ─── BLOQUE I: COMPARATIVA ─── */}
          <Reveal className="mb-16">
            <h2 className="text-3xl font-bold mb-3 text-foreground">Compra Individual VS OWNEO Co-Sharing</h2>
            <p className="text-muted-foreground mb-8">
              Descubre cómo el modelo de co-sharing OWNEO reduce drásticamente los costes anuales de gestión.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Concepto</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Compra Individual</th>
                    <th className="text-center py-4 px-4 font-medium text-champagne">OWNEO Co-Sharing</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Inversión inicial</td>
                    <td className="py-4 px-4 text-center text-foreground">{car.price}</td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">{sharePrice.toLocaleString("es-ES")}€</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Tiempo de uso garantizado</td>
                    <td className="py-4 px-4 text-center text-foreground">Sin límite</td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">{weeksPerParticipation} semanas/año</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Kilómetros incluidos/año</td>
                    <td className="py-4 px-4 text-center text-foreground">Sin límite</td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">{kmPerParticipation.toLocaleString("es-ES")} km</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Seguro anual</td>
                    <td className="py-4 px-4 text-center text-foreground">~{Math.round(car.numericPrice * 0.03).toLocaleString("es-ES")}€</td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">Incluido</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Mantenimiento anual</td>
                    <td className="py-4 px-4 text-center text-foreground">~{Math.round(car.numericPrice * 0.02).toLocaleString("es-ES")}€</td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">Incluido</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Almacenamiento anual</td>
                    <td className="py-4 px-4 text-center text-foreground">~3.000€</td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">Incluido</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">Coste anual de gestión</td>
                    <td className="py-4 px-4 text-center text-foreground">
                      ~{(Math.round(car.numericPrice * 0.05) + 3000).toLocaleString("es-ES")}€
                    </td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">{annualFee.toLocaleString("es-ES")}€</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-foreground font-bold">Duración del compromiso</td>
                    <td className="py-4 px-4 text-center text-foreground font-bold">Indefinida</td>
                    <td className="py-4 px-4 text-center text-champagne font-bold">{durationYears} años</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-6 bg-champagne/10 rounded-2xl border border-champagne/20">
              <p className="text-center text-foreground">
                <span className="font-bold text-champagne">~90% de ahorro</span> en costes anuales de gestión con OWNEO Co-Sharing.
              </p>
            </div>
            <p className="text-xs text-muted-foreground italic mt-3">
              Estimación basada en costes anuales de gestión (seguro, mantenimiento, parking). No incluye precio de adquisición ni depreciación.
            </p>
          </Reveal>

          {/* ─── BLOQUE J: DISPONIBILIDAD Y CONDICIONES ─── */}
          <Reveal className="mb-16 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Disponible en</h2>
              <div className="flex flex-wrap gap-2">
                {car.availableIn.map((city) => (
                  <div key={city} className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full">
                    <MapPin className="w-4 h-4 text-champagne" />
                    <span className="text-foreground text-sm">{city}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4 p-3 bg-card rounded-xl border border-border/50">
                <Shield className="w-4 h-4 text-champagne flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Uso exclusivo en territorio español · Entrega por gestor OWNEO en tu ciudad.
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Condiciones de la participación</h2>
              <ul className="space-y-3">
                {[
                  { icon: Calendar, text: `${weeksPerParticipation} semanas garantizadas por participación/año` },
                  { icon: Gauge, text: `${kmPerParticipation.toLocaleString("es-ES")} km incluidos por participación/año` },
                  { icon: Clock, text: `Duración: ${durationYears} años` },
                  { icon: TrendingUp, text: "Reventa estimada: hasta el 70% de tu participación" },
                  { icon: RefreshCw, text: "Reventa gestionada íntegramente por OWNEO" },
                  { icon: Shield, text: "Seguro, mantenimiento y parking incluidos en cuota anual" },
                ].map((it, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <it.icon className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
                    <span>{it.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* ─── BLOQUE K: CONSULTA PRIVADA ─── */}
          <section ref={consultaRef} className="bg-gradient-to-br from-card via-background to-card border-y border-border/50 -mx-4 sm:-mx-6 px-4 sm:px-6 py-16 mb-16">
            <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-10">
              <Reveal>
                <span className="inline-block text-xs uppercase tracking-wider text-muted-foreground border border-border rounded-full px-3 py-1 mb-3">
                  Consulta privada
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">¿Tienes preguntas?</h2>
                <h3 className="text-xl text-champagne font-semibold mb-4">Habla con un especialista OWNEO.</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Nuestro equipo está disponible para resolver todas tus dudas sobre este vehículo, el proceso
                  de participación y las condiciones contractuales. Sin compromiso.
                </p>
                <ul className="space-y-3">
                  {[
                    "Respuesta en menos de 24 horas",
                    "Consulta completamente confidencial",
                    "Sin ningún tipo de compromiso",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-champagne" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <Card className="bg-card border border-border/50 rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Solicitar consulta privada</h3>
                    {submitted ? (
                      <div className="flex items-start gap-3 p-4 rounded-xl border border-champagne/30 bg-champagne/5">
                        <Check className="w-5 h-5 text-champagne flex-shrink-0 mt-0.5" />
                        <p className="text-champagne text-sm">
                          Solicitud recibida. Nos pondremos en contacto contigo en menos de 24 horas.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={form.handleSubmit((v) => consultaMutation.mutate(v))} className="space-y-4">
                        <div>
                          <label className="text-sm text-foreground mb-1 block">Nombre *</label>
                          <Input {...form.register("name")} placeholder="Tu nombre" />
                          {form.formState.errors.name && <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm text-foreground mb-1 block">Email *</label>
                          <Input type="email" {...form.register("email")} placeholder="tu@email.com" />
                          {form.formState.errors.email && <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm text-foreground mb-1 block">Teléfono</label>
                          <Input type="tel" {...form.register("phone")} placeholder="+34 ..." />
                        </div>
                        <div>
                          <label className="text-sm text-foreground mb-1 block">Mensaje</label>
                          <Textarea
                            {...form.register("message")}
                            rows={4}
                            placeholder={`¿Qué te gustaría saber sobre el ${car.name}?`}
                          />
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="consent"
                            checked={form.watch("consent") as unknown as boolean}
                            onCheckedChange={(v) => form.setValue("consent", v as true, { shouldValidate: true })}
                          />
                          <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed">
                            Acepto la política de privacidad
                          </label>
                        </div>
                        {form.formState.errors.consent && (
                          <p className="text-xs text-destructive">{form.formState.errors.consent.message as string}</p>
                        )}
                        <Button
                          type="submit"
                          disabled={consultaMutation.isPending}
                          className="w-full bg-champagne text-champagne-foreground hover:bg-champagne/90"
                        >
                          {consultaMutation.isPending ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enviando...</>
                          ) : (
                            "Enviar consulta"
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </section>

          {/* ─── BLOQUE L: CTA FINAL ─── */}
          <section ref={formRef} className="mb-8">
            {isComplete ? (
              <Card className="bg-gradient-to-r from-muted/20 to-card border border-border/50 rounded-2xl">
                <CardContent className="p-8 text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <span className="inline-block text-xs uppercase tracking-wider text-muted-foreground border border-border rounded-full px-3 py-1 mb-3">
                    Participaciones agotadas
                  </span>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    Este vehículo ya tiene todos sus participantes
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Descubre otros vehículos disponibles en nuestra vitrina
                  </p>
                  <Link to="/portfolio">
                    <Button variant="outline">Ver otros vehículos</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-champagne/5 via-card to-champagne/5 border border-champagne/20 rounded-3xl">
                <CardContent className="p-8 md:p-12 text-center">
                  <span className="inline-block text-xs uppercase tracking-wider text-champagne shimmer-badge border border-champagne/20 rounded-full px-3 py-1 mb-4">
                    Participaciones disponibles · {availableParticipations}/{maxParticipations}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Asegura tu participación en el {car.name}
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                    Completa el formulario para iniciar el proceso. Nuestro equipo revisará tu solicitud y te
                    contactará en menos de 24 horas.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {[
                      { icon: Shield, text: "Proceso seguro" },
                      { icon: FileCheck, text: "Sin compromiso" },
                      { icon: Clock, text: "Respuesta en 24h" },
                    ].map((p) => (
                      <span key={p.text} className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-card border border-border/50 rounded-full px-4 py-2">
                        <p.icon className="w-4 h-4 text-champagne" />
                        {p.text}
                      </span>
                    ))}
                  </div>

                  <div onClick={() => trackEvent("click_participate_cta", { car_name: car.name, car_id: car.id, participation_price: car.participationPrice, remaining_participations: car.remainingParticipations })}>
                    <ParticipationForm
                      carId={car.id}
                      carName={car.name}
                      availableParticipations={availableParticipations}
                      sharePrice={discountedPrice}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetail;
