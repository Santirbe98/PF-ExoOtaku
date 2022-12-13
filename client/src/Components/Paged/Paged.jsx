import { Button, Box } from "@mui/material";
import React from "react";
import s from "./Paged.module.css";

export default function Paged(
  // {
  //   productPage,
  //   productList,
  //   paged,
  //   pagePrev,
  //   pageNext,
  //   currentPage,
  // })
  {
    nPage,
    currentPage,
    setCurrentPage,
    setMaxPageLimit,
    setMinPageLimit,
    maxPageLimit,
    minPageLimit,
  }
) {
  const pages = [];
  for (let i = 1; i <= nPage; i++) {
    pages.push(i);
  }
  const pageNumberLimit = 5;

  const nexPage = () => {
    if (currentPage < nPage) {
      if (currentPage + 1 > maxPageLimit) {
        setMaxPageLimit(maxPageLimit + pageNumberLimit);
        setMinPageLimit(minPageLimit + pageNumberLimit);
      }
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > pages[0]) {
      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageLimit(maxPageLimit - pageNumberLimit);
        setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage(currentPage - 1);
    }
  };
  // page ellipses TODO
let pageIncrementEllipses = null;
if(pages.length > maxPageLimit){
    pageIncrementEllipses =  <li onClick={nexPage}>&hellip;</li>
}
let pageDecremenEllipses = null;
if(minPageLimit >=1){
    pageDecremenEllipses =  <li onClick={prevPage}>&hellip;</li>
}
  return (
    <Box>
      {!pages ? (
        <></>
      ) : (
        <Box className={s.liPaged} sx={{ gap: "10px" }} pb={3} pt={2}>
          <Box>
            <Button
              onClick = { prevPage }
              style={{ width: "50px" }}
              // disabled={currentPage === 1 ? true : false}
              disabled={currentPage === pages[0]}
              variant="contained"
              color="warning"
            >
              ←
            </Button>
          </Box>
          {/* {pages.map((p) => (
            <li key={p}>
              <Button
                onClick={() => paged(p, pages.length)}
                variant="contained"
                color="warning"
              >
                {p}
              </Button>
            </li>
          ))} */}
    
          <div variant="contained" color="warning">
            {pageDecremenEllipses}
          </div>
          {maxPageLimit &&
            pages.map((p) => {
              if (p <= maxPageLimit && p > minPageLimit) {
                return (
                  <Box>
                  <Button
                    variant="contained"
                    color="warning"
                    key={p}
                    onClick={() => setCurrentPage(p)}
                  >
                    <>{p}</>
                  </Button>
          </Box>
                );
              }
            })}
          <div variant="contained" color="warning">
            {pageIncrementEllipses}
          </div>
          <Box>
            <Button
              // onClick={() => paged(pageNext, pages.length)}
              onClick={nexPage}
              style={{ width: "50px" }}
              // disabled={currentPage === pages.length ? true : false}
              disabled={currentPage === pages[pages.length - 1]}
              variant="contained"
              color="warning"
            >
              →
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
