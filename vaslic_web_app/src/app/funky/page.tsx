"use client";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import FunkyNavbar from "@/components/navbars/FunkyNavbar";
import ThemeDock from "@/components/ThemeDock";

// ─── Brand tokens (exact from Stitch Refined Grid HTML) ─────────────────────
const CYAN = "#00f5d4";
const PINK = "#ff007f";
const NAV_BG = "#0d0d2b";

// ─── Product data (4 items, 2-col staggered) ────────────────────────────────
const products = [
    {
        id: "VLK-FNKY-001",
        slug: "/funky/vlk-fnky-001",
        name: "NEON SYNTH WAVE",
        edition: "Edition 1 of 50 — Never Reprinted",
        units: "12 UNITS LEFT",
        price: "$420",
        col: "left",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDOVzWyPODpwpC4fcJHPE2avjxoBgJs-lZl3dHt-vD6qsqd7f6tFB_j_KQA-d0QvTqtPn1FbCXneQIgA74xuacE9MkTmhLr3eF0--dws17P1fbdOp_Vx6OSKXQ_Wa3XEqBnUqNdlaOE66ZqOOQLI1ooqa5kEOhAnYQLPyAysm1ooPNX6RYWI20iN0fyMuv65vl3lS7nwE8w9Ji6lErPxpg5EmXxTg65TphPTmWOgiPPI-4G-5HX-HTWrdV82Gytu0SBsPQ8D-Z50Uk",
    },
    {
        id: "VLK-FNKY-002",
        name: "ELECTRIC DRIFT",
        edition: "Edition 1 of 50 — Never Reprinted",
        units: "4 UNITS LEFT",
        price: "$385",
        col: "right",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAZSzkRDY3EBq4IpMcrDQr1KUG76n4c5gEl4Bg_0KAhqI3uu3jlNSN-KBHwpeISKRqk3D3pjlBFQmkvxLM4V6D-kdhm9HPkuzrMdqhZa7EZzuNlI7QcyaHdpNt5GVZXbWWpUmJ-TPAxG2qYc42-IueUmkQVsdrhIVh_tP3rtls5XadIeFRmGVdi76aGjb7ScfblCfYGl7U1tW935LuHIS53epxKYDcDQvoVAPP9wcLHLFYEBRr7Xg_429Ml9VQh-6IAcTP-Dkmiqvc",
    },
    {
        id: "VLK-FNKY-003",
        name: "PIXEL GLITCHED",
        edition: "Edition 1 of 50 — Never Reprinted",
        units: "22 UNITS LEFT",
        price: "$550",
        col: "left",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDDj9_VP95D7aTcR2Rp1RC7Wiyfv1CwoafsapCv2IrRCe6i_xl_1iravefirRIego1xMJcmSDIS0jGj2dkRjynr12U_Z8--G6_jVapc5eiD7DJ7Sja_Ve6aHl5QjGdNC0oh02Pe7NRNs3kMK_GLjHvRTBqEYmTcY6KClCoE-j-9VS-P2VGyYXuzhQTcdbSk6Q-X6uA3IBDYlKTN-tqO9swwWbrrcHv0aAwdcmWzXwLuKVcjv5xJFwp1X4886emitNZNytpKopDY3BM",
    },
    {
        id: "VLK-FNKY-004",
        name: "REMIX REBEL",
        edition: "Edition 1 of 50 — Never Reprinted",
        units: "7 UNITS LEFT",
        price: "$295",
        col: "right",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAMWoTExEYx7EEd9483HQSxGuYWUhYm7SC0QSjcEOT9SxwzeTDULtIhbyZMI0K8sdv-J1Y9-PHHrOwfZ_N1Ao8ukBg0Qa2m0msFxRcvuomVJLeq5eLzvCx5UzJ9uqhuZfCu6w0xsaBYLUYm8sBiLiLB8UltD2hzcMxEoS-jXhK_utCfS-FXQmEgkIfUPK9thCbilJ_EuHrvPZJJ4-6jr0W1k0IR-dzULNIgow0BPR0MkTnUYyC8NqdEt2dEb8P6t2AxDE9SYi2WFaY",
    },
];

const retiredSessions = [
    { set: "SET 01", name: "CHROME DISCO PHANTOM", date: "RELEASED AUG 23" },
    { set: "SET 02", name: "VIRTUAL REALITY VANDAL", date: "RELEASED SEP 23" },
    { set: "SET 03", name: "CYBERPUNK SAMURAI SOUL", date: "RELEASED OCT 23" },
    { set: "SET 04", name: "LASER GRID NOMAD", date: "RELEASED DEC 23" },
];

const navLinks = [
    { href: "/gothic", label: "Gothic" },
    { href: "/bohemian", label: "Bohemian" },
    { href: "/avant-garde", label: "Avant-Garde" },
    { href: "/street", label: "Street" },
    { href: "/funky", label: "Funky", active: true },
];

const themeDots = [
    { bg: "#0a0a0a", border: "#8b0000", active: false, href: "/gothic" },
    { bg: "#f5ebe0", border: "#c77b4a", active: false, href: "/bohemian" },
    { bg: "#ffffff", border: "#008DB9", active: false, href: "/avant-garde" },
    { bg: "#1a1a1a", border: "#f5e642", active: false, href: "/street" },
    { bg: "#0d0d2b", border: CYAN, active: true, href: "/funky" },
];

// ─── Product card ─────────────────────────────────────────────────────────────
function ProductCard({ p, staggered }: { p: (typeof products)[0] & { slug?: string }; staggered: boolean }) {
    return (
        <div
            className={`group relative bg-[#131313] p-1 border border-[#00f5d4]/10 hover:border-[#ff007f]/50 transition-all duration-500${staggered ? " mt-12 md:mt-24" : ""
                }`}
        >
            {/* Image */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Vault ID badge */}
                <div
                    className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 text-[10px] tracking-widest border border-[#00f5d4]/30"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: CYAN }}
                >
                    {p.id}
                </div>
                {/* Units badge */}
                <div
                    className="absolute bottom-4 right-4 text-white px-3 py-1 text-[10px] font-bold tracking-tighter"
                    style={{ background: PINK, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    {p.units}
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
                            {p.edition}
                        </p>
                    </div>
                    <div className="text-right">
                        <span
                            className="text-2xl"
                            style={{ fontFamily: "'Righteous', sans-serif", color: CYAN }}
                        >
                            {p.price}
                        </span>
                    </div>
                </div>
                <button
                    className="w-full py-4 text-xl tracking-tight hover:brightness-110 transition-all active:scale-[0.98]"
                    style={{
                        fontFamily: "'Righteous', sans-serif",
                        background: `linear-gradient(to right, ${CYAN}, ${PINK})`,
                        color: NAV_BG,
                    }}
                >
                    JOIN WAITLIST
                </button>
            </div>
        </div>
    );
}

export default function FunkyPage() {
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
                        {products.map((p) => (
                            p.slug
                                ? <Link key={p.id} href={p.slug}><ProductCard p={p} staggered={p.col === "right"} /></Link>
                                : <ProductCard key={p.id} p={p} staggered={p.col === "right"} />
                        ))}
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
                            {retiredSessions.map((item) => (
                                <div
                                    key={item.set}
                                    className="flex items-baseline justify-between group cursor-not-allowed grayscale opacity-40"
                                >
                                    <div className="flex items-baseline gap-4">
                                        <span
                                            className="text-white/20 text-sm"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            {item.set}
                                        </span>
                                        <span
                                            className="text-white text-xl"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            {item.name}
                                        </span>
                                    </div>
                                    {/* Dotted leader line */}
                                    <div className="flex-grow border-b border-dotted border-white/30 mx-4" />
                                    <span
                                        className="text-white/40 text-xl"
                                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        {item.date}
                                    </span>
                                </div>
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
            <footer
                className="w-full border-t"
                style={{ borderColor: `${CYAN}1a`, background: NAV_BG }}
            >
                <div className="flex flex-col md:flex-row justify-between items-center px-12 py-10 gap-6">
                    <div
                        className="text-xl font-bold"
                        style={{ fontFamily: "'Righteous', sans-serif", color: CYAN }}
                    >
                        VASLIC
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        {["Privacy Policy", "Terms of Service", "Shipping Info", "Newsletter Signup"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-[#00f5d4] underline decoration-[#ff007f] decoration-2 transition-opacity duration-300"
                                style={{ fontFamily: "'Manrope', sans-serif" }}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                    <div
                        className="text-xs uppercase tracking-[0.2em] text-white/50"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                        © 2024 VASLIC KINETIC CURATORS. ALL RIGHTS RESERVED.
                    </div>
                </div>
            </footer>

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
