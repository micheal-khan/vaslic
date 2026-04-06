"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CartModal } from "./CartModal";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { SiteFooter } from "./SiteFooter";

interface CuratorLayoutProps {
    children: React.ReactNode;
    theme?: "gothic" | "bohemian" | "avant-garde" | "street" | "funky" | "default";
}

const sidebarLinks = [
    { label: "My Wishlist", href: "/wishlist", icon: "auto_awesome", filled: true },
    { label: "Order History", href: "/orders", icon: "history", filled: false },
    { label: "Scarcity Alerts", href: "/alerts", icon: "priority_high", filled: false },
    { label: "Style Profile", href: "/profile", icon: "architecture", filled: false },
    { label: "The Vault", href: "/vault", icon: "inventory_2", filled: false },
];

export default function CuratorLayout({ children, theme = "default" }: CuratorLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { totalItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-[#131313] text-[#e5e2e1] selection:bg-[#72d2ff] selection:text-black">
            {/* ─── Top Navbar (Matches HomeNavbar) ─── */}
            <nav
                className="fixed top-0 w-full z-50 transition-all duration-300 pointer-events-auto"
                style={{
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)"
                }}
            >
                <div className="flex justify-between items-center px-8 py-6 max-w-[1920px] mx-auto w-full">
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
                            <Heart size={20} fill={pathname === "/wishlist" ? "white" : "none"} />
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
                        <Link href={user ? "/profile" : "/login"} className="hidden md:block cursor-pointer hover:scale-110 transition-transform">
                            <User size={20} />
                        </Link>
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden cursor-pointer transition-transform hover:scale-110 border-none bg-transparent"
                        >
                            <span className="material-symbols-outlined text-2xl">menu</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* ─── Sidebar ─── */}
            <aside className="hidden lg:flex h-screen w-64 fixed left-0 top-0 bg-zinc-900 flex-col py-8 z-40 border-r border-zinc-800">
                <div className="px-8 mt-16 mb-12">
                    <h3 className="text-white font-headline font-bold text-lg uppercase tracking-tight">The Curator</h3>
                    <p className="text-[10px] text-cyan-500 font-headline font-medium tracking-[0.2em]">NEVER REPRINT STATUS</p>
                </div>
                <nav className="flex-1 flex flex-col gap-1">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`flex items-center gap-4 px-8 py-4 font-label text-xs font-medium uppercase transition-all duration-300 ${isActive
                                    ? "bg-zinc-800 text-cyan-400 border-l-4 border-cyan-400"
                                    : "text-zinc-500 hover:bg-zinc-800/50 hover:pl-10"
                                    }`}
                            >
                                <span
                                    className="material-symbols-outlined text-lg"
                                    style={link.filled || isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                                >
                                    {link.icon}
                                </span>
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="px-8 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="block w-full py-4 border-2 border-[#ff3d3d] text-[#ff3d3d] font-headline font-black text-[10px] uppercase tracking-widest text-center transition-all duration-300 hover:bg-[#ff3d3d] hover:text-white hover:shadow-[0_0_20px_rgba(255,61,61,0.4)] active:scale-95"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Navigation Drawer */}
            <div className={`lg:hidden fixed inset-0 z-[60] bg-black/90 backdrop-blur-md transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="flex flex-col h-full p-8 pt-24 text-white">
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-8 right-8 text-white z-50 p-2"
                    >
                        <span className="material-symbols-outlined text-3xl">close</span>
                    </button>
                    <nav className="flex-1 flex flex-col gap-6 items-start mt-8">
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-6 font-headline text-2xl font-black uppercase tracking-tight transition-colors duration-300 ${isActive ? "text-cyan-400" : "text-neutral-500 hover:text-white"}`}
                                >
                                    <span
                                        className="material-symbols-outlined text-3xl"
                                        style={link.filled || isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                                    >
                                        {link.icon}
                                    </span>
                                    {link.label}
                                </Link>
                            );
                        })}
                        <button
                            onClick={handleLogout}
                            className="mt-8 px-8 py-4 border-2 border-[#ff3d3d] text-[#ff3d3d] font-headline font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#ff3d3d] hover:text-white w-full text-left"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            </div>

            {/* ─── Main Content ─── */}
            <main className="lg:pl-64 pt-16 min-h-screen" style={{ background: "#131313" }}>
                {children}
            </main>


            {/* ─── Footer ─── */}
            <div className="lg:pl-64">
                <SiteFooter theme={theme} />
            </div>

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: inline-block;
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    );
}
