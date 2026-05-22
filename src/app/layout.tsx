import type { Metadata } from "next";
import { Quattrocento, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { Footer, Header } from "@/features";

const quattrocento = Quattrocento({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-quattrocento",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thirs Upz | Classic Fashion Born in Lima",
  description:
    "Explore Thirs Upz, an exclusive clothing brand born in Lima. Discover high-quality, classic-inspired fashion designed for timeless style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${quattrocento.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
