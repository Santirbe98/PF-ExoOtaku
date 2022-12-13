import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const productsLocalStorage = localStorage.getItem("CartProducts");
            return productsLocalStorage ? JSON.parse(productsLocalStorage) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("CartProducts", JSON.stringify(cartItems));
    }, [cartItems]);

    const addItemToCart = (product) => {
        const inCart = cartItems.find((p) => p.id === product.id && p.size === product.size);
        if (inCart) {
            setCartItems(
                cartItems.map((p) => {
                    if (p.id === product.id && p.size === product.size) {
                        return { ...inCart, amount: inCart.amount + 1 };
                    } else return p;
                })
            );
        } else {
            setCartItems([...cartItems, { ...product, amount: 1 }]);
        }
    };


    const deleteItemToCart = (product) => {
        const inCart = cartItems.find((p) => p.id === product.id && p.size === product.size);
        if (inCart.amount === 1) {
            setCartItems(cartItems.filter((p) => p !== inCart));
        } else {
            setCartItems(
                cartItems.map((p) => {
                    if (p.id === product.id  && p.size === product.size) {
                        return { ...inCart, amount: inCart.amount - 1 };
                    } else return p;
                })
            );
        }
    };
    return (
        <CartContext.Provider
            value={{ cartItems, addItemToCart, deleteItemToCart }}
        >
            {children}
        </CartContext.Provider>
    );
};