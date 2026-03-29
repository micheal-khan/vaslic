"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, ArrowRight } from "lucide-react";
import AvantGardeNavbar from "@/components/navbars/AvantGardeNavbar";
import ThemeDock from "@/components/ThemeDock";
import { UnitsCounter } from "@/components/UnitsCounter";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const RED = "#c0392b";
const COBALT = "#2980b9";
const OCHRE = "#e67e22";
const NAVY = "#0a0a0a";

// ─── Paint-stroke underline (matching Stitch clip-path) ─────────────────────
const BRUSH_PATH =
    "2% 16%, 10% 32%, 20% 18%, 28% 44%, 39% 12%, 48% 38%, 59% 22%, 69% 48%, 82% 15%, 91% 33%, 100% 14%, 98% 85%, 85% 72%, 72% 95%, 58% 78%, 45% 92%, 31% 75%, 19% 88%, 8% 70%, 1% 82%";

// ─── Paint-stroke button ───────────────────────────────────────────────────────
function PaintButton({ color, children }: { color: string; children: React.ReactNode }) {
    return (
        <div className="relative inline-block">
            <button
                className="text-xl uppercase tracking-widest text-neutral-900 relative pb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
                {children}
            </button>
            <div
                className="absolute bottom-0 left-0 w-full h-[10px]"
                style={{
                    background: color,
                    clipPath: `polygon(${BRUSH_PATH})`,
                }}
            />
        </div>
    );
}

// ─── Velvet Rope SVG ──────────────────────────────────────────────────────────
function VelvetRope() {
    return (
        <svg className="w-full h-full p-4 absolute inset-0 pointer-events-none" viewBox="0 0 400 400">
            <path d="M 0 150 Q 200 250 400 150" fill="none" stroke={RED} strokeWidth="8" />
            <circle cx="10" cy="150" r="12" fill="#d4af37" />
            <circle cx="390" cy="150" r="12" fill="#d4af37" />
        </svg>
    );
}

export default function AvantGardeClientPage({ products, category }: { products: any[], category: any }) {
    const [email, setEmail] = useState("");
    const liveProducts = products?.filter(p => p.status !== 'retired') || [];
    const cemeteryItems = products?.filter(p => p.status === 'retired') || [];

    return (
        <div className="bg-white text-neutral-900 overflow-x-hidden min-h-screen" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

            {/* ── Frosted White Navbar Component ── */}
            <AvantGardeNavbar />

            <main className="pt-24 min-h-screen relative">
                {/* ── Painterly SVG background overlays ── */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
                    {/* Cobalt wave — top-left */}
                    <svg className="absolute" style={{ top: "10%", left: "-5%", width: "40%", opacity: 0.2, transform: "rotate(-12deg)" }} viewBox="0 0 500 200">
                        <path d="M10,100 C50,20 150,180 250,100 C350,20 450,180 490,100" fill="none" stroke={COBALT} strokeLinecap="round" strokeWidth="60" />
                    </svg>
                    {/* Ochre wave — right */}
                    <svg className="absolute" style={{ top: "40%", right: "-10%", width: "50%", opacity: 0.15, transform: "rotate(45deg)" }} viewBox="0 0 500 200">
                        <path d="M20,50 Q150,150 300,50 T480,150" fill="none" stroke={OCHRE} strokeLinecap="round" strokeWidth="80" />
                    </svg>
                    {/* Red dash — bottom */}
                    <svg className="absolute" style={{ bottom: "20%", left: "20%", width: "30%", opacity: 0.2, transform: "rotate(-3deg)" }} viewBox="0 0 500 200">
                        <path d="M10,100 L490,100" fill="none" stroke={RED} strokeDasharray="20,10" strokeLinecap="round" strokeWidth="120" />
                    </svg>
                </div>

                {/* ── Hero text ── */}
                <section className="px-8 py-20 max-w-7xl mx-auto flex flex-col md:flex-row items-baseline gap-4">
                    <h1
                        className="leading-none tracking-tighter text-neutral-900 m-0"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(6rem, 12vw, 12rem)" }}
                    >
                        AVANT
                    </h1>
                    <div className="flex flex-col">
                        <h1
                            className="leading-none tracking-tighter text-neutral-900 m-0 -mt-8 md:-mt-16"
                            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(6rem, 12vw, 12rem)" }}
                        >
                            GARDE
                        </h1>
                        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-400 mt-2 max-w-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            Selected artifacts for the intentional few.
                        </p>
                    </div>
                </section>

                {/* ── Ticker ── */}
                <div className="overflow-hidden py-4 border-y border-neutral-800" style={{ background: "#171717" }}>
                    <div className="whitespace-nowrap inline-block" style={{ animation: "avantTicker 30s linear infinite" }}>
                        {[0, 1, 2].map((i) => (
                            <span key={i} className="text-2xl uppercase tracking-widest px-8 text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                Once it's gone, it's gone.{" "}
                                <span style={{ color: RED }}>Forever.</span>{" "}
                                No reprints. No restocks. No exceptions.{" "}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── 2×2 Staggered Product Grid ── */}
                <section className="py-32 px-8 max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-48">
                        {liveProducts.map((p, i) => {
                            const cardRotate = i % 2 === 0 ? "-2deg" : "2deg";
                            const translateY = i === 0 ? 0 : i === 1 ? 128 : i === 2 ? -64 : 64;
                            const editionBg = i === 0 ? NAVY : i === 1 ? RED : i === 2 ? OCHRE : "#f5f5f5";
                            const btnColor = i === 0 ? RED : i === 1 ? COBALT : i === 2 ? OCHRE : RED;
                            const editionAlign = i === 0 ? "right" : i === 1 ? "left" : i === 2 ? "rotating-side" : "block";
                            const infoAlign = i % 2 === 0 ? "start" : "end";
                            const editionRotate = i === 0 ? "rotate(6deg)" : i === 1 ? "rotate(-3deg)" : i === 2 ? "rotate(-90deg)" : "none";
                            const editionColor = i === 3 ? "black" : "white";

                            const cardInner = (
                                <div
                                    key={p.id}
                                    className="relative group"
                                    style={{ transform: `rotate(${cardRotate}) translateY(${translateY}px)`, cursor: p.vault_id ? "pointer" : "default" }}
                                >
                                    {/* Image */}
                                    <div className="relative overflow-hidden shadow-2xl bg-neutral-100" style={{ aspectRatio: "3/4" }}>
                                        <img
                                            src={p.images?.[0] || ""}
                                            alt={p.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        {/* Vault ID */}
                                        <div
                                            className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold tracking-tighter border border-neutral-200 uppercase flex items-center shadow-lg"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            <span className="mr-2">Vault ID: {p.vault_id}</span>
                                            <UnitsCounter productId={p.id} initial={p.sizes?.reduce((a: number, s: any) => a + s.units_remaining, 0) || 0} total={100} />
                                        </div>
                                        {/* Status Badge */}
                                        <div
                                            className="absolute top-4 right-4 px-3 py-1 text-[10px] font-bold tracking-tighter border border-neutral-200 uppercase flex items-center shadow-lg"
                                            style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                background: p.status === 'live' ? '#0a0a0a' : '#f5f5f5',
                                                color: p.status === 'live' ? 'white' : '#737373'
                                            }}
                                        >
                                            {p.status === 'live' ? 'Live' : 'Soon'}
                                        </div>
                                    </div>

                                    {/* Info panel */}
                                    <div
                                        className="mt-8 flex flex-col relative"
                                        style={{ alignItems: infoAlign === "end" ? "flex-end" : "flex-start", textAlign: infoAlign === "end" ? "right" : "left" }}
                                    >
                                        {/* Edition badge */}
                                        {editionAlign === "right" && (
                                            <div
                                                className="absolute -top-12 right-0 p-4 text-sm tracking-widest shadow-xl"
                                                style={{
                                                    fontFamily: "'Bebas Neue', sans-serif",
                                                    background: editionBg,
                                                    color: editionColor,
                                                    transform: editionRotate,
                                                    zIndex: 10,
                                                }}
                                            >
                                                Edition 1 of 50 — Never Reprinted
                                            </div>
                                        )}
                                        {editionAlign === "left" && (
                                            <div
                                                className="absolute -top-12 left-0 p-4 text-sm tracking-widest shadow-xl"
                                                style={{
                                                    fontFamily: "'Bebas Neue', sans-serif",
                                                    background: editionBg,
                                                    color: editionColor,
                                                    transform: editionRotate,
                                                    zIndex: 10,
                                                }}
                                            >
                                                Edition 1 of 50 — Never Reprinted
                                            </div>
                                        )}
                                        {editionAlign === "rotating-side" && (
                                            <div
                                                className="absolute p-4 text-sm tracking-[0.4em] shadow-xl"
                                                style={{
                                                    fontFamily: "'Bebas Neue', sans-serif",
                                                    background: editionBg,
                                                    color: editionColor,
                                                    top: "50%",
                                                    right: "-2rem",
                                                    transform: editionRotate,
                                                    transformOrigin: "center",
                                                    zIndex: 10,
                                                }}
                                            >
                                                Edition 1 of 50 — Never Reprinted
                                            </div>
                                        )}
                                        {editionAlign === "block" && (
                                            <div
                                                className="p-2 border border-neutral-200 mb-4 inline-block bg-neutral-100"
                                                style={{ background: editionBg }}
                                            >
                                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: editionColor, fontFamily: "'Space Grotesk', sans-serif" }}>
                                                    Edition 1 of 50 — Never Reprinted
                                                </span>
                                            </div>
                                        )}

                                        {/* Product name */}
                                        <h3
                                            className="leading-none mb-2"
                                            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
                                        >
                                            {p.name}
                                        </h3>

                                        {/* Price */}
                                        <div
                                            className="text-3xl text-neutral-400 mb-6"
                                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                        >
                                            {p.price || "$420"}
                                        </div>

                                        {/* CTA */}
                                        <PaintButton color={p.status === 'live' ? btnColor : '#d6d3d1'}>
                                            {p.status === 'live' ? 'Acquire Asset' : 'Join Waitlist'}
                                        </PaintButton>

                                        {/* Note */}
                                        {p.note && (
                                            <p className="mt-2 text-[8px] uppercase tracking-widest text-neutral-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                                {p.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                            const TargetLink = p.vault_id ? `/avant-garde/${p.vault_id.toLowerCase()}` : '/';
                            return p.vault_id ? <Link key={p.id} href={TargetLink}>{cardInner}</Link> : cardInner;
                        })}
                    </div>
                </section>

                {/* ── Decommissioned Gallery ── */}
                <section className="py-32 px-8 mt-48 border-t border-neutral-100" style={{ background: "#f9f9f9" }}>
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                            <h2
                                className="leading-none uppercase"
                                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4.5rem" }}
                            >
                                Decommissioned<br />
                                <span className="text-neutral-400">Gallery</span>
                            </h2>
                            <div className="text-right max-w-sm">
                                <p className="text-sm text-neutral-500 uppercase tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    These artifacts have been permanently removed from circulation. We do not restock. We do not revisit.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {cemeteryItems.map((item) => (
                                <Link href="/vault" key={item.id} className="relative group opacity-60 hover:opacity-100 transition-opacity">
                                    {/* Square grayscale image */}
                                    <div className="aspect-square bg-neutral-200 grayscale overflow-hidden hover:grayscale-0 transition-all">
                                        <img src={item.images?.[0] || ""} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Velvet Rope SVG overlay */}
                                    <VelvetRope />

                                    {/* Elevated white info card */}
                                    <div
                                        className="mt-6 bg-white p-6 shadow-lg mx-4 relative z-10"
                                        style={{ transform: "translateY(-20px)" }}
                                    >
                                        <div className="text-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                            <div className="text-sm tracking-widest uppercase mb-2" style={{ color: RED }}>
                                                Exhibit Closed — Permanently
                                            </div>
                                            <h4 className="text-2xl uppercase text-neutral-900">{item.name}</h4>
                                            <div className="mt-2 text-[10px] text-neutral-600 tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                                Vault ID: {item.vault_id}
                                            </div>
                                            <div className="mt-2 text-xs text-neutral-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                                Vault Exit: {new Date(item.created_at).getFullYear()}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* ── Footer ── */}
            <footer className="py-24 px-8 border-t-0 text-white" style={{ background: NAVY }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
                    <div>
                        <div className="text-lg font-black text-neutral-200 uppercase tracking-widest mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>VASLIC</div>
                        <p className="text-sm text-neutral-500 leading-relaxed uppercase tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            The Kinetic Curator. We do not cater to the mass market. We provide artifacts for the intentional few.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-sm uppercase tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#0891b2" }}>Navigation</span>
                        {["Privacy Policy", "Terms of Service", "Vault Registration", "Shipping"].map((l) => (
                            <a key={l} href="#" className="text-neutral-600 hover:text-cyan-400 transition-colors duration-300 text-sm uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{l}</a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-sm uppercase tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#0891b2" }}>Collections</span>
                        {["The Vault", "Active Drops", "Archive"].map((l) => (
                            <a key={l} href="#" className="text-neutral-600 hover:text-cyan-400 transition-colors duration-300 text-sm uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{l}</a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="p-6 bg-neutral-900 border border-neutral-800">
                            <span className="text-xl uppercase mb-4 block text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Subscribe to Scarcity</span>
                            <div className="flex items-end">
                                <input
                                    className="bg-transparent border-0 border-b w-full text-xs py-2 focus:outline-none focus:border-cyan-400"
                                    style={{ borderColor: "#404040", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}
                                    placeholder="ENCRYPTED EMAIL"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className="ml-4 hover:translate-x-1 transition-transform" style={{ color: "#22d3ee" }} aria-label="Submit">
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-24 pt-12 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
                    <p className="text-sm tracking-wide text-neutral-600 uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        © 2024 VASLIC. No reprints. No restocks. No exceptions.
                    </p>
                    <div className="flex gap-8">
                        <span className="material-symbols-outlined text-neutral-500 cursor-pointer hover:text-white transition-colors">share</span>
                        <span className="material-symbols-outlined text-neutral-500 cursor-pointer hover:text-white transition-colors">info</span>
                    </div>
                </div>
            </footer>

            {/* ── Theme Switcher Dock ── */}
            <ThemeDock />

            {/* ── Assets & Animations ── */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
            <style>{`
        @keyframes avantTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
        </div>
    );
}
