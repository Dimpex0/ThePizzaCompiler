import React from "react";
import logoBrackets from "../../assets/images/logo/Full logo.png";
import { Link } from "react-router-dom";
import "./MainNavigation.css";
import { useAccountStore } from "../../store/account";

export default function MainNavigation() {
  const { isLoggedIn } = useAccountStore();
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
              <Link to="/">Menu</Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="fa-solid fa-basket-shopping"></i>
              </Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link to="/account/login">Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to="/account/logout">Logout</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
