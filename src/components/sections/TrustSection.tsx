"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Award, Truck, MapPin, Heart } from "lucide-react";

interface StatCard {
    icon: typeof Award;
    value: number;
    suffix: string;
    labelEs: string;
    labelEn: string;
    descEs: string;
    descEn: string;
    color: string;
}

const stats: StatCard[] = [
    {
        icon: Award,
        value: 15,
        suffix: "+",
        labelEs: "Años de Experiencia",
        labelEn: "Years of Experience",
        descEs: "Tres generaciones perfeccionando el arte del café venezolano",
        descEn: "Three generations perfecting the art of Venezuelan coffee",
        color: "from-brand-green/20 to-brand-green/5",
    },
    {
        icon: Truck,
        value: 50,
        suffix: "+",
        labelEs: "Toneladas Despachadas",
        labelEn: "Tons Shipped",
        descEs: "Café premium distribuido a todo el territorio nacional",
        descEn: "Premium coffee distributed across the national territory",
        color: "from-brand-copper/20 to-brand-copper/5",
    },
    {
        icon: MapPin,
        value: 24,
        suffix: "",
        labelEs: "Estados Atendidos",
        labelEn: "States Served",
        descEs: "Presencia en cada rincón de Venezuela, del Zulia a Bolívar",
        descEn: "Presence in every corner of Venezuela, from Zulia to Bolívar",
        color: "from-amber-500/20 to-amber-500/5",
    },
    {
        icon: Heart,
        value: 100,
        suffix: "%",
        labelEs: "Venezolano",
        labelEn: "Venezuelan",
        descEs: "Origen, producción y pasión 100% hecha en Venezuela",
        descEn: "Origin, production and passion 100% made in Venezuela",
        color: "from-red-500/20 to-red-500/5",
    },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span ref={ref} className="font-display text-4xl md:text-5xl font-bold text-brand-brown">
            {count}{suffix}
        </span>
    );
}

export default function TrustSection() {
    const { language } = useLanguage();

    return (
        <section className="py-20 md:py-28 px-4 bg-brand-cream text-brand-brown relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none" />

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-green mb-3">
                        {language === "es" ? "¿Por Qué Nosotros?" : "Why Us?"}
                    </p>
                    <h2 className="font-display text-3xl md:text-5xl mb-4">
                        {language === "es" ? "Sabor que se Siente" : "Flavor You Can Feel"}
                    </h2>
                    <p className="text-brand-roast text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                        {language === "es"
                            ? "No todos los cafés de especialidad son iguales. El nuestro nace en suelo volcánico venezolano, cosechado a mano y tostado en pequeños lotes. El resultado: una taza que no solo pruebas, sino que sientes."
                            : "Not all specialty coffees are created equal. Ours is born in Venezuelan volcanic soil, hand-harvested and roasted in small batches. The result: a cup you don't just taste — you feel."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 }}
                            className="group relative bg-white border border-brand-brown/10 rounded-2xl p-5 md:p-7 text-center overflow-hidden hover:border-brand-green/30 hover:shadow-[0_12px_40px_rgba(90,60,30,0.12)] transition-all duration-500"
                        >
                            {/* Hover gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-brown/5 flex items-center justify-center group-hover:bg-brand-green/10 transition-colors duration-500">
                                    <stat.icon size={22} className="text-brand-green" />
                                </div>

                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />

                                <h3 className="font-display text-sm md:text-base mt-2 mb-2 text-brand-brown">
                                    {language === "es" ? stat.labelEs : stat.labelEn}
                                </h3>
                                <p className="text-[10px] md:text-xs text-brand-roast leading-relaxed">
                                    {language === "es" ? stat.descEs : stat.descEn}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
