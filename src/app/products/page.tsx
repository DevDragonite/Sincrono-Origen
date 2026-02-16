"use client";

import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { motion } from 'framer-motion';
import ProductMockup from '@/components/ui/illustrations/ProductMockup';
import ProductModal from '@/components/ui/ProductModal';
import { useState } from 'react';

export default function ProductsPage() {
    const { t } = useLanguage();

    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const products = t.products?.items || [];

    return (
        <main className="min-h-screen pt-32 pb-16 px-4 md:px-8 bg-brand-cream text-brand-brown">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-display text-5xl md:text-7xl mb-4">{t.products?.title}</h1>
                    <p className="text-brand-roast text-sm tracking-widest uppercase">{t.products?.subtitle}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {products.map((p: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => setSelectedProduct(p)}
                        >
                            <div className="aspect-[4/5] bg-white border border-brand-brown/10 mb-6 relative overflow-hidden transition-all duration-500 group-hover:border-brand-copper flex items-center justify-center p-8 rounded-lg">
                                <ProductMockup
                                    color={p.type === 'Robusta' ? "#2A1810" : i % 3 === 0 ? "#3D2B1F" : i % 3 === 1 ? "#2D5A27" : "#1A1A1A"}
                                    accent={p.type === 'Robusta' ? "#C65D3B" : i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#C0D860" : "#E5E5E5"}
                                    className="transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-display text-xl mb-1">{p.name}</h3>
                                    <p className="text-xs text-brand-roast max-w-[200px]">{p.desc}</p>
                                </div>
                                <span className="font-mono text-sm">{p.price}</span>
                            </div>

                            <button className="w-full mt-6 py-3 border border-brand-brown/20 text-xs font-bold uppercase hover:bg-brand-brown hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 text-center">
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
        </main>
    );
}
