"use client";

import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { motion } from 'framer-motion';

export default function ProductsPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen pt-32 pb-16 px-4 md:px-8 bg-brand-cream text-brand-brown">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-display text-5xl md:text-7xl mb-4">{t.products.title}</h1>
                    <p className="text-brand-roast text-sm tracking-widest uppercase">{t.products.subtitle}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Product 1 */}
                    <div className="group border border-brand-brown/10 p-6 rounded-lg hover:border-brand-copper transition-colors bg-white">
                        <div className="aspect-square bg-gray-100 mb-6 rounded-md relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-mono text-xs">[IMG]</div>
                        </div>
                        <h3 className="font-display text-2xl mb-2">Síncrono Blend</h3>
                        <p className="text-brand-roast text-sm mb-4">Notes of caramel and citrus.</p>
                        <button className="w-full py-3 border border-brand-brown/20 text-xs font-bold uppercase hover:bg-brand-brown hover:text-white transition-colors">
                            {t.products.cta}
                        </button>
                    </div>

                    {/* Placeholder for more products */}
                    <div className="group border border-brand-brown/10 p-6 rounded-lg hover:border-brand-copper transition-colors bg-white">
                        <div className="aspect-square bg-gray-100 mb-6 rounded-md relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-mono text-xs">[IMG]</div>
                        </div>
                        <h3 className="font-display text-2xl mb-2">Cold Brew</h3>
                        <p className="text-brand-roast text-sm mb-4">18-hour extraction.</p>
                        <button className="w-full py-3 border border-brand-brown/20 text-xs font-bold uppercase hover:bg-brand-brown hover:text-white transition-colors">
                            {t.products.cta}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
