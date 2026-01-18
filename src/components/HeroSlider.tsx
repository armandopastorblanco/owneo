import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cars } from "@/data/cars";

// Featured cars for the hero slider - more cars for variety
const heroSlides = [
  cars.find(c => c.id === "ferrari-f8-tributo"),
  cars.find(c => c.id === "lamborghini-aventador"),
  cars.find(c => c.id === "porsche-911-turbo-s"),
  cars.find(c => c.id === "mclaren-720s"),
  cars.find(c => c.id === "rolls-royce-wraith"),
  cars.find(c => c.id === "ferrari-roma"),
  cars.find(c => c.id === "bentley-continental-gt"),
  cars.find(c => c.id === "mercedes-amg-gt-r"),
].filter(Boolean);

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2500); // Faster transitions for flash effect

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Flash transition background images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.1, 0.25, 1],
            opacity: { duration: 0.4 }
          }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide]?.image})` }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Flash effect overlay */}
      <AnimatePresence>
        <motion.div
          key={`flash-${currentSlide}`}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white pointer-events-none z-10"
        />
      </AnimatePresence>

      {/* Animated light streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        <motion.div
          animate={{ 
            x: ["-100%", "200%"],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatDelay: 2,
            ease: "easeOut"
          }}
          className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-white to-transparent"
        />
        <motion.div
          animate={{ 
            x: ["-100%", "200%"],
            opacity: [0, 0.2, 0]
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            repeatDelay: 3,
            delay: 0.5,
            ease: "easeOut"
          }}
          className="absolute top-2/3 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-white to-transparent"
        />
      </div>

      {/* Fixed centered text content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight mb-6 leading-tight">
            Vive lo
            <span className="block mt-2 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              extraordinario
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light max-w-2xl mx-auto mb-10"
          >
            Descubre la colección más exclusiva de supercoches de lujo en España.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Link to="/portfolio">
              <Button 
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black text-base md:text-lg font-medium tracking-wide px-8 py-6 group transition-all duration-300"
              >
                EXPLORAR COLECCIÓN
                <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated car counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <motion.div
              key={index}
              animate={{ 
                scale: index === currentSlide ? 1.2 : 1,
                opacity: index === currentSlide ? 1 : 0.3
              }}
              transition={{ duration: 0.3 }}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Speed lines effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: ["-100vw", "100vw"],
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              repeat: Infinity,
              repeatDelay: 2 + i * 0.3,
            }}
            className="absolute h-[1px] bg-white"
            style={{
              top: `${20 + i * 15}%`,
              width: `${10 + i * 5}%`,
            }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 z-20 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSlider;
