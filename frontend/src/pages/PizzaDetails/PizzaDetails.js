import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPizzaDetails } from "../../utils/pizza";

import smallImg from "../../assets/icons/small-pizza-icon.png";
import mediumImg from "../../assets/icons/medium-pizza-icon.png";
import largeImg from "../../assets/icons/large-pizza-icon.png";

import "./PizzaDetails.css";

export default function PizzaDetailsPage() {
  const { pizzaSlug } = useParams();
  const [pizza, setPizza] = useState();
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [separatedIngredients, setSeparatedIngredients] = useState({});
  const [selectedSize, setSelectedSize] = useState("medium");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    if (pizza) {
      if (selectedSize === "small") {
        setPrice((quantity * pizza.small_price).toFixed(2));
      } else if (selectedSize === "medium") {
        setPrice((quantity * pizza.medium_price).toFixed(2));
      } else if (selectedSize === "large") {
        setPrice((quantity * pizza.large_price).toFixed(2));
      } else {
        setPrice("Error");
      }
    }
  }, [pizza, quantity, selectedSize]);

  useEffect(() => {
    if (pizza) {
      const ingredients = pizza.ingredients;
      const DOUGH = ingredients.filter(
        (ingredient) => ingredient.type === "DOUGH"
      );
      setSeparatedIngredients((prev) => ({ ...prev, DOUGH: DOUGH }));
      const SAUCE = ingredients.filter(
        (ingredient) => ingredient.type === "SAUCE"
      );
      setSeparatedIngredients((prev) => ({ ...prev, SAUCE: SAUCE }));
      const CHEESE = ingredients.filter(
        (ingredient) => ingredient.type === "CHEESE"
      );
      setSeparatedIngredients((prev) => ({ ...prev, CHEESE: CHEESE }));
      const MEAT = ingredients.filter(
        (ingredient) => ingredient.type === "MEAT"
      );
      setSeparatedIngredients((prev) => ({ ...prev, MEAT: MEAT }));
      const VEGETABLE = ingredients.filter(
        (ingredient) => ingredient.type === "VEGETABLE"
      );
      setSeparatedIngredients((prev) => ({ ...prev, VEGETABLE: VEGETABLE }));
      const HERB_SPICE = ingredients.filter(
        (ingredient) => ingredient.type === "HERB_SPICE"
      );
      setSeparatedIngredients((prev) => ({ ...prev, HERB_SPICE: HERB_SPICE }));
      const SPECIAL = ingredients.filter(
        (ingredient) => ingredient.type === "SPECIAL"
      );
      setSeparatedIngredients((prev) => ({ ...prev, SPECIAL: SPECIAL }));
    }
  }, [pizza]);

  useEffect(() => {
    async function fetchPizza() {
      const response = await getPizzaDetails(pizzaSlug);
      const responseData = await response.json();
      if (response.ok) {
        setPizza(responseData);
        setError("");
      } else {
        setError("Couldn't find pizza.");
      }
    }

    fetchPizza();
  }, [pizzaSlug]);

  return (
    <>
      {error && <p>{error}</p>}
      {pizza && (
        <>
          <h1>{pizza.name}</h1>
          <section className="pizza-section">
            <img src={pizza.image} alt={pizza.name} />
            <div className="pizza-details">
              <div className="sizes-container">
                <div
                  onClick={() => setSelectedSize("small")}
                  className={`pizza-icon-container${
                    selectedSize === "small" ? " selected" : ""
                  }`}
                >
                  <img
                    style={{ width: 50 + "px" }}
                    src={smallImg}
                    alt="small pizza icon"
                  />
                  <p>{pizza.small_price}$</p>
                </div>
                <div
                  onClick={() => setSelectedSize("medium")}
                  className={`pizza-icon-container${
                    selectedSize === "medium" ? " selected" : ""
                  }`}
                >
                  <img
                    style={{ width: 75 + "px" }}
                    src={mediumImg}
                    alt="medium pizza icon"
                  />
                  <p>{pizza.medium_price}$</p>
                </div>
                <div
                  onClick={() => setSelectedSize("large")}
                  className={`pizza-icon-container${
                    selectedSize === "large" ? " selected" : ""
                  }`}
                >
                  <img
                    style={{ width: 60 + "px" }}
                    src={largeImg}
                    alt="large pizza icon"
                  />
                  <p>{pizza.large_price}$</p>
                </div>
              </div>
              <div className="ingredients-container">
                {Object.keys(separatedIngredients).map((type) => (
                  <div className="ingredient-container" key={type}>
                    <p>{type}</p>
                    {separatedIngredients[type].map((ingredient) => (
                      <div
                        className={`ingredient-item${
                          removedIngredients.some(
                            (removed) => removed.id === ingredient.id
                          )
                            ? " removed"
                            : ""
                        }`}
                        key={ingredient.id}
                      >
                        {!removedIngredients.some(
                          (removed) => removed.id === ingredient.id
                        ) && (
                          <i
                            onClick={() =>
                              setRemovedIngredients((prev) => [
                                ...prev,
                                ingredient,
                              ])
                            }
                            className="fa-solid fa-xmark remove-button"
                          ></i>
                        )}
                        <p>{ingredient.name}</p>
                        {removedIngredients.some(
                          (removed) => removed.id === ingredient.id
                        ) && (
                          <i
                            onClick={() =>
                              setRemovedIngredients((prev) =>
                                prev.filter(
                                  (removed) => removed.id !== ingredient.id
                                )
                              )
                            }
                            className="fa-solid fa-plus add-button"
                          ></i>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="add-to-cart-container">
                <p className="price">{price}$</p>
                <div className="quantity-container">
                  <i
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity((prev) => prev - 1);
                      }
                    }}
                    className="fa-solid fa-minus"
                  ></i>
                  <p>{quantity}</p>
                  <i
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="fa-solid fa-plus"
                  ></i>
                </div>
                <button>Add to cart</button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
