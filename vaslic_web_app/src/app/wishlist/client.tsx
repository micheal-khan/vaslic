"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { removeWishlistItem } from "./actions";
import Link from "next/link";
import { ArrowLeft, UserCircle, Package, LogOut, X } from "lucide-react";

export default function WishlistClientPage({ user, wishlist }: any) {
    const [items, setItems] = useState(wishlist);

    async function handleRemove(productId: string) {
        setItems((prev: any[]) => prev.filter(p => p.product_id !== productId));
        await removeWishlistItem(productId);
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
                        <Link href="/profile" className="flex items-center gap-3 px-6 py-4 bg-transparent hover:bg-[#111] text-neutral-400 hover:text-white uppercase text-xs tracking-widest transition-colors">
                            <UserCircle size={16} /> Identity Profile
                        </Link>
                        <Link href="/wishlist" className="flex items-center gap-3 px-6 py-4 bg-[#1a1a1a] text-white uppercase text-xs tracking-widest font-bold">
                            <Package size={16} /> Wishlist
                        </Link>
                        <Link href="/logout" className="flex items-center gap-3 px-6 py-4 bg-red-950/20 text-red-400 hover:bg-red-950/40 hover:text-red-300 uppercase text-xs tracking-widest transition-colors">
                            <LogOut size={16} /> Sever Link (Logout)
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="lg:col-span-9 space-y-10">
                    <div>
                        <h1 className="text-3xl uppercase tracking-tighter" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Target Acquisitions</h1>
                        <p className="text-xs uppercase tracking-widest text-[#aaa]">Monitored kinetic assets</p>
                    </div>

                    {items.length === 0 ? (
                        <div className="p-12 border border-[#222] text-center bg-[#111]">
                            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em]">No targets acquired.</p>
                            <Link href="/" className="inline-block mt-4 text-[10px] text-cyan-400 hover:text-cyan-300 uppercase tracking-widest border-b border-cyan-400 pb-1">Browse Archive</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {items.map((item: any) => {
                                const prod = item.products;
                                if (!prod) return null;
                                return (
                                    <div key={item.id} className="group relative bg-[#111] border border-[#222] hover:border-cyan-400/50 transition-colors">
                                        <button
                                            onClick={() => handleRemove(prod.id)}
                                            className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-red-900/80 text-white z-10 transition-colors"
                                            title="Remove from monitoring"
                                        >
                                            <X size={14} />
                                        </button>

                                        <Link href={`/products/${prod.vault_id}`} className="block">
                                            <div className="aspect-[4/5] bg-black overflow-hidden relative">
                                                {prod.images?.[0] ? (
                                                    <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-neutral-800">NO SIGNAL</div>
                                                )}
                                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                                                    <span className="text-[9px] uppercase tracking-widest font-bold bg-white text-black px-2 py-1">
                                                        {prod.categories?.name}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-4 space-y-2">
                                                <div className="text-[10px] text-neutral-500 tracking-widest uppercase">ID: {prod.vault_id}</div>
                                                <h3 className="text-sm font-bold uppercase tracking-widest line-clamp-1">{prod.name}</h3>
                                                <div className="text-cyan-400 font-bold tracking-widest">${prod.price}</div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
            <SiteFooter />
            <ThemeSwitcher />
        </div>
    );
}
