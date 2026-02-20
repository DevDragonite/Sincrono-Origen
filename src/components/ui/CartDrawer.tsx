"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const WHATSAPP_NUMBER = "584141121470";

export default function CartDrawer() {
    const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
    const { t, language } = useLanguage();

    const buildWhatsAppMessage = () => {
        const header = language === "es"
            ? "🌿 *Pedido desde Síncrono Origen*\n\n"
            : "🌿 *Order from Síncrono Origen*\n\n";

        const itemsList = items
            .map((item) => `• ${item.name} x${item.quantity} — ${item.price}`)
            .join("\n");

        const totalLabel = language === "es" ? "Total" : "Total";
        const footer = `\n\n💰 *${totalLabel}: $${totalPrice.toFixed(2)}*`;
        const closing = language === "es"
            ? "\n\n¡Gracias! 🙏"
            : "\n\nThank you! 🙏";

        return header + itemsList + footer + closing;
    };

    const handleWhatsAppOrder = () => {
        const message = buildWhatsAppMessage();
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-brand-brown/60 backdrop-blur-sm z-[70]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-cream z-[80] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-brand-brown/10">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-brand-brown" size={22} />
                                <h2 className="font-display text-xl text-brand-brown">
                                    {language === "es" ? "Tu Carrito" : "Your Cart"}
                                </h2>
                                {totalItems > 0 && (
                                    <span className="bg-brand-green text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 rounded-full hover:bg-brand-brown/10 text-brand-brown transition-colors"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                                    <ShoppingBag className="text-brand-brown/20" size={64} />
                                    <p className="text-brand-roast text-sm">
                                        {language === "es"
                                            ? "Tu carrito está vacío"
                                            : "Your cart is empty"}
                                    </p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-xs font-bold uppercase tracking-widest text-brand-copper hover:text-brand-brown transition-colors"
                                    >
                                        {language === "es" ? "Explorar productos" : "Explore products"}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            className="flex items-center gap-4 bg-white rounded-xl p-4 border border-brand-brown/5"
                                        >
                                            {/* Product color placeholder */}
                                            <div className="w-14 h-14 rounded-lg bg-brand-brown/10 flex items-center justify-center shrink-0">
                                                <span className="text-[10px] font-bold text-brand-brown/40 uppercase">
                                                    {item.type.slice(0, 3)}
                                                </span>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-display text-sm text-brand-brown truncate">{item.name}</h4>
                                                <p className="text-xs text-brand-roast">{item.price}</p>
                                            </div>

                                            {/* Quantity controls */}
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-7 h-7 rounded-full border border-brand-brown/20 flex items-center justify-center text-brand-brown hover:bg-brand-brown hover:text-white transition-colors"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="w-7 text-center text-sm font-bold text-brand-brown">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 rounded-full border border-brand-brown/20 flex items-center justify-center text-brand-brown hover:bg-brand-brown hover:text-white transition-colors"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-brand-brown/30 hover:text-red-500 transition-colors p-1"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-brand-brown/10 p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-brand-roast uppercase tracking-widest font-bold">Total</span>
                                    <span className="font-mono text-2xl text-brand-brown">${totalPrice.toFixed(2)}</span>
                                </div>

                                {/* WhatsApp order button */}
                                <button
                                    onClick={handleWhatsAppOrder}
                                    className="w-full py-4 bg-[#25D366] text-white font-bold text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 hover:bg-[#20BD5A] transition-colors shadow-lg shadow-[#25D366]/20"
                                >
                                    <MessageCircle size={20} />
                                    {language === "es" ? "Pedir por WhatsApp" : "Order via WhatsApp"}
                                </button>

                                <button
                                    onClick={clearCart}
                                    className="w-full py-2 text-xs text-brand-brown/40 hover:text-brand-brown uppercase tracking-widest transition-colors"
                                >
                                    {language === "es" ? "Vaciar carrito" : "Clear cart"}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
