"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const themes = ["avant-garde", "gothic", "bohemian", "street", "funky"];

export function ThemeSwitcher() {
    const [theme, setTheme] = useState("avant-garde");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 p-2 bg-vaslic-surface-highest/60 backdrop-blur-[20px] ghost-border ambient-shadow transition-colors duration-500">
                {themes.map((t) => (
                    <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={cn(
                            "px-5 py-3 text-xs font-label uppercase tracking-widest transition-all duration-300",
                            theme === t
                                ? "bg-vaslic-primary text-[var(--color-vaslic-surface)] font-bold shadow-lg"
                                : "text-vaslic-on-surface hover:text-vaslic-primary hover:bg-[color-mix(in_srgb,var(--color-vaslic-on-surface)_5%,transparent)]"
                        )}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </div>
    );
}
