import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllUsers, updateAdmin } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import emailjs from "@emailjs/browser";
import sendEmailUserDedleted from "./emailuser";

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
  }

  const handleStatus = (e) => {
    alert("Seguro quieres cambiar los permisos de este usuario?");
    dispatch(updateAdmin({ id: e.target.value, isadmin: e.target.checked }));
    alert("Permisos cambiados");
    dispatch(getAllUsers());
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
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
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
                  defaultChecked={row.administrador === true ? true : false}
                  onChange={handleStatus}
                />
              </StyledTableCell>
              <StyledTableCell align="left">
                <Button
                  value={row.id}
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    handleDeleteUser(row.id);
                    sendEmailUserDedleted({
                      email: row.email,
                      name: row.nombre,
                    });
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
