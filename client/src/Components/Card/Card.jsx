import React from "react";
import { Link } from "react-router-dom";
export function Card({ name, price, image, category, id }) {
  return (
    <div>
      <Link to={`/detail/${id}`}>
        <img src={image} alt="Not Found" />
      </Link>
      <h4>{name}</h4>
      <h4>{category}</h4>
      <h4>*-*-*-*</h4>
      <h4>{price}</h4>
    </div>
  );
}
