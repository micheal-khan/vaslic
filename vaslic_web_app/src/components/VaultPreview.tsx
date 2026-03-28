"use client";

// Exact image URLs from Stitch HTML
const retiredDrops = [
    {
        edition: "2023 EDITION",
        name: "OBSIDIAN DRIFT",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBFRXQVhx_ad-IRj9c3dn9lNC381i8eulYpTDNKkYWJioxiadYrEBi9YeXG0laBu1B9s85m-hbLpB1YLrnvc5A9FUL94l5MWs3jDfNTELpeuoXgLuMuR-98Q5LOiwxFtOB5jcQmhUYYcNA1FLUzuYOngQhOlP7ZWCYqgvCuLjgDxBGjXh_ip2Z9A34VCczI_XfT-1FQVzm7doMeke0LPrSRKI8IuqMSH3qhAxAykRQc7Re4t6kaL-0hYtJGeRv6-WN5x3U-sJB_f5g",
    },
    {
        edition: "2022 EDITION",
        name: "DUST ROSE VESTIGE",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCpSE_fH0mbUQ1LY0sIbMTCJUiLU43fiAupKZRkyiV-wyliG1eqUhKRGz0Y0TowHTBsxjy_qNWUJB5is-Ba_6dwZ9KHAP_oT7yEju0TyKRqGCrsnZF8MnTg6TFxD7ghR97qmsmfmAIyvkUOEW1-WDGvyLcqNEh1WaOdur3XQZ_Xpds3ZLNNdiJl3xH-NFpjyhcIeBY9ihfSJNFwV9JVtM5Ybci03POtfEyvi7akj2jglcgXx6wiHhTYLkUtRq6wMW4NODLwDrcD2rk",
    },
    {
        edition: "2021 EDITION",
        name: "MONO BLUR",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDKXSvbwG_KveYjk-FENj3c3hMw0a5IfKx2jETxUhGSeGdX6iAcCx6rsd4t0UBkI9_G2qZzwJER1HImsHlKiVO5O-QFv_iKDEinmCazIf1x5lZBeoqGzkUcMnfZkayCC7-ZL_WntGcruFaMJb5nUm4eQnm3DFHKiM9RhlVPgMaf8LpBsfNZyLIyHhS0USDCd54gsUa9Mxp1lnE-RGPk7N9pR1xwnwqgAHIrgIpM81zhiZSoxB2o3EeaZCaCIbfpPWu_qBfmvmhQA7E",
    },
    {
        edition: "2020 EDITION",
        name: "CYBER REVERIE",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBv1DHE3LJVbE9MG7YxXWZuPtftvhYAW9tipwLWWWJo7NU8B9Vd44I9MhuX70NcI18PgAD6C9CmJbXN-k7vgy4Lhd8IcjZSucXSVbovwc1Jl2fMxOjgEzZCzzPsOoicvCwlAdMVACW7QIb9EYCXOmE7LP5J3G3IzgOOVp2ppOU3apE5mTWG8XDN41AE3rxek-xepNYyBGZLTBE6kRHV8jsju0T1NaexTWuTk7pb1eewPtzLd5vzvQuxkVn_wwQ_Iv2vw0aHh1PMgzs",
    },
];

export function VaultPreview() {
    return (
        <section className="py-24 px-8" style={{ background: "#0a0a0a" }}>
            {/* Heading */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h2 className="font-headline text-4xl md:text-5xl font-bold mb-2" style={{ color: "#4b4b4b" }}>
                    Hall of Retired Designs
                </h2>
                <p className="font-body italic" style={{ color: "#3a3a3a" }}>
                    These designs lived and left. Forever.
                </p>
            </div>

            {/* 4-col grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {retiredDrops.map((drop) => (
                    <div
                        key={drop.name}
                        className="relative bg-neutral-900 group grayscale hover:grayscale-0 transition-all duration-700"
                        style={{ aspectRatio: "1/1" }}
                    >
                        <img
                            src={drop.image}
                            alt={drop.name}
                            className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <span className="font-label text-[10px] text-neutral-500">{drop.edition}</span>
                            <h4 className="text-neutral-400 font-bold text-sm tracking-widest">{drop.name}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* "EXTINCT / REST IN THREADS / VAULTED" banner */}
            <div className="max-w-7xl mx-auto mt-16 py-8 border-y border-neutral-900 flex justify-center gap-24 overflow-hidden">
                {["EXTINCT", "REST IN THREADS", "VAULTED"].map((word) => (
                    <span
                        key={word}
                        className="font-headline font-black text-6xl select-none whitespace-nowrap"
                        style={{ color: "#171717" }}
                    >
                        {word}
                    </span>
                ))}
            </div>
        </section>
    );
}
