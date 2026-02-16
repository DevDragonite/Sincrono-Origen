"use client";

import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';
import TraceabilitySection from '@/components/sections/TraceabilitySection';
import ProductsSection from '@/components/sections/ProductsSection';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const { t } = useLanguage();
    const heroRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power4.out",
                    stagger: 0.2
                }
            );

            gsap.to(".hero-parallax", {
                yPercent: 50,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden bg-brand-cream text-brand-brown selection:bg-brand-green selection:text-white">

            {/* Hero Section */}
            <section ref={heroRef} className="relative w-full h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">

                {/* Background (CSS Placeholder instead of Image) */}
                <div className="absolute inset-0 z-0 bg-brand-cream hero-parallax">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/10 via-brand-cream/50 to-brand-cream z-10" />
                    {/* Organic Pattern / Noise Effect */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-green/10 via-transparent to-transparent animate-pulse duration-10000" />
                </div>

                {/* Hero Content */}
                <div className="relative z-20 max-w-5xl mx-auto space-y-8" ref={textRef}>
                    <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <span className="text-brand-green tracking-[0.2em] text-xs font-bold uppercase border border-brand-green/30 px-4 py-2 rounded-full backdrop-blur-sm">
                            {t.hero.location}
                        </span>

                        <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight text-brand-brown leading-[0.9]">
                            {/* Split title for styling */}
                            <span className="block">{t.hero.title.split(' ')[0]}</span>
                            <span className="block text-brand-roast italic font-serif font-light">{t.hero.title.split(' ').slice(1).join(' ')}</span>
                        </h1>

                        <p className="max-w-xl text-lg md:text-xl text-brand-brown/80 font-medium leading-relaxed mt-4">
                            {t.hero.subtitle}
                        </p>
                    </div>

                    <div className="pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        <MagneticButton>
                            {t.hero.cta}
                        </MagneticButton>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 animate-bounce duration-2000 text-brand-brown/50">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                </div>
            </section>

            {/* Traceability & Data Section */}
            <TraceabilitySection />

            {/* Products & Collection */}
            <ProductsSection />

            {/* Story/Origin Teaser (New content to be expanded) */}
            <section className="py-32 px-4 bg-brand-brown text-brand-cream relative overflow-hidden">
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <h2 className="font-display text-4xl md:text-6xl mb-8">Organic by Nature.<br /><span className="italic text-brand-copper font-serif">Precise by Design.</span></h2>
                    <p className="text-xl opacity-80 leading-relaxed">
                        We don't just grow coffee; we engineer flavor profiles from the root up.
                        Bridging the gap between the chaotic beauty of the cloud forest and the data-driven precision of your morning cup.
                    </p>
                </div>
            </section>

        </main>
    );
}
