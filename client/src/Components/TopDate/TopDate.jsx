import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { CardRanked } from "../CardRanked/CardRanked";
import s from "./TopDate.module.css";

export const TopDate = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);
  const stateProductsDate = useSelector((state) => state.orderByDate);
  const newFiveProducts = stateProductsDate.sort(function (a, b) {
    return a.id - b.id;
  });
  const topFive = newFiveProducts.reverse().slice(0, 5);

  return (
    <Box>
      {!topFive.length ? (
        <Box width={700} padding={15}>
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
          {topFive.map((c) => {
            return (
              <Box
                key={c.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardRanked
                  key={c.id}
                  id={c.id}
                  image={c.images}
                  name={
                    c.name.length >= 22
                      ? `${c.name.substring(0, 18)}...`
                      : c.name
                  }
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
