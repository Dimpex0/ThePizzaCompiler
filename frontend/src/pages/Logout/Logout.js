import { useNavigate } from "react-router-dom";
import { useAccountStore } from "../../store/account";
import { getCsrfToken } from "../../utils/auth";
import { useCartStore } from "../../store/cart";

export default function LogoutPage() {
  const resetAccount = useAccountStore((state) => state.reset);
  const resetCart = useCartStore((state) => state.reset);

  const navigate = useNavigate();

  function handleLogout() {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/account/logout/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": getCsrfToken(),
      },
    })
      .then(() => {
        resetAccount();
        resetCart();
        navigate("/account/login");
      })
      .catch(() => {
        resetAccount();
        navigate("/account/login");
      });
  }
  return <button onClick={handleLogout}>Logout</button>;
}
