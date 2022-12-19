import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

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

function createData(Producto, Precio, Cantidad, Talla) {
  return { Producto, Precio, Cantidad, Talla };
}

export default function BasicTable({ Products }) {
  let rows = [];
  for (let i = 0; i < Products.length; i++) {
    rows.push(
      createData(
        Products[i].product.name,
        Products[i].price,
        Products[i].quantity,
        Products[i].size
      )
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Producto</StyledTableCell>
            <StyledTableCell align="right"> Precio </StyledTableCell>
            <StyledTableCell align="right"> Cantidad </StyledTableCell>
            <StyledTableCell align="right"> Talla </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Producto}
              </TableCell>
              <TableCell align="right">{row.Precio}</TableCell>
              <TableCell align="right">{row.Cantidad}</TableCell>
              <TableCell align="right">{row.Talla}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
