"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { calculateExtractionYield } from '@/lib/traceability';
import { useState, useEffect } from 'react';

export default function TraceabilitySection() {
    const { t } = useLanguage();
    const [stats, setStats] = useState({ extraction: 0, tds: 0 });

    useEffect(() => {
        // Simulamos la obtención de datos en tiempo real
        const data = calculateExtractionYield(18, 36, 1.45);
        setStats(data);
    }, []);

    return (
        <section className="py-24 bg-brand-brown text-brand-cream border-t border-brand-roast relative overflow-hidden">
            {/* Background Data Pattern */}
            <div className="absolute inset-0 opacity-5 font-mono text-[10px] leading-tight select-none pointer-events-none">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i}>{Math.random().toString(16).substring(2)} // DATA_STREAM // {Math.random().toFixed(4)}</div>
                ))}
            </div>

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
                            {t.traceability.desc}
                        </p>

                        <div className="grid grid-cols-2 gap-8 border-t border-brand-cream/10 pt-8">
                            <div>
                                <div className="text-3xl font-mono text-brand-copper mb-2">{stats.extraction}%</div>
                                <div className="text-xs tracking-widest uppercase opacity-60">Extraction Yield</div>
                            </div>
                            <div>
                                <div className="text-3xl font-mono text-brand-copper mb-2">{stats.tds}%</div>
                                <div className="text-xs tracking-widest uppercase opacity-60">Total Dissolved Solids</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square rounded-full border border-brand-cream/20 flex items-center justify-center p-12 relative">
                            <div className="absolute inset-0 border border-brand-cream/10 rounded-full scale-110 animate-pulse" />
                            <div className="text-center">
                                <span className="block text-6xl font-display mb-2">{t.traceability.lot}</span>
                                <span className="text-xs tracking-widest uppercase text-brand-green">Current Microlot</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
