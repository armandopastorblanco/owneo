import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import LegalLayout from "@/components/LegalLayout";
import { openConsentManager } from "@/lib/consent";

const PoliticaCookies = () => {
  useEffect(() => {
    document.title = "Política de Cookies | OWNEO";
  }, []);

  return (
    <LegalLayout title="Política de Cookies">
      <h2>I. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario cuando visita un sitio web. Permiten al sitio recordar sus acciones y preferencias durante un período de tiempo determinado.
      </p>

      <h2>II. Tipos de cookies que utilizamos</h2>

      <h3>Cookies técnicas (necesarias)</h3>
      <p>
        No requieren consentimiento. Son imprescindibles para el funcionamiento del sitio web y no pueden desactivarse. Incluyen cookies de sesión, autenticación y preferencias básicas del usuario.<br />
        <strong>Duración:</strong> sesión o hasta 12 meses.
      </p>

      <h3>Cookies analíticas</h3>
      <p>
        Utilizadas para entender cómo los usuarios interactúan con el sitio web. Nos permiten mejorar su funcionamiento y contenido.
      </p>
      <ul>
        <li>
          <strong>Google Analytics</strong> (Google LLC): análisis de tráfico y comportamiento de navegación.{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Política</a>
        </li>
        <li>
          <strong>PostHog</strong> (PostHog, Inc.): analítica de producto y comportamiento de usuario.{" "}
          <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">Política</a>
        </li>
      </ul>
      <p><strong>Duración:</strong> hasta 13 meses.</p>

      <h3>Cookies de marketing</h3>
      <p>
        Utilizadas para mostrar publicidad relevante y medir la eficacia de las campañas publicitarias.<br />
        <strong>Duración:</strong> hasta 12 meses.
      </p>

      <h3>Cookies de personalización</h3>
      <p>
        Permiten recordar las preferencias del usuario para ofrecer una experiencia personalizada.<br />
        <strong>Duración:</strong> hasta 12 meses.
      </p>

      <h2>III. Cómo gestionar las cookies</h2>
      <p>
        Puede gestionar sus preferencias de cookies en cualquier momento haciendo clic en "Gestionar preferencias de cookies" en el pie de página del sitio web.
      </p>
      <div className="my-6">
        <Button
          onClick={openConsentManager}
          aria-label="Abrir gestor de preferencias de cookies"
          className="min-h-11"
        >
          Gestionar preferencias de cookies
        </Button>
      </div>
      <p>También puede configurar su navegador para bloquear o eliminar cookies:</p>
      <ul>
        <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies</li>
        <li><strong>Mozilla Firefox:</strong> Opciones &gt; Privacidad y seguridad</li>
        <li><strong>Safari:</strong> Preferencias &gt; Privacidad</li>
        <li><strong>Microsoft Edge:</strong> Configuración &gt; Privacidad, búsqueda y servicios</li>
      </ul>
      <p>Tenga en cuenta que bloquear las cookies técnicas puede afectar al funcionamiento del sitio web.</p>

      <h2>IV. Cookies de terceros</h2>
      <p>Los terceros cuyos servicios utilizamos y que pueden instalar cookies son:</p>
      <ul>
        <li>
          <strong>Google LLC</strong> —{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Política</a>
        </li>
        <li>
          <strong>PostHog, Inc.</strong> —{" "}
          <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">Política</a>
        </li>
        <li>
          <strong>Stripe, Inc.</strong> (pagos) —{" "}
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Política</a>
        </li>
      </ul>

      <h2>V. Actualizaciones de la política</h2>
      <p>
        OWNEO SL se reserva el derecho a modificar esta Política de Cookies para adaptarla a cambios legislativos o técnicos. Se recomienda consultarla periódicamente.
      </p>

      <h2>VI. Contacto</h2>
      <p>
        Para cualquier consulta: <a href="mailto:info@owneo.es">info@owneo.es</a>
      </p>
    </LegalLayout>
  );
};

export default PoliticaCookies;
