import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  useEffect(() => {
    // Re-check on mount in case of multiple tabs
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

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col items-center">
        <img
          src={owneoLogo}
          alt="Owneo"
          className="h-16 w-auto mb-10 mix-blend-screen"
        />
        <h1 className="text-xs uppercase tracking-[0.35em] text-champagne mb-2">
          Beta privada
        </h1>
        <p className="text-sm text-muted-foreground mb-10 text-center font-extralight">
          Introduce la contraseña de acceso
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="space-y-2">
            <Label htmlFor="beta-password" className="sr-only">
              Contraseña
            </Label>
            <Input
              id="beta-password"
              type="password"
              autoFocus
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Contraseña"
              className="h-12 text-center tracking-widest bg-transparent border-champagne/30 focus-visible:border-champagne focus-visible:ring-0"
            />
            {error && (
              <p className="text-xs text-center text-destructive font-extralight">
                Contraseña incorrecta
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-champagne text-background hover:bg-champagne/90 tracking-[0.2em] uppercase text-xs font-light"
          >
            Entrar
          </Button>
        </form>

        <p className="mt-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Owneo · Acceso privado
        </p>
      </div>
    </div>
  );
};

export default BetaGate;
