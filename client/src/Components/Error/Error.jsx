import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../../Resources/404.png";
import { Box, Button } from "@mui/material";


export const Error = () => {
  return (
    <Box pt={5}>
      <Box>
        <img
          src={errorImg}
          alt="404"
          width="800px"
          style={{ borderRadius: "20px" }}
        />
      </Box>
      <Box pt={5}>
        <Link
          to="/home"
          style={{
            textDecoration: "none",
          }}
        >
          <Button variant="contained" color="error">
            Back...
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
