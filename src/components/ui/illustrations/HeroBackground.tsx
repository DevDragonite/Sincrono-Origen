"use client";

export default function HeroBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#EAE8E1]">
            {/* Base Gradient - Dawn Sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#EAE8E1] via-[#D8D3C8] to-[#C1B6A3] opacity-80" />

            {/* Abstract Mountain Shapes (SVG) */}
            <svg className="absolute bottom-0 w-full h-[60vh] opacity-30 mix-blend-multiply" preserveAspectRatio="none" viewBox="0 0 1440 600">
                <path d="M0 600 L0 300 Q 360 100 720 350 T 1440 400 L 1440 600 Z" fill="#3D2B1F" />
                <path d="M0 600 L0 450 Q 400 300 800 500 T 1440 450 L 1440 600 Z" fill="#2A3D35" opacity="0.8" />
            </svg>

            {/* Mist Layers */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </div>
    );
}
