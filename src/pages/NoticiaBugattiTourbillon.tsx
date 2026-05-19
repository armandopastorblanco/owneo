import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Timer, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import ArticleCTAs from "@/components/ArticleCTAs";

const heroImg = "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1600&q=80";
const detailImg1 = "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80";
const detailImg2 = "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80";
const detailImg3 = "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80";

const specs = [
  { icon: Zap, label: "Potencia total", value: "1.800 CV" },
  { icon: Gauge, label: "Velocidad máxima", value: "445 km/h" },
  { icon: Timer, label: "0-100 km/h", value: "2,0 s" },
  { icon: Crown, label: "Motor", value: "V16 Atmosférico" },
];

const NoticiaBugattiTourbillon = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="Bugatti Tourbillon hypercar" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
              Lujo
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Bugatti Tourbillon: el V16 aspirado más potente jamás creado
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>8 Febrero 2026</span>
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
              Bugatti ha sorprendido al mundo entero con el Tourbillon, el sucesor del legendario Chiron que introduce un motor V16 atmosférico de 8,3 litros — el primero de su tipo en un automóvil de producción moderno — complementado por un sistema híbrido que eleva la potencia total a unos asombrosos 1.800 CV. Es la nueva obra maestra absoluta de Molsheim.
            </p>

            <p className="text-base leading-relaxed mb-6">
              El nombre "Tourbillon" proviene de la relojería suiza de alta gama, donde designa uno de los mecanismos más complejos y admirados jamás creados: un dispositivo giratorio que compensa los efectos de la gravedad para mantener la precisión absoluta. Es una metáfora perfecta para un automóvil que combina complejidad mecánica extrema con una ejecución impecable.
            </p>

            <p className="text-base leading-relaxed mb-12">
              Donde el Chiron confiaba en un motor W16 cuádruple turbo heredado del Veyron, el Tourbillon parte de una hoja en blanco. Bugatti, ahora bajo la dirección técnica de Rimac, ha optado por una filosofía radicalmente diferente: un motor atmosférico que prioriza la respuesta instantánea y la pureza mecánica, complementado por motores eléctricos que aportan la fuerza bruta necesaria para cifras de rendimiento estratosféricas.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="Bugatti Tourbillon vista superior con motor V16" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              El impresionante motor V16 de 8,3 litros visible a través del cristal trasero del Tourbillon
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">El V16 atmosférico: una sinfonía mecánica sin precedentes</h2>
            <p className="text-base leading-relaxed mb-6">
              El motor V16 de 8,3 litros del Tourbillon es, sin exageración, la pieza de ingeniería mecánica más extraordinaria jamás instalada en un automóvil de producción. Desarrollado por Cosworth en colaboración con los ingenieros de Bugatti durante más de cinco años, este propulsor genera 1.000 CV a un régimen de 9.000 rpm — todo ello sin recurrir a ningún tipo de sobrealimentación, una proeza técnica que se creía imposible en la era moderna del downsizing. Su peso de apenas 252 kg es un logro monumental para un motor de esta cilindrada, conseguido gracias al uso intensivo de aleaciones aeroespaciales, un cárter de magnesio y bielas de titanio mecanizadas a partir de bloque sólido. Cada uno de los 16 cilindros está perfectamente equilibrado, y el cigüeñal específico permite una suavidad de funcionamiento que recuerda más a una turbina que a un motor de pistones convencional.
            </p>
            <p className="text-base leading-relaxed mb-6">
              El sonido del V16 es simplemente indescriptible. Un rugido profundo y aterciopelado en ralentí que se transforma en un aullido cristalino a alto régimen, pasando por toda la gama de frecuencias como una orquesta sinfónica afinada con precisión milimétrica. Bugatti ha trabajado meticulosamente en la acústica, utilizando un sistema de escape en inconel — una aleación aeroespacial utilizada en los reactores de los aviones de combate — que amplifica las frecuencias más placenteras mientras atenúa las indeseadas. Los ingenieros pasaron más de dos años calibrando el escape en colaboración con expertos en acústica de la industria musical, hasta lograr lo que en Molsheim describen como "la firma sonora más emocional jamás creada por un fabricante de automóviles".
            </p>
            <p className="text-base leading-relaxed mb-12">
              A esta base atmosférica se suman tres motores eléctricos —dos en el eje delantero, uno integrado en la transmisión DCT de ocho velocidades— alimentados por una batería estructural de 25 kWh con arquitectura de 800 voltios. El conjunto eleva la potencia total a 1.800 CV con un par combinado superior a los 1.600 Nm disponibles desde apenas 2.000 rpm. La integración entre la térmica y la eléctrica ha sido el verdadero desafío del proyecto: Bugatti ha desarrollado un software de gestión propio que reparte el par entre los cuatro neumáticos mil veces por segundo, garantizando que el Tourbillon nunca pierda tracción incluso en condiciones límite y permitiendo recorrer hasta 60 km en modo 100% eléctrico silencioso.
            </p>
          </motion.div>


          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="Interior del Bugatti Tourbillon" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              El cuadro de instrumentos mecánico del Tourbillon, inspirado en la alta relojería suiza
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Interior: donde la alta relojería se encuentra con el automóvil</h2>
            <p className="text-base leading-relaxed mb-6">
              El interior del Tourbillon es posiblemente el más elaborado de cualquier automóvil en producción. La pieza central es un cuadro de instrumentos analógico fabricado con técnicas de alta relojería suiza, con más de 600 piezas ensambladas a mano que incluyen rubíes auténticos, zafiros sintéticos y engranajes de titanio mecanizados con tolerancias del orden del micrón. Este instrumento mecánico funciona de manera independiente de la electrónica del vehículo y muestra velocidad, régimen del motor y nivel de combustible con la elegancia y la precisión de un reloj de complicación, sin pantallas que interfieran en la lectura. Para desarrollarlo, Bugatti se ha asociado con uno de los talleres independientes más reputados del Valle de Joux, que normalmente solo trabaja para las grandes manufacturas de Ginebra y La Chaux-de-Fonds.
            </p>
            <p className="text-base leading-relaxed mb-6">
              Los materiales son exquisitos: cristal de zafiro para las superficies transparentes, aluminio mecanizado a partir de bloque sólido para los controles, cuero natural con curtido vegetal de la más alta calidad y madera de fresno con acabado artesanal aplicado con técnicas tradicionales francesas. Cada Tourbillon requiere más de 200 horas solo para el montaje del interior, y los propietarios pueden personalizar prácticamente cada detalle a través del programa Sur Mesure de Bugatti, que va mucho más allá de la simple elección de colores: motivos bordados, marqueterías exclusivas, gravados con la firma del propietario e incluso piedras preciosas engastadas si el cliente lo desea.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La ergonomía del puesto de conducción ha sido completamente repensada. El volante de magnesio, mecanizado en una sola pieza, deja a la vista el cuadro de instrumentos mecánico que parece flotar en el habitáculo. Los controles secundarios, normalmente relegados a la pantalla táctil en otros coches, recuperan su carácter físico: interruptores de aluminio mecanizado, ruedecillas guillochadas y palancas con tacto cristalino. La pantalla de infoentretenimiento existe, pero se esconde detrás del salpicadero y solo aparece cuando el conductor la solicita, preservando así una experiencia analógica que invita a centrarse en la conducción pura.
            </p>
          </motion.div>


          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="Bugatti Tourbillon en carretera costera" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              El Tourbillon en su elemento natural: gran turismo en las carreteras costeras más exclusivas
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Precio y exclusividad del Bugatti Tourbillon</h2>
            <p className="text-base leading-relaxed mb-6">
              El Bugatti Tourbillon tiene un precio base de 3,8 millones de euros, aunque la configuración media con personalizaciones se sitúa en torno a los 4,5 millones e incluso supera con frecuencia los cinco millones cuando el cliente elige opciones únicas del programa Sur Mesure. La producción estará limitada a 250 unidades repartidas en seis años, y Bugatti ya ha recibido depósitos para más de la mitad de la serie incluso antes del estreno público en el Concorso d'Eleganza Villa d'Este. Las entregas comenzarán en 2027 desde el histórico Atelier de Molsheim, en Alsacia, donde cada unidad será ensamblada a mano por un equipo de menos de veinte artesanos especializados, siguiendo el ritual establecido por la marca desde la época de Ettore Bugatti.
            </p>
            <p className="text-base leading-relaxed mb-6">
              La lista de espera, como es habitual en los proyectos más exclusivos de Molsheim, se ha gestionado a través de invitación directa: cada futuro propietario ha sido seleccionado personalmente por la marca atendiendo a criterios como su colección actual, su relación histórica con Bugatti y su compromiso con el patrimonio del automóvil. Muchos de ellos ya poseen un Chiron, una Divo o incluso un Centodieci, y ven en el Tourbillon la pieza definitiva de su garaje. Es una estrategia comercial que recuerda a la del coachbuilding clásico y que Bugatti ha sabido modernizar con la introducción reciente del programa Solitaire, dedicado a creaciones únicas para clientes especiales que aspiran a poseer un Bugatti literalmente irrepetible.
            </p>
            <p className="text-base leading-relaxed mb-8">
              Con el Tourbillon, Bugatti no solo ha creado el sucesor digno del Chiron, sino que ha redefinido lo que significa ser el pináculo absoluto del automóvil. En un mundo que avanza inevitablemente hacia la electrificación total y la conducción autónoma, el V16 atmosférico del Tourbillon es un canto del cisne extraordinario para la combustión interna — y posiblemente el motor más especial que jamás existirá. Lo que Mate Rimac y su equipo han logrado en Molsheim es una declaración de principios: la electrificación no tiene por qué borrar la emoción mecánica, y la innovación más radical puede convivir con el respeto a la tradición artesanal. El Tourbillon es la prueba viviente de esta filosofía, y probablemente sea recordado dentro de cincuenta años como uno de los grandes hitos del automóvil del siglo XXI.
            </p>
          </motion.div>


          <ArticleCTAs vehicleName="Bugatti Tourbillon" />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaBugattiTourbillon;
