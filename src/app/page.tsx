"use client";

import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';
import TraceabilitySection from '@/components/sections/TraceabilitySection';
import ProductsSection from '@/components/sections/ProductsSection';
import HeroBackground from '@/components/ui/illustrations/HeroBackground';
import CoffeeCropsIllustration from '@/components/ui/illustrations/CoffeeCropsIllustration';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

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
            <section ref={heroRef} className="relative w-full min-h-screen flex flex-col md:flex-row items-center bg-brand-cream overflow-hidden">

                {/* Left Side: Content (50%) */}
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 py-20 z-20 relative">
                    <div className="space-y-8" ref={textRef}>
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-brand-brown leading-tight">
                            {t.hero.title}
                        </h1>
                        <h2 className="font-serif text-2xl md:text-3xl text-brand-green-dark italic">
                            {t.hero.title_desc}
                        </h2>
                        <p className="text-lg text-brand-brown/80 max-w-md leading-relaxed">
                            {t.hero.subtitle}
                        </p>

                        <div className="pt-8">
                            <MagneticButton href="/products">
                                {t.hero.cta}
                            </MagneticButton>
                        </div>
                    </div>
                </div>

                {/* Right Side: Image/Illustration (50%) */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative bg-brand-green-dark/5 overflow-hidden md:mt-24 md:mr-8 md:rounded-t-2xl md:h-[calc(100vh-6rem)]">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src="/images/hero-crops.jpg"
                            alt="Cultivos de café en Venezuela"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                    {/* Gradient Overlay for blending */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-transparent to-transparent md:bg-gradient-to-r" />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-cream to-transparent md:hidden" />
                </div>

            </section>

            {/* Traceability & Data Section */}
            <TraceabilitySection />

            {/* Products & Collection */}
            <ProductsSection />

            {/* Story/Origin Teaser (New content to be expanded) */}
            <section className="py-32 px-4 bg-brand-brown text-brand-cream relative overflow-hidden">
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <h2 className="font-display text-4xl md:text-6xl mb-8 whitespace-pre-line">{t.story.title}</h2>
                    <p className="text-xl opacity-80 leading-relaxed">
                        {t.story.description}
                    </p>
                </div>
            </section>

        </main>
    );
}
