import { motion } from "framer-motion";

const ForbesLogo = () => (
  <svg viewBox="0 0 200 50" className="h-8 w-auto fill-current">
    <text x="0" y="38" fontSize="42" fontWeight="bold" fontFamily="Georgia, serif">FORBES</text>
  </svg>
);

const MotorpasionLogo = () => (
  <svg viewBox="0 0 200 40" className="h-7 w-auto fill-current">
    <text x="0" y="30" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif">MOTORPASIÓN</text>
  </svg>
);

const GQLogo = () => (
  <svg viewBox="0 0 50 40" className="h-8 w-auto fill-current">
    <text x="5" y="32" fontSize="36" fontWeight="bold" fontFamily="Georgia, serif" fontStyle="italic">GQ</text>
  </svg>
);

const VanityFairLogo = () => (
  <svg viewBox="0 0 200 40" className="h-7 w-auto fill-current">
    <text x="0" y="28" fontSize="22" fontWeight="normal" fontFamily="Georgia, serif" letterSpacing="3">VANITY FAIR</text>
  </svg>
);

const pressReferences = [
  {
    name: "Forbes",
    Logo: ForbesLogo,
    quote: "Revolucionando el acceso al lujo automovilístico en España"
  },
  {
    name: "Motorpasión",
    Logo: MotorpasionLogo,
    quote: "La forma más inteligente de disfrutar un superdeportivo"
  },
  {
    name: "GQ",
    Logo: GQLogo,
    quote: "El club de supercoches que está redefiniendo el lujo"
  },
  {
    name: "Vanity Fair",
    Logo: VanityFairLogo,
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
            <div className="h-12 flex items-center justify-center mb-6 text-foreground/60 group-hover:text-foreground transition-colors duration-300">
              <press.Logo />
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
