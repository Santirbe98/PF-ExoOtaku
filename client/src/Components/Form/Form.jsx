import React from "react";
import { Link } from "react-router-dom";
import { validate } from "./Validate";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../../Redux/Actions";
import { NavBar } from "../NavBar/NavBar.jsx";

import style from "./Form.module.css";
import * as T from "./Errors.module.css";

export const Form = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    price: 0,
    descriptions: "",
    images: [],
    stock: 0,
    type: "",
    size: ["XSmall", "Small", "Medium", "Large", "XLarge", "XXLarge"],
    color: ["Black", "White"],
    category: "",
  });

  const initialState = {
    name: "",
    price: 0,
    descriptions: "",
    images: [],
    stock: 0,
    color: ["Black", "White"],
    type: "",
    size: ["XSmall", "Small", "Medium", "Large", "XLarge", "XXLarge"],
    category: "",
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postProduct(input));
    alert("done");
    setInput(initialState);
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleImages(e) {
    setInput({
      ...input,
      images: [...input.images, String(e.target.value)],
    });
    setErrors(
      validate({
        ...input,
        images: e.target.value,
      })
    );
  }

  function handleTypes(e) {
    setInput({
      ...input,
      type: e.target.value,
    });
  }

  function addsize(e) {
    if (!input.size.includes(e.target.value)) {
      setInput({
        ...input,
        size: [...input.size, e.target.value],
      });
    }
  }

  function addcolor(e) {
    if (!input.color.includes(e.target.value)) {
      setInput({
        ...input,
        color: [...input.color, e.target.value],
      });
    }
  }

  function handleCloseSize(e) {
    e.preventDefault();
    const filter = input.size.filter((size) => size !== e.target.value);
    setInput({
      ...input,
      size: filter,
    });
  }
  function handleClosecolor(e) {
    e.preventDefault();
    const filterc = input.color.filter((size) => size !== e.target.value);
    setInput({
      ...input,
      color: filterc,
    });
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <h1>Create New Product</h1>

      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label> Name </label>
            <input
              value={input.name}
              type="text"
              name="name"
              onChange={(e) => handleChange(e)}
              className={!errors.name ? style.input : T.input}
            />
            {errors.name && (
              <p
                key={errors.name}
                className={T.pError}
                id="component-error-text"
              >
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label> descriptions </label>
            <textarea
              value={input.descriptions}
              onChange={(e) => handleChange(e)}
              rows="5"
              cols="30"
              name="descriptions"
              className={!errors.descriptions ? style.input : T.input}
            />
            {errors.descriptions && (
              <p
                key={errors.descriptions}
                className={T.pError}
                id="component-error-text"
              >
                {errors.descriptions}
              </p>
            )}
          </div>

          <div>
            <label> Price </label>
            <input
              value={input.price}
              id="standard-number"
              type="number"
              onChange={(e) => handleChange(e)}
              name="price"
              className={!errors.price ? style.input : T.input}
            />

            {errors.price && (
              <p
                key={errors.price}
                className={T.pError}
                id="component-error-text"
              >
                {errors.price}
              </p>
            )}
          </div>

          <div>
            <label> Stock </label>
            <input
              value={input.stock}
              type="number"
              onChange={(e) => handleChange(e)}
              name="stock"
              className={!errors.stock ? style.input : T.input}
            />
            {errors.stock && (
              <p
                key={errors.stock}
                className={T.pError}
                id="component-error-text"
              >
                {errors.stock}
              </p>
            )}
          </div>
          <div>
            <label> Type </label>
            <select
              className={style.filterSelect}
              value={input.type}
              label="Type"
              onChange={handleTypes}
            >
              <option> Choose Type </option>
              <option value={"Shirt"}> Shirt </option>
              <option value={"Sweather"}> Sweather </option>
              <option value={"Other"}> Other </option>
            </select>
            {/* <Button variant="secondary" size="medium" sx={{width: 100, bgcolor: '#5b5b5b', border: 'black'}}> Add </Button> */}
          </div>

          <div>
            <label> Size </label>
            <select
              multiple={false}
              value={input.size}
              label="Size"
              onChange={(e) => {
                addsize(e);
              }}
              className={style.filterSelect}
            >
              <option> Choose Size </option>
              <option value={"XSmall"}> XSmall </option>
              <option value={"Small"}> Small </option>
              <option value={"Medium"}> Medium </option>
              <option value={"Large"}> Large </option>
              <option value={"XLarge"}> XLarge </option>
              <option value={"XXLarge"}> XXLarge </option>
            </select>
          </div>
          <div className={style.DivContainer}>
            <div className={style.sizes}>
              {input.size.length > 0 &&
                input.size.map((c) => {
                  return (
                    <div key={c}>
                      <button value={c} onClick={(e) => handleCloseSize(e)}>
                        {" "}
                        -{" "}
                      </button>
                      <p> {c} </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <div>
              <label> Color </label>
              <select
                className={style.filterSelect}
                value={input.size}
                label="Size"
                onChange={(e) => {
                  addcolor(e);
                }}
              >
                <option> Choose Color </option>
                <option value={"Black"}> Black </option>
                <option value={"White"}> White </option>
                <option value={"Pink"}> Pink </option>
              </select>
            </div>
          </div>
          <div className={style.DivContainer}>
            <div className={style.sizes}>
              {input.color.length > 0 &&
                input.color.map((c) => {
                  return (
                    <div key={c}>
                      <button value={c} onClick={(e) => handleClosecolor(e)}>
                        {" "}
                        -{" "}
                      </button>
                      <p> {c} </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <label> Category </label>
            <input
              className={!errors.category ? style.input : T.input}
              value={input.category}
              type="text"
              id="component-error"
              label="Category"
              name="category"
              aria-describedby="component-error-text"
              onChange={(e) => handleChange(e)}
            />
            {errors.category && (
              <p
                key={errors.category}
                className={T.pError}
                id="component-error-text"
              >
                {errors.category}
              </p>
            )}
          </div>

          <label> Images </label>

          <div>
            <input
              accept="image/*"
              multiple
              type="file"
              onChange={(e) => handleImages(e)}
            />
            <div>
              <img id="output" alt="imageProduct" width={200} />
            </div>

            {errors.images && (
              <p
                key={errors.images}
                className={errors.images ? T.pError : null}
                id="component-error-text"
              >
                {errors.images}
              </p>
            )}
          </div>
          <div>
            {input.images && input.images.map((e) => <p key={e}> {e} </p>)}
          </div>

          <button
            type="submit"
            disabled={Object.keys(errors).length > 0 ? true : false}
            className={style.button}
          >
            {" "}
            Create Product
          </button>
        </form>

        <Link to="/home">
          <button className={style.button}> Back to Home</button>
        </Link>
      </div>
    </div>
  );
};
