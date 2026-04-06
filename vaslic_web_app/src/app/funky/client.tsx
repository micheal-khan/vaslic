"use client";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import FunkyNavbar from "@/components/navbars/FunkyNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import ThemeDock from "@/components/ThemeDock";
import { UnitsCounter } from "@/components/UnitsCounter";

// ─── Brand tokens (exact from Stitch Refined Grid HTML) ─────────────────────
const CYAN = "#00f5d4";
const PINK = "#ff007f";
const NAV_BG = "#0d0d2b";

// ─── Product card ─────────────────────────────────────────────────────────────
function ProductCard({ p, staggered, category }: { p: any; staggered: boolean; category: any }) {
    return (
        <div
            className={`group relative bg-[#131313] p-1 border border-[#00f5d4]/10 hover:border-[#ff007f]/50 transition-all duration-500${staggered ? " mt-12 md:mt-24" : ""
                }`}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <img
                    src={p.images?.[0] || ""}
                    alt={p.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Vault ID badge */}
                <div
                    className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 text-[10px] tracking-widest border border-[#00f5d4]/30"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: CYAN }}
                >
                    {p.vault_id}
                </div>
                {/* Status Badge */}
                <div
                    className="absolute top-4 right-4 text-white px-3 py-1 text-[10px] font-bold tracking-tighter"
                    style={{ background: p.status === 'live' ? CYAN : '#404040', color: p.status === 'live' ? NAV_BG : 'white', fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    {p.status === 'live' ? 'LIVE' : 'SOON'}
                </div>
                {/* Units badge */}
                <div
                    className="absolute bottom-4 right-4 text-white px-3 py-1 text-[10px] font-bold tracking-tighter"
                    style={{ background: PINK, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    <UnitsCounter productId={p.id} initial={p.sizes?.reduce((a: number, s: any) => a + s.units_remaining, 0) || 0} total={100} />
                </div>
            </div>

            {/* Info */}
            <div className="pt-8 pb-4 px-4 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3
                            className="text-3xl text-white"
                            style={{ fontFamily: "'Righteous', sans-serif" }}
                        >
                            {p.name}
                        </h3>
                        <p
                            className="text-[10px] text-white/40 uppercase tracking-widest mt-1"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Edition 1 of 50 — Never Reprinted
                        </p>
                    </div>
                    <div className="text-right">
                        <span
                            className="text-2xl"
                            style={{ fontFamily: "'Righteous', sans-serif", color: CYAN }}
                        >
                            {p.price || "$420"}
                        </span>
                    </div>
                </div>
                <button
                    className="w-full py-4 text-xl tracking-tight hover:brightness-110 transition-all active:scale-[0.98]"
                    style={{
                        fontFamily: "'Righteous', sans-serif",
                        background: p.status === 'live' ? `linear-gradient(to right, ${CYAN}, ${PINK})` : '#404040',
                        color: p.status === 'live' ? NAV_BG : 'white',
                    }}
                >
                    {p.status === 'live' ? 'ACQUIRE ASSET' : 'MONITOR SESSION'}
                </button>
            </div>
        </div>
    );
}

export default function FunkyClientPage({ products, category }: { products: any[], category: any }) {
    const liveProducts = products?.filter(p => p.status !== 'retired') || [];
    const retiredItems = products?.filter(p => p.status === 'retired') || [];
    return (
        <div
            className="min-h-screen overflow-x-hidden"
            style={{ background: NAV_BG, color: "#e5e2e1" }}
        >
            {/* ── Dot-grid cassette pattern (fixed, behind everything) ── */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 0,
                    backgroundImage: `radial-gradient(${CYAN} 0.5px, transparent 0.5px), radial-gradient(${PINK} 0.5px, ${NAV_BG} 0.5px)`,
                    backgroundSize: "40px 40px",
                    backgroundPosition: "0 0, 20px 20px",
                    opacity: 0.08,
                }}
                aria-hidden="true"
            />

            {/* ── Navbar Component ── */}
            <FunkyNavbar />

            <main className="relative pt-32 pb-20 overflow-hidden" style={{ zIndex: 1 }}>
                {/* ── Hero Section ── */}
                <section className="px-8 mb-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
                            {/* Left: category label + big headline */}
                            <div className="max-w-2xl">
                                <span
                                    className="uppercase tracking-[0.3em] mb-4 block text-sm"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: PINK }}
                                >
                                    Archive: Category 05
                                </span>
                                <h1
                                    className="leading-none tracking-tighter text-white"
                                    style={{
                                        fontFamily: "'Righteous', sans-serif",
                                        fontSize: "clamp(4rem, 10vw, 9rem)",
                                    }}
                                >
                                    FUNKY{" "}
                                    <span style={{ color: CYAN }}>RETRO</span>
                                </h1>
                            </div>

                            {/* Right: status badge */}
                            <div
                                className="p-6 font-bold text-sm uppercase tracking-widest"
                                style={{
                                    background: CYAN,
                                    color: NAV_BG,
                                    fontFamily: "'Space Grotesk', sans-serif",
                                }}
                            >
                                Status: High Voltage / Limited Drop
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Live Collection Grid (2-col, right col staggered down) ── */}
                <section className="px-8 mb-32">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                        {liveProducts.map((p, i) => {
                            const isStaggered = i % 2 !== 0;
                            const TargetLink = p.vault_id ? `/funky/${p.vault_id.toLowerCase()}` : '/';
                            return p.vault_id
                                ? <Link key={p.id} href={TargetLink}><ProductCard p={p} staggered={isStaggered} category={category} /></Link>
                                : <ProductCard key={p.id} p={p} staggered={isStaggered} category={category} />;
                        })}
                    </div>
                </section>

                {/* ── Pink ticker strip ── */}
                <section
                    className="w-full py-4 border-y-2 border-white/20 mb-32 overflow-hidden whitespace-nowrap"
                    style={{ background: PINK }}
                >
                    <div className="inline-block refined-ticker">
                        <span
                            className="text-2xl uppercase italic text-white mr-12"
                            style={{ fontFamily: "'Righteous', sans-serif" }}
                        >
                            Once it's gone, it's gone. Forever. No reprints. No restocks. No exceptions.
                            {" "}
                            <span style={{ color: NAV_BG }}>•</span>
                            {" "}
                            Once it's gone, it's gone. Forever. No reprints. No restocks. No exceptions.
                            {" "}
                            <span style={{ color: NAV_BG }}>•</span>
                            {" "}
                            Once it's gone, it's gone. Forever. No reprints. No restocks. No exceptions.
                            {" "}
                            <span style={{ color: NAV_BG }}>•</span>
                            {" "}
                            Once it's gone, it's gone. Forever. No reprints. No restocks. No exceptions.
                            {" "}
                            <span style={{ color: NAV_BG }}>•</span>
                            {" "}
                        </span>
                    </div>
                </section>

                {/* ── Retired Sessions (setlist style) ── */}
                <section className="px-8 pb-32">
                    <div
                        className="max-w-4xl mx-auto p-12 relative border border-white/10 backdrop-blur-xl"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                        {/* Stamp */}
                        <div
                            className="absolute top-10 right-10 border-4 text-4xl px-6 py-2 uppercase font-black pointer-events-none"
                            style={{
                                fontFamily: "'Righteous', sans-serif",
                                color: PINK,
                                borderColor: PINK,
                                transform: "rotate(-15deg)",
                                mixBlendMode: "screen",
                                opacity: 0.8,
                            }}
                        >
                            SOLD OUT — NO ENCORE
                        </div>

                        <h2
                            className="text-5xl text-white mb-12 border-b border-white/20 pb-6"
                            style={{ fontFamily: "'Righteous', sans-serif" }}
                        >
                            RETIRED SESSIONS
                        </h2>

                        {/* Setlist rows */}
                        <div className="space-y-8">
                            {retiredItems.map((item, i) => (
                                <Link
                                    href={`/funky/${item.vault_id.toLowerCase()}`}
                                    key={item.id}
                                    className="flex items-baseline justify-between group cursor-pointer grayscale hover:grayscale-0 hover:opacity-100 opacity-40 transition-all duration-500"
                                >
                                    <div className="flex items-baseline gap-4">
                                        <span
                                            className="text-white/20 text-sm"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            SET 0{i + 1}
                                        </span>
                                        <span
                                            className="text-white text-xl"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            {item.name}
                                        </span>
                                    </div>
                                    <div className="flex-grow border-b border-dotted border-white/30 mx-4" />
                                    <span
                                        className="text-white/40 text-xl uppercase"
                                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        RELEASED {new Date(item.created_at).toLocaleString('default', { month: 'short', year: '2-digit' })}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-20 flex justify-center">
                            <p
                                className="text-[10px] text-white/30 tracking-[0.5em] uppercase text-center max-w-sm"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                These items have been permanently vaulted. Accessing original source code is strictly prohibited.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* ── Theme Switcher ── */}
            <ThemeDock />

            {/* ── Footer ── */}
            <SiteFooter theme="funky" />

            {/* ── Animations ── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Righteous&family=Manrope:wght@400;700&family=Space+Grotesk:wght@400;600&display=swap');

        .refined-ticker {
          animation: refinedScroll 30s linear infinite;
        }
        @keyframes refinedScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </div>
    );
}
