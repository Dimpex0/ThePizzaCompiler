import React from "react";
import logoBrackets from "../../assets/images/logo/Full logo.png";
import { Link } from "react-router-dom";
import "./MainNavigation.css";

export default function MainNavigation() {
  return (
    <>
      <div id="demo-banner">
        This is a demo website. You won't receive anything!
      </div>
      <header>
        <Link to="/">
          <img
            id="header-logo"
            src={logoBrackets}
            alt="pizza logo with coding brackets"
          />
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/">Offers</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
