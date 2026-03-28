import type { Metadata } from "next";
import {
  Space_Grotesk,
  Manrope,
  UnifrakturMaguntia,
  Playfair_Display,
  Bebas_Neue,
  Righteous,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const unifraktur = UnifrakturMaguntia({
  variable: "--font-unifraktur",
  weight: "400",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const righteous = Righteous({
  variable: "--font-righteous",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VASLIC — The Kinetic Curator",
  description:
    "Every drop is a permanent archive. VASLIC curates limited-edition fashion across five distinct aesthetics — Gothic, Bohemian, Avant-Garde, Street, and Funky. No restocks. No compromise.",
  keywords: ["VASLIC", "limited edition fashion", "editorial design", "kinetic curator"],
  openGraph: {
    title: "VASLIC — The Kinetic Curator",
    description: "Limited drops, retired forever. Curating the intersection of subculture and high fashion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${unifraktur.variable} ${playfair.variable} ${bebas.variable} ${righteous.variable}`}
      data-theme="avant-garde"
    >
      <body className="antialiased min-h-screen bg-vaslic-surface text-vaslic-on-surface">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
