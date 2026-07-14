import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Battery, Timer } from "lucide-react";
import ArticleCTAs from "@/components/ArticleCTAs";
import { Link } from "react-router-dom";

import heroImg from "@/assets/news/ferrari-ev.jpg";
import detailImg1 from "@/assets/news/ferrari-ev-detail-1.jpg";
import detailImg2 from "@/assets/news/ferrari-ev-detail-2.jpg";
import detailImg3 from "@/assets/news/ferrari-ev-detail-3.jpg";

const specs = [
  { icon: Zap, label: "Potencia", value: "1.035 CV" },
  { icon: Gauge, label: "0-100 km/h", value: "2,5 s" },
  { icon: Battery, label: "Autonomía", value: "530 km WLTP" },
  { icon: Timer, label: "Arquitectura", value: "800V" },
];

const NoticiaFerrariLuce = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Ferrari Luce EV: detalles del primer 100% eléctrico de Ferrari | Owneo</title>
        <meta name="description" content="Filtrados nuevos detalles del Ferrari Luce EV, la primera berlina deportiva de cinco plazas 100% eléctrica de Maranello: 1.035 CV y 500 km de autonomía." />
        <link rel="canonical" href="https://www.owneo.es/noticias/ferrari-luce-ev" />
        <meta property="og:title" content="Ferrari Luce EV: detalles del primer 100% eléctrico de Ferrari" />
        <meta property="og:description" content="Filtrados nuevos detalles del Ferrari Luce EV, la primera berlina deportiva de cinco plazas 100% eléctrica de Maranello: 1.035 CV y 500 km de autonomía." />
        <meta property="og:url" content="https://www.owneo.es/noticias/ferrari-luce-ev" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Owneo" />
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "Ferrari Luce EV: detalles del primer 100% eléctrico de Ferrari",
          "datePublished": "2026-03-05",
          "publisher": {
            "@type": "Organization",
            "name": "Owneo",
            "url": "https://www.owneo.es"
          },
          "mainEntityOfPage": "https://www.owneo.es/noticias/ferrari-luce-ev"
        }`}</script>
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="Ferrari Luce EV" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
              Eléctricos
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Ferrari Luce EV: Nuevos detalles filtrados sobre el primer 100% eléctrico de Ferrari
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>25 Mayo 2026</span>
              <span className="mx-2">·</span>
              <span>8 min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Ferrari presentó oficialmente el Luce el 25 de mayo de 2026 en Roma, marcando el inicio de una nueva era para Maranello. La primera berlina eléctrica de cinco plazas de Ferrari cuenta con 1.035 CV, autonomía de 530 km WLTP y arquitectura de 800V.
            </p>

            <p className="text-base leading-relaxed mb-6">
              El Ferrari Luce inaugura una nueva etapa para la marca del Cavallino Rampante. Tras la presentación oficial en Roma, Maranello ha confirmado todas las especificaciones técnicas y el plan industrial del modelo, que se producirá en la nueva planta dedicada a la electrificación.
            </p>

            <p className="text-base leading-relaxed mb-12">
              Lo que hace único al Luce no es simplemente su propulsión eléctrica, sino la filosofía con la que Ferrari ha abordado el desafío: crear un automóvil que no solo iguale, sino que supere las sensaciones de conducción de sus modelos con motor de combustión interna. "No estamos construyendo un coche eléctrico que resulta ser un Ferrari. Estamos construyendo un Ferrari que resulta ser eléctrico", declararon desde Maranello durante la presentación.
            </p>
          </motion.div>

          {/* Full-width image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <img src={detailImg1} alt="Ferrari Luce EV vista lateral" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              Ferrari Luce — presentación oficial Roma, mayo 2026
            </p>
          </motion.div>

          {/* Specs grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {specs.map((spec) => (
              <div key={spec.label} className="bg-card/50 border border-border/30 rounded-xl p-5 text-center">
                <spec.icon className="w-6 h-6 text-champagne mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
                <p className="text-lg font-bold">{spec.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Diseño section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Un diseño que rompe moldes</h2>
            <p className="text-base leading-relaxed mb-6">
              El Ferrari Luce presenta un lenguaje de diseño completamente nuevo para la marca. La silueta baja y aerodinámica recuerda a los grandes GT de Ferrari, pero con proporciones inéditas. El frontal elimina las tradicionales rejillas de refrigeración del motor, reemplazándolas con un tratamiento escultórico que integra sensores y sistemas de refrigeración de baterías de forma invisible.
            </p>
            <p className="text-base leading-relaxed mb-12">
              Los flancos del vehículo presentan canales aerodinámicos activos que se ajustan en tiempo real según las condiciones de conducción. La parte trasera incorpora un difusor de doble elemento y un alerón retráctil que genera hasta 350 kg de carga aerodinámica a velocidad máxima. El coeficiente aerodinámico Cx de 0,24 es el más bajo jamás logrado por un Ferrari de producción.
            </p>
          </motion.div>

          {/* Interior image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <img src={detailImg2} alt="Interior del Ferrari Luce EV" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              El habitáculo del Luce combina artesanía italiana con tecnología de vanguardia
            </p>
          </motion.div>

          {/* Interior section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Interior: lujo y tecnología sin precedentes</h2>
            <p className="text-base leading-relaxed mb-6">
              El habitáculo del Luce es una declaración de intenciones. Ferrari ha desarrollado una nueva generación de interfaz hombre-máquina que combina pantallas OLED curvadas con controles hápticos integrados en el volante. El cuadro de instrumentos digital de 16 pulgadas se extiende sin interrupciones hasta la consola central, creando una experiencia envolvente.
            </p>
            <p className="text-base leading-relaxed mb-12">
              Los materiales incluyen cuero Poltrona Frau exclusivo, fibra de carbono forjada y aluminio anodizado en acabados personalizados. El sistema de sonido, desarrollado en colaboración con Burmester, ha sido calibrado para recrear un paisaje sonoro emocionante que compense la ausencia del rugido del motor V12 tradicional.
            </p>
          </motion.div>

          {/* Track image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <img src={detailImg3} alt="Ferrari Luce EV en circuito" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              Primeras pruebas dinámicas del Luce en el circuito de Fiorano
            </p>
          </motion.div>

          {/* Rendimiento section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Rendimiento eléctrico de nueva generación</h2>
            <p className="text-base leading-relaxed mb-6">
              Bajo la piel del Luce se esconde una arquitectura eléctrica de 800V desarrollada íntegramente por Ferrari. Cuatro motores eléctricos — uno por rueda — generan una potencia combinada de 1.035 CV con un par instantáneo de más de 1.500 Nm. La tracción integral inteligente distribuye la potencia entre los cuatro neumáticos con una frecuencia de ajuste de 1.000 veces por segundo.
            </p>
            <p className="text-base leading-relaxed mb-6">
              La batería de estado semi-sólido de 120 kWh, producida en la nueva gigafactoría de Maranello, ofrece una autonomía de 530 km en ciclo WLTP. La carga ultrarrápida a 400 kW permite recuperar el 80% de la capacidad en apenas 18 minutos, convirtiendo las paradas en poco más que un café espresso.
            </p>
            <p className="text-base leading-relaxed mb-12">
              Pero las cifras más impresionantes llegan en el apartado dinámico: el Luce acelera de 0 a 100 km/h en 2,5 segundos, alcanza los 200 km/h en 5,8 segundos y tiene una velocidad máxima limitada electrónicamente a 310 km/h. En Fiorano, el Luce ya ha registrado tiempos que rivalizan con los del SF90 Stradale.
            </p>
          </motion.div>

          {/* Conclusion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Entregas y precio</h2>
            <p className="text-base leading-relaxed mb-8">
              Las entregas del Ferrari Luce comenzarán a lo largo de 2027, con un precio de salida superior a los 500.000 euros.
            </p>
          </motion.div>

          {/* Back link */}
          <ArticleCTAs vehicleName="Ferrari Luce EV" />

          <p className="text-sm text-muted-foreground border-t border-border/30 pt-4 mt-8">
            Fuente:{" "}
            <a href="https://www.frandroid.com/marques/ferrari/3110797_voici-la-ferrari-luce-la-premiere-voiture-electrique-de-la-marque-brise-tous-les-codes" rel="nofollow noopener" target="_blank" className="text-[#bda095] hover:underline">
              Frandroid — Voici la Ferrari Luce, la première voiture électrique de la marque
            </a>
          </p>

        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaFerrariLuce;
