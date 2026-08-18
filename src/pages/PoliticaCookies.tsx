import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import LegalLayout from "@/components/LegalLayout";
import { openConsentManager } from "@/lib/consent";

const PoliticaCookies = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.title = i18n.language === "en" ? "Cookie Policy | OWNEO" : "Política de Cookies | OWNEO";
  }, [i18n.language]);

  return (
    <LegalLayout title={i18n.language === "en" ? "Cookie Policy" : "Política de Cookies"}>
      {i18n.language === "en" ? (
        <>
          <h2>I. What are cookies?</h2>
          <p>
            Cookies are small text files stored on the user's device when visiting a website. They allow the site to remember actions and preferences over a set period of time.
          </p>

          <h2>II. Types of cookies we use</h2>

          <h3>Technical cookies (necessary)</h3>
          <p>
            No consent required. They are essential for the website to function and cannot be deactivated. They include session, authentication and basic user preference cookies.
            <br />
            <strong>Duration:</strong> session or up to 12 months.
          </p>

          <h3>Analytics cookies</h3>
          <p>
            Used to understand how users interact with the website. They help us improve its performance and content.
          </p>
          <ul>
            <li>
              <strong>Google Analytics</strong> (Google LLC): traffic and browsing behaviour analysis.{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Policy</a>
            </li>
            <li>
              <strong>PostHog</strong> (PostHog, Inc.): product and user behaviour analytics.{" "}
              <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">Policy</a>
            </li>
          </ul>
          <p><strong>Duration:</strong> up to 13 months.</p>

          <h3>Marketing cookies</h3>
          <p>
            Used to display relevant advertising and measure the effectiveness of advertising campaigns.
            <br />
            <strong>Duration:</strong> up to 12 months.
          </p>

          <h3>Personalisation cookies</h3>
          <p>
            Allow user preferences to be remembered to offer a personalised experience.
            <br />
            <strong>Duration:</strong> up to 12 months.
          </p>

          <h2>III. How to manage cookies</h2>
          <p>
            You can manage your cookie preferences at any time by clicking "Manage cookie preferences" in the footer of the website.
          </p>
          <div className="my-6">
            <Button
              onClick={openConsentManager}
              aria-label="Open cookie preferences manager"
              className="min-h-11"
            >
              Manage cookie preferences
            </Button>
          </div>
          <p>You can also configure your browser to block or delete cookies:</p>
          <ul>
            <li><strong>Google Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies</li>
            <li><strong>Mozilla Firefox:</strong> Options &gt; Privacy and security</li>
            <li><strong>Safari:</strong> Preferences &gt; Privacy</li>
            <li><strong>Microsoft Edge:</strong> Settings &gt; Privacy, search and services</li>
          </ul>
          <p>Please note that blocking technical cookies may affect the website's functionality.</p>

          <h2>IV. Third-party cookies</h2>
          <p>Third parties whose services we use and who may install cookies are:</p>
          <ul>
            <li>
              <strong>Google LLC</strong> —{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Policy</a>
            </li>
            <li>
              <strong>PostHog, Inc.</strong> —{" "}
              <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">Policy</a>
            </li>
            <li>
              <strong>Stripe, Inc.</strong> (payments) —{" "}
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Policy</a>
            </li>
          </ul>

          <h2>V. Policy updates</h2>
          <p>
            OWNEO SL reserves the right to modify this Cookie Policy to adapt it to legislative or technical changes. Periodic consultation is recommended.
          </p>

          <h2>VI. Contact</h2>
          <p>
            For any query: <a href="mailto:info@owneo.es">info@owneo.es</a>
          </p>
        </>
      ) : (
        <>
          <h2>I. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario cuando visita un sitio web. Permiten al sitio recordar sus acciones y preferencias durante un período de tiempo determinado.
          </p>

          <h2>II. Tipos de cookies que utilizamos</h2>

          <h3>Cookies técnicas (necesarias)</h3>
          <p>
            No requieren consentimiento. Son imprescindibles para el funcionamiento del sitio web y no pueden desactivarse. Incluyen cookies de sesión, autenticación y preferencias básicas del usuario.
            <br />
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
            Utilizadas para mostrar publicidad relevante y medir la eficacia de las campañas publicitarias.
            <br />
            <strong>Duración:</strong> hasta 12 meses.
          </p>

          <h3>Cookies de personalización</h3>
          <p>
            Permiten recordar las preferencias del usuario para ofrecer una experiencia personalizada.
            <br />
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
        </>
      )}
    </LegalLayout>
  );
};

export default PoliticaCookies;
