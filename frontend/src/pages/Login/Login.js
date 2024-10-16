import { useState } from "react";

import { login } from "../../utils/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAccountStore } from "../../store/account";
import { useCartStore } from "../../store/cart";

import "./Login.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const response = await login(formData);
    const responseData = await response.json();
    // returns {message, isAdmin} and a status code
    if (!response.ok) {
      setError(responseData.message);
      setFormData({ username: "", password: "" });
      setIsLoading(false);
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
        return 1;
      }
      setIsLoading(false);
      navigate("/");
    }
  }
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <p>Login</p>
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
        {error && <p className="error">{error}</p>}
        <Link to="#">Forgot password?</Link>
        <div className="action-container">
          <button disabled={isLoading}>
            {isLoading ? (
              <i className="fa-solid fa-arrows-rotate"></i>
            ) : (
              "Checkout"
            )}
          </button>
          <Link to="#">Already have an account?</Link>
        </div>
      </form>
    </>
  );
}
