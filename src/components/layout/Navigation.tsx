"use client";

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import LanguageToggle from '../ui/LanguageToggle';

export default function Navigation() {
    const { t } = useLanguage();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => {
        const baseStyle = "text-xs uppercase tracking-widest transition-colors";
        if (pathname === path) {
            return `${baseStyle} font-bold ${scrolled ? 'text-brand-cream' : 'text-brand-brown'}`;
        }
        return `${baseStyle} ${scrolled ? 'text-brand-cream/70 hover:text-brand-cream' : 'text-brand-roast hover:text-brand-brown'}`;
    };

    return (
        <nav className={`fixed top-0 w-full z-40 p-8 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-brand-brown/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent'
            }`}>
            {/* Brand - Left */}
            <Link href="/" className="pointer-events-auto group">
                <div className={`font-display font-bold text-xl tracking-widest transition-colors ${scrolled ? 'text-brand-cream' : 'text-brand-brown'}`}>SÍNCRONO</div>
                <div className={`text-[0.6rem] tracking-[0.3em] uppercase transition-colors ${scrolled ? 'text-brand-cream/60' : 'text-brand-roast'}`}>Origen</div>
            </Link>

            {/* Menu - Right (Desktop) */}
            <div className="hidden md:flex flex-row items-center space-x-8 pointer-events-auto">
                <Link href="/products" className={isActive('/products')}>
                    {t.nav.products}
                </Link>
                <Link href="/allies" className={isActive('/allies')}>
                    {t.nav.allies}
                </Link>
                <Link href="/blog" className={isActive('/blog')}>
                    {t.nav.blog}
                </Link>
                <Link href="#contact" className={isActive('#contact')}>
                    {t.nav.contact}
                </Link>

                {/* Language Toggle Integrated */}
                <div className={`pl-8 border-l transition-colors ${scrolled ? 'border-brand-cream/20' : 'border-brand-brown/10'}`}>
                    <LanguageToggle scrolled={scrolled} />
                </div>
            </div>
        </nav>
    );
}
