import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getCheckout } from "../../Redux/Actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import BasicTable from "./table";
import sendEmailSuccess from "./emailsuccess";
import { CartContext } from "../Cart/CartContext";
import { useContext } from "react";

export const CheckOutSuccess = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [Order, setOrder] = useState("");
  const [user, setUser] = useState({});
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  let session_id = search.substring(12, search.length);
  const { cleanCart } = useContext(CartContext);
  const history = useHistory();
  useEffect(() => {
    dispatch(getCheckout(session_id)).then((data) => {
      console.log(data.payload);
      setOrder(data.payload.orderUser.order_id);
      setproducts(data.payload.userCart.ShoppingLists);
      setUser(data.payload.userData);
      setInfo({
        fecha: data.payload.orderUser.createdAt,
        total_prod: data.payload.orderUser.cart_ammount,
        total_env: data.payload.orderUser.delivery_ammount,
        estado: data.payload.orderUser.status,
      });

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }, cleanCart());
  }, [dispatch]);

  setTimeout(() => {
    history.push("/");
  }, 7500);

  return (
    <Box minHeight="100vh">
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
            <Typography variant="h5">Tu compra es la número {Order}</Typography>

            <Typography
              variant="h5"
              sx={{ paddingBottom: "2%", paddingTop: "2%" }}
            >
              Resumen de compra
            </Typography>
            <Box sx={{ padding: "0% 5%" }}>
              <BasicTable Products={products} />
              {sendEmailSuccess({
                Order: Order,
                email: user.email,
                name: user.name,
                fecha: info.fecha,
                total_prod: info.total_prod,
                total_env: info.total_env,
                estado: info.estado,
              })}
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
            Volver a la tienda
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
