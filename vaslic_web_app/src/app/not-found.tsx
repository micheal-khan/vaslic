"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HomeNavbar from "@/components/navbars/HomeNavbar";
import { SiteFooter } from "@/components/SiteFooter";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }
};

export default function NotFoundPage() {
    return (
        <div className="bg-[#0e0e0e] text-white min-h-screen selection:bg-[#72d2ff] selection:text-black font-body overflow-x-hidden relative"
            style={{ backgroundImage: `radial-gradient(#1c1b1b 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>

            {/* Header */}
            <HomeNavbar />

            <main className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-12 overflow-hidden w-full max-w-[100vw]">
                {/* Subtle Triangle Motif (VASLIC Identity) */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
                    <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-[#72d2ff]" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}></div>
                    <div className="absolute bottom-[5%] right-[5%] w-[32rem] h-[32rem] bg-[#72d2ff] rotate-180" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}></div>
                </div>

                <section className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center">
                    {/* 404 Large Display */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative mb-8"
                    >
                        <h1 className="text-[clamp(8rem,25vw,22rem)] font-black font-headline leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 select-none pb-4"
                            style={{ textShadow: "2px 0 #72d2ff, -2px 0 #ffb4a8" }}>
                            404
                        </h1>
                        <div className="absolute top-8 -right-4 md:-top-0 md:-right-8 px-4 py-1 bg-[#72d2ff] text-black font-black uppercase tracking-widest text-xs md:text-sm shadow-xl">
                            Status: Decommissioned
                        </div>
                    </motion.div>

                    {/* Headline and Subtext */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6 max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-headline uppercase tracking-tight text-white leading-[1.1]">
                            THIS DESIGN HAS BEEN <span className="text-[#72d2ff]">RETIRED</span>
                        </h2>
                        <p className="text-lg md:text-xl font-medium leading-relaxed text-zinc-400 font-body px-4">
                            The piece of history you&apos;re looking for has either never existed or was moved into the Vault long ago. Once it&apos;s gone, it&apos;s gone. <span className="italic font-bold text-white">Forever.</span>
                        </p>
                    </motion.div>

                    {/* Kinetic CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-12 flex flex-col md:flex-row gap-6 w-full md:w-auto"
                    >
                        <Link href="/" className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#72d2ff] hover:bg-white text-black font-black font-headline uppercase tracking-widest transition-all hover:-translate-y-1 active:scale-95 duration-200">
                            Return to Curations
                            <ArrowRight className="ml-3 transition-transform group-hover:translate-x-1" size={20} strokeWidth={3} />
                        </Link>
                        <Link href="/vault" className="group inline-flex items-center justify-center px-10 py-5 border-2 border-zinc-700 text-white font-black font-headline uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all hover:-translate-y-1 active:scale-95 duration-200">
                            Explore the Vault
                        </Link>
                    </motion.div>
                </section>

                {/* Asymmetric Detail: Security Stamp */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-12 right-12 hidden lg:block border border-[#72d2ff]/30 p-4 font-headline text-[10px] uppercase tracking-[0.3em] text-[#72d2ff]/50 bg-black/40 backdrop-blur"
                >
                    <div className="mb-1">Auth_Ref: 0x404_NULL</div>
                    <div className="mb-1">Timestamp: ERROR_UNKNOWN</div>
                    <div>Location: VAULT_SECTOR_7</div>
                </motion.div>
            </main>

            {/* Content Section: The "Vault" Preview (Bento Style) */}
            <section className="bg-[#1c1b1b] px-6 md:px-8 py-24 relative overflow-hidden border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-xl">
                            <h3 className="text-4xl font-black font-headline uppercase leading-none text-white mb-4">Lost in the Archive?</h3>
                            <p className="text-zinc-400 font-medium text-lg leading-relaxed">While this page has been purged, our most iconic legacies remain accessible within the curated vaults.</p>
                        </div>
                        <div className="flex items-center gap-2 text-[#72d2ff] font-bold uppercase font-headline tracking-widest text-xs hidden md:flex">
                            Vault Index 01-09
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]"
                    >
                        {/* Bento Item 1 */}
                        <motion.div variants={itemVariants} className="md:col-span-8 group relative overflow-hidden bg-black md:h-auto min-h-[300px]">
                            <img alt="Legacy Hardware" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCgLjlm2HW4f8pjP1vkMcRlXB2PrnjBEAjF2usLTtnd0ryQIffM39xHBPPayXkOlWATBDXykOSIxFXnW1N1bE07ZJ6WkfFmDxD_Qh94gX1Ky-Zi24jrTX8wmoYEWlPa0Qb7QO640xWNTbHk4oxeDjDDEFPd8RGQP-vU_waRSvR_I1aeHPEFTubX55R65u70Pa9tC6djtxNyVmzTPthvW_BieZfd9bJClRywMNzYNChFtn0CMV-nBZPrpInjEqEhMwuT99KN3SM_uE" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 pr-8 text-left z-10">
                                <span className="text-[#72d2ff] text-xs font-black font-headline uppercase tracking-widest block mb-2">Legacy Hardware</span>
                                <h4 className="text-2xl font-bold text-white uppercase font-headline">The Analog Collection</h4>
                            </div>
                        </motion.div>

                        {/* Bento Item 2 */}
                        <motion.div variants={itemVariants} className="md:col-span-4 group relative overflow-hidden bg-black md:h-auto min-h-[300px]">
                            <img alt="Artistic Purge" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq1uMLiDOwMUdcHblnetJN3TS9AOTYEqtJf2i9ZpWwYNF0bqFf6iBSZeVwMH9fLwUdES1RHpWl52WoWkytusjGJJ_4-3HIT--B3swBQ-hwup-6xuEp8Pofsb2A7U5F8Qy3xc7z1J8Vser6WmqCF5rKPsQGTqXuv1mdL6N3DF8Rdx20vPBrrNoUCpJBay19KEi6TfGMcHfH-AqEmQIMImy0ogH6Qft28PYDFa-GgsxGTLTI015Q2_-IDsK8AGq6EeUoOkqjiHWemSU" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 pr-8 text-left z-10">
                                <span className="text-[#ffb4a8] text-xs font-black font-headline uppercase tracking-widest block mb-2">Artistic Purge</span>
                                <h4 className="text-2xl font-bold text-white uppercase font-headline">Brutalist Forms</h4>
                            </div>
                        </motion.div>

                        {/* Bento Item 3 */}
                        <motion.div variants={itemVariants} className="md:col-span-4 group relative overflow-hidden bg-black md:h-auto min-h-[300px]">
                            <img alt="Architecture" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoLJu2FxYd0GbQQ-T44tw_APZureKp3LtCMtqRej5VSKV8sOOImsE99CLnJ9w1X83jV6G5LPD38Q8LxvqUiMMZDP1mLjXb4y1Ir2SZONJzLASCasoD6dvpEunpTLRk_UXnVbUT5dRy4Lml0HwyGAE5GFDGeHNCzSLjOJsDAoLCpfrnR26-P4D4c9bHOvf_O22dK4Py1FxE9yhe8InJ2kxi1utQtmhfIJqSljbpSwYq0EitqT6kLsJTzbnhUCznBZiMAlT-uYCHsxM" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 pr-8 text-left z-10">
                                <span className="text-[#d8ca23] text-xs font-black font-headline uppercase tracking-widest block mb-2">Architecture</span>
                                <h4 className="text-2xl font-bold text-white uppercase font-headline">Void Structures</h4>
                            </div>
                        </motion.div>

                        {/* Bento Item 4 */}
                        <motion.div variants={itemVariants} className="md:col-span-8 group relative overflow-hidden bg-black md:h-auto min-h-[300px]">
                            <img alt="Systems" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt1CoEIQ-gPzfDSWQpCOhh4PcvoehElHy1llWDET6Jp0Kz-lMlaHqLcxdsRzz9O6yvvh6awPek3SMGVgGYgAbWUcoQpH19Se95GVgq-plQVUHtC75G1H2VPCO_0_pdrdSpNB0zQuH24cMn2V2nIjpcwzHjTHNCjJZyo2YOohrzh668XQLL_6shZ_kz5TK3uX2UkJevoj5iq9RLrE22VCzvGAWiDrIuHGA-fSENqejw7oNA7iJhu-0rRqjK46yJrG4SP0u995FmoyI" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 pr-8 text-left z-10">
                                <span className="text-[#008DB9] text-xs font-black font-headline uppercase tracking-widest block mb-2">Systems</span>
                                <h4 className="text-2xl font-bold text-white uppercase font-headline">Decommissioned AI</h4>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <SiteFooter />
        </div>
    );
}
