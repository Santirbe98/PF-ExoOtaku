import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

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
    Swal.fire({
      /*  title: "Estas seguro que desea agregar este item?", */
      text: "Estas seguro que deseas agregar este item?",
      width: "30%",
      padding: "10px",
      allowEnterKey: true,
      allowEscapeKey: true,
      icon: "question",
      background: "black",
      imageUrl: `${product.images[0]}`,
      imageHeight: 200,
      imageWidth: 200,
      showCancelButton: true,
      confirmButtonColor: "#00711a",
      cancelButtonColor: "#b50707",
      confirmButtonText: "Si, agregalo!",
    }).then((response) => {
      if (response.isConfirmed) {
        const inCart = cartItems.find(
          (p) =>
            p.id === product.id &&
            p.size === product.size &&
            p.color[0] === product.color[0]
        );
        if (inCart) {
          setCartItems(
            cartItems.map((p) => {
              if (
                p.id === product.id &&
                p.size === product.size &&
                p.color[0] === product.color[0]
              ) {
                return { ...inCart, amount: inCart.amount + 1 };
              } else return p;
            })
          );
        } else {
          setCartItems([...cartItems, { ...product, amount: 1 }]);
        }
      }
    })

  };

  const cleanCart = () => {
    localStorage.removeItem("CartProducts");
    setCartItems([]);
    console.log(localStorage);
  };
  const deleteItemToCart = (product) => {
    Swal.fire({
      /*  title: "Estas seguro que desea agregar este item?", */
      text: "Estas seguro que deseas quitar este item?",
      width: "30%",
      padding: "10px",
      background: "black",
      allowEnterKey: true,
      allowEscapeKey: true,
      imageUrl: `${product.images[0]}`,
      imageHeight: 200,
      imageWidth: 200,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3a3c3b",
      cancelButtonColor: "#b50707",
      confirmButtonText: "Si, quitalo!"
    }).then((response) => {
      if (response.isConfirmed) {
        const inCart = cartItems.find(
          (p) => p.id === product.id && p.size === product.size
        );
        if (inCart.amount === 1) {
          setCartItems(cartItems.filter((p) => p !== inCart));
        } else {
          setCartItems(
            cartItems.map((p) => {
              if (p.id === product.id && p.size === product.size) {
                return { ...inCart, amount: inCart.amount - 1 };
              } else return p;
            })
          );
        }
      }
    })
  };

  let history = useHistory();
  const redirectHome = () => {
    history.push("/shop");
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        deleteItemToCart,
        redirectHome,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
