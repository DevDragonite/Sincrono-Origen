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

export default function RootLayout({
// ... (existing code)
                <LanguageProvider>
    <SmoothScroll>
        <Navigation />
        <LanguageToggle />
        {children}
        <Footer />
    </SmoothScroll>
                </LanguageProvider >
            </body >
        </html >
    );
}
