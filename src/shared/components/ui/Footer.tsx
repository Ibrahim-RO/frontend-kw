import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-white text-center space-y-2 md:space-y-5 py-3">
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 py-5">
                <div>
                    <img src="https://www.kwmexico.mx/assets/images/main_menu_section/footer-logo.png" alt="Logo KW México" />
                </div>
                <nav className="flex flex-wrap gap-5 text-sm">
                    <Link
                        href={'/terminos-uso'}
                        className="hover:text-red-500 transition-colors duration-300"
                    >
                        Términos de uso
                    </Link>
                    <Link
                        href={'/aviso-privacidad'}
                        className="hover:text-red-500 transition-colors duration-300"
                    >
                        Aviso de privacidad
                    </Link>
                </nav>
            </div>

            <div>
                <p className="text-sm">&copy; {new Date().getFullYear()} Keller Williams México. Todos los derechos reservados.</p>
                <span className="text-xs text-gray-300">Desarrollado por <a href="https://www.devstackstudio.com.mx/" className="underline">DevStackStudio</a></span>
            </div>
        </footer>
    )
}
