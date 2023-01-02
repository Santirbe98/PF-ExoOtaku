import { Button, Typography } from "@mui/material";
import React from "react";
import { NavBar } from "../NavBar/NavBar";
import { Box } from "@mui/system";
import CollapsibleTable from "./listorders";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteOrder, deleteUser, getAllUsers } from "../../Redux/Actions";
import { getAllOrders } from "../../Redux/Actions";
import { CircularProgress } from "@material-ui/core";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CustomizedTables from "./listusers";
import Profile from "../Authenticate/Profile2";

const Orders = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState([]);
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
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [dispatch]);

  const handleClick = (id) => {
    alert("seguro que quiere borrar la orden?");
    dispatch(deleteOrder(id));
    alert("orden borrada");
    dispatch(getAllOrders()).then((data) => {
      setOrders(data.payload);
    });
  };

  const handleDeleteUser = (id) => {
    alert("¿Seguro que quiere borrar este usuario?");
    dispatch(deleteUser(id));
    alert("Usuario Borrado");
    dispatch(getAllUsers()).then((data) => {
      setUsers(data.payload);
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
      <NavBar />

      <Typography variant="h4"> Panel de administrador </Typography>

      <Typography variant="h5">
        {" "}
        Lista de órdenes: filtra tus órdenes por estado{" "}
      </Typography>

      <Box
        sx={{ display: "flex", textAlign: "center", justifyContent: "center" }}
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
              <MenuItem value={"paid"}> Pago </MenuItem>
              <MenuItem value={"procesando"}> Procesando </MenuItem>
              <MenuItem value={"completada"}> Completada </MenuItem>
              <MenuItem value={"cancelada"}> Cancelada </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ translate: "0vw 1.5vw" }}>
          <Button onClick={handleClean} variant="outlined" size="large">
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
        {" "}
        Lista de usuarios: controla el estado y datos de cada usuario{" "}
      </Typography>
      {loading === false ? (
        <Box sx={{ padding: "2%" }}>
          <CustomizedTables users={users} handleDeleteUser={handleDeleteUser} />
        </Box>
      ) : (
        <>
          <Typography> Cargando usuarios </Typography>
          <Box>
            <CircularProgress color="secondary" />
          </Box>
        </>
      )}
    </div>
  );
};

export default Orders;
