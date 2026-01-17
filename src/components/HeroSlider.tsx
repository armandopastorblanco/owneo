import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cars } from "@/data/cars";
import owneoLogo from "@/assets/owneo-logo.jpg";

// Featured cars for the hero slider
const heroSlides = [
  {
    car: cars.find(c => c.id === "ferrari-f8-tributo"),
    tagline: "Pura Potencia Italiana",
    accent: "710 CV de emoción"
  },
  {
    car: cars.find(c => c.id === "lamborghini-aventador"),
    tagline: "El Rugido Legendario",
    accent: "V12 atmosférico"
  },
  {
    car: cars.find(c => c.id === "porsche-911-turbo-s"),
    tagline: "Ingeniería Alemana",
    accent: "Perfección deportiva"
  },
  {
    car: cars.find(c => c.id === "mclaren-720s"),
    tagline: "Aerodinámica Extrema",
    accent: "Tecnología de competición"
  },
  {
    car: cars.find(c => c.id === "rolls-royce-wraith"),
    tagline: "Lujo Supremo",
    accent: "Elegancia británica"
  }
].filter(slide => slide.car);

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const currentData = heroSlides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background Images with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentData.car?.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content - Minimal */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-24 left-6 md:left-12 lg:left-20"
          >
            <img src={owneoLogo} alt="OWNEO" className="h-12 md:h-16 lg:h-20 w-auto" />
          </motion.div>

          {/* Car Name Only */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-8xl font-bold text-foreground tracking-tight"
              >
                {currentData.car?.name}
              </motion.h1>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8"
              >
                <Link to={`/car/${currentData.car?.id}`}>
                  <Button 
                    variant="ghost"
                    className="text-foreground hover:bg-foreground/10 text-lg font-medium tracking-wide group"
                  >
                    DESCUBRIR
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-background/20 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-background/20 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative overflow-hidden transition-all duration-500 ${
              index === currentSlide 
                ? "w-16 h-2 bg-foreground rounded-full" 
                : "w-8 h-2 bg-foreground/30 hover:bg-foreground/50 rounded-full"
            }`}
            aria-label={`Ir a ${slide.car?.name}`}
          >
            {index === currentSlide && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute inset-0 bg-foreground/50 origin-left"
                style={{ display: isAutoPlaying ? "block" : "none" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Car thumbnails preview */}
      <div className="absolute bottom-24 right-4 md:right-8 z-20 hidden lg:flex gap-2">
        {heroSlides.map((slide, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              index === currentSlide 
                ? "border-foreground" 
                : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <img 
              src={slide.car?.image} 
              alt={slide.car?.name}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 lg:left-8 lg:translate-x-0 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest hidden md:block">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSlider;
