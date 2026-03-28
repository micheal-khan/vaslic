"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ProductCard } from "@/components/ProductCard";
import { KineticButton } from "@/components/ui/KineticButton";
import type { CategoryData, RetiredDrop } from "@/lib/categoryData";
import { useEffect } from "react";

function RetiredCard({ drop, accent, index }: { drop: RetiredDrop; accent: string; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative overflow-hidden bg-vaslic-surface-container p-6 flex flex-col gap-3 transition-colors duration-500"
        >
            <div
                className="absolute top-0 left-0 h-px w-full"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                aria-hidden="true"
            />
            <p className="font-label text-[10px] tracking-[0.3em] uppercase text-vaslic-on-surface/30">
                {drop.diedDate ?? drop.year} · RETIRED
            </p>
            <h4 className="font-headline text-lg uppercase leading-tight text-vaslic-on-surface/70 transition-colors duration-500">
                {drop.name}
            </h4>
            <p className="font-body text-xs italic text-vaslic-on-surface/40 leading-relaxed transition-colors duration-500">
                {drop.note}
            </p>
            <div className="mt-auto pt-3 border-t border-vaslic-outline/10">
                <span className="font-label text-[10px] tracking-widest uppercase" style={{ color: accent }}>
                    {drop.id.toUpperCase()}
                </span>
            </div>
        </motion.div>
    );
}

interface CategoryPageLayoutProps {
    data: CategoryData;
}

export function CategoryPageLayout({ data }: CategoryPageLayoutProps) {
    // Switch theme to match category
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", data.theme);
        return () => {
            document.documentElement.setAttribute("data-theme", "avant-garde");
        };
    }, [data.theme]);

    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef, { once: true });

    const otherCategories = ["gothic", "bohemian", "avant-garde", "street", "funky"].filter(
        (s) => s !== data.slug
    );

    return (
        <>
            <Navbar />
            <main id="main-content">
                {/* ── HERO ── */}
                <section
                    id="hero"
                    className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden pt-[72px] px-8 md:px-16 pb-20"
                >
                    {/* Background gradient */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `linear-gradient(135deg, color-mix(in srgb, ${data.accentColor} 10%, var(--surface)), var(--surface))`,
                        }}
                        aria-hidden="true"
                    />
                    {/* Giant watermark */}
                    <span
                        className="absolute right-0 bottom-0 font-display text-[20vw] leading-none opacity-[0.04] select-none pointer-events-none"
                        aria-hidden="true"
                    >
                        {data.slug === "avant-garde" ? "AG" : data.name.slice(0, 2)}
                    </span>

                    <motion.div
                        ref={heroRef}
                        initial={{ opacity: 0, y: 40 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                        className="relative z-10 max-w-7xl mx-auto w-full"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-vaslic-on-surface/40 hover:text-vaslic-on-surface transition-colors duration-300 mb-8"
                        >
                            <ArrowLeft className="w-3 h-3" aria-hidden="true" /> Back to all aesthetics
                        </Link>

                        <p
                            className="font-label text-xs tracking-[0.35em] uppercase mb-4"
                            style={{ color: data.accentColor }}
                        >
                            VASLIC / {data.name}
                        </p>
                        <h1 className="font-display text-[3.5rem] sm:text-[5.5rem] lg:text-[8rem] leading-[0.88] tracking-tight uppercase">
                            {data.headline}
                        </h1>
                        {data.quote && (
                            <blockquote className="mt-8 max-w-xl font-body text-lg italic text-vaslic-on-surface/70 leading-relaxed transition-colors duration-500">
                                &ldquo;{data.quote}&rdquo;
                            </blockquote>
                        )}

                        {/* Category nav strip */}
                        <div className="flex flex-wrap gap-3 mt-10">
                            {otherCategories.map((s) => (
                                <Link
                                    key={s}
                                    href={`/${s}`}
                                    className="font-label text-xs tracking-widest uppercase px-4 py-2 border border-vaslic-outline/20 text-vaslic-on-surface/40 hover:text-vaslic-on-surface hover:border-vaslic-outline/40 transition-all duration-300"
                                >
                                    {s}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* ── ACTIVE DROPS ── */}
                <section id="drops" className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                        <div>
                            <p
                                className="font-label text-xs tracking-[0.3em] uppercase mb-3"
                                style={{ color: data.accentColor }}
                            >
                                Active Drops
                            </p>
                            <h2 className="font-headline text-4xl uppercase leading-none">
                                Current Releases
                            </h2>
                        </div>
                        <p className="font-body text-xs text-vaslic-on-surface/50 max-w-xs leading-relaxed transition-colors duration-500">
                            Once these sell out, they join the archive. No reprints. No exceptions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                        {data.products.map((product, i) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                accentColor={data.accentColor}
                                index={i}
                            />
                        ))}
                    </div>
                </section>

                {/* ── MANIFESTO BAND ── */}
                <section className="py-16 bg-vaslic-surface-lowest transition-colors duration-500 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-8 md:px-16">
                        <p className="font-display text-5xl md:text-7xl uppercase leading-tight opacity-90">
                            {data.subheadline}
                        </p>
                    </div>
                </section>

                {/* ── RETIRED ARCHIVE ── */}
                <section id="archive" className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                        <div>
                            <p
                                className="font-label text-xs tracking-[0.3em] uppercase mb-3"
                                style={{ color: data.accentColor }}
                            >
                                Archive
                            </p>
                            <h2 className="font-headline text-4xl uppercase leading-none">
                                {data.retiredSectionTitle}
                            </h2>
                            <p className="font-body text-sm italic text-vaslic-on-surface/50 mt-3 max-w-md leading-relaxed transition-colors duration-500">
                                {data.retiredSectionTagline}
                            </p>
                        </div>
                        <KineticButton variant="secondary" className="flex items-center gap-3 self-end md:self-auto">
                            Full Vault Archive <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </KineticButton>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {data.retired.map((drop, i) => (
                            <RetiredCard key={drop.id} drop={drop} accent={data.accentColor} index={i} />
                        ))}
                    </div>
                </section>
            </main>
            <SiteFooter />
            <ThemeSwitcher />
        </>
    );
}
