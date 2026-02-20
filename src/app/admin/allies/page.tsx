"use client";

import { motion } from "framer-motion";
import { Users, Mail, CheckCircle, Clock, XCircle } from "lucide-react";

const mockApplications = [
    { id: "1", name: "Juan Martínez", email: "juan@email.com", area: "Barista", date: "20 Feb 2026", status: "Pendiente", statusColor: "bg-amber-500/20 text-amber-400" },
    { id: "2", name: "Laura Sánchez", email: "laura@cafe.com", area: "Tueste", date: "18 Feb 2026", status: "Aprobado", statusColor: "bg-emerald-500/20 text-emerald-400" },
    { id: "3", name: "Pedro Alonso", email: "pedro@tech.com", area: "Tecnología/Datos", date: "15 Feb 2026", status: "Pendiente", statusColor: "bg-amber-500/20 text-amber-400" },
    { id: "4", name: "Camila Rojas", email: "camila@barista.ve", area: "Barista", date: "12 Feb 2026", status: "Rechazado", statusColor: "bg-red-500/20 text-red-400" },
];

export default function AdminAllies() {
    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-3xl font-display font-bold text-white mb-1">Aliados</h1>
                <p className="text-white/40 text-sm">Solicitudes de colaboración y alianzas</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#1C1C26] border border-white/5 rounded-2xl p-5">
                    <div className="text-2xl font-bold text-white mb-1">12</div>
                    <div className="text-xs text-white/40">Total solicitudes</div>
                </div>
                <div className="bg-[#1C1C26] border border-white/5 rounded-2xl p-5">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">5</div>
                    <div className="text-xs text-white/40">Aprobados</div>
                </div>
                <div className="bg-[#1C1C26] border border-white/5 rounded-2xl p-5">
                    <div className="text-2xl font-bold text-amber-400 mb-1">4</div>
                    <div className="text-xs text-white/40">Pendientes</div>
                </div>
            </div>

            {/* Applications list */}
            <div className="space-y-3">
                {mockApplications.map((app, i) => (
                    <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-[#1C1C26] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green text-sm font-bold">
                                    {app.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white">{app.name}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Mail size={12} className="text-white/30" />
                                        <span className="text-xs text-white/40">{app.email}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-xs font-semibold text-white/60">{app.area}</div>
                                    <div className="text-xs text-white/30 mt-0.5">{app.date}</div>
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${app.statusColor}`}>
                                    {app.status}
                                </span>
                                <div className="flex items-center gap-1">
                                    <button className="p-2 rounded-lg hover:bg-emerald-500/10 text-white/30 hover:text-emerald-400 transition-colors" title="Aprobar">
                                        <CheckCircle size={16} />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors" title="Rechazar">
                                        <XCircle size={16} />
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
