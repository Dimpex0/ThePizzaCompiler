export async function getPizzasList() {
  const response = await fetch(
    `${process.env.REACT_APP_API_DOMAIN}/product/pizza/list-pizzas/`
  );
  return response;
}

export async function getPizzaDetails(slug) {
  const response = await fetch(
    `${process.env.REACT_APP_API_DOMAIN}/product/pizza/details-pizza/${slug}/`
  );
  return response;
}
