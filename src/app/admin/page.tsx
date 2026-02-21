"use client";

import {
    Package,
    ClipboardList,
    DollarSign,
    TrendingUp,
    Users,
    ShoppingCart,
    ArrowUpRight,
    ArrowDownRight,
    Eye,
    Coffee
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";

// Añadimos la interfaz de la transacción de Command Center
interface Transaction {
    id: string;
    date: string;
    amount: number;
    currency: 'USD' | 'VES';
    exchange_rate: number | null;
    type: 'INGRESO' | 'EGRESO';
    status: 'ACTIVO' | 'ANULADO';
    business_id: string;
    concept: string;
    client_provider?: string;
    created_at?: string;
}

const stats = [
    // Las "Ventas del Mes" reales se inyectarán dinámicamente arriba de este array
    {
        id: "ventas-mes",
        label: "Ventas del Mes",
        value: "$0",
        change: "En vivo",
        up: true,
        icon: DollarSign,
        color: "from-emerald-500/20 to-emerald-500/5",
        iconColor: "text-emerald-400"
    },
    {
        id: "pedidos-pendientes",
        label: "Pedidos Pendientes",
        value: "23",
        change: "+3",
        up: true,
        icon: ClipboardList,
        color: "from-amber-500/20 to-amber-500/5",
        iconColor: "text-amber-400"
    },
    {
        id: "productos-activos",
        label: "Productos Activos",
        value: "6",
        change: "0",
        up: true,
        icon: Package,
        color: "from-blue-500/20 to-blue-500/5",
        iconColor: "text-blue-400"
    },
    {
        id: "visitantes-hoy",
        label: "Visitantes Hoy",
        value: "142",
        change: "+8.3%",
        up: true,
        icon: Eye,
        color: "from-purple-500/20 to-purple-500/5",
        iconColor: "text-purple-400"
    },
];

const recentOrders = [
    { id: "#ORD-001", customer: "María González", product: "Síncrono Blend x2", total: "$68.00", status: "Pendiente", statusColor: "bg-amber-500/20 text-amber-400" },
    { id: "#ORD-002", customer: "Carlos Mendoza", product: "Geisha Lot x1", total: "$65.00", status: "Enviado", statusColor: "bg-blue-500/20 text-blue-400" },
    { id: "#ORD-003", customer: "Ana Rodríguez", product: "Estate Origin x1, Energy Roast x2", total: "$92.00", status: "Entregado", statusColor: "bg-emerald-500/20 text-emerald-400" },
    { id: "#ORD-004", customer: "Luis Pérez", product: "Amazonian Bold x3", total: "$84.00", status: "Pendiente", statusColor: "bg-amber-500/20 text-amber-400" },
    { id: "#ORD-005", customer: "Sofia Torres", product: "Crema Suprema x2", total: "$60.00", status: "Enviado", statusColor: "bg-blue-500/20 text-blue-400" },
];

const topProducts = [
    { name: "Síncrono Blend", sold: 45, revenue: "$1,530", pct: 85 },
    { name: "Geisha Lot", sold: 28, revenue: "$1,820", pct: 65 },
    { name: "Estate Origin", sold: 22, revenue: "$924", pct: 50 },
    { name: "Amazonian Bold", sold: 18, revenue: "$504", pct: 40 },
];

export default function AdminDashboard() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        // Cargar data inicial histórica solo para Síncrono Café
        const fetchInitial = async () => {
            const { data } = await supabase
                .from('transactions')
                .select('*')
                .eq('business_id', 'cafe')
                .order('created_at', { ascending: false });

            if (data) setTransactions(data);
        };

        fetchInitial();

        // Suscribirse a los cambios en tiempo real
        const channel = supabase.channel('sincrono-dashboard')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'transactions', filter: "business_id=eq.cafe" },
                (payload) => {
                    const eventType = payload.eventType;
                    const newRecord = payload.new as Transaction;

                    setTransactions(prev => {
                        if (eventType === 'INSERT') return [newRecord, ...prev];
                        if (eventType === 'UPDATE') return prev.map(t => t.id === newRecord.id ? newRecord : t);
                        // DELETE no lo manejamos porque hacemos soft-delete (ANULADO)
                        return prev;
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Calcular las Ventas Reales (Ingresos Activos)
    const realRevenue = useMemo(() => {
        const ingresos = transactions.filter(t => t.type === 'INGRESO' && t.status !== 'ANULADO');
        return ingresos.reduce((total, t) => {
            let usdAmount = t.amount;
            if (t.currency === 'VES' && t.exchange_rate) {
                usdAmount = t.amount / t.exchange_rate;
            }
            return total + usdAmount;
        }, 0);
    }, [transactions]);

    // Dinamizar el primer stat (Ventas del Mes) con la data real de Supabase
    const dynamicStats = stats.map(st => {
        if (st.id === "ventas-mes") {
            return {
                ...st,
                value: `$${realRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            }
        }
        return st;
    });

    // Generar la lista de "Pedidos Recientes" basándonos en las últimas 5 transacciones
    const dynamicRecentOrders = useMemo(() => {
        // Ordenar explícitamente por fecha/creación descendente (más nuevo primero)
        const sortedTransactions = [...transactions].sort((a, b) => {
            const timeA = new Date(a.created_at || a.date).getTime();
            const timeB = new Date(b.created_at || b.date).getTime();
            return timeB - timeA;
        });

        return sortedTransactions.slice(0, 5).map(t => {
            let status = "Completado";
            let statusColor = "bg-emerald-500/20 text-emerald-400";

            if (t.status === 'ANULADO') {
                status = "Anulado";
                statusColor = "bg-red-500/20 text-red-400";
            } else if (t.type === 'EGRESO') {
                status = "Egreso";
                statusColor = "bg-zinc-500/20 text-zinc-400";
            }

            const amountInUsd = t.currency === 'VES' && t.exchange_rate ? t.amount / t.exchange_rate : t.amount;
            const formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amountInUsd);

            return {
                id: `#${t.id.split('-')[0].toUpperCase()}`,
                customer: t.client_provider || "Cliente en Local",
                product: t.concept,
                total: formattedTotal,
                status,
                statusColor,
                isAnulado: t.status === 'ANULADO'
            };
        });
    }, [transactions]);

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold text-white mb-1">Dashboard</h1>
                <p className="text-white/40 text-sm">Resumen general de Síncrono Origen</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dynamicStats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative bg-[#1C1C26] border border-white/5 rounded-2xl p-5 overflow-hidden group hover:border-white/10 transition-colors"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.iconColor}`}>
                                    <stat.icon size={20} />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                                    {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.change}
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-xs text-white/40">{stat.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-[#1C1C26] border border-white/5 rounded-2xl overflow-hidden"
                >
                    <div className="flex items-center justify-between p-5 border-b border-white/5">
                        <h2 className="font-semibold text-white flex items-center gap-2">
                            <ShoppingCart size={18} className="text-white/40" />
                            Pedidos Recientes
                        </h2>
                        <button className="text-xs text-brand-green hover:text-brand-green/80 transition-colors font-medium">Ver todos</button>
                    </div>
                    <div className="divide-y divide-white/5">
                        {dynamicRecentOrders.map((order, i) => (
                            <div key={i} className={`flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors ${order.isAnulado ? 'opacity-50 grayscale' : ''}`}>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-mono text-white/30">{order.id}</span>
                                    <div>
                                        <div className={`text-sm text-white font-medium ${order.isAnulado ? 'line-through' : ''}`}>{order.customer}</div>
                                        <div className={`text-xs text-white/40 mt-0.5 ${order.isAnulado ? 'line-through' : ''}`}>{order.product}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`font-mono text-sm ${order.isAnulado ? 'line-through text-white/40' : 'text-white/70'}`}>{order.total}</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${order.statusColor}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Top Products */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#1C1C26] border border-white/5 rounded-2xl overflow-hidden"
                >
                    <div className="p-5 border-b border-white/5">
                        <h2 className="font-semibold text-white flex items-center gap-2">
                            <Coffee size={18} className="text-white/40" />
                            Productos Top
                        </h2>
                    </div>
                    <div className="p-5 space-y-5">
                        {topProducts.map((product, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-white font-medium">{product.name}</span>
                                    <span className="text-xs text-white/40">{product.sold} vendidos</span>
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${product.pct}%` }}
                                        transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                                        className="h-full rounded-full bg-gradient-to-r from-brand-green to-brand-copper"
                                    />
                                </div>
                                <div className="text-right mt-1">
                                    <span className="text-xs font-mono text-brand-copper">{product.revenue}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
