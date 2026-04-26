import { motion, AnimatePresence } from "framer-motion";
import { X, Share, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import owneoLogo from "@/assets/owneo-logo.png";

interface PWAInstallPromptProps {
  show: boolean;
  isIOS: boolean;
  canInstallNatively: boolean;
  onInstall: () => void;
  onDismiss: () => void;
}

const PWAInstallPrompt = ({
  show,
  isIOS,
  canInstallNatively,
  onInstall,
  onDismiss,
}: PWAInstallPromptProps) => {
  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:hidden"
        >
          <div className="bg-card border border-border/60 rounded-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.3)] overflow-hidden">
            {/* Close button */}
            <button
              onClick={onDismiss}
              className="absolute top-3 right-3 p-2 text-muted-foreground hover:text-foreground transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-5">
              {/* App info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-background border border-border/40 flex-shrink-0">
                  <img
                    src={owneoLogo}
                    alt="OWNEO"
                    className="w-full h-full object-cover mix-blend-screen filter brightness-110"
                  />
                </div>
                <div>
                  <h3 className="text-foreground font-medium text-base tracking-wide">
                    OWNEO
                  </h3>
                  <p className="text-muted-foreground text-sm font-light">
                    Instala nuestra app para una mejor experiencia
                  </p>
                </div>
              </div>

              {isIOS && !canInstallNatively ? (
                /* iOS instructions */
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground font-light mb-3">
                    Para instalar en tu iPhone:
                  </p>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 bg-background/60 rounded-xl px-4 py-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Share className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm text-foreground/80">
                        <span className="font-medium">1.</span> Pulsa el botón{" "}
                        <span className="font-medium">Compartir</span>{" "}
                        <span className="text-muted-foreground">(cuadrado con flecha)</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-background/60 rounded-xl px-4 py-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Plus className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm text-foreground/80">
                        <span className="font-medium">2.</span> Selecciona{" "}
                        <span className="font-medium">"Añadir a pantalla de inicio"</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-background/60 rounded-xl px-4 py-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Download className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm text-foreground/80">
                        <span className="font-medium">3.</span> Pulsa{" "}
                        <span className="font-medium">"Añadir"</span>
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={onDismiss}
                    className="w-full mt-3 min-h-[48px] text-sm font-light tracking-wider border-border/40"
                  >
                    Entendido
                  </Button>
                </div>
              ) : (
                /* Android / Chrome install */
                <div className="flex gap-3">
                  <Button
                    onClick={onInstall}
                    className="flex-1 min-h-[48px] text-sm font-medium tracking-wider"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Instalar app
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onDismiss}
                    className="min-h-[48px] text-sm font-light tracking-wider border-border/40 px-5"
                  >
                    Ahora no
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
