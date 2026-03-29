"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HomeNavbar from "@/components/navbars/HomeNavbar";


// ─── Hero slices ─────────────────────────────────────────────────────────────
const heroSlices = [
    {
        label: "Gothic",
        font: "'UnifrakturMaguntia', cursive",
        italic: false,
        tracking: "",
        uppercase: false,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCUTDlsQeP6lPV-nR5LaRXmf2ANnGcalWmBaum5MwM6FXPz09zvU7q6S3TMZikwZQpcW9vcHXjexrPezbzg8NuUFoEkf30RmoJo8rrMbQH3Icmk1Zj-7b0vE-uBer9U_X7DOfuScQ535FEKGpP5MMsHdRafLSSfhc03BbeLE7JslgBhrvbXpbZhhJV-vxdVDfQe0YsIKpieZ1qWckd9tD7ZJ0DhSxapkXkjWqImkftfut3tgpmT-ZOIZNulYHtXafXTPXber_lkCQ0",
        href: "/gothic",
    },
    {
        label: "Bohemian",
        font: "'Playfair Display', serif",
        italic: true,
        tracking: "",
        uppercase: false,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnP01Ukg8pgd17yyKws2akaGZoCK3HIXcksOtjeQq928Z2n6jF_7ArvGbsBwyLmmUJpX-kNj4vUTTXlscpHsstzCu0zi9hBaJuKms2lh4BoQt3f1Z9ixZWqAXUx7qS0wNG0y3XilEMv60vKTlEbb_BzP_-1ddvHztCtz8bEivEYPFJIG9VCYfHBxqxnHCPHKm1IUZGMKoLFIEj6JkSErSsIHwIP4wHkJSNTamRBCgOx2GGJGOHDbywBqpLP45OQIGles4kW_-zjA",
        href: "/bohemian",
    },
    {
        label: "Avant",
        font: "'Bebas Neue', sans-serif",
        italic: false,
        tracking: "tracking-widest",
        uppercase: false,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBOpO5lF9xS3Z2l1uB5lZo4lcfLib6hdzt-bglgA638S3c3idsHkMngoWkTrCDRqQtgocppTsAxtZmvN_NlXe_Jzo-xePSn8rn4qpZB5Wam62_ol5MN6PnIxQTaZ2mbR_3XzqEy9rI8C2up2PbisSKg3Oj5u8ISzZ70zJ3mB-qt1OfH8AHgrsf_BGdwJCpabtH740T5lb_PXNQe5gmzji0x2Nmi95i0I6uLlCCBq3qwZlHL5XrEib7myefEjOhys8AMFqbHLCscaTg",
        href: "/avant-garde",
    },
    {
        label: "Street",
        font: "'Bebas Neue', sans-serif",
        italic: false,
        tracking: "",
        uppercase: true,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCFW2CLM5hkaF1DvZEM7D83E985ECLYkZOReOq1vTSzrn88bYVwRBxgn6GxDeyANAyBaagkvwkptXkhhib-RwJQqZJ9AT8U1408WskuElwq6wRnolzZumqpzdIpgYhtF3UCsuvt5XrmB04eYTuvF9NXkXwlIpvd-V4AhvwobgKTdkBRYFJhSTYhnerxHdtiofMglHNW5vXJGr8brdUWVodUU1L6kqZ6Zt17tVFVCg4H3d_nn23RIQYgz-oOdC3oACHQGFuZCgA6yjQ",
        href: "/street",
    },
    {
        label: "Funky",
        font: "'Righteous', sans-serif",
        italic: false,
        tracking: "",
        uppercase: false,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCAWllXXPFmv4PP22dWuEtn6IP5oBS-nUQ95tNbgQAC-jr2ApQqBIJJ3ljXGH0OrtPYC5cvBJ9JaCQXRGGDQRyS56JJQHCJ5tRRbC6kW4b-6OaqdGxq4gDsZ7hs-tvipv-CU7qoRyJ66-mCpYtAe_aLvLntDlY9p_8fzBA9KkkNFA5OI946BbALAKr_7oeUsEFBbJr-4i4srG2j3gyVxlBU7nwPjgfLc86V4x8Xk3n3TRGWJ3vbn6NF-1KLUkUcOfRCejvlk1E7-eE",
        href: "/funky",
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function RevealSection({ children, id }: { children: React.ReactNode; id?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return (
        <div
            ref={ref}
            id={id}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
        >
            {children}
        </div>
    );
}

// ─── Product card (generic / reusable) ────────────────────────────────────────
function ProductCard({
    id, name, edition, units, img, bg, delay, slug,
    idColor, editionStyle, nameStyle, unitStyle, borderStyle, arrowColor,
}: {
    id: string; name: string; edition: string; units: string;
    img?: string | null; bg?: string; delay: number; slug?: string;
    idColor: string; editionStyle: React.CSSProperties; nameStyle: React.CSSProperties;
    unitStyle: React.CSSProperties; borderStyle: React.CSSProperties; arrowColor: string;
}) {
    const card = (
        <div
            className="group relative aspect-[3/4] p-8 flex flex-col justify-between overflow-hidden"
            style={{
                background: bg ?? "#1e1e1e",
                transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
                transitionDelay: `${delay}ms`,
                cursor: slug ? "pointer" : "default",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02) translateY(-10px)"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { (e.currentTarget as HTMLDivElement).style.transform = ""; }}
        >
            {/* Background image overlay */}
            {img && (
                <div className="absolute inset-0 group-hover:opacity-40 transition-opacity duration-700" style={{ opacity: 0.2 }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
            )}
            {/* Top row */}
            <div className="relative z-10 flex justify-between items-start">
                <span className="text-[10px] tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif", color: idColor }}>{id}</span>
                <span className="px-2 py-1 text-[9px] font-bold" style={editionStyle}>{edition}</span>
            </div>
            {/* Bottom row */}
            <div className="relative z-10">
                <h4 className="font-bold mb-4" style={nameStyle}>{name}</h4>
                <div className="flex justify-between items-center pt-4" style={{ borderTop: "1px solid", ...borderStyle }}>
                    <span className="text-[10px] uppercase" style={unitStyle}>UNITS REMAINING: {units}</span>
                    <span className="material-symbols-outlined text-lg" style={{ color: arrowColor }}>arrow_outward</span>
                </div>
            </div>
        </div>
    );
    return slug ? <Link href={slug}>{card}</Link> : card;
}

export default function HomeClient({ productsByCategory, retiredProducts }: { productsByCategory: Record<string, any[]>; retiredProducts: any[] }) {
    const [email, setEmail] = useState("");

    // Map database products to the format expected by ProductCard
    const mapProducts = (categorySlug: string) => {
        return (productsByCategory[categorySlug] || []).map((p, i) => ({
            id: p.vault_id,
            slug: `/${categorySlug}/${p.vault_id.toLowerCase()}`,
            name: p.name,
            edition: `EDITION 1 OF ${p.total_units}`,
            units: p.units_remaining.toString().padStart(2, '0'),
            img: p.images?.[0] || null,
            delay: i * 100
        }));
    };


    const gothicProductsData = mapProducts("gothic");
    const bohemianProductsData = mapProducts("bohemian");
    const avantProductsData = mapProducts("avant-garde");
    const streetProductsData = mapProducts("street");
    const funkyProductsData = mapProducts("funky");

    const retiredProductsData = retiredProducts.map(p => ({
        year: `${new Date(p.created_at).getFullYear()} EDITION`,
        name: p.name,
        img: p.images?.[0] || null,
        slug: p.categories?.slug ? `/${p.categories.slug}/${p.vault_id.toLowerCase()}` : `/products/${p.vault_id.toLowerCase()}`
    }));

    return (
        <div className="bg-black text-white overflow-x-hidden" style={{ fontFamily: "'Manrope', sans-serif" }}>

            <HomeNavbar />

            {/* ── Hero: 5-panel cinematic morphing ── */}
            <section className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-black">
                {heroSlices.map((s) => (
                    <Link
                        key={s.label}
                        href={s.href}
                        className="group relative flex-1 h-full flex items-center justify-center overflow-hidden grayscale hover:grayscale-0"
                        style={{ transition: "flex 1.2s cubic-bezier(0.7,0,0.3,1), filter 1s ease" }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.flex = "3"; }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.flex = "1"; }}
                    >
                        <img
                            src={s.image}
                            alt={s.label}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                            style={{ opacity: 0.5 }}
                        />
                        <span
                            className="relative z-10 text-4xl text-white opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-700"
                            style={{
                                fontFamily: s.font,
                                fontStyle: s.italic ? "italic" : undefined,
                                fontWeight: s.italic ? 700 : undefined,
                                textTransform: s.uppercase ? "uppercase" : undefined,
                                letterSpacing: s.tracking ? "0.1em" : undefined,
                            }}
                        >
                            {s.label}
                        </span>
                    </Link>
                ))}
                {/* Central overlay heading */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                    <h1
                        className="font-black text-white text-center uppercase leading-none"
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "10vw",
                            mixBlendMode: "difference",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Something <br /> For Everyone
                    </h1>
                </div>
            </section>

            {/* ── Cyan primary ticker ── */}
            <div className="overflow-hidden border-y border-white/10 relative z-30" style={{ background: "#72d2ff", padding: "16px 0" }}>
                <div className="flex whitespace-nowrap" style={{ animation: "marquee 40s linear infinite" }}>
                    {["Once it's gone, it's gone. Forever.", "No reprints.", "No restocks.", "No exceptions.", "Once it's gone, it's gone. Forever.", "No reprints.", "No restocks.", "No exceptions."].map((t, i) => (
                        <span key={i} className="text-xl font-black uppercase text-black px-12" style={{ fontFamily: "'Space Grotesk', sans-serif", fontStyle: i % 4 === 0 ? "italic" : undefined }}>{t}</span>
                    ))}
                </div>
            </div>

            {/* ── GOTHIC SECTION ── */}
            <section id="gothic" className="min-h-screen bg-black py-24 md:py-32 px-6 md:px-12 flex flex-col justify-center" style={{ backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuAz0xm-W0iEQ7vWqXrHGwo3DfB5ugIKExvhSg-VdP7pzCulo8MGmzl0H6xUhQLSyfyPY9SIYKr0E-3c9kL714vo6lL9GaEEq6mJznqFNO8CYmjBotQSfyEiYDNkvBHr9__4H7uD5lOV8zzPovI4Iofe8hoCeErk7MY7peTJZFQ-cVo-i1HLEkXbvKdILAn6ReHVy_9hErkJSJm-V5YmmFvkuWISUGKXvHHDONkLQ2RBcgZpmVfUAZB_Uv1cDQ4_-31Ty55G6fwB3TM)`, backgroundBlendMode: "overlay", backgroundSize: "cover" }}>
                <div className="max-w-[1400px] mx-auto w-full">
                    <RevealSection>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24">
                            <div>
                                <Link href="/gothic">
                                    <h2 className="leading-[0.8] hover:opacity-80 transition-opacity" style={{ fontFamily: "'UnifrakturMaguntia', cursive", fontSize: "clamp(4rem, 15vw, 10rem)", color: "#920703" }}>Gothic</h2>
                                </Link>
                                <p className="text-neutral-500 mt-4 tracking-widest uppercase text-xs" style={{ fontFamily: "'Manrope', sans-serif" }}>The Architecture of Shadows</p>
                            </div>
                            <span className="font-black leading-none text-neutral-900 mt-4 md:mt-0" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3rem, 12vw, 8rem)" }}>01</span>
                        </div>
                    </RevealSection>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {gothicProductsData.map((p) => (
                            <RevealSection key={p.id}>
                                <ProductCard
                                    {...p} bg="#171717"
                                    idColor="#920703"
                                    editionStyle={{ background: "rgba(255,255,255,0.1)", color: "white" }}
                                    nameStyle={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", color: "white", fontWeight: 700 }}
                                    unitStyle={{ color: "#737373" }}
                                    borderStyle={{ borderColor: "rgba(255,255,255,0.1)" }}
                                    arrowColor="white"
                                />
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BOHEMIAN SECTION ── */}
            <section id="bohemian" className="min-h-screen py-24 md:py-32 px-6 md:px-12 flex flex-col justify-center text-black" style={{ background: "#f5ebe0" }}>
                <div className="max-w-[1400px] mx-auto w-full">
                    <RevealSection>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24">
                            <div>
                                <Link href="/bohemian">
                                    <h2 className="italic leading-[0.8] hover:opacity-80 transition-opacity" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.5rem, 15vw, 9rem)", color: "#c77b4a", fontWeight: 700 }}>Bohemian</h2>
                                </Link>
                                <p className="mt-4 tracking-widest uppercase text-xs" style={{ fontFamily: "'Manrope', sans-serif", color: "#8b5e3c" }}>The Wandering Soul</p>
                            </div>
                            <span className="font-black leading-none mt-4 md:mt-0" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3rem, 12vw, 8rem)", color: "#e8dcc4" }}>02</span>
                        </div>
                    </RevealSection>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {bohemianProductsData.map((p) => (
                            <RevealSection key={p.id}>
                                <ProductCard
                                    {...p} bg="white"
                                    idColor="#8b5e3c"
                                    editionStyle={{ background: "rgba(0,0,0,0.05)", color: "black" }}
                                    nameStyle={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "black", fontStyle: "italic", fontWeight: 700 }}
                                    unitStyle={{ color: "rgba(0,0,0,0.5)", fontWeight: 700 }}
                                    borderStyle={{ borderColor: "rgba(0,0,0,0.1)" }}
                                    arrowColor="black"
                                />
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Dark ticker between sections ── */}
            <div className="bg-black overflow-hidden border-y border-white/5 py-4 relative z-30">
                <div className="flex whitespace-nowrap" style={{ animation: "marquee 40s linear infinite" }}>
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="text-xl font-black uppercase px-12" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.3)" }}>Curate. Acquire. Evolve.</span>
                    ))}
                </div>
            </div>

            {/* ── AVANT-GARDE SECTION ── */}
            <section id="avant" className="min-h-screen bg-white py-24 md:py-32 px-6 md:px-12 flex flex-col justify-center text-black relative overflow-hidden">
                {/* Watermark */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ opacity: 0.03 }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "40rem" }}>AV</span>
                </div>
                <div className="max-w-[1400px] mx-auto w-full relative z-10">
                    <RevealSection>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24">
                            <div>
                                <Link href="/avant-garde">
                                    <h2 className="leading-[0.7] hover:opacity-80 transition-opacity" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem, 15vw, 12rem)", letterSpacing: "-0.02em" }}>Avant-Garde</h2>
                                </Link>
                                <p className="text-neutral-400 mt-4 uppercase text-xs" style={{ fontFamily: "'Manrope', sans-serif", letterSpacing: "0.5em", wordBreak: "break-word" }}>Experimental Brutalism</p>
                            </div>
                            <span className="font-black leading-none mt-4 md:mt-0" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3rem, 12vw, 8rem)", color: "#f5f5f5" }}>03</span>
                        </div>
                    </RevealSection>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {avantProductsData.map((p) => (
                            <RevealSection key={p.id}>
                                <ProductCard
                                    {...p} bg="white"
                                    idColor="black"
                                    editionStyle={{ background: "black", color: "white" }}
                                    nameStyle={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", color: "black", letterSpacing: "-0.02em" }}
                                    unitStyle={{ color: "black", fontWeight: 900 }}
                                    borderStyle={{ borderColor: "black" }}
                                    arrowColor="black"
                                />
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STREET SECTION ── */}
            <section id="street" className="min-h-screen py-24 md:py-32 px-6 md:px-12 flex flex-col justify-center text-white" style={{ background: "#111", backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuAz0xm-W0iEQ7vWqXrHGwo3DfB5ugIKExvhSg-VdP7pzCulo8MGmzl0H6xUhQLSyfyPY9SIYKr0E-3c9kL714vo6lL9GaEEq6mJznqFNO8CYmjBotQSfyEiYDNkvBHr9__4H7uD5lOV8zzPovI4Iofe8hoCeErk7MY7peTJZFQ-cVo-i1HLEkXbvKdILAn6ReHVy_9hErkJSJm-V5YmmFvkuWISUGKXvHHDONkLQ2RBcgZpmVfUAZB_Uv1cDQ4_-31Ty55G6fwB3TM)`, backgroundSize: "cover", backgroundBlendMode: "overlay" }}>
                <div className="max-w-[1400px] mx-auto w-full">
                    <RevealSection>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24">
                            <div>
                                <Link href="/street">
                                    <h2 className="uppercase leading-[0.7] hover:opacity-80 transition-opacity break-all md:break-normal" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4.5rem, 15vw, 12rem)", color: "#d8ca23", letterSpacing: "0.05em" }}>STREET</h2>
                                </Link>
                                <p className="text-neutral-500 mt-4 tracking-widest uppercase text-xs" style={{ fontFamily: "'Manrope', sans-serif" }}>Concrete Playground Armor</p>
                            </div>
                            <span className="font-black leading-none mt-4 md:mt-0" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3rem, 12vw, 8rem)", color: "#262626" }}>04</span>
                        </div>
                    </RevealSection>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {streetProductsData.map((p) => (
                            <RevealSection key={p.id}>
                                <ProductCard
                                    {...p} bg="#262626"
                                    idColor="#d8ca23"
                                    editionStyle={{ border: "1px solid #d8ca23", color: "#d8ca23" }}
                                    nameStyle={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: "white" }}
                                    unitStyle={{ color: "#a3a3a3" }}
                                    borderStyle={{ borderColor: "rgba(255,255,255,0.1)" }}
                                    arrowColor="#d8ca23"
                                />
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FUNKY SECTION ── */}
            <section id="funky" className="min-h-screen py-24 md:py-32 px-6 md:px-12 flex flex-col justify-center text-white relative overflow-hidden" style={{ background: "#0d0d2b" }}>
                {/* Glow blobs */}
                <div className="absolute -top-24 -right-24 rounded-full pointer-events-none" style={{ width: "50rem", height: "50rem", background: "rgba(114,210,255,0.2)", filter: "blur(120px)" }} />
                <div className="absolute -bottom-24 -left-24 rounded-full pointer-events-none" style={{ width: "40rem", height: "40rem", background: "rgba(255,180,168,0.2)", filter: "blur(120px)" }} />
                <div className="max-w-[1400px] mx-auto w-full relative z-10">
                    <RevealSection>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24">
                            <div>
                                <Link href="/funky">
                                    <h2 className="leading-[0.8] hover:opacity-80 transition-opacity" style={{ fontFamily: "'Righteous', sans-serif", fontSize: "clamp(4rem, 15vw, 9rem)", color: "#ffb4a8" }}>FUNKY</h2>
                                </Link>
                                <p className="mt-4 tracking-widest uppercase text-xs" style={{ fontFamily: "'Manrope', sans-serif", color: "rgba(255,180,168,0.6)" }}>Retro-Future Pop</p>
                            </div>
                            <span className="font-black leading-none mt-4 md:mt-0" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3rem, 12vw, 8rem)", color: "rgba(255,255,255,0.05)" }}>05</span>
                        </div>
                    </RevealSection>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {funkyProductsData.map((p) => (
                            <RevealSection key={p.id}>
                                <ProductCard
                                    {...p} bg="#1a1a4a"
                                    idColor="#ffb4a8"
                                    editionStyle={{ background: "#ffb4a8", color: "#0d0d2b", fontWeight: 900 }}
                                    nameStyle={{ fontFamily: "'Righteous', sans-serif", fontSize: "1.875rem", color: "white" }}
                                    unitStyle={{ color: "rgba(255,180,168,0.7)", fontWeight: 900 }}
                                    borderStyle={{ borderColor: "rgba(255,255,255,0.1)" }}
                                    arrowColor="#ffb4a8"
                                />
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Hall of Retired Designs ── */}
            <section className="py-24 md:py-48 bg-black px-6 md:px-12 border-t border-white/5 mx-auto w-full overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <RevealSection>
                        <div className="text-center mb-16 md:mb-32">
                            <span className="tracking-[0.5em] uppercase text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#72d2ff" }}>The Archives</span>
                            <h2 className="font-bold text-white mt-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}>Hall of Retired Designs</h2>
                            <p className="text-neutral-500 italic mt-4" style={{ fontFamily: "'Manrope', sans-serif" }}>These designs lived and left. Gone forever.</p>
                        </div>
                    </RevealSection>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {retiredProductsData.map((d, i) => (
                            <RevealSection key={d.name}>
                                <Link href={d.slug}>
                                    <div className="relative aspect-square bg-neutral-900 group grayscale hover:grayscale-0 overflow-hidden" style={{ transition: "all 1s ease", transitionDelay: `${i * 100}ms` }}>
                                        <img
                                            src={d.img || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80"}
                                            alt={d.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                                            style={{ opacity: 0.2 }}
                                            onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
                                            onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.2"; }}
                                        />
                                        <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(to top, black, transparent)" }}>
                                            <span className="text-[10px]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#72d2ff" }}>{d.year}</span>
                                            <h4 className="text-white font-bold text-lg tracking-widest uppercase">{d.name}</h4>
                                        </div>
                                    </div>
                                </Link>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Quiz Widget (fixed) ── */}
            <div className="fixed bottom-12 right-12 z-[100]">
                <div className="relative group">
                    <div className="absolute -inset-2 blur opacity-40 group-hover:opacity-100 transition-all duration-1000" style={{ background: "linear-gradient(to right, #72d2ff, #ffb4a8, #d8ca23)", animation: "pulse 2s infinite" }} />
                    <button className="relative bg-black px-8 py-8 flex flex-col items-center justify-center border border-white/20 backdrop-blur-xl hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-white text-4xl mb-2">psychology</span>
                        <span className="text-[10px] text-white tracking-[0.3em] uppercase text-center leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Identify Your<br />Soul's Aesthetic</span>
                    </button>
                </div>
            </div>

            {/* ── Footer ── */}
            <footer className="bg-black pt-24 md:pt-48 pb-12 px-6 md:px-12 border-t border-white/5 relative z-10 w-full overflow-hidden">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24">
                    <div className="col-span-1 md:col-span-2 space-y-8 md:space-y-12">
                        <div className="font-black text-white uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 8vw, 3.75rem)", letterSpacing: "-0.02em" }}>VASLIC</div>
                        <p className="text-neutral-500 text-base md:text-lg leading-relaxed max-w-lg" style={{ fontFamily: "'Manrope', sans-serif" }}>
                            We exist at the volatile intersection of subculture and high-end fashion. We do not restock. We do not compromise. We curate only for those who understand that permanence is a choice.
                        </p>
                        <div className="flex space-x-6 md:space-x-8">
                            {["share", "chat_bubble", "motion_photos_on"].map((icon) => (
                                <a key={icon} href="#" className="text-neutral-600 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: "1.875rem" }}>{icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h4 className="text-white font-bold uppercase tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The Vault</h4>
                        <ul className="space-y-4 text-neutral-500" style={{ fontFamily: "'Manrope', sans-serif" }}>
                            {["Vault Registration", "Curator Program", "Retired Archives", "Logistics & Global Shipping"].map((l) => (
                                <li key={l}><a href="#" className="hover:text-[#72d2ff] transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-8">
                        <h4 className="text-white font-bold uppercase tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Transmission</h4>
                        <div className="relative">
                            <input
                                className="w-full px-6 py-5 text-sm tracking-widest border-none focus:outline-none focus:ring-1"
                                style={{ background: "rgba(23,23,23,0.5)", color: "white", fontFamily: "'Space Grotesk', sans-serif", borderBottom: "1px solid rgba(255,255,255,0.1)", "--tw-ring-color": "#72d2ff" } as React.CSSProperties}
                                placeholder="ENTER EMAIL ADDRESS"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#72d2ff" }}>
                                <span className="material-symbols-outlined" style={{ fontSize: "1.5rem" }}>arrow_right_alt</span>
                            </button>
                        </div>
                        <p className="uppercase tracking-widest text-neutral-700" style={{ fontSize: "0.625rem", fontFamily: "'Space Grotesk', sans-serif" }}>JOIN THE WAITLIST FOR THE NEXT DROP CYCLE.</p>
                    </div>
                </div>
                <div className="max-w-[1400px] mx-auto mt-48 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-neutral-700 uppercase"
                    style={{ fontSize: "0.625rem", letterSpacing: "0.4em", fontFamily: "'Space Grotesk', sans-serif" }}>
                    <span>© 2024 VASLIC | ALL RIGHTS RESERVED.</span>
                    <span className="mt-8 md:mt-0 font-black">NO REPRINTS. NO RESTOCKS. NO EXCEPTIONS.</span>
                </div>
            </footer>

            {/* ── Google Material Symbols + animations ── */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
            <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.7; } }
      `}</style>
        </div>
    );
}
