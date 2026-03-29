"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Package, TrendingUp, Verified } from "lucide-react";
import CuratorLayout from "@/components/CuratorLayout";
import OwnershipCertificateModal from "@/components/modals/OwnershipCertificateModal";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }
};

const getCategoryStyle = (categorySlug: string) => {
    switch (categorySlug?.toLowerCase()) {
        case 'gothic':
            return { color: "#8b0000", bg: "bg-[#0a0a0a]", border: "border-[#8b0000]", text: "text-[#8b0000]", btn: "bg-[#8b0000] hover:bg-white hover:text-black text-white", img: "grayscale group-hover:grayscale-0" };
        case 'bohemian':
            return { color: "#c77b4a", bg: "bg-[#1c1410]", border: "border-[#c77b4a]", text: "text-[#c77b4a]", btn: "bg-[#c77b4a] hover:bg-white hover:text-black text-white", img: "sepia-[0.5] group-hover:sepia-0" };
        case 'avant-garde':
            return { color: "#008DB9", bg: "bg-[#1a1a1a]", border: "border-[#008DB9]", text: "text-[#008DB9]", btn: "bg-[#008DB9] hover:bg-white hover:text-black text-white", img: "group-hover:scale-105" };
        case 'street':
            return { color: "#f5e642", bg: "bg-[#1a1a1a]", border: "border-[#f5e642]", text: "text-[#f5e642]", btn: "bg-[#f5e642] hover:bg-white hover:text-black text-black", img: "group-hover:rotate-1" };
        case 'funky':
            return { color: "#ff3d3d", bg: "bg-[#1a0a0a]", border: "border-[#ff3d3d]", text: "text-[#ff3d3d]", btn: "bg-[#ff3d3d] hover:bg-white hover:text-black text-white", img: "group-hover:hue-rotate-15" };
        default:
            return { color: "#72d2ff", bg: "bg-[#1c1b1b]", border: "border-[#72d2ff]", text: "text-[#72d2ff]", btn: "bg-[#72d2ff] hover:bg-white hover:text-black text-black", img: "" };
    }
};

export default function OrderHistoryClient({ initialOrders, user }: { initialOrders: any[], user: any }) {
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    // Flatten orders into items for the grid
    const orderItems = initialOrders.flatMap(order =>
        order.order_items.map((item: any) => ({
            ...item,
            order_number: order.order_number,
            order_date: new Date(order.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
            status: order.status
        }))
    );

    return (
        <CuratorLayout>
            <div className="px-8 lg:px-12 pb-20 max-w-7xl mx-auto">
                <section className="mb-16 mt-8 flex flex-col md:flex-row justify-between items-end gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-none mb-4 text-white">
                            Archive <span className="text-[#72d2ff]">01</span>
                        </h1>
                        <p className="text-zinc-500 font-medium text-lg leading-relaxed font-body">
                            Review your acquisition history. Each curation represents a unique entry in the global VASLIC ledger, secured by architectural rarity certificates.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#1c1b1b] p-8 w-full md:w-auto min-w-[300px] border-l-4 border-[#72d2ff] relative overflow-hidden group"
                    >
                        <div className="absolute bottom-[-10px] right-[-10px] text-[#72d2ff]/5 transition-transform duration-700 group-hover:scale-110">
                            <Package size={140} strokeWidth={1} />
                        </div>
                        <div className="relative z-10">
                            <span className="text-zinc-500 font-headline uppercase text-xs tracking-[0.2em] block mb-2 font-bold">Total Curations</span>
                            <div className="text-5xl font-headline font-black text-white leading-none">{orderItems.length}</div>
                            <div className="mt-4 flex items-center gap-2 text-[#72d2ff] text-xs font-bold uppercase tracking-tighter">
                                <TrendingUp size={16} />
                                Collection Integrity: 100%
                            </div>
                        </div>
                    </motion.div>
                </section>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-6"
                >
                    {orderItems.length === 0 ? (
                        <div className="bg-[#1c1b1b] border border-white/5 p-20 text-center">
                            <Package className="mx-auto text-zinc-800 mb-6" size={80} />
                            <h3 className="text-2xl font-headline font-bold text-zinc-500 uppercase">Archive Empty</h3>
                            <p className="text-zinc-700 mt-2 font-body">No previous curations discovered in the ledger.</p>
                        </div>
                    ) : (
                        orderItems.map((item: any) => {
                            const style = getCategoryStyle(item.product?.category?.slug);
                            return (
                                <motion.div
                                    key={item.id}
                                    variants={itemVariants}
                                    className={`group relative ${style.bg} flex flex-col md:flex-row items-stretch border-l-4 md:border-l-8 ${style.border} overflow-hidden`}
                                >
                                    <div className="w-full md:w-48 h-64 md:h-auto md:min-h-[200px] relative overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.product?.images?.[0] || ""}
                                            alt={item.product_name}
                                            className={`w-full h-full object-cover transition-all duration-700 ${style.img}`}
                                        />
                                    </div>

                                    <div className="flex-1 p-6 md:p-8 flex flex-col lg:flex-row justify-between gap-6 md:gap-8">
                                        <div className="flex flex-col justify-between flex-1">
                                            <div>
                                                <span
                                                    className={`inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4 ${item.product?.category?.slug === 'street' ? 'text-black' : 'text-white'}`}
                                                    style={{ backgroundColor: style.color }}
                                                >
                                                    {item.product?.category?.name} Archive
                                                </span>
                                                <h3 className="text-2xl font-headline font-bold text-white uppercase tracking-tight mb-1">{item.product_name}</h3>
                                                <div className={`${style.text} font-mono text-[10px] tracking-widest uppercase`}>
                                                    VAULT_ID: {item.vault_id}
                                                </div>
                                            </div>
                                            <div className="flex gap-10 text-zinc-500 text-sm mt-8 lg:mt-0">
                                                <div>
                                                    <div className="uppercase text-[10px] tracking-widest mb-1 font-bold">Acquired</div>
                                                    <div className="text-zinc-300 font-medium font-body">{item.order_date}</div>
                                                </div>
                                                <div>
                                                    <div className="uppercase text-[10px] tracking-widest mb-1 font-bold">Valuation</div>
                                                    <div className="text-zinc-300 font-medium font-body">${parseFloat(item.price_at_purchase).toFixed(2)}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-end gap-3 lg:w-64 flex-shrink-0">
                                            {item.product?.status === 'retired' && (
                                                <button
                                                    onClick={() => setSelectedItem(item)}
                                                    className={`${style.btn} py-4 px-6 font-bold uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2 w-full active:scale-[0.98]`}
                                                >
                                                    <Verified size={14} /> Download Certificate
                                                </button>
                                            )}
                                            <button className="border border-white/10 hover:border-white text-zinc-400 hover:text-white py-4 px-6 font-bold uppercase text-[10px] tracking-[0.2em] transition-all w-full bg-transparent active:scale-[0.98]">
                                                View Order Details
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </motion.div>

                {orderItems.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-16 pt-8 border-t border-zinc-800 flex justify-between items-center"
                    >
                        <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest font-headline">
                            Showing {orderItems.length} acquisitions
                        </div>
                    </motion.div>
                )}
            </div>

            <OwnershipCertificateModal
                isOpen={selectedItem !== null}
                onClose={() => setSelectedItem(null)}
                assetName={selectedItem?.product_name || ""}
                era={selectedItem?.product?.category?.name || ""}
                vaultId={selectedItem?.vault_id || ""}
                edition={`Unit 01 of ${selectedItem?.product?.total_units || '??'}`}
                ownerEmail={user?.email || ""}
                issueDate={selectedItem?.order_date || ""}
                retirementDate={selectedItem?.product?.retired_at ? new Date(selectedItem.product.retired_at).toLocaleDateString() : "Indeterminate"}
                themeColor={selectedItem ? getCategoryStyle(selectedItem?.product?.category?.slug).color : "#008DB9"}
            />
        </CuratorLayout>
    );
}
