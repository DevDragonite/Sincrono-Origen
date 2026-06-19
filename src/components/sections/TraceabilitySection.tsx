"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const images = [
    { src: "/images/sincro-folleto.jpeg", alt: "Folleto Loma Encantada" },
    { src: "/images/sincro-edificio.jpeg", alt: "Edificio Loma Encantada" },
    { src: "/images/sincro-empaque.jpeg", alt: "Empaque Loma Encantada" },
];

export default function TraceabilitySection() {
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Rotate images every 4 seconds
    useEffect(() => {
        if (!mounted) return;
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [mounted]);

    if (!mounted) return null;

    return (
        <section className="py-24 bg-brand-brown text-brand-cream border-t border-brand-roast relative overflow-hidden">
            {/* Organic Background Texture */}
            <div className="absolute inset-0 opacity-10 mix-blend-soft-light bg-[url('/noise.png')] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-brown via-brand-brown/95 to-brand-brown pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                            <span className="text-xs font-bold tracking-widest text-brand-green uppercase">{t.traceability.title}</span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
                            {t.traceability.subtitle}
                        </h2>
                        <p className="text-brand-cream/80 text-lg leading-relaxed mb-8 max-w-prose">
                            {t.traceability.description}
                        </p>
                    </div>

                    {/* Right Side - Rotating Image Slideshow */}
                    <div className="w-full flex justify-center items-center lg:order-last">
                        <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-brand-cream/10 shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImage}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={images[currentImage].src}
                                        alt={images[currentImage].alt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 320px, 384px"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Dot indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentImage(i)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentImage
                                                ? "bg-brand-cream w-5"
                                                : "bg-brand-cream/40 hover:bg-brand-cream/60"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
