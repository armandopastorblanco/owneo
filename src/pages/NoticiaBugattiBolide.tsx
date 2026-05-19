import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Timer, Crown } from "lucide-react";
import ArticleCTAs from "@/components/ArticleCTAs";
import { Link } from "react-router-dom";

const heroImg = "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1600&q=80";
const detailImg1 = "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80";
const detailImg2 = "https://images.unsplash.com/photo-1611821064430-0d40291922d2?auto=format&fit=crop&w=1200&q=80";
const detailImg3 = "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80";

const specs = [
  { icon: Zap, label: "Potencia", value: "1.825 CV" },
  { icon: Gauge, label: "Peso", value: "1.450 kg" },
  { icon: Crown, label: "Motor", value: "W16 8.0L quad-turbo" },
  { icon: Timer, label: "Producción", value: "40 uds (sólo pista)" },
];

const NoticiaBugattiBolide = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="Bugatti Bolide" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">Hypercars</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Bugatti Bolide: las primeras entregas confirman el hypercar de circuito más extremo jamás construido en Molsheim
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>9 Mayo 2026</span>
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
              Bugatti acaba de iniciar las primeras entregas del Bolide, el hypercar de circuito más extremo de la historia de la marca de Molsheim. Con 1.825 CV de potencia desarrollados por una versión exclusivamente atmosférica del legendario motor W16 quad-turbo, un peso total de apenas 1.450 kilogramos y unas prestaciones aerodinámicas dignas del programa Hipercar de Le Mans, el Bolide representa la culminación absoluta de la era W16 antes del lanzamiento del Tourbillon V16.
            </p>
            <p className="text-base leading-relaxed mb-6">
              El Bugatti Bolide fue presentado por primera vez en octubre de 2020 como un proyecto de estudio sin intención comercial inicial, pero la enorme demanda generada por los clientes habituales de la marca llevó a Bugatti a confirmar su producción en serie limitada apenas un año después. La producción se limitará estrictamente a 40 unidades en todo el mundo, todas ellas reservadas para clientes propietarios previos de modelos como el Chiron, el Centodieci o el Divo, garantizando una exclusividad absoluta y consolidando la estrategia comercial de Molsheim basada en relaciones de larga duración con la élite del coleccionismo automovilístico mundial.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El motor W16 quad-turbo del Bolide es probablemente el propulsor más radical jamás homologado por Bugatti. Mientras la versión del Chiron entrega 1.500 CV con asistencia eléctrica auxiliar, el Bolide eleva esta cifra hasta los 1.825 CV mediante una calibración específica para combustible 110 octanos de competición, una geometría de los turbocompresores optimizada para la pista y un sistema de admisión completamente rediseñado. El bloque del motor mantiene la configuración W de 16 cilindros con un ángulo de 90° entre bancadas, una arquitectura única en el mundo del automóvil contemporáneo que combina la compacidad de un V8 con la potencia de un V12.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="Bugatti Bolide vista lateral" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El Bolide muestra su característico chasis monocoque visible bajo la carrocería expuesta</p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Una relación peso-potencia digna de un prototipo de Le Mans</h2>
            <p className="text-base leading-relaxed mb-6">
              La cifra más impresionante del Bugatti Bolide no es su potencia absoluta sino su relación peso-potencia. Con 1.825 CV en apenas 1.450 kilogramos de peso total en orden de marcha, el Bolide ofrece una densidad de potencia de 0,79 kg/CV, una cifra inferior a la de los prototipos LMDh contemporáneos del Mundial de Resistencia (WEC). Esta proeza técnica se ha conseguido gracias al uso intensivo de fibra de carbono prepreg en prácticamente todos los componentes estructurales, incluido un monocoque integral que actúa al mismo tiempo como célula de seguridad y como base estructural del coche.
            </p>
            <p className="text-base leading-relaxed mb-12">
              Los componentes mecánicos del Bolide también han sido aligerados al máximo posible. Los tornillos del chasis están fabricados en titanio grado 5 con cabezas perforadas, los discos de freno son de carbono-cerámica con espesor reducido, y la transmisión secuencial Xtrac de siete velocidades incorpora carcasa de magnesio para ahorrar 18 kilogramos respecto a una solución convencional en aluminio. Incluso los neumáticos Michelin Pilot Sport Cup 2 R desarrollados específicamente para el Bolide utilizan compuestos especiales que reducen el peso de cada rueda en aproximadamente 2,5 kilogramos respecto a las versiones convencionales.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="Bugatti Bolide vista aérea" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El paquete aerodinámico del Bolide genera 1.800 kg de carga aerodinámica a 320 km/h</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Una experiencia exclusiva con soporte fábrica completo</h2>
            <p className="text-base leading-relaxed mb-6">
              Bugatti ha desarrollado un programa exclusivo de experiencias en circuito para los 40 propietarios del Bolide, denominado Bugatti Bolide Experience. Este servicio incluye seis eventos privados anuales en los circuitos más prestigiosos del mundo (Spa-Francorchamps, Nürburgring, Paul Ricard, Yas Marina, Circuit of the Americas y Suzuka), con coches transportados, mantenidos y configurados por mecánicos oficiales de Bugatti Sport. Cada propietario tiene acceso a un coach personal seleccionado entre antiguos pilotos profesionales, garantizando una experiencia de pilotaje al máximo nivel sin necesidad de invertir tiempo en logística operativa.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El Bolide no está homologado para uso en vías abiertas, una decisión deliberada de Bugatti para mantener el máximo rendimiento técnico sin compromisos derivados de la normativa de seguridad pasiva y activa exigida para coches de calle. Esta característica lo sitúa en un segmento muy específico junto a modelos como el Aston Martin Valkyrie AMR Pro, el Mercedes-AMG Project ONE versión circuito o el Pagani Huayra R, todos ellos hypercars exclusivamente diseñados para uso en pista y comercializados con programas de experiencia similares.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="Bugatti Bolide en circuito" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El Bolide durante una sesión privada en el circuito de Paul Ricard, sur de Francia</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Precio, exclusividad histórica y proyección de valor</h2>
            <p className="text-base leading-relaxed mb-6">
              El Bugatti Bolide se ha comercializado a un precio base de 4 millones de euros antes de impuestos y opciones, una cifra que incluye el coche, el programa Bolide Experience completo durante cinco años y un set de herramientas y piezas de repuesto específicas para mantenimiento del cliente. Las 40 unidades disponibles se agotaron en menos de 72 horas tras la apertura de los pedidos en 2021, demostrando una vez más el enorme apetito del mercado del coleccionismo por las creaciones más exclusivas de Molsheim. La lista de propietarios incluye varios miembros de familias reales del Golfo Pérsico, coleccionistas históricos estadounidenses y empresarios del sector tecnológico chino.
            </p>
            <p className="text-base leading-relaxed mb-8">
              Los analistas del segmento coleccionista anticipan una revalorización significativa del Bolide en los próximos años, especialmente cuando Bugatti finalice la transición completa hacia el motor V16 híbrido del Tourbillon y el W16 quede definitivamente jubilado. Para muchos coleccionistas, el Bolide representa la última obra maestra mecánica de la era atmosférica-turbo de Bugatti, un período histórico de poco más de veinte años que comenzó con el Veyron de 2005 y que culminará con las últimas unidades del Mistral Roadster y del propio Bolide. Esta condición de pieza histórica final justifica las primas que ya se cotizan en el mercado secundario, con sobreprecios que superan ampliamente los 1,5 millones de euros para unidades disponibles.
            </p>
          </motion.div>

          <ArticleCTAs vehicleName="Bugatti Bolide" />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaBugattiBolide;
