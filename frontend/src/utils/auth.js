import Cookies from "universal-cookie";

const cookies = new Cookies();

export function getCsrfToken() {
  return cookies.get("csrftoken");
}

export async function login(formData) {
  const response = await fetch(
    `${process.env.REACT_APP_API_DOMAIN}/account/login/`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCsrfToken(),
      },
    }
  );
  return response;
}
