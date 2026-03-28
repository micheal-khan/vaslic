"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const leftLinks = [
    { label: "Gothic", href: "/gothic" },
    { label: "Bohemian", href: "/bohemian" },
];
const rightLinks = [
    { label: "Avant-Garde", href: "/avant-garde" },
    { label: "Street", href: "/street" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-500",
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
                    <div className="flex items-center gap-4">
                        <button
                            className="text-white/60 hover:text-white transition-colors"
                            aria-label="Shopping bag"
                        >
                            <ShoppingBag className="w-5 h-5" />
                        </button>
                        <button
                            className="text-white/60 hover:text-white transition-colors"
                            aria-label="Account"
                        >
                            <User className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>
        </motion.header>
    );
}
