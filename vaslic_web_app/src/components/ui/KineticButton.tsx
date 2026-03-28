"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface KineticButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary";
    children: React.ReactNode;
}

export const KineticButton = React.forwardRef<HTMLButtonElement, KineticButtonProps>(
    ({ className, variant = "primary", children, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn(
                    "px-8 py-4 font-label text-sm uppercase tracking-widest transition-colors duration-500",
                    variant === "primary"
                        ? "bg-gradient-to-br from-vaslic-primary to-vaslic-primary-container text-[var(--color-vaslic-surface)]"
                        : "ghost-border text-vaslic-on-surface hover:bg-[color-mix(in_srgb,var(--color-vaslic-on-surface)_10%,transparent)]",
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);
KineticButton.displayName = "KineticButton";
