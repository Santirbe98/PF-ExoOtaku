import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { InputLabel } from "@material-ui/core";
import { useSelector } from "react-redux";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { CircularProgress } from "@mui/material";
import WishList from "./WishList";

import { customerOrders } from "../../Redux/Actions";
import { customerRank } from "../../Redux/Actions";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import CollapsibleTable from "./Orders";
import EnhancedTable from "./Rated";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  justifycontent: "center",
  alignItems: "left",
  color: theme.palette.text.secondary,
}));

export const Acount = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth0();
  const [orders, setOrders] = useState([]);
  const UserValidate = useSelector((state) => state.chk_customer);
  const [ranks, setRanks] = useState([]);
  const history=useHistory()

  useEffect(() => {
    if (UserValidate !== null) {
      dispatch(customerOrders(UserValidate.id)).then((data) => {
        setOrders(data.payload);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(customerRank(UserValidate.id)).then((data) => {
      setRanks(data.payload);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
  }, [dispatch, UserValidate.id]);

  // RankedProductList
  let rankl=[]
  rankl=ranks
  let orderl=[]
  orderl=orders

  let RankedP=[]
  for (let z = 0; z < rankl.length; z++) {  
    for (let w = 0; w < orderl.length; w++) {
      for (let x = 0; x < orderl[w].products.length; x++) {
        if (orderl[w].products[x].id===rankl[z].product_id) {
          RankedP.push({
            id:rankl[z].id,
            imagen:orderl[w].products[x].imagen,
            producto:orderl[w].products[x].producto,
            calificacion:rankl[z].rank,
            fecha:rankl[z].createdAt,
            comentario:rankl[z].comment})
        }
      }
    }
  }
  const RankedProductList=[...new Map(RankedP.map(item =>[item.producto, item])).values()]

  //UPDATE CURTOMER DATA
  function handleMod(event){
    event.preventDefault()
    alert('Ahora puede modificcar sus datos!') 
    let upt_customer ={
      id:UserValidate.id,
      name:UserValidate.name,
      token:UserValidate.token,
      email:UserValidate.email,
      country:UserValidate.country,
      provincia:UserValidate.address.provincia,
      phone:UserValidate.phone,
      ciudad:UserValidate.address.ciudad,
      shipping_address:UserValidate.shipping_address,
      billing_address:UserValidate.billing_address,
      isadmin:false}
    history.push(`/customer/`,upt_customer); 
  }


  return (
    <Box minHeight="100vh">
      {isAuthenticated && UserValidate !== null ? (
        <Box>
          <>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {/* ROW 1>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

                {/* LEFT =========================================== */}
                <Grid item xs={1}></Grid>

                {/* MIDLE =========================================== */}

                {/* COL USER DATA */}
                <Grid item xs={3}>
                  <Item>
                    <TableRow>
                      <TableCell width="120">
                        {user?.picture && (
                          <CardMedia
                            component="img"
                            height="125"
                            image={user.picture}
                            alt={user?.name}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="h4" gutterBottom component="div">
                          {user?.name}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <Typography variant="h5" gutterBottom component="div">
                      Tus Datos
                    </Typography>

                    <InputLabel htmlFor="id">
                      <Typography variant="h7" gutterBottom component="div">
                        Codigo: {UserValidate.id}
                      </Typography>
                    </InputLabel>

                    <InputLabel htmlFor="country">
                      <Typography variant="h7" gutterBottom component="div">
                        Ubicacion: {UserValidate.country}
                      </Typography>
                    </InputLabel>

                    <Typography variant="h6" gutterBottom component="div">
                      Direcccion de Envio:
                    </Typography>

                    <InputLabel htmlFor="dir1">
                      <Typography variant="h7" gutterBottom component="div">
                        {UserValidate === null
                          ? UserValidate.address.provincia
                          : false}
                        {UserValidate === null
                          ? UserValidate.address.ciudad
                          : false}
                      </Typography>
                    </InputLabel>

                    <InputLabel htmlFor="dir2">
                      <Typography variant="h7" gutterBottom component="div">
                        {UserValidate.shipping_address}
                      </Typography>
                    </InputLabel>

                    <Typography variant="h6" gutterBottom component="div">
                      Direcccion de Cobro:
                    </Typography>

                    <InputLabel htmlFor="id">
                      <Typography variant="h7" gutterBottom component="div">
                        {UserValidate.billing_address}
                      </Typography>
                    </InputLabel>

                    <Item 
                      direction="row" 
                      align="center" 
                      spacing={2}
                    >
                      <Button
                        variant="contained"
                        href="#contained-buttons"
                        justifycontent="flex-end"
                        onClick={handleMod}
                      >
                        Modificar mis Datos
                      </Button>
                    </Item>
                  </Item>
                </Grid>

                {/* COL WISHLIST */}
                <Grid item xs={7}>
                  {loading === false ? (
                    <WishList email={UserValidate.email} />
                  ) : (
                    <>
                      <Typography> Cargando favoritos </Typography>
                      <Box>
                        <CircularProgress color="secondary" />
                      </Box>
                    </>
                  )}
                </Grid>

                {/* RIGTH =========================================== */}
                <Grid item xs={1}></Grid>

                {/* ROW 2 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

                <Grid item xs={1}></Grid>

                <Grid item xs={10}>
                  {loading === false ? (
                    <CollapsibleTable
                      Products={orders}
                      loading={loading}
                      user={UserValidate}
                    />
                  ) : (
                    <>
                      <Typography> Cargando ordenes </Typography>
                      <Box>
                        <CircularProgress color="secondary" />
                      </Box>
                    </>
                  )}
                </Grid>

                <Grid item xs={1}></Grid>

                {/* ROW 3 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <Grid item xs={1}></Grid>

                <Grid item xs={10}>
                <EnhancedTable Ratedproduct={RankedProductList}/>
                </Grid>

                <Grid item xs={1}></Grid>
              </Grid>
            </Box>
          </>
        </Box>
      ) : (
        <Box minHeight="100vh">
          <Grid container pt={20}>
            <Grid item xs={12}>
              <Typography variant="h3">
                Para acceder al panel de usuario debe registrarse primero
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};
