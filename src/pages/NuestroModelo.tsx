import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Shield, Car, Sparkles, CalendarDays, Gauge, Percent,
  ShoppingCart, FileCheck, Wrench, Key, TrendingUp, BadgeCheck,
  Calculator, Check, X, Calendar, FileText, MessageCircle, BarChart,
  TrendingDown, RefreshCw, ArrowRight, ChevronDown, Wallet, Smartphone,
} from "lucide-react";
import owneoLogo from "@/assets/owneo-logo.png";
import porsche911 from "@/assets/cars/porsche-911-turbo-s.jpg";
import cardKeyBg from "@/assets/concepto/card-key.jpg";
import cardDashboardBg from "@/assets/concepto/card-dashboard.jpg";
import cardWheelBg from "@/assets/concepto/card-wheel.jpg";
import cardDetailingBg from "@/assets/concepto/card-detailing.jpg";
import heroConceptoBg from "@/assets/concepto/hero-concepto.jpg";
import carOutline from "@/assets/concepto/car-outline.png";

/* ---------------- helpers ---------------- */

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

function CountUp({
  end, duration = 1400, prefix = "", suffix = "", decimals = 0,
}: { end: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) {
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
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(end * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration, reduced]);

  const formatted = val.toLocaleString("es-ES", {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  });
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({
  children, delay = 0, className = "", as: As = "div",
}: { children: React.ReactNode; delay?: number; className?: string; as?: any }) {
  const MotionTag = (motion as any)[typeof As === "string" ? As : "div"];
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* ---------------- flip card (point 4) ---------------- */

function FlipCard({
  icon: Icon, title, desc, back,
}: { icon: any; title: string; desc: string; back: string }) {
  return (
    <div className="owneo-flip group h-full min-h-[200px]">
      <div className="owneo-flip-inner">
        {/* recto */}
        <div className="owneo-flip-face bg-card/50 rounded-2xl border border-border/50 p-6 text-center flex flex-col items-center justify-center">
          <Icon className="w-8 h-8 text-champagne mx-auto" />
          <h3 className="mt-4 ds-card-title">{title}</h3>
          <p className="mt-2 text-xs text-muted-foreground">{desc}</p>
        </div>
        {/* verso */}
        <div className="owneo-flip-face owneo-flip-back bg-card rounded-2xl border border-champagne/30 p-6 text-center flex flex-col items-center justify-center">
          <Icon className="w-6 h-6 text-champagne mx-auto mb-3" />
          <p className="text-xs text-muted-foreground leading-relaxed">{back}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- page ---------------- */

export default function NuestroModelo() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Nuestro Modelo — Cómo funciona el car sharing | Owneo</title>
        <meta name="description" content="Descubre cómo funciona Owneo: accede a un Ferrari, Lamborghini o Porsche pagando solo el 10% de su valor. Gastos compartidos entre 10 miembros, 4 semanas al año, experiencia total." />
        <link rel="canonical" href="https://www.owneo.es/nuestro-modelo" />
        <meta property="og:title" content="Nuestro Modelo | Owneo" />
        <meta property="og:description" content="Descubre cómo funciona Owneo: accede a un Ferrari, Lamborghini o Porsche pagando solo el 10% de su valor. Gastos compartidos entre 10 miembros, 4 semanas al año, experiencia total." />
        <meta property="og:url" content="https://www.owneo.es/nuestro-modelo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Owneo" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@owneo" />
      </Helmet>
      <Navbar />

      {/* shared blob keyframes + flip 3D utilities */}
      <style>{`
        @keyframes owneo-float { 0%,100% { transform: translateY(-12px) } 50% { transform: translateY(12px) } }
        @keyframes owneo-shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
        @keyframes owneo-draw { from { transform: scaleY(0) } to { transform: scaleY(1) } }
        @keyframes owneo-bounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(8px) } }
        @keyframes ken-burns { 0% { transform: scale(1) translate(0,0) } 100% { transform: scale(1.08) translate(-1%,-1%) } }
        .owneo-flip { perspective: 1200px; }
        .owneo-flip-inner { position: relative; width: 100%; height: 100%; transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); transform-style: preserve-3d; }
        .owneo-flip:hover .owneo-flip-inner { transform: rotateY(180deg); }
        .owneo-flip-face { position: absolute; inset: 0; width: 100%; height: 100%; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
        .owneo-flip-back { transform: rotateY(180deg); }
        @media (hover: none) {
          .owneo-flip:active .owneo-flip-inner { transform: rotateY(180deg); }
        }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0">
          <img
            src={heroConceptoBg}
            alt="OWNEO — el acceso inteligente al automovilismo de lujo"
            loading="eager"
            className="w-full h-full object-cover object-[65%_center] sm:object-center will-change-transform scale-110 sm:scale-100"
            style={{ animation: "ken-burns 20s ease-in-out infinite alternate" }}
          />
          <div className="absolute inset-0 bg-background/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background" />
        </div>
        <div
          className="pointer-events-none absolute top-10 -left-20 w-96 h-96 rounded-full bg-champagne/5 blur-3xl"
          style={{ animation: "owneo-float 8s ease-in-out infinite alternate" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 -right-20 w-96 h-96 rounded-full bg-champagne/5 blur-3xl"
          style={{ animation: "owneo-float 10s ease-in-out infinite alternate-reverse" }}
        />

        <div className="container relative mx-auto px-4 text-center">
          <Reveal>
            <span
              className="inline-block bg-champagne/10 text-champagne rounded-full px-4 py-2 text-sm border border-champagne/20"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0%, hsl(var(--champagne)/0.18) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "owneo-shimmer 3s linear infinite",
              }}
            >
              {t("model.eyebrow")}
            </span>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="mt-6 ds-h1">
              {t("model.title")}
              <br />
              <span className="text-champagne">{t("model.title_accent")}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("model.hero_subtitle")}
            </p>
          </Reveal>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { icon: Shield, label: t("model.tag1") },
              { icon: Car, label: t("model.tag2") },
              { icon: Sparkles, label: t("model.tag3") },
            ].map((p, i) => (
              <Reveal key={p.label} delay={0.6 + i * 0.1}>
                <div className="bg-card border border-border/50 rounded-full px-4 py-2 text-sm flex items-center gap-2 text-muted-foreground">
                  <p.icon className="w-4 h-4 text-champagne" />
                  {p.label}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex justify-center text-muted-foreground">
            <ChevronDown className="w-6 h-6" style={{ animation: "owneo-bounce 2s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ============ SECTION 2 — ¿QUÉ ES UNA PARTICIPACIÓN? ============ */}
      <section className="bg-card/30 border-y border-border py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <span className="ds-eyebrow-pill">
                {t("model.tag4")}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 ds-h2">
                {t("model.includes_title")}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-muted-foreground">
                {t("model.includes_subtitle")}
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CalendarDays, number: 4, suffix: "", unit: t("model.card1_label"),
                title: t("model.card1_title"),
                desc: t("model.card1_note"),
                badge: t("model.card1_detail"),
                bg: cardKeyBg, alt: "Llave de supercar sobre superficie oscura",
              },
              {
                icon: Gauge, number: 2000, suffix: "", unit: t("model.card2_label"),
                title: t("model.card2_title"),
                desc: t("model.card2_note"),
                bg: cardDashboardBg, alt: "Tablero de supercar con cuentarrevoluciones iluminado",
              },
              {
                icon: Percent, number: 10, suffix: "%", unit: "",
                title: t("model.card3_label"),
                desc: t("model.card3_title"),
                bg: cardWheelBg, alt: "Llanta forjada con pinza de freno carbono",
              },
              {
                icon: Shield, number: null, fixed: t("model.card4_label"), unit: "",
                title: t("model.card4_title"),
                desc: t("model.card4_note"),
                badge: t("model.card4_detail"),
                bg: cardDetailingBg, alt: "Supercar en detallado premium",
              },
            ].map((c: any, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="group relative h-full overflow-hidden rounded-2xl p-8 border border-border/50 text-center transition-all duration-300 hover:scale-105 hover:border-champagne/50 hover:shadow-[0_0_40px_-10px_hsl(var(--champagne)/0.3)]">
                  <img
                    src={c.bg}
                    alt={c.alt}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/65" />
                  <div className="relative">
                    <c.icon className="w-10 h-10 text-champagne mx-auto mb-4" />
                    <div className="text-4xl font-bold text-white">
                      {c.number !== null ? (
                        <CountUp end={c.number} suffix={c.suffix} />
                      ) : (
                        c.fixed
                      )}
                    </div>
                    <div className="text-sm text-white/80 mt-1">{c.unit}</div>
                    <h3 className="mt-4 ds-card-title text-white">{c.title}</h3>
                    <p className="mt-2 text-sm text-white/80">{c.desc}</p>
                    {c.badge && (
                      <div className="mt-4 text-xs text-champagne">{c.badge}</div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 3 — TIMELINE ============ */}
      <section className="bg-background py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <h2 className="ds-h2">
                Tú conduces.<br />
                <span className="text-champagne">Nosotros nos encargamos de todo lo demás.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-muted-foreground">
                Desde la compra del vehículo hasta su reventa, pasando por cada revisión, cada seguro y cada entrega
                — OWNEO gestiona cada detalle para que tú solo tengas que disfrutar.
              </p>
            </Reveal>
          </div>

          <div className="relative mt-16 max-w-5xl mx-auto">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-champagne/30 md:-translate-x-1/2"
            />

            <div className="space-y-12">
              {[
                { icon: ShoppingCart, title: "Compra del vehículo", desc: "OWNEO adquiere el vehículo de concesionarios oficiales certificados. Tú no te preocupas por la negociación ni los trámites." },
                { icon: FileCheck, title: "Contrato y documentación", desc: "Contrato claro que garantiza tus 4 semanas (3 estándar + 1 premium) anuales por participación y todos los derechos de uso." },
                { icon: Shield, title: "Seguro a todo riesgo", desc: "Cobertura completa con aseguradora premium. Cada participante está cubierto como conductor habitual." },
                { icon: Wrench, title: "Mantenimiento y revisiones", desc: "Todas las revisiones programadas y reparaciones gestionadas por OWNEO. El vehículo siempre en perfectas condiciones." },
                { icon: Key, title: "Entrega profesional", desc: "Un gestor OWNEO te entrega el vehículo en persona, impecablemente preparado, revisado y documentado." },
                { icon: TrendingUp, title: "Reventa gestionada", desc: "Al término del período acordado (indicado en la ficha de cada vehículo), OWNEO gestiona la venta y redistribuye el valor entre los participantes." },
              ].map((it, i) => {
                const right = i % 2 === 1;
                return (
                  <Reveal key={i} delay={i * 0.15}>
                    <div className={`relative flex md:items-center ${right ? "md:flex-row-reverse" : ""}`}>
                      <div className="hidden md:block w-1/2" />
                      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-champagne/20 border border-champagne/50 flex items-center justify-center">
                        <it.icon className="w-4 h-4 text-champagne" />
                      </div>
                      <div className={`pl-16 md:pl-0 md:w-1/2 ${right ? "md:pr-16" : "md:pl-16"}`}>
                        <div className="bg-card border border-border/50 rounded-2xl p-6 hover:border-champagne/30 transition-colors">
                          <h3 className="ds-card-title">{it.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4 — ENTREGA ============ */}
      <section className="bg-card/30 border-y border-border py-20 sm:py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="ds-eyebrow-pill">
              Cada entrega, una experiencia
            </span>
            <h2 className="mt-4 ds-h2">
              Cada vez que recoges tu coche, está impecable.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Antes de cada entrega, nuestro equipo prepara el vehículo de forma profesional: limpieza integral,
              revisión técnica, documentación fotográfica del estado. Un gestor OWNEO te hace entrega en persona.
              Tú solo tienes que sentarte al volante.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Vehículo verificado y documentado fotográficamente",
                "Limpieza y preparación profesional antes de cada uso",
                "Entrega y recogida en mano por gestor OWNEO",
                "Check-out documentado tras cada uso",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-card rounded-2xl border border-champagne/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="ds-card-title">Protocolo de entrega OWNEO</h3>
                <span className="text-xs bg-champagne/10 text-champagne rounded-full px-3 py-1 border border-champagne/20">
                  Verificado
                </span>
              </div>
              <ul className="space-y-3">
                {[
                  "Estado exterior documentado",
                  "Interior revisado",
                  "Nivel de combustible verificado",
                  "Kilometraje registrado",
                  "Documentación en regla",
                  "Vehículo listo para entrega",
                ].map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    </span>
                    <span className="text-foreground">{t}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                <BadgeCheck className="w-4 h-4 text-champagne" />
                Firmado por gestor OWNEO
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ SECTION 5 — COMPARATIVA ============ */}
      <section className="bg-background py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <span className="ds-eyebrow-pill">
                Comparativa de costes
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 ds-h2">La decisión más inteligente</h2>
              <p className="mt-2 text-champagne">Números reales, comparativa honesta.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-muted-foreground">
                Análisis transparente de los costes anuales de gestión (sin incluir precio de adquisición ni depreciación)
                comparado con la propiedad tradicional.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 max-w-4xl mx-auto overflow-hidden rounded-2xl border border-border">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] sm:grid-cols-[1.4fr_1fr_1fr] text-xs sm:text-sm">
                <div className="bg-muted/20 p-2.5 sm:p-4 font-semibold">Concepto</div>
                <div className="bg-red-500/5 p-2.5 sm:p-4 font-semibold flex items-center gap-1.5 sm:gap-2">
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 shrink-0" />
                  <span className="leading-tight">Propietario<span className="hidden sm:inline"> único</span></span>
                </div>
                <div className="bg-champagne/5 p-2.5 sm:p-4 font-semibold flex items-center gap-1.5 sm:gap-2 ring-1 ring-champagne/30">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-champagne shrink-0" /> OWNEO
                </div>

                {[
                  { label: "Seguro anual", owner: 5000, owneo: 500, maxBar: 5000 },
                  { label: "Mantenimiento", owner: 8000, owneo: 800, maxBar: 8000 },
                  { label: "Parking/Garaje", owner: 3600, owneo: 360, maxBar: 8000 },
                  { label: "Limpieza", owner: 1200, owneo: 120, maxBar: 8000 },
                ].map((row) => (
                  <RowCompare key={row.label} row={row} />
                ))}

                <div className="bg-muted/30 p-2.5 sm:p-4 font-bold border-t border-border">TOTAL</div>
                <div className="bg-red-500/10 p-2.5 sm:p-4 font-bold border-t border-border whitespace-nowrap">
                  <CountUp end={17800} prefix="€" /><span className="text-muted-foreground font-normal">/año</span>
                </div>
                <div className="bg-champagne/10 p-2.5 sm:p-4 font-bold border-t border-border ring-1 ring-champagne/30 text-champagne whitespace-nowrap">
                  <CountUp end={1780} prefix="€" /><span className="text-champagne/70 font-normal">/año</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 text-center">
              <div className="text-6xl sm:text-7xl font-bold text-champagne">
                <CountUp end={90} suffix="%" />
              </div>
              <p className="mt-2 text-lg text-muted-foreground">de ahorro en costes anuales de gestión</p>
              <p className="mt-1 text-sm text-muted-foreground">10x menos caro a lo largo de 5 años</p>
              <p className="mt-6 italic text-xs text-muted-foreground max-w-2xl mx-auto">
                Estimación basada en un vehículo de €250.000 con kilometraje controlado. Los valores reales varían
                según el modelo. Depreciación y costes de adquisición no incluidos en este cálculo anual.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ SECTION 6 — CASO PRÁCTICO ============ */}
      <section className="bg-card/30 border-y border-border py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Reveal>
              <span className="ds-eyebrow-pill">
                Caso práctico
              </span>
              <h2 className="mt-4 ds-h2">Así funciona en la realidad</h2>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Reveal>
              <div className="bg-card rounded-2xl border border-border/50 p-8">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-champagne/20 blur-2xl rounded-full" />
                    <img src={carOutline} alt="Porsche 911 Turbo S" className="relative w-28 h-auto" />
                  </div>
                </div>
                <h3 className="mt-4 ds-h3 text-center">Porsche 911 Turbo S</h3>
                <p className="text-center text-sm text-muted-foreground">Ejemplo de participación</p>

                <ul className="mt-6 divide-y divide-border/50 text-sm">
                  {[
                    ["Precio del vehículo", "€250.000"],
                    ["Participaciones disponibles", "10"],
                    ["Precio por participación", <span key="p" className="text-champagne font-bold">€25.000</span>],
                    ["Semanas/año por participación", "4 (3+1)"],
                    ["Km/año por participación", "2.000"],
                    ["Duración", "según ficha del vehículo"],
                  ].map(([k, v], i) => (
                    <li key={i} className="flex justify-between py-3">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-gradient-to-br from-champagne/10 via-card to-champagne/10 rounded-2xl border border-champagne/20 p-8 h-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-champagne" />
                    <h3 className="ds-card-title">Tu participación</h3>
                  </div>
                  <span className="text-xs bg-champagne/15 text-champagne rounded-full px-3 py-1 border border-champagne/20">
                    1 participación
                  </span>
                </div>

                <ul className="mt-6 space-y-4 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2"><Wallet className="w-4 h-4 text-champagne shrink-0" /> Tu inversión</span>
                    <span className="font-bold text-champagne text-lg"><CountUp end={25000} prefix="€" /></span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2"><CalendarDays className="w-4 h-4 text-champagne shrink-0" /> Semanas al año</span>
                    <span className="font-medium"><CountUp end={4} /> semanas (3+1)</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2"><Gauge className="w-4 h-4 text-champagne shrink-0" /> Km incluidos</span>
                    <span className="font-medium"><CountUp end={2000} /> km</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2"><Smartphone className="w-4 h-4 text-champagne shrink-0" /> Reserva</span>
                    <span className="font-medium">Digital · 24/7</span>
                  </li>
                  <li className="flex items-start justify-between gap-4">
                    <span className="text-muted-foreground flex items-center gap-2"><RefreshCw className="w-4 h-4 text-champagne shrink-0" /> Valor recuperado</span>
                    <div className="text-right">
                      <div className="font-bold text-green-500"><CountUp end={17500} prefix="hasta €" /></div>
                      <div className="text-xs text-muted-foreground">al término del período · kilometraje controlado</div>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 rounded-2xl bg-champagne/5 border border-champagne/20 p-4 text-sm text-muted-foreground">
                  Con 1 participación, disfrutas 4 semanas (3 estándar + 1 premium) al año de un Porsche 911 Turbo S por €25.000
                  — y OWNEO gestiona absolutamente todo lo demás.
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 max-w-3xl mx-auto bg-card rounded-2xl border border-champagne/20 p-6 text-center">
              <p className="text-muted-foreground">
                ¿Quieres más tiempo al volante? Adquiere 2 participaciones y disfruta de 8 semanas (6 estándar + 2 premium) al año —
                o participa en varios vehículos de la flota OWNEO.
              </p>
              <Button asChild className="mt-4 bg-champagne text-champagne-foreground hover:bg-champagne/90">
                <Link to="/coches">Ver la flota <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ SECTION 7 — APP ============ */}
      <section className="bg-background py-20 sm:py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <Reveal>
              <span className="ds-eyebrow-pill">
                App OWNEO · Acceso exclusivo participantes
              </span>
              <h2 className="mt-4 ds-h2">Todo en la palma de tu mano.</h2>
              <p className="mt-4 text-muted-foreground">
                Una vez participante, accedes a la app OWNEO — disponible como aplicación web desde cualquier dispositivo.
                Sin descargas adicionales, siempre disponible.
              </p>
            </Reveal>

            <ul className="mt-8 space-y-4">
              {[
                { icon: Calendar, t: "Reserva tus semanas directamente desde la app" },
                { icon: Car, t: "Consulta el estado de tu vehículo en tiempo real" },
                { icon: FileText, t: "Accede a todos los documentos del coche" },
                { icon: MessageCircle, t: "Contacta con tu gestor OWNEO en cualquier momento" },
                { icon: BarChart, t: "Consulta tu historial de usos y semanas disponibles" },
              ].map((f, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-champagne/10 border border-champagne/20 flex items-center justify-center">
                      <f.icon className="w-5 h-5 text-champagne" />
                    </span>
                    <span className="text-sm text-muted-foreground">{f.t}</span>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.3}>
              <div className="mt-6 inline-block text-xs bg-card border border-border/50 rounded-full px-3 py-1 text-muted-foreground">
                PWA · Compatible iOS & Android · Sin instalación
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-2 relative flex justify-center">
            <div className="absolute bg-champagne/20 blur-3xl w-64 h-64 rounded-full -z-0" />
            <Reveal delay={0.2}>
              <div className="relative bg-gradient-to-b from-card to-background border-[6px] border-foreground/10 rounded-[2.8rem] p-2.5 overflow-hidden shadow-2xl shadow-champagne/20 w-[270px] aspect-[9/19.5]">
                {/* notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-foreground/90 rounded-full z-20" />

                <div className="relative h-full w-full bg-background rounded-[2.2rem] overflow-hidden flex flex-col">
                  {/* status bar */}
                  <div className="pt-7 px-4 pb-2 flex items-center justify-between text-[9px] text-foreground/70 font-medium">
                    <span>9:41</span>
                    <img src={owneoLogo} alt="OWNEO" className="h-3 w-auto opacity-90 mix-blend-screen" />
                    <span>100%</span>
                  </div>

                  <div className="px-3 pb-2 space-y-2.5 flex-1 overflow-hidden">
                    {/* product card */}
                    <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
                      <div className="relative h-24 overflow-hidden">
                        <img src={porsche911} alt="Porsche 911 Turbo S" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                        <span className="absolute top-1.5 right-1.5 text-[8px] bg-champagne/90 text-champagne-foreground px-1.5 py-0.5 rounded-full font-semibold tracking-wide">VIP</span>
                      </div>
                      <div className="p-2">
                        <p className="text-[10px] font-semibold leading-tight">Porsche 911 Turbo S</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">Madrid · 4 semanas</p>
                      </div>
                    </div>

                    {/* progress */}
                    <div className="rounded-2xl bg-card border border-border/50 p-2">
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] text-muted-foreground">Semanas restantes</p>
                        <p className="text-[9px] text-champagne font-semibold">3 / 4</p>
                      </div>
                      <div className="mt-1.5 h-1.5 bg-muted/40 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-champagne/70 to-champagne rounded-full" />
                      </div>
                    </div>

                    {/* calendar */}
                    <div className="rounded-2xl bg-card border border-border/50 p-2">
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] font-semibold">Junio 2026</p>
                        <Calendar className="w-2.5 h-2.5 text-champagne" />
                      </div>
                      <div className="grid grid-cols-7 gap-[3px] mt-1.5 text-[7px] text-muted-foreground text-center">
                        {["L","M","X","J","V","S","D"].map((d) => (
                          <span key={d} className="leading-none">{d}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-[3px] mt-1 text-[7px] text-center">
                        {Array.from({ length: 28 }, (_, i) => {
                          const day = i + 1;
                          const booked = [8, 9, 10, 11, 12, 13, 14].includes(day);
                          const selected = [22, 23, 24, 25, 26, 27, 28].includes(day);
                          return (
                            <span
                              key={day}
                              className={`aspect-square flex items-center justify-center rounded-[3px] leading-none ${
                                selected
                                  ? "bg-champagne text-champagne-foreground font-semibold"
                                  : booked
                                  ? "bg-muted/40 text-muted-foreground line-through"
                                  : "text-foreground/70"
                              }`}
                            >
                              {day}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="text-[10px] text-center bg-champagne text-champagne-foreground rounded-lg py-1.5 font-semibold">
                        Reservar
                      </div>
                      <div className="text-[10px] text-center bg-card border border-border/50 rounded-lg py-1.5">
                        Documentos
                      </div>
                    </div>
                  </div>

                  {/* bottom nav */}
                  <div className="h-9 bg-card border-t border-border/50 flex items-center justify-around shrink-0">
                    {[Calendar, Car, FileText, MessageCircle].map((I, i) => (
                      <I key={i} className={`w-3.5 h-3.5 ${i === 0 ? "text-champagne" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ SECTION 8 — CHIFFRES CLÉS ============ */}
      <section className="bg-card/30 border-y border-border py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="ds-h2 text-center">OWNEO en cifras</h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: TrendingDown, big: <>~<CountUp end={90} suffix="%" /></>, title: "Menos costes de gestión", desc: "Frente a la propiedad tradicional, tu cuota anual divide todos los gastos de gestión entre los participantes." },
              { icon: RefreshCw, big: <>hasta <CountUp end={70} suffix="%" /></>, title: "Del valor recuperado", desc: "Al revender el vehículo al término del período acordado, recuperas hasta el 70% de tu participación inicial gracias al kilometraje controlado." },
              { icon: Sparkles, big: "0", title: "Cargas de gestión", desc: "OWNEO gestiona compra, seguro, mantenimiento, parking, entrega y reventa. Tu única responsabilidad es disfrutar." },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="group h-full bg-background rounded-2xl p-10 border border-border/50 text-center transition-all duration-300 hover:scale-105 hover:border-champagne/50 hover:shadow-[0_0_40px_-10px_hsl(var(--champagne)/0.3)]">
                  <c.icon className="w-8 h-8 text-champagne mx-auto transition-transform duration-500 group-hover:scale-110" />
                  <div className="mt-4 text-5xl sm:text-6xl font-bold text-champagne transition-transform duration-500 group-hover:scale-105">{c.big}</div>
                  <h3 className="mt-4 ds-card-title">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 9 — SEGURIDAD ============ */}
      <section className="bg-background py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <span className="ds-eyebrow-pill">
                Protección del participante
              </span>
              <h2 className="mt-4 ds-h2">Tu inversión, protegida.</h2>
              <p className="mt-4 text-muted-foreground">
                Cada participación OWNEO está respaldada por un contrato, un seguro y un protocolo de verificación riguroso.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Pasa el cursor sobre cada tarjeta para saber más.</p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Car, title: "Vehículos verificados", desc: "Inspección técnica completa antes de cada uso", back: "Cada vehículo pasa una revisión mecánica y estética antes de cada entrega. Documentamos su estado con fotos para que recibas siempre un coche impecable." },
              { icon: BadgeCheck, title: "Participantes verificados", desc: "Proceso de admisión riguroso", back: "Validamos la identidad y el perfil de cada participante. Compartes tu vehículo solo con miembros igual de comprometidos que tú." },
              { icon: FileCheck, title: "Contrato garantizado", desc: "Tus derechos de uso por escrito", back: "Tus semanas, tus kilómetros y tus condiciones quedan fijados por contrato. Sin ambigüedades, sin letra pequeña." },
              { icon: Shield, title: "Seguro premium", desc: "Cobertura completa con aseguradora reconocida", back: "Póliza a todo riesgo con una aseguradora de primer nivel. Cada participante conduce cubierto como conductor habitual." },
              { icon: FileText, title: "Costes transparentes", desc: "Sin sorpresas ni cargos ocultos", back: "Una única cuota anual lo cubre todo: seguro, mantenimiento, parking y gestión. Sabes exactamente lo que pagas, siempre." },
              { icon: RefreshCw, title: "Reventa gestionada", desc: "OWNEO gestiona la salida de tu inversión", back: "Al término del período, vendemos el vehículo y te devolvemos tu parte. Recuperas hasta el 70% gracias al kilometraje controlado." },
            ].map((it, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <FlipCard icon={it.icon} title={it.title} desc={it.desc} back={it.back} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 10 — CTA ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-card via-background to-card border-y border-border py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 m-auto w-[600px] h-[600px] rounded-full bg-champagne/10 blur-3xl"
          style={{ animation: "owneo-float 9s ease-in-out infinite alternate" }}
        />
        <div className="container relative mx-auto px-4 text-center">
          <Reveal>
            <h2 className="ds-h2">¿Listo para vivir la experiencia?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Explora nuestra flota, elige tu vehículo y solicita tu participación. OWNEO se encarga del resto.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-champagne text-champagne-foreground hover:bg-champagne/90">
                <Link to="/coches">Ver la flota <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/coches">Solicitar participación</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-xs text-muted-foreground">
              Sin compromiso · Proceso 100% digital · Respuesta en 24h
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------------- row compare ---------------- */

function RowCompare({
  row,
}: { row: { label: string; owner: number; owneo: number; maxBar: number } }) {
  return (
    <>
      <div className="p-2.5 sm:p-4 border-t border-border bg-muted/10 text-xs sm:text-sm text-muted-foreground leading-tight self-center">{row.label}</div>
      <BarCell value={row.owner} max={row.maxBar} bg="bg-red-500/5" barClass="bg-red-500/70" />
      <BarCell value={row.owneo} max={row.maxBar} bg="bg-champagne/5 ring-1 ring-champagne/30" barClass="bg-champagne" />
    </>
  );
}

function BarCell({
  value, max, bg, barClass,
}: { value: number; max: number; bg: string; barClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div ref={ref} className={`p-2.5 sm:p-4 border-t border-border ${bg}`}>
      <div className="text-xs sm:text-sm font-medium whitespace-nowrap">€{value.toLocaleString("es-ES")}</div>
      <div className="mt-1.5 sm:mt-2 h-1 sm:h-1.5 bg-muted/40 rounded-full overflow-hidden">
        <div
          className={`h-full ${barClass} rounded-full transition-[width] duration-1000 ease-out`}
          style={{ width: inView ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}
