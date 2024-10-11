export async function getDrinksList() {
  const response = await fetch(
    `${process.env.REACT_APP_API_DOMAIN}/drink/list-drinks/`
  );
  return response;
}
