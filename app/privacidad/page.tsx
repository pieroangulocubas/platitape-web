import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo Platita.pe recopila, usa, conserva y protege los datos personales de sus usuarios, conforme a la Ley N.° 29733.",
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <LegalShell
      title="Política de Privacidad de Platita.pe"
      intro={
        <>
          <p>
            Esta Política de Privacidad describe cómo {COMPANY.razonSocial}{" "}
            (“Platita.pe”, “nosotros”) recopila, utiliza, conserva, comparte y
            protege los datos personales de las personas que se registran o
            navegan en la plataforma Platita.pe.
          </p>
          <p>
            El tratamiento de datos personales se realiza conforme a la Ley N.°
            29733, Ley de Protección de Datos Personales, su Reglamento (Decreto
            Supremo N.° 003-2013-JUS) y demás normas peruanas aplicables.
          </p>
        </>
      }
    >
      <h2>1. Responsable del tratamiento</h2>
      <p>
        <strong>{COMPANY.razonSocial}</strong>
        <br />
        RUC: {COMPANY.ruc}
        <br />
        Domicilio: {COMPANY.domicilio}
        <br />
        Correo para asuntos de datos personales:{" "}
        <a href={`mailto:${COMPANY.emailDatos}`}>{COMPANY.emailDatos}</a>
      </p>
      <p>
        Platita.pe es responsable de los bancos de datos personales que administra
        en el marco de la operación de su plataforma. Conforme a la normativa
        vigente, los bancos de datos personales denominados «Usuarios y Clientes»
        y «Prospectos Comerciales y Lista de Espera» se encuentran en trámite de
        inscripción formal ante la Dirección de Registro Nacional y Protección
        de Datos Personales de la Autoridad Nacional de Protección de Datos
        Personales (ANPDP), órgano adscrito al Ministerio de Justicia y Derechos
        Humanos (MINJUS).
      </p>

      <h2>2. Datos personales que recopilamos</h2>
      <h3>2.1. Datos que nos proporcionas directamente</h3>
      <ul>
        <li>Nombres y apellidos.</li>
        <li>Documento Nacional de Identidad u otro documento de identificación.</li>
        <li>Fecha de nacimiento.</li>
        <li>Correo electrónico.</li>
        <li>Número de teléfono / WhatsApp.</li>
        <li>Departamento, provincia y distrito.</li>
        <li>Dirección.</li>
        <li>
          Información bancaria y documentos de identificación, cuando se requiera
          para validar una operación.
        </li>
        <li>
          Cualquier otro dato que decidas incluir en un mensaje, consulta o
          reclamo.
        </li>
      </ul>
      <h3>2.2. Datos que se generan por el uso de la plataforma</h3>
      <ul>
        <li>
          Datos de navegación y dispositivo: dirección IP, tipo de navegador,
          sistema operativo, páginas visitadas y fecha/hora de acceso.
        </li>
        <li>
          Origen de la visita y parámetros de campaña (por ejemplo, UTM y
          referrer).
        </li>
        <li>
          Registros de verificación (fecha y hora de confirmación de correo o
          teléfono) y de aceptación de documentos.
        </li>
      </ul>
      <p>
        No solicitamos datos sensibles. Te pedimos no enviarnos información de esa
        naturaleza salvo que sea estrictamente necesaria y te la solicitemos de
        forma expresa.
      </p>

      <h2>3. Finalidades del tratamiento</h2>
      <p>Utilizamos tus datos personales para:</p>
      <ul>
        <li>Registrar y gestionar tu cuenta y tu perfil de usuario.</li>
        <li>
          Verificar tu identidad y validar las operaciones que realices en la
          plataforma.
        </li>
        <li>
          Informarte sobre planes de inversión, disponibilidad del servicio y
          novedades relacionadas con tu registro.
        </li>
        <li>
          Gestionar el procedimiento de inversión, pagos, retiros, reinversiones,
          contratos y el historial asociado.
        </li>
        <li>
          Atender tus consultas, solicitudes y reclamos, incluidos los
          presentados a través del Libro de Reclamaciones.
        </li>
        <li>
          Enviarte comunicaciones sobre tu cuenta, verificación, seguridad y
          cambios en la plataforma.
        </li>
        <li>
          Prevenir el fraude, proteger la seguridad de la plataforma y de los
          usuarios, y cumplir obligaciones legales y regulatorias.
        </li>
        <li>
          Realizar analítica y mejorar el funcionamiento y contenido del sitio.
        </li>
      </ul>
      <h3>3.1. Comunicaciones comerciales</h3>
      <p>
        Con tu consentimiento, podremos enviarte información sobre oportunidades
        de inversión, contenidos y promociones. Puedes retirar este
        consentimiento en cualquier momento, sin que ello afecte el uso de tu
        cuenta, escribiéndonos a{" "}
        <a href={`mailto:${COMPANY.emailDatos}`}>{COMPANY.emailDatos}</a> o usando
        el enlace para darte de baja incluido en cada mensaje.
      </p>

      <h2>4. Base legal y consentimiento</h2>
      <p>
        El tratamiento de tus datos se sustenta, según el caso, en tu
        consentimiento libre, previo, expreso e informado; en la ejecución de la
        relación contractual o de las medidas previas a ella; y en el
        cumplimiento de obligaciones legales aplicables a Platita.pe.
      </p>
      <p>
        Al registrarte y marcar la casilla de aceptación correspondiente,
        declaras haber leído esta Política y prestar tu consentimiento para el
        tratamiento aquí descrito.
      </p>

      <h2>5. Encargados de tratamiento y terceros</h2>
      <p>
        Para operar la plataforma y prestar nuestros servicios utilizamos
        proveedores tecnológicos especializados que actúan como encargados de
        tratamiento por cuenta de Platita.pe, sujetos a estrictas obligaciones
        contractuales de confidencialidad y medidas de seguridad digital:
      </p>
      <ul>
        <li>
          <strong>Alojamiento e infraestructura web:</strong> Vercel Inc. (San
          Francisco, California, EE. UU.).
        </li>
        <li>
          <strong>Base de datos y autenticación en la nube:</strong> Supabase
          Inc. (San Francisco, California, EE. UU. / infraestructura AWS).
        </li>
        <li>
          <strong>Envío de correos electrónicos transaccionales:</strong> Resend
          Inc. (San Francisco, California, EE. UU.).
        </li>
        <li>
          <strong>Seguridad perimetral y protección anti-bots (CAPTCHA):</strong>{" "}
          Cloudflare, Inc. (San Francisco, California, EE. UU. - Cloudflare
          Turnstile).
        </li>
        <li>
          <strong>Gestión y respaldo de registros operativos:</strong> Google
          LLC (Mountain View, California, EE. UU. - Google Workspace y Google
          Sheets).
        </li>
        <li>
          <strong>Comunicaciones y atención al usuario:</strong> WhatsApp LLC /
          Meta Platforms, Inc. (Menlo Park, California, EE. UU.), cuando el
          usuario elige voluntariamente comunicarse por dicho canal.
        </li>
        <li>
          <strong>Analítica y medición de rendimiento:</strong> Google Analytics
          4 (Google LLC, Mountain View, California, EE. UU.), activa por
          defecto con anonimización de dirección IP, configurable por el
          usuario en cualquier momento (ver sección 10).
        </li>
      </ul>
      <p>
        Asimismo, podremos compartir información estrictamente necesaria con
        entidades financieras, notarías, registros públicos (SUNARP) o asesores
        legales que participen en la formalización o respaldo de operaciones de
        inversión, así como con autoridades judiciales, administrativas o
        tributarias competentes cuando medie mandato legal u orden expresa.
      </p>
      <p>
        Platita.pe <strong>no vende, alquila ni cede</strong> tus datos
        personales a terceros para fines de publicidad no solicitada o ajena a
        nuestros servicios.
      </p>

      <h2>6. Transferencia internacional de datos (Flujo transfronterizo)</h2>
      <p>
        Los proveedores de tecnología antes mencionados mantienen servidores y
        centros de datos ubicados fuera de la República del Perú (principalmente
        en los Estados Unidos de América). Al aceptar esta Política, prestas tu
        consentimiento informado para dicho flujo transfronterizo de datos, el
        cual se realiza bajo estándares internacionales de seguridad de la
        información y conforme a lo previsto en el artículo 15 de la Ley N.°
        29733 y su Reglamento.
      </p>

      <h2>7. Conservación y custodia de los datos</h2>
      <p>
        Conservamos tus datos personales durante el tiempo que mantengas tu
        cuenta activa o relación de interés con Platita.pe y, con posterioridad a
        su conclusión, por los plazos necesarios para atender eventuales
        responsabilidades legales, civiles, comerciales, tributarias o
        administrativas derivadas del tratamiento.
      </p>
      <p>Los plazos de conservación referenciales y máximos son:</p>
      <ul>
        <li>
          <strong>Prospectos y registros en lista de espera (Beta Privada):</strong>{" "}
          Hasta por veinticuatro (24) meses contados desde tu registro, última
          interacción o manifestación de interés, salvo que ejerzas previamente
          tu derecho de cancelación o revoques tu consentimiento.
        </li>
        <li>
          <strong>Inversionistas y operaciones contractuales:</strong> Durante
          toda la vigencia de la relación contractual y, culminada la misma, por
          un plazo de diez (10) años, en cumplimiento del término general de
          prescripción extintiva de acciones personales fijado en el artículo
          2001, numeral 1 del Código Civil peruano, así como de las normativas de
          custodia documental contable, tributaria y de Prevención del Lavado de
          Activos y Financiamiento del Terrorismo (PLAFT / SBS / UIF-Perú).
        </li>
        <li>
          <strong>Hojas de Reclamación (Libro de Reclamaciones):</strong> Por un
          período mínimo de dos (2) años contados desde la emisión de la
          respuesta correspondiente, conforme al Decreto Supremo N.°
          011-2011-PCM.
        </li>
        <li>
          <strong>Registros técnicos de auditoría y seguridad:</strong> Entre
          doce (12) y veinticuatro (24) meses con el único propósito de
          garantizar la seguridad de las transacciones y prevenir incidentes
          cibernéticos o fraudes.
        </li>
      </ul>
      <p>
        Cumplidos los plazos indicados, los datos serán eliminados de manera
        segura o sometidos a procesos irreversibles de disociación o
        anonimización.
      </p>

      <h2>8. Seguridad de la información</h2>
      <p>
        Aplicamos medidas técnicas, organizativas y legales razonables para
        proteger tus datos frente a accesos no autorizados, pérdida, alteración o
        divulgación indebida, incluyendo control de accesos, cifrado en tránsito
        y segregación de credenciales de servidor.
      </p>
      <p>
        Eres responsable de mantener la confidencialidad de tus credenciales y de
        avisarnos de inmediato ante cualquier uso no autorizado de tu cuenta.
      </p>

      <h2>9. Tus derechos (ARCO)</h2>
      <p>
        Como titular de los datos, puedes ejercer en cualquier momento tus
        derechos de:
      </p>
      <ul>
        <li>
          <strong>Acceso:</strong> conocer qué datos tuyos tratamos y con qué
          finalidad.
        </li>
        <li>
          <strong>Rectificación:</strong> corregir datos inexactos o
          desactualizados.
        </li>
        <li>
          <strong>Cancelación / supresión:</strong> solicitar la eliminación de
          tus datos cuando ya no sean necesarios o retires tu consentimiento.
        </li>
        <li>
          <strong>Oposición:</strong> oponerte a un tratamiento concreto por
          motivos legítimos.
        </li>
        <li>
          Adicionalmente, información, tratamiento objetivo y a no ser objeto de
          decisiones automatizadas con efectos jurídicos sin intervención humana.
        </li>
      </ul>
      <p>
        Para ejercerlos, escríbenos a{" "}
        <a href={`mailto:${COMPANY.emailDatos}`}>{COMPANY.emailDatos}</a>{" "}
        indicando tu nombre, tu documento de identidad y el derecho que deseas
        ejercer. Responderemos dentro de los plazos que fija la normativa.
      </p>
      <p>
        Si consideras que tu solicitud no fue atendida adecuadamente, puedes
        presentar un reclamo ante la{" "}
        <strong>
          Autoridad Nacional de Protección de Datos Personales del Ministerio de
          Justicia y Derechos Humanos
        </strong>
        .
      </p>

      <h2>10. Cookies y tecnologías similares</h2>
      <p>
        Al entrar al sitio te mostramos un aviso informativo. Las cookies de
        analítica <strong>están activas por defecto</strong>; puedes rechazarlas
        desde ese aviso o, en cualquier momento, desde el enlace{" "}
        <strong>«Preferencias de cookies»</strong> del pie de página. Si las
        rechazas, no se cargan ni ahora ni en visitas posteriores.
      </p>
      <p>Cookies y almacenamiento que se utilizan:</p>
      <ul>
        <li>
          <strong>Preferencia de cookies</strong> (almacenamiento local del
          navegador): guarda si has rechazado la analítica. Es estrictamente
          necesaria para respetar tu decisión.
        </li>
        <li>
          <strong>Google Analytics 4</strong> (<code>_ga</code>,{" "}
          <code>_ga_&lt;ID&gt;</code>): salvo que las rechaces. Miden de forma
          agregada el uso del sitio (páginas vistas, clics en botones, uso del
          simulador, profundidad de scroll). Se usa IP anonimizada. Caducan a los
          2 años.
        </li>
        <li>
          <strong>Cloudflare Turnstile</strong> (<code>__cf_bm</code> y
          similares): cookies de seguridad que protegen el formulario frente a
          bots. Son estrictamente necesarias para que el formulario funcione.
        </li>
      </ul>
      <p>
        También puedes gestionar o bloquear las cookies desde la configuración de
        tu navegador; algunas funciones podrían verse afectadas si las desactivas.
      </p>

      <h2>11. Menores de edad</h2>
      <p>
        La plataforma está dirigida exclusivamente a personas mayores de 18 años.
        No recopilamos de forma consciente datos de menores de edad. Si detectamos
        que un registro corresponde a un menor, procederemos a eliminarlo.
      </p>

      <h2>12. Cambios en esta Política</h2>
      <p>
        Podemos actualizar esta Política de Privacidad por cambios legales,
        operativos o tecnológicos. Publicaremos la versión vigente en esta misma
        página, con su fecha de actualización, y comunicaremos los cambios
        relevantes por los medios disponibles.
      </p>

      <h2>13. Contacto</h2>
      <p>
        Para cualquier consulta sobre esta Política o sobre el tratamiento de tus
        datos personales:
        <br />
        Correo: <a href={`mailto:${COMPANY.emailDatos}`}>{COMPANY.emailDatos}</a>
        <br />
        Atención general:{" "}
        <a href={`mailto:${COMPANY.emailContacto}`}>{COMPANY.emailContacto}</a> ·{" "}
        {COMPANY.telefono}
      </p>
    </LegalShell>
  );
}
