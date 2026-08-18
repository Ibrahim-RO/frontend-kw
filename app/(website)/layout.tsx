import Footer from "@/src/shared/components/ui/Footer";
import Header from "@/src/shared/components/ui/Header";
import AosInitializer from "@/src/shared/components/AosInitializer";

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <section>
            <AosInitializer />
            <Header />
            {children}
            <Footer />
        </section>
    );
}
