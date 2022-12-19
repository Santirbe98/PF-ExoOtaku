import { useAuth0 } from "@auth0/auth0-react";
import { Button, Box, Avatar } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Grid container margin={0} padding={0} mt={2}>
        <Grid xs={12} sm={12} md={12} lg={6} xl={12}>
          <Box
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              alignSelf: "center",
              lineHeight: 0,
              letterSpacing: 0,
            }}
            pb={1}
          >
            <Avatar sx={{ width: 50, height: 50 }}>?</Avatar>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={6} xl={12} pb={10}>
          <Button
            color="success"
            size="medium"
            variant="contained"
            onClick={() => loginWithRedirect()}
          >
            Iniciar Sesion
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default LoginButton;
