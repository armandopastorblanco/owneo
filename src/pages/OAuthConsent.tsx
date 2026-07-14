import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

// Local typed wrapper for the beta supabase.auth.oauth namespace.
type OAuthDetails = {
  client?: { name?: string; client_uri?: string; redirect_uris?: string[] };
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: OAuthDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: OAuthDetails | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: OAuthDetails | null; error: { message: string } | null }>;
};
const oauth = (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Falta el identificador de autorización.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?redirect=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("El servidor de autorización no devolvió una URL de redirección.");
      return;
    }
    window.location.href = target;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold">No se pudo cargar la autorización</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }
  if (!details) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const clientName = details.client?.name ?? "una aplicación externa";
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-widest text-champagne">Autorización de acceso</p>
          <h1 className="text-3xl font-bold tracking-tight">Conectar {clientName} a Owneo</h1>
          <p className="text-muted-foreground">
            {clientName} podrá utilizar las herramientas de Owneo actuando en tu nombre mientras estés conectado.
          </p>
        </div>

        <div className="rounded-lg border border-border/50 bg-card p-5 text-sm space-y-2">
          <p className="font-medium">Permisos concedidos</p>
          <ul className="text-muted-foreground list-disc list-inside space-y-1">
            <li>Leer el catálogo público de coches y ciudades de Owneo.</li>
            <li>Consultar tus participaciones y reservas.</li>
          </ul>
          <p className="text-xs text-muted-foreground pt-2">
            Esto no evita las políticas de seguridad de Owneo: solo verás datos a los que ya tienes acceso.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            className="w-full bg-champagne text-champagne-foreground hover:bg-champagne/90"
            disabled={busy}
            onClick={() => decide(true)}
          >
            {busy ? "Procesando…" : "Aprobar y conectar"}
          </Button>
          <Button variant="outline" className="w-full" disabled={busy} onClick={() => decide(false)}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OAuthConsent;
