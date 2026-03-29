"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart, CartItem } from "@/contexts/CartContext";

const ease = [0.22, 1, 0.36, 1] as const;

const aestheticStyles: Record<string, {
    bg: string; borderColor: string; textColor: string; font: string;
    accentHex: string; idColor: string; priceColor: string;
}> = {
    gothic: {
        bg: "#0a0a0a", borderColor: "#8b0000", textColor: "#8b0000",
        font: "font-gothic", accentHex: "#8b0000", idColor: "#666",
        priceColor: "#fff"
    },
    bohemian: {
        bg: "#f5ebe0", borderColor: "#c77b4a", textColor: "#c77b4a",
        font: "font-bohemian", accentHex: "#c77b4a", idColor: "#999",
        priceColor: "#4a4a4a"
    },
    "avant-garde": {
        bg: "#ffffff", borderColor: "#008DB9", textColor: "#000",
        font: "font-avant", accentHex: "#008DB9", idColor: "#bbb",
        priceColor: "#008DB9"
    },
    street: {
        bg: "#2a2a2a", borderColor: "#f5e642", textColor: "#fff",
        font: "font-avant", accentHex: "#f5e642", idColor: "#666",
        priceColor: "#fff"
    },
    funky: {
        bg: "#0d0d2b", borderColor: "#00f5d4", textColor: "#00f5d4",
        font: "font-funky", accentHex: "#00f5d4", idColor: "#ff00c1",
        priceColor: "#fff"
    }
};

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
    const { items, removeFromCart, updateQuantity } = useCart();

    const subtotal = items.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return acc + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);
    const shipping = items.length > 0 ? 145 : 0;
    const total = subtotal + shipping;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ duration: 0.5, ease }}
                        className="fixed inset-4 md:inset-8 lg:inset-x-[10%] lg:inset-y-[5%] z-[9999] flex flex-col overflow-hidden"
                        style={{
                            background: "#0e0e0e",
                            boxShadow: "0 0 120px rgba(0,0,0,0.9), 0 0 40px rgba(114,210,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.06)"
                        }}
                    >
                        {/* ─── Header ─── */}
                        <div
                            className="flex items-center justify-between px-6 md:px-10 py-6 md:py-8 shrink-0"
                            style={{
                                background: "linear-gradient(180deg, rgba(20,20,20,1) 0%, rgba(14,14,14,1) 100%)",
                                borderBottom: "1px solid rgba(255,255,255,0.06)"
                            }}
                        >
                            <div className="flex items-baseline gap-3 md:gap-5">
                                <span className="text-[9px] md:text-[10px] font-label uppercase tracking-[0.4em] text-neutral-600 hidden sm:inline">
                                    Vaslic Framework
                                </span>
                                <h1 className="text-2xl md:text-4xl font-black font-headline tracking-tighter italic text-white uppercase">
                                    YOUR CURATIONS
                                </h1>
                            </div>
                            <div className="flex items-center gap-4 md:gap-6">
                                <span className="text-[9px] md:text-[10px] font-label uppercase tracking-widest text-[#72d2ff] hidden sm:block">
                                    Vault Active
                                </span>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white hover:rotate-90 transition-all duration-500 bg-transparent border border-neutral-800 hover:border-neutral-600"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* ─── Product List / Empty State ─── */}
                        <div
                            className="flex-1 overflow-y-auto"
                            style={{
                                background: "#111111",
                                scrollbarWidth: "thin",
                                scrollbarColor: "#72d2ff rgba(255,255,255,0.05)"
                            }}
                        >
                            {items.length === 0 ? (
                                /* ─── EMPTY STATE ─── */
                                <div className="h-full flex flex-col items-center justify-center text-center px-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.6, ease }}
                                        className="flex flex-col items-center"
                                    >
                                        {/* Animated Icon */}
                                        <motion.div
                                            animate={{ y: [0, -8, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mb-8 relative"
                                        >
                                            <div
                                                className="absolute inset-0 rounded-full opacity-20"
                                                style={{ background: "radial-gradient(circle, #72d2ff 0%, transparent 70%)" }}
                                            />
                                            <ShoppingBag size={48} className="text-neutral-600" strokeWidth={1} />
                                        </motion.div>

                                        <h2 className="font-headline font-black text-xl md:text-2xl uppercase tracking-[0.15em] text-white mb-3">
                                            Vault Empty
                                        </h2>
                                        <p className="font-body text-xs md:text-sm text-neutral-500 max-w-xs leading-relaxed mb-8">
                                            No artifacts have been selected for curation yet. Browse the collections to begin your archive.
                                        </p>

                                        {/* Decorative line */}
                                        <div className="flex items-center gap-4 w-full max-w-xs">
                                            <div className="flex-1 h-px bg-neutral-800" />
                                            <span className="text-[8px] font-label uppercase tracking-[0.3em] text-neutral-700">
                                                Never Reprint
                                            </span>
                                            <div className="flex-1 h-px bg-neutral-800" />
                                        </div>
                                    </motion.div>
                                </div>
                            ) : (
                                /* ─── ITEMS LIST ─── */
                                <div className="p-1 space-y-[2px]">
                                    {items.map((item) => {
                                        const style = aestheticStyles[item.category_slug] || aestheticStyles["avant-garde"];
                                        const unitPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
                                        const lineTotal = isNaN(unitPrice) ? 0 : unitPrice * item.quantity;

                                        return (
                                            <div
                                                key={item.id}
                                                className="group relative overflow-hidden flex items-center"
                                                style={{
                                                    background: style.bg,
                                                    borderLeft: `10px solid ${style.borderColor}`
                                                }}
                                            >
                                                {/* Decorative Elements */}
                                                {item.category_slug === 'gothic' && (
                                                    <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
                                                        <svg fill={style.accentHex} height="120" viewBox="0 0 100 100" width="120">
                                                            <path d="M0 100 L100 100 L100 0 Z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                {item.category_slug === 'funky' && (
                                                    <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                                                        style={{ background: "radial-gradient(circle, rgba(0,245,212,0.12), rgba(255,0,193,0.08))" }}
                                                    />
                                                )}

                                                {/* Image */}
                                                <div className="w-20 h-20 md:w-28 md:h-28 shrink-0 p-2 md:p-3">
                                                    <div className="w-full h-full overflow-hidden bg-black/20">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0 px-4 md:px-6 py-4">
                                                    <h3
                                                        className={`${style.font} text-lg md:text-2xl leading-none mb-1 truncate`}
                                                        style={{ color: style.textColor }}
                                                    >
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-[9px] font-label uppercase tracking-widest" style={{ color: style.idColor }}>
                                                        {item.vault_id}
                                                        {item.size && <span className="ml-3 pl-3 border-l" style={{ borderColor: style.idColor }}>Size {item.size}</span>}
                                                    </p>
                                                </div>

                                                {/* Quantity */}
                                                <div className="flex items-center gap-2 px-2 md:px-4 shrink-0">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 flex items-center justify-center transition-colors"
                                                        style={{ border: `1px solid ${style.borderColor}40`, color: style.borderColor }}
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="font-label text-sm w-6 text-center" style={{ color: style.priceColor }}>
                                                        {item.quantity.toString().padStart(2, "0")}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 flex items-center justify-center transition-colors"
                                                        style={{ border: `1px solid ${style.borderColor}40`, color: style.borderColor }}
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="shrink-0 px-4 md:px-8 text-right font-headline font-bold text-lg md:text-xl" style={{ color: style.priceColor }}>
                                                    ${lineTotal.toLocaleString()}
                                                </div>

                                                {/* Remove */}
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="shrink-0 px-3 md:px-4 text-neutral-600 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* ─── Footer / Summary ─── */}
                        <div
                            className="shrink-0 px-6 md:px-10 py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 items-end gap-6"
                            style={{
                                background: "linear-gradient(180deg, #0c0c0c 0%, #080808 100%)",
                                borderTop: "1px solid rgba(255,255,255,0.06)"
                            }}
                        >
                            {/* Quote */}
                            <div className="md:col-span-4 hidden lg:block">
                                <p className="text-[9px] font-label uppercase tracking-[0.5em] text-neutral-600 mb-3">
                                    The Curator&apos;s Mandate
                                </p>
                                <p className="text-lg font-headline font-bold text-white italic">
                                    &quot;Once it&apos;s gone, it&apos;s gone. Forever.&quot;
                                </p>
                            </div>

                            {/* Totals */}
                            <div className="md:col-span-4 space-y-2">
                                <div className="flex justify-between text-[10px] font-label uppercase tracking-widest text-neutral-500">
                                    <span>Subtotal</span>
                                    <span className="text-neutral-300">${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-label uppercase tracking-widest text-neutral-500">
                                    <span>Shipping (Est)</span>
                                    <span className="text-neutral-300">${shipping.toLocaleString()}</span>
                                </div>
                                <div className="h-px bg-white/5 my-3" />
                                <div className="flex justify-between items-baseline">
                                    <span className="text-[10px] font-label uppercase tracking-widest text-[#72d2ff]">Grand Total</span>
                                    <span className="text-3xl md:text-4xl font-black font-headline text-white">${total.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="md:col-span-4">
                                <button
                                    onClick={onClose}
                                    className="w-full py-5 font-headline font-black uppercase tracking-[0.2em] text-xs md:text-sm flex items-center justify-center gap-3 group transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                                    style={{
                                        background: items.length > 0 ? "#008DB9" : "#222",
                                        color: items.length > 0 ? "#fff" : "#666",
                                    }}
                                >
                                    {items.length > 0 ? "COMPLETE CONNECTION" : "BROWSE COLLECTIONS"}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Watermark */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none select-none whitespace-nowrap">
                            <span className="text-[18vw] font-black italic text-white">VASLIC</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
