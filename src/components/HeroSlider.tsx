import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cars } from "@/data/cars";
import owneoLogo from "@/assets/owneo-logo.jpg";

// All premium cars for the hero slider
const heroSlides = [
  cars.find(c => c.id === "ferrari-f8-tributo"),
  cars.find(c => c.id === "lamborghini-aventador"),
  cars.find(c => c.id === "porsche-911-turbo-s"),
  cars.find(c => c.id === "mclaren-720s"),
  cars.find(c => c.id === "rolls-royce-wraith"),
  cars.find(c => c.id === "ferrari-roma"),
  cars.find(c => c.id === "bentley-continental-gt"),
  cars.find(c => c.id === "mercedes-amg-gt-r"),
  cars.find(c => c.id === "lamborghini-huracan-evo"),
  cars.find(c => c.id === "aston-martin-db11"),
  cars.find(c => c.id === "porsche-taycan-turbo-s"),
  cars.find(c => c.id === "ferrari-portofino"),
  cars.find(c => c.id === "lamborghini-urus"),
  cars.find(c => c.id === "porsche-cayenne-turbo-gt"),
].filter(Boolean);

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % heroSlides.length;
        setNextSlide((next + 1) % heroSlides.length);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Preload next image */}
      <div className="hidden">
        <img src={heroSlides[nextSlide]?.image} alt="" />
      </div>

      {/* Cinematic image transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide]?.image})` }}
            animate={{ scale: [1, 1.05] }}
            transition={{ duration: 3, ease: "linear" }}
          />
          {/* Elegant gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Subtle golden accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[hsl(45,100%,70%)] to-transparent opacity-30"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo in hero - elegantly positioned */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute top-28 left-1/2 -translate-x-1/2 z-30"
      >
        <img 
          src={owneoLogo} 
          alt="OWNEO" 
          className="h-16 md:h-20 lg:h-24 w-auto filter brightness-110"
        />
      </motion.div>

      {/* Minimal elegant text overlay */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto mt-16"
        >
          {/* Elegant separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-8"
          />
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight text-white/90 tracking-[0.2em] uppercase mb-4">
            Vive lo
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-[0.15em] uppercase mb-8">
            Extraordinario
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-sm md:text-base lg:text-lg text-white/50 font-extralight tracking-[0.1em] max-w-xl mx-auto mb-12"
          >
            La colección más exclusiva de supercoches de lujo en España
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <Link to="/portfolio">
              <Button 
                variant="ghost"
                size="lg"
                className="border border-white/20 text-white/80 hover:text-white hover:bg-white/5 hover:border-white/40 text-xs md:text-sm font-light tracking-[0.2em] px-10 py-6 group transition-all duration-500"
              >
                EXPLORAR
                <ArrowRight className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant slide indicators - minimal dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="flex gap-3 items-center">
          {heroSlides.slice(0, 7).map((_, index) => (
            <motion.div
              key={index}
              animate={{ 
                opacity: index === currentSlide % 7 ? 0.9 : 0.2,
                scale: index === currentSlide % 7 ? 1.2 : 1,
              }}
              transition={{ duration: 0.5 }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator - refined */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 right-8 z-20 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-light">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </section>
  );
};

export default HeroSlider;
