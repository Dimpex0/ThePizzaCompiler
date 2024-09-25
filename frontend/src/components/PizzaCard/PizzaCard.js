import React from "react";
import { Link } from "react-router-dom";
import "./PizzaCard.css";

export default function PizzaCard({ pizza }) {
  const { image, ingredients, name, slug } = pizza;
  const ingredientsText = ingredients
    .map((ingredient) => ingredient.name)
    .join(", ");

  return (
    <div className="pizza-card-container">
      <img src={image} alt={name} />
      <p className="pizza-card-title">{name}</p>
      <p className="pizza-card-ingredients">{ingredientsText}</p>
      <Link to={`/menu/pizza/${slug}`}>choose</Link>
    </div>
  );
}
