import React from "react";
import { Link } from "react-router-dom";
import pizzaPng from "../../assets/demo/images/Pizza.png";
import "./PizzaCard.css";

export default function PizzaCard() {
  return (
    <div className="pizza-card-container">
      <img src={pizzaPng} />
      <p className="pizza-card-title">Pineapple pizza</p>
      <p className="pizza-card-ingredients">
        tomato sauce, mozzarella, chili sin carne, chicken fillet, pepperoni,
        corn * our standard offers do not apply for this pizza and it is not
        customizable *
      </p>
      <Link to="/">choose</Link>
    </div>
  );
}
