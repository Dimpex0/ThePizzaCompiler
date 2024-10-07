import { useNavigate } from "react-router-dom";

import { useAccountStore } from "../../store/account";
import { useCartStore } from "../../store/cart";
import "./AddToCartButton.css";

export default function AddToCartButton({ itemData, ...props }) {
  const { addToCart } = useCartStore();
  const { isLoogedIn } = useAccountStore();

  const navigate = useNavigate();

  function handleClick() {
    if (!isLoogedIn) {
      console.log(itemData);
      navigate(`/account/login`, { state: { itemData } });
    } else {
      addToCart(itemData);
    }
  }

  return (
    <button onClick={handleClick} {...props}>
      Add to cart
    </button>
  );
}
