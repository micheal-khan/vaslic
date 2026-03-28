"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Exact image URLs from the Stitch HTML source ────────────────────────────
const IMAGES = {
    gothic:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCUTDlsQeP6lPV-nR5LaRXmf2ANnGcalWmBaum5MwM6FXPz09zvU7q6S3TMZikwZQpcW9vcHXjexrPezbzg8NuUFoEkf30RmoJo8rrMbQH3Icmk1Zj-7b0vE-uBer9U_X7DOfuScQ535FEKGpP5MMsHdRafLSSfhc03BbeLE7JslgBhrvbXpbZhhJV-vxdVDfQe0YsIKpieZ1qWckd9tD7ZJ0DhSxapkXkjWqImkftfut3tgpmT-ZOIZNulYHtXafXTPXber_lkCQ0",
    bohemian:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnP01Ukg8pgd17yyKws2akaGZoCK3HIXcksOtjeQq928Z2n6jF_7ArvGbsBwyLmmUJpX-kNj4vUTTXlscpHsstzCu0zi9hBaJuKms2lh4BoQt3f1Z9ixZWqAXUx7qS0wNG0y3XilEMv60vKTlEbb_BzP_-1ddvHztCtz8bEivEYPFJIG9VCYfHBxqxnHCPHKm1IUZGMKoLFIEj6JkSErSsIHwIP4wHkJSNTamRBCgOx2GGJGOHDbywBqpLP45OQIGles4kW_-zjA",
    avantGarde:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBOpO5lF9xS3Z2l1uB5lZo4lcfLib6hdzt-bglgA638S3c3idsHkMngoWkTrCDRqQtgocppTsAxtZmvN_NlXe_Jzo-xePSn8rn4qpZB5Wam62_ol5MN6PnIxQTaZ2mbR_3XzqEy9rI8C2up2PbisSKg3Oj5u8ISzZ70zJ3mB-qt1OfH8AHgrsf_BGdwJCpabtH740T5lb_PXNQe5gmzji0x2Nmi95i0I6uLlCCBq3qwZlHL5XrEib7myefEjOhys8AMFqbHLCscaTg",
    street:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCFW2CLM5hkaF1DvZEM7D83E985ECLYkZOReOq1vTSzrn88bYVwRBxgn6GxDeyANAyBaagkvwkptXkhhib-RwJQqZJ9AT8U1408WskuElwq6wRnolzZumqpzdIpgYhtF3UCsuvt5XrmB04eYTuvF9NXkXwlIpvd-V4AhvwobgKTdkBRYFJhSTYhnerxHdtiofMglHNW5vXJGr8brdUWVodUU1L6kqZ6Zt17tVFVCg4H3d_nn23RIQYgz-oOdC3oACHQGFuZCgA6yjQ",
    funky:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCAWllXXPFmv4PP22dWuEtn6IP5oBS-nUQ95tNbgQAC-jr2ApQqBIJJ3ljXGH0OrtPYC5cvBJ9JaCQXRGGDQRyS56JJQHCJ5tRRbC6kW4b-6OaqdGxq4gDsZ7hs-tvipv-CU7qoRyJ66-mCpYtAe_aLvLntDlY9p_8fzBA9KkkNFA5OI946BbALAKr_7oeUsEFBbJr-4i4srG2j3gyVxlBU7nwPjgfLc86V4x8Xk3n3TRGWJ3vbn6NF-1KLUkUcOfRCejvlk1E7-eE",
};

const panels = [
    {
        slug: "gothic",
        label: "Gothic",
        bg: "#0a0a0a",
        labelColor: "text-red-900", // on-secondary-fixed-variant
        font: "'UnifrakturMaguntia', serif",
        italic: false,
        ctaLabel: "CURATE",
        ctaBg: "transparent",
        ctaBorderClass: "border-red-900",
        ctaTextClass: "text-red-900",
        watermark: "G",
        watermarkFont: "'Space Grotesk', sans-serif",
        tagline: "The architecture of shadows. Wear the darkness.",
        taglineClass: "text-neutral-400",
    },
    {
        slug: "bohemian",
        label: "Bohemian",
        bg: "#c77b4a",
        labelColor: "text-black",
        font: "'Playfair Display', serif",
        italic: true,
        ctaLabel: "EXPLORE",
        ctaBg: "transparent",
        ctaBorderClass: "border-black",
        ctaTextClass: "text-black",
        watermark: "B",
        watermarkFont: "'Playfair Display', serif",
        tagline: "Organic flow, earth-bound spirit. Artisanal craft for the wandering soul.",
        taglineClass: "text-black/70",
    },
    {
        slug: "avant-garde",
        label: "Avant-\nGarde",
        bg: "#ffffff",
        labelColor: "text-black",
        font: "'Bebas Neue', sans-serif",
        italic: false,
        ctaLabel: "ACCESS",
        ctaBg: "#0a0a0a",
        ctaBorderClass: "",
        ctaTextClass: "text-white",
        watermark: "AV",
        watermarkFont: "'Bebas Neue', sans-serif",
        tagline: "Experimental forms. Defying the expected. Wearable sculpture.",
        taglineClass: "text-black/60",
    },
    {
        slug: "street",
        label: "STREET",
        bg: "#1c1c1c",
        labelColor: "text-yellow-300",
        font: "'Bebas Neue', sans-serif",
        italic: false,
        ctaLabel: "ACQUIRE",
        ctaBg: "transparent",
        ctaBorderClass: "border-yellow-300",
        ctaTextClass: "text-yellow-300",
        watermark: "STREET",
        watermarkFont: "'Bebas Neue', sans-serif",
        tagline: "Brutalist aesthetics. Concrete playground. Urban armor.",
        taglineClass: "text-neutral-500",
    },
    {
        slug: "funky",
        label: "FUNKY",
        bg: "#0d0d2b",
        labelColor: "text-pink-300",
        font: "'Righteous', cursive",
        italic: false,
        ctaLabel: "IGNITE",
        ctaBg: "#ffb4a8",
        ctaBorderClass: "",
        ctaTextClass: "text-[#0d0d2b]",
        watermark: "",
        watermarkFont: "",
        tagline: "Retro-future pop. Electric energy. Stand out in the void.",
        taglineClass: "text-pink-300/60",
    },
];

// ─── Hero: full-screen 5-panel with "Something For Everyone" overlay ──────────
export function HeroSection() {
    return (
        <section className="relative h-screen w-full flex overflow-hidden">
            {/* Gothic */}
            <PanelSlice panel={panels[0]} image={IMAGES.gothic} />
            {/* Bohemian */}
            <PanelSlice panel={panels[1]} image={IMAGES.bohemian} />
            {/* Avant-Garde */}
            <PanelSlice panel={panels[2]} image={IMAGES.avantGarde} />
            {/* Street */}
            <PanelSlice panel={panels[3]} image={IMAGES.street} />
            {/* Funky */}
            <PanelSlice panel={panels[4]} image={IMAGES.funky} />

            {/* Overlay heading — mix-blend-difference makes text show through */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                <h1
                    className="font-headline text-[10rem] md:text-[12rem] font-black tracking-tighter leading-none text-white text-center"
                    style={{ mixBlendMode: "difference" }}
                >
                    Something <br /> For Everyone
                </h1>
            </div>
        </section>
    );
}

function PanelSlice({
    panel,
    image,
}: {
    panel: (typeof panels)[number];
    image: string;
}) {
    return (
        <div
            className="group relative flex-1 h-full transition-all duration-700 hover:flex-[2] flex items-center justify-center overflow-hidden grayscale hover:grayscale-0"
            style={{ backgroundColor: panel.bg }}
        >
            <img
                src={image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
            />
            <span
                className="relative z-10 text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    fontFamily: panel.font,
                    fontStyle: panel.italic ? "italic" : "normal",
                    color:
                        panel.slug === "gothic"
                            ? "#7f1d1d"
                            : panel.slug === "bohemian"
                                ? "#000"
                                : panel.slug === "avant-garde"
                                    ? "#000"
                                    : panel.slug === "street"
                                        ? "#fde047"
                                        : "#f9a8d4",
                }}
            >
                {panel.label.includes("\n") ? (
                    <>
                        Avant-<br />Garde
                    </>
                ) : (
                    panel.label
                )}
            </span>
        </div>
    );
}

// ─── Category Tiles (5-panel grid below ticker) ───────────────────────────────
export function CategoryGrid() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 h-auto md:h-[640px]">
            {/* Gothic */}
            <div className="relative bg-black p-12 flex flex-col justify-between group overflow-hidden">
                <div className="relative z-10">
                    <span
                        className="text-5xl leading-none block"
                        style={{ fontFamily: "'UnifrakturMaguntia', serif", color: "#7f1d1d" }}
                    >
                        Gothic
                    </span>
                    <p className="font-body text-sm mt-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        The architecture of shadows. Wear the darkness.
                    </p>
                </div>
                <Link
                    href="/gothic"
                    className="relative z-10 self-start border border-red-900 px-6 py-2 font-label text-xs tracking-widest text-red-900 hover:bg-red-900 hover:text-white transition-all duration-300"
                >
                    CURATE
                </Link>
                <div className="absolute bottom-4 right-4 text-neutral-900 font-headline text-8xl font-black pointer-events-none opacity-20 group-hover:translate-y-4 transition-transform duration-700">
                    G
                </div>
            </div>

            {/* Bohemian */}
            <div
                className="relative p-12 flex flex-col justify-between group overflow-hidden text-black"
                style={{ backgroundColor: "#c77b4a" }}
            >
                <div className="relative z-10">
                    <span
                        className="text-5xl italic leading-none block"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Bohemian
                    </span>
                    <p className="font-body text-sm mt-4 text-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        Organic flow, earth-bound spirit. Artisanal craft for the wandering soul.
                    </p>
                </div>
                <Link
                    href="/bohemian"
                    className="relative z-10 self-start border border-black px-6 py-2 font-label text-xs tracking-widest hover:bg-black hover:text-[#c77b4a] transition-all duration-300"
                >
                    EXPLORE
                </Link>
                <div
                    className="absolute bottom-4 right-4 text-black/5 text-9xl font-black pointer-events-none group-hover:rotate-12 transition-transform duration-700"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    B
                </div>
            </div>

            {/* Avant-Garde */}
            <div className="relative bg-white p-12 flex flex-col justify-between group overflow-hidden text-black">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-300/20 blur-3xl pointer-events-none" />
                <div className="relative z-10">
                    <span
                        className="text-7xl tracking-tighter leading-none block"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        Avant-<br />Garde
                    </span>
                    <p className="font-body text-sm mt-4 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        Experimental forms. Defying the expected. Wearable sculpture.
                    </p>
                </div>
                <Link
                    href="/avant-garde"
                    className="relative z-10 self-start bg-black text-white px-8 py-3 font-label text-xs tracking-widest hover:translate-x-2 transition-transform duration-300"
                >
                    ACCESS
                </Link>
                <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
                    <span className="text-[20rem]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        AV
                    </span>
                </div>
            </div>

            {/* Street */}
            <div className="relative bg-neutral-900 p-12 flex flex-col justify-between group overflow-hidden">
                <div className="relative z-10">
                    <span
                        className="text-6xl text-yellow-300 leading-none block"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        STREET
                    </span>
                    <p className="font-body text-sm mt-4 text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        Brutalist aesthetics. Concrete playground. Urban armor.
                    </p>
                </div>
                <Link
                    href="/street"
                    className="relative z-10 self-start border-2 border-yellow-300 px-6 py-2 font-label text-xs font-bold tracking-widest text-yellow-300 hover:bg-yellow-300 hover:text-black transition-all duration-300"
                >
                    ACQUIRE
                </Link>
                <div
                    className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rotate-90 text-neutral-800 text-8xl tracking-[2rem] opacity-50 select-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    STREET
                </div>
            </div>

            {/* Funky */}
            <div
                className="relative p-12 flex flex-col justify-between group overflow-hidden"
                style={{ backgroundColor: "#0d0d2b" }}
            >
                <div className="relative z-10">
                    <span
                        className="text-5xl text-pink-300 leading-none block"
                        style={{ fontFamily: "'Righteous', cursive" }}
                    >
                        FUNKY
                    </span>
                    <p className="font-body text-sm mt-4 text-pink-300/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        Retro-future pop. Electric energy. Stand out in the void.
                    </p>
                </div>
                <Link
                    href="/funky"
                    className="relative z-10 self-start px-6 py-2 font-label text-xs font-black tracking-widest hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: "#ffb4a8", color: "#0d0d2b" }}
                >
                    IGNITE
                </Link>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-400 opacity-20 blur-3xl rounded-full" />
            </div>
        </section>
    );
}
