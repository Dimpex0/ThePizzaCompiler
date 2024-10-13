import React, { useState } from "react";
import { useCartStore } from "../../store/cart";

import "./OrderSummary.css";
import { getPaymentOrderCode } from "../../utils/payment";
import { useNavigate } from "react-router-dom";

export default function OrderSummary() {
  const { cart } = useCartStore();
  const [addressField, setAddressField] = useState(false);
  const [address, setAddress] = useState("");
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  const navigate = useNavigate();

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

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoadingPayment(true);
    const response = await getPaymentOrderCode(totalPrice);
    if (response.ok) {
      const responseData = await response.json();
      const orderCode = responseData.orderCode;

      window.location.replace(
        `https://demo.vivapayments.com/web2/?ref=${orderCode}&color=ffa600`
      );
    }
    setIsLoadingPayment(false);
  }

  return (
    <>
      <p className="shipping">Shipping</p>
      <form onSubmit={handleSubmit} className="order-summary-form">
        <select onChange={handleChange} required>
          <option value="pick-up">Pick up</option>
          <option value="delivery">Delivery</option>
        </select>
        {addressField && (
          <input
            required
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address..."
          />
        )}
        <div className="total-container">
          <p>Total cost</p>
          <p>{totalPrice.toFixed(2)}$</p>
          <button disabled={isLoadingPayment}>
            {isLoadingPayment ? (
              <i className="fa-solid fa-arrows-rotate"></i>
            ) : (
              "Checkout"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
