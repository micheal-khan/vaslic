"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ThemeDock() {
    const pathname = usePathname();

    const themes = [
        { id: "gothic", color: "#8b0000", href: "/gothic", tooltip: "Gothic" },
        { id: "bohemian", color: "#c77b4a", href: "/bohemian", tooltip: "Bohemian" },
        { id: "avant-garde", color: "#008DB9", href: "/avant-garde", tooltip: "Avant-Garde" },
        { id: "street", color: "#f5e642", href: "/street", tooltip: "Street" },
        { id: "funky", color: "#00f5d4", href: "/funky", tooltip: "Funky" },
    ];

    return (
        <div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[40] flex items-center gap-7 px-8 py-4 rounded-full shadow-2xl pointer-events-auto"
            style={{
                background: "rgba(15, 15, 15, 0.65)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.08)"
            }}
        >
            {themes.map((t) => {
                // To determine if active, check if pathname starts with the href base.
                const isActive = pathname?.startsWith(t.href);

                return (
                    <Link key={t.id} href={t.href} className="group relative flex items-center justify-center w-6 h-6">
                        <div
                            className="w-3 h-3 transition-all duration-300"
                            style={{
                                backgroundColor: t.color,
                                opacity: isActive ? 1 : 0.4,
                                transform: `rotate(45deg) scale(${isActive ? 1.4 : 1})`,
                                boxShadow: isActive ? `0 0 15px ${t.color}` : "none",
                            }}
                        />
                        {/* Tooltip */}
                        <div
                            className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[10px] uppercase tracking-[0.2em] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            {t.tooltip}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
