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
import { CartProvider } from '@/lib/CartContext';
import { ToastProvider } from '@/components/ui/ToastNotification';
import CartDrawer from '@/components/ui/CartDrawer';
import WhatsAppFAB from '@/components/ui/WhatsAppFAB';
import BackToTop from '@/components/ui/BackToTop';
import PageTransition from '@/components/ui/PageTransition';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
            <body className="bg-brand-cream text-brand-brown font-body antialiased overflow-x-hidden selection:bg-brand-green selection:text-white">
                <LanguageProvider>
                    <CartProvider>
                        <ToastProvider>
                            <SmoothScroll>
                                <Navigation />
                                <PageTransition>
                                    {children}
                                </PageTransition>
                                <Footer />
                            </SmoothScroll>
                            <CartDrawer />
                            <WhatsAppFAB />
                            <BackToTop />
                        </ToastProvider>
                    </CartProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
