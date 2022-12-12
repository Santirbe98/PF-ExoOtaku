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
            return setCartItems([...cartItems, { ...inCart, amount: inCart.amount + 1 }])
        }
        const inCartdiferentSize = cartItems.find((p) => p.id === product.id && p.size !== product.size);
        if (inCartdiferentSize) {
            return setCartItems([...cartItems, { ...product, amount: 1 }])
        }
        setCartItems([...cartItems, { ...product, amount: 1 }]);
    }

    /*     const deleteItemToCart = (product) => {
            const inCart = cartItems.find((p) => p.id === product.id);
            if (inCart.amount === 1) {
                setCartItems(cartItems.filter((p) => p.id !== product.id));
            } else {
                setCartItems(
                    cartItems.map((p) => {
                        if (p.id === product.id) {
                            return { ...inCart, amount: inCart.amount - 1 };
                        } else return p;
                    })
                );
            }
        }; */

    const deleteItemToCart = (product) => {
        const inCart = cartItems.find((p) => p.id === product.id && p.size === product.size);
        if (inCart && inCart.amount === 1) {
            return setCartItems(cartItems.filter((p) => p.id !== product.id));
        }
        if (inCart && inCart.amount > 1) {
            return setCartItems({ ...inCart, amount: inCart.amount - 1 });
        }
    }

    return (
        <CartContext.Provider
            value={{ cartItems, addItemToCart, deleteItemToCart }}
        >
            {children}
        </CartContext.Provider>
    );
};