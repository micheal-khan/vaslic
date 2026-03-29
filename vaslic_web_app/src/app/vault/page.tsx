"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Lock, ShieldCheck } from "lucide-react";
import CuratorLayout from "@/components/CuratorLayout";

const ease = [0.22, 1, 0.36, 1] as const;

export default function VaultPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef, { once: true });

    const streetRef = useRef<HTMLDivElement>(null);
    const streetInView = useInView(streetRef, { once: true, margin: "-100px" });

    return (
        <CuratorLayout>
            <div className="relative overflow-hidden min-h-screen">
                {/* Background Grain/Gradient */}
                <div
                    className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,141,185,0.05),transparent)] pointer-events-none"
                    aria-hidden="true"
                />

                <div className="px-8 lg:px-16 py-12 relative z-10 max-w-7xl mx-auto">
                    {/* Header Section */}
                    <motion.header
                        ref={heroRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease }}
                        className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12"
                    >
                        <div className="max-w-2xl">
                            <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter uppercase mb-4 leading-none text-white">
                                Personal <span className="text-[#72d2ff] italic">Vault</span>
                            </h1>
                            <p className="text-zinc-400 font-body text-lg max-w-md">
                                A curated anthology of your acquired silhouettes. Each piece is a permanent record of your evolution.
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className="font-headline text-5xl font-bold text-white leading-none">12</span>
                            <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">Active Units Owned</span>
                        </div>
                    </motion.header>

                    {/* Vault Section: Gothic */}
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-white">Era: Gothic</h2>
                            <div className="h-[1px] flex-grow bg-zinc-800"></div>
                            <span className="font-label text-xs text-zinc-500 uppercase">04 Items</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Item 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, ease }}
                                className="group bg-[#1c1b1b] relative overflow-hidden flex flex-col"
                            >
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV3ddBRXsdxJbb31OtmZspnmE7xAyb7nnNRIJBXFqJFUoA_YCAak_5Cd8-p5k7AVFNEQGSAxhLU9HhMgFXjTx8HRRdozSHErQPRh59WI_faA2HSKwkMQRQ6pk0EYQ8PnkCF2sjH6LkLuYKFqbPoni5bcsteAhUKql9K8iOhF23pJ0j76GYSIRj7--tzdm-zfJ8cpJhsm6LfdFFov2aI2nJe3qrHz0gHuQZ_nSFKAbk2RLNdk_rxseSr9qND5j0iLQEAwE5WSK4zNo"
                                        alt="Gothic Cloak"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-headline font-bold text-xl uppercase tracking-wide text-white">Nocturnal Shroud</h3>
                                            <p className="text-zinc-500 text-sm">Ceremonial Outerwear</p>
                                        </div>
                                        <span className="bg-[#72d2ff]/10 text-[#72d2ff] font-label text-[10px] px-2 py-1 uppercase tracking-tighter">Unit 03 of 15</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto pt-8">
                                        <span className="text-zinc-500 text-xs font-label uppercase tracking-widest">Acquired Oct 2023</span>
                                        <button className="text-[#72d2ff] font-label text-[10px] uppercase tracking-[0.2em] border-b border-[#72d2ff]/30 pb-0.5 hover:text-white hover:border-white transition-colors">
                                            View Dossier
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none text-white">
                                    <svg height="40" viewBox="0 0 40 40" width="40"><polygon fill="currentColor" points="0,40 40,40 40,0" /></svg>
                                </div>
                            </motion.div>

                            {/* Item 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1, ease }}
                                className="group bg-[#1c1b1b] relative overflow-hidden flex flex-col"
                            >
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdpEJQAIKor_24tfU1G-DynFfq3S1NvuSf1XuvgFossITe_oT-M5q2c-ZIWnEzD65qpLO_75rojyAsd2ELQ46ELBmSybuT_zXg2FEgsLyQ36CuMsgr5ZiTd-8k2xJ2nk-bPs540iY2i5mAQqcAIOO5E_Id4m7wYDYQjShv7XbE78sjv93FwdKrelGP7ukH88d1RIwvFREuE3pJxysSnErQeJb_XYsuQaQILRLNgtZNLLrkUuVFpOh3Nc4hsvT_S0ovhkK3L_kUPKc"
                                        alt="Archangel Vestment"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-headline font-bold text-xl uppercase tracking-wide text-white">Archangel Vestment</h3>
                                            <p className="text-zinc-500 text-sm">Structural Bodysuit</p>
                                        </div>
                                        <span className="bg-[#72d2ff]/10 text-[#72d2ff] font-label text-[10px] px-2 py-1 uppercase tracking-tighter">Unit 01 of 05</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto pt-8">
                                        <span className="text-zinc-500 text-xs font-label uppercase tracking-widest">Acquired Nov 2023</span>
                                        <button className="text-[#72d2ff] font-label text-[10px] uppercase tracking-[0.2em] border-b border-[#72d2ff]/30 pb-0.5 hover:text-white hover:border-white transition-colors">
                                            View Dossier
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none text-white">
                                    <svg height="40" viewBox="0 0 40 40" width="40"><polygon fill="currentColor" points="0,40 40,40 40,0" /></svg>
                                </div>
                            </motion.div>

                            {/* Empty Slot */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2, ease }}
                                className="border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center p-12 text-center group bg-[#111]"
                            >
                                <Lock className="w-10 h-10 text-zinc-700 mb-4 group-hover:text-[#72d2ff] transition-colors" />
                                <h4 className="font-headline font-bold uppercase tracking-widest text-zinc-500">Restricted Slot</h4>
                                <p className="text-xs text-zinc-600 mt-3 max-w-[200px] leading-relaxed">Acquire further Gothic artifacts to expand the vault sector.</p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Vault Section: Street */}
                    <motion.section
                        ref={streetRef}
                        initial={{ opacity: 0 }}
                        animate={streetInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8 }}
                        className="mb-24"
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-white">Era: Street</h2>
                            <div className="h-[1px] flex-grow bg-zinc-800"></div>
                            <span className="font-label text-xs text-zinc-500 uppercase">08 Items</span>
                        </div>

                        {/* Bento Grid Layout for Street Era */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Large Featured Card */}
                            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden bg-[#1c1b1b] min-h-[400px]">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFHQLShosytDUyF_h-zWLl28YmeJhtwUyPd88SX1PnoY9PMm8aEFx1Om0P3iGXBnL9qvu2mS7K9XkuoPmVinUfTxVDLdZx6ggPucfmi3nz_QjUYb_i6OmgqMPXtdgcrlhVHaRIVG-jAL_4UcQ6X6cTxM_UBgvrP8oPbNOMyoKv40EURjlCmRkOyj5Zvb19TiwfiVI6QRXEatM88v-pPnqXaI-SXCdfqoW_hWksFl733wllJF4IrMbgzLDUjLv979ICP_Aj6a6OLNQ"
                                    alt="Streetwear Hero"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <span className="bg-[#f5e642] text-black font-label font-bold text-[10px] px-2 py-1 uppercase tracking-[0.2em] mb-4 inline-block">Unit 08 of 50</span>
                                    <h3 className="text-4xl md:text-5xl font-black font-headline uppercase leading-none mb-4 text-white">Neon Catalyst <br /> Bomber</h3>
                                    <div className="flex justify-between items-end">
                                        <p className="text-zinc-400 font-body text-sm max-w-[200px]">Engineered for high-visibility urban infiltration.</p>
                                        <ArrowUpRight className="text-[#f5e642] w-8 h-8 cursor-pointer hover:scale-110 transition-transform" />
                                    </div>
                                </div>
                            </div>

                            {/* Smaller Items */}
                            <div className="md:col-span-2 bg-[#1c1b1b] p-6 flex gap-6 items-center group overflow-hidden relative">
                                <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-[#111]">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqlYC16QyuefUfBDO-LFUg4Z5A4kD2RqliHOxQ25duJDxxizNfWZUJdW5fLsLJ1d0bYxyA5F7aAGopCsym1Yn6D7x8uz9LpP9fCbLAGOJV0h6WQFIoNQd06vNU0ypMCT1g4OZ4MyN9rB4qITrKjN9jAOQWznXN3mx_xWlG2ZCHt0LUUaqw1aDE5hJCCVW-Y5I-FhQpmdViPRHfVDAbBkidXFZlw9XlWLuJPPjHIZSm3Hh5BlIADwHcoHc0_hGWN9-R_n0yJ1D-ecU"
                                        alt="Chrome Utility V2"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-grow z-10">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-headline font-bold uppercase text-white">Chrome Utility V2</h4>
                                        <span className="font-label text-[10px] text-zinc-500 tracking-wider">Unit 12/20</span>
                                    </div>
                                    <p className="text-xs text-zinc-400 mt-1">Modular containment unit.</p>
                                    <div className="mt-5 flex gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#f5e642]"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 bg-[#1c1b1b] p-6 flex gap-6 items-center group overflow-hidden relative">
                                <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-[#111]">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuALA7e8vwduNkShcQOx0qAfjEby0zpagC6hgu7aKdRa9R8vmUQBQWPUYyrowIA61kE86_91aXnePTLdFrShf4w6nm_dsOrdYjAC0xFSMYO6npe94ZlWtOSgjF7RshetzAiy7529udFOJGoY2SkYwYrcCU561Gjgl0vtXdKVGel4Cph1dF-fSI16PXdVkpcoSB2rCk21mz14HF9YRX6599xgpzpQx7vMLTgvsyTo7q6YaCVItDxaJXQyrRujPDPu_FUwNMO6SdfoRQc"
                                        alt="Vapor Trace 01"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-grow z-10">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-headline font-bold uppercase text-white">Vapor Trace 01</h4>
                                        <span className="font-label text-[10px] text-zinc-500 tracking-wider">Unit 02/10</span>
                                    </div>
                                    <p className="text-xs text-zinc-400 mt-1">Kinetic propulsion footwear.</p>
                                    <div className="mt-5 flex gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#f5e642]"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#f5e642]"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Registration Form Section */}
                    <section className="mt-40 mb-32 bg-[#1c1b1b] p-8 md:p-16 border-l-4 border-[#72d2ff] relative overflow-hidden">
                        {/* Abstract Triangle Background */}
                        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-1/2 translate-x-1/2">
                            <svg height="400" viewBox="0 0 400 400" width="400"><polygon fill="#72d2ff" points="0,400 400,400 400,0"></polygon></svg>
                        </div>

                        <div className="relative z-10 max-w-4xl">
                            <div className="mb-12">
                                <span className="font-label text-[#72d2ff] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">Authentication Portal</span>
                                <h2 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter mb-6 text-white">Register New Unit</h2>
                                <p className="text-zinc-400 max-w-lg leading-relaxed text-sm">
                                    Have you acquired a physical piece through a verified exchange? Enter the encrypted sequence found on the inner NFC-tag to claim ownership in your digital vault.
                                </p>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="flex flex-col gap-3">
                                    <label className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Encrypted Unit ID</label>
                                    <input
                                        className="bg-[#111] border border-zinc-800 focus:border-[#72d2ff] focus:ring-0 text-white font-headline text-lg p-4 outline-none transition-colors placeholder:text-zinc-700 uppercase tracking-widest"
                                        placeholder="VSL-XXXX-XXXX-XXXX"
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Physical Location Tag</label>
                                    <input
                                        className="bg-[#111] border border-zinc-800 focus:border-[#72d2ff] focus:ring-0 text-white font-headline text-lg p-4 outline-none transition-colors placeholder:text-zinc-700 uppercase tracking-widest"
                                        placeholder="City of Acquisition"
                                        type="text"
                                    />
                                </div>
                                <div className="md:col-span-2 pt-4">
                                    <button
                                        className="w-full lg:w-auto bg-[#72d2ff] hover:bg-[#5bbae5] text-black px-12 py-5 font-headline font-black uppercase tracking-widest transition-transform hover:-translate-y-1 flex items-center justify-center gap-3 text-[10px]"
                                        type="submit"
                                    >
                                        Verify & Add to Vault
                                        <ShieldCheck size={18} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </CuratorLayout>
    );
}
