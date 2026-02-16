"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionary, Language, Dictionary } from './dictionary';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Dictionary;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        const saved = localStorage.getItem('sincrono-lang') as Language;
        if (saved) setLanguage(saved);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('sincrono-lang', lang);
    };

    const value = {
        language,
        setLanguage: handleSetLanguage,
        t: dictionary[language]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
