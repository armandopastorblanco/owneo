import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Timer, Crown } from "lucide-react";
import ArticleCTAs from "@/components/ArticleCTAs";
import { Link } from "react-router-dom";

const heroImg = "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=80";
const detailImg1 = "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=1200&q=80";
const detailImg2 = "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?auto=format&fit=crop&w=1200&q=80";
const detailImg3 = "https://images.unsplash.com/photo-1604649555-ff77f00ac8ee?auto=format&fit=crop&w=1200&q=80";

const specs = [
  { icon: Zap, label: "Potencia", value: "600 CV" },
  { icon: Crown, label: "Motor", value: "V12 6.75L bi-turbo" },
  { icon: Timer, label: "Producción", value: "4 uds únicas mundiales" },
  { icon: Gauge, label: "Coachbuilding", value: "Programa Coachbuild" },
];

const NoticiaRollsRoyceDroptail = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="Rolls-Royce Droptail edición final" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">Lujo</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Rolls-Royce Droptail: la edición final del programa Coachbuild más exclusivo de Goodwood
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>16 Mayo 2026</span>
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
              Rolls-Royce ha desvelado la cuarta y última unidad del exclusivo programa Droptail, completando así una de las series Coachbuild más codiciadas de la historia reciente de la marca de Goodwood. Con apenas cuatro unidades únicas mundiales construidas íntegramente bajo pedido, cada una con un diseño irrepetible desarrollado específicamente para su cliente, el Droptail representa la cima absoluta del lujo automovilístico contemporáneo y reafirma la posición indiscutible de Rolls-Royce en el segmento más alto del mercado.
            </p>
            <p className="text-base leading-relaxed mb-6">
              El programa Coachbuild de Rolls-Royce, refundado en 2017 con la presentación del Sweptail, representa la cima absoluta de la oferta de la marca británica. Frente a la producción estándar de modelos como el Phantom, el Ghost o el Spectre, los coches Coachbuild son creaciones únicas desarrolladas a lo largo de aproximadamente cuatro años de trabajo conjunto entre el cliente, el departamento de diseño y los maestros artesanos de la factoría de Goodwood. El precio de cada Droptail rara vez baja de los 25 millones de euros antes de impuestos, una cifra que confirma su posición como uno de los coches nuevos más caros jamás comercializados en la historia del automóvil.
            </p>
            <p className="text-base leading-relaxed mb-12">
              Las cuatro unidades del Droptail presentadas hasta la fecha son La Rose Noire (entregada en 2023, propiedad de un coleccionista de Beverly Hills), Amethyst (entregada en 2023, propiedad de un magnate inmobiliario asiático), Arcadia (entregada en 2024, propiedad de un cliente europeo) y la cuarta y última unidad denominada Aurora Crescendo (entregada en 2026, propiedad de un coleccionista de Oriente Medio que ha optado por mantener el anonimato absoluto). Cada uno de estos coches comparte la misma plataforma técnica derivada del Rolls-Royce Spectre y del Phantom Drophead Coupé, pero presenta una carrocería completamente única y un interior diseñado específicamente para reflejar los gustos personales de su propietario.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="Rolls-Royce Droptail Aurora Crescendo" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">La cuarta unidad Aurora Crescendo muestra una paleta cromática única en tonos lavanda iridiscente</p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">El arte del coachbuilding del siglo XXI</h2>
            <p className="text-base leading-relaxed mb-6">
              La construcción de cada Droptail involucra a más de 80 maestros artesanos de Goodwood durante un período de entre 36 y 48 meses. Cada panel exterior es trabajado a mano a partir de planchas de aluminio puro, una técnica que requiere conocimientos transmitidos a lo largo de varias generaciones de carroceros británicos. El maletero trasero está revestido en madera marquetada con incrustaciones únicas, cada una de ellas requiriendo aproximadamente 1.600 horas de trabajo por parte de los ebanistas especializados de la marca. Los símbolos elegidos para la marquetería varían entre las cuatro unidades: rosas estilizadas en La Rose Noire, formaciones de amatista en Amethyst, motivos arcadianos en Arcadia y olas cristalinas en Aurora Crescendo.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El interior del Droptail incorpora también elementos únicos como un reloj de pared central diseñado específicamente para cada unidad por relojeros suizos de altísima gama. La Rose Noire estrena un reloj Audemars Piguet con esfera en cuero negro, Amethyst lleva un Vacheron Constantin con incrustaciones de amatista natural, Arcadia muestra un Bovet 1822 con grabado helénico personalizado, y Aurora Crescendo culmina la serie con un Patek Philippe especialmente desarrollado que muestra las fases de la luna sobre un fondo lavanda. Estos relojes son piezas únicas que no pueden adquirirse por separado y que aumentan significativamente el valor patrimonial de cada Droptail.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="Rolls-Royce Droptail interior" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El interior con marquetería de madera artesanal requiere más de 1.600 horas de trabajo</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Una base técnica probada en la cima de la gama Rolls-Royce</h2>
            <p className="text-base leading-relaxed mb-6">
              Bajo la carrocería única del Droptail se esconde una mecánica derivada de la plataforma Architecture of Luxury de Rolls-Royce, la misma utilizada por el Phantom y por el Cullinan. El motor V12 biturbo de 6.75 litros entrega 600 CV de potencia y 900 Nm de par, transmitidos a las ruedas traseras a través del característico cambio automático ZF de ocho velocidades. La suspensión neumática Magic Carpet Ride se complementa con un sistema de dirección a las cuatro ruedas adaptativo que mejora significativamente la manejabilidad del Droptail pese a sus dimensiones generosas y su peso superior a las 2,5 toneladas en orden de marcha.
            </p>
            <p className="text-base leading-relaxed mb-12">
              Las prestaciones absolutas no son la prioridad del Droptail, aunque las cifras técnicas siguen siendo impresionantes para un coche de estas características. La aceleración de 0 a 100 km/h se completa en 6,8 segundos, mientras que la velocidad máxima se limita electrónicamente a 250 km/h para preservar la mecánica y el confort de los ocupantes. Lo que verdaderamente distingue al Droptail es la suavidad sobrenatural de su comportamiento dinámico, conseguida gracias a la combinación entre la suspensión neumática autorreguladora y la nueva calibración electrónica desarrollada específicamente para cada unidad en función del peso adicional generado por las personalizaciones únicas.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="Rolls-Royce Droptail vista trasera" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">El tail-end característico que da nombre a la serie integra los faros LED en formaciones cristalinas</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">El futuro del programa Coachbuild tras el Droptail</h2>
            <p className="text-base leading-relaxed mb-6">
              Tras la entrega de la cuarta y última unidad Aurora Crescendo, Rolls-Royce ha confirmado oficialmente el cierre de la serie Droptail. La marca de Goodwood ya prepara el siguiente proyecto Coachbuild, denominado provisionalmente Project Constellation, que se basará por primera vez en la plataforma 100% eléctrica del Spectre. Este nuevo proyecto se desarrollará a lo largo de los próximos cinco años con la previsión de entregar la primera unidad en 2030, manteniendo la filosofía de unicidad absoluta que caracteriza al programa Coachbuild contemporáneo de Rolls-Royce.
            </p>
            <p className="text-base leading-relaxed mb-8">
              El programa Coachbuild de Rolls-Royce ha conseguido posicionar a la marca británica en una categoría comercial absolutamente única dentro del lujo automovilístico mundial. Mientras competidores históricos como Bentley con el programa Mulliner o Mercedes-Maybach con sus ediciones especiales se mantienen en el segmento de los 600.000 a 800.000 euros, los Coachbuild de Rolls-Royce alcanzan precios que superan rutinariamente los 20 millones de euros por unidad. Esta estrategia comercial, aparentemente extrema, ha demostrado ser sostenible gracias a la enorme demanda existente en el segmento Ultra High Net Worth Individuals (UHNWI), un grupo de aproximadamente 250.000 personas en todo el mundo con patrimonios superiores a los 30 millones de dólares y con apetito creciente por experiencias y productos únicos verdaderamente irrepetibles.
            </p>
          </motion.div>

          <ArticleCTAs vehicleName="Rolls-Royce Droptail" />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaRollsRoyceDroptail;
