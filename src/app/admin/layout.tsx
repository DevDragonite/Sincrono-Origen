"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Package,
    ClipboardList,
    FileText,
    Users,
    BarChart3,
    ChevronLeft,
    Coffee
} from "lucide-react";
import { useState } from "react";

const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Productos" },
    { href: "/admin/orders", icon: ClipboardList, label: "Pedidos" },
    { href: "/admin/blog", icon: FileText, label: "Blog" },
    { href: "/admin/allies", icon: Users, label: "Aliados" },
    { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-[#0F0F12] text-white flex">
            {/* Sidebar */}
            <aside className={`${collapsed ? "w-20" : "w-64"} bg-[#16161D] border-r border-white/5 flex flex-col transition-all duration-300 fixed h-full z-30`}>
                {/* Brand */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    {!collapsed && (
                        <div>
                            <div className="font-display font-bold text-lg tracking-widest text-white">SÍNCRONO</div>
                            <div className="text-[0.55rem] tracking-[0.25em] uppercase text-white/40">Admin Panel</div>
                        </div>
                    )}
                    {collapsed && <Coffee className="text-white/60 mx-auto" size={24} />}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={18} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 py-4 space-y-1 px-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${isActive
                                        ? "bg-brand-green/20 text-brand-green font-semibold"
                                        : "text-white/50 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon size={20} className={isActive ? "text-brand-green" : "text-white/40 group-hover:text-white"} />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Back to store */}
                <div className="p-4 border-t border-white/5">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <ChevronLeft size={18} />
                        {!collapsed && <span>Volver a la tienda</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 ${collapsed ? "ml-20" : "ml-64"} transition-all duration-300`}>
                {children}
            </main>
        </div>
    );
}
