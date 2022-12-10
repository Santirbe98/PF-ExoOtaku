import React from "react";
import { Container, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <Box bgcolor="black" py={{ xs: 5, sm: 3 }} color="white">
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box>
                <Link
                  to="/home"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  Home
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>
                <Link
                  to="/about"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  About
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>
                <Link
                  to="/help"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  Help
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 3 }} pb={{ xs: 5, sm: 0 }}>
            © ExoOtaku
          </Box>
        </Container>
      </Box>
    </footer>
  );
};
