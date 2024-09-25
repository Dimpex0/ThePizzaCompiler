import { useCartStore } from "../../store/cart";
import "./AddToCartButton.css";

export default function AddToCartButton({ itemData, ...props }) {
  const { addToCart } = useCartStore();

  return (
    <button onClick={() => addToCart(itemData)} {...props}>
      Add to cart
    </button>
  );
}
