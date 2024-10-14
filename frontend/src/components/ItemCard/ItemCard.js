import React from "react";

import "./ItemCard.css";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

export default function ItemCard({ drink }) {
  return (
    <div className="item-card">
      <img src={drink.image} alt={drink.name} />
      <div className="name-price-container">
        <p className="name">{drink.name}</p>
        <p className="price">{drink.price} BGN</p>
      </div>
      <AddToCartButton
        itemData={{
          item: drink,
          quantity: 1,
        }}
        className="add-button"
      />
    </div>
  );
}
