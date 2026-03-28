import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    level?: "lowest" | "low" | "container" | "high" | "highest";
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, children, level = "lowest", ...props }, ref) => {

        const bgClasses = {
            lowest: "bg-vaslic-surface-lowest",
            low: "bg-vaslic-surface-low",
            container: "bg-vaslic-surface-container",
            high: "bg-vaslic-surface-high",
            highest: "bg-vaslic-surface-highest",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "relative overflow-hidden p-8 glass ghost-border transition-colors duration-500",
                    bgClasses[level],
                    className
                )}
                {...props}
            >
                <div className="relative z-10">{children}</div>

                {/* Geometric Motif */}
                <div
                    className="absolute -bottom-12 -right-12 opacity-[0.04] pointer-events-none transition-colors duration-500"
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: "80px solid transparent",
                        borderRight: "80px solid transparent",
                        borderBottom: "80px solid var(--color-vaslic-on-surface)",
                        transform: "rotate(-15deg)"
                    }}
                />
            </div>
        );
    }
);
GlassCard.displayName = "GlassCard";
