"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AlliesPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen pt-32 pb-16 px-4 md:px-8 bg-brand-cream text-brand-brown">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Allies Section */}
                <div>
                    <h1 className="font-display text-4xl md:text-5xl mb-8 text-brand-green-dark">{t.allies.title}</h1>
                    <p className="text-brand-roast leading-relaxed mb-8">
                        {t.allies.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Starbucks */}
                        <div className="h-32 bg-white border border-brand-brown/10 flex items-center justify-center rounded-lg p-2 hover:border-brand-green transition-colors group relative overflow-hidden">
                            <span className="font-display font-bold text-brand-green-dark text-xl tracking-widest group-hover:scale-110 transition-transform">STARBUCKS</span>
                        </div>

                        {/* Dunkin' */}
                        <div className="h-32 bg-white border border-brand-brown/10 flex items-center justify-center rounded-lg p-2 hover:border-[#FF671F] transition-colors group relative overflow-hidden">
                            <span className="font-sans font-bold text-[#FF671F] text-xl tracking-tight group-hover:scale-110 transition-transform">DUNKIN'</span>
                        </div>

                        {/* McCafe */}
                        <div className="h-32 bg-white border border-brand-brown/10 flex items-center justify-center rounded-lg p-2 hover:border-[#DA291C] transition-colors group relative overflow-hidden">
                            <span className="font-sans font-bold text-[#DA291C] text-xl italic group-hover:scale-110 transition-transform">McCafé</span>
                        </div>

                        {/* Tim Hortons */}
                        <div className="h-32 bg-white border border-brand-brown/10 flex items-center justify-center rounded-lg p-2 hover:border-[#C8102E] transition-colors group relative overflow-hidden">
                            <span className="font-serif font-bold text-[#C8102E] text-xl tracking-wide group-hover:scale-110 transition-transform">Tim Hortons</span>
                        </div>
                    </div>
                </div>

                {/* Careers Section */}
                <div className="bg-white p-8 rounded-lg border border-brand-brown/5 shadow-sm">
                    <h2 className="font-display text-3xl mb-6">{t.allies.work_with_us}</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-brand-roast">{t.allies.name}</label>
                            <input type="text" className="w-full bg-brand-cream border-b border-brand-brown/20 py-2 focus:border-brand-copper outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-brand-roast">{t.allies.email}</label>
                            <input type="email" className="w-full bg-brand-cream border-b border-brand-brown/20 py-2 focus:border-brand-copper outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-brand-roast">{t.allies.area}</label>
                            <select className="w-full bg-brand-cream border-b border-brand-brown/20 py-2 focus:border-brand-copper outline-none">
                                <option>{t.allies.barista}</option>
                                <option>{t.allies.roasting}</option>
                                <option>{t.allies.tech}</option>
                            </select>
                        </div>
                        <button className="mt-4 px-8 py-3 bg-brand-brown text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-copper transition-colors">
                            {t.allies.submit}
                        </button>
                    </form>
                </div>

            </div>
        </main>
    );
}
