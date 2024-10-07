import React from "react";
import logoBrackets from "../../assets/images/logo/Full logo.png";
import { Link } from "react-router-dom";
import "./MainNavigation.css";
import { useAccountStore } from "../../store/account";
import { useCartStore } from "../../store/cart";

export default function MainNavigation() {
  const { isLoggedIn } = useAccountStore();
  const { cart } = useCartStore();

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
              <Link to="/cart" className={`${isLoggedIn ? "" : "disabled"}`}>
                {cart.length > 0 && (
                  <p className="cart-quantity">
                    {cart.length <= 9 ? cart.length : "9+"}
                  </p>
                )}
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
