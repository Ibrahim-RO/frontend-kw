import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import CookieSettingsButton from "@/src/shared/components/cookies/CookieSettingsButton";

const navigation = [
    { href: "/#inicio", label: "Inicio" },
    { href: "/#unete", label: "Únete" },
    { href: "/propiedades", label: "Propiedades" },
    { href: "/agentes", label: "Agentes" },
    { href: "/centros-de-mercado", label: "Centros de Mercado" },
];

const resources = [
    { href: "https://console.command.kw.com/", label: "Command" },
    { href: "https://authn.kw.com/saml20/idp/startsso?spEntityId=https://www.canva.com", label: "Canva" },
    { href: "https://kw-one.mx/", label: "Paga tu plataforma" },
    { href: "https://mapscoaching.mx/", label: "MAPS Coaching" },
    { href: "https://agente.kwmexico.mx/entrenamientos", label: "Calendario de entrenamientos" },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-neutral-950 text-white">
            <div className="pointer-events-none absolute -right-36 bottom-0 size-136 rounded-full bg-kw-primary/10 blur-[130px]" aria-hidden="true" />

            <div className="relative mx-auto w-full max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1fr] lg:gap-16">
                    <div>
                        <Link href="/" className="inline-block" aria-label="KW México — Inicio">
                            <img
                                src="/footer-logo.png"
                                alt="Logo KW México"
                                className="h-14 w-auto object-contain object-left"
                            />
                        </Link>
                        <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-400">
                            Construye un negocio, no solo un empleo. La red de entrenamiento, coaching y agentes inmobiliarios más grande de México.
                        </p>
                    </div>

                    <FooterColumn title="Navegación">
                        {navigation.map((item) => (
                            <Link key={item.href} href={item.href} className="transition-colors hover:text-white">{item.label}</Link>
                        ))}
                    </FooterColumn>

                    <FooterColumn title="Recursos">
                        {resources.map((item) => item.href.startsWith("http") ? (
                            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">{item.label}</a>
                        ) : (
                            <Link key={item.label} href={item.href} className="transition-colors hover:text-white">{item.label}</Link>
                        ))}
                    </FooterColumn>

                    <FooterColumn title="Contacto">
                        <a href="mailto:info@kwmexico.mx" className="flex items-start gap-3 transition-colors hover:text-white"><Mail className="mt-0.5 shrink-0 text-kw-primary" size={17} />info@kwmexico.mx</a>
                        <a href="tel:+524422512295" className="flex items-start gap-3 transition-colors hover:text-white"><Phone className="mt-0.5 shrink-0 text-kw-primary" size={17} />(52) 442 251 2295</a>
                        <a href="https://www.google.com/maps/search/?api=1&query=Circuito+Álamos+83+Querétaro" target="_blank" rel="noreferrer" className="flex items-start gap-3 leading-6 transition-colors hover:text-white"><MapPin className="mt-0.5 shrink-0 text-kw-primary" size={17} />Cto. Álamos #83, 3er piso, col. Álamos 2da Sección, C.P. 76160, Querétaro, Qro. México</a>
                    </FooterColumn>
                </div>

                <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-7 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1.5">
                        <p>&copy; {new Date().getFullYear()} Keller Williams México. Todos los derechos reservados.</p>
                        <p>Desarrollado por <a href="https://www.devstackstudio.com.mx/" target="_blank" rel="noreferrer" className="underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white">DevStackStudio</a></p>
                    </div>
                    <nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm" aria-label="Información legal">
                        <Link href="/terminos-uso" className="transition-colors hover:text-white">Términos de uso</Link>
                        <Link href="/aviso-privacidad" className="transition-colors hover:text-white">Aviso de privacidad</Link>
                        <CookieSettingsButton />
                    </nav>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div>
            <h2 className="mb-5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">{title}</h2>
            <div className="flex flex-col gap-3 text-sm font-medium text-neutral-400">{children}</div>
        </div>
    );
}
