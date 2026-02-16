"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import ProductMockup from '../ui/illustrations/ProductMockup';
import ProductModal from '../ui/ProductModal';
import { useState } from 'react';


export default function ProductsSection() {
    const { t } = useLanguage();

    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    // Ensure we have items to render, fallback to empty array safely
    const products = t.products?.items || [];

    return (
        <section className="py-24 px-4 bg-brand-cream text-brand-brown" >
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="font-display text-4xl mb-2">{t.products?.title}</h2>
                        <p className="text-brand-roast text-sm tracking-widest uppercase">{t.products?.subtitle}</p>
                    </div>
                </div>

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
                            <div className="aspect-[4/5] bg-white border border-brand-brown/10 mb-6 relative overflow-hidden transition-all duration-500 group-hover:border-brand-copper flex items-center justify-center p-8">
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

                            <button className="w-full mt-6 py-3 border border-brand-brown/20 text-xs font-bold uppercase hover:bg-brand-brown hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
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
