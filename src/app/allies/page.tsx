"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AlliesPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen pt-32 pb-16 px-4 md:px-8 bg-brand-cream text-brand-brown">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Allies Section */}
                <div>
                    <h1 className="font-display text-4xl md:text-5xl mb-8 text-brand-green-dark">Commercial Allies</h1>
                    <p className="text-brand-roast leading-relaxed mb-8">
                        We partner with cafes and businesses that share our precision-first philosophy.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-32 bg-white border border-brand-brown/10 flex items-center justify-center rounded-lg">Logo 1</div>
                        <div className="h-32 bg-white border border-brand-brown/10 flex items-center justify-center rounded-lg">Logo 2</div>
                    </div>
                </div>

                {/* Careers Section */}
                <div className="bg-white p-8 rounded-lg border border-brand-brown/5 shadow-sm">
                    <h2 className="font-display text-3xl mb-6">Work With Us</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-brand-roast">Name</label>
                            <input type="text" className="w-full bg-brand-cream border-b border-brand-brown/20 py-2 focus:border-brand-copper outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-brand-roast">Email</label>
                            <input type="email" className="w-full bg-brand-cream border-b border-brand-brown/20 py-2 focus:border-brand-copper outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-brand-roast">Area of Interest</label>
                            <select className="w-full bg-brand-cream border-b border-brand-brown/20 py-2 focus:border-brand-copper outline-none">
                                <option>Barista</option>
                                <option>Roasting</option>
                                <option>Tech/Data</option>
                            </select>
                        </div>
                        <button className="mt-4 px-8 py-3 bg-brand-brown text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-copper transition-colors">
                            Submit Application
                        </button>
                    </form>
                </div>

            </div>
        </main>
    );
}
