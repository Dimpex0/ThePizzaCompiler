import React, { useEffect, useState } from "react";
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import { getPizzasList } from "../../utils/pizza";

import "./PizzaMenu.css";

export default function PizzaMenuPage() {
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPizzas() {
      try {
        const response = await getPizzasList();
        const responseData = await response.json();
        if (response.ok) {
          setPizzas(responseData);
          setError("");
        } else {
          setError("Sorry, couldn't fetch menu. Please, try again later.");
        }
      } catch {
        setError("Sorry, couldn't fetch menu. Please, try again later.");
      }
    }
    fetchPizzas();
  }, [setPizzas, setError]);

  return (
    <>
      <h1>Baked in circles, cut in triangles, brought in squares</h1>
      <section className="menu-section">
        {pizzas &&
          pizzas.map((pizza) => <PizzaCard pizza={pizza} key={pizza.id} />)}
        {error && <p>{error}</p>}
      </section>
    </>
  );
}
