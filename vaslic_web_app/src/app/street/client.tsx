"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import StreetNavbar from "@/components/navbars/StreetNavbar";
import ThemeDock from "@/components/ThemeDock";
import { UnitsCounter } from "@/components/UnitsCounter";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const YELLOW = "#f5e642"; // tertiary-fixed
const SURFACE = "#1a1a1a";

// ─── Image assets ──────────────────────────────────────────────────────────────
const HERO_BG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBwmVCfrfkWTglSWqE59BLHf8nXLAt2LpRI07IA8rSvXlY0f-W1B9hb2LS6S227rk5aHmWyGgYvHAUTMt3K6L44B-kLNT5spU8H7YIwRXNY-1Gq_tYtJndyTlEsWJfrdcir1GQ7lqp1VPSoZskMazIO1AxO-2uCINPjMV7lR-FKIzwRymqX2iSnSZMKkFKBW_sYiTz-4-J3anOl7JGLYztwPIzn06iEK3K81LnxSGU8SgOv_diXN0aH3f_S1gRZvi8jqdLmFFpzeDI";

export default function StreetClientPage({ products, category }: { products: any[], category: any }) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const liveProducts = products?.filter(p => p.status !== 'retired') || [];
    const retiredItems = products?.filter(p => p.status === 'retired') || [];

    return (
        <div
            className="min-h-screen overflow-x-hidden text-neutral-200"
            style={{ background: SURFACE, fontFamily: "'Manrope', sans-serif" }}
        >
            {/* ── Grain texture overlay (fixed) ── */}
            <div
                className="fixed inset-0 pointer-events-none z-[60]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    opacity: 0.05,
                }}
            />

            {/* ── Glitch + diagonal-stripes keyframes ── */}
            <style>{`
        .text-glitch:hover { text-shadow: 2px 0 #ff00c1, -2px 0 #00fff9; }
        .diagonal-stripes {
          background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(245,230,66,0.1) 10px, rgba(245,230,66,0.1) 20px);
        }
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      `}</style>

            {/* ── Floating Navbar Component ── */}
            <StreetNavbar />

            <main className="pt-24">

                {/* ── Hero Section (819px) ── */}
                <section className="relative w-full overflow-hidden" style={{ height: "819px", background: "#0e0e0e" }}>
                    <div className="absolute inset-0 z-10" style={{ background: "rgba(0,0,0,0.4)" }} />
                    <div className="absolute inset-0 z-20 diagonal-stripes" style={{ opacity: 0.3 }} />
                    <img
                        src={HERO_BG}
                        alt="Street scene"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ filter: "grayscale(100%) brightness(50%)" }}
                    />
                    {/* Chain-link decorative */}
                    <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-20 pointer-events-none z-20">
                        <div className="w-full h-full border-[20px] border-white/10 rotate-45 transform translate-x-1/2 translate-y-1/2" />
                    </div>
                    {/* Hero content */}
                    <div className="relative z-30 h-full flex flex-col justify-center px-8 md:px-16">
                        <div
                            className="inline-block text-black text-2xl px-4 py-1 mb-6 self-start -skew-x-12"
                            style={{ background: YELLOW, fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            STREET CATEGORY
                        </div>
                        <h1
                            className="text-white leading-[0.85] tracking-tighter uppercase drop-shadow-2xl"
                            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(5rem, 12vw, 15rem)" }}
                        >
                            RAW<br />KINETIC<br /><span style={{ color: YELLOW }}>SOUL</span>
                        </h1>
                        <div className="mt-8 max-w-xl">
                            <p
                                className="text-xl font-medium leading-tight italic pl-6"
                                style={{ color: "#bec8cf", borderLeft: `4px solid ${YELLOW}`, fontFamily: "'Manrope', sans-serif" }}
                            >
                                Once it&apos;s gone, it&apos;s gone. Forever. No reruns. No represses. You either got it or you didn&apos;t.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Product Grid ── */}
                <section className="px-8 py-24" style={{ background: SURFACE }}>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <h2
                                className="text-glitch uppercase text-white cursor-default"
                                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4.5rem" }}
                            >
                                NEW ARRIVALS
                            </h2>
                            <p className="tracking-widest mt-2 text-sm" style={{ color: YELLOW, fontFamily: "'Space Grotesk', sans-serif" }}>
                                VAULT ID: ST-2026-CURATED
                            </p>
                        </div>
                        <div className="flex gap-4">
                            {["Filter", "Sort"].map((btn) => (
                                <button
                                    key={btn}
                                    className="px-6 py-3 text-xs uppercase transition-all"
                                    style={{ background: "#2a2a2a", fontFamily: "'Space Grotesk', sans-serif", color: "#e5e2e1" }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = YELLOW; (e.currentTarget as HTMLButtonElement).style.color = "black"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#2a2a2a"; (e.currentTarget as HTMLButtonElement).style.color = "#e5e2e1"; }}
                                >
                                    {btn}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        {liveProducts.map((p, i) => {
                            const badge = i === 1 ? { text: "SOLD OUT: 85%", color: "#dc2626", textColor: "white", rotate: "rotate-3", pos: "top-4 right-4" } : i === 0 ? { text: "LIMITED: 12 LEFT", color: YELLOW, textColor: "black", rotate: "-rotate-6", pos: "top-4 left-4" } : null;
                            const cardEl = (
                                <div
                                    key={p.id}
                                    className="group relative flex flex-col overflow-hidden"
                                    style={{ background: "#20201f", cursor: p.vault_id ? "pointer" : "default" }}
                                    onMouseEnter={() => setHoveredCard(i)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Product image */}
                                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                                        <img
                                            src={p.images?.[0] || ""}
                                            alt={p.name}
                                            className="w-full h-full object-cover transition-all duration-700"
                                            style={{
                                                filter: hoveredCard === i ? "grayscale(0)" : "grayscale(100%)",
                                                transform: hoveredCard === i ? "scale(1.05)" : "scale(1)",
                                            }}
                                        />
                                        {/* Badge */}
                                        {badge && (
                                            <div
                                                className={`absolute ${badge.pos} px-3 py-1 text-xl shadow-xl ${badge.rotate}`}
                                                style={{ background: badge.color, color: badge.textColor, fontFamily: "'Bebas Neue', sans-serif" }}
                                            >
                                                {badge.text}
                                            </div>
                                        )}
                                        {/* Status Badge */}
                                        <div
                                            className="absolute top-4 right-4 px-3 py-1 text-xl shadow-xl rotate-3"
                                            style={{
                                                background: p.status === 'live' ? YELLOW : '#404040',
                                                color: p.status === 'live' ? 'black' : 'white',
                                                fontFamily: "'Bebas Neue', sans-serif"
                                            }}
                                        >
                                            {p.status === 'live' ? 'LIVE' : 'SOON'}
                                        </div>
                                        {/* Slide-up CTA panel */}
                                        <div
                                            className="absolute bottom-0 left-0 w-full p-6 transition-transform duration-500"
                                            style={{
                                                background: "rgba(0,0,0,0.6)",
                                                backdropFilter: "blur(12px)",
                                                transform: hoveredCard === i ? "translateY(0)" : "translateY(100%)",
                                            }}
                                        >
                                            <button
                                                className="w-full text-black py-3 text-2xl hover:translate-x-1 transition-transform"
                                                style={{
                                                    background: p.status === 'live' ? YELLOW : '#737373',
                                                    fontFamily: "'Bebas Neue', sans-serif",
                                                    color: p.status === 'live' ? 'black' : 'white'
                                                }}
                                            >
                                                {p.status === 'live' ? (p.cta || "SNATCH NOW") : "MONITOR"}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product info */}
                                    <div className="p-8 flex-1 flex flex-col" style={{ background: "#171717" }}>
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-5xl text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{p.name}</h3>
                                            <span className="text-2xl" style={{ color: YELLOW, fontFamily: "'Space Grotesk', sans-serif" }}>{p.price || "$185"}</span>
                                        </div>
                                        <p className="text-base text-neutral-400 mb-8">{p.desc || "Hand-distressed 500GSM french terry. Custom VASLIC hardware. Every piece is unique."}</p>
                                        <div
                                            className="mt-auto pt-6 flex justify-between items-center text-xs uppercase tracking-widest text-neutral-500"
                                            style={{ borderTop: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            <span style={{ color: `${YELLOW}99` }}>{p.vault_id}</span>
                                            <div className="flex items-center gap-4">
                                                <span className="font-bold">Edition 1 of 50 — Never Reprinted</span>
                                                <UnitsCounter productId={p.id} initial={p.sizes?.reduce((a: number, s: any) => a + s.units_remaining, 0) || 0} total={100} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                            const TargetLink = p.vault_id ? `/street/${p.vault_id.toLowerCase()}` : '/';
                            return p.vault_id ? <Link key={p.id} href={TargetLink}>{cardEl}</Link> : cardEl;
                        })}
                    </div>
                </section>

                {/* ── The Buffed Wall (Retired) ── */}
                <section className="relative py-32 overflow-hidden" style={{ background: "#171717" }}>
                    {/* Dot-grid backdrop */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                    />
                    <div className="relative z-10 max-w-7xl mx-auto px-8">
                        {/* Section heading */}
                        <div className="text-center mb-24">
                            <h2
                                className="text-9xl text-neutral-800 uppercase tracking-tighter leading-none relative"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                THE BUFFED WALL
                                <span
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "15rem", color: "rgba(255,255,255,0.03)" }}
                                >
                                    GONE
                                </span>
                            </h2>
                            <div
                                className="inline-block px-8 py-2 mt-4 rotate-2"
                                style={{
                                    background: "rgba(127,29,29,0.4)",
                                    color: "#ef4444",
                                    border: "1px solid #ef4444",
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: "1.875rem",
                                }}
                            >
                                BUFFED — GONE FOREVER
                            </div>
                        </div>

                        {/* 5-col fading retired grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {retiredItems.map((item, i) => (
                                <Link
                                    href={`/street/${item.vault_id.toLowerCase()}`}
                                    key={item.id}
                                    className="relative overflow-hidden border border-white/5 cursor-pointer hover:border-white/20 transition-all"
                                    style={{
                                        aspectRatio: "1/1",
                                        background: "#0e0e0e",
                                        filter: "grayscale(100%) contrast(125%)",
                                        opacity: i === 0 ? 0.30 : i === 1 ? 0.20 : i === 2 ? 0.10 : 0.25,
                                        padding: "4px",
                                    }}
                                >
                                    {item.images && item.images.length > 0 ? (
                                        <img src={item.images[0]} alt={item.vault_id} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-4xl" style={{ background: "#262626", color: "#525252", fontFamily: "'Bebas Neue', sans-serif" }}>?</div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div
                                            className="px-2 py-1 text-xs -rotate-45"
                                            style={{ background: "rgba(0,0,0,0.8)", color: "white", fontFamily: "'Bebas Neue', sans-serif" }}
                                        >
                                            {item.vault_id}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Closing manifesto text */}
                        <div className="mt-20 text-center">
                            <p
                                className="text-5xl text-white/40 tracking-widest max-w-4xl mx-auto"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                RULES OF THE PAVEMENT: IF THE LINK IS DEAD, THE DREAM IS DEAD. NO RESTOCKS. NO EXCEPTIONS.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* ── Footer ── */}
            <footer className="w-full py-12 px-8" style={{ background: "#0a0a0a", fontFamily: "'Manrope', sans-serif", fontSize: "14px" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    <div className="space-y-6">
                        <div className="text-lg font-black text-neutral-200">VASLIC</div>
                        <p className="text-neutral-600">The Kinetic Curator. Exclusive editions for the avant-garde spirit. Digital physicalities curated for the new era.</p>
                        <div className="flex space-x-4">
                            {["alternate_email", "share", "public"].map((icon) => (
                                <span key={icon} className="material-symbols-outlined cursor-pointer text-neutral-600 hover:text-cyan-400 transition-colors">{icon}</span>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="font-bold text-white uppercase text-xs tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Navigation</div>
                        <ul className="space-y-2">
                            {["Privacy Policy", "Terms of Service", "Vault Registration", "Shipping"].map((l) => (
                                <li key={l}><a href="#" className="text-neutral-600 hover:text-cyan-400 transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <div className="font-bold text-white uppercase text-xs tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Categories</div>
                        <ul className="space-y-2">
                            {[
                                { label: "Gothic", href: "/gothic", active: false },
                                { label: "Bohemian", href: "/bohemian", active: false },
                                { label: "Avant-Garde", href: "/avant-garde", active: false },
                                { label: "Street", href: "/street", active: true },
                                { label: "Funky", href: "/funky", active: false },
                            ].map((l) => (
                                <li key={l.label}>
                                    <Link href={l.href} className="transition-colors" style={{ color: l.active ? "white" : "#525252" }}>
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <div className="font-bold text-white uppercase text-xs tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The Vault</div>
                        <p className="text-neutral-600 text-xs">Enter your coordinates to receive drop alerts.</p>
                        <div className="flex flex-col gap-2">
                            <input
                                className="text-[10px] px-4 py-2 w-full outline-none focus:ring-1 focus:ring-cyan-500"
                                placeholder="E-MAIL ADDRESS"
                                type="email"
                                style={{ background: "#171717", border: "none", color: "#e5e2e1" }}
                            />
                            <button
                                className="font-bold text-[10px] uppercase py-2 text-white transition-colors"
                                style={{ background: "#0891b2", fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center md:text-left">
                    <p className="text-neutral-600 text-[10px] uppercase tracking-[0.2em]">© 2026 VASLIC. No reprints. No restocks. No exceptions.</p>
                </div>
            </footer>

            {/* ── Theme Switcher ── */}
            <ThemeDock />

            {/* ── Material Icons ── */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" />
        </div>
    );
}
