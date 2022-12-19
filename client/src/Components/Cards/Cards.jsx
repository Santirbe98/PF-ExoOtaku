import { React, useEffect, useState } from "react";
import { getProducts } from "../../Redux/Actions";
import { MediaCard } from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import Paged from "../Paged/Paged";
import { Filter } from "../Filter/Filter.jsx";
import s from "./Cards.module.css";
import PagedSearch from "../PagedSearch/PagedSearch";
//--------------------------------------------------------------//
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export const Cards = () => {
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
  const [order, setOrder] = useState("");
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
    <Box>
      {/* <Box className={s.searchInput}> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          placeholder="Busque por anime"
          color="warning"
          sx={{ width: "500px" }}
          style={{
            backgroundColor: "rgba(255, 253, 253, 0.900)",
            borderRadius: "10px",
          }}
          focused
          value={search}
          onChange={searcher}
        />
      </Box>
      <Box className={s.wrapperContainer}>
        <Box className={s.wrapper}>
          <Filter setPage={setPage} setOrder={setOrder} />
        </Box>
        <Box className={s.wrapper2}>
          {!productsList.length ? (
            <Box className={s.textLoading}>
              <h2>"No hay productos para mostrar"</h2>
            </Box>
          ) : search.length > 3 ? (
            productsList2.map((c) => {
              return (
                <Box key={componentId++}>
                  <MediaCard
                    key={c.id}
                    id={c.id}
                    image={c.images[0]}
                    name={c.name}
                    category={c.category}
                    price={c.price}
                  />
                </Box>
              );
            })
          ) : (
            productsList.map((p) => (
              <Box key={componentId++}>
                <MediaCard
                  key={p.id}
                  id={p.id}
                  image={p.images[0]}
                  name={p.name}
                  category={p.category}
                  price={p.price}
                />
              </Box>
            ))
          )}
        </Box>
      </Box>
      <Box>
        {search.length >= 3 ? (
          <Box>
            <Box>
              <PagedSearch
                productPage={productsPage}
                productList={productSearch.length}
                paged={paged}
                pagePrev={pagePrev}
                pageNext={pageNext}
                currentPage={page}
              />
            </Box>
          </Box>
        ) : (
          <Box>
            <Box>
              <Paged
                productPage={productsPage} // 9
                productList={products.length} //
                paged={paged}
                pagePrev={pagePrev}
                pageNext={pageNext}
                currentPage={page}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
