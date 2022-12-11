import { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProductDetail } from "../../Redux/Actions";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import s from "./Card.module.css";

export const MediaCard = ({ name, price, image, id, category }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  useEffect(() => {
    dispatch(getProductDetail(id)).then((res) => setProduct(res.payload));
  }, [dispatch, id]);
  return (
    <Card
      className={s.container}
      sx={{
        maxWidth: 320,
        margin: 2,
        backgroundColor: "rgb(33, 33, 33)",
      }}
    >
      <CardActionArea>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
          }}
          to={`/detail/${id}`}
        >
          <CardMedia component="img" height="250" image={image} alt="Product" />
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
