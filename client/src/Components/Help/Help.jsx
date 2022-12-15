import React from "react";
import { Footer } from "../Footer/Footer.jsx";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export const Help = () => {
  return (
    <div>
      <NavBar />
      <Grid container spacing={2}>
        <Container maxWidth="sm" sx={{ m: 6, mx: "auto", width: 800 }}>
          <Grid xs={12} md={12} lg={12} xl={12}>
            <Paper variant="outlined" sx={{ fontSize: 20 }}>
              FAQ - Preguntas & Respuestas Frecuentes
            </Paper>
          </Grid>
          <Grid xs={12} md={12} lg={12} xl={12}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </Grid>
          <Grid xs={12} md={12} lg={12} xl={12}>
            <Typography variant="h4">AYUDA</Typography>
          </Grid>
          <Grid xs={12} md={12} lg={12} xl={12}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </Grid>
        </Container>
      </Grid>

      <Footer />
    </div>
  );
};
