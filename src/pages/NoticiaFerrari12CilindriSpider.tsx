import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Timer, Crown } from "lucide-react";
import ArticleCTAs from "@/components/ArticleCTAs";
import { Link } from "react-router-dom";

const heroImg = "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1600&q=80";
const detailImg1 = "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80";
const detailImg2 = "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80";
const detailImg3 = "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80";

const specs = [
  { icon: Zap, label: "Potencia", value: "830 CV" },
  { icon: Gauge, label: "0-100 km/h", value: "2,9 s" },
  { icon: Crown, label: "Motor", value: "V12 6.5L atmosférico" },
  { icon: Timer, label: "Vel. máx.", value: "340 km/h" },
];

const NoticiaFerrari12CilindriSpider = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="Ferrari 12Cilindri Spider" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">Gran Turismo</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Ferrari 12Cilindri Spider: el último gran descapotable V12 atmosférico de Maranello rueda en Fiorano
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>4 Abril 2026</span>
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
              Ferrari ha llevado el 12Cilindri Spider al circuito privado de Fiorano para las primeras pruebas dinámicas oficiales, confirmando lo que muchos aficionados ya sospechaban: el descapotable V12 atmosférico de Maranello será, probablemente, el último de su especie. Con 830 CV obtenidos sin sobrealimentación y una sinfonía mecánica que recuerda a los Daytona y 365 GTS/4 clásicos, este modelo cierra una era irrepetible.
            </p>
            <p className="text-base leading-relaxed mb-6">
              El propulsor F140HD que equipa al 12Cilindri Spider es la última evolución del legendario V12 atmosférico que Ferrari viene perfeccionando desde el Enzo de 2002. Con 6.496 cc de cilindrada, este motor entrega su potencia máxima de 830 CV a 9.250 rpm sin recurrir a ningún tipo de asistencia eléctrica ni sobrealimentación, una proeza técnica cada vez más rara en la industria del automóvil contemporáneo. El par máximo de 678 Nm se alcanza a 7.250 rpm, lo que obliga al conductor a explotar el régimen de giro para extraer todo el potencial del propulsor, una característica que los puristas consideran esencial en cualquier Ferrari V12 que se precie.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La transformación del coupé en descapotable ha sido obra del Centro Stile Ferrari bajo la dirección de Flavio Manzoni. El techo rígido retráctil de aluminio se pliega en apenas 14 segundos a velocidades de hasta 45 km/h, y se aloja en un compartimento específico detrás de los asientos sin penalizar la capacidad del maletero frontal. Las líneas conservan la elegancia minimalista del coupé, con guiños evidentes a los grandes descapotables Ferrari de los años sesenta y setenta como el 365 California o el 275 GTS, modelos que hoy alcanzan valores de coleccionista superiores a los cuatro millones de euros en subastas internacionales.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="Ferrari 12Cilindri Spider en Fiorano" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El 12Cilindri Spider durante una sesión privada de pruebas en el circuito de Fiorano</p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Una arquitectura mecánica fiel al patrimonio Ferrari</h2>
            <p className="text-base leading-relaxed mb-6">
              El conjunto motor-transmisión del 12Cilindri Spider mantiene la configuración delantera longitudinal con transeje trasero, una solución técnica que Ferrari adoptó por primera vez en el 365 GTB/4 Daytona de 1968 y que sigue ofreciendo el mejor compromiso posible entre reparto de pesos, comportamiento dinámico y capacidad de habitabilidad. El cambio automático DCT de ocho velocidades, desarrollado conjuntamente con Magneti Marelli, integra una nueva calibración específica para el Spider que optimiza los cambios descendentes al circular con el techo abierto, garantizando una respuesta acústica especialmente trabajada en cada reducción.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El reparto de pesos se mantiene en un excepcional 48/52 entre el eje delantero y trasero, una cifra prácticamente idéntica al coupé pese al refuerzo estructural necesario para compensar la ausencia del techo. Los ingenieros han trabajado con un nuevo subchasis trasero en aluminio reforzado con inserciones de fibra de carbono que aumenta la rigidez torsional en un 18% respecto a un descapotable convencional, sin penalizar el peso total más allá de los 65 kilogramos adicionales que separan al Spider del coupé. El resultado en pista es un comportamiento prácticamente indistinguible entre ambas configuraciones, según los pilotos de pruebas oficiales.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="Ferrari 12Cilindri Spider interior" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">Habitáculo en cuero Heritage Tan con detalles en fibra de carbono mate</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">El privilegio de escuchar un V12 atmosférico al aire libre</h2>
            <p className="text-base leading-relaxed mb-6">
              La verdadera razón de ser del 12Cilindri Spider reside en la experiencia acústica que ofrece al conductor. Mientras la totalidad de la competencia ha abandonado los motores atmosféricos en favor de propulsores turbo o híbridos, Ferrari mantiene viva esta filosofía únicamente en su gama V12, consciente de que es una característica técnica imposible de replicar artificialmente. El sistema de escape se ha rediseñado por completo respecto al coupé para potenciar las frecuencias medias y altas cuando se circula con el techo abierto, utilizando válvulas activas que modulan la firma sonora según el modo de conducción seleccionado en el Manettino del volante.
            </p>
            <p className="text-base leading-relaxed mb-12">
              Las primeras pruebas dinámicas en Fiorano han confirmado que el 12Cilindri Spider conserva los tiempos del coupé en circuito, con una vuelta cronometrada en 1:21,5 según el departamento técnico de Maranello. Esta cifra lo sitúa apenas medio segundo por detrás del SF90 Stradale, todo un logro considerando que el Spider no dispone de propulsión eléctrica adicional ni tracción integral. El sistema de control de estabilidad ESC FRS evoluciona con una nueva calibración específica para descapotable, que tiene en cuenta los cambios de inercia provocados por la apertura del techo a alta velocidad y ajusta automáticamente los umbrales de intervención de los frenos cerámicos Brembo CCM-R Plus.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="Ferrari 12Cilindri Spider en carretera" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El 12Cilindri Spider recorriendo las carreteras de los Apeninos toscanos</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Precio, disponibilidad y valor patrimonial</h2>
            <p className="text-base leading-relaxed mb-6">
              El Ferrari 12Cilindri Spider parte de un precio base de 465.000 euros antes de impuestos en el mercado español, una cifra que rara vez refleja el desembolso real de los compradores debido al alto índice de personalización del programa Tailor Made y Atelier. Ferrari ha confirmado que la producción inicial estará limitada a las próximas tres temporadas, sin un número exacto de unidades anuales debido a la política comercial de la marca, aunque fuentes internas apuntan a una cifra anual cercana a las 750 unidades para garantizar la exclusividad típica de los modelos V12.
            </p>
            <p className="text-base leading-relaxed mb-8">
              La lista de espera ha alcanzado ya los dos años para clientes habituales y prácticamente cuatro años para nuevos compradores, una situación que confirma la apetencia del mercado por este último Ferrari V12 atmosférico descapotable. Los analistas del segmento coleccionista anticipan una revalorización significativa del 12Cilindri Spider en los próximos diez años, especialmente cuando entren en vigor las normativas Euro 7 que harán inviable la homologación de un sucesor con la misma arquitectura mecánica. Por todo ello, no exageramos al afirmar que estamos ante una pieza histórica destinada a convertirse en uno de los Ferrari modernos más codiciados del mañana.
            </p>
          </motion.div>

          <ArticleCTAs vehicleName="Ferrari 12Cilindri Spider" />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaFerrari12CilindriSpider;
