"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, ArrowRight } from "lucide-react";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const TERRA = "#c77b4a";
const BG = "#f5ebe0";

// ─── Product data ────────────────────────────────────────────────────────────
const products = [
    {
        id: "VLK-BOHO-001",
        slug: "/bohemian/vlk-boho-001",
        name: "Earthen Vessel No. 01",
        edition: "Edition 1 of 12 — Never Reprinted",
        price: "$420",
        unitsLeft: "03",
        stagger: false,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAahV5DJV6u3SM2jgPqD6Md3tpuFV1coYsdn_9899oJcqh8lniLoCmpaEnk9djY6fXQM6r90xudPDVWfREQyp-GpFS0eLKAFgNbntAHHGfoOUeHVIbO9zx97jFUECiYYbTK0pWgSO1YGaJ0aDQgNIbYlf8fE4uP1m0dX51F06lYHh4LjH6lL9lnVusnhm0pNb2WQQGm3cEqb7sLV2yD2JwolSuZzlrAj3mo12x-2xs7nn6Dod0ioHfX8RWkUmbLB3p7PMlmqUa4pGw",
    },
    {
        id: "VLK-BOHO-002",
        name: "Pressed Flora Archive",
        edition: "Edition 1 of 12 — Never Reprinted",
        price: "$285",
        unitsLeft: "01",
        stagger: true,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAHPyMpznI0OjovV5hU3aGoS5AzCZgzfna7Xz4UJUhJe3aMlfjzRquZaTRmEiGGnDdGV_oXCa_5iHVfP7G-9PvHUODYF6boK88ZmZPX8jH_2tyXEseFjhVn2abb-dJICJUKYcJutG-L7VfxdobUOBy6PSncAwnORjkLJIU_rGPEcp-R1R6F52GIzPlZ-E0QTUbh_5FPby1hfux0mWkTspgJ_nokX7wZ-Hqd06iLoV20UbnolJIBsSk3XFnSe9HplOaP9lxYIvF6gak",
    },
    {
        id: "VLK-BOHO-003",
        name: "Terra Study III",
        edition: "Edition 1 of 12 — Never Reprinted",
        price: "$550",
        unitsLeft: "05",
        stagger: false,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD5g3S15JtPnCd8pJo9b6k9EgAniZEv-ZKjOd4jMFxleYusXuWFgr-txmQBdxJD7KlhNMWUkMNeTewrTYbkqDi5aG2ICy1RU2bppLCneB4V-RYPwSxH5zkIEBWSu1RX3bOyr-uvfQgUzP5BNQ0ozQC3tDl9LsLIDxDobpBg9bVpr4QxOYw7Ng5bdwHRyW6ukMoP6i3astfNDiUiT4xkCUkffUQYmbOn8TLtjDiDdgFQz2Q_mQ1vsSSeb4-9xprpMXYxY6sVmgFUzzg",
    },
    {
        id: "VLK-BOHO-004",
        name: "Woven Silence",
        edition: "Edition 1 of 12 — Never Reprinted",
        price: "$310",
        unitsLeft: "02",
        stagger: true,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDEekkIdvysQpPxAX2q-rSmmjOHxS0bbu7X1G3XTXfHO8P-1rT2ajbwHHGD2LQj_iDV3tZS5J3HZ_eSlCYGXRwWPhkwYCrnbcRjOMPoyFcA-dQhmiFrrD-TS6qIcFlla927-FHqtfp-5K4uuwYPP3tp2IvBXkf_-CO4ZqdoIwKT20VqPQwI8puLE82rA4giP_Ai7qad5c91EFSM9wsx2AjozN34z2fa5iwUPGM2RKctgPAr9_rOGmG02fg-9YtSgra6WbYmJq41-NM",
    },
];

// ─── Pressed Archive items (5-col, grayscale, opacity-50) ────────────────────
const archive = [
    {
        code: "ARC-088",
        name: "Linen Morning",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-ozdbvi7SgAyWTa6nIc0T4UUvzPlrrGI248M78KHbiqrSts7qOw28nMrI62ZLCR1BNbZgnr-a0emZ6gmJlUXUohP2SfIhfpkbx3_CcOwO1k2wPSYl4No5Zve9U5IIAq6F5hhBmdWPSb_pMEGo90htsHPkBLXPs-I5-h00e3M2welaqN15bQixPsUKplxA6PxTClYt1kJtpYCKPAK6vWOiefYuPc_TUvSHQIWu8lVODwdiOeXAGV5FqsUx0-0zzcu2FIX8xYtBgtI",
    },
    {
        code: "ARC-074",
        name: "Driftwood Soul",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpJ2kUkLDwT7UBeN6egitWHLYXmDrKS7CfVzSL2ABRQoHcm_OGLTO4QfCPolE_1jzwxMDEa47OOCsdk9etShSr-8g3sEYJW5IeQYPA3TD1-CUfd83Zqb-MW5SPLoMgvCSlDR6DysSZJkbK2rwtc89Fn0zOmLKB6mCJjjNegTXEcMktVhG8Nqf6b6ITFNdYEtknfH6XcavI6fNAKTMhDkk1JpIFO2XN6ZqQeNVqql2xGYbyJI399leN4SHVJssmu7dsuJlGodqQhR0",
    },
    {
        code: "ARC-092",
        name: "Silent Clay",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRtOXlPJroi3FilV8G0gkKFIIQc8sblyA30JsFlxX6UIxSgrZT87dfN081wNqLB_e3t7FlgzPgVJPYNEguUzMC8TtLiG9L5iuB84Bbo-fLmWjMsoY__6sICCc-xRFtV1EYFQg2pJnkyemJPKfA84oM1PN_JXDxUOUXmEpebxzuHYOyvXgo-Q3Q4IYeAoVP--ghIgya09vKMn8qEHOmjnnXFkUntJWFbN0tZ0ZjVrledqA_sd73BeTYarkt76BzaO1AJ-r6j-YUG1g",
    },
    {
        code: "ARC-061",
        name: "Petal Echo",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwqdmNaeg_CWyYQy1Vtm4GonYcAc0zHKw998y1v_4_L4D8lJwKl7D5UwB7LSXA6vitQJlS8fW8wA-gLo5UzgPw78kG6FTysSjxumpiXB25w7jnSw2eiS7KrFTtxYpgbxmPTiJjvlS5rHTDqY9FgKqqHbcO7_3Mo-FENFnUGjAmR5fNui4Gm0Kr__sLc6D5CERy2LnC9GTOOrP92TRtXS2guWCFbG8s_UvE2pliqKmD6oRFsz238LvJgWvQTnqGubBfM5XhudV6_-s",
    },
    {
        code: "ARC-055",
        name: "Shadow Lattice",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6G8rMetaN4U7NpB_lgy7pZp3UN_lf-NXRNkvcZL1bfrUBoIIogK0clYm30wHegcK4nuz5KVHTXOfQhhp_y1LezYpeZvcYSA55n8Z4t5YEf6-ZPUIoRq0cZgAHl0DG7q6lXzi64vHDPzIOp8ncVv5BQFYQ3PIfs5bakZKreXoy-YkLn4ahHZPhdhZ7pOQTgJ6zUlimkNMGw_yRWtN2HegiZDPV44Bo70eNd0La_vg3_Vm-KVQX6YYJLbtVb54tX4E7nYdKNDVFRGc",
        lgOnly: true,
    },
];

const themeSwitcher = [
    { icon: "history_edu", label: "Gothic", bg: "#0a0a0a", color: "white", href: "/gothic" },
    { icon: "eco", label: "Bohemian", bg: BG, color: TERRA, href: "/bohemian", active: true, fill: true },
    { icon: "architecture", label: "Avant-Garde", bg: "#ffffff", color: "#008DB9", href: "/avant-garde" },
    { icon: "layers", label: "Street", bg: "#1a1a1a", color: "#f5e642", href: "/street" },
    { icon: "rocket_launch", label: "Funky", bg: "#0d0d2b", color: "#00f5d4", href: "/funky" },
];

export default function BohemianPage() {
    const [email, setEmail] = useState("");

    return (
        <div className="min-h-screen" style={{ background: BG, color: "#292524" }}>
            {/* ── Navbar ── */}
            <nav
                className="fixed top-0 z-50 w-full px-8 py-4 flex justify-between items-center"
                style={{ background: BG }}
            >
                <Link href="/bohemian">
                    <div
                        className="text-2xl font-black cursor-pointer"
                        style={{ color: TERRA, fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        VASLIC Bohemian
                    </div>
                </Link>
                <div className="hidden md:flex gap-8 items-center">
                    {[
                        { label: "Collections", active: true },
                        { label: "Provenance", active: false },
                        { label: "The Vault", active: false },
                        { label: "Care", active: false },
                    ].map((l) => (
                        <a
                            key={l.label}
                            href="#"
                            className="font-bold tracking-tight uppercase transition-transform hover:translate-x-1 duration-200"
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                color: l.active ? TERRA : "#78716c",
                                borderBottom: l.active ? `2px solid ${TERRA}` : undefined,
                                paddingBottom: l.active ? "4px" : undefined,
                            }}
                        >
                            {l.label}
                        </a>
                    ))}
                </div>
                <div className="flex gap-6 items-center" style={{ color: TERRA }}>
                    <button aria-label="Bag"><ShoppingBag size={22} /></button>
                    <button aria-label="Account"><User size={22} /></button>
                </div>
            </nav>

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
                    {products.map((p) => {
                        const inner = (
                            <div key={p.id} className={`group${p.stagger ? " md:mt-32" : ""}`}>
                                {/* Image block */}
                                <div className="relative mb-6">
                                    <div
                                        className="aspect-square bg-white overflow-hidden"
                                        style={{ boxShadow: "0 20px 50px rgba(199,123,74,0.08)" }}
                                    >
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    {/* Vault ID badge */}
                                    <div
                                        className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 text-[10px] tracking-widest uppercase text-stone-900"
                                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        Vault ID: {p.id}
                                    </div>
                                    {/* Units left — terracotta square, bottom-right */}
                                    <div
                                        className="absolute bottom-0 right-0 flex flex-col items-center justify-center text-white"
                                        style={{ width: 80, height: 80, background: TERRA }}
                                    >
                                        <span className="text-xl font-bold leading-none">{p.unitsLeft}</span>
                                        <span className="text-[8px] uppercase tracking-tighter">Left</span>
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
                                            {p.edition}
                                        </p>
                                        <button
                                            className="bg-stone-900 text-white px-8 py-4 text-[10px] uppercase tracking-[0.2em] transition-all hover:translate-x-2 active:scale-95"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            Buy Now — {p.price}
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
                        return p.slug ? <Link key={p.id} href={p.slug}>{inner}</Link> : inner;
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
                        {archive.map((item) => (
                            <div
                                key={item.code}
                                className={`opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500${item.lgOnly ? " hidden lg:block" : ""
                                    }`}
                            >
                                <div className="bg-stone-200 mb-4 overflow-hidden" style={{ aspectRatio: "3/4" }}>
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div
                                    className="text-[10px] tracking-tighter text-stone-400"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {item.code}
                                </div>
                                <div
                                    className="text-lg text-stone-700"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {item.name}
                                </div>
                            </div>
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

            {/* ── Theme Switcher (icon style, Bohemian active) ── */}
            <div
                className="fixed bottom-6 left-1/2 -translate-x-1/2 flex z-[100] border border-white/40 p-1"
                style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px)", boxShadow: "0 20px 50px rgba(199,123,74,0.08)" }}
            >
                {themeSwitcher.map((t) => (
                    <Link key={t.href} href={t.href}>
                        <button
                            className="w-10 h-10 flex items-center justify-center text-sm transition-all hover:scale-110"
                            style={{ background: t.bg, color: t.color }}
                            title={t.label}
                            aria-label={t.label}
                        >
                            <span
                                className="material-symbols-outlined text-[20px]"
                                style={t.fill ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" } : undefined}
                            >
                                {t.icon}
                            </span>
                        </button>
                    </Link>
                ))}
            </div>

            {/* ── Google Material Symbols ── */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            />
        </div>
    );
}
