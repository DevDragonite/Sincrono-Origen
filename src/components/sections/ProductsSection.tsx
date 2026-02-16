"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const PRODUCTS = [
    {
        id: 1,
        name: "Síncrono Blend",
        type: "House Roast",
        price: "$5.50 / 250g",
        description: "Graphite notes with a copper finish. Engineered for daily calibration.",
        image: "/placeholder-blend.jpg" // In a real app, this would be a real image
    },
    {
        id: 2,
        name: "Cold Brew Concentrate",
        type: "Extraction",
        price: "$12.00 / 500ml",
        description: "24-hour steep. Cryo-stabilized for maximum clarity.",
        image: "/placeholder-coldbrew.jpg"
    },
    {
        id: 3,
        name: "V60 Kit",
        type: "Hardware",
        price: "$45.00",
        description: "Manual brewing precision. Includes ceramic dripper and server.",
        image: "/placeholder-v60.jpg"
    }
];

export default function ProductsSection() {
    return (
        <section className="py-32 bg-brand-black relative z-10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <h2 className="font-display text-4xl md:text-5xl text-white">
                        <span className="text-brand-green">PRODUCT</span> PROTOCOLS
                    </h2>
                    <p className="text-gray-400 text-sm tracking-widest uppercase mt-4 md:mt-0">
                        Available for Deployment
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PRODUCTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative border border-white/10 bg-white/5 p-6 hover:border-brand-copper/50 transition-colors"
                        >
                            {/* Image Placeholder */}
                            <div className="aspect-square bg-brand-charcoal mb-6 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs">
                                    [IMAGE_ABSENT]
                                </div>
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-brand-copper/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-display text-white group-hover:text-brand-copper transition-colors">{product.name}</h3>
                                <span className="text-brand-green font-mono text-sm">{product.price}</span>
                            </div>

                            <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">{product.type}</div>
                            <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>

                            <button className="mt-6 w-full py-3 border border-white/20 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
                                Add to Cart
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
