"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

type NavigationItem = {
    href: string;
    label: string;
    mobileLabel?: string;
};

const navigationItems: NavigationItem[] = [
    { href: "#inicio", label: "Inicio" },
    { href: "#unete", label: "Únete" },
    { href: "#family", label: "Reunión Familiar" },
    { href: "#aliados", label: "Aliados" },
    { href: "#contact", label: "Contacto" },
    { href: "agentes.html", label: "Agentes" },
    { href: "propiedades.html", label: "Propiedades" },
    {
        href: "centers.html",
        label: "Centros de Mercado",
        mobileLabel: "Centros",
    },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mobileMenuId = useId();

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsMenuOpen(false);
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <header className="sticky top-0 z-50 h-20 border-b bg-white shadow-sm">
                <nav
                    aria-label="Navegación principal"
                    className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8"
                >
                    <Link href="/" className="shrink-0" aria-label="KW México — Inicio">
                        <img
                            src="https://www.kwmexico.mx/assets/images/main_menu_section/kw-menu-icon-index.png"
                            alt="KW México"
                            className="h-10 w-auto"
                        />
                    </Link>

                    <div className="hidden items-center gap-7 lg:flex">
                        {navigationItems.map(({ href, label }, index) => (
                            <a
                                key={href}
                                href={href}
                                className={`text-sm font-medium text-neutral-700 transition-colors hover:text-red-600 ${
                                    index === 0 ? "text-red-600" : ""
                                }`}
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="rounded-md p-2 text-neutral-800 transition-colors hover:bg-neutral-100 lg:hidden"
                        aria-label="Abrir menú"
                        aria-expanded={isMenuOpen}
                        aria-controls={mobileMenuId}
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu aria-hidden="true" size={28} />
                    </button>
                </nav>
            </header>

            {isMenuOpen && (
                <div
                    id={mobileMenuId}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menú de navegación"
                    className="fixed inset-0 z-60 bg-neutral-950 text-white lg:hidden"
                >
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-5 top-1/2 -translate-y-1/2 text-[15rem] font-black leading-none text-white/5 italic"
                    >
                        KW
                    </span>

                    <button
                        type="button"
                        className="absolute right-6 top-6 z-20 rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-red-500"
                        aria-label="Cerrar menú"
                        onClick={closeMenu}
                        autoFocus
                    >
                        <X aria-hidden="true" size={36} />
                    </button>

                    <div className="relative z-10 flex h-full flex-col px-6 pb-8 pt-20">
                        <nav
                            aria-label="Navegación móvil"
                            className="flex flex-1 flex-col justify-center gap-2"
                        >
                            {navigationItems.map(
                                ({ href, label, mobileLabel }, index) => (
                                    <a
                                        key={href}
                                        href={href}
                                        onClick={closeMenu}
                                        className="group flex items-baseline gap-4 border-b border-white/10 py-3 text-xl font-semibold transition-colors hover:text-red-500"
                                    >
                                        <span className="text-xs font-normal tabular-nums text-red-500">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        {mobileLabel ?? label}
                                    </a>
                                ),
                            )}
                        </nav>

                        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <a
                                href="tel:+524422512295"
                                className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                            >
                                <Phone aria-hidden="true" className="text-red-500" size={20} />
                                (52) 442 251 2295
                            </a>
                            <a
                                href="#contact"
                                onClick={closeMenu}
                                className="rounded-lg bg-red-600 px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-white hover:text-neutral-900"
                            >
                                Buscar Propiedades
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
