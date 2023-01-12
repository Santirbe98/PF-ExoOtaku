import * as React from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Rating from "@mui/material/Rating";
import { createRank } from "../../Redux/Actions";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#464543",
    color: "white",
    "&:hover": {
      backgroundColor: "#f29d12 !important",
    },
  },
}));

function createData(orden, fecha, articulos, costo, delivery, total, products) {
  return {
    orden,
    fecha,
    articulos,
    costo,
    delivery,
    total,
    products,
  };
}

function Row(props) {
  const { row } = props;
  const { ranklist } = props;
  const { idcustomer } = props;
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  let product_id, customer_id, rank, comment;
  product_id = 0;
  customer_id = 0;
  rank = 0;
  comment = "";
  let paquete;
  paquete = {
    product_id: product_id,
    customer_id: customer_id,
    rank: rank,
    comment: comment,
  };
  let [review, setReview] = useState(paquete);

  //HANDLER REVIEWS
  let handlReview = (event) => {
    event.preventDefault();
    setReview((prev) => {
      const ReviewCreated = {
        ...prev,
        [event.target.name]: event.target.value,
      };
      return ReviewCreated;
    });
  };

  //HANDLER REVIEW BUTTON
  function handleCalificate(event, ProductId, idcustomer) {
    event.preventDefault();
    let PAC;
    PAC = {
      product_id: ProductId,
      customer_id: idcustomer,
      rank: Number(review.rank),
      comment: review.comment,
    };
    dispatch(createRank(PAC));
    // alert("Calificacion guardada con exito");
    Swal.fire({
      text: "Usted ha agregado un comentario con exito!",
      width: "30%",
      padding: "10px",
      allowEnterKey: true,
      imageUrl:
        "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/760/094/themes/common/logo-204180220-1664550124-6d7184aec833212b57e39d5f3bd0e32d1664550125.png?0",
      imageHeight: 200,
      imageWidth: 200,
      icon: "success",
      background: "black",
      color: "white",
      confirmButtonColor: "#00711a",
    }).then(() => {
      history.go("/acount");
    });
    //history.replaceState( {} , 'foo', '/foo' );
  }

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

        <StyledTableCell component="th" scope="row">
          {row.orden}
        </StyledTableCell>
        <StyledTableCell align="center">{row.fecha}</StyledTableCell>
        <StyledTableCell align="center">{row.articulos}</StyledTableCell>
        <StyledTableCell align="center">{row.costo}</StyledTableCell>
        <StyledTableCell align="center">{row.delivery}</StyledTableCell>
        <StyledTableCell align="center">{row.total}</StyledTableCell>
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
                    <TableCell align="center">Calificar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((productsRow) => (
                    <TableRow key={productsRow.producto}>
                      <TableCell component="th" scope="row">
                        <Link to={`/detail/${productsRow.id}`}>
                          <CardMedia
                            component="img"
                            height="80"
                            image={productsRow.imagen}
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

                      {/* VALIDATION OF PREVIUS RATNG TO THE PRODUCT TO RENDER THE ELEMENTS */}
                      {ranklist?.find(
                        (rankprod) => rankprod.product_id === productsRow.id
                      ) ? (
                        <TableCell align="center">
                          Producto Calificado
                        </TableCell>
                      ) : (
                        <>
                          <TableCell align="center">
                            <Rating
                              name="rank"
                              precision={1}
                              //value={review.rank}
                              onChange={handlReview}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              name="comment"
                              label="Comentarios"
                              style={{ width: 200 }}
                              fullWidth
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              //value={review.comment}
                              onChange={handlReview}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              href="#contained-buttons"
                              onClick={(event, ProductId, id_customer) =>
                                handleCalificate(
                                  event,
                                  productsRow.id,
                                  idcustomer
                                )
                              }
                            >
                              Calificar
                            </Button>
                          </TableCell>
                        </>
                      )}
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

Row.propTypes = {
  row: PropTypes.shape({
    orden: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    articulos: PropTypes.number.isRequired,
    costo: PropTypes.number.isRequired,
    delivery: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        imagen: PropTypes.string.isRequired,
        producto: PropTypes.string.isRequired,
        categoria: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        talla: PropTypes.string.isRequired,
        cantidad: PropTypes.number.isRequired,
        precio: PropTypes.number.isRequired,
      })
    ).isRequired,
    producto: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ Products, Ranklist, user }) {
  let rows = [];
  let delivery = user.address.valorEntrega;
  for (let i = 0; i < Products.length; i++) {
    rows.push(
      createData(
        Products[i].order,
        Products[i].date,
        Products[i].articles,
        Products[i].cost,
        delivery,
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

  return (
    <TableContainer component={Paper}>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Mis Ordenes de Compra
      </Typography>

      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Orden de Compra</StyledTableCell>
            <StyledTableCell align="center">Fecha</StyledTableCell>
            <StyledTableCell align="center">Articulos</StyledTableCell>
            <StyledTableCell align="center">Costo($)</StyledTableCell>
            <StyledTableCell align="center">Delivery($)</StyledTableCell>
            <StyledTableCell align="center">Total Orden($)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .map((row) => (
              <Row
                key={row.name}
                row={row}
                ranklist={Ranklist}
                idcustomer={user.id}
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
