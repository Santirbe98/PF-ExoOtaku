import React from "react";
import { useContext } from "react";
import { PayButton } from "../Payment/PayButton.jsx";
import { CartContext } from "./CartContext";
import styles from "./CartItem.module.css";
import { Button, Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useSelector } from "react-redux";
import Profile2 from "../Authenticate/Profile2";

export default function CartBanner({ userId }) {
  const UserValidate = useSelector((state) => state.chk_customer);
  console.log(UserValidate);
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { cartItems, addItemToCart, deleteItemToCart, cleanCart } =
    useContext(CartContext);
  console.log(cartItems);

  const TAX_RATE = 0.21;

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  function subtotal() {
    return cartItems.reduce(
      (previous, current) => previous + current.amount * current.price,
      0
    );
  }

  const invoiceSubtotal = subtotal();
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", maxWidth: "95%" }}>
        <TableContainer sx={{ marginLeft: 40 }} component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  Detalles
                </TableCell>
                <TableCell align="right">Precio</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="left">Descripcion</TableCell>
                <TableCell align="left">Talla</TableCell>
                <TableCell align="center">Color</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Unidad</TableCell>
                <TableCell align="right">Suma</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((row) => (
                <TableRow key={row.desc}>
                  <TableCell align="right">
                    <img
                      className={styles.imgs}
                      src={row.images}
                      alt={row.name}
                    />
                  </TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">{row.size}</TableCell>
                  <TableCell align="center">{row.color}</TableCell>
                  <TableCell align="right">
                    <ChevronLeftRoundedIcon
                      onClick={() => deleteItemToCart(row)}
                    />
                    {row.amount}
                    <ChevronRightRoundedIcon
                      onClick={() => addItemToCart(row)}
                    />
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(row.price * row.amount)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>I.V.A</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                <TableCell align="right">
                  <Box>
                    <Link
                      to="/home"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Button variant="contained" color="success">
                        Seguir comprando
                      </Button>
                    </Link>
                  </Box>
                </TableCell>
                <TableCell colSpan={2}>
                  {isAuthenticated ? (
                   Object.keys(UserValidate).length > 0 ? (
                      <PayButton
                        cartItems={cartItems}
                        userId={UserValidate.id}
                        name={UserValidate.name}
                        email={UserValidate.email}
                        priceSent={ Math.ceil(UserValidate.address.valorEntrega) }
                      />
                    ) : (
                      <Profile2 />
                    )
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => loginWithRedirect()}
                    >
                      Iniciar sesion
                    </Button>
                  )}
                </TableCell>
                <Button variant="contained" color="success" onClick={cleanCart}>
                  Borrar historial
                </Button>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
