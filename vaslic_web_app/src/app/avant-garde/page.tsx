"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, ArrowRight } from "lucide-react";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const RED = "#c0392b";
const COBALT = "#2980b9";
const OCHRE = "#e67e22";
const NAVY = "#0a0a0a";

// ─── Paint-stroke underline (matching Stitch clip-path) ─────────────────────
const BRUSH_PATH =
    "2% 16%, 10% 32%, 20% 18%, 28% 44%, 39% 12%, 48% 38%, 59% 22%, 69% 48%, 82% 15%, 91% 33%, 100% 14%, 98% 85%, 85% 72%, 72% 95%, 58% 78%, 45% 92%, 31% 75%, 19% 88%, 8% 70%, 1% 82%";

// ─── Product data ─────────────────────────────────────────────────────────────
const products = [
    {
        id: "VLK-AVNT-001",
        slug: "/avant-garde/vlk-avnt-001" as string | undefined,
        name: "THE DECONSTRUCTED VOID",
        price: "$1,240.00",
        editionLabel: "EDITION 1 of 12 — NEVER REPRINTED",
        editionBg: NAVY,
        editionColor: "white",
        editionRotate: "rotate(6deg)",
        editionAlign: "right",
        btnColor: RED,
        cardRotate: "-1deg",
        translateY: 0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDinj8cKu_Ra6fY6V5ZWHi7U7b8gCc9qg8m9efvetSZGyvVbzEFtfJmDbG62joH9B3CFxpiAZkFOuqegEBsK4iCQMBi-EtRrJuGPgrNzwtHCQr_mjr2cBPMIpgRmgjy1DjU1MOQ972w32BM20TCXvjvRRZ-u6c8MAqm9Uar7vKh6RFwOrL_aFQGEcPwKmesrAzzLgd6oElqLpLVapgHsS0kMULTbxFYLcg1IsiLVYdQ0aJZ-Z1TMpVEKWZUweldxqWNfrpUAjM3gts",
        infoAlign: "start",
        note: null,
    },
    {
        id: "VLK-AVNT-042",
        slug: undefined as string | undefined,
        name: "ASYMMETRIC MONOLITH",
        price: "$2,800.00",
        editionLabel: "EDITION 1 of 8 — NEVER REPRINTED",
        editionBg: RED,
        editionColor: "white",
        editionRotate: "rotate(-3deg)",
        editionAlign: "left",
        btnColor: COBALT,
        cardRotate: "2deg",
        translateY: 128,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKUgsPsv1UUPtocwRxW-_hpv8RkTHMZ9oNZ-Et0z8dbOlPvYMEhHfgC4m4e6VIU9NOeZCg9X2VwFnrqD27pjKZy7iH576t0vUFHsSsvm3F5aZqPpbae9cKGh2ftasAyi1FqLGMW89Sa3vx7lbimRLUZIKqo8mEoTkqicrUP0blxJwiwyZHhppyFTH3GUKYbvsfQ3HGxSP546GhnnorzcUy7-Raw85ddcxbehXNsX15dOn-WodUzhmuyALRzXEelmtVywO8dICqEks",
        infoAlign: "end",
        note: null,
    },
    {
        id: "VLK-AVNT-089",
        slug: undefined as string | undefined,
        name: "STEEL & SILK",
        price: "$3,500.00",
        editionLabel: "EDITION 1 of 5",
        editionBg: OCHRE,
        editionColor: "white",
        editionRotate: "rotate(-90deg)",
        editionAlign: "rotating-side",
        btnColor: OCHRE,
        cardRotate: "-2deg",
        translateY: -64,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD9S1gBh5rlZC6km1dISxTxVF2gSGehIwvGFg1VhK55-ZA0DfWKM5ecvYArSWgjVplRvN4B8RLoYUBVRMbCSLkoN1R2LC-ZCM0G7PUHV-DX9Eraynrid1K8FVBBquz9U9ffe4l_0eKa-KHudVCJJs0TOuatd1OBWqgcq66g_k4i02Q__yYMn68aKlf-WP-CDL6ldFOmr5mpINnku9SQiPTGI6RYD1NEyhZ8iPD-JEb0gzE-VI3OFmITRfUMufcMqCcV3TaUAMGq0Q",
        infoAlign: "start",
        note: "Archival Series — Permanent Exit Pending",
    },
    {
        id: "VLK-AVNT-102",
        slug: undefined as string | undefined,
        name: "CHROMATIC DYSPHORIA",
        price: "$5,200.00",
        editionLabel: "NEVER REPRINTED — EDITION 1 of 3",
        editionBg: "#f5f5f5",
        editionColor: "black",
        editionRotate: "none",
        editionAlign: "block",
        btnColor: RED,
        cardRotate: "1deg",
        translateY: 64,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN21rvxPfGQSIXZaZcmOnLWi_lBRzuT_ahSQzv18LcztYjzTBy9nbb2KZeWBOz5oackHyWTUq-6LlPKqxXNcEVqicqIQgE89Tjx5t63nhsAFtDevO9HqvMeFFcSOYiUrBnvuSEPCnnzRDjjlT9C_4kQlykmJD0kz9gmG7vl5ieqgPdXbEviHa_PZQ1_elvmCCgileXTHnXG9-hVn0w3MPaCQQ-lg5OHZ7NMN6Gab28_bghvC7_Pcy8Wvs3exUjKKwOLWpayt2oW8A",
        infoAlign: "end",
        note: null,
    },
];

const retiredItems = [
    { name: "THE GLASS SHROUD", exit: "11/2023", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv_ki7xZOE32XftDKMrgpQq9cmSt8-F7EEzSJyCagHQjihFzdwp2OFIB6vDPNvW5XxZovPmD6MIgGMJV1ck09rRFf1hUGH0RzsvajFZP85bYwLuXps_jFF7E736k1HdkZAow3jqbITHgOz-DwGfTSNOTBtCUhxfM3NT449w5BOxOw48HAY1aigBKGSHNAxufQd1pbSlgUDYSbLQocvfKPaLwedopnZmGtj8KTlbH9-ASe8gQ1G83o-Mpw1RyUBxW801vZR19NQiyI" },
    { name: "INDUSTRIAL SPINE", exit: "02/2024", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTYsjDqRZsRBC_4Mh2Y6CEjTMPCDlsw4ZGMNmIIGub-NnG5bWVdgTWjEruRq7mqwttSZpc2LDZyYVjgXnwDQaCKcPuWyuH3YYdCWHGD4XwulsE0JxoNTmQ6OEroza2I0qutwVr7F7YJNpQIOuOFRx-ZuM1c9_7WNyBkdfbNhVeiLG2NnRAS6YPrE3l_IwQbfMuxN7ThLY3c19PHoPEZNq4HwfCixttzu1OyHfrN-8XMfdPw9V96F2dWrDfTszPfOwk76nc4Oyfc8k" },
    { name: "UNSEEN ECHO", exit: "05/2024", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTZJMHM3qkY7_3txvnD_WCX6yaVrjiDtFiAzMEikzaWUPb6lXIEQONMWqYUl_-KgUWsGa7g59adAXBQLPSNG16BNJdoctlTqelTxQ7TAjx38z7lRp7Tlx2-e4pj4lD45_ZSlD6__6MlDPmHiAgbu1hy7BDGqeokOdFxlZPB5oWHw4D9EizQfBpqewR7zae0Jfo8zFw_rpVwj55jKYH2m5_6PMpt5EsddTSSkUlWS-1z4Mn1qy7s2hYha8uWKRW8UJLSA0sXBk0kHo" },
];

const themeDock = [
    { icon: "dark_mode", label: "Gothic", active: false, color: "#737373", href: "/gothic" },
    { icon: "local_florist", label: "Boho", active: false, color: "#737373", href: "/bohemian" },
    { icon: "architecture", label: "Avant", active: true, color: "#22d3ee", href: "/avant-garde" },
    { icon: "theater_comedy", label: "Street", active: false, color: "#737373", href: "/street" },
    { icon: "celebration", label: "Funky", active: false, color: "#737373", href: "/funky" },
];

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

export default function AvantGardePage() {
    const [email, setEmail] = useState("");

    return (
        <div className="bg-white text-neutral-900 overflow-x-hidden min-h-screen" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

            {/* ── Frosted White Navbar ── */}
            <nav
                className="fixed top-0 w-full z-50 border-b border-zinc-100"
                style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)" }}
            >
                <div className="flex justify-between items-center px-8 py-6 max-w-[1920px] mx-auto">
                    <Link href="/avant-garde">
                        <div
                            className="text-3xl font-black tracking-tighter text-zinc-900 cursor-pointer"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            VASLIC
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center gap-12">
                        {[
                            { label: "Collections", active: false },
                            { label: "Archives", active: false },
                            { label: "Exhibitions", active: true },
                            { label: "About", active: false },
                        ].map((l) => (
                            <a
                                key={l.label}
                                href="#"
                                className="font-bold tracking-tight uppercase text-sm transition-colors"
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    color: l.active ? COBALT : "#71717a",
                                    borderBottom: l.active ? `2px solid ${COBALT}` : undefined,
                                    paddingBottom: l.active ? "4px" : undefined,
                                }}
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex items-center bg-zinc-100 px-4 py-2 gap-2">
                            <span className="material-symbols-outlined text-zinc-400" style={{ fontSize: "18px" }}>search</span>
                            <input
                                className="bg-transparent border-none focus:outline-none text-xs font-bold tracking-widest uppercase text-zinc-500"
                                placeholder="SEARCH ARCHIVE"
                                type="text"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            />
                        </div>
                        <button className="relative hover:translate-x-1 transition-transform active:scale-95">
                            <ShoppingBag size={24} className="text-zinc-900" />
                            <span
                                className="absolute -top-1 -right-1 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center"
                                style={{ background: COBALT, fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                0
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

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
                        {products.map((p) => {
                            const cardInner = (
                                <div
                                    key={p.id}
                                    className="relative group"
                                    style={{ transform: `rotate(${p.cardRotate}) translateY(${p.translateY}px)`, cursor: p.slug ? "pointer" : "default" }}
                                >
                                    {/* Image */}
                                    <div className="relative overflow-hidden shadow-2xl bg-neutral-100" style={{ aspectRatio: "3/4" }}>
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        {/* Vault ID */}
                                        <div
                                            className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold tracking-tighter border border-neutral-200 uppercase"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            Vault ID: {p.id}
                                        </div>
                                    </div>

                                    {/* Info panel */}
                                    <div
                                        className="mt-8 flex flex-col relative"
                                        style={{ alignItems: p.infoAlign === "end" ? "flex-end" : "flex-start", textAlign: p.infoAlign === "end" ? "right" : "left" }}
                                    >
                                        {/* Edition badge */}
                                        {p.editionAlign === "right" && (
                                            <div
                                                className="absolute -top-12 right-0 p-4 text-sm tracking-widest shadow-xl"
                                                style={{
                                                    fontFamily: "'Bebas Neue', sans-serif",
                                                    background: p.editionBg,
                                                    color: p.editionColor,
                                                    transform: p.editionRotate,
                                                    zIndex: 10,
                                                }}
                                            >
                                                {p.editionLabel}
                                            </div>
                                        )}
                                        {p.editionAlign === "left" && (
                                            <div
                                                className="absolute -top-12 left-0 p-4 text-sm tracking-widest shadow-xl"
                                                style={{
                                                    fontFamily: "'Bebas Neue', sans-serif",
                                                    background: p.editionBg,
                                                    color: p.editionColor,
                                                    transform: p.editionRotate,
                                                    zIndex: 10,
                                                }}
                                            >
                                                {p.editionLabel}
                                            </div>
                                        )}
                                        {p.editionAlign === "rotating-side" && (
                                            <div
                                                className="absolute p-4 text-sm tracking-[0.4em] shadow-xl"
                                                style={{
                                                    fontFamily: "'Bebas Neue', sans-serif",
                                                    background: p.editionBg,
                                                    color: p.editionColor,
                                                    top: "50%",
                                                    right: "-2rem",
                                                    transform: p.editionRotate,
                                                    transformOrigin: "center",
                                                    zIndex: 10,
                                                }}
                                            >
                                                {p.editionLabel}
                                            </div>
                                        )}
                                        {p.editionAlign === "block" && (
                                            <div
                                                className="p-2 border border-neutral-200 mb-4 inline-block bg-neutral-100"
                                                style={{ background: p.editionBg }}
                                            >
                                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: p.editionColor, fontFamily: "'Space Grotesk', sans-serif" }}>
                                                    {p.editionLabel}
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
                                            {p.price}
                                        </div>

                                        {/* CTA */}
                                        <PaintButton color={p.btnColor}>Join Waitlist</PaintButton>

                                        {/* Note */}
                                        {p.note && (
                                            <p className="mt-2 text-[8px] uppercase tracking-widest text-neutral-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                                {p.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                            return p.slug ? <Link key={p.id} href={p.slug}>{cardInner}</Link> : cardInner;
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
                            {retiredItems.map((item) => (
                                <div key={item.name} className="relative group opacity-60">
                                    {/* Square grayscale image */}
                                    <div className="aspect-square bg-neutral-200 grayscale overflow-hidden">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
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
                                            <div className="mt-2 text-xs text-neutral-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                                Vault Exit: {item.exit}
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
            <div
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 flex gap-8 items-center border border-white/5"
                style={{ background: "rgba(10,10,10,0.6)", backdropFilter: "blur(24px)" }}
            >
                {themeDock.map((t) => (
                    <Link key={t.href} href={t.href}>
                        <button className="flex flex-col items-center gap-1 group hover:opacity-100 transition-opacity" style={{ opacity: t.active ? 1 : 0.5 }}>
                            <span
                                className="material-symbols-outlined"
                                style={{ color: t.active ? "#22d3ee" : "#737373", transition: "color 0.2s" }}
                            >
                                {t.icon}
                            </span>
                            <span
                                className="text-[10px] uppercase"
                                style={{ fontFamily: "'Bebas Neue', sans-serif", color: t.active ? "#22d3ee" : "#737373" }}
                            >
                                {t.label}
                            </span>
                        </button>
                    </Link>
                ))}
            </div>

            {/* ── Assets & Animations ── */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
            <style>{`
        @keyframes avantTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
        </div>
    );
}
