import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Gem, Users, Calendar, TrendingUp, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/twitter-hero.jpg";
import owneoLogo from "@/assets/owneo-logo.png";
import { useRef } from "react";

const values = [
  {
    icon: Shield,
    title: "Confianza",
    description:
      "Tu inversión está protegida. Cada vehículo es verificado, asegurado y gestionado con total transparencia para que disfrutes sin preocupaciones.",
  },
  {
    icon: Gem,
    title: "Exclusividad",
    description:
      "Accede a supercoches que normalmente están fuera de alcance. Nuestro modelo de copropiedad te abre las puertas al mundo del ultra-lujo.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description:
      "Forma parte de un club selecto de entusiastas. Comparte experiencias únicas y conecta con personas que comparten tu pasión por la excelencia.",
  },
];

const features = [
  {
    icon: Car,
    title: "Flota Premium",
    description: "Ferrari, Lamborghini, Porsche, McLaren y más marcas de ultra-lujo disponibles.",
  },
  {
    icon: Calendar,
    title: "Calendario Inteligente",
    description: "Reserva tus semanas de uso de forma sencilla a través de nuestra app exclusiva.",
  },
  {
    icon: TrendingUp,
    title: "Valor Residual",
    description: "Recupera hasta un 70% de tu inversión tras 5 años gracias a nuestro proceso de reventa.",
  },
];

const TwitterLanding = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section — Full viewport, carsup-style */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <img
            src={heroImage}
            alt="Supercar en garaje de lujo"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-black/60" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-[12vh] text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <img
              src={owneoLogo}
              alt="OWNEO"
              className="h-14 md:h-20 lg:h-24 w-auto mx-auto"
              style={{
                filter: "brightness(2) contrast(0.9)",
                mixBlendMode: "screen",
              }}
            />
          </motion.div>
          <div className="overflow-hidden mt-2">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm md:text-lg font-extralight tracking-[0.2em] text-foreground/70"
            >
              Una nueva forma de conducir el futuro
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8"
          >
            <Link to="/portfolio">
              <Button
                variant="ghost"
                className="border border-foreground/20 text-foreground/80 hover:bg-foreground/5 hover:border-foreground/40 text-xs font-light tracking-[0.25em] px-10 py-5 group transition-all duration-500"
              >
                Descubrir
                <ArrowRight className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Make it simple / Tagline Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl md:text-4xl lg:text-5xl font-extralight tracking-[0.15em] text-champagne uppercase"
              >
                Lujo Compartido,
              </motion.h2>
            </div>
            <div className="overflow-hidden mt-1">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.15em] text-foreground uppercase"
              >
                Disfrute Individual
              </motion.h2>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-base md:text-lg text-muted-foreground font-extralight tracking-wide leading-relaxed max-w-2xl mx-auto"
          >
            Descubre el lujo en copropiedad. Owneo te permite acceder a los supercoches más exclusivos del mercado, compartiendo la inversión y disfrutando de la experiencia completa.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className="w-32 h-[1px] bg-gradient-to-r from-transparent via-champagne to-transparent mx-auto mt-10 origin-center"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="group relative p-8 rounded-lg border border-border bg-card hover:border-champagne/30 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-full border border-champagne/30 flex items-center justify-center mb-6 group-hover:border-champagne/60 transition-colors duration-300">
                  <value.icon className="w-6 h-6 text-champagne" />
                </div>
                <h3 className="text-lg font-light tracking-[0.15em] text-foreground mb-3 uppercase">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground font-extralight leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="py-24 px-6 border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-xs font-light tracking-[0.3em] text-muted-foreground uppercase mb-16"
          >
            Cómo funciona
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center"
              >
                <feature.icon className="w-8 h-8 text-champagne mx-auto mb-4" />
                <h4 className="text-sm font-semibold tracking-[0.2em] text-foreground mb-2 uppercase">
                  {feature.title}
                </h4>
                <p className="text-xs text-muted-foreground font-extralight leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-3xl text-center"
        >
          <h3 className="text-xl md:text-3xl font-extralight tracking-[0.12em] text-foreground mb-4">
            ¿Listo para conducir el futuro?
          </h3>
          <p className="text-sm text-muted-foreground font-extralight mb-8">
            Explora nuestra flota y encuentra tu próximo supercar.
          </p>
          <Link to="/portfolio">
            <Button
              variant="ghost"
              size="lg"
              className="border border-champagne/30 text-champagne hover:bg-champagne/10 hover:border-champagne/60 text-xs font-light tracking-[0.25em] px-12 py-6 group transition-all duration-500"
            >
              VER PORTFOLIO
              <ArrowRight className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default TwitterLanding;
