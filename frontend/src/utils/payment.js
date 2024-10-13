import { getCsrfToken } from "./auth";

export async function getPaymentOrderCode(price) {
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
      }),
    }
  );
  return orderResponse;
}
