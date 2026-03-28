"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/categoryData";

interface ProductCardProps {
    product: Product;
    accentColor: string;
    index: number;
}

export function ProductCard({ product, accentColor, index }: ProductCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const unitsLeft = product.unitsLeft ?? product.units;
    const pct = Math.round((unitsLeft / product.units) * 100);
    const isCritical = pct <= 30;

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] as const }}
            className="group relative overflow-hidden bg-vaslic-surface-container transition-colors duration-500 flex flex-col"
            aria-label={product.name}
        >
            {/* Image placeholder */}
            <div
                className="w-full h-72 relative overflow-hidden flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${accentColor} 8%, var(--surface-high)), var(--surface-container))` }}
            >
                {/* Triangle watermark */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-500"
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: "120px solid transparent",
                        borderRight: "120px solid transparent",
                        borderBottom: `120px solid ${accentColor}`,
                    }}
                />

                {/* Drop number */}
                <span
                    aria-hidden="true"
                    className="absolute top-4 right-4 font-display text-[4.5rem] leading-none opacity-[0.06] select-none"
                >
                    {product.dropNumber}
                </span>

                {/* Sold-out overlay */}
                {product.soldOut && (
                    <div className="absolute inset-0 bg-vaslic-surface-lowest/80 flex items-center justify-center">
                        <span
                            className="font-label text-xs tracking-[0.3em] uppercase"
                            style={{ color: accentColor }}
                        >
                            Sold Out — Retired Forever
                        </span>
                    </div>
                )}
            </div>

            {/* Card body */}
            <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                    <p
                        className="font-label text-xs tracking-[0.25em] uppercase mb-2"
                        style={{ color: accentColor }}
                    >
                        Drop #{product.dropNumber}
                    </p>
                    <h3 className="font-headline text-2xl uppercase leading-tight text-vaslic-on-surface transition-colors duration-500">
                        {product.name}
                    </h3>
                    <p className="font-body text-sm text-vaslic-on-surface/60 mt-2 leading-relaxed transition-colors duration-500">
                        {product.tagline}
                    </p>
                </div>

                {/* Stock bar */}
                {!product.soldOut && (
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <span className={cn("font-label text-xs uppercase tracking-widest", isCritical ? "text-vaslic-secondary" : "text-vaslic-on-surface/40")}>
                                {isCritical ? `Only ${unitsLeft} left` : `${unitsLeft} of ${product.units} remaining`}
                            </span>
                        </div>
                        <div className="w-full h-px bg-vaslic-surface-highest">
                            <div
                                className="h-px transition-all duration-700"
                                style={{ width: `${pct}%`, background: accentColor }}
                            />
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-vaslic-outline/10">
                    <span className="font-display text-2xl" style={{ color: accentColor }}>
                        ${product.price.toLocaleString()}
                    </span>
                    {!product.soldOut ? (
                        <motion.button
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="font-label text-xs uppercase tracking-widest px-6 py-3 transition-colors duration-500"
                            style={{ background: accentColor, color: "var(--surface)" }}
                            aria-label={`Join waitlist for ${product.name}`}
                        >
                            Join Waitlist
                        </motion.button>
                    ) : (
                        <span className="font-label text-xs uppercase tracking-widest text-vaslic-on-surface/30">
                            Archived
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
