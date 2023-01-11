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

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const addItemToCart = (product) => {
    {
      width > 800
        ? Swal.fire({
          /*  title: "Estas seguro que desea agregar este item?", */
          text: "Estas seguro que deseas agregar este item?",
          width: "30%",
          padding: "10px",
          /* grow: "fullscreen", */
          allowEnterKey: true,
          allowEscapeKey: true,
          icon: "question",
          position: "top",
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
        : Swal.fire({
          /*  title: "Estas seguro que desea agregar este item?", */
          text: "Estas seguro que deseas agregar este item?",
          width: "80%",
          padding: "10px",
          allowEnterKey: true,
          allowEscapeKey: true,
          icon: "question",
          position: "top",
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
        });
    }
  };

  const cleanCart = () => {
    Swal.fire({
      text: "Estas seguro que deseas limpiar el carrito?",
      width: "30%",
      padding: "10px",
      background: "black",
      position: "top",
      allowEnterKey: true,
      allowEscapeKey: true,
      imageUrl: "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/760/094/themes/common/logo-204180220-1664550124-6d7184aec833212b57e39d5f3bd0e32d1664550125.png?0",
      imageHeight: 200,
      imageWidth: 200,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b50707",
      cancelButtonColor: "#3a3c3b",
      confirmButtonText: "Si, limpialo!",
    }).then((response) => {
      if (response.isConfirmed) {
        localStorage.removeItem("CartProducts");
        setCartItems([]);
        /*     console.log(localStorage); */
      }
    });
  };
  const deleteItemToCart = (product) => {
    Swal.fire({
      /*  title: "Estas seguro que desea agregar este item?", */
      text: "Estas seguro que deseas quitar este item?",
      width: "30%",
      padding: "10px",
      background: "black",
      position: "top",
      allowEnterKey: true,
      allowEscapeKey: true,
      imageUrl: `${product.images[0]}`,
      imageHeight: 200,
      imageWidth: 200,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3a3c3b",
      cancelButtonColor: "#b50707",
      confirmButtonText: "Si, quitalo!",
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
    });
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
