"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import ProductMockup from '../ui/illustrations/ProductMockup';
import ProductModal from '../ui/ProductModal';
import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '../ui/ToastNotification';


export default function ProductsSection() {
    const { t, language } = useLanguage();
    const { addItem } = useCart();
    const { showToast } = useToast();

    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    // Ensure we have items to render, fallback to empty array safely
    const products = t.products?.items || [];

    const handleAddToCart = (e: React.MouseEvent, p: any) => {
        e.stopPropagation();
        addItem({ id: p.id, name: p.name, price: p.price, type: p.type });
        showToast(
            language === "es" ? `${p.name} añadido al carrito` : `${p.name} added to cart`,
            "cart"
        );
    };

    return (
        <section className="py-24 px-4 bg-brand-cream text-brand-brown" >
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="font-display text-4xl mb-2">{t.products?.title}</h2>
                        <p className="text-brand-roast text-sm tracking-widest uppercase">{t.products?.subtitle}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-16">
                    {products.map((p: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => setSelectedProduct(p)}
                        >
                            <div className="aspect-square md:aspect-[3/4] bg-white border border-brand-brown/10 mb-3 md:mb-6 relative overflow-hidden transition-all duration-500 group-hover:border-brand-copper flex items-center justify-center p-4 md:p-8 rounded-lg">
                                <ProductMockup
                                    color={p.type === 'Robusta' ? "#2A1810" : i % 3 === 0 ? "#3D2B1F" : i % 3 === 1 ? "#2D5A27" : "#1A1A1A"}
                                    accent={p.type === 'Robusta' ? "#C65D3B" : i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#C0D860" : "#E5E5E5"}
                                    className="transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-display text-sm md:text-xl mb-1">{p.name}</h3>
                                    <p className="text-[10px] md:text-xs text-brand-roast max-w-[200px] hidden md:block">{p.desc}</p>
                                </div>
                                <span className="font-mono text-xs md:text-sm">{p.price}</span>
                            </div>

                            <button
                                onClick={(e) => handleAddToCart(e, p)}
                                className="w-full mt-3 md:mt-6 py-2 md:py-3 border border-brand-brown/20 text-[10px] md:text-xs font-bold uppercase hover:bg-brand-brown hover:text-white transition-all md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0"
                            >
                                {t.products?.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
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
        </section >
    );
}
