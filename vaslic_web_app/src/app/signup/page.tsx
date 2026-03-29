"use client";
import { useState } from "react";
import { signup } from "@/app/actions";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const { error, success } = await signup(formData);
        if (error) {
            setErrorMsg(error);
            setSubmitting(false);
        } else if (success) {
            setSuccess(true);
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 overflow-hidden flex flex-col items-center justify-center p-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <div className="w-full max-w-md p-10 bg-[#111] border border-white/10 shadow-2xl space-y-8 relative">
                <Link href="/login" className="absolute -top-12 left-0 text-[10px] uppercase tracking-widest text-[#aaa] hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft size={12} /> Return to login
                </Link>

                <div>
                    <h1 className="text-5xl uppercase tracking-tighter text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>INITIATE</h1>
                    <p className="text-xs uppercase tracking-[0.2em] mt-2 text-[#ff007f]">Create new authorization protocol</p>
                </div>

                {success ? (
                    <div className="p-8 text-center space-y-4 border border-[#ff007f]/50 bg-[#ff007f]/5">
                        <CheckCircle2 size={48} className="mx-auto text-[#ff007f]" />
                        <h2 className="text-xl uppercase font-bold tracking-widest text-white">PROTOCOL ESTABLISHED</h2>
                        <p className="text-xs text-neutral-400">Please check your inbox to confirm the transmission before proceeding to the vault.</p>
                        <Link href="/login" className="block mt-8 py-3 w-full bg-[#ff007f] text-black font-bold uppercase tracking-[0.2em] text-[10px]">
                            Acknowledge
                        </Link>
                    </div>
                ) : (
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
                                    className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-sm focus:border-[#ff007f] outline-none transition-colors uppercase tracking-widest text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Passcode</label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-sm focus:border-[#ff007f] outline-none transition-colors tracking-widest text-white"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 uppercase text-xs font-bold tracking-[0.2em] bg-[#ff007f] text-black hover:brightness-110 transition-all disabled:opacity-50"
                        >
                            {submitting ? "Encrypting..." : "Create Authority"}
                        </button>
                    </form>
                )}

                <div className="pt-8 border-t border-[#333] text-center">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">
                        VASLIC KINETIC ARCHIVE // 2024
                    </p>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&family=Bebas+Neue&display=swap');
            `}</style>
        </div>
    );
}
