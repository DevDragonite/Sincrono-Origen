import Image from 'next/image';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

export default function Home() {
    return (
        <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden">
            {/* 3D Scene Layer */}
            <Scene />

            {/* Hero Content */}
            <section className="relative z-10 flex flex-col items-center text-center p-4">
                <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 drop-shadow-2xl">
                    <span className="block" data-speed="0.5">DIGITAL</span>
                    <span className="block text-brand-copper" data-speed="0.8">TRANSFORMATION</span>
                    <span className="block" data-speed="1.2">OF COFFEE</span>
                </h1>

                <div className="mt-8 flex items-center space-x-4 text-sm tracking-[0.2em] text-brand-copper/80 uppercase">
                    <span>Caracas</span>
                    <span className="w-1 h-1 bg-current rounded-full" />
                    <span>1800m</span>
                    <span className="w-1 h-1 bg-current rounded-full" />
                    <span>Venezuela</span>
                </div>
            </section>

            {/* Floating UI Data */}
            <div className="fixed top-24 right-8 z-20 hidden md:block backdrop-blur-md border border-white/10 p-4 rounded-lg">
                <div className="flex justify-between items-center gap-8 mb-2">
                    <span className="text-xs text-brand-green font-bold tracking-widest">ELEVATION</span>
                    <span className="font-mono text-brand-copper">1800m</span>
                </div>
                <div className="flex justify-between items-center gap-8">
                    <span className="text-xs text-brand-green font-bold tracking-widest">VARIETY</span>
                    <span className="font-mono text-brand-copper">Bourbon</span>
                </div>
            </div>

            <div className="fixed bottom-12 left-8 z-20 hidden md:block backdrop-blur-md border border-white/10 p-4 rounded-lg">
                <div className="flex justify-between items-center gap-8 mb-2">
                    <span className="text-xs text-brand-green font-bold tracking-widest">EXT. YIELD</span>
                    <span className="font-mono text-brand-copper">21%</span>
                </div>
                <div className="flex justify-between items-center gap-8">
                    <span className="text-xs text-brand-green font-bold tracking-widest">PROCESS</span>
                    <span className="font-mono text-brand-copper">Cyber-Wash</span>
                </div>
            </div>

            {/* Scrollytelling Indicators (Placeholder for now) */}
            <div className="absolute bottom-10 w-full flex justify-center z-10">
                <div className="animate-bounce text-white/50 text-xs tracking-widest">SCROLL TO EXTRACT</div>
            </div>
        </main>
    );
}
