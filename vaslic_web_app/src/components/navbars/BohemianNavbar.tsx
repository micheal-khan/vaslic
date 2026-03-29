"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CartModal } from "../CartModal";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function BohemianNavbar() {
    const TERRA = "#c77b4a";
    const BG = "#f5ebe0";
    const { totalItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        fetchUser();
    }, []);

    return (
        <>
            <nav
                className="fixed top-0 z-[100] w-full"
                style={{ background: BG }}
            >
                <div className="flex justify-between items-center px-8 py-6 max-w-[1920px] mx-auto w-full">
                    <Link href="/">
                        <div
                            className="text-2xl font-black cursor-pointer"
                            style={{ color: TERRA, fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            VASLIC
                        </div>
                    </Link>
                    <div className="hidden md:flex gap-8 items-center">
                        {[
                            { label: "Gothic", href: "/gothic", active: false },
                            { label: "Bohemian", href: "/bohemian", active: true },
                            { label: "Avant-Garde", href: "/avant-garde", active: false },
                            { label: "Street", href: "/street", active: false },
                            { label: "Funky", href: "/funky", active: false },
                        ].map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="font-bold tracking-tight uppercase transition-transform hover:translate-x-1 duration-200"
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    color: l.active ? TERRA : "#78716c",
                                    borderBottom: l.active ? `2px solid ${TERRA}` : undefined,
                                    paddingBottom: l.active ? "4px" : undefined,
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex gap-6 items-center" style={{ color: TERRA }}>
                        <Link href="/wishlist" className="hover:scale-105 transition-transform" aria-label="Wishlist">
                            <Heart size={22} />
                        </Link>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            aria-label="Bag"
                            className="relative hover:scale-105 transition-transform bg-transparent border-none cursor-pointer"
                            style={{ color: TERRA }}
                        >
                            <ShoppingBag size={22} />
                            {totalItems > 0 && (
                                <span
                                    className="absolute -top-1.5 -right-1.5 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                                    style={{ background: TERRA, fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <Link href={user ? "/profile" : "/login"} aria-label="Account" className="hover:scale-105 transition-transform">
                            <User size={22} />
                        </Link>
                    </div>
                </div>
            </nav>
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
