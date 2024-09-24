import React from "react";
import { NavLink } from "react-router-dom";

import "./MenuSelect.css";

export default function MenuSelect() {
  return (
    <section className="menu-select-container">
      <NavLink
        to="/menu/pizza"
        className={`select-link-container ${({ isActive }) =>
          isActive ? "active" : ""}`}
      >
        <i className="fa-solid fa-pizza-slice"></i>
        <p>Pizza</p>
      </NavLink>
      <NavLink
        to="/menu/drinks"
        className={`select-link-container ${({ isActive }) =>
          isActive ? "active" : ""}`}
      >
        <i className="fa-solid fa-glass-water"></i>
        <p>Drinks</p>
      </NavLink>
    </section>
  );
}
