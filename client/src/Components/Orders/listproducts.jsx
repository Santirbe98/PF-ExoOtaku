import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button, FormControl } from "@mui/material";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import CheckIcon from "@mui/icons-material/Check";
import { getProducts, updatePrice } from "../../Redux/Actions";
import { Validate } from "./Validate";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

function createData(id, nombre, descripcion, precio, stock, deleted) {
  return {
    id,
    nombre,
    descripcion,
    precio,
    stock,
    deleted,
  };
}

function Row(props) {
  const dispatch = useDispatch();
  const [errorsPrecio, setErrorsPrecio] = useState("");
  const [errorsStock, setErrorsStock] = useState("");
  const row = props.row;
  const handleDeleteProduct = props.handleDeleteProduct;
  const [open, setOpen] = React.useState(false);
  const prices = props.prices;
  const stock = props.stock;

  const [arrayPrices, setArrayPrices] = useState(prices);
  const [arrayStock, setArrayStocks] = useState(stock);

  const handleChangePrices = (index, newPrice) => {
    let newArr = [...arrayPrices];
    setErrorsPrecio(Validate(newPrice));
    newArr[index][index] = newPrice;
    setArrayPrices(newArr);
  };

  const handleChangeStock = (index, newStock) => {
    let newArrS = [...arrayStock];
    setErrorsStock(Validate(newStock));
    newArrS[index][index] = newStock;
    setArrayStocks(newArrS);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {/*         <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell> */}
        <StyledTableCell align="center" sx={{ paddingLeft: "4%" }}>
          {row.id}
        </StyledTableCell>
        <StyledTableCell align="center">{row.nombre}</StyledTableCell>
        <StyledTableCell align="center">{row.descripcion}</StyledTableCell>
        <StyledTableCell align="center">
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Precio
              </InputLabel>
              <OutlinedInput
                sx={{ maxWidth: 100 }}
                id="outlined-adornment-amount"
                value={arrayPrices[props.index][props.index]}
                name="precio"
                onChange={(e) => {
                  handleChangePrices(props.index, e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
              />
            </FormControl>

            <Button
              variant="contained"
              size="large"
              disabled={errorsPrecio ? true : false}
              onClick={(e) => {
                e.preventDefault();
                Swal.fire({
                  title: "¿Seguro que quieres modificar el precio?",
                  showDenyButton: true,
                  showCancelButton: false,
                  confirmButtonText: "Si",
                  denyButtonText: "No",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      updatePrice({
                        id: row.id,
                        newPrice: arrayPrices[props.index][props.index],
                      })
                    ).then(() => getProducts());
                    Swal.fire("Precio modificado", "", "success");
                  } else if (result.isDenied) {
                    let newArr = [...arrayPrices];
                    newArr[props.index][props.index] = row.precio;
                    setArrayPrices(newArr);
                    return;
                  }
                });
              }}
            >
              <CheckIcon />
            </Button>
          </Box>
          <Box>
            {errorsPrecio && (
              <Typography sx={{ color: "red" }}>{errorsPrecio}</Typography>
            )}
          </Box>
        </StyledTableCell>
        {/* Para el stock */}
        <StyledTableCell align="center">
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Stock</InputLabel>
              <OutlinedInput
                sx={{ maxWidth: 100 }}
                id="outlined-adornment-amount"
                value={arrayStock[props.index][props.index]}
                name="stock"
                onChange={(e) => {
                  e.preventDefault();
                  handleChangeStock(props.index, e.target.value);
                }}
                label="Stock"
              />
            </FormControl>
            <Button
              variant="contained"
              size="large"
              disabled={errorsStock ? true : false}
              onClick={(e) => {
                e.preventDefault();
                Swal.fire({
                  title: "¿Seguro que quieres modificar el stock?",
                  showDenyButton: true,
                  showCancelButton: false,
                  confirmButtonText: "Si",
                  denyButtonText: "No",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      updatePrice({
                        id: row.id,
                        newStock: arrayStock[props.index][props.index],
                      })
                    ).then(() => getProducts());
                    Swal.fire("Precio modificado", "", "success");
                  } else if (result.isDenied) {
                    let newArr3 = [...arrayStock];
                    newArr3[props.index][props.index] = row.stock;
                    setArrayStocks(newArr3);
                    return;
                  }
                });
              }}
            >
              <CheckIcon />
            </Button>
          </Box>
          <Box>
            {errorsStock && (
              <Typography sx={{ color: "red" }}>{errorsStock}</Typography>
            )}
          </Box>
        </StyledTableCell>
        <StyledTableCell align="center">
          <Button
            value={row.id}
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              Swal.fire({
                title: "¿Seguro que quieres eliminar este producto?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Si",
                denyButtonText: "No",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDeleteProduct(row.id);
                  Swal.fire("Producto eliminado", "", "success");
                } else if (result.isDenied) {
                  return;
                }
              });
            }}
            startIcon={<DeleteIcon />}
          >
            Borrar
          </Button>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTableProducts({
  Products,
  handleDeleteProduct,
}) {
  let rows = [];
  let prices = [];
  let stock = [];
  for (let i = 0; i < Products.length; i++) {
    rows.push(
      createData(
        Products[i].id,
        Products[i].name,
        Products[i].description,
        Products[i].price,
        Products[i].stock,
        Products[i].deleted
      )
    );
    let A = {};
    let B = {};
    A[i] = Products[i].price;
    B[i] = Products[i].stock;
    prices.push(A);
    stock.push(B);
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" sx={{ paddingLeft: "4%" }}>
              ID
            </StyledTableCell>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Descripción</StyledTableCell>
            <StyledTableCell align="center">Precio</StyledTableCell>
            <StyledTableCell align="center">Stock</StyledTableCell>
            <StyledTableCell align="center">Borrar producto</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .map((row, index) => (
              <Row
                key={Math.random()}
                row={row}
                index={index}
                handleDeleteProduct={handleDeleteProduct}
                prices={prices}
                stock={stock}
              />
            ))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
