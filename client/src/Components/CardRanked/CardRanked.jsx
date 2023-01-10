import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import s from "./CardRanked.module.css";
import Rating from "@mui/material/Rating";

export const CardRanked = ({ name, image, id, r }) => {
  return (
    <Card
      className={s.container}
      sx={{
        width: 200,
        height: 350,
        margin: 2,
        backgroundColor: "rgb(33, 33, 33)",
        padding: 1,
        border: "1px solid black",
        borderRadius: "5px",
        opacity: 0.8,
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
            style={{
              borderRadius: "5px",
            }}
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
        <Rating
          key={id}
          id={id}
          name="disabled"
          defaultValue={r}
          readOnly
          // size="large"
        />
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
