import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";

export default function HomeNavbar() {
    return (
        <nav
            className="fixed top-0 w-full z-[100]"
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
                    <div className="relative cursor-pointer transition-transform hover:scale-110">
                        <ShoppingBag size={20} />
                        <span
                            className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            0
                        </span>
                    </div>
                    <User className="cursor-pointer hover:scale-110 transition-transform" size={20} />
                </div>
            </div>
        </nav>
    );
}
