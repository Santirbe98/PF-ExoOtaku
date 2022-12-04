import React from "react";
import { SearchBar } from "../SearchBar/SearchBar.jsx";
import { Link } from "react-router-dom"
import { Filter } from "../Filter/Filter";
import "./NavBar.css"


export const NavBar = () => {
  return (
    <div className="divSection">
      <section>
        <img alt="no found" />
      </section>
      <section>
        <SearchBar />
      </section>
      <section>
        <Link to="/home">
          <button> Home</button>
        </Link>
      </section>
      <section>
        <Link to="/about">
          <button> About</button>
        </Link>
      </section>
      <section>
        <Link to="/shop">
          <button> Shop</button>
        </Link>
      </section>
      <section>
        <Link to="/help">
          <button> Help</button>
        </Link>
      </section>
      <section>
        <button>Your Cart</button>
      </section>
            <Filter />
    </div>

  );
};
