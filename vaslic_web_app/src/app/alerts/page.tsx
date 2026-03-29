"use client";
import React from "react";
import CuratorLayout from "@/components/CuratorLayout";

export default function ScarcityAlertsPage() {
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
                        <span className="font-label text-[#72d2ff] tracking-widest uppercase text-xs mb-2 block">Control Center 0.49</span>
                        <h1 className="text-5xl md:text-6xl lg:text-8xl font-black font-headline tracking-tighter uppercase leading-none text-white">
                            Scarcity<br /><span className="text-zinc-700">Protocol</span>
                        </h1>
                    </div>
                    {/* CURRENT SCARCITY SCORE */}
                    <div className="bg-[#1c1b1b] p-8 flex flex-col items-center justify-center min-w-[240px] relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 opacity-10">
                            <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>change_history</span>
                        </div>
                        <span className="font-label text-[10px] tracking-widest text-neutral-500 uppercase mb-4">Current Scarcity Score</span>
                        <div className="text-6xl font-headline font-black text-[#72d2ff]">94.2</div>
                        <div className="w-full h-1 bg-neutral-800 mt-4 overflow-hidden relative">
                            <div className="h-full bg-[#72d2ff] w-[94%] absolute left-0 top-0"></div>
                        </div>
                        <span className="mt-2 font-label text-[9px] text-[#72d2ff]/60 uppercase">High Intensity Volatility</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* CRITICAL STOCK FEED (Bento Left) */}
                    <section className="lg:col-span-8 flex flex-col gap-8">
                        <div className="bg-[#1c1b1b] p-1 relative overflow-hidden">
                            <div className="bg-[#131313] p-6 md:p-8">
                                <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                                    <h3 className="font-headline font-black text-2xl uppercase tracking-tight text-white">Critical Stock Feed</h3>
                                    <span className="bg-[#ffb4ab] text-[#690005] px-3 py-1 text-[10px] font-black uppercase tracking-widest">LIVE DEPLOYMENT</span>
                                </div>
                                <div className="space-y-6">
                                    {/* Item 1 */}
                                    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#20201f] hover:bg-[#2a2a2a] transition-all duration-300 hover:translate-x-1 gap-4">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-24 bg-neutral-900 overflow-hidden relative shrink-0">
                                                <img
                                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                                    alt="The Mourning Shroud"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7HFYkvL16GJr_Zlq5nNRjD_YiiYISTgRJbHsjV0H-SRvfsQKTirkaEFBbpAtU7ReD5okXNGDdjdPMgSESYgpq6tUemHHyISF_y97LtnoTpz0bYS5q-KWGeHdCSAEQDYRf6nLnduJVcM0H54JqpdUqpkwMasaTJeEVhSdbgS9rWdoI5REwCf2b3xP76icZqia_I4EE7O9dNLwcPTIAk6wOGcxAXGVMeOE0OvNOfBtUtiOJ9qgwsURgvqXqoc7ZUGp4LwOcTAY3e7I" />
                                                <div className="absolute bottom-0 right-0 bg-[#72d2ff] px-1 text-[8px] font-bold text-black uppercase tracking-wider">Gothic</div>
                                            </div>
                                            <div>
                                                <h4 className="font-headline font-bold text-lg uppercase text-white">The Mourning Shroud</h4>
                                                <p className="font-label text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest mt-1">Category: Archive A-01</p>
                                            </div>
                                        </div>
                                        <div className="text-left sm:text-right mt-2 sm:mt-0">
                                            <div className="text-2xl font-black font-headline text-[#ffb4ab]">2 UNITS LEFT</div>
                                            <button className="mt-2 text-[10px] font-black uppercase tracking-widest border border-[#72d2ff]/30 text-[#72d2ff] px-6 py-2 hover:bg-[#72d2ff] hover:text-black transition-all">SECURE UNIT</button>
                                        </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#20201f] hover:bg-[#2a2a2a] transition-all duration-300 hover:translate-x-1 gap-4">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-24 bg-neutral-900 overflow-hidden relative shrink-0">
                                                <img
                                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                                    alt="Voltage Utility Rig"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvK2XMRHXRGdNxgPwLE9nmpioWQspTjWoD2KM86h8ldbzdtOW5jdHYK3MdCxDLptywgrHkEYum0jY4jECgKZu1U1o9ESy0Lto2ncc3H_GFIAaf1bnnJztS32A_4CUvPZ87Oz0kb7fGWjbzyV_WnEJkOxSRpqm8WwSYKDt6ZN49lzwYaTatQDEq3oBivJ0NOpD_SyUWJDsPQU_vlWq_mPm4Sr9vwwHg5tzzX2w7DvnfEyYKhVfZoLWLF58mbSVUWNCAIGZJoBqryQc" />
                                                <div className="absolute bottom-0 right-0 bg-[#72d2ff] px-1 text-[8px] font-bold text-black uppercase tracking-wider">Street</div>
                                            </div>
                                            <div>
                                                <h4 className="font-headline font-bold text-lg uppercase text-white">Voltage Utility Rig</h4>
                                                <p className="font-label text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest mt-1">Category: Technical Gear</p>
                                            </div>
                                        </div>
                                        <div className="text-left sm:text-right mt-2 sm:mt-0">
                                            <div className="text-2xl font-black font-headline text-[#ffb4ab]">5 UNITS LEFT</div>
                                            <button className="mt-2 text-[10px] font-black uppercase tracking-widest border border-[#72d2ff]/30 text-[#72d2ff] px-6 py-2 hover:bg-[#72d2ff] hover:text-black transition-all">SECURE UNIT</button>
                                        </div>
                                    </div>

                                    {/* Item 3 */}
                                    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#20201f] hover:bg-[#2a2a2a] transition-all duration-300 hover:translate-x-1 gap-4">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-24 bg-neutral-900 overflow-hidden relative shrink-0">
                                                <img
                                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                                    alt="Void Compression Tee"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs2ViqXwDkyrCQOzExhDeaY6jt3rLmZHPAWfBAw3MRWAVguqn9DCXsK4nRoK70ksPqjYNm8MnLNE7SAYefaUEgBZH4Mp4mHKKV-u6GdIZ7yAv4H-2tkW0A2lMISrt5MX3-WQenjK1pE4caeVMqbv590Ty9PmsngIbbx41TXwWUgcy-b9FVXyKbbwvwc-QRCP4VLKZs4UYBC5uXZImprbgh4Qnq6JI2yipoDLYS6ATO4SffgmWe647W_SNAPaL_IT3e0sl6-A7-BV4" />
                                                <div className="absolute bottom-0 right-0 bg-[#72d2ff] px-1 text-[8px] font-bold text-black uppercase tracking-wider">Avant-Garde</div>
                                            </div>
                                            <div>
                                                <h4 className="font-headline font-bold text-lg uppercase text-white">Void Compression Tee</h4>
                                                <p className="font-label text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest mt-1">Category: Kinetic Series</p>
                                            </div>
                                        </div>
                                        <div className="text-left sm:text-right mt-2 sm:mt-0">
                                            <div className="text-2xl font-black font-headline text-[#ffb4ab]">1 UNIT LEFT</div>
                                            <button className="mt-2 text-[10px] font-black uppercase tracking-widest border border-[#72d2ff]/30 text-[#72d2ff] px-6 py-2 hover:bg-[#72d2ff] hover:text-black transition-all">SECURE UNIT</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* UPCOMING DROPS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-[#20201f] p-6 md:p-8 border-l-4 border-[#72d2ff]">
                                <h4 className="font-headline font-black text-xl uppercase mb-6 flex items-center justify-between text-white">
                                    Bohemian Drop
                                    <span className="material-symbols-outlined text-[#72d2ff]">auto_awesome</span>
                                </h4>
                                <div className="flex gap-2 sm:gap-4">
                                    <div className="flex-1 bg-[#0e0e0e] p-3 md:p-4 text-center">
                                        <div className="text-2xl lg:text-3xl font-black font-headline text-white">02</div>
                                        <div className="text-[9px] uppercase tracking-tighter text-neutral-500">Days</div>
                                    </div>
                                    <div className="flex-1 bg-[#0e0e0e] p-3 md:p-4 text-center">
                                        <div className="text-2xl lg:text-3xl font-black font-headline text-white">14</div>
                                        <div className="text-[9px] uppercase tracking-tighter text-neutral-500">Hours</div>
                                    </div>
                                    <div className="flex-1 bg-[#0e0e0e] p-3 md:p-4 text-center">
                                        <div className="text-2xl lg:text-3xl font-black font-headline text-white">45</div>
                                        <div className="text-[9px] uppercase tracking-tighter text-neutral-500">Mins</div>
                                    </div>
                                </div>
                                <button className="w-full mt-6 py-4 border border-zinc-600 font-headline text-zinc-400 font-bold text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-transparent transition-all">PRE-AUTH ACCESS</button>
                            </div>
                            <div className="bg-[#20201f] p-6 md:p-8 border-l-4 border-neutral-700">
                                <h4 className="font-headline font-black text-xl uppercase mb-6 flex items-center justify-between text-white">
                                    Gothic Archive II
                                    <span className="material-symbols-outlined text-neutral-500">history_edu</span>
                                </h4>
                                <div className="flex gap-2 sm:gap-4">
                                    <div className="flex-1 bg-[#0e0e0e] p-3 md:p-4 text-center">
                                        <div className="text-2xl lg:text-3xl font-black font-headline text-white">09</div>
                                        <div className="text-[9px] uppercase tracking-tighter text-neutral-500">Days</div>
                                    </div>
                                    <div className="flex-1 bg-[#0e0e0e] p-3 md:p-4 text-center">
                                        <div className="text-2xl lg:text-3xl font-black font-headline text-white">02</div>
                                        <div className="text-[9px] uppercase tracking-tighter text-neutral-500">Hours</div>
                                    </div>
                                    <div className="flex-1 bg-[#0e0e0e] p-3 md:p-4 text-center">
                                        <div className="text-2xl lg:text-3xl font-black font-headline text-white">11</div>
                                        <div className="text-[9px] uppercase tracking-tighter text-neutral-500">Mins</div>
                                    </div>
                                </div>
                                <button className="w-full mt-6 py-4 border border-zinc-600 font-headline text-zinc-400 font-bold text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-transparent transition-all">SET REMINDER</button>
                            </div>
                        </div>
                    </section>

                    {/* PERSONAL PRIORITY ALERTS (Bento Right) */}
                    <aside className="lg:col-span-4">
                        <div className="bg-[#72d2ff]/5 p-6 md:p-8 border border-[#72d2ff]/20 sticky top-32">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-[#72d2ff]" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
                                <h3 className="font-headline font-black text-xl uppercase tracking-tight text-white">Priority Watchlist</h3>
                            </div>
                            <p className="text-sm text-neutral-400 mb-8 leading-relaxed">The following items from your wishlist are nearing terminal stock levels.</p>

                            <div className="space-y-12">
                                <div className="group relative">
                                    <div className="aspect-[4/5] bg-neutral-900 overflow-hidden mb-4">
                                        <img className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" alt="Ceremony Blazer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqN_eKRTx9cF01rt9g_7ZtAcWfFKe8qZXexU5H2jGqcVUgLXjxnceaRLK6GE4OAFEgmUgOPIYulDOnqLR4732ZfUVvvkmgCFX9_lMteuLqKpdooSHFnzXSxh95ZLLUqVR0Ym6fxb_6K4k7W-F4TmVUuJdeVOaTx1ef5OOoGnQAJwR79aaEv5F3FSex8u6mp1JK1i0_ubG01LbTN16kHTNM-WDzlnjJ79x0Qu4m6oewVxrqcDDogRO1-l7f0r0U8L2hTNL1pq7glMU" />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h5 className="font-headline font-bold uppercase text-sm text-white">Ceremony Blazer</h5>
                                            <span className="text-[10px] text-[#72d2ff] uppercase font-bold tracking-widest block mt-1">Last 12 in size XL</span>
                                        </div>
                                        <span className="font-headline font-black text-[#72d2ff]">$840</span>
                                    </div>
                                    <button className="w-full mt-4 py-3 bg-[#72d2ff] text-black font-black text-xs uppercase tracking-widest active:scale-95 hover:bg-white transition-all">CHECKOUT NOW</button>
                                </div>
                                <div className="group relative">
                                    <div className="aspect-[4/5] bg-neutral-900 overflow-hidden mb-4">
                                        <img className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" alt="Riot Boots" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSd-YhKNEhjOdlCE5T_IipPQhYHizfjOd6m6WdipxPu0I7kAHoo_4rVANw4TjEcSOP075YAOPEfh-0aPWT-RoPCq0kve1lKsZGoZA95gCqq00njJ5UgTSJx_zrcP1V3FItQa5CJqKLDKbQMkI_3hWPwjinBEw1emK2gNPMybF6HAmAL95T_GeDOacL-zdvbBtXL4vmLYDl0HuSczX2v9o5XmoCxtZ_-XCO_0nWmbwBcZckUwydbOrlE2J3WN-5CKLgzczZiZwv56k" />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h5 className="font-headline font-bold uppercase text-sm text-white">Riot Boots (Carbon)</h5>
                                            <span className="text-[10px] text-[#ffb4ab] uppercase font-bold tracking-widest block mt-1">Only 3 Left Total</span>
                                        </div>
                                        <span className="font-headline font-black text-[#72d2ff]">$420</span>
                                    </div>
                                    <button className="w-full mt-4 py-3 bg-[#ffb4ab] text-[#690005] font-black text-xs uppercase tracking-widest active:scale-95 hover:bg-white transition-all">SECURE IMMEDIATELY</button>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-[#72d2ff]/10">
                                <h6 className="font-headline font-bold text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Inventory Logic</h6>
                                <p className="text-[10px] italic text-neutral-600 leading-tight">Once stock hits zero, the item ID is permanently decommissioned from the VASLIC servers. No reprints. No re-issues.</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </CuratorLayout>
    );
}
