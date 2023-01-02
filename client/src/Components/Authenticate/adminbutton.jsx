import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Admin = () => {
  const { user, isAuthenticated } = useAuth0();
  const { logout } = useAuth0();
  const history = useHistory();
  const routeChange = () => {
    history.push("/settings");
  };

  return (
    isAuthenticated && (
      <Link to="/settings">
        <Button
          color="warning"
          size="medium"
          variant="outlined"
          onClick={routeChange}
          sx={{ width: 150, padding: 1, margin: 0.5 }}
        >
          Administrador
        </Button>
      </Link>
    )
  );
};

export default Admin;
