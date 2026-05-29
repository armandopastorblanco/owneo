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
  { icon: Zap, label: "Potencia", value: "1.200+ CV" },
  { icon: Gauge, label: "0-100 km/h", value: "< 2,0 s" },
  { icon: Battery, label: "Autonomía", value: "500+ km" },
  { icon: Timer, label: "Carga rápida", value: "80% en 18 min" },
];

const NoticiaFerrariLuce = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Ferrari Luce EV: detalles del primer 100% eléctrico de Ferrari | Owneo</title>
        <meta name="description" content="Filtrados nuevos detalles del Ferrari Luce EV, el primer 100% eléctrico de Maranello: más de 1.200 CV y 500 km de autonomía." />
        <link rel="canonical" href="https://www.owneo.es/noticias/ferrari-luce-ev" />
        <meta property="og:title" content="Ferrari Luce EV: detalles del primer 100% eléctrico de Ferrari" />
        <meta property="og:description" content="Filtrados nuevos detalles del Ferrari Luce EV, el primer 100% eléctrico de Maranello: más de 1.200 CV y 500 km de autonomía." />
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
              <span>5 Marzo 2026</span>
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
              El primer superdeportivo totalmente eléctrico de Maranello promete más de 1.200 CV y una autonomía superior a 500 km. Las últimas filtraciones revelan un diseño revolucionario que mantiene la esencia Ferrari mientras abraza la electrificación total.
            </p>

            <p className="text-base leading-relaxed mb-6">
              Tras años de especulación, las filtraciones más recientes pintan un cuadro cada vez más claro del Ferrari Luce EV. Fuentes cercanas a Maranello confirman que el proyecto, internamente conocido como "F260e", ha superado las fases de validación dinámica y se encuentra en las etapas finales de calibración antes de su presentación oficial prevista para el tercer trimestre de 2026.
            </p>

            <p className="text-base leading-relaxed mb-12">
              Lo que hace único al Luce no es simplemente su propulsión eléctrica, sino la filosofía con la que Ferrari ha abordado el desafío: crear un automóvil que no solo iguale, sino que supere las sensaciones de conducción de sus modelos con motor de combustión interna. "No estamos construyendo un coche eléctrico que resulta ser un Ferrari. Estamos construyendo un Ferrari que resulta ser eléctrico", declaró una fuente interna.
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
              Render conceptual del Ferrari Luce EV basado en las filtraciones más recientes
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
              Bajo la piel del Luce se esconde una arquitectura eléctrica de 900V desarrollada íntegramente por Ferrari. Tres motores eléctricos — uno en el eje delantero y dos en el trasero — generan una potencia combinada superior a 1.200 CV con un par instantáneo de más de 1.500 Nm. La tracción integral inteligente distribuye la potencia entre los cuatro neumáticos con una frecuencia de ajuste de 1.000 veces por segundo.
            </p>
            <p className="text-base leading-relaxed mb-6">
              La batería de estado semi-sólido de 120 kWh, producida en la nueva gigafactoría de Maranello, ofrece una autonomía superior a 500 km en ciclo WLTP. La carga ultrarrápida a 400 kW permite recuperar el 80% de la capacidad en apenas 18 minutos, convirtiendo las paradas en poco más que un café espresso.
            </p>
            <p className="text-base leading-relaxed mb-12">
              Pero las cifras más impresionantes llegan en el apartado dinámico: el Luce acelera de 0 a 100 km/h en menos de 2 segundos, alcanza los 200 km/h en 5,8 segundos y tiene una velocidad máxima limitada electrónicamente a 350 km/h. En Fiorano, el prototipo ya ha registrado tiempos que rivalizan con los del SF90 Stradale.
            </p>
          </motion.div>

          {/* Conclusion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">¿Cuándo lo veremos?</h2>
            <p className="text-base leading-relaxed mb-6">
              Según las fuentes más fiables, Ferrari presentará oficialmente el Luce en septiembre de 2026, posiblemente en un evento privado en Maranello antes de su debut público en el Salón del Automóvil de París en octubre. Las primeras entregas están previstas para el primer trimestre de 2027, con un precio estimado que superará los 500.000 euros.
            </p>
            <p className="text-base leading-relaxed mb-8">
              Lo que está claro es que el Ferrari Luce no será simplemente el primer coche eléctrico de Ferrari: será el modelo que defina si la electrificación puede coexistir con la emoción pura que ha hecho de Ferrari una leyenda. A juzgar por lo que sabemos hasta ahora, Maranello está decidido a demostrar que sí.
            </p>
          </motion.div>

          {/* Back link */}
          <ArticleCTAs vehicleName="Ferrari Luce EV" />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaFerrariLuce;
