import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Shield, Car, Sparkles, CalendarDays, Gauge, Percent,
  ShoppingCart, FileCheck, Wrench, Key, TrendingUp, BadgeCheck,
  Calculator, Check, X, Calendar, FileText, MessageCircle, BarChart,
  TrendingDown, RefreshCw, ArrowRight, ChevronDown,
} from "lucide-react";

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

/* ---------------- page ---------------- */

export default function NuestroModelo() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* shared blob keyframes */}
      <style>{`
        @keyframes owneo-float { 0%,100% { transform: translateY(-12px) } 50% { transform: translateY(12px) } }
        @keyframes owneo-shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
        @keyframes owneo-draw { from { transform: scaleY(0) } to { transform: scaleY(1) } }
        @keyframes owneo-bounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(8px) } }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
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
              Derecho de uso · Todo incluido · Sin cargas
            </span>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              El acceso más inteligente al
              <br />
              <span className="text-champagne">automovilismo de lujo</span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              OWNEO reinventa la relación con los coches de alta gama. No compras un coche. No lo alquilas.
              Adquieres el derecho a disfrutarlo como si fuera tuyo — con todo el servicio, sin ninguna de las cargas.
            </p>
          </Reveal>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { icon: Shield, label: "Contrato garantizado" },
              { icon: Car, label: "Vehículos premium" },
              { icon: Sparkles, label: "Cero gestión" },
            ].map((p, i) => (
              <Reveal key={p.label} delay={0.6 + i * 0.1}>
                <div className="bg-card border border-border/50 rounded-full px-4 py-2 text-sm flex items-center gap-2 text-muted-foreground">
                  <p.icon className="w-4 h-4 text-champagne" />
                  {p.label}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex justify-center text-muted-foreground/60">
            <ChevronDown className="w-6 h-6" style={{ animation: "owneo-bounce 2s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ============ SECTION 2 — ¿QUÉ ES UNA PARTICIPACIÓN? ============ */}
      <section className="bg-card/30 border-y border-border py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <span className="inline-block bg-champagne/10 text-champagne rounded-full px-4 py-2 text-sm border border-champagne/20">
                Participación OWNEO
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">
                Todo lo que incluye tu participación
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-muted-foreground">
                Una participación OWNEO es un contrato de derecho de uso sobre un vehículo específico.
                Tú eliges el coche, adquieres tu participación, y OWNEO se encarga de absolutamente todo lo demás.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CalendarDays, number: 4, suffix: "", unit: "semanas",
                title: "Por participación al año",
                desc: "¿Quieres más tiempo? Adquiere más participaciones en el mismo vehículo o en otros modelos de la flota.",
                badge: "= 28 días garantizados",
              },
              {
                icon: Gauge, number: 2000, suffix: "", unit: "km",
                title: "Incluidos por participación",
                desc: "Kilómetros garantizados por participación y por año, con el vehículo siempre impecable y a punto.",
              },
              {
                icon: Percent, number: 10, suffix: "%", unit: "",
                title: "Del valor del vehículo",
                desc: "Precio de entrada claro y único. Sin letra pequeña, sin sorpresas. El resto lo gestiona OWNEO.",
              },
              {
                icon: Shield, number: null, fixed: "Cuota", unit: "anual fija",
                title: "Todo incluido",
                desc: "Una cuota anual cubre seguro, mantenimiento, parking y toda la gestión. Tú no gestionas absolutamente nada.",
                badge: "Seguro · Parking · Mantenimiento",
              },
            ].map((c: any, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="group h-full bg-background rounded-2xl p-8 border border-border/50 text-center transition-all duration-300 hover:scale-105 hover:border-champagne/50 hover:shadow-[0_0_40px_-10px_hsl(var(--champagne)/0.3)]">
                  <c.icon className="w-10 h-10 text-champagne mx-auto mb-4" />
                  <div className="text-4xl font-bold text-foreground">
                    {c.number !== null ? (
                      <CountUp end={c.number} suffix={c.suffix} />
                    ) : (
                      c.fixed
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{c.unit}</div>
                  <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                  {c.badge && (
                    <div className="mt-4 text-xs text-champagne">{c.badge}</div>
                  )}
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
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
                { icon: FileCheck, title: "Contrato y documentación", desc: "Contrato claro que garantiza tus 4 semanas anuales por participación y todos los derechos de uso." },
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
                          <h3 className="text-lg font-semibold">{it.title}</h3>
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
            <span className="inline-block bg-champagne/10 text-champagne rounded-full px-4 py-2 text-sm border border-champagne/20">
              Cada entrega, una experiencia
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">
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
            <div className="bg-card rounded-3xl border border-champagne/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Protocolo de entrega OWNEO</h3>
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
              <span className="inline-flex items-center gap-2 bg-champagne/10 text-champagne rounded-full px-4 py-2 text-sm border border-champagne/20">
                <Calculator className="w-4 h-4" /> Comparativa de costes
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">La decisión más inteligente</h2>
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
              <p className="mt-6 italic text-xs text-muted-foreground/70 max-w-2xl mx-auto">
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
              <span className="inline-block bg-champagne/10 text-champagne rounded-full px-4 py-2 text-sm border border-champagne/20">
                Caso práctico
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">Así funciona en la realidad</h2>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Reveal>
              <div className="bg-card rounded-3xl border border-border/50 p-8">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-champagne/20 blur-2xl rounded-full" />
                    <Car className="w-16 h-16 text-champagne relative" />
                  </div>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-center">Porsche 911 Turbo S</h3>
                <p className="text-center text-sm text-muted-foreground">Ejemplo de participación</p>

                <ul className="mt-6 divide-y divide-border/50 text-sm">
                  {[
                    ["Precio del vehículo", "€250.000"],
                    ["Participaciones disponibles", "10"],
                    ["Precio por participación", <span key="p" className="text-champagne font-bold">€25.000</span>],
                    ["Semanas/año por participación", "4"],
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
              <div className="bg-gradient-to-br from-champagne/10 via-card to-champagne/10 rounded-3xl border border-champagne/20 p-8 h-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-champagne" />
                    <h3 className="font-bold">Tu participación</h3>
                  </div>
                  <span className="text-xs bg-champagne/15 text-champagne rounded-full px-3 py-1 border border-champagne/20">
                    1 participación
                  </span>
                </div>

                <ul className="mt-6 space-y-4 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">💰 Tu inversión</span>
                    <span className="font-bold text-champagne text-lg"><CountUp end={25000} prefix="€" /></span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">📅 Semanas al año</span>
                    <span className="font-medium"><CountUp end={4} /> semanas</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">🛣️ Km incluidos</span>
                    <span className="font-medium"><CountUp end={2000} /> km</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">📱 Reserva</span>
                    <span className="font-medium">Digital · 24/7</span>
                  </li>
                  <li className="flex items-start justify-between gap-4">
                    <span className="text-muted-foreground">🔄 Valor recuperado</span>
                    <div className="text-right">
                      <div className="font-bold text-green-500"><CountUp end={17500} prefix="hasta €" /></div>
                      <div className="text-xs text-muted-foreground">al término del período · kilometraje controlado</div>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 rounded-2xl bg-champagne/5 border border-champagne/20 p-4 text-sm text-muted-foreground">
                  Con 1 participación, disfrutas 4 semanas al año de un Porsche 911 Turbo S por €25.000
                  — y OWNEO gestiona absolutamente todo lo demás.
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 max-w-3xl mx-auto bg-card rounded-2xl border border-champagne/20 p-6 text-center">
              <p className="text-muted-foreground">
                ¿Quieres más tiempo al volante? Adquiere 2 participaciones y disfruta de 8 semanas al año —
                o participa en varios vehículos de la flota OWNEO.
              </p>
              <Button asChild className="mt-4 bg-champagne text-champagne-foreground hover:bg-champagne/90">
                <Link to="/portfolio">Ver la flota <ArrowRight className="ml-2 w-4 h-4" /></Link>
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
              <span className="inline-block bg-champagne/10 text-champagne rounded-full px-4 py-2 text-sm border border-champagne/20">
                App OWNEO · Acceso exclusivo participantes
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">Todo en la palma de tu mano.</h2>
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
              <div className="relative bg-card border-4 border-foreground/20 rounded-[2.5rem] p-3 overflow-hidden shadow-2xl shadow-champagne/10 w-[260px] aspect-[9/19]">
                <div className="h-6 flex items-center justify-center text-[10px] text-muted-foreground bg-background rounded-t-2xl">
                  OWNEO
                </div>
                <div className="mt-2 p-3 space-y-3">
                  <div className="rounded-xl bg-background border border-border/50 overflow-hidden">
                    <div className="h-24 bg-gradient-to-br from-champagne/30 to-card flex items-center justify-center">
                      <Car className="w-10 h-10 text-champagne" />
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-semibold">Porsche 911 Turbo S</p>
                      <p className="text-[10px] text-muted-foreground">Madrid · 4 semanas disponibles</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-background border border-border/50 p-2">
                    <p className="text-[10px] text-muted-foreground">Semanas restantes</p>
                    <div className="mt-1 h-2 bg-muted/40 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-champagne" />
                    </div>
                    <p className="text-[10px] mt-1 text-champagne">3 / 4</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-[10px] text-center bg-champagne text-champagne-foreground rounded-lg py-1.5 font-semibold">
                      Reservar
                    </div>
                    <div className="text-[10px] text-center bg-background border border-border/50 rounded-lg py-1.5">
                      Documentos
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-10 bg-background border-t border-border/50 flex items-center justify-around">
                  {[Calendar, Car, FileText, MessageCircle].map((I, i) => (
                    <I key={i} className="w-4 h-4 text-muted-foreground" />
                  ))}
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">OWNEO en cifras</h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: TrendingDown, big: <>~<CountUp end={90} suffix="%" /></>, title: "Menos costes de gestión", desc: "Frente a la propiedad tradicional, tu cuota anual divide todos los gastos de gestión entre los participantes." },
              { icon: RefreshCw, big: <>hasta <CountUp end={70} suffix="%" /></>, title: "Del valor recuperado", desc: "Al revender el vehículo al término del período acordado, recuperas hasta el 70% de tu participación inicial gracias al kilometraje controlado." },
              { icon: Sparkles, big: "0", title: "Cargas de gestión", desc: "OWNEO gestiona compra, seguro, mantenimiento, parking, entrega y reventa. Tu única responsabilidad es disfrutar." },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="h-full bg-background rounded-3xl p-10 border border-border/50 text-center transition-all hover:border-champagne/30">
                  <c.icon className="w-8 h-8 text-champagne mx-auto" />
                  <div className="mt-4 text-5xl sm:text-6xl font-bold text-champagne">{c.big}</div>
                  <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
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
              <span className="inline-block bg-champagne/10 text-champagne rounded-full px-4 py-2 text-sm border border-champagne/20">
                Protección del participante
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">Tu inversión, protegida.</h2>
              <p className="mt-4 text-muted-foreground">
                Cada participación OWNEO está respaldada por un contrato, un seguro y un protocolo de verificación riguroso.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Car, title: "Vehículos verificados", desc: "Inspección técnica completa antes de cada uso" },
              { icon: BadgeCheck, title: "Participantes verificados", desc: "Proceso de admisión riguroso" },
              { icon: FileCheck, title: "Contrato garantizado", desc: "Tus derechos de uso por escrito" },
              { icon: Shield, title: "Seguro premium", desc: "Cobertura completa con aseguradora reconocida" },
              { icon: FileText, title: "Costes transparentes", desc: "Sin sorpresas ni cargos ocultos" },
              { icon: RefreshCw, title: "Reventa gestionada", desc: "OWNEO gestiona la salida de tu inversión" },
            ].map((it, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-card/50 rounded-2xl border border-border/50 p-6 text-center transition-all hover:border-champagne/30 h-full">
                  <it.icon className="w-8 h-8 text-champagne mx-auto" />
                  <h3 className="mt-4 font-semibold text-sm">{it.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{it.desc}</p>
                </div>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">¿Listo para vivir la experiencia?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Explora nuestra flota, elige tu vehículo y solicita tu participación. OWNEO se encarga del resto.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-champagne text-champagne-foreground hover:bg-champagne/90">
                <Link to="/portfolio">Ver la flota <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/portfolio">Solicitar participación</Link>
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
