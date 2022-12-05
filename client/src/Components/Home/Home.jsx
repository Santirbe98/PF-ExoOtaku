import React from "react";
import { Link } from "react-router-dom";
import { Cards } from "../Cards/Cards.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Filter } from "../Filter/Filter.jsx";

export const Home = () => {
  return (
    <div>
      <NavBar />
      <Filter />
      <Cards />
      <Link to="/form"> Formulario </Link>
      <Footer />
    </div>
  );
};
