"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Flag Components as SVGs for better cross-platform support
const USFlag = () => (
    <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full object-cover border border-white/20 shadow-sm">
        <path fill="#bd3d44" d="M0 0h640v480H0" />
        <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 202.8h640M0 276.5h640M0 350.2h640M0 424h640" />
        <path fill="#192f5d" d="M0 0h364.8v258.5H0" />
        <marker id="us-a" markerHeight="30" markerWidth="30">
            <path fill="#fff" d="M14 0l-9 28 24-17H5l24 17z" />
        </marker>
        <path fill="#fff" d="M28 17l6 18-15-11h19L22 35z" />
        {/* Simplified stars for icon size */}
        <circle cx="30" cy="30" r="3" fill="white" />
        <circle cx="70" cy="30" r="3" fill="white" />
        <circle cx="110" cy="30" r="3" fill="white" />
        <circle cx="50" cy="60" r="3" fill="white" />
        <circle cx="90" cy="60" r="3" fill="white" />
    </svg>
);

const VEFlag = () => (
    <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full object-cover border border-white/20 shadow-sm">
        <path fill="#cf142b" d="M0 320h640v160H0z" />
        <path fill="#00247d" d="M0 160h640v160H0z" />
        <path fill="#ffcc00" d="M0 0h640v160H0z" />
        <g fill="#fff" transform="matrix(0.6 0 0 0.6 320 256)">
            {/* Arc of stars simplified */}
            <circle cx="0" cy="-60" r="12" />
            <circle cx="-50" cy="-40" r="12" />
            <circle cx="50" cy="-40" r="12" />
            <circle cx="-90" cy="-10" r="12" />
            <circle cx="90" cy="-10" r="12" />
            <circle cx="-110" cy="30" r="12" />
            <circle cx="110" cy="30" r="12" />
            <circle cx="0" cy="0" r="12" />
        </g>
    </svg>
);

interface LanguageToggleProps {
    scrolled?: boolean;
}

export default function LanguageToggle({ scrolled = false }: LanguageToggleProps) {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages = [
        { code: 'en', label: 'EN', flag: <USFlag /> },
        { code: 'es', label: 'ES', flag: <VEFlag /> }
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    const buttonClass = scrolled
        ? "bg-brand-cream/10 border-brand-cream/20 text-brand-cream hover:bg-brand-cream hover:text-brand-brown"
        : "bg-brand-brown/5 border-brand-brown/20 text-brand-brown hover:bg-brand-brown hover:text-white";

    return (
        <div ref={containerRef} className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 border px-4 py-2 rounded-full transition-all shadow-sm ${buttonClass}`}
            >
                <div className="flex items-center justify-center">{currentLang.flag}</div>
                <span className="text-xs font-bold tracking-widest">{currentLang.label}</span>
                <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-3 h-3 opacity-70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-2 w-32 bg-brand-cream border border-brand-brown/10 rounded-xl shadow-xl overflow-hidden flex flex-col"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code as 'en' | 'es');
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-3 w-full px-4 py-3 text-xs font-bold tracking-widest hover:bg-brand-brown/5 transition-colors text-left ${language === lang.code ? 'text-brand-green bg-brand-green/5' : 'text-brand-brown'
                                    }`}
                            >
                                <div className="flex items-center justify-center">{lang.flag}</div>
                                <span>{lang.label}</span>
                                {language === lang.code && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-green" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
