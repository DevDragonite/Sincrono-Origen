"use client";

import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import ProductModal from '@/components/ui/ProductModal';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/components/ui/ToastNotification';
import { useLenis } from 'lenis/react';

export default function ProductsPage() {
    const { t, language } = useLanguage();
    const { addItem } = useCart();
    const { showToast } = useToast();
    const lenis = useLenis();

    // Smooth scroll to top on page mount for consistent transitions
    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { lerp: 0.1, duration: 1.5 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [lenis]);

    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [filter, setFilter] = useState<"all" | "Arabica" | "Robusta">("all");
    const products = t.products?.items || [];

    const filteredProducts = filter === "all"
        ? products
        : products.filter((p: any) => {
            // Handle both EN and ES type names
            const type = p.type?.toLowerCase();
            if (filter === "Arabica") return type === "arabica" || type === "arábica";
            if (filter === "Robusta") return type === "robusta";
            return true;
        });

    const handleAddToCart = (e: React.MouseEvent, p: any) => {
        e.stopPropagation();
        addItem({ id: p.id, name: p.name, price: p.price, type: p.type });
        showToast(
            language === "es" ? `${p.name} añadido al carrito` : `${p.name} added to cart`,
            "cart"
        );
    };

    const filterButtons = [
        { key: "all" as const, label: language === "es" ? "Todos" : "All" },
    ];

    return (
        <main className="min-h-screen pt-32 pb-16 px-4 md:px-8 bg-brand-cream text-brand-brown">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="font-display text-5xl md:text-7xl mb-4">{t.products?.title}</h1>
                    <p className="text-brand-roast text-sm tracking-widest uppercase">{t.products?.subtitle}</p>
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex justify-center gap-2 mb-12"
                >
                    {filterButtons.map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full border transition-all duration-300 ${filter === f.key
                                ? "bg-brand-brown text-brand-cream border-brand-brown"
                                : "border-brand-brown/20 text-brand-roast hover:border-brand-brown/50"
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </motion.div>

                <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-10">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((p: any, i: number) => (
                            <motion.div
                                key={p.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: i * 0.05 }}
                                className="group cursor-pointer"
                                onClick={() => setSelectedProduct(p)}
                            >
                                <div className="aspect-square md:aspect-[4/5] bg-brand-cream border border-brand-brown/10 mb-3 md:mb-4 relative overflow-hidden transition-all duration-500 group-hover:border-brand-copper flex items-center justify-center p-4 md:p-6 rounded-lg">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="max-h-[220px] md:max-h-[300px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-display text-sm md:text-lg mb-1">{p.name}</h3>
                                        <p className="text-[10px] md:text-xs text-brand-roast max-w-[200px] hidden md:block">{p.desc}</p>
                                    </div>
                                    <span className="font-mono text-xs md:text-sm">{p.price}</span>
                                </div>

                                <button
                                    onClick={(e) => handleAddToCart(e, p)}
                                    className="w-full mt-2 md:mt-4 py-2 md:py-2.5 border border-brand-brown/20 text-[10px] md:text-xs font-bold uppercase hover:bg-brand-brown hover:text-white transition-all md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 text-center rounded-lg"
                                >
                                    {t.products?.cta}
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            <ProductModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                product={selectedProduct}
                labels={{
                    origin: t.products?.origin,
                    process: t.products?.process,
                    altitude: t.products?.altitude,
                    notes: t.products?.notes,
                    cta: t.products?.cta
                }}
            />
        </main>
    );
}
