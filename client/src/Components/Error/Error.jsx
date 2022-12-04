import React from "react";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div>
      <h1>Error 404</h1>
      <Link to="/home">Return to home</Link>
    </div>
  );
};
