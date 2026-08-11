import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { additionalNews } from "@/data/additionalNews";
import { useAnalytics } from "@/hooks/useAnalytics";

import ferrariEv from "@/assets/news/ferrari-ev.jpg";
import lamborghiniReveal from "@/assets/news/lamborghini-reveal.jpg";
import mclarenW1 from "@/assets/news/mclaren-w1.jpg";
import mercedesAmgOne from "@/assets/news/mercedes-amg-one.jpg";
import lamborghiniTemerario from "@/assets/news/lamborghini-temerario.jpg";
import porscheCayenneTurboElectric from "@/assets/noticias/porsche-cayenne-turbo-electric-main.jpg";

const originalNews = [
  {
    id: 8,
    image: porscheCayenneTurboElectric,
    date: "1 Junio 2026",
    category: "Novedades · Porsche · Eléctricos",
    title: "Porsche Cayenne Turbo Electric: 1.139 CV y el fin de los límites",
    excerpt: "Stuttgart presenta el SUV eléctrico más potente de su historia. El nuevo Cayenne Turbo Electric no es una evolución. Es una declaración de intenciones.",
    link: "/noticias/porsche-cayenne-turbo-electric-2026"
  },
  {
    id: 7,
    image: lamborghiniTemerario,
    date: "31 Mayo 2026",
    category: "Lanzamientos",
    title: "Lamborghini Temerario Spyder: primeras imágenes espía del descapotable V8 híbrido",
    excerpt: "Las primeras fotografías espía del Lamborghini Temerario Spyder, captadas en el Nürburgring, confirman lo que muchos esperaban: Sant'Agata Bolognese trabaja a toda velocidad en la versión descapotable del sucesor del Huracán. Presentación prevista en Goodwood, 9-12 julio 2026.",
    link: "/noticias/lamborghini-temerario-spyder"
  },
  {
   id: 1,
image: ferrariEv,
date: "25 Mayo 2026",
category: "Eléctricos",
title: "Ferrari Luce: así es el primer coche 100% eléctrico de Maranello",
excerpt: "Ferrari presentó oficialmente el Luce el 25 de mayo de 2026 en Roma. 1.035 CV, autonomía 530 km WLTP y arquitectura 800 V. El inicio de una nueva era para Maranello.",
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
    id: 4,
    image: mclarenW1,
    date: "15 Febrero 2026",
    category: "Hypercars",
    title: "McLaren W1: el hypercar británico que desafía a todos los límites",
    excerpt: "Con un motor V8 híbrido de 1.275 CV y un peso de solo 1.399 kg, el McLaren W1 establece nuevos estándares en el segmento de los hypercars con tecnología directa de F1.",
    link: "/noticias/mclaren-w1"
  },
  {
    id: 6,
    image: mercedesAmgOne,
    date: "1 Febrero 2026",
    category: "Tecnología",
    title: "Mercedes-AMG ONE: actualización que lleva la tecnología F1 al siguiente nivel",
    excerpt: "Mercedes actualiza su hypercar con nuevo software que mejora la respuesta del motor de F1 y añade 15 CV extra. Los propietarios existentes recibirán la actualización gratuitamente.",
    link: "/noticias/mercedes-amg-one-actualizacion"
  }
];

const additionalNewsItems = additionalNews.map((a) => ({
  id: a.id,
  image: a.image,
  date: a.date,
  category: a.category,
  title: a.title,
  excerpt: a.excerpt,
  excerpt_en: a.excerpt_en,
  link: `/noticias/${a.slug}`
}));

const CATEGORIES_EN: Record<string, string> = {
  "Lanzamientos": "Launches",
  "Eléctricos": "Electric",
  "Hypercars": "Hypercars",
  "Lujo": "Luxury",
  "Competición": "Racing",
  "SUV Deportivo": "Sport SUV",
  "Gran Turismo": "Grand Tourer",
  "Ediciones Limitadas": "Limited Editions",
  "Tecnología": "Technology",
  "Novedades · Porsche · Eléctricos": "News · Porsche · Electric",
};

const translateCategory = (category: string) =>
  CATEGORIES_EN[category] ??
  category
    .split(" · ")
    .map((part) => CATEGORIES_EN[part] ?? part)
    .join(" · ");

const allNews = [...originalNews, ...additionalNewsItems];

const MONTHS_ES: Record<string, number> = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};

const parseSpanishDate = (date: string): number => {
  const match = date.toLowerCase().match(/(\d{1,2})\s+(?:de\s+)?([a-záéíóú]+)\s+(?:de\s+)?(\d{4})/);
  if (!match) return 0;
  const [, day, month, year] = match;
  const m = MONTHS_ES[month] ?? 0;
  return new Date(Number(year), m, Number(day)).getTime();
};

const newsItems = [...allNews].sort(
  (a, b) => parseSpanishDate(b.date) - parseSpanishDate(a.date)
);

const Noticias = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent("view_item_list", {
      item_list_name: "Noticias",
      item_list_id: "noticias",
      items_count: newsItems.length,
    });
  }, [trackEvent]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Noticias de Supercoches de Lujo | Owneo</title>
        <meta name="description" content="Últimas noticias del mundo de los supercoches de lujo. Ferrari, Lamborghini, Porsche y el universo Owneo al día." />
        <link rel="canonical" href="https://www.owneo.es/noticias" />
        <meta property="og:title" content="Noticias de Supercoches de Lujo | Owneo" />
        <meta property="og:description" content="Últimas noticias del mundo de los supercoches de lujo. Ferrari, Lamborghini, Porsche y el universo Owneo al día." />
        <meta property="og:url" content="https://www.owneo.es/noticias" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Owneo" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@owneo" />
      </Helmet>
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {t("news.title")}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              {t("news.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="pb-24 px-4 sm:px-6">
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
                        {isEn ? translateCategory(item.category) : item.category}
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
                      {(isEn && "excerpt_en" in item && item.excerpt_en) || item.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-champagne font-medium tracking-wider uppercase group-hover:gap-3 transition-all duration-300">
                      {t("news.read_more")} <ArrowRight className="w-3.5 h-3.5" />
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
