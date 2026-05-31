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

const sourceUrls: Record<string, string> = {
  "ferrari-f80-hypercar": "https://www.ferrari.com/en-EN/auto/ferrari-f80",
  "lamborghini-temerario": "https://www.lamborghini.com/en-en/models/temerario",
  "aston-martin-valhalla": "https://www.astonmartin.com/en/models/valhalla",
  "porsche-911-gt2-rs-2026": "https://www.porsche.com/international/models/911/911-gt2-rs/",
  "lamborghini-fenomeno": "https://www.lamborghini.com/en-en/models/few-off/fenomeno",
  "ferrari-elettrica": "https://www.ferrari.com/en-EN/magazine/articles/ferrari-luce-unveiled",
  "aston-martin-vanquish-volante": "https://www.astonmartin.com/en/models/vanquish",
  "bentley-batur-convertible": "https://www.bentleymotors.com/en/models/batur.html",
  "mclaren-w1-primeras-entregas": "https://cars.mclaren.com/uk_en/W1",
  "rimac-nevera-r": "https://www.rimac-automobili.com/nevera/",
  "porsche-taycan-turbo-gt": "https://www.porsche.com/international/models/taycan/taycan-turbo-gt/",
  "rolls-royce-spectre-black-badge": "https://www.rolls-roycemotorcars.com/en_US/models/spectre/black-badge.html",
  "pagani-utopia-roadster": "https://www.pagani.com/utopia-roadster/",
  "koenigsegg-jesko-entregas": "https://www.koenigsegg.com/car/jesko/",
  "ford-gt-mk-iv": "https://www.ford.com/cars/gt/",
  "gordon-murray-t50": "https://gordonmurrayautomotive.com/cars/t50",
  "maserati-mc20-icona": "https://www.maserati.com/en-en/models/mc20",
  "lotus-emeya-r": "https://www.lotuscars.com/emeya",
  "bmw-xm-label-red": "https://www.bmw.com/en/models/xm/label-red.html",
  "mercedes-amg-gt-63-pro": "https://www.mercedes-amg.com/en/vehicles/amg-gt.html",
  "porsche-911-turbo-s-2026": "https://www.porsche.com/international/models/911/911-turbo-models/911-turbo-s/",
  "bugatti-tourbillon-lanzamiento": "https://www.bugatti.com/en/models/tourbillon",
  "lamborghini-revuelto-spider": "https://www.lamborghini.com/en-en/models/revuelto",
  "ferrari-12cilindri-spider-circuito": "https://www.ferrari.com/en-EN/auto/ferrari-12cilindri-spider",
  "porsche-911-gt3-rs-2026-especificaciones": "https://www.porsche.com/international/models/911/911-gt3-rs/911-gt3-rs/",
  "mclaren-w1-spider-confirmacion": "https://cars.mclaren.com/uk_en/W1",
  "aston-martin-vantage-gt3-2026": "https://www.astonmartin.com/en/models/vantage",
  "lamborghini-urus-se-actualizado": "https://www.lamborghini.com/en-en/models/urus-se",
  "bugatti-bolide-primeras-entregas": "https://newsroom.bugatti.com/en/press-releases/the-final-bolide-a-vision-becomes-legacy",
  "rolls-royce-droptail-edicion-final": "https://www.rolls-roycemotorcars.com/en_US/bespoke/coachbuild/la-rose-noire-droptail.html",
  "porsche-718-cayman-gt4-rs-electrico": "https://www.porsche.com/international/models/718/718-cayman-gt4-rs/718-cayman-gt4-rs/",
};

const sourceLabels: Record<string, string> = {
  "ferrari-f80-hypercar": "Ferrari — F80",
  "lamborghini-temerario": "Lamborghini — Temerario",
  "aston-martin-valhalla": "Aston Martin — Valhalla",
  "porsche-911-gt2-rs-2026": "Porsche — 911 GT2 RS",
  "lamborghini-fenomeno": "Lamborghini — Fenomeno",
  "ferrari-elettrica": "Ferrari — Luce",
  "aston-martin-vanquish-volante": "Aston Martin — Vanquish Volante",
  "bentley-batur-convertible": "Bentley — Batur Convertible",
  "mclaren-w1-primeras-entregas": "McLaren — W1",
  "rimac-nevera-r": "Rimac — Nevera R",
  "porsche-taycan-turbo-gt": "Porsche — Taycan Turbo GT",
  "rolls-royce-spectre-black-badge": "Rolls-Royce — Spectre Black Badge",
  "pagani-utopia-roadster": "Pagani — Utopia Roadster",
  "koenigsegg-jesko-entregas": "Koenigsegg — Jesko",
  "ford-gt-mk-iv": "Ford — GT Mk IV",
  "gordon-murray-t50": "Gordon Murray — T.50",
  "maserati-mc20-icona": "Maserati — MC20 Icona",
  "lotus-emeya-r": "Lotus — Emeya R",
  "bmw-xm-label-red": "BMW — XM Label Red",
  "mercedes-amg-gt-63-pro": "Mercedes-AMG — GT 63 PRO",
  "porsche-911-turbo-s-2026": "Porsche — 911 Turbo S",
  "bugatti-tourbillon-lanzamiento": "Bugatti — Tourbillon",
  "lamborghini-revuelto-spider": "Lamborghini — Revuelto Spider",
  "ferrari-12cilindri-spider-circuito": "Ferrari — 12Cilindri Spider",
  "porsche-911-gt3-rs-2026-especificaciones": "Porsche — 911 GT3 RS",
  "mclaren-w1-spider-confirmacion": "McLaren — W1 Spider",
  "aston-martin-vantage-gt3-2026": "Aston Martin — Vantage GT3",
  "lamborghini-urus-se-actualizado": "Lamborghini — Urus SE",
  "bugatti-bolide-primeras-entregas": "Bugatti — Bolide",
  "rolls-royce-droptail-edicion-final": "Rolls-Royce — Droptail",
  "porsche-718-cayman-gt4-rs-electrico": "Porsche — 718 Cayman GT4 RS",
};



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
      <Helmet>
        <title>{`${article.title} | Owneo`}</title>
        <meta name="description" content={article.excerpt.slice(0, 155)} />
        <link rel="canonical" href={`https://www.owneo.es/noticias/${article.slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt.slice(0, 155)} />
        <meta property="og:url" content={`https://www.owneo.es/noticias/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Owneo" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          datePublished: toISODate(article.date),
          publisher: {
            "@type": "Organization",
            name: "Owneo",
            url: "https://www.owneo.es",
          },
          mainEntityOfPage: `https://www.owneo.es/noticias/${article.slug}`,
        })}</script>
      </Helmet>
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
            <p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12"
              dangerouslySetInnerHTML={{ __html: article.content.intro }}
            />
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

          {sourceUrls[article.slug] && (
            <p className="text-sm text-muted-foreground border-t border-border/30 pt-4 mt-8">
              Fuente oficial:{" "}
              <a
                href={sourceUrls[article.slug]}
                rel="nofollow noopener"
                target="_blank"
                className="text-[#bda095] hover:underline"
              >
                {sourceLabels[article.slug] ?? sourceUrls[article.slug]}
              </a>
            </p>
          )}

        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NoticiaDetalle;
