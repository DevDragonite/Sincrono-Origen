export const translations = {
    en: {
        nav: {
            process: "Process",
            origins: "Origins",
            join: "Join Us"
        },
        hero: {
            title_1: "Digital",
            title_2: "Transformation",
            title_3: "Of Coffee",
            subtitle: "Caracas, Venezuela /// 1800m"
        },
        data: {
            elevation: "ELEVATION",
            variety: "VARIETY",
            extraction: "EXTRACTION",
            process: "PROCESS"
        },
        steps: {
            bean_title: "The Bean",
            bean_desc: "Raw potential encapsulated in organic matter.",
            roast_title: "The Roast",
            roast_desc: "Thermal energy unlocking complex aromatics.",
            brew_title: "The Digital Brew",
            brew_desc: "Precision extraction guided by data."
        },
        footer: {
            slogan: "Bridging the gap between organic chaos and digital precision in coffee extraction.",
            about_title: "About Us",
            about_story: "Our Story",
            about_source: "The Source",
            about_sus: "Sustainability",
            join_title: "Join the Team",
            join_roles: "Open Roles",
            join_culture: "Culture",
            join_intern: "Internships",
            newsletter_title: "Stay Synced",
            subscribe: "SUBSCRIBE"
        }
    },
    es: {
        nav: {
            process: "Proceso",
            origins: "Orígenes",
            join: "Únete"
        },
        hero: {
            title_1: "Transformación",
            title_2: "Digital",
            title_3: "Del Café",
            subtitle: "Caracas, Venezuela /// 1800m"
        },
        data: {
            elevation: "ELEVACIÓN",
            variety: "VARIEDAD",
            extraction: "EXTRACCIÓN",
            process: "PROCESO"
        },
        steps: {
            bean_title: "El Grano",
            bean_desc: "Potencial crudo encapsulado en materia orgánica.",
            roast_title: "El Tostado",
            roast_desc: "Energía térmica desbloqueando aromáticos complejos.",
            brew_title: "La Extracción Digital",
            brew_desc: "Extracción de precisión guiada por datos."
        },
        footer: {
            slogan: "Cerrando la brecha entre el caos orgánico y la precisión digital en la extracción de café.",
            about_title: "Sobre Nosotros",
            about_story: "Nuestra Historia",
            about_source: "El Origen",
            about_sus: "Sostenibilidad",
            join_title: "Únete al Equipo",
            join_roles: "Vacantes",
            join_culture: "Cultura",
            join_intern: "Pasantías",
            newsletter_title: "Mantente Sincronizado",
            subscribe: "SUSCRIBIRSE"
        }
    }
};

export function initLanguage() {
    const btn = document.getElementById('lang-toggle');
    let currentLang = 'en';

    // Helper to update text
    const updateText = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const keys = key.split('.');
            let val = translations[lang];
            keys.forEach(k => { if (val) val = val[k]; });

            if (val) {
                if (el.tagName === 'INPUT') {
                    el.placeholder = val; // Handle placeholders if needed (not in this map yet)
                } else {
                    el.textContent = val;
                }
            }
        });

        // Update Button Text
        btn.textContent = lang === 'en' ? 'ES' : 'EN';
    };

    btn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        updateText(currentLang);
    });
}
