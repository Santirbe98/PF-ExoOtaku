import { createContext, useEffect, useState } from "react";

/* Creamos el context, se le puede pasar un valor inicial */
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  /* Creamos un estado para el carrito */
  const [cartItems, setCartItems] = useState(() => {
    try {
      const productsLocalStorage = window.localStorage.getItem("CartProducts");
      return productsLocalStorage ? JSON.parse(productsLocalStorage) : [];
    } catch (error) {
      return [];
    }
  });
  //   const [products, setProducts] = useState([]);

  //   const [items, setItems] = useState([]);

  useEffect(() => {
    window.localStorage.setItem("CartProducts", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (product) => {
   const inCart = cartItems.find((p) => p.id === product.id);
   if (inCart) {
     setCartItems(
       cartItems.map((p) => {
         if (p.id === product.id) {
           return { ...inCart, amount: inCart.amount + 1 };
         } else return p;
       })
     );
   } else {
     setCartItems([...cartItems, { ...product, amount: 1 }]);
   }
 };

  const deleteItemToCart = (product) => {
    const inCart = cartItems.find((p) => p.id === product.id);
    if (inCart.amount === 1) {
      setCartItems(cartItems.filter((p) => p.id !== product.id));
    } else {
      setCartItems((p) => {
        if (p.id === product.id) {
          return { ...inCart, amount: inCart.amount - 1 };
        } else return p;
      });
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


export default CartContext