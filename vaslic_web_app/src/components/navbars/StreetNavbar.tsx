"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CartModal } from "../CartModal";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function StreetNavbar() {
    const YELLOW = "#f5e642";
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
                style={{ background: "rgba(9,9,11,0.8)", backdropFilter: "blur(20px)" }}
            >
                <div className="flex justify-between items-center px-8 py-6 max-w-[1920px] mx-auto w-full">
                    <Link href="/">
                        <span
                            className="text-2xl font-black italic tracking-tighter uppercase cursor-pointer"
                            style={{ color: YELLOW, fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            VASLIC
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { label: "Gothic", href: "/gothic", active: false },
                            { label: "Bohemian", href: "/bohemian", active: false },
                            { label: "Avant-Garde", href: "/avant-garde", active: false },
                            { label: "Street", href: "/street", active: true },
                            { label: "Funky", href: "/funky", active: false },
                        ].map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="font-bold tracking-tighter uppercase"
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    color: l.active ? YELLOW : "#71717a",
                                    borderBottom: l.active ? `2px solid ${YELLOW}` : undefined,
                                    paddingBottom: l.active ? "4px" : undefined,
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-6" style={{ color: YELLOW }}>
                        <Link href="/wishlist" className="cursor-pointer transition-transform hover:scale-105" aria-label="Wishlist">
                            <Heart size={20} />
                        </Link>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative cursor-pointer transition-transform hover:scale-105 bg-transparent border-none"
                            style={{ color: YELLOW }}
                            aria-label="Cart"
                        >
                            <ShoppingBag size={20} />
                            {totalItems > 0 && (
                                <span
                                    className="absolute -top-1.5 -right-1.5 text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                                    style={{ background: YELLOW, fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <Link href={user ? "/profile" : "/login"} className="cursor-pointer hover:scale-105 transition-transform" aria-label="Account">
                            <User size={20} />
                        </Link>
                    </div>
                </div>
            </nav>
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
