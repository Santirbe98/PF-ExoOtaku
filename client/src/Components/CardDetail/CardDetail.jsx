import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../Redux/Actions";
import s from "./CardDetail.module.css";

export function CardDetail({ match }) {
  let { id } = match.params;
  const dispatch = useDispatch();
  let { name, price, description, images } = useSelector(
    (state) => state.details
  );

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <div>
        {images?.map((i) => (
          <img key={i} src={i}></img>
        ))}
      </div>
      <div>
        <h1>{name}</h1>
        <h4>*-*-*-*-</h4>
        <h4>{price}</h4>
        <h4>SELECT TYPE</h4>
        <h4>SELECT COLOR</h4>
        <h4>{description}</h4>
        <button className={s.detailButton}>Add To Cart</button>
      </div>

      <h4></h4>
      <h4></h4>
      <h4></h4>
    </div>
  );
}
