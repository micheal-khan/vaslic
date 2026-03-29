"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { joinGeneralWaitlist } from "@/app/actions";

const ease = [0.22, 1, 0.36, 1] as const;

const categories = [
    {
        name: "Gothic",
        slug: "gothic",
        id: "VLK-GOTH-001",
        accent: "#8b0000",
        fontClass: "font-gothic",
        tagline: "Edition 1 of 50 — Never Reprinted",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3S6EWsdyPqGesDT2s2s2A8IoUQLg3DUS2sMZlJ2uOE_4P1iTQ2F4bBTo1YyItB3C1GLtm9BEwchFIfi35m-P_A2Wq6i_ZspRHszXBYh3ptpEFnAX8BZTzCRMiDc3Ku1HAqg_gRXN1Dm5xGLMs82MAzhIQwdtsRpDuR1V8MdVvqffZkmMho1idqB-QWarKa4SS1kXFzKytjxtz3SWLsMoRz2-8yk4-uwFC0iNdRFwYaeJ7IUpsabXqcIRNBiC9NPlXIXvXhZBJ9-Q",
        cardBg: "#0a0a0a",
        hoverShadow: "rgba(139,0,0,0.15)"
    },
    {
        name: "Bohemian",
        slug: "bohemian",
        id: "VLK-BOHO-082",
        accent: "#c77b4a",
        fontClass: "font-bohemian",
        tagline: "Edition 1 of 12 — Never Reprinted",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0yhe2z_nGaU6maMjzR3cHLex3i0K-xNZ6slJYDzGLQtvjdjnAaxyndSfWUEZA1g21SpQMk6Zn5VOnP_FK02gf6vY4jtmiHGH2O8OHNORGOsZLT6dK3onen4_W0AokARsucMRDfvgfEW_2uUDBIX2Zlr-Cuqwp7DbRPCrd3TSQ78Lp6IuKZ9J4V_tjjyvn0L7DX12LOQ0p0Jl9pPnvajF91OmyTb5ZIT4zTRkqb4AH8z2smquNfMH1baGPRSQqFDLrUvUyXVYkQNk",
        cardBg: "#f5ebe0"
    },
    {
        name: "Street",
        slug: "street",
        id: "VLK-STRT-449",
        accent: "#f5e642",
        fontClass: "font-avant", // Street uses Bebas Neue (Avant in the project)
        tagline: "Edition 1 of 100 — Never Reprinted",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASvyAFAl-ywfG865Yu5W7ZUZtmm1iRGx4Pu4DQNG-efYRbsWFHqj9WoCth_idjRa9NRXhGG4LEMJYvZDxxooN0PbvKRGXVaZwyRcerHEpe3-S3JMMR8Y0aN7LF1_pRIIauO_SX1i4-MC7ZUziZka9RkAhDVG9DTvd04WKcI1bcQw8i0CtZxHjC-JVW-fq5bc9ESSVcR0jpG3998ySELviQAtBD1tPH9Vtcipl6f4JlG6wE8kME4jCFLD4fZ0kFCmvmrQOmEt10ETE",
        cardBg: "#1a1a1a"
    },
    {
        name: "Avant-Garde",
        slug: "avant-garde",
        id: "VLK-AVNT-000",
        accent: "#008DB9",
        fontClass: "font-avant",
        tagline: "Edition 1 of 25 — Never Reprinted",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCevY7KJDfcmMjjU8K5si6e0ZH3FUTc6Ms0JwzyzeZZg6Njh7HWgmqxKyBTrQRzjj7JVMPjZobWjww7qg3gOzvjzwYEcD1bgiXNjG5BSZknTaiFutTzMO6lytmoQCZDW33yPQKmGgYV2DiM1mKyMhZvDgQ05nF5QpVXTZ6YO3n2R1KHH0lkQ2az88D822JRKVc2GL7LcFadjp2hLRP1lPph9B5VSvth_8uV1Pt-BqU1BhcrR5nbdxWQXw7ryursYEF1rMuQXZLlsvQ",
        cardBg: "#ffffff"
    },
    {
        name: "Funky",
        slug: "funky",
        id: "VLK-FUNK-777",
        accent: "#00f5d4",
        fontClass: "font-funky",
        tagline: "Edition 1 of 30 — Never Reprinted",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAWllXXPFmv4PP22dWuEtn6IP5oBS-nUQ95tNbgQAC-jr2ApQqBIJJ3ljXGH0OrtPYC5cvBJ9JaCQXRGGDQRyS56JJQHCJ5tRRbC6kW4b-6OaqdGxq4gDsZ7hs-tvipv-CU7qoRyJ66-mCpYtAe_aLvLntDlY9p_8fzBA9KkkNFA5OI946BbALAKr_7oeUsEFBbJr-4i4srG2j3gyVxlBU7nwPjgfLc86V4x8Xk3n3TRGWJ3vbn6NF-1KLUkUcOfRCejvlk1E7-eE",
        cardBg: "#0d0d2b"
    }
];

export default function WaitlistPage() {
    const [selected, setSelected] = useState<string[]>([]);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    function toggleCategory(slug: string) {
        setSelected((prev) =>
            prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
        );
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;
        setSubmitting(true);
        const { error } = await joinGeneralWaitlist(email, selected);
        if (!error) {
            setSubmitted(true);
            setEmail("");
        }
        setSubmitting(false);
    }

    return (
        <div className="bg-vaslic-surface text-vaslic-on-surface min-h-screen selection:bg-vaslic-primary selection:text-vaslic-surface">
            <Navbar />

            {/* Sidebar (Responsive Layout) */}
            <div className="flex flex-col lg:flex-row">
                <aside className="hidden lg:flex lg:w-64 fixed left-0 top-0 h-screen bg-vaslic-surface-container flex-col py-8 z-40 border-r border-vaslic-outline/10">
                    <div className="px-8 mb-12 mt-16">
                        <div className="w-12 h-12 bg-vaslic-surface-highest mb-4 border border-vaslic-primary/20 overflow-hidden">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxrteaWXs_M5Kv79UHR1W5AFQ623j-mq2VFFYq4k8Ym7eZIKP_xF-fRzp-4awVroKPaciowpS0TztOW0pOf7cGyTifPJH6TdzndJomdib8_Ww6jkuP321WKbAJWFyYWSX690uvaSBlzM_DU_dwYTuQeIivnZLfB1w73Dkp7tJCEBN-NGu3YN-4yR3tTCvcdGSz0leDTZ-kn6WU4XkDmMdCjCne0swINECnrthAfY2FAkzICHPwANfygDaQ2vOMQMNJJmHVd7JCt_g"
                                alt="Curator"
                                className="w-full h-full object-cover grayscale opacity-50"
                            />
                        </div>
                        <h3 className="text-vaslic-on-surface font-headline font-bold text-lg uppercase tracking-tight">The Curator</h3>
                        <p className="text-[10px] text-vaslic-primary font-headline font-medium tracking-[0.2em]">NEVER REPRINT STATUS</p>
                    </div>
                    <nav className="flex-1 flex flex-col gap-1">
                        <Link href="/waitlist" className="flex items-center gap-4 px-8 py-4 bg-vaslic-surface-high text-vaslic-primary border-l-4 border-vaslic-primary font-label text-xs font-medium uppercase transition-all duration-300">
                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                            Vault Access
                        </Link>
                        <Link href="/" className="flex items-center gap-4 px-8 py-4 text-vaslic-on-surface/50 hover:bg-vaslic-surface-high hover:pl-10 font-label text-xs font-medium uppercase transition-all duration-300">
                            <span className="material-symbols-outlined text-lg">public</span>
                            Public Drop
                        </Link>
                        <Link href="/vault" className="flex items-center gap-4 px-8 py-4 text-vaslic-on-surface/50 hover:bg-vaslic-surface-high hover:pl-10 font-label text-xs font-medium uppercase transition-all duration-300">
                            <span className="material-symbols-outlined text-lg">history</span>
                            Archived Vault
                        </Link>
                    </nav>
                    <div className="px-8 mt-auto">
                        <div className="p-4 bg-vaslic-surface-high border border-vaslic-outline/10">
                            <p className="text-[9px] text-vaslic-on-surface/40 uppercase tracking-widest leading-relaxed">
                                Curators get 24h early access. Scarcity is our only rule.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 lg:pl-64 pt-[72px] min-h-screen">
                    {/* Ticker */}
                    <div className="bg-vaslic-surface-highest py-3 overflow-hidden whitespace-nowrap border-y border-vaslic-outline/5">
                        <div className="inline-block animate-marquee uppercase font-headline font-bold text-[10px] tracking-[0.4em] text-vaslic-primary">
                            ONCE IT&apos;S GONE, IT&apos;S GONE. FOREVER. — NEVER REPRINT RULE IN EFFECT — ARCHIVING PIECES DAILY — ONCE IT&apos;S GONE, IT&apos;S GONE. FOREVER. — NEVER REPRINT RULE IN EFFECT — ARCHIVING PIECES DAILY —
                        </div>
                    </div>

                    <div className="px-8 py-12 max-w-7xl mx-auto">
                        {/* Header Section with Form */}
                        <header className="mb-16 flex flex-col md:flex-row md:items-start justify-between gap-12">
                            <div className="max-w-xl">
                                <span className="text-vaslic-primary font-headline font-bold text-xs tracking-widest uppercase mb-4 block">Curation Access</span>
                                <h1 className="text-6xl md:text-8xl font-black font-headline italic tracking-tighter leading-[0.85] mb-8 uppercase">
                                    Join The<br />Vault Queue
                                </h1>

                                <form onSubmit={handleSubmit} className="relative max-w-md group">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ENCRYPTED EMAIL ADDRESS"
                                        className="w-full bg-vaslic-surface-high border-2 border-transparent focus:border-vaslic-primary/30 px-6 py-5 font-body text-sm tracking-wider outline-none transition-all duration-500"
                                        disabled={submitted || submitting}
                                    />
                                    <button
                                        type="submit"
                                        disabled={submitted || submitting || !email}
                                        className="absolute right-2 top-2 bottom-2 px-8 bg-vaslic-primary text-vaslic-surface font-headline font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-0 disabled:translate-x-4"
                                    >
                                        {submitting ? "SECURE..." : "REQUEST ACCESS"}
                                    </button>

                                    <AnimatePresence>
                                        {submitted && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-6 p-6 bg-vaslic-primary/10 border border-vaslic-primary/20 text-vaslic-primary"
                                            >
                                                <p className="font-headline font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-sm">check_circle</span>
                                                    Transmission Received
                                                </p>
                                                <p className="font-body text-xs mt-2 text-vaslic-primary/80">
                                                    You have been added to the queue based on your curation alignment.
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>

                            <div className="bg-vaslic-surface-container p-8 border-l-4 border-vaslic-primary min-w-[300px] transition-all hover:bg-vaslic-surface-high">
                                <p className="text-[10px] text-vaslic-on-surface/40 font-headline uppercase tracking-widest mb-1">Queue Seniority Status</p>
                                <p className="text-4xl font-black text-vaslic-on-surface font-headline">12,842</p>
                                <div className="h-1 bg-vaslic-surface-highest mt-6 relative overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "85%" }}
                                        transition={{ duration: 2, ease }}
                                        className="absolute inset-0 bg-vaslic-primary"
                                    />
                                </div>
                                <p className="text-[9px] text-vaslic-primary font-medium mt-4 tracking-widest uppercase">Vault capacity at 85% for next drop.</p>
                            </div>
                        </header>

                        {/* Bento Grid Styling from Wishlist Design */}
                        <div className="mb-12">
                            <h2 className="font-headline font-black text-xl uppercase tracking-widest mb-8 flex items-center gap-4">
                                Choose Your Curation Alignment
                                <span className="h-[1px] flex-1 bg-vaslic-outline/10"></span>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {categories.map((cat, i) => {
                                    const isActive = selected.includes(cat.slug);
                                    return (
                                        <div
                                            key={cat.slug}
                                            onClick={() => toggleCategory(cat.slug)}
                                            className="group relative cursor-pointer overflow-hidden transition-all duration-500"
                                            style={{
                                                background: cat.cardBg,
                                                boxShadow: isActive ? `0 0 40px ${cat.accent}22` : 'none',
                                                border: isActive ? `1px solid ${cat.accent}44` : '1px solid transparent'
                                            }}
                                        >
                                            <div className="flex flex-col h-full">
                                                <div className="aspect-[4/3] relative overflow-hidden">
                                                    <img
                                                        src={cat.image}
                                                        alt={cat.name}
                                                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${!isActive ? 'grayscale' : ''}`}
                                                    />
                                                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur px-3 py-1 border border-white/10">
                                                        <span className={`${cat.fontClass} text-lg`} style={{ color: cat.accent }}>{cat.name}</span>
                                                    </div>

                                                    {/* Selection Overlay */}
                                                    <AnimatePresence>
                                                        {isActive && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]"
                                                            >
                                                                <span className="material-symbols-outlined text-5xl" style={{ color: cat.accent }}>check_circle</span>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>

                                                <div className="p-8 flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div>
                                                                <h3 className={`${cat.fontClass} text-3xl mb-1`} style={{ color: cat.cardBg === '#ffffff' ? '#000' : '#fff' }}>
                                                                    {cat.name} Aesthetic
                                                                </h3>
                                                                <p className="text-[10px] font-headline text-vaslic-on-surface/40 tracking-[0.2em]">{cat.id}</p>
                                                            </div>
                                                        </div>
                                                        <p className="text-[11px] text-vaslic-on-surface/50 uppercase font-headline tracking-tighter mb-6">
                                                            {cat.tagline}
                                                        </p>
                                                    </div>

                                                    <button
                                                        className={`w-full py-4 font-headline font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${isActive ? 'bg-white text-black' : 'border border-vaslic-outline/20 text-vaslic-on-surface/40'
                                                            }`}
                                                        style={isActive ? { backgroundColor: cat.accent, color: '#fff' } : {}}
                                                    >
                                                        {isActive ? 'ALIGNED FOR DROP' : 'SELECT CATEGORY'}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Decorative diagonal tab from design */}
                                            <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none transition-transform group-hover:translate-x-1 group-hover:translate-y-1">
                                                <svg height="80" width="80" viewBox="0 0 100 100">
                                                    <polygon points="100,0 100,100 0,100" fill={cat.accent} />
                                                </svg>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <SiteFooter />
                </main>
            </div>
            <ThemeSwitcher />

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: inline-block;
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    );
}
