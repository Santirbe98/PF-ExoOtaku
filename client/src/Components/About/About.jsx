import { React, useState } from "react";
import img1 from "../../Resources/imagnes pag1.jpeg";
import img2 from "../../Resources/imagenes pag 2.jpeg";
import img3 from "../../Resources/uvjet-impresora-dtg-easy-tx-04-500x571.jpg";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Footer } from "../Footer/Footer.jsx";
import Carousel from "react-material-ui-carousel";
import { Container, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export const About = () => {
  let mock = [img1, img2, img3];
  const [actImg, setActImg] = useState(0);
  const quantity = mock?.length;

  const nextImg = () => {
    setActImg(actImg === quantity - 1 ? 0 : actImg + 1);
  };
  const prevImg = () => {
    setActImg(actImg === quantity ? 0 : actImg - 1);
  };

  return (
    <div>
      {/* <NavBar /> */}
      <Grid container spacing={2}>
        <Grid xs={12} md={12} lg={12} xl={12}>
          <Typography variant="h4">Sobre Nosotros</Typography>
        </Grid>
        <Grid xs={12} md={12} lg={12} xl={12}>
          <Typography variant="h4">Como hacemos nuestras prendas?</Typography>
        </Grid>
        <Grid xs={12} md={12} lg={12} xl={12}>
          <Carousel next={nextImg} prev={prevImg}>
            {mock?.map((img, index) => (
              <img key={index} src={img} alt="about" width="400" height="450" />
            ))}
          </Carousel>
        </Grid>
      </Grid>
      {/* //---------------------------------------------------------- */}
      <Grid container spacing={1} marginLeft={5} marginRight={5}>
        <Grid xs={12}>
          <Typography variant="h4">Especificaciones:</Typography>
        </Grid>
        <Grid xs={12} md={12} lg={6} xl={4}>
          <h4 key={1}>Utiliza tinta duopoint (USA).</h4>
        </Grid>
        <Grid xs={12} md={12} lg={6} xl={4}>
          <h4 key={2}>Es resistente a lavados y el sol</h4>
        </Grid>
        <Grid xs={12} md={12} lg={6} xl={4}>
          <h4 key={3}>
            Recien partir del lavado n°30 comienza a perder el brillo
          </h4>
        </Grid>
        <Grid xs={12} md={12} lg={6} xl={4}>
          <h4 key={4}>
            Su calidad es superior en compararcion con la serigrafia!
          </h4>
        </Grid>
        <Grid xs={12} md={12} lg={6} xl={4}>
          <h4 key={5}>
            Es una tinta Ecologica ya que esta compuesta con agua!
          </h4>
        </Grid>
        <Grid xs={12} md={12} lg={6} xl={4}>
          <h4 key={6}>Nuestros productos son 100% Algodon!</h4>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {/* <Typography variant="subtitle1"> */}

        {/* </Typography> */}
      </Grid>
      <Footer />
    </div>
  );
};
