import React from "react";
import { Box, Button, Card, CardMedia } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import imagen from "../../Resources/CuentaSuspendida.png";
export const Ban = () => {
  const { logout } = useAuth0();
  return (
    <Box pt={5} sx={{ minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card>
          <CardMedia
            component="img"
            image={imagen}
            alt="Ban"
            sx={{ minWidth: "50px", maxWidth: "600px" }}
          />
        </Card>
      </Box>
      <Box pt={5}>
        <Button variant="contained" color="warning" onClick={logout}>
          CERRAR CESION
        </Button>
      </Box>
    </Box>
  );
};
