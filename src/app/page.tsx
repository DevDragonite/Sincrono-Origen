"use client";

import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';
import TraceabilitySection from '@/components/sections/TraceabilitySection';
import ProductsSection from '@/components/sections/ProductsSection';
import DynamicScene from '@/components/3d/DynamicScene';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Home() {
    const { t } = useLanguage();

    return (
        <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden bg-brand-cream text-brand-brown">
            {/* 3D Scene Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <DynamicScene />
            </div>

            {/* Hero Content */}
            <section className="relative z-10 flex flex-col items-center text-center p-4 min-h-screen justify-center">
                <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-brand-brown drop-shadow-sm">
                    <span className="block" data-speed="0.5">{t.hero.title.split(' ')[0]}</span>
                    <span className="block text-brand-roast" data-speed="0.8">{t.hero.title.split(' ').slice(1).join(' ')}</span>
                    <span className="block text-4xl md:text-6xl mt-4 font-light italic" data-speed="1.2">{t.hero.subtitle}</span>
                </h1>

                <div className="mt-8 flex items-center space-x-4 text-sm tracking-[0.2em] text-brand-roast uppercase font-bold">
                    <span>Caracas</span>
                    <span className="w-1 h-1 bg-current rounded-full" />
                    <span>1800m</span>
                    <span className="w-1 h-1 bg-current rounded-full" />
                    <span>Venezuela</span>
                </div>

                <div className="mt-12">
                    <MagneticButton className="border-brand-roast text-brand-roast hover:bg-brand-roast hover:text-white">
                        {t.hero.cta}
                    </MagneticButton>
                </div>
            </section>

            {/* Floating UI Data - Hidden on mobile, adapted for light mode */}
            <div className="fixed top-32 right-8 z-20 hidden md:block backdrop-blur-md border border-brand-brown/10 p-4 rounded-lg bg-white/50">
                <div className="flex justify-between items-center gap-8 mb-2">
                    <span className="text-xs text-brand-green-dark font-bold tracking-widest">ELEVATION</span>
                    <span className="font-mono text-brand-roast">1800m</span>
                </div>
                <div className="flex justify-between items-center gap-8">
                    <span className="text-xs text-brand-green-dark font-bold tracking-widest">VARIETY</span>
                    <span className="font-mono text-brand-roast">Bourbon</span>
                </div>
            </div>

            {/* Scrollytelling Indicators */}
            <div className="absolute bottom-10 w-full flex justify-center z-10">
                <div className="animate-bounce text-brand-roast/50 text-xs tracking-widest">SCROLL TO EXTRACT</div>
            </div>

            {/* Narrative Sections (Scrollytelling) */}
            <section className="h-screen w-full flex items-center justify-center relative z-10 pointer-events-none">
                {/* Farm - Empty for 3D view */}
            </section>

            <section className="h-screen w-full flex items-center justify-center relative z-10">
                <div className="bg-white/90 p-12 border-l-4 border-brand-green shadow-xl backdrop-blur-md max-w-2xl">
                    <h2 className="text-5xl font-display text-brand-green-dark mb-6">The Origin</h2>
                    <p className="text-brand-brown text-lg leading-relaxed">
                        In the mist-covered peaks of the Coastal Range, we cultivate more than just coffee.
                        We cultivate a legacy. Shade-grown under ancient canopies, our Red Bourbon varietal
                        thrives at 1800 meters, developing complex sugars and a density that only altitude can grant.
                    </p>
                </div>
            </section>

            <section className="h-screen w-full flex items-center justify-center relative z-10">
                <div className="bg-white/90 p-12 border-l-4 border-brand-roast shadow-xl backdrop-blur-md max-w-2xl">
                    <h2 className="text-5xl font-display text-brand-roast mb-6">The Roast</h2>
                    <p className="text-brand-brown text-lg leading-relaxed">
                        We bridge tradition with thermodynamics. Our roasting profiles are data-driven,
                        monitoring the rate of rise (RoR) to the second. This isn't just heat application;
                        it's the precise development of flavor compounds, unlocking notes of caramel, citrus, and dark chocolate.
                    </p>
                </div>
            </section>

            {/* Modules */}
            <div className="relative z-10 w-full bg-white">
                <TraceabilitySection />
                <ProductsSection />
            </div>
        </main>
    );
}
