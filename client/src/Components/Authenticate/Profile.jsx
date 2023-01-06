import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { logout } = useAuth0();

  return (
    isAuthenticated && (
      <Grid container margin={0} padding={0} mt={2}>
        <Grid xs={12} sm={12} md={12} lg={6} xl={12}>
          {user?.picture && (
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
              <Avatar
                src={user.picture}
                alt={user?.name}
                sx={{
                  width: 50,
                  height: 50,
                }}
              />
            </Box>
          )}
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={6} xl={12} pb={10}>
          <Button
            color="warning"
            size="medium"
            variant="outlined"
            onClick={() => logout()}
          >
            Cerrar Sesion
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default Profile;
