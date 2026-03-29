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
import { CartProvider } from "@/contexts/CartContext";

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
  title: "VASLIC — Something for everyone",
  description:
    "Every drop is a permanent archive. VASLIC curates limited-edition fashion across five distinct aesthetics — Gothic, Bohemian, Avant-Garde, Street, and Funky. No restocks. No compromise.",
  keywords: ["VASLIC", "limited edition fashion", "editorial design", "Something for everyone"],
  openGraph: {
    title: "VASLIC — Something for everyone",
    description: "Limited drops, retired forever. Curating the intersection of subculture and high fashion.",
    type: "website",
  },
  icons: [
    {
      rel: "icon",
      url: "/images/favicon-light.png",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      url: "/images/favicon-dark.png",
      media: "(prefers-color-scheme: dark)",
    },
  ],
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
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className="antialiased min-h-screen bg-vaslic-surface text-vaslic-on-surface">
        <SmoothScroll>
          <CartProvider>
            {children}
          </CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
