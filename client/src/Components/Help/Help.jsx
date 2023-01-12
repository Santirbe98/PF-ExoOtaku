import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export const Help = () => {
  return (
    <Box
      marginTop={0}
      minHeight="60vh"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: "1000px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper variant="outlined" sx={{ fontSize: 20 }}>
            FAQ - Preguntas & Respuestas Frecuentes
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4">¿Venden en toda Latinoamerica?</Typography>
          <Typography variant="p">
            Por el momento no! Es nuestro objetivo. Sin embargo debido a
            limitantes legales nos vemos obligados a solo trabajar en Argentina
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4">
            ¿Tengo que limitarme a sus diseños o puedo enviar uno propio?
          </Typography>
          <Typography variant="p">
            Si! podes enviarnos tu diseño. Solo para que tengas en cuenta, eso
            aumenta el tiempo de espera para que enviemos tu producto, ya que la
            imagen tiene que ser correctamente editada para imprimirla en la
            prenda. Tambien recordá enviarnos una imagen con buena calidad y
            resolucion! ❤{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4">
            ¿Cuales son las formas de pago que manejan?
          </Typography>
          <Typography variant="p">
            Por el momento trabajamos con tarjetas de debito y credito,
            transferencias, y criptomonedas (consultar previamente)
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mb={10}>
          <Typography variant="h4">¿Venden mayorista?</Typography>
          <Typography variant="p">
            Precisamos que esa consulta nos la realices en el momento. Va a
            depender de la compra que quisieras realizar y la cantidad de
            pedidos que tengamos en ese momento en especifico
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
