"use client";
import { useState } from "react";
import Link from "next/link";
import FunkyNavbar from "@/components/navbars/FunkyNavbar";
import ThemeDock from "@/components/ThemeDock";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const CYAN = "#00f5d4";
const PINK = "#ff2d9b";
const LIME = "#b6ff00";
const BG = "#0d0d2b";

// ─── Image pool ───────────────────────────────────────────────────────────────
const HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBG5Si27FCyVzfL74Tmgk-Jl-VOBYzM1WQay6Gg_wjRL1M27AsRMiCl1opPBvsus1WHJP9MKSvoxVbD9K8bLATR3525kofn-kKy5zWrnuJ5qGrlpg9mdKKPsaIgH_36gbWHPsOacC47qMrUfUz6OEbZWS8n-uZ4wEH3CnfhwI63dw-AVQbAPYPM59pCnfbedtIT7pCYMqaS2JJm7XX46gHf_p4x-xA8M7cmgM1oFss_LKGIqH_eFWIUWdy1a98cPohCNDrKNJKnmgI";
const THUMB_1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuDzBY_tQzdDFafIxfEwX-zjnhQfNRirFIIqgHhup-nfApyDMxF5p3W4LkU_CZIQry1QNN3qmiu2pGTDRZHq-apylko_Wic81n55qApx_PvW0OI-Db2CPubUDJR64C-8es6JrYA5-XVyF0ku54_UR6vs3cH0rQ3pfmHKcMkJkbrjHz30gm93INg8kHI5VZz7ZBUX16LGWSUaqxrJjR4NBYj7P0MNnhtkSkfabVsVNE78gLM_9yg86RHEemzmKji3Pq-XWGVFrKBwHAc";
const THUMB_2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuDuJvwGcCKFJRwHFx0IoYVD-sb7jnrBX46JTYP_CGerNIixUcGoJ10iP-3bYGNcYB7z9_9O_N3bjo2f-q554tJUmAV9raT1hmv6ijQLdNJ5sp8hXMxlAADaUnvaXcYaEiACw28xiEakf73ce-6shMTLbHY8hTGjT3AxWAhmjPPLuhIgssByrFHlN7nTdSMBMQnxn6xeevM4AKFoIF6pJMcra9QmX8MSFMhA5EjPm1bFuQHati_use0RBt4LHCUY5tTY7OPgUui2yeQ";
const THUMB_3 = "https://lh3.googleusercontent.com/aida-public/AB6AXuBMTLHeiz56B-MwNkrSd-V0dtwuxfxoIkbcorhcTFXUnL6qaJfCbHPcwa9Wt83RwFyJXu5T35bOsyagP7RVGhqa8c51KDUA2qjo3djHQ8JxaeJKa5YUKS8UrF2-5q_Hz7V_5mpJPwr7f9ffKhcCkKe-XRu0AQqcZfBMfZz4Ta-7jPnkSIPHhc11zORLXaqeXvoPhe8aMewxYFBq6K9oGIztExlgPwgSN28tj92-gCsmD35vV8BNf1PVFN_QqhoqaEwah41_UAJV5d8";
const THUMB_4 = "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqndrDJOFLpoIk8cf25LND-75nld8IVoF960-js2Xiw5UPx3VHz1V_5mpJPwr7f9ffKhcCkKe-XRu0AQqcZfBMfZz4Ta-7jPnkSIPHhc11zORLXaqeXvoPhe8aMewxYFBq6K9oGIztExlgPwgSN28tj92-gCsmD35vV8BNf1PVFN_QqhoqaEwah41_UAJV5d8";
const SYNTH_BG = "https://lh3.googleusercontent.com/aida-public/AB6AXuDuZO7i0GVlwK5sYTEMtAAdcJ6Oz4gaM_Xjf_11UsP36S2pwKNuwWk1Y2njcFh4e4-YHL7815aP1ftkdfkQ3YcwjzHnw1sJrBfJ6BR33QlHwt3uwZeFsBfDf2XVHFlFIz5BfXQ3jLGlpiWKQ1v4YHDfLMjPLkj0JmRzQ2leujdBwbQ-uXRwhsrJ86CRRrKta68yq87oj012yOorGzgx_rX9AhBcpgJDdC7a7Wf_Mjpaa5VgZIJ3s4igsHw758UGdHqNaSH52kRNWiE";
const RECO_1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuDYx5ROdij2AJB6rG0EpEXXSJGr5PMXRfK1KgSScxMB9XWZocoNNyKqYcU-0ImD75s-yuvOpBXqAyPVB8NT_JqkIHmJ2vLF-oRldEUijxNNt-o5XrcAuJPu9NkFGE2Ph5WNhB3qAsMmg5nOr3zvQZqHHW6JT5b3zHY4bECcRSLvOFrfSwlxWVwx4vvrx4FLu42DtZDlwwDlFO0uDzjAN3DSJg5LvgQdR6SsGK-ORdL9JP_rtd1DdAPijPBoBYllbOc0bbRXyixfzZA";
const RECO_2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuC4I5UmHDr69KEmcZlcjVYgRZ2l_E36gYi-YpOmF-P3TkKSEYNAmaA_GLVwILWJK4rQuU0VArlC3BtrBkp2MAST-J-l9THM9Uf77ROLubJzR4Pm8BzH5-8QgVyCK5mjlgrhVT1VeAJc5BDBPy_dazvDZer5SPpMNDWgR_vQGvOgMa_SN2997NmS-nViVmVjpH6KNHAP3v-OwDQoLtvRLoPwCrfmFFMQcj3SpJFly3wfIP7HVrswx2PWz48nVYhMi77tHPZ3FTpgx54";
const RECO_3 = "https://lh3.googleusercontent.com/aida-public/AB6AXuChKP3Aj9qUWXQWiSFHTdD7jQVHEgI3Hv0DuM6whczyDfqdneJMp4bCDzLj9Bg_dWPPmltnRMFevdbldFPJVatpEcF8WhW8gUwvj4zyvziC811uw2lAtP5x9-gM6oRkdckIRcEYSQS-0SqrPu9oQOoOVrIkT_nAyylcqYDuGY7eHKpz8tRN2whw-MFPx1_KUeIfmdgfljHVfj9SG0PUmF8qE_uAz8Q0axWojvlYfwJyIWLzP_IMlX8sEaiaDL2EH5kzhgLFo2jN4Ys";

const SIZES = [
    { label: "XS", disabled: false },
    { label: "S", disabled: false },
    { label: "M", disabled: false, defaultActive: true },
    { label: "L", disabled: false },
    { label: "XL", disabled: true },
];

const THUMBS = [
    { src: THUMB_1, active: true },
    { src: THUMB_2, active: false },
    { src: THUMB_3, active: false },
    { src: THUMB_4, active: false },
];

const SETLIST = [
    { icon: "memory", title: "Reactive Neon Fiber", desc: "Nanotechnology-infused fabric that pulses with your heart rate." },
    { icon: "grid_view", title: "Reflective Pixel Mesh", desc: "3D-printed ventilation panels with 8-bit aesthetic patterns." },
    { icon: "wash", title: "Care Instructions", desc: "Hand wash in cold static only. Do not tumble dry in the matrix." },
];

export default function NeonSynthWavePage() {
    const [selectedSize, setSelectedSize] = useState("M");
    const [ctaHovered, setCtaHovered] = useState(false);

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
        .pixel-corners {
          clip-path: polygon(0 4px,4px 4px,4px 0,calc(100% - 4px) 0,calc(100% - 4px) 4px,100% 4px,100% calc(100% - 4px),calc(100% - 4px) calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,4px calc(100% - 4px),0 calc(100% - 4px));
        }
        .glass-card { background: rgba(13,13,43,0.7); backdrop-filter: blur(12px); }
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
                            {/* Cyan top-left corner */}
                            <div className="absolute -top-4 -left-4 w-12 h-12 pointer-events-none z-10" style={{ borderTop: `4px solid ${CYAN}`, borderLeft: `4px solid ${CYAN}` }} />
                            {/* Pink bottom-right corner */}
                            <div className="absolute -bottom-4 -right-4 w-12 h-12 pointer-events-none z-10" style={{ borderBottom: `4px solid ${PINK}`, borderRight: `4px solid ${PINK}` }} />
                            {/* Hero image */}
                            <div className="overflow-hidden" style={{ boxShadow: `0 0 50px rgba(255,45,155,0.2)` }}>
                                <img
                                    src={HERO_IMG}
                                    alt="Neon Synth Wave Jacket"
                                    className="w-full object-cover transition-all duration-700"
                                    style={{ aspectRatio: "4/5", filter: "grayscale(100%)" }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0)"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%)"; }}
                                />
                            </div>
                        </div>

                        {/* 4-col thumbnail strip */}
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
                        {/* Header */}
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
                                    VAULT ID: VLK-FNKY-001
                                </span>
                                <span className="font-bold text-xs tracking-[0.2em]" style={{ color: CYAN }}>AVAILABLE NOW</span>
                            </div>

                            <h1
                                className="leading-none tracking-tight mb-4"
                                style={{ fontFamily: "'Righteous', sans-serif", fontSize: "clamp(3.5rem,6vw,4.5rem)", color: "white" }}
                            >
                                NEON{" "}
                                <span className="block" style={{ color: PINK }}>SYNTH WAVE</span>
                            </h1>

                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl" style={{ color: LIME, fontFamily: "'Righteous', sans-serif" }}>$420</span>
                                <span style={{ color: `${CYAN}99`, textDecoration: "line-through", fontFamily: "'Righteous', sans-serif" }}>$580</span>
                            </div>
                        </div>

                        {/* Urgency glass card */}
                        <div
                            className="p-6 relative overflow-hidden"
                            style={{ background: "rgba(13,13,43,0.7)", backdropFilter: "blur(12px)", borderLeft: `4px solid ${PINK}` }}
                        >
                            {/* Bolt watermark */}
                            <div className="absolute top-0 right-0 pointer-events-none" style={{ opacity: 0.05 }}>
                                <span className="material-symbols-outlined" style={{ fontSize: "120px", color: CYAN }}>bolt</span>
                            </div>
                            <p className="text-sm mb-1" style={{ color: LIME, fontFamily: "'Righteous', sans-serif" }}>
                                EDITION 1 OF 50 — NEVER REPRINTED
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ background: "#ef4444", animation: "pulse-glow 2s ease-in-out infinite" }} />
                                <p className="text-lg" style={{ color: "white", fontFamily: "'Righteous', sans-serif" }}>12 UNITS LEFT</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <p className="text-lg leading-relaxed" style={{ color: "rgba(207,227,255,0.8)", fontFamily: "'Nunito', sans-serif" }}>
                                A high-voltage fusion of retro-futurism and street-ready style. This limited edition piece is a rhythmic explosion of color, crafted for those who dance to the beat of their own drum.
                            </p>
                        </div>

                        {/* Size selector */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label
                                    className="text-sm uppercase tracking-widest"
                                    style={{ color: CYAN, fontFamily: "'Righteous', sans-serif" }}
                                >
                                    Select Frequency (Size)
                                </label>
                                <a
                                    href="#"
                                    className="text-xs underline transition-colors"
                                    style={{ color: PINK }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "white"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = PINK; }}
                                >
                                    SIZE GUIDE
                                </a>
                            </div>
                            <div className="grid grid-cols-5 gap-2">
                                {SIZES.map((sz) =>
                                    sz.disabled ? (
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

                        {/* CTA */}
                        <div className="space-y-6 pt-4">
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

                            {/* Warning panel */}
                            <div
                                className="flex gap-3 items-start p-4 border"
                                style={{ background: `${PINK}1a`, borderColor: `${PINK}33` }}
                            >
                                <span className="material-symbols-outlined" style={{ color: PINK }}>warning</span>
                                <p className="text-xs font-bold text-white uppercase leading-tight italic">
                                    Once it&apos;s gone, it&apos;s gone. Forever. No reprints. No restocks. No exceptions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SETLIST (Specs) + BACKSTORY (Origin) ── */}
                <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Setlist */}
                    <div className="relative p-8" style={{ background: "#1c1b1b", borderTop: `4px solid ${LIME}` }}>
                        <div className="absolute -top-10 left-0">
                            <h2 className="text-4xl uppercase text-white" style={{ fontFamily: "'Righteous', sans-serif" }}>
                                SETLIST <span style={{ color: LIME }}>(SPECS)</span>
                            </h2>
                        </div>
                        <ul className="space-y-6 pt-4">
                            {SETLIST.map((item) => (
                                <li key={item.icon} className="flex items-start gap-4">
                                    <span className="material-symbols-outlined" style={{ color: CYAN }}>{item.icon}</span>
                                    <div>
                                        <h4 className="text-lg" style={{ color: CYAN, fontFamily: "'Righteous', sans-serif" }}>{item.title}</h4>
                                        <p className="text-sm" style={{ color: "rgba(207,227,255,0.6)", fontFamily: "'Nunito', sans-serif" }}>{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Backstory */}
                    <div className="relative p-8" style={{ background: "#1c1b1b", borderTop: `4px solid ${PINK}` }}>
                        <div className="absolute -top-10 left-0">
                            <h2 className="text-4xl uppercase text-white" style={{ fontFamily: "'Righteous', sans-serif" }}>
                                BACKSTORY <span style={{ color: PINK }}>(ORIGIN)</span>
                            </h2>
                        </div>
                        <div className="pt-4 leading-relaxed space-y-4" style={{ color: "rgba(207,227,255,0.8)", fontFamily: "'Nunito', sans-serif" }}>
                            <p>
                                Born in the flicker of a CRT monitor and the echo of a distorted Moog synthesizer, the{" "}
                                <span style={{ color: PINK, fontWeight: "bold" }}>NEON SYNTH WAVE</span> is our tribute to the digital frontier.
                            </p>
                            <p>
                                Inspired by the 1984 underground glitch scene, this vessel bridges the gap between physical reality and the high-speed dreamscape of the early internet. Every stitch is a line of code, every color a frequency.
                            </p>
                            <div className="pt-4">
                                <img
                                    src={SYNTH_BG}
                                    alt="Synthwave background"
                                    className="w-full object-cover"
                                    style={{ height: "128px", filter: "grayscale(100%) brightness(50%) contrast(125%)" }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── KEEP THE PARTY GOING — Bento Grid ── */}
                <section className="mt-32">
                    <h3
                        className="text-3xl text-white mb-10 text-center uppercase tracking-widest"
                        style={{ fontFamily: "'Righteous', sans-serif" }}
                    >
                        KEEP THE PARTY GOING
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Big tile — Kinetic Kicks */}
                        <div className="col-span-2 row-span-2 relative overflow-hidden group" style={{ background: "#20201f" }}>
                            <img
                                src={RECO_1}
                                alt="Kinetic Kicks"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                style={{ opacity: 0.5 }}
                            />
                            <div
                                className="absolute bottom-0 left-0 p-6 w-full"
                                style={{ background: "linear-gradient(to top, black, transparent)" }}
                            >
                                <p className="font-bold" style={{ color: LIME, fontFamily: "'Righteous', sans-serif" }}>KINETIC KICKS</p>
                                <p className="text-white text-xs">$280</p>
                            </div>
                        </div>

                        {/* Glitch Visor */}
                        <div className="relative overflow-hidden group" style={{ background: "#20201f", aspectRatio: "1/1" }}>
                            <img
                                src={RECO_2}
                                alt="Glitch Visor"
                                className="w-full h-full object-cover transition-opacity"
                                style={{ opacity: 0.5 }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.5"; }}
                            />
                            <div className="absolute inset-0 flex items-end p-4">
                                <p className="text-white text-sm" style={{ fontFamily: "'Righteous', sans-serif" }}>GLITCH VISOR</p>
                            </div>
                        </div>

                        {/* Pulse Boots */}
                        <div className="relative overflow-hidden group" style={{ background: "#20201f", aspectRatio: "1/1" }}>
                            <img
                                src={RECO_3}
                                alt="Pulse Boots"
                                className="w-full h-full object-cover transition-opacity"
                                style={{ opacity: 0.5 }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.5"; }}
                            />
                            <div className="absolute inset-0 flex items-end p-4">
                                <p className="text-white text-sm" style={{ fontFamily: "'Righteous', sans-serif" }}>PULSE BOOTS</p>
                            </div>
                        </div>

                        {/* New Drops Banner */}
                        <div
                            className="col-span-2 flex items-center justify-center p-8 text-center border-2 border-dashed"
                            style={{ height: "160px", background: `${PINK}1a`, borderColor: PINK }}
                        >
                            <p className="text-xl" style={{ color: PINK, fontFamily: "'Righteous', sans-serif" }}>
                                NEW DROPS EVERY FULL MOON. STAY WIRED.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* ── Footer ── */}
            <footer className="w-full pt-20 pb-10" style={{ background: "#0d0d2b", borderTop: "none" }}>
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        <span className="text-xl mb-4 block" style={{ color: CYAN, fontFamily: "'Righteous', sans-serif" }}>VASLIC KINETIC</span>
                        <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                            Curating high-voltage aesthetics for the digital nomad since 20XX.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-bold text-xs uppercase mb-6 tracking-widest" style={{ color: PINK }}>NAVIGATE</h5>
                        <ul className="space-y-4">
                            {["ARCHIVES", "THE VAULT", "ARTIST CO-LABS"].map((l) => (
                                <li key={l}>
                                    <a href="#" className="text-sm transition-colors hover:text-white" style={{ color: "#94a3b8" }}>{l}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-xs uppercase mb-6 tracking-widest" style={{ color: PINK }}>PROTOCOL</h5>
                        <ul className="space-y-4">
                            {["PRIVACY POLICY", "TERMS OF SERVICE", "SHIPPING INFO"].map((l) => (
                                <li key={l}>
                                    <a href="#" className="text-sm transition-colors hover:text-white" style={{ color: "#94a3b8" }}>{l}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-xs uppercase mb-6 tracking-widest" style={{ color: PINK }}>SIGNAL</h5>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm" style={{ color: "#94a3b8" }}>JOIN THE NEWSLETTER FOR EXCLUSIVE DROPS.</p>
                            <div className="flex">
                                <input
                                    className="text-xs text-white w-full p-3 outline-none"
                                    placeholder="ENCRYPTED EMAIL"
                                    type="email"
                                    style={{ background: "#1e293b", border: "none", fontFamily: "'Righteous', sans-serif" }}
                                />
                                <button
                                    className="px-4 font-black text-black transition-colors"
                                    style={{ background: CYAN, fontFamily: "'Righteous', sans-serif" }}
                                >
                                    JOIN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-8 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs tracking-tight" style={{ color: "#64748b" }}>
                        © 2024 VASLIC KINETIC CURATORS. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-6">
                        {[
                            { icon: "terminal", hover: PINK },
                            { icon: "share", hover: CYAN },
                            { icon: "rss_feed", hover: LIME },
                        ].map((s) => (
                            <span
                                key={s.icon}
                                className="material-symbols-outlined cursor-pointer transition-colors"
                                style={{ color: "#64748b" }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = s.hover; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "#64748b"; }}
                            >
                                {s.icon}
                            </span>
                        ))}
                    </div>
                </div>
            </footer>

            {/* ── Theme Dock ── */}
            <ThemeDock />

            {/* ── Google Fonts + Material Icons ── */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=Righteous&family=Nunito:wght@300;400;600;700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
        </div>
    );
}
