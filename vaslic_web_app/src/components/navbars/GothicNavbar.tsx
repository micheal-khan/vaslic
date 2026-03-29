"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CartModal } from "../CartModal";

export default function GothicNavbar() {
    const BLOOD = "#8b0000";
    const { totalItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <nav
                className="fixed top-0 w-full z-[100]"
                style={{
                    background: "rgba(10,10,10,0.8)",
                    backdropFilter: "blur(20px)",
                }}
            >
                <div className="flex justify-between items-center px-8 py-6 max-w-[1920px] mx-auto w-full">
                    <Link href="/">
                        <span
                            className="text-2xl font-black text-white tracking-widest uppercase cursor-pointer"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            VASLIC
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { label: "Gothic", href: "/gothic", active: true },
                            { label: "Bohemian", href: "/bohemian", active: false },
                            { label: "Avant-Garde", href: "/avant-garde", active: false },
                            { label: "Street", href: "/street", active: false },
                            { label: "Funky", href: "/funky", active: false },
                        ].map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="font-bold tracking-tighter uppercase text-xs transition-colors duration-300"
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    color: l.active ? BLOOD : "#a3a3a3",
                                    borderBottom: l.active ? `2px solid ${BLOOD}` : undefined,
                                    paddingBottom: l.active ? "4px" : undefined,
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/wishlist" className="hover:text-[#8b0000] transition-colors text-white" aria-label="Wishlist">
                            <Heart size={20} />
                        </Link>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="hover:text-[#8b0000] transition-colors text-white relative bg-transparent border-none cursor-pointer"
                            aria-label="Cart"
                        >
                            <ShoppingBag size={20} />
                            {totalItems > 0 && (
                                <span
                                    className="absolute -top-1.5 -right-1.5 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                                    style={{ background: BLOOD, fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <Link href="/login" className="hover:text-[#8b0000] transition-colors text-white" aria-label="Account">
                            <User size={20} />
                        </Link>
                    </div>
                </div>
            </nav>
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
