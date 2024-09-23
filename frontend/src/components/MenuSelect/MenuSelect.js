import React from "react";
import { NavLink } from "react-router-dom";

import "./MenuSelect.css";

export default function MenuSelect() {
  return (
    <section className="menu-select-container">
      <NavLink
        activeClassName="active"
        to="/menu/pizza"
        className="select-link-container"
      >
        <i className="fa-solid fa-pizza-slice"></i>
        <p>Pizza</p>
      </NavLink>
      <NavLink
        activeClassName="active"
        to="/menu/drinks"
        className="select-link-container"
      >
        <i className="fa-solid fa-glass-water"></i>
        <p>Drinks</p>
      </NavLink>
    </section>
  );
}
