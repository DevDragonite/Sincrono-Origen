"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    const toggle = () => {
        setLanguage(language === 'en' ? 'es' : 'en');
    };

    return (
        <button
            onClick={toggle}
            className="fixed top-8 right-8 z-50 flex items-center gap-2 text-sm font-bold tracking-widest text-brand-brown hover:text-brand-green transition-colors mix-blend-difference"
        >
            <span className={language === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
            <span className="opacity-40">/</span>
            <span className={language === 'es' ? 'opacity-100' : 'opacity-40'}>ES</span>
        </button>
    );
}
