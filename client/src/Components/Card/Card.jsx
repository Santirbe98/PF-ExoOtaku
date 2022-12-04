import React from "react";

export function Card({ name, price, image, category }) {
  return (
    <div>
      <img src={image} alt="Not Found"/>
      <h4>{name}</h4>
      <h4>{category}</h4>
      <h4>*-*-*-*</h4>
      <h4>{price}</h4>
    </div>
  );
}
