import { useState } from "react";

import { login } from "../../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccountStore } from "../../store/account";
import { useCartStore } from "../../store/cart";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const updateIsLoggedIn = useAccountStore((state) => state.updateIsLoggedIn);
  const updateIsAdmin = useAccountStore((state) => state.updateIsAdmin);

  const { addToCart } = useCartStore();

  const navigate = useNavigate();

  const { state } = useLocation();

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await login(formData);
    const responseData = await response.json();
    // returns {message, isAdmin} and a status code
    if (!response.ok) {
      setError(responseData.message);
    } else {
      updateIsLoggedIn(true);
      if (responseData.isAdmin) {
        updateIsAdmin(true);
      } else {
        updateIsAdmin(false);
      }
      if (state) {
        addToCart(state.itemData);
        navigate(-1);
      }
    }
  }
  return (
    <>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          name="username"
          value={formData.username}
          required
          onChange={handleInputChange}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={formData.password}
          required
          onChange={handleInputChange}
        />
        <button>Login</button>
      </form>
    </>
  );
}
