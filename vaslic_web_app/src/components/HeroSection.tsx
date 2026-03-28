"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const panels = [
    {
        slug: "gothic",
        label: "Gothic",
        // Cathedral-style dark B&W image via Unsplash
        image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
        accent: "#8b0000",
    },
    {
        slug: "bohemian",
        label: "Bohemian",
        image:
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80&auto=format&fit=crop",
        accent: "#c77b4a",
    },
    {
        slug: "avant-garde",
        label: "Avant-Garde",
        image:
            "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80&auto=format&fit=crop",
        accent: "#008DB9",
        active: true,
    },
    {
        slug: "street",
        label: "Street",
        image:
            "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&q=80&auto=format&fit=crop",
        accent: "#f5e642",
    },
    {
        slug: "funky",
        label: "Funky",
        image:
            "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80&auto=format&fit=crop",
        accent: "#00f5d4",
    },
];

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, { once: true });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative w-full h-screen overflow-hidden bg-black"
            aria-label="Hero — Something For Everyone"
        >
            {/* ── 5 Vertical Panel Strips (parallax) ── */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 flex"
                aria-hidden="true"
            >
                {panels.map((panel, i) => (
                    <div key={panel.slug} className="relative flex-1 overflow-hidden">
                        {/* Image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={panel.image}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover grayscale"
                            loading="eager"
                        />
                        {/* Dark overlay — centre panel lighter */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: panel.active
                                    ? "rgba(0,0,0,0.35)"
                                    : "rgba(0,0,0,0.72)",
                            }}
                        />
                        {/* Thin vertical separator */}
                        {i > 0 && (
                            <div className="absolute top-0 left-0 w-px h-full bg-white/10" />
                        )}
                    </div>
                ))}
            </motion.div>

            {/* ── Overlay heading ── */}
            <div
                ref={headingRef}
                className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8 text-center"
            >
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={headingInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease, delay: 0.1 }}
                    className="font-label text-xs tracking-[0.4em] uppercase text-white/50 mb-6"
                >
                    Limited · One-Time · Retired Forever
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={headingInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease, delay: 0.2 }}
                    className="font-display text-[14vw] sm:text-[12vw] lg:text-[11vw] leading-[0.88] tracking-tight uppercase text-white"
                >
                    Something
                    <br />
                    <span className="text-vaslic-primary">For Everyone</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={headingInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease, delay: 0.4 }}
                    className="font-body text-base text-white/60 mt-8 max-w-md leading-relaxed"
                >
                    Five aesthetic universes. Every drop is a permanent archive.
                    Once it&rsquo;s gone, it&rsquo;s gone. Forever.
                </motion.p>

                {/* CTA row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={headingInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease, delay: 0.55 }}
                    className="flex flex-col sm:flex-row gap-4 mt-10"
                >
                    <Link
                        href="/vault"
                        className="px-8 py-4 font-label text-xs uppercase tracking-widest bg-vaslic-primary text-vaslic-surface hover:opacity-90 transition-opacity"
                    >
                        Explore Vault
                    </Link>
                    <Link
                        href="/waitlist"
                        className="px-8 py-4 font-label text-xs uppercase tracking-widest border border-white/30 text-white hover:border-white/60 transition-colors"
                    >
                        Join Syllabus
                    </Link>
                </motion.div>
            </div>

            {/* ── Bottom category tab strip ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.8 }}
                className="absolute bottom-0 inset-x-0 z-20 flex"
                role="navigation"
                aria-label="Browse by aesthetic"
            >
                {panels.map((panel) => (
                    <Link
                        key={panel.slug}
                        href={`/${panel.slug}`}
                        className="group flex-1 flex items-center justify-center py-5 font-label text-xs tracking-widest uppercase transition-all duration-300"
                        style={{
                            background: panel.active
                                ? `color-mix(in srgb, ${panel.accent} 25%, rgba(0,0,0,0.85))`
                                : "rgba(0,0,0,0.75)",
                            color: panel.active ? panel.accent : "rgba(255,255,255,0.45)",
                            borderTop: panel.active
                                ? `2px solid ${panel.accent}`
                                : "2px solid transparent",
                        }}
                        aria-label={`Browse ${panel.label} collection`}
                    >
                        {/* On hover hint */}
                        <span className="group-hover:text-white transition-colors duration-300">
                            {panel.label}
                        </span>
                    </Link>
                ))}
            </motion.div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="absolute bottom-20 right-8 flex flex-col items-center gap-2 z-20"
                aria-hidden="true"
            >
                <span className="font-label text-[9px] tracking-[0.3em] uppercase text-white/30 rotate-90 origin-center mb-4">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="w-px h-10 bg-gradient-to-b from-vaslic-primary to-transparent"
                />
            </motion.div>
        </section>
    );
}
