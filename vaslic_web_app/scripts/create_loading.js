const fs = require('fs');

const dirs = [
    'avant-garde', 'bohemian', 'gothic', 'street', 'funky', 'products/[vaultId]'
];
const root = 'd:/vaslic/stich/vaslic_web_app/src/app';

const loadingContent = `export default function Loading() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8">
            <div className="space-y-6 text-center">
                <div className="w-full h-1 bg-[#222] relative overflow-hidden max-w-sm mx-auto">
                    <div className="absolute inset-y-0 left-0 bg-white animate-[pulse_1s_infinite] w-full" />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-500">Loading Archive...</p>
            </div>
            <style>{\`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&display=swap');
                div { font-family: 'Space Grotesk', sans-serif; }
            \`}</style>
        </div>
    );
}`;

const errorContent = `"use client";
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
            <style>{\`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&family=Bebas+Neue&display=swap');
            \`}</style>
        </div>
    );
}`;

dirs.forEach(dir => {
    fs.writeFileSync(`${root}/${dir}/loading.tsx`, loadingContent);
    fs.writeFileSync(`${root}/${dir}/error.tsx`, errorContent);
});
console.log('Created loading and error states.');
