import { Button, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import s from "./NavBar.module.css";
import LoginButton from "../Authenticate/LoginButton";
import Profile from "../Authenticate/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import Grid from "@mui/material/Unstable_Grid2";

export const NavBar = () => {
  const { isLoading, error } = useAuth0();
  return (
    <Grid container spacing={2} pt={5} mr={5} ml={5}>
      <Grid xs={12} sm={12} md={12} lg={2} xl={2}>
        {/* <Box className={s.imgContainer}> */}
        <img
          src="http://d3ugyf2ht6aenh.cloudfront.net/stores/001/760/094/themes/common/logo-204180220-1664550124-6d7184aec833212b57e39d5f3bd0e32d1664550125.png?0"
          width="200px"
          alt="exootakulogo"
        />
      </Grid>

      <Grid
        xs={12}
        sm={12}
        md={6}
        lg={2}
        xl={2}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <Link
            to="/home"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              className={s.navButton}
              style={{
                maxWidth: "180px",
                maxHeight: "70px",
                minWidth: "150px",
                minHeight: "50px",
                textDecoration: "none",
                color: "white",
              }}
              sx={{ borderRadius: "0.8em" }}
            >
              <span>
                <HomeIcon />
                Inicio
              </span>
            </Button>
          </Link>
        </Box>
      </Grid>
      <Grid
        xs={12}
        sm={12}
        md={6}
        lg={2}
        xl={2}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          textAlign="center"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <Link
            to="/about"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              className={s.navButton}
              style={{
                maxWidth: "180px",
                maxHeight: "65px",
                minWidth: "150px",
                minHeight: "50px",
                textDecoration: "none",
                color: "white",
              }}
              sx={{ borderRadius: "0.8em" }}
            >
              <span>
                <Diversity1Icon />
                Sobre nosotros
              </span>
            </Button>
          </Link>
        </Box>
      </Grid>
      <Grid
        xs={12}
        sm={12}
        md={6}
        lg={2}
        xl={2}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <Link
            to="/form"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              className={s.navButton}
              style={{
                maxWidth: "180px",
                maxHeight: "70px",
                minWidth: "100px",
                minHeight: "50px",
                textDecoration: "none",
                color: "white",
              }}
              sx={{ borderRadius: "0.8em" }}
            >
              <span>
                <AddIcon />
                Formulario
              </span>
            </Button>
          </Link>
        </Box>
      </Grid>
      <Grid
        xs={12}
        sm={12}
        md={6}
        lg={2}
        xl={2}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          textAlign="center"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <Link
            to="/help"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              className={s.navButton}
              style={{
                maxWidth: "180px",
                maxHeight: "70px",
                minWidth: "150px",
                minHeight: "50px",
                textDecoration: "none",
                color: "white",
              }}
              sx={{ borderRadius: "0.8em" }}
            >
              <span>
                <InfoIcon />
                Ayuda
              </span>
            </Button>
          </Link>
        </Box>
      </Grid>
      <Grid
        xs={12}
        sm={12}
        md={12}
        lg={2}
        xl={2}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <>
          {error && <p>Error de autenticacion</p>}
          {!error && isLoading && <p>Cargando...</p>}
          {!error && !isLoading && (
            <>
              <Profile />
              <LoginButton />
            </>
          )}
        </>
      </Grid>
    </Grid>
  );
};
