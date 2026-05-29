import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Timer, Crown } from "lucide-react";
import ArticleCTAs from "@/components/ArticleCTAs";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const TITLE = "Lamborghini Revuelto Spider: el primer descapotable V12 híbrido de la historia de Lamborghini";
const DESCRIPTION = "Sant'Agata presenta el Revuelto Spider, primer descapotable V12 híbrido de Lamborghini, con 1.015 CV y producción limitada a 249 unidades al año.";
const SLUG = "lamborghini-revuelto-spider";
const DATE_ISO = "2026-03-28";

const heroImg = "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80";
const detailImg1 = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80";
const detailImg2 = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80";
const detailImg3 = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80";

const specs = [
  { icon: Zap, label: "Potencia", value: "1.015 CV" },
  { icon: Gauge, label: "0-100 km/h", value: "2,5 s" },
  { icon: Crown, label: "Motor", value: "V12 6.5L + 3 eléctricos" },
  { icon: Timer, label: "Producción", value: "249 uds/año" },
];

const NoticiaLamborghiniRevueltoSpider = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{`${TITLE} | Owneo`}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`https://www.owneo.es/noticias/${SLUG}`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`https://www.owneo.es/noticias/${SLUG}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Owneo" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": "${TITLE.replace(/"/g, '\\"')}",
            "datePublished": "${DATE_ISO}",
            "publisher": {
              "@type": "Organization",
              "name": "Owneo",
              "url": "https://www.owneo.es"
            },
            "mainEntityOfPage": "https://www.owneo.es/noticias/${SLUG}"
          }
        `}</script>
      </Helmet>
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="Lamborghini Revuelto Spider" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">Lanzamientos</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Lamborghini Revuelto Spider: el primer descapotable V12 híbrido de la historia de Lamborghini
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>28 Marzo 2026</span>
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
              Sant'Agata Bolognese inaugura una nueva era para su buque insignia con el Revuelto Spider, el primer descapotable de la historia de Lamborghini equipado con un motor V12 híbrido. Con 1.015 CV combinados y la posibilidad de disfrutar del aullido del V12 atmosférico al aire libre, este modelo redefine los límites del superdeportivo descapotable contemporáneo.
            </p>
            <p className="text-base leading-relaxed mb-6">
              La historia de los descapotables V12 de Lamborghini es relativamente reciente pero increíblemente apasionante. Desde el Murciélago LP640 Roadster presentado en 2006, pasando por el Aventador Roadster y culminando en el extraordinario Aventador SVJ Roadster de 770 CV, cada una de estas creaciones ha sido recibida como una obra maestra de la ingeniería italiana. El Revuelto Spider representa la culminación natural de esta saga, llevando por primera vez a la electrificación lo que hasta ahora había sido exclusivamente patrimonio de la combustión más pura. La marca ha decidido limitar la producción a apenas 249 unidades al año, asegurando una exclusividad que iguala o supera a sus predecesores históricos y manteniendo la promesa de que cada propietario forma parte de un club extraordinariamente selecto.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El reto técnico de adaptar el V12 híbrido del Revuelto coupé a una configuración descapotable ha sido considerable. Los ingenieros han debido reforzar significativamente el monocasco en fibra de carbono Forged Composite para compensar la ausencia del techo, sin penalizar el peso de manera sensible. El resultado es un incremento de solo 95 kilogramos respecto al coupé, una cifra notable dado que prácticamente toda la estructura superior ha tenido que ser repensada desde cero. La rigidez torsional se mantiene en un 97% de la versión cerrada, garantizando que el comportamiento dinámico siga siendo absolutamente fiel al espíritu del Revuelto original.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="Lamborghini Revuelto Spider vista lateral" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El Revuelto Spider muestra una silueta agresiva con el techo de carbono retraído</p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">El reto de exponer el V12 híbrido a cielo abierto</h2>
            <p className="text-base leading-relaxed mb-6">
              El propulsor central trasero del Revuelto Spider mantiene la arquitectura V12 a 60° de 6.5 litros del coupé, capaz de entregar 825 CV a 9.250 rpm sin recurrir a ningún tipo de sobrealimentación. A esta base atmosférica se suman tres motores eléctricos —dos delanteros independientes y uno trasero integrado en la nueva transmisión DCT de ocho velocidades— que aportan 190 CV adicionales y permiten una autonomía 100% eléctrica de aproximadamente 13 kilómetros en uso urbano. La integración entre la térmica y la eléctrica se realiza a través de una batería estructural de 3,8 kWh ubicada en el túnel central, contribuyendo a mantener un centro de gravedad bajo y un reparto de pesos óptimo entre los ejes.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La verdadera proeza técnica del Spider reside, sin embargo, en el sistema de refrigeración del V12 al funcionar con el techo abierto. Los ingenieros han tenido que rediseñar por completo los conductos de aire del compartimento motor para compensar la pérdida de presión aerodinámica generada por la cabina abierta, instalando nuevas tomas activas en los pasos de rueda traseros y un sistema de extracción rediseñado que aumenta el caudal de aire en un 22% respecto al Revuelto coupé. Estas modificaciones permiten al V12 mantener temperaturas óptimas incluso en sesiones intensivas con el techo bajado, algo crucial dado que la pieza más codiciada del descapotable es precisamente la sinfonía mecánica de doce cilindros girando libremente hasta la zona roja.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="Lamborghini Revuelto Spider interior" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">Habitáculo en cuero Nero Cosmos con costuras en hilo verde Verde Selvans</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">La emoción acústica única de un V12 sin filtros</h2>
            <p className="text-base leading-relaxed mb-6">
              Si hay una característica que define al Revuelto Spider frente a cualquier otro descapotable contemporáneo es su firma sonora absolutamente única. Mientras la práctica totalidad de los superdeportivos descapotables actuales recurre a motores V6 o V8 turboalimentados con sonidos sintéticos amplificados por altavoces, el Revuelto Spider ofrece la experiencia analógica pura de un V12 atmosférico real. Los ingenieros acústicos de Lamborghini han trabajado durante más de dieciocho meses en la calibración del sistema de escape, utilizando materiales nobles como el titanio y el inconel para obtener una banda sonora que evoluciona desde un grave aterciopelado en ralentí hasta un aullido metálico en la zona roja.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El techo retráctil de fibra de carbono se compone de dos paneles independientes que se almacenan automáticamente en el compartimento frontal en apenas 12 segundos, una operación que puede realizarse incluso en marcha a velocidades de hasta 50 km/h. Una vez plegado, el coeficiente aerodinámico Cx se mantiene prácticamente intacto respecto al coupé gracias a un nuevo deflector activo posterior que se eleva automáticamente para suavizar las turbulencias en el habitáculo. El resultado es un descapotable utilizable a cualquier velocidad sin las molestias acústicas típicas del segmento, permitiendo conversar sin elevar la voz incluso a 200 km/h en autopista alemana sin limitaciones.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="Lamborghini Revuelto Spider en carretera" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El Revuelto Spider en su entorno natural: las carreteras costeras de la Riviera italiana</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Precio, exclusividad y posicionamiento</h2>
            <p className="text-base leading-relaxed mb-6">
              El Lamborghini Revuelto Spider se ofrece con un precio base de aproximadamente 600.000 euros antes de impuestos y opciones, una cifra que se incrementa significativamente con las personalizaciones del programa Ad Personam que prácticamente todos los compradores eligen. La producción se ha limitado deliberadamente a 249 unidades al año, una cifra inferior a la del coupé para preservar la exclusividad del descapotable. Las primeras entregas comenzarán en el segundo semestre de 2026 desde la histórica factoría de Sant'Agata Bolognese, con una lista de espera que ya supera los dos años incluso para clientes habituales de la marca.
            </p>
            <p className="text-base leading-relaxed mb-8">
              Con el Revuelto Spider, Lamborghini consolida su posicionamiento como referencia absoluta del superdeportivo descapotable de alta gama, en un segmento donde la competencia es prácticamente inexistente: ningún rival ofrece actualmente un V12 atmosférico a cielo abierto. Es probable que este modelo sea recordado como el último gran descapotable V12 de la historia del automóvil, dado que las normativas europeas sobre emisiones harán prácticamente imposible homologar un sucesor con la misma arquitectura mecánica. Por esta razón, los analistas del mercado coleccionista anticipan que el Revuelto Spider se convertirá en una pieza altamente cotizada en el mercado de segunda mano, replicando el fenómeno que vivieron sus predecesores Murciélago Roadster y Aventador SVJ Roadster.
            </p>
          </motion.div>

          <ArticleCTAs vehicleName="Lamborghini Revuelto Spider" />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaLamborghiniRevueltoSpider;
