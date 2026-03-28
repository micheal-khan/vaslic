"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="relative">
            <AnimatePresence mode="wait">
                <motion.div key={pathname} className="relative">
                    {/* ── High-Speed 'Flash of Dark' Overlay ── */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 z-[9999] bg-black pointer-events-none"
                    />

                    {/* ── Page Content ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
