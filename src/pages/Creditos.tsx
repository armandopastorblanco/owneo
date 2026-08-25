import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Creditos = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="border-b border-white/10 py-16 px-6 text-center">
        <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">
          {t("credits.eyebrow")}
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase mb-6">
          {t("credits.title")}
        </h1>
        <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
          {t("credits.intro")}
        </p>
      </div>

      {/* Tabla */}
      <div className="max-w-6xl mx-auto px-6 py-16 flex-1 w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-xs tracking-[0.2em] uppercase text-white/40 font-light">{t("credits.col_file")}</th>
                <th className="text-left py-4 px-4 text-xs tracking-[0.2em] uppercase text-white/40 font-light">{t("credits.col_author")}</th>
                <th className="text-left py-4 px-4 text-xs tracking-[0.2em] uppercase text-white/40 font-light">{t("credits.col_source")}</th>
                <th className="text-left py-4 px-4 text-xs tracking-[0.2em] uppercase text-white/40 font-light">{t("credits.col_license")}</th>
              </tr>
            </thead>
            <tbody>

              {/* ─── Hero vidéo ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">ferrari-f430-hero.mp4</td>
                <td className="py-4 px-4 text-white/70">SE FPV</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Ferrari_F430_Spider_driving_as_viewed_from_FPV_drone.webm"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY 3.0 · {t("credits.modified_greyscale")}</td>
              </tr>

              {/* ─── Porsche 911 Turbo S ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-911-turbo-s-2026.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2025_Porsche_992_Turbo_S_coupes_IAA_2025_DSC_1835.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-turbo-s-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">Matti Blume</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Porsche_992_Turbo_S_Cabriolet,_Auto_2025,_Zurich_(20251029-P1074410).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-turbo-s-detail-2.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2025_Porsche_992_Turbo_S_coupes_IAA_2025_DSC_1840.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-turbo-s-detail-3.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2025_Porsche_992_Turbo_S_coupes_IAA_2025_DSC_1840.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>

              {/* ─── Porsche 911 GT3 RS 2026 ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-gt3-rs-2026.jpg</td>
                <td className="py-4 px-4 text-white/70">OWS Photography</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Porsche_911_GT3_RS_(992.1)_Washington_DC_Metro_Area,_USA_(1).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-gt3-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">OWS Photography</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Porsche_911_GT3_RS_(992.1)_Washington_DC_Metro_Area,_USA_(1.7).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-gt3-detail-2.jpg</td>
                <td className="py-4 px-4 text-white/70">OWS Photography</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Porsche_911_GT3_RS_(992.1)_Washington_DC_Metro_Area,_USA_(1.4).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY 4.0</td>
              </tr>

              {/* ─── Porsche Taycan Turbo GT ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-taycan-gt.jpg</td>
                <td className="py-4 px-4 text-white/70">Oleg Yunakov</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2025_Porsche_Taycan_Turbo_GT_-_01.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-taycan-gt-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">Damian B Oh</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Porsche_9J1.2_Taycan_Turbo_GT_Purple_Sky_Metallic_(2).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-taycan-gt-detail-2.jpg</td>
                <td className="py-4 px-4 text-white/70">Damian B Oh</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Porsche_9J1.2_Taycan_Turbo_GT_Purple_Sky_Metallic_(6).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>

              {/* ─── Ferrari Roma ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">ferrari-roma-spider.jpg</td>
                <td className="py-4 px-4 text-white/70">John Bauld (JiBs Media)</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Ferrari_Roma_Spider_(54328096181).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY 2.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">ferrari-roma-cockpit.jpg</td>
                <td className="py-4 px-4 text-white/70">Epensock</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Ferrari_Roma_Dual_Cockpit_Design.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>

              {/* ─── Ferrari F80 ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">ferrari-f80.jpg</td>
                <td className="py-4 px-4 text-white/70">Pauls.127</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:FerrariF80_(resized)_(cropped).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">{t("credits.cc0")}</td>
              </tr>

              {/* ─── Lamborghini Temerario ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">lamborghini-temerario.jpg</td>
                <td className="py-4 px-4 text-white/70">MrWalkr</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2025_Lamborghini_Temerario.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">lamborghini-temerario-detail-2.jpg</td>
                <td className="py-4 px-4 text-white/70">MrWalkr</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2025_Lamborghini_Temerario_rear.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>

              {/* ─── Lamborghini Urus SE ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">lamborghini-urus-se.jpg</td>
                <td className="py-4 px-4 text-white/70">TaurusEmerald (via Flickr)</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Lamborghini_Urus_SE_(2026)_(55082278988).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">{t("credits.cc0")}</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">lamborghini-urus-se-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">TaurusEmerald (via Flickr)</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Lamborghini_Urus_SE_(2026)_(55082446935).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">{t("credits.cc0")}</td>
              </tr>

              {/* ─── Lamborghini Revuelto ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">lamborghini-revuelto-spider.jpg</td>
                <td className="py-4 px-4 text-white/70">Charles (usf1fan2 via Flickr)</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Lamborghini_Revuelto_(2024)_(53622083054).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY 2.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">lamborghini-reveal.jpg</td>
                <td className="py-4 px-4 text-white/70">Charles (usf1fan2 via Flickr) — Revuelto 2024, utilisée comme illustration Temerario Spyder</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Lamborghini_Revuelto_(2024)_(53620872937).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY 2.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">lamborghini-reveal-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">Charles (usf1fan2 via Flickr)</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Lamborghini_Revuelto_(2024)_(53621749716).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY 2.0</td>
              </tr>

              {/* ─── Mercedes-AMG One ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">mercedes-amg-one.jpg</td>
                <td className="py-4 px-4 text-white/70">Thomas Vogt</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Mercedes-AMG_One_(54529742843).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">mercedes-amg-one-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">Thomas Vogt</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Mercedes-AMG_One_(54529506291).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY 4.0</td>
              </tr>

              {/* ─── BMW XM Label Red ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">bmw-xm.jpg</td>
                <td className="py-4 px-4 text-white/70">MrWalkr</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2023_BMW_XM_Label_Red.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">bmw-xm-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">Pixelatedfacealex</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:XM_Int_2.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">bmw-xm-detail-2.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:BMW_XM_Label_Red_IAA_2023_1X7A0743.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>

              {/* ─── Lotus Emeya R ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">lotus-emeya.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Lotus_Emeya_IAA_2025_DSC_2300.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">lotus-emeya-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Lotus_Emeya_Auto_Zuerich_2024_DSC_6789.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">lotus-emeya-detail-2.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Lotus_Emeya_Auto_Zuerich_2024_DSC_6794.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>

              {/* ─── Maserati MC20 Icona ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">maserati-mc20.jpg</td>
                <td className="py-4 px-4 text-white/70">Jengtingchen</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Maserati_MC20_003.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">maserati-mc20-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Maserati_MC20_Cielo_IAA_2023_1X7A0052.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">maserati-mc20-detail-2.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Maserati_MC20_Auto_Zuerich_2021_IMG_0423.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>

              {/* ─── Rimac Nevera R ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">rimac-nevera.jpg</td>
                <td className="py-4 px-4 text-white/70">Smnt (Rimac C_Two 2018 — modèle différent de la Nevera R)</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Rimac_C_Two_2018_Geneva_Motor_Show.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">rimac-nevera-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">Norbert Aepli (Rimac C_Two 2018 — modèle différent de la Nevera R)</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2018-03-06_Geneva_Motor_Show_2452.JPG"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">rimac-nevera-detail-2.jpg</td>
                <td className="py-4 px-4 text-white/70">Ank kumar (Rimac C_Two 2018 — modèle différent de la Nevera R)</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Rimac_(Geneva_Motor_Show)_10.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>

              {/* ─── Aston Martin Valhalla ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">aston-martin-valhalla.jpg</td>
                <td className="py-4 px-4 text-white/70">Damian B Oh</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Aston_Martin_Valhalla_Prototype_(7).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">aston-martin-valhalla-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">Damian B Oh</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Aston_Martin_Valhalla_Prototype_Interior_(7).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">aston-martin-valhalla-detail-2.jpg</td>
                <td className="py-4 px-4 text-white/70">Damian B Oh</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Aston_Martin_Valhalla_Prototype_(14).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>

              {/* ─── Koenigsegg Jesko ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">koenigsegg-jesko.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Koenigsegg_Jesko_Auto_Zuerich_2023_1X7A0924.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">koenigsegg-jesko-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Koenigsegg_Jesko_Auto_Zuerich_2023_1X7A1377.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">koenigsegg-jesko-detail-2.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Koenigsegg_Jesko_Auto_Zuerich_2023_1X7A1375.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>

              {/* ─── Gordon Murray T.50 ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">gordon-murray-t50.jpg</td>
                <td className="py-4 px-4 text-white/70">Calreyn88</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2024_Gordon_Murray_T50_5.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">gordon-murray-t50-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">Calreyn88</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2024_Gordon_Murray_T50_11.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">gordon-murray-t50-detail-2.jpg</td>
                <td className="py-4 px-4 text-white/70">Calreyn88</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2024_Gordon_Murray_T50_9.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>

              {/* ─── Créditos de imágenes / Noticias (julio 2026) ─── */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">ferrari-purosangue.jpg</td>
                <td className="py-4 px-4 text-white/70">John Bauld (Toronto)</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Ferrari_Purosangue_(54328319903).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">
                  <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer"
                    className="hover:text-white underline underline-offset-4 transition-colors">
                    CC BY 2.0
                  </a>
                </td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-911-turbo-s-hibrido.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2025_Porsche_992_Turbo_S_coupes_IAA_2025_DSC_1835.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">
                  <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer"
                    className="hover:text-white underline underline-offset-4 transition-colors">
                    CC BY-SA 4.0
                  </a>
                </td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">lamborghini-urus-se-performante.jpg</td>
                <td className="py-4 px-4 text-white/70">Oleg Yunakov (via Wikimedia Commons)</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Lamborghini_Urus_SE_-_54661371834.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">
                  <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer"
                    className="hover:text-white underline underline-offset-4 transition-colors">
                    CC BY-SA 4.0
                  </a>
                </td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">maserati-gt2-stradale.jpg</td>
                <td className="py-4 px-4 text-white/70">Wikimedia Commons</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Maserati_GT2Stradale_(2026)_(55081233612).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">
                    <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer"
                    className="hover:text-white underline underline-offset-4 transition-colors">
                    {t("credits.cc0")}
                  </a>
                </td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">aston-martin-vanquish.jpg</td>
                <td className="py-4 px-4 text-white/70">Calreyn88</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2025_Aston_Martin_Vanquish_V12_Auto_10.jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">
                  <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer"
                    className="hover:text-white underline underline-offset-4 transition-colors">
                    CC BY-SA 4.0
                  </a>
                </td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">ferrari-296-speciale.jpg</td>
                <td className="py-4 px-4 text-white/70">Mustang Joe (Joe deSousa)</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Ferrari_296_Speciale_(55112786260).jpg"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">
                    <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer"
                    className="hover:text-white underline underline-offset-4 transition-colors">
                    {t("credits.cc0")}
                  </a>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <p className="text-white/20 text-xs mt-12 text-center leading-relaxed">
          {t("credits.press_note")} ·
          <Link to="/" className="hover:text-white/40 transition-colors ml-1">
            {t("credits.back_home")}
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Creditos;
