import Link from "next/link";

export default function StreetNavbar() {
    const YELLOW = "#f5e642";

    return (
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
                    <div className="relative cursor-pointer transition-transform hover:scale-105">
                        <span className="material-symbols-outlined">shopping_bag</span>
                        <span
                            className="absolute -top-1.5 -right-1.5 text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                            style={{ background: YELLOW, fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            0
                        </span>
                    </div>
                    <span className="material-symbols-outlined cursor-pointer hover:scale-105 transition-transform">account_circle</span>
                </div>
            </div>
        </nav >
    );
}
