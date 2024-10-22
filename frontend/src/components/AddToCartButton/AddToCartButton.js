import { useNavigate } from "react-router-dom";

import { useAccountStore } from "../../store/account";
import { useCartStore } from "../../store/cart";
import "./AddToCartButton.css";

export default function AddToCartButton({ itemData, quantity, ...props }) {
  const { addToCart } = useCartStore();
  const { isLoggedIn } = useAccountStore();

  const navigate = useNavigate();

  function handleClick() {
    if (isLoggedIn === null) {
      navigate(`/account/login`, { state: { itemData, quantity } });
    } else {
      addToCart(itemData, quantity);
      window.addGlobalMessage([
        {
          life: 3000,
          severity: "success",
          detail: "Item added to cart",
          closable: false,
        },
      ]);
    }
  }

  return (
    <button onClick={handleClick} {...props}>
      Add to cart
    </button>
  );
}
