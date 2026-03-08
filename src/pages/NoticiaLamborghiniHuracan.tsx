import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Fuel, Weight } from "lucide-react";
import { Link } from "react-router-dom";

import heroImg from "@/assets/news/lamborghini-reveal.jpg";
import detailImg1 from "@/assets/news/lamborghini-reveal-detail-1.jpg";
import detailImg2 from "@/assets/news/lamborghini-reveal-detail-2.jpg";
import detailImg3 from "@/assets/news/lamborghini-reveal-detail-3.jpg";

const specs = [
  { icon: Zap, label: "Potencia combinada", value: "900+ CV" },
  { icon: Gauge, label: "0-100 km/h", value: "2,5 s" },
  { icon: Fuel, label: "Motor", value: "V8 Biturbo Híbrido" },
  { icon: Weight, label: "Peso en seco", value: "1.390 kg" },
];

const NoticiaLamborghiniHuracan = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="Lamborghini sucesor del Huracán" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
              Lanzamientos
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Lamborghini presenta el sucesor del Huracán con motor V8 híbrido
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>28 Febrero 2026</span>
              <span className="mx-2">·</span>
              <span>7 min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Sant'Agata Bolognese ha desvelado oficialmente al sucesor del legendario Huracán, marcando el inicio de una nueva era para Lamborghini. El nuevo superdeportivo italiano combina un motor V8 biturbo con tres motores eléctricos para superar los 900 CV, estableciendo un nuevo paradigma en el segmento de los superdeportivos híbridos de alto rendimiento.
            </p>

            <p className="text-base leading-relaxed mb-6">
              Después de una década dominando las carreteras con el icónico motor V10 atmosférico del Huracán, Lamborghini da un giro radical con su sucesor. El nuevo modelo, que la marca ha bautizado internamente como "LB48H", abandona la aspiración natural en favor de un tren motriz híbrido enchufable que promete redefinir lo que significa conducir un Lamborghini en la era moderna.
            </p>

            <p className="text-base leading-relaxed mb-12">
              "Este no es el fin de una era, sino el comienzo de algo extraordinario", declaró Stephan Winkelmann, CEO de Lamborghini, durante la presentación privada en la sede de Sant'Agata Bolognese. "Hemos tomado todo lo que hacía especial al Huracán — la emoción, la brutalidad, la conexión con el conductor — y lo hemos elevado a un nivel que antes era simplemente imposible."
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="Lamborghini sucesor del Huracán vista frontal" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              El sucesor del Huracán presenta un diseño más agresivo y aerodinámico que su predecesor
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">El corazón híbrido: V8 biturbo y triple motor eléctrico</h2>
            <p className="text-base leading-relaxed mb-6">
              El nuevo tren motriz es una obra maestra de ingeniería. En su centro late un motor V8 biturbo de 4.0 litros desarrollado íntegramente en Sant'Agata Bolognese, que por sí solo genera 620 CV. Este propulsor se combina con tres motores eléctricos — dos en el eje delantero y uno integrado en la transmisión de doble embrague de 8 velocidades — que aportan otros 280 CV adicionales.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La potencia combinada supera los 900 CV, con un par motor disponible de forma instantánea que transforma la experiencia de aceleración. La batería de iones de litio de 3,8 kWh permite una autonomía eléctrica de hasta 13 km en modo urbano, pero su verdadera función es proporcionar impulsos de potencia adicional durante la conducción deportiva, llenando los vacíos del turbo y creando una entrega de potencia absolutamente lineal y explosiva.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="Interior del sucesor del Lamborghini Huracán" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              El habitáculo fusiona tecnología de vanguardia con la agresividad característica de Lamborghini
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Diseño: la evolución del ADN Lamborghini</h2>
            <p className="text-base leading-relaxed mb-6">
              El diseño exterior, obra del Centro Stile Lamborghini bajo la dirección de Mitja Borkert, evoluciona el lenguaje visual de la marca con líneas aún más afiladas y una presencia visual imponente. El frontal bajo y ancho integra faros LED en forma de Y, la firma lumínica característica de la nueva generación Lamborghini. Los paneles laterales presentan tomas de aire funcionales que canalizan el flujo hacia los radiadores y los frenos.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La estructura del chasis utiliza un nuevo monocasco en carbono y aluminio que reduce el peso en un 10% respecto al Huracán, mientras que la rigidez torsional aumenta un 20%. El resultado es un peso en seco de apenas 1.390 kg — una cifra extraordinaria para un superdeportivo híbrido — que se traduce en una relación peso-potencia de solo 1,54 kg/CV.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="Lamborghini sucesor del Huracán en carretera de montaña" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              Primeras pruebas dinámicas en las carreteras de los Dolomitas italianos
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Prestaciones de referencia en su categoría</h2>
            <p className="text-base leading-relaxed mb-6">
              Los números hablan por sí solos: de 0 a 100 km/h en solo 2,5 segundos, de 0 a 200 km/h en 6,9 segundos y una velocidad máxima superior a 350 km/h. Pero más allá de las cifras brutas, Lamborghini ha puesto especial énfasis en la dinámica de conducción. El sistema de vectorización de par activo, combinado con la dirección en las cuatro ruedas y la suspensión adaptativa de nueva generación, promete un nivel de agilidad y precisión sin precedentes.
            </p>
            <p className="text-base leading-relaxed mb-8">
              Las primeras entregas del sucesor del Huracán están previstas para el último trimestre de 2026, con un precio base que se situará en torno a los 280.000 euros. Lamborghini ya ha confirmado que las reservas superan las expectativas, con listas de espera que se extienden hasta bien entrado 2027 en mercados clave como Europa, Oriente Medio y Estados Unidos.
            </p>
          </motion.div>

          <div className="pt-8 border-t border-border/30">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a todas las noticias
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaLamborghiniHuracan;
