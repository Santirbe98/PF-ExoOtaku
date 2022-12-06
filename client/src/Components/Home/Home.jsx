import React from "react";
import { Cards } from "../Cards/Cards.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { NavBar } from "../NavBar/NavBar.jsx";

export const Home = () => {
  return (
    <div>
      <NavBar />
      <Cards />
      <Footer />
    </div>
  );
};
