"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bell, Triangle, Library, Sparkles } from "lucide-react";
import CuratorLayout from "@/components/CuratorLayout";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AlertsClient({ products, wishlist }: { products: any[], wishlist: any[] }) {
    // Filter critical products (e.g., units_remaining < 10)
    const criticalProducts = products
        .filter(p => (p.units_remaining < 10 && p.status === 'live'))
        .sort((a, b) => a.units_remaining - b.units_remaining)
        .slice(0, 5);

    // Filter wishlist items that are nearing terminal stock
    const wishlistAlerts = wishlist
        .map(item => item.products)
        .filter(p => (p && (Array.isArray(p) ? p[0]?.units_remaining < 15 : p.units_remaining < 15) && (Array.isArray(p) ? p[0]?.status === 'live' : p.status === 'live')))
        .map(p => Array.isArray(p) ? p[0] : p)
        .sort((a, b) => a.units_remaining - b.units_remaining)
        .slice(0, 3);

    // Dynamic Scarcity Score calculation (simplified for UI)
    const liveItems = products.filter(p => p.status === 'live').length;
    const lowStockItems = products.filter(p => p.status === 'live' && p.units_remaining < 15).length;
    const scarcityScore = liveItems > 0 ? (90 + (lowStockItems / liveItems) * 10).toFixed(1) : "94.2";

    return (
        <CuratorLayout>
            {/* Scarcity Ticker */}
            <div className="w-full bg-[#72d2ff]/10 border-y border-[#72d2ff]/10 py-2 overflow-hidden whitespace-nowrap">
                <div className="animate-marquee font-headline font-black text-xs uppercase tracking-[0.5em] text-[#72d2ff] inline-block">
                    ONCE IT'S GONE, IT'S GONE. FOREVER. — ONCE IT'S GONE, IT'S GONE. FOREVER. — ONCE IT'S GONE, IT'S GONE. FOREVER. — ONCE IT'S GONE, IT'S GONE. FOREVER.
                </div>
            </div>

            <div className="px-6 md:px-8 py-12 max-w-7xl mx-auto">
                <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="font-label text-[#72d2ff] tracking-widest uppercase text-xs mb-2 block font-bold">Control Center 0.49</span>
                        <h1 className="text-5xl md:text-6xl lg:text-8xl font-black font-headline tracking-tighter uppercase leading-none text-white italic">
                            Scarcity<br /><span className="text-zinc-700">Protocol</span>
                        </h1>
                    </div>
                    {/* CURRENT SCARCITY SCORE */}
                    <div className="bg-[#1c1b1b] p-8 flex flex-col items-center justify-center min-w-[240px] relative overflow-hidden border-l border-white/5">
                        <div className="absolute bottom-0 right-0 opacity-10">
                            <Triangle size={120} strokeWidth={1} />
                        </div>
                        <span className="font-label text-[10px] tracking-widest text-neutral-500 uppercase mb-4 font-bold">Current Scarcity Score</span>
                        <div className="text-6xl font-headline font-black text-[#72d2ff]">{scarcityScore}</div>
                        <div className="w-full h-1 bg-neutral-800 mt-4 overflow-hidden relative">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${scarcityScore}%` }}
                                transition={{ duration: 1.5, ease }}
                                className="h-full bg-[#72d2ff] absolute left-0 top-0"
                            ></motion.div>
                        </div>
                        <span className="mt-2 font-label text-[9px] text-[#72d2ff]/60 uppercase font-bold tracking-widest italic">High Intensity Volatility</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* CRITICAL STOCK FEED (Bento Left) */}
                    <section className="lg:col-span-8 flex flex-col gap-12">
                        <div className="bg-[#1c1b1b] p-1 relative overflow-hidden">
                            <div className="bg-[#131313] p-8 md:p-12">
                                <div className="flex flex-wrap items-center justify-between mb-10 gap-4">
                                    <h3 className="font-headline font-black text-3xl uppercase tracking-tight text-white italic">Critical Stock Feed</h3>
                                    <span className="bg-[#ffb4ab] text-[#690005] px-4 py-1 text-[10px] font-black uppercase tracking-widest italic">LIVE DEPLOYMENT</span>
                                </div>
                                <div className="space-y-6">
                                    {criticalProducts.length === 0 ? (
                                        <div className="p-12 border border-dashed border-zinc-800 text-center text-zinc-600 font-headline uppercase font-black text-xs tracking-widest">
                                            No critical shortages detected at this node.
                                        </div>
                                    ) : (
                                        criticalProducts.map(p => (
                                            <Link
                                                key={p.id}
                                                href={`/products/${p.vault_id}`}
                                                className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-[#20201f] hover:bg-[#2a2a2a] transition-all duration-300 hover:translate-x-1 gap-6 border-l-2 border-transparent hover:border-[#72d2ff]"
                                            >
                                                <div className="flex items-center gap-8">
                                                    <div className="w-24 h-28 bg-neutral-900 overflow-hidden relative shrink-0">
                                                        <img
                                                            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                                            alt={p.name}
                                                            src={p.images?.[0] || ""} />
                                                        <div className="absolute bottom-0 right-0 bg-[#72d2ff] px-2 text-[8px] font-black text-black uppercase tracking-widest">
                                                            {p.categories?.name}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-headline font-black text-xl uppercase text-white tracking-tight">{p.name}</h4>
                                                        <p className="font-label text-[10px] md:text-sm text-neutral-500 uppercase tracking-[0.2em] mt-2 font-bold italic">{p.vault_id}</p>
                                                    </div>
                                                </div>
                                                <div className="text-left sm:text-right">
                                                    <div className={`text-2xl font-black font-headline ${p.units_remaining < 3 ? 'text-[#ffb4ab]' : 'text-white'}`}>
                                                        {p.units_remaining} UNITS REMAINING
                                                    </div>
                                                    <span className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] border border-[#72d2ff]/30 text-[#72d2ff] px-8 py-3 group-hover:bg-[#72d2ff] group-hover:text-black transition-all italic flex items-center justify-center">
                                                        SECURE UNIT
                                                    </span>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* UPCOMING DROPS (Simulated) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-[#20201f] p-8 md:p-12 border-l-4 border-[#72d2ff] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                    <Sparkles size={40} className="text-[#72d2ff]" />
                                </div>
                                <h4 className="font-headline font-black text-2xl uppercase mb-8 flex items-center justify-between text-white italic">
                                    Bohemian Drop
                                </h4>
                                <div className="flex gap-4">
                                    <div className="flex-1 bg-[#0e0e0e] p-6 text-center border border-white/5">
                                        <div className="text-3xl font-black font-headline text-white italic">02</div>
                                        <div className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mt-1">Days</div>
                                    </div>
                                    <div className="flex-1 bg-[#0e0e0e] p-6 text-center border border-white/5">
                                        <div className="text-3xl font-black font-headline text-white italic">14</div>
                                        <div className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mt-1">Hours</div>
                                    </div>
                                    <div className="flex-1 bg-[#0e0e0e] p-6 text-center border border-white/5">
                                        <div className="text-3xl font-black font-headline text-white italic">45</div>
                                        <div className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mt-1">Mins</div>
                                    </div>
                                </div>
                                <button className="w-full mt-8 py-5 border border-zinc-700 font-headline text-zinc-400 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-transparent transition-all italic">
                                    PRE-AUTH ACCESS
                                </button>
                            </div>
                            <div className="bg-[#20201f] p-8 md:p-12 border-l-4 border-zinc-800 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                    <Library size={40} className="text-zinc-500" />
                                </div>
                                <h4 className="font-headline font-black text-2xl uppercase mb-8 flex items-center justify-between text-white italic">
                                    Gothic Archive II
                                </h4>
                                <div className="flex gap-4">
                                    <div className="flex-1 bg-[#0e0e0e] p-6 text-center border border-white/5">
                                        <div className="text-3xl font-black font-headline text-white italic">09</div>
                                        <div className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mt-1">Days</div>
                                    </div>
                                    <div className="flex-1 bg-[#0e0e0e] p-6 text-center border border-white/5">
                                        <div className="text-3xl font-black font-headline text-white italic">02</div>
                                        <div className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mt-1">Hours</div>
                                    </div>
                                    <div className="flex-1 bg-[#0e0e0e] p-6 text-center border border-white/5">
                                        <div className="text-3xl font-black font-headline text-white italic">11</div>
                                        <div className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mt-1">Mins</div>
                                    </div>
                                </div>
                                <button className="w-full mt-8 py-5 border border-zinc-700 font-headline text-zinc-400 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-transparent transition-all italic font-bold">
                                    SET REMINDER
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* PERSONAL PRIORITY ALERTS (Bento Right) */}
                    <aside className="lg:col-span-4">
                        <div className="bg-[#72d2ff]/5 p-8 md:p-12 border border-[#72d2ff]/20 sticky top-32">
                            <div className="flex items-center gap-4 mb-8">
                                <Bell className="text-[#72d2ff]" size={28} />
                                <h3 className="font-headline font-black text-2xl uppercase tracking-tight text-white italic">Priority Watchlist</h3>
                            </div>
                            <p className="text-sm text-zinc-500 mb-10 leading-relaxed font-body">The curation node detected wishlist artifacts nearing terminal stock levels.</p>

                            <div className="space-y-12">
                                {wishlistAlerts.length === 0 ? (
                                    <div className="p-10 border border-dashed border-[#72d2ff]/20 text-center opacity-40">
                                        <span className="font-label uppercase text-[9px] tracking-[0.2em] font-bold">Monitor Active</span>
                                    </div>
                                ) : (
                                    wishlistAlerts.map(p => (
                                        <div key={p.id} className="group relative">
                                            <div className="aspect-[4/5] bg-neutral-900 overflow-hidden mb-6 border border-white/5">
                                                <img
                                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                                                    alt={p.name}
                                                    src={p.images?.[0] || ""} />
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h5 className="font-headline font-black uppercase text-base text-white tracking-tight">{p.name}</h5>
                                                    <span className={`text-[10px] uppercase font-black tracking-widest block mt-2 italic ${p.units_remaining < 5 ? 'text-[#ffb4ab]' : 'text-[#72d2ff]'}`}>
                                                        {p.units_remaining === 1 ? 'LAST REMAINING UNIT' : `ONLY ${p.units_remaining} REMAINING`}
                                                    </span>
                                                </div>
                                                <span className="font-headline font-black text-xl text-white italic">${p.price}</span>
                                            </div>
                                            <Link
                                                href={`/products/${p.vault_id}`}
                                                className={`w-full mt-6 py-4 ${p.units_remaining < 5 ? 'bg-[#ffb4ab] text-[#690005]' : 'bg-[#72d2ff] text-black'} font-black text-[10px] uppercase tracking-[0.2em] active:scale-95 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 italic`}
                                            >
                                                SECURE IMMEDIATELY <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="mt-16 pt-10 border-t border-[#72d2ff]/10">
                                <h6 className="font-headline font-black text-[10px] uppercase tracking-widest text-neutral-600 mb-3 italic">Inventory Logic</h6>
                                <p className="text-[10px] italic text-neutral-700 leading-relaxed">
                                    Once stock hits zero, the item ID is permanently decommissioned from the VASLIC servers. No reprints. No re-issues.
                                    <span className="text-[#72d2ff]/40"> Scarcity verified.</span>
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </CuratorLayout>
    );
}
