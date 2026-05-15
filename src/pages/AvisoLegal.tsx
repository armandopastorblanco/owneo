import { useEffect } from "react";
import LegalLayout from "@/components/LegalLayout";

const AvisoLegal = () => {
  useEffect(() => {
    document.title = "Aviso Legal | OWNEO";
  }, []);

  return (
    <LegalLayout title="Aviso Legal">
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
        El presente Aviso Legal regula el acceso y uso del sitio web www.owneo.es (en adelante,
        "el Sitio Web"), del que es titular OWNEO SL (en adelante, "la Empresa"). El acceso al
        Sitio Web y la utilización de sus contenidos y servicios implica la aceptación plena y
        sin reservas de todas las disposiciones recogidas en el presente Aviso Legal.
      </p>
      <p>
        La Empresa se reserva el derecho a modificar, en cualquier momento y sin previo aviso,
        la presentación, configuración y contenido del Sitio Web, así como las condiciones
        requeridas para su acceso y/o utilización.
      </p>

      <h2>III. Condiciones de acceso y uso</h2>
      <p>
        El acceso al Sitio Web es gratuito y no requiere suscripción previa, salvo en aquellas
        secciones o servicios que así lo indiquen expresamente. El usuario se compromete a hacer
        un uso adecuado y lícito del Sitio Web, de conformidad con la legislación vigente, el
        presente Aviso Legal y las demás condiciones que pudieran ser de aplicación.
      </p>
      <p>
        El usuario se obliga expresamente a no utilizar el Sitio Web con fines ilícitos o
        contrarios a la buena fe, y a no realizar ninguna acción que pudiera dañar, inutilizar,
        sobrecargar o deteriorar el Sitio Web o impedir su normal utilización por otros usuarios.
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
        El Sitio Web puede contener enlaces a sitios web de terceros. OWNEO SL no asume ninguna
        responsabilidad derivada de los contenidos, informaciones, comunicaciones, opiniones o
        servicios proporcionados por los sitios enlazados, que tendrán sus propias políticas de
        privacidad y condiciones de uso.
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
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
      </p>

      <h2>IX. Contacto</h2>
      <p>
        Para cualquier consulta relativa al presente Aviso Legal:{" "}
        <a href="mailto:info@owneo.es">info@owneo.es</a>
      </p>
    </LegalLayout>
  );
};

export default AvisoLegal;
