import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Weight, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import ArticleCTAs from "@/components/ArticleCTAs";

import heroImg from "@/assets/news/mclaren-w1.jpg";
import detailImg1 from "@/assets/news/mclaren-w1-detail-1.jpg";
import detailImg2 from "@/assets/news/mclaren-w1-detail-2.jpg";
import detailImg3 from "@/assets/news/mclaren-w1-detail-3.jpg";

const specs = [
  { icon: Zap, label: "Potencia combinada", value: "1.275 CV" },
  { icon: Gauge, label: "Velocidad máxima", value: "350 km/h" },
  { icon: Weight, label: "Peso en seco", value: "1.399 kg" },
  { icon: Timer, label: "0-300 km/h", value: "12,7 s" },
];

const NoticiaMcLarenW1 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>McLaren W1: el hypercar británico que redefine los límites | Owneo</title>
        <meta name="description" content="Descubre el McLaren W1, el nuevo hypercar de Woking que sucede al P1. Motor V8 híbrido, aerodinámica activa y prestaciones extremas." />
        <link rel="canonical" href="https://www.owneo.es/noticias/mclaren-w1" />
        <meta property="og:title" content="McLaren W1: el hypercar británico que redefine los límites" />
        <meta property="og:description" content="Descubre el McLaren W1, el nuevo hypercar de Woking que sucede al P1. Motor V8 híbrido, aerodinámica activa y prestaciones extremas." />
        <meta property="og:url" content="https://www.owneo.es/noticias/mclaren-w1" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Owneo" />
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "McLaren W1: el hypercar británico que redefine los límites",
          "datePublished": "2026-02-15",
          "publisher": {
            "@type": "Organization",
            "name": "Owneo",
            "url": "https://www.owneo.es"
          },
          "mainEntityOfPage": "https://www.owneo.es/noticias/mclaren-w1"
        }`}</script>
      </Helmet>
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="McLaren W1 hypercar" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
              Hypercars
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              McLaren W1: el hypercar británico que desafía a todos los límites
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>15 Febrero 2026</span>
              <span className="mx-2">·</span>
              <span>8 min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      <article className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              McLaren ha presentado el W1, su nuevo hypercar insignia que sucede al legendario P1 y se posiciona como el McLaren de carretera más avanzado y potente jamás construido. Con 1.275 CV procedentes de un tren motriz híbrido V8 y tecnología directamente transferida de la Fórmula 1, el W1 redefine los límites de lo que es posible en un automóvil de producción.
            </p>

            <p className="text-base leading-relaxed mb-6">
              El nombre "W1" es un homenaje al código postal de Woking, la sede de McLaren en Surrey, Inglaterra, donde la marca ha diseñado y construido sus vehículos más emblemáticos. Pero también representa algo más profundo: la voluntad de ser el número uno, de establecer el estándar contra el cual todos los demás hypercars serán medidos durante la próxima década.
            </p>

            <p className="text-base leading-relaxed mb-12">
              Limitado a solo 399 unidades — todas ya asignadas a compradores selectos — el McLaren W1 no es simplemente un coche; es una declaración de las capacidades tecnológicas de una marca que nació en las pistas de carreras y que nunca ha dejado de competir, ya sea en el asfalto o en los límites de la ingeniería automotriz.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="McLaren W1 con puertas de mariposa abiertas" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              Las icónicas puertas diedro del W1 revelan un monocasco de carbono ultraligero
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Tecnología de Fórmula 1 en cada componente</h2>
            <p className="text-base leading-relaxed mb-6">
              El corazón del W1 es un motor V8 biturbo de 4.0 litros completamente nuevo, que por sí solo produce 928 CV — el V8 de producción más potente del mundo. Complementado por un motor eléctrico E-Module de última generación que aporta 347 CV adicionales, la potencia combinada alcanza los 1.275 CV. Pero lo verdaderamente revolucionario es la unidad de potencia eléctrica, que utiliza tecnología de celda de batería directamente derivada del programa de F1 de McLaren.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La batería de alto rendimiento, aunque compacta con solo 1,384 kWh de capacidad, puede descargarse y recargarse a velocidades extremas gracias a su química celular de competición. El sistema de recuperación de energía regenerativa trabaja tanto en frenado como en las fases de desaceleración, manteniendo la batería en un estado de carga óptimo para proporcionar impulsos de potencia cuando más se necesitan.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="Interior del McLaren W1" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              Un cockpit minimalista y centrado en el conductor, heredero directo de la filosofía McLaren F1
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Aerodinámica activa sin compromisos</h2>
            <p className="text-base leading-relaxed mb-6">
              El W1 presenta el paquete aerodinámico más sofisticado jamás instalado en un McLaren de carretera. El McLaren Active Long Tail (MALT) es un sistema revolucionario que extiende la cola del coche en 300 mm a alta velocidad, aumentando dramáticamente la carga aerodinámica y la eficiencia. Combinado con el alerón trasero activo y los canales Venturi integrados en el suelo plano, el W1 genera más de 1.000 kg de downforce a 280 km/h.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El chasis Aerocell, fabricado enteramente en fibra de carbono utilizando las técnicas de laminado más avanzadas de la industria aeroespacial, pesa apenas 150 kg y proporciona una rigidez torsional un 40% superior a la del chasis del P1. Cada gramo ha sido analizado y optimizado: hasta los tornillos de titanio se han taladrado para reducir peso sin comprometer la resistencia.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="McLaren W1 en circuito a velocidad" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              El sistema Active Long Tail desplegado durante las pruebas de alta velocidad
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Exclusividad y precio del McLaren W1</h2>
            <p className="text-base leading-relaxed mb-8">
              Con un precio base de 2,1 millones de euros y una producción limitada a 399 unidades, el McLaren W1 se sitúa en la élite absoluta de los hypercars. Cada ejemplar será fabricado a mano en el McLaren Production Centre de Woking, con un proceso de ensamblaje que requiere más de 400 horas por unidad. La lista completa de compradores ya está cerrada, pero McLaren ha anunciado que explorará versiones especiales — incluida una variante de circuito aún más extrema — en los próximos años.
            </p>
          </motion.div>

          <ArticleCTAs vehicleName="McLaren W1" />

          <p className="text-sm text-muted-foreground border-t border-border/30 pt-4 mt-8">
            Fuente oficial:{" "}
            <a href="https://cars.mclaren.com/uk_en/W1" rel="nofollow noopener" target="_blank" className="text-[#bda095] hover:underline">
              McLaren — W1
            </a>
          </p>

        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaMcLarenW1;
