import React from "react";
import logo from "../../Resources/logo.jpg";
import { Link } from "react-router-dom";
import { Box, Button, keyframes } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from "@mui/material/styles/styled";

const ShadowPopBr = keyframes`
0% {
  -webkit-transform: scaleY(0);
          transform: scaleY(0);
  opacity: 1
}
100% {
  -webkit-transform: scaleY(1);
          transform: scaleY(1);
  opacity: 1        

}

`;

const Holder = styled(Box)(({ roll }) => ({
  translate: "0% 4%",
  border: "1px solid white",
  borderRadius: "2%",
  margin: "1% 30%",
  padding: "2%",
  bgcolor: "black",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  visibility: !roll && "hidden",
  animation:
    roll && `${ShadowPopBr} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
}));

export const LandingPage = () => {
  return (
    <Box>
      <Holder roll="false" sx={{ bgcolor: "black" }}>
        <img src={logo} alt="landing" width="500px"></img>

        <Link
          style={{
            textDecoration: "none",
            color: "Black",
          }}
          to="/home"
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "rgb(235, 203, 100)",
              color: "#181111",
              padding: "1em",
              ":hover": {
                bgcolor: "rgb(242, 157, 18)",
              },
            }}
          >
            <ShoppingCartIcon />
            Ver productos
          </Button>
        </Link>
      </Holder>
    </Box>
  );
};
