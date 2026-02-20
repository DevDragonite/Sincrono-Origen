"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useToast } from "./ToastNotification";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ProductMockup from "./illustrations/ProductMockup";

const WHATSAPP_NUMBER = "584141121470";

// Short storytelling narratives (2-3 sentences max)
const storyNarratives: Record<string, { es: string; en: string }> = {
    arabica_1: {
        es: "Nace en las laderas brumosas de la Cordillera de la Costa, seleccionado a mano por agricultores de tercera generación. Cada taza guarda la dulzura del caramelo venezolano con un toque cítrico que recuerda las mandarinas de la Sierra.",
        en: "Born on the misty slopes of the Coastal Range, hand-selected by third-generation farmers. Every cup holds the sweetness of Venezuelan caramel with a citrus touch reminiscent of Sierra tangerines."
    },
    arabica_2: {
        es: "Crece en lo profundo del Bosque Nublado, donde los cafetos comparten suelo con orquídeas y helechos milenarios. El beneficio húmedo transforma la cereza en una experiencia floral con notas de jazmín y miel silvestre.",
        en: "Grows deep within the Cloud Forest, where coffee trees share soil with orchids and ancient ferns. Wet-processing transforms the cherry into a floral experience with notes of jasmine and wild honey."
    },
    robusta_1: {
        es: "Desde las tierras bajas amazónicas, cultivado bajo la sombra de árboles centenarios. Tostado lento para un carácter indómito de chocolate amargo y nuez tostada que nunca se rinde.",
        en: "From the Amazonian lowlands, grown under the shade of century-old trees. Slow-roasted for an untamed character of dark chocolate and toasted nuts that never gives up."
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

    // Color for product mockup
    const mockupColor = product.type === 'Robusta' ? "#2A1810" : "#2D5A27";
    const mockupAccent = product.type === 'Robusta' ? "#C65D3B" : "#D4AF37";

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-brown/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 40 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-brand-cream w-full max-w-2xl max-h-[65vh] md:max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl relative flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button - Always visible */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-2 rounded-full bg-brand-brown/10 hover:bg-brand-brown/20 text-brand-brown transition-colors z-20"
                    >
                        <X size={18} />
                    </button>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto flex-1">
                        <div className="flex flex-col md:flex-row">
                            {/* Product Image */}
                            <div className="w-full md:w-1/3 bg-white flex items-center justify-center p-3 md:p-6 shrink-0">
                                <div className="w-16 h-20 md:w-28 md:h-36">
                                    <ProductMockup color={mockupColor} accent={mockupAccent} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-2/3 p-4 md:p-6">
                                {/* Type Badge */}
                                <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-brand-green">{product.type}</span>

                                {/* Title & Description */}
                                <h2 className="font-display text-xl md:text-2xl text-brand-brown mt-1 mb-1">{product.name}</h2>
                                <p className="text-brand-roast text-xs md:text-sm leading-relaxed mb-3">{product.desc}</p>

                                {/* Story OR Data Grid */}
                                {story ? (
                                    <div className="bg-brand-brown/5 rounded-lg p-3 mb-3 border-l-3 border-brand-green">
                                        <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-brand-green mb-1.5">
                                            {language === "es" ? "Historia de Cosecha" : "Harvest Story"}
                                        </p>
                                        <p className="text-brand-brown/70 text-xs md:text-sm leading-relaxed italic">
                                            {story}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div>
                                            <div className="text-[9px] md:text-[10px] font-bold text-brand-brown/40 uppercase mb-0.5">{labels.origin}</div>
                                            <div className="text-brand-brown font-medium text-xs md:text-sm">{product.origin}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] md:text-[10px] font-bold text-brand-brown/40 uppercase mb-0.5">{labels.process}</div>
                                            <div className="text-brand-brown font-medium text-xs md:text-sm">{product.process}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] md:text-[10px] font-bold text-brand-brown/40 uppercase mb-0.5">{labels.altitude}</div>
                                            <div className="text-brand-brown font-medium text-xs md:text-sm">{product.altitude}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] md:text-[10px] font-bold text-brand-brown/40 uppercase mb-0.5">{labels.notes}</div>
                                            <div className="text-brand-brown font-medium text-xs md:text-sm italic">{product.notes}</div>
                                        </div>
                                    </div>
                                )}

                                {/* Price + Buttons */}
                                <div className="pt-3 border-t border-brand-brown/10 space-y-2">
                                    <div className="font-mono text-lg md:text-xl text-brand-copper">{product.price}</div>
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full bg-brand-brown text-brand-cream px-4 py-2.5 rounded-lg hover:bg-brand-green transition-colors uppercase text-[10px] md:text-xs font-bold tracking-widest"
                                    >
                                        {labels.cta}
                                    </button>
                                    <button
                                        onClick={handleWhatsApp}
                                        className="w-full bg-[#25D366] text-white px-4 py-2.5 rounded-lg hover:bg-[#20BD5A] transition-colors uppercase text-[10px] md:text-xs font-bold tracking-widest flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle size={14} />
                                        {language === "es" ? "Consultar por WhatsApp" : "Ask via WhatsApp"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
