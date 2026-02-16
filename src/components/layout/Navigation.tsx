"use client";

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import LanguageToggle from '../ui/LanguageToggle';

export default function Navigation() {
    const { t } = useLanguage();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

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
        <nav className={`fixed top-0 w-full z-40 p-6 md:p-8 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-brand-brown/90 backdrop-blur-md shadow-lg py-4 md:py-2' : 'bg-transparent'
            }`}>
            {/* Brand - Left */}
            <Link href="/" className="pointer-events-auto group relative z-50">
                <div className={`font-display font-bold text-xl tracking-widest transition-colors ${scrolled || mobileMenuOpen ? 'text-brand-cream' : 'text-brand-brown'}`}>SÍNCRONO</div>
                <div className={`text-[0.6rem] tracking-[0.3em] uppercase transition-colors ${scrolled || mobileMenuOpen ? 'text-brand-cream/60' : 'text-brand-roast'}`}>Origen</div>
            </Link>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden relative z-50 p-2 text-brand-brown"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                <div className="flex flex-col gap-1.5">
                    <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2 bg-brand-cream' : scrolled ? 'bg-brand-cream' : 'bg-brand-brown'}`} />
                    <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : scrolled ? 'bg-brand-cream' : 'bg-brand-brown'}`} />
                    <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-brand-cream' : scrolled ? 'bg-brand-cream' : 'bg-brand-brown'}`} />
                </div>
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-brand-brown z-40 flex flex-col justify-center items-center gap-8 transition-all duration-500 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 bg-[url('/noise.png')] pointer-events-none" />

                <nav className="flex flex-col items-center gap-8 z-10">
                    <Link
                        href="/products"
                        className="text-2xl font-display text-brand-cream hover:text-brand-copper transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {t.nav.products}
                    </Link>
                    <Link
                        href="/allies"
                        className="text-2xl font-display text-brand-cream hover:text-brand-copper transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {t.nav.allies}
                    </Link>
                    <Link
                        href="/blog"
                        className="text-2xl font-display text-brand-cream hover:text-brand-copper transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {t.nav.blog}
                    </Link>
                    <Link
                        href="#contact"
                        className="text-2xl font-display text-brand-cream hover:text-brand-copper transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {t.nav.contact}
                    </Link>

                    <div className="mt-8">
                        <LanguageToggle scrolled={true} />
                    </div>
                </nav>
            </div>

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
