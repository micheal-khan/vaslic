"use client";
import Link from "next/link";

// Exact image URLs from Stitch HTML
const lockedDrops = [
    {
        code: "AETHER-09",
        countdown: "14 DAYS REMAINING",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB-9nJCP47nqZEARzKEP1Nynuk_fZbe80EtJig_s3nz76_VNQLF8hpVBR820RE5J8Pzvx-F_xcwMTpvgabdLuxPRCIFe6p2Q3gKno2YPaqP3O5MDpdux2XBgQYcjkRGkYJgu4ih-QrOR_PXnWbrXJR0-5tHRugAYZUSqUwYdmss_JXvydxZRggGpJ9vQmbP_qdJJAkFL9PxOPqKKgmAORDiY8QA1eYYbgj10C7aVxfeq26VCpSQ9D3P4yyy8ooX59L0mPmQ6HinpjQ",
    },
    {
        code: "BRUT-CORE",
        countdown: "21 DAYS REMAINING",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCX3veFcxWqQfSj1CTEd0PY1TzckSysXdL1QbseIR6-DWo4QwImXX4LQrFYXm7NxDz-RaX40M5RjNnUpLmuyr8PLe7rIgj7m6YfcCZJeGYX7mhJsU_SeOqRX9SjtsFbe5xEGfWiABO_cAHu7nM67X0dKdtNlhS9CY8pZ1IZJ7DA5lGN5T0-lJTQuZo0GViJgf7q4FXRPfpgaTexBR30peIHR-bgPGMRagocyXNzYwMNC2Rnck0NVDVgfbLAKew0CyJQHLTpG4Jo6bU",
    },
    {
        code: "NEO-PLASM",
        countdown: "DROPS FRIDAY",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBV0ivOExBGlhjFFRhZKaFZmTbaC6U3_O9ZCp5tmdmyiOANocAg8qsNAQ0KTocsjh9LqQc7dbBG-gy-A4fJvx6ymujaH55PPaYMnXtxFRIsYdXAamn3olKLIJ3GqetbhZot4k0Pt-LEdaWwHPIeZ-EDEL5DTZ_hos7t6pSlKd-tYEoqoavNFncZpNqz5zQh5aGciklEumWU3f2fZPOLYBWD2B7fgtHZrL7PZ1Uca0sgsBsCpnsU5k4Sn0KffFHcU1LLn62vs6kJil0E",
    },
];

export function PipelineSection() {
    return (
        <section className="py-24 px-8" style={{ background: "#131313" }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div className="max-w-2xl">
                        <span
                            className="font-label tracking-[0.4rem] uppercase block"
                            style={{ color: "#72d2ff" }}
                        >
                            The Pipeline
                        </span>
                        <h2 className="font-headline text-5xl md:text-7xl font-bold mt-4 leading-none text-white">
                            Approaching the <br /> Vault Doors.
                        </h2>
                    </div>
                    <Link
                        href="/waitlist"
                        className="mt-8 md:mt-0 inline-block font-label text-sm font-bold uppercase tracking-widest px-10 py-4 hover:translate-x-2 transition-transform duration-300"
                        style={{ background: "#72d2ff", color: "#003548" }}
                    >
                        Join Waitlist
                    </Link>
                </div>

                {/* 3 Locked Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {lockedDrops.map((drop) => (
                        <div
                            key={drop.code}
                            className="group relative overflow-hidden grayscale"
                            style={{ aspectRatio: "4/5", background: "#20201f" }}
                        >
                            <img
                                src={drop.image}
                                alt=""
                                aria-hidden="true"
                                className="w-full h-full object-cover blur-md opacity-40 scale-110"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 border border-white/5">
                                {/* Lock icon using unicode */}
                                <span className="text-6xl text-white/20 mb-4 select-none" aria-hidden="true">
                                    🔒
                                </span>
                                <h3 className="font-headline text-2xl font-bold uppercase tracking-widest text-white/40">
                                    {drop.code}
                                </h3>
                                <div className="mt-4 flex items-center gap-2 font-label text-xs" style={{ color: "#72d2ff" }}>
                                    <span aria-hidden="true">⏱</span>
                                    <span>{drop.countdown}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
