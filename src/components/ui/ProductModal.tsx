"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useToast } from "./ToastNotification";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const WHATSAPP_NUMBER = "584141121470";

// Storytelling narratives for select products (by product id)
const storyNarratives: Record<string, { es: string; en: string }> = {
    arabica_1: {
        es: "Nace en las laderas brumosas de la Cordillera de la Costa, donde cada mañana las nubes abrazan los cafetos como una manta protectora. Agricultores de tercera generación seleccionan a mano solo las cerezas más maduras, dejándolas secar al sol andino durante semanas. El resultado es un grano que guarda en su interior toda la dulzura del caramelo venezolano, con un toque cítrico que recuerda las mandarinas de la Sierra. Cada taza es una conversación entre la tierra y el cielo.",
        en: "Born on the misty slopes of the Coastal Range, where every morning clouds embrace the coffee trees like a protective blanket. Third-generation farmers hand-select only the ripest cherries, sun-drying them under the Andean sun for weeks. The result is a bean that holds within it all the sweetness of Venezuelan caramel, with a citrus touch reminiscent of Sierra tangerines. Every cup is a conversation between earth and sky."
    },
    arabica_2: {
        es: "En lo profundo del Bosque Nublado, donde la biodiversidad susurra secretos ancestrales, crece este café excepcional. Los cafetos comparten suelo con orquídeas y helechos milenarios, creando un microecosistema que imprime en cada grano notas de jazmín y miel silvestre. El proceso de beneficio húmedo, perfeccionado durante décadas por familias campesinas, transforma la cereza en una experiencia floral que despierta los sentidos. Es café que sabe a selva, a libertad, a Venezuela.",
        en: "Deep within the Cloud Forest, where biodiversity whispers ancestral secrets, this exceptional coffee grows. The trees share soil with orchids and ancient ferns, creating a micro-ecosystem that imprints each bean with notes of jasmine and wild honey. The wet-processing method, perfected over decades by farming families, transforms the cherry into a floral experience that awakens the senses. It's coffee that tastes of jungle, freedom, and Venezuela."
    },
    robusta_1: {
        es: "Desde las tierras bajas amazónicas de Venezuela, donde el río Orinoco traza caminos de vida, surge este Robusta con carácter indómito. Cultivado bajo la sombra de árboles centenarios, el grano absorbe la intensidad del trópico profundo: chocolate amargo, nuez tostada y un cuerpo que se sostiene como la raíz de un samán. Los productores locales lo tuestan lento, muy lento, para que cada sorbo cuente la historia de una tierra que nunca se rinde.",
        en: "From the Amazonian lowlands of Venezuela, where the Orinoco River traces paths of life, emerges this Robusta with an untamed character. Grown under the shade of century-old trees, the bean absorbs the intensity of the deep tropics: dark chocolate, toasted nuts, and a body that holds firm like the root of a samán tree. Local producers roast it slow, very slow, so that every sip tells the story of a land that never gives up."
    },
};

interface Product {
    id: string;
    name: string;
    desc: string;
    price: string;
    origin: string;
    process: string;
    altitude: string;
    notes: string;
    type: string;
}

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    labels: any;
}

export default function ProductModal({ isOpen, onClose, product, labels }: ProductModalProps) {
    const { addItem } = useCart();
    const { showToast } = useToast();
    const { language } = useLanguage();

    if (!isOpen || !product) return null;

    const hasStory = product.id in storyNarratives;
    const story = hasStory ? storyNarratives[product.id][language === "es" ? "es" : "en"] : null;

    const handleAddToCart = () => {
        addItem({ id: product.id, name: product.name, price: product.price, type: product.type });
        showToast(
            language === "es" ? `${product.name} añadido al carrito` : `${product.name} added to cart`,
            "cart"
        );
        onClose();
    };

    const handleWhatsApp = () => {
        const msg = language === "es"
            ? `¡Hola! Me interesa el café *${product.name}* (${product.price}). ¿Tienen disponibilidad?`
            : `Hi! I'm interested in *${product.name}* coffee (${product.price}). Is it available?`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-brand-brown/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 40 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-brand-cream w-full max-w-2xl max-h-[80vh] md:max-h-[85vh] rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl relative flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button - Always visible */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-2 rounded-full bg-brand-brown/10 hover:bg-brand-brown/20 text-brand-brown transition-colors z-20"
                    >
                        <X size={20} />
                    </button>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto flex-1">
                        <div className="p-5 md:p-8 pt-12 md:pt-8">
                            {/* Type Badge */}
                            <div className="mb-2">
                                <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-brand-green">{product.type}</span>
                            </div>

                            {/* Title & Description */}
                            <h2 className="font-display text-2xl md:text-3xl text-brand-brown mb-1">{product.name}</h2>
                            <p className="text-brand-roast text-sm md:text-base leading-relaxed mb-5">{product.desc}</p>

                            {/* Story OR Data Grid */}
                            {story ? (
                                <div className="bg-brand-brown/5 rounded-xl p-4 md:p-6 mb-5 border-l-4 border-brand-green">
                                    <p className="text-xs font-bold tracking-widest uppercase text-brand-green mb-3">
                                        {language === "es" ? "Historia de Cosecha" : "Harvest Story"}
                                    </p>
                                    <p className="text-brand-brown/80 text-sm md:text-base leading-relaxed italic">
                                        {story}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 md:gap-6 mb-5">
                                    <div>
                                        <div className="text-[10px] md:text-xs font-bold text-brand-brown/40 uppercase mb-1">{labels.origin}</div>
                                        <div className="text-brand-brown font-medium text-sm">{product.origin}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] md:text-xs font-bold text-brand-brown/40 uppercase mb-1">{labels.process}</div>
                                        <div className="text-brand-brown font-medium text-sm">{product.process}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] md:text-xs font-bold text-brand-brown/40 uppercase mb-1">{labels.altitude}</div>
                                        <div className="text-brand-brown font-medium text-sm">{product.altitude}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] md:text-xs font-bold text-brand-brown/40 uppercase mb-1">{labels.notes}</div>
                                        <div className="text-brand-brown font-medium text-sm italic">{product.notes}</div>
                                    </div>
                                </div>
                            )}

                            {/* Price + Buttons */}
                            <div className="pt-4 border-t border-brand-brown/10 space-y-3">
                                <div className="font-mono text-xl md:text-2xl text-brand-copper mb-2">{product.price}</div>
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-brand-brown text-brand-cream px-6 py-3 rounded-xl hover:bg-brand-green transition-colors uppercase text-xs font-bold tracking-widest"
                                >
                                    {labels.cta}
                                </button>
                                <button
                                    onClick={handleWhatsApp}
                                    className="w-full bg-[#25D366] text-white px-6 py-3 rounded-xl hover:bg-[#20BD5A] transition-colors uppercase text-xs font-bold tracking-widest flex items-center justify-center gap-2"
                                >
                                    <MessageCircle size={16} />
                                    {language === "es" ? "Consultar por WhatsApp" : "Ask via WhatsApp"}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
