"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, User, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { CartModal } from "./CartModal";

const leftLinks = [
    { label: "Gothic", href: "/gothic" },
    { label: "Bohemian", href: "/bohemian" },
];
const rightLinks = [
    { label: "Avant-Garde", href: "/avant-garde" },
    { label: "Street", href: "/street" },
];

export function Navbar() {
    const { totalItems } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                className={cn(
                    "fixed top-0 inset-x-0 z-[100] transition-all duration-500",
                    scrolled ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"
                )}
            >
                <nav
                    className="flex items-center justify-between h-[60px] px-8 md:px-14"
                    aria-label="Main navigation"
                >
                    {/* Left links */}
                    <ul className="hidden md:flex items-center gap-8" role="list">
                        {leftLinks.map((l) => (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    className="font-label text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300"
                                >
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Center logo */}
                    <Link
                        href="/"
                        className="absolute left-1/2 -translate-x-1/2 font-headline text-xl tracking-[0.25em] uppercase text-white hover:opacity-80 transition-opacity"
                        aria-label="VASLIC home"
                    >
                        VASLIC
                    </Link>

                    {/* Right side */}
                    <div className="flex items-center gap-8 ml-auto">
                        <ul className="hidden md:flex items-center gap-8" role="list">
                            {rightLinks.map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="font-label text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center gap-6 text-zinc-400">
                            <Link href="/wishlist" className="hover:text-white transition-colors">
                                <Heart className="w-5 h-5" />
                            </Link>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative hover:text-white transition-colors cursor-pointer border-none bg-transparent text-zinc-400"
                            >
                                <ShoppingBag className="w-5 h-5 pointer-events-none" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1.5 -right-2 bg-[#72d2ff] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-label">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                            <Link href="/login" className="hover:text-white transition-colors">
                                <User className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </nav>
            </motion.header>

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
