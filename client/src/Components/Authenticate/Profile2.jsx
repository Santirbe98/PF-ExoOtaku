import Grid from "@mui/material/Unstable_Grid2";
import { useAuth0, User } from "@auth0/auth0-react";
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { chkcustomer } from "../../Redux/Actions";
import { Button, Box, Avatar } from "@mui/material";
import  SignIn  from "../SignIn/SingIn";
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AcountButton from "../Authenticate/AcountButton";

function SimpleDialog(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Registrarme
      </Button>   
      <br/>   
      <br/>  
      <Dialog open={open} onClose={handleClose} background-color="black">
        <DialogTitle>Regisro de Usuario</DialogTitle>
        <DialogContent>
          <SignIn/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const history=useHistory()

  var usermail=""
  useEffect(() => {
    dispatch(chkcustomer(usermail))
  }, [isAuthenticated]);
  const UserValidate = useSelector((state) => state.chk_customer)

  if(isAuthenticated) {
    usermail=user?.email
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  if (UserValidate!== null) {

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
            <AcountButton/>
            <Button
              color="warning"
              size="medium"
              variant="outlined"
              sx={{ width: 150, padding: 1, margin: 0.5 }}
              onClick={() => logout()}
            >
              Cerrar Sesion
            </Button>
          </Grid>
        </Grid>
      )
    );

  }
  else {
    return(
      isAuthenticated && (
        <SimpleDialog
          open={open}
          onClose={handleClose}
      />
      )
    )
  }  
};

export default Profile;
