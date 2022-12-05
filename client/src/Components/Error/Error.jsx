import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export const Error = () => {
  return (
    <div>
      <h1>Error 404</h1>
      <Link to="/home">
        <Button variant="outlined">Back...</Button>
      </Link>
    </div>
  );
};
