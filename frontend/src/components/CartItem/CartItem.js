import React from "react";
import { useCartStore } from "../../store/cart";

import "./CartItem.css";

export default function CartItem({ cartItem }) {
  const { incrementQuantity, decrementQuantity } = useCartStore();
  let price;
  if (cartItem.selectedSize) {
    price = (
      Number(cartItem.item[`${cartItem.selectedSize}_price`]) *
      cartItem.quantity
    ).toFixed(2);
  } else {
    price = (Number(cartItem.item.price) * cartItem.quantity).toFixed(2);
  }

  return (
    <li className="cart-item">
      <img src={cartItem.item.image} alt={cartItem.item.name} />
      <div className="cart-item-info">
        <p className="cart-item-name">{cartItem.item.name}</p>
        <p className="cart-item-additional">
          {cartItem.removedIngredients?.length > 0 &&
            "Removed: " +
              cartItem.removedIngredients
                .map((ingredient) => ingredient.name)
                .join(", ")}
        </p>
        <p className="cart-item-additional">
          {cartItem.selectedSize && "Size: " + cartItem.selectedSize}
        </p>
      </div>
      <div className="quantity-actions">
        <i
          onClick={() => decrementQuantity(cartItem)}
          className="fa-solid fa-minus"
        ></i>
        <p>{cartItem.quantity}</p>
        <i
          onClick={() => incrementQuantity(cartItem)}
          className="fa-solid fa-plus"
        ></i>
      </div>
      <p className="cart-item-price">{price}$</p>
      <i
        onClick={() => decrementQuantity(cartItem, cartItem.quantity)}
        className="fa-solid fa-trash-can remove-btn"
      ></i>
    </li>
  );
}
