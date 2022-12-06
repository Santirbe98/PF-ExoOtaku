import React, { useState } from "react";
import { filterAll } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import s from "./Filter.module.css";

export function Filter(props) {
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

  function handleFilterClean(e) {
    dispatch(
      filterAll({
        type: "All",
        color: "All",
        category: "All",
      })
    );
    props.setPage(1);
    setInput({
      type: "All",
      color: "All",
      category: "All",
    });
    document
      .getElementById("colorSelect")
      .getElementsByTagName("option")[0].selected = "selected";
    document
      .getElementById("typeSelect")
      .getElementsByTagName("option")[0].selected = "selected";
    document
      .getElementById("categorySelect")
      .getElementsByTagName("option")[0].selected = "selected";
  }

  const categArr = [];
  if (products) {
    products.map((c) => categArr.push(c.category));
  }
  let hash = {};
  const categoriesWithoutRepeat = categArr.filter((c) =>
    hash[c] ? false : (hash[c] = true)
  );
  return (
    <>
      <div>
        <select
          onChange={(e) => handleFilterCol(e)}
          className={s.filterSelect}
          id="colorSelect"
        >
          <option value="All" key="All">
            Todos
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
      </div>
      <div>
        <select
          onChange={(e) => handleFilterType(e)}
          className={s.filterSelect}
          id="typeSelect"
        >
          <option value="All" key="All2">
            Todos
          </option>
          <option value="Tshirt" key="tshirt">
            Remera
          </option>
          <option value="Sweter" key="sweter">
            Buzo
          </option>
        </select>
      </div>
      <div>
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
      </div>
      <div>
        <button
          className={s.filterButton}
          onClick={(e) => handleFilterClean(e)}
        >
          Limpiar
        </button>
      </div>
    </>
  );
}
