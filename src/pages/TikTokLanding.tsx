import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Car, PenLine, CalendarCheck, BadgeDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import owneoLogo from "@/assets/owneo-logo.jpg";
import heroImage from "@/assets/tiktok-hero.jpg";

const steps = [
  {
    icon: Car,
    title: "ELIGE VEHÍCULO",
    description: "Selecciona el modelo de ultra-lujo y el porcentaje de participación que deseas adquirir para unirte al club exclusivo.",
  },
  {
    icon: PenLine,
    title: "COMPRA PARTICIPACIÓN",
    description: "Completa el proceso de verificación (KYC) digital y formaliza la adquisición de tu activo de forma segura y transparente.",
  },
  {
    icon: CalendarCheck,
    title: "RESERVA Y DISFRUTA",
    description: "Accede a la App Owneo, programa tus semanas en el calendario inteligente y recibe el coche listo para conducir.",
  },
  {
    icon: BadgeDollarSign,
    title: "REVENTA FÁCIL",
    description: "A los 5 años vendemos el vehículo y recuperas hasta un 70% de tu importe inicial mediante nuestro proceso garantizado.",
  },
];

const TikTokLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Supercar en showroom de lujo en Madrid"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-black/40" />
        </div>

        {/* Logo OWNEO grabado en la pared del concesionario */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
          className="absolute top-[25%] left-[8%] md:left-[10%] z-10"
        >
          <img
            src={owneoLogo}
            alt="OWNEO"
            className="h-12 md:h-20 lg:h-28 w-auto"
            style={{
              opacity: 0.45,
              filter: "brightness(1.8) contrast(0.7) sepia(0.6) saturate(1.8) hue-rotate(-10deg)",
              mixBlendMode: "overlay",
            }}
          />
        </motion.div>
      </section>

      {/* Steps Section */}
      <section className="relative z-10 -mt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Tagline with elegant reveal animation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center mb-16"
          >
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl md:text-4xl lg:text-5xl font-extralight tracking-[0.15em] text-foreground uppercase"
              >
                Lujo compartido,
              </motion.h2>
            </div>
            <div className="overflow-hidden mt-1">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.15em] text-luxury-gold uppercase"
              >
                disfrute individual
              </motion.h2>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
              className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent mx-auto mt-8 origin-center"
            />
          </motion.div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center group"
              >
                {/* Icon circle */}
                <div className="w-16 h-16 mx-auto mb-5 rounded-full border border-[hsl(var(--luxury-gold)/0.4)] flex items-center justify-center group-hover:border-[hsl(var(--luxury-gold))] transition-colors duration-300">
                  <step.icon className="w-7 h-7 text-luxury-gold" />
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[1px] bg-[hsl(var(--luxury-gold)/0.2)]" />
                )}

                <h3 className="text-sm font-semibold tracking-[0.2em] text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[240px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Link to="/portfolio">
              <Button
                variant="ghost"
                size="lg"
                className="border border-[hsl(var(--luxury-gold)/0.3)] text-luxury-gold hover:bg-[hsl(var(--luxury-gold)/0.1)] hover:border-[hsl(var(--luxury-gold)/0.6)] text-xs font-light tracking-[0.25em] px-12 py-6 group transition-all duration-500"
              >
                DESCUBRIR
                <ArrowRight className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TikTokLanding;
