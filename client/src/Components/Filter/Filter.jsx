import React, { useState } from "react";
import { filterAll, orderByPrice } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import s from "./Filter.module.css";

export const Filter = (props) => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    type: "All",
    color: "All",
    category: "All",
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
      <Box>
        <select
          onChange={(e) => handleFilterCol(e)}
          className={s.filterSelect}
          id="colorSelect"
        >
          <option value="All" key="All">
            Color
          </option>
          <option value="Black" key="Black">
            Negro
          </option>
          <option value="White" key="White">
            Blanco
          </option>
          <option value="Pink" key="Pink">
            Rosado
          </option>
          <option value="Blue" key="Blue">
            Azul
          </option>
        </select>
      </Box>
      <Box>
        <select
          onChange={(e) => handleFilterType(e)}
          className={s.filterSelect}
          id="typeSelect"
        >
          <option value="All" key="All2">
            Tipo de prenda
          </option>
          <option value="Tshirt" key="tshirt">
            Remera
          </option>
          <option value="Sweter" key="sweter">
            Buzo
          </option>
        </select>
      </Box>
      <Box>
        <select
          onChange={(e) => handleFilterCat(e)}
          className={s.filterSelect}
          id="categorySelect"
        >
          <option value="All">Todos los animes</option>
          {categoriesWithoutRepeat.map((c) => {
            return (
              <option value={c} key={c}>
                {c}
              </option>
            );
          })}
        </select>
      </Box>
      <select
        onChange={(e) => handleOrderByPrice(e)}
        className={s.filterSelect}
        id="priceSelect"
      >
        <option disabled selected>
          Ordenar por precios
        </option>
        <option value="Asc" key="All2">
          Menor precio
        </option>
        <option value="Desc" key="tshirt">
          Mayor precio
        </option>
      </select>
      <Box>
        <Box pt={1}>
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
    </Box>
  );
};
