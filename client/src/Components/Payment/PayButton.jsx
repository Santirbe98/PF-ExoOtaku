import React from "react";
import { payment } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import { Button, Box } from "@mui/material";

export const PayButton = ({ cartItems, userId }) => {
  const dispatch = useDispatch();
  const handleCheckOut = async () => {
    dispatch(payment({ cartItems, userId }));
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="info"
        onClick={handleCheckOut}
        disabled={!cartItems.length ? true : false}
      >
        Pagar carrito
      </Button>
    </Box>
  );
};
