import { useNavigate } from "react-router-dom";
import { useAccountStore } from "../../store/account";
import { getCsrfToken } from "../../utils/auth";

export default function LogoutPage() {
  const resetAccount = useAccountStore((state) => state.reset);

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
        navigate("/account/login");
        resetAccount();
      })
      .catch(() => {
        navigate("/account/login");
        resetAccount();
      });
  }
  return <button onClick={handleLogout}>Logout</button>;
}
