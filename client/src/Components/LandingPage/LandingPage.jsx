import React from "react";
import s from "./LandingPage.module.css";
import logo from "../../Resources/logo.jpg";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className={s.container}>
      <img src={logo} alt="landing" width="500px"></img>

      <Link
        style={{
          textDecoration: "none",
          color: "Black",
        }}
        to="/home"
      >
        <button className={s.buttonSubmit}>Ver productos</button>
      </Link>
    </div>
  );
};
