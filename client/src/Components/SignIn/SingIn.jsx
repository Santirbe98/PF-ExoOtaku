import React from "react";
import { Button, Box } from "@mui/material";
import { validate } from "./Validate";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { postCustomer } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useAuth0 } from "@auth0/auth0-react";
import Paper from "@material-ui/core/Paper";
import { Input } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { FormHelperText, Select, MenuItem } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import sendEmailUserRegisted from "./registerEmail";
import { filterNeighborhoods } from "../../Redux/Actions";
import { useEffect } from "react";
import Swal from "sweetalert2";

//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
// USER CREATION
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW

export default function SingIn(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  let closedialog = props.closedialog ? props.closedialog : null;
  let upt_customer = props.dialog ? null : props.location.state;
  const [states, setStates] = useState([]);
  useEffect(() => {
    dispatch(filterNeighborhoods()).then((data) => setStates(data.payload));
  }, [dispatch]);

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const { user } = useAuth0();
  const [errors, setErrors] = useState({});

  let paquete;
  let id,
    name,
    email,
    country,
    provincia,
    ciudad,
    shipping_address,
    billing_address,
    isadmin,
    token,
    phone;

  if (upt_customer !== null) {
    id = upt_customer.id;
    name = upt_customer.name;
    email = upt_customer.email;
    country = upt_customer.country;
    provincia = upt_customer.provincia;
    ciudad = upt_customer.ciudad;
    shipping_address = upt_customer.shipping_address;
    billing_address = upt_customer.billing_address;
    isadmin = false;
    token = upt_customer.token;
    phone = upt_customer.phone;
    paquete = {
      id: id,
      name: name,
      email: email,
      country: country,
      provincia: provincia,
      ciudad: ciudad,
      shipping_address: shipping_address,
      billing_address: billing_address,
      isadmin: isadmin,
      token: token,
      phone: phone,
    };
  } else {
    name = user?.name;
    email = user?.email;
    country = "";
    provincia = "";
    ciudad = "";
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
      ciudad: ciudad,
      shipping_address: shipping_address,
      billing_address: billing_address,
      isadmin: isadmin,
      token: token,
      phone: phone,
    };
  }

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
      errors.ciudad === undefined
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
    let createmode;

    if (upt_customer !== null) {
      PAC = {
        id: input.id,
        name: input.name,
        email: input.email,
        country: input.country,
        provincia: input.provincia,
        ciudas: input.ciudad,
        shipping_address: input.shipping_address,
        billing_address: input.billing_address,
        isadmin: input.isadmin,
        token: input.token,
        phone: input.phone,
      };
      createmode = false;
    } else {
      PAC = {
        name: input.name,
        email: input.email,
        country: input.country,
        provincia: input.provincia,
        ciudad: input.ciudad,
        shipping_address: input.shipping_address,
        billing_address: input.billing_address,
        isadmin: input.isadmin,
        token: input.token,
        phone: input.phone,
      };
      createmode = true;
    }
    dispatch(postCustomer(PAC, createmode)).then(() =>
      sendEmailUserRegisted({ email: PAC.email, name: PAC.name })
    );
    setInput({
      name: "",
      email: "",
      country: "",
      provincia: "",
      ciudad: "",
      shipping_address: "",
      billing_address: "",
      isadmin: false,
      token: "",
      phone: "",
    });
    if (closedialog !== null) {
      closedialog();
      // eslint-disable-next-line no-lone-blocks
      {
        width > 800
          ? Swal.fire({
            text: "Usted se ha registrado con exito!",
            width: "30%",
            padding: "10px",
            position: "top",
            allowEnterKey: true,
            imageUrl:
              "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/760/094/themes/common/logo-204180220-1664550124-6d7184aec833212b57e39d5f3bd0e32d1664550125.png?0",
            imageHeight: 200,
            imageWidth: 200,
            icon: "success",
            background: "black",
            color: "white",
            confirmButtonColor: "#00711a",
          }).then(() => {
            history.go("/home");
          }) :
          Swal.fire({
            text: "Usted se ha registrado con exito!",
            width: "80%",
            padding: "10px",
            position: "top",
            allowEnterKey: true,
            imageUrl:
              "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/760/094/themes/common/logo-204180220-1664550124-6d7184aec833212b57e39d5f3bd0e32d1664550125.png?0",
            imageHeight: 200,
            imageWidth: 200,
            icon: "success",
            background: "black",
            color: "white",
            confirmButtonColor: "#00711a",
          }).then(() => {
            history.go("/home");
          })
      }
    } else {
      // eslint-disable-next-line no-lone-blocks
      {
        width > 800
          ? Swal.fire({
            text: "Usted se ha registrado con exito!",
            width: "30%",
            padding: "10px",
            position: "top",
            allowEnterKey: true,
            imageUrl:
              "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/760/094/themes/common/logo-204180220-1664550124-6d7184aec833212b57e39d5f3bd0e32d1664550125.png?0",
            imageHeight: 200,
            imageWidth: 200,
            icon: "success",
            background: "black",
            color: "white",
            confirmButtonColor: "#00711a",
          }).then(() => {
            history.go("/-1");
          }) :
          Swal.fire({
            text: "Usted se ha registrado con exito!",
            width: "80%",
            padding: "10px",
            position: "top",
            allowEnterKey: true,
            imageUrl:
              "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/760/094/themes/common/logo-204180220-1664550124-6d7184aec833212b57e39d5f3bd0e32d1664550125.png?0",
            imageHeight: 200,
            imageWidth: 200,
            icon: "success",
            background: "black",
            color: "white",
            confirmButtonColor: "#00711a",
          }).then(() => {
            history.go("/-1");
          })
      }
    }
  };

  //ARRAY OF COMUNAS
  let listacomuna = [""];
  if (input.provincia !== undefined) {
    let listacomuna1 = states.filter(
      (com) => com.provincia === input.provincia
    );
    listacomuna = listacomuna1.map((el) => el.ciudad);
  }

  //FORMULARY
  return (
    <Grid
      flex
      align="center"
      spacing={24}
      justify="center"
      style={{ minHeight: "100vh", maxWidth: "100%" }}
    >
      <br></br>
      <Box>
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
            //spacing={2}
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
                Bienvenido a Exo OtaKu
              </Typography>

              <Typography variant="h7" maxwidth gutterBottom component="div">
                Por Favor completa los datos para terminar tu registro
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
              {input.ciudad ? (
                ""
              ) : (
                <InputLabel shrink={true}>Ciudad</InputLabel>
              )}
              <Select
                name="ciudad"
                id="ciudad"
                value={input.ciudad}
                onChange={handleChange}
                notched={true}
                autoWidth={false}
              >
                {listacomuna.map((ciudad, i) => (
                  <MenuItem sx={{ width: "50%" }} value={ciudad}>
                    {ciudad}
                  </MenuItem>
                ))}
              </Select>
              {errors.ciudad ? (
                <FormHelperText id="ciudad" style={{ color: "red" }}>
                  {errors.ciudad}{" "}
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
              <br></br>
            </FormControl>
            <Button
              disabled={isValid()}
              fullWidth
              variant="contained"
              type="submit"
              style={{ backgroundColor: "#212121", color: "#FFFFFF" }}
              sx={{ ":hover": { bgcolor: "#ffb300", color: "#FFFFFF" } }}
              onClick={submitRegistration}
            >
              Guardar
            </Button>
          </form>
        </Paper>
      </Box>
    </Grid>
  );
}
