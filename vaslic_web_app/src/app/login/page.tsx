"use client";
import { useState } from "react";
import { login } from "@/app/actions";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const { error } = await login(formData);
        if (error) {
            setErrorMsg(error);
            setSubmitting(false);
        } else {
            // successful login, redirect to vault or home using window.location
            window.location.href = "/vault";
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 overflow-hidden flex flex-col items-center justify-center p-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <div className="w-full max-w-md p-10 bg-[#111] border border-white/10 shadow-2xl space-y-8">
                <div>
                    <h1 className="text-5xl uppercase tracking-tighter text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>VASLIC // TERMINAL</h1>
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 mt-2">Establish authorization link</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMsg && (
                        <div className="p-4 bg-red-950/30 border border-red-500/50 text-red-500 text-xs tracking-widest uppercase">
                            ERROR: {errorMsg}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Comm Link (Email)</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-sm focus:border-cyan-400 outline-none transition-colors uppercase tracking-widest text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Passcode</label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-sm focus:border-cyan-400 outline-none transition-colors tracking-widest text-white"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 uppercase text-xs font-bold tracking-[0.2em] bg-cyan-400 text-black hover:bg-cyan-300 transition-colors flex justify-between items-center px-6 disabled:opacity-50"
                    >
                        <span>{submitting ? "Authenticating..." : "Login to Vault"}</span>
                        {!submitting && <ArrowRight size={16} />}
                    </button>
                </form>

                <div className="pt-8 border-t border-[#333] text-center">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">
                        No access? <Link href="/signup" className="text-white hover:text-cyan-400 transition-colors">Create authorization link</Link>
                    </p>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&family=Bebas+Neue&display=swap');
            `}</style>
        </div>
    );
}
