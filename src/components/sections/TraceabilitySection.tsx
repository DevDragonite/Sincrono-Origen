"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { calculateExtractionYield } from '@/lib/traceability';
import CoffeeCherryIllustration from '../ui/illustrations/CoffeeCherryIllustration';
import { useState, useEffect } from 'react';

export default function TraceabilitySection() {
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [bgPattern, setBgPattern] = useState<string[]>([]);

    useEffect(() => {
        setMounted(true);
        // Generate random pattern only on client
        setBgPattern(Array.from({ length: 100 }).map(() => `${Math.random().toString(16).substring(2)} // DATA_STREAM // ${Math.random().toFixed(4)}`));
    }, []);

    if (!mounted) return null; // Prevent hydration mismatch on initial render if needed, or just render static content

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
                        <h2 className="font-display text-4xl md:text-5xl mb-6">
                            {t.traceability.subtitle}
                        </h2>
                        <p className="text-brand-cream/80 text-lg leading-relaxed mb-8">
                            {t.traceability.description}
                        </p>
                    </div>

                    {/* Right Side - Image/Illustration - Centered in column for balance */}
                    <div className="w-full flex justify-center items-center order-first lg:order-last">
                        <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-brand-cream/10 shadow-2xl">
                            <Image
                                src="/images/hands-cherries.jpg"
                                alt="Manos recolectando cerezas de café"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </section >
    );
}
