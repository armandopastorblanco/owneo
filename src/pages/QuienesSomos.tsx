import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gem,
  Shield,
  Award,
  Heart,
  Sparkles,
  TrendingUp,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PressSection from "@/components/PressSection";
import { Button } from "@/components/ui/button";
import quienesSomosHero from "@/assets/quienes-somos-hero.png";

/* ---------------- motion helpers ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: any;
}) {
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

const profiles = [
  {
    number: "01",
    profile: "El apasionado del motor",
    hook: "Sueña con un Ferrari desde los 16 años. OWNEO lo hace posible.",
    text:
      "No hace falta esperar a tener 300.000€ en el banco. Con una participación OWNEO, ese sueño tiene fecha, tiene matrícula y tiene 4 semanas al año garantizadas.",
    delay: 0,
  },
  {
    number: "02",
    profile: "El inversor inteligente",
    hook: "No compra caprichos. Compra experiencias con valor real.",
    text:
      "Una participación OWNEO no es un gasto — es una decisión financiera con retorno estimado, kilometraje controlado y reventa gestionada. El lujo que también tiene sentido en un Excel.",
    delay: 0.1,
  },
  {
    number: "03",
    profile: "El que vive el presente",
    hook: "Prefiere 4 semanas al volante de un Porsche que 365 días preocupándose por él.",
    text:
      "Sin garaje, sin seguro, sin revisiones, sin trámites. Solo reservar desde la app, recoger el coche impecable y disfrutar. El resto es problema de OWNEO.",
    delay: 0.2,
  },
];

const values = [
  {
    word: "ACCESO",
    icon: Gem,
    text:
      "El lujo no debería ser un privilegio de pocos. Lo que antes requería una fortuna, hoy requiere una decisión inteligente.",
    delay: 0,
  },
  {
    word: "CONFIANZA",
    icon: Shield,
    text:
      "Cada contrato, cada entrega, cada euro invertido está respaldado por un compromiso real. Sin letra pequeña.",
    delay: 0.1,
  },
  {
    word: "EXCELENCIA",
    icon: Award,
    text:
      "No gestionamos coches. Gestionamos experiencias. Y en cada detalle, el estándar es el más alto posible.",
    delay: 0.2,
  },
  {
    word: "LIBERTAD",
    icon: Heart,
    text:
      "Conducir sin poseer. Disfrutar sin gestionar. Vivir la experiencia sin cargar con sus consecuencias.",
    delay: 0.3,
  },
];

const missionVision = [
  {
    icon: Sparkles,
    label: "Misión",
    title: "Hacer accesible lo extraordinario.",
    text:
      "Queremos que cualquier persona con la determinación y el criterio adecuado pueda sentarse al volante de un Ferrari, un Porsche o un Bentley — sin necesidad de comprarlo, sin gestionar nada, sin sorpresas.",
    delay: 0,
  },
  {
    icon: TrendingUp,
    label: "Visión",
    title: "El referente europeo del lujo compartido.",
    text:
      "Aspiramos a construir la comunidad más exclusiva de apasionados del motor en Europa — donde el acceso a los mejores vehículos del mundo sea una decisión inteligente, no un privilegio heredado.",
    delay: 0.15,
  },
];

const QuienesSomos = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <style>{`
        @keyframes ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.08) translate(-1%, -1%); }
        }
        @keyframes owneo-float {
          0%, 100% { transform: translateY(-12px); }
          50% { transform: translateY(12px); }
        }
        @keyframes owneo-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={quienesSomosHero}
            alt="OWNEO — el lujo que se comparte"
            loading="eager"
            className="w-full h-full object-cover will-change-transform"
            style={{ animation: "ken-burns 20s ease-in-out infinite alternate" }}
          />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        </div>

        {/* floating blobs */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-champagne/10 blur-3xl"
          style={{ animation: "owneo-float 10s ease-in-out infinite" }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-24 w-[520px] h-[520px] rounded-full bg-champagne/5 blur-3xl"
          style={{ animation: "owneo-float 14s ease-in-out infinite reverse" }}
        />

        <div className="container mx-auto px-5 sm:px-6 relative z-10 pt-28 sm:pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.3em] text-champagne/90 px-3 py-1.5 rounded-full border border-champagne/30 bg-background/30 backdrop-blur-sm">
                El lujo que se comparte
              </span>
            </Reveal>

            <Reveal delay={0.15}>
              <h1 className="mt-6 sm:mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight leading-[1.05] tracking-tight">
                No es un coche.
                <br />
                <span className="text-champagne italic">Es una decisión.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                OWNEO nació para romper la ecuación que durante décadas ha hecho del lujo
                automovilístico algo reservado a muy pocos.
              </p>
            </Reveal>

            <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[
                { label: "Sin propiedad" },
                { label: "Sin gestión" },
                { label: "Sin compromiso" },
              ].map((p, i) => (
                <Reveal key={p.label} delay={0.5 + i * 0.1}>
                  <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-foreground/80 px-4 py-2 rounded-full border border-border/60 bg-card/40 backdrop-blur-sm">
                    {p.label}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-champagne/70"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">Descubrir</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* ===================== MANIFESTO ===================== */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-champagne/90">
                Nuestra historia
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 text-2xl sm:text-3xl md:text-4xl font-extralight leading-[1.3] tracking-tight">
                Creemos que los coches más extraordinarios del mundo no deberían estar
                reservados a unos pocos. No por falta de pasión —{" "}
                <span className="text-champagne">
                  sino por una ecuación económica
                </span>{" "}
                que durante décadas ha hecho del lujo automovilístico algo inalcanzable.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-10 text-base sm:text-lg text-muted-foreground leading-relaxed">
                OWNEO nació para romper esa ecuación. No democratizando el lujo hacia
                abajo — sino elevando el acceso hacia arriba. El mismo coche, la misma
                experiencia, la misma emoción. Sin el peso de la propiedad.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-12 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== MISSION & VISION ===================== */}
      <section className="py-20 sm:py-28 bg-card/30 border-y border-border">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {missionVision.map((item) => (
              <Reveal key={item.label} delay={item.delay}>
                <div className="h-full bg-background/60 backdrop-blur-sm rounded-2xl border border-border p-8 sm:p-10 hover:border-champagne/40 transition-colors duration-500">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-champagne/10 flex items-center justify-center mb-6">
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-champagne" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-champagne/90">
                    {item.label}
                  </span>
                  <h3 className="mt-3 text-2xl sm:text-3xl font-extralight leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PARA QUIÉN ES OWNEO ===================== */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-champagne/90">
                Nuestros participantes
              </span>
              <h2 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight leading-[1.1]">
                ¿Para quién es <span className="text-champagne italic">OWNEO</span>?
              </h2>
            </div>
          </Reveal>

          <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
            {profiles.map((p) => (
              <Reveal key={p.number} delay={p.delay}>
                <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start border-t border-border pt-10 sm:pt-12">
                  <div className="md:col-span-3">
                    <span className="block text-5xl sm:text-6xl font-extralight text-champagne/80 tabular-nums">
                      {p.number}
                    </span>
                  </div>
                  <div className="md:col-span-9 space-y-5">
                    <h3 className="text-xl sm:text-2xl uppercase tracking-[0.15em] text-foreground/90 font-light">
                      {p.profile}
                    </h3>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-extralight leading-[1.25] tracking-tight">
                      {p.hook}
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                      {p.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== VALORES ===================== */}
      <section className="py-20 sm:py-28 bg-card/30 border-y border-border">
        <div className="container mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-champagne/90">
                Lo que nos define
              </span>
              <h2 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight leading-[1.1]">
                Nuestros <span className="text-champagne italic">valores</span>
              </h2>
            </div>
          </Reveal>

          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
            {values.map((v) => (
              <Reveal key={v.word} delay={v.delay}>
                <div className="h-full bg-background/80 p-8 sm:p-10 hover:bg-background transition-colors duration-500 group">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl sm:text-3xl font-extralight tracking-[0.25em] text-champagne">
                      {v.word}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-champagne/30 flex items-center justify-center group-hover:border-champagne/70 transition-colors">
                      <v.icon className="w-4 h-4 text-champagne" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRESS ===================== */}
      <PressSection />

      {/* ===================== CTA FINAL ===================== */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-champagne/5 blur-3xl"
          style={{ animation: "owneo-float 12s ease-in-out infinite" }}
        />
        <div className="container mx-auto px-5 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-champagne/90">
                El siguiente paso
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-extralight leading-[1.1] tracking-tight">
                ¿Listo para tomar
                <br />
                <span className="text-champagne italic">la decisión inteligente?</span>
              </h2>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Descubre cómo funciona exactamente el modelo OWNEO, o explora directamente
                los vehículos disponibles y encuentra tu participación.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="text-base px-8 h-12 bg-champagne text-champagne-foreground hover:bg-champagne/90"
                >
                  <Link to="/portfolio">
                    Ver la flota
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-base px-8 h-12 border-champagne/40 hover:bg-champagne/10"
                >
                  <Link to="/nuestro-modelo">Descubrir el modelo</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.55}>
              <p className="mt-8 text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground/80">
                Sin compromiso · Proceso 100% digital · Respuesta en 24h
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QuienesSomos;
