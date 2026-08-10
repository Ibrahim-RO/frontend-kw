import Footer from "@/src/shared/components/ui/Footer";
import Header from "@/src/shared/components/ui/Header";

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <section>
            <Header />
            {children}
            <Footer />
        </section>
    );
}
