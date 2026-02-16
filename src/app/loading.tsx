export default function Loading() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-brand-black text-white">
            <div className="animate-pulse">
                <h1 className="font-display text-2xl tracking-[0.5em] text-brand-copper">SÍNCRONO</h1>
            </div>
            <div className="mt-4 w-32 h-0.5 bg-brand-charcoal overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-green w-1/2 animate-[shimmer_1s_infinite]" />
            </div>
        </div>
    );
}
