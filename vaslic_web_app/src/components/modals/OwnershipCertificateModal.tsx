"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Download, ShieldCheck } from "lucide-react";

interface CertificateProps {
    isOpen: boolean;
    onClose: () => void;
    assetName: string;
    era: string;
    vaultId: string;
    edition: string;
    ownerEmail: string;
    issueDate: string;
    retirementDate: string;
    themeColor?: string; // e.g. #8b0000 for Gothic
}

export default function OwnershipCertificateModal({
    isOpen,
    onClose,
    assetName,
    era,
    vaultId,
    edition,
    ownerEmail,
    issueDate,
    retirementDate,
    themeColor = "#72d2ff", // Default to cyan
}: CertificateProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto selection:bg-[#72d2ff] selection:text-black font-body">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        onClick={onClose}
                    />

                    {/* Close Button */}
                    <motion.button
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onClick={onClose}
                        className="fixed top-6 right-6 text-white hover:text-[#72d2ff] transition-colors z-[60] p-2 bg-black/40 rounded-full md:bg-transparent md:p-0"
                    >
                        <X size={32} strokeWidth={1} />
                    </motion.button>

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-4xl z-10 my-auto"
                    >
                        {/* Certificate Card */}
                        <div className="relative bg-[#0e0e0e] border border-white/10 p-8 md:p-16 overflow-hidden shadow-2xl">

                            {/* Abstract Decorative Lines */}
                            <div className="absolute top-0 right-0 w-1/4 h-[2px] opacity-40 bg-gradient-to-l from-transparent to-[#72d2ff]/80" />
                            <div className="absolute bottom-1/4 left-0 w-[2px] h-1/2 opacity-40 bg-gradient-to-t from-transparent via-[#ffb4a8]/80 to-transparent" />

                            {/* Background Motifs */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg fill="none" height="800" stroke="white" strokeWidth="0.5" viewBox="0 0 100 100" width="600">
                                        <path d="M10 90 L10 40 Q50 -10 90 40 L90 90"></path>
                                        <path d="M25 90 L25 50 Q50 15 75 50 L75 90"></path>
                                    </svg>
                                </div>
                                <div className="absolute bottom-0 right-0 opacity-100 text-white">
                                    <svg height="300" viewBox="0 0 100 100" width="300">
                                        <polygon fill="currentColor" points="0,100 100,100 100,0"></polygon>
                                    </svg>
                                </div>
                            </div>

                            {/* Certificate Content */}
                            <div className="relative z-10 flex flex-col h-full min-h-[600px]">

                                {/* Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                                    <div className="flex items-center gap-4">
                                        {/* VASLIC Geometric Logo */}
                                        <div className="w-12 h-12 bg-white flex items-center justify-center">
                                            <svg fill="none" height="32" viewBox="0 0 32 32" width="32">
                                                <path d="M16 4L28 24H4L16 4Z" fill="black"></path>
                                            </svg>
                                        </div>
                                        <span className="font-headline font-black text-2xl tracking-tighter text-white">VASLIC</span>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <p className="font-label text-xs tracking-[0.3em] text-zinc-500 mb-1 uppercase font-bold">Authenticity Protocol</p>
                                        <p className="font-headline font-bold text-lg tracking-tight uppercase" style={{ color: themeColor }}>Encrypted Digital Asset</p>
                                    </div>
                                </div>

                                {/* Title Section */}
                                <div className="mb-12">
                                    <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6 uppercase text-white">
                                        Official Certificate <br />
                                        <span className="text-zinc-400 font-bold" style={{ color: themeColor }}>of Ownership</span>
                                    </h1>
                                    <div className="h-1 w-24" style={{ backgroundColor: themeColor }}></div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16 mb-16">
                                    {/* Product Focus */}
                                    <div className="space-y-1 col-span-1 md:col-span-2 lg:col-span-1">
                                        <p className="font-label text-[10px] tracking-widest text-zinc-500 uppercase font-bold text-outline">Asset Designation</p>
                                        <h2 className="font-headline text-3xl font-bold uppercase text-white tracking-tight">{assetName}</h2>
                                        <p className="font-body text-sm font-bold tracking-widest uppercase mt-2" style={{ color: themeColor }}>{era}</p>
                                    </div>

                                    {/* Sub Grid for Specs/Data */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 col-span-1 md:col-span-2 lg:col-span-1">
                                        {/* Technical Specs */}
                                        <div className="space-y-6">
                                            <div>
                                                <p className="font-label text-[10px] tracking-widest text-zinc-500 uppercase text-outline font-bold mb-1">Vault ID</p>
                                                <p className="font-headline font-medium text-white">{vaultId}</p>
                                            </div>
                                            <div>
                                                <p className="font-label text-[10px] tracking-widest text-zinc-500 uppercase text-outline font-bold mb-1">Edition</p>
                                                <p className="font-headline font-medium text-white">{edition}</p>
                                            </div>
                                        </div>

                                        {/* Ownership Data */}
                                        <div className="space-y-6">
                                            <div>
                                                <p className="font-label text-[10px] tracking-widest text-zinc-500 uppercase text-outline font-bold mb-1">Registered Owner</p>
                                                <p className="font-headline text-md text-white font-medium break-all">{ownerEmail}</p>
                                            </div>
                                            <div className="flex flex-col xs:flex-row gap-6">
                                                <div>
                                                    <p className="font-label text-[10px] tracking-widest text-zinc-500 uppercase text-outline font-bold mb-1">Issuance</p>
                                                    <p className="font-body text-sm text-white font-medium">{issueDate}</p>
                                                </div>
                                                <div>
                                                    <p className="font-label text-[10px] tracking-widest text-zinc-500 uppercase text-outline font-bold mb-1">Retirement</p>
                                                    <p className="font-body text-sm text-white font-medium">{retirementDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Verification Seal */}
                                    <div className="col-span-1 md:col-span-2 flex items-end justify-center md:justify-end mt-4">
                                        <div className="relative group">
                                            {/* Holographic Ring */}
                                            <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse"></div>
                                            <div className="w-32 h-32 rounded-full border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center p-4 text-center">
                                                <ShieldCheck className="mb-2" size={24} color={themeColor} />
                                                <p className="font-label text-[8px] leading-tight text-zinc-400 font-bold tracking-wider">VASLIC KINETIC<br />ENCRYPTION SEAL</p>
                                                <p className="font-label text-[8px] mt-2 font-black tracking-widest" style={{ color: themeColor }}>SECURED</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Rule */}
                                <div className="mt-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
                                    <div className="max-w-xs w-full text-center md:text-left">
                                        <p className="font-headline italic text-lg md:text-xl text-zinc-600 font-bold tracking-tight">&quot;Once it&apos;s gone, it&apos;s gone. Forever.&quot;</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-6 md:mt-0">
                                        <button className="flex items-center justify-center gap-3 px-6 py-4 border border-white/20 text-white font-label text-[10px] font-bold tracking-widest uppercase hover:bg-white/5 transition-all duration-300 active:scale-95">
                                            <Share2 size={16} />
                                            Share Certificate
                                        </button>
                                        <button
                                            className="flex items-center justify-center gap-3 px-8 py-4 text-black font-label text-[10px] font-black tracking-[0.2em] uppercase hover:-translate-y-1 transition-all duration-300 active:scale-95 shadow-xl"
                                            style={{ backgroundColor: themeColor }}
                                        >
                                            <Download size={16} strokeWidth={3} />
                                            Download Asset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Page-level curation hint */}
                        <div className="mt-8 text-center text-zinc-500">
                            <p className="font-label text-[8px] tracking-[0.4em] uppercase font-bold">Digitally curated for the VASLIC kinetic ecosystem</p>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
