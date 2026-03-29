"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CartModal } from "../CartModal";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function HomeNavbar() {
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
                className="fixed top-0 w-full z-[100]"
                style={{
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)"
                }}
            >
                <div className="flex justify-between items-center px-4 md:px-8 py-4 md:py-6 max-w-[1920px] mx-auto w-full">
                    <Link href="/">
                        <span
                            className="text-2xl font-black text-white tracking-[0.4em] uppercase cursor-pointer"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            VASLIC
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { label: "Gothic", href: "/gothic" },
                            { label: "Bohemian", href: "/bohemian" },
                            { label: "Avant-Garde", href: "/avant-garde" },
                            { label: "Street", href: "/street" },
                            { label: "Funky", href: "/funky" },
                        ].map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-neutral-400 hover:text-white transition-colors duration-300 uppercase text-[10px] tracking-[0.2em] font-medium"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-6 text-white">
                        <Link href="/wishlist" className="cursor-pointer transition-transform hover:scale-110">
                            <Heart size={20} />
                        </Link>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative cursor-pointer transition-transform hover:scale-110 border-none bg-transparent"
                        >
                            <ShoppingBag size={20} />
                            {totalItems > 0 && (
                                <span
                                    className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <Link href={user ? "/profile" : "/login"} className="cursor-pointer hover:scale-110 transition-transform">
                            <User size={20} />
                        </Link>
                    </div>
                </div>
            </nav>
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
