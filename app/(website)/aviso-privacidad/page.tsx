import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aviso de privacidad | KW México",
    description: "Conoce cómo KW México recaba, utiliza y protege tus datos personales.",
};

const sections = [
    {
        id: "responsable",
        title: "Responsable de los datos personales",
        content: (
            <p>
                Master 5 México, S.A.P.I. de C.V., mejor conocido como Keller Williams México o KW México, con domicilio en Circuito Álamos 83, 3er piso, Col. Álamos 2a Sección, C.P. 76160, Querétaro, Querétaro, es el responsable del uso y protección de sus datos personales, y al respecto le informa lo siguiente.
            </p>
        ),
    },
    {
        id: "finalidades",
        title: "Finalidades del tratamiento",
        content: (
            <p>
                Su información personal será utilizada para proveer los servicios inmobiliarios que usted ha solicitado, realizar evaluaciones periódicas de nuestros productos y servicios a efecto de mejorar la calidad de los mismos, mantenerlo informado sobre cambios en los servicios y, en general, para dar cumplimiento a las obligaciones que hemos contraído con usted.
            </p>
        ),
    },
    {
        id: "datos-personales",
        title: "Datos personales recabados",
        content: (
            <p>
                Para efectos de lo anterior, podremos solicitar datos de identificación personal, datos de contacto, datos laborales, datos financieros y documentos de soporte para la prestación del servicio que solicita.
            </p>
        ),
    },
    {
        id: "derechos-arco",
        title: "Derechos ARCO",
        content: (
            <>
                <p>
                    Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos. Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta; que la eliminemos de nuestros registros o bases de datos cuando considere que no está siendo utilizada conforme a los principios, deberes y obligaciones previstos en la normativa; así como oponerse al uso de sus datos personales para fines específicos. Estos derechos se conocen como derechos ARCO.
                </p>
                <p>
                    Para ejercer cualquiera de los derechos ARCO, deberá presentar la solicitud respectiva por escrito directamente en nuestra oficina o enviarla al correo electrónico <a href="mailto:info@kwmexico.mx" className="font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-900">info@kwmexico.mx</a>.
                </p>
            </>
        ),
    },
    {
        id: "procedimiento",
        title: "Procedimiento y plazos",
        content: (
            <p>
                El área correspondiente le informará por correo electrónico, a la dirección que usted nos proporcione, en un plazo máximo de quince días contados a partir de la fecha en que se recibió la solicitud, la resolución adoptada. Si resulta procedente, esta se hará efectiva dentro de los diez días siguientes a la fecha en que se comunique la respuesta. Tratándose de solicitudes de acceso a datos personales, procederá la entrega previa acreditación de la identidad del solicitante o representante legal, según corresponda.
            </p>
        ),
    },
    {
        id: "transferencias",
        title: "Transferencia de datos",
        content: (
            <>
                <p>
                    En caso necesario, su información personal puede ser tratada o transferida dentro o fuera del país a empresas relacionadas, subsidiarias, afiliadas o controladoras de KW México, y para los mismos efectos citados anteriormente.
                </p>
                <p>
                    Si usted no manifiesta su oposición al tratamiento, uso o transferencia de sus datos personales, se entiende que nos ha otorgado su consentimiento para ello.
                </p>
            </>
        ),
    },
    {
        id: "cambios-al-aviso",
        title: "Cambios al aviso de privacidad",
        content: (
            <>
                <p>
                    El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas.
                </p>
                <p>
                    Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad a través de nuestro sitio web <a href="https://www.kwmexico.mx" target="_blank" rel="noreferrer" className="font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-900">www.kwmexico.mx</a>.
                </p>
            </>
        ),
    },
    {
        id: "comunicaciones-promocionales",
        title: "Comunicaciones promocionales",
        content: (
            <p>
                Si usted no desea recibir información promocional de nuestra empresa o de nuestra franquicia, le solicitamos enviar un correo a <a href="mailto:info@kwmexico.mx" className="font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-900">info@kwmexico.mx</a>.
            </p>
        ),
    },
];

export default function PrivacyNoticePage() {
    return (
        <main className="min-h-screen bg-neutral-50 text-neutral-800">
            <header className="border-b border-neutral-200 bg-neutral-950 text-white">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                        Protección de datos
                    </p>
                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                        Aviso de privacidad
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
                        Información sobre el tratamiento, protección y ejercicio de derechos relacionados con sus datos personales.
                    </p>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:px-8 lg:py-16">
                <aside className="lg:sticky lg:top-28 lg:self-start">
                    <nav
                        aria-label="Índice del aviso de privacidad"
                        className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
                    >
                        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-950">
                            Contenido
                        </h2>
                        <ol className="space-y-2 text-sm text-neutral-600">
                            {sections.map(({ id, title }, index) => (
                                <li key={id}>
                                    <a
                                        href={`#${id}`}
                                        className="group flex gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-red-50 hover:text-red-700"
                                    >
                                        <span className="w-5 shrink-0 text-neutral-400 group-hover:text-red-500">
                                            {index + 1}.
                                        </span>
                                        <span>{title}</span>
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>
                </aside>

                <article
                    aria-labelledby="privacy-notice-title"
                    className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
                >
                    <h2 id="privacy-notice-title" className="sr-only">
                        Aviso sobre el tratamiento de datos personales
                    </h2>

                    <div className="border-b border-neutral-200 bg-red-50/60 p-6 sm:p-8">
                        <p className="text-base leading-8 text-neutral-700">
                            En KW México reconocemos la importancia de proteger su información. Este aviso explica quién es responsable de sus datos, para qué se utilizan y cómo puede ejercer sus derechos.
                        </p>
                    </div>

                    <div className="divide-y divide-neutral-200 px-6 sm:px-8">
                        {sections.map(({ id, title, content }, index) => (
                            <section
                                key={id}
                                id={id}
                                aria-labelledby={`${id}-title`}
                                className="scroll-mt-28 py-9 sm:py-11"
                            >
                                <div className="mb-5 flex items-start gap-4">
                                    <span
                                        aria-hidden="true"
                                        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-700"
                                    >
                                        {index + 1}
                                    </span>
                                    <h2
                                        id={`${id}-title`}
                                        className="pt-1 text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl"
                                    >
                                        {title}
                                    </h2>
                                </div>
                                <div className="space-y-4 text-base leading-8 text-neutral-600">
                                    {content}
                                </div>
                            </section>
                        ))}
                    </div>

                    <footer className="border-t border-neutral-200 bg-neutral-50 px-6 py-6 sm:px-8">
                        <p className="text-sm text-neutral-500">
                            <span className="font-semibold text-neutral-700">Última actualización:</span>{" "}
                            <time dateTime="2020-12-20">20 de diciembre de 2020</time>
                        </p>
                    </footer>
                </article>
            </div>
        </main>
    );
}
