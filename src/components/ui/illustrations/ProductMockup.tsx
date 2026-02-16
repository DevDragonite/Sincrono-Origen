"use client";

import { motion } from "framer-motion";

interface ProductMockupProps {
    color?: string;
    accent?: string;
    label?: string;
    className?: string;
}

export default function ProductMockup({
    color = "#3D2B1F",
    accent = "#D4AF37",
    label = "SINCRONO",
    className = ""
}: ProductMockupProps) {
    return (
        <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
            <motion.svg
                viewBox="0 0 200 300"
                className="w-full h-full drop-shadow-2xl"
                initial={{ filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.1))" }}
                whileHover={{ filter: "drop-shadow(0px 20px 20px rgba(0,0,0,0.2))", y: -5 }}
            >
                {/* Bag Body */}
                <path d="M40 280 L20 50 L180 50 L160 280 Z" fill={color} />
                <path d="M40 280 L20 50 L180 50 L160 280 Z" fill="url(#gradient)" opacity="0.2" />

                {/* Seal/Top */}
                <path d="M20 50 L180 50 L180 30 L20 30 Z" fill={color} filter="brightness(0.9)" />

                {/* Label Area */}
                <rect x="50" y="100" width="100" height="120" fill="#FDFBF7" rx="2" />

                {/* Decorative Accent */}
                <circle cx="100" cy="140" r="25" stroke={accent} strokeWidth="1" fill="none" />
                <path d="M85 140 H115" stroke={accent} strokeWidth="0.5" />

                {/* Text Lines */}
                <rect x="65" y="180" width="70" height="4" fill={accent} opacity="0.5" />
                <rect x="75" y="190" width="50" height="2" fill="#3D2B1F" opacity="0.5" />

                {/* Gradients */}
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="black" stopOpacity="0.4" />
                        <stop offset="20%" stopColor="white" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="black" stopOpacity="0" />
                        <stop offset="80%" stopColor="white" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="black" stopOpacity="0.4" />
                    </linearGradient>
                </defs>
            </motion.svg>
        </div>
    );
}
