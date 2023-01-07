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
import DeleteIcon from "@mui/icons-material/Delete";
import sendEmailOrder from "./emailorder";
import Swal from "sweetalert2";
import { updateAdmin, getAllUsers } from "../../Redux/Actions";
import { Checkbox } from "@mui/material";
import { useAuth0, User } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

function createData(
  id,
  nombre,
  email,
  provincia,
  telefono,
  administrador,
  comuna,
  direccionCompra,
  direccionPago
) {
  return {
    id,
    nombre,
    email,
    provincia,
    telefono,
    administrador,
    comuna,
    direccionCompra,
    direccionPago,
  };
}

function Row(props) {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  let checks = props.checks;
  const rows = props.rows;
  const [isChecked, setIsChecked] = React.useState(checks);
  const handleDeleteUser = props.handleDeleteUser;
  const [open, setOpen] = React.useState(false);

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
        <StyledTableCell align="center">{rows.nombre}</StyledTableCell>
        <StyledTableCell align="center">{rows.email}</StyledTableCell>
        <StyledTableCell align="center">{rows.provincia}</StyledTableCell>
        <StyledTableCell align="center">{rows.telefono}</StyledTableCell>
        <StyledTableCell align="center">
          <Checkbox
            {...label}
            value={rows.id}
            checked={isChecked[props.index][props.index]}
            disabled={rows.email === user.email ? true : false}
            onClick={(e) => {
              Swal.fire({
                title: "Seguro quieres cambiar los permisos de este usuario?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Si",
                denyButtonText: "No",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(
                    updateAdmin({
                      id: e.target.value,
                      isadmin: !isChecked[props.index][props.index],
                    })
                  ).then(() => {
                    dispatch(getAllUsers());
                  });
                  Swal.fire("Permisos cambiados!", "", "success");

                  let newArr = [...isChecked];
                  newArr[props.index][props.index] =
                    !isChecked[props.index][props.index];
                  setIsChecked(newArr);
                } else if (result.isDenied) {
                  let newArr = [...isChecked];
                  setIsChecked(newArr);
                  return;
                }
              });
            }}
          />
        </StyledTableCell>
        <StyledTableCell align="left">
          <Button
            value={rows.id}
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              Swal.fire({
                title: "¿Seguro que quieres eliminar este usuario?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Si",
                denyButtonText: "No",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDeleteUser(rows.id);
                  Swal.fire("¡Usuario eliminado!", "", "success");
                  /*                     sendEmailUserDedleted({
                      email: row.email,
                      name: row.nombre,
                    }); */
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
              <Typography
                variant="h6"
                align="left"
                gutterBottom
                component="div"
              >
                Direcciones
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Comuna</TableCell>
                    <TableCell align="center">Dirección de compra</TableCell>
                    <TableCell align="center">Dirección de entrega</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    /* key={productsRow.producto} */ key={Math.random()}
                  >
                    <TableCell align="center">{rows.comuna}</TableCell>
                    <TableCell align="center">{rows.direccionCompra}</TableCell>
                    <TableCell align="center">{rows.direccionPago}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTableUsers({ users, handleDeleteUser }) {
  let rows = [];
  let checks = [];

  for (let i = 0; i < users.length; i++) {
    rows.push(
      createData(
        users[i].id,
        users[i].name,
        users[i].email,
        "Provincia",
        users[i].phone,
        users[i].isadmin,
        users[i].comuna,
        users[i].shipping_address,
        users[i].billing_address
      )
    );
    let A = {};
    A[i] = users[i].isadmin;
    checks.push(A);
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
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center"> Email </StyledTableCell>
            <StyledTableCell align="center"> Provicia </StyledTableCell>
            <StyledTableCell align="center"> Teléfono </StyledTableCell>
            <StyledTableCell align="center"> Administrador </StyledTableCell>

            <StyledTableCell align="center">Eliminar Usuario</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .map((row, index) => (
              <Row
                key={Math.random()}
                rows={row}
                checks={checks}
                index={index}
                handleDeleteUser={handleDeleteUser}
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
