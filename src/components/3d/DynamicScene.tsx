"use client";

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./Scene'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-brand-black z-0" />
});

export default function DynamicScene() {
    return <Scene />;
}
