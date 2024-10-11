import React, { useState } from "react";
import { useCartStore } from "../../store/cart";

import "./OrderSummary.css";

export default function OrderSummary() {
  const { cart } = useCartStore();
  const [addressField, setAddressField] = useState(false);
  const [address, setAddress] = useState("");

  let totalPrice = 0;

  for (const cartItem of cart) {
    if (cartItem.selectedSize) {
      totalPrice += Number(
        cartItem.item[`${cartItem.selectedSize}_price`] * cartItem.quantity
      );
    } else {
      totalPrice += Number(cartItem.item.price) * cartItem.quantity;
    }
  }

  function handleChange(e) {
    console.log(e.target.value);
    if (e.target.value === "delivery") {
      setAddressField(true);
    } else {
      setAddressField(false);
    }
  }

  return (
    <>
      <p className="shipping">Shipping</p>
      <select onChange={handleChange}>
        <option value="pick-up">Pick up</option>
        <option value="delivery">Delivery</option>
      </select>
      {addressField && (
        <input
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address..."
        />
      )}
      <div className="total-container">
        <p>Total cost</p>
        <p>{totalPrice.toFixed(2)}$</p>
        <button>Checkout</button>
      </div>
    </>
  );
}
