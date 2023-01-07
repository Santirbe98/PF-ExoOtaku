import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { getAllOrders, modifyStatusORder } from "../../Redux/Actions";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputLabel } from "@mui/material";
import sendEmailOrder from "./emailorder";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

function createData(
  id,
  orden,
  estado,
  usuario,
  email,
  fecha,
  articulos,
  costo,
  delivery,
  total,
  products
) {
  return {
    id,
    orden,
    estado,
    usuario,
    email,
    fecha,
    articulos,
    costo,
    delivery,
    total,
    products,
  };
}

function Row(props) {
  const dispatch = useDispatch();

  const rows = props.rows;
  const handleClick = props.handleClick;
  const [open, setOpen] = React.useState(false);
  const [status, setEstado] = React.useState("");
  let id = rows.id;

  const handleChange2 = (e) => {
    Swal.fire({
      title: "¿Seguro que quieres modificar el estado?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        let state = e.target.value;
        setEstado(e.target.value);
        dispatch(modifyStatusORder({ id, state }));
        dispatch(getAllOrders());
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        return;
      }
    });

    if (e.target.value.includes("Completada")) {
      console.log(e.target.value);
    }
  };

  const consoleStatus = (e) => {
    console.log(e.target.value);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="center">{rows.id}</StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {rows.orden}
        </StyledTableCell>
        <StyledTableCell align="center">
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {rows.estado === "paid" ? "Pago" : rows.estado}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Estado"
                onChange={(e) => {
                  handleChange2(e);
                  if (e.target.value === "Completada") {
                    /* sendEmailOrder({
                      email: rows.email,
                      name: rows.usuario,
                      paymentId: rows.orden,
                    }) */
                  }
                }}
              >
                <MenuItem value={"paid"} sx={{ width: "100%" }}>
                  Pago
                </MenuItem>
                <MenuItem value={"Procesando"} sx={{ width: "100%" }}>
                  Procesando
                </MenuItem>
                <MenuItem value={"completada"} sx={{ width: "100%" }}>
                  Completada
                </MenuItem>
                <MenuItem value={"Cancelada"} sx={{ width: "100%" }}>
                  Cancelada
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </StyledTableCell>
        <StyledTableCell align="center">{rows.usuario}</StyledTableCell>
        <StyledTableCell align="center">{rows.email}</StyledTableCell>
        <StyledTableCell align="center">{rows.fecha}</StyledTableCell>
        <StyledTableCell align="center">{rows.articulos}</StyledTableCell>
        <StyledTableCell align="center">{rows.costo / 100}</StyledTableCell>
        <StyledTableCell align="center">{rows.delivery}</StyledTableCell>
        <StyledTableCell align="center">{rows.total}</StyledTableCell>
        <StyledTableCell align="center">
          <Button
            value={rows.id}
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              Swal.fire({
                title: "¿Seguro que quieres eliminar la orden?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Si",
                denyButtonText: "No",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleClick(e.target.value);
                  Swal.fire("Orden eliminada", "", "success");
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

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Lista de Productos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Imagen</TableCell>
                    <TableCell align="center">Producto</TableCell>
                    <TableCell align="center">Categoria</TableCell>
                    <TableCell align="center">Color</TableCell>
                    <TableCell align="center">Talla</TableCell>
                    <TableCell align="center">Cantidad</TableCell>
                    <TableCell align="center">Precio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.products.map((productsRow) => (
                    <TableRow
                      /* key={productsRow.producto} */ key={Math.random()}
                    >
                      <TableCell component="th" scope="row">
                        <Link to={`/detail/${productsRow.id}`}>
                          <CardMedia
                            component="img"
                            height="80"
                            image={productsRow.imagen[0]}
                            alt="Product"
                          />
                        </Link>
                      </TableCell>
                      <TableCell>{productsRow.producto}</TableCell>
                      <TableCell align="center">
                        {productsRow.categoria}
                      </TableCell>
                      <TableCell align="center">{productsRow.color}</TableCell>
                      <TableCell align="center">{productsRow.talla}</TableCell>
                      <TableCell align="center">
                        {productsRow.cantidad}
                      </TableCell>
                      <TableCell align="center">{productsRow.precio}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ Products, handleClick }) {
  let rows = [];
  for (let i = 0; i < Products.length; i++) {
    rows.push(
      createData(
        Products[i].order_id,
        Products[i].order,
        Products[i].status,
        Products[i].user,
        Products[i].email,
        Products[i].date,
        Products[i].articles,
        Products[i].cost,
        20,
        Products[i].total,
        Products[i].products
      )
    );
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
            <StyledTableCell />

            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">
              {" "}
              Payment Id (Stripe){" "}
            </StyledTableCell>
            <StyledTableCell align="center"> Estado </StyledTableCell>
            <StyledTableCell align="center"> Usuario </StyledTableCell>
            <StyledTableCell align="center"> Email </StyledTableCell>
            <StyledTableCell align="center">Fecha</StyledTableCell>
            <StyledTableCell align="center">Articulos</StyledTableCell>
            <StyledTableCell align="center">Costo($)</StyledTableCell>
            <StyledTableCell align="center">Delivery($)</StyledTableCell>
            <StyledTableCell align="center">Total Orden($)</StyledTableCell>
            <StyledTableCell align="center">Borrar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .map((row) => (
              <Row key={Math.random()} rows={row} handleClick={handleClick} />
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
