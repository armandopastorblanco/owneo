import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import owneoLogo from "@/assets/owneo-logo.png";

const STORAGE_KEY = "owneo_beta_access";
const BETA_PASSWORD = "TURBO";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const hasValidAccess = (): boolean => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const expiresAt = parseInt(raw, 10);
    if (!Number.isFinite(expiresAt)) return false;
    if (Date.now() > expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

const BetaGate = ({ children }: { children: ReactNode }) => {
  const [unlocked, setUnlocked] = useState<boolean>(() => hasValidAccess());
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [reqName, setReqName] = useState("");
  const [reqEmail, setReqEmail] = useState("");
  const [reqMessage, setReqMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setUnlocked(hasValidAccess());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toUpperCase() === BETA_PASSWORD) {
      try {
        localStorage.setItem(STORAGE_KEY, String(Date.now() + THIRTY_DAYS_MS));
      } catch {
        // ignore
      }
      setError(false);
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqName || !reqEmail || !reqMessage) {
      toast.error("Completa todos los campos.");
      return;
    }
    setSubmitting(true);
    try {
      const { error: insertError } = await supabase
        .from("consultation_requests")
        .insert({
          name: reqName,
          email: reqEmail,
          message: reqMessage,
          subject: "Solicitud de acceso beta",
          source: "beta_gate",
          status: "pending",
        } as any);
      if (insertError) throw insertError;

      supabase.functions
        .invoke("send-contact-notification", {
          body: {
            name: reqName,
            email: reqEmail,
            subject: "Solicitud de acceso beta",
            message: reqMessage,
          },
        })
        .catch((err) => console.error("send-contact-notification:", err));

      toast.success("Solicitud enviada. Te contactaremos pronto.");
      setReqName("");
      setReqEmail("");
      setReqMessage("");
      setRequestOpen(false);
    } catch (err: any) {
      toast.error(err.message || "No se pudo enviar la solicitud.");
    } finally {
      setSubmitting(false);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div
      className="relative bg-background flex items-center justify-center px-5 sm:px-6 overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/181536-866999858.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {/* Dark overlay + subtle gradient for legibility on mobile */}
      <div className="absolute inset-0 bg-black/55 z-10" aria-hidden="true" />
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/70 sm:hidden"
        aria-hidden="true"
      />

      <div
        className="relative z-20 w-full max-w-sm flex flex-col items-center py-10 sm:py-12"
        style={{
          paddingTop: "max(2.5rem, env(safe-area-inset-top))",
          paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
        }}
      >
        <img
          src={owneoLogo}
          alt="Owneo"
          className="h-12 sm:h-16 w-auto mb-8 sm:mb-10 mix-blend-screen"
        />
        <h1 className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-champagne mb-2">
          Beta privada
        </h1>
        <p className="text-[13px] sm:text-sm text-muted-foreground mb-3 text-center font-extralight px-2">
          Introduce la contraseña de acceso
        </p>
        <button
          type="button"
          onClick={() => setRequestOpen(true)}
          className="mb-8 min-h-[44px] px-2 text-[11px] uppercase tracking-[0.3em] text-champagne/80 active:text-champagne hover:text-champagne font-extralight transition-colors underline-offset-4 hover:underline"
        >
          Solicitar acceso
        </button>

        <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-5">
          <div className="space-y-2">
            <Label htmlFor="beta-password" className="sr-only">
              Contraseña
            </Label>
            <Input
              id="beta-password"
              type="password"
              autoComplete="current-password"
              inputMode="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Contraseña"
              className="h-14 sm:h-12 text-base sm:text-sm text-center tracking-widest bg-black/30 sm:bg-transparent backdrop-blur-sm border-champagne/30 focus-visible:border-champagne focus-visible:ring-0"
            />
            {error && (
              <p className="text-xs text-center text-destructive font-extralight">
                Contraseña incorrecta
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-14 sm:h-12 bg-champagne text-background hover:bg-champagne/90 active:bg-champagne/90 tracking-[0.2em] uppercase text-xs font-light"
          >
            Entrar
          </Button>
        </form>

        <p className="mt-8 sm:mt-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center">
          Owneo · Acceso privado
        </p>
      </div>

      <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
        <DialogContent className="bg-background/95 backdrop-blur-md border-champagne/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xs uppercase tracking-[0.35em] text-champagne font-extralight">
              Solicitar acceso
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground font-extralight">
              Déjanos tus datos y te enviaremos un acceso a la beta privada.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRequestSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="req-name" className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-extralight">
                Nombre completo
              </Label>
              <Input
                id="req-name"
                value={reqName}
                onChange={(e) => setReqName(e.target.value)}
                className="h-11 bg-transparent border-champagne/30 focus-visible:border-champagne focus-visible:ring-0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="req-email" className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-extralight">
                Email
              </Label>
              <Input
                id="req-email"
                type="email"
                value={reqEmail}
                onChange={(e) => setReqEmail(e.target.value)}
                className="h-11 bg-transparent border-champagne/30 focus-visible:border-champagne focus-visible:ring-0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="req-message" className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-extralight">
                Mensaje
              </Label>
              <Textarea
                id="req-message"
                rows={3}
                value={reqMessage}
                onChange={(e) => setReqMessage(e.target.value)}
                className="bg-transparent border-champagne/30 focus-visible:border-champagne focus-visible:ring-0"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-12 bg-champagne text-background hover:bg-champagne/90 tracking-[0.2em] uppercase text-xs font-light"
            >
              {submitting ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BetaGate;
