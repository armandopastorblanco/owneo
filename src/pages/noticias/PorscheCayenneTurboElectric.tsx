import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, BatteryCharging, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import ArticleCTAs from "@/components/ArticleCTAs";

import heroImg from "@/assets/noticias/porsche-cayenne-turbo-electric-main.jpg";
import detail1 from "@/assets/noticias/porsche-cayenne-turbo-electric-detail-1.jpg";
import detail2 from "@/assets/noticias/porsche-cayenne-turbo-electric-detail-2.jpg";
import detail3 from "@/assets/noticias/porsche-cayenne-turbo-electric-detail-3.jpg";

const specs = [
  { icon: Zap, label: "Potencia", value: "1.139 CV" },
  { icon: Gauge, label: "0-100 km/h", value: "2,4 s" },
  { icon: BatteryCharging, label: "Carga rápida", value: "400 kW (10-80% <16 min)" },
  { icon: Tag, label: "Precio desde", value: "165.000 $" },
];

const PorscheCayenneTurboElectric = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Porsche Cayenne Turbo Electric: 1.139 CV y el fin de los límites | Owneo</title>
        <meta name="description" content="Stuttgart presenta el SUV eléctrico más potente de su historia. 1.139 CV, 0-100 en 2,4 s, arquitectura 800 V y carga rápida 400 kW. El Cayenne Turbo Electric redefine el SUV de lujo." />
        <link rel="canonical" href="https://www.owneo.es/noticias/porsche-cayenne-turbo-electric-2026" />
        <meta property="og:title" content="Porsche Cayenne Turbo Electric: 1.139 CV y el fin de los límites" />
        <meta property="og:description" content="Stuttgart presenta el SUV eléctrico más potente de su historia. El nuevo Cayenne Turbo Electric no es una evolución. Es una declaración de intenciones." />
        <meta property="og:url" content="https://www.owneo.es/noticias/porsche-cayenne-turbo-electric-2026" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Owneo" />
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "Porsche Cayenne Turbo Electric: 1.139 CV y el fin de los límites",
          "datePublished": "2026-06-01",
          "publisher": {
            "@type": "Organization",
            "name": "Owneo",
            "url": "https://www.owneo.es"
          },
          "mainEntityOfPage": "https://www.owneo.es/noticias/porsche-cayenne-turbo-electric-2026"
        }`}</script>
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[60vh] md:h-[70vh] bg-black">
        <img
          src={heroImg}
          alt="Porsche Cayenne Turbo Electric 2026 — vista 3/4 delantera"
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
              Novedades · Porsche · Eléctricos
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Porsche Cayenne Turbo Electric: 1.139 CV y el fin de los límites
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-3xl">
              Stuttgart presenta el SUV eléctrico más potente de su historia. El nuevo Cayenne Turbo Electric no es una evolución. Es una declaración de intenciones.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>Junio 2026</span>
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
              Porsche no hace las cosas a medias. Cuando Stuttgart decide electrificar el Cayenne — su SUV más vendido, el modelo que literalmente salvó a la marca a principios de los 2000 — lo hace sin concesiones. El resultado es el Cayenne Turbo Electric, y sus cifras dejan sin argumentos a cualquier escéptico del coche eléctrico de altas prestaciones.
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">1.139 CV: el Porsche de serie más potente de la historia</h2>
            <p className="text-base leading-relaxed mb-12">
              La variante Turbo Electric supera en potencia a todo lo que Porsche ha fabricado antes. Más que el 918 Spyder. Más que el Taycan Turbo GT. Más que cualquier 911. Y lo consigue en un SUV de cinco plazas capaz de transportar familia, equipaje y la semana entera. El 0-100 km/h cae en 2,4 segundos, el cuarto de milla en 9,9 segundos. La versión de acceso, el Cayenne Electric con 435 CV, hace el 0-100 en 4,5 segundos.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detail1} alt="Porsche Cayenne Turbo Electric — vista lateral/trasera con aleta aerodinámica activa" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              Vista lateral/trasera del Cayenne Turbo Electric — aleta aerodinámica activa
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Tecnología de 800 V sin compromisos</h2>
            <p className="text-base leading-relaxed mb-12">
              Ambas versiones comparten arquitectura de 800 V, 108 kWh netos de capacidad y carga rápida de hasta 400 kW — del 10 al 80 % en menos de 16 minutos. La batería está integrada directamente en el chasis mediante seis módulos independientes, reduciendo el centro de gravedad y liberando espacio interior. El Turbo Electric gestiona el 97 % de las frenadas con los motores eléctricos, recuperando hasta 600 kW.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detail2} alt="Porsche Cayenne Electric — perfil completo en carretera abierta" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              Perfil completo del Cayenne Electric — eficiencia aerodinámica en carretera abierta
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Un diseño que toma partido</h2>
            <p className="text-base leading-relaxed mb-12">
              La toma de aire delantera se abre y cierra activamente según la velocidad. Las aletas aerodinámicas traseras del Turbo se despliegan por encima de 40 km/h, reduciendo el Cx en 0,06. En el interior, pantalla central de 12,25 pulgadas con geometría curva única, y pantalla del copiloto opcional de 14,9 pulgadas bajo el mismo cristal curvado.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detail3} alt="Porsche Cayenne Electric — frontal 3/4 gris metálico sobre fondo neutro" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              Cayenne Electric en gris metálico — nuevo lenguaje de diseño Porsche
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Precio y disponibilidad</h2>
            <p className="text-base leading-relaxed mb-8">
              El Cayenne Electric parte desde 111.000 $ en EE.UU., el Turbo Electric desde 165.000 $. Primeras entregas previstas para finales de 2026. Precios europeos por confirmar.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El Cayenne Turbo Electric no es el futuro del SUV de lujo. Es el presente. Y Porsche acaba de redefinir qué significa conducir rápido sin hacer ruido.
            </p>
          </motion.div>

          <ArticleCTAs vehicleName="Porsche Cayenne Turbo Electric" />

          <p className="text-sm text-muted-foreground border-t border-border/30 pt-4 mt-8">
            Fuente oficial:{" "}
            <a href="https://www.porsche.com/international/models/cayenne/" rel="nofollow noopener" target="_blank" className="text-[#bda095] hover:underline">
              Porsche — Cayenne
            </a>
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default PorscheCayenneTurboElectric;
