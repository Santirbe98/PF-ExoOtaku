import { React, useEffect } from "react";
import { getProducts } from "../../Redux/Actions";
// import { Card } from './prueba.jsx'
import { useDispatch, useSelector } from "react-redux";

export function Cards() {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.products);

  useEffect(() => {
    if (!products.length) dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      {/* {products?.map(p => <Card
                key={p.id}
                image={p.images}
                name={p.name}
                category={p.categories[0].category}
                price={p.price} />
            )} */}
    </div>
  );
}
