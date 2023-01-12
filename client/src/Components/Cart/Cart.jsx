import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ItemCart } from "./CartItem";
import { CartContext } from "./CartContext";
import styles from "./Cart.module.css";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile2 from "../Authenticate/Profile2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Grid from "@mui/material/Unstable_Grid2";

const Cart = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const UserValidate = useSelector((state) => state.chk_customer);

  /* Creamos 2 estados, uno para ver si el carrito esta abierto o no 
    y otro para obtener la cantidad de productos que tenemos en el carrito */
  const [cartOpen, setCartOpen] = useState(false);
  const [productsLength, setProductsLength] = useState(0);

  /* Traemos del context los productos del carrito */
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    setProductsLength(
      cartItems.reduce((previous, current) => previous + current.amount, 0)
    );
  }, [cartItems]);
  const total = cartItems.reduce(
    (previous, current) => previous + current.amount * current.price,
    0
  );

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Grid container>
      {width > 800 ? (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box className={styles.cartContainer}>
            <Box
              onClick={() => setCartOpen(!cartOpen)}
              className={styles.buttonCartContainer}
            >
              <Box className={styles.buttonCart}>
                {!cartOpen ? (
                  <ShoppingCartIcon />
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.559099 0.559099C0.917199 0.201108 1.40282 0 1.90917 0C2.41553 0 2.90115 0.201108 3.25925 0.559099L10.0115 7.31138L16.7638 0.559099C17.124 0.211254 17.6063 0.0187787 18.107 0.0231296C18.6077 0.0274804 19.0866 0.228309 19.4407 0.582361C19.7947 0.936413 19.9956 1.41536 19.9999 1.91605C20.0043 2.41673 19.8118 2.8991 19.464 3.25925L12.7117 10.0115L19.464 16.7638C19.8118 17.124 20.0043 17.6063 19.9999 18.107C19.9956 18.6077 19.7947 19.0866 19.4407 19.4407C19.0866 19.7947 18.6077 19.9956 18.107 19.9999C17.6063 20.0043 17.124 19.8118 16.7638 19.464L10.0115 12.7117L3.25925 19.464C2.8991 19.8118 2.41673 20.0043 1.91605 19.9999C1.41536 19.9956 0.936413 19.7947 0.582361 19.4407C0.228309 19.0866 0.0274804 18.6077 0.0231296 18.107C0.0187787 17.6063 0.211254 17.124 0.559099 16.7638L7.31138 10.0115L0.559099 3.25925C0.201108 2.90115 0 2.41553 0 1.90917C0 1.40282 0.201108 0.917199 0.559099 0.559099Z"
                      fill="#F0F0F0"
                    />
                  </svg>
                )}
              </Box>
              {!cartOpen && (
                <Box className={styles.productsNumber}>{productsLength}</Box>
              )}
            </Box>

            {cartItems && cartOpen && (
              <Box className={styles.cart}>
                <h2>Tu carrito</h2>

                {cartItems.length === 0 ? (
                  <p className={styles.cartVacio}>Tu carrito esta vacio</p>
                ) : (
                  <Box className={styles.productsContainer}>
                    {cartItems.map((item, i) => (
                      <ItemCart key={i} item={item} />
                    ))}
                  </Box>
                )}
                <h2 className={styles.total}>Total: ${total}</h2>
                <Box pb={3}>
                  {!isAuthenticated ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => loginWithRedirect()}
                    >
                      Iniciar sesion
                    </Button>
                  ) : (
                    UserValidate === null && <Profile2 />
                  )}
                </Box>
                <Box pb={3}>
                  {cartItems.length > 0 ? (
                    <Link
                      to="/cartDetail"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => setCartOpen(!cartOpen)}
                      >
                        Comprar de Carrito
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="contained"
                      color="info"
                      disabled={!cartItems.length ? true : false}
                    >
                      Detalle de Carrito
                    </Button>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      ) : (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box>
            <Box onClick={() => setCartOpen(!cartOpen)}>
              <Box>
                {!cartOpen ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      style={{
                        backgroundColor: "#CFE15C",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ShoppingCartIcon />
                    </Box>
                  </Box>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.559099 0.559099C0.917199 0.201108 1.40282 0 1.90917 0C2.41553 0 2.90115 0.201108 3.25925 0.559099L10.0115 7.31138L16.7638 0.559099C17.124 0.211254 17.6063 0.0187787 18.107 0.0231296C18.6077 0.0274804 19.0866 0.228309 19.4407 0.582361C19.7947 0.936413 19.9956 1.41536 19.9999 1.91605C20.0043 2.41673 19.8118 2.8991 19.464 3.25925L12.7117 10.0115L19.464 16.7638C19.8118 17.124 20.0043 17.6063 19.9999 18.107C19.9956 18.6077 19.7947 19.0866 19.4407 19.4407C19.0866 19.7947 18.6077 19.9956 18.107 19.9999C17.6063 20.0043 17.124 19.8118 16.7638 19.464L10.0115 12.7117L3.25925 19.464C2.8991 19.8118 2.41673 20.0043 1.91605 19.9999C1.41536 19.9956 0.936413 19.7947 0.582361 19.4407C0.228309 19.0866 0.0274804 18.6077 0.0231296 18.107C0.0187787 17.6063 0.211254 17.124 0.559099 16.7638L7.31138 10.0115L0.559099 3.25925C0.201108 2.90115 0 2.41553 0 1.90917C0 1.40282 0.201108 0.917199 0.559099 0.559099Z"
                      fill="#F0F0F0"
                    />
                  </svg>
                )}
              </Box>
              {!cartOpen && <Box>{productsLength}</Box>}
            </Box>
            {cartItems && cartOpen && (
              <Box>
                <h2>Tu carrito</h2>
                {cartItems.length === 0 ? (
                  <p className={styles.cartVacio}>Tu carrito esta vacio</p>
                ) : (
                  <Box>
                    {cartItems.map((item, i) => (
                      <ItemCart key={i} item={item} />
                    ))}
                  </Box>
                )}
                <h2 className={styles.total}>Total: ${total}</h2>
                <Box pb={3}>
                  {!isAuthenticated ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => loginWithRedirect()}
                    >
                      Iniciar sesion
                    </Button>
                  ) : (
                    UserValidate === null && <Profile2 />
                  )}
                </Box>
                <Box pb={3}>
                  {cartItems.length > 0 ? (
                    <Link
                      to="/cartDetail"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Button variant="contained" color="success" size="small">
                        Detalle de Carrito
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="contained"
                      color="info"
                      disabled={!cartItems.length ? true : false}
                    >
                      Detalle de Carrito
                    </Button>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Cart;
