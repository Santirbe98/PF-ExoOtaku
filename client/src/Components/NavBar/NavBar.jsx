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
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import Cart from "../Cart/Cart.jsx";

export const NavBar = () => {
  const { isLoading, error } = useAuth0();
  return (
    <div className={s.divSection}>
      <div className={s.imgContainer}>
        <img
          src="http://d3ugyf2ht6aenh.cloudfront.net/stores/001/760/094/themes/common/logo-204180220-1664550124-6d7184aec833212b57e39d5f3bd0e32d1664550125.png?0"
          width="200px"
          alt="exootakulogo"
        />
      </div>
      <div className={s.boxsContainer}>
        <Box
          style={{
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
                maxWidth: "120px",
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
                Home
              </span>
            </Button>
          </Link>
        </Box>
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
                maxWidth: "120px",
                maxHeight: "70px",
                minWidth: "150px",
                minHeight: "50px",
                textDecoration: "none",
                color: "white",
              }}
              sx={{ borderRadius: "0.8em" }}
            >
              <span>
                <Diversity1Icon />
                About
              </span>
            </Button>
          </Link>
        </Box>
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
                maxWidth: "120px",
                maxHeight: "70px",
                minWidth: "150px",
                minHeight: "50px",
                textDecoration: "none",
                color: "white",
              }}
              sx={{ borderRadius: "0.8em" }}
            >
              <span>
                <AddIcon />
                Form
              </span>
            </Button>
          </Link>
        </Box>
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
                maxWidth: "120px",
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
                Help
              </span>
            </Button>
          </Link>
        </Box>
        <Box
          textAlign="center"
          style={{
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
                maxWidth: "120px",
                maxHeight: "70px",
                minWidth: "150px",
                minHeight: "50px",
                textDecoration: "none",
                color: "white",
              }}
              sx={{ borderRadius: "0.8em" }}
            >
              <span>
                <AddShoppingCartIcon />
                Cart
                
              </span>
            </Button>
          </Link>
        </Box>
        <Box>
          {error && <p>Authentication Error</p>}
          {!error && isLoading && <p>Loading...</p>}
          {!error && !isLoading && (
            <>
              <Profile />
              <LoginButton />
              {/* <LogoutButton /> */}
            </>
          )}
        </Box>
      
      </div>
    </div>
  );
};

{
  /* <section>
    <Link to="/shop">
    <button className={s.navButton}>
      <span>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
            fill="currentColor"
          ></path>
        </svg>
        Shop
      </span>
    </button>
    </Link>
  </section> */
}
