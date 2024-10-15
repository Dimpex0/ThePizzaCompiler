import React, { useEffect } from "react";
import { useCartStore } from "../../store/cart";
import { useAccountStore } from "../../store/account";
import CartItem from "../../components/CartItem/CartItem";
import { useNavigate } from "react-router-dom";

import "./Cart.css";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

export default function CartPage() {
  const { cart } = useCartStore();
  const { isLoggedIn } = useAccountStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/account/login");
    }
    if (cart.length <= 0) {
      // redirects before cart is fetched
      navigate("/");
    }
  }, [isLoggedIn, navigate, cart]);

  const cartReversedCopy = [...cart].reverse();

  return (
    <div className="page-container">
      <section className="cart-section">
        <div className="header-section">
          <h1>Shopping cart</h1>
          <p>{cart?.length} Items</p>
        </div>
        <ul>
          {cartReversedCopy &&
            cartReversedCopy.map((cartItem, index) => (
              <CartItem key={index} cartItem={cartItem} />
            ))}
        </ul>
      </section>
      <section className="order-section">
        <div className="header-section">
          <h1>Order summary</h1>
        </div>
        <OrderSummary />
      </section>
    </div>
  );
}
