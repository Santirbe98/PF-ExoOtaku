import { React, useState } from "react";
import img1 from "../../Resources/imagnes pag1.jpeg";
import img2 from "../../Resources/imagenes pag 2.jpeg";
import img3 from "../../Resources/uvjet-impresora-dtg-easy-tx-04-500x571.jpg";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Footer } from "../Footer/Footer.jsx";
import Carousel from "react-material-ui-carousel";
import { Container, Grid, Box, Typography } from "@mui/material";

export function About() {
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
      <NavBar />
      <Box>
        <Container>
          <Grid pt={5}>
            <Typography variant="h4">Sobre Nosotros</Typography>
          </Grid>
          <Grid pt={4}>
            <Typography variant="h5">Como hacemos nuestras prendas?</Typography>
          </Grid>
          <Grid pt={4} pb={4}>
            <Typography variant="h6">
              Nuestra ropa se realiza mediante impresoras DTG
            </Typography>
          </Grid>
        </Container>
      </Box>
      <Carousel next={nextImg} prev={prevImg}>
        {mock?.map((img, index) => (
          <img key={index} src={img} alt="about" width="400" height="450" />
        ))}
      </Carousel>
      <Box>
        <Container>
          <Grid pt={5}>
            <Typography variant="h6">
              Aseguramos un excelente producto 😎
            </Typography>
          </Grid>
          <Grid pt={4}>
            <Typography variant="h6">Especificaciones:</Typography>
          </Grid>
          <Grid pb={4}>
            <Typography variant="subtitle1">
              <ul style={{ listStyle: "none" }}>
                <li key={1}>Utiliza tinta duopoint (USA).</li>
                <li key={2}>Es resistente a lavados y el sol</li>
                <li key={3}>
                  Recien partir del lavado n°30 comienza a perder el brillo
                </li>
                <li key={4}>
                  Su calidad es superior en compararcion con la serigrafia!
                </li>
                <li key={5}>
                  Es una tinta Ecologica ya que esta compuesta con agua!
                </li>
                <li key={6}>Nuestros productos son 100% Algodon!</li>
              </ul>
            </Typography>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
