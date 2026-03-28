"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const CYAN = "#008DB9"; // primary (Avant-Garde)

// ─── Image assets ──────────────────────────────────────────────────────────────
const HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBn3anISZG6PAZ9PhqOJN2cN9l1Wyxwrh1P4xUxt3MCe9EmAtrStqJoMJO3nd0jIZSS4hd6GNI2y5oEJhSxGe6nh2DA1hRNfMCyHbLYv2ueVg0Pvm6DuPqQfwu58WEILDNOy8-TV_qdZyytstJfCuvq9zOr2Ry4GnNPC36tso-ICkd-ywECwz0OiogJHe51uTmUfGqYA7RrgED2ImKu6GU7PSRIjmgWnY9CdaHZLI5RzFsNp7yIqojg2foi6zvO93iI4p6lE_exu2M";
const DETAIL_SQ = "https://lh3.googleusercontent.com/aida-public/AB6AXuCIj1RF9CjaRFAAbowoLppPE39jlcvCz5tqie4inVsdY3tZlOuGXSmWSNSm1XlgUjpUzLlRpWD0qKyyNNr5tLibacCIKsFduhOgOB-LWfLeTIkoItwmIFWAJjTieOQoZVrQbZmo_vOWT_7GcRQmDwZ51S2J4XumUdofOY_4I3gveMJfMNHHGbrdh8GoorVUQhbZ2VZPKdQr9kmjZhAEEpU7cYjFY0wN8iPa-myGYdGENEt-oRwLVIQRFfHwOT4KZ0QPnmviFuGM3n0";
const DETAIL_34 = "https://lh3.googleusercontent.com/aida-public/AB6AXuBK7BpRLVfclQzTdo6ShpTKgzHMfwJzuj22qrZ18KILXU-1ZVBzV0754BwOeNBWFwHy28mG5Z_zsWCILEHiJtEAmjDDjd8p52QjrLKQ7YwIdCzU5nc_LmpK5Y_qfl_JWIjklm9EEMqxm5MY7xFFg1rqHbEw-129lbRx_UZLSC5AOfHGEnOb5y0uxqiPldgWS70GZEHII_L9MPF8hmZfaNgXbKf0YlhNtKWVfY20_4VRs7pO2qrN8wRHrzmJeHanHrPGYUa1zgUjpXs";

const SIZES = [
    { label: "XS", state: "default" },
    { label: "S", state: "active" },
    { label: "M", state: "default" },
    { label: "L", state: "disabled" },
    { label: "XL", state: "default" },
];

const DETAILS = [
    { icon: "architecture", title: "Structural Integrity", body: "Constructed from 420gsm heavy-weight industrial canvas, treated with a proprietary cold-dye process that ensures no two pieces share the same texture map." },
    { icon: "layers", title: "Layered Narrative", body: "Internal webbing system allows for multi-axial drape adjustment, transforming the silhouette from a sharp rectangle to a soft, organic cocoon." },
    { icon: "verified", title: "Provenance", body: "Includes a physical NFC-enabled tag linked to the VASLIC Archive, certifying ownership and piece history within the collection." },
];

const THEME_DOCK = [
    { title: "Avant-Garde", href: "/avant-garde", bg: "#f3f4f6", border: "#e5e7eb", active: true },
    { title: "Gothic", href: "/gothic", bg: "#0a0a0a", border: "#3f3f46", active: false },
    { title: "Bohemian", href: "/bohemian", bg: "#f5ebe0", border: "#d4d4d8", active: false },
    { title: "Street", href: "/street", bg: "#1a1a1a", border: "#52525b", active: false },
    { title: "Funky", href: "/funky", bg: "#0d0d2b", border: "#3f3f46", active: false },
];

export default function DeconstructedVoidPage() {
    const [selectedSize, setSelectedSize] = useState("S");
    const [ctaHovered, setCtaHovered] = useState(false);

    return (
        <div
            className="min-h-screen overflow-x-hidden"
            style={{ background: "#ffffff", color: "#111827", fontFamily: "'Manrope', sans-serif" }}
        >
            <style>{`
        .brush-underline { position:relative; display:inline-block; }
        .brush-underline::after {
          content:''; position:absolute; bottom:-8px; left:0; width:100%; height:12px;
          background:currentColor;
          clip-path:polygon(0% 20%,15% 0%,30% 25%,45% 5%,60% 30%,75% 10%,90% 35%,100% 15%,100% 85%,85% 100%,70% 75%,55% 95%,40% 70%,25% 90%,10% 65%,0% 80%);
          opacity:0.8;
        }
        .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; display:inline-block; line-height:1; }
        /* Paint splash SVG overlays */
        .paint-cobalt {
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 150 Q 150 50 250 150 T 350 150' stroke='%230047AB' stroke-width='40' fill='none' stroke-linecap='round' opacity='0.15' /%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:10% 20%; background-size:600px;
        }
        .paint-ochre {
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 200 Q 100 350 380 200' stroke='%23CC7722' stroke-width='60' fill='none' stroke-linecap='round' opacity='0.15' /%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:85% 70%; background-size:800px;
        }
        .paint-cadmium {
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 20 L 300 380' stroke='%23E30022' stroke-width='30' fill='none' stroke-linecap='round' opacity='0.15' /%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:40% 90%; background-size:500px;
        }
      `}</style>

            {/* ── Fixed paint splash overlays + "FOREVER." vertical watermark ── */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 paint-cobalt" />
                <div className="absolute inset-0 paint-ochre" />
                <div className="absolute inset-0 paint-cadmium" />
                <div
                    className="absolute top-1/2 right-4 select-none font-black text-9xl tracking-[0.2em]"
                    style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        opacity: 0.03,
                        color: "black",
                        fontFamily: "'Space Grotesk', sans-serif",
                    }}
                >
                    FOREVER.
                </div>
            </div>

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
                                    color: l.active ? CYAN : "#71717a",
                                    borderBottom: l.active ? `2px solid ${CYAN}` : undefined,
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
                                style={{ background: CYAN, fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                0
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20 relative">

                {/* ── Hero 12-col grid ── */}
                <section className="max-w-[1800px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">

                    {/* Left Gallery (7 cols) — asymmetric grid */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Full-width 4:5 hero */}
                        <div
                            className="md:col-span-2 overflow-hidden group"
                            style={{ aspectRatio: "4/5", background: "#f3f4f6" }}
                        >
                            <img
                                src={HERO_IMG}
                                alt="The Deconstructed Void"
                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                style={{ filter: "grayscale(100%) brightness(90%)" }}
                            />
                        </div>

                        {/* Square detail */}
                        <div className="overflow-hidden group" style={{ aspectRatio: "1/1", background: "#f3f4f6" }}>
                            <img
                                src={DETAIL_SQ}
                                alt="Fabric detail"
                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                style={{ filter: "grayscale(100%)" }}
                            />
                        </div>

                        {/* 3:4 editorial, offset down */}
                        <div
                            className="overflow-hidden group mt-12"
                            style={{ aspectRatio: "3/4", background: "#f3f4f6" }}
                        >
                            <img
                                src={DETAIL_34}
                                alt="Editorial shot"
                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                style={{ filter: "grayscale(100%) contrast(125%)" }}
                            />
                        </div>
                    </div>

                    {/* Right Product Panel (5 cols, sticky) */}
                    <div
                        className="lg:col-span-5 flex flex-col justify-start h-fit"
                        style={{ position: "sticky", top: "160px" }}
                    >
                        {/* Vault ID + collection label */}
                        <div className="flex items-center gap-4 mb-8">
                            <span
                                className="px-3 py-1 text-[10px] tracking-[0.3em] font-black uppercase text-white"
                                style={{ background: CYAN, fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                VAULT ID: VLK-AVNT-001
                            </span>
                            <span
                                className="text-[10px] tracking-widest uppercase"
                                style={{ color: "#9ca3af", fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Avant-Garde Collection
                            </span>
                        </div>

                        {/* Main title — slight rotation */}
                        <h1
                            className="font-black leading-[0.85] tracking-tighter mb-4 text-zinc-900"
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "clamp(3.5rem, 6vw, 6rem)",
                                transform: "rotate(-2deg)",
                            }}
                        >
                            THE DECONSTRUCTED VOID
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-6 mb-12">
                            <span
                                className="font-light text-6xl tracking-tighter"
                                style={{ color: CYAN, fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                $1,240
                            </span>
                            <span
                                className="text-xs tracking-widest uppercase"
                                style={{ color: "#9ca3af", fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                VAT INCL.
                            </span>
                        </div>

                        {/* Scarcity note */}
                        <div className="mb-16 pl-6 py-2" style={{ borderLeft: `2px solid ${CYAN}` }}>
                            <p
                                className="font-bold text-lg leading-tight uppercase tracking-tight"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Edition 1 of 12 — Never Reprinted
                            </p>
                            <p
                                className="text-xs mt-2 uppercase tracking-widest"
                                style={{ color: "#e5e7eb", fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Once it&apos;s gone, it&apos;s gone. Forever.
                            </p>
                        </div>

                        {/* Artist Statement */}
                        <div className="mb-16 max-w-md">
                            <h3
                                className="font-bold text-xs tracking-[0.4em] uppercase mb-4"
                                style={{ color: CYAN, fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Artist Statement
                            </h3>
                            <p className="text-sm leading-relaxed font-light" style={{ color: "#4b5563" }}>
                                &ldquo;The Deconstructed Void&rdquo; is a manifestation of{" "}
                                <span className="font-bold text-zinc-900">wearable brutalism</span>. It explores the tension between industrial rigidity and the fluidity of the human form. Every seam is a calculated fracture; every raw edge is a dialogue with entropy. This is not clothing—it is a temporary architecture for the body.
                            </p>
                            <div className="mt-6 text-[9px] uppercase tracking-[0.2em] italic" style={{ color: "#9ca3af", fontFamily: "'Space Grotesk', sans-serif" }}>
                                — VASLIC KINETIC STUDIOS, 2024
                            </div>
                        </div>

                        {/* Interaction zone */}
                        <div className="space-y-12">
                            {/* Size selector */}
                            <div>
                                <span
                                    className="text-[10px] tracking-[0.3em] uppercase block mb-6"
                                    style={{ color: "#9ca3af", fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    Select Dimension
                                </span>
                                <div className="flex flex-wrap gap-4">
                                    {SIZES.map((sz) => (
                                        <button
                                            key={sz.label}
                                            disabled={sz.state === "disabled"}
                                            onClick={() => sz.state !== "disabled" && setSelectedSize(sz.label)}
                                            className="w-14 h-14 flex items-center justify-center text-lg font-bold transition-all"
                                            style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                border: selectedSize === sz.label ? `2px solid ${CYAN}` : "1px solid #e5e7eb",
                                                background: selectedSize === sz.label ? "#e0f2fe" : "transparent",
                                                color: selectedSize === sz.label ? "#004d66" : sz.state === "disabled" ? "#d1d5db" : "#111827",
                                                opacity: sz.state === "disabled" ? 0.3 : 1,
                                                cursor: sz.state === "disabled" ? "not-allowed" : "pointer",
                                            }}
                                        >
                                            {sz.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* CTA — brush-underline */}
                            <div className="pt-8">
                                <button
                                    className="brush-underline font-black text-4xl tracking-tighter uppercase transition-transform duration-500"
                                    style={{
                                        color: CYAN,
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        transform: ctaHovered ? "translateX(16px)" : "none",
                                    }}
                                    onMouseEnter={() => setCtaHovered(true)}
                                    onMouseLeave={() => setCtaHovered(false)}
                                >
                                    Join Waitlist
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Secondary editorial section (Specifications) ── */}
                <section className="mt-40 py-32 overflow-hidden bg-white">
                    <div className="max-w-[1920px] mx-auto px-8 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-24">
                        {DETAILS.map((d, i) => (
                            <div key={d.icon} className="space-y-6 relative">
                                {/* Ghost number for middle card */}
                                {i === 1 && (
                                    <div
                                        className="absolute -top-12 -left-8 text-9xl font-black select-none"
                                        style={{ color: "#f9fafb", opacity: 0.1, fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        02
                                    </div>
                                )}
                                <span className="material-symbols-outlined text-4xl" style={{ color: CYAN }}>{d.icon}</span>
                                <h4
                                    className="font-black text-2xl uppercase tracking-tighter text-zinc-900"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {d.title}
                                </h4>
                                <p className="text-sm text-zinc-500 leading-relaxed">{d.body}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* ── Footer ── */}
            <footer className="w-full border-t border-zinc-200 bg-zinc-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-12 py-20 max-w-[1920px] mx-auto">
                    <div>
                        <div
                            className="text-xl font-bold text-zinc-900 mb-8"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            VASLIC KINETIC CURATIONS
                        </div>
                        <p className="text-zinc-400 max-w-sm text-sm leading-relaxed mb-8">
                            An editorial ecosystem dedicated to the preservation of avant-garde textile architecture and brutalist aesthetics.
                        </p>
                        <div className="text-sm tracking-widest uppercase text-zinc-400">
                            © 2024 VASLIC KINETIC CURATIONS. ALL RIGHTS RESERVED.
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        {[
                            {
                                heading: "The Archive",
                                links: ["Sustainability", "Press Inquiry", "Accessibility"],
                            },
                            {
                                heading: "Legal",
                                links: ["Legal Notice", "Privacy Policy"],
                            },
                        ].map((col) => (
                            <div key={col.heading} className="flex flex-col gap-4">
                                <h5
                                    className="font-bold uppercase tracking-[0.2em] text-xs mb-2"
                                    style={{ color: CYAN, fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {col.heading}
                                </h5>
                                {col.links.map((l) => (
                                    <a
                                        key={l}
                                        href="#"
                                        className="text-sm tracking-widest uppercase text-zinc-400 transition-colors hover:underline"
                                        style={{ textDecorationColor: CYAN, textUnderlineOffset: "4px" }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = CYAN; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af"; }}
                                    >
                                        {l}
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </footer>

            {/* ── Round-pill Theme Dock (centre bottom) ── */}
            <div
                className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-[100] px-4 py-2 rounded-full border border-white/15"
                style={{ background: "rgba(53,53,53,0.6)", backdropFilter: "blur(20px)" }}
            >
                {THEME_DOCK.map((t) => (
                    <Link key={t.href} href={t.href}>
                        <div
                            className="w-8 h-8 cursor-pointer transition-transform hover:scale-110"
                            title={t.title}
                            style={{
                                background: t.bg,
                                border: `1px solid ${t.border}`,
                                outline: t.active ? `2px solid ${CYAN}` : undefined,
                                outlineOffset: t.active ? "3px" : undefined,
                            }}
                        />
                    </Link>
                ))}
                <div className="h-4 w-px mx-2" style={{ background: "rgba(255,255,255,0.2)" }} />
                <span
                    className="text-[9px] uppercase tracking-widest pr-2"
                    style={{ color: "#9ca3af", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    Change Aesthetic
                </span>
            </div>

            {/* ── Fonts + Material Icons ── */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;900&family=Manrope:wght@200;300;400;500;600;700;800&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
        </div>
    );
}
