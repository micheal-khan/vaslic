"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";
import CuratorLayout from "@/components/CuratorLayout";
import { removeWishlistItem } from "./actions";
import { useCart } from "@/contexts/CartContext";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── per-aesthetic styling tokens ─────────────────────────────────── */
const aestheticTokens: Record<string, {
    bg: string; tagBg: string; tagText: string; accent: string;
    font: string; textColor: string; priceColor: string; badgeStyle: string;
    divider: string; btnBg: string; btnText: string; deleteBorder: string;
}> = {
    gothic: {
        bg: "#0a0a0a", tagBg: "bg-black/80 border border-red-900/30",
        tagText: "text-[#8b0000] font-gothic text-lg", accent: "#8b0000",
        font: "font-gothic", textColor: "text-white", priceColor: "text-white",
        badgeStyle: "text-[#8b0000]", divider: "bg-gradient-to-r from-[#8b0000]/40 to-transparent",
        btnBg: "bg-[#8b0000]", btnText: "text-white", deleteBorder: "border-zinc-800",
    },
    bohemian: {
        bg: "#f5ebe0", tagBg: "bg-white/80 backdrop-blur",
        tagText: "text-[#c77b4a] font-bohemian italic font-bold", accent: "#c77b4a",
        font: "font-bohemian", textColor: "text-[#4a3f35]", priceColor: "text-[#4a3f35]",
        badgeStyle: "text-[#c77b4a]", divider: "bg-[#c77b4a]/20",
        btnBg: "bg-[#c77b4a]", btnText: "text-white", deleteBorder: "border-[#c77b4a]/20",
    },
    street: {
        bg: "#1a1a1a", tagBg: "bg-[#f5e642] rotate-[-2deg]",
        tagText: "text-black font-avant text-2xl tracking-tighter", accent: "#f5e642",
        font: "font-avant", textColor: "text-white", priceColor: "text-white",
        badgeStyle: "bg-[#f5e642] text-black px-1", divider: "bg-zinc-800",
        btnBg: "bg-white", btnText: "text-black", deleteBorder: "border-none bg-zinc-800",
    },
    "avant-garde": {
        bg: "#ffffff", tagBg: "hidden",
        tagText: "", accent: "#008DB9",
        font: "font-avant", textColor: "text-black", priceColor: "text-black",
        badgeStyle: "text-[#008DB9]", divider: "bg-black/5",
        btnBg: "border-2 border-black hover:bg-black hover:text-white", btnText: "text-black",
        deleteBorder: "border-none",
    },
    funky: {
        bg: "#0d0d2b", tagBg: "bg-black/60 backdrop-blur border border-[#00f5d4]/20",
        tagText: "text-[#00f5d4] font-funky text-lg", accent: "#00f5d4",
        font: "font-funky", textColor: "text-[#00f5d4]", priceColor: "text-white",
        badgeStyle: "text-[#ff00c1]", divider: "bg-gradient-to-r from-[#00f5d4]/30 to-[#ff00c1]/10",
        btnBg: "bg-[#00f5d4]", btnText: "text-[#0d0d2b]", deleteBorder: "border-[#00f5d4]/20",
    },
};

function getTokens(slug: string) {
    return aestheticTokens[slug] || aestheticTokens["avant-garde"];
}

export default function WishlistClientPage({ user, wishlist }: any) {
    const [items, setItems] = useState(wishlist);
    const { addToCart } = useCart();

    async function handleRemove(productId: string) {
        setItems((prev: any[]) => prev.filter((p) => p.product_id !== productId));
        await removeWishlistItem(productId);
    }

    function handleMoveToCart(prod: any, slug: string) {
        addToCart({
            id: prod.id,
            product_id: prod.id,
            vault_id: prod.vault_id,
            name: prod.name,
            size: "",
            price: `$${prod.price}`,
            image: prod.images?.[0] || "",
            quantity: 1,
            category_slug: slug,
        });
        handleRemove(prod.id);
    }

    const totalValue = items.reduce((acc: number, item: any) => {
        return acc + (item.products?.price || 0);
    }, 0);

    return (
        <CuratorLayout>
            {/* ─── Scarcity Ticker ─── */}
            <div className="bg-[#353535] py-3 overflow-hidden whitespace-nowrap border-y border-white/5">
                <div className="inline-block animate-marquee uppercase font-headline font-bold text-[10px] tracking-[0.4em] text-[#72d2ff]">
                    ONCE IT&apos;S GONE, IT&apos;S GONE. FOREVER. — NEVER REPRINT RULE IN EFFECT — ARCHIVING PIECES DAILY — ONCE IT&apos;S GONE, IT&apos;S GONE. FOREVER. — NEVER REPRINT RULE IN EFFECT — ARCHIVING PIECES DAILY —
                </div>
            </div>

            <div className="px-8 py-12 max-w-7xl mx-auto">
                {/* ─── Header ─── */}
                <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="text-[#72d2ff] font-headline font-bold text-xs tracking-widest uppercase mb-2 block">Curation Vault</span>
                        <h1 className="text-5xl md:text-7xl font-black font-headline italic tracking-tighter leading-none">MY WISHLIST</h1>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease }}
                        className="bg-[#1c1b1b] p-6 border-l-2 border-[#72d2ff] min-w-[280px]"
                    >
                        <p className="text-[10px] text-zinc-500 font-headline uppercase tracking-widest mb-1">Estimated Vault Value</p>
                        <p className="text-3xl font-black text-white font-headline">${totalValue.toLocaleString()}.00</p>
                        <p className="text-[9px] text-[#289bc8] font-medium mt-2">Subject to dynamic scarcity appreciation.</p>
                    </motion.div>
                </header>

                {/* ─── Bento Wishlist Grid / Empty State ─── */}
                {items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-zinc-800"
                    >
                        <span className="material-symbols-outlined text-6xl text-zinc-800 mb-6">inventory_2</span>
                        <h2 className="text-3xl font-headline font-black tracking-tighter text-white mb-2 uppercase">Your Wishlist is Empty.</h2>
                        <p className="text-zinc-500 font-body mb-8">Explore the Vault to discover never-to-be-reprinted pieces.</p>
                        <Link
                            href="/"
                            className="px-12 py-4 bg-[#72d2ff] text-black font-headline font-black uppercase text-xs tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-2"
                        >
                            Explore the Vault <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnimatePresence>
                            {items.map((item: any, i: number) => {
                                const prod = item.products;
                                if (!prod) return null;
                                const slug = prod.categories?.slug || "avant-garde";
                                const t = getTokens(slug);

                                return (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5, delay: i * 0.1, ease }}
                                        className="group relative overflow-hidden transition-all duration-500"
                                        style={{ background: t.bg }}
                                    >
                                        <div className="flex flex-col h-full">
                                            {/* Image */}
                                            <div className="aspect-[4/3] relative overflow-hidden">
                                                {prod.images?.[0] ? (
                                                    <img
                                                        src={prod.images[0]}
                                                        alt={prod.name}
                                                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${slug === "bohemian" ? "grayscale" : ""} ${slug === "avant-garde" ? "object-contain mix-blend-multiply p-8 bg-[#f0f0f0]" : ""}`}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-xs text-zinc-700 uppercase tracking-widest">No Image</div>
                                                )}
                                                <div className={`absolute ${slug === "street" ? "bottom-4 left-4" : "top-4 right-4"} ${t.tagBg} px-3 py-1`}>
                                                    <span className={t.tagText}>{prod.categories?.name || slug}</span>
                                                </div>
                                                {slug === "avant-garde" && (
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                                                        <span className="text-black font-avant text-[12rem] tracking-tighter">VOID</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="p-8 flex-1 flex flex-col">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <h2 className={`${t.font} text-3xl md:text-4xl ${t.textColor} mb-1 ${slug === "bohemian" ? "font-bold" : ""} ${slug === "street" ? "text-5xl leading-none" : ""}`}>
                                                            {prod.name}
                                                        </h2>
                                                        <p className={`text-[10px] font-headline tracking-[0.2em] ${slug === "bohemian" ? "text-[#c77b4a]/70" : slug === "avant-garde" ? "text-zinc-400 font-medium tracking-[0.5em]" : slug === "street" ? "text-[#f5e642] font-black" : slug === "funky" ? "text-[#ff00c1]/50" : "text-zinc-600"}`}>
                                                            {prod.vault_id}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className={`font-headline font-bold text-xl ${t.priceColor} ${slug === "avant-garde" ? "font-light text-2xl tracking-tighter" : slug === "street" ? "font-black text-2xl tracking-tighter" : ""}`}>
                                                            ${prod.price?.toLocaleString()}
                                                        </p>
                                                        <p className={`text-[9px] font-black uppercase mt-1 ${t.badgeStyle}`}>
                                                            LIMITED EDITION
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 mb-8">
                                                    <p className={`text-[11px] uppercase font-headline tracking-tighter ${slug === "bohemian" ? "text-[#4a3f35]/60 italic" : slug === "avant-garde" ? "font-bold text-black" : "text-zinc-500"}`}>
                                                        Never Reprinted — Scarcity Sealed
                                                    </p>
                                                    <div className={`h-[1px] ${t.divider}`} />
                                                </div>

                                                <div className="mt-auto flex gap-4">
                                                    {slug === "avant-garde" ? (
                                                        <div className="flex flex-col gap-2 w-full">
                                                            <button
                                                                onClick={() => handleMoveToCart(prod, slug)}
                                                                className="w-full py-4 border-2 border-black text-black font-headline font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
                                                            >
                                                                Move to Cart
                                                            </button>
                                                            <button
                                                                onClick={() => handleRemove(prod.id)}
                                                                className="w-full py-2 text-zinc-400 font-headline font-bold text-[9px] uppercase tracking-widest hover:text-black transition-colors"
                                                            >
                                                                Remove from vault
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleMoveToCart(prod, slug)}
                                                                className={`flex-1 py-4 ${t.btnBg} ${t.btnText} font-headline font-black text-[10px] uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center justify-center gap-2`}
                                                            >
                                                                Move to Cart
                                                                {slug === "street" && <ArrowRight size={14} />}
                                                            </button>
                                                            <button
                                                                onClick={() => handleRemove(prod.id)}
                                                                className={`w-14 h-14 border ${t.deleteBorder} flex items-center justify-center transition-colors ${slug === "gothic" ? "text-zinc-600 hover:text-red-500 hover:border-red-500" : slug === "bohemian" ? "text-[#c77b4a] hover:bg-[#c77b4a]/10" : slug === "street" ? "text-white hover:bg-red-600" : "text-zinc-400 hover:text-red-500"}`}
                                                            >
                                                                <Trash2 size={20} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {slug === "gothic" && (
                                            <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none text-[#8b0000]">
                                                <svg height="120" viewBox="0 0 100 100" width="120"><polygon fill="currentColor" points="100,0 100,100 0,100" /></svg>
                                            </div>
                                        )}
                                        {slug === "funky" && (
                                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-tr from-[#00f5d4]/15 to-[#ff00c1]/10 rounded-full blur-3xl pointer-events-none" />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </CuratorLayout>
    );
}
