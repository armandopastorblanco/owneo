import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Gauge, Timer, Wind, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import ArticleCTAs from "@/components/ArticleCTAs";

import heroImg from "@/assets/news/porsche-gt3.jpg";
import detailImg1 from "@/assets/news/porsche-gt3-detail-1.jpg";
import detailImg2 from "@/assets/news/porsche-gt3-detail-2.jpg";
import detailImg3 from "@/assets/news/porsche-gt3-detail-3.jpg";

const specs = [
  { icon: Zap, label: "Potencia", value: "535 CV" },
  { icon: Gauge, label: "Nürburgring", value: "6:44.3" },
  { icon: Timer, label: "0-100 km/h", value: "3,0 s" },
  { icon: Wind, label: "Carga aerodinámica", value: "860 kg" },
];

const NoticiaPorscheGT3RS = () => {
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
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
              Competición
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Porsche 911 GT3 RS 2026: récord en Nürburgring con neumáticos de serie
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>20 Febrero 2026</span>
              <span className="mx-2">·</span>
              <span>6 min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      <article className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              El nuevo Porsche 911 GT3 RS ha pulverizado el récord del Nordschleife de Nürburgring con un tiempo de 6 minutos y 44,3 segundos utilizando neumáticos de serie, convirtiéndose en el Porsche de producción más rápido jamás cronometrado en el legendario circuito alemán. Una proeza que demuestra la supremacía de la ingeniería de Weissach.
            </p>

            <p className="text-base leading-relaxed mb-6">
              El Nürburgring Nordschleife, con sus 20,8 km de trazado y más de 170 curvas, es considerado el banco de pruebas definitivo para cualquier superdeportivo. Y es precisamente aquí donde el nuevo GT3 RS ha demostrado su superioridad absoluta, rebajando en casi 5 segundos el tiempo del modelo anterior y estableciendo un nuevo listón que será extremadamente difícil de igualar para la competencia.
            </p>

            <p className="text-base leading-relaxed mb-12">
              "El GT3 RS siempre ha sido nuestro modelo más orientado al circuito dentro de la gama 911", explicó Andreas Preuninger, director del programa GT de Porsche. "Con esta generación hemos llevado la aerodinámica activa y la dinámica del chasis a un nivel que antes estaba reservado exclusivamente a los coches de competición."
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="Porsche 911 GT3 RS en Nürburgring" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              El GT3 RS atacando el Karussell del Nordschleife durante la vuelta récord
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Aerodinámica activa de competición</h2>
            <p className="text-base leading-relaxed mb-6">
              La clave del rendimiento del nuevo GT3 RS reside en su revolucionario paquete aerodinámico. El alerón trasero de doble perfil, con elementos DRS (Drag Reduction System) inspirados en la Fórmula 1, genera hasta 860 kg de carga aerodinámica a 285 km/h — un 40% más que su predecesor. Los flaps activos delanteros se ajustan continuamente para mantener el equilibrio aerodinámico óptimo en cada curva.
            </p>
            <p className="text-base leading-relaxed mb-12">
              El difusor trasero, completamente rediseñado, trabaja en conjunto con el suelo plano para crear un efecto suelo que literalmente pega el coche al asfalto. El resultado es una estabilidad a alta velocidad que inspira una confianza absoluta, permitiendo al piloto explorar los límites del coche con una precisión milimétrica incluso en las secciones más rápidas del Nordschleife.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="Interior del Porsche 911 GT3 RS" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              Habitáculo orientado 100% a la conducción en circuito, con jaula antivuelco y asientos de competición
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">El flat-six atmosférico más potente de la historia</h2>
            <p className="text-base leading-relaxed mb-6">
              Bajo la cubierta trasera ruge un motor bóxer de 6 cilindros y 4.2 litros de cilindrada — una evolución del aclamado propulsor de competición — que ahora entrega 535 CV a un régimen máximo de 9.400 rpm. El sonido es pura sinfonía mecánica: un aullido visceral que sube de tono hasta un crescendo que eriza el vello. No hay turbocompresores ni asistencia eléctrica; solo pura ingeniería atmosférica llevada a su máxima expresión.
            </p>
            <p className="text-base leading-relaxed mb-12">
              La transmisión PDK de 7 velocidades ha sido recalibrada para ofrecer cambios un 15% más rápidos que el modelo anterior, con una lógica de gestión optimizada para la conducción en circuito que mantiene el motor siempre en la banda de potencia óptima. El sistema de escape titanio, 8 kg más ligero que el de acero, contribuye a la reducción de peso general y libera un timbre aún más agudo.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="Porsche 911 GT3 RS vista trasera" loading="lazy" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              El imponente alerón trasero del GT3 RS genera hasta 860 kg de carga aerodinámica
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Disponibilidad y precio del Porsche 911 GT3 RS 2026</h2>
            <p className="text-base leading-relaxed mb-6">
              El nuevo Porsche 911 GT3 RS ya está disponible para pedido en los concesionarios Porsche de todo el mundo, con un precio base en España de 249.469 euros. Las primeras entregas están previstas para junio de 2026, aunque la demanda ya supera ampliamente la producción prevista para el primer año.
            </p>
            <p className="text-base leading-relaxed mb-8">
              Opcionalmente, Porsche ofrece el paquete Weissach que reduce el peso en 15 kg adicionales mediante el uso extensivo de fibra de carbono y titanio, así como un kit de circuito que incluye ruedas de magnesio forjado, frenos PCCB mejorados y un sistema de telemetría avanzado. Para los puristas del rendimiento, no hay nada mejor en el catálogo actual de Porsche.
            </p>
          </motion.div>

          <ArticleCTAs vehicleName="Porsche 911 GT3 RS" />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaPorscheGT3RS;
