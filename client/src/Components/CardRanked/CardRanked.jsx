import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import s from "./CardRanked.module.css";

export const CardRanked = ({ name, image, id }) => {
  return (
    <Card
      className={s.container}
      sx={{
        width: 200,
        height: 300,
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
          <CardMedia
            component="img"
            height="180"
            image={image.toString()}
            alt="Product"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="white">
              {name}
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
      ></Link>
    </Card>
  );
};
