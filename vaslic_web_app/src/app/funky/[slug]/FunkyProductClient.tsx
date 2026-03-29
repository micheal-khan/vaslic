"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, CheckCircle2 } from "lucide-react";
import FunkyNavbar from "@/components/navbars/FunkyNavbar";
import ThemeDock from "@/components/ThemeDock";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const CYAN = "#00f5d4";
const PINK = "#ff2d9b";
const LIME = "#b6ff00";
const BG = "#0d0d2b";

const SIZES = [
    { label: "XS", disabled: false },
    { label: "S", disabled: false },
    { label: "M", disabled: false, defaultActive: true },
    { label: "L", disabled: false },
    { label: "XL", disabled: true },
];

const SETLIST = [
    { icon: "memory", title: "Reactive Neon Fiber", desc: "Nanotechnology-infused fabric that pulses with your heart rate." },
    { icon: "grid_view", title: "Reflective Pixel Mesh", desc: "3D-printed ventilation panels with 8-bit aesthetic patterns." },
    { icon: "wash", title: "Care Instructions", desc: "Hand wash in cold static only. Do not tumble dry in the matrix." },
];

export default function FunkyProductClient({ product }: { product: any }) {
    const [selectedSize, setSelectedSize] = useState("M");
    const [ctaHovered, setCtaHovered] = useState(false);

    // For waiting list
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isJoined, setIsJoined] = useState(false);

    const isLive = product.status === "live";

    // Images from DB
    const images = product.images || [];
    const HERO_IMG = images[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuBG5Si27FCyVzfL74Tmgk-Jl-VOBYzM1WQay6Gg_wjRL1M27AsRMiCl1opPBvsus1WHJP9MKSvoxVbD9K8bLATR3525kofn-kKy5zWrnuJ5qGrlpg9mdKKPsaIgH_36gbWHPsOacC47qMrUfUz6OEbZWS8n-uZ4wEH3CnfhwI63dw-AVQbAPYPM59pCnfbedtIT7pCYMqaS2JJm7XX46gHf_p4x-xA8M7cmgM1oFss_LKGIqH_eFWIUWdy1a98cPohCNDrKNJKnmgI";
    const THUMBS = [
        { src: images[1] || images[0], active: true },
        { src: images[2] || images[0], active: false },
        { src: images[3] || images[0], active: false },
        { src: images[4] || images[0], active: false },
    ];

    const handleJoinWaitlist = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsJoined(true);
            setEmail("");
        }, 1500);
    };

    return (
        <div
            className="min-h-screen overflow-x-hidden"
            style={{ background: BG, color: "#e5e2e1", fontFamily: "'Manrope', sans-serif" }}
        >
            <style>{`
        @keyframes pulse-glow { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; display:inline-block; line-height:1; }
        .bg-cassette {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300f5d4' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 30V20h2v10H6zm14 10V30h2v10h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

            {/* ── Cassette pattern overlay ── */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-cassette" />

            {/* ── Frosted Navbar ── */}
            <FunkyNavbar />

            <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* ── Gallery (7 cols) ── */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* Main hero with retro corner accents */}
                        <div className="relative group">
                            <div className="absolute -top-4 -left-4 w-12 h-12 pointer-events-none z-10" style={{ borderTop: `4px solid ${CYAN}`, borderLeft: `4px solid ${CYAN}` }} />
                            <div className="absolute -bottom-4 -right-4 w-12 h-12 pointer-events-none z-10" style={{ borderBottom: `4px solid ${PINK}`, borderRight: `4px solid ${PINK}` }} />
                            <div className="overflow-hidden" style={{ boxShadow: `0 0 50px rgba(255,45,155,0.2)` }}>
                                <img
                                    src={HERO_IMG}
                                    alt={product.name}
                                    className="w-full object-cover transition-all duration-700"
                                    style={{ aspectRatio: "4/5", filter: "grayscale(100%)" }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0)"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%)"; }}
                                />
                            </div>
                        </div>

                        {/* Thumbnail strip */}
                        <div className="grid grid-cols-4 gap-4">
                            {THUMBS.map((t, i) => (
                                <button
                                    key={i}
                                    className="overflow-hidden transition-opacity"
                                    style={{
                                        aspectRatio: "1/1",
                                        borderBottom: t.active ? `4px solid ${CYAN}` : "none",
                                        opacity: t.active ? 1 : 0.5,
                                    }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                                    onMouseLeave={(e) => { if (!t.active) (e.currentTarget as HTMLButtonElement).style.opacity = "0.5"; }}
                                >
                                    <img src={t.src} alt={`Detail ${i + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Product Info (5 cols) ── */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <span
                                    className="px-3 py-1 text-sm uppercase tracking-tighter"
                                    style={{
                                        background: LIME,
                                        color: "black",
                                        fontFamily: "'Righteous', sans-serif",
                                        boxShadow: `4px 4px 0px ${PINK}`,
                                    }}
                                >
                                    VAULT ID: {product.vault_id}
                                </span>
                                <span className="font-bold text-xs tracking-[0.2em]" style={{ color: CYAN }}>{isLive ? "AVAILABLE NOW" : "VAULT LOCKED"}</span>
                            </div>

                            <h1
                                className="leading-none tracking-tight mb-4"
                                style={{ fontFamily: "'Righteous', sans-serif", fontSize: "clamp(3.5rem,6vw,4.5rem)", color: "white" }}
                            >
                                {product.name.split(" ").slice(0, -1).join(" ")}{" "}
                                <span className="block" style={{ color: PINK }}>{product.name.split(" ").slice(-1)}</span>
                            </h1>

                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl" style={{ color: LIME, fontFamily: "'Righteous', sans-serif" }}>${product.price}</span>
                                {product.compare_price && (
                                    <span style={{ color: `${CYAN}99`, textDecoration: "line-through", fontFamily: "'Righteous', sans-serif" }}>${product.compare_price}</span>
                                )}
                            </div>
                        </div>

                        <div
                            className="p-6 relative overflow-hidden"
                            style={{ background: "rgba(13,13,43,0.7)", backdropFilter: "blur(12px)", borderLeft: `4px solid ${PINK}` }}
                        >
                            <div className="absolute top-0 right-0 pointer-events-none" style={{ opacity: 0.05 }}>
                                <span className="material-symbols-outlined" style={{ fontSize: "120px", color: CYAN }}>bolt</span>
                            </div>
                            <p className="text-sm mb-1" style={{ color: LIME, fontFamily: "'Righteous', sans-serif" }}>
                                EDITION 1 OF {product.total_units} — NEVER REPRINTED
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ background: "#ef4444", animation: "pulse-glow 2s ease-in-out infinite" }} />
                                <p className="text-lg" style={{ color: "white", fontFamily: "'Righteous', sans-serif" }}>{product.units_remaining} UNITS LEFT</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-lg leading-relaxed" style={{ color: "rgba(207,227,255,0.8)", fontFamily: "'Nunito', sans-serif" }}>
                                {product.description || `A high-voltage fusion of retro-futurism and street-ready style. This limited edition piece is a rhythmic explosion of color.`}
                            </p>
                        </div>

                        {/* Interaction Zone */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label
                                        className="text-sm uppercase tracking-widest"
                                        style={{ color: CYAN, fontFamily: "'Righteous', sans-serif" }}
                                    >
                                        Select Frequency (Size)
                                    </label>
                                    <a href="#" className="text-xs underline transition-colors" style={{ color: PINK }}>SIZE GUIDE</a>
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {SIZES.map((sz) =>
                                        sz.label === "XL" ? (
                                            <button
                                                key={sz.label}
                                                disabled
                                                className="h-12 flex items-center justify-center relative overflow-hidden cursor-not-allowed"
                                                style={{ border: "2px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.2)", fontFamily: "'Righteous', sans-serif" }}
                                            >
                                                {sz.label}
                                                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.2)" }}>
                                                    <div className="w-full h-[2px] rotate-45" style={{ background: "#ef4444" }} />
                                                </div>
                                            </button>
                                        ) : (
                                            <button
                                                key={sz.label}
                                                onClick={() => setSelectedSize(sz.label)}
                                                className="h-12 flex items-center justify-center transition-all"
                                                style={{
                                                    fontFamily: "'Righteous', sans-serif",
                                                    background: selectedSize === sz.label ? CYAN : "transparent",
                                                    color: selectedSize === sz.label ? "black" : CYAN,
                                                    border: selectedSize === sz.label ? "none" : `2px solid ${CYAN}`,
                                                }}
                                            >
                                                {sz.label}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="pt-4">
                                {isLive ? (
                                    <button
                                        className="w-full py-6 text-white uppercase text-2xl tracking-[0.1em] transition-all active:scale-95"
                                        style={{
                                            fontFamily: "'Righteous', sans-serif",
                                            background: `linear-gradient(to right, ${CYAN}, ${PINK})`,
                                            boxShadow: ctaHovered ? `12px 12px 0px ${LIME}` : `8px 8px 0px ${LIME}`,
                                            transform: ctaHovered ? "translate(-4px, -4px)" : "none",
                                        }}
                                        onMouseEnter={() => setCtaHovered(true)}
                                        onMouseLeave={() => setCtaHovered(false)}
                                    >
                                        CLAIM VESSEL
                                    </button>
                                ) : (
                                    <div className="space-y-6">
                                        {!isJoined ? (
                                            <form onSubmit={handleJoinWaitlist} className="space-y-4">
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="ENCRYPTED EMAIL"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-[#1e293b] border border-none px-6 py-5 text-sm outline-none text-white uppercase tracking-[0.2em]"
                                                    style={{ fontFamily: "'Righteous', sans-serif" }}
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full py-6 text-white uppercase text-2xl tracking-[0.1em] transition-all active:scale-95"
                                                    style={{
                                                        fontFamily: "'Righteous', sans-serif",
                                                        background: `linear-gradient(to right, ${CYAN}, ${PINK})`,
                                                        boxShadow: `8px 8px 0px ${LIME}`,
                                                    }}
                                                >
                                                    {isSubmitting ? "LINKING..." : "JOIN FREQUENCY"}
                                                </button>
                                            </form>
                                        ) : (
                                            <div
                                                className="py-8 bg-black/40 border border-[#00f5d4]/20 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-500"
                                            >
                                                <CheckCircle2 size={32} style={{ color: "#00f5d4" }} />
                                                <div className="text-center">
                                                    <p className="text-sm uppercase tracking-[0.2em] font-bold text-[#00f5d4]">FREQUENCY LINKED</p>
                                                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">You will be notified when the signal returns.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Warning panel */}
                        <div className="flex gap-3 items-start p-4 border" style={{ background: `${PINK}1a`, borderColor: `${PINK}33` }}>
                            <span className="material-symbols-outlined" style={{ color: PINK }}>warning</span>
                            <p className="text-xs font-bold text-white uppercase leading-tight italic">Once it's gone, it's gone. Forever. No exceptions.</p>
                        </div>
                    </div>
                </div>

                <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="relative p-8" style={{ background: "#1c1b1b", borderTop: `4px solid ${LIME}` }}>
                        <div className="absolute -top-10 left-0">
                            <h2 className="text-4xl uppercase text-white" style={{ fontFamily: "'Righteous', sans-serif" }}>SETLIST (SPECS)</h2>
                        </div>
                        <ul className="space-y-6 pt-4">
                            {SETLIST.map((item) => (
                                <li key={item.title} className="flex items-start gap-4">
                                    <span className="material-symbols-outlined" style={{ color: CYAN }}>{item.icon}</span>
                                    <div>
                                        <h4 className="text-lg" style={{ color: CYAN, fontFamily: "'Righteous', sans-serif" }}>{item.title}</h4>
                                        <p className="text-sm text-neutral-400">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative p-8" style={{ background: "#1c1b1b", borderTop: `4px solid ${PINK}` }}>
                        <div className="absolute -top-10 left-0">
                            <h2 className="text-4xl uppercase text-white" style={{ fontFamily: "'Righteous', sans-serif" }}>BACKSTORY (ORIGIN)</h2>
                        </div>
                        <p className="pt-4 leading-relaxed text-sm text-neutral-300">
                            Born in the flicker of a CRT monitor and the echo of a distorted Moog synthesizer, this piece is our tribute to the digital frontier.
                        </p>
                    </div>
                </section>
            </main>

            {/* ── Theme Dock ── */}
            <ThemeDock />

            {/* ── Fonts ── */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=Righteous&family=Nunito:wght@300;400;600;700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
        </div>
    );
}
