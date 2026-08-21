import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
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
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
} from "@/components/ui/carousel";
import {
  ArrowLeft, ArrowRight, MapPin, CheckCircle2, Users, Info, X,
  ChevronLeft, ChevronRight, Shield, Wrench, Sparkles, Zap, Gauge, Car as CarIcon,
  MessageCircle, Calendar, CalendarDays, Clock, TrendingUp, TrendingDown, RefreshCw, FileCheck, Loader2, Check,
} from "lucide-react";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import ParticipationForm from "@/components/ParticipationForm";
import { Helmet } from "react-helmet-async";

/* ─── spec labels & categorisation ─── */
const specLabels = (t: TFunction): Record<string, string> => ({
  engine: t("car.spec_engine"), power: t("car.spec_power"), torque: t("car.spec_torque"),
  acceleration: t("car.spec_acceleration"), topSpeed: t("car.spec_topSpeed"),
  transmission: t("car.spec_transmission"), drivetrain: t("car.spec_drivetrain"),
  weight: t("car.spec_weight"), fuelType: t("car.spec_fuelType"),
  displacement: t("car.spec_displacement"), cylinders: t("car.spec_cylinders"), valves: t("car.spec_valves"),
  compression: t("car.spec_compression"), fuelSystem: t("car.spec_fuelSystem"),
  emissionClass: t("car.spec_emissionClass"), co2Emissions: t("car.spec_co2Emissions"),
  fuelConsumption: t("car.spec_fuelConsumption"), tankCapacity: t("car.spec_tankCapacity"),
  brakes: t("car.spec_brakes"), tiresFront: t("car.spec_tiresFront"), tiresRear: t("car.spec_tiresRear"),
  suspension: t("car.spec_suspension"), length: t("car.spec_length"), width: t("car.spec_width"), height: t("car.spec_height"),
  wheelbase: t("car.spec_wheelbase"), trunkCapacity: t("car.spec_trunkCapacity"),
  doors: t("car.spec_doors"), seats: t("car.spec_seats"), batteryCapacity: t("car.spec_batteryCapacity"),
  range: t("car.spec_range"), chargingTime: t("car.spec_chargingTime"),
});

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
  const { i18n } = useTranslation();
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
  return <span ref={ref}>{prefix}{Math.round(val).toLocaleString(i18n.language === "en" ? "en-GB" : "es-ES")}{suffix}</span>;

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
const makeConsultaSchema = (t: TFunction) => z.object({
  name: z.string().trim().min(2, t("car.name_too_short")).max(100),
  email: z.string().trim().email(t("car.email_invalid")).max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: t("car.must_accept_privacy") }) }),
});
type ConsultaForm = z.infer<ReturnType<typeof makeConsultaSchema>>;

const CarDetail = () => {
  const { t, i18n } = useTranslation();
  const params = useParams<{ slug?: string; id?: string }>();
  const slug = params.slug;
  const id = params.id;
  const { data: car, isLoading } = useCar(slug ?? id, { bySlug: !!slug });
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
  const [openParticipationForm, setOpenParticipationForm] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleSolicitarClick = () => {
    setOpenParticipationForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  useEffect(() => {
    if (car) {
      document.title = `${car.name} — OWNEO`;
      trackEvent("view_car_detail", {
        car_name: car.name, car_brand: car.brand, car_id: car.id,
        car_slug: car.slug,
        page_url: `/coches/${car.slug}`,
        car_participation_price: car.participationPrice,
        remaining_participations: car.remainingParticipations,
        car_city: car.availableIn?.join(", "),
      });
    }
  }, [car?.id]);

  useEffect(() => {
    if (car?.availableIn?.length) {
      setSelectedCity(car.availableIn[0]);
    }
  }, [car]);

  /* ─── consultation mutation ─── */
  const consultaSchema = useMemo(() => makeConsultaSchema(t), [t]);
  const labels = useMemo(() => specLabels(t), [t]);
  const form = useForm<ConsultaForm>({
    resolver: zodResolver(consultaSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", city: selectedCity ?? "", consent: false as unknown as true },
  });

  useEffect(() => {
    form.setValue("city", selectedCity ?? "", { shouldValidate: false });
  }, [selectedCity, form]);

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
        city: values.city || selectedCity || null,
        status: "pending",
      } as never);
      if (error) throw error;
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      trackEvent("submit_consultation", { car_id: car?.id, car_name: car?.name, page_source: "car_detail" });
    },
    onError: (err: Error) => toast.error(`${t("car.consult_error")}: ${err.message}`),
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
          <h1 className="ds-h2 mb-4 text-foreground">{t("car.not_found")}</h1>
          <Link to="/coches">
            <Button variant="outline">
              <ArrowLeft className="mr-2 w-4 h-4" />
              {t("car.back_to_fleet")}
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
  const luxuryDesc =
    car.luxury_description_override ||
    (i18n.language === "en" && car.luxury_description_en
      ? car.luxury_description_en
      : car.luxuryDescription) ||
    "";

  const displayFeatures =
    i18n.language === "en" && car.features_en?.length ? car.features_en : car.features;
  const displaySpecs =
    i18n.language === "en" && Object.keys(car.specifications_en || {}).length
      ? car.specifications_en
      : car.specifications;



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
    { icon: Zap, label: displaySpecs?.acceleration ? "0-100 km/h" : t("car.spec_power"), value: displaySpecs?.acceleration || displaySpecs?.power || "—" },
    { icon: Gauge, label: t("car.spec_topSpeed"), value: displaySpecs?.topSpeed || "—" },
    { icon: CarIcon, label: t("car.spec_engine"), value: displaySpecs?.engine || "—" },
  ];

  /* ─── image pour le bloc "La Experiencia" ─── */
  const experienceImage = car.gallery?.[1] ?? car.gallery?.[0] ?? car.image;

  /* ─── images de la galerie (carrousel) ─── */
  const galleryImages = car.gallery && car.gallery.length > 0 ? car.gallery : [car.image];

  const carUrl = `https://www.owneo.es/coches/${car.slug}`;
  const carImageAbs = car.image?.startsWith("http") ? car.image : `https://www.owneo.es${car.image?.startsWith("/") ? "" : "/"}${car.image ?? ""}`;
  const metaDescription = (luxuryDesc || `${car.name}: comparte un supercoche de lujo en España con Owneo. Participaciones desde ${sharePrice.toLocaleString("es-ES")} €.`).slice(0, 158);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${car.name} — Comparte un supercoche | Owneo`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={carUrl} />
        <meta property="og:title" content={`${car.name} — Owneo`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={carUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={carImageAbs} />
        <meta property="og:site_name" content="Owneo" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={carImageAbs} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": car.name,
          "brand": { "@type": "Brand", "name": car.brand },
          "image": carImageAbs,
          "description": metaDescription,
          "url": carUrl,
          "offers": {
            "@type": "Offer",
            "price": sharePrice,
            "priceCurrency": "EUR",
            "availability": isComplete
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
            "url": carUrl
          }
        })}</script>
      </Helmet>
      <Navbar />

      {/* ─── STICKY CTA BAR ─── */}
      <div
        className={`fixed left-0 right-0 z-30 h-14 sm:h-16 bg-background/95 backdrop-blur-md border-b border-border/50 overflow-hidden top-14 sm:top-16 transition-all duration-300 block ${
          stickyVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="container mx-auto max-w-6xl h-full px-4 flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="font-semibold text-foreground text-sm sm:text-base truncate max-w-[55%]">{car.name}</span>
            <span className="text-muted-foreground text-xs sm:text-sm hidden md:inline">{i18n.language === "en" && car.category_en ? car.category_en : car.category}</span>
          </div>
          <div className="hidden lg:flex gap-6">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">{t("car.sticky_participation")}</div>
              <div className="font-bold text-champagne">{discountedPrice.toLocaleString("es-ES")}€</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">{t("car.sticky_annual")}</div>
              <div className="font-bold text-foreground">{annualFee.toLocaleString(i18n.language === "en" ? "en-GB" : "es-ES")}€/{t("car.per_year_short")}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">{t("car.sticky_duration")}</div>
              <div className="font-bold text-foreground">{t("car.sticky_years", { n: durationYears })}</div>
            </div>
          </div>
          <Button
            onClick={handleSolicitarClick}
            size="sm"
            className="bg-champagne text-champagne-foreground hover:bg-champagne/90 h-10 shrink-0"
          >
            <span className="hidden sm:inline">{t("car.request")}</span>
            <span className="sm:hidden">{t("car.sticky_request_short")}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <main className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Link to="/coches" className="inline-flex items-center text-foreground hover:text-champagne mb-6 transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" /> {t("car.back_to_fleet")}
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
                {isComplete ? t("car.complete_waitlist") : t("car.participations_available", { available: availableParticipations, max: maxParticipations })}
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
                <div className="text-sm font-bold text-foreground">{weeksPerParticipation} {t("car.weeks_short")} (3+1)</div>
                <div className="text-xs text-muted-foreground">{t("car.per_year")}</div>
              </div>
              <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-3 text-center">
                <Gauge className="w-4 h-4 mx-auto mb-1 text-champagne" />
                <div className="text-sm font-bold text-foreground">{kmPerParticipation.toLocaleString("es-ES")} km</div>
                <div className="text-xs text-muted-foreground">{t("car.km_included")}</div>
              </div>
              <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-3 text-center">
                <Clock className="w-4 h-4 mx-auto mb-1 text-champagne" />
                <div className="text-sm font-bold text-foreground">{t("car.sticky_years", { n: durationYears })}</div>
                <div className="text-xs text-muted-foreground">{t("car.duration_label")}</div>
              </div>
            </div>
          </div>

          {/* ─── BLOQUE C: HEADER + PRECIO ─── */}
          <div ref={pricingRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="space-y-10 lg:space-y-12">
            <Reveal className="space-y-6 text-center max-w-3xl mx-auto">
              <span className="ds-eyebrow-pill">{i18n.language === "en" && car.category_en ? car.category_en : car.category}</span>
              <h1 className="ds-h1 text-foreground">{car.name}</h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-champagne" />
                <span>{car.availableIn.join(", ")}</span>
              </div>
              <div>
                <p className={`ds-body ${descExpanded ? "" : "line-clamp-2"}`}>
                  {luxuryDesc}
                </p>
                {luxuryDesc.length > 160 && (
                  <button
                    onClick={() => setDescExpanded(!descExpanded)}
                    className="text-champagne text-sm mt-2 hover:underline"
                  >
                    {descExpanded ? t("car.see_less") : t("car.see_more")}
                  </button>
                )}
              </div>
            </Reveal>

            <div className="max-w-2xl mx-auto w-full">
            <Reveal delay={0.1}>
              <Card className="bg-card border border-champagne/20 rounded-2xl shadow-lg shadow-champagne/5">
                <CardContent className="p-6 space-y-5">
                  {/* Sección 1 — Precio participación */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("car.participation_label")}</span>
                      <TooltipProvider delayDuration={150}>
                        <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
                          <TooltipTrigger
                            type="button"
                            onClick={() => setTooltipOpen((v) => !v)}
                            aria-label={t("car.how_cosharing")}
                          >
                            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs p-4">
                            <p className="font-semibold mb-2">{t("car.how_cosharing")}</p>
                            <p className="text-sm text-muted-foreground">
                              {t("car.cosharing_desc")}
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
                        {t("car.vehicle_value")}
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
                    <p className="text-xs text-muted-foreground mt-1">{t("car.participation_pct")}</p>
                  </div>

                  <div className="border-t border-border/30" />

                  {/* Sección 2 — Cuota anual */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-champagne" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("car.annual_mgmt_included")}</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground mb-3">{annualFee.toLocaleString("es-ES")}€<span className="text-sm text-muted-foreground font-normal">/{t("car.per_year_short")}</span></p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: Shield, label: t("car.insurance") },
                        { icon: Wrench, label: t("car.maintenance") },
                        { icon: MapPin, label: t("car.parking") },
                        { icon: Sparkles, label: t("car.mgmt_integral") },
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
                        {t("car.net_cost_label", { n: durationYears })}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/50">
                      {/* Colonne Compra individual */}
                      <div className="p-4 bg-muted/10">
                        <div className="flex items-center gap-1.5 mb-4 h-6">
                          <div className="w-2 h-2 rounded-full bg-red-400/70 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground font-medium leading-none">{t("car.individual_purchase")}</span>
                        </div>
                        <div className="space-y-0">
                          <div className="flex justify-between items-center h-9 border-b border-border/20">
                            <span className="text-xs text-muted-foreground">{t("car.purchase_price")}</span>
                            <span className="text-xs text-foreground font-medium">{car.numericPrice.toLocaleString('es-ES')}€</span>
                          </div>
                          <div className="flex justify-between items-center h-9 border-b border-border/20">
                            <span className="text-xs text-muted-foreground">{t("car.expenses_years", { n: durationYears })}</span>
                            <span className="text-xs text-foreground font-medium">+{(ownerAnnualTotal * durationYears).toLocaleString('es-ES')}€</span>
                          </div>
                          <div className="flex justify-between items-center h-9">
                            <span className="text-xs text-muted-foreground">{t("car.est_resale")}</span>
                            <span className="text-xs text-green-500/70 font-medium">-{ownerResaleValue.toLocaleString('es-ES')}€</span>
                          </div>
                        </div>
                        <div className="pt-3 mt-3 border-t border-border/40">
                          <div className="text-xs text-muted-foreground mb-1">{t("car.net_cost")}</div>
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
                            <span className="text-xs text-muted-foreground">{t("car.sticky_participation")}</span>
                            <span className="text-xs text-foreground font-medium">{sharePrice.toLocaleString('es-ES')}€</span>
                          </div>
                          <div className="flex justify-between items-center h-9 border-b border-border/20">
                            <span className="text-xs text-muted-foreground">{t("car.expenses_years", { n: durationYears })}</span>
                            <span className="text-xs text-foreground font-medium">+{(annualFee * durationYears).toLocaleString('es-ES')}€</span>
                          </div>
                          <div className="flex justify-between items-center h-9">
                            <span className="text-xs text-muted-foreground">{t("car.est_resale")}</span>
                            <span className="text-xs text-green-500 font-medium">-{estimatedResale.toLocaleString('es-ES')}€</span>
                          </div>
                        </div>
                        <div className="pt-3 mt-3 border-t border-champagne/20">
                          <div className="text-xs text-muted-foreground mb-1">{t("car.net_cost")}</div>
                          <div className="text-xl font-bold text-champagne">{netCost.toLocaleString('es-ES')}€</div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-champagne/10 border-t border-champagne/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-champagne flex-shrink-0" />
                        <span className="text-xs text-foreground font-medium">{t("car.save_with_owneo")}</span>
                      </div>
                      <span className="text-base font-bold text-champagne">
                        ~{saving.toLocaleString('es-ES')}€
                      </span>
                    </div>
                    <div className="px-4 py-2 bg-muted/10 border-t border-border/30">
                      <p className="text-xs text-muted-foreground italic">
                        {t("car.est_note")}
                      </p>
                    </div>
                  </div>

                  {/* CTA principal */}
                  <Button
                    onClick={handleSolicitarClick}
                    size="lg"
                    className="w-full bg-champagne text-champagne-foreground hover:bg-champagne/90"
                  >
                    {t("car.request")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    {t("car.no_commitment")}
                  </p>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollTo(consultaRef)}
                    className="w-full text-muted-foreground hover:text-champagne"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t("car.private_consult")}
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
            </div>
            </div>
          </div>

          {/* ─── BLOQUE D: ALLOCATION ─── */}
          <Reveal className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="ds-eyebrow-pill">{t("car.allocation_eyebrow")}</span>
              <h2 className="ds-h2 text-foreground mt-4 mb-3">
                {t("car.more_you_participate")}
              </h2>
              <p className="ds-lead">
                {t("car.usage_desc")}
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[720px]">
                <div className="grid grid-cols-6 gap-2 px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground border-b border-border/50">
                  <div>{t("car.n_parts")}</div>
                  <div>{t("car.weeks_year")}</div>
                  <div>{t("car.days_year")}</div>
                  <div>{t("car.km_included")}</div>
                  <div>{t("car.investment")}</div>
                  <div>{t("car.annual_mgmt")}</div>
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
                      <div className="text-champagne font-bold">{Math.floor(r.weeks * 0.75)} {t("car.standard_short")} + {Math.ceil(r.weeks * 0.25)} {t("car.premium_short")}</div>
                      <div className="text-foreground">{Math.floor(r.days * 0.75)} + {Math.ceil(r.days * 0.25)} {t("car.days")}</div>
                      <div className="text-foreground">{r.km.toLocaleString("es-ES")} km</div>
                      <div className="text-foreground font-semibold">{r.invest.toLocaleString("es-ES")}€</div>
                      <div className="text-muted-foreground text-sm">{r.fee.toLocaleString("es-ES")}€</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4 text-center">
              {t("car.more_than_5")}{" "}
              <button onClick={() => scrollTo(consultaRef)} className="text-champagne hover:underline">
                {t("car.contact_custom")}
              </button>
            </p>
          </Reveal>

          {/* ─── BLOQUE E: LA EXPERIENCIA (carte immersive texte + image à gauche, stats à droite) ─── */}
          <section className="bg-card/20 border-y border-border/30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-20 mb-24">
            <div className="container mx-auto max-w-6xl grid lg:grid-cols-3 gap-6 items-stretch">
              {/* Carte immersive : image de fond + texte par-dessus (2 colonnes) */}
              <Reveal className="lg:col-span-2">
                <div className="group relative h-full min-h-[420px] rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_hsl(var(--champagne)/0.4)]">
                  {/* Image de fond + overlay */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden border border-border/50 transition-colors duration-500 group-hover:border-champagne/60">
                    <img
                      src={experienceImage}
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/75" />
                  </div>

                  {/* Contenu par-dessus */}
                  <div className="relative z-10 flex flex-col h-full p-8 sm:p-10">
                    <span className="ds-eyebrow-pill self-start">{t("car.experience_eyebrow")}</span>
                    <h2 className="ds-h2 text-foreground mt-4 mb-6">
                      {t("car.experience_title")}
                    </h2>
                    <p className="ds-lead leading-relaxed whitespace-pre-line">{luxuryDesc}</p>
                    <Button
                      variant="outline"
                      className="mt-8 self-start"
                      onClick={() => scrollTo(specsRef)}
                    >
                      {t("car.see_specs")}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Reveal>

              {/* 3 stat cards alignées à droite */}
              <div className="flex flex-col gap-4 lg:gap-6">
                {statCards.map((s, i) => (
                  <Reveal key={s.label} delay={0.1 * i} className="flex-1">
                    <div className="h-full bg-background rounded-xl border border-border/50 p-5 flex items-center gap-4">
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

          {/* ─── BLOQUE F: GALERÍA (carrusel con flechas) ─── */}
          <Reveal className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="ds-eyebrow-pill">{t("car.gallery_eyebrow")}</span>
            </div>

            <Carousel className="relative" opts={{ loop: galleryImages.length > 1 }}>
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div
                      className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-b from-muted to-background cursor-pointer"
                      onClick={() => {
                        setLightboxIndex(index);
                        trackEvent("view_car_gallery", { car_id: car.id, car_name: car.name, image_index: index, page_source: "car_detail" });
                      }}
                    >
                      <img
                        src={image}
                        alt={`${car.name} vista ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/70 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs text-muted-foreground pointer-events-none">
                        {index + 1} / {galleryImages.length}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {galleryImages.length > 1 && (
                <>
                  <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background hover:text-champagne" />
                  <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background hover:text-champagne" />
                </>
              )}
            </Carousel>
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
          <Reveal className="mb-24" >
            <div ref={specsRef}>
              <h2 className="ds-h2 mb-6 text-foreground text-center">{t("car.specs")}</h2>
              <Tabs value={specTab} onValueChange={setSpecTab}>
                <div className="-mx-4 sm:mx-0 mb-4">
                  <TabsList className="flex w-max sm:w-auto mx-4 sm:mx-0 gap-1 overflow-x-auto no-scrollbar">
                    <TabsTrigger value="motor" className="text-xs sm:text-sm whitespace-nowrap">{t("car.spec_tab_motor")}</TabsTrigger>
                    <TabsTrigger value="prestaciones" className="text-xs sm:text-sm whitespace-nowrap">{t("car.spec_tab_prestaciones")}</TabsTrigger>
                    <TabsTrigger value="dimensiones" className="text-xs sm:text-sm whitespace-nowrap">{t("car.spec_tab_dimensiones")}</TabsTrigger>
                    <TabsTrigger value="equipamiento" className="text-xs sm:text-sm whitespace-nowrap">{t("car.spec_tab_equipamiento")}</TabsTrigger>
                  </TabsList>
                </div>
                {Object.entries(SPEC_CATEGORIES).map(([cat, keys]) => {
                  const items = keys.filter((k) => displaySpecs?.[k]);
                  return (
                    <TabsContent key={cat} value={cat}>
                      <Card className="bg-card border-border rounded-2xl">
                        <CardContent className="p-5 sm:p-6">
                          {items.length === 0 ? (
                            <p className="text-muted-foreground text-sm text-center py-6">{t("car.no_specs_available")}</p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
                              {items.map((k) => (
                                <div
                                  key={k}
                                  className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 py-3 sm:py-3.5 border-b border-border/40 last:border-b-0 md:[&:nth-last-child(2)]:border-b-0"
                                >
                                  <span className="text-muted-foreground text-[11px] sm:text-sm uppercase tracking-wide leading-snug sm:flex-1 sm:min-w-0">
                                    {labels[k] || k}
                                  </span>
                                  <span className={`font-semibold text-sm sm:text-base text-left sm:text-right break-words leading-snug ${HIGHLIGHTED_SPECS.has(k) ? "text-champagne" : "text-foreground"}`}>
                                    {displaySpecs[k]}
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
          {displayFeatures?.length > 0 ? (
            <Reveal className="mb-24">
              <h2 className="ds-h2 mb-6 text-foreground text-center">{t("car.features_title")}</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {displayFeatures.map((feature, index) => (
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
          ) : null}

          {/* ─── BLOQUE I: COMPARATIVA ─── */}
          <Reveal className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="ds-h2 mb-3 text-foreground">{t("car.vs_title")}</h2>
              <p className="ds-lead">
                {t("car.vs_subtitle")}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">{t("car.comparison_concept")}</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">{t("car.individual_purchase")}</th>
                    <th className="text-center py-4 px-4 font-medium text-champagne">OWNEO Co-Sharing</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">{t("car.comp_initial_investment")}</td>
                    <td className="py-4 px-4 text-center text-foreground">{car.price}</td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">{sharePrice.toLocaleString("es-ES")}€</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">{t("car.comp_guaranteed_time")}</td>
                    <td className="py-4 px-4 text-center text-foreground">{t("car.comp_no_limit")}</td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">{t("car.cond_weeks", { n: weeksPerParticipation })}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">{t("car.comp_km_year")}</td>
                    <td className="py-4 px-4 text-center text-foreground">{t("car.comp_no_limit")}</td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">{kmPerParticipation.toLocaleString("es-ES")} km</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">{t("car.comp_annual_insurance")}</td>
                    <td className="py-4 px-4 text-center text-foreground">~{Math.round(car.numericPrice * 0.03).toLocaleString("es-ES")}€</td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">{t("car.comp_included")}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">{t("car.comp_annual_maintenance")}</td>
                    <td className="py-4 px-4 text-center text-foreground">~{Math.round(car.numericPrice * 0.02).toLocaleString("es-ES")}€</td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">{t("car.comp_included")}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">{t("car.comp_annual_storage")}</td>
                    <td className="py-4 px-4 text-center text-foreground">~3.000€</td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">{t("car.comp_included")}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">{t("car.comp_annual_mgmt_cost")}</td>
                    <td className="py-4 px-4 text-center text-foreground">
                      ~{(Math.round(car.numericPrice * 0.05) + 3000).toLocaleString("es-ES")}€
                    </td>
                    <td className="py-4 px-4 text-center text-champagne font-semibold">{annualFee.toLocaleString("es-ES")}€</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-foreground font-bold">{t("car.comp_duration")}</td>
                    <td className="py-4 px-4 text-center text-foreground font-bold">{t("car.comp_indefinite")}</td>
                    <td className="py-4 px-4 text-center text-champagne font-bold">{t("car.sticky_years", { n: durationYears })}</td>
                  </tr>
                </tbody>
              </table>
            </div>


            <div className="mt-6 p-6 bg-champagne/10 rounded-2xl border border-champagne/20">
              <p className="text-center text-foreground">
                <span className="font-bold text-champagne">~90%</span> {t("car.savings_banner")}
              </p>
            </div>
            <p className="text-xs text-muted-foreground italic mt-3">
              {t("car.savings_note")}
            </p>

          </Reveal>

          {/* ─── BLOQUE J: DISPONIBILIDAD Y CONDICIONES ─── */}
          <Reveal className="mb-24 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="ds-h3 mb-4 text-foreground">{t("car.available_in")}</h2>
              {car.availableIn && car.availableIn.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Disponible en
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {car.availableIn.map((city) => {
                      const slug = city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
                      const isSelected = selectedCity === city;
                      return (
                        <button
                          key={city}
                          onClick={() => setSelectedCity(city)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                            isSelected
                              ? "bg-champagne text-champagne-foreground border-champagne"
                              : "bg-transparent text-muted-foreground border-border hover:border-champagne/60 hover:text-foreground"
                          }`}
                        >
                          {city}
                        </button>
                      );
                    })}
                  </div>
                  {selectedCity && (
                    <div className="mt-3 flex items-center gap-3">
                      <Link
                        to={`/ubicaciones#${selectedCity.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`}
                        className="text-xs text-champagne underline hover:text-champagne/80 flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3" /> Ver showroom en {selectedCity}
                      </Link>
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2 mt-4 p-3 bg-card rounded-xl border border-border/50">
                <Shield className="w-4 h-4 text-champagne flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {t("car.exclusive_use_note")}
                </span>
              </div>
            </div>

            <div>
              <h2 className="ds-h3 mb-4 text-foreground">{t("car.conditions_title")}</h2>
              <ul className="space-y-3">
                {[
                  { icon: Calendar, text: t("car.cond_weeks", { n: weeksPerParticipation }) },
                  { icon: Gauge, text: t("car.cond_km", { km: kmPerParticipation.toLocaleString("es-ES") }) },
                  { icon: Clock, text: t("car.cond_duration", { n: durationYears }) },
                  { icon: TrendingUp, text: t("car.cond_resale") },
                  { icon: RefreshCw, text: t("car.cond_resale_managed") },
                  { icon: Shield, text: t("car.cond_included") },
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
          <section ref={consultaRef} className="bg-gradient-to-br from-card via-background to-card border-y border-border/50 -mx-4 sm:-mx-6 px-4 sm:px-6 py-20 mb-24">
            <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-10">
              <Reveal>
                <span className="ds-eyebrow-pill">{t("car.consult_eyebrow")}</span>
                <h2 className="ds-h2 text-foreground mt-4 mb-2">{t("car.consult_title")}</h2>
                <h3 className="ds-h3 text-champagne mb-4">{t("car.consult_subtitle")}</h3>
                <p className="ds-body leading-relaxed mb-6">
                  {t("car.consult_desc")}
                </p>
                <ul className="space-y-3">
                  {[
                    t("car.consult_perk_1"),
                    t("car.consult_perk_2"),
                    t("car.consult_perk_3"),
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-champagne" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <Card className="bg-card border border-border/50 rounded-2xl">
                  <CardContent className="p-6">
                    {submitted ? (
                      <div className="text-center py-8">
                        <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-champagne" />
                        <p className="text-foreground font-semibold mb-1">{t("car.thanks")}</p>
                        <p className="text-muted-foreground text-sm">
                          {t("car.request_received")}
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={form.handleSubmit((v) => consultaMutation.mutate(v))} className="space-y-4">
                        <div>
                          <label className="text-sm text-foreground mb-1 block">{t("car.form_name")} *</label>
                          <Input {...form.register("name")} placeholder={t("car.form_name_ph")} />
                          {form.formState.errors.name && <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm text-foreground mb-1 block">{t("car.form_email")} *</label>
                          <Input type="email" {...form.register("email")} placeholder="tu@email.com" />
                          {form.formState.errors.email && <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm text-foreground mb-1 block">{t("car.form_phone")}</label>
                          <Input type="tel" {...form.register("phone")} placeholder="+34 ..." />
                        </div>
                        <div>
                          <label className="text-sm text-foreground mb-1 block">{t("car.form_message")}</label>
                          <Textarea
                            {...form.register("message")}
                            rows={4}
                            placeholder={t("car.form_message_ph", { car: car.name })}
                          />
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="consent"
                            checked={form.watch("consent") as unknown as boolean}
                            onCheckedChange={(v) => form.setValue("consent", v as true, { shouldValidate: true })}
                          />
                          <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed">
                            {t("car.form_consent")}
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
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t("car.sending")}</>
                          ) : (
                            t("car.form_submit")
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
                  <span className="ds-tag mb-3">{t("car.sold_out_badge")}</span>
                  <h3 className="ds-h3 mb-3 mt-3 text-foreground">
                    {t("car.sold_out_title")}
                  </h3>
                  <p className="ds-body mb-6">
                    {t("car.sold_out_desc")}
                  </p>
                  <Link to="/coches">
                    <Button variant="outline">{t("car.sold_out_cta")}</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-champagne/5 via-card to-champagne/5 border border-champagne/20 rounded-3xl">
                <CardContent className="p-8 md:p-12 text-center">
                  <span className="ds-eyebrow-pill mb-4">
                    {t("car.cta_badge")} · {availableParticipations}/{maxParticipations}
                  </span>
                  <h2 className="ds-h2 text-foreground mb-3 mt-4">
                    {t("car.cta_title")} {car.name}
                  </h2>
                  <p className="ds-body max-w-2xl mx-auto mb-8">
                    {t("car.cta_subtitle")}
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {[
                      { icon: Shield, text: t("car.cta_secure") },
                      { icon: FileCheck, text: t("car.cta_nocommit") },
                      { icon: Clock, text: t("car.cta_response") },
                    ].map((p) => (
                      <span key={p.text} className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-card border border-border/50 rounded-full px-4 py-2">
                        <p.icon className="w-4 h-4 text-champagne" />
                        {p.text}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-center sm:justify-start">
                    <ParticipationForm
                      carId={car.id}
                      carName={car.name}
                      availableParticipations={availableParticipations}
                      sharePrice={discountedPrice}
                      pageSource="car_detail"
                      autoOpen={openParticipationForm}
                      onOpenChange={setOpenParticipationForm}
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
