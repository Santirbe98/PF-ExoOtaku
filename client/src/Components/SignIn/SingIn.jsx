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

//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
// USER CREATION
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW

export default function SingIn({ closedialog }) {
  console.log(closedialog);
  const { user } = useAuth0();
  const [errors, setErrors] = useState({});
  let okMsg;
  const dispatch = useDispatch();
  const history = useHistory();

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
    event.preventDefault();
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
    dispatch(postCustomer(PAC));
    setInput({
      name: "",
      email: "",
      country: "",
      provincia: "",
      comuna: "",
      shipping_address: "",
      billing_address: "",
      isadmin: false,
      departamento: "x",
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
    switch (input.provincia) {
      case "Buenos Aires":
        listacomuna = [
          "Almirante Brown",
          "Avellaneda",
          "Bahía Blanca",
          "Berazategui",
          "Berisso",
          "Campana",
          "Escobar",
          "Esteban Echeverría",
          "Ezeiza",
          "Florencio Varela",
          "General Rodríguez",
          "General San Martín",
          "Hurlingham",
          "Ituzaingó",
          "José C. Paz",
          "Junín",
          "La Matanza",
          "La Plata",
          "Lanús",
          "Lomas de Zamora",
          "Luján",
          "Malvinas Argentinas",
          "Mar del Plata",
          "Merlo",
          "Moreno",
          "Morón",
          "Necochea",
          "Olavarría",
          "Pergamino",
          "Pilar",
          "Quilmes",
          "San Fernando",
          "San Isidro",
          "San Miguel",
          "San Nicolás de Los Arroyos",
          "Tandil",
          "Tigre",
          "Tres de Febrero",
          "Vicente López",
          "Zárate",
        ];
        break;
      case "Entre Ríos":
        listacomuna = [
          "Basavilbaso",
          "Bovril",
          "Cerrito",
          "Chajarí",
          "Colón",
          "Concepción del Uruguay",
          "Concordia",
          "Crespo",
          "Diamante",
          "Federación",
          "Federal",
          "General Galarza",
          "General Ramírez",
          "Gualeguay",
          "Gualeguaychú",
          "Hasenkamp",
          "La Paz",
          "Larroque",
          "Libertador San Martín",
          "Lucas González",
          "Maciá",
          "María Grande",
          "Nogoyá",
          "Oro Verde",
          "Paraná",
          "Puerto Ibicuy",
          "Rosario del Tala",
          "San Benito",
          "San Jaime de la Frontera",
          "San José",
          "San José de Feliciano",
          "San Salvador",
          "Santa Elena",
          "Urdinarrain",
          "Viale",
          "Victoria",
          "Villa Elisa",
          "Villa Hernandarias",
          "Villa Paranacito",
          "Villaguay",
        ];
        break;
      default:
        listacomuna = [
          "Arroyo Seco",
          "Avellaneda",
          "Cañada de Gómez",
          "Capitán Bermúdez",
          "Carcarañá",
          "Casilda",
          "Ceres",
          "Coronda",
          "Esperanza",
          "Firmat",
          "Fray Luis Beltrán",
          "Funes",
          "Gálvez",
          "Granadero Baigorria",
          "Laguna Paiva",
          "Las Parejas",
          "Las Rosas",
          "Las Toscas",
          "Monte Vera",
          "Pérez",
          "Puerto General San Martín",
          "Rafaela",
          "Reconquista",
          "Recreo",
          "Roldán",
          "Rosario",
          "Rufino",
          "San Cristóbal",
          "San Javier",
          "San Jorge",
          "San Justo",
          "San Lorenzo",
          "Santa Fe",
          "Santo Tomé",
          "Sunchales",
          "Tostado",
          "Venado Tuerto",
          "Vera",
          "Villa Constitución",
          "Villa Gobernador Gálvez",
          "Villa Ocampo",
        ];
        break;
    }
  }

  //FORMULARY
  return (
    <div
      style={{
        display: "flex",
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
                <MenuItem sx={{ width: "50%" }} value={i}>
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
