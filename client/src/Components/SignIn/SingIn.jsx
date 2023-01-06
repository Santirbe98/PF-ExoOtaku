import React from "react";
import { validate } from "./Validate";
import { useHistory } from "react-router-dom";
import { useState} from 'react'
import { postCustomer } from  "../../Redux/Actions";
import { useDispatch} from 'react-redux'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useAuth0} from "@auth0/auth0-react";
import Paper from "@material-ui/core/Paper";
import { Input, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { FormHelperText,Select,MenuItem } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";


//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
// USER CREATION
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW

export default function SingIn({closedialog}) {
  console.log(closedialog)
    const { user} = useAuth0();
    const [errors, setErrors] = useState({})
    let okMsg;
    const dispatch = useDispatch();
    const history=useHistory()

    let paquete
    let name,email,country,provincia,comuna,shipping_address,billing_address,isadmin,token,phone
      okMsg='Registro Culminado con Exito'
      name=user?.name ;
      email= user?.email;
      country="";
      provincia="";
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
        provincia:provincia,
        comuna:comuna,
        shipping_address:shipping_address,
        billing_address:billing_address,
        isadmin:isadmin,
        token:token,
        phone:phone
      }  

    let[input,setInput]=useState(paquete);

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
      if (errors.billing_address === undefined && 
          errors.shipping_address === undefined &&
          errors.phone === undefined &&
          errors.country === undefined &&
          errors.provincia === undefined &&
          errors.comuna === undefined){ 
            return false;
          } 
        else {
          return true;
        }    
    };

    //FORM ON SUBMIT ACTION
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
      alert(okMsg);
      closedialog();
      history.go('/home');  
    }

    //ARRAY OF COMUNAS
    let listacomuna=[""]
    if (input.provincia !== undefined){
      switch (input.provincia) {
        case "Buenos Aires":
          listacomuna=[
          "Comuna 1-Retiro,San Nicolás,Puerto Madero, San Telmo,Monserrat y Constitución"
          ,"Comuna 2-Recoleta"
          ,"Comuna 3-San Cristóbal y Balvanera"
          ,"Comuna 4-Boca, Barracas, Parque Patricios y Nueva Pompeya"
          ,"Comuna 5-Almagro y Boedo"
          ,"Comuna 6-Caballito"
          ,"Comuna 7-Flores y Parque Chacabuco"
          ,"Comuna 8-Villa Soldati, Villa Riachuelo y Villa Lugano"
          ,"Comuna 9-Parque Avellaneda, Liniers y Mataderos"
          ,"Comuna 10-Villa Real, Monte Castro, Versalles, Floresta, Vélez Sársfield y Villa Luro"
          ,"Comuna 11-Villa Gral. Mitre, Villa Devoto, Villa del Parque y Villa Santa Rita"
          ,"Comuna 12-Coghlan, Saavedra, Villa Urquiza y Villa Pueyrredón"
          ,"Comuna 13-Belgrano, Núñez y Colegiales"
          ,"Comuna 14-Palermo"
          ,"Comuna 15-Chacarita, Villa Crespo, Paternal, Villa Ortúzar, Agronomía y Parque Chas"         
          ]
        break;
        case "Entre Ríos":
          listacomuna=[
            "Aldea Asunción"
            ,"Aldea Protestante"
            ,"Aldea San Juan"
            ,"Aldea Santa María"
            ,"Aldea Santa Rosa"
            ,"Aldea Spatzenkutter"
            ,"Arroyo Barú"
            ,"Arroyo Corralito"
            ,"Arroyo del Medio El Gramiyal"
            ,"Chañar"
            ,"Colonia Avigdor"
            ,"Colonia Ensayo"
            ,"Colonia Roca (Colonia General Roca)"
            ,"Curtiembre"
            ,"Distrito Sexto Costa de Nogoyá"
            ,"Eigenfeld Merou"
            ,"El Cimarrón"
            ,"El Palenque"
            ,"El Solar, San Carlos y Colonia Bertozzi28"
            ,"Estación Raíces"
            ,"Estación Yeruá"
            ,"Estación Yuquerí"
            ,"General Racedo"
            ,"Gobernador Sola"
            ,"Gualeguaycito"
            ,"Irazusta"
            ,"Jubileo"
            ,"La Clarita"
            ,"La Picada"
            ,"La Verbena"
            ,"Las Cuevas"
            ,"Las Moscas"
            ,"Las Tunas (Paraje Las Tunas)"
            ,"Lucas Norte"
            ,"Médanos"
            ,"Nueva Escocia"
            ,"Nueva Vizcaya"
            ,"Paso de la Laguna"
            ,"Pueblo General Alvear"
            ,"Rincón de Nogoyá"
            ,"Rincón del Doll"
            ,"San Cipriano"
            ,"San Marcial"
            ,"San Pedro"
            ,"San Víctor"
            ,"Sauce Montrull"
            ,"Sosa"
            ,"Tala"
          ]         
        break;      
        default:
          listacomuna=[
            "Aarón Castellanos"
            ,"Acebal"
            ,"Aguará Grande"
            ,"Albarellos"
            ,"Alcorta"
            ,"Aldao"
            ,"Alejandra"
            ,"Álvarez"
            ,"Alvear"
            ,"Ambrosetti"
            ,"Amenábar"
            ,"Angélica"
            ,"Angeloni"
            ,"Arequito"
            ,"Arminda"
            ,"Arocena"
            ,"Arroyo Aguiar"
            ,"Arroyo Ceibal"
            ,"Arroyo Leyes"
            ,"Arrufó"
            ,"Arteaga"
            ,"Ataliva"
            ,"Aurelia"
            ,"Barrancas"
            ,"Bauer y Sigel"
            ,"Bella Italia"
            ,"Berabevú"
            ,"Berna"
            ,"Bernardo de Irigoyen"
            ,"Bigand"
            ,"Bombal"
            ,"Bouquet"
            ,"Bustinza"
            ,"Cabal"
            ,"Cacique Ariacaiquín"
            ,"Cafferata"
            ,"Campo Andino"
            ,"Campo Hardy7(Hardy)"
            ,"Campo Piaggio"
            ,"Candioti"
            ,"Cañada del Ucle"
            ,"Cañada Ombú"
            ,"Cañada Rica"
            ,"Cañada Rosquín"
            ,"Capivara"
            ,"Carlos Pellegrini"
            ,"Carmen"
            ,"Carmen del Sauce"
            ,"Carreras"
            ,"Carrizales/ Clarke"
            ,"Casalegno"
            ,"Casas"
            ,"Castelar"
            ,"Castellanos"
            ,"Cayastá"
            ,"Cayastacito"
            ,"Centeno"
            ,"Cepeda"
            ,"Chabás"
            ,"Chañar Ladeado"
            ,"Chapuy"
            ,"Chovet"
            ,"Christophersen"
            ,"Classon"
            ,"Colonia Aldao"
            ,"Colonia Ana"
            ,"Colonia Belgrano"
            ,"Colonia Bicha"
            ,"Colonia Bigand"
            ,"Colonia Bossi"
            ,"Colonia Cavour (Cavour)"
            ,"Colonia Cello"
            ,"Colonia Clara"
            ,"Colonia Dolores"
            ,"Colonia Dos Rosas y La Legua"
            ,"Colonia Durán"
            ,"Colonia Esther (Esther)"
            ,"Colonia Iturraspe"
            ,"Colonia Margarita"
            ,"Colonia Mascías"
            ,"Colonia Mauá"
            ,"Colonia Raquel"
            ,"Colonia Rosa"
            ,"Colonia San José (San José)"
            ,"Colonia Teresa8"
            ,"Constanza"
            ,"Coronel Arnold"
            ,"Coronel Bogado"
            ,"Coronel Fraga"
            ,"Coronel Rodolfo S. Domínguez (Coronel Domínguez)"
            ,"Correa"
            ,"Crispi"
            ,"Cululú"
            ,"Curupaity"
            ,"Desvío Arijón"
            ,"Díaz"
            ,"Diego de Alvear"
            ,"Egusquiza"
            ,"El Arazá"
            ,"El Rabón"
            ,"El Sombrerito"
            ,"Elisa"
            ,"Elortondo"
            ,"Emilia"
            ,"Empalme San Carlos"
            ,"Empalme Villa Constitución"
            ,"Esmeralda"
            ,"Estación Clucellas"
            ,"Esteban Rams"
            ,"Eusebia y Carolina"
            ,"Eustolia"
            ,"Felicia"
            ,"Fidela"
            ,"Fighiera"
            ,"Fortín Olmos"
            ,"Franck"
            ,"Fuentes"
            ,"Gaboto"
            ,"Galisteo"
            ,"Garabato"
            ,"Garibaldi"
            ,"Gato Colorado"
            ,"General Gelly"
            ,"General Lagos"
            ,"Gessler"
            ,"Gobernador Crespo"
            ,"Gödeken"
            ,"Godoy"
            ,"Golondrina"
            ,"Gregoria Pérez de Denis (Los Saladillos)"
            ,"Grutly"
            ,"Guadalupe Norte"
            ,"Helvecia"
            ,"Hersilia"
            ,"Hipatia"
            ,"Huanqueros"
            ,"Hugentobler"
            ,"Hughes"
            ,"Humberto Primo"
            ,"Humboldt"
            ,"Ibarlucea"
            ,"Ingeniero Chanourdie"
            ,"Intiyaco"
            ,"Ituzaingó"
            ,"Jacinto L. Arauz"
            ,"Josefina"
            ,"Juan Bernabé Molina"
            ,"Juan de Garay"
            ,"Juncal"
            ,"La Brava"
            ,"La Cabral"
            ,"La Camila"
            ,"La Chispa"
            ,"La Criolla"
            ,"La Gallareta"
            ,"La Lucila"
            ,"La Pelada"
            ,"La Penca y Caraguatá"
            ,"La Rubia"
            ,"La Sarita"
            ,"La Vanguardia"
            ,"Labordeboy"
            ,"Landeta"
            ,"Lanteri"
            ,"Larrechea"
            ,"Las Avispas"
            ,"Las Bandurrias"
            ,"Las Garzas"
            ,"Las Palmeras"
            ,"Las Petacas"
            ,"Las Tunas"
            ,"Lazzarino"
            ,"Lehmann"
            ,"Llambi Campbell"
            ,"Logroño"
            ,"Loma Alta"
            ,"López"
            ,"Los Amores"
            ,"Los Cardos"
            ,"Los Laureles"
            ,"Los Molinos"
            ,"Los Quirquinchos"
            ,"Los Tábanos9"
            ,"Lucio V. López"
            ,"Luis Palacios"
            ,"Maciel"
            ,"Maggiolo"
            ,"Marcelino Escalada"
            ,"Margarita"
            ,"María Juana"
            ,"María Luisa"
            ,"María Susana"
            ,"María Teresa"
            ,"Matilde"
            ,"Máximo Paz"
            ,"Melincué"
            ,"Miguel Torres"
            ,"Moisés Ville"
            ,"Monigotes"
            ,"Monje"
            ,"Monte Oscuridad"
            ,"Monte Vera"
            ,"Montefiore"
            ,"Montes de Oca"
            ,"Murphy"
            ,"Naré"
            ,"Nelson"
            ,"Nicanor Molinas"
            ,"Nuevo Torino"
            ,"Ñanducita"
            ,"Oliveros"
            ,"Palacios"
            ,"Pavón"
            ,"Pavón Arriba"
            ,"Pedro Gómez Cello"
            ,"Peyrano"
            ,"Piamonte"
            ,"Pilar"
            ,"Piñero"
            ,"Plaza Clucellas"
            ,"Portugalete"
            ,"Pozo Borrado"
            ,"Presidente Roca"
            ,"Progreso"
            ,"Providencia"
            ,"Pueblo Andino"
            ,"Pueblo Irigoyen (Irigoyen)"
            ,"Pueblo Marini"
            ,"Pueblo Muñoz"
            ,"Pueblo Uranga (Uranga)"
            ,"Pujato"
            ,"Pujato Norte"
            ,"Ramayón"
            ,"Ramona"
            ,"Ricardone"
            ,"Rivadavia"
            ,"Rueda"
            ,"Sa Pereira"
            ,"Saguier"
            ,"Saladero Mariano Cabal"
            ,"Salto Grande"
            ,"San Agustín"
            ,"San Antonio"
            ,"San Antonio de Obligado"
            ,"San Bernardo"
            ,"San Bernardo"
            ,"San Carlos Norte"
            ,"San Carlos Sud"
            ,"San Eduardo"
            ,"San Eugenio"
            ,"San Fabián"
            ,"San Francisco de Santa Fe"
            ,"San Gregorio"
            ,"San Jerónimo del Sauce"
            ,"San Jerónimo Sud"
            ,"San José de la Esquina"
            ,"San Mariano"
            ,"San Martín de las Escobas"
            ,"San Martín Norte"
            ,"San Vicente"
            ,"Sancti Spiritu"
            ,"Sanford"
            ,"Santa Clara de Buena Vista"
            ,"Santa Clara de Saguier"
            ,"Santa Isabel"
            ,"Santa Margarita"
            ,"Santa María Centro"
            ,"Santa María Norte"
            ,"Santa Rosa de Calchines"
            ,"Santa Teresa"
            ,"Santo Domingo"
            ,"Santurce"
            ,"Sargento Cabral"
            ,"Sarmiento"
            ,"Sauce Viejo"
            ,"Serodino"
            ,"Silva"
            ,"Soldini"
            ,"Soledad"
            ,"Soutomayor"
            ,"Susana"
            ,"Tacuarendí"
            ,"Tacural"
            ,"Tacurales"
            ,"Tartagal"
            ,"Teodelina"
            ,"Theobald"
            ,"Timbúes"
            ,"Toba"
            ,"Tortugas"
            ,"Traill"
            ,"Vera y Pintado"
            ,"Videla"
            ,"Vila"
            ,"Villa Amelia"
            ,"Villa Ana"
            ,"Villa Eloísa"
            ,"Villa Guillermina"
            ,"Villa Minetti"
            ,"Villa Mugueta"
            ,"Villa San José"
            ,"Villa Saralegui"
            ,"Villa Trinidad"
            ,"Villada"
            ,"Virginia"
            ,"Wheelwright"
            ,"Zavalla"
            ,"Zenón Pereyra"
          ]
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
            background:"white",
            boxShadow: ".2px 12px 18px rgba(131,153,167,0.6)",
            padding: 10,
            marginBottom:"20px",
            width: "600px",
            maxwidth: "600px",
            borderRadius: "20px",
          }}         
        > 
          <Grid 
            container spacing={2}
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
            <FormControl 
              required 
              fullWidth 
              margin="dense"
            >
                {input.country ? "" : <InputLabel shrink={true}>Pais</InputLabel> }
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
                <FormHelperText id="country" style={{color : "red"}}>{errors.country} </FormHelperText>
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
              {input.provincia ? "" : <InputLabel shrink={true}>Provincia</InputLabel> }
              <Select
                name="provincia"
                id="provincia"
                value={input.provincia}
                onChange={handleChange}
                notched={true}
                autoWidth={false}
                alignItems="left"
                >
                <MenuItem sx={{ width: "100%" }} value={"Buenos Aires"}>Buenos Aires</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Entre Ríos"}>Entre Ríos</MenuItem>
                <MenuItem sx={{ width: "100%" }} value={"Santa Fe"}>Santa Fe</MenuItem>
              </Select>
              {errors.provincia ? (
                  <FormHelperText id="provincia" style={{color : "red"}} >{errors.provincia}</FormHelperText>
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
              {input.comuna ? "" : <InputLabel shrink={true}>Comuna</InputLabel> }
              <Select
                name="comuna"
                id="comuna"
                value={input.comuna}
                onChange={handleChange}
                notched={true}
                autoWidth={false}
                >
                  {listacomuna.map((comuna, i) => (
                    <MenuItem sx={{ width: '50%' }} value={i}>{comuna}</MenuItem>
                  ))}                 
              </Select>
              {errors.comuna ? (
                <FormHelperText id="comuna" style={{color : "red"}}>{errors.comuna} </FormHelperText>
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
                <FormHelperText id="email" style={{color : "red"}} >{errors.shipping_address}</FormHelperText>
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
                <FormHelperText id="email" style={{color : "red"}} >{errors.billing_address}</FormHelperText>
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
                <FormHelperText id="phone" style={{color : "red"}} >{errors.phone}</FormHelperText>
                ) : (
                  false
                )
              }              
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



