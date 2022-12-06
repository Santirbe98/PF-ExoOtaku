import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../../Resources/404.png";
import s from "./Error.module.css";

export const Error = () => {
  return (
    <div className={s.container}>
      <img src={errorImg} alt="404" width="800px" className={s.imgError} />
      <Link to="/home">
        <button className={s.detailButton}>Back...</button>
      </Link>
    </div>
  );
};
