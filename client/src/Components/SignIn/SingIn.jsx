import React from "react";
import { validate } from "./Validate";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { postCustomer } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useAuth0 } from "@auth0/auth0-react";
import Paper from "@material-ui/core/Paper";
import { Input, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { FormHelperText, Select, MenuItem } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import sendEmailUserRegisted from "./registerEmail";
import { filterNeighborhoods } from "../../Redux/Actions";
import { useEffect } from "react";

//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
// USER CREATION
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW

export default function SingIn({ closedialog }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [states, setStates] = useState([]);
  useEffect(() => {
    dispatch(filterNeighborhoods()).then((data) => setStates(data.payload));
  }, [dispatch]);

  console.log(closedialog);
  const { user } = useAuth0();
  const [errors, setErrors] = useState({});
  let okMsg;

  let paquete;
  let name,
    email,
    country,
    provincia,
    comuna,
    shipping_address,
    billing_address,
    isadmin,
    token,
    phone;
  okMsg = "Registro Culminado con Exito";
  name = user?.name;
  email = user?.email;
  country = "";
  provincia = "";
  comuna = "";
  shipping_address = "";
  billing_address = "";
  isadmin = false;
  token = user?.sub;
  phone = "";
  paquete = {
    name: name,
    email: email,
    country: country,
    provincia: provincia,
    comuna: comuna,
    shipping_address: shipping_address,
    billing_address: billing_address,
    isadmin: isadmin,
    token: token,
    phone: phone,
  };

  let [input, setInput] = useState(paquete);

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

  //BUTTON VALIDATION
  let isValid = () => {
    if (
      errors.billing_address === undefined &&
      errors.shipping_address === undefined &&
      errors.phone === undefined &&
      errors.country === undefined &&
      errors.provincia === undefined &&
      errors.comuna === undefined
    ) {
      return false;
    } else {
      return true;
    }
  };

  //FORM ON SUBMIT ACTION
  let submitRegistration = (event) => {
    /* event.preventDefault(); */
    let PAC;
    PAC = {
      name: input.name,
      email: input.email,
      country: input.country,
      provincia: input.provincia,
      comuna: input.comuna,
      shipping_address: input.shipping_address,
      billing_address: input.billing_address,
      isadmin: input.isadmin,
      token: input.token,
      phone: input.phone,
    };
    dispatch(postCustomer(PAC)).then(() =>
      /* sendEmailUserRegisted({ email: PAC.email, name: PAC.name }) */
      console.log(PAC)
    );
    setInput({
      name: "",
      email: "",
      country: "",
      provincia: "",
      comuna: "",
      shipping_address: "",
      billing_address: "",
      isadmin: false,
      /* departamento: "x", */
      token: "",
      phone: "",
    });
    alert(okMsg);
    closedialog();
    history.go("/home");
  };

  //ARRAY OF COMUNAS
  let listacomuna = [""];
  if (input.provincia !== undefined) {
    let listacomuna1 = states.filter(
      (com) => com.provincia === input.provincia
    );
    listacomuna = listacomuna1.map((el) => el.comuna);
  }

  //FORMULARY
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifycontent: "center",
      }}
    >
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          justifycontent: "center",
          alignItems: "center",
          background: "white",
          boxShadow: ".2px 12px 18px rgba(131,153,167,0.6)",
          padding: 10,
          marginBottom: "20px",
          width: "600px",
          maxwidth: "600px",
          borderRadius: "20px",
        }}
      >
        <Grid
          container
          spacing={2}
          style={{
            alignItems: "left",
            backgroundColor: "white",
            justifycontent: "left",
            borderRadius: "20px",
          }}
        >
          <Grid item xs={3} height="80">
            {user?.picture && (
              <CardMedia
                component="img"
                height="80"
                title={"titleasdasdsada"}
                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                image={user.picture}
                alt={user?.name}
              />
            )}
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h5" maxwidth gutterBottom component="div">
              Bienvenido a Exo Otacu
            </Typography>

            <Typography variant="h7" maxwidth gutterBottom component="div">
              Por Favor completa los datos del formulario para terminar tu
              registro
            </Typography>
          </Grid>
        </Grid>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifycontent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
            width: "500px",
            borderRadius: "20px",
            marginBottom: "20px",
          }}
          onSubmit={() => submitRegistration}
        >
          <FormControl required fullWidth margin="dense">
            {input.country ? "" : <InputLabel shrink={true}>Pais</InputLabel>}
            <Select
              name="country"
              labelId="country"
              id="country"
              value={input.country}
              onChange={handleChange}
              notched={true}
              autoWidth={false}
              alignItems="left"
            >
              <MenuItem value={"Argentina"}>Argentina</MenuItem>
            </Select>
            {errors.country ? (
              <FormHelperText id="country" style={{ color: "red" }}>
                {errors.country}{" "}
              </FormHelperText>
            ) : (
              false
            )}
          </FormControl>

          <FormControl required fullWidth margin="dense">
            {input.provincia ? (
              ""
            ) : (
              <InputLabel shrink={true}>Provincia</InputLabel>
            )}
            <Select
              name="provincia"
              id="provincia"
              value={input.provincia}
              onChange={handleChange}
              notched={true}
              autoWidth={false}
              alignItems="left"
            >
              <MenuItem sx={{ width: "100%" }} value={"Buenos Aires"}>
                Buenos Aires
              </MenuItem>
              <MenuItem sx={{ width: "100%" }} value={"Entre Ríos"}>
                Entre Ríos
              </MenuItem>
              <MenuItem sx={{ width: "100%" }} value={"Santa Fe"}>
                Santa Fe
              </MenuItem>
            </Select>
            {errors.provincia ? (
              <FormHelperText id="provincia" style={{ color: "red" }}>
                {errors.provincia}
              </FormHelperText>
            ) : (
              false
            )}
          </FormControl>

          <FormControl required fullWidth margin="dense">
            {input.comuna ? "" : <InputLabel shrink={true}>Comuna</InputLabel>}
            <Select
              name="comuna"
              id="comuna"
              value={input.comuna}
              onChange={handleChange}
              notched={true}
              autoWidth={false}
            >
              {listacomuna.map((comuna, i) => (
                <MenuItem sx={{ width: "50%" }} value={comuna}>
                  {comuna}
                </MenuItem>
              ))}
            </Select>
            {errors.comuna ? (
              <FormHelperText id="comuna" style={{ color: "red" }}>
                {errors.comuna}{" "}
              </FormHelperText>
            ) : (
              false
            )}
          </FormControl>

          <FormControl required fullWidth margin="dense">
            <InputLabel htmlFor="shipping_address">
              Direccion de Envio
            </InputLabel>
            <Input
              name="shipping_address"
              type="text"
              required={true}
              value={input.shipping_address}
              autoComplete="shipping_address"
              onChange={handleChange}
            />
            {errors.shipping_address ? (
              <FormHelperText id="email" style={{ color: "red" }}>
                {errors.shipping_address}
              </FormHelperText>
            ) : (
              false
            )}
          </FormControl>

          <FormControl required fullWidth margin="dense">
            <InputLabel htmlFor="billing_address">
              Direccion de Cobro
            </InputLabel>
            <Input
              name="billing_address"
              type="text"
              required={true}
              value={input.billing_address}
              autoComplete="billing_address"
              onChange={handleChange}
            />
            {errors.billing_address ? (
              <FormHelperText id="email" style={{ color: "red" }}>
                {errors.billing_address}
              </FormHelperText>
            ) : (
              false
            )}
          </FormControl>

          <FormControl required fullWidth margin="dense2">
            <InputLabel htmlFor="phone">Telefono de Contacto</InputLabel>
            <Input
              name="phone"
              type="text"
              required={true}
              value={input.phone}
              autoComplete="phone"
              onChange={handleChange}
            />
            {errors.phone ? (
              <FormHelperText id="phone" style={{ color: "red" }}>
                {errors.phone}
              </FormHelperText>
            ) : (
              false
            )}
          </FormControl>

          {/* --------------------------------------------------------------------- */}
          <Button
            disabled={isValid()}
            disableRipple
            fullWidth
            variant="outlined"
            type="submit"
            onClick={submitRegistration}
          >
            Join
          </Button>
          {/* --------------------------------------------------------------------- */}
        </form>
      </Paper>
    </div>
  );
}
