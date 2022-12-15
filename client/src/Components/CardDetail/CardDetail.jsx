import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductDetail } from "../../Redux/Actions";
import s from "./CardDetail.module.css";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { CartContext } from "../Cart/CartContext";
import Cart from "../Cart/Cart";
import { Box, Grid, Typography, CardMedia, Button } from "@mui/material";

export const CardDetail = ({ match }) => {
  const { addItemToCart } = useContext(CartContext);
  let { id } = match.params;
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [size, setSize] = useState("");

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  useEffect(() => {
    dispatch(getProductDetail(id)).then((res) => {
      setProduct(res.payload);
      setSize(res.payload.size[0]);
    });
  }, [dispatch, id]);

  return (
    <div>
      <NavBar />
      <Cart />
      <div className={s.container}>
        {Object.entries(product).length ? (
          <Box
            sx={{
              width: 1000,
              height: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2} columns={16}>
              <Grid item xs={8}>
                {product.images?.map((i, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    sx={{
                      maxWidth: 400,
                      margin: 2,
                      borderRadius: 3,
                      backgroundColor: "rgb(33, 33, 33)",
                    }}
                    image={i}
                    alt="Product"
                  />
                ))}
              </Grid>

              <Grid item xs={8}>
                <Typography
                  variant="h3"
                  sx={{ lineHeight: 2, letterSpacing: 6 }}
                >
                  {product.name}
                </Typography>
                <Typography variant="h4" sx={{ lineHeight: 2 }}>
                  Seleccionar color
                </Typography>
                <select className={s.filterSelect}>
                  {!product.color?.length ? (
                    <option>No colors available</option>
                  ) : (
                    product.color.map((c) => <option key={c}>{c}</option>)
                  )}
                </select>
                <Typography variant="h4" sx={{ lineHeight: 2 }}>
                  Seleccionar talle
                </Typography>
                <select
                  className={s.filterSelect}
                  onChange={(e) => handleSize(e)}
                >
                  {!product.size?.length ? (
                    <option key={id}>No hay tallas disponibles</option>
                  ) : (
                    product.size.map((c) => (
                      <option value={c} key={c}>
                        {c}
                      </option>
                    ))
                  )}
                </select>
                <Typography variant="h6" sx={{ lineHeight: 2 }}>
                  {product.description}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={() => addItemToCart({ ...product, size: size })}
                >
                  Agregar al carrito
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{ height: "600px", display: "flex", justifyContent: "center" }}
          >
            <div className={s.container}>
              <h1>"Cargando Producto"</h1>
            </div>
          </Box>
        )}
      </div>
      <Footer />
    </div>
  );
};
