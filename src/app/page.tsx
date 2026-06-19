"use client";

import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';
import TraceabilitySection from '@/components/sections/TraceabilitySection';
import CuratedCarousel from '@/components/sections/CuratedCarousel';
import TrustSection from '@/components/sections/TrustSection';
import HeroBackground from '@/components/ui/illustrations/HeroBackground';
import CoffeeCropsIllustration from '@/components/ui/illustrations/CoffeeCropsIllustration';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const { t, language } = useLanguage();
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

                {/* Right Side: Producto protagonista (50%) */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative flex items-center justify-center overflow-hidden">
                    {/* Halo de color cálido para que el vidrio esmerilado del producto resalte */}
                    <div aria-hidden className="absolute w-[80%] max-w-[520px] aspect-square rounded-full bg-gradient-to-br from-brand-green/20 to-brand-copper/15 blur-3xl" />
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative z-10 w-[72%] max-w-[300px] md:max-w-[440px]"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/imagenes/cafe_loma_origen.png"
                            alt="Café Loma Encantada — Origen Único"
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </motion.div>
                </div>

            </section>

            {/* Traceability & Data Section */}
            <TraceabilitySection />

            {/* Products & Collection */}
            <CuratedCarousel />

            {/* Trust / Stats Section */}
            <TrustSection />

            {/* Barista Testimonial Section */}
            <section className="py-24 md:py-32 px-4 bg-brand-brown text-brand-cream relative overflow-hidden mb-0">
                <div className="absolute inset-0 opacity-10 mix-blend-soft-light bg-[url('/noise.png')] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-brown via-brand-brown/95 to-brand-brown pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="container mx-auto max-w-3xl text-center relative z-10"
                >
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-green mb-4">
                        {language === "es" ? "Validación de Expertos" : "Expert Validation"}
                    </p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="font-display text-3xl md:text-5xl lg:text-6xl mb-8 leading-tight"
                    >
                        {language === "es"
                            ? "Lo que Baristas Están Hablando"
                            : "What Baristas Are Talking About"}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        className="text-base md:text-xl opacity-80 leading-relaxed italic"
                    >
                        {language === "es"
                            ? "\"Baristas de Caracas, Miami y Madrid ya lo saben. Cuando buscan un perfil único para competencias o cartas de temporada, encuentran en Loma Encantada lo que otros no pueden replicar.\""
                            : "\"Baristas in Caracas, Miami and Madrid already know. When they look for a unique profile for competitions or seasonal menus, they find in Loma Encantada what others can't replicate.\""}
                    </motion.p>
                </motion.div>
            </section>

            {/* Spacer before footer */}
            <div className="h-16 md:h-24 bg-brand-cream" />

        </main>
    );
}
