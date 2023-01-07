import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts, orderByRank, orderByDate } from "../../Redux/Actions";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { TopRanked } from "../TopRanked/TopRanked";
import { Link } from "react-router-dom";
import { TopDate } from "../TopDate/TopDate";
export const LandingPage = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
      .then(() => dispatch(orderByRank()))
      .then(() => dispatch(orderByDate()));
  }, [dispatch]);

  return (
    <Box minHeight="100vh">
      <Typography variant="h3">ExoOtaku anime top 5</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TopRanked />
      </Box>
      <Link to="/shop" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="warning">
          Ir a la tienda
        </Button>
      </Link>
      <Divider
        color="white"
        sx={{ marginTop: 3, width: "90%", marginLeft: "5%" }}
      />
      <Box
        sx={{
          marginTop: 3,
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h5">
              Queres saber de nuestras nuevas ofertas?
            </Typography>
            <Typography variant="subtitle2">
              Dejanos tu email para enterarte de los productos nuevos y ofertas
              de tus productos favoritos
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "0px 10px 0px 10px",
              }}
            >
              <TextField
                placeholder="E-mail"
                color="success"
                style={{
                  backgroundColor: "rgba(255, 253, 253, 0.900)",
                  borderRadius: "10px",
                  width: 450,
                }}
                focused
              />
              <Button
                variant="contained"
                color="success"
                sx={{ marginLeft: 3 }}
              >
                Subcribirme
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Divider
          color="white"
          sx={{ marginTop: 3, width: "90%", marginLeft: "5%" }}
        />
        <Typography variant="h3" mt={10}>
          Nuevos Productos y Ofertas
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TopDate />
        </Box>
      </Box>
    </Box>
  );
};
