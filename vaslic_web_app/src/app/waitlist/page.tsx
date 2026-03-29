"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { joinGeneralWaitlist } from "@/app/actions";

const ease = [0.22, 1, 0.36, 1] as const;

const aesthetics = [
    { name: "Gothic", slug: "gothic", accent: "#8b0000" },
    { name: "Bohemian", slug: "bohemian", accent: "#c77b4a" },
    { name: "Avant-Garde", slug: "avant-garde", accent: "#008DB9" },
    { name: "Street", slug: "street", accent: "#f5e642" },
    { name: "Funky", slug: "funky", accent: "#00f5d4" },
];

const socialProof = [
    { number: "12,842", label: "Kinetic Curators Joined" },
    { number: "24h", label: "Early Access Window" },
    { number: "100%", label: "Drops Sell Out" },
];

export default function WaitlistPage() {
    const [selected, setSelected] = useState<string[]>([]);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef, { once: true });
    const formRef = useRef<HTMLDivElement>(null);
    const formInView = useInView(formRef, { once: true, margin: "-60px" });

    function toggleAesthetic(slug: string) {
        setSelected((prev) =>
            prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
        );
    }
    const [submitting, setSubmitting] = useState(false);

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
        <>
            <Navbar />
            <main id="main-content">
                {/* HERO */}
                <section className="relative min-h-screen flex items-center pt-[72px] px-8 md:px-16 overflow-hidden">
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse at 30% 50%, color-mix(in srgb, var(--primary) 8%, transparent), transparent 60%)",
                        }}
                        aria-hidden="true"
                    />
                    <span
                        className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[25vw] leading-none opacity-[0.03] select-none pointer-events-none"
                        aria-hidden="true"
                    >
                        WAIT
                    </span>

                    <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
                        {/* Left */}
                        <motion.div
                            ref={heroRef}
                            initial={{ opacity: 0, y: 40 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, ease }}
                            className="space-y-8"
                        >
                            <p className="font-label text-xs tracking-[0.35em] uppercase text-vaslic-primary">
                                VASLIC / Waitlist
                            </p>
                            <h1 className="font-display text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] leading-[0.88] tracking-tight uppercase">
                                Be First.<br />
                                <span className="text-vaslic-primary">Or Miss It</span><br />
                                Forever.
                            </h1>
                            <p className="font-body text-lg text-vaslic-on-surface/70 max-w-md leading-relaxed transition-colors duration-500">
                                Waitlist members get{" "}
                                <strong className="text-vaslic-on-surface font-body">24-hour exclusive access</strong>{" "}
                                before public release. Once it&rsquo;s gone, it never comes back.
                            </p>

                            {/* Social proof stats */}
                            <div className="flex gap-10 pt-4 border-t border-vaslic-outline/20">
                                {socialProof.map((stat) => (
                                    <div key={stat.label}>
                                        <p className="font-display text-2xl text-vaslic-primary">{stat.number}</p>
                                        <p className="font-label text-xs uppercase tracking-widest text-vaslic-on-surface/50 mt-1 transition-colors duration-500">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Forever callout */}
                            <div className="inline-block bg-vaslic-surface-container px-6 py-4 transition-colors duration-500">
                                <p className="font-label text-xs tracking-[0.3em] uppercase text-vaslic-on-surface/40">
                                    Remember
                                </p>
                                <p className="font-headline text-xl uppercase mt-1 text-vaslic-primary">
                                    FOREVER
                                </p>
                                <p className="font-body text-sm text-vaslic-on-surface/60 mt-1 transition-colors duration-500">
                                    Once it&rsquo;s gone, it&rsquo;s gone. Forever.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right: Form */}
                        <motion.div
                            ref={formRef}
                            initial={{ opacity: 0, x: 40 }}
                            animate={formInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2, ease }}
                        >
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-vaslic-surface-container p-12 text-center space-y-6 transition-colors duration-500"
                                >
                                    <div
                                        className="w-16 h-16 mx-auto flex items-center justify-center"
                                        style={{ background: "var(--primary)" }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <polyline points="20 6 9 17 4 12" stroke="var(--surface)" strokeWidth="2.5" strokeLinecap="square" />
                                        </svg>
                                    </div>
                                    <h2 className="font-headline text-3xl uppercase">You&rsquo;re In</h2>
                                    <p className="font-body text-sm text-vaslic-on-surface/60 leading-relaxed transition-colors duration-500">
                                        You&rsquo;ve been added to the vault queue. Check your email for confirmation.
                                        The vault is currently sealed — access is granted by seniority and alignment.
                                    </p>
                                    <p className="font-label text-xs tracking-widest uppercase text-vaslic-primary">
                                        Transmission Complete ···
                                    </p>
                                </motion.div>
                            ) : (
                                <div className="bg-vaslic-surface-container p-10 space-y-8 transition-colors duration-500">
                                    <div>
                                        <h2 className="font-headline text-2xl uppercase">Choose Your Curations</h2>
                                        <p className="font-body text-sm text-vaslic-on-surface/50 mt-2 transition-colors duration-500">
                                            Select which aesthetics you want early access to
                                        </p>
                                    </div>

                                    {/* Aesthetic checkboxes */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="group" aria-label="Choose aesthetics">
                                        {aesthetics.map((a) => {
                                            const active = selected.includes(a.slug);
                                            return (
                                                <motion.button
                                                    key={a.slug}
                                                    onClick={() => toggleAesthetic(a.slug)}
                                                    whileHover={{ x: 2 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                    className="px-4 py-3 font-label text-xs uppercase tracking-widest text-left transition-all duration-300"
                                                    style={{
                                                        background: active
                                                            ? `color-mix(in srgb, ${a.accent} 15%, var(--surface-highest))`
                                                            : "var(--surface-high)",
                                                        color: active ? a.accent : "var(--on-surface)",
                                                        borderLeft: active ? `2px solid ${a.accent}` : "2px solid transparent",
                                                    }}
                                                    aria-pressed={active}
                                                >
                                                    {a.name}
                                                </motion.button>
                                            );
                                        })}
                                    </div>

                                    {/* Email form */}
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="waitlist-email" className="font-label text-xs uppercase tracking-widest text-vaslic-on-surface/50 block mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                id="waitlist-email"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                className="w-full bg-vaslic-surface-highest border-b-2 border-vaslic-outline/30 focus:border-vaslic-primary px-4 py-4 font-body text-sm text-vaslic-on-surface placeholder:text-vaslic-on-surface/30 outline-none transition-colors duration-300"
                                                aria-required="true"
                                            />
                                        </div>
                                        <motion.button
                                            type="submit"
                                            disabled={submitting}
                                            whileHover={{ x: 4 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                            className="w-full py-4 font-label text-sm uppercase tracking-widest bg-gradient-to-br from-vaslic-primary to-vaslic-primary-container text-vaslic-surface transition-colors duration-500 disabled:opacity-50"
                                        >
                                            {submitting ? "Establishing Link..." : "Join the Waitlist"}
                                        </motion.button>
                                        <p className="font-label text-xs uppercase tracking-widest text-vaslic-on-surface/30 text-center">
                                            The vault is currently sealed. Access granted by seniority.
                                        </p>
                                    </form>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* Instagram CTA */}
                <section className="py-16 px-8 md:px-16 bg-vaslic-surface-lowest transition-colors duration-500">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <p className="font-label text-xs tracking-[0.3em] uppercase text-vaslic-primary mb-2">
                                Stay Connected
                            </p>
                            <p className="font-headline text-2xl uppercase">Instagram / @thevaslic</p>
                        </div>
                        <motion.a
                            href="https://instagram.com/thevaslic"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="font-label text-xs uppercase tracking-widest px-8 py-4 bg-vaslic-surface-container text-vaslic-on-surface hover:text-vaslic-primary transition-colors duration-300"
                            aria-label="Follow VASLIC on Instagram"
                        >
                            Follow @thevaslic →
                        </motion.a>
                    </div>
                </section>
            </main>
            <SiteFooter />
            <ThemeSwitcher />
        </>
    );
}
