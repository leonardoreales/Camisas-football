import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductDetail } from "@/components/store/ProductDetail";
import { WhatsAppButton } from "@/components/store/WhatsAppButton";
import { getProductoBySlug, productosMock } from "@/lib/mock-data";

export function generateStaticParams() {
  return productosMock.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = getProductoBySlug(slug);
  return { title: producto ? `${producto.equipo} ${producto.temporada}` : "Producto" };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = getProductoBySlug(slug);
  if (!producto) notFound();

  return (
    <>
      <Navbar />

      <main className="mx-auto flex-1 max-w-7xl px-4 py-8 sm:px-6">
        <Link
          href="/catalogo"
          className="text-muted hover:text-content mb-6 inline-flex items-center gap-1 text-sm normal-case transition-colors"
        >
          <ChevronLeft className="size-4" /> Volver al catálogo
        </Link>

        <ProductDetail producto={producto} />
      </main>

      <Footer />
      <WhatsAppButton
        producto={`${producto.equipo} ${producto.temporada}`}
      />
    </>
  );
}
