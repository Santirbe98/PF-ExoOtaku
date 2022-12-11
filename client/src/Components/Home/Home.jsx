import React from "react";
import { Cards } from "../Cards/Cards.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { NavBar } from "../NavBar/NavBar.jsx";
/* import {PayButton, products} from "../Payment/PayButton.jsx"; */
import { PayButton } from "../Payment/PayButton.jsx";
import prueba from "./prueba.js";
import Cart from "../Cart/Cart.jsx";


const cartItems = prueba;

const userId = 1;

export const Home = () => {
  return (
    <div>
      <NavBar />
      <PayButton cartItems={cartItems} userId={userId} />
      <Cart />
      <Cards />
      <Footer />
    </div>
  );
};
