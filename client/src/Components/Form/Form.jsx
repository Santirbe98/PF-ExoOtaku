import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "./Validate";
import { postProduct } from "../../Redux/Actions";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import "./Form.module.css";
import { FormHelperText, MenuItem, Select } from "@mui/material";
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import { Error } from "../Error/Error";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  imgPreview: {
    "&:hover": {
      opacity: "0.7",
    },
  },
}));

export const Form = () => {
  const initialState = {
    name: "",
    price: 0,
    descriptions: "",
    imagesForm: [],
    stock: 0,
    color: [""],
    type: "",
    size: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "",
    imagesDb: [],
  };

  const { isAuthenticated } = useAuth0();
  const UserValidate = useSelector((state) => state.chk_customer);

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    category: "Los campos con * son obligatorios.",
    imagen: "Debe ingresar una imagen",
    color: "Debe ingresar un color",
  });
  const [input, setInput] = useState(initialState);
  const [urlImages, setUrlImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [imagesDb, setImagesDb] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postProduct(input));
    alert("Guardado!");
    setInput(initialState);
    setUrlImages([]);
    setColors([]);
    setImagesDb([]);
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

  const handleErrorColor = (col) => {
    if (colors.includes(col)) {
      setErrors({ ...errors, color: "No se pueden repetir colores." });
      alert("No se pueden repetir colores.");
    }
  };

  function addcolor(e) {
    let id = Number(e.target.name);
    imagesDb[id].color = e.target.value;
    let colores = imagesDb.map((e) => e.color).filter((e) => e !== "");
    setColors(colores);
    setInput({
      ...input,
      imagesDb: imagesDb,
      color: colores,
    });

    if (input.color.length + 1 < input.imagesDb.length) {
      setErrors({ ...errors, color: "Faltan ingresar Colores." });
    } else delete errors.color;

    handleErrorColor(e.target.value);
  }

  function handleTypes(e) {
    setInput({
      ...input,
      type: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        type: e.target.value,
      })
    );
  }
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const previewImages = async (e) => {
    e.preventDefault();
    if (e.target.files) {
      delete errors.imagen;
      const fileArray = Array.from(e.target.files).map((f) =>
        URL.createObjectURL(f)
      );
      setUrlImages((prev) => prev.concat(fileArray));

      let urlFiles = await Promise.all(
        Array.from(e.target.files).map((i) => getBase64(i))
      );

      const filesArray = urlFiles.map((e) => ({
        url: e,
        color: "",
      }));
      setImagesDb((prev) => prev.concat(filesArray));
      setInput({
        ...input,
        imagesDb: [...input.imagesDb, ...filesArray],
      });
      setErrors({ ...errors, color: "Faltan ingresar Colores." });
    }
  };
  const eliminarPreview = (i) => {
    let filtered = urlImages.filter((f, index) => index !== i);
    let imagesDbFiltered = imagesDb.filter((f, index) => index !== i);
    setUrlImages(filtered);
    setImagesDb(imagesDbFiltered);
    let colorFilter = colors.filter((f, index) => index !== i);
    setColors(colorFilter);

    setInput({
      ...input,
      imagesDb: imagesDbFiltered,
      color: colorFilter,
    });

    if (imagesDb.length === 1) {
      setErrors({ ...errors, imagen: "Debe ingresar una imagen" });
      setImagesDb([]);
      setInput({
        ...input,
        imagesDb: [],
      });
    }
  };

  const classes = useStyles();
  return (
    <Box>
      {isAuthenticated && UserValidate.isadmin === true ? (
        <Grid container spacing={3}>
          <Grid xs={12} md={12} lg={12} xl={12}>
            <h1>Nuevo Producto</h1>
          </Grid>

          <Grid xs={12} md={12} lg={12} xl={12}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Box
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
                <FormControl
                  margin="dense"
                  sx={{
                    width: 400,
                  }}
                >
                  <InputLabel>Categoria*</InputLabel>
                  <Input
                    id="category"
                    onChange={handleChange}
                    name="category"
                    value={input.category}
                  />
                  {errors.category ? (
                    <FormHelperText id="category">
                      {errors.category}
                    </FormHelperText>
                  ) : (
                    false
                  )}
                </FormControl>

                <FormControl margin="dense" sx={{ width: 400 }}>
                  <InputLabel>Nombre*</InputLabel>
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
                  <InputLabel>Descripcion*</InputLabel>
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
                  <InputLabel>Precio*</InputLabel>
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
                  <InputLabel>Stock*</InputLabel>
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
                  <InputLabel id="Type">Tipo*</InputLabel>
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
                    <MenuItem sx={{ width: "100%" }} value="Tshirt">
                      Remera
                    </MenuItem>
                    <MenuItem sx={{ width: "100%" }} value="Swetter">
                      Buzo
                    </MenuItem>
                    <MenuItem sx={{ width: "100%" }} value="Other">
                      Otros
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} md={12} lg={12} xl={12}>
            <Box>
              <label> Imagenes* </label>
              <>
                <Box className={classes.root}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={previewImages}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="warning"
                      component="span"
                    >
                      Agregar
                    </Button>
                  </label>
                </Box>

                <Box className={classes.root}>
                  <Grid container justifyContent="center">
                    {urlImages.length
                      ? urlImages.map((i, index) => (
                          <Grid
                            item
                            key={index}
                            spacing={2}
                            xs={6}
                            md={4}
                            lg={3}
                          >
                            <img
                              key={index}
                              height="100px"
                              src={i}
                              alt="Product"
                            />
                            <DeleteIcon
                              className={classes.imgPreview}
                              onClick={() => eliminarPreview(index)}
                            />
                            <Box>
                              <FormControl
                                sx={{
                                  backgroundColor: "white",
                                  borderRadius: 3,
                                  margin: 1,
                                  padding: 1,
                                  minWidth: 80,
                                }}
                              >
                                <FormLabel id="demo-radio-buttons-group-label">
                                  Color*
                                </FormLabel>
                                <RadioGroup
                                  size="small"
                                  onChange={addcolor}
                                  sx={{
                                    color: "black",
                                    flexWrap: "nowrap",
                                    padding: 1,
                                  }}
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  name={`${index}`}
                                >
                                  <FormControlLabel
                                    value="Black"
                                    control={
                                      <Radio size="small" color="warning" />
                                    }
                                    label="Negro"
                                  />
                                  <FormControlLabel
                                    value="White"
                                    control={
                                      <Radio size="small" color="warning" />
                                    }
                                    label="Blanco"
                                  />
                                  <FormControlLabel
                                    value="Blue"
                                    control={
                                      <Radio size="small" color="warning" />
                                    }
                                    label="Azul"
                                  />
                                  <FormControlLabel
                                    value="Pink"
                                    control={
                                      <Radio size="small" color="warning" />
                                    }
                                    label="Rosado"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Box>
                          </Grid>
                        ))
                      : false}
                  </Grid>
                </Box>
              </>
            </Box>
            <Box>
              <Button
                size="large"
                variant="contained"
                color="warning"
                onClick={handleSubmit}
                disabled={Object.keys(errors).length > 0 ? true : false}
              >
                CREAR
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Error />
      )}
    </Box>
  );
};
