import { Button, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!pages ? (
        <></>
      ) : (
        <>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "4px",
                }}
              >
                <Button
                  onClick={() => paged(pagePrev, pages.length)}
                  disabled={currentPage === 1 ? true : false}
                  variant="contained"
                  color="warning"
                >
                  ←
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={8}
              // style={{ flexDirection: "row" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "3px",
                }}
              >
                {pages.map((p) =>
                  p > currentPage - 3 && p < currentPage + 3 ? (
                    <Button
                      key={p}
                      onClick={() => paged(p, pages.length)}
                      variant="contained"
                      color="warning"
                      sx={{
                        margin: "3px",
                      }}
                    >
                      {p}
                    </Button>
                  ) : (
                    <></>
                  )
                )}
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} xl={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "4px",
                }}
              >
                <Button
                  onClick={() => paged(pageNext, pages.length)}
                  disabled={currentPage === pages.length ? true : false}
                  variant="contained"
                  color="warning"
                >
                  →
                </Button>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};
export default Paged;
