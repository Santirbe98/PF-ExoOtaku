import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWishList,
  chkcustomer,
  deleteWishlist,
  getProductDetail,
} from "../../Redux/Actions";
import s from "./CardDetail.module.css";
import { CartContext } from "../Cart/CartContext";
import { Box, Grid, Typography, CardMedia, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Swal from "sweetalert2";

export const CardDetail = ({ match }) => {
  const { addItemToCart, redirectHome } = useContext(CartContext);
  let { id } = match.params;
  const dispatch = useDispatch();
  const [product, setProduct] = useState("");
  const [size, setSize] = useState("");
  const [productColor, setProductColor] = useState("");
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  const handleColor1 = (e) => {
    setProductColor(product.imagesDb[e]);
  };
  const [selectedValue, setSelectedValue] = React.useState(0);
  const handleChange1 = (e) => {
    var f = Number(e.target.value);
    setSelectedValue(f);
    setProductColor(product.imagesDb[f]);
  };
  const handleColor = (e) => {
    setSelectedValue(e);
    handleColor1(e);
  };
  const customer = useSelector((state) => state.chk_customer);

  useEffect(() => {
    if (customer.id) dispatch(chkcustomer(customer.email));
  }, [dispatch]);

  const handleFavorite = (input) => {
    if (document.getElementById(`${product.id}`).style.color === "white") {
      Swal.fire({
        text: "Estas seguro que deseas agregar este item a Favoritos?",
        width: "30%",
        padding: "10px",
        allowEnterKey: true,
        allowEscapeKey: true,
        icon: "question",
        background: "black",
        showCancelButton: true,
        confirmButtonColor: "#00711a",
        cancelButtonColor: "#b50707",
        confirmButtonText: "Si, agregalo!",
      }).then((response) => {
        if (response.isConfirmed) {
          document.getElementById(`${product.id}`).style.color = "red";
          dispatch(addWishList({ id: customer.id, wishList: id }));
        }
      });
    } else {
      Swal.fire({
        text: "Estas seguro que deseas quitar este item de Favoritos?",
        width: "30%",
        padding: "10px",
        allowEnterKey: true,
        allowEscapeKey: true,
        icon: "warning",
        background: "black",
        showCancelButton: true,
        confirmButtonColor: "#00711a",
        cancelButtonColor: "#b50707",
        confirmButtonText: "Si, quitalo!",
      }).then((response) => {
        if (response.isConfirmed) {
          document.getElementById(`${input}`).style.color = "white";
          dispatch(deleteWishlist({ id: customer.id, productId: Number(id) }));
        }
      });
    }
  };

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(getProductDetail(id)).then((res) => {
      setProduct(res.payload);
      setSize(res.payload.size[0]);
      setProductColor(res.payload.imagesDb[0]);
    });
  }, [dispatch, id]);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {Object.entries(product).length ? (
          <Box>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography
                  variant="h4"
                  sx={{ lineHeight: 2, letterSpacing: 5 }}
                >
                  {product.name.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
                <Box>
                  <Carousel
                    index={selectedValue}
                    next={(prev, active) => handleColor(prev)}
                    prev={(prev, active) => handleColor(prev)}
                    indicators={true}
                  >
                    {product.imagesDb?.map((i, index) => (
                      <Box
                        sx={
                          width > 1200
                            ? {
                                display: "flex",
                                justifyContent: "flex-end",
                              }
                            : { display: "flex", justifyContent: "center" }
                        }
                      >
                        <CardMedia
                          key={Math.random()}
                          /* key={i.color} */
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
                      </Box>
                    ))}
                  </Carousel>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={7}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                            maxWidth: 150,
                            margin: 2,
                            borderRadius: 3,
                            backgroundColor: "rgb(33, 33, 33)",
                          }}
                          onClick={() => {
                            handleColor(index);
                          }}
                          image={i.images}
                          alt={i.color}
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box mb={10}>
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
                        addItemToCart({
                          ...product,
                          size: size,
                          images: [productColor.images],
                          color: [productColor.color],
                        });
                      }}
                    >
                      Agregar al carrito
                    </Button>
                    {customer.id ? (
                      <Button
                        style={{ marginLeft: 20 }}
                        variant="contained"
                        color="success"
                        size="large"
                        onClick={() => handleFavorite(product.id)}
                      >
                        <FavoriteIcon
                          id={product.id}
                          style={{
                            color: customer.wishList?.includes(product.id)
                              ? "red"
                              : "white",
                          }}
                        ></FavoriteIcon>
                      </Button>
                    ) : (
                      false
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h3">"Cargando Producto"</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};
