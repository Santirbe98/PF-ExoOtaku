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
import Cart from "../Cart/Cart";
import { Box, Grid, Typography, CardMedia, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { white, black, blue, pink, yellow } from "@mui/material/colors";
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

  useEffect(() => {
    dispatch(getProductDetail(id)).then((res) => {
      setProduct(res.payload);
      setSize(res.payload.size[0]);
      setProductColor(res.payload.imagesDb[0]);
    });
  }, [dispatch, id]);
  return (
    <Box minHeight="100vh">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                    {product.imagesDb?.map((i, index) => (
                      <FormControlLabel
                        key={index}
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
                    ))}
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
                      addItemToCart({
                        ...product,
                        size: size,
                        images: [productColor.images],
                        color: [productColor.color],
                      });
                      /*  redirectHome(); */
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
                          color: customer.wishList.includes(product.id)
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
          </Box>
        ) : (
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h3">"Cargando Producto"</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
      <Grid item xs={12} sm={12} md={6}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "25px",
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
    </Box>
  );
};
