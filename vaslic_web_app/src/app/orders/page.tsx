"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Package, TrendingUp, Verified } from "lucide-react";
import CuratorLayout from "@/components/CuratorLayout";
import OwnershipCertificateModal from "@/components/modals/OwnershipCertificateModal";

const orders = [
    {
        id: "GTH-772-X",
        name: "Obsidian Draped Shroud",
        category: "Gothic",
        categoryLabel: "Gothic Archive",
        categoryColor: "#8b0000",
        date: "Oct 14, 2023",
        price: "$1,450.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwwwxpITAwTrqKjBdNJJpdLEvJVRcudQa0-dcCFtxZaSNODVaWufMGb8i9tLCGtI3KBa-HXe7kQQRSs9ayTcnBMXpoOoAStd8YXcDuerMFp_nzMupEZ6Ov2ubw636XGG-omuHRx9AojZCKJzlBj9LDVAkva7OP2ibzCon0S_d8bav4Vi4PX1LT7UXXT9geAyI2CYyvQmSnLb8O_pckF0Kqs3Zrwmzs03bPyJ-B03zrSLB9ckl8JQiTtrCVXpb1diO652nprVZPl8Y",
        bgClass: "bg-[#0a0a0a]",
        borderClass: "border-[#8b0000]",
        textClass: "text-[#8b0000]",
        btnClass: "bg-[#8b0000] hover:bg-white hover:text-black text-white",
        imageStyle: "grayscale group-hover:grayscale-0",
    },
    {
        id: "BHM-201-K",
        name: "Sienna Nomad Tunic",
        category: "Bohemian",
        categoryLabel: "Bohemian Archive",
        categoryColor: "#c77b4a",
        date: "Sep 28, 2023",
        price: "$890.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANHC_LRE_UMoXoDIHdH8SdomM5Fkde6K5rRMWu_K9zCXGuFTSGaLeovfGRXi21QKektHBuRGsQHmgQjqhJxuAKtv_au7_NvSnmQ1VaopIq_oXNwp--pXvtmWbqL34ay3juX4NJnhzZYjIiNCFOU6VNRiUxmUmmWeCAgkHrLIrioGfFW5AWVQ22IU30yPLXDJH0MzdwKuGLx3Hi2sGTFk1NVBAHWxXjGgGlRQLdNrgGF8h9Zj_U6m8oVgQ8jpgwMR2xIEona7GhWeg",
        bgClass: "bg-[#1c1410]",
        borderClass: "border-[#c77b4a]",
        textClass: "text-[#c77b4a]",
        btnClass: "bg-[#c77b4a] hover:bg-white hover:text-black text-white",
        imageStyle: "sepia-[0.5] group-hover:sepia-0",
    },
    {
        id: "AVG-009-Z",
        name: "Neuron Sculptural Blazer",
        category: "Avant-Garde",
        categoryLabel: "Avant-Garde Archive",
        categoryColor: "#008DB9",
        date: "Aug 12, 2023",
        price: "$2,100.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsb1Dnc3slBKnjN9YJxQWTQP74tC3tlr0WtUqzBot1Cza4uVvoGeF-ecOjNdFbTCxBnoOGrUd0LERUu6iXu_Ob7QluZocN6Mo2CkupSEoIhtMeUs6YOq363_0EOvzINTvcxuib7RsJB7kF6bFgXNyw3RnMVqpO-fNH0_BFvpfZ915FDFeiqkfuLvtziMcS1PRXg84_WuTGFH4BnO9QFKpWviBki6ywAnOHQhgacj94sVZ8VO8JBI-AkOGOprBbIzKz1fkcQqaWZRY",
        bgClass: "bg-[#1a1a1a]",
        borderClass: "border-[#008DB9]",
        textClass: "text-[#008DB9]",
        btnClass: "bg-[#008DB9] hover:bg-white hover:text-black text-white",
        imageStyle: "group-hover:scale-105",
    },
    {
        id: "STR-881-M",
        name: "Voltage Utility Rig",
        category: "Street",
        categoryLabel: "Street Archive",
        categoryColor: "#f5e642",
        date: "Jul 05, 2023",
        price: "$550.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBlL30iCa_p4I8ECIP5-YCLqaF8bhn2YEQxojZPn92wdGRLUKSO3rSvxXyKPp0etjV0ZziwUb3g0QGBhs7Q5bqoxPUQ-1hqx22FOakG1FKLfsNp3mJ-xcIEnvhiK8HnLhGSOv6oyZUaipscIcCwOjuU7hN8s1zxzY-GYEefMJ6O0kYnjIkc3u3ctahf1HigSVAg7rnSQfg9TkiCzDOtDXjKAAD4RSx6PBtsydm1-KhlciqXVJCE8zWplPujoeIkg_sJX2tOfkvir0",
        bgClass: "bg-[#1a1a1a]",
        borderClass: "border-[#f5e642]",
        textClass: "text-[#f5e642]",
        btnClass: "bg-[#f5e642] hover:bg-white hover:text-black text-black", // black text on yellow for street
        imageStyle: "group-hover:rotate-1",
    }
];

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

export default function OrderHistoryPage() {
    const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

    return (
        <CuratorLayout>
            <div className="px-8 lg:px-12 pb-20 max-w-7xl mx-auto">
                {/* Header Summary Section */}
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
                            <div className="text-5xl font-headline font-black text-white leading-none">24</div>
                            <div className="mt-4 flex items-center gap-2 text-[#72d2ff] text-xs font-bold uppercase tracking-tighter">
                                <TrendingUp size={16} />
                                +3 Since last month
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Order List */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-6"
                >
                    {orders.map((order) => (
                        <motion.div
                            key={order.id}
                            variants={itemVariants}
                            className={`group relative ${order.bgClass} flex flex-col md:flex-row items-stretch border-l-4 md:border-l-8 ${order.borderClass} overflow-hidden`}
                        >
                            <div className="w-full md:w-48 h-64 md:h-auto md:min-h-[200px] relative overflow-hidden flex-shrink-0">
                                <img
                                    src={order.image}
                                    alt={order.name}
                                    className={`w-full h-full object-cover transition-all duration-700 ${order.imageStyle}`}
                                />
                            </div>

                            <div className="flex-1 p-6 md:p-8 flex flex-col lg:flex-row justify-between gap-6 md:gap-8">
                                <div className="flex flex-col justify-between flex-1">
                                    <div>
                                        <span
                                            className="inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4"
                                            style={{ backgroundColor: order.categoryColor, color: order.category === 'Street' ? 'black' : 'white' }}
                                        >
                                            {order.categoryLabel}
                                        </span>
                                        <h3 className="text-2xl font-headline font-bold text-white uppercase tracking-tight mb-1">{order.name}</h3>
                                        <div className={`${order.textClass} font-mono text-[10px] tracking-widest uppercase`}>
                                            VAULT_ID: {order.id}
                                        </div>
                                    </div>
                                    <div className="flex gap-10 text-zinc-500 text-sm mt-8 lg:mt-0">
                                        <div>
                                            <div className="uppercase text-[10px] tracking-widest mb-1 font-bold">Acquired</div>
                                            <div className="text-zinc-300 font-medium font-body">{order.date}</div>
                                        </div>
                                        <div>
                                            <div className="uppercase text-[10px] tracking-widest mb-1 font-bold">Valuation</div>
                                            <div className="text-zinc-300 font-medium font-body">{order.price}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-end gap-3 lg:w-64 flex-shrink-0">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className={`${order.btnClass} py-4 px-6 font-bold uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2 w-full active:scale-95`}
                                    >
                                        <Verified size={14} /> Download Certificate
                                    </button>
                                    <button className="border border-white/10 hover:border-white text-zinc-400 hover:text-white py-4 px-6 font-bold uppercase text-[10px] tracking-[0.2em] transition-all w-full bg-transparent active:scale-95">
                                        View Order Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Pagination / Footer Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 pt-8 border-t border-zinc-800 flex justify-between items-center"
                >
                    <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest font-headline">
                        Showing 4 of 24 acquisitions
                    </div>
                    <div className="flex gap-4">
                        <button className="w-12 h-12 flex items-center justify-center border border-white/10 hover:bg-[#72d2ff] hover:text-black hover:border-[#72d2ff] text-zinc-400 transition-all bg-transparent active:scale-95">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center border border-white/10 hover:bg-[#72d2ff] hover:text-black hover:border-[#72d2ff] text-zinc-400 transition-all bg-transparent active:scale-95">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>

            <OwnershipCertificateModal
                isOpen={selectedOrder !== null}
                onClose={() => setSelectedOrder(null)}
                assetName={selectedOrder?.name || ""}
                era={selectedOrder?.categoryLabel || ""}
                vaultId={selectedOrder?.id || ""}
                edition="Unit 04 of 12"
                ownerEmail="collector@vaslic.com"
                issueDate={selectedOrder?.date || ""}
                retirementDate="Indeterminate"
                themeColor={selectedOrder?.categoryColor}
            />
        </CuratorLayout>
    );
}

