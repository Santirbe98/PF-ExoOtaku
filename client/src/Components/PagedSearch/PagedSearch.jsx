import { Box, Button } from "@mui/material";
import React from "react";
import s from "./PagedSearch.module.css";

const Paged = ({
  productPage,
  productList,
  paged,
  pagePrev,
  pageNext,
  currentPage,
}) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(productList / productPage); i++) {
    pages.push(i);
  }

  return (
    <Box>
      {pages.length <= 1 ? (
        <></>
      ) : (
        <Box className={s.liPaged} sx={{ gap: "10px" }} pb={3} pt={2}>
          <Box>
            <Button
              color="warning"
              onClick={() => paged(pagePrev, pages.length)}
              style={{ width: "50px" }}
              disabled={currentPage === 1 ? true : false}
              variant="contained"
            >
              ←
            </Button>
          </Box>
          {pages.map((p) => (
            <Box key={p}>
              <Button
                color="warning"
                variant="contained"
                onClick={() => paged(p, pages.length)}
              >
                {p}
              </Button>
            </Box>
          ))}
          <Box>
            <Button
              color="warning"
              onClick={() => paged(pageNext, pages.length)}
              style={{ width: "50px" }}
              variant="contained"
              disabled={currentPage === pages.length ? true : false}
            >
              →
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default Paged;
