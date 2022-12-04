import React, { useState } from "react";
import { filterAll } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";

export function Filter() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  console.log(products)
  const [input, setInput] = useState({
    type: "All",
    color: "All",
    category: "All",
  });
  console.log(input);
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
  }
  // function handleFilter(e) {
  //   e.preventDefault();
  //   dispatch(filterAll(e.target.value));
  // }

  const categArr = [];
  if (products) {
    products.map((c) => {
      categArr.push(c.category);
    });
  }
  let hash = {};
  const categoriesWithoutRepeat = categArr.filter((c) =>
    hash[c] ? false : (hash[c] = true)
  );
  return (
    <>
      <div>
        <h3>Filtros Colores</h3>
        <select onChange={(e) => handleFilterCol(e)}>
          <option disabled select>
            Select Color...
          </option>
          <option value="All">Todos</option>
          <option value="Black">Negro</option>
          <option value="White">Blanco</option>
          <option value="Pink">Rosado</option>
          <option value="Blue">Azul</option>
        </select>
      </div>
      <div>
        <h3>Filtros typo</h3>
        <select onChange={(e) => handleFilterType(e)}>
          <option disabled select>
            Select Tipo...
          </option>
          <option value="All">Todos</option>
          <option value="Tshirt">Remera</option>
          <option value="Sweter">Buzo</option>
        </select>
      </div>
      <div>
        <select onChange={(e) => handleFilterCat(e)}>
          <option disabled select>
            Select Tipo...
          </option>
          <option value="All">Todos los animes</option>
          {categoriesWithoutRepeat.map((c) => {
            return <option value={c}> {c} </option>;
          })}
        </select>
      </div>
    </>
  );
}
