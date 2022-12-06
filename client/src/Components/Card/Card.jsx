import React from "react";
import { Link } from "react-router-dom";
import s from "./Card.module.css";

export function Card({ name, price, image, id, category }) {
  return (
    <div className={s.containerCard}>
      <Link
        style={{
          textDecoration: "none",
          color: "white",
        }}
        to={`/detail/${id}`}
      >
        <div className={s.wrappedImg}>
          <img
            src={image}
            alt="ProductId"
            width="230px"
            className={s.imgProduct}
          />
        </div>
        <div className={s.infoContainer}>
          <h2>{name}</h2>
          <h4>{category}</h4>
          <h2>$ {price}</h2>
        </div>
      </Link>
      <button className={s.detailButton}>Add To Cart</button>
    </div>
  );
}
