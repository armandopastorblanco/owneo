import { useTranslation } from "react-i18next";
import React from "react";
import { Helmet } from "react-helmet-async";
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
import quienesSomosHero from "@/assets/quienes-somos/qs-hero.jpg";
import qsHistoria from "@/assets/quienes-somos/qs-historia.jpg";
import qsMision from "@/assets/quienes-somos/qs-mision.jpg";
import qsMisionCard from "@/assets/quienes-somos/qs-mision.jpg";
import qsVisionCard from "@/assets/quienes-somos/qs-historia.jpg";
import qsProfile1 from "@/assets/quienes-somos/qs-profile-1.jpg";
import qsProfile2 from "@/assets/quienes-somos/qs-profile-2.jpg";
import qsProfile3 from "@/assets/quienes-somos/qs-profile-3.jpg";
import qsValue1 from "@/assets/quienes-somos/qs-value-1.jpg";
import qsValue2 from "@/assets/quienes-somos/qs-value-2.jpg";
import qsValue3 from "@/assets/quienes-somos/qs-value-3.jpg";
import qsValue4 from "@/assets/quienes-somos/qs-value-4.jpg";
import qsPress from "@/assets/quienes-somos/qs-press.jpg";
import qsCta from "@/assets/quienes-somos/qs-cta.jpg";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: any;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

type TFn = (key: string) => string;

const buildProfiles = (t: TFn) => [
  {
    number: "01",
    profile: t("about.profile1_title"),
    hook: t("about.profile1_hook"),
    text: t("about.profile1_text"),
    delay: 0,
    bg: qsProfile1,
  },
  {
    number: "02",
    profile: t("about.profile2_title"),
    hook: t("about.profile2_hook"),
    text: t("about.profile2_text"),
    delay: 0.1,
    bg: qsProfile2,
  },
  {
    number: "03",
    profile: t("about.profile3_title"),
    hook: t("about.profile3_hook"),
    text: t("about.profile3_text"),
    delay: 0.2,
    bg: qsProfile3,
  },
];

const buildValues = (t: TFn) => [
  {
    word: t("about.value1_word"),
    icon: Gem,
    text: t("about.value1_text"),
    delay: 0,
    bg: qsValue1,
  },
  {
    word: t("about.value2_word"),
    icon: Shield,
    text: t("about.value2_text"),
    delay: 0.1,
    bg: qsValue2,
  },
  {
    word: t("about.value3_word"),
    icon: Award,
    text: t("about.value3_text"),
    delay: 0.2,
    bg: qsValue3,
  },
  {
    word: t("about.value4_word"),
    icon: Heart,
    text: t("about.value4_text"),
    delay: 0.3,
    bg: qsValue4,
  },
];

const buildMissionVision = (t: TFn) => [
  {
    icon: Sparkles,
    label: t("about.mission_label"),
    title: t("about.mission_title"),
    text: t("about.mission_desc"),
    delay: 0,
    bg: qsMisionCard,
  },
  {
    icon: TrendingUp,
    label: t("about.vision_label"),
    title: t("about.vision_title"),
    text: t("about.vision_desc"),
    delay: 0.15,
    bg: qsVisionCard,
  },
];


const QuienesSomos = () => {
  const { t } = useTranslation();
  const profiles = buildProfiles(t);
  const values = buildValues(t);
  const missionVision = buildMissionVision(t);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Quiénes Somos | Owneo</title>
        <meta name="description" content="Conoce el equipo detrás de Owneo, el club de supercoches compartidos más exclusivo de España. Ferrari, Lamborghini, Porsche — el lujo al alcance de los que saben compartirlo." />
        <link rel="canonical" href="https://www.owneo.es/quienes-somos" />
        <meta property="og:title" content="Quiénes Somos | Owneo" />
        <meta property="og:description" content="Conoce el equipo detrás de Owneo, el club de supercoches compartidos más exclusivo de España." />
        <meta property="og:url" content="https://www.owneo.es/quienes-somos" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Owneo" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@owneo" />
      </Helmet>
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
            className="w-full h-full object-cover object-[65%_center] sm:object-center will-change-transform scale-110 sm:scale-100"
            style={{ animation: "ken-burns 20s ease-in-out infinite alternate" }}
          />
          <div className="absolute inset-0 bg-background/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background" />
        </div>

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
              <span className="ds-eyebrow-pill">{t("about.eyebrow")}</span>
            </Reveal>

            <Reveal delay={0.15}>
              <h1 className="ds-h1 mt-6 sm:mt-8 text-foreground">
                {t("about.title")}
                <br />
                <span className="text-champagne">{t("about.title_accent")}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="ds-lead mt-6 sm:mt-8 max-w-2xl mx-auto">
                {t("about.subtitle")}
              </p>
            </Reveal>

            <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[
                { label: t("about.tag1") },
                { label: t("about.tag2") },
                { label: t("about.tag3") },
              ].map((p, i) => (
                <Reveal key={p.label} delay={0.5 + i * 0.1}>
                  <span className="ds-tag">{p.label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-champagne/70"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium">{t("about.discover")}</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* ===================== MANIFESTO ===================== */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={qsHistoria}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background" />
        </div>
        <div className="container mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <span className="ds-eyebrow-pill">{t("about.our_story")}</span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="ds-h2 mt-8 text-foreground">
                El lujo no debería ser{" "}
                <span className="text-champagne">cuestión de fortuna.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="ds-lead mt-8 max-w-2xl mx-auto">
                Creemos que los coches más extraordinarios del mundo no deberían estar
                reservados a unos pocos. No por falta de pasión, sino por una ecuación
                económica que durante décadas ha hecho del lujo automovilístico algo
                inalcanzable.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <p className="ds-body mt-6 text-muted-foreground max-w-2xl mx-auto">
                OWNEO nació para romper esa ecuación. No democratizando el lujo hacia
                abajo — sino elevando el acceso hacia arriba. El mismo coche, la misma
                experiencia, la misma emoción. Sin el peso de la propiedad.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-12 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== MISSION & VISION ===================== */}
      <section className="py-20 sm:py-28 border-y border-border bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
              <span className="ds-eyebrow-pill">Nuestro propósito</span>
              <h2 className="ds-h2 mt-6 text-foreground">
                Misión y <span className="text-champagne">visión</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto items-stretch">
            {missionVision.map((item) => (
              <Reveal key={item.label} delay={item.delay}>
                <div className="group ds-card-feature h-full">
                  <img
                    src={item.bg}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="ds-card-feature-img"
                  />
                  <div className="ds-card-feature-overlay" />
                  <div className="ds-feature-body">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-champagne/10 flex items-center justify-center mb-6">
                      <item.icon className="ds-icon w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <span className="ds-eyebrow-pill">{item.label}</span>
                    <h3 className="ds-card-title text-white mt-4 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
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
              <span className="ds-eyebrow-pill">Nuestros participantes</span>
              <h2 className="ds-h2 mt-6 text-foreground">
                ¿Para quién es <span className="text-champagne">OWNEO</span>?
              </h2>
            </div>
          </Reveal>

          <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
            {profiles.map((p) => (
              <Reveal key={p.number} delay={p.delay}>
                <div className="relative overflow-hidden rounded-2xl border border-border">
                  <img
                    src={p.bg}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover max-h-[220px] md:max-h-none"
                  />
                  <div className="absolute inset-0 bg-background/75" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/65 via-background/55 to-background/65" />
                  <div className="relative grid md:grid-cols-12 gap-6 md:gap-10 items-start p-8 sm:p-10 md:p-12">
                    <div className="md:col-span-3">
                      <span className="block text-5xl sm:text-6xl font-semibold text-champagne tabular-nums drop-shadow-lg">
                        {p.number}
                      </span>
                    </div>
                    <div className="md:col-span-9 space-y-5">
                      <h3 className="ds-card-title uppercase tracking-[0.15em] text-foreground/90">
                        {p.profile}
                      </h3>
                      <p className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.25] tracking-tight">
                        {p.hook}
                      </p>
                      <p className="ds-body text-muted-foreground max-w-2xl">
                        {p.text}
                      </p>
                    </div>
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
              <span className="ds-eyebrow-pill">Lo que nos define</span>
              <h2 className="ds-h2 mt-6 text-foreground">
                Nuestros <span className="text-champagne">valores</span>
              </h2>
            </div>
          </Reveal>

          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
            {values.map((v) => (
              <Reveal key={v.word} delay={v.delay}>
                <div className="relative h-full overflow-hidden group">
                  <img
                    src={v.bg}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 max-h-[220px] md:max-h-none"
                  />
                  <div className="absolute inset-0 bg-background/30 group-hover:bg-background/20 transition-colors duration-500" />
                  <div className="relative p-8 sm:p-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="ds-h3 tracking-tight text-champagne">
                        {v.word}
                      </span>
                      <div className="w-10 h-10 rounded-full border border-champagne/30 flex items-center justify-center group-hover:border-champagne/70 transition-colors bg-background/40 backdrop-blur-sm">
                        <v.icon className="ds-icon w-4 h-4" />
                      </div>
                    </div>
                    <p className="ds-body text-muted-foreground">
                      {v.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRESS ===================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={qsPress}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background" />
        </div>
        <PressSection />
      </section>

      {/* ===================== CTA FINAL ===================== */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={qsCta}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background" />
        </div>
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-champagne/5 blur-3xl"
          style={{ animation: "owneo-float 12s ease-in-out infinite" }}
        />
        <div className="container mx-auto px-5 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <span className="ds-eyebrow-pill">El siguiente paso</span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="ds-h2 mt-6 text-foreground">
                ¿Listo para tomar
                <br />
                <span className="text-champagne">la decisión inteligente?</span>
              </h2>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="ds-lead mt-6 sm:mt-8 text-muted-foreground max-w-xl mx-auto">
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
                  <Link to="/coches">
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
              <p className="mt-8 text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-muted-foreground">
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
