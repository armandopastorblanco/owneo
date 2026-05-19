import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Timer, Crown } from "lucide-react";
import ArticleCTAs from "@/components/ArticleCTAs";
import { Link } from "react-router-dom";

const heroImg = "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1600&q=80";
const detailImg1 = "https://images.unsplash.com/photo-1571127236794-81c69011ae44?auto=format&fit=crop&w=1200&q=80";
const detailImg2 = "https://images.unsplash.com/photo-1612220330585-7a5c4a06dfac?auto=format&fit=crop&w=1200&q=80";
const detailImg3 = "https://images.unsplash.com/photo-1580414155951-19a517de1c0e?auto=format&fit=crop&w=1200&q=80";

const specs = [
  { icon: Zap, label: "Potencia", value: "1.275 CV" },
  { icon: Gauge, label: "0-100 km/h", value: "2,7 s" },
  { icon: Crown, label: "Motor", value: "V8 4.0L bi-turbo + eléctrico" },
  { icon: Timer, label: "Producción", value: "350 uds limitadas" },
];

const NoticiaMcLarenW1Spider = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="McLaren W1 Spider" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">Hypercars</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              McLaren W1 Spider: confirmación oficial del descapotable que coronará el linaje de Woking
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>18 Abril 2026</span>
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
              McLaren ha confirmado oficialmente lo que la prensa especializada venía rumoreando desde el lanzamiento del W1 coupé en 2024: existirá una versión Spider del hypercar británico, limitada a apenas 350 unidades y reservada exclusivamente a propietarios de un W1 coupé previo. Con 1.275 CV de potencia combinada y un techo en fibra de carbono retráctil eléctricamente, el W1 Spider representa la cima absoluta de la gama McLaren actual.
            </p>
            <p className="text-base leading-relaxed mb-6">
              La estrategia comercial elegida por McLaren para el W1 Spider sigue el modelo exitoso de Ferrari con sus modelos Aperta y de Porsche con los 918 Spyder: la posibilidad de adquirir el descapotable se ofrece únicamente a los 399 propietarios mundiales del coupé W1, en orden de antigüedad de pedido y con un derecho de preferencia absoluto. Esta política comercial garantiza la exclusividad máxima del modelo y blinda el valor de inversión tanto del coupé como del descapotable, evitando que aparezca una segunda generación de propietarios fuera del círculo más selecto del coleccionismo automovilístico contemporáneo.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El conjunto mecánico del W1 Spider mantiene íntegramente la configuración del coupé: un motor V8 biturbo de 4.0 litros desarrollado específicamente para este modelo, capaz de entregar 928 CV en su versión térmica, acoplado a un motor eléctrico de eje trasero que aporta 347 CV adicionales, alcanzando una potencia combinada de 1.275 CV. La transmisión es un cambio DCT de ocho velocidades con embrague doble en baño de aceite, una solución técnica heredada de la Fórmula 1 de Woking que ha sido refinada durante más de quince años en sucesivas generaciones de hypercars McLaren.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="McLaren W1 Spider vista frontal" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El W1 Spider muestra la firma luminosa LED integrada en los conductos aerodinámicos delanteros</p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">El reto técnico de convertir un hypercar de carbono en descapotable</h2>
            <p className="text-base leading-relaxed mb-6">
              La conversión del W1 coupé en versión Spider ha exigido un trabajo de ingeniería estructural particularmente complejo. La célula central monocasco MonoCage Plus de fibra de carbono prepreg ha tenido que ser parcialmente rediseñada para incorporar refuerzos en la zona del techo plegable, manteniendo la rigidez torsional del coupé pese a la ausencia del panel superior. El incremento de peso respecto al coupé se ha limitado a apenas 49 kilogramos, una cifra excepcional considerando que muchos descapotables convencionales suelen ganar entre 80 y 120 kilogramos en su versión sin techo.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El mecanismo del techo es una proeza tecnológica desarrollada conjuntamente con Magna Steyr en Austria. Los dos paneles de fibra de carbono se pliegan automáticamente en una cavidad ubicada detrás de los asientos en apenas 11 segundos, una operación que puede realizarse a velocidades de hasta 50 km/h. Una vez plegado, el techo no penaliza ni la capacidad del maletero trasero ni la aerodinámica activa del coche, gracias a un nuevo deflector posterior que se eleva automáticamente para compensar las turbulencias generadas por la ausencia del techo a altas velocidades.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="McLaren W1 Spider interior" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">Habitáculo en alcantara negra con costuras en hilo Papaya Spark característico de McLaren</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Prestaciones de hypercar moderno sin compromiso</h2>
            <p className="text-base leading-relaxed mb-6">
              Las cifras de prestaciones del W1 Spider apenas se ven afectadas por la pérdida del techo. La aceleración de 0 a 100 km/h se completa en 2,7 segundos, exactamente la misma cifra del coupé pese al ligero incremento de peso. Los 200 km/h se alcanzan en 5,9 segundos partiendo de parado, mientras que la velocidad máxima se sitúa en 350 km/h con el techo cerrado y desciende a 322 km/h con el techo abierto debido a las limitaciones aerodinámicas inevitables. Estas cifras sitúan al W1 Spider entre los descapotables más rápidos jamás homologados para uso en carretera.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La autonomía 100% eléctrica del W1 Spider alcanza los 32 kilómetros gracias a una batería de 7,4 kWh ubicada en el túnel central, una cifra modesta pero suficiente para entrar y salir de cascos urbanos europeos sin emisiones locales. El sistema híbrido recupera energía no sólo en frenada sino también en deceleración mediante un nuevo sistema de freno motor inteligente desarrollado por McLaren Applied Technologies. La integración entre la propulsión térmica y la eléctrica se gestiona mediante un nuevo software MCU desarrollado específicamente para este modelo, que también controla las funciones aerodinámicas activas y el sistema de tracción integral parcial.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="McLaren W1 Spider en carretera" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El W1 Spider exhibido por primera vez en el Goodwood Festival of Speed 2026</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Precio, exclusividad y valor patrimonial</h2>
            <p className="text-base leading-relaxed mb-6">
              El McLaren W1 Spider se ha posicionado con un precio base de 2,4 millones de euros antes de impuestos y opciones, ligeramente superior a los 2,1 millones de euros del coupé original. Esta diferencia se justifica por la complejidad técnica adicional del mecanismo del techo y por la exclusividad incrementada del descapotable, limitado a 350 unidades frente a las 399 del coupé. El programa de personalización McLaren Special Operations permite configurar prácticamente cualquier aspecto del coche, desde colores Heritage hasta acabados de fibra de carbono específicos, con costes adicionales que rara vez son inferiores a los 300.000 euros por cliente.
            </p>
            <p className="text-base leading-relaxed mb-8">
              Las primeras entregas del W1 Spider están programadas para finales de 2027, una vez completadas las últimas unidades del coupé que aún quedan por ensamblar en la factoría de Woking. El mercado de segunda mano ya cotiza primas significativas para los pedidos confirmados, con sobreprecios que alcanzan los 800.000 euros para los primeros números de chasis. Los analistas anticipan que el W1 Spider seguirá la trayectoria del histórico McLaren Senna o del P1 GTR, modelos que han triplicado o cuadruplicado su valor original en apenas una década gracias a su producción extremadamente limitada y su carácter de hypercar definitivo de su época.
            </p>
          </motion.div>

          <ArticleCTAs vehicleName="McLaren W1 Spider" />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaMcLarenW1Spider;
