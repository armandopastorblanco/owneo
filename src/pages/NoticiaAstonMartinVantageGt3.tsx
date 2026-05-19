import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Timer, Crown } from "lucide-react";
import ArticleCTAs from "@/components/ArticleCTAs";
import { Link } from "react-router-dom";

const heroImg = "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80";
const detailImg1 = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80";
const detailImg2 = "https://images.unsplash.com/photo-1517994112540-009c47ea476b?auto=format&fit=crop&w=1200&q=80";
const detailImg3 = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80";

const specs = [
  { icon: Zap, label: "Potencia", value: "550 CV (reglamento)" },
  { icon: Gauge, label: "Peso", value: "1.245 kg" },
  { icon: Crown, label: "Motor", value: "V8 4.0L bi-turbo" },
  { icon: Timer, label: "Cambio", value: "Hewland 6 vel. secuencial" },
];

const NoticiaAstonMartinVantageGt3 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="Aston Martin Vantage GT3 2026" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">Competición</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Aston Martin Vantage GT3 2026: el nuevo prototipo de Gaydon que conquistará el campeonato GT World Challenge
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>25 Abril 2026</span>
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
              Aston Martin Racing acaba de presentar el nuevo Vantage GT3 2026, un prototipo de competición desarrollado desde cero por el equipo de Gaydon para participar en los principales campeonatos GT3 del mundo: el GT World Challenge, las 24 Horas de Spa, las 24 Horas de Nürburgring y diversos campeonatos nacionales. Este nuevo modelo sustituye al Vantage AMR GT3 que ha dominado parcialmente el segmento desde 2019, incorporando todas las lecciones aprendidas en más de seiscientas carreras disputadas.
            </p>
            <p className="text-base leading-relaxed mb-6">
              El Vantage GT3 2026 parte de la plataforma del Vantage de calle de nueva generación, presentado a finales de 2024, pero prácticamente todos los componentes han sido reemplazados por elementos específicos de competición. El motor V8 biturbo de 4.0 litros suministrado por AMG se mantiene como base, aunque profundamente modificado por el departamento de motorsport de Aston Martin para cumplir con la normativa de equilibrio de prestaciones (BoP) del reglamento GT3, que limita la potencia oficial a 550 CV mediante restrictores específicos definidos para cada circuito por la SRO.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El chasis tubular cromolibdeno del nuevo Vantage GT3 se ha aligerado en 28 kilogramos respecto a la generación anterior gracias a una nueva disposición geométrica desarrollada en colaboración con Prodrive, partner técnico histórico de Aston Martin en competición. El peso total homologado se sitúa en 1.245 kilogramos, una cifra que cumple ampliamente con los mínimos reglamentarios y deja margen para el lastre de equilibrio durante las carreras. La distribución de pesos se ha optimizado para llegar al ideal 50/50 entre ejes, una característica fundamental para extraer el máximo rendimiento de los neumáticos Pirelli P Zero DHE que utilizan todos los GT3 reglamentarios.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="Aston Martin Vantage GT3 2026 vista lateral" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El Vantage GT3 2026 con la decoración oficial del equipo Aston Martin Racing</p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Una aerodinámica revolucionaria para el segmento GT3</h2>
            <p className="text-base leading-relaxed mb-6">
              El paquete aerodinámico del Vantage GT3 2026 ha sido desarrollado en el túnel de viento de Mercedes-AMG High Performance Powertrains en Brixworth, una colaboración técnica que refleja la profunda relación entre los dos fabricantes en el ámbito del motorsport. El diseño del splitter delantero, el difusor trasero y el alerón gigante se ha optimizado para generar 950 kilogramos de carga aerodinámica máxima a 240 km/h, una cifra prácticamente al límite reglamentario permitido por la SRO y que mejora en un 12% las prestaciones aerodinámicas del modelo anterior.
            </p>
            <p className="text-base leading-relaxed mb-12">
              Los conductos de refrigeración del motor y de los frenos también han sido completamente rediseñados para garantizar fiabilidad en las pruebas de resistencia más exigentes, como las 24 Horas de Spa o las 24 Horas de Daytona. El nuevo Vantage GT3 incorpora además un sistema de gestión térmica electrónica desarrollado por Cosworth, capaz de ajustar automáticamente la apertura de las tomas de aire frontales en función de la temperatura ambiente, la velocidad de circulación y la duración del relevo del piloto. Esta tecnología permite optimizar la aerodinámica activa sin comprometer la fiabilidad mecánica en condiciones extremas.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="Aston Martin Vantage GT3 2026 cockpit" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">Cockpit de competición con volante removible Cosworth y arnés de seis puntos OMP</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Una transmisión Hewland y suspensión Öhlins de altísimo nivel</h2>
            <p className="text-base leading-relaxed mb-6">
              La transmisión secuencial Hewland de seis velocidades es probablemente el componente más refinado del nuevo Vantage GT3. Desarrollada específicamente para soportar la potencia y el par del V8 biturbo, esta caja incorpora un nuevo sistema de cambio electrónico con paddles en el volante que reduce los tiempos de cambio a apenas 25 milisegundos, una cifra digna de un coche de Fórmula 1. Los pilotos pueden seleccionar tres mapas de cambio diferentes según el tipo de circuito y la estrategia de carrera, una funcionalidad especialmente apreciada en las pruebas de resistencia donde el desgaste de la transmisión es un factor crítico.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La suspensión Öhlins TTX-44 de altísima gama, montada en configuración push-rod en ambos ejes, ofrece cuatro vías de ajuste independientes para alta y baja velocidad tanto en compresión como en extensión. Esta sofisticación permite a los equipos privados configurar el coche prácticamente para cualquier tipo de circuito sin necesidad de modificaciones mecánicas, una característica que reduce significativamente los costes operativos durante una temporada de competición. Los muelles de titanio y las barras estabilizadoras de tres posiciones completan un conjunto que se sitúa entre los más avanzados del segmento GT3 actual.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="Aston Martin Vantage GT3 2026 en pista" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">Las primeras pruebas del Vantage GT3 2026 se completaron en el circuito de Silverstone</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Precio, equipos clientes y calendario deportivo</h2>
            <p className="text-base leading-relaxed mb-6">
              El nuevo Aston Martin Vantage GT3 2026 se ofrece a equipos clientes a un precio base de 525.000 euros antes de impuestos, una cifra alineada con la competencia directa (Ferrari 296 GT3, McLaren 720S GT3 Evo, Porsche 911 GT3 R) y que incluye un paquete completo de soporte técnico fábrica durante toda la temporada. Aston Martin Racing tiene confirmados ya quince equipos privados como compradores oficiales del nuevo modelo, incluyendo nombres tan prestigiosos como Heart of Racing, Comtoyou Racing, Walkenhorst Motorsport o D'Station Racing, garantizando una presencia significativa en todos los grandes campeonatos GT3 del mundo.
            </p>
            <p className="text-base leading-relaxed mb-8">
              El calendario deportivo del Vantage GT3 2026 incluye participaciones confirmadas en el GT World Challenge Europe, el IMSA SportsCar Championship en categoría GTD, el Japanese Super GT en clase GT300 y las grandes resistencias internacionales como las 24 Horas de Spa, Nürburgring y Daytona. Aston Martin Racing también prepara una participación oficial en el Bathurst 12 Hours australiano con el equipo Comtoyou Racing, una de las pruebas más exigentes del calendario internacional. Las primeras carreras oficiales del nuevo modelo están programadas para el inicio de la temporada 2026 europea en marzo, con los entrenamientos pre-temporada confirmados en los circuitos de Paul Ricard y Barcelona-Catalunya.
            </p>
          </motion.div>

          <ArticleCTAs vehicleName="Aston Martin Vantage GT3" />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaAstonMartinVantageGt3;
