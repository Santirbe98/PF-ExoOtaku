import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getProducts, orderByRank, orderByDate } from "../../Redux/Actions";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { TopRanked } from "../TopRanked/TopRanked";
import { Link, useHistory } from "react-router-dom";
import { TopDate } from "../TopDate/TopDate";
export const LandingPage = () => {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.filterProducts);

  useEffect(() => {
    dispatch(getProducts())
      .then(() => dispatch(orderByRank()))
      .then(() => dispatch(orderByDate()));
  }, [dispatch]);

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const initialMessage = "";
  const [message, setMessage] = useState(initialMessage);
  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  const handeleMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleWipeMessage = () => {
    setTimeout(() => {
      setMessage(initialMessage);
    }, 1000);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} margin={1}>
          <Typography variant="h3">ExoOtaku anime top 5</Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TopRanked />
      </Box>
      <Link to="/shop" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="warning">
          Ir a la tienda
        </Button>
      </Link>
      <Divider
        color="white"
        sx={{ marginTop: 3, width: "90%", marginLeft: "5%" }}
      />
      {/* ------------------------------------------------------------- */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mb={3} mt={3}>
          <Typography variant="h5">Dejanos tu consulta</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={7}>
          <Box
            sx={
              width > 1200
                ? {
                    display: "flex",
                    justifyContent: "flex-end",
                  }
                : { display: "flex", justifyContent: "center" }
            }
          >
            <TextField
              placeholder="Hola,queria saber..."
              color="success"
              value={message}
              onChange={handeleMessage}
              style={
                width < 1200
                  ? {
                      backgroundColor: "rgba(255, 253, 253, 0.900)",
                      borderRadius: "10px",
                      width: 400,
                    }
                  : {
                      backgroundColor: "rgba(255, 253, 253, 0.900)",
                      borderRadius: "10px",
                      width: 400,
                    }
              }
              focused
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={5}>
          <Box
            sx={
              width > 1200
                ? {
                    display: "flex",
                    justifyContent: "flex-start",
                  }
                : { display: "flex", justifyContent: "center" }
            }
          >
            <Button
              variant="contained"
              color="success"
              sx={{ padding: "10px", ml: "10px" }}
              target="_blank"
              href={`https://api.whatsapp.com/send/?phone=543426507112&text=${message}`}
              onClick={handleWipeMessage}
            >
              <WhatsAppIcon htmlColor="white" fontSize="large" />
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider
        color="white"
        sx={{ marginTop: 3, width: "90%", marginLeft: "5%" }}
      />
      <Typography variant="h3" mt={10}>
        Nuevos Productos y Ofertas
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TopDate />
      </Box>
    </Box>
  );
};
