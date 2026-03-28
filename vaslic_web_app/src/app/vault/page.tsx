"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { KineticButton } from "@/components/ui/KineticButton";

const ease = [0.22, 1, 0.36, 1] as const;

const vaultSections = [
    {
        aesthetic: "Gothic",
        slug: "gothic",
        accentColor: "#8b0000",
        sectionTitle: "The Cemetery",
        items: [
            { id: "VLK-GOTH-001", name: "Obsidian Drift Coat", died: "12.OCT.23", goneIn: "4 days", units: 12 },
            { id: "VLK-GOTH-004", name: "Void Veil", died: "31.OCT.23", goneIn: "2 hours", units: 6 },
            { id: "VLK-GOTH-006", name: "Phantom Corset", died: "14.FEB.24", goneIn: "midnight", units: 8 },
            { id: "VLK-GOTH-007", name: "Gravedigger Gloves", died: "01.MAR.24", goneIn: "90 minutes", units: 15 },
        ],
    },
    {
        aesthetic: "Bohemian",
        slug: "bohemian",
        accentColor: "#c77b4a",
        sectionTitle: "The Pressed Journal",
        items: [
            { id: "VLK-BOHO-001", name: "Sun-Drenched Reverie", died: "2023", goneIn: "3 days", units: 20 },
            { id: "VLK-BOHO-007", name: "Wanderer's Path Coat", died: "2023", goneIn: "1 week", units: 15 },
            { id: "VLK-BOHO-009", name: "Harvest Moon Dress", died: "2024", goneIn: "at dawn", units: 10 },
            { id: "VLK-BOHO-011", name: "Desert Rain Shawl", died: "2024", goneIn: "during equinox", units: 18 },
        ],
    },
    {
        aesthetic: "Avant-Garde",
        slug: "avant-garde",
        accentColor: "#008DB9",
        sectionTitle: "Decommissioned Gallery",
        items: [
            { id: "VLK-AVNT-01", name: "The Glass Shroud", died: "2022", goneIn: "48 hours", units: 3 },
            { id: "VLK-AVNT-02", name: "Industrial Spine", died: "2023", goneIn: "auction", units: 5 },
            { id: "VLK-AVNT-10", name: "Unseen Echo", died: "2023", goneIn: "private sale", units: 4 },
            { id: "VLK-AVNT-12", name: "Void Membrane Coat", died: "2024", goneIn: "3 collectors", units: 3 },
        ],
    },
    {
        aesthetic: "Street",
        slug: "street",
        accentColor: "#f5e642",
        sectionTitle: "The Buffed Wall",
        items: [
            { id: "VLK-STR-099", name: "Buffed Wall Jacket", died: "2023", goneIn: "18 days", units: 100 },
            { id: "VLK-STR-088", name: "Concrete Stitch Pant", died: "2023", goneIn: "6 hours", units: 60 },
            { id: "VLK-STR-075", name: "Ghost Tag Hoodie", died: "2022", goneIn: "all buffed", units: 80 },
            { id: "VLK-STR-062", name: "Brutalist Windbreaker", died: "2022", goneIn: "no reprints", units: 50 },
        ],
    },
    {
        aesthetic: "Funky",
        slug: "funky",
        accentColor: "#00f5d4",
        sectionTitle: "The Setlist",
        items: [
            { id: "VLK-FNK-VIBE-01", name: "Void Walker Boots", died: "Sept 2023", goneIn: "12 hours", units: 25 },
            { id: "VLK-FNK-CHRD-09", name: "Laser-Cut Kimono v2", died: "Nov 2023", goneIn: "3 minutes", units: 10 },
            { id: "VLK-FNK-001", name: "Cyber-Punk Headset Alpha", died: "Jan 2024", goneIn: "no reprints", units: 15 },
            { id: "VLK-FNK-002", name: "Oblivion Glasses", died: "Feb 2024", goneIn: "out of existence", units: 8 },
        ],
    },
];

function VaultSection({ section, index }: { section: (typeof vaultSections)[number]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.05, ease }}
            className="space-y-6"
        >
            {/* Section header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-label text-xs tracking-[0.3em] uppercase mb-1" style={{ color: section.accentColor }}>
                        {section.aesthetic}
                    </p>
                    <h3 className="font-headline text-2xl uppercase">{section.sectionTitle}</h3>
                </div>
                <Link
                    href={`/${section.slug}`}
                    className="font-label text-xs tracking-widest uppercase text-vaslic-on-surface/40 hover:text-vaslic-on-surface transition-colors duration-300 flex items-center gap-1"
                >
                    View Active <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
            </div>

            {/* Items */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {section.items.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.45, delay: index * 0.05 + i * 0.07, ease }}
                        className="relative overflow-hidden bg-vaslic-surface-container p-5 transition-colors duration-500"
                    >
                        <div
                            className="absolute top-0 left-0 h-px w-full"
                            style={{ background: `linear-gradient(90deg, ${section.accentColor}, transparent)` }}
                            aria-hidden="true"
                        />
                        <p className="font-label text-[9px] tracking-widest uppercase text-vaslic-on-surface/30 mb-2">
                            {item.id}
                        </p>
                        <h4 className="font-headline text-sm uppercase leading-tight text-vaslic-on-surface/70 transition-colors duration-500">
                            {item.name}
                        </h4>
                        <div className="mt-3 space-y-1">
                            <p className="font-body text-xs text-vaslic-on-surface/40 transition-colors duration-500">
                                Only {item.units} ever made
                            </p>
                            <p className="font-body text-xs italic text-vaslic-on-surface/30 transition-colors duration-500">
                                Gone in {item.goneIn}
                            </p>
                            <p
                                className="font-label text-[9px] tracking-widest uppercase"
                                style={{ color: section.accentColor }}
                            >
                                DIED: {item.died}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default function VaultPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef, { once: true });
    const registryRef = useRef<HTMLDivElement>(null);
    const registryInView = useInView(registryRef, { once: true, margin: "-80px" });

    return (
        <>
            <Navbar />
            <main id="main-content">
                {/* HERO */}
                <section className="relative min-h-[55vh] flex flex-col justify-end pt-[72px] px-8 md:px-16 pb-20 overflow-hidden bg-vaslic-surface-lowest transition-colors duration-500">
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse at 60% 50%, color-mix(in srgb, var(--primary) 6%, transparent), transparent 70%)" }}
                        aria-hidden="true"
                    />
                    <span
                        className="absolute right-0 bottom-0 font-display text-[20vw] leading-none opacity-[0.03] select-none pointer-events-none"
                        aria-hidden="true"
                    >
                        VAULT
                    </span>
                    <motion.div
                        ref={heroRef}
                        initial={{ opacity: 0, y: 40 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease }}
                        className="relative z-10 max-w-7xl mx-auto w-full"
                    >
                        <p className="font-label text-xs tracking-[0.35em] uppercase text-vaslic-primary mb-4">
                            VASLIC / The Vault Archive
                        </p>
                        <h1 className="font-display text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] leading-[0.88] tracking-tight uppercase">
                            The Vault
                        </h1>
                        <blockquote className="mt-6 max-w-xl font-body text-lg italic text-vaslic-on-surface/70 leading-relaxed transition-colors duration-500">
                            &ldquo;Once it&rsquo;s gone, it&rsquo;s gone. Forever. No reprints. No restocks. No exceptions.&rdquo;
                        </blockquote>
                        <p className="mt-4 font-label text-xs tracking-widest uppercase text-vaslic-on-surface/40">
                            {vaultSections.reduce((acc, s) => acc + s.items.length, 0)} designs permanently retired
                        </p>
                    </motion.div>
                </section>

                {/* VAULT SECTIONS */}
                <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto space-y-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                        <div>
                            <p className="font-label text-xs tracking-[0.3em] uppercase text-vaslic-primary mb-3">Manifesto 01</p>
                            <h2 className="font-headline text-4xl uppercase leading-none">Complete Archive</h2>
                        </div>
                        <p className="font-body text-xs text-vaslic-on-surface/50 max-w-xs leading-relaxed transition-colors duration-500">
                            Every unit in this archive is buffed from active inventory upon final sale.
                        </p>
                    </div>

                    {vaultSections.map((section, i) => (
                        <VaultSection key={section.slug} section={section} index={i} />
                    ))}
                </section>

                {/* OWNERSHIP REGISTRY CTA */}
                <motion.section
                    ref={registryRef}
                    initial={{ opacity: 0, y: 32 }}
                    animate={registryInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease }}
                    className="py-24 px-8 md:px-16 bg-vaslic-surface-lowest transition-colors duration-500"
                >
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                        <div className="space-y-4 max-w-xl">
                            <p className="font-label text-xs tracking-[0.3em] uppercase text-vaslic-primary">
                                Ownership Registry
                            </p>
                            <h2 className="font-headline text-4xl uppercase leading-tight">
                                Claim Your Piece of History
                            </h2>
                            <p className="font-body text-sm text-vaslic-on-surface/60 leading-relaxed transition-colors duration-500">
                                Register your retired unit to the global VASLIC ownership registry and secure your legacy.
                                Each registration is cryptographically signed and permanently recorded.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <KineticButton variant="primary" className="flex items-center gap-3">
                                Register Ownership <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </KineticButton>
                            <KineticButton variant="secondary">
                                Verify Certificate
                            </KineticButton>
                        </div>
                    </div>
                </motion.section>
            </main>
            <SiteFooter />
            <ThemeSwitcher />
        </>
    );
}
