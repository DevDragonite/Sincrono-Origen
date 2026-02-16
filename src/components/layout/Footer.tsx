import Image from 'next/image';
import { LucideSprout, LucideAward, LucideFileCheck, LucideInstagram, LucideLinkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-brand-black/90 backdrop-blur-md border-t border-brand-copper/20 text-white py-16 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Brand Column */}
                    <div className="md:col-span-4">
                        <h2 className="font-display text-2xl tracking-widest text-brand-copper mb-4">SÍNCRONO ORIGEN</h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Bridging the gap between the organic chaos of the farm and the digital precision of the cup.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-brand-copper transition-colors"><LucideInstagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-brand-copper transition-colors"><LucideLinkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Transparency */}
                    <div className="md:col-span-3">
                        <h3 className="text-brand-green font-bold text-xs tracking-[0.2em] mb-6 uppercase">Transparency</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
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
                        <h3 className="text-brand-green font-bold text-xs tracking-[0.2em] mb-6 uppercase">Sustainability</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><span className="text-brand-copper">•</span> Carbon Neutral Roast</li>
                            <li><span className="text-brand-copper">•</span> Compostable Packaging</li>
                            <li><span className="text-brand-copper">•</span> Water Cyclical Use</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="md:col-span-2">
                        <h3 className="text-brand-green font-bold text-xs tracking-[0.2em] mb-6 uppercase">Join the Cycle</h3>
                        <form className="mt-4 space-y-2">
                            <input
                                type="email"
                                placeholder="EMAIL"
                                className="w-full bg-transparent border-b border-brand-copper/30 py-2 text-sm focus:border-brand-copper outline-none transition-colors placeholder:text-gray-600"
                            />
                            <button className="text-xs text-brand-copper font-bold hover:text-white transition-colors">SUBSCRIBE -></button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>© 2026 Síncrono Origen. Caracas, Venezuela.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-brand-copper">Privacy Protocol</a>
                        <a href="#" className="hover:text-brand-copper">Terms of Extraction</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
