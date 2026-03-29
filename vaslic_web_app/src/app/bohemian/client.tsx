"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, ArrowRight } from "lucide-react";
import BohemianNavbar from "@/components/navbars/BohemianNavbar";
import ThemeDock from "@/components/ThemeDock";
import { UnitsCounter } from "@/components/UnitsCounter";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const TERRA = "#c77b4a";
const BG = "#f5ebe0";


function VelvetRope() {
    return (
        <svg className="w-full h-full p-4 absolute inset-0 pointer-events-none" viewBox="0 0 400 400">
            <path d="M 0 150 Q 200 250 400 150" fill="none" stroke="#c0392b" strokeWidth="8" />
            <circle cx="10" cy="150" r="12" fill="#d4af37" />
            <circle cx="390" cy="150" r="12" fill="#d4af37" />
        </svg>
    );
}

export default function BohemianClientPage({ products, category }: { products: any[], category: any }) {
    const [email, setEmail] = useState("");
    const liveProducts = products?.filter(p => p.status !== 'retired') || [];
    const cemeteryItems = products?.filter(p => p.status === 'retired') || [];

    return (
        <div className="min-h-screen" style={{ background: BG, color: "#292524" }}>
            {/* ── Navbar ── */}
            <BohemianNavbar />

            {/* ── Hero Section (12-col: 7+5) ── */}
            <header className="relative px-8 pt-20 pb-12 overflow-hidden max-w-screen-2xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-8 items-end">
                    {/* Left column (7/12) */}
                    <div className="lg:col-span-7">
                        <span
                            className="text-xs uppercase tracking-[0.3em] mb-4 block"
                            style={{ fontFamily: "'Space Grotesk', sans-serif", color: TERRA }}
                        >
                            Seasonal Series
                        </span>
                        <h1
                            className="leading-[0.9] mb-8 text-stone-900"
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "clamp(3rem, 8vw, 6rem)",
                            }}
                        >
                            Bohemian —{" "}
                            <br />
                            <span className="italic font-normal">Refined Grid Edition</span>
                        </h1>
                        <p
                            className="max-w-md text-stone-600 text-lg leading-relaxed mb-8"
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                        >
                            An intimate collection of hand-pressed textures and organic silhouettes. Curated for the modern
                            minimalist who finds beauty in the ephemeral.
                        </p>
                        <div
                            className="inline-flex items-center space-x-3 bg-stone-800 text-white px-6 py-4 text-xs tracking-widest uppercase"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            <span>Once it's gone, it's gone. Forever.</span>
                        </div>
                    </div>

                    {/* Right column (5/12) — hero image */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative overflow-hidden bg-stone-200" style={{ aspectRatio: "4/5" }}>
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWy_KKmDv-1V_Kcn0nlK-iCH7m8JOLWSqfBGSMHAmL9cmESGeepngWg4Uzwt9Zruk3jocpKQb12YGXlUEno0772e0IX7BtAAlmzZWDeozSdF-hYDhuReuu-aKjC71YeSSYDxXxG9aQwyN30ZPBs7k59Xx7rwZOdF-D7qRqPD3dA4w1hyg6S0nBkYTKUl-6FrJlnycdn4d4re6qVadrcs6s7vQfkA77CIrD1uJtJqB60ZYF9skGjbreTUIF-YSTxDTkVz0bxKQLpGs"
                                alt="Bohemian Art"
                                className="w-full h-full object-cover grayscale opacity-80"
                            />
                            {/* Terracotta colour wash */}
                            <div
                                className="absolute inset-0 mix-blend-multiply"
                                style={{ background: `${TERRA}1a` }}
                            />
                        </div>
                        {/* Triangle motif — bottom-left */}
                        <div
                            className="absolute -bottom-4 -left-4 w-24 h-24"
                            style={{
                                background: `${TERRA}33`,
                                clipPath: "polygon(0 0, 0% 100%, 100% 100%)",
                            }}
                        />
                    </div>
                </div>
            </header>

            {/* ── Product Grid (2×2 staggered) ── */}
            <main className="px-8 py-24 max-w-screen-2xl mx-auto">
                {/* Section head */}
                <div className="flex justify-between items-end mb-16">
                    <h2
                        className="text-4xl text-stone-900"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Live Collection
                    </h2>
                    <div
                        className="text-xs uppercase tracking-widest border-b pb-2"
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            color: TERRA,
                            borderColor: TERRA,
                        }}
                    >
                        Limited Release
                    </div>
                </div>

                {/* 2-col staggered grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {liveProducts.map((p, i) => {
                        const inner = (
                            <div key={p.id} className={`group${i % 2 !== 0 ? " md:mt-32" : ""}`}>
                                {/* Image block */}
                                <div className="relative mb-6">
                                    <div
                                        className="aspect-square bg-white overflow-hidden"
                                        style={{ boxShadow: "0 20px 50px rgba(199,123,74,0.08)" }}
                                    >
                                        <img
                                            src={p.images?.[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuCWy_KKmDv-1V_Kcn0nlK-iCH7m8JOLWSqfBGSMHAmL9cmESGeepngWg4Uzwt9Zruk3jocpKQb12YGXlUEno0772e0IX7BtAAlmzZWDeozSdF-hYDhuReuu-aKjC71YeSSYDxXxG9aQwyN30ZPBs7k59Xx7rwZOdF-D7qRqPD3dA4w1hyg6S0nBkYTKUl-6FrJlnycdn4d4re6qVadrcs6s7vQfkA77CIrD1uJtJqB60ZYF9skGjbreTUIF-YSTxDTkVz0bxKQLpGs"}
                                            alt={p.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    {/* Vault ID badge */}
                                    <div
                                        className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 text-[10px] tracking-widest uppercase text-stone-900"
                                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        Vault ID: {p.vault_id}
                                    </div>
                                    {/* Units left — terracotta square, bottom-right */}
                                    <div
                                        className="absolute bottom-0 right-0 flex flex-col items-center justify-center text-white p-2"
                                        style={{ minWidth: 80, minHeight: 80, background: TERRA }}
                                    >
                                        <UnitsCounter productId={p.id} initial={p.sizes?.reduce((sum: number, s: any) => sum + s.units_remaining, 0) || 0} total={100} />
                                    </div>
                                </div>

                                {/* Info row */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3
                                            className="text-2xl text-stone-800 mb-1"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {p.name}
                                        </h3>
                                        <p
                                            className="text-stone-500 italic text-sm mb-4"
                                            style={{ fontFamily: "'Manrope', sans-serif" }}
                                        >
                                            Edition 1 of 50 — Never Reprinted
                                        </p>
                                        <button
                                            className="bg-stone-900 text-white px-8 py-4 text-[10px] uppercase tracking-[0.2em] transition-all hover:translate-x-2 active:scale-95"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                    {/* Triangle watermark */}
                                    <div
                                        className="w-12 h-12"
                                        style={{
                                            background: "rgba(214,211,209,0.5)",
                                            clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
                                        }}
                                    />
                                </div>
                            </div>
                        );
                        const TargetLink = p.vault_id ? `/bohemian/${p.vault_id.toLowerCase()}` : '/';
                        return p.vault_id ? <Link key={p.id} href={TargetLink}>{inner}</Link> : inner;
                    })}
                </div>
            </main>

            {/* ── Pressed Archive ── */}
            <section
                className="py-32 mt-12 border-t"
                style={{ background: "rgba(245,235,224,0.5)", borderColor: "rgba(214,211,209,0.3)" }}
            >
                <div className="max-w-screen-2xl mx-auto px-8">
                    <div className="mb-16">
                        <h2
                            className="text-4xl text-stone-900 mb-2"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Pressed Archive
                        </h2>
                        <p
                            className="text-stone-500 text-xs uppercase tracking-widest"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Retired Designs — Forever Sealed
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        {cemeteryItems.map((item, i) => (
                            <Link
                                href="/vault"
                                key={item.id}
                                className={`opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500${i > 3 ? " hidden lg:block" : ""
                                    }`}
                            >
                                <div className="bg-stone-200 mb-4 overflow-hidden" style={{ aspectRatio: "3/4" }}>
                                    <img src={item.images?.[0] || ''} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div
                                    className="text-[10px] tracking-tighter text-stone-400"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    Vault ID: {item.vault_id}
                                </div>
                                <div
                                    className="text-lg text-stone-700"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {item.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Brand Mandate blockquote ── */}
            <aside className="py-24 text-center px-8">
                <div className="max-w-2xl mx-auto border-t border-b border-stone-200 py-16">
                    <span
                        className="text-xs uppercase tracking-[0.4em] mb-6 block"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", color: TERRA }}
                    >
                        The Vaslic Mandate
                    </span>
                    <blockquote
                        className="text-3xl italic text-stone-900 mb-8"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        "Once it's gone, it's gone. Forever."
                    </blockquote>
                    <p
                        className="text-stone-500 text-sm leading-relaxed uppercase tracking-widest max-w-sm mx-auto"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                        Each piece is a singular moment in time. We never reprint. We never restock.
                    </p>
                </div>
            </aside>

            {/* ── Footer ── */}
            <footer
                className="w-full py-12 px-8 border-t"
                style={{
                    background: BG,
                    color: "#78716c",
                    borderColor: "rgba(214,211,209,0.2)",
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.875rem",
                    lineHeight: "1.625",
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-2xl mx-auto">
                    <div className="space-y-4">
                        <div className="text-xl font-bold text-stone-800">VASLIC</div>
                        <p>© 2024 VASLIC. All rights reserved. Crafted with care for the Earth.</p>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <span className="font-bold text-stone-800 mb-2">Shop</span>
                        {["Ethical Sourcing", "Support", "Returns"].map((l) => (
                            <a key={l} href="#" className="hover:text-stone-800 transition-colors">{l}</a>
                        ))}
                        <a href="#" className="underline" style={{ color: TERRA }}>Privacy Policy</a>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <span className="font-bold text-stone-800 mb-2">Connect</span>
                        {["Instagram", "Pinterest", "Journal"].map((l) => (
                            <a key={l} href="#" className="hover:text-stone-800 transition-colors">{l}</a>
                        ))}
                    </div>
                    <div className="flex flex-col space-y-4">
                        <span className="font-bold text-stone-800 mb-2">Join the Inner Circle</span>
                        <div className="flex">
                            <input
                                className="bg-white/50 border-none px-4 py-2 w-full text-[10px] tracking-widest focus:outline-none"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                placeholder="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                className="bg-stone-900 text-white px-4 flex items-center justify-center"
                                aria-label="Submit"
                            >
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ── Theme Switcher ── */}
            <ThemeDock />

            {/* ── Google Material Symbols ── */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            />
        </div>
    );
}
