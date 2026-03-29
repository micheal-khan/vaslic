"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import GothicNavbar from "@/components/navbars/GothicNavbar";
import ThemeDock from "@/components/ThemeDock";
import { UnitsCounter } from "@/components/UnitsCounter";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const BLOOD = "#8b0000";  // secondary
const CYAN = "#72d2ff";  // primary
const YELLOW = "#d8ca23";  // tertiary

// ─── Stone texture URL ────────────────────────────────────────────────────────
const STONE_URL =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAjm8y6xoys2_wPGmzmsN4VNdSUR83uSN3q0yny0zEtfsRZPXOdGA0m8wpRGplPpTUpFWaauTADNL3vKWhWLjATty2T0Jru61gtFe4JlzSNwFLw8Q4Iy4gsHjVnFFPtE7lXCKzBP_QjkgqiNzi26oKLrUziuoZaEwer7cpa7LWUUk5w7B--RNqxENlviBDSNOKSgDBFE1ixez2zpOjGgW5xboQ0rAVbYz1CqFkATQIxxGgECxT6WyU1hr8IZ3v0nuqhki_Blpob95c";

// ─── Product data ─────────────────────────────────────────────────────────────
const products = [
    {
        id: "VLK-GOTH-001",
        slug: "/gothic/vlk-goth-001",
        name: "The Mourning Shroud",
        units: 3,
        edition: "Edition 1 of 50 — Never Reprinted",
        cta: "Claim Vessel",
        ctaVariant: "outline",
        stagger: 0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXPobNJ8ZE8-1eQzq0wrcBI030bIaKdacsQkPu36uHtbFbkVErjL0VnjGz_cKuRgzm2A6oWzHxhXBDJN_yGnuqxZ45qmO7In5KWzpYCaceiajZS1qlZyCla4nzc30wjvmZFMF9O19JPFn_LfeeHQbx3_kR08S2iXpaDg_HKkSX67T_9xSk8Wl0vVmNe7dROv6qTlCHxsMtRe-6s6jgN4UQjjZCST5R9rxV9X1sDmxXIbPHFrWQKLGyt2Pf8u0bHjmVw7-V_K1UA_k",
    },
    {
        id: "VLK-GOTH-014",
        name: "Reliquary Boots",
        units: 7,
        edition: "Edition 1 of 50 — Never Reprinted",
        cta: "Claim Vessel",
        ctaVariant: "outline",
        stagger: 48, // md:mt-12
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAu2HBzXgf6Z64f3_6UXHPZ01Zcxycst_wAkG_sDovagw1BCcOywS8gQKKm5ZaySs9A9MV8m2K32qwR3A9eKjy6vzhCAkqo2ZgqtPDaexr9SIpNgYNZz5ezI9219pj12na_n3mKlAY0_tNdcdk8xrK1TdsWFRALNxfUgv8vE3P5mHNQ4rKCQhaP5qxi_1VQZIcubteB_2Ks8dhk5s7pPGYyKaQAc4c7MKxkkBgkLwOk557RNRxdUIs8nays7f64UAEAVqacWcHmjJc",
    },
    {
        id: "VLK-GOTH-009",
        name: "Sinner's Rosary",
        units: 1,
        edition: "Edition 1 of 50 — Never Reprinted",
        cta: "Last Chance",
        ctaVariant: "filled",
        stagger: -48, // md:-mt-12
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXJ5Rz2h9obVCh_a052Yi0nDEfHCnud6eoWYdtgae_wHjOCXV6s8I1plaTrvKAzIJGBZpiUPQJV2J2n3qXFQI3y8_CVruPIvITsyRg7ko6JKi_qTASP5gwkQfKgrbKbi49KaeEqr8ybS7UD6rMnZfOCiYmAvte-DlP0pq6z1Su3hkJ4cgXjO9KEqBUIHxkMt6vgs6iC-3EtSLbWjvoegJ4wUX_Fho_kfRgNLt_X25gDMYrFFcnx4U_lGWZ7I7DrZSVrGe_GZLeDOY",
    },
    {
        id: "VLK-GOTH-022",
        name: "Cathedral Cape",
        units: 12,
        edition: "Edition 1 of 50 — Never Reprinted",
        cta: "Claim Vessel",
        ctaVariant: "outline",
        stagger: 0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALMWwASYtnHO1m_xW6NjYRmEITtoyzra5z4bVrtG92XDB-T-N2c3n8Xlq-ZDP9Reb8uS4MIEpH-V7CmWXBV_ACM5xhN-5bjY-RuJhsJmZlwWoYi39lrsk9EN9dcPDhXs9S0EtTC1AahOzWxaCEazU-JePryKf7mzQOO_MKrMhgug1OlXymDm1nEc1oH32hyW62YPTtWt94YkrZ7sXzqwEUQIRDJa7uddDzMCnddkggsZPtU8fpnfpjhajAv5j27W1d4vFYsUi7uc8",
    },
];

const cemeteryItems = [
    { name: "The Wraith Gown", died: "Oct 2023", made: "5", icon: "church", image: products[0].image, stagger: 0 },
    { name: "Altar Mask", died: "Dec 2023", made: "1", icon: "auto_stories", image: products[1].image, stagger: 48 },
    { name: "Plague Collar", died: "Jan 2024", made: "12", icon: "skull", image: products[2].image, stagger: 0 },
    { name: "Lunar Veil", died: "Feb 2024", made: "3", icon: "nights_stay", image: products[3].image, stagger: 48 },
];

const themeDots = [
    { color: BLOOD, active: true, href: "/gothic" },
    { color: "#e2d5c5", active: false, href: "/bohemian" },
    { color: CYAN, active: false, href: "/avant-garde" },
    { color: "#a3a3a3", active: false, href: "/street" },
    { color: YELLOW, active: false, href: "/funky" },
];

export default function GothicClientPage({ products, category }: { products: any[], category: any }) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const liveProducts = products?.filter(p => p.status !== 'retired') || [];
    const cemeteryProducts = products?.filter(p => p.status === 'retired') || [];

    return (
        <div
            className="min-h-screen overflow-x-hidden text-neutral-200"
            style={{ background: "#0a0a0a", fontFamily: "'Crimson Text', serif" }}
        >
            {/* ── Stone texture overlay (fixed, behind everything) ── */}
            <div
                className="fixed inset-0 pointer-events-none z-[60]"
                style={{
                    backgroundImage: `url(${STONE_URL})`,
                    backgroundSize: "cover",
                    opacity: 0.08,
                }}
            />
            {/* ── Darkness creep radial vignette ── */}
            <div
                className="fixed inset-0 pointer-events-none z-[55]"
                style={{ background: "radial-gradient(circle, transparent 40%, #000 100%)" }}
            />

            {/* ── Fixed Navbar Component ── */}
            <GothicNavbar />

            {/* ── Left sidebar "Vault Curator" ── */}
            <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
                <div
                    className="h-64 w-12 flex flex-col items-center justify-center gap-8"
                    style={{ background: "#171717", borderRight: `1px solid ${BLOOD}33` }}
                >
                    <div
                        className="whitespace-nowrap text-[10px] uppercase tracking-widest text-neutral-500"
                        style={{ writingMode: "vertical-rl", fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        The Vault Curator
                    </div>
                </div>
            </div>

            <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto relative z-10">

                {/* ── Hero Section ── */}
                <header className="relative mb-32 flex flex-col items-center text-center">
                    {/* Inverted red arch SVG */}
                    <div className="absolute -top-12 opacity-20" style={{ transform: "rotate(180deg)" }}>
                        <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
                            <path d="M0 100C0 44.7715 44.7715 0 100 0C155.228 0 200 44.7715 200 100H0Z" fill={BLOOD} />
                        </svg>
                    </div>

                    <h1
                        className="text-white leading-none mb-4 z-10"
                        style={{ fontFamily: "'UnifrakturMaguntia', serif", fontSize: "clamp(5rem, 10vw, 10rem)" }}
                    >
                        Gothic
                    </h1>
                    <p
                        className="uppercase tracking-[0.5em] text-sm mb-12 font-bold"
                        style={{ color: BLOOD, fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        The Shadow Archive
                    </p>
                    <div className="max-w-2xl text-2xl italic text-neutral-400 leading-relaxed">
                        &quot;Every design dies once. This one is still alive.&quot;
                    </div>

                    {/* Ornamental divider */}
                    <div className="mt-12 flex flex-col items-center gap-4">
                        <div
                            className="flex items-center gap-6 text-xs font-bold uppercase tracking-[0.4em]"
                            style={{ color: BLOOD, fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            <span className="w-16" style={{ height: "1px", background: BLOOD, display: "block" }} />
                            Once it&apos;s gone, it&apos;s gone. Forever.
                            <span className="w-16" style={{ height: "1px", background: BLOOD, display: "block" }} />
                        </div>
                    </div>
                </header>

                {/* ── 2×2 Product Grid ── */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-48">
                    {liveProducts.map((p, i) => {
                        const CardWrapper = p.vault_id
                            ? ({ children }: { children: React.ReactNode }) => <Link href={`/products/${p.vault_id}`}>{children}</Link>
                            : ({ children }: { children: React.ReactNode }) => <>{children}</>;
                        return (
                            <CardWrapper key={p.id}>
                                <div
                                    key={p.id}
                                    className="group relative transition-all duration-500 cursor-pointer"
                                    style={{
                                        border: `1px solid ${hoveredCard === i ? BLOOD + "66" : "#171717"}`,
                                        background: "rgba(10,10,10,0.4)",
                                        padding: "24px",
                                        marginTop: i === 1 || i === 3 ? "48px" : i === 2 ? "-48px" : "0",
                                        // Flicker + glow on hover
                                        boxShadow: hoveredCard === i ? `0 0 20px rgba(139,0,0,0.4)` : undefined,
                                    }}
                                    onMouseEnter={() => setHoveredCard(i)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Image */}
                                    <div
                                        className="overflow-hidden bg-neutral-900 relative"
                                        style={{ aspectRatio: "4/5" }}
                                    >
                                        <img
                                            src={p.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXPobNJ8ZE8-1eQzq0wrcBI030bIaKdacsQkPu36uHtbFbkVErjL0VnjGz_cKuRgzm2A6oWzHxhXBDJN_yGnuqxZ45qmO7In5KWzpYCaceiajZS1qlZyCla4nzc30wjvmZFMF9O19JPFn_LfeeHQbx3_kR08S2iXpaDg_HKkSX67T_9xSk8Wl0vVmNe7dROv6qTlCHxsMtRe-6s6jgN4UQjjZCST5R9rxV9X1sDmxXIbPHFrWQKLGyt2Pf8u0bHjmVw7-V_K1UA_k'}
                                            alt={p.name}
                                            className="w-full h-full object-cover grayscale transition-all duration-700"
                                            style={{
                                                opacity: hoveredCard === i ? 1 : 0.7,
                                                transform: hoveredCard === i ? "scale(1.1)" : "scale(1)",
                                                filter: hoveredCard === i ? "none" : "grayscale(100%)",
                                            }}
                                        />
                                        {/* "Live" badge */}
                                        <div
                                            className="absolute top-0 right-0 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white"
                                            style={{ background: BLOOD, fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            Live
                                        </div>
                                    </div>

                                    {/* Product info */}
                                    <div className="mt-8 flex flex-col gap-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span
                                                    className="text-[10px] tracking-widest uppercase"
                                                    style={{ color: BLOOD, fontFamily: "'Space Grotesk', sans-serif" }}
                                                >
                                                    Vault ID: {p.vault_id}
                                                </span>
                                                <h3
                                                    className="text-4xl text-white mt-1"
                                                    style={{ fontFamily: "'UnifrakturMaguntia', serif" }}
                                                >
                                                    {p.name}
                                                </h3>
                                            </div>
                                            <div className="text-right w-32">
                                                <UnitsCounter productId={p.id} initial={p.sizes?.reduce((a: number, s: any) => a + s.units_remaining, 0) || 0} total={100} />
                                            </div>
                                        </div>

                                        <p
                                            className="text-[10px] uppercase tracking-widest text-neutral-400 pt-4"
                                            style={{ borderTop: "1px solid #171717", fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            Edition 1 of 50 — Never Reprinted
                                        </p>

                                        {/* CTA button */}
                                        <button
                                            className="w-full py-4 uppercase text-xs tracking-[0.3em] transition-all"
                                            style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                border: `1px solid ${BLOOD}`,
                                                color: i % 2 === 0 ? "white" : BLOOD,
                                                background: i % 2 === 0 ? BLOOD : "transparent",
                                            }}
                                            onMouseEnter={(e) => {
                                                const el = e.currentTarget;
                                                el.style.background = BLOOD;
                                                el.style.color = "white";
                                            }}
                                            onMouseLeave={(e) => {
                                                const el = e.currentTarget;
                                                el.style.background = i % 2 === 0 ? BLOOD : "transparent";
                                                el.style.color = i % 2 === 0 ? "white" : BLOOD;
                                            }}
                                        >
                                            Claim Vessel
                                        </button>
                                    </div>
                                </div>
                            </CardWrapper>
                        );
                    })}
                </section>

                {/* ── Red triangle divider ── */}
                <div className="flex flex-col items-center mb-40">
                    <div className="w-full max-w-lg relative" style={{ height: "1px", background: "#171717" }}>
                        <div
                            className="absolute left-1/2 -translate-x-1/2 -top-4"
                            style={{ color: BLOOD }}
                        >
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                                <path d="M20 0L40 40H0L20 0Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* ── The Cemetery (Retired Section) ── */}
                <section className="mb-40">
                    <div className="mb-24 text-center">
                        <h2
                            className="leading-none"
                            style={{ fontFamily: "'UnifrakturMaguntia', serif", fontSize: "5rem", color: "#404040" }}
                        >
                            The Cemetery
                        </h2>
                        <p
                            className="text-xs uppercase tracking-[0.6em] mt-4"
                            style={{ color: "#404040", fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Resting Forever in the Vault
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
                        {cemeteryProducts.map((item, i) => (
                            <Link href={`/vault`} key={item.id} className="group relative">
                                <div
                                    className="relative overflow-hidden bg-neutral-950 border p-4 transition-all duration-700 block"
                                    style={{
                                        aspectRatio: "3/5",
                                        clipPath: "ellipse(50% 100% at 50% 100%)",
                                        filter: "grayscale(100%)",
                                        opacity: 0.4,
                                        borderColor: "#171717",
                                    }}
                                    onMouseEnter={(e) => {
                                        const el = e.currentTarget as HTMLDivElement;
                                        el.style.opacity = "1";
                                        el.style.borderColor = BLOOD + "33";
                                    }}
                                    onMouseLeave={(e) => {
                                        const el = e.currentTarget as HTMLDivElement;
                                        el.style.opacity = "0.4";
                                        el.style.borderColor = "#171717";
                                    }}
                                >
                                    {item.images?.[0] && <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-full h-full object-cover grayscale"
                                        style={{ filter: "brightness(0.3) grayscale(100%)" }}
                                    />}
                                    {/* Overlay info */}
                                    <div
                                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                                        style={{ background: "rgba(0,0,0,0.6)" }}
                                    >
                                        <span
                                            className="material-symbols-outlined text-5xl mb-4"
                                            style={{ color: "#404040" }}
                                        >
                                            skull
                                        </span>
                                        <h4
                                            className="text-3xl"
                                            style={{ fontFamily: "'UnifrakturMaguntia', serif", color: "#737373" }}
                                        >
                                            {item.name}
                                        </h4>
                                        <div className="mt-6 pt-6 w-full" style={{ borderTop: "1px solid #262626" }}>
                                            <p
                                                className="text-[10px] uppercase tracking-widest"
                                                style={{ color: "#404040", fontFamily: "'Space Grotesk', sans-serif" }}
                                            >
                                                Died: {new Date(item.created_at).getFullYear() || "2023"}
                                            </p>
                                            <p
                                                className="text-[9px] uppercase mt-2 font-bold"
                                                style={{ color: BLOOD, fontFamily: "'Space Grotesk', sans-serif" }}
                                            >
                                                Forever Retired
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            {/* ── Theme Switcher ── */}
            <ThemeDock />

            {/* ── Footer ── */}
            <footer className="pt-24 pb-12 px-8 relative z-10" style={{ background: "#0a0a0a" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-20">
                    <div>
                        <div
                            className="text-lg font-black text-neutral-200 uppercase mb-6"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            VASLIC
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            A kinetic sanctuary for high-fashion mortality. Curated, numbered, and never repeated.
                        </p>
                    </div>
                    {[
                        { title: "Archive", links: ["Vault Registration", "Authentication Service"] },
                        { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
                        { title: "Support", links: ["Shipping", "Contact Grave"] },
                    ].map((col) => (
                        <div key={col.title}>
                            <h4
                                className="text-xs font-bold uppercase tracking-widest mb-6"
                                style={{ color: "#737373", fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                {col.title}
                            </h4>
                            <ul className="space-y-3">
                                {col.links.map((l) => (
                                    <li key={l}>
                                        <a
                                            href="#"
                                            className="text-neutral-600 hover:text-[#8b0000] transition-colors text-sm"
                                        >
                                            {l}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div
                    className="max-w-7xl mx-auto pt-8 text-center"
                    style={{ borderTop: "1px solid #171717" }}
                >
                    <p
                        className="text-[10px] tracking-widest text-neutral-700"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        © 2024 VASLIC. No reprints. No restocks. No exceptions.
                    </p>
                </div>
            </footer>

            {/* ── Material Icons + flicker animation ── */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
            <style>{`
        @keyframes flicker { 0% { opacity: 0.95; } 50% { opacity: 1; } 100% { opacity: 0.9; } }
      `}</style>
        </div>
    );
}
