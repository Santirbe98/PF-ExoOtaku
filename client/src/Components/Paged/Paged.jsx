import { Button, Box } from "@mui/material";
import React from "react";
import s from "./Paged.module.css";

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
      {!pages ? (
        <></>
      ) : (
        <Box className={s.liPaged} sx={{ gap: "10px" }} pb={3} pt={2}>
          <Box>
            <Button
              onClick={() => paged(pagePrev, pages.length)}
              style={{ width: "50px" }}
              disabled={currentPage === 1 ? true : false}
              variant="contained"
              color="warning"
            >
              ←
            </Button>
          </Box>
          {pages.map((p) => (
            <li key={p}>
              <Button
                onClick={() => paged(p, pages.length)}
                variant="contained"
                color="warning"
              >
                {p}
              </Button>
            </li>
          ))}
          <Box>
            <Button
              onClick={() => paged(pageNext, pages.length)}
              style={{ width: "50px" }}
              disabled={currentPage === pages.length ? true : false}
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
};
export default Paged;
