import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y Condiciones que regulan el acceso, registro y uso de la plataforma Platita.pe.",
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <LegalShell
      title="Términos y Condiciones de Platita.pe"
      intro={
        <>
          <p>
            Bienvenido a Platita.pe. Estos Términos y Condiciones regulan el
            acceso, registro y uso de nuestra plataforma digital, así como las
            condiciones generales aplicables a los servicios ofrecidos a través
            de ella.
          </p>
          <p>
            Al crear una cuenta, acceder a la plataforma o utilizar cualquiera de
            sus funcionalidades, el usuario declara haber leído, comprendido y
            aceptado estos Términos y Condiciones.
          </p>
        </>
      }
    >
      <h2>1. Identificación</h2>
      <p>Platita.pe es una plataforma digital operada por:</p>
      <p>
        <strong>{COMPANY.razonSocial}</strong>
        <br />
        RUC: {COMPANY.ruc}
        <br />
        Domicilio: {COMPANY.domicilio}
        <br />
        Contacto: {COMPANY.emailContacto}
      </p>
      <p>
        La información legal, domicilio, datos de contacto y demás información
        correspondiente al titular de la plataforma estarán disponibles en los
        canales oficiales de Platita.pe.
      </p>
      <p>
        En adelante, se denominará “Platita.pe” a la plataforma y “Usuario” o
        “Inversionista” a la persona que se registre o participe en las
        operaciones ofrecidas a través de ella.
      </p>

      <h2>2. Sobre Platita.pe</h2>
      <p>
        Platita.pe es una plataforma digital creada para facilitar el acceso,
        gestión y seguimiento de oportunidades de inversión vinculadas a
        proyectos inmobiliarios.
      </p>
      <p>
        A través de Platita.pe, el usuario podrá, según las funcionalidades
        disponibles:
      </p>
      <ul>
        <li>Crear una cuenta.</li>
        <li>Verificar su identidad.</li>
        <li>Completar su perfil.</li>
        <li>Consultar los planes disponibles.</li>
        <li>Utilizar el simulador de rentabilidad.</li>
        <li>Solicitar una inversión.</li>
        <li>Realizar el procedimiento de pago correspondiente.</li>
        <li>Registrar y cargar comprobantes.</li>
        <li>Consultar el estado de sus inversiones.</li>
        <li>Acceder a sus contratos.</li>
        <li>Consultar su historial.</li>
        <li>Realizar seguimiento de sus ciclos de inversión.</li>
        <li>
          Solicitar el retiro o reinversión conforme a las condiciones
          aplicables.
        </li>
      </ul>

      <h2>3. Aceptación de los términos</h2>
      <p>
        El registro y uso de Platita.pe implica la aceptación de estos Términos y
        Condiciones.
      </p>
      <p>
        Si el usuario no está de acuerdo con alguno de ellos, deberá abstenerse
        de utilizar la plataforma.
      </p>
      <p>
        Platita.pe podrá solicitar adicionalmente la aceptación de documentos
        específicos antes de determinadas operaciones, incluyendo contratos,
        políticas, declaraciones de riesgo y documentación relacionada con una
        inversión.
      </p>

      <h2>4. Registro de la cuenta</h2>
      <p>
        Para utilizar determinadas funcionalidades, el usuario deberá crear una
        cuenta proporcionando información verdadera, completa y actualizada.
      </p>
      <p>La información podrá incluir:</p>
      <ul>
        <li>Nombres y apellidos.</li>
        <li>Documento Nacional de Identidad.</li>
        <li>Fecha de nacimiento.</li>
        <li>Correo electrónico.</li>
        <li>Número de teléfono.</li>
        <li>Dirección.</li>
        <li>Información bancaria.</li>
        <li>Documentos de identificación.</li>
        <li>
          Otra información necesaria para la validación de la cuenta o de una
          operación.
        </li>
      </ul>
      <p>
        El usuario será responsable de mantener actualizada la información
        proporcionada.
      </p>

      <h2>5. Verificación del usuario</h2>
      <p>
        Platita.pe podrá realizar procesos de verificación de identidad,
        documentación, información bancaria y demás datos necesarios para validar
        al usuario y sus operaciones.
      </p>
      <p>
        La creación de una cuenta no implica por sí misma la aprobación como
        inversionista.
      </p>
      <p>
        Platita.pe podrá solicitar información adicional cuando resulte necesario
        para validar una operación o cumplir con las obligaciones legales
        aplicables.
      </p>

      <h2>6. Seguridad de la cuenta</h2>
      <p>
        El usuario es responsable de mantener la confidencialidad de sus
        credenciales de acceso.
      </p>
      <p>El usuario deberá informar inmediatamente a Platita.pe si detecta:</p>
      <ul>
        <li>Acceso no autorizado.</li>
        <li>Pérdida o uso indebido de sus credenciales.</li>
        <li>Actividad que no reconoce.</li>
        <li>Posible suplantación de identidad.</li>
      </ul>
      <p>
        Platita.pe podrá suspender temporalmente una cuenta cuando existan
        razones de seguridad, indicios de fraude, información inconsistente o
        incumplimiento de estos Términos y Condiciones.
      </p>

      <h2>7. Planes de inversión</h2>
      <p>Platita.pe podrá ofrecer diferentes planes de inversión, incluyendo:</p>
      <ul>
        <li>Plan Inicial</li>
        <li>Plan Avanza</li>
        <li>Plan Crece</li>
        <li>Plan Patrimonio</li>
      </ul>
      <p>
        Cada plan podrá establecer condiciones particulares relacionadas con:
      </p>
      <ul>
        <li>Capital de inversión.</li>
        <li>Rentabilidad.</li>
        <li>Duración del ciclo.</li>
        <li>Condiciones de pago.</li>
        <li>Condiciones de retiro.</li>
        <li>Condiciones de reinversión.</li>
        <li>Requisitos para acceder a un plan superior.</li>
      </ul>
      <p>
        Las condiciones específicas de cada inversión serán informadas al usuario
        antes de su contratación y quedarán establecidas en la documentación
        contractual correspondiente.
      </p>

      <h2>8. Simulador de rentabilidad</h2>
      <p>
        Platita.pe podrá ofrecer un simulador para que el usuario pueda realizar
        estimaciones sobre una posible inversión.
      </p>
      <p>
        Los resultados del simulador son <strong>referenciales e informativos</strong>{" "}
        y no constituyen una promesa, garantía u obligación de pago.
      </p>
      <p>
        Las condiciones definitivas de una inversión serán las establecidas en el
        contrato correspondiente y en la información específica de la operación.
      </p>

      <h2>9. Procedimiento de inversión</h2>
      <p>El proceso de inversión podrá comprender las siguientes etapas:</p>
      <ol>
        <li>Selección del plan.</li>
        <li>Ingreso del monto de inversión.</li>
        <li>Realización de la transferencia correspondiente.</li>
        <li>Carga del comprobante de pago.</li>
        <li>Validación de la operación.</li>
        <li>Aprobación.</li>
        <li>Generación y aceptación del contrato.</li>
        <li>Activación de la inversión.</li>
      </ol>
      <p>
        La realización de una transferencia o el envío de un comprobante no
        implica automáticamente que la inversión haya sido aceptada.
      </p>
      <p>
        La inversión estará sujeta a la validación y aprobación correspondiente.
      </p>

      <h2>10. Validación de comprobantes</h2>
      <p>
        Durante la etapa inicial de Platita.pe, las transferencias y comprobantes
        podrán ser validados manualmente por el equipo autorizado.
      </p>
      <p>
        Platita.pe podrá rechazar o solicitar aclaraciones respecto de una
        operación cuando:
      </p>
      <ul>
        <li>El monto transferido no coincida.</li>
        <li>El comprobante no pueda ser validado.</li>
        <li>Existan inconsistencias.</li>
        <li>El comprobante sea ilegible.</li>
        <li>Se detecte duplicidad.</li>
        <li>La transferencia no pueda ser identificada.</li>
        <li>Existan razones de seguridad o cumplimiento.</li>
      </ul>

      <h2>11. Respaldo de la inversión</h2>
      <p>
        Las inversiones realizadas a través de Platita.pe estarán vinculadas a
        los proyectos inmobiliarios en los cuales se destinan los recursos, de
        acuerdo con la estructura, condiciones y documentación específica de cada
        inversión.
      </p>
      <p>
        La información correspondiente al proyecto, destino de los recursos,
        estructura de la inversión, condiciones económicas, riesgos y naturaleza
        del respaldo estará disponible en la documentación correspondiente a cada
        operación.
      </p>
      <p>
        El término “respaldo” no significa que el capital o la rentabilidad se
        encuentren garantizados, salvo que una garantía específica y
        jurídicamente exigible se encuentre expresamente establecida en la
        documentación contractual.
      </p>

      <h2>12. Contrato de inversión</h2>
      <p>Cada inversión aprobada estará sujeta a un contrato específico.</p>
      <p>
        El contrato establecerá las condiciones particulares de la inversión,
        incluyendo, cuando corresponda:
      </p>
      <ul>
        <li>Identificación del inversionista.</li>
        <li>Monto invertido.</li>
        <li>Plan seleccionado.</li>
        <li>Proyecto relacionado.</li>
        <li>Duración del ciclo.</li>
        <li>Rentabilidad aplicable.</li>
        <li>Condiciones de pago.</li>
        <li>Condiciones de retiro.</li>
        <li>Condiciones de reinversión.</li>
        <li>Derechos y obligaciones de las partes.</li>
        <li>Riesgos asociados.</li>
      </ul>
      <p>
        El inversionista podrá acceder a su contrato mediante su cuenta en
        Platita.pe.
      </p>

      <h2>13. Ciclos de inversión</h2>
      <p>Las inversiones podrán estructurarse mediante ciclos.</p>
      <p>
        Al finalizar un ciclo, el inversionista podrá, conforme a las condiciones
        de su contrato:
      </p>
      <ul>
        <li>Retirar su inversión.</li>
        <li>Reinvertir.</li>
        <li>Incrementar su capital.</li>
        <li>Mantener su plan.</li>
        <li>
          Acceder a un plan superior cuando cumpla las condiciones
          correspondientes.
        </li>
      </ul>
      <p>Cada ciclo deberá quedar correctamente registrado en la plataforma.</p>

      <h2>14. Escalamiento de planes</h2>
      <p>
        Platita.pe permite un modelo de crecimiento progresivo del inversionista.
      </p>
      <p>
        Cuando el inversionista incremente su capital y cumpla las condiciones
        para acceder a un plan superior, podrá realizarse el cambio
        correspondiente para el siguiente ciclo.
      </p>
      <p>Por ejemplo:</p>
      <blockquote>
        Plan Inicial → Finalización del ciclo → Incremento de capital → Plan
        Avanza → Nuevo ciclo → Nuevo contrato.
      </blockquote>
      <p>
        El cambio de plan no modificará retroactivamente las condiciones de un
        ciclo anterior.
      </p>
      <p>
        El contrato correspondiente al ciclo anterior permanecerá registrado en
        el historial del inversionista y el nuevo ciclo contará con su propia
        documentación contractual.
      </p>

      <h2>15. Historial de inversiones y contratos</h2>
      <p>
        Platita.pe podrá conservar y mostrar al inversionista el historial de:
      </p>
      <ul>
        <li>Inversiones.</li>
        <li>Ciclos.</li>
        <li>Planes.</li>
        <li>Pagos.</li>
        <li>Rentabilidad.</li>
        <li>Contratos.</li>
        <li>Operaciones realizadas.</li>
      </ul>
      <p>
        Los contratos correspondientes a ciclos anteriores permanecerán como
        parte del historial y no serán reemplazados por los contratos
        posteriores.
      </p>

      <h2>16. Dashboard del inversionista</h2>
      <p>
        El inversionista podrá consultar desde su cuenta información relacionada
        con sus inversiones, incluyendo:
      </p>
      <ul>
        <li>Capital invertido.</li>
        <li>Plan actual.</li>
        <li>Rentabilidad acumulada.</li>
        <li>Próximo pago.</li>
        <li>Estado de inversión.</li>
        <li>Historial de operaciones.</li>
        <li>Historial de ciclos.</li>
        <li>Contratos.</li>
      </ul>
      <p>
        La información mostrada en el Dashboard tiene finalidad de seguimiento y
        deberá interpretarse conjuntamente con la documentación contractual
        correspondiente.
      </p>

      <h2>17. Rentabilidad</h2>
      <p>
        La rentabilidad aplicable a cada inversión será la establecida en la
        documentación correspondiente.
      </p>
      <p>
        Toda referencia a rentabilidad deberá entenderse de acuerdo con las
        condiciones, plazo, estructura y riesgos de cada inversión.
      </p>
      <p>
        Las rentabilidades mostradas en simuladores, materiales informativos o
        herramientas de cálculo no constituyen por sí mismas una garantía de
        resultado.
      </p>

      <h2>18. Riesgos de inversión</h2>
      <p>
        El usuario reconoce que toda inversión implica riesgos y que los
        resultados pueden variar de acuerdo con las condiciones de cada
        operación.
      </p>
      <p>Entre otros, pueden existir:</p>
      <ul>
        <li>Riesgo inmobiliario.</li>
        <li>Riesgo de mercado.</li>
        <li>Riesgo de liquidez.</li>
        <li>Riesgo de ejecución del proyecto.</li>
        <li>Riesgo de retrasos.</li>
        <li>Riesgo de contraparte.</li>
        <li>Riesgo operativo.</li>
        <li>Riesgo económico.</li>
        <li>Riesgo regulatorio.</li>
      </ul>
      <p>
        Antes de realizar una inversión, el usuario deberá revisar la información
        y documentación correspondiente.
      </p>

      <h2>19. Pagos y retiros</h2>
      <p>
        Los pagos, retiros y reinversiones estarán sujetos a las condiciones
        establecidas para cada inversión.
      </p>
      <p>El inversionista deberá mantener actualizada su información bancaria.</p>
      <p>
        Platita.pe podrá realizar verificaciones adicionales antes de efectuar un
        pago cuando resulte necesario para validar la operación o proteger al
        inversionista.
      </p>

      <h2>20. Información del usuario</h2>
      <p>
        El usuario se compromete a proporcionar información verdadera, completa y
        actualizada.
      </p>
      <p>
        El suministro de información falsa, incompleta o fraudulenta podrá
        generar la suspensión o cancelación de la cuenta y el rechazo de
        determinadas operaciones, sin perjuicio de las acciones que correspondan
        conforme a la legislación aplicable.
      </p>

      <h2>21. Protección de datos personales</h2>
      <p>
        Platita.pe tratará los datos personales de sus usuarios de acuerdo con la
        legislación peruana aplicable en materia de protección de datos
        personales.
      </p>
      <p>
        El tratamiento de los datos se realizará conforme a la Ley N.° 29733, su
        Reglamento y demás normas aplicables.
      </p>
      <p>
        El usuario podrá consultar la{" "}
        <a href="/privacidad">Política de Privacidad</a> de Platita.pe, donde se
        detalla la información relacionada con la recopilación, uso, conservación
        y protección de sus datos personales.
      </p>

      <h2>22. Propiedad intelectual</h2>
      <p>
        La plataforma Platita.pe, incluyendo su marca, nombre comercial,
        logotipos, diseños, interfaces, contenidos, software, código, documentos,
        elementos gráficos y demás componentes, se encuentra protegida por las
        normas de propiedad intelectual aplicables.
      </p>
      <p>
        El usuario no podrá copiar, reproducir, modificar, distribuir,
        comercializar o explotar dichos elementos sin autorización.
      </p>

      <h2>23. Usos prohibidos</h2>
      <p>El usuario no podrá utilizar Platita.pe para:</p>
      <ul>
        <li>Suplantar a otra persona.</li>
        <li>Crear cuentas falsas.</li>
        <li>Presentar documentación falsa.</li>
        <li>Manipular comprobantes.</li>
        <li>Intentar acceder a cuentas de terceros.</li>
        <li>Alterar información de la plataforma.</li>
        <li>Vulnerar los sistemas de seguridad.</li>
        <li>Realizar actividades fraudulentas.</li>
        <li>Realizar actividades ilícitas.</li>
        <li>Utilizar información de otros usuarios sin autorización.</li>
      </ul>

      <h2>24. Suspensión o cancelación de cuentas</h2>
      <p>
        Platita.pe podrá suspender, restringir o cancelar una cuenta cuando
        exista:
      </p>
      <ul>
        <li>Incumplimiento de estos Términos y Condiciones.</li>
        <li>Información falsa.</li>
        <li>Fraude o intento de fraude.</li>
        <li>Riesgo de seguridad.</li>
        <li>Uso indebido de la plataforma.</li>
        <li>Requerimiento de autoridad competente.</li>
        <li>
          Cualquier otra circunstancia que justifique la medida conforme a la
          legislación aplicable.
        </li>
      </ul>
      <p>
        La suspensión o cancelación de una cuenta no extinguirá automáticamente
        las obligaciones pendientes derivadas de inversiones o contratos
        previamente celebrados.
      </p>

      <h2>25. Disponibilidad de la plataforma</h2>
      <p>
        Platita.pe realizará esfuerzos razonables para mantener disponible y
        funcionando correctamente la plataforma.
      </p>
      <p>Sin embargo, pueden producirse interrupciones por:</p>
      <ul>
        <li>Mantenimiento.</li>
        <li>Actualizaciones.</li>
        <li>Fallas técnicas.</li>
        <li>Problemas de conectividad.</li>
        <li>Fallas de proveedores tecnológicos.</li>
        <li>Eventos fuera del control razonable de Platita.pe.</li>
      </ul>
      <p>
        Cuando resulte posible, se informará previamente sobre interrupciones
        programadas.
      </p>

      <h2>26. Comunicaciones</h2>
      <p>El usuario acepta recibir comunicaciones relacionadas con:</p>
      <ul>
        <li>Su cuenta.</li>
        <li>Verificación.</li>
        <li>Inversiones.</li>
        <li>Contratos.</li>
        <li>Pagos.</li>
        <li>Retiros.</li>
        <li>Cambios en la plataforma.</li>
        <li>Seguridad.</li>
        <li>Información importante relacionada con sus operaciones.</li>
      </ul>
      <p>
        Estas comunicaciones podrán enviarse mediante correo electrónico,
        notificaciones dentro de la plataforma, mensajes u otros medios
        registrados por el usuario.
      </p>

      <h2>27. Atención y reclamos</h2>
      <p>
        Platita.pe dispondrá de canales de atención para consultas relacionadas
        con la plataforma y los servicios ofrecidos.
      </p>
      <p>
        El usuario podrá realizar consultas o presentar reclamos a través de los
        canales oficiales habilitados, incluyendo el{" "}
        <a href="/libro-de-reclamaciones">Libro de Reclamaciones</a> virtual.
      </p>
      <p>
        Los derechos de los consumidores se ejercerán conforme a la legislación
        peruana aplicable, incluyendo el Código de Protección y Defensa del
        Consumidor, Ley N.° 29571.
      </p>
      <p>
        Cuando corresponda legalmente, Platita.pe contará con los mecanismos de
        atención y reclamación exigibles.
      </p>

      <h2>28. Modificación de los Términos y Condiciones</h2>
      <p>
        Platita.pe podrá modificar estos Términos y Condiciones cuando sea
        necesario debido a:
      </p>
      <ul>
        <li>Cambios legales o regulatorios.</li>
        <li>Cambios en los servicios.</li>
        <li>Nuevas funcionalidades.</li>
        <li>Cambios operativos.</li>
        <li>Mejoras de seguridad.</li>
        <li>Actualizaciones tecnológicas.</li>
      </ul>
      <p>Las modificaciones serán comunicadas mediante los medios disponibles.</p>
      <p>
        Las modificaciones no afectarán retroactivamente las condiciones de
        inversiones previamente contratadas, salvo que la legislación aplicable
        disponga lo contrario.
      </p>

      <h2>29. Relación entre estos términos y el contrato de inversión</h2>
      <p>
        Estos Términos y Condiciones regulan principalmente el uso general de
        Platita.pe.
      </p>
      <p>
        Las condiciones específicas de cada inversión estarán determinadas por el
        contrato y la documentación correspondiente a dicha inversión.
      </p>
      <p>
        En caso de existir una diferencia respecto de una condición específica de
        una inversión, prevalecerá el contrato correspondiente, en la medida
        permitida por la legislación aplicable.
      </p>

      <h2>30. Legislación aplicable</h2>
      <p>
        Estos Términos y Condiciones se rigen por las leyes de la República del
        Perú.
      </p>
      <p>
        Cualquier controversia será atendida mediante los mecanismos establecidos
        por la legislación peruana y, cuando corresponda, por las autoridades o
        jurisdicciones competentes.
      </p>

      <h2>31. Aceptación electrónica</h2>
      <p>
        Al utilizar Platita.pe, el usuario podrá aceptar electrónicamente estos
        Términos y Condiciones mediante mecanismos habilitados en la plataforma.
      </p>
      <p>Platita.pe podrá conservar evidencia de:</p>
      <ul>
        <li>Identificación del usuario.</li>
        <li>Fecha y hora de aceptación.</li>
        <li>Versión de los Términos aceptados.</li>
        <li>Registro de la operación asociada.</li>
      </ul>
      <p>
        El usuario reconoce que dicha aceptación forma parte del registro de su
        relación con Platita.pe.
      </p>

      <h2>32. Declaración del usuario</h2>
      <p>Al aceptar estos Términos y Condiciones, el usuario declara que:</p>
      <blockquote>
        “He leído y comprendido los Términos y Condiciones de Platita.pe, así
        como la información relacionada con mi operación. Entiendo que toda
        inversión implica riesgos y que las condiciones específicas de mi
        inversión estarán determinadas por la documentación contractual
        correspondiente.”
      </blockquote>
    </LegalShell>
  );
}
