import { Button, Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import CollapsibleTable from "./listorders";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteOrder,
  deleteUser,
  getAllUsers,
  getProducts,
  deleteProduct,
} from "../../Redux/Actions";
import { getAllOrders } from "../../Redux/Actions";
import { CircularProgress } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Error } from "../Error/Error";
import CollapsibleTableUsers from "./listUsers2";
import CollapsibleTableProducts from "./listproducts";
import { Link } from "react-router-dom";

const Orders = () => {
  const { user, isAuthenticated } = useAuth0();
  const UserValidate = useSelector((state) => state.chk_customer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const handleChange = (event) => {
    setStatus(event.target.value);
    dispatch(getAllOrders(event.target.value)).then((orders) =>
      setOrders(orders.payload)
    );
  };

  useEffect(() => {
    dispatch(getAllUsers()).then((data) => {
      setUsers(data.payload);
    });
    dispatch(getAllOrders()).then((data) => {
      setOrders(data.payload);
    });
    dispatch(getProducts()).then((data) => {
      setProducts(data.payload);
    });
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id)).then(() => {
      dispatch(getAllUsers()).then((data) => {
        setUsers(data.payload);
      });
    });
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id)).then(() => {
      dispatch(getProducts()).then((data) => {
        setProducts(data.payload);
      });
    });
  };

  const handleClick = (id) => {
    dispatch(deleteOrder(id)).then(() => {
      dispatch(getAllOrders()).then((data) => {
        setOrders(data.payload);
      });
    });
  };

  const handleClean = (event) => {
    setStatus("");
    dispatch(getAllOrders()).then((orders) => {
      setOrders(orders.payload);
    });
  };

  return (
    <div>
      {isAuthenticated && UserValidate.isadmin === true ? (
        <div>
          <Typography variant="h4"> Panel de administrador </Typography>

          <Typography variant="h5">
            Lista de órdenes: filtra tus órdenes por estado y modifica el estado
            de cada orden
          </Typography>

          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ padding: "1%" }}></Box>

            <Box sx={{ padding: "1%" }}>
              <FormControl
                sx={{
                  color: "white",
                  bgcolor: "white",
                  minWidth: 220,

                  "& .MuiFormControl-root.Mui-enabled": {
                    "& > fieldset": { border: "1px solid green" },
                  },
                }}
              >
                <InputLabel id="demo-simple-select-label"> Estado </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={"paid"} sx={{ width: "100%" }}>
                    Pago
                  </MenuItem>
                  <MenuItem value={"procesando"} sx={{ width: "100%" }}>
                    Procesando
                  </MenuItem>
                  <MenuItem value={"completada"} sx={{ width: "100%" }}>
                    Completada
                  </MenuItem>
                  <MenuItem value={"cancelada"} sx={{ width: "100%" }}>
                    Cancelada
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ translate: "0vw 1.5vw" }}>
              <Button
                onClick={handleClean}
                variant="contained"
                color="primary"
                size="large"
              >
                Limpiar filtro
              </Button>
            </Box>
          </Box>

          <Box sx={{ padding: "2%" }}>
            {loading === false ? (
              <CollapsibleTable
                Products={orders}
                loading={loading}
                handleClick={handleClick}
              />
            ) : (
              <>
                <Typography> Cargando órdenes </Typography>
                <Box>
                  <CircularProgress color="secondary" />
                </Box>
              </>
            )}
          </Box>

          <Typography variant="h5">
            Lista de usuarios: controla el estado y permisos de cada usuario
          </Typography>
          {loading === false ? (
            <Box sx={{ padding: "2%" }}>
              <CollapsibleTableUsers
                users={users}
                loading={loading}
                handleDeleteUser={handleDeleteUser}
              />
            </Box>
          ) : (
            <>
              <Typography> Cargando usuarios </Typography>
              <Box>
                <CircularProgress color="secondary" />
              </Box>
            </>
          )}
          <Box
            sx={{
              display: "block",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              Lista de Productos: controla cantidad y precio de cada ítem.
              Puedes crear un nuevo producto en
            </Typography>

            <Box sx={{ paddingTop: "2%" }}>
              <Link to="/form" style={{ textDecoration: "none" }}>
                <Button
                  onClick={handleClean}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Crear producto
                </Button>
              </Link>
            </Box>
          </Box>

          {loading === false ? (
            <Box sx={{ padding: "2%" }}>
              <CollapsibleTableProducts
                Products={products}
                loading={loading}
                handleDeleteProduct={handleDeleteProduct}
              />
            </Box>
          ) : (
            <>
              <Typography> Cargando productos </Typography>
              <Box>
                <CircularProgress color="secondary" />
              </Box>
            </>
          )}
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default Orders;
