import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getCheckout } from "../../Redux/Actions";
import { NavBar } from "../NavBar/NavBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import BasicTable from "./table";
import { CartContext } from "../Cart/CartContext";
import { useContext } from "react";

export const CheckOutSuccess = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [Order, setOrder] = useState("");
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  let session_id = search.substring(12, search.length);
  const { cartItems, addItemToCart, deleteItemToCart,cleanCart } =
  useContext(CartContext);

  useEffect(() => {
    dispatch(getCheckout(session_id)).then((data) => {
      setOrder(data.payload.paymentUser.id);
      setproducts(data.payload.userCart.ShoppingLists);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    },cleanCart());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Box>
        <Typography sx={{ padding: "1%" }} variant="h2">
          ¡Gracias por tu compra!
        </Typography>
      </Box>

      <Box sx={{ padding: "2%" }}>
        {loading === true ? (
          <>
            <Typography variant="h5">Tu orden está siendo procesada</Typography>

            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                color="success"
                variant="indeterminate"
                size="lg"
              />
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5">
              Tu id de pago es
              <Typography sx={{ padding: "1%" }}> {Order} </Typography>
            </Typography>

            <Typography variant="h5" sx={{ paddingBottom: "2%" }}>
              Productos
            </Typography>
            <Box sx={{ padding: "0% 5%" }}>
              <BasicTable Products={products} />
            </Box>
          </>
        )}
      </Box>

      <Box sx={{ paddingBottom: "2%" }}>
        <Link
          to="/home"
          style={{
            textDecoration: "none",
          }}
        >
          <Button variant="contained" color="success">
            Back to Home
          </Button>
        </Link>
      </Box>
    </div>
  );
};
