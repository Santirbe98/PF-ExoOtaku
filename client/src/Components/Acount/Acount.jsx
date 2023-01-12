import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
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

import Swal from "sweetalert2";

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
  const [loadingProfile, setLoadingProfile] = useState(true);
  const { user, isAuthenticated } = useAuth0();
  const [orders, setOrders] = useState([]);
  const UserValidate = useSelector((state) => state.chk_customer);
  const [ranks, setRanks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (UserValidate !== null && Object.keys(UserValidate).length > 0) {
      dispatch(customerOrders(UserValidate.id)).then((data) => {
        setOrders(data.payload);
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      });
    } else {
      setTimeout(() => {
        setLoadingProfile(false);
      }, 4000);
    }
  }, [dispatch, UserValidate]);

  useEffect(() => {
    if (UserValidate !== null && Object.keys(UserValidate).length > 0) {
      dispatch(customerRank(UserValidate.id)).then((data) => {
        setRanks(data.payload);
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      });
    }
  }, [dispatch, UserValidate]);

  // RankedProductList
  let rankl = [];
  rankl = ranks;
  let orderl = [];
  orderl = orders;

  let RankedP = [];
  for (let z = 0; z < rankl.length; z++) {
    for (let w = 0; w < orderl.length; w++) {
      for (let x = 0; x < orderl[w].products.length; x++) {
        if (orderl[w].products[x].id === rankl[z].product_id) {
          RankedP.push({
            id: rankl[z].id,
            imagen: orderl[w].products[x].imagen,
            product_id: orderl[w].products[x].id,
            calificacion: rankl[z].rank,
            fecha: rankl[z].createdAt,
            comentario: rankl[z].comment,
          });
        }
      }
    }
  }
  const RankedProductList = [
    ...new Map(RankedP.map((item) => [item.product_id, item])).values(),
  ];

  //UPDATE CURTOMER DATA
  function handleMod(event) {
    event.preventDefault();
    Swal.fire({
      text: "Ahora puede modificar sus datos!",
      width: "30%",
      padding: "10px",
      position: "top",
      allowEnterKey: true,
      imageUrl:
        "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/760/094/themes/common/logo-204180220-1664550124-6d7184aec833212b57e39d5f3bd0e32d1664550125.png?0",
      imageHeight: 200,
      imageWidth: 200,
      icon: "info",
      background: "black",
      color: "white",
      confirmButtonColor: "#00711a",
    });
    let upt_customer = {
      id: UserValidate.id,
      name: UserValidate.name,
      token: UserValidate.token,
      email: UserValidate.email,
      country: UserValidate.country,
      provincia: UserValidate.address.provincia,
      phone: UserValidate.phone,
      ciudad: UserValidate.address.ciudad,
      shipping_address: UserValidate.shipping_address,
      billing_address: UserValidate.billing_address,
      isadmin: false,
    };
    history.push(`/customer/`, upt_customer);
  }

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      minHeight="100vh"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading === false && isAuthenticated && UserValidate !== null ? (
        <Box>
          <Box>
            <Grid
              container
              spacing={2}
              ml={5}
              mr={5}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              mt={5}
            >
              {/* COL USER DATA */}
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <Box
                  width={
                    width < 1000
                      ? {
                          width: width - 50,
                        }
                      : {}
                  }
                >
                  <Item>
                    <TableRow>
                      <TableCell>
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

                    <Item direction="row" align="center" spacing={2}>
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
                </Box>
              </Grid>

              {/* COL WISHLIST */}
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                <Box width={width < 1000 ? { width: width } : {}}>
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
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box width={width < 1000 ? { width: width } : {}}>
                  {loading === false ? (
                    <CollapsibleTable
                      Products={orders}
                      loading={loading}
                      user={UserValidate}
                      Ranklist={RankedProductList}
                    />
                  ) : (
                    <>
                      <Typography> Cargando ordenes </Typography>
                      <Box>
                        <CircularProgress color="secondary" />
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box width={width < 1000 ? { width: width } : {}}>
                  <EnhancedTable Ratedproduct={RankedProductList} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box minHeight="100vh">
          {loadingProfile === false ? (
            <Grid container pt={20}>
              <Grid item xs={12}>
                <Typography variant="h3">
                  Para acceder al panel de usuario debe registrarse primero
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid container pt={20}>
              <Grid item xs={12}>
                <CircularProgress disableShrink color="secondary" />
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
};
