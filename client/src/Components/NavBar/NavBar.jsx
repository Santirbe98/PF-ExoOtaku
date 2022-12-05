import React from "react";
import { Link } from "react-router-dom";
import { Filter } from "../Filter/Filter";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <div className="divSection">
      <section>
        <img
          src="http://d3ugyf2ht6aenh.cloudfront.net/stores/001/760/094/themes/common/logo-204180220-1664550124-6d7184aec833212b57e39d5f3bd0e32d1664550125.png?0"
          width="200px"
        />
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
