"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8">
            <div className="space-y-6 text-center border border-red-900/50 p-12 bg-red-950/10">
                <h2 className="text-4xl text-red-500 uppercase tracking-tighter" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Signal Lost</h2>
                <p className="text-xs uppercase tracking-widest text-neutral-400 max-w-md" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Connection to the vault failed. The archive might be offline or sealed.
                </p>
                <button
                    onClick={() => reset()}
                    className="mt-8 px-8 py-4 bg-red-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-800 transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    Retry Connection
                </button>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&family=Bebas+Neue&display=swap');
            `}</style>
        </div>
    );
}