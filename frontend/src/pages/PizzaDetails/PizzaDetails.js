import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPizzaDetails } from "../../utils/pizza";

import smallImg from "../../assets/icons/small-pizza-icon.png";
import mediumImg from "../../assets/icons/medium-pizza-icon.png";
import largeImg from "../../assets/icons/large-pizza-icon.png";

import "./PizzaDetails.css";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";

const INGREDIENT_ORDER = [
  "DOUGH",
  "SAUCE",
  "CHEESE",
  "MEAT",
  "VEGETABLE",
  "HERB_SPICE",
  "SPECIAL",
  "ADD ON",
];

const CHANGE_INGREDIENTS = ["DOUGH", "SAUCE"];

export default function PizzaDetailsPage() {
  const { pizzaSlug } = useParams();
  const [pizza, setPizza] = useState();
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [selectedSize, setSelectedSize] = useState("medium");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const [originalIngredients, setOriginalIngredients] = useState({});
  const [otherIngredients, setOtherIngredients] = useState({});
  const [currentPizza, setCurrentPizza] = useState({});

  console.log(currentPizza);

  useEffect(() => {
    async function fetchPizza() {
      try {
        const response = await getPizzaDetails(pizzaSlug);
        const responseData = await response.json();
        if (response.ok) {
          setPizza(responseData);
          setCurrentPizza({
            item_id: responseData.id,
            image: responseData.image,
            name: responseData.name,
            ingredients: responseData.ingredients,
            price: responseData.medium_price,
            size: "medium",
            type: "Pizza",
          });
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

  // Separating pizza ingredients
  useEffect(() => {
    if (pizza) {
      let ingredients = {};
      for (const ingredient of pizza.ingredients) {
        if (ingredient.type in ingredients) {
          ingredients[ingredient.type].push(ingredient);
        } else {
          ingredients[ingredient.type] = [ingredient];
        }
      }
      setOriginalIngredients(ingredients);

      ingredients = {};
      for (const ingredient of pizza.other_ingredients) {
        if (ingredient.type in ingredients) {
          ingredients[ingredient.type].push(ingredient);
        } else {
          ingredients[ingredient.type] = [ingredient];
        }
      }
      setOtherIngredients(ingredients);
    }
  }, [pizza, setOriginalIngredients, setOtherIngredients]);

  // Map for pizza sizes and prices
  const sizeMap = {
    small: { price: pizza?.small_price, img: smallImg, width: 50 },
    medium: { price: pizza?.medium_price, img: mediumImg, width: 75 },
    large: { price: pizza?.large_price, img: largeImg, width: 60 },
  };

  // Update price based on selected size and quantity
  useEffect(() => {
    if (pizza && sizeMap[selectedSize]?.price) {
      const price = (quantity * sizeMap[selectedSize].price).toFixed(2);
      setCurrentPizza((prev) => ({ ...prev, price: price }));
    }
    setCurrentPizza((prev) => ({
      ...prev,
      size: selectedSize,
    }));
  }, [pizza, quantity, selectedSize]);

  function handleIngredientChange(e, ingredient) {
    if (e.target.checked) {
      console.log("checked");

      if (CHANGE_INGREDIENTS.includes(ingredient.type)) {
        setCurrentPizza((prev) => ({
          ...prev,
          ingredients: [
            ...prev.ingredients.filter((ing) => ing.type !== ingredient.type),
            ingredient,
          ],
        }));
      } else {
        setCurrentPizza((prev) => ({
          ...prev,
          ingredients: [...prev.ingredients, ingredient],
        }));
      }
    } else {
      console.log("unchecked");
      setCurrentPizza((prev) => ({
        ...prev,
        ingredients: prev.ingredients.filter((ing) => ing.id !== ingredient.id),
      }));
    }
  }

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
                {INGREDIENT_ORDER.map(
                  (type) =>
                    (originalIngredients[type]?.length > 0 ||
                      otherIngredients[type]?.length > 0) && (
                      <div key={type} className="ingredient-container">
                        <p>{type}</p>

                        {/* Render original ingredients if available */}
                        {originalIngredients[type]?.length > 0 &&
                          originalIngredients[type].map((ingredient) => (
                            <div key={ingredient.id}>
                              <input
                                type={
                                  ingredient.edit_type === "CHANGE"
                                    ? "radio"
                                    : "checkbox"
                                }
                                id={ingredient.name}
                                name={type}
                                defaultChecked={
                                  currentPizza.ingredients?.filter(
                                    (ing) => ing.id === ingredient.id
                                  ).length > 0
                                    ? true
                                    : false
                                }
                                onChange={(e) =>
                                  handleIngredientChange(e, ingredient)
                                }
                              />
                              <label htmlFor={ingredient.name}>
                                {ingredient.name}
                              </label>
                            </div>
                          ))}

                        {/* Render other ingredients if available */}
                        {otherIngredients[type]?.length > 0 &&
                          otherIngredients[type].map((ingredient) => (
                            <div key={ingredient.id}>
                              <input
                                type={
                                  ingredient.edit_type === "CHANGE"
                                    ? "radio"
                                    : "checkbox"
                                }
                                id={ingredient.name}
                                name={type}
                                defaultChecked={
                                  currentPizza.ingredients?.filter(
                                    (ing) => ing.id === ingredient.id
                                  ).length > 0
                                    ? true
                                    : false
                                }
                                onChange={(e) =>
                                  handleIngredientChange(e, ingredient)
                                }
                              />
                              <label htmlFor={ingredient.name}>
                                {ingredient.name}
                              </label>
                            </div>
                          ))}
                      </div>
                    )
                )}
              </div>

              <div className="add-to-cart-container">
                <p className="price">{currentPizza.price} BGN</p>
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
                    onClick={() => {
                      setQuantity((prev) => prev + 1);
                    }}
                    className="fa-solid fa-plus"
                  ></i>
                </div>
                <AddToCartButton itemData={currentPizza} quantity={quantity} />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
