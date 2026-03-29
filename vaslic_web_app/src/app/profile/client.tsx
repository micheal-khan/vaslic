"use client";
import { useState } from "react";
import { updateProfile } from "./actions";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Link from "next/link";
import { LogOut, Package, UserCircle } from "lucide-react";

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
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
            <Navbar />
            <main className="pt-32 pb-24 px-8 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

                {/* Sidebar */}
                <aside className="lg:col-span-3 space-y-6">
                    <div className="p-8 border-l border-cyan-400 bg-[#111]">
                        <UserCircle className="w-12 h-12 text-cyan-400 mb-4" />
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-1">Identified as</p>
                        <h2 className="text-xl font-bold uppercase truncate">{user.email}</h2>
                    </div>

                    <nav className="space-y-2">
                        <Link href="/profile" className="flex items-center gap-3 px-6 py-4 bg-[#1a1a1a] text-white uppercase text-xs tracking-widest font-bold">
                            <UserCircle size={16} /> Identity Profile
                        </Link>
                        <Link href="/wishlist" className="flex items-center gap-3 px-6 py-4 bg-transparent hover:bg-[#111] text-neutral-400 hover:text-white uppercase text-xs tracking-widest transition-colors">
                            <Package size={16} /> Wishlist
                        </Link>
                        <Link href="/logout" className="flex items-center gap-3 px-6 py-4 bg-red-950/20 text-red-400 hover:bg-red-950/40 hover:text-red-300 uppercase text-xs tracking-widest transition-colors">
                            <LogOut size={16} /> Sever Link (Logout)
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="lg:col-span-9 space-y-16">

                    {/* EDIT PROFILE */}
                    <section className="space-y-6">
                        <div>
                            <h1 className="text-3xl uppercase tracking-tighter" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Primary Attributes</h1>
                            <p className="text-xs uppercase tracking-widest text-[#aaa]">Modify transmission parameters</p>
                        </div>

                        {message && (
                            <div className={`p-4 text-xs font-bold tracking-widest uppercase ${message.startsWith("SUCCESS") ? "bg-green-950/30 text-green-400 border border-green-900" : "bg-red-950/30 text-red-500 border border-red-900"}`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-[#111] border border-[#222]">
                            <div className="space-y-2">
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-cyan-400">Callsign (Full Name)</label>
                                <input
                                    name="full_name"
                                    defaultValue={profile?.full_name || ""}
                                    placeholder="Enter your name"
                                    className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-sm focus:border-cyan-400 outline-none transition-colors uppercase tracking-widest text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500">Comm Link (Cannot Edit)</label>
                                <input
                                    disabled
                                    defaultValue={user.email}
                                    className="w-full bg-[#000] border border-[#111] px-4 py-3 text-sm text-neutral-600 outline-none uppercase tracking-widest"
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2 mt-4">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-8 py-4 uppercase text-xs font-bold tracking-[0.2em] bg-cyan-400 text-black hover:bg-cyan-300 transition-colors disabled:opacity-50"
                                >
                                    {submitting ? "Transmitting..." : "Sync Identity"}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* ORDERS/VAULT ACQUISITIONS */}
                    <section className="space-y-6">
                        <div>
                            <h2 className="text-3xl uppercase tracking-tighter" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Vault Acquisitions</h2>
                            <p className="text-xs uppercase tracking-widest text-[#aaa]">History of physical manifest</p>
                        </div>

                        {orders.length === 0 ? (
                            <div className="p-12 border border-[#222] text-center bg-[#0a0a0a]">
                                <p className="text-xs text-neutral-500 uppercase tracking-[0.2em]">No assets acquired yet.</p>
                                <Link href="/vault" className="inline-block mt-4 text-[10px] text-cyan-400 hover:text-cyan-300 uppercase tracking-widest border-b border-cyan-400 pb-1">Enter the Vault</Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order: any) => (
                                    <div key={order.id} className="p-6 bg-[#111] border border-[#222]">
                                        <div className="flex justify-between items-center mb-4 border-b border-[#222] pb-4">
                                            <span className="text-[10px] uppercase tracking-widest text-cyan-400">Order ID: {order.id.split("-")[0]}</span>
                                            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-white text-black">{order.status}</span>
                                        </div>
                                        <ul className="space-y-3">
                                            {order.order_items?.map((item: any) => (
                                                <li key={item.id} className="flex gap-4 items-center">
                                                    <div className="w-16 h-16 bg-[#000] overflow-hidden">
                                                        {item.products?.images?.[0] && (
                                                            <img src={item.products.images[0]} alt="product" className="w-full h-full object-cover" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold uppercase tracking-widest">{item.products?.name || "Unknown Asset"}</p>
                                                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Qty: {item.quantity} // Size: {item.size}</p>
                                                    </div>
                                                    <div className="ml-auto text-sm font-bold tracking-wider">${item.price}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
            <SiteFooter />
            <ThemeSwitcher />
        </div>
    );
}
