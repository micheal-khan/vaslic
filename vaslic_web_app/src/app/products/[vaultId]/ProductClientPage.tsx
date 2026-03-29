"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Bookmark } from "lucide-react";
import { UnitsCounter } from "@/components/UnitsCounter";
import { joinWaitlist } from "@/app/actions";
import { useCart } from "@/contexts/CartContext";
import { addWishlistItem } from "@/app/wishlist/actions";

export default function ProductClientPage({ product }: { product: any }) {
    const { addToCart } = useCart();
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [added, setAdded] = useState(false);
    const [wishlisting, setWishlisting] = useState(false);
    const [wishlistAdded, setWishlistAdded] = useState(false);

    const categoryColors: Record<string, string> = {
        gothic: "#920703",
        bohemian: "#c77b4a",
        "avant-garde": "#72d2ff",
        street: "#d8ca23",
        funky: "#ffb4a8"
    };
    const themeColor = categoryColors[product.category?.slug as string] || "#ff007f";

    const isWaitlist = product.status === "coming_soon" || product.status === "retired";
    const availableSizes = product.sizes?.filter((s: any) => s.units_remaining > 0) || [];

    // total units across all sizes
    const totalRemaining = product.sizes?.reduce((acc: number, size: any) => acc + size.units_remaining, 0) || 0;
    const isSoldOut = totalRemaining === 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubmitting(true);
        const { error } = await joinWaitlist(email, product.vault_id, product.category.slug);
        if (!error) {
            setSuccess(true);
            setEmail("");
        }
        setSubmitting(false);
    };

    const handleAddToCart = () => {
        if (!selectedSize) return;
        const sizeObj = product.sizes?.find((s: any) => s.id === selectedSize);
        addToCart({
            id: selectedSize,
            product_id: product.id,
            vault_id: product.vault_id,
            name: product.name,
            size: sizeObj?.size || "",
            price: product.price,
            image: product.images?.[0] || "",
            quantity: 1,
            category_slug: product.category.slug,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleWishlist = async () => {
        setWishlisting(true);
        const { success } = await addWishlistItem(product.id);
        if (success) {
            setWishlistAdded(true);
            setTimeout(() => setWishlistAdded(false), 3000);
        }
        setWishlisting(false);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 overflow-hidden flex flex-col md:flex-row" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {/* ── Left Column: Sticky Image ── */}
            <div className="w-full md:w-1/2 relative bg-[#111] border-r border-[#222]">
                <div className="sticky top-0 h-screen w-full flex items-center justify-center p-8">
                    {/* Back link */}
                    <div className="absolute top-8 left-8 z-20">
                        <Link
                            href={`/${product.category.slug}`}
                            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={16} /> Returns to {product.category.name}
                        </Link>
                    </div>

                    {/* Image */}
                    <div className="w-full h-full max-h-[85vh] relative flex justify-center items-center">
                        {product.images?.[0] ? (
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-contain filter drop-shadow-2xl"
                            />
                        ) : (
                            <div className="text-4xl text-neutral-800" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>NO SIGNAL</div>
                        )}

                        {/* Overlay tags */}
                        <div className="absolute bottom-8 left-8 p-4 bg-black/80 backdrop-blur-md border border-white/10 uppercase text-xs tracking-[0.3em]">
                            Vault ID: <span style={{ color: themeColor }}>{product.vault_id}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Right Column: Content Scroll ── */}
            <div className="w-full md:w-1/2 min-h-screen p-8 md:p-16 lg:p-24 bg-[#050505] flex flex-col justify-center">
                <div className="max-w-xl w-full mx-auto space-y-12">
                    {/* Product Header */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-black bg-white">
                                {product.status.replace("_", " ")}
                            </span>
                            <span className="text-sm font-bold tracking-widest uppercase text-neutral-500">
                                {product.category.name} Archive // 2026
                            </span>
                        </div>
                        <h1
                            className="text-6xl md:text-8xl text-white uppercase leading-[0.85] tracking-tighter"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            {product.name}
                        </h1>
                        <div className="text-4xl" style={{ fontFamily: "'Righteous', sans-serif", color: themeColor }}>
                            ${product.price}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="text-neutral-400 text-lg leading-relaxed border-l-2 pl-6" style={{ borderColor: themeColor }}>
                        {product.description || "Experimental architecture for the physical form. Single-run kinetic curation. No restocks."}
                    </div>

                    {/* Interactive Section (Sizes / Waitlist) */}
                    <div className="space-y-8 pt-8 border-t border-white/10">
                        {isWaitlist || isSoldOut ? (
                            <div className="space-y-6">
                                <h3 className="text-xl uppercase font-bold tracking-widest text-white">
                                    {isSoldOut ? "Asset Depleted" : "Secure Early Access"}
                                </h3>
                                <p className="text-neutral-500 text-sm">
                                    Join the waitlist to be notified when the physical vault opens for this item.
                                </p>

                                <form onSubmit={handleSubmit} className="relative mt-8">
                                    <input
                                        type="email"
                                        required
                                        placeholder="ENTER COMM LINK (E-MAIL)"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#111] border border-[#333] px-6 py-5 text-sm outline-none focus:border-white transition-colors uppercase tracking-widest text-white peer"
                                    />
                                    <button
                                        type="submit"
                                        disabled={submitting || success}
                                        className="absolute right-2 top-2 bottom-2 px-8 uppercase text-xs font-bold tracking-[0.2em] transition-all"
                                        style={{
                                            background: success ? "#22c55e" : themeColor,
                                            color: "#000"
                                        }}
                                    >
                                        {submitting ? "Uplinking..." : success ? <CheckCircle2 size={16} /> : "Join"}
                                    </button>
                                </form>
                                {success && (
                                    <p className="text-green-500 text-xs uppercase tracking-widest mt-2">
                                        Comm link established. Monitor your inbox.
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center text-xs uppercase font-bold tracking-widest text-neutral-400">
                                    <span>Select Specifications</span>
                                    <span>
                                        <UnitsCounter productId={product.id} initial={totalRemaining} total={product.total_units} />

                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {product.sizes?.map((sizeObj: any) => {
                                        const disabled = sizeObj.units_remaining === 0;
                                        return (
                                            <button
                                                key={sizeObj.id}
                                                disabled={disabled}
                                                onClick={() => setSelectedSize(sizeObj.id)}
                                                className={`py-4 text-center border cursor-pointer uppercase font-bold tracking-widest transition-all ${disabled
                                                    ? "border-[#222] text-[#444] bg-transparent cursor-not-allowed"
                                                    : selectedSize === sizeObj.id
                                                        ? "text-black bg-white border-white scale-105"
                                                        : "border-[#444] text-neutral-300 hover:border-white hover:text-white"
                                                    }`}
                                            >
                                                {sizeObj.size}
                                            </button>
                                        )
                                    })}
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="w-full py-6 mt-8 uppercase font-bold tracking-[0.3em] text-sm text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    style={{ background: selectedSize ? (added ? "#22c55e" : themeColor) : "#333", color: selectedSize ? "#000" : "#888" }}
                                    disabled={!selectedSize || added}
                                >
                                    {added ? "SECURED IN CART" : (selectedSize ? "ADD TO CART" : "SELECT SIZE TO BUY")}
                                </button>

                                <button
                                    onClick={handleWishlist}
                                    disabled={wishlisting || wishlistAdded}
                                    className="w-full py-4 uppercase font-bold tracking-widest text-xs flex justify-center items-center gap-2 transition-all border border-[#333] hover:border-white text-neutral-400 hover:text-white mt-4 disabled:opacity-50"
                                >
                                    <Bookmark size={14} className={wishlistAdded ? "fill-white text-white" : ""} />
                                    {wishlisting ? "MONITORING..." : wishlistAdded ? "ADDED TO TARGETS" : "MONITOR THIS ASSET"}
                                </button>

                                {!selectedSize && (
                                    <p className="text-center text-xs uppercase text-neutral-600 tracking-widest mt-4">
                                        Must select specifications to proceed.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-16 mt-16 border-t border-white/5 opacity-50 flex justify-between text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500">
                        <span>Vault Record: {product.vault_id}</span>
                        <span>{product.category.slug} // V1_2024</span>
                    </div>
                </div>
            </div>
            {/* ── Add necessary CSS via style tag just in case ── */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Righteous&family=Manrope:wght@400;700&family=Space+Grotesk:wght@400;600&family=Bebas+Neue&display=swap');
            `}</style>
        </div>
    )
}
