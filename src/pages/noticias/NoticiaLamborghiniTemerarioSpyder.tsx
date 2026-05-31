import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Fuel, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import ArticleCTAs from "@/components/ArticleCTAs";

import heroImg from "@/assets/news/lamborghini-temerario.jpg";
import interiorImg from "@/assets/news/lamborghini-temerario-detail-1.jpg";
import motionImg from "@/assets/news/lamborghini-temerario-detail-2.jpg";

const specs = [
  { icon: Zap, label: "Potencia", value: "920 CV" },
  { icon: Fuel, label: "Motor", value: "V8 4.0L biturbo híbrido" },
  { icon: Gauge, label: "0-100 km/h", value: "~2,9 s (estimado)" },
  { icon: Tag, label: "Precio estimado", value: "~300.000 €" },
];

const NoticiaLamborghiniTemerarioSpyder = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Lamborghini Temerario Spyder: primeras imágenes espía del descapotable V8 híbrido | Owneo</title>
        <meta name="description" content="Las primeras fotos espía del Lamborghini Temerario Spyder confirman el techo rígido extraíble y el V8 biturbo híbrido de 920 CV a 10.000 rpm. Presentación prevista en Goodwood 2026." />
        <link rel="canonical" href="https://www.owneo.es/noticias/lamborghini-temerario-spyder" />
        <meta property="og:title" content="Lamborghini Temerario Spyder: primeras imágenes espía del descapotable V8 híbrido" />
        <meta property="og:description" content="Las primeras fotos espía del Lamborghini Temerario Spyder confirman el techo rígido extraíble y el V8 biturbo híbrido de 920 CV a 10.000 rpm. Presentación prevista en Goodwood 2026." />
        <meta property="og:url" content="https://www.owneo.es/noticias/lamborghini-temerario-spyder" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Owneo" />
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "Lamborghini Temerario Spyder: primeras imágenes espía del descapotable V8 híbrido",
          "datePublished": "2026-05-31",
          "publisher": {
            "@type": "Organization",
            "name": "Owneo",
            "url": "https://www.owneo.es"
          },
          "mainEntityOfPage": "https://www.owneo.es/noticias/lamborghini-temerario-spyder"
        }`}</script>
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[60vh] md:h-[70vh] bg-black">
        <img
          src={heroImg}
          alt="Lamborghini Temerario Spyder — primeras imágenes espía 2026"
          loading="eager"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
              Lanzamientos
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Lamborghini Temerario Spyder: primeras imágenes espía del descapotable V8 híbrido
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>31 Mayo 2026</span>
              <span className="mx-2">·</span>
              <span>5 min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
              Las primeras fotografías espía del Lamborghini Temerario Spyder, captadas en el Nürburgring, confirman lo que muchos esperaban: Sant'Agata Bolognese trabaja a toda velocidad en la versión descapotable del sucesor del Huracán. La sorpresa no es el modelo en sí, sino el momento: las entregas del coupé solo comenzaron en enero de 2026, y el Spyder ya rueda en pruebas. La presentación oficial se espera en el Festival of Speed de Goodwood, previsto para el 9-12 de julio de 2026.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {specs.map((spec) => (
              <div key={spec.label} className="bg-card/50 border border-border/30 rounded-xl p-5 text-center">
                <spec.icon className="w-6 h-6 text-champagne mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
                <p className="text-lg font-bold">{spec.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">V8 híbrido a cielo abierto: 920 CV y 10.000 rpm</h2>
            <p className="text-base leading-relaxed mb-12">
              El Temerario Spyder conservará íntegramente el tren motriz del coupé: el V8 biturbo de 4.0 litros de cigüeñal plano, combinado con tres motores eléctricos y una batería de 3,8 kWh, para una potencia total de 920 CV y un par de 730 Nm. La zona roja a 10.000 rpm, ya de por sí espectacular en el coupé, promete una banda sonora aún más visceral sin techo. La tracción integral inteligente gestiona los 920 CV entre los cuatro neumáticos, con un 0-100 km/h estimado en torno a 2,9 segundos — ligeramente por encima de los 2,7 s del coupé debido al aumento de peso.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={interiorImg} alt="Interior y cockpit del Lamborghini Temerario — tecnología híbrida de nueva generación" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              Interior del Temerario — cockpit digital y materiales de competición
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Techo rígido extraíble: la gran sorpresa</h2>
            <p className="text-base leading-relaxed mb-12">
              Las imágenes espía revelan una solución inesperada: techo rígido extraíble en lugar de la capota blanda del Huracán Spyder. Esta decisión responde a tres objetivos: minimizar el aumento de peso (estimado en menos de 50 kg sobre el coupé), preservar la rigidez torsional del chasis de fibra de carbono, y mantener la aerodinámica activa intacta a altas velocidades. El diseño incluye contrafuertes detrás de los asientos para mejorar la aerodinámica con el techo descubierto, un elemento visual que diferencia claramente el Spyder del coupé de perfil.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={motionImg} alt="Lamborghini Temerario en circuito — 0-100 km/h en 2,7 segundos" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              El Temerario en acción sobre el asfalto — dinámica extrema y tracción total
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Goodwood 2026: la fecha a marcar en el calendario</h2>
            <p className="text-base leading-relaxed mb-8">
              Según las fuentes más cercanas al proyecto, Lamborghini prevé presentar el Temerario Spyder en el Festival of Speed de Goodwood (9-12 julio 2026), junto con al menos otro nuevo modelo de la marca. Las primeras entregas podrían producirse a finales de 2026 o principios de 2027, con un precio de salida estimado en torno a los 300.000 euros — frente a los 270.000 del coupé. Con el Temerario coupé completamente vendido hasta finales de 2026 y el Revuelto con lista de espera que "se extiende hasta el Adriático" según sus propios directivos, Lamborghini demuestra que mientras otros fabricantes tropiezan con la electrificación, Sant'Agata Bolognese no puede hacer nada mal.
            </p>
          </motion.div>

          <ArticleCTAs vehicleName="Lamborghini Temerario Spyder" />

          <p className="text-sm text-muted-foreground border-t border-border/30 pt-4 mt-8">
            Fuente oficial:{" "}
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
