"use client";
import { useState } from "react";
import Link from "next/link";
import StreetNavbar from "@/components/navbars/StreetNavbar";
import ThemeDock from "@/components/ThemeDock";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const YELLOW = "#f5e642";
const RED_ERR = "#ffb4ab";

// ─── Image assets ──────────────────────────────────────────────────────────────
const HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBLajw2ZwlK3QmTJ_xXzZDh3_f8RbO7dw-hThmXxlTjtoCQqHYkRWFN-hAVfaZzrvnh51IDdx1K4Kxbhd734MqXZN-qlxZNfiZyifrx5aMqUSj1qBPEAJnrM8FAuSbkQtS79dJFu2fz_hNMfz481LKJeLkp5kJbEDw5WeyUlEfvGRmbNTH2x6pqaXOI2CZBSqFRSBDfD4zru1spTQ4C2jnra5pHYa3x7mccCUyOUC5XuZN69URerYAPBqAXfDpWULbDYgiqL55m0d0";
const DETAIL_1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuDV-_fitJ1dZg5lQkc7l80esFMayeOUdymKEOQFskqZ-TjQzLajF8S1RDRmpBE6kVJAE-tS63N3jUEWwIGSi5J9DuatD0E3E3iJsJr2xUqqExUnxHDcP5e0Ig925QFI7px9OqbPZ-I_D_9vUWRrGW3FHSektaEkOE1xsrJVtMvN_aIsmVPfJqECGzPuR7RBOuEDNkdMs7CSNRLZlfVOYjYs09y0hxtJNkPM8JwVIneKXjjvFaAteDBZKiY-3V_6-Zp-DB3s3M4bor8";
const DETAIL_2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuAp0o5xTFHL4lOuzkJbjzT4dsGKW9nj3qTrbZRBQwC0ISK80g3muA4KhkkSQVp8UBlYZzO4wN80xJvI2jQ6cnH0Yf5mJlzxBTqDgJx4C1CWqV4wdhpf4zpRHx1_Fs9PqV3FWzWXOuxi4sbb6qmd50AKDA4T9zT3lkAvkryg2kNhhRiHYsO9rBy-igdg4bOZqxUSaDWxoI5bHTORzo4pxXEep60bzqcJXoTia0FT2KGcn1E4fz-1TObZJsEz1icQEDsvvyEnJu97wmk";

const SIZES = ["XS", "S", "M", "L", "XL"];

const SPECS = [
    { label: "Material", value: "Reinforced Poly-Armor Cordura" },
    { label: "Tech", value: "FIDLOCK® V-BUCKLE System" },
    { label: "Fit", value: "Modular Kinetic Taper" },
    { label: "Utility", value: "8x Expandable Bays" },
];

const themeDock = [
    { title: "Gothic", href: "/gothic", bg: "#0a0a0a", dot: "#7f1d1d", border: "rgba(255,255,255,0.1)", active: false },
    { title: "Street", href: "/street", bg: "#1a1a1a", dot: YELLOW, border: YELLOW, active: true },
    { title: "Avant-Garde", href: "/avant-garde", bg: "#ffffff", dot: "#008DB9", border: "rgba(0,0,0,0.1)", active: false },
    { title: "Bohemian", href: "/bohemian", bg: "#f5ebe0", dot: "#c77b4a", border: "rgba(0,0,0,0.1)", active: false },
];

export default function CargoSystemV2Page() {
    const [selectedSize, setSelectedSize] = useState("M");
    const [ctaHovered, setCtaHovered] = useState(false);

    return (
        <div
            className="min-h-screen overflow-x-hidden"
            style={{ background: "#131313", color: "#e5e2e1", fontFamily: "'Manrope', sans-serif" }}
        >
            {/* ── Grain texture + keyframes ── */}
            <style>{`
        @keyframes ticker { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
        @keyframes ping-custom { 0%, 100% { transform:scale(1); opacity:0.75; } 50% { transform:scale(2); opacity:0; } }
        .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; display:inline-block; line-height:1; }
      `}</style>

            {/* ── Floating Navbar ── */}
            <StreetNavbar />

            <main className="pt-24 pb-20 relative overflow-hidden">
                {/* ── Grain texture overlay ── */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        opacity: 0.05,
                    }}
                />
                {/* Yellow ambient blob top-left */}
                <div
                    className="absolute -top-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: `${YELLOW}1a`, filter: "blur(120px)" }}
                />
                {/* Triangle geometry motif (right side, 5% opacity) */}
                <div className="hidden lg:block absolute bottom-1/4 -right-10 opacity-5 pointer-events-none z-0">
                    <svg fill={YELLOW} width="400" height="400" viewBox="0 0 100 100">
                        <path d="M0 100 L100 100 L100 0 Z" />
                    </svg>
                </div>

                {/* ── 12-col main grid ── */}
                <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">

                    {/* ── Left Gallery (7 cols) ── */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        {/* Hero image (4:5) */}
                        <div
                            className="relative group overflow-hidden"
                            style={{ aspectRatio: "4/5", background: "#1c1b1b" }}
                        >
                            <img
                                src={HERO_IMG}
                                alt="Cargo System V2"
                                className="w-full h-full object-cover transition-all duration-700"
                                style={{ filter: "grayscale(100%) brightness(75%)" }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0) brightness(100%)"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%) brightness(75%)"; }}
                            />
                            {/* "Raw Kinetic Soul" chip */}
                            <div className="absolute top-8 left-8">
                                <span
                                    className="text-[10px] tracking-widest uppercase px-3 py-1"
                                    style={{ color: YELLOW, background: "rgba(0,0,0,0.8)", fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    Raw Kinetic Soul
                                </span>
                            </div>
                            {/* "STREET V2" watermark */}
                            <div className="absolute bottom-8 right-8 text-right select-none pointer-events-none">
                                <span
                                    className="text-4xl font-black uppercase"
                                    style={{ color: "rgba(255,255,255,0.08)", fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    STREET V2
                                </span>
                            </div>
                        </div>

                        {/* 2-col detail thumbnails */}
                        <div className="grid grid-cols-2 gap-8">
                            {[DETAIL_1, DETAIL_2].map((src, i) => (
                                <div
                                    key={i}
                                    className="relative group overflow-hidden"
                                    style={{ aspectRatio: "1/1", background: "#1c1b1b" }}
                                >
                                    <img
                                        src={src}
                                        alt={`Detail ${i + 1}`}
                                        className="w-full h-full object-cover transition-all duration-500"
                                        style={{ filter: "grayscale(100%)" }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0)"; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%)"; }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right Product Panel (5 cols) ── */}
                    <div className="lg:col-span-5 flex flex-col gap-10">
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span
                                    className="text-xs tracking-widest uppercase"
                                    style={{ color: YELLOW, fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    VAULT ID: VLK-STRT-002
                                </span>
                                <div
                                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-tighter border"
                                    style={{ background: "rgba(255,180,171,0.1)", color: RED_ERR, borderColor: "rgba(255,180,171,0.2)" }}
                                >
                                    LIMITED: 12 LEFT
                                </div>
                            </div>

                            <h1
                                className="leading-none tracking-tighter uppercase italic"
                                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 900 }}
                            >
                                CARGO SYSTEM <span style={{ color: YELLOW }}>V2</span>
                            </h1>

                            <div className="flex items-end gap-4">
                                <span
                                    className="text-4xl font-light"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    $240
                                </span>
                                <span
                                    className="text-sm mb-1 uppercase tracking-widest"
                                    style={{ color: "#bec8cf", fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    Global Currency Units
                                </span>
                            </div>
                        </div>

                        {/* Urgency + Size box */}
                        <div
                            className="p-8"
                            style={{ background: "#0e0e0e", borderLeft: `4px solid ${YELLOW}` }}
                        >
                            {/* Animated ping urgency */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="relative flex h-3 w-3">
                                    <span
                                        className="absolute inline-flex h-full w-full rounded-full"
                                        style={{
                                            background: "#ef4444",
                                            opacity: 0.75,
                                            animation: "ping-custom 2s cubic-bezier(0,0,0.2,1) infinite",
                                        }}
                                    />
                                    <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: "#ef4444" }} />
                                </span>
                                <p
                                    className="text-sm font-black uppercase tracking-widest"
                                    style={{ color: "#ef4444", fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    UNITS REMAINING: 5
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-xs uppercase tracking-widest"
                                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        SELECT ARCHIVE SIZE
                                    </span>
                                    <a
                                        href="#"
                                        className="text-[10px] uppercase underline underline-offset-4"
                                        style={{ color: YELLOW, fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        Size Guide
                                    </a>
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {SIZES.map((sz) => (
                                        <button
                                            key={sz}
                                            onClick={() => setSelectedSize(sz)}
                                            className="font-bold text-sm transition-all"
                                            style={{
                                                aspectRatio: "1/1",
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                background: selectedSize === sz ? YELLOW : "transparent",
                                                color: selectedSize === sz ? "black" : "#e5e2e1",
                                                border: selectedSize === sz ? "none" : "1px solid #3e484e",
                                            }}
                                        >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ADD TO VAULT CTA */}
                        <button
                            className="w-full font-black text-2xl py-6 uppercase italic"
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                background: YELLOW,
                                color: "black",
                                boxShadow: ctaHovered ? "6px 6px 0px #000" : "4px 4px 0px #000",
                                transform: ctaHovered ? "translate(-2px, -2px)" : undefined,
                                transition: "all 0.1s ease",
                            }}
                            onMouseEnter={() => setCtaHovered(true)}
                            onMouseLeave={() => setCtaHovered(false)}
                        >
                            ADD TO VAULT
                        </button>

                        {/* Specifications + Street Cred */}
                        <div className="space-y-8">
                            <section>
                                <h3
                                    className="text-sm font-black uppercase italic tracking-widest pb-2 mb-4"
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        borderBottom: "1px solid #3e484e",
                                    }}
                                >
                                    SPECIFICATIONS
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {SPECS.map((spec) => (
                                        <div key={spec.label}>
                                            <p
                                                className="text-[10px] uppercase tracking-widest mb-1"
                                                style={{ color: "#bec8cf", fontFamily: "'Space Grotesk', sans-serif" }}
                                            >
                                                {spec.label}
                                            </p>
                                            <p
                                                className="text-xs font-medium uppercase"
                                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                            >
                                                {spec.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3
                                    className="text-sm font-black uppercase italic tracking-widest pb-2 mb-4"
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        borderBottom: "1px solid #3e484e",
                                    }}
                                >
                                    STREET CRED
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: "#bec8cf" }}>
                                    Forged in the shadows of Neo-Berlin, the{" "}
                                    <span style={{ color: "#e5e2e1" }}>CARGO SYSTEM V2</span> is more than apparel; it is a deployable tactical asset. Engineered for those who operate in high-density urban zones where mobility is the only currency. Featuring water-repellent shells and asymmetrical storage arrays.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Fixed Bottom Yellow Ticker ── */}
            <div
                className="fixed bottom-0 left-0 w-full py-3 z-40 overflow-hidden"
                style={{ background: YELLOW, color: "black", borderTop: "1px solid rgba(0,0,0,0.1)" }}
            >
                <div
                    style={{
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        animation: "ticker 30s linear infinite",
                    }}
                >
                    {[0, 1, 2, 3].map((i) => (
                        <span
                            key={i}
                            className="font-black text-xs uppercase px-4"
                            style={{ letterSpacing: "0.3em", fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Once it&apos;s gone, it&apos;s gone. Forever. No reprints. No restocks. No exceptions. •{" "}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── Theme Dock ── */}
            <ThemeDock />

            {/* ── Material Icons + Fonts ── */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;900&family=Manrope:wght@200;300;400;500;600;700;800&display=swap" />
        </div>
    );
}
