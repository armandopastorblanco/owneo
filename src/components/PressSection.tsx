import { motion } from "framer-motion";

const pressReferences = [
  {
    name: "Forbes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/1280px-Forbes_logo.svg.png",
    quote: "Revolucionando el acceso al lujo automovilístico en España"
  },
  {
    name: "Motorpasión",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Motorpasi%C3%B3n_logo.svg/1280px-Motorpasi%C3%B3n_logo.svg.png",
    quote: "La forma más inteligente de disfrutar un superdeportivo"
  },
  {
    name: "GQ",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/GQ_logo.svg/1280px-GQ_logo.svg.png",
    quote: "El club de supercoches que está redefiniendo el lujo"
  },
  {
    name: "Vanity Fair",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Vanity_Fair_logo.svg/1280px-Vanity_Fair_logo.svg.png",
    quote: "Donde la exclusividad se encuentra con la comunidad"
  }
];

interface PressSectionProps {
  standalone?: boolean;
}

const PressSection = ({ standalone = true }: PressSectionProps) => {
  const content = (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className={`${standalone ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} font-bold mb-4 text-foreground`}>
          Hablan de Nosotros
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          La prensa especializada reconoce nuestra visión del lujo compartido
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pressReferences.map((press, index) => (
          <motion.div
            key={press.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-background/50 rounded-2xl p-6 border border-border/30 hover:border-champagne/30 transition-all duration-300 hover:bg-background/70 flex flex-col items-center text-center"
          >
            <div className="h-12 flex items-center justify-center mb-6">
              <img
                src={press.logo}
                alt={`${press.name} logo`}
                className="max-h-10 max-w-[140px] object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              "{press.quote}"
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );

  if (!standalone) {
    return <div className="mt-12">{content}</div>;
  }

  return (
    <section className="py-20 px-6 bg-card/30 border-y border-border/50">
      <div className="container mx-auto max-w-6xl">
        {content}
      </div>
    </section>
  );
};

export default PressSection;
