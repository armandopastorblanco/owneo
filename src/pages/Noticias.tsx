import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import ferrariEv from "@/assets/news/ferrari-ev.jpg";
import lamborghiniReveal from "@/assets/news/lamborghini-reveal.jpg";
import porscheGt3 from "@/assets/news/porsche-gt3.jpg";
import mclarenW1 from "@/assets/news/mclaren-w1.jpg";
import bugattiTourbillon from "@/assets/news/bugatti-tourbillon.jpg";
import mercedesAmgOne from "@/assets/news/mercedes-amg-one.jpg";

const newsItems = [
  {
    id: 1,
    image: ferrariEv,
    date: "5 Marzo 2026",
    category: "Eléctricos",
    title: "Ferrari Luce EV: Nuevos detalles filtrados sobre el primer 100% eléctrico de Ferrari",
    excerpt: "El primer superdeportivo totalmente eléctrico de Maranello promete más de 1.200 CV y una autonomía superior a 500 km. Las últimas filtraciones revelan un diseño revolucionario que mantiene la esencia Ferrari.",
    link: "/noticias/ferrari-luce-ev"
  },
  {
    id: 2,
    image: lamborghiniReveal,
    date: "28 Febrero 2026",
    category: "Lanzamientos",
    title: "Lamborghini presenta el sucesor del Huracán con motor V8 híbrido",
    excerpt: "Sant'Agata Bolognese desvela su nueva bestia: un V8 biturbo combinado con tres motores eléctricos que supera los 900 CV. La era híbrida de Lamborghini acaba de comenzar.",
    link: "/noticias/lamborghini-huracan-hibrido"
  },
  {
    id: 3,
    image: porscheGt3,
    date: "20 Febrero 2026",
    category: "Competición",
    title: "Porsche 911 GT3 RS 2026: récord en Nürburgring con neumáticos de serie",
    excerpt: "El nuevo GT3 RS pulveriza el crono del Nordschleife con un tiempo de 6:44.3, convirtiéndose en el Porsche de producción más rápido en el circuito alemán."
  },
  {
    id: 4,
    image: mclarenW1,
    date: "15 Febrero 2026",
    category: "Hypercars",
    title: "McLaren W1: el hypercar británico que desafía a todos los límites",
    excerpt: "Con un motor V8 híbrido de 1.275 CV y un peso de solo 1.399 kg, el McLaren W1 establece nuevos estándares en el segmento de los hypercars con tecnología directa de F1."
  },
  {
    id: 5,
    image: bugattiTourbillon,
    date: "8 Febrero 2026",
    category: "Lujo",
    title: "Bugatti Tourbillon: el V16 aspirado más potente jamás creado",
    excerpt: "Bugatti sorprende al mundo con un motor V16 atmosférico de 1.000 CV complementado por un sistema híbrido. El Tourbillon es la nueva obra maestra de Molsheim."
  },
  {
    id: 6,
    image: mercedesAmgOne,
    date: "1 Febrero 2026",
    category: "Tecnología",
    title: "Mercedes-AMG ONE: actualización que lleva la tecnología F1 al siguiente nivel",
    excerpt: "Mercedes actualiza su hypercar con nuevo software que mejora la respuesta del motor de F1 y añade 15 CV extra. Los propietarios existentes recibirán la actualización gratuitamente."
  }
];

const Noticias = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Noticias
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Las últimas novedades del mundo de los supercars y el lujo automovilístico
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => {
              const CardContent = (
                <>
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>
                    <h2 className="text-lg font-semibold leading-snug mb-3 group-hover:text-champagne transition-colors duration-300">
                      {item.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-champagne font-medium tracking-wider uppercase group-hover:gap-3 transition-all duration-300">
                      Leer más <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </>
              );

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-card/50 border border-border/30 rounded-2xl overflow-hidden hover:border-champagne/30 transition-all duration-300"
                >
                  {item.link ? (
                    <Link to={item.link} className="block">{CardContent}</Link>
                  ) : CardContent}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Noticias;
