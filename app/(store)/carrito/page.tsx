import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartContent } from "@/components/store/CartContent";
import { WhatsAppButton } from "@/components/store/WhatsAppButton";

export const metadata = { title: "Carrito" };

export default function CarritoPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto flex-1 max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="mb-8 text-4xl font-bold sm:text-5xl">Carrito</h1>
        <CartContent />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
