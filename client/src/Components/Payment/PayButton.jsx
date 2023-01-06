import React from "react";
import { payment } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import { Button, Box } from "@mui/material";

export const PayButton = ({ cartItems, userId, name, email }) => {
  const dispatch = useDispatch();
  const handleCheckOut = async () => {
    dispatch(payment({ cartItems, userId, name, email }));
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="info"
        onClick={handleCheckOut}
        disabled={!cartItems.length ? true : false}
      >
        Ir a Pagar
      </Button>
    </Box>
  );
};
