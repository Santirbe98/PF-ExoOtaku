import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../Redux/Actions";
import s from "./CardDetail.module.css";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Footer } from "../Footer/Footer.jsx";

export function CardDetail({ match }) {
  let { id } = match.params;
  const dispatch = useDispatch();
  let { name, price, description, images, color, size } = useSelector(
    (state) => state.details
  );

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <NavBar />
      <div className={s.container}>
        <div className={s.containerImg}>
          {images?.map((i) => (
            <img key={i} src={i} alt="product" className={s.imgProduct} />
          ))}
        </div>
        <div className={s.textWrapper}>
          <h1>{name}</h1>
          <h1>$ {price}</h1>
          <div>
            <h4>Select color</h4>
            <select className={s.filterSelect}>
              {!color?.length ? (
                <option>No colors available</option>
              ) : (
                color.map((c) => <option key={c}>{c}</option>)
              )}
            </select>
          </div>
          <div>
            <h4>Select size</h4>
            <select className={s.filterSelect}>
              {!size?.length ? (
                <option key={id}>No sizes available</option>
              ) : (
                size.map((c) => <option key={c}>{c}</option>)
              )}
            </select>
          </div>
          <h4>{description}</h4>
          <button className={s.detailButton}>Add To Cart</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
