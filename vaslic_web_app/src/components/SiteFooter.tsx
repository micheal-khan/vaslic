"use client";
import { useState } from "react";
import Link from "next/link";

// 6 footer images from Stitch HTML (Instagram strip)
const footerImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCg4pIHduleFtJrMy50T_ECK-iYUqj7alHd_CyrRgAya0_M2DwB0q8taLs-Q7CCfwE15SFWeTBdYDCkJPGnjX1ELQ66xn0iR0b8y75AUvntUQU9nYOYiGEVQKkm66LpDnNw4vMXXdtxc1u6y7HZcGwgcMvILlsefB3AwH7_BonSnuRn1Uvs3ANG8FEE6SihXpt-K7NcJt_U9mlpnu34HU2JUeRWZJ6rQQJiJXWKre1FOHC_1c0do3egUwsGjC2sjF6EevPurcKSfL8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAzO_m6QgoBXdmmPloR5H6frAR39srJ78ygtMV7h_zNakVvqgKOuiOtyXwJ6TY0WbBx5SeQYXzRXj7_2Y0daO_vLdVd6mxsQ2o718hFeU7i6iCrf54WeVjFu_Ygcgc4rY4Iz35uCmcOTSAlpcrhzue3HiQAdLDUugoxZdaZiLn7KrXJbwjV2bpcYIyu9WL_KE8zDhscr_CNhPtEC-njAQTylTsb5br0DqrVKpR22DpZ3y8l6AmfHKjYgK2yUNz8fNvvAAYSK_UE6K0",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA1VAFd3Kp00Md3xEr9svIvv1juNZd0IJF51iHRUDWv_SyWjE1193nhhCIV7MZ14xHz4m2BDSAk8rgG15iI_AsTn5nd4pymxxLxii2zwAK0wKOweE3y1BbZprIUfy95tzFh0xAoMe8aYV5VY2WZ7DSM2NXhUDb9zZTMHmKpvBJvc3eKEQXntOgv23lsq4jX-L-nbmOS3dDmOKukJdkZHI8UU4N6yalYXY",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC7cfU3od2VnHPmlIE0Z4bNp7532rf8tCwWkhXwJMgn_ZXvUVQO-eczT6YlodxBxxuu3VuIdbv-gRcPpNS2jKfEs7lkxfqgxWzSqX7U_bYMaCQwGWuGYz2o94BMoMG5A7jjht1wNsmBs05wmcfs5aGoRaIRxjg9V1L0625oD9CFf_UO933AZu78AYe-AswlNj9RjrzFcAHrrIqZbWvKyz2Th4n9sVY9Qnj3xmAm3Rru_K8b9TuJGJ9VK3Q6UPIwtr5SEuQCJJ2nNJI",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBF6q0NJcHs4PRUj6E0G3NlnoXlgdhWlXcRBr5gGTy4og9SUzyNxAP4RlZ2oXA3yN9Auzhz2pAwDQXH8Hlxptqr2VOT4xEJQkmTDMi9-FisoedqKp8FHKGL1b6fUMXsIRqWMoM15clxgdk1a2xkh_75u3uip-bz8bH0Ayta1HYSKrAuTCmC3feI1rlJkkVTRfT9rwIQ8rD6PY8KztId9_zbabmwaJ6aCE_a9CaawFUtWWIqjCTn0EhjMIk-MuJrvetkW7DrMWzFOGI",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCXrEYUMdp-9Tm6R6NCsSuSW8gI4Ljcm3KjcAvyr89q1GP9YYPJB5wughCmATLVB-Rpj-XONjS2GiLCBrvZbnLLKf3dIGkjZz4s4KpGMpXMvC3V9OofMT8xYyfQ60SJdGnNsG0en-jd3_spudo-Gaf6yDrTX8R_yK5G9LdYH23lLD_3Lxf-dxZHYYyQoBvWCS8lAKjZsihKz7gldvQbiEEPfwvLOoj8613qmGOeMTZ8mSLw03GayIgk3hm4LjiZA5lChOTGIJ3pxwY",
];

export function SiteFooter() {
    const [email, setEmail] = useState("");

    return (
        <footer style={{ background: "#0a0a0a", borderTop: "1px solid #171717" }}>
            {/* Instagram Strip */}
            <section className="flex flex-wrap md:flex-nowrap overflow-hidden">
                {footerImages.map((src, i) => (
                    <div key={i} className="w-1/3 md:w-1/6 aspect-square grayscale hover:grayscale-0 transition-all duration-500">
                        <img
                            src={src}
                            alt=""
                            aria-hidden="true"
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </section>

            {/* 4-col footer */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 font-body text-sm tracking-wide px-6 md:px-8 pt-16 md:pt-24 pb-12">
                {/* Brand */}
                <div className="space-y-6">
                    <div className="text-2xl font-black text-neutral-200 uppercase font-headline">VASLIC</div>
                    <p className="text-neutral-600 leading-relaxed max-w-xs">
                        Curating the intersection of subculture and high fashion. Limited editions only. No restocks. No compromise.
                    </p>
                </div>

                {/* The Vault */}
                <div className="space-y-4">
                    <h4 className="text-white font-bold uppercase tracking-widest font-headline">The Vault</h4>
                    <ul className="space-y-2">
                        {["Vault Registration", "Curator Program", "Retired Hall", "Shipping & Logistics"].map((item) => (
                            <li key={item}>
                                <Link href="/vault" className="text-neutral-600 hover:text-cyan-400 transition-colors duration-300">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Legal */}
                <div className="space-y-4">
                    <h4 className="text-white font-bold uppercase tracking-widest font-headline">Legal</h4>
                    <ul className="space-y-2">
                        {["Privacy Policy", "Terms of Service", "Cookie Protocol"].map((item) => (
                            <li key={item}>
                                <Link href="#" className="text-neutral-600 hover:text-cyan-400 transition-colors duration-300">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Transmission */}
                <div className="space-y-6">
                    <h4 className="text-white font-bold uppercase tracking-widest font-headline">Transmission</h4>
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ENTER EMAIL"
                            className="w-full bg-neutral-900 border-none px-4 py-3 text-xs tracking-widest font-label text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-cyan-400"
                            aria-label="Email subscription"
                        />
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 font-headline font-bold"
                            style={{ color: "#72d2ff" }}
                            aria-label="Subscribe"
                        >
                            →
                        </button>
                    </div>
                    <div className="flex space-x-4">
                        <button className="text-neutral-600 hover:text-white transition-colors" aria-label="Share">
                            ↗
                        </button>
                        <button className="text-neutral-600 hover:text-white transition-colors" aria-label="Chat">
                            ◻
                        </button>
                        <button className="text-neutral-600 hover:text-white transition-colors" aria-label="Motion">
                            ◎
                        </button>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto mt-0 pt-8 pb-8 px-6 md:px-8 border-t border-neutral-900/50 flex flex-col md:flex-row justify-between items-center text-[10px] text-neutral-700 uppercase tracking-[0.2em] text-center md:text-left">
                <span>© 2024 VASLIC. No reprints. No restocks. No exceptions.</span>
                <span className="mt-4 md:mt-0 font-bold">BUILT FOR THE ETERNAL CURATOR</span>
            </div>
        </footer>
    );
}
