import React, { useState } from "react";
import { filterAll, orderByPrice } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, FormControl, Grid, MenuItem, Select } from "@mui/material";

export const Filter = (props) => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    type: "All",
    color: "All",
    category: "All",
    price: "All",
  });

  function handleFilterCat(e) {
    e.preventDefault();
    setInput({
      ...input,
      category: e.target.value,
    });
    dispatch(
      filterAll({
        ...input,
        category: e.target.value,
      })
    );
    props.setPage(1);
  }

  function handleFilterCol(e) {
    e.preventDefault();
    setInput({
      ...input,
      color: e.target.value,
    });
    dispatch(
      filterAll({
        ...input,
        color: e.target.value,
      })
    );
    props.setPage(1);
  }

  function handleFilterType(e) {
    e.preventDefault();
    setInput({
      ...input,
      type: e.target.value,
    });
    dispatch(
      filterAll({
        ...input,
        type: e.target.value,
      })
    );
    props.setPage(1);
  }

  const handleOrderByPrice = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      price: e.target.value,
    });
    dispatch(orderByPrice(e.target.value));
    props.setOrder(e.target.value);
    props.setPage(1);
  };

  const categArr = [];
  if (products) {
    products.map((c) => categArr.push(c.category));
  }
  let hash = {};
  const categoriesWithoutRepeat = categArr.filter((c) =>
    hash[c] ? false : (hash[c] = true)
  );
  return (
    <Box>
      <Grid container padding="">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)" }}>
            <Box sx={{ padding: "5px" }}>
              <FormControl variant="standard" sx={{ m: 1, width: 250, backgroundColor: "white", textTransform: "uppercase" }}>
                <Select
                  defaultValue="Colores"
                  sx={{ borderRadius: "5px", fontFamily: "inherit", letterSpacing: "1.5px" }}
                  id="colorSelect"
                  value={input.color}
                  label="Color"
                  onChange={handleFilterCol}
                >
                  <MenuItem sx={{ textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }} value={"All"}>Colores</MenuItem>
                  <MenuItem sx={{ textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }} value={"Black"}>Negro</MenuItem>
                  <MenuItem sx={{ textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }} value={"White"}>Blanco</MenuItem>
                  <MenuItem sx={{ textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }} value={"Blue"}>Blue</MenuItem>
                  <MenuItem sx={{ textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }} value={"Pink"}>Rosado</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ padding: "5px" }}>
              <FormControl variant="standard" sx={{ m: 1, width: 250, textDecoration: "none", backgroundColor: "white" }}>
                <Select
                  defaultValue="Tipo de prenda"
                  sx={{ borderRadius: "5px", textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }}
                  id="typeSelect"
                  value={input.type}
                  label="Type"
                  onChange={handleFilterType}
                >
                  <MenuItem sx={{ textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }} value={"All"}>Tipo de prenda</MenuItem>
                  <MenuItem sx={{ textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }} value={"Tshirt"}>Remera</MenuItem>
                  <MenuItem sx={{ textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }} value={"Sweter"}>Buzo</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ padding: "5px" }}>
              <FormControl variant="standard" sx={{ m: 1, width: 250, textDecoration: "none", backgroundColor: "white" }}>
                <Select
                  defaultValue="Todos los animes"
                  sx={{ borderRadius: "5px", fontFamily: "inherit", textTransform: "uppercase" }}
                  id="typeSelect"
                  value={input.category}
                  label="category"
                  onChange={handleFilterCat}
                >
                  <MenuItem sx={{ textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }} value={"All"}>Todos los animes</MenuItem>
                  {categoriesWithoutRepeat.map((c) => {
                    return (
                      <MenuItem sx={{ textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }} value={c} key={c}>
                        {c}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ padding: "5px" }}>
              <FormControl variant="standard" sx={{ m: 1, width: 250, backgroundColor: "white", textTransform: "uppercase" }}>
                <Select
                  defaultValue="Ordenar por Precios"
                  sx={{ borderRadius: "5px", fontFamily: "inherit" }}
                  id="priceSelect"
                  value={input.price}
                  label="Color"
                  onChange={handleOrderByPrice}
                >
                  <MenuItem sx={{ textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }} value={"All"}>Ordenar por Precios</MenuItem>
                  <MenuItem sx={{ textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }} value={"Desc"}>Mayor Precio</MenuItem>
                  <MenuItem sx={{ textTransform: "uppercase", fontFamily: "inherit", letterSpacing: "1.5px" }} value={"Asc"}>Menor Precio</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ paddingTop: "5px" }}>
              <Button
                size="large"
                variant="contained"
                color="warning"
                // onClick={(e) => handleFilterClean(e)}
                onClick={(e) => document.location.reload()}
              >
                Limpiar
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box >
  );
};
