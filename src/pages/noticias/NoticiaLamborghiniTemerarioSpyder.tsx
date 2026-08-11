import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Fuel, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArticleCTAs from "@/components/ArticleCTAs";

import heroImg from "@/assets/news/lamborghini-temerario.jpg";
import interiorImg from "@/assets/news/lamborghini-temerario-detail-1.jpg";
import motionImg from "@/assets/news/lamborghini-temerario-detail-2.jpg";

const specsEs = [
  { icon: Zap, label: "Potencia", value: "920 CV" },
  { icon: Fuel, label: "Motor", value: "V8 4.0L biturbo híbrido" },
  { icon: Gauge, label: "0-100 km/h", value: "~2,9 s (estimado)" },
  { icon: Tag, label: "Precio estimado", value: "~300.000 €" },
];

const specsEn = [
  { icon: Zap, label: "Power", value: "920 hp" },
  { icon: Fuel, label: "Engine", value: "4.0L twin-turbo V8 hybrid" },
  { icon: Gauge, label: "0-100 km/h", value: "~2.9 s (estimated)" },
  { icon: Tag, label: "Estimated price", value: "~€300,000" },
];

const copyEs = {
  metaTitle: "Lamborghini Temerario Spyder: primeras imágenes espía del descapotable V8 híbrido | Owneo",
  metaDescription:
    "Las primeras fotos espía del Lamborghini Temerario Spyder confirman el techo rígido extraíble y el V8 biturbo híbrido de 920 CV a 10.000 rpm. Presentación prevista en Goodwood 2026.",
  ogTitle: "Lamborghini Temerario Spyder: primeras imágenes espía del descapotable V8 híbrido",
  back: "Volver a Noticias",
  category: "Lanzamientos",
  title: "Lamborghini Temerario Spyder: primeras imágenes espía del descapotable V8 híbrido",
  date: "31 Mayo 2026",
  readTime: "5 min de lectura",
  intro: `Las primeras fotografías espía del Lamborghini Temerario Spyder, captadas en el Nürburgring, confirman lo que muchos esperaban: Sant'Agata Bolognese trabaja a toda velocidad en la versión descapotable del sucesor del <a href="/noticias/lamborghini-huracan-hibrido" class="text-[#bda095] hover:underline">Huracán</a>. La sorpresa no es el modelo en sí, sino el momento: las entregas del coupé solo comenzaron en enero de 2026, y el Spyder ya rueda en pruebas. La presentación oficial se espera en el Festival of Speed de Goodwood, previsto para el 9-12 de julio de 2026.`,
  h1: "V8 híbrido a cielo abierto: 920 CV y 10.000 rpm",
  p1: "El Temerario Spyder conservará íntegramente el tren motriz del coupé: el V8 biturbo de 4.0 litros de cigüeñal plano, combinado con tres motores eléctricos y una batería de 3,8 kWh, para una potencia total de 920 CV y un par de 730 Nm. La zona roja a 10.000 rpm, ya de por sí espectacular en el coupé, promete una banda sonora aún más visceral sin techo. La tracción integral inteligente gestiona los 920 CV entre los cuatro neumáticos, con un 0-100 km/h estimado en torno a 2,9 segundos — ligeramente por encima de los 2,7 s del coupé debido al aumento de peso.",
  interiorAlt: "Interior y cockpit del Lamborghini Temerario — tecnología híbrida de nueva generación",
  interiorCaption: "Interior del Temerario — cockpit digital y materiales de competición",
  h2: "Techo rígido extraíble: la gran sorpresa",
  p2: "Las imágenes espía revelan una solución inesperada: techo rígido extraíble en lugar de la capota blanda del Huracán Spyder. Esta decisión responde a tres objetivos: minimizar el aumento de peso (estimado en menos de 50 kg sobre el coupé), preservar la rigidez torsional del chasis de fibra de carbono, y mantener la aerodinámica activa intacta a altas velocidades. El diseño incluye contrafuertes detrás de los asientos para mejorar la aerodinámica con el techo descubierto, un elemento visual que diferencia claramente el Spyder del coupé de perfil.",
  motionAlt: "Lamborghini Temerario en circuito — 0-100 km/h en 2,7 segundos",
  motionCaption: "El Temerario en acción sobre el asfalto — dinámica extrema y tracción total",
  h3: "Goodwood 2026: la fecha a marcar en el calendario",
  p3: `Según las fuentes más cercanas al proyecto, Lamborghini prevé presentar el Temerario Spyder en el Festival of Speed de Goodwood (9-12 julio 2026), junto con al menos otro nuevo modelo de la marca. Las primeras entregas podrían producirse a finales de 2026 o principios de 2027, con un precio de salida estimado en torno a los 300.000 euros — frente a los 270.000 del coupé. Con el <a href="/noticias/lamborghini-temerario" class="text-[#bda095] hover:underline">Temerario</a> coupé completamente vendido hasta finales de 2026 y el <a href="/noticias/lamborghini-revuelto-spider" class="text-[#bda095] hover:underline">Revuelto</a> con lista de espera que "se extiende hasta el Adriático" según sus propios directivos, Lamborghini demuestra que mientras otros fabricantes tropiezan con la electrificación, Sant'Agata Bolognese no puede hacer nada mal.`,
  hero: "Lamborghini Temerario Spyder — primeras imágenes espía 2026",
  source: "Fuente oficial: ",
  specs: specsEs,
};

const copyEn = {
  metaTitle: "Lamborghini Temerario Spyder: first spy shots of the V8 hybrid convertible | Owneo",
  metaDescription:
    "The first spy shots of the Lamborghini Temerario Spyder confirm a removable hard top and the 920 hp twin-turbo V8 hybrid revving to 10,000 rpm. Unveiling expected at Goodwood 2026.",
  ogTitle: "Lamborghini Temerario Spyder: first spy shots of the V8 hybrid convertible",
  back: "Back to News",
  category: "Launches",
  title: "Lamborghini Temerario Spyder: first spy shots of the V8 hybrid convertible",
  date: "31 May 2026",
  readTime: "5 min read",
  intro: `The first spy photographs of the Lamborghini Temerario Spyder, captured at the Nürburgring, confirm what many expected: Sant'Agata Bolognese is working flat out on the convertible version of the <a href="/noticias/lamborghini-huracan-hibrido" class="text-[#bda095] hover:underline">Huracán</a> successor. The surprise is not the model itself, but the timing: deliveries of the coupé only began in January 2026, and the Spyder is already running test laps. The official unveiling is expected at the Goodwood Festival of Speed, scheduled for 9-12 July 2026.`,
  h1: "Open-air hybrid V8: 920 hp and 10,000 rpm",
  p1: "The Temerario Spyder will keep the coupé's powertrain in full: the flat-plane-crank 4.0-litre twin-turbo V8, combined with three electric motors and a 3.8 kWh battery, for a combined 920 hp and 730 Nm of torque. The 10,000 rpm red line, already spectacular in the coupé, promises an even more visceral soundtrack with the roof off. Intelligent all-wheel drive manages the 920 hp across all four tyres, with 0-100 km/h estimated at around 2.9 seconds — slightly above the coupé's 2.7 s due to the extra weight.",
  interiorAlt: "Interior and cockpit of the Lamborghini Temerario — new-generation hybrid technology",
  interiorCaption: "Temerario interior — digital cockpit and motorsport materials",
  h2: "Removable hard top: the big surprise",
  p2: "The spy images reveal an unexpected solution: a removable hard top instead of the Huracán Spyder's soft roof. That decision serves three goals: minimising the weight increase (estimated at under 50 kg over the coupé), preserving the torsional rigidity of the carbon-fibre chassis, and keeping the active aerodynamics intact at high speed. The design includes buttresses behind the seats to improve aerodynamics with the roof removed, a visual element that clearly distinguishes the Spyder from the coupé in profile.",
  motionAlt: "Lamborghini Temerario on track — 0-100 km/h in 2.7 seconds",
  motionCaption: "The Temerario in action on the asphalt — extreme dynamics and all-wheel drive",
  h3: "Goodwood 2026: the date to mark in the calendar",
  p3: `According to sources closest to the project, Lamborghini plans to unveil the Temerario Spyder at the Goodwood Festival of Speed (9-12 July 2026), alongside at least one other new model from the brand. First deliveries could take place in late 2026 or early 2027, with a starting price estimated at around €300,000 — against €270,000 for the coupé. With the <a href="/noticias/lamborghini-temerario" class="text-[#bda095] hover:underline">Temerario</a> coupé completely sold out until the end of 2026 and the <a href="/noticias/lamborghini-revuelto-spider" class="text-[#bda095] hover:underline">Revuelto</a> waiting list "stretching all the way to the Adriatic" according to its own executives, Lamborghini shows that while other manufacturers stumble over electrification, Sant'Agata Bolognese can do no wrong.`,
  hero: "Lamborghini Temerario Spyder — first spy shots 2026",
  source: "Official source: ",
  specs: specsEn,
};

const NoticiaLamborghiniTemerarioSpyder = () => {
  const { i18n } = useTranslation();
  const c = i18n.language === "en" ? copyEn : copyEs;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDescription} />
        <link rel="canonical" href="https://www.owneo.es/noticias/lamborghini-temerario-spyder" />
        <meta property="og:title" content={c.ogTitle} />
        <meta property="og:description" content={c.metaDescription} />
        <meta property="og:url" content="https://www.owneo.es/noticias/lamborghini-temerario-spyder" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Owneo" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: c.ogTitle,
          datePublished: "2026-05-31",
          publisher: {
            "@type": "Organization",
            name: "Owneo",
            url: "https://www.owneo.es",
          },
          mainEntityOfPage: "https://www.owneo.es/noticias/lamborghini-temerario-spyder",
        })}</script>
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[60vh] md:h-[70vh] bg-black">
        <img
          src={heroImg}
          alt={c.hero}
          loading="eager"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> {c.back}
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
              {c.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {c.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>{c.date}</span>
              <span className="mx-2">·</span>
              <span>{c.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12"
              dangerouslySetInnerHTML={{ __html: c.intro }}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {c.specs.map((spec) => (
              <div key={spec.label} className="bg-card/50 border border-border/30 rounded-xl p-5 text-center">
                <spec.icon className="w-6 h-6 text-champagne mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
                <p className="text-lg font-bold">{spec.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{c.h1}</h2>
            <p className="text-base leading-relaxed mb-12">
              {c.p1}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={interiorImg} alt={c.interiorAlt} loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              {c.interiorCaption}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{c.h2}</h2>
            <p className="text-base leading-relaxed mb-12">
              {c.p2}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={motionImg} alt={c.motionAlt} loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              {c.motionCaption}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{c.h3}</h2>
            <p
              className="text-base leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: c.p3 }}
            />
          </motion.div>

          <ArticleCTAs vehicleName="Lamborghini Temerario Spyder" />

          <p className="text-sm text-muted-foreground border-t border-border/30 pt-4 mt-8">
            {c.source}
            <a href="https://www.lamborghini.com/en-en/models/temerario" rel="nofollow noopener" target="_blank" className="text-[#bda095] hover:underline">
              Lamborghini — Temerario Spyder
            </a>
          </p>

        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaLamborghiniTemerarioSpyder;
