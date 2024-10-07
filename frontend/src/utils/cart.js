import { getCsrfToken } from "./auth";

export async function updateCartItemsToBackend(items) {
  const response = await fetch(
    `${process.env.REACT_APP_API_DOMAIN}/cart/update-items/`,
    {
      method: "PATCH",
      body: JSON.stringify({ items: items }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCsrfToken(),
      },
    }
  );
  return response;
}

export async function retrieveCart() {
  const response = await fetch(
    `${process.env.REACT_APP_API_DOMAIN}/cart/get-cart/`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCsrfToken(),
      },
    }
  );
  return response;
}
