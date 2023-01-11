import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { CardRanked } from "../CardRanked/CardRanked";
import s from "./TopRanked.module.css";

export const TopRanked = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);
  const stateProductsRanked = useSelector((state) => state.orderByRank);
  const topFiveProducts = stateProductsRanked.slice(0, 5);

  return (
    <Box>
      {!topFiveProducts.length ? (
        <Box width={500} padding={15}>
          <CircularProgress color="warning" />
        </Box>
      ) : (
        <></>
      )}

      <Grid container pt={5}>
        <Grid
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
          {topFiveProducts.length !== 0 &&
            topFiveProducts.map((c) => {
              return (
                <Box
                  key={c.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardRanked
                    key={c.id}
                    id={c.id}
                    image={c.images}
                    name={c.name.length >=22 ?`${c.name.substring(0, 18)}...`:c.name}
                    r={c.r}
                  />
                </Box>
              );
            })}
        </Grid>
      </Grid>
    </Box>
  );
};
