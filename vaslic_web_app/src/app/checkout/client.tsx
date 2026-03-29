"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, CheckCircle, Package, CreditCard, ShoppingBag } from "lucide-react";
import CuratorLayout from "@/components/CuratorLayout";
import { useCart } from "@/contexts/CartContext";
import { createOrder } from "./actions";
import { useRouter } from "next/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CheckoutClient({ user }: { user: any }) {
    const { items, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");

    const subtotal = items.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return acc + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);
    const shipping = items.length > 0 ? 145 : 0;
    const total = subtotal + shipping;

    const handleCheckout = async () => {
        if (items.length === 0) return;

        setIsProcessing(true);

        try {
            // Simulated delay for "payment gateway"
            await new Promise(resolve => setTimeout(resolve, 2000));

            const res = await createOrder({
                subtotal,
                shipping_cost: shipping,
                total,
                items: items.map(item => ({
                    ...item,
                    product_id: item.product_id || item.id // Ensure we have product_id
                }))
            });

            if (res.success) {
                setOrderNumber(res.orderNumber);
                setIsCompleted(true);
                clearCart();
            } else {
                alert("Error during connection: " + res.error);
                setIsProcessing(false);
            }
        } catch (err) {
            console.error(err);
            setIsProcessing(false);
        }
    };

    if (isCompleted) {
        return (
            <CuratorLayout>
                <div className="min-h-[80vh] flex items-center justify-center p-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease }}
                        className="max-w-xl w-full text-center bg-[#1c1b1b] p-12 lg:p-20 border border-white/5 relative"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#72d2ff]"></div>
                        <div className="mb-10 flex justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.3 }}
                                className="w-24 h-24 rounded-full bg-[#72d2ff]/10 flex items-center justify-center text-[#72d2ff]"
                            >
                                <CheckCircle size={48} strokeWidth={1} />
                            </motion.div>
                        </div>
                        <h1 className="font-headline text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Connection Secured</h1>
                        <p className="text-zinc-500 font-body mb-8">
                            Your curation has been recorded in the VASLIC ledger. The archival artifacts are now being prepared for physical transfer.
                        </p>

                        <div className="bg-[#131313] p-10 mb-12 border-l-4 border-[#72d2ff]">
                            <div className="text-[10px] text-zinc-600 font-label uppercase tracking-widest mb-1 font-bold italic">Reference ID</div>
                            <div className="font-headline text-3xl font-black text-white tracking-widest">{orderNumber}</div>
                        </div>

                        <button
                            onClick={() => router.push("/orders")}
                            className="w-full py-5 bg-[#72d2ff] text-black font-headline font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 group hover:translate-x-1 transition-all"
                        >
                            View Archive <ArrowRight size={18} />
                        </button>
                    </motion.div>
                </div>
            </CuratorLayout>
        );
    }

    return (
        <CuratorLayout>
            <div className="px-8 lg:px-12 py-12 max-w-7xl mx-auto">
                <header className="mb-16">
                    <span className="font-label text-[#72d2ff] font-bold tracking-[0.3em] uppercase block mb-2 text-[10px]">Vault Settlement</span>
                    <h1 className="font-headline text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none italic">CHECKOUT</h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Shipping & Payment */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Section 1: Authentication */}
                        <section className="bg-[#1c1b1b] p-8 md:p-12 border-l-4 border-[#72d2ff]">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-500">01</div>
                                <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-white">Curator Identity</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="text-[10px] font-label uppercase tracking-widest text-zinc-500 block mb-3 font-bold">Email Interface</label>
                                    <div className="bg-[#131313] p-4 text-white font-mono text-sm border border-white/5 opacity-60">
                                        {user?.email}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-label uppercase tracking-widest text-zinc-500 block mb-3 font-bold">Member Level</label>
                                    <div className="bg-[#131313] p-4 text-[#72d2ff] font-mono text-sm border border-white/5 font-bold uppercase tracking-widest">
                                        Elite Curator / Archive Access
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Address (Simulation) */}
                        <section className="bg-[#1c1b1b] p-8 md:p-12 border-l-4 border-zinc-800">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-500">02</div>
                                <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-white">Vault Destination</h3>
                            </div>
                            <p className="text-zinc-500 font-body text-sm mb-8 leading-relaxed italic">
                                VASLIC archival artifacts are dispatched with high-grade architectural protection. Please ensure the destination is secure.
                            </p>
                            <div className="p-8 border-2 border-dashed border-white/5 text-center text-zinc-700">
                                <Package className="mx-auto mb-4 opacity-20" size={32} />
                                <span className="font-label uppercase text-[10px] tracking-widest font-bold italic">Default address loaded from profile</span>
                            </div>
                        </section>

                        {/* Section 3: Payment (Simulation) */}
                        <section className="bg-[#1c1b1b] p-8 md:p-12 border-l-4 border-zinc-800">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-500">03</div>
                                <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-white">Financial Settlement</h3>
                            </div>
                            <div className="bg-gradient-to-br from-[#131313] to-[#0a0a0a] p-10 border border-white/5 flex flex-col md:flex-row items-center gap-10">
                                <div className="p-6 bg-white/5 rounded-2xl flex items-center justify-center">
                                    <CreditCard size={48} strokeWidth={1} className="text-[#72d2ff]" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-headline text-xl font-bold text-white uppercase tracking-tight mb-2 italic">Secure Node Connection</h4>
                                    <p className="text-zinc-500 font-body text-xs leading-relaxed max-w-sm">
                                        Transactions are secured via high-level encryption. We process settlements through globally authenticated nodes.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-950/30 text-green-400 font-label text-[9px] uppercase tracking-widest font-black italic">
                                    <Lock size={12} /> Encrypted
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Summary */}
                    <aside className="lg:col-span-4 h-fit sticky top-32">
                        <div className="bg-[#1c1b1b] p-8 md:p-10 border border-white/5 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 opacity-5">
                                <ShoppingBag size={200} strokeWidth={1} />
                            </div>

                            <h3 className="font-headline text-2xl font-black uppercase tracking-tight text-white mb-8 border-b border-white/5 pb-6">Summary</h3>

                            <div className="space-y-6 mb-10 overflow-y-auto max-h-[30vh] pr-2 custom-scrollbar">
                                {items.map(item => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-16 h-20 bg-black shrink-0 overflow-hidden border border-white/5">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="font-headline text-sm font-bold uppercase text-white tracking-tight truncate max-w-[150px]">{item.name}</h4>
                                            <p className="text-[9px] font-label text-zinc-600 uppercase tracking-widest mt-1">
                                                Qty: {item.quantity} · {item.vault_id}
                                            </p>
                                        </div>
                                        <div className="text-right flex flex-col justify-center">
                                            <p className="text-[#72d2ff] font-headline font-black text-sm">{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-8 border-t border-white/5">
                                <div className="flex justify-between text-[11px] font-label uppercase tracking-widest text-zinc-500">
                                    <span>Artifact Subtotal</span>
                                    <span className="text-white">${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-label uppercase tracking-widest text-zinc-500">
                                    <span>Archival Logistics</span>
                                    <span className="text-white">${shipping.toLocaleString()}</span>
                                </div>
                                <div className="h-4"></div>
                                <div className="flex justify-between items-baseline border-t border-white/10 pt-6">
                                    <span className="text-[10px] font-label uppercase tracking-[0.3em] font-black text-[#72d2ff] italic">Grand Settlement</span>
                                    <span className="font-headline text-4xl font-black text-white">${total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isProcessing || items.length === 0}
                                className="w-full mt-10 py-5 bg-[#72d2ff] disabled:bg-zinc-800 text-black font-headline font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 active:scale-[0.98] transition-all relative overflow-hidden group"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                                />
                                {isProcessing ? (
                                    <span className="flex items-center gap-3 italic">
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                                        />
                                        Establishing connection...
                                    </span>
                                ) : (
                                    <>SECURE CONNECTION <ArrowRight size={18} /></>
                                )}
                            </button>

                            <p className="mt-6 text-[8px] font-label uppercase text-zinc-600 tracking-[0.2em] text-center leading-relaxed">
                                By completing the connection, you acknowledge the <span className="text-zinc-400">Never Reprint Protocol</span> and artifact scarcity terms.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #72d2ff;
                }
            `}</style>
        </CuratorLayout>
    );
}
