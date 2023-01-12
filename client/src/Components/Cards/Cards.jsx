import { React, useEffect, useState } from "react";
import { getProducts } from "../../Redux/Actions";
import { MediaCard } from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import Paged from "../Paged/Paged";
import { Filter } from "../Filter/Filter.jsx";
import s from "./Cards.module.css";
import PagedSearch from "../PagedSearch/PagedSearch";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CircularProgress } from "@mui/material";
//--------------------------------------------------------------//

export const Cards = () => {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.filterProducts);

  //=============================================
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

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
console.log(order)
  const productSearch = !search
    ? productsList
    : products.filter((p) => {
        const regex = new RegExp(search, "gi");
        return p.category.match(regex) || p.name.match(regex);
      });

  const productsList2 = productSearch.slice(firstPage, totalPage);
  //===========================================================
  return (
    <Box minHeight="100vh">
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "0px 10px 0px 10px",
            }}
          >
            <TextField
              placeholder="Busque por Anime o Nombre"
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
        </Grid>
      </Grid>
      <Grid container pt={5}>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <Filter setPage={setPage} setOrder={setOrder} />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={9}
          xl={9}
          className={`${
            width <= 800
              ? s.sx
              : width < 1300
              ? s.md
              : width >= 1300
              ? s.lg
              : null
          }`}
        >
          {!productSearch.length ? (
            <Box width={800} textAling="center" paddingLeft={15}>
              <h2>"No hay productos para mostrar intenta otra busqueda"</h2>
            </Box>
          ) : search.length > 2 ? (
            productsList2.map((c) => {
              return (
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MediaCard
                    key={c.id}
                    id={c.id}
                    image={c.images}
                    name={c.name.length >=22 ?`${c.name.substring(0, 18)}...`:c.name}
                    category={c.category}
                    price={c.price}
                  />
                </Box>
              );
            })
          ) : (
            productsList.map((p) => (
              <Box
                key={componentId++}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MediaCard
                  key={p.id}
                  id={p.id}
                  image={p.images}
                  name={p.name.substring(0, 25)}
                  category={p.category}
                  price={p.price}
                />
              </Box>
            ))
          )}
        </Grid>
      </Grid>

      <Box>
        {search.length >= 3 ? (
          <PagedSearch
            productPage={productsPage}
            productList={productSearch.length}
            paged={paged}
            pagePrev={pagePrev}
            pageNext={pageNext}
            currentPage={page}
          />
        ) : (
          <Paged
            productPage={productsPage} // 9
            productList={products.length} //
            paged={paged}
            pagePrev={pagePrev}
            pageNext={pageNext}
            currentPage={page}
          />
        )}
      </Box>
    </Box>
  );
};
