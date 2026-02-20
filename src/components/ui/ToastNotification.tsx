"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ShoppingBag, X } from "lucide-react";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface Toast {
    id: number;
    message: string;
    type: "success" | "info" | "cart";
}

interface ToastContextType {
    showToast: (message: string, type?: "success" | "info" | "cart") => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => { } });

export const useToast = () => useContext(ToastContext);

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: "success" | "info" | "cart" = "success") => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-20 right-4 z-[60] flex flex-col gap-2 pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 100, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="pointer-events-auto bg-white border border-brand-brown/10 shadow-xl rounded-xl px-4 py-3 flex items-center gap-3 min-w-[280px] max-w-[360px]"
                        >
                            {toast.type === "cart" ? (
                                <ShoppingBag className="text-brand-green shrink-0" size={20} />
                            ) : (
                                <CheckCircle className="text-brand-green shrink-0" size={20} />
                            )}
                            <span className="text-sm text-brand-brown font-medium flex-1">{toast.message}</span>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="text-brand-brown/40 hover:text-brand-brown transition-colors shrink-0"
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
