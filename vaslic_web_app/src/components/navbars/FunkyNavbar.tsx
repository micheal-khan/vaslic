"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CartModal } from "../CartModal";

export default function FunkyNavbar() {
    const CYAN = "#00f0ff";
    const NAV_BG = "#0d0d2b";
    const { totalItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const navLinks = [
        { label: "Gothic", href: "/gothic", active: false },
        { label: "Bohemian", href: "/bohemian", active: false },
        { label: "Avant-Garde", href: "/avant-garde", active: false },
        { label: "Street", href: "/street", active: false },
        { label: "Funky", href: "/funky", active: true },
    ];

    return (
        <>
            <nav
                className="fixed top-0 w-full z-[100]"
                style={{
                    background: NAV_BG,
                    borderBottom: `1px solid ${CYAN}33`,
                    boxShadow: `0 0 20px rgba(0,245,212,0.15)`,
                }}
            >
                <div className="flex justify-between items-center px-8 py-6 max-w-[1920px] mx-auto w-full">
                    <Link
                        href="/"
                        className="text-3xl font-black italic tracking-tighter"
                        style={{ fontFamily: "'Righteous', sans-serif", color: CYAN }}
                    >
                        VASLIC
                    </Link>

                    <div className="hidden md:flex gap-8 items-center">
                        {navLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="uppercase tracking-widest text-sm transition-colors pb-1"
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    color: l.active ? CYAN : "rgba(255,255,255,0.7)",
                                    borderBottom: l.active ? `2px solid ${CYAN}` : "none",
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-6" style={{ color: CYAN }}>
                        <Link href="/wishlist" className="hover:translate-x-1 transition-all duration-200" aria-label="Wishlist">
                            <Heart size={20} />
                        </Link>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative hover:translate-x-1 transition-all duration-200 bg-transparent border-none cursor-pointer"
                            style={{ color: CYAN }}
                            aria-label="Bag"
                        >
                            <ShoppingBag size={20} />
                            {totalItems > 0 && (
                                <span
                                    className="absolute -top-1.5 -right-1.5 text-[#0d0d2b] text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                                    style={{ background: CYAN, fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <Link href="/login" className="hover:translate-x-1 transition-all duration-200" aria-label="Account">
                            <User size={20} />
                        </Link>
                    </div>
                </div>
            </nav>
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
