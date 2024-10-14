import { getCsrfToken } from "./auth";

export async function getPaymentOrderCode(price, orderId) {
  const orderResponse = await fetch(
    `${process.env.REACT_APP_API_DOMAIN}/payment/create-viva-order/`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCsrfToken(),
      },
      body: JSON.stringify({
        price: price * 100,
        orderId,
      }),
    }
  );
  return orderResponse;
}

export async function verifyTransaction(transactionId, orderCode) {
  const response = await fetch(
    `${process.env.REACT_APP_API_DOMAIN}/payment/verify-transaction/`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCsrfToken(),
      },
      body: JSON.stringify({ transactionId, orderCode }),
    }
  );
  return response;
}

export async function createOrder(amount, orderCode) {
  const response = await fetch(
    `${process.env.REACT_APP_API_DOMAIN}/payment/create-order/`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCsrfToken(),
      },
      body: JSON.stringify({ amount, orderCode }),
    }
  );
  return response;
}
