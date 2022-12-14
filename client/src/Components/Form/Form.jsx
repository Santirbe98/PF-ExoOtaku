import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../../Redux/Actions";
import axios from "axios";
import { NavBar } from "../NavBar/NavBar.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { validate } from "./Validate";
import style from "./Form.module.css";
// import * as T from "./Errors.module.css";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { FormHelperText, MenuItem, Select } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export const Form = () => {
  const initialState = {
    name: "",
    price: 0,
    descriptions: "",
    images: [],
    stock: 0,
    color: [],
    type: "",
    size: ["XSmall", "Small", "Medium", "Large", "XLarge", "XXLarge"],
    category: "",
  };

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState(initialState);

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

  function addcolor(e) {
    setInput({ ...input, color: [e.target.value] });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleTypes(e) {
    setInput({
      ...input,
      type: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  const uploadImage = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = async () => {
      try {
        axios
          .post(
            "http://localhost:3001/cloudinary",
            { data: reader.result },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => setInput({ ...input, images: [res.data] }));
      } catch (error) {
        console.error(error);
      }
    };
  };

  const classes = useStyles();
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <h1>Create New Product</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
            width: "500px",
            borderRadius: "20px",
          }}
        >
          <FormControl margin="dense" sx={{ width: 400 }}>
            <InputLabel>Category</InputLabel>
            <Input
              id="category"
              onChange={handleChange}
              name="category"
              value={input.category}
            />
            {errors.category ? (
              <FormHelperText id="category">{errors.category}</FormHelperText>
            ) : (
              false
            )}
          </FormControl>

          <FormControl margin="dense" sx={{ width: 400 }}>
            <InputLabel>Name</InputLabel>
            <Input
              id="name"
              onChange={handleChange}
              name="name"
              value={input.name}
            />
            {errors.name ? (
              <FormHelperText id="name">{errors.name}</FormHelperText>
            ) : (
              false
            )}
          </FormControl>

          <FormControl margin="dense" sx={{ width: 400 }}>
            <InputLabel>Descriptions</InputLabel>
            <Input
              id="descriptions"
              onChange={handleChange}
              name="descriptions"
              value={input.descriptions}
            />
            {errors.descriptions ? (
              <FormHelperText id="descriptions">
                {errors.descriptions}
              </FormHelperText>
            ) : (
              false
            )}
          </FormControl>

          <FormControl margin="dense" sx={{ width: 400 }}>
            <InputLabel>Price</InputLabel>
            <Input
              type="number"
              id="price"
              onChange={handleChange}
              name="price"
              value={input.price}
            />
            {errors.price ? (
              <FormHelperText id="price">{errors.price}</FormHelperText>
            ) : (
              false
            )}
          </FormControl>

          <FormControl margin="dense" sx={{ width: 400 }}>
            <InputLabel>Stock</InputLabel>
            <Input
              type="number"
              id="stock"
              onChange={handleChange}
              name="stock"
              value={input.stock}
            />
            {errors.stock ? (
              <FormHelperText id="stock">{errors.stock}</FormHelperText>
            ) : (
              false
            )}
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="Type">Type</InputLabel>
            {errors.type ? (
              <FormHelperText id="type">{errors.type}</FormHelperText>
            ) : (
              false
            )}
            <Select
              labelId="Type"
              id="Type"
              value={input.type}
              label="Type"
              onChange={handleTypes}
            >
              <MenuItem value={"Shirt"}>Shirt</MenuItem>
              <MenuItem value={"Sweather"}>Sweather</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <label> Images </label>
        <>
          <div className={classes.root}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={uploadImage}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </div>
          <div>
            {input.images.length ? (
              <div className={style.imageDiv}>
                <img src={input.images} alt="algo" height="200px" />
                <FormControl
                  onChange={addcolor}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 3,
                    margin: 3,
                    padding: 3,
                  }}
                >
                  <FormLabel id="demo-radio-buttons-group-label">
                    Color
                  </FormLabel>
                  {errors.color ? (
                    <FormHelperText id="color">{errors.color}</FormHelperText>
                  ) : (
                    false
                  )}
                  <RadioGroup
                    sx={{ color: "black" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Black"
                      control={<Radio />}
                      label="Negro"
                    />
                    <FormControlLabel
                      value="White"
                      control={<Radio />}
                      label="Blanco"
                    />
                    <FormControlLabel
                      value="Blue"
                      control={<Radio />}
                      label="Azul"
                    />
                    <FormControlLabel
                      value="Pink"
                      control={<Radio />}
                      label="Rosado"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            ) : (
              false
            )}
          </div>
        </>
      </div>
      <button
        onClick={handleSubmit}
        disabled={Object.keys(errors).length > 0 ? true : false}
        className={style.button}
      >
        Create Product
      </button>
    </div>
  );
};
