"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Product {
    id: string;
    name: string;
    desc: string;
    price: string;
    origin: string;
    process: string;
    altitude: string;
    notes: string;
    type: string;
}

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    labels: any;
}

export default function ProductModal({ isOpen, onClose, product, labels }: ProductModalProps) {
    if (!isOpen || !product) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-brown/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-brand-cream w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-brown/10 text-brand-brown transition-colors z-10"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex flex-col md:flex-row h-full">
                        {/* Image Placeholder Side */}
                        <div className="w-full md:w-1/3 bg-brand-brown/5 flex items-center justify-center p-8">
                            <div className="w-32 h-40 bg-brand-brown/20 rounded-md"></div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-2/3 p-8">
                            <div className="mb-2">
                                <span className="text-xs font-bold tracking-widest uppercase text-brand-green">{product.type}</span>
                            </div>
                            <h2 className="font-display text-3xl text-brand-brown mb-2">{product.name}</h2>
                            <p className="text-brand-roast text-lg mb-6 leading-relaxed">{product.desc}</p>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <div className="text-xs font-bold text-brand-brown/40 uppercase mb-1">{labels.origin}</div>
                                    <div className="text-brand-brown font-medium">{product.origin}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-brand-brown/40 uppercase mb-1">{labels.process}</div>
                                    <div className="text-brand-brown font-medium">{product.process}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-brand-brown/40 uppercase mb-1">{labels.altitude}</div>
                                    <div className="text-brand-brown font-medium">{product.altitude}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-brand-brown/40 uppercase mb-1">{labels.notes}</div>
                                    <div className="text-brand-brown font-medium italic">{product.notes}</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-brand-brown/10">
                                <div className="font-mono text-2xl text-brand-copper">{product.price}</div>
                                <button className="bg-brand-brown text-brand-cream px-6 py-3 rounded hover:bg-brand-green transition-colors uppercase text-xs font-bold tracking-widest">
                                    {labels.cta}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
