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
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Preload all images for smoother transitions
    heroSlides.forEach((slide) => {
      if (slide?.image) {
        const img = new Image();
        img.src = slide.image;
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // Start transition to next slide
      setTimeout(() => {
        setCurrentSlide((prev) => {
          const next = (prev + 1) % heroSlides.length;
          setNextSlide((next + 1) % heroSlides.length);
          return next;
        });
        setIsTransitioning(false);
      }, 1500); // Half of the total transition time
      
    }, 6000); // Longer duration for luxury feel

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Preload next images */}
      <div className="hidden">
        <img src={heroSlides[nextSlide]?.image} alt="" />
        <img src={heroSlides[(nextSlide + 1) % heroSlides.length]?.image} alt="" />
      </div>

      {/* Background layer - next slide (visible during crossfade) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroSlides[nextSlide]?.image})` }}
          animate={{ 
            scale: isTransitioning ? [1, 1.08] : 1,
          }}
          transition={{ duration: 6, ease: "easeOut" }}
        />
      </motion.div>

      {/* Current slide with elegant Ken Burns effect */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 2.5, 
            ease: [0.43, 0.13, 0.23, 0.96], // Cinematic easing
          }}
          className="absolute inset-0"
        >
          <motion.div 
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${heroSlides[currentSlide]?.image})` }}
            initial={{ scale: 1, x: 0 }}
            animate={{ 
              scale: 1.12,
              x: currentSlide % 2 === 0 ? "2%" : "-2%", // Subtle horizontal drift
            }}
            transition={{ 
              duration: 8, 
              ease: [0.25, 0.1, 0.25, 1], // Smooth cinematic motion
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Luxury gradient overlays with depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 z-10" />
      
      {/* Subtle film grain effect for premium feel */}
      <div className="absolute inset-0 opacity-[0.015] z-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Subtle golden accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[hsl(45,100%,70%)] to-transparent opacity-30"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo in hero - transparent blend with car images */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute top-24 sm:top-28 left-1/2 -translate-x-1/2 z-30"
      >
        <img 
          src={owneoLogo} 
          alt="OWNEO" 
          className="h-20 sm:h-20 md:h-24 lg:h-28 w-auto mix-blend-screen opacity-80"
          style={{
            filter: 'brightness(1.8) contrast(1.5)',
          }}
        />
      </motion.div>

      {/* Minimal elegant text overlay */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto mt-20 sm:mt-16"
        >
          {/* Elegant separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-6 sm:mb-8"
          />
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extralight text-white/90 tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-4">
            Vive lo
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-[0.1em] sm:tracking-[0.15em] uppercase mb-6 sm:mb-8">
            Extraordinario
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-white/50 font-extralight tracking-[0.05em] sm:tracking-[0.1em] max-w-xs sm:max-w-xl mx-auto mb-8 sm:mb-12 px-2"
          >
            El lujo de los supercoches, ahora accesible
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
