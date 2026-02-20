"use client";

import { motion } from "framer-motion";
import { Package, Plus, Edit2, Trash2, Search } from "lucide-react";
import { useState } from "react";

const mockProducts = [
    { id: "arabica_1", name: "Síncrono Blend", type: "Arábica", price: "$34.00", stock: 45, status: "Activo" },
    { id: "arabica_2", name: "Estate Origin", type: "Arábica", price: "$42.00", stock: 28, status: "Activo" },
    { id: "arabica_3", name: "Geisha Lot", type: "Arábica", price: "$65.00", stock: 12, status: "Activo" },
    { id: "robusta_1", name: "Amazonian Bold", type: "Robusta", price: "$28.00", stock: 60, status: "Activo" },
    { id: "robusta_2", name: "Crema Suprema", type: "Robusta", price: "$30.00", stock: 35, status: "Activo" },
    { id: "robusta_3", name: "Energy Roast", type: "Robusta", price: "$25.00", stock: 50, status: "Activo" },
];

export default function AdminProducts() {
    const [search, setSearch] = useState("");

    const filtered = mockProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white mb-1">Productos</h1>
                    <p className="text-white/40 text-sm">Gestión de inventario y catálogo</p>
                </div>
                <button className="flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-green/80 transition-colors">
                    <Plus size={18} />
                    Nuevo Producto
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#1C1C26] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-brand-green/50 outline-none transition-colors"
                />
            </div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1C1C26] border border-white/5 rounded-2xl overflow-hidden"
            >
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="text-left text-xs font-semibold text-white/40 uppercase tracking-wider px-5 py-4">Producto</th>
                            <th className="text-left text-xs font-semibold text-white/40 uppercase tracking-wider px-5 py-4">Tipo</th>
                            <th className="text-left text-xs font-semibold text-white/40 uppercase tracking-wider px-5 py-4">Precio</th>
                            <th className="text-left text-xs font-semibold text-white/40 uppercase tracking-wider px-5 py-4">Stock</th>
                            <th className="text-left text-xs font-semibold text-white/40 uppercase tracking-wider px-5 py-4">Estado</th>
                            <th className="text-right text-xs font-semibold text-white/40 uppercase tracking-wider px-5 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filtered.map((product, i) => (
                            <motion.tr
                                key={product.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                            <Package size={16} className="text-white/30" />
                                        </div>
                                        <span className="text-sm font-medium text-white">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${product.type === "Arábica"
                                            ? "bg-emerald-500/20 text-emerald-400"
                                            : "bg-amber-500/20 text-amber-400"
                                        }`}>
                                        {product.type}
                                    </span>
                                </td>
                                <td className="px-5 py-4 font-mono text-sm text-white/70">{product.price}</td>
                                <td className="px-5 py-4">
                                    <span className={`text-sm font-medium ${product.stock < 15 ? "text-red-400" : "text-white/70"}`}>
                                        {product.stock} uds
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                                        {product.status}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}
