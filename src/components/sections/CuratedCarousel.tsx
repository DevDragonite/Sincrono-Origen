"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { useToast } from "@/components/ui/ToastNotification";
import ProductModal from "@/components/ui/ProductModal";

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const DUR = 650;

type Role = "center" | "left" | "right";

export default function CuratedCarousel() {
    const { t, language } = useLanguage();
    const { addItem } = useCart();
    const { showToast } = useToast();

    // Los 3 más vendidos = primeros 3 del catálogo.
    const items: any[] = (t.products?.items || []).slice(0, 3);
    const N = items.length;

    const [active, setActive] = useState(0);
    const [selected, setSelected] = useState<any>(null);
    const [isMobile, setIsMobile] = useState(false);
    const animating = useRef(false);

    useEffect(() => {
        const u = () => setIsMobile(window.innerWidth < 768);
        u();
        window.addEventListener("resize", u);
        return () => window.removeEventListener("resize", u);
    }, []);

    const jump = useCallback((next: number) => {
        if (animating.current || N === 0) return;
        animating.current = true;
        setActive(((next % N) + N) % N);
        window.setTimeout(() => {
            animating.current = false;
        }, DUR);
    }, [N]);

    const go = useCallback((dir: "next" | "prev") => {
        jump(dir === "next" ? active + 1 : active - 1);
    }, [active, jump]);

    useEffect(() => {
        setActive(0);
    }, [language]);

    if (N === 0) return null;

    const center = active;
    const left = (active + N - 1) % N;
    const roleOf = (i: number): Role => (i === center ? "center" : i === left ? "left" : "right");

    const styleFor = (role: Role): CSSProperties => {
        const base: CSSProperties = {
            position: "absolute",
            bottom: 0,
            aspectRatio: "1 / 1",
            transform: "translateX(-50%)",
            transition: `left ${DUR}ms ${EASE}, height ${DUR}ms ${EASE}, filter ${DUR}ms ${EASE}, opacity ${DUR}ms ${EASE}`,
            willChange: "left, height, filter, opacity",
            cursor: "pointer",
        };
        if (role === "center") {
            return { ...base, left: isMobile ? "50%" : "40%", height: "100%", filter: "none", opacity: 1, zIndex: 20 };
        }
        // Laterales: visibles pero separados del centro (evita amontonarlos).
        const side: CSSProperties = { ...base, height: isMobile ? "52%" : "58%", filter: "none", opacity: 0.9, zIndex: 10 };
        return role === "left"
            ? { ...side, left: isMobile ? "11%" : "7%" }
            : { ...side, left: isMobile ? "89%" : "73%" };
    };

    const current = items[active];

    const addToCart = (p: any) => {
        addItem({ id: p.id, name: p.name, price: p.price, type: p.type });
        showToast(language === "es" ? `${p.name} añadido al carrito` : `${p.name} added to cart`, "cart");
    };

    const labels = {
        origin: t.products?.origin,
        process: t.products?.process,
        altitude: t.products?.altitude,
        notes: t.products?.notes,
        cta: t.products?.cta,
    };

    return (
        <section className="bg-brand-cream text-brand-brown py-20 md:py-28 px-4 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="font-display text-3xl md:text-4xl mb-2">{t.products?.title}</h2>
                    <p className="text-brand-roast text-sm tracking-widest uppercase">{t.products?.subtitle}</p>
                </div>

                <div className="grid items-center gap-6 md:grid-cols-[1.6fr_1fr]">
                    {/* ── Columna izquierda: carrusel de bolsas ── */}
                    <div className="relative">
                        <div className="relative h-[320px] md:h-[460px]">
                            {items.map((p, i) => {
                                const role = roleOf(i);
                                return (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => (role === "center" ? setSelected(p) : role === "left" ? go("prev") : go("next"))}
                                        style={styleFor(role)}
                                        aria-label={p.name}
                                        className="focus:outline-none"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            draggable={false}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                                objectPosition: "bottom center",
                                            }}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        {/* flechas */}
                        <button
                            type="button"
                            onClick={() => go("prev")}
                            aria-label="Anterior"
                            className="absolute left-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-brown/25 bg-brand-cream/80 text-brand-brown backdrop-blur transition hover:bg-brand-brown hover:text-brand-cream"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => go("next")}
                            aria-label="Siguiente"
                            className="absolute right-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-brown/25 bg-brand-cream/80 text-brand-brown backdrop-blur transition hover:bg-brand-brown hover:text-brand-cream"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                        </button>

                        {/* dots */}
                        <div className="mt-4 flex justify-center gap-2">
                            {items.map((p, i) => (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => jump(i)}
                                    aria-label={p.name}
                                    className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-brand-brown" : "w-2 bg-brand-brown/25"}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ── Columna derecha: ventana glassmorphism ── */}
                    <div className="relative">
                        {/* blobs de color para que el vidrio esmerilado tenga qué difuminar */}
                        <div aria-hidden className="pointer-events-none absolute -left-6 top-2 h-40 w-40 rounded-full bg-brand-green/30 blur-3xl" />
                        <div aria-hidden className="pointer-events-none absolute bottom-2 right-0 h-40 w-40 rounded-full bg-brand-copper/30 blur-3xl" />

                        <div
                            className="relative rounded-3xl border border-white/60 bg-white/35 p-7 shadow-[0_10px_40px_rgba(90,60,30,0.14)] backdrop-blur-2xl"
                            style={{ transition: `all ${DUR}ms ${EASE}` }}
                        >
                            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-green">
                                {language === "es" ? "Selección" : "Selection"}
                            </span>
                            <h3 className="font-display text-3xl md:text-4xl text-brand-brown mt-1 mb-2">{current.name}</h3>
                            <p className="text-sm text-brand-roast leading-relaxed mb-5">{current.desc}</p>

                            <div className="grid grid-cols-2 gap-3 mb-5">
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand-brown/40 mb-0.5">{labels.origin}</div>
                                    <div className="text-sm font-medium text-brand-brown">{current.origin}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand-brown/40 mb-0.5">{labels.process}</div>
                                    <div className="text-sm font-medium text-brand-brown">{current.process}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand-brown/40 mb-0.5">{labels.notes}</div>
                                    <div className="text-sm font-medium italic text-brand-brown">{current.notes}</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <span className="font-mono text-2xl text-brand-copper">{current.price}</span>
                                <button
                                    type="button"
                                    onClick={() => setSelected(current)}
                                    className="text-xs font-bold uppercase tracking-widest text-brand-brown/60 underline-offset-4 hover:underline"
                                >
                                    {language === "es" ? "Ver detalle" : "View detail"}
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => addToCart(current)}
                                className="w-full rounded-xl bg-brand-brown py-3.5 text-xs font-bold uppercase tracking-widest text-brand-cream transition hover:bg-brand-green"
                            >
                                {labels.cta}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex justify-center">
                    <Link
                        href="/products"
                        scroll={false}
                        className="group inline-flex items-center gap-3 rounded-full border border-brand-brown/20 px-8 py-3 text-sm font-bold uppercase tracking-widest text-brand-brown transition-all duration-500 hover:bg-brand-brown hover:text-brand-cream"
                    >
                        {language === "es" ? "Ver Catálogo Completo" : "View Full Catalog"}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                    </Link>
                </div>
            </div>

            <ProductModal
                isOpen={!!selected}
                onClose={() => setSelected(null)}
                product={selected}
                labels={labels}
            />
        </section>
    );
}
