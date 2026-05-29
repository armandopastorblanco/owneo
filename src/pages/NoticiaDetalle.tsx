import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Zap, Gauge, Timer, Crown } from "lucide-react";
import ArticleCTAs from "@/components/ArticleCTAs";
import { Link, useParams, Navigate } from "react-router-dom";
import { additionalNews, type NewsArticle } from "@/data/additionalNews";
import { useAnalytics } from "@/hooks/useAnalytics";

const iconMap = [Zap, Gauge, Timer, Crown];

const MONTHS_ES: Record<string, string> = {
  enero: "01", febrero: "02", marzo: "03", abril: "04", mayo: "05", junio: "06",
  julio: "07", agosto: "08", septiembre: "09", octubre: "10", noviembre: "11", diciembre: "12",
};

const toISODate = (date: string): string => {
  const m = date.trim().toLowerCase().match(/^(\d{1,2})\s+([a-záéíóú]+)\s+(\d{4})$/);
  if (!m) return "";
  const month = MONTHS_ES[m[2]] ?? "01";
  return `${m[3]}-${month}-${m[1].padStart(2, "0")}`;
};


const NoticiaDetalle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = additionalNews.find((a) => a.slug === slug);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (article) {
      trackEvent("view_item", {
        content_type: "news_article",
        item_id: article.slug,
        item_name: article.title,
        item_category: article.category,
      });
    }
  }, [article, trackEvent]);

  if (!article) return <Navigate to="/noticias" replace />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <img src={article.image} alt={article.title} loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-champagne text-sm mb-4 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Noticias
            </Link>
            <span className="block bg-champagne/90 text-background text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
              <span className="mx-2">·</span>
              <span>{article.readTime} de lectura</span>
            </div>
          </div>
        </div>
      </section>

      <article className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
              {article.content.intro}
            </p>
          </motion.div>

          {article.specs && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
              {article.specs.map((spec, i) => {
                const Icon = iconMap[i % iconMap.length];
                return (
                  <div key={spec.label} className="bg-card/50 border border-border/30 rounded-xl p-5 text-center">
                    <Icon className="w-6 h-6 text-champagne mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
                    <p className="text-lg font-bold">{spec.value}</p>
                  </div>
                );
              })}
            </motion.div>
          )}

          {article.content.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{section.title}</h2>
              {section.paragraphs.map((p, pi) => (
                <p key={pi} className="text-base leading-relaxed mb-6">{p}</p>
              ))}
              {article.detailImages && article.detailImages[index] && (
                <motion.img
                  src={article.detailImages[index].src}
                  alt={article.detailImages[index].alt}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="w-full rounded-xl mt-8"
                />
              )}
            </motion.div>
          ))}

          <ArticleCTAs vehicleName={article.title.split(":")[0]} />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaDetalle;
