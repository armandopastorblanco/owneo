import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Timer, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

import heroImg from "@/assets/news/mercedes-amg-one.jpg";
import detailImg1 from "@/assets/news/mercedes-amg-one-detail-1.jpg";
import detailImg2 from "@/assets/news/mercedes-amg-one-detail-2.jpg";
import detailImg3 from "@/assets/news/mercedes-amg-one-detail-3.jpg";

const specs = [
  { icon: Zap, label: "Potencia total", value: "1.078 CV" },
  { icon: Gauge, label: "Velocidad máxima", value: "352 km/h" },
  { icon: Timer, label: "0-200 km/h", value: "7,0 s" },
  { icon: Cpu, label: "Motor", value: "1.6L V6 Turbo F1" },
];

const NoticiaMercedesAMGOne = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="Mercedes-AMG ONE actualización" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
              Tecnología
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Mercedes-AMG ONE: actualización que lleva la tecnología F1 al siguiente nivel
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>1 Febrero 2026</span>
              <span className="mx-2">·</span>
              <span>7 min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      <article className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Mercedes-AMG ha anunciado una actualización integral para su hypercar ONE que eleva la potencia total a 1.078 CV, mejora significativamente la respuesta del motor de Fórmula 1 y añade nuevos modos de conducción. Lo más notable: todos los propietarios existentes recibirán la actualización de forma completamente gratuita, reafirmando el compromiso de Mercedes con la exclusividad y el servicio post-venta de primer nivel.
            </p>

            <p className="text-base leading-relaxed mb-6">
              Cuando Mercedes-AMG presentó el Project ONE en 2017, prometió algo que parecía imposible: instalar un motor de Fórmula 1 real en un coche de calle homologado. Años de desarrollo, innumerables desafíos técnicos y una pandemia global después, el AMG ONE finalmente llegó a las manos de sus 275 propietarios. Ahora, con esta actualización, Mercedes demuestra que el viaje no ha terminado.
            </p>

            <p className="text-base leading-relaxed mb-12">
              "El AMG ONE es un proyecto vivo", explicó Philipp Schiemer, CEO de Mercedes-AMG. "Gracias a la arquitectura de software del vehículo, podemos seguir evolucionando sus capacidades mucho después de su entrega. Esta actualización representa más de 18 meses de desarrollo adicional, con aprendizajes directos del equipo de F1 de Mercedes incorporados en cada línea de código."
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg1} alt="Mercedes-AMG ONE vista frontal" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              El Mercedes-AMG ONE mantiene su silueta inconfundible con la actualización 2026
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">El motor de F1 más refinado para carretera</h2>
            <p className="text-base leading-relaxed mb-6">
              El corazón del AMG ONE sigue siendo su unidad de potencia 1.6L V6 turbo híbrida, directamente derivada del motor que impulsó a Lewis Hamilton hacia sus títulos mundiales de Fórmula 1. Con la actualización, los ingenieros de Brixworth — la misma factoría que produce las unidades de potencia de F1 — han recalibrado completamente la gestión electrónica del motor, resultando en un aumento de 15 CV que eleva la potencia total a 1.078 CV.
            </p>
            <p className="text-base leading-relaxed mb-12">
              Pero la mejora más significativa no está en los números brutos, sino en la usabilidad. La respuesta del acelerador ha sido completamente reworkeada, eliminando la latencia que algunos propietarios reportaron en la primera iteración del software. El turbocompresor eléctrico MGU-H ahora mantiene la presión de sobrealimentación durante las transiciones de gas, creando una entrega de potencia más fluida y predecible tanto en carretera como en circuito.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg2} alt="Interior del Mercedes-AMG ONE" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              El cockpit del AMG ONE recibe nuevas funcionalidades de software con la actualización
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Nuevos modos de conducción y telemetría avanzada</h2>
            <p className="text-base leading-relaxed mb-6">
              La actualización introduce dos nuevos modos de conducción: "Track+" y "Qualifying". El modo Track+ optimiza todos los parámetros del vehículo para sesiones de track day prolongadas, gestionando activamente las temperaturas del motor, frenos y batería para mantener el rendimiento constante vuelta tras vuelta. El modo Qualifying, por su parte, libera el potencial máximo del tren motriz durante un período limitado, priorizando la potencia absoluta sobre la gestión térmica.
            </p>
            <p className="text-base leading-relaxed mb-12">
              Mercedes también ha añadido una nueva aplicación de telemetría integrada que registra datos de conducción con la misma resolución que los sistemas de F1 — hasta 1.000 puntos de datos por segundo. Los propietarios pueden analizar sus vueltas en circuito con herramientas profesionales, comparar líneas de conducción y recibir sugerencias de mejora generadas por inteligencia artificial, entrenada con datos de los pilotos de F1 del equipo Mercedes.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <img src={detailImg3} alt="Mercedes-AMG ONE en circuito" className="w-full rounded-2xl" />
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              El sistema aerodinámico activo del AMG ONE desplegado durante una sesión en circuito
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Actualización gratuita para todos los propietarios</h2>
            <p className="text-base leading-relaxed mb-6">
              En un gesto extraordinario de servicio al cliente, Mercedes-AMG ofrecerá esta actualización de forma completamente gratuita a los 275 propietarios del AMG ONE. El proceso se realizará en los centros de servicio AMG autorizados y requerirá aproximadamente dos días, durante los cuales se actualizará el software de todas las unidades de control del vehículo y se instalará el nuevo firmware del motor.
            </p>
            <p className="text-base leading-relaxed mb-8">
              "Nuestros clientes del AMG ONE no son simplemente compradores; son socios en este viaje tecnológico", afirmó Schiemer. "Cada mejora que logramos en Fórmula 1 tiene el potencial de beneficiar directamente a sus coches. Esta actualización es la primera de lo que esperamos sea una serie continua de mejoras que mantendrán al AMG ONE en la vanguardia de la tecnología automotriz durante años."
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

export default NoticiaMercedesAMGOne;
