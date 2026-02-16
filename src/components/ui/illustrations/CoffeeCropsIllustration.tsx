"use client";

export default function CoffeeCropsIllustration() {
    return (
        <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
            <defs>
                <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F5F5DC" />
                    <stop offset="100%" stopColor="#E0DGD0" />
                </linearGradient>
                <linearGradient id="hillGradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2D5A27" />
                    <stop offset="100%" stopColor="#1E3F1B" />
                </linearGradient>
                <linearGradient id="hillGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3D7A37" />
                    <stop offset="100%" stopColor="#2D5A27" />
                </linearGradient>
            </defs>

            {/* Background Sky */}
            <rect width="800" height="600" fill="url(#skyGradient)" opacity="0.5" />

            {/* Distant Hills */}
            <path d="M0 400 Q 200 300 400 350 T 800 300 V 600 H 0 Z" fill="url(#hillGradient1)" opacity="0.6" />

            {/* Midground Hills */}
            <path d="M0 600 V 450 Q 300 350 600 500 T 800 480 V 600 Z" fill="url(#hillGradient2)" opacity="0.8" />

            {/* Foreground Coffee Plants */}
            {/* Plant 1 */}
            <g transform="translate(100, 480) scale(0.8)">
                <path d="M0 0 Q 10 -40 0 -80 Q -10 -40 0 0" stroke="#3D2B1F" strokeWidth="4" fill="none" />
                <path d="M0 -20 Q 20 -30 30 -10 Q 10 -10 0 -20" fill="#2D5A27" />
                <path d="M0 -40 Q -20 -50 -30 -30 Q -10 -30 0 -40" fill="#2D5A27" />
                <path d="M0 -60 Q 20 -70 25 -50 Q 10 -50 0 -60" fill="#2D5A27" />
                {/* Berries */}
                <circle cx="5" cy="-30" r="3" fill="#A4161A" />
                <circle cx="-5" cy="-50" r="3" fill="#A4161A" />
            </g>

            {/* Plant 2 */}
            <g transform="translate(250, 520) scale(1.1)">
                <path d="M0 0 Q 10 -40 0 -80 Q -10 -40 0 0" stroke="#3D2B1F" strokeWidth="4" fill="none" />
                <path d="M0 -20 Q 20 -30 30 -10 Q 10 -10 0 -20" fill="#2D5A27" />
                <path d="M0 -40 Q -20 -50 -30 -30 Q -10 -30 0 -40" fill="#2D5A27" />
                <path d="M0 -60 Q 20 -70 25 -50 Q 10 -50 0 -60" fill="#2D5A27" />
                <circle cx="5" cy="-35" r="3" fill="#A4161A" />
                <circle cx="-5" cy="-55" r="3" fill="#A4161A" />
            </g>

            {/* Plant 3 */}
            <g transform="translate(600, 500) scale(1.0)">
                <path d="M0 0 Q 5 -50 0 -100" stroke="#3D2B1F" strokeWidth="4" fill="none" />
                <circle cx="10" cy="-40" r="4" fill="#A4161A" />
                <circle cx="-10" cy="-70" r="4" fill="#A4161A" />
                {/* Leaves */}
                <path d="M0 -30 Q 30 -40 40 -10" fill="#2D5A27" />
                <path d="M0 -60 Q -30 -70 -40 -40" fill="#2D5A27" />
            </g>

            {/* Texture/Noise Overlay */}
            <rect width="800" height="600" fill="transparent" stroke="none">
                <animate attributeName="opacity" values="0.1;0.15;0.1" dur="4s" repeatCount="indefinite" />
            </rect>
        </svg>
    );
}
