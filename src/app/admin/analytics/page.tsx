"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, ShoppingCart, Globe, ArrowUpRight } from "lucide-react";

const weeklyData = [
    { day: "Lun", value: 35 },
    { day: "Mar", value: 52 },
    { day: "Mié", value: 41 },
    { day: "Jue", value: 68 },
    { day: "Vie", value: 75 },
    { day: "Sáb", value: 90 },
    { day: "Dom", value: 45 },
];

const trafficSources = [
    { source: "Instagram", visitors: 450, pct: 38, color: "from-pink-500 to-purple-500" },
    { source: "WhatsApp Directo", visitors: 320, pct: 27, color: "from-[#25D366] to-emerald-600" },
    { source: "Google Search", visitors: 230, pct: 19, color: "from-blue-500 to-cyan-500" },
    { source: "Referral", visitors: 120, pct: 10, color: "from-amber-500 to-orange-500" },
    { source: "Otros", visitors: 70, pct: 6, color: "from-gray-400 to-gray-500" },
];

const conversionMetrics = [
    { label: "Tasa de conversión", value: "3.2%", change: "+0.5%", icon: TrendingUp },
    { label: "Visitantes únicos", value: "1,190", change: "+12%", icon: Users },
    { label: "Pedidos esta semana", value: "38", change: "+8", icon: ShoppingCart },
    { label: "Tiempo en sitio (avg)", value: "2:45", change: "+15s", icon: Globe },
];

export default function AdminAnalytics() {
    const maxValue = Math.max(...weeklyData.map(d => d.value));

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-display font-bold text-white mb-1">Analytics</h1>
                <p className="text-white/40 text-sm">Métricas y rendimiento del e-commerce</p>
            </div>

            {/* Quick metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {conversionMetrics.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#1C1C26] border border-white/5 rounded-2xl p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/30">
                                <m.icon size={18} />
                            </div>
                            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
                                <ArrowUpRight size={12} />
                                {m.change}
                            </span>
                        </div>
                        <div className="text-xl font-bold text-white">{m.value}</div>
                        <div className="text-xs text-white/40 mt-1">{m.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#1C1C26] border border-white/5 rounded-2xl p-6"
                >
                    <h2 className="font-semibold text-white mb-6 flex items-center gap-2">
                        <BarChart3 size={18} className="text-white/40" />
                        Visitantes por Día
                    </h2>
                    <div className="flex items-end justify-between gap-2 h-48">
                        {weeklyData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <span className="text-xs font-mono text-white/40">{d.value}</span>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(d.value / maxValue) * 100}%` }}
                                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                                    className="w-full rounded-t-lg bg-gradient-to-t from-brand-green/60 to-brand-green min-h-[4px]"
                                />
                                <span className="text-xs text-white/30">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Traffic Sources */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#1C1C26] border border-white/5 rounded-2xl p-6"
                >
                    <h2 className="font-semibold text-white mb-6 flex items-center gap-2">
                        <Globe size={18} className="text-white/40" />
                        Fuentes de Tráfico
                    </h2>
                    <div className="space-y-4">
                        {trafficSources.map((src, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-white">{src.source}</span>
                                    <span className="text-xs text-white/40">{src.visitors} visitas ({src.pct}%)</span>
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${src.pct}%` }}
                                        transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                                        className={`h-full rounded-full bg-gradient-to-r ${src.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
