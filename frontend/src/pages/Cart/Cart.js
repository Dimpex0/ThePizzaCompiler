import React from "react";
import { useCartStore } from "../../store/cart";
import CartItem from "../../components/CartItem/CartItem";

import "./Cart.css";

export default function CartPage() {
  const { cart } = useCartStore();
  return (
    <>
      <section className="cart-section">
        <div className="header-section">
          <h1>Shopping cart</h1>
          <p>{cart?.length} Items</p>
        </div>
        <ul>
          {cart &&
            cart.map((cartItem, index) => (
              <CartItem key={index} cartItem={cartItem} />
            ))}
        </ul>
      </section>
    </>
  );
}
