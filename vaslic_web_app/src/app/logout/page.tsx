"use client";
import { useEffect } from "react";
import { logout } from "@/app/actions";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LogoutPage() {
    useEffect(() => {
        logout().then(() => {
            // Wait 1 second before redirect
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 overflow-hidden flex flex-col items-center justify-center p-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <div className="w-full max-w-md p-10 bg-[#111] border border-white/10 shadow-2xl text-center space-y-6">
                <div>
                    <h1 className="text-4xl uppercase tracking-tighter text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>SEVERING LINK</h1>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#ff007f] mt-2">Disposing credentials</p>
                </div>

                <div className="w-full h-1 bg-[#222] relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-[#ff007f] animate-[pulse_1s_infinite] w-full" />
                </div>

                <p className="text-neutral-500 text-xs tracking-widest uppercase">
                    Returning to origin...
                </p>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&family=Bebas+Neue&display=swap');
            `}</style>
        </div>
    );
}
