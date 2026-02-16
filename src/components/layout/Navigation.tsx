"use client";

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const { t } = useLanguage();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path ? "text-brand-brown font-bold" : "text-brand-roast hover:text-brand-brown";

    return (
        <nav className="fixed top-0 w-full z-40 p-8 flex justify-between items-start pointer-events-none">
            {/* Brand - Left */}
            <Link href="/" className="pointer-events-auto">
                <div className="font-display font-bold text-xl tracking-widest text-brand-brown">SÍNCRONO</div>
                <div className="text-[0.6rem] tracking-[0.3em] text-brand-roast uppercase">Origen</div>
            </Link>

            {/* Menu - Right (Desktop) */}
            <div className="hidden md:flex flex-row items-center space-x-8 pointer-events-auto">
                <Link href="/products" className={`text-xs uppercase tracking-widest transition-colors ${isActive('/products')}`}>
                    {t.nav.products}
                </Link>
                <Link href="/allies" className={`text-xs uppercase tracking-widest transition-colors ${isActive('/allies')}`}>
                    {t.nav.allies}
                </Link>
                <Link href="/blog" className={`text-xs uppercase tracking-widest transition-colors ${isActive('/blog')}`}>
                    {t.nav.blog}
                </Link>
                <Link href="#" className="text-xs uppercase tracking-widest text-brand-roast hover:text-brand-brown transition-colors">
                    {t.nav.contact}
                </Link>
            </div>
        </nav>
    );
}
