import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Timer, Crown } from "lucide-react";
import ArticleCTAs from "@/components/ArticleCTAs";
import { Link } from "react-router-dom";

const heroImg = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80";
const detailImg1 = "https://images.unsplash.com/photo-1611821064430-0d40291922d2?auto=format&fit=crop&w=1200&q=80";
const detailImg2 = "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80";
const detailImg3 = "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80";

const specs = [
  { icon: Zap, label: "Potencia", value: "560 CV" },
  { icon: Gauge, label: "0-100 km/h", value: "3,0 s" },
  { icon: Crown, label: "Motor", value: "Flat-6 4.0L atmosférico" },
  { icon: Timer, label: "Nürburgring", value: "6:42" },
];

const NoticiaPorscheGt3Rs2026 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="Porsche 911 GT3 RS 2026" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">Competición</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Porsche 911 GT3 RS 2026: especificaciones técnicas detalladas del Porsche más afilado de Zuffenhausen
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>11 Abril 2026</span>
              <span className="mx-2">·</span>
              <span>9 min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      <article className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Porsche acaba de publicar las especificaciones técnicas completas del 911 GT3 RS 2026, una evolución que lleva al icónico deportivo de Weissach a un nivel de sofisticación aerodinámica y dinámica nunca visto en un coche de calle. Con 560 CV, una nueva generación de elementos activos derivados directamente del programa LMDh y un tiempo de vuelta en Nürburgring de 6:42 minutos, el GT3 RS 2026 redefine el concepto de superdeportivo de pista homologado para carretera.
            </p>
            <p className="text-base leading-relaxed mb-6">
              El corazón del GT3 RS 2026 sigue siendo un motor flat-six atmosférico de 4.0 litros de cilindrada, un propulsor que Porsche viene perfeccionando desde el 996 GT3 del año 1999. En esta nueva versión, los ingenieros han trabajado en la optimización interna del motor para extraer 25 CV adicionales respecto a la generación anterior, manteniendo la zona roja a las célebres 9.000 rpm que diferencian al GT3 RS de cualquier otro deportivo del mercado. La cifra final de 560 CV se obtiene a 8.500 rpm, mientras que el par máximo de 470 Nm se entrega a 6.300 rpm, garantizando una respuesta lineal y predecible especialmente apreciada en el uso intensivo en circuito.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La aerodinámica activa es probablemente el aspecto más revolucionario del GT3 RS 2026. El alerón trasero gigante, ya icónico en la generación anterior, evoluciona con la incorporación de un sistema DRS de dos posiciones controlado electrónicamente, que reduce el coeficiente de resistencia aerodinámica en un 35% en línea recta y maximiza la carga vertical en curva. La carga aerodinámica máxima alcanza los 920 kg a 285 km/h, una cifra que prácticamente dobla la del 911 GT3 estándar y que requiere de un chasis específicamente reforzado para soportar las presiones generadas sobre los neumáticos.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="Porsche 911 GT3 RS 2026 vista aérea" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El alerón trasero activo del GT3 RS 2026 en posición de máxima carga aerodinámica</p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Una transferencia tecnológica directa desde el programa LMDh</h2>
            <p className="text-base leading-relaxed mb-6">
              Los ingenieros de Porsche Motorsport han trasladado al GT3 RS 2026 un conjunto importante de tecnologías desarrolladas durante los últimos tres años en el programa LMDh con el 963 Hybrid. La suspensión multi-link delantera estrena un nuevo sistema de control variable de la rigidez del muelle, derivado directamente del prototipo de Le Mans, que permite ajustar las características dinámicas del coche en tiempo real según el tipo de curva y el grado de adherencia disponible. Esta tecnología, denominada Porsche Active Suspension Management Pro, sustituye al sistema PASM convencional y representa un salto cualitativo significativo en la respuesta del chasis.
            </p>
            <p className="text-base leading-relaxed mb-12">
              Los frenos cerámicos PCCB Plus de nueva generación incorporan discos delanteros de 410 mm de diámetro con pinzas monobloque de aluminio forjado con seis pistones, un conjunto desarrollado específicamente para soportar la inmensa carga aerodinámica y los tiempos de frenada extremos en circuitos como Nürburgring o Spa-Francorchamps. La capacidad de disipación térmica se ha mejorado en un 28% respecto a la generación anterior gracias a un nuevo diseño de conductos de refrigeración integrados en los pasos de rueda. Los neumáticos Michelin Pilot Sport Cup 2 R desarrollados específicamente para el GT3 RS 2026 ofrecen un agarre lateral récord en seco, aunque limitan considerablemente el uso en condiciones de lluvia intensa.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="Porsche 911 GT3 RS 2026 interior racing" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">Asientos baquet de carbono con arnés de seis puntos del paquete Clubsport opcional</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Cifras de prestaciones que rozan el ámbito profesional</h2>
            <p className="text-base leading-relaxed mb-6">
              Las cifras oficiales de prestaciones del GT3 RS 2026 son sencillamente extraordinarias para un vehículo homologado de calle. La aceleración de 0 a 100 km/h se completa en 3,0 segundos exactos, mientras que los 200 km/h se alcanzan en 9,8 segundos partiendo de parado. La velocidad máxima se sitúa en 295 km/h, limitada electrónicamente por el efecto aerodinámico generado por el alerón trasero. En frenada, el GT3 RS pasa de 100 a 0 km/h en apenas 29 metros con neumáticos Cup 2 R nuevos, una cifra digna de los prototipos de competición más exclusivos del mercado.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El tiempo de vuelta oficial en el circuito de Nürburgring Nordschleife se ha establecido en 6 minutos y 42 segundos, casi 7 segundos por debajo del cronometrado por la generación anterior y prácticamente al nivel del Mercedes-AMG One híbrido, todo un milagro técnico considerando que el GT3 RS prescinde totalmente de propulsión eléctrica. Esta marca lo convierte en el coche de calle atmosférico más rápido de la historia en el infierno verde, una distinción que Porsche celebra con un programa especial de entregas en el propio circuito alemán para los compradores del paquete Weissach Edition.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="Porsche 911 GT3 RS 2026 en circuito" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El GT3 RS 2026 durante una sesión de pruebas oficial en el Nürburgring Nordschleife</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Precio y posicionamiento dentro de la gama Porsche</h2>
            <p className="text-base leading-relaxed mb-6">
              El Porsche 911 GT3 RS 2026 se ofrece a partir de 295.000 euros antes de impuestos en el mercado español, una cifra que se incrementa significativamente con el paquete Weissach Edition (35.000 euros adicionales) y los neumáticos magnesio forjados Magnesium Wheels Package (25.000 euros). La producción anual está limitada a aproximadamente 1.800 unidades distribuidas globalmente, con cuotas específicas para cada mercado que en España se traducen en apenas 35 unidades anuales asignadas a clientes habituales del programa GT.
            </p>
            <p className="text-base leading-relaxed mb-8">
              Pese a su elevado precio, el GT3 RS 2026 representa una propuesta especialmente coherente dentro de la gama Porsche, ofreciendo cifras de prestaciones que sólo pueden igualar los superdeportivos de seis y siete cifras de la competencia directa. La lista de espera ha alcanzado ya los tres años para clientes nuevos, y el mercado de segunda mano ya cotiza primas significativas sobre el precio oficial. Para los aficionados al motor atmosférico, este modelo representa una de las últimas oportunidades históricas de adquirir un Porsche de calle equipado con un flat-six naturalmente aspirado capaz de girar hasta las 9.000 rpm sin asistencia eléctrica de ningún tipo.
            </p>
          </motion.div>

          <ArticleCTAs vehicleName="Porsche 911 GT3 RS 2026" />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaPorscheGt3Rs2026;
