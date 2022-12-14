import React from "react";
import { Cards } from "../Cards/Cards.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { NavBar } from "../NavBar/NavBar.jsx";
import Cart from "../Cart/Cart.jsx";

export const Home = () => {
  return (
    <div>
      <NavBar />
      <Cart />
      <Cards />
      <Footer />
    </div>
  );
};
