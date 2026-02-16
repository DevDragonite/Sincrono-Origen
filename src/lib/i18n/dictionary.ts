export const dictionary = {
    en: {
        nav: {
            home: "Origins",
            products: "Products",
            allies: "Allies",
            blog: "Journal",
            contact: "Contact"
        },
        hero: {
            title: "DIGITAL TRANSFORMATION",
            subtitle: "OF COFFEE",
            location: "Caracas /// 1800m /// Venezuela",
            cta: "Explore Origins"
        },
        traceability: {
            title: "PRECISION EXTRACTION",
            subtitle: "From Soil to Sensor",
            formula_label: "Target Equation",
            calculated_yield: "Calculated Yield:",
            description: "We monitor Total Dissolved Solids (TDS) to ensure every batch extracts the optimal spectrum of flavor notes. Our Cyber-Wash process guarantees a clean, transparent cup profile consistent with our 21% extraction target.",
            batch: "Batch",
            lot: "Lot #842",
            roast: "Roast"
        },
        products: {
            title: "PRODUCT PROTOCOLS",
            subtitle: "Available for Deployment",
            cta: "Add to Cart"
        },
        footer: {
            tagline: "Bridging the gap between the organic chaos of the farm and the digital precision of the cup.",
            transparency: "Transparency",
            sustainability: "Sustainability",
            join: "Join the Cycle",
            rights: "© 2026 Síncrono Origen. Caracas, Venezuela."
        }
    },
    es: {
        nav: {
            home: "Orígenes",
            products: "Productos",
            allies: "Aliados",
            blog: "Bitácora",
            contact: "Contacto"
        },
        hero: {
            title: "TRANSFORMACIÓN DIGITAL",
            subtitle: "DEL CAFÉ",
            location: "Caracas /// 1800m /// Venezuela",
            cta: "Explorar Orígenes"
        },
        traceability: {
            title: "EXTRACCIÓN DE PRECISIÓN",
            subtitle: "Del Suelo al Sensor",
            formula_label: "Ecuación Objetivo",
            calculated_yield: "Rendimiento Calculado:",
            description: "Monitoreamos los Sólidos Totales Disueltos (TDS) para asegurar que cada lote extraiga el espectro óptimo de notas de sabor. Nuestro proceso Cyber-Wash garantiza un perfil de taza limpio y transparente consistente con nuestro objetivo de extracción del 21%.",
            batch: "Lote",
            lot: "Lote #842",
            roast: "Tueste"
        },
        products: {
            title: "PROTOCOLOS DE PRODUCTO",
            subtitle: "Disponible para Despliegue",
            cta: "Añadir al Carrito"
        },
        footer: {
            tagline: "Cerrando la brecha entre el caos orgánico de la finca y la precisión digital de la taza.",
            transparency: "Transparencia",
            sustainability: "Sostenibilidad",
            join: "Únete al Ciclo",
            rights: "© 2026 Síncrono Origen. Caracas, Venezuela."
        }
    }
};

export type Language = 'en' | 'es';
export type Dictionary = typeof dictionary.en;
