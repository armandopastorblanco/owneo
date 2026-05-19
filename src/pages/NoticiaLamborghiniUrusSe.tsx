import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Timer, Crown } from "lucide-react";
import ArticleCTAs from "@/components/ArticleCTAs";
import { Link } from "react-router-dom";

const heroImg = "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1600&q=80";
const detailImg1 = "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80";
const detailImg2 = "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80";
const detailImg3 = "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80";

const specs = [
  { icon: Zap, label: "Potencia", value: "800 CV combinados" },
  { icon: Gauge, label: "0-100 km/h", value: "3,4 s" },
  { icon: Crown, label: "Motor", value: "V8 4.0L bi-turbo + eléctrico" },
  { icon: Timer, label: "Aut. eléctrica", value: "60 km WLTP" },
];

const NoticiaLamborghiniUrusSe = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="Lamborghini Urus SE actualizado" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">Lanzamientos</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Lamborghini Urus SE actualizado 2026: el super-SUV híbrido enchufable que redefine el segmento del lujo deportivo
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>2 Mayo 2026</span>
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
              Sant'Agata Bolognese actualiza su super-SUV más vendido con una segunda generación de Urus SE que incorpora mejoras significativas en su sistema híbrido enchufable, ergonomía interior y conectividad digital. Con 800 CV combinados, una autonomía 100% eléctrica de 60 km homologada WLTP y un sistema de tracción integral electrónicamente vectorizado, el nuevo Urus SE responde a las exigencias del mercado contemporáneo sin renunciar al ADN deportivo de Lamborghini.
            </p>
            <p className="text-base leading-relaxed mb-6">
              El Urus SE original, presentado en abril de 2024, ya supuso un punto de inflexión para Lamborghini al convertirse en el primer SUV híbrido enchufable de la marca italiana. La versión actualizada 2026 incorpora más de 180 modificaciones técnicas según fuentes oficiales de Sant'Agata, todas ellas orientadas a mejorar la experiencia de uso diario sin comprometer las prestaciones excepcionales que han hecho del Urus el modelo más vendido de la historia de Lamborghini, con más de 30.000 unidades comercializadas mundialmente desde su lanzamiento original en 2018.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La arquitectura mecánica del Urus SE actualizado mantiene el motor V8 biturbo de 4.0 litros desarrollado conjuntamente con el grupo Volkswagen Audi, capaz de entregar 620 CV en su versión térmica. Esta base se complementa con un motor eléctrico de 192 CV integrado en la transmisión automática ZF de ocho velocidades, alcanzando una potencia combinada de 800 CV y un par máximo de 950 Nm disponible prácticamente desde el ralentí. La batería de iones de litio refrigerada por líquido se ha aumentado a 25,9 kWh de capacidad bruta, frente a los 22 kWh de la versión original, permitiendo una autonomía 100% eléctrica de 60 kilómetros en ciclo WLTP combinado.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="Lamborghini Urus SE vista lateral" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El Urus SE actualizado estrena nuevos faros LED Matrix y firma luminosa Y rediseñada</p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Una integración electrónica completamente renovada</h2>
            <p className="text-base leading-relaxed mb-6">
              El interior del Urus SE 2026 estrena la nueva plataforma de infoentretenimiento desarrollada conjuntamente entre Lamborghini y el grupo Volkswagen, basada en el sistema operativo Android Automotive en su última versión. La pantalla central táctil ha aumentado su diagonal hasta las 13,1 pulgadas, mientras que el cuadro digital del conductor pasa a 12,5 pulgadas con una nueva interfaz gráfica diseñada específicamente para Lamborghini. La integración con dispositivos Apple CarPlay y Android Auto es ahora completamente inalámbrica, una funcionalidad que la generación anterior no ofrecía y que era una de las reclamaciones más frecuentes de los clientes.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La conectividad 5G nativa permite acceder a una serie de servicios remotos como precalentamiento de la cabina, geolocalización del vehículo, diagnóstico predictivo de fallos mecánicos y actualización over-the-air del software del coche. Esta última funcionalidad es particularmente relevante, ya que permite a Lamborghini implementar mejoras de software (mapas de motor, calibraciones de chasis, funciones de asistencia al conductor) sin necesidad de visitar el concesionario. El primer paquete de actualizaciones OTA está programado para llegar en septiembre de 2026 e incluirá la nueva función Drift Mode desarrollada para el sucesor del Huracán.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="Lamborghini Urus SE interior" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">Habitáculo en cuero Nero Cosmus con costuras en hilo Arancio Bruciato</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Prestaciones de superdeportivo con la versatilidad de un SUV de lujo</h2>
            <p className="text-base leading-relaxed mb-6">
              Las cifras dinámicas del Urus SE 2026 lo posicionan como uno de los SUV más rápidos del mercado mundial, sólo superado por puntuales versiones más extremas como el Aston Martin DBX 707 o el Ferrari Purosangue. La aceleración de 0 a 100 km/h se completa en apenas 3,4 segundos, una cifra alcanzable gracias al par instantáneo del motor eléctrico que elimina cualquier turbo lag perceptible. La velocidad máxima se sitúa en 312 km/h, una marca que sigue siendo récord en el segmento de los SUV de producción no limitados a series especiales.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El sistema de tracción integral del Urus SE estrena una nueva calibración electrónica que permite distribuir el par entre los ejes y entre las ruedas traseras de manera completamente independiente. Esta tecnología, denominada Lamborghini Integrated Vehicle Dynamics (LDVI), trabaja en colaboración con el control de estabilidad y los amortiguadores neumáticos adaptativos para garantizar el comportamiento más equilibrado posible en cualquier condición de adherencia. Las ayudas a la conducción se han ampliado significativamente, incorporando ahora conducción asistida nivel 2+ con cambio de carril automático en autopista y un nuevo sistema de aparcamiento autónomo basado en ocho cámaras 3D de alta definición.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="Lamborghini Urus SE en carretera" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El Urus SE recorriendo los Alpes suizos durante la presentación dinámica oficial</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Precio, configuraciones y posicionamiento de mercado</h2>
            <p className="text-base leading-relaxed mb-6">
              El nuevo Lamborghini Urus SE 2026 parte de un precio base de 245.000 euros antes de impuestos en el mercado español, una cifra que se incrementa rápidamente con las múltiples opciones del programa Ad Personam. La mayoría de los clientes acaban gastando entre 50.000 y 100.000 euros adicionales en personalizaciones que incluyen llantas forjadas específicas, acabados de fibra de carbono en exterior e interior, cueros exclusivos y sistemas de audio Bang & Olufsen Advanced de 24 altavoces. Los plazos de entrega actuales son de aproximadamente 10 meses para configuraciones estándar y hasta 18 meses para pedidos altamente personalizados.
            </p>
            <p className="text-base leading-relaxed mb-8">
              Con el Urus SE actualizado, Lamborghini consolida su posición de liderazgo en el segmento de los super-SUV híbridos enchufables, un mercado en crecimiento sostenido especialmente en China, Estados Unidos y Oriente Medio. La marca italiana espera mantener un volumen anual de ventas del Urus cercano a las 5.500 unidades durante todo el ciclo comercial de esta segunda generación, contribuyendo de manera decisiva a financiar el ambicioso programa de electrificación que culminará con el lanzamiento del primer Lamborghini 100% eléctrico, el Lanzador, previsto para finales de 2028 y basado en la plataforma PPE compartida con Porsche y Audi.
            </p>
          </motion.div>

          <ArticleCTAs vehicleName="Lamborghini Urus SE" />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaLamborghiniUrusSe;
