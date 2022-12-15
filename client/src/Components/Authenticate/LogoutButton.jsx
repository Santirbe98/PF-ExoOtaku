import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Button
        color="warning"
        size="medium"
        variant="outlined"
        onClick={() => logout()}
      >
        Cerrar Sesion
      </Button>
    )
  );
};

export default LogoutButton;
