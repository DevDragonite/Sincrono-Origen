"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export interface CartItem {
    id: string;
    name: string;
    price: string;
    priceNum: number;
    quantity: number;
    type: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: { id: string; name: string; price: string; type: string }) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType>({
    items: [],
    addItem: () => { },
    removeItem: () => { },
    updateQuantity: () => { },
    clearCart: () => { },
    totalItems: 0,
    totalPrice: 0,
    isCartOpen: false,
    setIsCartOpen: () => { },
});

export const useCart = () => useContext(CartContext);

const CART_KEY = "sincrono-cart";

function parsePrice(price: string): number {
    return parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(CART_KEY);
            if (saved) {
                setItems(JSON.parse(saved));
            }
        } catch { }
        setHydrated(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (hydrated) {
            localStorage.setItem(CART_KEY, JSON.stringify(items));
        }
    }, [items, hydrated]);

    const addItem = useCallback((product: { id: string; name: string; price: string; type: string }) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    priceNum: parsePrice(product.price),
                    quantity: 1,
                    type: product.type,
                },
            ];
        });
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((item) => item.id !== id));
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
