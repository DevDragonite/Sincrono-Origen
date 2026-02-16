"use client";

import Image from 'next/image';
import { LucideSprout, LucideAward, LucideFileCheck, LucideInstagram, LucideLinkedin } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="relative bg-brand-brown border-t border-brand-roast text-white py-16 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Brand Column */}
                    <div className="md:col-span-4">
                        <h2 className="font-display text-2xl tracking-widest text-brand-cream mb-4">SÍNCRONO ORIGEN</h2>
                        <p className="text-brand-cream/60 text-sm leading-relaxed mb-6">
                            {t.footer.tagline}
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-brand-cream/60 hover:text-brand-copper transition-colors"><LucideInstagram size={20} /></a>
                            <a href="#" className="text-brand-cream/60 hover:text-brand-copper transition-colors"><LucideLinkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Transparency */}
                    <div className="md:col-span-3">
                        <h3 className="text-brand-green font-bold text-xs tracking-[0.2em] mb-6 uppercase">{t.footer.transparency}</h3>
                        <ul className="space-y-3 text-sm text-brand-cream/60">
                            <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                                <LucideFileCheck size={16} /> Data Sheets (TDS)
                            </li>
                            <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                                <LucideAward size={16} /> SICA: 1234-5678
                            </li>
                            <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                                <LucideSprout size={16} /> Direct Trade Contracts
                            </li>
                        </ul>
                    </div>

                    {/* Sustainability */}
                    <div className="md:col-span-3">
                        <h3 className="text-brand-green font-bold text-xs tracking-[0.2em] mb-6 uppercase">{t.footer.sustainability}</h3>
                        <ul className="space-y-3 text-sm text-brand-cream/60">
                            <li><span className="text-brand-copper">•</span> Carbon Neutral Roast</li>
                            <li><span className="text-brand-copper">•</span> Compostable Packaging</li>
                            <li><span className="text-brand-copper">•</span> Water Cyclical Use</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="md:col-span-2">
                        <h3 className="text-brand-green font-bold text-xs tracking-[0.2em] mb-6 uppercase">{t.footer.join}</h3>
                        <form className="mt-4 space-y-2">
                            <input
                                type="email"
                                placeholder="EMAIL"
                                className="w-full bg-transparent border-b border-brand-cream/30 py-2 text-sm focus:border-brand-copper outline-none transition-colors placeholder:text-brand-cream/40 text-brand-cream"
                            />
                            <button className="text-xs text-brand-copper font-bold hover:text-white transition-colors">SUBSCRIBE -&gt;</button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center text-xs text-brand-cream/40">
                    <p>{t.footer.rights}</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-brand-copper">Privacy Protocol</a>
                        <a href="#" className="hover:text-brand-copper">Terms of Extraction</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
