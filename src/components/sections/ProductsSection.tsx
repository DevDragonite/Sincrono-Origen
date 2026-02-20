"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import ProductMockup from '../ui/illustrations/ProductMockup';
import ProductModal from '../ui/ProductModal';
import { useState, useMemo } from 'react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '../ui/ToastNotification';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ProductsSection() {
    const { t, language } = useLanguage();
    const { addItem } = useCart();
    const { showToast } = useToast();

    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const products = t.products?.items || [];

    // Shuffle and pick 3 random products (changes on each page load / language switch)
    const randomProducts = useMemo(() => {
        const shuffled = [...products].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    const handleAddToCart = (e: React.MouseEvent, p: any) => {
        e.stopPropagation();
        addItem({ id: p.id, name: p.name, price: p.price, type: p.type });
        showToast(
            language === "es" ? `${p.name} añadido al carrito` : `${p.name} added to cart`,
            "cart"
        );
    };

    return (
        <section className="py-20 md:py-24 px-4 bg-brand-cream text-brand-brown">
            <div className="container mx-auto max-w-5xl">
                <div className="flex justify-between items-end mb-12 md:mb-16">
                    <div>
                        <h2 className="font-display text-3xl md:text-4xl mb-2">{t.products?.title}</h2>
                        <p className="text-brand-roast text-sm tracking-widest uppercase">{t.products?.subtitle}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-10">
                    {randomProducts.map((p: any, i: number) => (
                        <motion.div
                            key={p.id || i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => setSelectedProduct(p)}
                        >
                            <div className="aspect-square md:aspect-[4/5] bg-white border border-brand-brown/10 mb-3 md:mb-4 relative overflow-hidden transition-all duration-500 group-hover:border-brand-copper flex items-center justify-center p-4 md:p-6 rounded-lg">
                                <ProductMockup
                                    color={p.type === 'Robusta' ? "#2A1810" : i % 3 === 0 ? "#3D2B1F" : i % 3 === 1 ? "#2D5A27" : "#1A1A1A"}
                                    accent={p.type === 'Robusta' ? "#C65D3B" : i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#C0D860" : "#E5E5E5"}
                                    className="transition-transform duration-500 group-hover:scale-105 max-h-[200px] md:max-h-[260px]"
                                />
                                <div className="absolute inset-0 bg-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-display text-sm md:text-lg mb-1">{p.name}</h3>
                                    <p className="text-[10px] md:text-xs text-brand-roast max-w-[180px] hidden md:block">{p.desc}</p>
                                </div>
                                <span className="font-mono text-xs md:text-sm">{p.price}</span>
                            </div>

                            <button
                                onClick={(e) => handleAddToCart(e, p)}
                                className="w-full mt-2 md:mt-4 py-2 md:py-2.5 border border-brand-brown/20 text-[10px] md:text-xs font-bold uppercase hover:bg-brand-brown hover:text-white transition-all md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 rounded-lg"
                            >
                                {t.products?.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* "Ver Más" elegant link */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center mt-12 md:mt-16"
                >
                    <Link
                        href="/products"
                        className="group inline-flex items-center gap-3 px-8 py-3 border border-brand-brown/20 rounded-full text-sm font-bold uppercase tracking-widest text-brand-brown hover:bg-brand-brown hover:text-brand-cream transition-all duration-500"
                    >
                        {language === "es" ? "Ver Catálogo Completo" : "View Full Catalog"}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
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
        </section>
    );
}
