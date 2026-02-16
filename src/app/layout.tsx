import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap'
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap'
});

export const metadata: Metadata = {
    title: 'Síncrono Origen | Technological Coffee',
    description: 'Bridging the gap between organic chaos and digital precision.',
};

import SmoothScroll from '../components/ui/SmoothScroll';
import Footer from '../components/layout/Footer';
import Navigation from '../components/layout/Navigation';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
            <body className="bg-brand-cream text-brand-brown font-body antialiased overflow-x-hidden selection:bg-brand-green selection:text-white">
                <LanguageProvider>
                    <SmoothScroll>
                        <Navigation />
                        {children}
                        <Footer />
                    </SmoothScroll>
                </LanguageProvider>
            </body>
        </html>
    );
}
