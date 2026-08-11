import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CONSENT_OPEN_EVENT,
  type ConsentCategories,
  getStoredConsent,
  saveConsent,
} from "@/lib/consent";

const DEFAULT: ConsentCategories = {
  analytics: false,
  marketing: false,
  personalization: false,
};

const CookieBanner = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [prefs, setPrefs] = useState<ConsentCategories>(DEFAULT);

  // Boot: show banner only if no consent stored
  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setShowBanner(true);
    } else {
      setPrefs({
        analytics: stored.analytics,
        marketing: stored.marketing,
        personalization: stored.personalization,
      });
    }
  }, []);

  // Allow Footer link to reopen the panel anywhere
  useEffect(() => {
    const handler = () => {
      const stored = getStoredConsent();
      if (stored) {
        setPrefs({
          analytics: stored.analytics,
          marketing: stored.marketing,
          personalization: stored.personalization,
        });
      }
      setShowConfig(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, handler);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, handler);
  }, []);

  const persist = async (next: ConsentCategories) => {
    setPrefs(next);
    setShowBanner(false);
    setShowConfig(false);
    await saveConsent(next);
  };

  const handleAcceptAll = () =>
    persist({ analytics: true, marketing: true, personalization: true });

  const handleRejectAll = () =>
    persist({ analytics: false, marketing: false, personalization: false });

  const handleSave = () => persist(prefs);

  return (
    <>
      {/* ============ BANNER ============ */}
      {showBanner && !showConfig && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-4 sm:pb-4 md:bottom-6 pointer-events-none"
        >
          <div
            className="
              pointer-events-auto mx-auto w-full max-w-[900px]
              bg-card/95 supports-[backdrop-filter]:bg-card/80 backdrop-blur-md
              border border-border rounded-2xl shadow-2xl
              p-5 sm:p-6
              animate-in slide-in-from-bottom-4 fade-in duration-300
              pb-[max(1.25rem,env(safe-area-inset-bottom))]
            "
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="hidden sm:flex w-10 h-10 shrink-0 rounded-xl bg-primary/10 border border-primary/20 items-center justify-center">
                <Cookie className="w-5 h-5 text-primary" />
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="text-base sm:text-lg font-semibold text-foreground">
                  Tu privacidad es importante
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {t("cookie.text")}{" "}
                  <Link
                    to="/politica-de-cookies"
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    {t("footer.cookies")}
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Mobile order: Aceptar > Configurar > Rechazar (per spec) */}
              <Button
                onClick={handleAcceptAll}
                aria-label="Aceptar todas las cookies"
                className="order-1 sm:order-3 w-full min-h-11"
              >
                {t("cookie.accept")}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowConfig(true)}
                aria-label="Configurar preferencias de cookies"
                className="order-2 w-full min-h-11"
              >
                Configurar
              </Button>
              <Button
                variant="outline"
                onClick={handleRejectAll}
                aria-label="Rechazar todas las cookies opcionales"
                className="order-3 sm:order-1 w-full min-h-11"
              >
                {t("cookie.reject")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============ CONFIG PANEL ============ */}
      <Dialog open={showConfig} onOpenChange={setShowConfig}>
        <DialogContent
          className="
            sm:max-w-lg p-0 gap-0 overflow-hidden
            data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-8
            max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:right-0
            max-sm:translate-x-0 max-sm:translate-y-0
            max-sm:rounded-b-none max-sm:rounded-t-2xl
            max-sm:max-h-[85vh] max-sm:w-full
          "
        >
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
            <DialogTitle className="text-xl">Preferencias de cookies</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Selecciona qué tipo de cookies quieres permitir. Tu elección se guarda y
              puedes modificarla cuando quieras desde el pie de página.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-5 space-y-4 overflow-y-auto max-h-[55vh]">
            <CategoryRow
              id="cookies-tecnicas"
              title="Cookies técnicas"
              description="Imprescindibles para el funcionamiento del sitio (sesión, seguridad, navegación). No se pueden desactivar."
              checked
              disabled
              required
            />
            <CategoryRow
              id="cookies-analiticas"
              title="Cookies analíticas"
              description="Nos ayudan a entender cómo se usa el sitio mediante Google Analytics y PostHog. Datos anonimizados y agregados."
              checked={prefs.analytics}
              onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
            />
            <CategoryRow
              id="cookies-marketing"
              title="Cookies de marketing"
              description="Permiten mostrar anuncios y contenidos más relevantes en función de tus intereses."
              checked={prefs.marketing}
              onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
            />
            <CategoryRow
              id="cookies-personalizacion"
              title="Cookies de personalización"
              description="Recuerdan tus preferencias (idioma, ciudad, vehículos vistos) para una experiencia adaptada."
              checked={prefs.personalization}
              onChange={(v) => setPrefs((p) => ({ ...p, personalization: v }))}
            />
          </div>

          <DialogFooter
            className="
              px-6 py-4 border-t border-border bg-background/40
              flex-col-reverse sm:flex-row gap-2 sm:gap-2
              pb-[max(1rem,env(safe-area-inset-bottom))]
            "
          >
            <Button
              variant="outline"
              onClick={handleRejectAll}
              className="w-full sm:w-auto min-h-11"
              aria-label="Rechazar todas las cookies opcionales"
            >
              Rechazar todo
            </Button>
            <Button
              variant="ghost"
              onClick={handleAcceptAll}
              className="w-full sm:w-auto min-h-11"
              aria-label="Aceptar todas las cookies"
            >
              Aceptar todo
            </Button>
            <Button
              onClick={handleSave}
              className="w-full sm:w-auto min-h-11"
              aria-label="Guardar mis preferencias de cookies"
            >
              Guardar preferencias
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

function CategoryRow({
  id,
  title,
  description,
  checked,
  onChange,
  disabled,
  required,
}: {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border/60 bg-card/40 p-4">
      <div className="flex-1 min-w-0">
        <Label htmlFor={id} className="text-sm font-semibold text-foreground cursor-pointer">
          {title}
          {required && (
            <span className="ml-2 text-[10px] uppercase tracking-wide text-primary">
              Siempre activas
            </span>
          )}
        </Label>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onChange}
        aria-label={`Activar ${title}`}
      />
    </div>
  );
}

export default CookieBanner;
