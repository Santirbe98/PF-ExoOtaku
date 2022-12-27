import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductDetail } from "../../Redux/Actions";
import s from "./CardDetail.module.css";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { CartContext } from "../Cart/CartContext";
import Cart from "../Cart/Cart";
import { Box, Grid, Typography, CardMedia, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { white, black, blue, pink, yellow } from "@mui/material/colors";

export const CardDetail = ({ match }) => {
  const { addItemToCart, redirectHome } = useContext(CartContext);
  let { id } = match.params;
  const dispatch = useDispatch();
  const [product, setProduct] = useState("");
  const [size, setSize] = useState("");

  const handleSize = (e) => {
    setSize(e.target.value);
  };
  const [selectedValue, setSelectedValue] = React.useState(0);
  const handleChange1 = (event) => {
    setSelectedValue(Number(event.target.value));
    console.log(selectedValue, Number(event.target.value))}
  const handleColor = (e) => {
    setSelectedValue(e);
    console.log(selectedValue);
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
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingBottom: 30 }}
      >

        {Object.entries(product).length ? (
          <Box
          sx={{
            width: 1000,
            height: 600,
            display: "flex",
            alignItems: "center",
          }}
          >
           
            <Grid container spacing={30}>
              <Grid item xs={12} sm={12} md={6}>
                <Carousel
                index={selectedValue}
                  fullHeightHover={false}
                  autoPlay={false}
                  navButtonsAlwaysVisible={true}
                  navButtonsWrapperProps={{ margin: "20" }}
                  next={(prev, active) => handleColor(prev)}
                  prev={(prev, active) => handleColor(prev)}
                >
                  {product.imagesDb?.map((i, index) => (
                    <CardMedia
                      key={i.color}
                      component="img"
                      sx={{
                        maxWidth: 400,
                        margin: 0,
                        borderRadius: 3,
                        backgroundColor: "rgb(33, 33, 33)",
                      }}
                      image={i.images}
                      alt={i.color}
                    />
                  ))}

                </Carousel>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{ lineHeight: 2, letterSpacing: 6 }}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="h4" sx={{ lineHeight: 2 }}>
                    Seleccionar color
                  </Typography>
                  <div>
              {product.imagesDb?.map(
                (i, index) => (
                  (
                    <FormControlLabel
                      value={index}
                      label={i.color}
                      control={
                        <Radio
                          checked={selectedValue == index}
                          onChange={handleChange1}
                          value={index}
                          name="radio-buttons"
                          inputProps={{ "aria-label": "A" }}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 58,
                            },
                            color: pink[800],
                            "&.Mui-checked": {
                              color: i.color.toLowerCase()[600],
                            },
                          }}
                        />
                      }
                    />
                  )
                )
              )}
            </div>
                  {/* <select className={s.filterSelect}>
                    {product.imagesDb.map((c, index) => (
                      <option key={index}>{c.color}</option>
                    ))}
                  </select> */}
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
                    onClick={() => {
                      addItemToCart({ ...product, size: size });
                      redirectHome();
                    }}
                  >
                    Agregar al carrito
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Grid container>
            <Grid xs={12} sm={12} md={12}>
              <Typography variant="h3">"Cargando Producto"</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
      {/* <Grid item xs={12} sm={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {product.imagesDb?.map((i, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      sx={{
                        maxWidth: 100,
                        margin: 2,
                        borderRadius: 3,
                        backgroundColor: "rgb(33, 33, 33)",
                      }}
                      image={i.images}
                      alt={i.color}
                    />
                  ))}
                </Box>
              </Grid> */}

      <Footer />
    </div>
  );
};
