import { Typography } from "@mui/material";
import React from "react";
import { NavBar } from "../NavBar/NavBar";
import { Box } from "@mui/system";
import CollapsibleTable from "./listorders";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteOrder } from "../../Redux/Actions";
import { getAllOrders } from "../../Redux/Actions";
import { CircularProgress } from "@material-ui/core";

const Orders = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  console.log(orders);

  useEffect(() => {
    dispatch(getAllOrders()).then((data) => {
      setOrders(data.payload);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
  }, [dispatch]);

  const handleClick = (id) => {
    alert("seguro que quiere borrar la orden?");
    dispatch(deleteOrder(id));
    alert("orden borrada");
    dispatch(getAllOrders()).then((data) => {
      setOrders(data.payload);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
  };

  return (
    <div>
      <NavBar />
      <Typography variant="h3"> Lista de órdenes </Typography>
      <Box sx={{ padding: "2%" }}>
        {loading === false ? (
          <CollapsibleTable
            Products={orders}
            loading={loading}
            handleClick={handleClick}
          />
        ) : (
          <>
            <Typography> Cargando ordenes </Typography>
            <Box>
              <CircularProgress color="secondary" />
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};

export default Orders;
