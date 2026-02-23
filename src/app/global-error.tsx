"use client";

import { useEffect } from "react";

export default function GlobalError({
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
        <html>
            <body>
                <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 text-center">
                    <h2 className="text-4xl text-amber-500 mb-4">SYSTEM MALFUNCTION</h2>
                    <button onClick={() => reset()} className="px-6 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors uppercase">
                        Recalibrate System
                    </button>
                </div>
            </body>
        </html>
    );
}
