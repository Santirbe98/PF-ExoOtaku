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
          "Comuna 1-Retiro,San Nicol??s,Puerto Madero, San Telmo,Monserrat y Constituci??n"
          ,"Comuna 2-Recoleta"
          ,"Comuna 3-San Crist??bal y Balvanera"
          ,"Comuna 4-Boca, Barracas, Parque Patricios y Nueva Pompeya"
          ,"Comuna 5-Almagro y Boedo"
          ,"Comuna 6-Caballito"
          ,"Comuna 7-Flores y Parque Chacabuco"
          ,"Comuna 8-Villa Soldati, Villa Riachuelo y Villa Lugano"
          ,"Comuna 9-Parque Avellaneda, Liniers y Mataderos"
          ,"Comuna 10-Villa Real, Monte Castro, Versalles, Floresta, V??lez S??rsfield y Villa Luro"
          ,"Comuna 11-Villa Gral. Mitre, Villa Devoto, Villa del Parque y Villa Santa Rita"
          ,"Comuna 12-Coghlan, Saavedra, Villa Urquiza y Villa Pueyrred??n"
          ,"Comuna 13-Belgrano, N????ez y Colegiales"
          ,"Comuna 14-Palermo"
          ,"Comuna 15-Chacarita, Villa Crespo, Paternal, Villa Ort??zar, Agronom??a y Parque Chas"         
          ]
        break;
        case "Entre R??os":
          listacomuna=[
            "Aldea Asunci??n"
            ,"Aldea Protestante"
            ,"Aldea San Juan"
            ,"Aldea Santa Mar??a"
            ,"Aldea Santa Rosa"
            ,"Aldea Spatzenkutter"
            ,"Arroyo Bar??"
            ,"Arroyo Corralito"
            ,"Arroyo del Medio El Gramiyal"
            ,"Cha??ar"
            ,"Colonia Avigdor"
            ,"Colonia Ensayo"
            ,"Colonia Roca (Colonia General Roca)"
            ,"Curtiembre"
            ,"Distrito Sexto Costa de Nogoy??"
            ,"Eigenfeld Merou"
            ,"El Cimarr??n"
            ,"El Palenque"
            ,"El Solar, San Carlos y Colonia Bertozzi28"
            ,"Estaci??n Ra??ces"
            ,"Estaci??n Yeru??"
            ,"Estaci??n Yuquer??"
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
            ,"M??danos"
            ,"Nueva Escocia"
            ,"Nueva Vizcaya"
            ,"Paso de la Laguna"
            ,"Pueblo General Alvear"
            ,"Rinc??n de Nogoy??"
            ,"Rinc??n del Doll"
            ,"San Cipriano"
            ,"San Marcial"
            ,"San Pedro"
            ,"San V??ctor"
            ,"Sauce Montrull"
            ,"Sosa"
            ,"Tala"
          ]         
        break;      
        default:
          listacomuna=[
            "Aar??n Castellanos"
            ,"Acebal"
            ,"Aguar?? Grande"
            ,"Albarellos"
            ,"Alcorta"
            ,"Aldao"
            ,"Alejandra"
            ,"??lvarez"
            ,"Alvear"
            ,"Ambrosetti"
            ,"Amen??bar"
            ,"Ang??lica"
            ,"Angeloni"
            ,"Arequito"
            ,"Arminda"
            ,"Arocena"
            ,"Arroyo Aguiar"
            ,"Arroyo Ceibal"
            ,"Arroyo Leyes"
            ,"Arruf??"
            ,"Arteaga"
            ,"Ataliva"
            ,"Aurelia"
            ,"Barrancas"
            ,"Bauer y Sigel"
            ,"Bella Italia"
            ,"Berabev??"
            ,"Berna"
            ,"Bernardo de Irigoyen"
            ,"Bigand"
            ,"Bombal"
            ,"Bouquet"
            ,"Bustinza"
            ,"Cabal"
            ,"Cacique Ariacaiqu??n"
            ,"Cafferata"
            ,"Campo Andino"
            ,"Campo Hardy7(Hardy)"
            ,"Campo Piaggio"
            ,"Candioti"
            ,"Ca??ada del Ucle"
            ,"Ca??ada Omb??"
            ,"Ca??ada Rica"
            ,"Ca??ada Rosqu??n"
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
            ,"Cayast??"
            ,"Cayastacito"
            ,"Centeno"
            ,"Cepeda"
            ,"Chab??s"
            ,"Cha??ar Ladeado"
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
            ,"Colonia Dur??n"
            ,"Colonia Esther (Esther)"
            ,"Colonia Iturraspe"
            ,"Colonia Margarita"
            ,"Colonia Masc??as"
            ,"Colonia Mau??"
            ,"Colonia Raquel"
            ,"Colonia Rosa"
            ,"Colonia San Jos?? (San Jos??)"
            ,"Colonia Teresa8"
            ,"Constanza"
            ,"Coronel Arnold"
            ,"Coronel Bogado"
            ,"Coronel Fraga"
            ,"Coronel Rodolfo S. Dom??nguez (Coronel Dom??nguez)"
            ,"Correa"
            ,"Crispi"
            ,"Culul??"
            ,"Curupaity"
            ,"Desv??o Arij??n"
            ,"D??az"
            ,"Diego de Alvear"
            ,"Egusquiza"
            ,"El Araz??"
            ,"El Rab??n"
            ,"El Sombrerito"
            ,"Elisa"
            ,"Elortondo"
            ,"Emilia"
            ,"Empalme San Carlos"
            ,"Empalme Villa Constituci??n"
            ,"Esmeralda"
            ,"Estaci??n Clucellas"
            ,"Esteban Rams"
            ,"Eusebia y Carolina"
            ,"Eustolia"
            ,"Felicia"
            ,"Fidela"
            ,"Fighiera"
            ,"Fort??n Olmos"
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
            ,"G??deken"
            ,"Godoy"
            ,"Golondrina"
            ,"Gregoria P??rez de Denis (Los Saladillos)"
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
            ,"Ituzaing??"
            ,"Jacinto L. Arauz"
            ,"Josefina"
            ,"Juan Bernab?? Molina"
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
            ,"La Penca y Caraguat??"
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
            ,"Logro??o"
            ,"Loma Alta"
            ,"L??pez"
            ,"Los Amores"
            ,"Los Cardos"
            ,"Los Laureles"
            ,"Los Molinos"
            ,"Los Quirquinchos"
            ,"Los T??banos9"
            ,"Lucio V. L??pez"
            ,"Luis Palacios"
            ,"Maciel"
            ,"Maggiolo"
            ,"Marcelino Escalada"
            ,"Margarita"
            ,"Mar??a Juana"
            ,"Mar??a Luisa"
            ,"Mar??a Susana"
            ,"Mar??a Teresa"
            ,"Matilde"
            ,"M??ximo Paz"
            ,"Melincu??"
            ,"Miguel Torres"
            ,"Mois??s Ville"
            ,"Monigotes"
            ,"Monje"
            ,"Monte Oscuridad"
            ,"Monte Vera"
            ,"Montefiore"
            ,"Montes de Oca"
            ,"Murphy"
            ,"Nar??"
            ,"Nelson"
            ,"Nicanor Molinas"
            ,"Nuevo Torino"
            ,"??anducita"
            ,"Oliveros"
            ,"Palacios"
            ,"Pav??n"
            ,"Pav??n Arriba"
            ,"Pedro G??mez Cello"
            ,"Peyrano"
            ,"Piamonte"
            ,"Pilar"
            ,"Pi??ero"
            ,"Plaza Clucellas"
            ,"Portugalete"
            ,"Pozo Borrado"
            ,"Presidente Roca"
            ,"Progreso"
            ,"Providencia"
            ,"Pueblo Andino"
            ,"Pueblo Irigoyen (Irigoyen)"
            ,"Pueblo Marini"
            ,"Pueblo Mu??oz"
            ,"Pueblo Uranga (Uranga)"
            ,"Pujato"
            ,"Pujato Norte"
            ,"Ramay??n"
            ,"Ramona"
            ,"Ricardone"
            ,"Rivadavia"
            ,"Rueda"
            ,"Sa Pereira"
            ,"Saguier"
            ,"Saladero Mariano Cabal"
            ,"Salto Grande"
            ,"San Agust??n"
            ,"San Antonio"
            ,"San Antonio de Obligado"
            ,"San Bernardo"
            ,"San Bernardo"
            ,"San Carlos Norte"
            ,"San Carlos Sud"
            ,"San Eduardo"
            ,"San Eugenio"
            ,"San Fabi??n"
            ,"San Francisco de Santa Fe"
            ,"San Gregorio"
            ,"San Jer??nimo del Sauce"
            ,"San Jer??nimo Sud"
            ,"San Jos?? de la Esquina"
            ,"San Mariano"
            ,"San Mart??n de las Escobas"
            ,"San Mart??n Norte"
            ,"San Vicente"
            ,"Sancti Spiritu"
            ,"Sanford"
            ,"Santa Clara de Buena Vista"
            ,"Santa Clara de Saguier"
            ,"Santa Isabel"
            ,"Santa Margarita"
            ,"Santa Mar??a Centro"
            ,"Santa Mar??a Norte"
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
            ,"Tacuarend??"
            ,"Tacural"
            ,"Tacurales"
            ,"Tartagal"
            ,"Teodelina"
            ,"Theobald"
            ,"Timb??es"
            ,"Toba"
            ,"Tortugas"
            ,"Traill"
            ,"Vera y Pintado"
            ,"Videla"
            ,"Vila"
            ,"Villa Amelia"
            ,"Villa Ana"
            ,"Villa Elo??sa"
            ,"Villa Guillermina"
            ,"Villa Minetti"
            ,"Villa Mugueta"
            ,"Villa San Jos??"
            ,"Villa Saralegui"
            ,"Villa Trinidad"
            ,"Villada"
            ,"Virginia"
            ,"Wheelwright"
            ,"Zavalla"
            ,"Zen??n Pereyra"
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
                <MenuItem sx={{ width: "100%" }} value={"Entre R??os"}>Entre R??os</MenuItem>
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



