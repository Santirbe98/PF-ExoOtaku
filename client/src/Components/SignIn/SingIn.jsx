import React from "react";
import { validate } from "./Validate";
import { useHistory } from "react-router-dom";
import { useState} from 'react'
import { postCustomer } from  "../../Redux/Actions";
import { useDispatch,useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useAuth0, User } from "@auth0/auth0-react";
import Paper from "@material-ui/core/Paper";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import { FormHelperText,Select,TextField,MenuItem } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@mui/material/CardMedia";


//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
// FORMULARIO DE CREACION DE RECCETA
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW

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

export default function SingIn() {
  
    // SETEO ESTADOS INIIALES DE COMPONENTES DEL FORMULARIO
    const { user} = useAuth0();
    const [errors, setErrors] = useState({})
    let okMsg;
    const dispatch = useDispatch();
    const history=useHistory()

    //VALIDACION DE MODO DE TRABAJO / CREACION O MODIFICACION
    let paquete
    let name,email,country,provincia,comuna,shipping_address,billing_address,isadmin,token,phone
        okMsg='Registro Culminado con Exito'
        name=user?.name ;
        email= user?.email;
        country= "";
        provincia= "";
        comuna="";
        shipping_address="";
        billing_address="";
        isadmin=false;
        token=user?.sub;
        phone=""
        paquete={
          name:name,
          email:email,
          country:country,
          comuna:comuna,
          shipping_address:shipping_address,
          billing_address:billing_address,
          isadmin:isadmin,
          token:token,
          phone:phone
          }  

    let[input,setInput]=useState(paquete);

    //MANEJADOR DE EVENTOS DE CAMBIO EN CAMPOS IMPUTS

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

    //VALIDACION DE ENABLED SUBMIT
    let isValid = () => {
      if (input.name === "" && 
          input.email === "" && 
          input.shipping_address === "" && 
          input.billing_address === ""){ 
            return false;
          } 
        else {
          return true;
        }    
    };

    //MANEJADOR DE SUBMIT DEL FORM
    let submitRegistration=(event)=>{
      event.preventDefault()
      let PAC
      PAC={
        name:input.name,
        email:input.email,
        country:input.country,
        provincia:input.provincia,
        comuna:input.comuna,
        shipping_address:input.shipping_address,
        billing_address:input.billing_address,
        isadmin:input.isadmin,
        token:input.token,
        phone:input.phone
      }
      dispatch(postCustomer(PAC))
      setInput({
        name:"",
        email: "",
        country: "",
        provincia: "",
        comuna:"",
        shipping_address:"",
        billing_address:"",
        isadmin:false,
        departamento:"x",
        token:"" ,
        phone:""             
      })  
      alert(okMsg) 
      history.push('/home');  
    }

     // LIMPIO FORMULARIO EN EL RESET
    let handlereset=(event)=>{
        event.preventDefault()
        setInput({
          name:"",
          email: "",
          country: "",
          provincia: "",
          comuna:"",
          shipping_address:"",
          billing_address:"",
          isadmin:false,
          departamento:"x",
          token:"123"  ,
          phone:""         
        })
    }

    //FORMULARIO
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
            //background: "linear-gradient(180deg, rgba(0,0,0,1) 60%, rgba(131,130,128,1) 90%)",
            background:"white",
            boxShadow: ".2px 12px 18px rgba(131,153,167,0.6)",
            padding: 10,
            marginBottom:"20px",
            width: "600px",
            borderRadius: "20px",
          }}         
        > 
          <Grid 
            container spacing={1}
            style={{
              alignItems: "left",
              backgroundColor:"white",
              justifycontent: "left",
              borderRadius: "20px",
            }}             
          >
            <Grid
              item xs={3}
              height="80"
            >
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
                Por Favor completa los datos del formulario para terminar tu registro
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
              marginBottom:"20px",
            }}           
            onSubmit={() => submitRegistration}
          >

            {/* <FormControl required fullWidth margin="dense">
              <InputLabel htmlFor="name">
                Nombre Completo
              </InputLabel>
              <Input
                name="name"
                type="text"
                value={ input.name }
                autoComplete="name"
                onChange={handleChange}
                disabled="disable"
              />
              {errors.name ? (
                <FormHelperText id="name">{errors.name}</FormHelperText>
                ) : (
                  false
                )
              } 
            </FormControl>

            <FormControl required fullWidth margin="dense" >
              <InputLabel htmlFor="email">
                e-mail
              </InputLabel>
              <Input
                name="email"
                type="text"
                required={true}
                value={ input.email}
                autoComplete="email"
                onChange={handleChange}
                disabled="disable"
              />
              {errors.email ? (
                <FormHelperText id="email">{errors.email}</FormHelperText>
                ) : (
                  false
                )
              }               
            </FormControl> */}

            <FormControl required fullWidth margin="dense">
              <InputLabel shrink={true}>
                Country
              </InputLabel>           
              <Select
                name="country"
                labelId="country"
                id="country"
                value={input.country}
                label="country"
                onChange={handleChange}
              >
                <MenuItem value={"Argentina"}>Argentina</MenuItem>         
              </Select>
              {errors.country ? (
                <FormHelperText id="country">{errors.country}</FormHelperText>
                ) : (
                  false
                )
              }                 
            </FormControl>

            <FormControl 
              required  
              fullWidth 
              margin="dense" 
            >
              <InputLabel shrink={true}>
                Provincia
              </InputLabel>            
              <Select
                name="provincia"
                id="provincia"
                value={input.provincia}
                onChange={handleChange}
                >
                <MenuItem sx={{ width: "100%" }} value={"Buenos Aires"}>Buenos Aires</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Catamarca"}>Catamarca</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Chaco"}>Chaco</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Chubut"}>Chubut</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Córdoba"}>Córdoba</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Corrientes"}>Corrientes</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Entre Ríos"}>Entre Ríos</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Formosa"}>Formosa</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Jujuy"}>Jujuy</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"La Pampa"}>La Pampa</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"La Rioja"}>La Rioja</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Mendoza"}>Mendoza</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Misiones"}>Misiones</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Neuquén"}>Neuquén</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Río Negro"}>Río Negro</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Salta"}>Salta</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"San Juan"}>San Juan</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"San Luis"}>San Luis</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Santa Cruz"}>Santa Cruz</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Santa Fe"}>Santa Fe</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Santiago del Estero"}>Santiago del Estero</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Tierra del Fuego"}>Tierra del Fuego</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Tucumán"}>Tucumán</MenuItem>
              </Select>
              {errors.provincia ? (
                  <FormHelperText id="provincia">{errors.provincia}</FormHelperText>
                  ) : (
                    false
                  )
                }                 
            </FormControl>

            <FormControl required fullWidth margin="dense" >
              <InputLabel shrink={true}>
                Comuna                 
              </InputLabel>
              <Select
                name="comuna"
                id="comuna"
                value={input.comuna}
                onChange={handleChange}
                >
                <MenuItem value={"Comuna 1"}>Comuna 1-Retiro,San Nicolás,Puerto Madero, San Telmo,Monserrat y Constitución</MenuItem>
                <MenuItem value={"Comuna 2"}>Comuna 2-Recoleta</MenuItem>
                <MenuItem value={"Comuna 3"}>Comuna 3-San Cristóbal y Balvanera</MenuItem>
                <MenuItem value={"Comuna 4"}>Comuna 4-Boca, Barracas, Parque Patricios y Nueva Pompeya</MenuItem>
                <MenuItem value={"Comuna 5"}>Comuna 5-Almagro y Boedo</MenuItem>
                <MenuItem value={"Comuna 6"}>Comuna 6-Caballito</MenuItem>
                <MenuItem value={"Comuna 7"}>Comuna 7-Flores y Parque Chacabuco</MenuItem>
                <MenuItem value={"Comuna 8"}>Comuna 8-Villa Soldati, Villa Riachuelo y Villa Lugano</MenuItem>
                <MenuItem value={"Comuna 9"}>Comuna 9-Parque Avellaneda, Liniers y Mataderos</MenuItem>
                <MenuItem value={"Comuna 10"}>Comuna 10-Villa Real, Monte Castro, Versalles, Floresta, Vélez Sársfield y Villa Luro</MenuItem>
                <MenuItem value={"Comuna 11"}>Comuna 11-Villa Gral. Mitre, Villa Devoto, Villa del Parque y Villa Santa Rita</MenuItem>
                <MenuItem value={"Comuna 12"}>Comuna 12-Coghlan, Saavedra, Villa Urquiza y Villa Pueyrredón</MenuItem>
                <MenuItem value={"Comuna 13"}>Comuna 13-Belgrano, Núñez y Colegiales</MenuItem>
                <MenuItem value={"Comuna 14"}>Comuna 14-Palermo</MenuItem>
                <MenuItem value={"Comuna 15"}>Comuna 15-Chacarita, Villa Crespo, Paternal, Villa Ortúzar, Agronomía y Parque Chas</MenuItem>
              </Select>
              {errors.comuna ? (
                <FormHelperText id="comuna">{errors.comuna}</FormHelperText>
                ) : (
                  false
                )
              }
            </FormControl>

            <FormControl required fullWidth margin="dense" >
              <InputLabel htmlFor="shipping_address">
                Direccion de Envio
              </InputLabel>
              <Input
                name="shipping_address"
                type="text"
                required={true}
                value={ input.shipping_address}
                autoComplete="shipping_address"
                onChange={handleChange}
              />
              {errors.shipping_address ? (
                <FormHelperText id="email">{errors.shipping_address}</FormHelperText>
                ) : (
                  false
                )
              }              
            </FormControl>

            <FormControl required fullWidth margin="dense" >
              <InputLabel htmlFor="billing_address">
                Direccion de Cobro
              </InputLabel>
              <Input
                name="billing_address"
                type="text"
                required={true}
                value={ input.billing_address}
                autoComplete="billing_address"
                onChange={handleChange}
              />
              {errors.billing_address ? (
                <FormHelperText id="email">{errors.billing_address}</FormHelperText>
                ) : (
                  false
                )
              }              
            </FormControl>      

            <FormControl required fullWidth margin="dense2" >
              <InputLabel htmlFor="phone">
                Telefono de Contacto
              </InputLabel>
              <Input
                name="phone"
                type="text"
                required={true}
                value={ input.phone}
                autoComplete="phone"
                onChange={handleChange}
              />
              {errors.phone ? (
                <FormHelperText id="phone">{errors.phone}</FormHelperText>
                ) : (
                  false
                )
              }              
            </FormControl>               

          {/* --------------------------------------------------------------------- */}
            <Button
              disabled={!isValid()}
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

