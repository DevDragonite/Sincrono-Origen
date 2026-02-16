"use client";

export default function CoffeeCherryIllustration() {
    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-brand-brown/5">
            <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Branch */}
                <path d="M0 200 C 100 200, 300 180, 400 220" stroke="#5C4033" strokeWidth="12" fill="none" />

                {/* Leaves */}
                <path d="M100 200 Q 150 100 250 150 Q 180 220 100 200" fill="#2D5A27" opacity="0.9" />
                <path d="M280 190 Q 350 120 380 200 Q 320 250 280 190" fill="#1E3F1B" opacity="0.9" />

                {/* Cherry */}
                <circle cx="200" cy="220" r="60" fill="#A4161A" />
                <circle cx="200" cy="220" r="58" fill="url(#cherryGradient)" />

                {/* Shine */}
                <ellipse cx="180" cy="200" rx="15" ry="10" fill="white" opacity="0.3" transform="rotate(-45 180 200)" />

                <defs>
                    <radialGradient id="cherryGradient" cx="0.4" cy="0.4" r="0.8">
                        <stop offset="0%" stopColor="#E5383B" />
                        <stop offset="60%" stopColor="#A4161A" />
                        <stop offset="100%" stopColor="#660708" />
                    </radialGradient>
                </defs>
            </svg>

            {/* Overlay Info */}
            <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded text-[10px] text-white font-mono border border-white/20">
                MACRO_LENS_ENABLED // 50mm
            </div>
        </div>
    );
}
