"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function BlogPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen pt-32 pb-16 px-4 md:px-8 bg-brand-cream text-brand-brown">
            <div className="container mx-auto max-w-4xl">
                <h1 className="font-display text-5xl md:text-6xl mb-12 text-center text-brand-green-dark">The Journal</h1>

                <div className="space-y-12">
                    {/* Article 1 */}
                    <article className="border-b border-brand-brown/10 pb-12">
                        <div className="text-xs font-bold text-brand-copper uppercase tracking-widest mb-2">February 2026</div>
                        <h2 className="font-display text-3xl md:text-4xl mb-4 hover:text-brand-green-dark transition-colors cursor-pointer">
                            The Renaissance of Venezuelan Bourbon
                        </h2>
                        <p className="text-brand-roast leading-relaxed mb-6">
                            Exploring how precision agriculture is reviving ancient varietals in the coastal mountains.
                        </p>
                        <a href="#" className="text-xs font-bold underline decoration-brand-copper underline-offset-4 hover:text-brand-copper">Read Protocol</a>
                    </article>

                    {/* Article 2 */}
                    <article className="border-b border-brand-brown/10 pb-12">
                        <div className="text-xs font-bold text-brand-copper uppercase tracking-widest mb-2">January 2026</div>
                        <h2 className="font-display text-3xl md:text-4xl mb-4 hover:text-brand-green-dark transition-colors cursor-pointer">
                            Data-Driven Roasting Profiles
                        </h2>
                        <p className="text-brand-roast leading-relaxed mb-6">
                            How we use sensor data to replicate the perfect Maillard reaction every single time.
                        </p>
                        <a href="#" className="text-xs font-bold underline decoration-brand-copper underline-offset-4 hover:text-brand-copper">Read Protocol</a>
                    </article>
                </div>
            </div>
        </main>
    );
}
