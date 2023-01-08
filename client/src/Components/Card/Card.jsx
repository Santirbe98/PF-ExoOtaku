import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import s from "./Card.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addWishList } from "../../Redux/Actions";

export const MediaCard = ({ name, price, image, id, category }) => {
  const customerId = useSelector((state) => state.chk_customer.id);
  const dispatch = useDispatch();
  const handleAlert = (input) => {
    if (document.getElementById(`${input}`).style.color === "white") {
      Swal.fire({
        text: "Estas seguro que deseas agregar este item a Favoritos?",
        width: "30%",
        padding: "10px",
        allowEnterKey: true,
        allowEscapeKey: true,
        icon: "question",
        background: "black",
        showCancelButton: true,
        confirmButtonColor: "#00711a",
        cancelButtonColor: "#b50707",
        confirmButtonText: "Si, agregalo!",
      }).then((response) => {
        if (response.isConfirmed) {
          document.getElementById(`${input}`).style.color = "red";
          dispatch(addWishList({ id: customerId, wishList: id }));
        }
      });
    } else {
      Swal.fire({
        text: "Estas seguro que deseas quitar este item de Favoritos?",
        width: "30%",
        padding: "10px",
        allowEnterKey: true,
        allowEscapeKey: true,
        icon: "warning",
        background: "black",
        showCancelButton: true,
        confirmButtonColor: "#00711a",
        cancelButtonColor: "#b50707",
        confirmButtonText: "Si, quitalo!",
      }).then((response) => {
        if (response.isConfirmed) {
          document.getElementById(`${input}`).style.color = "white";
        }
      });
    }
  };

  return (
    <Card
      className={s.container}
      sx={{
        width: 300,
        height: 450,
        margin: 2,
        backgroundColor: "rgb(33, 33, 33)",
        padding: 1,
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      <CardActionArea>
        <FavoriteIcon
          id={id}
          style={{ color: "white", position: "absolute", right: 1 }}
          onClick={() => handleAlert(id)}
        ></FavoriteIcon>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
          }}
          to={`/detail/${id}`}
        >
          <CardMedia
            style={{
              borderRadius: "5px",
            }}
            component="img"
            height="250"
            image={image.toString()}
            alt="Product"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="white">
              {name}
            </Typography>
            <Typography variant="h4" color="white">
              $ {price}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <Link
        to={`/detail/${id}`}
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <Button variant="contained" color="success" sx={{ marginBottom: 4 }}>
          <LocalGroceryStoreRoundedIcon />
        </Button>
      </Link>
    </Card>
  );
};
