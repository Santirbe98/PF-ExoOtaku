import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <>
      <div className={styles.footerContainer}>
        <Link to="/home" className={styles.links}>
          Home
        </Link>
        <Link to="/about" className={styles.links}>
          Sobre Nosotros
        </Link>
        <Link to="/help" className={styles.links}>
          Ayuda
        </Link>
      </div>
      <div>
        <h5>© ExoOtaku</h5>
      </div>
    </>
  );
};
