"use client";

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageToggle from '../ui/LanguageToggle';
import { useCart } from '@/lib/CartContext';

export default function Navigation() {
    const { t } = useLanguage();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { totalItems, setIsCartOpen } = useCart();

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

    // Don't show nav on admin pages
    if (pathname?.startsWith('/admin')) return null;

    return (
        <nav className={`fixed top-0 w-full z-40 p-6 md:p-8 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-brand-brown/90 backdrop-blur-md shadow-lg py-4 md:py-2' : 'bg-transparent'
            }`}>
            {/* Brand - Left */}
            <Link href="/" className="pointer-events-auto group relative z-50">
                <div className={`font-display font-bold text-xl tracking-widest transition-colors ${scrolled || mobileMenuOpen ? 'text-brand-cream' : 'text-brand-brown'}`}>SÍNCRONO</div>
                <div className={`text-[0.6rem] tracking-[0.3em] uppercase transition-colors ${scrolled || mobileMenuOpen ? 'text-brand-cream/60' : 'text-brand-roast'}`}>Origen</div>
            </Link>

            {/* Mobile: Cart + Menu Button */}
            <div className="md:hidden flex items-center gap-3 relative z-50">
                {/* Cart Button Mobile */}
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-2"
                >
                    <ShoppingBag size={22} className={`transition-colors ${scrolled || mobileMenuOpen ? 'text-brand-cream' : 'text-brand-brown'}`} />
                    <AnimatePresence>
                        {totalItems > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute -top-0.5 -right-0.5 bg-brand-green text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                            >
                                {totalItems}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>

                {/* Hamburger */}
                <button
                    className="p-2 text-brand-brown"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <div className="flex flex-col gap-1.5">
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2 bg-brand-cream' : scrolled ? 'bg-brand-cream' : 'bg-brand-brown'}`} />
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : scrolled ? 'bg-brand-cream' : 'bg-brand-brown'}`} />
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-brand-cream' : scrolled ? 'bg-brand-cream' : 'bg-brand-brown'}`} />
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-brand-brown z-40 flex flex-col justify-center items-center gap-8 transition-all duration-500 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 bg-[url('/noise.png')] pointer-events-none" />

                <nav className="flex flex-col items-center gap-8 z-10">
                    <Link
                        href="/products"
                        scroll={false}
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
                    <button
                        className="text-2xl font-display text-brand-cream hover:text-brand-copper transition-colors"
                        onClick={() => {
                            setMobileMenuOpen(false);
                            setTimeout(() => {
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }, 300);
                        }}
                    >
                        {t.nav.contact}
                    </button>

                    <div className="mt-8">
                        <LanguageToggle scrolled={true} />
                    </div>
                </nav>
            </div>

            {/* Menu - Right (Desktop) */}
            <div className="hidden md:flex flex-row items-center space-x-8 pointer-events-auto">
                <Link href="/products" scroll={false} className={isActive('/products')}>
                    {t.nav.products}
                </Link>
                <Link href="/allies" className={isActive('/allies')}>
                    {t.nav.allies}
                </Link>
                <Link href="/blog" className={isActive('/blog')}>
                    {t.nav.blog}
                </Link>
                <button
                    className={isActive('#contact')}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    {t.nav.contact}
                </button>

                {/* Cart Button Desktop */}
                <button
                    onClick={() => setIsCartOpen(true)}
                    className={`relative p-2 transition-colors ${scrolled ? 'text-brand-cream/70 hover:text-brand-cream' : 'text-brand-roast hover:text-brand-brown'}`}
                >
                    <ShoppingBag size={20} />
                    <AnimatePresence>
                        {totalItems > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute -top-0.5 -right-0.5 bg-brand-green text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                            >
                                {totalItems}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>

                {/* Language Toggle Integrated */}
                <div className={`pl-8 border-l transition-colors ${scrolled ? 'border-brand-cream/20' : 'border-brand-brown/10'}`}>
                    <LanguageToggle scrolled={scrolled} />
                </div>
            </div>
        </nav>
    );
}

