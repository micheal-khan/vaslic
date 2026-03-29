"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CuratorLayout from "@/components/CuratorLayout";
import { updateProfile } from "./actions";

export default function ProfileClientPage({ user, profile, orders }: any) {
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const res = await updateProfile(formData);
        if (!res.success) {
            setMessage("ERROR: " + res.error);
        } else {
            setMessage("SUCCESS: Profile updated");
        }
        setSubmitting(false);
    }

    const ease = [0.22, 1, 0.36, 1] as const;

    return (
        <CuratorLayout>
            <div className="px-8 lg:px-12 py-12 max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease }}
                    className="mb-16 relative"
                >
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#72d2ff]/5 blur-[120px] rounded-full pointer-events-none"></div>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
                        <div>
                            <span className="font-label text-[#72d2ff] font-bold tracking-[0.3em] uppercase block mb-2 text-[10px]">
                                Member Authentication
                            </span>
                            <h1 className="font-headline text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                                ELITE CURATOR
                            </h1>
                            <div className="flex items-center gap-4 text-[10px]">
                                <span className="font-label text-zinc-500 tracking-widest uppercase">ID: {user?.id?.substring(0, 8) || "VLK-001"}</span>
                                <span className="h-1 w-12 bg-[#72d2ff]"></span>
                                <span className="font-label text-white tracking-widest uppercase">
                                    ACTIVE SINCE {new Date(user?.created_at || Date.now()).getFullYear()}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-headline text-zinc-500 text-sm italic mb-2">The Curator&apos;s Mandate:</p>
                            <p className="font-headline text-xl md:text-2xl font-bold text-white uppercase tracking-tight">
                                &quot;Once it&apos;s gone, it&apos;s gone. Forever.&quot;
                            </p>
                        </div>
                    </div>
                </motion.header>

                {/* Bento Grid Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
                    {/* Personal Curation Metrics (Large Left) */}
                    <motion.section
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease }}
                        className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6"
                    >
                        {/* Pieces Owned */}
                        <div className="bg-[#1c1b1b] p-8 relative overflow-hidden group">
                            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-white/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">inventory_2</span>
                            <h4 className="font-label text-[10px] text-zinc-400 uppercase tracking-widest mb-8 font-bold">Pieces Owned</h4>
                            <p className="font-headline text-5xl md:text-6xl font-black text-[#72d2ff] leading-none">{orders.length}</p>
                            <div className="mt-4 flex items-center gap-2 text-[10px] text-green-400 font-label font-bold uppercase tracking-wider">
                                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                Active Collection
                            </div>
                        </div>

                        {/* Vault Value */}
                        <div className="bg-[#1c1b1b] p-8 relative overflow-hidden group">
                            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-white/5 -rotate-12 transition-transform duration-700 group-hover:rotate-0">payments</span>
                            <h4 className="font-label text-[10px] text-zinc-400 uppercase tracking-widest mb-8 font-bold">Vault Value</h4>
                            <p className="font-headline text-4xl font-black text-white leading-none tracking-tighter uppercase">$---</p>
                            <div className="mt-4 flex items-center gap-2 text-[10px] text-[#72d2ff] font-label uppercase tracking-wider font-bold">
                                Market Adjusted
                            </div>
                        </div>

                        {/* Scarcity Percentage */}
                        <div className="bg-[#2a2a2a] p-8 relative overflow-hidden group border-l-2 border-[#72d2ff]">
                            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-[#72d2ff]/5 transition-transform duration-700 group-hover:scale-110">emergency_home</span>
                            <h4 className="font-label text-[10px] text-zinc-400 uppercase tracking-widest mb-8 font-bold">Sold Out Status</h4>
                            <p className="font-headline text-5xl md:text-6xl font-black text-white leading-none">88<span className="text-2xl text-[#72d2ff]">%</span></p>
                            <p className="mt-4 text-[9px] text-zinc-500 font-label uppercase leading-tight font-bold tracking-widest">Items no longer in production</p>
                        </div>

                        {/* Visual Breakdown: Style Profile (Wide Bottom) */}
                        <div
                            className="sm:col-span-3 bg-[#1c1b1b] p-10 mt-2"
                            style={{
                                backgroundImage: `linear-gradient(135deg, rgba(114, 210, 255, 0.03) 25%, transparent 25%), linear-gradient(225deg, rgba(114, 210, 255, 0.03) 25%, transparent 25%)`,
                                backgroundSize: "60px 60px"
                            }}
                        >
                            <div className="flex justify-between items-center mb-12">
                                <h3 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white">Style Archetype</h3>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-[#353535] text-[10px] font-label text-[#72d2ff] tracking-widest font-bold uppercase">Calculated: 24h ago</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-8">
                                {[
                                    { label: "Gothic", pct: "45%", width: "45%" },
                                    { label: "Avant-Garde", pct: "30%", width: "30%" },
                                    { label: "Street", pct: "15%", width: "15%" },
                                    { label: "Bohemian", pct: "10%", width: "10%" },
                                ].map(arch => (
                                    <div key={arch.label} className="space-y-3">
                                        <div className="flex justify-between font-label text-[10px] font-bold uppercase tracking-widest">
                                            <span className="text-white">{arch.label}</span>
                                            <span className="text-zinc-500">{arch.pct}</span>
                                        </div>
                                        <div className="h-1 w-full bg-[#353535]">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: arch.width }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                                className="h-full bg-[#72d2ff]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* Curated Inventory Teaser (Right Side) */}
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease }}
                        className="lg:col-span-4 flex flex-col gap-6 lg:mt-0 mt-6"
                    >
                        <div className="bg-[#72d2ff]/10 p-8 border border-[#72d2ff]/20 flex flex-col justify-between min-h-[300px] lg:min-h-[380px]">
                            <div>
                                <span className="material-symbols-outlined text-[#72d2ff] mb-4 text-3xl">diamond</span>
                                <h3 className="font-headline text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
                                    The Next Drop Awaits
                                </h3>
                                <p className="text-sm text-zinc-400 font-body leading-relaxed mb-6">
                                    Your Elite status grants you 24-hour early access to the upcoming <span className="text-white font-bold">Obsidian Bloom</span> collection.
                                </p>
                            </div>
                            <button className="w-full py-4 bg-transparent border border-[#72d2ff] text-[#72d2ff] font-headline font-bold text-[10px] tracking-widest uppercase transition-colors hover:bg-[#72d2ff] hover:text-black mt-4 active:scale-[0.98]">
                                Set Priority Alert
                            </button>
                        </div>

                        <div className="bg-[#1c1b1b] overflow-hidden flex-1 group">
                            <div className="h-48 relative overflow-hidden">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5PCB4muJOe7eVcVl5jcmBQGQ9QLeM0s1vyF0G52e_WgP6te9HFMqBpx_DYL6HcfVfQQcGZoifQoRAlBn1sgaSynkTwS0sofek2cRzYOUhkgjTN8xw6EK9BjCIDLI16J2el1vnSUCEa6JK_yH97Q87HV5PgzlPk2n7-glcRd2OFRZgXz0MmjxrdNWTezAyOLsvVz0wQOnMxmHHx7DMtw43TWfKJy3TJZSODvoEwhvwBETR1fHvq3fA6UrF3u-hhP2K3SfXOreXiRo"
                                    alt="Avant-Garde Look"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] to-transparent"></div>
                                <span className="absolute top-4 left-4 bg-black/80 backdrop-blur px-3 py-1 font-label text-[9px] font-bold text-white tracking-widest uppercase border border-white/10">
                                    Latest Addition
                                </span>
                            </div>
                            <div className="p-6">
                                <h4 className="font-headline text-lg font-bold text-white uppercase mb-1 tracking-tight">Veil of Echoes #09</h4>
                                <p className="font-label text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Series: Avant-Garde Vol. 1</p>
                            </div>
                        </div>
                    </motion.section>
                </div>

                {/* ─── EDIT PROFILE FORM (Kept for functionality) ─── */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease }}
                    className="border-t border-white/10 pt-16 pb-8"
                >
                    <div className="mb-10">
                        <h2 className="text-3xl font-headline font-black uppercase tracking-tighter text-white">Primary Attributes</h2>
                        <p className="text-[10px] font-label font-bold uppercase tracking-widest text-zinc-500 mt-2">Modify transmission parameters</p>
                    </div>

                    {message && (
                        <div className={`p-4 mb-6 text-[10px] font-bold tracking-widest uppercase font-label border ${message.startsWith("SUCCESS") ? "bg-[#72d2ff]/10 text-[#72d2ff] border-[#72d2ff]/50" : "bg-red-500/10 text-red-400 border-red-500/50"}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-[#1c1b1b] border border-white/5 relative overflow-hidden">
                        {/* subtle decoration */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 border border-white/5 rounded-full pointer-events-none"></div>

                        <div className="space-y-3 z-10">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] font-label text-[#72d2ff]">
                                Callsign (Full Name)
                            </label>
                            <input
                                name="full_name"
                                defaultValue={profile?.full_name || ""}
                                placeholder="Enter your name"
                                className="w-full bg-[#111] border border-zinc-800 px-5 py-4 text-sm font-headline focus:border-[#72d2ff] outline-none transition-colors uppercase tracking-widest text-white placeholder:text-zinc-700"
                            />
                        </div>
                        <div className="space-y-3 z-10">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] font-label text-zinc-500">
                                Comm Link (Cannot Edit)
                            </label>
                            <input
                                disabled
                                defaultValue={user.email}
                                className="w-full bg-black border border-zinc-900 px-5 py-4 text-sm font-headline text-zinc-600 outline-none uppercase tracking-widest"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2 mt-4 z-10">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-10 py-5 uppercase text-[10px] font-black tracking-[0.2em] bg-[#72d2ff] text-black hover:bg-white transition-colors disabled:opacity-50 font-headline active:scale-95"
                            >
                                {submitting ? "Transmitting..." : "Sync Identity"}
                            </button>
                        </div>
                    </form>
                </motion.section>
            </div>
        </CuratorLayout>
    );
}
