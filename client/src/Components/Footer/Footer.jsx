import React from "react";
import { Container, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export const Footer = () => {
  return (
    <footer>
      <Box bgcolor="black" py={{ xs: 5, sm: 3 }} color="white">
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={4} sm={4}>
              <Box>
                <Link
                  to="/home"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  Inicio
                </Link>
              </Box>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Box>
                <Link
                  to="/about"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  Sobre nosotros
                </Link>
              </Box>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Box>
                <Link
                  to="/help"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  Ayuda
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 3 }} pb={{ xs: 5, sm: 0 }}>
            © ExoOtaku
          </Box>
        </Container>
        <Box>
          <a href="https://www.facebook.com/search/top?q=exootaku">
            <FacebookIcon fontSize="large" htmlColor="white" />
          </a>
          <a href="https://www.instagram.com/exotaku/?hl=es">
            <InstagramIcon fontSize="large" htmlColor="white" />
          </a>
          <a href="https://walink.co/d3e440">
            <WhatsAppIcon fontSize="large" htmlColor="white" />
          </a>
        </Box>
      </Box>
    </footer>
  );
};
