import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";

export default function BohemianNavbar() {
    const TERRA = "#c77b4a";
    const BG = "#f5ebe0";

    return (
        <nav
            className="fixed top-0 z-[100] w-full"
            style={{ background: BG }}
        >
            <div className="flex justify-between items-center px-8 py-6 max-w-[1920px] mx-auto w-full">
                <Link href="/bohemian">
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
                    <button aria-label="Bag" className="relative hover:scale-105 transition-transform">
                        <ShoppingBag size={22} />
                        <span
                            className="absolute -top-1.5 -right-1.5 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                            style={{ background: TERRA, fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            0
                        </span>
                    </button>
                    <button aria-label="Account" className="hover:scale-105 transition-transform"><User size={22} /></button>
                </div>
            </div>
        </nav>
    );
}
