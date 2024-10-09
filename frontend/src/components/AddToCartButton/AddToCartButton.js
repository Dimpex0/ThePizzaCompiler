import { useNavigate } from "react-router-dom";

import { useAccountStore } from "../../store/account";
import { useCartStore } from "../../store/cart";
import "./AddToCartButton.css";
import { useEffect } from "react";

export default function AddToCartButton({ itemData, ...props }) {
  const { addToCart } = useCartStore();
  const { isLoggedIn } = useAccountStore();

  const navigate = useNavigate();

  function handleClick() {
    if (!isLoggedIn) {
      navigate(`/account/login`, { state: { itemData } });
    } else {
      addToCart(itemData);
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
