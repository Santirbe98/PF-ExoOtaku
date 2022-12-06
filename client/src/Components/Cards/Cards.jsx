import { React, useEffect, useState } from "react";
import { getProducts } from "../../Redux/Actions";
import { Card } from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import Paged from "../Paged/Paged";
import { Filter } from "../Filter/Filter.jsx";
import s from "./Cards.module.css";
import PagedSearch from "../PagedSearch/PagedSearch";

export function Cards() {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.filterProducts);

  //PAGED LOGIC =============================================
  let componentId = 1;
  const [page, setPage] = useState(1);
  const [pagePrev, setPageprev] = useState(1);
  const [pageNext, setPagenext] = useState(2);
  const [productsPage] = useState(9);
  const totalPage = page * productsPage;
  const firstPage = totalPage - productsPage;
  const productsList = products.slice(firstPage, totalPage);

  const paged = function (pageNumber, totPages) {
    setPage(pageNumber);
    let currentPage = parseInt(pageNumber);
    //Previus and Next Options
    if (currentPage > 1 && currentPage < totPages) {
      setPageprev(currentPage - 1);
      setPagenext(currentPage + 1);
    }
    if (currentPage === 1 && currentPage < totPages) {
      setPageprev(currentPage);
      setPagenext(currentPage + 1);
    }
    if (currentPage > 1 && currentPage === totPages) {
      setPageprev(currentPage - 1);
      setPagenext(currentPage);
    }
  };
  //===========================================================

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  //===========================================================

  const [search, setSearch] = useState("");

  const searcher = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const productSearch = !search
    ? productsList
    : products.filter((p) =>
        p.category.toLowerCase().includes(search.toLowerCase())
      );

  const productsList2 = productSearch.slice(firstPage, totalPage);
  //===========================================================
  return (
    <div>
      <div className={s.searchInput}>
        <input
          name="text"
          placeholder="     Buscar producto por Anime"
          type="text"
          value={search}
          onChange={searcher}
        />
      </div>
      <div className={s.wrapperContainer}>
        <div className={s.wrapper}>
          <Filter setPage={setPage} />
        </div>
        <div className={s.wrapper2}>
          {!productsList.length ? (
            <div className={s.textLoading}>
              <h2>"No Products to Show"</h2>
            </div>
          ) : search.length > 3 ? (
            productsList2.map((c) => {
              return (
                <div key={componentId++}>
                  <Card
                    key={c.id}
                    id={c.id}
                    image={c.images[0]}
                    name={c.name}
                    category={c.category}
                    price={c.price}
                  />
                </div>
              );
            })
          ) : (
            productsList.map((p) => (
              <div key={componentId++}>
                <Card
                  key={p.id}
                  id={p.id}
                  image={p.images[0]}
                  name={p.name}
                  category={p.category}
                  price={p.price}
                />
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        {search.length >= 3 ? (
          <div>
            <div>
              <PagedSearch
                productPage={productsPage}
                productList={productSearch.length}
                paged={paged}
                pagePrev={pagePrev}
                pageNext={pageNext}
              />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <Paged
                productPage={productsPage} // 9
                productList={products.length} //
                paged={paged}
                pagePrev={pagePrev}
                pageNext={pageNext}
                currentPage={page}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
