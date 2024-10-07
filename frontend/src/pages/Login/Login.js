import { useState } from "react";

import { getCsrfToken, login } from "../../utils/auth";
// import { useAccountStore } from "../../store/account";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  //   const updateIsLoggedIn = useAccountStore((state) => state.updateIsLoggedIn);
  //   const updateIsAdmin = useAccountStore((state) => state.updateIsAdmin);

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
    // if (!response.ok) {
    //   setError(responseData.message);
    // } else {
    //   updateIsLoggedIn(true);
    //   if (responseData.isAdmin) {
    //     updateIsAdmin(true);
    //   } else {
    //     updateIsAdmin(false);
    //   }
    // }

    if (response.ok) {
      console.log("logged");
    } else {
      console.log("not logged");
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
