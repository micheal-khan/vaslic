"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, ArrowRight, CheckCircle2, Bookmark } from "lucide-react";
import BohemianNavbar from "@/components/navbars/BohemianNavbar";
import ThemeDock from "@/components/ThemeDock";
import { addWishlistItem } from "@/app/wishlist/actions";
import { useCart } from "@/contexts/CartContext";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const TERRA = "#c77b4a";
const LINEN = "#f5ebe0";
const LINEN2 = "#ede1d4";

const SIZES = ["XS", "S", "M", "L", "XL"];

const careItems = [
    { icon: "ac_unit", title: "Cold Bathing Only", desc: "Gentle hand wash in cold water using pH-neutral organic soaps to preserve fiber integrity." },
    { icon: "sunny", title: "Shadow Drying", desc: "Avoid direct sunlight. Lay flat on a light-colored towel in a shaded, ventilated area." },
    { icon: "iron", title: "Minimal Steam", desc: "Use low-temperature steam only. Do not apply iron surface directly to the pressed textures." },
];

export default function BohemianProductClient({ product }: { product: any }) {
    const [selectedSize, setSelectedSize] = useState("M");
    const [ctaHovered, setCtaHovered] = useState(false);
    const { addToCart } = useCart();

    // For waiting list
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isJoined, setIsJoined] = useState(false);

    // Wishlist logic
    const [wishlisting, setWishlisting] = useState(false);
    const [wishlistAdded, setWishlistAdded] = useState(false);

    const isLive = product.status === "live";

    const handleWishlist = async () => {
        setWishlisting(true);
        const { success } = await addWishlistItem(product.id);
        if (success) {
            setWishlistAdded(true);
            setTimeout(() => setWishlistAdded(false), 3000);
        }
        setWishlisting(false);
    };

    // Use images from DB or fallbacks
    const images = product.images || [];
    const HERO_IMG = images[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuCCPHyCfFJYT_djJQ_ri6FJiD4IgWoZtrZFED2ne0sg_tz9Dpr5uPBx_IXqSNltKUYJ1G3FFM5yfWkycAlFloqSKG9En6Y3aAFw-7BIJAkdKCQz7LkKvDa4pxfRnZCUN54eNY_Kj8Zn4Ubkla_ui3OkbO_vD-chX0SS8AyReDmjPV4GfRiBBVdLyMOxCQi9pXQT2x0ou-4R9Ha6Eb-VV5rTgGClXANLkqgD_WCV-XAES8NFw0j7m47kTmdPwaqLnsctYd5yCldP37c";
    const THUMB_IMGS = images.length >= 3 ? images.slice(1, 4) : [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAkxDHiqzXSqA2B04fMAHA94rvuIhjESK99eUsvzH3q7BRD8bCi_SkMwXzNP65Rvv2A9OhHef_OWFeu0j5T4sKV6LqUuMvno_f0Nfv0NNmEw4x7CB9kgNg93ifbw4aW2O_zfwruiaYKWTO9WjBAhICC8A0RLNXHaQkZ97Uw-bzJ2ddtsolrxORxcXdrXsXUyPKoePspy79ESDmyieI7hVKYhSKY27BIjxQwC4SAUy8h76eJ1AeB6r9MkEGA5GoIVkz1D5CN65YwSt4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAVHnX1wBrJs_eDdNCQ8XHBaAXTJwx704Kvz0-RZozKkdC5E2Vko1tWUC3wNk0giGIJknXXyD07kBaAgj-B4JRzdQGZ5IXdfcmJYPxT0-hcAny2kfEEa43fSY4RxAXfz0SDqSIBW8sGTUGstvbiUGV1e-Yeif7X_GvM0GpBmgolVIPTwT_4Q6CsgnxOYNBvtDzZDabTIGJDetyvcPZXZTu_ES_cBhUKlVlQ4oJOaEauax2ePoMIjVknKez0d_3GW2IH45eNO8rtyoQ",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBa7STNR6Po7eE5ZOc133W8NV4pWErwi1Fqie7k-fsFjXN7aFhk1m37GgirIB_OPokyLWV8pdYqd3MV16D448k0Fw07bN9rwITBCXh5WwIrk3SKBq_6LlU0FAinwn-DrUQ5Z-iwkrC3XCg8r8yPZeJtNi4ORcr0Qq_ihGVtyF4ygq_hDsCejb33mIdodRvAXvjeHgJQwrgRPrX-8sbtViRcb4ECS1p-UmUgmqrmktxv9Ra6nFklbUM0wxLTIknznUETK8Z1i1seyYk",
    ];

    const handleJoinWaitlist = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsJoined(true);
            setEmail("");
        }, 1500);
    };

    const handleAddToCart = () => {
        addToCart({
            id: `${product.id}-${selectedSize}`,
            product_id: product.id,
            name: product.name,
            price: product.price,
            image: HERO_IMG,
            size: selectedSize,
            vault_id: product.vault_id,
            quantity: 1,
            category_slug: product.category?.slug || "bohemian",
        });
    };

    return (
        <div
            className="min-h-screen overflow-x-hidden"
            style={{ background: LINEN, color: "#1c1917", fontFamily: "'Manrope', sans-serif" }}
        >
            {/* ── Navigation ── */}
            <BohemianNavbar />

            <main className="pt-24 min-h-screen">
                {/* ── Hero: Split Screen ── */}
                <section className="flex flex-col lg:flex-row min-h-[921px]">
                    {/* Left: Gallery (3/5) */}
                    <div className="w-full lg:w-3/5 p-4 lg:p-8 flex flex-col gap-4">
                        {/* Hero image with Vault ID badge */}
                        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5", background: "#e7ddd3" }}>
                            <img
                                src={HERO_IMG}
                                alt={`${product.name} — Hero`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-8 left-8">
                                <span
                                    className="px-4 py-2 text-xs uppercase tracking-widest border"
                                    style={{
                                        background: `${LINEN}cc`,
                                        backdropFilter: "blur(12px)",
                                        borderColor: "rgba(28,25,23,0.1)",
                                        color: "#292524",
                                        fontFamily: "'Space Grotesk', sans-serif",
                                    }}
                                >
                                    Vault ID: {product.vault_id}
                                </span>
                            </div>
                        </div>
                        {/* Thumbnail strip */}
                        <div className="grid grid-cols-3 gap-4 h-32 md:h-48">
                            {THUMB_IMGS.map((src: string, i: number) => (
                                <div key={i} className="overflow-hidden" style={{ background: "#e7ddd3" }}>
                                    <img
                                        src={src}
                                        alt={`Thumbnail ${i + 1}`}
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product info (2/5) */}
                    <div
                        className="w-full lg:w-2/5 p-8 lg:p-16 flex flex-col justify-center"
                        style={{ background: `${LINEN2}4d` }}
                    >
                        <div className="max-w-md">
                            <p
                                className="uppercase tracking-[0.3em] mb-4 text-xs"
                                style={{ color: "#78716c", fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                {isLive ? "Curated Edition" : "Upcoming Release"}
                            </p>
                            <h1
                                className="mb-6 leading-tight"
                                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#292524" }}
                            >
                                {product.name}
                            </h1>
                            <div className="flex items-baseline gap-4 mb-8">
                                <span
                                    className="text-3xl font-bold"
                                    style={{ color: TERRA, fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    ${product.price}
                                </span>
                                {product.compare_price && (
                                    <span className="line-through text-sm" style={{ color: "#a8a29e" }}>
                                        Original ${product.compare_price}
                                    </span>
                                )}
                            </div>
                            <p className="leading-relaxed mb-10 text-lg" style={{ color: "#57534e" }}>
                                {product.description || "An intimate collection of hand-pressed textures and organic silhouettes. Curated for the modern minimalist who finds beauty in the ephemeral."}
                            </p>

                            {/* Size selector */}
                            <div className="mb-10">
                                <p
                                    className="text-xs uppercase tracking-widest mb-4"
                                    style={{ color: "#292524", fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    Select Silhouette Size
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {SIZES.map((sz) => (
                                        <button
                                            key={sz}
                                            onClick={() => setSelectedSize(sz)}
                                            className="w-12 h-12 flex items-center justify-center text-sm transition-colors"
                                            style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                border: selectedSize === sz ? `2px solid ${TERRA}` : "1px solid #d6d3d1",
                                                background: selectedSize === sz ? TERRA : "transparent",
                                                color: selectedSize === sz ? "white" : "#57534e",
                                            }}
                                        >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Conditional Buy Now or Join Waiting List */}
                            <div className="space-y-6">
                                {isLive ? (
                                    <>
                                        {/* Scarcity indicator */}
                                        <div
                                            className="p-6"
                                            style={{ background: `${TERRA}0d`, borderLeft: `4px solid ${TERRA}` }}
                                        >
                                            <div className="flex justify-between items-end mb-2">
                                                <span
                                                    className="text-[10px] uppercase tracking-widest font-bold"
                                                    style={{ color: TERRA, fontFamily: "'Space Grotesk', sans-serif" }}
                                                >
                                                    Units Remaining
                                                </span>
                                                <span
                                                    className="font-bold"
                                                    style={{ color: TERRA, fontFamily: "'Space Grotesk', sans-serif" }}
                                                >
                                                    {product.units_remaining} / {product.total_units}
                                                </span>
                                            </div>
                                            {/* Progress bar */}
                                            <div className="w-full h-1" style={{ background: "#e7e5e4" }}>
                                                <div className="h-full" style={{ width: `${(product.units_remaining / product.total_units) * 100}%`, background: TERRA }} />
                                            </div>
                                            <p className="mt-3 text-xs italic" style={{ color: "#78716c" }}>
                                                Edition 1 of {product.total_units} — Never Reprinted. Once it&apos;s gone, it&apos;s gone. Forever.
                                            </p>
                                        </div>

                                        <button
                                            onClick={handleAddToCart}
                                            className="w-full py-5 font-bold uppercase tracking-widest flex items-center justify-center gap-4 transition-all"
                                            style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                background: ctaHovered ? "#292524" : TERRA,
                                                color: "white",
                                                transform: ctaHovered ? "translateX(4px)" : undefined,
                                            }}
                                            onMouseEnter={() => setCtaHovered(true)}
                                            onMouseLeave={() => setCtaHovered(false)}
                                        >
                                            Secure Piece
                                            <ArrowRight
                                                size={16}
                                                style={{ transform: ctaHovered ? "translateX(8px)" : undefined, transition: "transform 0.2s" }}
                                            />
                                        </button>
                                    </>
                                ) : (
                                    <div className="space-y-4">
                                        <div
                                            className="p-4 border border-dashed text-center"
                                            style={{ borderColor: "rgba(0,0,0,0.2)", background: "rgba(0,0,0,0.02)" }}
                                        >
                                            <span className="text-xs uppercase tracking-widest text-[#57534e]">Vault status: {product.status === 'retired' ? 'Resource Depleted / Legacy Archives' : 'Locked / Pending Release'}</span>
                                        </div>

                                        {!isJoined ? (
                                            <form onSubmit={handleJoinWaitlist} className="space-y-4">
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="ENTER COMM LINK (EMAIL)"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-white/50 border border-[#d6d3d1] px-6 py-5 text-sm outline-none focus:border-[#292524] transition-colors uppercase tracking-[0.2em] text-[#292524]"
                                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full py-6 text-white text-sm uppercase tracking-[0.3em] font-black relative transition-all"
                                                    style={{
                                                        fontFamily: "'Space Grotesk', sans-serif",
                                                        background: "#292524",
                                                    }}
                                                >
                                                    {isSubmitting ? "Establishing Link..." : "Join Waiting List"}
                                                </button>
                                            </form>
                                        ) : (
                                            <div
                                                className="py-8 bg-white/5 border border-black/10 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-500"
                                            >
                                                <CheckCircle2 size={32} style={{ color: TERRA }} />
                                                <div className="text-center">
                                                    <p className="text-sm uppercase tracking-[0.2em] font-bold text-[#292524]">Transmission Received</p>
                                                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">You will be notified when the vault opens.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Wishlist / Monitor Button */}
                                <button
                                    onClick={handleWishlist}
                                    disabled={wishlisting || wishlistAdded}
                                    className="w-full py-4 uppercase font-bold tracking-[0.2em] text-[10px] flex justify-center items-center gap-3 transition-all border border-stone-200 hover:border-stone-400 text-stone-400 hover:text-stone-800 mt-4 disabled:opacity-50"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    <Bookmark size={14} className={wishlistAdded ? "fill-stone-800 text-stone-800" : ""} />
                                    {wishlisting ? "Establishing Link..." : wishlistAdded ? "Transmitted to Targets" : "Monitor this Asset"}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Infinite dark ticker ── */}
                <div
                    className="w-full overflow-hidden py-4"
                    style={{ background: "#0c0a09", borderTop: "1px solid #1c1917", borderBottom: "1px solid #1c1917" }}
                >
                    <div
                        className="whitespace-nowrap"
                        style={{
                            display: "flex",
                            width: "fit-content",
                            animation: "ticker 30s linear infinite",
                        }}
                    >
                        {[0, 1, 2].map((r) => (
                            <div key={r} className="flex shrink-0">
                                <span
                                    className="px-12 text-xs uppercase tracking-[0.5em] font-medium"
                                    style={{ color: "#78716c", fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    Once it&apos;s gone, it&apos;s gone. Forever.
                                </span>
                                <span
                                    className="px-12 text-xs uppercase tracking-[0.5em] font-medium"
                                    style={{ color: TERRA, fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    No reprints. No restocks. No exceptions.
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Provenance + Care Guide ── */}
                <section
                    className="grid grid-cols-1 md:grid-cols-2"
                    style={{ gap: "1px", background: "#d6d3d1" }}
                >
                    {/* Provenance */}
                    <div className="p-12 lg:p-24 relative overflow-hidden" style={{ background: LINEN }}>
                        <div className="relative z-10">
                            <h3
                                className="text-3xl mb-8"
                                style={{ fontFamily: "'Playfair Display', serif", color: "#292524" }}
                            >
                                Provenance
                            </h3>
                            <p className="leading-relaxed mb-6" style={{ color: "#57534e" }}>
                                {product.name} represents a year-long exploration into tactile memory. Each piece begins as a raw, untreated canvas of organic hemp and artisanal silk, which is then subjected to a unique hand-pressing process using volcanic stone weights.
                            </p>
                            <p className="leading-relaxed" style={{ color: "#57534e" }}>
                                {product.materials || "This method ensures that no two silhouettes share the exact same grain or tension. It is a dialogue between the artisan's intent and the material's natural resistance."}
                            </p>
                        </div>
                        {/* Terracotta triangle motif (5% opacity, bottom-right) */}
                        <div className="absolute -bottom-10 -right-10" style={{ opacity: 0.05 }}>
                            <svg width="300" height="300" viewBox="0 0 100 100">
                                <polygon fill={TERRA} points="0,100 50,0 100,100" />
                            </svg>
                        </div>
                    </div>

                    {/* Care Guide */}
                    <div className="p-12 lg:p-24 relative overflow-hidden" style={{ background: LINEN2 }}>
                        <div className="relative z-10">
                            <h3
                                className="text-3xl mb-8"
                                style={{ fontFamily: "'Playfair Display', serif", color: "#292524" }}
                            >
                                Care Guide
                            </h3>
                            <ul className="space-y-6">
                                {careItems.map((item) => (
                                    <li key={item.title} className="flex gap-4">
                                        <span className="material-symbols-outlined" style={{ color: TERRA }}>{item.icon}</span>
                                        <div>
                                            <h4
                                                className="font-bold text-sm uppercase mb-1"
                                                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#292524" }}
                                            >
                                                {item.title}
                                            </h4>
                                            <p className="text-sm" style={{ color: "#78716c" }}>{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Terracotta triangle motif (5% opacity, top-left, rotated) */}
                        <div className="absolute -top-10 -left-10 rotate-180" style={{ opacity: 0.05 }}>
                            <svg width="300" height="300" viewBox="0 0 100 100">
                                <polygon fill={TERRA} points="0,100 50,0 100,100" />
                            </svg>
                        </div>
                    </div>
                </section>
            </main>

            {/* ── Theme Switcher Dock ── */}
            <ThemeDock />

            {/* ── Footer ── */}
            <footer
                className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-start gap-8"
                style={{ background: LINEN2, borderTop: "1px solid rgba(214,211,209,0.6)" }}
            >
                <div>
                    <div
                        className="text-lg font-bold mb-4"
                        style={{ color: "#292524", fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        VASLIC - Something for everyone
                    </div>
                    <p className="text-sm tracking-wide" style={{ color: "#78716c", fontFamily: "'Manrope', sans-serif" }}>
                        © 2026 VASLIC - Something for everyone. All Rights Reserved.
                    </p>
                </div>
                <div className="flex flex-wrap gap-x-12 gap-y-4">
                    {["Privacy Policy", "Terms of Service", "Shipping & Returns", "Contact Us"].map((l) => (
                        <a
                            key={l}
                            href="#"
                            className="text-sm tracking-wide transition-colors"
                            style={{ color: "#78716c", fontFamily: "'Manrope', sans-serif" }}
                        >
                            {l}
                        </a>
                    ))}
                </div>
            </footer>

            {/* ── Material Icons + ticker keyframe ── */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" />
            <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          display: inline-block;
          line-height: 1;
        }
      `}</style>
        </div>
    );
}
