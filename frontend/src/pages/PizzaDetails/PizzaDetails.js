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

  // Map for pizza sizes and prices
  const sizeMap = {
    small: { price: pizza?.small_price, img: smallImg, width: 50 },
    medium: { price: pizza?.medium_price, img: mediumImg, width: 75 },
    large: { price: pizza?.large_price, img: largeImg, width: 60 },
  };

  // Update price based on selected size and quantity
  useEffect(() => {
    if (pizza && sizeMap[selectedSize]?.price) {
      setPrice((quantity * sizeMap[selectedSize].price).toFixed(2));
    }
  }, [pizza, quantity, selectedSize]);

  // Separate ingredients into categories
  useEffect(() => {
    if (pizza) {
      const types = [
        "DOUGH",
        "SAUCE",
        "CHEESE",
        "MEAT",
        "VEGETABLE",
        "HERB_SPICE",
        "SPECIAL",
      ];
      const categorizedIngredients = types.reduce((acc, type) => {
        const filtered = pizza.ingredients.filter(
          (ingredient) => ingredient.type === type
        );
        if (filtered.length > 0) acc[type] = filtered;
        return acc;
      }, {});
      setSeparatedIngredients(categorizedIngredients);
      console.log(categorizedIngredients);
    }
  }, [pizza]);

  useEffect(() => {
    async function fetchPizza() {
      try {
        const response = await getPizzaDetails(pizzaSlug);
        const responseData = await response.json();
        if (response.ok) {
          setPizza(responseData);
          setError("");
        } else {
          setError("Couldn't find pizza.");
        }
      } catch {
        setError("Error fetching pizza details.");
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
                {Object.keys(sizeMap).map((size) => (
                  <div
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`pizza-icon-container${
                      selectedSize === size ? " selected" : ""
                    }`}
                  >
                    <img
                      style={{ width: sizeMap[size].width + "px" }}
                      src={sizeMap[size].img}
                      alt={`${size} pizza icon`}
                    />
                    <p>{sizeMap[size].price}$</p>
                  </div>
                ))}
              </div>
              <div className="ingredients-container">
                {Object.entries(separatedIngredients).map(
                  ([type, ingredients]) => (
                    <div className="ingredient-container" key={type}>
                      <p>{type}</p>
                      {ingredients.map((ingredient) => (
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
                  )
                )}
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
