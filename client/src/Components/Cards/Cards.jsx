import { React, useEffect } from "react";
import { getProducts } from "../../Redux/Actions";
import { Card } from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";

export function Cards() {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.filterProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      {!products.length
        ? "no products"
        : products?.map((p) => (
            <Card
              key={p.id}
              id={p.id}
              image={p.images[0]}
              name={p.name}
              category={p.category}
              price={p.price}
            />
          ))}
    </div>
  );
}
