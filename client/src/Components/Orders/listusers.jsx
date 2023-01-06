import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useRef } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, ButtonBase } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllUsers, updateAdmin } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import sendEmailUserDedleted from "./emailuser";
import Swal from "sweetalert2";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  id,
  nombre,
  email,
  provincia,
  telefono,
  administrador,
  borrar
) {
  return { id, nombre, email, provincia, telefono, administrador, borrar };
}

export default function CustomizedTables({ users, handleDeleteUser }) {
  const dispatch = useDispatch();
  let rows = [];
  let checks = [];

  for (let i = 0; i < users.length; i++) {
    rows.push(
      createData(
        users[i].id,
        users[i].name,
        users[i].email,
        "Provicia",
        users[i].phone,
        users[i].isadmin,
        users[i].deleted
      )
    );
    checks.push(users[i].isadmin);
  }

  const [isChecked, setIsChecked] = React.useState(checks);
  console.log(isChecked);
  const toggleCheckboxValue = (index) => {
    setIsChecked(isChecked.map((v, i) => (i === index ? !v : v)));
  };

  const handleStatus = (e) => {
    Swal.fire({
      title: "Seguro quieres cambiar los permisos de este usuario?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          updateAdmin({ id: e.target.value, isadmin: e.target.checked })
        );
        dispatch(getAllUsers());
        Swal.fire("Permisos cambiados!", "", "success");
      } else if (result.isDenied) {
        return;
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Provincia</StyledTableCell>
            <StyledTableCell align="left">Teléfono</StyledTableCell>
            <StyledTableCell align="left">Administrador</StyledTableCell>
            <StyledTableCell align="left">Eliminar usuario </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row" key={row.id}>
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="left">{row.nombre}</StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">{row.provincia}</StyledTableCell>
              <StyledTableCell align="left">{row.telefono}</StyledTableCell>
              <StyledTableCell align="left">
                <Checkbox
                  {...label}
                  value={row.id}
                  checked={row.administrador}
                  onClick={(e) => {
                    Swal.fire({
                      title:
                        "Seguro quieres cambiar los permisos de este usuario?",
                      showDenyButton: true,
                      showCancelButton: false,
                      confirmButtonText: "Si",
                      denyButtonText: "No",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(
                          updateAdmin({
                            id: e.target.value,
                            isadmin: !row.administrador,
                          })
                        ).then(() => {
                          dispatch(getAllUsers());
                        });
                        Swal.fire("Permisos cambiados!", "", "success");
                      } else if (result.isDenied) {
                        return;
                      }
                    });
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="left">
                <Button
                  value={row.id}
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
                        handleDeleteUser(e.target.value);
                        Swal.fire("¡Usuario eliminado!", "", "success");
                      } else if (result.isDenied) {
                        return;
                      }
                    });
                    /*                     sendEmailUserDedleted({
                      email: row.email,
                      name: row.nombre,
                    }); */
                  }}
                  startIcon={<DeleteIcon />}
                >
                  Borrar
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
