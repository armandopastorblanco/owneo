import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Timer, Crown } from "lucide-react";
import ArticleCTAs from "@/components/ArticleCTAs";
import { Link } from "react-router-dom";

const heroImg = "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=80";
const detailImg1 = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80";
const detailImg2 = "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80";
const detailImg3 = "https://images.unsplash.com/photo-1611821064430-0d40291922d2?auto=format&fit=crop&w=1200&q=80";

const specs = [
  { icon: Zap, label: "Potencia", value: "493 CV" },
  { icon: Gauge, label: "0-100 km/h", value: "3,3 s" },
  { icon: Crown, label: "Batería", value: "80 kWh (800V)" },
  { icon: Timer, label: "Autonomía", value: "480 km WLTP" },
];

const NoticiaPorsche718Ev = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="Porsche 718 Cayman GT4 RS eléctrico" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">Eléctricos</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Porsche 718 Cayman GT4 RS eléctrico: el primer deportivo de pista 100% eléctrico de Weissach
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>23 Mayo 2026</span>
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
              Porsche ha confirmado oficialmente el lanzamiento del nuevo 718 Cayman GT4 RS eléctrico, el primer deportivo de pista 100% eléctrico de la historia de la marca de Zuffenhausen. Con 493 CV de potencia, una batería de 80 kWh con tecnología 800V derivada del Taycan y un peso total de apenas 1.620 kilogramos pese a la electrificación, este modelo marca el inicio de una nueva era para los deportivos de Weissach, demostrando que es posible combinar emoción mecánica y eficiencia eléctrica al máximo nivel.
            </p>
            <p className="text-base leading-relaxed mb-6">
              El 718 Cayman GT4 RS eléctrico representa el ambicioso intento de Porsche de mantener vivo el segmento de los deportivos de pista compactos en la era de la electrificación generalizada. La normativa Euro 7 y las restricciones cada vez más estrictas sobre emisiones de CO2 hacen prácticamente inviable la continuidad del 718 con su histórico motor flat-six atmosférico a partir de 2027, lo que ha obligado a Porsche a desarrollar desde cero una plataforma eléctrica específicamente diseñada para deportivos compactos, sin compartir componentes estructurales con el Taycan o el Macan Electric.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La nueva plataforma del 718 eléctrico se denomina internamente PPE-Sport, una evolución específica de la plataforma Premium Platform Electric compartida con Audi en modelos como el Q6 e-tron o el A6 e-tron. Las modificaciones principales incluyen un nuevo diseño estructural que permite ubicar la batería de 80 kWh en posición central (entre los ejes y bajo el suelo), una distribución de peso optimizada para conseguir el ideal 48/52 característico de los deportivos de mid-engine, y una rigidez torsional excepcionalmente alta gracias al uso intensivo de aluminio y acero de alta resistencia en la estructura monocasco.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="Porsche 718 Cayman eléctrico vista lateral" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El nuevo 718 eléctrico mantiene la silueta clásica con sutiles guiños aerodinámicos al programa Le Mans</p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Una batería revolucionaria con tecnología 800V derivada de Le Mans</h2>
            <p className="text-base leading-relaxed mb-6">
              La batería del 718 Cayman GT4 RS eléctrico es probablemente el componente más innovador del coche. Con una capacidad útil de 80 kWh repartida en módulos de cilindros 4680 desarrollados específicamente para Porsche, esta batería utiliza la arquitectura de 800 voltios derivada del Taycan y refinada en el programa Porsche 963 LMDh del Mundial de Resistencia. La principal ventaja del sistema de 800V reside en la posibilidad de cargar hasta el 80% de la capacidad en apenas 18 minutos utilizando cargadores ultrarrápidos de 350 kW, una cifra particularmente útil durante eventos de circuito en los que el tiempo entre relevos es limitado.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La gestión térmica de la batería incorpora un nuevo sistema de refrigeración bifásica desarrollado por Porsche Engineering, que utiliza un refrigerante dieléctrico circulando directamente entre los módulos de celdas. Esta tecnología permite mantener la batería en su rango óptimo de temperatura (entre 25 y 45 grados Celsius) incluso durante sesiones intensivas en circuitos de alta exigencia como Nürburgring o Spa-Francorchamps, evitando la pérdida de prestaciones característica de los coches eléctricos en uso prolongado en pista. La autonomía homologada WLTP alcanza los 480 kilómetros en uso mixto, una cifra que se reduce significativamente en uso deportivo intensivo, donde Porsche estima entre 30 y 40 minutos de uso continuo a pleno rendimiento.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="Porsche 718 Cayman eléctrico interior" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">Habitáculo deportivo con asientos baquet ligeros y el característico cuentakilómetros central digital</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Mantener la emoción de la conducción mecánica en la era eléctrica</h2>
            <p className="text-base leading-relaxed mb-6">
              El gran reto que ha tenido que afrontar Porsche con el 718 eléctrico ha sido mantener la inmediatez y la emoción de la conducción mecánica característica del modelo original. Los ingenieros de Weissach han desarrollado un nuevo sistema denominado Porsche Electric Sport Sound, que reproduce a través de altavoces tanto internos como externos una banda sonora sintética inspirada en los motores de Fórmula E pero con identidad acústica propia. Esta solución, aunque criticada por algunos puristas, ha demostrado ser sorprendentemente convincente durante las primeras pruebas dinámicas, aportando información acústica al conductor sobre el régimen de giro del motor eléctrico y la demanda de potencia en cada instante.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La transmisión del 718 eléctrico incorpora una solución técnica única en el segmento: un cambio simulado de seis velocidades que reproduce las características de un cambio manual mecánico. Esta tecnología, denominada Porsche eShift, utiliza una combinación de control electrónico del motor y de los componentes de respuesta del acelerador para simular las características dinámicas de un cambio convencional, permitiendo al conductor sentir las subidas y bajadas de marcha mediante las paletas situadas detrás del volante. Aunque eShift puede desactivarse en favor de una entrega de par tradicional eléctrica continua, las primeras pruebas indican que la mayoría de los pilotos lo prefieren activado por la sensación de control y conexión mecánica que aporta.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="Porsche 718 Cayman eléctrico en circuito" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El 718 eléctrico durante las pruebas oficiales en el circuito de Weissach, sede técnica de Porsche</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Precio, gama y proyección comercial</h2>
            <p className="text-base leading-relaxed mb-6">
              El nuevo Porsche 718 Cayman GT4 RS eléctrico se ofrece con un precio base de 145.000 euros antes de impuestos en el mercado español, una cifra que se sitúa aproximadamente 30.000 euros por encima del último 718 GT4 RS atmosférico de 2024. Esta diferencia se justifica por el coste superior de la batería de alta capacidad, la complejidad técnica de la arquitectura 800V y el conjunto de componentes específicos desarrollados desde cero para este modelo. La gama eléctrica del 718 incluirá inicialmente las versiones Cayman y Boxster en configuraciones GTS 4.0 (350 CV), GT4 (425 CV) y GT4 RS (493 CV), todas ellas con la misma plataforma técnica pero diferentes ajustes de motor y suspensión.
            </p>
            <p className="text-base leading-relaxed mb-8">
              Las primeras entregas del 718 eléctrico están programadas para el primer trimestre de 2027 desde la nueva línea de producción de la fábrica de Zuffenhausen, recientemente adaptada para vehículos 100% eléctricos. La proyección comercial de Porsche es ambiciosa: la marca espera vender aproximadamente 15.000 unidades anuales del nuevo 718 eléctrico a nivel mundial, una cifra similar a la del 718 atmosférico en sus mejores años. El éxito comercial de este modelo es estratégicamente crítico para Porsche, ya que validará el plan industrial de electrificación completa de la gama deportiva que culminará con el lanzamiento del próximo 911 híbrido enchufable previsto para 2027 y del primer 911 100% eléctrico programado para finales de la década.
            </p>
          </motion.div>

          <ArticleCTAs vehicleName="Porsche 718 Cayman GT4 RS Electric" />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaPorsche718Ev;
