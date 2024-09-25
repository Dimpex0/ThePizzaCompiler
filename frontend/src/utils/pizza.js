export async function getPizzasList() {
  const response = await fetch(
    `${process.env.REACT_APP_API_DOMAIN}/product/list-pizza/`
  );
  return response;
}

export async function getPizzaDetails(slug) {
  const response = await fetch(
    `${process.env.REACT_APP_API_DOMAIN}/product/details-pizza/${slug}/`
  );
  return response;
}
