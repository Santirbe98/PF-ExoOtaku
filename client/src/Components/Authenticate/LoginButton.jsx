import { useAuth0 } from "@auth0/auth0-react";
import { Button, Box, Avatar } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          marginTop: "5px",
        }}
      >
        <Avatar sx={{ width: 50, height: 50 }}>?</Avatar>
        <Button
          color="success"
          size="medium"
          variant="contained"
          onClick={() => loginWithRedirect()}
        >
          Iniciar Sesion
        </Button>
      </Box>
    )
  );
};

export default LoginButton;
