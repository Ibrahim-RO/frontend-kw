"use client";

import { ArrowUpRight, ExternalLink, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

type NavigationItem = { href: string; label: string; mobileLabel?: string; section?: string; homeOnly?: boolean };

const navigationItems: NavigationItem[] = [
    { href: "/#inicio", label: "Inicio", section: "inicio" },
    { href: "/#unete", label: "Únete", section: "unete", homeOnly: true },
    { href: "/#family", label: "Family Reunion", section: "family", homeOnly: true },
    { href: "/#aliados", label: "Aliados", section: "aliados", homeOnly: true },
    { href: "/#contact", label: "Contacto", section: "contact", homeOnly: true },
    { href: "/agentes", label: "Agentes" },
    { href: "/propiedades", label: "Propiedades" },
    { href: "/centros-de-mercado", label: "Centros de Mercado", mobileLabel: "Centros" },
];

const resources = [
    { href: "https://console.command.kw.com/", label: "Command" },
    { href: "https://authn.kw.com/saml20/idp/startsso?spEntityId=https://www.canva.com", label: "Canva" },
    { href: "https://kw-one.mx/", label: "Paga tu plataforma" },
    { href: "https://mapscoaching.mx/", label: "MAPS Coaching" },
    { href: "https://agente.kwmexico.mx/entrenamientos", label: "Calendario de entrenamientos" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeHash, setActiveHash] = useState("");
    const pathname = usePathname();
    const menuId = useId();
    const desktopMenuRef = useRef<HTMLDivElement>(null);
    const isHome = pathname === "/";
    const visibleNavigation = navigationItems.filter((item) => isHome || !item.homeOnly);

    useEffect(() => {
        const updateHash = () => setActiveHash(window.location.hash.slice(1));
        updateHash();
        window.addEventListener("hashchange", updateHash);
        return () => window.removeEventListener("hashchange", updateHash);
    }, [pathname]);

    useEffect(() => {
        if (!isMenuOpen) return;
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        const previousOverflow = document.body.style.overflow;
        if (!isDesktop) document.body.style.overflow = "hidden";
        const handleEscape = (event: KeyboardEvent) => event.key === "Escape" && setIsMenuOpen(false);
        const handleOutsideClick = (event: MouseEvent) => {
            if (isDesktop && !desktopMenuRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
        };
        document.addEventListener("keydown", handleEscape);
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isMenuOpen]);

    const isItemActive = ({ href, section }: NavigationItem) => {
        if (section) {
            if (!isHome) return false;
            return section === "inicio" ? !activeHash || activeHash === section : activeHash === section;
        }
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <header className="sticky top-0 z-50 h-20 border-b bg-white shadow-sm">
                <nav aria-label="Navegación principal" className="mx-auto flex h-full max-w-7xl items-center justify-between gap-5 px-6 lg:px-8">
                    <Link href="/" className="w-fit shrink-0" aria-label="KW México — Inicio">
                        <img src="https://www.kwmexico.mx/assets/images/main_menu_section/kw-menu-icon-index.png" alt="KW México" className="h-10 w-auto" />
                    </Link>

                    <div className="hidden flex-1 items-center justify-end gap-4 lg:flex xl:gap-7">
                        {visibleNavigation.map((item) => {
                            const active = isItemActive(item);
                            return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`relative whitespace-nowrap py-2 text-xs font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-kw-primary after:transition-transform xl:text-sm ${active ? "text-kw-primary after:scale-x-100" : "text-neutral-700 after:scale-x-0 hover:text-kw-primary hover:after:scale-x-100"}`}>{item.label}</Link>;
                        })}
                    </div>

                    <div ref={desktopMenuRef} className="relative shrink-0">
                        <button type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-label="Abrir menú de recursos" aria-expanded={isMenuOpen} aria-controls={menuId} className="flex size-10 items-center justify-center rounded-md text-neutral-800 transition-colors hover:bg-neutral-100 hover:text-kw-primary">
                            <Menu size={27} aria-hidden="true" />
                        </button>

                        {isMenuOpen && (
                            <div id={menuId} role="menu" className="absolute top-[calc(100%+14px)] right-0 z-50 hidden w-80 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2 shadow-2xl lg:block">
                                <div className="px-3 pt-3 pb-2">
                                    <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-kw-primary">Recursos para agentes</p>
                                    <p className="mt-1 text-xs text-neutral-500">Accesos rápidos de KW México</p>
                                </div>
                                <div className="mt-1">
                                    {resources.map((resource) => (
                                        <a key={resource.href} href={resource.href} target="_blank" rel="noreferrer" role="menuitem" className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-kw-primary">
                                            <span className="flex size-8 items-center justify-center rounded-lg bg-kw-primary/10 text-kw-primary"><ExternalLink size={14} /></span>
                                            <span className="flex-1">{resource.label}</span>
                                            <ArrowUpRight size={15} className="text-neutral-300 transition-colors group-hover:text-kw-primary" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </header>

            {isMenuOpen && (
                <div role="dialog" aria-modal="true" aria-label="Menú de navegación" className="fixed inset-0 z-[80] overflow-y-auto bg-neutral-950 text-white lg:hidden">
                    <span aria-hidden="true" className="pointer-events-none fixed -right-5 top-1/2 -translate-y-1/2 text-[15rem] font-black leading-none text-white/5 italic">KW</span>
                    <button type="button" className="fixed top-6 right-6 z-20 rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-red-500" aria-label="Cerrar menú" onClick={closeMenu} autoFocus><X size={36} /></button>

                    <div className="relative z-10 flex min-h-full flex-col px-6 pt-20 pb-8">
                        <nav aria-label="Navegación móvil" className="flex flex-1 flex-col justify-center gap-2 py-5">
                            {visibleNavigation.map((item, index) => {
                                const active = isItemActive(item);
                                return <Link key={item.href} href={item.href} onClick={closeMenu} aria-current={active ? "page" : undefined} className={`group flex items-baseline gap-4 border-b py-3 text-xl font-semibold transition-colors hover:text-red-500 ${active ? "border-red-500 text-red-500" : "border-white/10"}`}><span className="text-xs font-normal tabular-nums text-red-500">{String(index + 1).padStart(2, "0")}</span>{item.mobileLabel ?? item.label}</Link>;
                            })}
                        </nav>

                        <details className="my-5 border-y border-white/10 py-4">
                            <summary className="cursor-pointer text-sm font-bold text-white">Recursos para agentes</summary>
                            <div className="mt-3 grid gap-1">
                                {resources.map((resource) => <a key={resource.href} href={resource.href} target="_blank" rel="noreferrer" className="flex items-center justify-between py-2 text-sm text-white/60 transition hover:text-red-500">{resource.label}<ExternalLink size={14} /></a>)}
                            </div>
                        </details>

                        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <a href="tel:+524422512295" className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"><Phone className="text-red-500" size={20} />(52) 442 251 2295</a>
                            <Link href="/#contact" onClick={closeMenu} className="rounded-lg bg-red-600 px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-white hover:text-neutral-900">Buscar Propiedades</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
