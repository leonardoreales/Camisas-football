import type { Metadata } from "next";
import { Oswald, Inter, JetBrains_Mono, Abril_Fatface } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const abrilFatface = Abril_Fatface({
  variable: "--font-abril",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: {
    default: "Rewind — Camisas de fútbol retro premium",
    template: "%s · Rewind",
  },
  description:
    "Camisas de fútbol retro y clásicas. Los kits icónicos del fútbol mundial, versiones jugador y aficionado. Envío a toda Colombia con pago seguro.",
  keywords: [
    "camisas fútbol retro Colombia",
    "camisetas vintage fútbol",
    "kits clásicos fútbol",
    "camisas fútbol originales Colombia",
    "tienda camisas fútbol",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Rewind",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CO"
      className={`${oswald.variable} ${abrilFatface.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="bg-base text-content flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
