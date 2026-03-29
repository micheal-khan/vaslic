"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Maximize2, CheckCircle2, Bookmark } from "lucide-react";
import GothicNavbar from "@/components/navbars/GothicNavbar";
import ThemeDock from "@/components/ThemeDock";
import { addWishlistItem } from "@/app/wishlist/actions";
import { useCart } from "@/contexts/CartContext";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const BLOOD = "#8b0000";

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function GothicProductClient({ product }: { product: any }) {
    const [selectedSize, setSelectedSize] = useState("S");
    const [hoveredBtn, setHoveredBtn] = useState(false);
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
    const THUMB_1 = images[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ1WkgEdWc-zb77LlRadecmYbFH3Voi6N_iZe7iPs6g7k5c27z-P6sksL4HmkEO4qkkc13qK05W1aUqDecI6bhvv-99_GlDFGEqA-Tzq7Aztw-4Zl8bbHQTspXfyolZY1y6V40ukSFjXJa4Fwr6edSRqayAcF5ysHAp-i6l9rC_ChUpiEWwzVeAKfdPtdM2SR2A6UQYhOjtpiIsflTqp5dXdDgkqdPquB1JDWw70ZYU0spa6CC6BxhBjYw6HvLEG-CZ7Pm43o_zPc";
    const THUMB_2 = images[1] || "https://lh3.googleusercontent.com/aida-public/AB6AXuBQVMFRj1_duPc9FhSpAtWrNU_LEWivt88LV6LxX16PiAltv3ByFBIUNRQTWj46Ynk8J1ZPbm6g1HdlW22mRGCWFN8-tLNwPjuFrgMNKaulhfOt8dD7e6Z8KB_QBR8AdlMbcgo9l4N4cq5W7NeucSIfExD0Du18HjHZlq-jBQ4rxqMyGvFDYjtiMfzWXQxMHDxBi4YjUtUyj0IHWG-6OglY9KWsCzAGou7Pmu6ZFmfbeboG_TsPMgv6VM_LpNS9jo77SwxEGOEfS84";
    const THUMB_3 = images[2] || "https://lh3.googleusercontent.com/aida-public/AB6AXuCToloBZ7vWOnb48XZbJFEHpBCpoI3ydye3JseCkHsv693SIaWPegBbhgwfNepUpmNMu7ANqo7FXIyCI4dmsU5FsnrAIzIQBoAs-COB305bd0r0qPsoHb2En7JpzU8Ly0VUtNPJECPVBkqOmv2ghMAFlx0zSi56FFZXZmm-MxuSakQVEqNvU3rqqjNbU04eu0vXO9s6CZDpKUA4_JLiAqQVAHwITJ3jACdMkqATXO5W8nUAESZBdArCJvoL3r9MeTWJE0RpuHZX4XI";
    const HERO_IMG = images[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuBwZIG68TuxsfASp8hwIpQ5iBDgbi15c7jXmUSRaAhsttd-6idX8N9OeR2Ho0561DpxBfavh9b8Y00G9OEi1oeNaIeil_Uc_kpSiiYD8-BPQ03FyB0tT0i-RKCm_ulfgErRO5HQtXi42umG6uNzyXdsUoY1bRjcCqziMQhxzqc3teSTYzyYeQ5sZGGRE9QWjII6COwblwD9scjAH8aMzN7TG5hfetSgFMZdoQJOjA_O-ilLnc6X7HSBYG5EHWQmD5IJHdc8e6IQqu4";

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
            category_slug: product.category?.slug || "gothic",
        });
    };

    return (
        <div
            className="min-h-screen overflow-x-hidden text-neutral-200"
            style={{ background: "#0a0a0a", fontFamily: "'Manrope', sans-serif" }}
        >
            {/* ── Dot-grid lace overlay ── */}
            <div
                className="fixed inset-0 pointer-events-none z-[60]"
                style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                }}
            />

            {/* Custom thin scrollbar */}
            <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #3e484e; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

            {/* ── Fixed Navbar ── */}
            <GothicNavbar />

            <main className="pt-24 min-h-screen relative z-10">

                {/* ── Main product section: 12-col grid ── */}
                <div className="max-w-[1920px] mx-auto px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 py-12">

                    {/* ── Cinematic Gallery (7 cols) ── */}
                    <div className="lg:col-span-7 grid grid-cols-12 gap-4 h-fit">
                        {/* Thumbnail column (2 of 12) */}
                        <div className="col-span-2 space-y-4">
                            {[THUMB_1, THUMB_2, THUMB_3].map((src, i) => (
                                <div
                                    key={i}
                                    className="overflow-hidden cursor-pointer group border"
                                    style={{ aspectRatio: "3/4", background: "#1c1b1b", borderColor: "rgba(62,72,78,0.1)" }}
                                >
                                    <img
                                        src={src}
                                        alt={`Thumbnail ${i + 1}`}
                                        className="w-full h-full object-cover brightness-75 grayscale group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Hero image (10 of 12) */}
                        <div
                            className="col-span-10 relative overflow-hidden group"
                            style={{ aspectRatio: "3/4", background: "#1c1b1b" }}
                        >
                            <img
                                src={HERO_IMG}
                                alt={`${product.name} — Full Editorial`}
                                className="w-full h-full object-cover brightness-90 grayscale group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
                            <div className="absolute bottom-8 left-8 flex items-center space-x-2 text-white">
                                <Maximize2 size={14} />
                                <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    Expand Visual
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ── Product Details (5 cols) ── */}
                    <div className="lg:col-span-5 flex flex-col justify-start space-y-12">

                        {/* Header */}
                        <header className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span
                                    className="text-xs font-bold uppercase tracking-[0.3em]"
                                    style={{ color: BLOOD, fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    Archive Series // {isLive ? "Limited" : "Upcoming"}
                                </span>
                                <span
                                    className="text-xs uppercase tracking-widest text-neutral-500"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    Vault ID: {product.vault_id}
                                </span>
                            </div>

                            <h1
                                className="text-white leading-none capitalize"
                                style={{ fontFamily: "'UnifrakturMaguntia', serif", fontSize: "clamp(3.5rem, 7vw, 5rem)" }}
                            >
                                {product.name}
                            </h1>

                            <div className="flex items-baseline space-x-4">
                                <span
                                    className="text-4xl font-light tracking-tighter"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    ${product.price}
                                </span>
                                {product.compare_price && (
                                    <span className="text-neutral-600 text-xs line-through" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        ${product.compare_price}
                                    </span>
                                )}
                            </div>
                        </header>

                        {/* Quote block with red left border */}
                        <div
                            className="p-8 relative"
                            style={{ background: "#1c1b1b", borderLeft: `2px solid ${BLOOD}80` }}
                        >
                            {/* Giant "G" watermark */}
                            <div
                                className="absolute top-4 right-4 select-none pointer-events-none leading-none"
                                style={{
                                    fontFamily: "'UnifrakturMaguntia', serif",
                                    fontSize: "10rem",
                                    color: "rgba(255,255,255,0.02)",
                                    fontWeight: 900,
                                }}
                            >
                                G
                            </div>
                            <p className="leading-relaxed font-light text-lg italic text-neutral-400">
                                {product.description || `&quot;A masterpiece of dark elegance. Crafted from centuries-old textile traditions, this vessel is designed for those who walk between the shadows and the light. It is a silhouette carved from the night itself.&quot;`}
                            </p>
                        </div>

                        {/* Size selection */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label
                                        className="text-xs uppercase tracking-[0.2em] text-neutral-500"
                                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        Select Vessel Size
                                    </label>
                                    <a
                                        href="#"
                                        className="text-xs hover:underline underline-offset-4 uppercase tracking-widest transition-opacity"
                                        style={{ color: BLOOD, fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        Size Guide
                                    </a>
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {SIZES.map((sz) => (
                                        <button
                                            key={sz}
                                            onClick={() => setSelectedSize(sz)}
                                            className="py-4 text-sm transition-all"
                                            style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                border: `1px solid ${selectedSize === sz ? BLOOD : "rgba(62,72,78,0.3)"}`,
                                                color: selectedSize === sz ? "white" : "#a3a3a3",
                                                background: selectedSize === sz ? `${BLOOD}1a` : "transparent",
                                            }}
                                        >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Scarcity + CTA */}
                            <div className="space-y-6">
                                {isLive ? (
                                    <>
                                        {/* Status badge */}
                                        <div
                                            className="flex items-center space-x-4 p-4 border"
                                            style={{ background: `${BLOOD}0d`, borderColor: `${BLOOD}33` }}
                                        >
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{ background: BLOOD, animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                                            />
                                            <span
                                                className="text-xs uppercase tracking-widest"
                                                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e5e2e1" }}
                                            >
                                                Edition: 1 of {product.total_units}
                                                <span className="mx-2 text-neutral-600">|</span>
                                                <span style={{ color: BLOOD, fontWeight: 700 }}>{product.units_remaining} Units Remaining</span>
                                            </span>
                                        </div>

                                        <div className="relative overflow-hidden">
                                            <button
                                                onClick={handleAddToCart}
                                                className="w-full py-6 text-white text-xl uppercase tracking-[0.2em] font-black relative overflow-hidden transition-transform hover:translate-x-1"
                                                style={{
                                                    fontFamily: "'Space Grotesk', sans-serif",
                                                    background: `linear-gradient(to right, ${BLOOD}, #920703)`,
                                                }}
                                                onMouseEnter={() => setHoveredBtn(true)}
                                                onMouseLeave={() => setHoveredBtn(false)}
                                            >
                                                <span className="relative z-10">Claim Vessel</span>
                                                <div
                                                    className="absolute inset-0 transition-transform duration-300"
                                                    style={{
                                                        background: "rgba(255,255,255,0.1)",
                                                        transform: hoveredBtn ? "translateY(0)" : "translateY(100%)",
                                                    }}
                                                />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-4">
                                        <div
                                            className="p-4 border border-dashed text-center"
                                            style={{ borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.02)" }}
                                        >
                                            <span className="text-xs uppercase tracking-widest text-neutral-400">Vault status: {product.status === 'retired' ? 'Resource Depleted / Legacy Archives' : 'Locked / Pending Release'}</span>
                                        </div>

                                        {!isJoined ? (
                                            <form onSubmit={handleJoinWaitlist} className="space-y-4">
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="ENTER COMM LINK (EMAIL)"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-[#111] border border-[#333] px-6 py-5 text-sm outline-none focus:border-white transition-colors uppercase tracking-[0.2em] text-white"
                                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full py-6 text-black text-sm uppercase tracking-[0.3em] font-black relative transition-all hover:bg-neutral-200"
                                                    style={{
                                                        fontFamily: "'Space Grotesk', sans-serif",
                                                        background: "white",
                                                    }}
                                                >
                                                    {isSubmitting ? "Establishing Link..." : "Join Waiting List"}
                                                </button>
                                            </form>
                                        ) : (
                                            <div
                                                className="py-8 bg-white/5 border border-white/10 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-500"
                                            >
                                                <CheckCircle2 size={32} style={{ color: BLOOD }} />
                                                <div className="text-center">
                                                    <p className="text-sm uppercase tracking-[0.2em] font-bold text-white">Transmission Received</p>
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
                                    className="w-full py-4 uppercase font-bold tracking-[0.2em] text-[10px] flex justify-center items-center gap-3 transition-all border border-neutral-800 hover:border-neutral-500 text-neutral-500 hover:text-white mt-8 mb-8 disabled:opacity-50"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    <Bookmark size={14} className={wishlistAdded ? "fill-white text-white" : ""} />
                                    {wishlisting ? "Establishing Link..." : wishlistAdded ? "Added to Targets" : "Monitor this Asset"}
                                </button>

                                <p
                                    className="text-[10px] text-center text-neutral-600 uppercase tracking-[0.2em] font-medium leading-loose"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    Once it&apos;s gone, it&apos;s gone. Forever.<br />
                                    No reprints. No restocks. No exceptions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Provenance & Care Guide ── */}
                <section
                    className="max-w-[1920px] mx-auto px-8 lg:px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-16"
                    style={{ borderTop: "1px solid rgba(62,72,78,0.1)" }}
                >
                    {/* Provenance */}
                    <div className="space-y-8 p-12" style={{ background: "#1c1b1b" }}>
                        <div className="flex items-center space-x-4">
                            <span className="material-symbols-outlined" style={{ color: BLOOD }}>history_edu</span>
                            <h2
                                className="text-2xl uppercase tracking-tighter font-bold"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Provenance
                            </h2>
                        </div>
                        <div className="space-y-6 leading-loose font-light text-neutral-400">
                            <p>
                                {product.name} was conceptualized in the winter of 2023, drawing inspiration from the Victorian &apos;Grand Mourning&apos; aesthetic and the brutalist structures of the Berlin underground. Every piece of silk used is hand-treated with a proprietary charcoal bath to achieve its depth of midnight.
                            </p>
                            <p>
                                {product.materials || "The hardware—reclaimed silver clasps—is individually cast in a studio in Northern France, ensuring that no two vessels are identical. This is not mere clothing; it is a wearable history of grief and rebirth."}
                            </p>
                        </div>
                    </div>

                    {/* Care Guide */}
                    <div className="space-y-8 p-12" style={{ background: "#2a2a2a" }}>
                        <div className="flex items-center space-x-4">
                            <span className="material-symbols-outlined" style={{ color: BLOOD }}>dry_cleaning</span>
                            <h2
                                className="text-2xl uppercase tracking-tighter font-bold"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Care Guide
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs uppercase tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {[
                                { label: "Wash Method", value: product.care_instructions ? product.care_instructions.split(';')[0] : "Professional Dark-Care Dry Clean Only" },
                                { label: "Storage", value: "Breathable cotton garment bag away from light" },
                                { label: "Material", value: product.materials ? product.materials.split('.')[0] : "Noir Raw Silk / Hand-Cast Silver" },
                                { label: "Caution", value: "Avoid direct contact with heavy oils or fragrance" },
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col space-y-2">
                                    <span style={{ color: `${BLOOD}99` }}>{item.label}</span>
                                    <span className="text-neutral-200">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Gothic quote spacer ── */}
                <section className="py-32 flex flex-col items-center justify-center text-center px-8">
                    <div
                        className="mb-12"
                        style={{
                            width: "1px",
                            height: "96px",
                            background: `linear-gradient(to bottom, transparent, ${BLOOD}, transparent)`,
                        }}
                    />
                    <p
                        className="text-4xl md:text-6xl opacity-30 max-w-4xl italic leading-tight"
                        style={{ fontFamily: "'UnifrakturMaguntia', serif" }}
                    >
                        &quot;In the silence of the shroud, we find the loudest truth of our existence.&quot;
                    </p>
                    <div
                        className="mt-12"
                        style={{
                            width: "1px",
                            height: "96px",
                            background: `linear-gradient(to bottom, ${BLOOD}, ${BLOOD}33, transparent)`,
                        }}
                    />
                </section>
            </main>

            {/* ── Slim Footer ── */}
            <footer style={{ background: "#030303", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 w-full max-w-[1920px] mx-auto">
                    <div className="mb-8 md:mb-0">
                        <span className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>VASLIC.</span>
                        <p
                            className="text-[10px] tracking-[0.2em] uppercase mt-2"
                            style={{ fontFamily: "'Manrope', sans-serif", color: "#525252" }}
                        >
                            © VASLIC. SOMETHING FOR EVERYONE. NEVER REPRINT.
                        </p>
                    </div>
                    <div
                        className="flex space-x-12 text-xs tracking-[0.2em] uppercase"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                        {["Archives", "Ethics", "Shipping", "Contact"].map((l) => (
                            <a key={l} href="#" className="transition-colors text-neutral-600 hover:text-sky-400">{l}</a>
                        ))}
                    </div>
                </div>
            </footer>

            {/* ── Theme Switcher Dock ── */}
            <ThemeDock />

            {/* Material Icons */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap" />
        </div>
    );
}
