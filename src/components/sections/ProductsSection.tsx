"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';


export default function ProductsSection() {
    const { t } = useLanguage();

    const products = [
        {
            name: "Síncrono Blend",
            desc: "Red Bourbon / Caturra",
            price: "$34.00"
        },
        {
            name: "Estate Origin",
            desc: "Single Varietal: Bourbon",
            price: "$42.00"
        },
        {
            name: "Geisha Lot",
            desc: "Experimental Fermentation",
            price: "$65.00"
        }
    ];

    return (
        <section className="py-24 px-4 bg-brand-cream text-brand-brown" >
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="font-display text-4xl mb-2">{t.products.title}</h2>
                        <p className="text-brand-roast text-sm tracking-widest uppercase">{t.products.subtitle}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[4/5] bg-white border border-brand-brown/10 mb-6 relative overflow-hidden transition-all duration-500 group-hover:border-brand-copper">
                                <div className="absolute inset-0 flex items-center justify-center text-brand-brown/20 font-mono text-xs">
                                    [PRODUCT IMAGE]
                                </div>
                                <div className="absolute inset-0 bg-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-display text-xl mb-1">{p.name}</h3>
                                    <p className="text-xs text-brand-roast">{p.desc}</p>
                                </div>
                                <span className="font-mono text-sm">{p.price}</span>
                            </div>

                            <button className="w-full mt-6 py-3 border border-brand-brown/20 text-xs font-bold uppercase hover:bg-brand-brown hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                                {t.products.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    );
}
