"use client";

import { motion } from "framer-motion";
import { ClipboardList, Search, Eye, MessageCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

const mockOrders = [
    { id: "#ORD-001", customer: "María González", phone: "+58 412-1234567", products: "Origen Único x2", total: "$68.00", date: "20 Feb 2026", status: "Pendiente", statusColor: "bg-amber-500/20 text-amber-400" },
    { id: "#ORD-002", customer: "Carlos Mendoza", phone: "+58 414-7654321", products: "Geisha Lot x1", total: "$65.00", date: "19 Feb 2026", status: "Enviado", statusColor: "bg-blue-500/20 text-blue-400" },
    { id: "#ORD-003", customer: "Ana Rodríguez", phone: "+58 424-1112233", products: "Estate Origin x1, Energy Roast x2", total: "$92.00", date: "18 Feb 2026", status: "Entregado", statusColor: "bg-emerald-500/20 text-emerald-400" },
    { id: "#ORD-004", customer: "Luis Pérez", phone: "+58 416-9876543", products: "Amazonian Bold x3", total: "$84.00", date: "18 Feb 2026", status: "Pendiente", statusColor: "bg-amber-500/20 text-amber-400" },
    { id: "#ORD-005", customer: "Sofia Torres", phone: "+58 412-5556677", products: "Crema Suprema x2", total: "$60.00", date: "17 Feb 2026", status: "Enviado", statusColor: "bg-blue-500/20 text-blue-400" },
    { id: "#ORD-006", customer: "Diego Ramírez", phone: "+58 414-3344556", products: "Origen Único x1, Geisha Lot x1", total: "$99.00", date: "16 Feb 2026", status: "Entregado", statusColor: "bg-emerald-500/20 text-emerald-400" },
];

export default function AdminOrders() {
    const [filter, setFilter] = useState<"all" | "Pendiente" | "Enviado" | "Entregado">("all");

    const filtered = filter === "all" ? mockOrders : mockOrders.filter((o) => o.status === filter);

    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-3xl font-display font-bold text-white mb-1">Pedidos</h1>
                <p className="text-white/40 text-sm">Seguimiento de pedidos por WhatsApp</p>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2">
                {["all", "Pendiente", "Enviado", "Entregado"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${filter === f
                                ? "bg-white/10 text-white"
                                : "text-white/40 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        {f === "all" ? "Todos" : f}
                    </button>
                ))}
            </div>

            {/* Orders list */}
            <div className="space-y-3">
                {filtered.map((order, i) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-[#1C1C26] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                    <ClipboardList size={18} className="text-white/30" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-white">{order.customer}</span>
                                        <span className="text-xs font-mono text-white/30">{order.id}</span>
                                    </div>
                                    <p className="text-xs text-white/40 mt-1">{order.products}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="font-mono text-sm text-white">{order.total}</div>
                                    <div className="text-xs text-white/30">{order.date}</div>
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${order.statusColor}`}>
                                    {order.status}
                                </span>
                                <div className="flex items-center gap-1">
                                    <button className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors" title="Ver detalles">
                                        <Eye size={16} />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-[#25D366]/10 text-white/30 hover:text-[#25D366] transition-colors" title="Contactar por WhatsApp">
                                        <MessageCircle size={16} />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-emerald-500/10 text-white/30 hover:text-emerald-400 transition-colors" title="Marcar como entregado">
                                        <CheckCircle size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
