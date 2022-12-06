import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductDetail } from "../../Redux/Actions";
import s from "./CardDetail.module.css";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Footer } from "../Footer/Footer.jsx";

export function CardDetail({ match }) {
  let { id } = match.params;
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  useEffect(() => {
    dispatch(getProductDetail(id)).then((res) => setProduct(res.payload));
  }, [dispatch, id]);

  return (
    <div>
      <NavBar />
      {Object.entries(product).length ? (
        <div className={s.container}>
          <div className={s.containerImg}>
            {product.images?.map((i) => (
              <img key={i} src={i} alt="product" className={s.imgProduct} />
            ))}
          </div>
          <div className={s.textWrapper}>
            <h1>{product.name}</h1>
            <h1>$ {product.price}</h1>
            <div>
              <h4>Select color</h4>
              <select className={s.filterSelect}>
                {!product.color?.length ? (
                  <option>No colors available</option>
                ) : (
                  product.color.map((c) => <option key={c}>{c}</option>)
                )}
              </select>
            </div>
            <div>
              <h4>Select size</h4>
              <select className={s.filterSelect}>
                {!product.size?.length ? (
                  <option key={id}>No sizes available</option>
                ) : (
                  product.size.map((c) => <option key={c}>{c}</option>)
                )}
              </select>
            </div>
            <h4>{product.description}</h4>
            <button className={s.detailButton}>Add To Cart</button>
          </div>
        </div>
      ) : (
        <div className={s.container}>
          <h1>"loading product"</h1>
        </div>
      )}

      <Footer />
    </div>
  );
}
