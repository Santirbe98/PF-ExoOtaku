import { useAuth0 } from "@auth0/auth0-react";
import { Box, Avatar } from "@mui/material";
import LogoutButton from "../Authenticate/LogoutButton";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          marginTop: "5px",
        }}
      >
        {user?.picture && (
          <Avatar
            src={user.picture}
            alt={user?.name}
            sx={{ width: 50, height: 50 }}
          />
        )}
        <LogoutButton />
      </Box>
    )
  );
};

export default Profile;
