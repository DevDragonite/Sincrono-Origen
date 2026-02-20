"use client";

import { motion } from "framer-motion";
import { FileText, Plus, Edit2, Trash2, Eye, Calendar } from "lucide-react";

const mockPosts = [
    {
        id: "1",
        title: "El Renacimiento del Bourbon Venezolano",
        status: "Publicado",
        date: "15 Feb 2026",
        views: 234,
        statusColor: "bg-emerald-500/20 text-emerald-400"
    },
    {
        id: "2",
        title: "Perfiles de Tueste Basados en Datos",
        status: "Publicado",
        date: "28 Ene 2026",
        views: 189,
        statusColor: "bg-emerald-500/20 text-emerald-400"
    },
    {
        id: "3",
        title: "Guía: Cómo Preparar el Café Perfecto",
        status: "Borrador",
        date: "20 Feb 2026",
        views: 0,
        statusColor: "bg-amber-500/20 text-amber-400"
    },
];

export default function AdminBlog() {
    return (
        <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white mb-1">Blog</h1>
                    <p className="text-white/40 text-sm">Gestión de contenidos y artículos</p>
                </div>
                <button className="flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-green/80 transition-colors">
                    <Plus size={18} />
                    Nuevo Artículo
                </button>
            </div>

            <div className="space-y-3">
                {mockPosts.map((post, i) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#1C1C26] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                    <FileText size={20} className="text-white/30" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-white">{post.title}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <div className="flex items-center gap-1 text-xs text-white/30">
                                            <Calendar size={12} />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-white/30">
                                            <Eye size={12} />
                                            {post.views} vistas
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${post.statusColor}`}>
                                    {post.status}
                                </span>
                                <div className="flex items-center gap-1">
                                    <button className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors">
                                        <Trash2 size={16} />
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
