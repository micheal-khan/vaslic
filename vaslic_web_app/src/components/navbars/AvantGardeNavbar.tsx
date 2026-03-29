"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CartModal } from "../CartModal";

export default function AvantGardeNavbar() {
    const COBALT = "#008DB9";
    const { totalItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <nav
                className="fixed top-0 w-full z-[100] border-b border-zinc-100"
                style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)" }}
            >
                <div className="flex justify-between items-center px-8 py-6 max-w-[1920px] mx-auto w-full">
                    <Link href="/">
                        <div
                            className="text-3xl font-black tracking-tighter text-zinc-900 cursor-pointer"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            VASLIC
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center gap-12">
                        {[
                            { label: "Gothic", href: "/gothic", active: false },
                            { label: "Bohemian", href: "/bohemian", active: false },
                            { label: "Avant-Garde", href: "/avant-garde", active: true },
                            { label: "Street", href: "/street", active: false },
                            { label: "Funky", href: "/funky", active: false },
                        ].map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="font-bold tracking-tight uppercase text-sm transition-colors"
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    color: l.active ? COBALT : "#71717a",
                                    borderBottom: l.active ? `2px solid ${COBALT}` : undefined,
                                    paddingBottom: l.active ? "4px" : undefined,
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/wishlist" className="hover:translate-x-1 transition-transform active:scale-95" aria-label="Wishlist">
                            <Heart size={24} className="text-zinc-900" />
                        </Link>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative hover:translate-x-1 transition-transform active:scale-95 bg-transparent border-none cursor-pointer"
                            aria-label="Cart"
                        >
                            <ShoppingBag size={24} className="text-zinc-900" />
                            {totalItems > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                                    style={{ background: COBALT, fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <Link href="/login" className="hover:translate-x-1 transition-transform active:scale-95" aria-label="Account">
                            <User size={24} className="text-zinc-900" />
                        </Link>
                    </div>
                </div>
            </nav>
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
