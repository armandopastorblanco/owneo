import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import LegalLayout from "@/components/LegalLayout";

const AvisoLegal = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.title =
      i18n.language === "en"
        ? "Legal Notice | OWNEO"
        : "Aviso Legal | OWNEO";
  }, [i18n.language]);

  return (
    <LegalLayout title={i18n.language === "en" ? "Legal Notice" : "Aviso Legal"}>
      {i18n.language === "en" ? (
        <>
          <h2>I. Identity of the website owner</h2>
          <p>
            In compliance with Article 10 of Law 34/2002 of 11 July on Information Society
            Services and Electronic Commerce (LSSI-CE), the following identifying details are
            provided:
          </p>
          <ul>
            <li><strong>Company name:</strong> OWNEO SL</li>
            <li><strong>Tax ID (NIF):</strong> B23965932</li>
            <li><strong>Registered address:</strong> Avenida Aguilera, no. 23, 03007 Alicante (Alicante), Spain</li>
            <li><strong>Email:</strong> <a href="mailto:info@owneo.es">info@owneo.es</a></li>
            <li><strong>Website:</strong> www.owneo.es</li>
            <li><strong>Activity:</strong> Luxury vehicle co-sharing service</li>
            <li><strong>Registration:</strong> Limited Liability Company registered in the corresponding Commercial Registry</li>
          </ul>

          <h2>II. Purpose and scope</h2>
          <p>
            This Legal Notice governs access to and use of the website www.owneo.es
            (hereinafter, "the Website"), owned by OWNEO SL (hereinafter, "the Company"). Access
            to the Website and use of its content and services implies full and unreserved
            acceptance of all provisions set out in this Legal Notice.
          </p>
          <p>
            The Company reserves the right to modify, at any time and without prior notice, the
            presentation, configuration and content of the Website, as well as the conditions
            required for its access and/or use.
          </p>

          <h2>III. Conditions of access and use</h2>
          <p>
            Access to the Website is free of charge and does not require prior registration, except
            in those sections or services that expressly indicate otherwise. The user undertakes to
            make lawful and appropriate use of the Website in accordance with applicable
            legislation, this Legal Notice and any other applicable conditions.
          </p>
          <p>
            The user expressly undertakes not to use the Website for unlawful or bad-faith
            purposes, and not to carry out any action that could damage, disable, overload or
            deteriorate the Website or prevent its normal use by other users.
          </p>

          <h2>IV. Intellectual and industrial property</h2>
          <p>
            All content on the Website, including texts, photographs, graphics, images, icons,
            technology, software, links and other audiovisual or sound content, as well as its
            graphic design and source code, is the intellectual property of OWNEO SL or third
            parties, and no exploitation rights recognised by applicable law are assigned to the
            user.
          </p>
          <p>
            The trademarks, trade names or distinctive signs published on the Website belong to
            OWNEO SL or third parties. Any total or partial reproduction of the content without the
            express written authorisation of OWNEO SL is strictly prohibited.
          </p>

          <h2>V. Disclaimer of warranties and liability</h2>
          <p>
            OWNEO SL does not guarantee the availability and continuity of the Website's operation,
            nor shall it be liable for damages that may arise from the lack of availability,
            computer failures, telephone faults, disconnections, delays or blockages caused by
            deficiencies or overloads in telephone lines, the Internet or other electronic systems.
          </p>

          <h2>VI. Links to third-party websites</h2>
          <p>
            The Website may contain links to third-party websites. OWNEO SL assumes no
            responsibility for the content, information, communications, opinions or services
            provided by the linked sites, which will have their own privacy policies and
            conditions of use.
          </p>

          <h2>VII. Applicable law and jurisdiction</h2>
          <p>
            Relations between OWNEO SL and users of the Website shall be governed by Spanish law.
            For the resolution of any dispute, the parties submit to the Courts and Tribunals of the
            city of Alicante, expressly waiving any other jurisdiction that may apply, except where
            applicable law establishes a different mandatory jurisdiction.
          </p>

          <h2>VIII. Online dispute resolution</h2>
          <p>
            In accordance with Regulation (EU) No 524/2013, if the user is a consumer, we inform
            them of the existence of the European online dispute resolution platform:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>

          <h2>IX. Contact</h2>
          <p>
            For any query relating to this Legal Notice:{" "}
            <a href="mailto:info@owneo.es">info@owneo.es</a>
          </p>
        </>
      ) : (
        <>
          <h2>I. Datos identificativos del titular del sitio web</h2>
          <p>
            En cumplimiento de lo dispuesto en el artículo 10 de la Ley 34/2002, de 11 de julio,
            de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se
            ponen a disposición del usuario los siguientes datos identificativos:
          </p>
          <ul>
            <li><strong>Razón social:</strong> OWNEO SL</li>
            <li><strong>NIF:</strong> B23965932</li>
            <li><strong>Domicilio social:</strong> Avenida Aguilera, núm. 23, 03007 Alicante (Alicante), España</li>
            <li><strong>Correo electrónico:</strong> <a href="mailto:info@owneo.es">info@owneo.es</a></li>
            <li><strong>Sitio web:</strong> www.owneo.es</li>
            <li><strong>Actividad:</strong> Servicio de copartaje de vehículos de lujo</li>
            <li><strong>Inscripción registral:</strong> Sociedad de Responsabilidad Limitada inscrita en el Registro Mercantil correspondiente</li>
          </ul>

          <h2>II. Objeto y ámbito de aplicación</h2>
          <p>
            El presente Aviso Legal regula el acceso y uso del sitio web www.owneo.es (en
            adelante, "el Sitio Web"), del que es titular OWNEO SL (en adelante, "la Empresa"). El
            acceso al Sitio Web y la utilización de sus contenidos y servicios implica la
            aceptación plena y sin reservas de todas las disposiciones recogidas en el presente
            Aviso Legal.
          </p>
          <p>
            La Empresa se reserva el derecho a modificar, en cualquier momento y sin previo aviso,
            la presentación, configuración y contenido del Sitio Web, así como las condiciones
            requeridas para su acceso y/o utilización.
          </p>

          <h2>III. Condiciones de acceso y uso</h2>
          <p>
            El acceso al Sitio Web es gratuito y no requiere suscripción previa, salvo en aquellas
            secciones o servicios que así lo indiquen expresamente. El usuario se compromete a
            hacer un uso adecuado y lícito del Sitio Web, de conformidad con la legislación
            vigente, el presente Aviso Legal y las demás condiciones que pudieran ser de aplicación.
          </p>
          <p>
            El usuario se obliga expresamente a no utilizar el Sitio Web con fines ilícitos o
            contrarios a la buena fe, y a no realizar ninguna acción que pudiera dañar,
            inutilizar, sobrecargar o deteriorar el Sitio Web o impedir su normal utilización por
            otros usuarios.
          </p>

          <h2>IV. Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos del Sitio Web, incluyendo textos, fotografías, gráficos, imágenes,
            iconos, tecnología, software, enlaces y demás contenidos audiovisuales o sonoros, así
            como su diseño gráfico y código fuente, son propiedad intelectual de OWNEO SL o de
            terceros, sin que puedan entenderse cedidos al usuario ninguno de los derechos de
            explotación reconocidos por la normativa vigente.
          </p>
          <p>
            Las marcas, nombres comerciales o signos distintivos publicados en el Sitio Web son
            titularidad de OWNEO SL o de terceros. Queda expresamente prohibida la reproducción
            total o parcial de los contenidos sin la autorización expresa y por escrito de OWNEO SL.
          </p>

          <h2>V. Exclusión de garantías y responsabilidad</h2>
          <p>
            OWNEO SL no garantiza la disponibilidad y continuidad del funcionamiento del Sitio Web,
            ni será responsable por los daños y perjuicios que pudieran derivarse de la falta de
            disponibilidad, fallos informáticos, averías telefónicas, desconexiones, retrasos o
            bloqueos causados por deficiencias o sobrecargas en las líneas telefónicas, Internet o
            en otros sistemas electrónicos.
          </p>

          <h2>VI. Enlaces a sitios web de terceros</h2>
          <p>
            El Sitio Web puede contener enlaces a sitios web de terceros. OWNEO SL no asume
            ninguna responsabilidad derivada de los contenidos, informaciones, comunicaciones,
            opiniones o servicios proporcionados por los sitios enlazados, que tendrán sus propias
            políticas de privacidad y condiciones de uso.
          </p>

          <h2>VII. Legislación aplicable y jurisdicción</h2>
          <p>
            Las relaciones entre OWNEO SL y los usuarios del Sitio Web se regirán por la normativa
            española vigente. Para la resolución de cualquier controversia, las partes se someten a
            los Juzgados y Tribunales de la ciudad de Alicante, con renuncia expresa a cualquier
            otro fuero que pudiera corresponderles, salvo en los casos en que la normativa vigente
            establezca un fuero imperativo distinto.
          </p>

          <h2>VIII. Resolución de litigios en línea</h2>
          <p>
            De conformidad con el Reglamento (UE) n.º 524/2013, en caso de que el usuario tenga la
            condición de consumidor, le informamos de la existencia de la plataforma europea de
            resolución de litigios en línea:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>

          <h2>IX. Contacto</h2>
          <p>
            Para cualquier consulta relativa al presente Aviso Legal:{" "}
            <a href="mailto:info@owneo.es">info@owneo.es</a>
          </p>
        </>
      )}
    </LegalLayout>
  );
};

export default AvisoLegal;
