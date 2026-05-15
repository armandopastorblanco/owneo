import { useEffect } from "react";
import LegalLayout from "@/components/LegalLayout";

const PoliticaPrivacidad = () => {
  useEffect(() => {
    document.title = "Política de Privacidad | OWNEO";
  }, []);

  return (
    <LegalLayout title="Política de Privacidad">
      <h2>I. Responsable del tratamiento</h2>
      <p>
        En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y de la Ley Orgánica 3/2018 (LOPDGDD):
      </p>
      <ul>
        <li><strong>Responsable:</strong> OWNEO SL</li>
        <li><strong>NIF:</strong> B23965932</li>
        <li><strong>Domicilio:</strong> Avenida Aguilera, núm. 23, 03007 Alicante (Alicante), España</li>
        <li><strong>Correo electrónico:</strong> <a href="mailto:info@owneo.es">info@owneo.es</a></li>
        <li><strong>Sitio web:</strong> www.owneo.es</li>
      </ul>

      <h2>II. Datos personales que tratamos</h2>
      <h3>Datos de identificación y contacto</h3>
      <p>Nombre y apellidos, dirección de correo electrónico, número de teléfono, dirección postal y URL del perfil de LinkedIn.</p>

      <h3>Datos de verificación de conductores</h3>
      <p>Número de permiso de conducir, copia del documento nacional de identidad o pasaporte, attestación de seguro de responsabilidad civil y datos bancarios (IBAN) para la gestión de pagos y devoluciones.</p>

      <h3>Datos de cuenta de usuario</h3>
      <p>Credenciales de acceso (correo electrónico y contraseña cifrada), historial de reservas y preferencias de uso.</p>

      <h3>Datos de pago</h3>
      <p>Gestionados a través de la plataforma de pago seguro Stripe, Inc., o mediante transferencia bancaria. OWNEO SL no almacena datos completos de tarjetas de crédito o débito; dicho tratamiento es realizado íntegramente por Stripe conforme a los estándares PCI-DSS.</p>

      <h3>Datos de navegación y uso</h3>
      <p>Dirección IP, tipo de navegador, páginas visitadas, duración de la sesión y comportamiento de navegación, a través de Google Analytics y PostHog.</p>

      <h3>Datos de geolocalización del vehículo</h3>
      <p>Obtenidos a través del sistema de seguimiento GPS instalado en los vehículos de la flota de OWNEO SL. En ningún caso se realiza geolocalización del usuario.</p>

      <h3>Datos de comunicaciones comerciales</h3>
      <p>Dirección de correo electrónico y preferencias de comunicación, utilizados para el envío de comunicaciones informativas y promocionales, previa obtención del consentimiento.</p>

      <h2>III. Finalidades, bases jurídicas y plazos</h2>

      <h3>Gestión del registro y cuenta de usuario</h3>
      <p><strong>Base jurídica:</strong> Ejecución de un contrato (art. 6.1.b RGPD).<br /><strong>Plazo:</strong> Mientras la cuenta esté activa + 5 años tras su cancelación.</p>

      <h3>Gestión de reservas y prestación del servicio</h3>
      <p><strong>Base jurídica:</strong> Ejecución de un contrato (art. 6.1.b RGPD).<br /><strong>Plazo:</strong> 5 años desde la finalización del contrato.</p>

      <h3>Verificación de conductores y gestión de seguros</h3>
      <p><strong>Base jurídica:</strong> Obligación legal + ejecución de contrato (art. 6.1.b y 6.1.c RGPD).<br /><strong>Plazo:</strong> Durante la vigencia del contrato + 10 años (normativa de seguros).</p>

      <h3>Gestión de pagos y facturación</h3>
      <p><strong>Base jurídica:</strong> Ejecución de un contrato + obligación legal (art. 6.1.b y 6.1.c RGPD).<br /><strong>Plazo:</strong> 5 años (Ley General Tributaria).</p>

      <h3>Geolocalización del vehículo</h3>
      <p><strong>Base jurídica:</strong> Interés legítimo — seguridad y control operativo (art. 6.1.f RGPD).<br /><strong>Plazo:</strong> 30 días desde la finalización de la reserva.</p>

      <h3>Analítica web (Google Analytics, PostHog)</h3>
      <p><strong>Base jurídica:</strong> Consentimiento (art. 6.1.a RGPD).<br /><strong>Plazo:</strong> Máximo 13 meses (datos agregados hasta 25 meses).</p>

      <h3>Envío de comunicaciones comerciales</h3>
      <p><strong>Base jurídica:</strong> Consentimiento (art. 6.1.a RGPD).<br /><strong>Plazo:</strong> Hasta la retirada del consentimiento.</p>

      <h3>Atención al cliente y gestión de consultas</h3>
      <p><strong>Base jurídica:</strong> Interés legítimo (art. 6.1.f RGPD).<br /><strong>Plazo:</strong> 2 años desde la última comunicación.</p>

      <h2>IV. Destinatarios y transferencias internacionales</h2>
      <p>Los datos personales podrán ser comunicados a:</p>
      <ul>
        <li><strong>Supabase, Inc.</strong> — Base de datos e infraestructura técnica. Datos almacenados en servidores en la Unión Europea (Frankfurt, Alemania).</li>
        <li><strong>Stripe, Inc.</strong> — Plataforma de gestión de pagos. Transferencia cubierta por Cláusulas Contractuales Tipo y Data Privacy Framework UE-EE.UU.</li>
        <li><strong>Google LLC (Google Analytics)</strong> — Servicio de analítica web. Transferencia cubierta por Data Privacy Framework UE-EE.UU.</li>
        <li><strong>PostHog, Inc.</strong> — Plataforma de analítica de producto. Transferencia cubierta por Cláusulas Contractuales Tipo.</li>
        <li><strong>Proveedor de servicios de correo electrónico</strong> — Para el envío de comunicaciones transaccionales y comerciales.</li>
        <li>Agencia Estatal de Administración Tributaria (AEAT), compañías aseguradoras y Fuerzas y Cuerpos de Seguridad del Estado cuando así lo requiera la normativa vigente.</li>
      </ul>
      <p>OWNEO SL no cederá datos a terceros con fines comerciales propios sin consentimiento previo y expreso del interesado.</p>

      <h2>V. Derechos de los usuarios</h2>
      <p>El usuario tiene derecho a:</p>
      <ul>
        <li><strong>Acceso:</strong> obtener confirmación sobre el tratamiento de sus datos.</li>
        <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
        <li><strong>Supresión:</strong> eliminar sus datos cuando ya no sean necesarios.</li>
        <li><strong>Oposición:</strong> oponerse al tratamiento, especialmente para marketing directo.</li>
        <li><strong>Limitación:</strong> suspender el tratamiento en determinadas circunstancias.</li>
        <li><strong>Portabilidad:</strong> recibir sus datos en formato estructurado.</li>
        <li><strong>Retirada del consentimiento:</strong> en cualquier momento, sin efecto retroactivo.</li>
      </ul>
      <p>
        Para ejercer estos derechos:{" "}
        <a href="mailto:info@owneo.es?subject=Ejercicio%20de%20derechos%20RGPD">info@owneo.es</a>{" "}
        con asunto "Ejercicio de derechos RGPD" adjuntando copia de documento de identidad. Respuesta en máximo 1 mes.
      </p>
      <p>
        Derecho a reclamar ante la AEPD:{" "}
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>
      </p>

      <h2>VI. Menores de edad</h2>
      <p>
        El servicio está destinado a titulares de permiso de conducir en vigor. Si OWNEO SL detecta datos de menores de 18 años sin consentimiento parental, los eliminará inmediatamente. Comunicar cualquier incidencia a <a href="mailto:info@owneo.es">info@owneo.es</a>.
      </p>

      <h2>VII. Medidas de seguridad</h2>
      <p>
        OWNEO SL ha adoptado medidas técnicas y organizativas para garantizar la seguridad de los datos: cifrado en tránsito y en reposo, control de acceso basado en roles, autenticación reforzada y copias de seguridad periódicas.
      </p>
      <p>
        En caso de violación de seguridad, OWNEO SL lo notificará a la AEPD en máximo 72 horas y a los interesados afectados sin dilación indebida, conforme a los artículos 33 y 34 del RGPD.
      </p>

      <h2>VIII. Cookies</h2>
      <p>
        El Sitio Web utiliza cookies propias y de terceros. Consulte nuestra{" "}
        <a href="/politica-de-cookies">Política de Cookies</a> disponible en el pie de página del Sitio Web.
      </p>

      <h2>IX. Modificaciones</h2>
      <p>
        OWNEO SL se reserva el derecho a modificar esta Política de Privacidad. En caso de modificaciones sustanciales, el usuario será informado a través del Sitio Web o por correo electrónico.
      </p>

      <h2>X. Contacto</h2>
      <p>
        <strong>Correo electrónico:</strong> <a href="mailto:info@owneo.es">info@owneo.es</a><br />
        <strong>Dirección postal:</strong> Avenida Aguilera, núm. 23, 03007 Alicante (Alicante), España
      </p>
    </LegalLayout>
  );
};

export default PoliticaPrivacidad;
