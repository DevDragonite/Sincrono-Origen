"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MagneticButton({ children, className = "", href }: { children: React.ReactNode, className?: string, href?: string }) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const router = useRouter();

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.1, y: middleY * 0.1 }); // Magnetic strength
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const handleClick = () => {
        if (href) {
            router.push(href);
        }
    };

    return (
        <motion.button
            ref={ref}
            className={`relative px-8 py-3 rounded-full border border-brand-copper/50 text-brand-copper hover:bg-brand-copper hover:text-brand-black transition-colors uppercase tracking-widest text-sm font-bold ${className}`}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            onClick={handleClick}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
}
