"use client";
import { useState } from "react";
import { updateProfile } from "./actions";
import CuratorLayout from "@/components/CuratorLayout";
import Link from "next/link";

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

    return (
        <CuratorLayout>
            {/* ─── Scarcity Ticker ─── */}
            <div className="bg-[#353535] py-3 overflow-hidden whitespace-nowrap border-y border-white/5">
                <div className="inline-block animate-marquee uppercase font-headline font-bold text-[10px] tracking-[0.4em] text-[#72d2ff]">
                    ONCE IT&apos;S GONE, IT&apos;S GONE. FOREVER. — NEVER REPRINT RULE IN EFFECT — ARCHIVING PIECES DAILY — ONCE IT&apos;S GONE, IT&apos;S GONE. FOREVER. — NEVER REPRINT RULE IN EFFECT — ARCHIVING PIECES DAILY —
                </div>
            </div>

            <div className="px-8 py-12 max-w-7xl mx-auto space-y-16">
                {/* ─── Header ─── */}
                <header>
                    <span className="text-[#72d2ff] font-headline font-bold text-xs tracking-widest uppercase mb-2 block">Identity Vault</span>
                    <h1 className="text-5xl md:text-7xl font-black font-headline italic tracking-tighter leading-none">MY PROFILE</h1>
                </header>

                {/* ─── EDIT PROFILE ─── */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-3xl uppercase tracking-tighter font-avant">Primary Attributes</h2>
                        <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">Modify transmission parameters</p>
                    </div>

                    {message && (
                        <div className={`p-4 text-xs font-bold tracking-widest uppercase ${message.startsWith("SUCCESS") ? "bg-green-950/30 text-green-400 border border-green-900" : "bg-red-950/30 text-red-500 border border-red-900"}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-[#1c1b1b] border border-zinc-800">
                        <div className="space-y-2">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-cyan-400">Callsign (Full Name)</label>
                            <input
                                name="full_name"
                                defaultValue={profile?.full_name || ""}
                                placeholder="Enter your name"
                                className="w-full bg-[#131313] border border-zinc-800 px-4 py-3 text-sm focus:border-cyan-400 outline-none transition-colors uppercase tracking-widest text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500">Comm Link (Cannot Edit)</label>
                            <input
                                disabled
                                defaultValue={user.email}
                                className="w-full bg-black border border-zinc-900 px-4 py-3 text-sm text-zinc-600 outline-none uppercase tracking-widest"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2 mt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-8 py-4 uppercase text-xs font-bold tracking-[0.2em] bg-cyan-500 text-black hover:bg-cyan-400 transition-colors disabled:opacity-50 font-headline"
                            >
                                {submitting ? "Transmitting..." : "Sync Identity"}
                            </button>
                        </div>
                    </form>
                </section>

                {/* ─── ORDERS / VAULT ACQUISITIONS ─── */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-3xl uppercase tracking-tighter font-avant">Vault Acquisitions</h2>
                        <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">History of physical manifest</p>
                    </div>

                    {orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-800">
                            <span className="material-symbols-outlined text-5xl text-zinc-800 mb-4">receipt_long</span>
                            <h3 className="text-xl font-headline font-black tracking-tighter text-white mb-2 uppercase">No Assets Acquired Yet.</h3>
                            <p className="text-zinc-500 font-body text-sm mb-6">Begin your archive by exploring the collections.</p>
                            <Link
                                href="/vault"
                                className="text-[10px] text-cyan-400 hover:text-cyan-300 uppercase tracking-widest border-b border-cyan-400 pb-1 font-headline font-bold"
                            >
                                Enter the Vault →
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order: any) => (
                                <div key={order.id} className="p-6 bg-[#1c1b1b] border border-zinc-800">
                                    <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-4">
                                        <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-headline">Order ID: {order.id.split("-")[0]}</span>
                                        <span className="text-[10px] uppercase font-black tracking-widest px-3 py-1 bg-white text-black font-headline">{order.status}</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {order.order_items?.map((item: any) => (
                                            <li key={item.id} className="flex gap-4 items-center">
                                                <div className="w-16 h-16 bg-black overflow-hidden">
                                                    {item.products?.images?.[0] && (
                                                        <img src={item.products.images[0]} alt="product" className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold uppercase tracking-widest font-headline">{item.products?.name || "Unknown Asset"}</p>
                                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-label">Qty: {item.quantity} // Size: {item.size}</p>
                                                </div>
                                                <div className="ml-auto text-sm font-bold tracking-wider font-headline">${item.price}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </CuratorLayout>
    );
}
