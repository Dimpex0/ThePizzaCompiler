import React, { useState } from "react";
import { useCartStore } from "../../store/cart";

import "./OrderSummary.css";
import { createOrder, getPaymentOrderCode } from "../../utils/payment";

export default function OrderSummary() {
  const { cart } = useCartStore();
  const [addressField, setAddressField] = useState(false);
  const [address, setAddress] = useState("");
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

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
    if (e.target.value === "delivery") {
      setAddressField(true);
    } else {
      setAddressField(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoadingPayment(true);
    // Creates a Viva Waller order code for payment
    const orderCodeResponse = await getPaymentOrderCode(totalPrice);
    if (orderCodeResponse.ok) {
      // If order code created successfully, create Order for that order code
      const orderCodeResponseData = await orderCodeResponse.json();
      const orderCode = orderCodeResponseData.orderCode;
      const orderCreateResponse = await createOrder(totalPrice, orderCode);
      if (orderCreateResponse.ok) {
        // Navigate to payment page that then redirects to success/error payment page
        if (orderCode) {
          window.location.href = `https://demo.vivapayments.com/web2/?ref=${orderCode}&color=ffa600`;
        } else {
          window.addGlobalMessage([
            {
              life: 3000,
              severity: "error",
              detail:
                "Couldn't create payment. Please try again or contact us.",
              closable: false,
            },
          ]);
        }
      } else {
        window.addGlobalMessage([
          {
            life: 3000,
            severity: "error",
            detail: "Couldn't create order. Please try again or contact us.",
            closable: false,
          },
        ]);
      }
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
          <p>{totalPrice.toFixed(2)} BGN</p>
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
