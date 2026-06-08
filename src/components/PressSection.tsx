import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  <svg
    viewBox="0 0 225.89199 121.38706"
    className="h-8 w-auto fill-current"
    role="img"
    aria-label="GQ"
  >
    <path d="m 122.12099,60.600058 c 0,-2.929 -0.016,-5.813 -0.453,-8.358 l -52.891998,0 0,25.442 15.7,0 c 0,2.543 -7.257,7.771 -18.145,7.771 -11.978,0 -25.539,-9.417 -25.81,-24.568 -0.283,-15.697 13.297,-25.963 25.81,-25.516 10.162,0.363 14.043,3.277 19.71,8.855 0,0 32.974998,0.025 33.838998,0.025 -0.983,-3.779 -3.418,-9.489 -7.584,-15.4 -0.348,-0.492 -0.703,-0.988 -1.078,-1.48 -8.331,-11.089 -22.805998,-22.347 -45.296998,-22.371 -26.426,-0.037 -46.822,17.63 -53.548,39.261 -0.08,0.261 -0.157,0.522 -0.236,0.785 0,0.012 -0.005,0.03 -0.01,0.04 -1.381,4.84 -2.1269996,9.948 -2.1269996,15.223 0.05,5.051 0.7059996,9.886 1.8979996,14.448 4.244,15.782 15.29,28.807002 29.833,35.793002 0.117,0.055 0.233,0.112 0.353,0.164 0.075,0.04 0.152,0.069 0.221,0.104 7.339,3.338 15.583,5.197 24.336,5.266 18.56,-0.15 34.975998,-9.232 45.089998,-23.131002 0.207,-0.287 10.39,-15.017 10.39,-32.353 z" />
    <path d="m 205.68599,92.711058 c 0,0 10.308,-13.164 10.347,-30.692 0.082,-34.423 -24.031,-56.639 -57.67,-56.689 -19.488,-0.03 -37.455,10.335 -46.656,22.771 -8.184,11.064 -9.533,20.282 -9.533,26.987 -0.388,8.342 0.432,12.287 0.432,12.287 1.188,8.686 4.56,17.23 9.737,24.682 l 0,0 c 9.797,14.107002 26.064,24.330002 46.213,24.330002 13.372,0.002 22.831,-6.279 24.54,-7.187 l 3.544,4.104 34.252,0 -15.206,-20.593002 z m -20.851,-24.155 -2.924,-3.593 -34.748,0 14.127,20.052 c -14.7,2.881 -28.594,-9.61 -28.391,-23.918 0.206,-14.619 12.004,-25.477 26.112,-25.382 15.488,0.098 30.938,16.889 25.824,32.841 z" />
  </svg>
);

const VanityFairLogo = () => (
  <svg viewBox="0 0 200 40" className="h-7 w-auto fill-current">
    <text x="0" y="28" fontSize="22" fontWeight="normal" fontFamily="Georgia, serif" letterSpacing="3">VANITY FAIR</text>
  </svg>
);

const LOGO_MAP: Record<string, React.FC> = {
  forbes: ForbesLogo,
  motorpasion: MotorpasionLogo,
  gq: GQLogo,
  vanityfair: VanityFairLogo,
};

const TextLogo = ({ name }: { name: string }) => (
  <svg viewBox="0 0 220 40" className="h-7 w-auto fill-current">
    <text x="0" y="28" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="2">
      {name.toUpperCase()}
    </text>
  </svg>
);

interface PressMention {
  id: string;
  name: string;
  quote: string;
  logo_key: string | null;
  is_active: boolean;
  sort_order: number;
}

interface PressSectionProps {
  standalone?: boolean;
}

const PressSection = ({ standalone = true }: PressSectionProps) => {
  const [items, setItems] = useState<PressMention[] | null>(null);
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const [{ data: settings }, { data: mentions }] = await Promise.all([
        supabase.from("app_settings" as any).select("value").eq("key", "press_section_enabled").maybeSingle(),
        supabase.from("press_mentions" as any).select("*").eq("is_active", true).order("sort_order", { ascending: true }),
      ]);
      setEnabled((settings as any)?.value !== "false");
      setItems((mentions as any) || []);
    })();
  }, []);

  if (items === null) return null;
  if (!enabled || items.length === 0) return null;

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
        {items.map((press, index) => {
          const Logo = press.logo_key ? LOGO_MAP[press.logo_key] : undefined;
          return (
            <motion.div
              key={press.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-background/50 rounded-2xl p-6 border border-border/30 hover:border-champagne/30 transition-all duration-300 hover:bg-background/70 flex flex-col items-center text-center"
            >
              <div className="h-12 flex items-center justify-center mb-6 text-foreground/60 group-hover:text-foreground transition-colors duration-300">
                {Logo ? <Logo /> : <TextLogo name={press.name} />}
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                "{press.quote}"
              </p>
            </motion.div>
          );
        })}
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
