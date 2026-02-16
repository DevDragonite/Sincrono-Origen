"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-brand-black text-white p-4 text-center">
            <h2 className="font-display text-4xl text-brand-copper mb-4">SYSTEM MALFUNCTION</h2>
            <p className="text-gray-400 mb-8 max-w-md">
                The connection to the origin has been interrupted. Please recalibrate.
            </p>
            <button
                onClick={reset}
                className="px-6 py-2 border border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-colors uppercase tracking-widest text-xs"
            >
                Recalibrate System
            </button>
        </div>
    );
}
