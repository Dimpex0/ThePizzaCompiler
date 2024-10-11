import React, { useEffect, useState } from "react";
import { getDrinksList } from "../../utils/drinks";
import ItemCard from "../../components/ItemCard/ItemCard";

export default function DrinksMenuPage() {
  const [drinks, setDrinks] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getDrinks() {
      try {
        setIsFetching(true);
        const response = await getDrinksList();
        const responseData = await response.json();
        if (response.ok) {
          setError("");
          setDrinks(responseData);
        } else {
          setError("Couldn't fetch drinks.");
        }
      } catch {
        setError("Couldn't fetch drinks.");
      }
      setIsFetching(false);
    }

    getDrinks();
  }, []);
  return (
    <>
      <h1>Drinks</h1>
      {isFetching && <p>Loading drinks...</p>}
      {error && <p>{error}</p>}
      <section className="menu-section">
        {drinks &&
          drinks.map((drink) => <ItemCard key={drink.id} drink={drink} />)}
      </section>
    </>
  );
}
