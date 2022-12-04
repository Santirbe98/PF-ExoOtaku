import React from "react";
import { Link } from "react-router-dom";
import { Cards } from "../Cards/Cards.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { NavBar } from "../NavBar/NavBar.jsx";
import { SearchBar } from "../SearchBar/SearchBar.jsx";

export const Home = () => {
  return (
    <div>
      <h1>Exo Otaku</h1>
      <SearchBar />
      <NavBar />
      <Cards />
      <Link to="/form"> Formulario </Link>
      <Footer />
    </div>
  );
};
