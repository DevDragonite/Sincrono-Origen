"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="fixed top-8 right-8 z-50 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-brand-brown/10 text-xs font-bold tracking-widest text-brand-brown hover:bg-brand-brown hover:text-white transition-all uppercase"
        >
            {language === 'en' ? 'ES' : 'EN'}
        </button>
    );
}
